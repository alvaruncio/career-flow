# Route Pattern

Routes connect middleware to controllers. Validation middleware is defined inline.

```js
import { Router } from 'express'
import { JobController } from '../controllers/job.js'


jobsRouter.get('/',        JobController.getAll)
jobsRouter.get('/:id',     JobController.getById)
jobsRouter.post('/',       ,  JobController.create)
jobsRouter.patch('/:id'   ,  JobController.partialUpdate)
jobsRouter.put('/:id'     ,  JobController.update)
jobsRouter.delete('/:id',  JobController.delete)
```
