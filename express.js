const express = require('express')
const ditto = require('./pokemon/ditto.json')
const path = require('path')
const app = express()

const PORT = process.env.PORT ?? 1234
app.disable('x-powered-by')

app.use(express.json())
// app.get('/' , (req, res) =>{
//     res.send(200).send('mi pagina')
// })
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // solo llegan request que son POST y que tienen el header Content-Type: application/json
//   let body = ''

//   // escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // mutar la request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })
app.get('/pokemon/ditto' , (req, res) =>{
    res.json(ditto)
})


app.post('/pokemon' , (req, res) =>{
    let body =''
    // escuchando evento date 
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp =Date.now()
        res.status(201).json(data)
    })
})
app.use((req, res) =>{
    res.status(404).send('404')
})

app.listen(PORT,() =>{
    console.log(`server escuchando en el puerto http://localhost:${PORT}`)

})
