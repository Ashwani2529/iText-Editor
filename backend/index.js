require("dotenv").config();
const connectToMongo = require("./db.js");
var express = require("express");
var cors=require('cors')
const app = express();
const port = process.env.PORT || 5000;
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors(
  {
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  }
))
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("/", (req, res) => {
  res.send("Backend Live");
});

connectToMongo()
  .then(() => {
    app.listen(port, () => console.log(`iText API listening on port ${port}`));
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
