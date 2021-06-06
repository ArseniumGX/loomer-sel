# API
Projeto de desenvolvimento de uma API de gerenciamento de imoveis como requisito no processo seletivo para a vaga de estágio dev back end nodejs.

---
#### Ferramentas utilizadas
- Yarn
- Typescript
- BScryptjs
- JWT
- SQLite3
- TypeORM

Para instalar as dependências execute (apenas um, dependo da preferencia pelo gerenciador de pacote):
```npm
npm install
```
```yarn
yarn install
```
---
### Executando API
Utilize o script para inicializar a api:
```yarn
yarn dev
```
```npm
npm run dev
```
A API será executada na porta 3000 seguindo um padrão próprio.
Caso o database.slqite não esteja disponível ou as tabelas não estejam definidas, execute o script da migration para definir as tabelas no banco. O banco de dados vai está na pasta ./src/database/database.sqlite
```yarn
yarn typeorm migration:run
```
```npm
npm run typeorm migration:run
```
O projeto inicialmente comecei a fazer usando o Sequelize, porém vi algumas complicações na implementação dos controllers e models. Então optei em desenvolver usando o TypeORM por ser uma ferramenta da qual tenho mais familiariadade e facilidade.

Normalmente teria usado teste em TDD, porém não teria tempo suficiente para implementar a aplicação toda ocasionando em atrasos desnecessários.

---
# TESTES
## User
A API duas rotas para o 'user'.
#### Para cadastro:
```localhost:3000/user/cadastro```
Os dados de entrada são todos feitos em json, utilizando ferramentas como insomnia ou postman. Utilizando o método ```POST```, crie uma requisição passando no body as seguintes informações:
```json
{
    "nome": "<nome-do-usuario>",
    "cpf": <cpf-do-usuario-numeros-apenas>,
    "email": "<email-do-usuario>",
    "senha": "<senha-qualquer>"
}
```
O campo cpf está definido no banco como ```integer```, logo passe um valor tipo number para evitar problema. Fiz dessa forma pois inicialmente pensei em implementar um algoritmo de validação de cpf, mas não vi necessidade, talvez faça em algum outro momento. Os demais capos recebem uma ```string``` como parêmetro. Há uma id sendo gerada no código do tipo ```uuid``` não sendo necessário repassa-lá como um parâmetro.
Feito isso um novo usuário será criado em banco. Vale ressaltar que a senha está sendo criptografado usando o ```BCrypt.js```.
#### Login:
O login é feito atravé de método ```POST``` pela rota:
```localhost:3000/user/login```

Para fazer o login é necessário passar como parâmetro no body da requisição o json:
```json
{
    "email": "<um-email-cadastrado>",
    "senha": "<senha-valida-cadastrada-no-email>"
}
```
Utilizando uma simples condicional, a api vai comparar o email e senha passado no json com os registros do banco de dados. Utilizando uma simples condicional, a api compara o email e senhas passadas com as informações do banco. A senha é comparada com a hash que foi guardada no banco para melhor seguração e mais próximo como realmente é feito. Se o login for bem succedido o token de validação será atibuido ao usuário, expirando após 5 minutos. Esse parte da autenticação em JWT não está cem porcento funcional, nunca trabalhei com isso antes então o que fiz foi baseado no que aprendi durante o desenvolvimento da api.

## Imoveis
Aqui foi onde implementei todas as funcionalidades necessárias para esse teste. URL base das rotas imoveis:
```localhost:3000/imoveis```

Ao acessar essa rota usando postman ou insomina, ou mesmo o próprio navegado, vai listar todos os imoveis cadastrados no banco de dados, utilizando o método ```GET```.

#### Rota Cadastro (Create)
Essa routa é acessada em método ```POST``` na url:
```localhost:3000/imoveis/cadastrar```

Para efeitos de testes utilize a seguinte estrutura em json:
```json
{
    "cep": "<cep-qualquer>",
    "numero": <numero-qualquer>,
    "complemento": "<algum-complemento>",
    "valor_aluguel": <valor-numerico>,
    "qtd_quartos": <inteiro-qualquer>,
    "disponivel": <true||false>
}
```
Os campos ```cep``` e ```complemento``` estão definidos como string; ```numero```, ```valor_aluguel``` e ```qtd_quartos``` são passados como number; e ```disponivel``` armazena um valor boolean. Há ainda o id definido como um ```uuid``` que é gerado em código da mesma forma como é feito no cadastro de user

#### Rota de buscar (Read)
Acessada em método ```POST``` na url:
```localhost:3000/imoveis```

Para fazer uma busca, passe como parametro no corpo da requisição json o cep, como exemplificado abaixo:
```json
{
    "cep": "<um-cep-qualquer-cadastrado>"
}
```
Lembrado que so vai funcionar se for passado como uma string. O retorno é em json, e retorma mesmo que haja mais de um cep registrado.

#### Rota de atualizar (Update)
Acesso em método ```PACTH``` na url:
```localhost:3000/imoveis/:id```
Para essa operação tenha em mãos o id de um registo que deseje alterar e passe onde está ```:id``` na url. Utilize a mesma estrutura passada para fazer cadastro:
```json
{
    "cep": "<cep-qualquer>",
    "numero": <numero-qualquer>,
    "complemento": "<algum-complemento>",
    "valor_aluguel": <valor-numerico>,
    "qtd_quartos": <inteiro-qualquer>,
    "disponivel": <true||false>
}
```
Não é necessário passar todos os campos para a alteração de dados, apenas os que for realmente alterar. Após enviar da um sende nas informações os dados são alterados no banco de dados.

#### Rota apagar imóvel (Delete)
Acessado via método ```DELETE``` pela rota:
```localhost:3000/imoveis```

Único parâmetro necessário para apagar um imóvel do banco é passar no corpo da requisição um json contendo apenas o cep:
```json
{
    "cep": "<um-cep-cadastrado>"
}
```
Mais uma vez resaltando que o cep está definido como uma string.

---
## Consiferações
Gostei muito de desenvolver esse projeto, pois muito do conhecimento aqui aplicado eu já tinha e alguns outros pude aprender. Diferente de outros pequenos projetos paralelos que desenvolvi esse teve um objetivo em a alcaçar. Ainda vou melhorar esse código com o tempo, quero implementar uma interface simples usando o tempate engine Pugs e melhorar essas rotas de forma a deixar o código o mais performático possível. Planos futuros, ainda, de implementar corretamenta a autenticação em JWT à medida que for aprendendo mais.
