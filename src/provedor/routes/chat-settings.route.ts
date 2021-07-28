import express, { Request, Response } from "express";
import { ChatSettingsService } from "../service/chat-settings.service";

export const chatSettingsRoute = express.Router();

chatSettingsRoute.get('/', async (req: Request, res: Response) => {
    res.json(await ChatSettingsService.findAll());
});

chatSettingsRoute.post('/', async (req: Request, res: Response) => {
    res.json(await ChatSettingsService.create(req.body));
});

chatSettingsRoute.get('/:userId', async (req: Request, res: Response) => {
    res.json(await ChatSettingsService.findById(req.params.userId));
});

chatSettingsRoute.put('/', async (req: Request, res: Response) => {
    res.json(await ChatSettingsService.updateOne(req.body, req.body.id));
});

chatSettingsRoute.put('/add/plan', async (req: Request, res: Response) => {
    const newPlan = req.body.plan;
    const id = req.body.id;
    await ChatSettingsService.addPlan(newPlan, id);
    res.json(await ChatSettingsService.findPlans(id));
});

chatSettingsRoute.get('/find/plans/:id', async (req: Request, res: Response) => {
    res.json(await ChatSettingsService.findPlans(req.params.id));
});