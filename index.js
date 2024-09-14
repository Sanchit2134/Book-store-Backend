const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bookRoutes = require('./routes/BookRoutes')
const userRoutes = require('./routes/UserRoutes')
const app = express()

app.use(cors())  //middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
dotenv.config()


const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL;

// connect to MongoDB
try {
    mongoose.connect(URL);
    console.log("Connected to mongoDB");

}
catch (error) {
    console.log("Error", error);
}

//defining routes
app.use('/book',bookRoutes)
app.use('/user',userRoutes)

app.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT} `)
})