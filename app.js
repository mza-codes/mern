require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const helmet = require('helmet');

// Database Connection
const connectDB = async () => {
    await mongoose.connect(process.env.NEWDB, {
        // useCreateIndex: true,
        // useFindAndModify: false,
        // disabled as it clearly shows error: <> MongoParseError: options usecreateindex, usefindandmodify are not supported </>
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => console.log('DB Connection Success !'))
        .catch((err) => {
            console.log('DB Connection Failed', err);
            process.exit(0);
        });
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());


// Routes
app.use('/api/v1/auth', require('./routes/auth'));
// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server Started On PORT: ${PORT}`);
});


// app.use('/', (req, res) => { res.send('Working Done !') });