import { locationFileDataEntity } from "../schemas/location-file-data.schema";
import { ChatSettingsService } from "./chat-settings.service";

export class LocationService {
    public static async create(newLocation: any, chatSettingsId: string) {
        await ChatSettingsService.addLocationFileData(await locationFileDataEntity.create(newLocation), chatSettingsId);
        return ChatSettingsService.findByIdPopulateDistricts(chatSettingsId);
    }

    public static findAll() {
        return locationFileDataEntity.find();
    }

    public static findById(id: string) {
        return locationFileDataEntity.findById(id);
    }

    public static update(obj: any) {
        return locationFileDataEntity.updateOne(
            { _id: obj.id },
            { $set: { 'districts': obj.districts } }
        );
    }

    public static delete(id: string) {
        return locationFileDataEntity.deleteOne({ _id: id });
    }
}