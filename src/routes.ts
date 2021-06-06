import { Router } from 'express'
import userController from './controllers/userController'

const router = Router()

router.post('/user/cadastro', userController.createUser)
router.post('/user/login', userController.login)

export default router

/* 
 Rotas ainda a definir
 Imoveis CRUD
*/