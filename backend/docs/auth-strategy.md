# Authentication Strategy — Dual Token (Access + Refresh)

The API uses a **dual JWT token** strategy: a short-lived **access token** (in-memory) and a long-lived **refresh token** (HTTPOnly cookie).

| Token | Expiration | Storage | Transmission |
|---|---|---|---|
| **Access Token** | 15 minutes | Frontend `useState` (memory) | `Authorization: Bearer <token>` header |
| **Refresh Token** | 30 days | HTTPOnly, Secure, SameSite=Strict cookie named `refreshToken` | Sent automatically by the browser as a cookie |

## Auth Flow

1. **Login / Register** — The server returns the **access token** in the response body (`{ accessToken }`) and sets the **refresh token** as an HTTPOnly cookie.
2. **Frontend storage** — The frontend stores the access token in a `useState` variable (never `localStorage` or `sessionStorage`).
3. **Authenticated requests** — Every API call includes the access token via `Authorization: Bearer <token>` header.
4. **Access token verification** — The `requireAuth` middleware reads the `Authorization` header, verifies the JWT, and attaches `req.user` (decoded payload) for downstream use.
5. **Refresh interceptor** — A frontend **auth interceptor component** runs before any API call. If the access token is missing or expired, it calls `POST /api/v1/auth/refresh` — the browser automatically includes the refresh token cookie. On success, the new access token replaces the previous one and the original request proceeds.
6. **Backend refresh endpoint** — `POST /api/v1/auth/refresh` reads the `refreshToken` cookie, verifies it, issues a new access token, and returns it.
7. **Logout** — The server clears the refresh token cookie and the frontend discards the in-memory access token.

## Middleware: `requireAuth`

Reads the access token from the `Authorization: Bearer <token>` header. If missing, expired, or invalid, responds with `401 Unauthorized`.

```js
// src/middlewares/auth/auth.middleware.js
import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token required' })
  }
  try {
    const token = header.split(' ')[1]
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
```

## Security

| Aspect | Detail |
|---|---|
| **Access token** | In-memory only — never persisted, eliminating persistent XSS exposure. Short lifespan (15 min) limits damage if intercepted. |
| **Refresh token** | HTTPOnly, Secure, SameSite=Strict cookie — not accessible via JavaScript, preventing XSS-based theft. |
| **Token rotation (recommended)** | Each call to `/auth/refresh` invalidates the previous refresh token and issues a new one (anti-replay). |
| **Logout** | The server clears the refresh token cookie, making the refresh token unusable. The frontend discards the in-memory access token. |

## Frontend Auth Interceptor Component

A component (e.g. `AuthProvider` or a custom hook) wraps the app and intercepts all outgoing requests:

1. Before each fetch, check if the access token is expired (or close to expiry).
2. If expired, call `POST /api/v1/auth/refresh` (cookie sent automatically).
3. If refresh succeeds, store the new access token and retry the original request.
4. If refresh fails (refresh token expired/invalid), redirect to login.
