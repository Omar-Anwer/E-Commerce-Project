'use strict';

const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

// Initialize Faker with a specific seed for reproducible results
faker.seed(1234);

const NUM_PRODUCTS = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const products = Array.from({ length: NUM_PRODUCTS }, () => ({
      uid: uuidv4(), // Generate UUID v4
      name: faker.commerce.productName(),
      description: faker.lorem.paragraphs(2), // More realistic description
      price: parseFloat(faker.finance.amount(0.01, 9999, 2)), // Better price distribution
      quantity: faker.number.int({ min: 0, max: 1000 }),
      is_published: faker.datatype.boolean({ probability: 0.7 }), // 70% chance of being published
      images: [faker.image.urlLoremFlickr({ category: 'technics' })], // Array of image URLs
      created_at: faker.date.past({ years: 2 }), // Realistic creation dates
      updated_at: faker.date.recent({ days: 30 }), // Recent updates
    }));

    // Batch insert in chunks for better performance
    //const chunkSize = 100;
    await queryInterface.bulkInsert('products', products, { 
      validate: true, // Enable model validations
      returning: false 
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};