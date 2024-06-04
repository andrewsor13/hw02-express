const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
} = require("../services/contacts.js");

const joi = require("joi");
const contactSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]+$/)
    .max(15)
    .required(),
});

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: "succes",
    code: 200,
    data: "Server is ok",
  });
  next();
});

router.get("/contacts", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: "succes",
      code: 200,
      data: { ...contacts },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: "Eroare la preluarea contactelor",
    });
  }
});

router.get("/contacts/:id", async (req, res, next) => {
  try {
    contactId = req.params.id;
    const contact = await getContact(contactId);
    if (contact) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        data: "Contact nu a fost găsit",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: "Eroare la preluarea contactului",
    });
  }
});

router.post("/contacts", async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
    });
  }
  const { name, email, phone } = req.body;

  try {
    const data = await addContact(name, email, phone);
    res.status(201).json({
      status: "succes",
      code: 201,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: "Eroare la adaugarea contactului",
    });
  }
});

router.delete("/contacts/:id", async (req, res, next) => {
  try {
    const contactId = req.params.id;
    await deleteContact(contactId);
    res.status(200).json({
      status: "succes",
      code: 200,
      message: "Contactul a fost sters.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: "Eroare la stergerea contactului",
    });
  }
});

router.put("/contacts/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.details[0].message,
      });
    }
    const contactId = req.params.id;
    if (req.body) {
      const body = req.body;
      await updateContact(contactId, body);
      if (updateContact) {
        res.status(200).json({
          status: "success",
          code: 200,
          data: updateContact,
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          data: "Contact nu a fost găsit",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: "Eroare la editarea contactelor",
    });
  }
});

module.exports = router;
