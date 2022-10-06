'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [
      {
        title: 'Ikan',
        caption: 'Ini gambar ikan, hhehehehehe',
        image_url: 'https://image.cermati.com/q_70,w_1200,h_800,c_fit/aundqva6mspsrzyhr7tn',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ayam',
        caption: 'Ini gambar ayam, hhehehehehe',
        image_url: 'https://cdn1-production-images-kly.akamaized.net/tc-nn-mJ1_b2g5s9xQLwPbVfJh4=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3421370/original/062776600_1617710503-WhatsApp_Image_2021-04-06_at_3.45.04_PM.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
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
