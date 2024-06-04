const fs = require("fs").promises;
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "..", "db", "data.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Eroare la citirea fisierului", error);
    throw error;
  }
}

async function getContact(id) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id.toString() === id);
    return contact;
  } catch (error) {
    console.error("Eroare la citirea fisierului", error);
    throw error;
  }
}
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: nanoid(), name: name, email: email, phone: phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contactul a fost adaugat.");

    return contacts;
  } catch (error) {
    console.error("Eroare la adaugarea contactului", error);
    throw error;
  }
}

async function deleteContact(id) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    contacts = contacts.filter((contact) => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.error("Eroare la stergerea contactului", error);
    throw error;
  }
}

async function updateContact(id, body) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === id);

    if (contact) {
      Object.assign(contact, body);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contact;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Eroare la actualizarea contactului", error);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
};
