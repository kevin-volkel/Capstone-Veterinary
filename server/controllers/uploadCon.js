const fs = require("fs");
const { isArray } = require("util");
const cloudinary = require("cloudinary").v2;

const uploadProfilePic = async (req, res) => {
  try {
    const src = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: "Veterinary",
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(200).json({ src: src.secure_url });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Cloudinary Upload Error @ uploadProfilePic");
  }
};

const uploadPics = async (req, res) => {
  const { image } = req.files;
  let sources = [];

  if (!Array.isArray(image)) {
    //! one image
    try {
      const src = await cloudinary.uploader.upload(image.tempFilePath, {
        resource_type: "image",
        use_filename: true,
        folder: "Veterinary",
      });
      fs.unlinkSync(image.tempFilePath);
      sources.push(src.secure_url);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Cloudinary Upload Error @ uploadPics");
    }
  } else {
    //! multiple images.
    try {
      for (i of image) {
        let src = await cloudinary.uploader.upload(i.tempFilePath, {
          resource_type: "image",
          use_filename: true,
          folder: "Veterinary",
        });
        fs.unlinkSync(i.tempFilePath);
        sources.push(src.secure_url);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Cloudinary Upload Error @ uploadPics");
    }
  }
  return res.status(200).json({ sources });
};

const uploadVids = async (req, res) => {
  const { video } = req.files;
  let sources = [];

  if (!Array.isArray(video)) {
    //! one video
    try {
      const src = await cloudinary.uploader.upload(video.tempFilePath, {
        resource_type: "video",
        use_filename: true,
        folder: "Veterinary",
      });
      fs.unlinkSync(video.tempFilePath);
      sources.push(src.secure_url);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Cloudinary Upload Error @ uploadVids");
    }
  } else {
    //! multiple videos.
    try {
      for (v of video) {
        let src = await cloudinary.uploader.upload(v.tempFilePath, {
          resource_type: "video",
          use_filename: true,
          folder: "Veterinary",
        });
        fs.unlinkSync(v.tempFilePath);
        sources.push(src.secure_url);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Cloudinary Upload Error @ uploadVids");
    }
  }
  return res.status(200).json({ sources });
};

module.exports = { uploadProfilePic, uploadPics, uploadVids };
