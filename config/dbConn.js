const { connect, set } = require('mongoose');

const connectDB = async () => {
    try {
        await connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        set('strictQuery', false);
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;
