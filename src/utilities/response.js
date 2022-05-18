const sendResponse = (status, statusCode, message, data, res) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};

module.exports = {
    sendResponse
};