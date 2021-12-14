//REQUIRE MONGODB
const mongoClient = require('mongodb').MongoClient

const url = "mongodb://127.0.0.1:27017"

var user;

//connecting to mongodb server
const dbConnection = async () =>{
    user = await mongoClient.connect(url, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
}

//connecting to database
const getConnection = (name)=>{
    const database = user.db(name)
    return database
}


module.exports = {
    dbConnection,
    getConnection,
}


