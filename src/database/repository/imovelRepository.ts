import { EntityRepository, Repository } from 'typeorm';
import { Imovel } from '../../models/Imovel'

@EntityRepository(Imovel)
class ImovelRepository extends Repository<Imovel> { }

export { ImovelRepository }