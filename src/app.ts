import express from 'express'
import 'reflect-metadata'
import router from './routes'
import './database'
require('dotenv').config({ path: '.env.test'})

const app = express()

app.use(express.json())
app.use(router)

export default app

/* 
 Root da API, não mexer mais
*/