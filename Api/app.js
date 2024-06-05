const express =require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validatePartialMovie } = require('./schemas/movies')
const cors = require('cors')





const app =express()
app.use(express.json())

app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:5580',
        'http://localhost:1234',
        'https://movies.com',
        'https://midu.dev'
      ]
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      }
  
      return callback(new Error('Not allowed by CORS'))
    }
  }))

app.disable('x-powered-by')

// app.get('/', (req, res) => {
//     res.json({message: 'hola mundo'})
// })
// app.get('/movies', (req, res) => {
//     res.json(movies)
// })

app.get('/movies', (req, res) => {
    const origin = req.header('origin' ||  !origin)

    if (ACCEPTED_ORIGINS.includes(origin)){
        res.header('Access-Control-Allow-Origin',  origin)
    }

    
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

    if (result.error) {

        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
 
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }


    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req,res)=> {
    const origin = req.header('origin' ||  !origin)

    if (ACCEPTED_ORIGINS.includes(origin)){
        res.header('Access-Control-Allow-Origin',  origin)
    }

    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id )
    if (movieIndex === -1){
        return res.status(404).json({message: 'movie not found'})
    }
    movie.splice(movieIndex,1)
    return res.json({ message : ' movie deleted'})



})

app.patch ('/movies/:id', (req,res)=> {
    const {id} = req.params
    const result = validatePartialMovie(req.body)
   
    const movieIndex = movies.findIndex(movie => movie.id === id )
    if (movieIndex === -1){
        return res.status(404).json({message: 'movie not found'})
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})


const PORT = process.env.PORT ?? 1234

app.listen(PORT,()=>{
    console.log('server escuchando en el puerto http://localhost:1234') 
})