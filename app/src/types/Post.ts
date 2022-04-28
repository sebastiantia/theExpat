import { User } from "./User";

export type Post = {
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    visitDate: string;
    image: any;
    creator: string;
    heartcount: number;
}
