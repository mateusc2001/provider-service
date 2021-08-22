import {internetProviderEntity} from "../schemas/internet-provider.schema";

export class InternetProviderEntity {

    public static findLocationsByInternetProviderId(providerId: string): any {
        return internetProviderEntity.findById({ '_id': providerId })
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
        return internetProviderEntity.findById({ '_id': providerId })
            .populate(
                {
                    path: 'chatSettings',
                    select: 'plans'
                }
            );
    }
}