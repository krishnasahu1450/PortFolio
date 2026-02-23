import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  content?: string;
  image: string;
  gallery?: string[];
  tags: string[];
  status: 'live' | 'draft' | 'archived';
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  tags: [{ type: String }],
  status: { type: String, enum: ['live', 'draft', 'archived'], required: true },
  category: { type: String, required: true },
  demoUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, required: true },
  order: { type: Number, required: true },
}, {
  timestamps: true
});

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);