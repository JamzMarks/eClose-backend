import { Injectable } from "@nestjs/common";
import { Event } from "./event.entity";

@Injectable()   
export class EventService {

    getEvents(): Event[]{
        return [
            {
                id: 1,
                name: "Tech Conference",
                date: new Date("2023-10-01"),
                location: "San Francisco",
                description: "A conference about the latest in tech.",
                organizer: "Tech Corp"
            },
            {
                id: 2,
                name: "Music Festival",
                date: new Date("2023-11-15"),
                location: "Los Angeles",
                description: "A festival featuring various music artists.",
                organizer: "Music Inc"
            }
        ];
    }
    getEventById(id: number): Event {
        return {
            id: id,
            name: "Sample Event",
            date: new Date("2023-12-01"),
            location: "New York",
            description: "A sample event for demonstration purposes.",
            organizer: "Sample Organizer"
        };
    }
    createEvent(event: Event): string {
        return `Event ${event.name} created successfully`;
    }
    updateEvent(id: number, event: Event): string {
        return `Event with ID: ${id} updated successfully`;
    }
    deleteEvent(id: number): string {
        return `Event with ID: ${id} deleted successfully`;
    }

}