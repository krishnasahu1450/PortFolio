import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  logo?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  order: { type: Number, required: true },
}, {
  timestamps: true
});

export const Experience = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);