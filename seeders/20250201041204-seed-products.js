'use strict';
import { faker } from '@faker-js/faker';

const NUM_PRODUCTS = 50;

const products = [];
for (let i = 0; i < NUM_PRODUCTS; i++) {
  products.push({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price(1, 1000)),
    stock_quantity: faker.number.int({ min: 0, max: 100 }),
    is_published: faker.datatype.boolean(),
    created_at: new Date(),
    updated_at: new Date(),
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', products);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
