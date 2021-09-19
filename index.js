const { program } = require("commander");
const contactsOperations = require("./contacts");

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

(async({ action, id, name, email, phone }) => {
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

            console.log(`Contact added successfull!`);
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