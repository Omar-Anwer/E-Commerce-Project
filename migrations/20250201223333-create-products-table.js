'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
    },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2).UNSIGNED,
        allowNull: false,
        defaultValue: 0.01
      },
      quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING), // Use TEXT for PostgreSQL arrays
        allowNull: true
      },
      condition: {
        type: Sequelize.ENUM('new', 'used', 'refurbished'),
        defaultValue: 'new',
        allowNull: false
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      avg_rating: {
          type: Sequelize.FLOAT.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          validate: {
              min: 0,
              max: 5,
          },
      },
      total_reviews: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('products', ['name'], {
      name: 'products_name_index',
      using: 'BTREE'
    });

    await queryInterface.addIndex('products', ['price'], {
      name: 'products_price_index',
      using: 'BTREE'
    });

    // Add composite indexes
    await queryInterface.addIndex('products', ['name', 'price'], {
      name: 'products_name_price_index',
      using: 'BTREE'
    });



    // Add validations
    await queryInterface.addConstraint('products', {
      fields: ['price'],
      type: 'check',
      where: {
        price: {
          [Sequelize.Op.gte]: 0.01
        }
      }
    });

    // Add foreign keys if uncommenting relationships
    /*
    await queryInterface.addColumn('products', 'vendor_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'vendors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'product_categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    */
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
};