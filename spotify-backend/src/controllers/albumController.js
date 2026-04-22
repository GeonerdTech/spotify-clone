import { v2 as cloudinary } from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const imageUpload = await cloudinary.uploader.upload(req.file.path);

    const albumData = {
      name: req.body.name,
      desc: req.body.desc,
      bgColour: req.body.bgColour,
      image: imageUpload.secure_url,
    };

    const album = new albumModel(albumData);
    await album.save();

    res.json({ success: true, message: "Album Added" });

  } catch (error) {
    console.log("ERROR:", error);
    res.json({ success: false, message: "Upload failed" });
  }
};

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.json({ success: true, albums: allAlbums });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Album Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

export { addAlbum, listAlbum, removeAlbum };