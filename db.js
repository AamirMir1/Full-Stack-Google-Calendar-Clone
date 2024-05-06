const mongoose = require("mongoose");

const connectMongodb = async () => {
  try {
    const { connection } = await mongoose.connect("mongodb://localhost:27017");
    console.log(`Mongodb is connected with ${connection.host}`);
  } catch (error) {
    console.log(`Failed to connect mongodb: ${error}`);
  }
};

module.exports = { connectMongodb };
