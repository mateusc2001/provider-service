import express, { Request, Response } from "express";
import { MetricsService } from "../service/metrics.service";
import {metricsEntity} from "../schemas/metrics.schema";
import {conversationEntity} from "../schemas/conversation.schema";
import internal from "stream";
import {internetProviderEntity} from "../schemas/internet-provider.schema";
import {InternetProviderService} from "../service/internet-provider.service";

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

metricsRoute.patch('/conversations/leads', async (req: Request, res: Response) => {
    const body = req.body;
    const conversationId = req.body.conversationId;
    res.json(await metricsEntity.updateOne({ 'conversations._id': conversationId }, {'$set': { 'conversations.$.leads': body } }));
});

metricsRoute.get('/chart-metric/first-chart/:internetProvider', async (req, res) => {
    const providerId = req.params.internetProvider;

    const conversasIniciadas = (await InternetProviderService.findConversationsWithEtapaBiggerThan(providerId, 2));
    const semOportunidades = (await InternetProviderService.findConversationsWithoutDisponibility(providerId));
    const oportunidades = (await InternetProviderService.findConversationsWithDisponibility(providerId));
    const vendas = (await InternetProviderService.findConversationsWithEtapaBiggerThan(providerId, 11));
    const leads = (await InternetProviderService.findConversationsLeads(providerId));

    const response = {
        firstChart: {
            conversasIniciadas: !!conversasIniciadas ? conversasIniciadas.metrics.conversations.length : -1,
            oportunidades: !!oportunidades ? oportunidades.metrics.conversations.length : -1,
            vendas: !!vendas ? vendas.metrics.conversations.length : -1
        },
        secondChart: {
            conversasIniciadas: !!conversasIniciadas ? conversasIniciadas.metrics.conversations.length : -1,
            semOportunidades: !!semOportunidades ? semOportunidades.metrics.conversations.length : -1,
            leads: !!leads ? leads.metrics.conversations.length : -1
        }
    }
    res.json(response);
});

metricsRoute.get('/vendas/:providerId', async (req, res) => {
    const providerId = req.params.providerId;
    const vendas = (await InternetProviderService.findConversationsWithVenda(providerId));
    const response = vendas.metrics.conversations.map((conversation: any) => conversation.leads);
    res.json(response);
});