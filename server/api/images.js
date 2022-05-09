const router = require("express").Router();
const { uploadFile, getFileStream } = require("./s3");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

router.get("/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

router.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;

  // apply filter
  // resize

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  res.send({ imagePath: `/api/images/${result.Key}` });
});

module.exports = router;
