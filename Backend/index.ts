import app from './entry'

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.server.listen(3002, ()=> console.log('>> Listening on port(3002)'));