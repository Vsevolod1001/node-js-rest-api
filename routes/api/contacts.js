const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const product = await getContactById(contactId);
    if (!product) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const { name, email, phone } = req.body;
    const addUser = await addContact(name, email, phone);

    res.status(201).json(addUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const product = await removeContact(contactId);
    if (!product) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const { name, email, phone } = req.body;
    const { id } = req.params;
    const updateUser = await updateContact(id, name, email, phone);
    if (!updateUser) {
      res.status(404).json({ message: "not found" });
    } else {
      res.status(201).json(updateUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
