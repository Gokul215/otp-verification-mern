import mongoose from "mongoose";

// import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js'

async function connect(){
    // mongoose.set('strictQuery', false);
    const url = ENV.URI;// Replace with your MongoDB connection string
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client=mongoose.connect(url, options)
.then(() => {
  
  console.log('Database connected successfully');
 

  
  // Perform database operations here

  // Close the connection when you're done
 
})
.catch((err) => {
  console.error('Error connecting to the database:', err);
});
return client;

//mongodb connection using in-memory server

    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();

    // mongoose.set('strictQuery', true)
    // const db = await mongoose.connect(getUri);
    // // const db = await mongoose.connect(ENV.ATLAS_URI);
    // console.log("Database Connected")
    // return db;
}

export default connect;