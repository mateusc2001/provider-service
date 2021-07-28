import { chatSettingsEntity } from "../schemas/chat-setting.schema";

export class ChatSettingsService {
    public static findAll() {
        return chatSettingsEntity.find();
    }

    public static create(newChatSettings: any) {
        return chatSettingsEntity.create(newChatSettings);
    }

    public static findByIdPopulateDistricts(id: string) {
        return chatSettingsEntity.findById(id)
            .populate({
                path: 'location',
                select: ['districts', 'fileName']
            });
    }

    public static findById(id: string) {
        return chatSettingsEntity.findById(id);
    }

    public static updateOne(update: any, id: string) {
        return chatSettingsEntity.updateOne({ _id: id }, update);
    }

    public static addPlan(newPlan: any, id: string) {
        return chatSettingsEntity.updateOne(
            {
                _id: id
            },
            {
                $push: {
                    plans: newPlan
                }
            }
        );
    }

    public static addLocationFileData(newLocationFileData: any, id: string) {
        return chatSettingsEntity.updateOne(
            {
                _id: id
            },
            {
                $push: {
                    location: newLocationFileData.id
                }
            }
        );
    }

    public static findPlans(id: string) {
        return chatSettingsEntity.findOne({ _id: id })
            .select('plans');
    }
}