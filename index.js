const express = require('express');
require('dotenv').config()
const { userRouter } = require('./routes/user');
const { default: mongoose } = require('mongoose');
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const { creatorRouter } = require('./routes/creator');
const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/creator', creatorRouter)

async function start(){
    await mongoose.connect(MONGOOSE_URL)
    app.listen(PORT);
    console.log(`Server is running on ${PORT}`);
}
start();