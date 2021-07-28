import express, { Request, Response } from "express";
import { MetricsService } from "../service/metrics.service";

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

metricsRoute.put('/conversations', async (req: Request, res: Response) => {
    const body = req.body;
    if (!!body.conversation) {
        res.json(await MetricsService.addConversation(body.conversation, body.id));
    } else {
        res.status(500).json({ errorMessage: 'Erro interno.' })
    }
});

metricsRoute.put('/conversations/etapa', async (req: Request, res: Response) => {
    const body = req.body;
    res.json(await MetricsService.addEtapa(body.etapa, body.metricId, body.conversationId));
});