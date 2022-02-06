// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import partner from "../models/ito/ito-partners";
import Partner from "../models/ito/ito-partners";

// Global Config
export const partnerRouter = express.Router();

// GET

// POST

partnerRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newGame = req.body as Partner;
        const result = await collections.companies.insertOne(newGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT

// DELETE