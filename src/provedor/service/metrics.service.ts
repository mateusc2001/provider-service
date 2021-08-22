import { metricsEntity } from "../schemas/metrics.schema";
import {leadsEntity} from "../schemas/leads.schema";

export class MetricsService {
    public static create(newMetric: any) {
        return metricsEntity.create(newMetric);
    }

    public static findAll() {
        return metricsEntity.find();
    }

    public static findById(id: string) {
        return metricsEntity.findById(id)
            .populate('leads');
    }

    public static addImpression(newImpression: any, id: string) {
        return metricsEntity.updateOne(
            {
                _id: id
            },
            { $push: { impressions: newImpression } }
        );
    }

    public static async addConversation(newConversation: any, id: string) {
        const leads = await leadsEntity.create({});
        newConversation.leads = leads?.id;
        return metricsEntity.findOneAndUpdate(
            {
                _id: id
            },
            { $push: { conversations: newConversation } }
        );
    }

    public static async addEtapa(novaEtapa: any, metricId: string, conversationId: string) {
        const metric = await metricsEntity.findById(metricId);
    
        const conversation = await metric?.conversations.find(item => item._id == conversationId);

        if (!!conversation) {
            conversation.etapas.push(novaEtapa);
        }
        return metricsEntity.updateOne(
            {
                _id: metricId
            },
            {
                conversations: metric?.conversations
            }
        );
    }
}