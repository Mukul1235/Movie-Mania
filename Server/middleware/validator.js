const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const genres = require("../genres");

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is missing"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is missing"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.validateMovie = [
  check("title").trim().isEmpty().withMessage("Title is missing"),
  check("storyline").trim().isEmpty().withMessage("StoryLine is Important!"),
  check("languages").trim().isEmpty().withMessage("languages is Important!"),
  check("releaseDate").isDate().withMessage("Release Date is missing"),
  check("type").trim().isEmpty().withMessage("type is missing"),
  check("status")
    .isIn(["public", "private"])
    .withMessage("Movie status must be public or private"),
  check("genres")
    .isArray()
    .withMessage("Genres must be an array of strings")
    .custom((value) => {
      for (let g in value) {
        if (!genres.includes(g)) throw Error("Invalid Genres");
      }
      return true;
    }), //in validator package we have custom validator also in which we can add our own rules to check validator
  check("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be array or string")
    .custom((tags) => {
      for (let i of tags) {
        if (typeof i !== "string") throw Error("Tags must be array of strings");
      }
      return true;
    }),
  check("casts")
    .isArray()
    .withMessage("casts must be array of objects")
    .custom((casts) => {
      for (let i of casts) {
        if (!isValidObjectId(i.actor)) throw Error("invalid cast id inside casts");
        if (!casts.rolesAs?.trim())
          throw Error("roleAs is missing inside the cast");
        if (typeof leadActor !== "Boolean")
          throw Error(
            "only accepted boolean value inside leadActor inside casts"
          );
      }
      return true;
    }),
  check("trailer")
    .isObject()
    .withMessage("trailer must be any object with url and public_id")
    .custom((url, public_id) => {
      try {
        const result = new URL(url);
        if (!result.protocol.includes("https"))
          throw Error("Trailer url is invalid");
        const arr = result.split("/");
        const publicId = arr[arr.length - 1].split(".")[0];
        if (publicId != public_id) throw Error("Public id is invalid");
        return true;
      } catch (e) {
        throw Error("Trailer url is invalid");
      }
    }),
  // check("poster").custom((_, req) => {
  //   try {
  //     if (!req.file) throw Error("Poster file is missing");
  //   } catch (e) {}
  // }),
];
exports.actorValidator = [
  check("name").trim().not().isEmpty().withMessage("Actor name is missing"),
  check("about").trim().not().isEmpty().withMessage("About is required field"),
  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Gender is required field"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  // console.log(error);
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
