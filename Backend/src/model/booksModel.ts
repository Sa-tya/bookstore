import { DataTypes } from 'sequelize'
import db from '../database/connection'
import { uuid } from 'uuidv4';

const booksModel = db.define('books', {
    Code: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
    // Code: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    Name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Subject: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Publisher: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
}, {
    hooks: {
        beforeCreate: (record: any, options: any) => {
                // x.substring(x.length - 5)
            // record.dataValues.SubjectCode = record.dataValues.SubjectCode.toUpperCase()
        },
        beforeValidate: (record: any, options: any) => {
            record.dataValues.Code = uuid();
        },
    }
})

try {
    booksModel.sync().then(() => console.log('books Table created successfully'))
        .catch((err:any) => console.log('books Table not created !', err))
    booksModel.removeAttribute('id');

}
catch (err) {
    console.log(err)
}

export default booksModel;