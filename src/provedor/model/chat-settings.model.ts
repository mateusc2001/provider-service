import { LocationFileDataModel } from "./location-file-data.model";

export class ChatSettingsModel {
    constructor(
        public title: string,
        public primaryColor: string,
        public image: string,
        public location: LocationFileDataModel,
        public whatsappNumber: string,
        public whatsappMessage: string,
        public clientPageUrl: string,
        public plans: [
            {
                id: string,
                title: string,
                price: number,
                periodoDeCobranca: string,
                speed: number,
                color: string,
                contemplate: string[],
                notContemplate: string[]
            }
        ]
    ) { }
}