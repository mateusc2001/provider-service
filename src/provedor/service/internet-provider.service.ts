import {InternetProviderEntity} from "../entity/internet-provider.entity";
import {internetProviderEntity} from "../schemas/internet-provider.schema";

export class InternetProviderService {
    public static findPlansByInternetProviderId(providerId: string): any {
        return InternetProviderEntity.findPlansByInternetProviderId(providerId);
    }

    public static findConversationsWithEtapaBiggerThan(providerId: string, etapa: number, start: string, end: string): any {
        return InternetProviderEntity.findConversationsWithEtapaBiggerThan(providerId, etapa, start, end);
    }

    public static findConversationsWithDisponibility(providerId: string, start: string, end: string): any {
        return InternetProviderEntity.findConversationsWithDisponibility(providerId, start, end);
    }

    public static findConversationsWithoutDisponibility(providerId: string, start: string, end: string): any {
        return InternetProviderEntity.findConversationsWithoutDisponibility(providerId, start, end);
    }

    public static findConversationsLeads(providerId: string, start: string, end: string, page: number, count: number): any {
        return InternetProviderEntity.findConversationsLeads(providerId, start, end, page, count);
    }

    public static findConversationsWithVenda(providerId: string, start: string, end: string, page: number, count: number): any {
        return InternetProviderEntity.findConversationsWithVenda(providerId, start, end, page, count);
    }

    public static findPlansInVenda(providerId: string, start: string, end: string, page: number, count: number): any {
        return InternetProviderEntity.findPlansInVenda(providerId, start, end, page, count);
    }
}