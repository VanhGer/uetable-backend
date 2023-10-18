import express from 'express'
const app = express();

const PORT = 8000;
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/vanhg', (req, res) => {
    res.send("vanhg")
})

app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`))