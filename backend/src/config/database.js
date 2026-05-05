const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://namastedev:nIl7y133A1Abgk86@namastenode.ziy6n6x.mongodb.net/devTinder"
    );
}

module.exports = connectDB;