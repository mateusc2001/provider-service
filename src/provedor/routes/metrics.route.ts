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

metricsRoute.get('/chart-metric/first-chart/:internetProvider/start/:start/end/:end', async (req, res) => {
    const providerId = req.params.internetProvider;
    const start = req.params.start;
    const end = req.params.end;

    const conversasIniciadas = (await InternetProviderService.findConversationsWithEtapaBiggerThan(providerId, 2, start, end));
    const semOportunidades = (await InternetProviderService.findConversationsWithoutDisponibility(providerId, start, end));
    const oportunidades = (await InternetProviderService.findConversationsWithDisponibility(providerId, start, end));
    const vendas = (await InternetProviderService.findConversationsWithEtapaBiggerThan(providerId, 11, start, end));
    const leads = (await InternetProviderService.findConversationsLeads(providerId, start, end, 1, 2));

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

metricsRoute.get('/vendas/:providerId/start/:start/end/:end/page/:page/count/:count', async (req, res) => {
    const providerId = req.params.providerId;
    const start = req.params.start;
    const end = req.params.end;
    const page = Number(req.params.page);
    const count = Number(req.params.count);

    const vendas = (await InternetProviderService.findConversationsWithVenda(providerId, start, end, page, count));
    const response = vendas.metrics.conversations.map((conversation: any) => conversation.leads);
    res.json(response);
});

metricsRoute.get('/vendas/planos/:providerId/start/:start/end/:end/page/:page/count/:count', async (req, res) => {
    const providerId = req.params.providerId;
    const start = req.params.start;
    const end = req.params.end;
    const page = Number(req.params.page);
    const count = Number(req.params.count);

    const vendas = (await InternetProviderService.findPlansInVenda(providerId, start, end, page, count));
    const planos = vendas.metrics.conversations.map((conversation: any) => conversation.leads.planoSelecionado);

    const semRepetidos = planos
        .filter((el: any, i: number) => planos.map((elemento: any) => elemento.id).indexOf(el.id) == i)
        .map((plano: any) => {
            return {
                totalVendidos: plano.totalVendido = planos.filter((plan: any) => plan.id == plano.id).length,
                title: plano.title,
                price: plano.price,
                periodoDeCobranca: plano.periodoDeCobranca,
                speed: plano.speed
            };
        });
    res.json(semRepetidos);
});