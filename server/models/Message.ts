import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isFlagged: boolean;
  replied: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, required: true },
  isFlagged: { type: Boolean, required: true },
  replied: { type: Boolean, required: true },
}, {
  timestamps: true
});

export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);