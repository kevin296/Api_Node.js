const express =require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')



const app =express()
app.use(express.json())

app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json({message: 'hola mundo'})
})
app.get('/movies', (req, res) => {
    res.json(movies)
})
app.get('/movies', (req, res) => {
    const { genre } = req.query
    if ( genre) {
        const filteredMovies = movies.filter(
                                              // comparacion de filtros mayuscula y minuscula 
            movie => movie.genre.some(g => g.toLowerCase()=== genre.toLocaleLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

//path to reged convierte en expresiones regulares 
app.get('/movies/:id',(req, res)=>{
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)
        res.status(404).json({ message: 'Movie not found'})
})

app.post('/movies' ,(req, res)=>{

    const result = validarMovie(req.body)

    if (resultado.error) {

        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
 
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }


    movies.push(newMovie)
    res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT,()=>{
    console.log('server escuchando en el puerto http://localhost:1234') 
})