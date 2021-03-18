const db = require('../models'); 

const Place = db.places;

// Create and Save a new Country
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Country
  const place = new Place({
    //------------------------------------
    // title: req.body.title,
    // description: req.body.description,
    // published: req.body.published ? req.body.published : false
    //------------------------------------
  });

  // Save Country in the database
  place
    .save(place)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Place.',
      });
    });
};

// Retrieve all Countries from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  //------------------------------------
  // const title = req.query.localizations[0].name;
  const title = req.query.countryId;
  //------------------------------------

  const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

  Place.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while retrieving countries.',
      });
    });
};



// Find a single Country with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Place.find({countryId: id})
    .then((data) => {
      if (!data) res.status(404).send({ message: `Not found Place with contryId ${id}` });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: `Error retrieving Place with contryId=${id}` });
    });
};



// Update a Country by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const { id } = req.params;

  Place.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Place with id=${id}. Maybe Place was not found!`,
        });
      } else res.send({ message: 'Place was updated successfully.' });
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Place with id=${id}`,
      });
    });
  return null;
};

// Delete a Country with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  Place.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Place with id=${id}. Maybe Place was not found!`,
        });
      } else {
        res.send({
          message: 'Place was deleted successfully!',
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Place with id=${id}`,
      });
    });
};

// Delete all Countries from the database.
exports.deleteAll = (req, res) => {
  Place.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Places were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Places.',
      });
    });
};

// Find all published Countries
exports.findAllPublished = (req, res) => {
// Tutorial.find({ published: true })
// .then(data => {
//   res.send(data);
// })
// .catch(err => {
//   res.status(500).send({
//     message:
//       err.message || "Some error occurred while retrieving tutorials."
//   });
// });
};
