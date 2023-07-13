const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const mongoURI =
  "mongodb+srv://Ashwani:8WOUIgsGWvAxPj4X@itext-editor.7gtbgbr.mongodb.net/Users";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to mongoDB");
  });
};
module.exports = connectToMongo;