import app from './app'

if(process.env.NODE_ENV === 'development')
    require('dotenv').config({ path: '.env.test' })


const port = process.env.PORT

app.listen(port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`)
    console.log(`Server is running at http://localhost:${port}`)
})

/* 
 Codigo sobe a API
 */