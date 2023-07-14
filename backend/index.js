const connectToMongo = require("./db.js");
var express = require("express");
var cors=require('cors')
connectToMongo();
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("/", (req, res) => {
  res.send("Prashant Chutiya");
});

app.listen(port, () => {
 
});