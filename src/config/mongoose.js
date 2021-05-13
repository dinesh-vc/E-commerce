const mongoose = require('mongoose')

// set mongoose Promise to Bluebird
mongoose.Promise = global.Promise;

process.on('unhandledRejection', function(reason, promise) {
    console.log(promise);
});

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = (envConfig, env) => {
    // print mongoose logs in dev env
    if (env === 'Development') {
        mongoose.set('debug', true);
    }
    mongoose.connect(envConfig.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
     console.log("Connection Succesfull")
    return mongoose.connection;
};