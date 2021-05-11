const express = require("express");
const cors = require("cors");
const magebankOperations = require("./routes/db_routes");
const app = express();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

aws.config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_REGION,
});

aws.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", aws.config.credentials.accessKeyId);
  }
});

// var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    dirname: "/",
    bucket: "magebank",
    filename: function (req, file, cb) {
      cb(null, { fieldName: file.filename });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

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

app.post("/image", upload.array("files[]"), function (req, res, next) {
  console.log(req["files[]"]);
  console.log(req.files);
  console.log(req.file);
  console.log(req.query);
  console.log(req.params);
  console.log(req.image);

  // const encoded = req.body.files.toString("base64");
  // console.log(encoded);
  if (!req.body.files) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    return res.send({
      success: true,
    });
  }
  // res.send("Successfully uploaded " + req.file.length + " files!");
});

// app.post("/image", upload.single("image"), async (req, res) => {
//   await magebankOperations
//     .postAnImage(req.query.filename, req.query.keywords, res.req.file.filename)
//     .then(console.log)
//     .catch(console.error);
//   res.status(201).json({ success: true });
// });

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 52428800 },
// });

// router.post('/image', upload.single(''), (req, res) => {
//   // req.file is the 'theseNamesMustMatch' file
//   s3.putObject({
//       Bucket: 'your-bucket-name',
//       Key: 'your-key-name',
//       Body: req.file.buffer,
//       ACL: 'public-read', // your permisions
//     }, (err) => {
//       if (err) return res.status(400).send(err);
//       res.send('File uploaded to S3');
// })

// app.post("/image", async (req, res) => {
//   console.log(req);
//   for (let index = 0; index < req.body.file.length; index++) {
//     const file = req.body.file[index];
//     const fileName = file.name;
//     const albumPhotosKey = encodeURIComponent("") + "/";

//     const photoKey = albumPhotosKey + fileName;

//     // Use S3 ManagedUpload class as it supports multipart uploads
//     const upload = new aws.S3.ManagedUpload({
//       params: {
//         Bucket: "magebank",
//         Key: photoKey,
//         Body: file,
//       },
//     });

//     const promise = upload.promise();

//     promise
//       .then((data) => {})
//       .catch((err) => {
//         return alert("There was an error uploading your photo: ", err.message);
//       });

//     await magebankOperations
//       .postAnImage(
//         req.query.filename,
//         req.query.keywords,
//         res.req.file.filename
//       )
//       .then(console.log)
//       .catch(console.error);
//     res.status(201).json({ success: true });
//   }
// });

app.delete("/image/:img_id", async (req, res) => {
  await magebankOperations
    .deleteAnImage(req.params.img_id)
    .then(console.log)
    .catch(console.error);
  res.status(201).json({ success: true });
});
