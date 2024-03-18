const http = require("http")

const HOSTNAME = "localhost"
const PORT = 8900

const server = http.createServer((req,res) => {
    res.end("Akinloye Bankole")
})

server.listen(PORT, HOSTNAME, ()=> {
    console.log(`server started succesfully at http://${HOSTNAME}:${PORT}`)
})