const knex = require("../database/schema");

const getAllImages = () => {
  return knex("images")
    .select("*")
    .then(console.log("getAllImages: Success!"))
    .catch(console.error);
};

const getImageFromImageID = (img_id) => {
  return knex("images")
    .select("*")
    .where("img_id", img_id)
    .then(console.log("getImageFromImageID: Success!"))
    .catch(console.error);
};

const getImageFromKeyword = (keyword) => {
  return knex("images")
    .select("*")
    .where("keywords", "like", `%${keyword}%`)
    .orWhere("filename", "like", `%${keyword}%`)
    .then(console.log("getImageFromKeyword: Success!"))
    .catch(console.error);
};

const postAnImage = (name, keywords, address) => {
  return knex("images")
    .insert({
      filename: name,
      keywords: keywords,
      address: address,
    })
    .then(console.log("postAnImage: Success!"))
    .catch(console.error);
};

const deleteAnImage = (id) => {
  return knex("images")
    .where("img_id", id)
    .del()
    .then(console.log("deleteAnImage: Success!"))
    .catch(console.error);
};

const deleteAllImages = () => {
  return knex("images")
    .del()
    .then(console.log("deleteAllImages: Success!"))
    .catch(console.error);
};

module.exports = {
  getAllImages,
  getImageFromImageID,
  getImageFromKeyword,
  postAnImage,
  deleteAnImage,
  deleteAllImages,
};
