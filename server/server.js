require('dotenv').config()

var cors = require('cors');
var express = require('express');
var app = express();
var userRoutes = require('./routes/userRoutes');
var fileRoutes = require('./routes/fileRoutes');
var multer = require('multer');
app.use(cors())
app.use('/uploads', express.static('uploads')); 
app.use('/api/users/', userRoutes)
app.use('/api/files/', fileRoutes)

app.listen(process.env.API_PORT, () => {
    console.log(`Dirango Media Wizard API Server is running on port ${process.env.API_PORT}`)
});