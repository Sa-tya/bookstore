import { BaseRoutes } from './BaseRoutes'
import { Request, Response } from 'express';
import { test } from '../services/test';
import { subjectRoutes } from './subject/subjectRoute';
import { booksRoutes } from './books/bookRoutes';
import { companyRoutes } from './publication/publicationRoutes';
import { storesRoutes } from './store/storeRoutes';
const cors = require('cors');
const bodyParser = require('body-parser')

class MasterRoutes extends BaseRoutes {
  public path = "/v1";

  constructor() {
    super();
    this._configure();
  }

  private _configure() {
    this.router.use(cors());
    this.router.use(bodyParser.json())
    this.router.use(bodyParser.urlencoded({ extended: true }))
    this.router.use(subjectRoutes.path, subjectRoutes.routerinstance)
    this.router.use(booksRoutes.path, booksRoutes.routerinstance)
    this.router.use(companyRoutes.path, companyRoutes.routerinstance)
    this.router.use(storesRoutes.path, storesRoutes.routerinstance)
  //   this.router.get('/subject/getallsubject', async (req: Request, res: Response) => {
  //     let result = await test.getAllSubject(req, res)
  //     res.send(result)
  //   })

  //   this.router.post('/subject/createsubject', async (req: Request, res: Response) => {
  //     let result = await test.createSubject(req, res)
  //     res.send(result)
  //   })

  //   this.router.post('/subject/updatesubject', async (req: Request, res: Response) => {
  //     let result = await test.UpdateSubject(req, res)
  //     res.send(result)
  //   })

  //   this.router.post('/subject/deletesubject',async(req: Request, res:Response) => {
  //     let result = await test.createSubject(req,res)
  //     res.send(result)
  // })
  this.router.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: "Invalid v1 route",
      result: {},
      statusCode: 404,
    });
  });
    console.log('masterroute')
  }
}

export const masterRoutes = new MasterRoutes();
