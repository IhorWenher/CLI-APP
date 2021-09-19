const { program } = require("commander");
const contactsOperations = require("./contacts");

/* const { getCurrentDate } = require("./dateUtils");
global.ger = "qeqed";
console.log(getCurrentDate());
console.log(__dirname);
console.log(__filename);

const [, , a, b] = process.argv;

console.log(parseInt(a), parseInt(b)); */

/* (async() => {
    try {
        const data = await fs.readFile("./data.txt", "utf-8");
        console.log(data);

        const newContent = `${data} cvgbfrbed`;

        await fs.writeFile("./data1.txt", newContent, "utf-8");

        await fs.rename("./data1.txt", "./data-rename.txt");

        await fs.unlink("./dfgrg.txt");
    } catch (err) {
        console.error(err);
    }
})(); */
/* 
const newContact = {
    name: "Den Malcolm",
    email: "den@ukr.net",
    phone: "(096) 840-6685",
}; */

/* (async() => {
    try {
        const list = await contactsOperations.listContacts();
        console.table(list);

        const get = await contactsOperations.getContactById(3);
        if (!get) {
            throw new Error(`Can not find contact with id ${3}`);
        }
        console.table(get);

        const add = await contactsOperations.addContact(newContact);
            console.table(add);

            const remove = contactsOperations.removeContact(11);
            if (!remove) {
                throw new Error(`Can not find contact with id ${11}`);
            }
            console.log(`Contact with id: ${11} was deleted`);
    } catch (err) {
        console.error(err);
    }
})(); */

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

(async({ action, id, name, email, phone }) => {
    console.log(action);
    switch (action) {
        case "list":
            const list = await contactsOperations.listContacts();
            console.table(list);
            break;

        case "get":
            const contact = await contactsOperations.getContactById(id);
            if (!contact) {
                throw new Error(`Can not find contact with id ${id}`);
            }
            console.table(contact);
            break;

        case "add":
            const newContact = {
                name,
                email,
                phone,
            };
            const add = await contactsOperations.addContact(newContact);
            console.table(add);
            if (!add) {
                throw new Error(`Can not add contact`);
            }
            console.log(`Contact added successful `);
            break;

        case "remove":
            const remove = contactsOperations.removeContact(id);
            if (!remove) {
                throw new Error(`Can not find contact with id ${id}`);
            }
            console.log(`Contact with id: ${id} was deleted`);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
})(options);