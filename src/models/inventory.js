const mongoose = require('mongoose');
const uniqid = require('uniqid');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    SKU: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    comment: {
        type: String,
    },
}, {
    timestamps: true
});

InventorySchema.pre('save', async function (next) {
    if (this.SKU) return next();
    this.SKU = uniqid().toUpperCase();
    next();
});

module.exports = mongoose.model('inventory', InventorySchema);
