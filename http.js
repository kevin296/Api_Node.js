const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end('bienvenido a mi página de inicio')
  
  } else if (req.url === '/imagen-super-bonita.png') {
    res.setHeader('Content-Type','image/png')
    fs.readFile('./placa.png',(err, data)=> {
      if(err) {
        res.statusCode = 500
        res.end('500 internal srver error')
      }else{
        res.setHeader('Content-Type','image/png')
        res.end(data)
      }
    })
  } else if (req.url==='/contactos') {
    res.statusCode = 200 
    res.end('bienvenido a mis Contactos')
  } else{
    res.statusCode = 404
    res.end('404')
  }

}

// const server = http.createServer((req, res) => {
//   console.log('request received', req.url);
//   res.end('hola mundo');
// });

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server escuchando en el puerto http://localhost:${desiredPort}`)
})
