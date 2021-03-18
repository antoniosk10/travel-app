/* eslint-disable global-require */ 
module.exports = (app) => {
  const places = require('../controllers/place.controller.js');

  const router = require('express').Router();

  // Create a new Place
  router.post('/', places.create);

  // Retrieve all Places
  router.get('/', places.findAll);

  // Retrieve all published Places
  router.get('/published', places.findAllPublished);

  // Retrieve a single Place with id
  router.get('/:id', places.findOne);

  // Update a Place with id
  router.put('/:id', places.update);

  // Delete a Place with id
  router.delete('/:id', places.delete);

  // Create a new Place
  router.delete('/', places.deleteAll);

  app.use('/api/places', router);
};
