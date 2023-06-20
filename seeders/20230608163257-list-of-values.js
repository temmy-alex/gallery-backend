'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let listCategory = [
      {
        name: 'category',
        value: 'nature'
      },
      {
        name: 'category',
        value: 'building'
      },
      {
        name: 'category',
        value: 'Future'
      },
      {
        name: 'category',
        value: 'education'
      }
    ];

    const categories = listCategory.map((data) => {
      return {
        ...data,
        created_at: new Date(),
        updated_at: null
      }
    })
    
    await queryInterface.bulkInsert('list_of_values', categories, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('list_of_values', null, {});
  }
};
