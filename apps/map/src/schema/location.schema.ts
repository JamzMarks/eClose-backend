import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true }) type: 'event' | 'venue';
  @Prop({ required: true }) refId: string;

  @Prop({
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Prop() name: string;
  @Prop() address: string;
  @Prop() metadata?: Record<string, any>;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
LocationSchema.index({ location: '2dsphere' });