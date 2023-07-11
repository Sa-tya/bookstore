import companyModel from "../model/companyModel";

class CompantServices {
    public async getAllCompany(req: any, res: any) {
        try {
            return companyModel.findAll().then((res: any) => res.map((itm: any) => {
                return {
                    'CompanyCode': itm.CompanyCode,
                    'CompanyName': itm.CompanyName,
                    'Address': itm.Address
                }
            }))
            // .catch((err: any) => {
            //     console.log(err)
            //     return 'error';
            // })
        }
        catch (err) {
            console.log(err)
            return { ack: 0, msg: 'Error in company fetch ' + err };
        }
    }

    public async createCompany(req: any, res: any) {
        try {
            let companyCode: string = req.body.companyCode.trim();
            let companyName: string = req.body.companyName.trim();
            let address: string = req.body.companyAddress.trim();
            return companyModel.create({
                CompanyCode: companyCode,
                CompanyName: companyName,
                Address: address
            })
                .then((res: any) => { return { ack: 1, msg: 'Company Created successfully' } })
            // .catch((err: any) => {
            //     return { ack: 0, msg: 'Error in company creation'+err }
            // })
        }
        catch (err) {
            console.log(err)
            return { ack: 0, msg: 'creation company error ' + err };
        }
    }

    public async updateCompany(req: any, res: any) {
        try {
            let companyCode: string = req.body.companyCode.trim();
            let companyName: string = req.body.companyName.trim();
            let address: string = req.body.companyAddress.trim();
            return companyModel.update({
                CompanyName: companyName,
                Address: address
            },
                { where: { CompanyCode: companyCode } }
            )
                .then((res: any) => { return { ack: 1, msg: 'Company updated successfully' } })
            // .catch((err: any) => {
            //     return { ack: 0, msg: 'Error in company updation ',err }
            // })
        }
        catch (err) {
            console.log(err)
            return { ack: 0, msg: 'Update company error ' + err };
        }
    }

    public async deleteCompany(req: any, res: any) {
        try {
            let code: string = req.params.id;
            return companyModel.destroy({
                where: { CompanyCode: code }
            })
                .then((res: any) => { return { ack: 1, msg: 'Publisher deleted successfully !' } })
            // .catch((err: any) => {
            //     return { ack: 0, msg: 'Error in Publisher deletion ' + err }
            // })
        }
        catch (err) {
            console.log(err)
            return { ack: 0, msg: 'deletion company error ' + err };
        }
    }
}

export const compantServices = new CompantServices()