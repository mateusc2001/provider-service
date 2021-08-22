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
    const chatSettingsId = req.body.id;
    await ChatSettingsService.updateOne(req.body, chatSettingsId);
    res.json(await ChatSettingsService.findByIdWithout(chatSettingsId));
});

chatSettingsRoute.put('/add/plan', async (req: Request, res: Response) => {
    const newPlan = req.body.plan;
    const id = req.body.id;
    await ChatSettingsService.addPlan(newPlan, id);
    res.json(await ChatSettingsService.findPlans(id));
});

chatSettingsRoute.get('/find/plans/:id', async (req: Request, res: Response) => {
    const response: any = (await ChatSettingsService.findPlansByInternetProviderId(req.params.id));
    response.chatSettings.plans.forEach((item: any) => item.id = item['_id']);
    res.json(response.chatSettings.plans);
});