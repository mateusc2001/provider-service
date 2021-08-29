import express, { Request, Response } from "express";
import {leadsEntity} from "../schemas/leads.schema";

export const leadsRoute = express.Router();

leadsRoute.get('/', async (req: Request, res: Response) => {
    res.json(await leadsEntity.find());
});

leadsRoute.get('/:leadId', async (req: Request, res: Response) => {
    res.json(await leadsEntity.findById(req.params.leadId));
});

leadsRoute.put('/:leadId', async (req: Request, res: Response) => {
    res.json(await leadsEntity.updateOne({ '_id': req.params.leadId }, req.body));
});

leadsRoute.put('/select-plan/lead-id/:leadId', async (req: Request, res: Response) => {
    res.json(await leadsEntity.updateOne({ '_id': req.params.leadId }, req.body));
});