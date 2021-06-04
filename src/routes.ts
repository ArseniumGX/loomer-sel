import { Request, Response, Router } from 'express'

const router = Router()

router.use('/', (req: Request, res: Response) => {
    res.status(200)
    res.send('Olár!')
})

export default router