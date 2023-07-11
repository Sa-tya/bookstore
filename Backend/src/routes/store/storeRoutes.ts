import { BaseRoutes } from '../BaseRoutes';
import { Request, Response } from 'express';
import { bookServices } from '../../services/bookServices';

class storeRoutes extends BaseRoutes {
    public path = "/store";

    constructor() {
        super();
        this._configure();
    }

    private _configure() {
        this.router.get('/getstore', async (req: Request, res: Response) => {
            let result = await bookServices.getAllBooks(req, res)
            res.send(result)
        })

        this.router.post('/saveinstore', async (req: Request, res: Response) => {
            let result = await bookServices.createBook(req, res)
            res.send(result)
        })

        // this.router.post('/insertbookdetails', async (req: Request, res: Response) => {
        //     let result = await bookServices.createInStore(req, res)
        //     res.send(result)
        // })

        this.router.post('/updateinstore', async (req: Request, res: Response) => {
            let result = await bookServices.updateBook(req, res)
            res.send(result)
        })

        this.router.delete('/deleteinstore/:id', async (req: Request, res: Response) => {
            let result = await bookServices.deleteBook(req, res)
            res.send(result)
        })

        this.router.use((req: Request, res: Response) => {
            res.status(404).json({
                success: false,
                message: "Invalid store route",
                result: {},
                statusCode: 404,
            });
        });
    }
}

export const storesRoutes = new storeRoutes();
