const mongoose = require('mongoose');

const connect = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    console.log('Database connection is successful');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
