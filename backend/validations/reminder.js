const { check } = require("express-validator");
const { router } = require("../app");
const Reminder = require("../models/Reminder");
const handleValidationErrors = require('./handleValidationErrors');

const validateReminderInput = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 50 })
        .withMessage('Reminder title must be between 5 and 50 characters.'),
    check('date')
        .exists({ checkFalsy: true })
        .isISO8601()
        .isAfter()
        .withMessage('Reminder must have a valid date.'),
    handleValidationErrors
];


  
module.exports = validateReminderInput;