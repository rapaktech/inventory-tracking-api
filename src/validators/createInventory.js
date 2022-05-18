const Joi = require('joi');

const createInventorySchema = Joi.object({
    name: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z0-9- ]{2,98}$/)
        .min(3)
        .max(100)
        .required()
    ,

    description: Joi.string()
        .min(3)
        .max(1000)
        .required()
    ,

    price: Joi.number()
        .precision(2)
        .min(0.01)
        .required()
    ,

    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
    ,
});

module.exports = createInventorySchema;