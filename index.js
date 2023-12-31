const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(express.json());

//// dot env 
const dotenv = require('dotenv');
dotenv.config()

/// apply cors
app.use(cors());

//// port and localUrl
const PORT = process.env.PORT || 3000;
const currentUrl = `${process.env.CURRENTURL}:${PORT}`;

//// db serevr from env
const cloudDB = process.env.databaseUrl
const localDB = process.env.MONGODB_URI

const dataB =   cloudDB ||  localDB

app.get('/', (req, res) => {
    res.send('hello there')
});

// Import routes
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
//// old news route
const newsUpdates = require('./routes/newsRoute');
const fixturesRoute = require('./routes/fixruresRoute');
const teamRoute = require('./routes/teamRoutes');
const trialTransfer = require('./routes/TRIALtrasnferRoute');
const newNewsUpdates = require('./routes/newNewsRoute');

// Routes middlewares
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
// old news middles ware
app.use('/api/newsold', newsUpdates);
app.use('/api/fixtures', fixturesRoute);
app.use('/api/team', teamRoute);
app.use('/api/trialtransfer', trialTransfer);
// new news middleware
app.use('/api/news', newNewsUpdates);





// Database connection
mongoose.connect(dataB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
/// db connection error
db.on('error', (error) => {
    console.error('Connection error:', error);
});
//// db connecrion status.Successful alert
db.once('open', () => {
    console.log('Connection to MongoDB successful!');
});
//// db connecrion status.failure  alert
db.once('close', () => {
    console.log('Connection to MongoDB disconnected.');
});




// app.get('/', (req, res) => {
//     res.send(`i am here at ${currencyUrl} & Db${dataB}`)
// })


app.listen(PORT, (req, res) => {
    console.log(`connected to PORT: ${PORT} using ${currentUrl}`)
})

