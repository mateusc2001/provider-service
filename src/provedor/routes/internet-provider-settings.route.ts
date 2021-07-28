import express, { Request, Response } from "express";
import { InternetProviderSettingsService } from "../service/internet-provider-settings.service";

export const internetProviderSettingsRoute = express.Router();

internetProviderSettingsRoute.get('/', async (req: Request, res: Response) => {
    res.json(await InternetProviderSettingsService.findAll());
});

internetProviderSettingsRoute.post('/', async (req: Request, res: Response) => {
    res.json(await InternetProviderSettingsService.create(req.body));
});

internetProviderSettingsRoute.get('/:userId', async (req: Request, res: Response) => {
    res.json(await InternetProviderSettingsService.findById(req.params.userId));
});

internetProviderSettingsRoute.put('/', async (req: Request, res: Response) => {
    res.json(await InternetProviderSettingsService.updateOne(req.body, req.body.id));
});