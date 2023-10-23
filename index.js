import express from 'express'
import 'dotenv/config'
import MajorRouter from './routes/major.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/', MajorRouter);


app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`))