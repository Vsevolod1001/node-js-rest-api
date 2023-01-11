const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  } else {
    return contact;
  }
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const ind = allContacts.findIndex((item) => item.id === contactId);

  if (ind !== -1) {
    const deleteContact = allContacts[ind];
    allContacts.splice(ind, 1);
    await fs.writeFile(filePath, JSON.stringify(allContacts));
    return deleteContact;
  }
  return null;
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
