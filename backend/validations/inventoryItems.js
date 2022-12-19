const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateInventoryInput = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 3, max: 30 })
        .withMessage('Item name must be between 3 and 30 characters.'),
    handleValidationErrors
];
  
  
module.exports = validateInventoryInput;