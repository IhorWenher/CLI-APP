const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
};

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const id = Number(contactId);
    const idx = Number(contacts.findIndex((item) => item.id === id));
    if (idx === -1) {
        return null;
    }

    return contacts[idx];
};

const addContact = async(contactData) => {
    const contacts = await listContacts();
    const newId = contacts[contacts.length - 1].id + 1;
    const newContact = { id: newId, ...contactData };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
};

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const id = Number(contactId);
    const idx = Number(contacts.findIndex((item) => item.id === id));

    if (idx === -1) {
        return null;
    }

    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return true;
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};