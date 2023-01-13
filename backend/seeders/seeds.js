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

//SEED INVENTORY
const humidifier = new Inventory ({
    uploader: demo,
    name: "humidifier",
    model: "UFSIU5437",
    notes: "Hard water makes the filters go fast",
    user_manual: "https://www.target.com/c/humidifiers-home-appliances/-/N-5xtuj",
    consumables: []
})
humidifier.consumables.push(
    new Consumable({
        consumable_name: "filter",
        link: "https://www.lowes.com/pl/Humidifier-filters-Humidifiers-dehumidifiers-Heating-cooling/4294620972"
    })
)
items.push(humidifier)

const toothbrush = new Inventory ({
    uploader: demo,
    name: "toothbrush",
    models: "green",
    notes: "soft bristles",
    user_manual: "https://www.mouthhealthy.org/all-topics-a-z/brushing-your-teeth",
    consumables: []
})
toothbrush.consumables.push(
    new Consumable({
        consumable_name: "new toothbrush",
        link: "https://www.amazon.com/Colgate-Extra-Clean-Toothbrush-Count/dp/B00CC6XSSQ"
    })
)
items.push(toothbrush)

const oven = new Inventory ({
    uploader: demo,
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

const vacuum = new Inventory ({
    uploader: demo,
    name: "vacuum",
    model: "DJai394qt",
    notes: "it sucks",
    user_manual: "https://github.com/jimmyvo39",
    consumables: []
})
vacuum.consumables.push(
    new Consumable({
        consumable_name: "vacuum bags",
        link: "https://www.homedepot.com/b/Appliances-Appliance-Parts-Vacuum-Parts-Vacuum-Bags/N-5yc1vZ2fkon3f"
    })
)
items.push(vacuum)

const car = new Inventory ({
    uploader: demo,
    name: "jimmy's lemon",
    model: "pt cruiser",
    notes: "she gets from a to b...barely.",
    user_manual: "https://www.carfax.com/Used-Chrysler-PT-Cruiser_w189",
    consumables: []
})
car.consumables.push(
    new Consumable({
        consumable_name: "front tires",
        link: "https://www.goodyear.com/en-US/tires/chrysler/pt-cruiser/2007?cmpid=paidsearch:google:gy:tp-dsa&gclid=Cj0KCQiA-oqdBhDfARIsAO0TrGGxzBpS41XMsLdkXsKAlkJS2oc60DTw1fbwZnESNEfLp-sC-dcBy0caAnluEALw_wcB"
    })
)
car.consumables.push(
    new Consumable({
        consumable_name: "back tires",
        link: "https://www.goodyear.com/en-US/tires/chrysler/pt-cruiser/2007?cmpid=paidsearch:google:gy:tp-dsa&gclid=Cj0KCQiA-oqdBhDfARIsAO0TrGGxzBpS41XMsLdkXsKAlkJS2oc60DTw1fbwZnESNEfLp-sC-dcBy0caAnluEALw_wcB"
    })
)
items.push(car)

const airCon = new Inventory ({
    uploader: demo,
    name: "air conditioner",
    model: "afiu2feuwifj",
    notes: "in the window",
    user_manual: "https://www.ac-world.com/manuals/",
    consumables: []
})
airCon.consumables.push(
    new Consumable({
        consumable_name: "air conditioner window insulation",
        link: "https://ny.home.marketplace.nationalgrid.com/single-window-insulation-kit/?gclid=Cj0KCQiA-oqdBhDfARIsAO0TrGGl1sjAHlYrDYOJtC5g08Vs5_f0nmecttSK3QZCPaSCwTFVYQAMMagaAqvHEALw_wcB"
    })
)
items.push(airCon)

const brita = new Inventory ({
    uploader: demo,
    name: "brita water filter",
    model: "brita",
    notes: "brita",
    user_manual: "its a brita",
    consumables: []
})
brita.consumables.push(
    new Consumable({
        consumable_name: "brita filter",
        link: "https://www.amazon.com/s?k=brita+filters&gclid=Cj0KCQiA-oqdBhDfARIsAO0TrGEAXA8Dg_9q5MmrNKMByzmKiYDGWi8w-a205XyTnBB8ClBzrjLMAMcaAsFxEALw_wcB&hvadid=616991272283&hvdev=c&hvlocphy=9004358&hvnetw=g&hvqmt=e&hvrand=4439914971239557924&hvtargid=kwd-1683719940&hydadcr=24662_13611802&tag=googhydr-20&ref=pd_sl_af6htpjol_e"
    })
)
items.push(brita)

//SEED REMINDERS
const humidReminder = new Reminder ({
    item: humidifier,
    uploader: demo,
    title: "Swap out filter",
    date: new Date('2023/01/23/09:30:00:000'),
    repeat: '2 months',
    notifications: []
})
reminders.push(humidReminder)

const toothbrushReminder = new Reminder ({
    item: toothbrush,
    uploader: demo,
    title: "Buy a new toothbrush",
    date: new Date('2023/01/01/00:00:00:001'),
    repeat: '1 month',
    notifications: []
})
reminders.push(toothbrushReminder)

const ovenReminder = new Reminder ({
    item: oven,
    uploader: demo,
    title: "replace oven light",
    date: new Date('2023/02/06/15:30:00:000'),
    repeat: '1 year',
    notifications: []
})
reminders.push(ovenReminder)

const vacuumReminder = new Reminder ({
    item: vacuum,
    uploader: demo,
    title: "swap vacuum bag",
    date: new Date('2023/02/23/10:00:00:000'),
    repeat: '3 months',
    notifications: []
})
reminders.push(vacuumReminder)

const carReminder = new Reminder ({
    item: car,
    uploader: demo,
    title: "replace those tires",
    date: new Date('2023/01/11/16:23:12:123'),
    repeat: '10 years',
    notifications: []
})
reminders.push(carReminder)

const airConReminder = new Reminder ({
    item: airCon,
    uploader: demo,
    title: "get a/c seal before installation",
    date: new Date('2023/02/15/12:00:00:000'),
    repeat: '1 year',
    notifications: []
})
reminders.push(airConReminder)

const britaReminder = new Reminder ({
    item: brita,
    uploader: demo,
    title: "replace the brita filter!",
    date: new Date('2023/02/05/09:45:00:000'),
    repeat: '1 month',
    notifications: []
})
reminders.push(britaReminder)

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

const insertSeeds = async() => {
    console.log("Resetting db and seeding users...");

    await User.collection.drop()
                .then(() => User.insertMany(users))
                .then(() => {
                    console.log("Done!");
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
                console.log("seeding inventory...")
    await Inventory.collection.drop()
                .then(() => Inventory.insertMany(items))
                .then(() => {
                    console.log("Done!");
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
                console.log("seeding reminder...")
    await Reminder.collection.drop()
                .then(() => Reminder.insertMany(reminders))
                .then(() => {
                    console.log("Done!");
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });

    mongoose.disconnect();
}

//dotenv node seeders/seeds.js         
