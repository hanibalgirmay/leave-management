const express = require("express");
const cors = require('cors');
const env = require("dotenv");
const app = express();

env.config();
// Assign port
const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";

app.use(express.json());
app.use(cors())
//route
app.use('/api', require('./routes/api'));

app.listen(port, (err) => {
  console.log(`Listening on port ${port}`);
  if (dev) {
    console.log("Running in development mode");
  }
  if (err) {
    console.log(err);
  }
});
