import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  visibility: 'show' | 'hide';
  status: 'live' | 'pending' | 'rejected';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String },
  visibility: { type: String, enum: ['show', 'hide'], required: true },
  status: { type: String, enum: ['live', 'pending', 'rejected'], required: true },
  order: { type: Number, required: true },
}, {
  timestamps: true
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);