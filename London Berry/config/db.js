const mongoose = require("mongoose")

const connectDB = async ()=>{
try {
      const conn = await mongoose.connect(process.env.MongoDb);
      console.log(`Connected to MongoDB Database ${conn.connection.host}`.bgMagenta.white);
} catch (error) {
      console.log(error);
}
};

module.exports = { connectDB };