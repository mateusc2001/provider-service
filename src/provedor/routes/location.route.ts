import express, { Request, Response } from "express";

import { LocationService } from "../service/location.service";

export const locationRoute = express.Router();

locationRoute.post('/:chatSettingsId', async (req: Request, res: Response) => {
    const newLocation = req.body;
    res.json(await LocationService.create(newLocation, req.params.chatSettingsId));
});

locationRoute.get('/', async (req: Request, res: Response) => {
    res.json(await LocationService.findAll());
});

locationRoute.get('/:locationId', async (req: Request, res: Response) => {
    res.json(await LocationService.findById(req.params.locationId));
});

locationRoute.delete('/:locationId', async (req: Request, res: Response) => {
    res.json(await LocationService.delete(req.params.locationId));
});

locationRoute.put('/', async (req: Request, res: Response) => {
    res.json(await LocationService.update(req.body));
});