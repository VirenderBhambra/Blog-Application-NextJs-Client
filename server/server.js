const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
// connection to the mongodb database
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose
      .connect(process.env.URI, clientOptions)
      .then(() =>
        console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
        )
      );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

app.get("/", async (request, response) => {
  response.send({
    message: "get operation",
  });
});

app.post("/post", (request, response) => {
  response.send({
    message: "posted",
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
