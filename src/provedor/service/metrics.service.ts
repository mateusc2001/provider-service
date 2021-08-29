import { metricsEntity } from "../schemas/metrics.schema";
import {leadsEntity} from "../schemas/leads.schema";
import * as Mongoose from "mongoose";

export class MetricsService {
    public static create(newMetric: any) {
        return metricsEntity.create(newMetric);
    }

    public static findAll() {
        return metricsEntity.find()
            .populate('conversations')
            .populate('leads');
    }

    public static findById(id: string) {
        return metricsEntity.findById(id)
            .populate('conversations')
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

    public static async addConversation(conversationId: any, id: string) {
        return metricsEntity.findOneAndUpdate(
            {
                _id: id
            },
            { $push: { conversations: conversationId } }
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