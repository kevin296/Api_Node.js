const express =require('express')

const app =express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json({message: 'hola mundo'})
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT,()=>{
    console.log('server escuchando en el puerto http://localhost:1234') 
})