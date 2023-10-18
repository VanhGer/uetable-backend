import express from 'express'
import 'dotenv/config'
const app = express();

const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/vanhg', (req, res) => {
    res.send("vanhg")
})


app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`))