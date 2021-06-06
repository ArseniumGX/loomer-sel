import { Router } from 'express'
import userController from './controllers/userController'
import imovelController from './controllers/imovelController'

const router = Router()

router.post('/user/cadastro', userController.createUser)
router.post('/user/login', userController.login)
router.get('/imoveis', imovelController.listar)
router.post('/imoveis/cadastrar', imovelController.registrar)
router.post('/imoveis', imovelController.buscar)
router.patch('/imoveis/:id', imovelController.atualizar)
router.delete('/imoveis', imovelController.remover)

export default router
