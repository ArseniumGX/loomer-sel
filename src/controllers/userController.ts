import { Request, Response, NextFunction } from 'express'
import { UsersRepository } from '../database/repository/userRepository'
import bcrypt from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

class UserController{
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
            senha: await bcrypt.hashSync(senha, 10)
        })

        await userRepository.save(user)

        return res.status(201).json({ message: "Dados cadastrados com sucesso!"})
    }

    async login(req: Request, res: Response){
        const { email, senha } = req.body
        const user = getCustomRepository(UsersRepository)

        // Procura por um email cadastrado levando em conta que o mesmo é único para cada usuário
        // Poderia ter feito com cpf, porém não quero fazer assim pois não tenho tempo de validar o campo
        const userEmail = await user.findOne({ email })

        if(!userEmail)
            return res.status(404).json({ error: "Usuário não cadastrado" })
        
        // 
        if(email === userEmail.email && bcrypt.compareSync(senha, userEmail.senha) === true){
            const id = userEmail.id
            const token = jwt.sign(
                                { id }, 
                                process.env.SECRET, 
                                {expiresIn: 300 }) // valor representa tempo em segundos
            return res.status(200).json({ Nome: userEmail.nome, auth: true, token })
        }
        
        // Se passar por todos os if em false cai aqui
        /* Poderia fazer com if else encadeado? Sim, não fiz porque ia da no mesmo. Assim 
          é mais fácil vizualizar o que está acontecendo */
        res.status(500).json({message: 'Login inválido!'});
    }


    // Decisão de não implementar essa verificação
    /* verifyJWT(req: Request, res: Response, next: NextFunction){
        const token = req.header['x-access-token']
        if(!token)
            return res.status(401).json({ auth: false, message: 'Nenhum token ativo.' });
        
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) return res.status(500).json({ auth: false, message: 'Falha ao atenticar token.' });
                
                token.id = decoded.id;
                next();
            })
    } */
}

export default new UserController

/* 
 Necessário ainda algumas correções, principalmente na login, mas de resto tudo ok.
 Apenas verificar o método verifyJWT para entender melhor a lógica
*/