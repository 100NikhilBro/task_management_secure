const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Successfully connected");
    } catch (e) {
        console.log("Connection Failed");
        console.error(e);
        process.exit(1);
    }
};

module.exports = dbConnect;