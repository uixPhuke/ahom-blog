const express = require('express') //require express
const app = express()
require('dotenv').config() //for env
const cookieParser = require('cookie-parser') 
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const cors = require("cors");
 
app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  })
);


const PORT = process.env.REACT_APP_PORT
app.use(express.json()) //Middleware to parse JSON
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))

app.get('/', (req, res) => {
    res.json({msg: "The Ahom Server"})
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})

//conncct MONGODB
const URI = process.env.MONGO_DB_URL

mongoose.connect(URI).then(() => {
    console.log('MongoDB is Connected')
}).catch(err=>console.log(err))


//Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentsRoutes");
const likeRoutes = require("./routes/likeRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const tagRoutes = require("./routes/tagRoutes");
// const subscriberRoutes = require("./routes/subscriberRoutes");

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', categoryRoutes);
app.use("/api", commentRoutes);
app.use('/api', likeRoutes);
app.use('/api', mediaRoutes);
app.use('/api', notificationRoutes);
app.use('/api', tagRoutes);
// app.use('/api', subscriberRoutes);
