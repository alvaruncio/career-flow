# Controller Pattern

Controllers are thin — they parse the HTTP request, delegate to the service, and format the response.

```js
import { JobService } from '../services/job.js'
import { DEFAULTS } from '../shared/constants.js'

export class JobController {
  static async getAll(req, res) {
    const { text, title, level, technology } = req.query
    const limit = Number(req.query.limit) || DEFAULTS.LIMIT_PAGINATION
    const offset = Number(req.query.offset) || DEFAULTS.LIMIT_OFFSET

    const result = await JobService.getAll({ text, title, level, technology, limit, offset })

    return res.json({ ...result, limit, offset })
  }

  static async getById(req, res) {
    const job = await JobService.getById(req.params.id)

    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    return res.json(job)
  }

  static async create(req, res) {
    const newJob = await JobService.create(req.body)

    return res.status(201).json(newJob)
  }

  // static async update(req, res) {}
  // static async partialUpdate(req, res) {}
  // static async delete(req, res) {}
}
```
