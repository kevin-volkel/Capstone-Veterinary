const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const uploadProfilePic = async (req, res) => {
  try {
    const src = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: 'Veterinary'
    });
    fs.unlinkSync(req.files.image.tempFilePath); 
    return res.status(200).json({src: src.secure_url})
  } catch (err) {
    console.log(err)
    return res.status(500).send('Cloudinary Upload Error')
  }
}

module.exports = { uploadProfilePic };
