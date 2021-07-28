export class LocationFileDataModel {
    constructor(
        public _id: string,
        public id: string,
        public fileName: string,
        public coodinates: [
            [
                {
                    lat: number,
                    lng: number
                }
            ]
        ],
        public districts: string[]
    ) { }
}