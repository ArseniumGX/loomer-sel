import app from './app'

const port = null

app.listen(3000, () => console.log(`Server is running at http://localhost:${port || 3000}`))