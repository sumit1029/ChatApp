const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/chitchatuser?directConnection=true&tls=false&readPreference=primary"

const connectToMongo = async() =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://sumitnaveensk029:chitsumitchat@cluster0.wkx7iuj.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB connected successfully to ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error: ${error.message}`)
        process.exit();
    }
}

module.exports = connectToMongo;