import { DataTypes } from "sequelize";
import db from "../database/connection";

const companyModel = db.define('publishers', {
    CompanyCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    CompanyName: {
        type: DataTypes.STRING,
        unique: true
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    hooks:{
        beforeCreate :(record:any, options:any)=>{
            record.dataValues.CompanyCode = record.dataValues.CompanyCode.toUpperCase()
        },
        beforeValidate  :(record:any, options:any)=>{
            record.dataValues.CompanyName = record.dataValues.CompanyName.toUpperCase()
        },
    }
})

// companyModel.beforeCreate((user:any, options:any) => {
//     user.CompanyCode = user.CompanyCode.toUpperCase() //+ user.SubjectCode.slice(1);
//     console.log(user.CompanyCode,user.CompanyCode.toUpperCase())
//   })

try {
    companyModel.removeAttribute('id');
    companyModel.sync().then(() => console.log('pub Table created successfully'))
        .catch(() => console.log('pub Table not created !'))

}
catch (e) {
    console.log(e)
}

export default companyModel;