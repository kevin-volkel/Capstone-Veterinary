const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const MediaModel = require("../models/MediaModel");
const LogModel = require('../models/LogModel');
const UserModel = require("../models/UserModel");

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

const getMedia = async (req, res) => {
  try{
    let media = await MediaModel.find().populate("user");

    if(!media.length) return res.status(200).json(null);

    return res.status(200).json(media[0]);
  }catch(error){
    console.log(error);
    return res.status(500).send("error at getMedia")
  }
}

const changeMedia = async(req, res) => {
  const {userId} = req.user;
  if (!userId) return res.status(404).send("no user with that ID");

  const {
    media,
    type
  } = req.body;

  // console.log(`${media} media`);
  // console.log(`${type} type`)

  try{
    const oldMedia = await MediaModel.findOne();
    // console.log(`${oldMedia} oldMedia`);

    if(oldMedia !== null){
      await oldMedia.remove();
    }

    const newMedia = await new MediaModel({media, type}).save();
    const mediaCreated = await MediaModel.findById(newMedia._id).populate("user");

    const user = await UserModel.findById(userId);

    await LogModel.create({
      user: userId,
      action: 'changed adoption media',
      details: `${user.name} changed the adoption ${type}`
    })

    return res.status(200).json(mediaCreated);
  }catch(error){
    console.log(error);
    return res.status(500).send('error at changeMedia')
  }
}

module.exports = { uploadProfilePic, uploadPics, uploadVids, getMedia, changeMedia };
