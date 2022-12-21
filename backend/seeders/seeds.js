const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Inventory = require('../models/Inventory')
const Reminder = require('../models/Reminder')
const Notification = require('../models/Notifications')
const Consumable = require('../models/Consumable')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// const NUM_SEED_USERS = 10;

const users = [];
const items = [];
const reminders = [];

//DEMO USERS
const demo = new User ({
    username: 'demouser',
    email: 'demo@user.io',
    phone: '0000000000',
    hashedPassword: bcrypt.hashSync('password', 10)
})
users.push(demo)

const justin = new User ({
    username: 'justin',
    email: 'reBindr.emails@gmail.com',
    phone: '8609198745',
    hashedPassword: bcrypt.hashSync('password', 10)
})
users.push(justin)

const jimmy = new User ({
    username: 'jimmy',
    email: 'jimmy@user.io',
    phone: '0000000000',
    hashedPassword: bcrypt.hashSync('password', 10)
})
users.push(jimmy)

const ming = new User ({
    username: 'ming',
    email: 'ming@user.io',
    phone: '0000000000',
    hashedPassword: bcrypt.hashSync('password', 10)
})
users.push(ming)

//DEMO INVENTORY
const oven = new Inventory ({
    uploader: justin,
    name: "oven",
    model: "843rqy38fqur",
    notes: "oven light is on the right",
    user_manual: "https://progress.appacademy.io/",
    consumables: []
})
oven.consumables.push(
    new Consumable({
        consumable_name: "light bulb",
        link: "https://www.amazon.com/Oven-Light-Bulbs-Refrigerator-Incandescent/dp/B07N6955M6"
    })
)
items.push(oven)

const ovenReminder = new Reminder ({
    item: oven,
    uploader: justin,
    title: "replace oven light",
    date: new Date('2023/06/06/15:30:00:000'),
    repeat: '1 year',
    notifications: []
})
reminders.push(ovenReminder)

//ADDITIONAL USERS
// for (let i = 1; i < NUM_SEED_USERS; i++) {
//     const firstName = faker.name.firstName();
//     const lastName = faker.name.lastName();
//     users.push(
//       new User ({
//         username: faker.internet.userName(firstName, lastName),
//         email: faker.internet.email(firstName, lastName),
//         hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
//       })
//     )
//   }

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

const insertSeeds = () => {
    console.log("Resetting db and seeding users...");

    User.collection.drop()
                .then(() => User.insertMany(users))
                .then(() => {
                    console.log("Done!");
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
                console.log("seeding inventory...")
    Inventory.collection.drop()
                .then(() => Inventory.insertMany(items))
                .then(() => {
                    console.log("Done!");
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
                console.log("seeding reminder...")
    Reminder.collection.drop()
                .then(() => Reminder.insertMany(reminders))
                .then(() => {
                    console.log("Done!");
                    mongoose.disconnect();
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
}

//dotenv node seeders/seeds.js         
