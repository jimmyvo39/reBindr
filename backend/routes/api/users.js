const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Inventory = mongoose.model('Inventory')
const Reminder = mongoose.model('Reminder')
const passport = require('passport');
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');


router.post('/register', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
})

router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    phone: req.user.phone
  });
});

router.get('/inventory', requireUser, async (req, res, next) => {
  let user;
  try {
      user = await User.findById(req.user._id);
  } catch(err) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errors = { message: "No user found with that id" };
      return next(error);
  }
  try {
      const inventory = await Inventory.find({ uploader: user._id })
                              .sort({ createdAt: -1 })
                              .populate("uploader", "_id, username");
      return res.json(inventory);
  }
  catch(err) {
      return res.json([]);
  }
})

router.get('/reminders', requireUser, async (req, res, next) => {
  let user;
  try {
      user = await User.findById(req.user._id);
  } catch(err) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errors = { message: "No user found with that id" };
      return next(error);
  }
  try {
    const reminders = await Reminder.find({ uploader: user._id })
                                  .sort({ createdAt: -1 })
                                  .populate("uploader", "_id, username")
                                  .populate("item", "_id, user_manual name consumables")
    return res.json(reminders);
  }
  catch(err) {
      return res.json([]);
  }
})

router.patch('/:id', requireUser, async (req, res, next) => {
  const user = req.user
  if (!user) return res.json(null)
  user.username = req.body.username
  user.email = req.body.email
  user.phone = req.body.phone
  return res.json(user)
})

module.exports = router;
