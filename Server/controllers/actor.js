const { isValidObjectId } = require("mongoose");
const cloudinary = require("../cloud/index");
const Actor = require("../models/actor");
const {
  sendError,
  uploadImageToCloud,
  formatActor,
} = require("../utils/helper");

exports.create = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const newActor = new Actor({ name, about, gender });
  // console.log(file);
  if (file) {
    const { url, public_id } = await uploadImageToCloud(file);

    newActor.avatar = { url, public_id };
  }
  await newActor.save();
  res.json({ actor: formatActor(newActor) });
};

exports.updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { ActorId } = req.params;
  const { file } = req;
  if (!isValidObjectId(ActorId)) return sendError(res, "Invalid request");
  const actor = await Actor.findById(ActorId);
  if (!actor) return sendError(res, "Invalid request,record not found");
  const public_id = actor.avatar?.public_id;

  //removing the existing actor avatar and creating a new one
  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result != "ok")
      return sendError(res, "Could not find Image from cloud");
  }

  //adding a new image if initially dont exist
  if (file) {
    const { url, public_id } = await uploadImageToCloud(file);
    actor.avatar = { url, public_id };
  }
  actor.name = name;
  actor.about = about;
  actor.gender = gender;
  await actor.save();
  res.json(formatActor(actor));
};

exports.removeActor = async (req, res) => {
  const { ActorId } = req.params;

  if (!isValidObjectId(ActorId)) return sendError(res, "Invalid request");
  const actor = await Actor.findById(ActorId);
  if (!actor) return sendError(res, "Invalid request,record not found");
  const public_id = actor.avatar?.public_id;

  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result != "ok")
      return sendError(res, "Could not find Image from cloud");
  }
  await Actor.findByIdAndDelete(ActorId);
  res.json({ message: "Record removed successfully" });
};

exports.searchActor = async (req, res) => {
  const { query } = req;

  const result = await Actor.find({ $text: { $search: `"${query.name}"` } });
  
  const actor = result.map((actor) => formatActor(actor));
  // console.log(actor)
  res.json(formatActor({ results: actor }));
  // res.json({actor})
};

exports.getLatestActor = async (req, res) => {
  const result = await Actor.find().sort({ createdAt: -1 }).limit(1); //-1 ->descending order   // 1--->accending order
  const actor = result.map((actor) => formatActor(actor));
  res.send(formatActor(actor));
};

exports.getSingleActor = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendError(res, "Invalid request");
  const actor = await Actor.findById(id);
  if (!actor) return sendError(res, "Invalid request ,actor not found");
  res.json(formatActor(actor));
};
