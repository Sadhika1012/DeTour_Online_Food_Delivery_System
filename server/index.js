//required modules
const express  = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const usersRoute = require('./routes/users');
const foodsRoute = require('./routes/foods');
const ordersRoutes = require('./routes/orders');

dotenv.config();

//middleware connection
const app = express();
app.use(cors()); 
app.use(express.json({ limit: '50mb' })); // Example limit of 50mb


const MONGO_URL = process.env.MONGO_URL

//connecting to mongodb atlas
mongoose.connect(MONGO_URL, {useNewUrlParser:true},{useUnifiedTopology:true}).then(
    () => {
        console.log("MongoDB connection successful");
        const db = mongoose.connection;
        db.once("open", () => {
            console.log("MongoDB database connection established successfully");
            
        });
    }
).catch((err) => console.log(err));

//routes
app.use('/users', usersRoute);
app.use('/foods', foodsRoute);
app.use('/api/orders', ordersRoutes);
//connecting to server port 
app.listen(8800, ()=>{
    console.log('Backend running and server up and running at 8800!');
})