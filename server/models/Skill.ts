import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'devops';
  proficiency: number;
  icon: string;
  status: 'active' | 'hidden';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  category: { type: String, enum: ['frontend', 'backend', 'design', 'tools', 'devops'], required: true },
  proficiency: { type: Number, required: true },
  icon: { type: String, required: true },
  status: { type: String, enum: ['active', 'hidden'], required: true },
  order: { type: Number, required: true },
}, {
  timestamps: true
});

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);