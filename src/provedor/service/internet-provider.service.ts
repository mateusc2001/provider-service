import {InternetProviderEntity} from "../entity/internet-provider.entity";

export class InternetProviderService {
    public static findPlansByInternetProviderId(providerId: string): any {
        return InternetProviderEntity.findPlansByInternetProviderId(providerId);
    }
}