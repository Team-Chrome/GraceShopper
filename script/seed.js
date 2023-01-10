"use strict";

const {
  db,
  models: { User, Cart, Product, CartItem, Transaction },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");

    // Creating Users
    const users = await Promise.all([
      User.create({ email: "cody@gmail.com", password: "123" }),
      User.create({ email: "murphy@gmail.com", password: "123" }),
    ]);

    const products = await Promise.all([
      Product.create({
        name: "Pike Place Roast",
        imageUrl: "./splashPagePictures/1.jpg",
        roaster: "Starbucks",
        origin: "Blend",
        description: " A medium roast with notes of cacao and rich praline.",
        price: 11.99,
        quantity: 2,
      }),
      Product.create({
        name: "Homestead",
        imageUrl: "./splashPagePictures/2.jpg",
        roaster: "Stumptown Coffee Roasters",
        origin: "Blend",
        description:
          " A direct trade medium roast with notes of candied and milk chocolate.",
        price: 12.99,
        quantity: 4,
      }),
      Product.create({
        name: "Chocolate Cherry Cordial",
        imageUrl: "./splashPagePictures/3.jpg",
        roaster: "Christopher Bean Coffee",
        origin: "Blend",
        description:
          " A flavored light medium roast with notes of cacao and rich praline",
        price: 9.99,
        quantity: 1,
      }),
      Product.create({
        name: "French Roast",
        imageUrl: "./splashPagePictures/4.jpg",
        roaster: "Peet's Coffee",
        origin: "Blend",
        description:
          "A rich, full bodied, dark roast with notes of Dark Chocolate, Smoke, Burnt Sugar.",
        price: 11.99,
        quantity: 2,
      }),
      Product.create({
        name: "House Blend",
        imageUrl: "./splashPagePictures/2.jpg",
        roaster: "Starbucks",
        origin: "Blend",
        description: "A medium roast with notes of toffee and dusted cacao.",
        price: 11.99,
        quantity: 2,
      }),
    ]);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
    return {
      users: {
        cody: users[0],
        murphy: users[1],
      },
    };
  } catch (error) {
    console.error(error);
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
