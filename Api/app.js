const express =require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const z = require('zod')





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
    const movieShema = z.object({
        title: z.string({
            invalid_type_error: 'movie title must be a string',
            required_error: ' movie title is requiered'
        }),
        year:z.number().int().min(1900).max(2024),
        director: z.string(),
        duration: z.number().int().positive(),
        rate: z.number().min(0).max(10),
        poster: z.string().url({
            message: 'Poster must be a valid URL'
        }),
        GENRE: z.array(z.enum(
        ['Action','Adventure','Comedy','Drama','Fantasy','Horror','Thriller','Sci-Fi'],{
            required_error: 'movie gnre is requerid',
            invalid_type_error: 'movie erqueride'
        }
        ))

    })
    const { title,
            genre,
            year,
            director,
            duration,
            rate,
            poster
    } = req.body

    const newMovie = {
        id: crypto.randomUUID(),
        title,
            genre,
            year,
            director,
            duration,
            rate : rate ?? 0,
            poster
    }


    movies.push(newMovie)
    res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT,()=>{
    console.log('server escuchando en el puerto http://localhost:1234') 
})