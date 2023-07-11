import { DataTypes } from 'sequelize'
import db from '../database/connection'
import { uuid } from 'uuidv4';

const tracxnModel = db.define('transaction', {
    tracxn_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    bookid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    optype: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (record: any, options: any) => {
        },
        beforeValidate: (record: any, options: any) => {
        },
    }
})

try {
    tracxnModel.removeAttribute('id');
    tracxnModel.sync().then(() => console.log('Transaction Table created successfully'))
}
catch (err) {
    console.log('Transaction Table not created !' + err)
}

export default tracxnModel;