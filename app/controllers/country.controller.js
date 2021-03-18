const db = require('../models');

const Country = db.countries;

// Create and Save a new Country
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Country
  const country = new Country({
    //------------------------------------
    // title: req.body.title,
    // description: req.body.description,
    // published: req.body.published ? req.body.published : false
    //------------------------------------
  });

  // Save Country in the database
  country
    .save(country)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Country.',
      });
    });
};

// Retrieve all Countries from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  //------------------------------------
  // const title = req.query.localizations[0].name;
  const title = req.query.ISOCode;
  //------------------------------------

  const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

  Country.find(condition)
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

  Country.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: `Not found Country with id ${id}` });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: `Error retrieving Country with id=${id}` });
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

  Country.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Country with id=${id}. Maybe Country was not found!`,
        });
      } else res.send({ message: 'Country was updated successfully.' });
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Country with id=${id}`,
      });
    });
  return null;
};

// Delete a Country with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  Country.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Country with id=${id}. Maybe Country was not found!`,
        });
      } else {
        res.send({
          message: 'Country was deleted successfully!',
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Country with id=${id}`,
      });
    });
};

// Delete all Countries from the database.
exports.deleteAll = (req, res) => {
  Country.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Countries were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Countries.',
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
