const express = require('express');

const router = express.Router();

router.use('/', async (req, res, next) => {
    try {
        if (req.originalUrl === '/') return res.status(200).json({ message: 'Welcome to Inventory Tracking API!' });
        res.status(200).json({
            message: `Can't find the ${req.method} method for ${req.originalUrl} on this server`,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
