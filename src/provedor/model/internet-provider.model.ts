import { ChatSettingsModel } from "./chat-settings.model";
import { InternetProviderSettingsModel } from "./internet-provider-settings.model";
import { MetricsModel } from "./metrics.model";
import { UserModel } from "./user.model";

export class InternetProviderModel {
    constructor(
        public users: UserModel[],
        public providerSettings: InternetProviderSettingsModel,
        public chatSettings: ChatSettingsModel,
        public metrics: MetricsModel
    ) {}
}