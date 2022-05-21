require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 8000;
const uri = process.env.MONGO_URI;
const connectToDB = require('./db/index');

app.listen(port, async () => {
    try {
        await connectToDB(uri);
        console.log(`Server is live at port ${port}`);
    } catch (error) {
        console.log(error);
    }
});
