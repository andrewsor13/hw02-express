const Contact = require("./schemas/ContactSchema.js");

const getAllContacts = async () => {
  return Contact.find();
};

const createContact = async (name, email, number, favorite) => {
  return Contact.create({ name, email, number, favorite });
};

const deleteContact = async (id) => {
  return Contact.deleteOne({ _id: id });
};

const updateContact = async (id, favoriteUpdate) => {
  return Contact.findByIdAndUpdate(id, { $set: favoriteUpdate }, { new: true });
};

module.exports = {
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
};
