const mongoose = require('mongoose');
const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = connectDB;

// mongoose.connect(process.env.MONGODB_URI,{});

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//   "" + process.env.DB_URL,
//   { },
//   () => { console.log("Connected to DB"); }
// )
//   } catch (error) {
//     console.error('Connection error:', error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// mongoose.connect(
//   "" + process.env.DB_URL,
//   { },
//   () => { console.log("Connected to DB"); }
// )



