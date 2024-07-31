const { body, validationResult } = require('express-validator');

const validateForm = [
    body('title')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Title must be a non-empty string.'),
    body('inputs')
        .isArray()
        .withMessage('Inputs must be an array.'),
    body('inputs.*.type')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Type must be a non-empty string.'),
    body('inputs.*.title')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Title must be a non-empty string.'),
    body('inputs.*.placeholder')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Placeholder must be a non-empty string.'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateForm,
    validateRequest,
};
