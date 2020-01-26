const fs = require('fs');

const mongoose = require('mongoose');
const colors = require('colors');
const env = require('dotenv');

env.config({ path: './config/config.env' });

const Course = require('./models/Course');


// connect to DB
const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

// import into db

const importData = async () => {
    try {
        await Course.create(courses);

        console.log('Seeded successfully'.green.inverse);
        process.exit();
    } catch (e) {
        console.error(`${err}`.red);
    }
}

// clera db

const deleteData = async () => {
    try {
        await Course.deleteMany();
        console.log('DB Cleared'.red.inverse);
    } catch (e) {
        console.error(`${err}`.red);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}