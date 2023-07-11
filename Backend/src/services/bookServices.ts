// import bookModel from "../model/bookModel";
import db from "../database/connection";
import booksModel from "../model/booksModel";
import storeModel from "../model/storeModel";

class BookServices {
    public async getAllBooks(req: any, res: any) {
        try {
            // await db.query('SELECT * FROM "allSubjects"', (err: any, result: any) => {
            return await this.fetchStore('', '')
            // return booksModel.findAll().then((res: any) => res)
            //     .catch((err: any) => err)
        }
        catch (err) {
            console.log(err)
            return { ack: '0', msg: 'error in book fetch ' + err };
        }
    }

    public async fetchStore(req: any, res: any) {
        try {
            //await db.query('SELECT * FROM "stores" INNER JOIN "books" ON "stores.BookCode" = "books.Code"')//, (err: any, result: any) => {
            //     return booksModel.findAll().then((res: any) => res)
            //         .catch((err: any) => err)
            let y = await db.query('SELECT * FROM stores, books WHERE "stores"."bookcode"="books"."Code"')
            // await booksModel.findAll({
            //     include: [{
            //       model: storeModel,
            //       required: true
            //      }]
            //   }).then((ele:any) => {
            //     console.log(ele)
            //   });
            return { ack: '1', data: y };
        }
        catch (err) {
            console.log(err)
            return { ack: '0', msg: 'error in store fetch ' + err };
        }
    }

    public async createBook(req: any, res: any) {
        try {
            let BookName: string = req.body.name.trim();
            let SubjectName: string = req.body.subject.trim();
            let Publication: string = req.body.publisher.trim();
            // let Class: string = req.body.class;
            // let Price: Number = req.body.price;
            // let Quantity: Number = req.body.qty;
            return booksModel.create({
                // Code: 'code',
                Name: BookName,
                Subject: SubjectName,
                Publisher: Publication,
                // Price: Price,
                // Quantity: Quantity,
                // Class: Class
            })
                .then((res: any) => { return { ack: 1, msg: 'Book appended successfully' } })
            // .catch((err: any) => {
            //     console.log(err)
            //     return { ack: 0, msg: 'Error in book appendation' }
            // })
        }
        catch (err) {
            console.log(err)
            return { ack: 0, msg: 'Error in book appendation ' + err }
        }
    }

    public async createInStore(req: any, res: any) {
        try {
            let BookCode: string = req.body.code.trim();
            let Class: any = ['Nur', 'Lkg', 'Ukg', '1', '2', '3', '4', '5', '6', '7', '8']
            let Price: any = req.body.price;
            let Quantity: any = req.body.qty;
            let data: any = [];
            // console.log(BookCode,Class, Price, Quantity)
            Class.forEach((ele: string, indx: any) => {
                if (Price[indx] && Quantity[indx])
                    data.push({
                        bookcode: BookCode,
                        price: Price[indx],
                        quantity: Quantity[indx],
                        class: Class[indx]
                    })
            })
            // console.log(data);

            return storeModel.bulkCreate(data)
                .then((res: any) => { return { ack: 1, msg: 'Book appended successfully' } })
            // .catch((err: any) => {
            //     console.log(err)
            //     return { ack: 0, msg: 'Error in book appendation' }
            // })
        }
        catch (err) {
            console.log(err)
            return { ack: 0, msg: 'Error in store appendation ' + err }
        }
    }

    public async updateBook(req: any, res: any) {
        try {
            // let id = req.body.bookId;
            let code = req.body.code;
            let BookName: string = req.body.name.trim();
            let SubjectName: string = req.body.subject.trim();
            let Publication: string = req.body.publisher.trim();
            // let Class: string = req.body.class;
            // let Price: Number = req.body.price;
            // let Quantity: Number = req.body.qty;
            return booksModel.update({
                Name: BookName,
                Subject: SubjectName,
                Publication: Publication,
                // Price: Price,
                // Quantity: Quantity,
                // Class: Class
            }, {
                where: { Code: code }
            })
                .then((res: any) => { return { ack: 1, msg: 'book updated successfully' } })
            // .catch((err: any) => {
            //     return { ack: 0, msg: 'Error in book updated ' + err }
            // })
        }
        catch (err) {
            console.log(err)
            return { ack: 0, msg: 'Error in book updated ' + err }
        }
    }

    public async deleteBook(req: any, res: any) {
        try {
            let code: string = req.params.id;
            let result = await storeModel.destroy({
                where: { BookCode: code }
            }).then((res: any) => { return { ack: 1, msg: '1. Book deleted successfully !' } })
                .catch((err: any) => {
                    return { ack: 0, msg: '1. Error in Book deletion in store ' + err }
                })
            return booksModel.destroy({
                where: { Code: code }
            })
                .then((res: any) => { return { ack: 1, msg: '2. Book deleted successfully !' } })
                .catch((err: any) => {
                    return { ack: 0, msg: '2. Error in Book deletion in book ' + err }
                })
        }
        catch (err) {
            console.log(err)
            return { ack: '0', msg: 'deletion error ' + err }

        }
    }
}

export const bookServices = new BookServices();
