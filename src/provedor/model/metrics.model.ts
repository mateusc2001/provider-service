export class MetricsModel {
    constructor(
        public impressions: ImpressionsModel[],
        public conversations: ConversationModel[]
    ) { }
}

class ImpressionsModel {
    constructor(
        public page: string
    ) { }
}

class ConversationModel {
    constructor(
        public _id: string,
        public id: string,
        public hasOportunity: boolean,
        public page: string,
        public etapas: [
            {
                horario: Date,
                etapa: number
            }
        ]
    ) { }
}