'use strict';

const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

faker.seed(1234);

const NUM_PRODUCTS = 50;

// Function to generate weighted random conditions
const generateCondition = () => {
  return faker.helpers.weightedArrayElement([
    { weight: 70, value: 'new' },         // 70% chance of 'new'
    { weight: 20, value: 'used' },        // 20% chance of 'used'
    { weight: 10, value: 'refurbished' }, // 10% chance of 'refurbished'
  ]);
};

// Function for realistic rating distribution
const generateRatingData = () => {
  const totalReviews = faker.number.int({ min: 0, max: 10000 });

  let avgRating;
  if (totalReviews === 0) {
    avgRating = 0;
  } else {
    avgRating = faker.number.float({
      min: 1,
      max: 5,
      precision: 0.1,
      ...faker.helpers.weightedArrayElement([
        { weight: 10, value: { min: 4.5, max: 5 } },
        { weight: 60, value: { min: 3.5, max: 4.5 } },
        { weight: 20, value: { min: 2.0, max: 3.5 } },
        { weight: 10, value: { min: 1.0, max: 2.0 } },
      ])
    });
  }

  return {
    avg_rating: parseFloat(avgRating.toFixed(1)),
    total_reviews: totalReviews
  };
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const products = Array.from({ length: NUM_PRODUCTS }, () => {
      const ratingData = generateRatingData();

      return {
        uid: uuidv4(),
        name: faker.commerce.productName(),
        description: faker.lorem.paragraphs(2),
        price: parseFloat(faker.finance.amount(0.01, 99999, 2)),
        quantity: faker.number.int({ min: 0, max: 1000 }),
        condition: generateCondition(), // Add condition field
        is_published: faker.datatype.boolean({ probability: 0.7 }),
        images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => 
          faker.image.urlLoremFlickr({ category: 'commerce' })
        ),
        ...ratingData,
        created_at: faker.date.past({ years: 2 }),
        updated_at: faker.date.recent({ days: 30 }),
      };
    });

    await queryInterface.bulkInsert('products', products, {
      validate: true,
      individualHooks: false
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
