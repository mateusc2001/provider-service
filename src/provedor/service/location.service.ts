import { locationFileDataEntity } from "../schemas/location-file-data.schema";
import { ChatSettingsService } from "./chat-settings.service";
import {ChatSettingsModel} from "../model/chat-settings.model";
import {InternetProviderEntity} from "../entity/internet-provider.entity";

export class LocationService {

    static readonly INF = 10000;

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

    public static async verifyDisponibility(providerId: string, lat: string, lng: string) {
        const providerService = await InternetProviderEntity.findLocationsByInternetProviderId(providerId);

        const cordenadas = providerService.chatSettings.location
            .map((location: any) => location.coordinates)
            .reduce((acc: any, cur: any) => [...acc, ...cur], []);

        const disponibility = cordenadas
            .map((itens: any[]) => itens.map((item: any) => this.point(item.lng, item.lat)))
            .some((item: any) => LocationService
                .isInside(item, item.length, this.point(lat, lng)));

        if (!disponibility) throw new Error('Infelizmente não temos disponibilidade neste endereço.');
    }

    public static point(x: any, y: any) {
        return {
            x: x,
            y: y
        }
    }

    public static onSegment(p: any, q: any, r: any) { //boolean
        if (q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y)) {
            return true;
        }
        return false;
    }

    public static orientation(p: any, q: any, r: any) { //number
        let val = (q.y - p.y) * (r.x - q.x)
            - (q.x - p.x) * (r.y - q.y);

        if (val == 0) {
            return 0; // colinear
        }
        return (val > 0) ? 1 : 2; // clock or counterclock wise
    }

    public static  doIntersect(p1: any, q1: any, p2: any, q2: any) { //boolean
        let o1 = this.orientation(p1, q1, p2);
        let o2 = this.orientation(p1, q1, q2);
        let o3 = this.orientation(p2, q2, p1);
        let o4 = this.orientation(p2, q2, q1);

        if (o1 != o2 && o3 != o4) {
            return true;
        }

        if (o1 == 0 && this.onSegment(p1, p2, q1)) {
            return true;
        }

        if (o2 == 0 && this.onSegment(p1, q2, q1)) {
            return true;
        }

        if (o3 == 0 && this.onSegment(p2, p1, q2)) {
            return true;
        }

        if (o4 == 0 && this.onSegment(p2, q1, q2)) {
            return true;
        }

        return false;
    }

    public static isInside(polygon: any, n: any, p: any) { // boolean
        if (n < 3) {
            return false;
        }

        let extreme = this.point(this.INF, p.y);

        let count = 0, i = 0;
        do {
            let next = (i + 1) % n;

            if (this.doIntersect(polygon[i], polygon[next], p, extreme)) {
                if (this.orientation(polygon[i], p, polygon[next]) == 0) {
                    return this.onSegment(polygon[i], p,
                        polygon[next]);
                }

                count++;
            }
            i = next;
        } while (i != 0);

        return (count % 2 == 1);
    }
}