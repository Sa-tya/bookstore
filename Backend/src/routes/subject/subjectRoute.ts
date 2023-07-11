import { BaseRoutes } from '../BaseRoutes';
import { Request, Response } from 'express';
import { subjectServices } from '../../services/subjectServices';

class SubjectRoutes extends BaseRoutes {
  public path = "/subject";

  constructor() {
    super();
    this._configure();
  }

  private _configure() {
    this.router.get('/getallsubject', async (req: Request, res: Response) => {
      let result = await subjectServices.getAllSubject(req, res)
      res.send(result)
    })

    this.router.post('/createsubject', async (req: Request, res: Response) => {
      let result = await subjectServices.createSubject(req, res)
      res.send(result)
    })

    this.router.post('/updatesubject', async (req: Request, res: Response) => {
      let result = await subjectServices.updateSubject(req, res)
      res.send(result)
    })

    this.router.delete('/deletesubject/:id', async (req: Request, res: Response) => {
      console.log(req.params.id)
      let result = await subjectServices.delete(req, res)
      res.send(result)
    })

    this.router.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: "Invalid subject route",
        result: {},
        statusCode: 404,
      });
    });
  }
}

export const subjectRoutes = new SubjectRoutes();
