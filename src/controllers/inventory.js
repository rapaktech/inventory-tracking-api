const asyncHandler = require('express-async-handler');
const  { StatusCodes } = require('http-status-codes');
const { Inventory } = require('../models');
const { createInventorySchema, updateInventorySchema } = require('../validators');
const { sendResponse } = require('../utilities');

const addOne = asyncHandler(async (req, res, next) => {
    const { name, description, price, quantity } = req.body;

    const validateUserInput = createInventorySchema.validate({ name, description, price, quantity });

    if (validateUserInput.error) {
        const errorFieldName = validateUserInput.error.details[0].path[0];
        let message = '';
        if (errorFieldName === 'name') message = 'Name has to start with a letter, can contain spaces, numbers and hyphens, must be at least 3 characters, and no more than 100 characters';
        if (errorFieldName === 'description') message = 'Description must be at least 3 characters, and no more than 1000 characters';
        if (errorFieldName === 'price') message = 'Price has to be a number greater than 0.01';
        if (errorFieldName === 'quantity') message = 'Quantity has to be a number greater than 1';
        return sendResponse('error', StatusCodes.BAD_REQUEST, message, {}, res);
    }

    const data = { name, description, price, quantity };

    const newInventoryListing = await new Inventory(data).save();
    const message = 'Inventory listing created successfully';
    return sendResponse('success', StatusCodes.CREATED, message, newInventoryListing, res);
});

const getAll = asyncHandler(async (req, res, next) => {
    const allInventoryListings = await Inventory.find({ isDeleted: false }).sort('-createdAt');

    if (allInventoryListings.length === 0) {
        const message = 'No inventory listings found';
        return sendResponse('success', StatusCodes.OK, message, allInventoryListings, res);
    }

    const message = 'Here are all the inventory listings';
    return sendResponse('success', StatusCodes.OK, message, allInventoryListings, res);
});

const getOne = asyncHandler(async (req, res, next) => {
    const SKU = req.params.SKU;
    const singleInventoryListing = await Inventory.findOne({ SKU: SKU, isDeleted: false });

    if (!singleInventoryListing) {
        const message = 'No inventory listing found with that SKU number. Please chcek and try again';
        return sendResponse('error', StatusCodes.BAD_REQUEST, message, {}, res);
    }

    const message = 'Here is the inventory listing you requested';
    return sendResponse('success', StatusCodes.OK, message, singleInventoryListing, res);
});

const updateOne = asyncHandler(async (req, res, next) => {
    const SKU = req.params.SKU;
    const { name, description, price, quantity } = req.body;

    if (name || description || price || quantity) {
        const validateUserInput = updateInventorySchema.validate({ name, description, price, quantity });

        if (validateUserInput.error) {
            const errorFieldName = validateUserInput.error.details[0].path[0];
            let message = '';
            if (errorFieldName === 'name') message = 'Name has to start with a letter, can contain spaces, numbers and hyphens, must be at least 3 characters, and no more than 100 characters';
            if (errorFieldName === 'description') message = 'Description must be at least 3 characters, and no more than 1000 characters';
            if (errorFieldName === 'price') message = 'Price has to be a number greater than 0.01';
            if (errorFieldName === 'quantity') message = 'Quantity has to be a number greater than 1';
            return sendResponse('error', StatusCodes.BAD_REQUEST, message, {}, res);
        }

        const data = { name, description, price, quantity };

        const updatedInventoryListing = await Inventory.findOneAndUpdate({ SKU: SKU, isDeleted: false }, data, {
            new: true,
        });

        if (!updatedInventoryListing) {
            const message = 'No inventory listing found with that SKU number. Please check the SKU number and try again';
            return sendResponse('error', StatusCodes.BAD_REQUEST, message, {}, res);
        }

        const message = 'Inventory listing updated successfully';
        return sendResponse('success', StatusCodes.OK, message, updatedInventoryListing, res);
    }

    const message = 'All fields cannot be empty. Please include one of (name, description, price, quantity)';
    return sendResponse('error', StatusCodes.BAD_REQUEST, message, {}, res);
});

const deleteOne = asyncHandler(async (req, res, next) => {
    const SKU = req.params.SKU;
    const { comment } = req.body;
    if (comment.length < 3 || comment.length > 100) return sendResponse('error', StatusCodes.BAD_REQUEST, 'Comment cannot be less than 3 characters, and cannot be more than 100 characters', {}, res);
    const deletedInventoryListing = await Inventory.findOneAndUpdate({ SKU: SKU, isDeleted: false }, { 
        isDeleted: true,
        comment: String(comment)
    }, {
        new: true,
    });

    if (!deletedInventoryListing) {
        const message = 'No inventory listing found with that SKU number. Please check the SKU number and try again';
        return sendResponse('error', StatusCodes.BAD_REQUEST, message, deletedInventoryListing, res);
    }

    const message = 'Inventory listing deleted successfully';
    return sendResponse('success', StatusCodes.OK, message, deletedInventoryListing, res);
});

const undeleteOne = asyncHandler(async (req, res, next) => {
    const SKU = req.params.SKU;
    const undeletedInventoryListing = await Inventory.findOneAndUpdate({ SKU: SKU, isDeleted: true }, { isDeleted: false }, {
        new: true,
    });

    if (!undeletedInventoryListing) {
        const message = 'No inventory listing found with that SKU number. Please check the SKU number and try again';
        return sendResponse('error', StatusCodes.BAD_REQUEST, message, undeletedInventoryListing, res);
    }

    const message = 'Inventory listing undeleted successfully';
    return sendResponse('success', StatusCodes.OK, message, undeletedInventoryListing, res);
});

const getAllDeleted = asyncHandler(async (req, res, next) => {
    const allDeletedInventoryListings = await Inventory.find({ isDeleted: true }).sort('-updatedAt');

    if (allDeletedInventoryListings.length === 0) {
        const message = 'No inventory listings found';
        return sendResponse('success', StatusCodes.OK, message, allDeletedInventoryListings, res);
    }

    const message = 'Here are all the deleted inventory listings';
    return sendResponse('success', StatusCodes.OK, message, allDeletedInventoryListings, res);
});

module.exports = {
    addOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    undeleteOne,
    getAllDeleted
};
