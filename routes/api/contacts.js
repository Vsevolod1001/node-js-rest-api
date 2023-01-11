const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
} = require("../../models/contacts");

const router = express.Router();

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
  res.json({ message: "template message" });
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

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
