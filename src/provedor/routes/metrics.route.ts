import express, { Request, Response } from "express";
import { MetricsService } from "../service/metrics.service";
import {metricsEntity} from "../schemas/metrics.schema";

export const metricsRoute = express.Router();

metricsRoute.post('/', async (req: Request, res: Response) => {
    res.json(await MetricsService.create(req.body));
});

metricsRoute.get('/', async (req: Request, res: Response) => {
    res.json(await MetricsService.findAll());
});

metricsRoute.get('/:metricId', async (req: Request, res: Response) => {
    res.json(await MetricsService.findById(req.params.metricId));
});

metricsRoute.put('/impressions', async (req: Request, res: Response) => {
    const body = req.body;
    if (!!body.impressions && body.impressions.length > 0) {
        res.json(await MetricsService.addImpression(body.impressions, body.id));
    } else {
        res.status(500).json({ errorMessage: 'Erro interno.' })
    }
});

metricsRoute.put('/conversations/:metricId', async (req: Request, res: Response) => {
    const body = req.body;
    if (!!body) {
        res.json(await MetricsService.addConversation(body, req.params.metricId));
    } else {
        res.status(500).json({ errorMessage: 'Erro interno.' })
    }
});

metricsRoute.put('/conversations/add/etapa', async (req: Request, res: Response) => {
    const body = req.body;
    res.json(await MetricsService.addEtapa(body.etapa, body.metricId, body.conversationId));
});

metricsRoute.patch('/conversations/leads', async (req: Request, res: Response) => {
    const body = req.body;
    const conversationId = req.body.conversationId;
    res.json(await metricsEntity.updateOne({ 'conversations._id': conversationId }, {'$set': { 'conversations.$.leads': body } }));
});