/*jshint esversion: 6 */
const express = require('express'),
  router = express.Router();

const Category = require('../models/Category');

// Get all Categories
router.route('').get((req, res) => {
  Category.find((err, categories) => {
    if (err)
      res.json({
        error: 'Unable to retrieve categories: ' + err
      });
    else
      res.json({
        categories: categories
      });
  });
});

// Create new Category
router.route('/create').post((req, res) => {
  let category = new Category(req.body);
  var update = {
      expire: new Date()
    },
    options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };

  // Find the document
  Category.findOneAndUpdate(
    // search if the a category already exists with this name
    {
      name: req.body.name
    },
    // if it does not, create a category with the specified name
    {
      name: req.body.name
    },
    // below are the following options
    // upsert tells mongoose to do the insert if nothing is found
    // new tells mongoose to send the newly created or updated doc in the repsonse
    // (err, result) is the callback function
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    },
    // if the json was unable to be added, return an error message
    (err, result) => {
      if (err) {
        res.status(400).send({
          message: 'Category creation failed',
          error: err
        });
      } else {
        result.active = true;
        result
          .save()
          .then(category => {
            res.status(200).json({
              message: 'Category Created!',
              category: category
            });
          });
      }
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

// Get Category by name
router.route('/getByName/:name').get((req, res) => {
  Category.findOne(req.params.name, (err, category) => {
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
  console.log("Request Body");
  console.log(req.body);
  Category.findById(req.params.id, (err, category) => {
    if (!category || err)
      return new Error('Could not load category: ' + err);
    else {
      console.log(category);
      if (req.body.name != null || req.body.name != undefined)
        category.name = req.body.name;
      if (req.body.active != null || req.body.active != undefined)
        category.active = req.body.active;
      category.save()
        .then(category => {
          res.json({
            message: 'Category updated!',
            category: category
          });
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
