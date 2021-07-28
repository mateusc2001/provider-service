import { internetProviderSettingsEntity } from "../schemas/internet-provider-settings.schema";

export class InternetProviderSettingsService {
    public static create(newSettings: any) {
        return internetProviderSettingsEntity.create(newSettings);
    }

    public static findAll() {
        return internetProviderSettingsEntity.find();
    }

    public static findById(id: string) {
        return internetProviderSettingsEntity.findById(id);
    }

    public static updateOne(update: any, id: string) {
        return internetProviderSettingsEntity.updateOne({ _id: id }, update);
    }
}