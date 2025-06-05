 export class Event {
    id: number;
    name: string;
    date: Date;
    location: string;
    description?: string;
    organizerId: string;
    organizerType: string;
    admins: string[];
 }