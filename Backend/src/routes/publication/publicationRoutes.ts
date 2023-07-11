import { BaseRoutes } from '../BaseRoutes';
import { Request, Response } from 'express';
import { compantServices } from '../../services/companyServices';

class CompanyRoutes extends BaseRoutes {
  public path = "/company";

  constructor() {
    super();
    this._configure();
  }

  private _configure() {
    this.router.get('/getallcompany', async (req: Request, res: Response) => {
      let result = await compantServices.getAllCompany(req, res)
      res.send(result)
    })

    this.router.post('/createcompany', async (req: Request, res: Response) => {
      let result = await compantServices.createCompany(req, res)
      res.send(result)
    })

    this.router.post('/updatecompany', async (req: Request, res: Response) => {
      let result = await compantServices.updateCompany(req, res)
      res.send(result)
    })

    this.router.delete('/deletecompany/:id',async(req: Request, res:Response) => {
      let result = await compantServices.deleteCompany(req,res)
      res.send(result)
  })

  this.router.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Invalid company route",
        result: {},
        statusCode: 404,
    });
});
  }
}

export const companyRoutes = new CompanyRoutes();
