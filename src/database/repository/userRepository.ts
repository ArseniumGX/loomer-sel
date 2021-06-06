import { EntityRepository, Repository } from "typeorm";
import { User } from '../../models/User'

@EntityRepository(User)
class UsersRepository extends Repository<User>{ }

export { UsersRepository }

/* 
 crtl+c / ctrl+v para implementar o repositório imoveis
*/