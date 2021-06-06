import { Request, Response, NextFunction } from 'express'
import { ImovelRepository } from '../database/repository/imovelRepository'
import { getCustomRepository, SimpleConsoleLogger } from 'typeorm'

class ImovelController{

    // Método Create
    async registrar(req: Request, res: Response){ 
        const { cep, numero, complemento, valor_aluguel, qtd_quartos, disponivel } = req.body
        const repoImovel = getCustomRepository(ImovelRepository)

        const consulta = await repoImovel.findOne({
            cep,
            numero
        })

        // verifica se o imovel já foi cadastrado usando como parametro unico o cep e numero
        if(consulta)
            return res.status(400).json({warnning: "Imóvel já registrado", 
                                         cep: consulta.cep, 
                                         numero: consulta.numero, 
                                         complemento: consulta.complemento,
                                         valor_aluguel: consulta.valor_aluguel,
                                         qtd_quartos: consulta.qtd_quartos,
                                         disponivel: consulta.disponivel
                                        })
        
        const imovel = repoImovel.create({
            cep,
            numero,
            complemento,
            valor_aluguel,
            qtd_quartos,
            disponivel
        })

        await repoImovel.save(imovel)
        return res.status(201).json({message: "Imóvel cadastrado com sucesso!"})
    }

    // Método Read all
    async listar(req: Request, res: Response){ 
        const repoImovel = getCustomRepository(ImovelRepository)

        const list = await repoImovel.find()

        res.status(200).json(list)
    }

    // Método Read One
    async buscar(req: Request, res: Response){

        // Busca um registro por cep
        const { cep } = req.body
        const repoImovel = getCustomRepository(ImovelRepository)
        
        const consulta = await repoImovel.find({ cep })

        // testa se a consolta trouxe algum resultado
        if(consulta.length === 0)
            return res.status(404).json({ message: "Registro não encontado!" })

        res.status(200).json(consulta)
    }

    // Método Update. Necessário uuid do registro para alteração
    async atualizar(req: Request, res: Response){
        
        // Busca o id passado na url
        const id = req.params.id
        const repoImovel = getCustomRepository(ImovelRepository)
        const {...params} = req.body

        await repoImovel.update(id, params)

        res.status(201).json({message: "Dados alterados!", params})
                
    }

    // Método Delete remove o registro pelo cep informado
    async remover(req: Request, res: Response){ 
        const { cep } = req.body
        const repoImovel = getCustomRepository(ImovelRepository)

        await repoImovel.delete({ cep })

        res.status(200).json({ message: "Registro deletado!" })
    }
}

export default new ImovelController