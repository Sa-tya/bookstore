import subjectModel from "../model/subjectModel";

class SubjetServices {
    public async getAllSubject(req: any, res: any) {
        try {
            // await db.query('SELECT * FROM "allSubjects"', (err: any, result: any) => {
            return subjectModel.findAll().then((res: any) => res.map((itm: any) => {
                // return {
                //     'SubjectCode': itm.SubjectCode,
                //     'SubjectName': itm.SubjectName

                // }
                return itm
            }))
            // .catch((err: any) => err)
        }
        catch (err) {
            console.log(err)
            res.status(498)
            return { ack: 0, msg: 'subject fetch error ' + err };

        }
    }

    public async createSubject(req: any, res: any) {
        try {
            let SubjectCode: string = req.body.SubjectCode.trim();
            let SubjectName: string = req.body.SubjectName.trim();
            return subjectModel.create({
                // [Op.or]: [{ SubjectCode: SubjectCode }, { SubjectName: SubjectName }]
                SubjectCode: SubjectCode,
                SubjectName: SubjectName
            })
                .then((res: any) => {
                    return { ack: 1, msg: res }
                })
            // .catch((err: any) => {
            //     return { ack: 0, msg: err }
            // })
        }
        catch (err) {
            console.log(err)
            res.status(498)
            return { ack: 0, msg: 'subject create error ' + err };

        }
    }

    public async updateSubject(req: any, res: any) {
        try {
            let SubjectCode: string = req.body.SubjectCode.trim();
            let SubjectName: string = req.body.SubjectName.trim();
            return subjectModel.update({
                SubjectName: SubjectName
            }, {
                where: { SubjectCode: SubjectCode }
            })
                .then((res: any) => { return { ack: 1, msg: 'Subject Created successfully' } })
            // .catch((err: any) => {
            //     return { ack: 0, msg: 'Error in subject creation' }
            // })
        }
        catch (err) {
            console.log(err)
            res.status(498)
            return { ack: 0, msg: 'subject update error ' + err };

        }
    }

    public async delete(req: any, res: any) {
        try {
            let SubjectCode: string = req.params.id;
            return subjectModel.destroy({
                where: { SubjectCode: SubjectCode }
            })
                .then((res: any) => { return { ack: 1, msg: 'Subject deleted successfully !' } })
            // .catch((err: any) => {
            //     return { ack: 0, msg: 'Error in subject deletion' }
            // })
        }
        catch (err) {
            console.log(err)
            res.status(498)
            return { ack: 0, msg: 'subject delete error ' + err };
        }
    }
}

export const subjectServices = new SubjetServices();