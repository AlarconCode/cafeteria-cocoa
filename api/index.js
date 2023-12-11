import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";
import app from "./app.js";
const PORT = app.get('PORT')

// Conexión a la base de datos y al servidor express de manera asíncrona
const start = async () => {
  try {
    await mongoose.connect(
      process.env.BBDD_URL, {useNewUrlParser: true}
    );
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

// Conexión a la base de datos y al servidor express de manera no asíncrona
// mongoose.connect('mongodb+srv://root:983328@cluster0.ycodasm.mongodb.net/DB_Cocoa', {useNewUrlParser: true});
// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// })

// app.listen(PORT, () => {
  //   console.log(`Server is running on Port ${PORT}`)
  // }
  // );
  
