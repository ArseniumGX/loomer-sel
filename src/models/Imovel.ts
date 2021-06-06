import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('imoveis')
class Imovel{

    @PrimaryColumn()
    id: string

    @Column()
    cep: string

    @Column()
    numero: number

    @Column()
    complemento: string

    @Column()
    valor_aluguel: number

    @Column()
    qtd_quartos: number

    @Column()
    disponivel?: boolean

    constructor(){
        if(!this.id)
            this.id = uuid()

        if(!this.qtd_quartos)
            this.qtd_quartos = 0

        if(!this.disponivel)
            this.disponivel = false
    }
}

export { Imovel }