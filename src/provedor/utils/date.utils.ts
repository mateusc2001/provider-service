import { TimezoneEnum } from "../enum/timezone.enum";

export class DateUtils {
    public static getActualDateTimezone(date: Date, offset: number = -3): Date {
        return new Date(date.getTime() + offset * 3600 * 1000);
    }

    public static convertTZ(date: Date, tzString: TimezoneEnum) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString(tzString, { timeZone: 'UTC' }));
        // return new Date(date.toLocaleString(tzString, {timeZone: 'UTC'}));   
    }
}