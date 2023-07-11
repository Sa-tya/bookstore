import { DataTypes } from "sequelize";
import db from "../database/connection";

const subjectModel = db.define('subjects', {
    SubjectCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    SubjectName: {
        type: DataTypes.STRING,
        unique: true
    }
},{
    hooks:{
        beforeCreate :(record:any, options:any)=>{
            record.dataValues.SubjectCode = record.dataValues.SubjectCode.toUpperCase()
        },
        beforeValidate  :(record:any, options:any)=>{
            record.dataValues.SubjectName = record.dataValues.SubjectName.toUpperCase()
        },
    }
})

// subjectModel.hook('beforeCreate', (user:any, options:any) => {
//     user.username = user.SubjectCode.toUpperCase() //+ user.SubjectCode.slice(1);
//   })

try{
    
subjectModel.sync().then(() => console.log('Table created successfully'))
    .catch((err:any) => console.log('Table not created !',err))

// db.sync()
subjectModel.removeAttribute('id');
}
catch(e){
    console.log(e)
}
export default subjectModel;