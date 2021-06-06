import { Request, Response, NextFunction } from 'express'
import { UsersRepository } from '../database/repository/userRepository'
import bcrypt from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

class userController{
    async createUser(req: Request, res: Response){
        const { nome, cpf, email, senha } = req.body
       
        const userRepository = getCustomRepository(UsersRepository)
        const emailExists = await userRepository.findOne({ email })

        if(emailExists)
            return res.status(400).json({ error: "Usuário já cadastrado."})

        const user = userRepository.create({
            nome,
            cpf,
            email,
            senha: await bcrypt.hash(senha, 10)
        })

        await userRepository.save(user)

        return res.status(201).json({ message: "Dados cadastrados com sucesso!"})
    }

    async login(req: Request, res: Response){
        const { email, senha } = req.body
        const user = getCustomRepository(UsersRepository)

        const userEmail = await user.findOne({ email })

        console.log(senha   )
        // const hashSenha = userEmail.senha
        // senha === true ? console.log(true) : console.log(false)

        /* email teste: anseris@mail.com
           senha teste: teste
         */
        if(!userEmail)
            return res.status(404).json({ error: "Usuário não cadastrado" })
        
        if(email === userEmail.email/*  && senha === bcrypt.compare(senha, userEmail.senha) */){
            const id = userEmail.id
            const token = jwt.sign(
                                { id }, 
                                process.env.SECRET, 
                                {expiresIn: 300 }) // valor representa tempo em segundos
            return res.status(200).json({Nome: userEmail.nome, auth: true, token })
        }
        
        
        res.status(500).json({message: 'Login inválido!'});
    }

    verifyJWT(req: Request, res: Response, next: NextFunction){
        const token = req.header['x-access-token']
        if(!token)
            return res.status(401).json({ auth: false, message: 'Nenhum token ativo.' });
        
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) return res.status(500).json({ auth: false, message: 'Falha ao atenticar token.' });
                
                // se tudo estiver ok, salva no request para uso posterior
                // req.userId = decoded.id;
                next();
            })
    }
}

export default new userController

/* 
 Necessário ainda algumas correções, principalmente na login, mas de resto tudo ok.
 Apenas verificar o método verifyJWT para entender melhor a lógica
 De resto ctrl+c / ctrl+v para impementar imoveis com as operações CRUD
*/