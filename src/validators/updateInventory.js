const Joi = require('joi');

const updateInventorySchema = Joi.object({
    name: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z0-9- ]{2,98}$/)
        .min(3)
        .max(100)
    ,

    description: Joi.string()
        .min(3)
        .max(1000)
    ,

    price: Joi.number()
        .precision(2)
        .min(0.01)
    ,

    quantity: Joi.number()
        .integer()
        .min(1)
    ,
});

module.exports = updateInventorySchema;