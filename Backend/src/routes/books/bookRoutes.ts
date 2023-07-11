import { BaseRoutes } from '../BaseRoutes';
import { Request, Response } from 'express';
import { bookServices } from '../../services/bookServices';

class BooksRoutes extends BaseRoutes {
    public path = "/books";

    constructor() {
        super();
        this._configure();
    }

    private _configure() {
        this.router.get('/getallbook', async (req: Request, res: Response) => {
            let result = await bookServices.getAllBooks(req, res)
            res.send(result)
        })

        this.router.post('/createbook', async (req: Request, res: Response) => {
            let result = await bookServices.createBook(req, res)
            res.send(result)
        })

        this.router.post('/insertbookdetails', async (req: Request, res: Response) => {
            let result = await bookServices.createInStore(req, res)
            res.send(result)
        })

        this.router.post('/updatebook', async (req: Request, res: Response) => {
            let result = await bookServices.updateBook(req, res)
            res.send(result)
        })

        this.router.delete('/deletebook/:id', async (req: Request, res: Response) => {
            let result = await bookServices.deleteBook(req, res)
            res.send(result)
        })

        this.router.use((req: Request, res: Response) => {
            res.status(404).json({
                success: false,
                message: "Invalid books route",
                result: {},
                statusCode: 404,
            });
        });
    }
}

export const booksRoutes = new BooksRoutes();
