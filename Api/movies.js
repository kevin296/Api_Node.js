const z = require('zod')


const movieSchema = z.object({
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
        invalid_type_error: 'movie erqueride enum gnre'
    }
    ))
})


function validateMovie (object){
    return movieSchema.safeParse(object)
}
module.exports ={
    validateMovie
}