import { DataTypes } from 'sequelize'
import db from '../database/connection'
// import { uuid } from 'uuidv4';

const schoolModel = db.define('schools', {
    School_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    SchoolCode: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    }
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
    schoolModel.removeAttribute('id');
    schoolModel.sync().then(() => console.log('books Table created successfully'))
        .catch(() => console.log('books Table not created !'))
}
catch (err) {
    console.log(err)
}

export default schoolModel;