const express = require("express");
const cors = require("cors");
const magebankOperations = require("./routes/db_routes");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
app
  .listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  })
  .on("error", (err) => {
    console.log(`Error Code: ${err}`);
  });

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

app.get("/allImages", async (req, res) => {
  const allImages = await magebankOperations
    .getAllImages()
    .then(console.log())
    .catch(console.error);
  res.status(200).json({ allImages });
});

app.delete("/allImages", async (req, res) => {
  await magebankOperations
    .deleteAllImages()
    .then(console.log)
    .catch(console.error);
  res.status(200).json({ success: true });
});

app.get("/allImages/:keyword", async (req, res) => {
  await magebankOperations
    .getImageFromKeyword(req.params.keyword)
    .then((image) => {
      res.status(200).json({ image });
    })
    .catch(console.error);
});

app.get("/image/:img_id", async (req, res) => {
  await magebankOperations
    .getImageFromImageID(req.params.img_id)
    .then((image) => {
      res.status(200).json({ image });
    })
    .catch(console.error);
});

app.post("/image", async (req, res) => {
  await magebankOperations
    .postAnImage(req.query.filename, req.query.keywords, req.query.address)
    .then(console.log)
    .catch(console.error);
  res.status(201).json({ success: true });
});

app.delete("/image/:img_id", async (req, res) => {
  await magebankOperations
    .deleteAnImage(req.params.img_id)
    .then(console.log)
    .catch(console.error);
  res.status(201).json({ success: true });
});
