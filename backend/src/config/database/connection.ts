import {createConnection, ConnectionOptions} from 'typeorm'

createConnection().then(
    () => console.log("Conexão com o banco de dados feita")
)

