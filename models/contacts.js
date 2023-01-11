const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
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

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const ind = contacts.findIndex((item) => item.id === id);
  if (ind !== -1) {
    contacts[ind].name = name;
    contacts[ind].email = email;
    contacts[ind].phone = phone;
    await fs.writeFile(filePath, JSON.stringify(contacts));
    return contacts[ind];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
