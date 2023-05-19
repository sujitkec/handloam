const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const adminRoutes = require('./router/admin')

const app = express();

dotenv.config()
app.use(cors({
    origin: "https://sujitkec.github.io/",
    optionsSuccessStatus: 200
}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.DB).then(() => {
    console.log('Db connection open')
}).catch(err => {
    console.log(err.message, 'oops err');
});

app.use(adminRoutes)

app.get('/', (req, res) => {
    res.send("loam backend")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`)
})
