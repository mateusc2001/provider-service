import express, { Request, Response } from "express";
import {conversationEntity} from "../schemas/conversation.schema";
import {leadsEntity} from "../schemas/leads.schema";
import {MetricsService} from "../service/metrics.service";
import {metricsEntity} from "../schemas/metrics.schema";

export const conversationRoute = express.Router();

conversationRoute.get('/', async (req: Request, res: Response) => {
    res.json(await conversationEntity.find());
});

conversationRoute.get('/:id', async (req: Request, res: Response) => {
    res.json(await conversationEntity.findById(req.params.id));
});

conversationRoute.put('/page/:page/metric-id/:metricId', async (req: Request, res: Response) => {
    const page = req.params.page;
    const metricId = req.params.metricId;
    const leads = await leadsEntity.create({});

    const newConversation = await conversationEntity.create(ConversationMapper.buildNewConversation(leads.id, 1, page));
    MetricsService.addConversation(newConversation.id, metricId)
        .then(() => res.json(newConversation));
});

conversationRoute.put('/etapa/:etapa/conversation-id/:conversationId', async (req: Request, res: Response) => {
    res.json(await conversationEntity.updateOne(
        {
            _id: req.params.conversationId
        },
        { $push: { etapas: { etapa: req.params.etapa } } }
    ));
});

class ConversationMapper {
    public static buildNewConversation(leadId: string, etapa: number, page: string) {
     return {
         page: page,
         leads: leadId,
         etapas: []
     }
    }
}