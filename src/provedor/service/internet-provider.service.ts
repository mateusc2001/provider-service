import {InternetProviderEntity} from "../entity/internet-provider.entity";
import {internetProviderEntity} from "../schemas/internet-provider.schema";

export class InternetProviderService {
    public static findPlansByInternetProviderId(providerId: string): any {
        return InternetProviderEntity.findPlansByInternetProviderId(providerId);
    }

    public static findConversationsWithEtapaBiggerThan(providerId: string, etapa: number): any {
        return InternetProviderEntity.findConversationsWithEtapaBiggerThan(providerId, etapa);
    }

    public static findConversationsWithDisponibility(providerId: string): any {
        return InternetProviderEntity.findConversationsWithDisponibility(providerId);
    }

    public static findConversationsWithoutDisponibility(providerId: string): any {
        return InternetProviderEntity.findConversationsWithoutDisponibility(providerId);
    }

    public static findConversationsLeads(providerId: string): any {
        return InternetProviderEntity.findConversationsLeads(providerId);
    }

    public static findConversationsWithVenda(providerId: string): any {
        return InternetProviderEntity.findConversationsWithVenda(providerId);
    }
}