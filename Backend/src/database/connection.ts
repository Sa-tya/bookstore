// import bookModel from "../model/bookModel";
// import subjectModel from "../model/subjectModel";

require('dotenv').config()
const { Sequelize } = require('sequelize');

// const db = sequelize.createConnection({
//     host: process.env.DataBaseHost+':'+process.env.DataBasePort,
//     // port: process.env.DataBasePort,
//     user: process.env.DBUser,
//     password: process.env.DBPassword,
//     database: process.env.DataBase
// });

const db = new Sequelize(
    process.env.DataBase, //database Name
    process.env.DBUser, // user name
    process.env.DBPassword, // password
    {
        host: process.env.DataBaseHost,
        dialect: 'postgres',

    }
)

// subjectModel.hasMany(bookModel);
// bookModel.belongsTo(subjectModel,{foreignKey: 'Subject'});

db.sync();
(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export default db;
// connection.end();