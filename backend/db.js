const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

async function connectToMongo() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI is required. Add it to your backend environment before starting.");
  }
  await mongoose.connect(mongoURI);
  console.log("Connected to MongoDB");
}

module.exports = connectToMongo;
