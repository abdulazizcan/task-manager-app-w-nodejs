const connectDB = require('./db/connect')
const express = require('express');
const tasks = require('./api/routes/tasks');
require('dotenv').config()

const app = express();

//middleware
app.use(express.static('public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen
    } catch (error) {

    }
}
start()

app.listen(process.env.PORT, () => {
    console.log('example log listening on Port ' + process.env.PORT)
    console.log('../frontend')

});


