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

    public static findConversationsWithEtapaBiggerThan(internetProviderId: string, etapa: number, start: string, end: string): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'etapas.etapa': {$gte: etapa},
                        'createdAt': {
                            $gte: new Date(start),
                            $lt: new Date(end)
                        }
                    }
                }
            })
    }

    public static findConversationsWithVenda(internetProviderId: string, start: string, end: string, page: number, count: number): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'etapas.etapa': {$gte: 11},
                        'createdAt': {
                            $gte: new Date(start),
                            $lt: new Date(end)
                        }
                    },
                    populate: {
                        path: 'leads',
                        select: ['nome', 'celular', 'email', 'cpf', 'localidade', 'bairro', 'cep']
                    },
                    options: {
                        limit: count,
                        skip: count * (page - 1)
                    }
                }
            });
    }

    public static findConversationsWithDisponibility(internetProviderId: string, start: string, end: string): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'hasDisponibility': true,
                        'createdAt': {
                            $gte: new Date(start),
                            $lt: new Date(end)
                        }
                    }
                }
            });
    }

    public static findConversationsWithoutDisponibility(internetProviderId: string, start: string, end: string): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'hasDisponibility': false,
                        'createdAt': {
                            $gte: new Date(start),
                            $lt: new Date(end)
                        }
                    }
                }
            });
    }

    public static findConversationsLeads(internetProviderId: string, start: string, end: string, page: number, count: number): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        $or: [{hasDisponibility: false}, {hasDisponibility: null}],
                        'createdAt': {
                            $gte: new Date(start),
                            $lt: new Date(end)
                        }
                    },
                    options: {
                        limit: count,
                        skip: count * (page - 1)
                    }
                }
            });
    }

    public static findPlansInVenda(internetProviderId: string, start: string, end: string, page: number, count: number): any {
        return internetProviderEntity.findById(internetProviderId)
            .populate({
                path: 'metrics',
                populate: {
                    path: 'conversations',
                    match: {
                        'etapas.etapa': {$gte: 11},
                        'createdAt': {
                            $gte: new Date(start),
                            $lt: new Date(end)
                        }
                    },
                    populate: {
                        path: 'leads',
                        select: ['planoSelecionado']
                    },
                    options: {
                        limit: count,
                        skip: count * (page - 1)
                    }
                }
            });
    }


}