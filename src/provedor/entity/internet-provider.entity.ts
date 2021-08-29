import {internetProviderEntity} from "../schemas/internet-provider.schema";

export class InternetProviderEntity {

    public static findLocationsByInternetProviderId(providerId: string): any {
        return internetProviderEntity.findById({'_id': providerId})
            .populate(
                {
                    path: 'chatSettings',
                    select: 'location',
                    populate: {
                        path: 'location',
                        select: 'coordinates'
                    }
                }
            );
    }

    public static findPlansByInternetProviderId(providerId: string): any {
        return internetProviderEntity.findById({'_id': providerId})
            .populate(
                {
                    path: 'chatSettings',
                    select: 'plans'
                }
            );
    }

    public static findConversationsWithEtapaBiggerThan(internetProviderId: string, etapa: number): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'etapas.etapa': {$gte: etapa}
                    }
                }
            })
    }

    public static findConversationsWithVenda(internetProviderId: string): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'etapas.etapa': {$gte: 11}
                    },
                    populate: {
                        path: 'leads',
                        select: ['nome', 'celular', 'email', 'cpf', 'localidade', 'bairro', 'cep']
                    }
                }
            });
    }

    public static findConversationsWithDisponibility(internetProviderId: string): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'hasDisponibility': true
                    }
                }
            });
    }

    public static findConversationsWithoutDisponibility(internetProviderId: string): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'hasDisponibility': false
                    }
                }
            });
    }

    public static findConversationsLeads(internetProviderId: string): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {$or: [{hasDisponibility: false}, {hasDisponibility: null}]}
                }
            });
    }


}