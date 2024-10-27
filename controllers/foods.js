const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
  

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);

      res.render('foods/index.ejs', {
        foods: currentUser.foods,
      });
    } catch (error) {
     
      console.log(error)
      res.redirect('/')
    }
  });
  router.get('/new', (req, res) => {
    res.render('applications/new.ejs');
  });

  router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
  
      req.body.date = new Date(req.body.date)
  
      currentUser.foods.push(req.body);
      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  router.get('/:foodId', async (req, res) => {
    try {

      const currentUser = await User.findById(req.session.user._id);

      const food = currentUser.foods.id(req.params.foodId);
      
      res.render('foods/show.ejs', {
        food: food,
      });
  
    } catch (error) {

      res.redirect('/')
    }
  });
  
  router.delete('/:foodId', async (req, res) => {
    try {

      const currentUser = await User.findById(req.session.user._id);

      currentUser.foods.id(req.params.foodId).deleteOne();

      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      
     
      res.redirect('/')
    }
  });

  router.get('/:foodId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const food = currentUser.foods.id(req.params.foodId);
      res.render('foods/edit.ejs', {
        food: food,
      });
    } catch (error) {
   
      res.redirect('/')
    }
  });

  router.put('/:applicationId', async (req, res) => {
    try {

      const currentUser = await User.findById(req.session.user._id);
      
      const application = currentUser.applications.id(req.params.applicationId);
    
      application.set(req.body);

      await currentUser.save();
     
      res.redirect(
        `/users/${currentUser._id}/applications/${req.params.applicationId}`
      );
    } catch (error) {
     
      res.redirect('/')
    }
  });
module.exports = router;