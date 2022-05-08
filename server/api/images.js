const router = require("express").Router();
const { uploadFile, getFileStream } = require('./s3')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


router.get('/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
})

router.post('/', upload.single('image'), async (req, res) => {
    console.log('req.file')
    const file = req.file
    console.log(file)
  
    // apply filter
    // resize 
  
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log('result',result)
    res.send({imagePath: `/api/images/${result.Key}`})
})

module.exports = router;