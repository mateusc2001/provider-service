import { metricsEntity } from "../schemas/metrics.schema";

export class MetricsService {
    public static create(newMetric: any) {
        return metricsEntity.create(newMetric);
    }

    public static findAll() {
        return metricsEntity.find();
    }

    public static findById(id: string) {
        return metricsEntity.findById(id);
    }

    public static addImpression(newImpression: any, id: string) {
        return metricsEntity.updateOne(
            {
                _id: id
            },
            { $push: { impressions: newImpression } }
        );
    }

    public static addConversation(newConversation: any, id: string) {
        return metricsEntity.updateOne(
            {
                _id: id
            },
            { $push: { conversations: newConversation } }
        );
    }

    public static async addEtapa(novaEtapa: any, metricId: string, conversationId: string) {
        const metric = await metricsEntity.findById(metricId);
    
        const conversation = await metric?.conversations.find(item => {
            return item._id == conversationId;
        });
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