# Service Pattern

Services handle all database interaction (Prisma) and business logic. No `req`/`res` access.

```js
import prisma from '../shared/prisma.js'

export class JobService {
  static async getAll({ text, title, level, limit = 10, technology, offset = 0 }) {
    const where = {}

    if (text) {
      where.OR = [
        { titulo: { contains: text, mode: 'insensitive' } },
        { descripcion: { contains: text, mode: 'insensitive' } },
      ]
    }

    if (technology) {
      where.data = { path: ['technology'], equals: technology }
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({ where, skip: offset, take: limit }),
      prisma.job.count({ where }),
    ])

    return { data: jobs, total }
  }

  static async getById(id) {
    return prisma.job.findUnique({ where: { id } })
  }

  static async create(input) {
    return prisma.job.create({ data: input })
  }
}
```
