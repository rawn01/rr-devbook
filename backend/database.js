const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected to the database.."))
    .catch((ex) => {
        console.error(ex.message);
        process.exit(1);
    });    
}

module.exports = connect;