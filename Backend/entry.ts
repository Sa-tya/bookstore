require('dotenv').config()
const express = require('express')
import { appAPI } from "./src/routes/apiRoutes";
import { Request, Response } from 'express'

class App {
  public server = express()
  constructor() {
    this.DBConnect();
    // this.Middleware();
    this.InitRoutes();
  }
  
  private DBConnect() {
    // const db = pgp(`postgres://${process.env.DBUser}:${process.env.DBPassword}@${process.env.DataBaseHost}:${process.env.DataBasePort}/${process.env.DataBase}`)
  }

  private InitRoutes() {
    this.server.use(appAPI.path, appAPI.routerinstance);
    this.server.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: "Invalid route",
        result: {},
        statusCode: 404,
      });
    });
  }
}

export default new App();