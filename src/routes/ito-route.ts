import express, { Request, Response } from "express";
import CryptoJS from 'crypto-js';
import { collections } from "../services/database.service";
import { getFirmaBilgi } from "../services/ito-service";
import ItoData from "../models/ito/ito.db.model";

const router = express.Router();


router.get('/', async (req, res, next) => {
  const result = await getFirmaBilgi(req.body.mersisNo);
  res.send({ result });
});


router.post("/", async (req: Request, res: Response) => {
  try {

    const mersisNo = req.body.mersisNo;

    let existing = await collections.companies.find({ "mersisNo": mersisNo }).sort({ "date": -1 }).limit(1).next();

    var dt = new Date(); dt.setMonth(dt.getMonth() - 1);

    if (existing && existing.date > dt) {
      res.status(201).send( existing )
      return;
    }

    const firma = await getFirmaBilgi(mersisNo);

    const data = new ItoData(new Date(), mersisNo, firma);

    const result = await collections.companies.insertOne(data);

    result
      ? res.status(201).send( result )
      : res.status(500).send("Failed to create a ito game.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default router;
