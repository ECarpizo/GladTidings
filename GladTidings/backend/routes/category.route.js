/*jshint esversion: 6 */
const express = require('express'),
  router = express.Router();

const Category = require('../models/Category');

// Create new Category
router.route('./create').post((req, res) => {
  let category = new Category(req.body);
  category.save()
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      res.status(400).send({
        "message": 'Account creation failed',
        "error": err
      });
    })
    .catch(err => {
      res.status(500).send({
        "message": 'Database error',
        "error": err
      });
    });
});

// Get all Categories
router.route('').get((req, res) => {
  Category.find((err, categories) => {
    if (err)
      res.json({
        error: 'Unable to retrieve categories: ' + err
      });
    else
      res.json(categories);
  });
});

// Get Category by ID
router.route('/getById/:id').get((req, res) => {
    Category.findById(req.params.id, (err, category) => {
    if (!category)
      res.json({
        error: 'Unable to retrieve category: ' + err
      });
    else
      res.json(category);
  });
});

// Update Category info
router.route('/update/:id').put((req, res) => {
    Category.findById(req.params.id, (err, category) => {
    if (!category || err)
      return new Error('Could not load category: ' + err);
    else {
        category.name = req.body.name;

        category.save()
        .then(category => {
          res.json('Category updated!');
        })
        .catch(err => {
          res.status(400).send('Category failed to update');
        })
        .catch(err => {
          res.status(500).send('Database error');
        });
    }
  });
});

// Delete (never have to delete categories. Just disable active status to "false")
router.route('/delete/:id').get(function (req, res) {
    Category.findByIdAndRemove({
    _id: req.params.id
  }, (err, category) => {
    if (err)
      res.json(err);
    else
      res.json({
        category: category,
        message: "Category was removed"
      });
  });
});

module.exports = router;
