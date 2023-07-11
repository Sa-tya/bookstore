import { DataTypes } from 'sequelize'
import db from '../database/connection'
import { uuid } from 'uuidv4';

const storeModel = db.define('store', {
    // book_id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    // },
    bookcode: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    class: {
        type: DataTypes.STRING,
        primaryKey: true,
        isIn: [['Nur', 'Lkg', 'Ukg', '1', '2', '3', '4', '5', '6', '7', '8']]
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1
    },
    // timedetails: {
    //     type: DataTypes.ARRAY({
    //         date: {
    //             type: DataTypes.DATE,
    //             allowNull: false
    //         },
    //         qty: {
    //             type: DataTypes.NUMBER,
    //             allowNull: false

    //         },
    //         optype: {
    //             type: DataTypes.STRING,
    //             allowNull: false
    //         }
    //     })
    // }
}, {
    hooks: {
        beforeCreate: (record: any, options: any) => {
        },
        beforeValidate: (record: any, options: any) => {
            // record.dataValues.Code = uuid();
        },
    }
})

try {
    // storeModel.removeAttribute('id');
    storeModel.sync().then(() => console.log('Store Table created successfully'))
        .catch(() => console.log('Store Table not created !'))
}
catch (err) {
    console.log(err)
}

export default storeModel;