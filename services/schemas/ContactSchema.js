const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex =
  /^(?:\+?\d{1,4}[-.\s]?)?(?:\(\d{1,3}\)[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return emailRegex.test(v);
      },
      message: (props) => `${props.value} nu este un email valid!`,
    },
  },
  number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return phoneRegex.test(v);
      },
      message: (props) => `${props.value} nu este un numar valid!`,
    },
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
