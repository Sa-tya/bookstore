import Subject from "../model/subjectModel";

class Test {
    public async getAllSubject(req: any, res: any) {
        try {
            // await db.query('SELECT * FROM "allSubjects"', (err: any, result: any) => {
                return Subject.findAll().then((res:any)=> res)
                // .catch((err:any)=> err)
        }
        catch (err) {
            console.log(err)
            return 'fetch error';
        }
    }

    public async createSubject(req: any, res: any) {
        try {
            let SubjectCode:string = req.body.SubjectCode.trim();
            let SubjectName:string = req.body.SubjectName.trim();
            return Subject.create({
                SubjectCode:SubjectCode,
                SubjectName:SubjectName
            })
            .then((res:any) => {return {ack:1, msg:'Subject Created successfully'}})
            // .catch((err:any) => {
            //     return {ack:0, msg:'Error in subject creation'}
            // })
        }
        catch (err) {
            console.log(err)
            return 'creation error';
        }
    }

    public async UpdateSubject(req: any, res: any) {
        try {
            let SubjectCode:string = req.body.SubjectCode.trim();
            let SubjectName:string = req.body.SubjectName.trim();
            return Subject.create({
                SubjectCode:SubjectCode,
                SubjectName:SubjectName
            })
            .then((res:any) => {return {ack:1, msg:'Subject Created successfully'}})
            // .catch((err:any) => {
            //     return {ack:0, msg:'Error in subject creation'}
            // })
        }
        catch (err) {
            console.log(err)
            return 'creation error';
        }
    }
}

export const test = new Test();