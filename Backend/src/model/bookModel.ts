import { DataTypes } from 'sequelize'
import db from '../database/connection'
import { uuid } from 'uuidv4';


const bookModel = db.define('bookTable', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        // primaryKey: true
    },
    Code: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Class: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    },
    Subject: {
        type: DataTypes.STRING,
        primaryKey: true,
        // references: {
        //     model: subjectModel,
        //     key: 'SubjectCode'
        // }
    },
    Publisher: {
        type: DataTypes.STRING,
        // allowNull: false,
        primaryKey: true,
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1
    }
}, {
    hooks: {
        beforeCreate: async (record: any, options: any) => {
            // let y = await db.query('SELECT LAST_INSERT_user_id() FROM "bookTables"')
            // console.log(y)
            // let x = '00000' + record.dataValues.user_id
            // record.dataValues.Code = record.dataValues.Subject + record.dataValues.Publisher
            //     + record.dataValues.Class + x.substring(x.length - 5)
            // record.dataValues.SubjectCode = record.dataValues.SubjectCode.toUpperCase()
        },
        beforeValidate: (record: any, options: any) => {
            record.dataValues.Code = uuid()
        },
    }
})

try {
    bookModel.removeAttribute('id');
    bookModel.sync().then(() => console.log('book Table created successfully'))
        .catch(() => console.log('book Table not created !'))
}
catch (err) {
    console.log(err)
}

export default bookModel;