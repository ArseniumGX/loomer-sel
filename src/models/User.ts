import { v4 as uuid } from 'uuid'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity("users")

class User{

    @PrimaryColumn()
    readonly id: string

    @Column()
    nome: string

    @Column()
    cpf: number

    @Column()
    email: string

    @Column()
    senha: string

    constructor()
    {
        if(!this.id)
            this.id = uuid()
    }
}

export { User }

/* 
 Model Users funcional, implementar model imoveis ctrl+c / ctrl+v
*/