import express from 'express';
import itoRouter from './routes/ito-route';
import { connectToDatabase } from "./services/database.service"
import { partnerRouter } from "./routes/company.router";
import logger from 'morgan';
import { getHashDate } from './middlewares/token';
import * as dotenv from "dotenv";

const app = express();

connectToDatabase().then(() => {
    
    dotenv.config();
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // define a route handler for the default home page
    app.use((req, res, next) => {

        const hdr = req.headers["x-token"];
        console.log(hdr);
        if (!hdr || !getHashDate(hdr.toString())) {
            res.status(401);
            res.send('');
        } else
            next();
    });
    app.use("/ito", itoRouter);
    app.use("/partner", partnerRouter);
    // start the Express server
    app.listen(process.env.PORT, () => {
        console.log(`server started at http://localhost:${process.env.PORT}`);
    });
});

