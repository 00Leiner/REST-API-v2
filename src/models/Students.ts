import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface IStudents extends Document {
  program: string;
  major: string;
  year: string;
  semester: string;
  block: string;
}

/** schema */
const StudentsSchema: Schema = new Schema({
  program: { type: String, required: true },
  major: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  block: { type: String, required: true },
});

export default mongoose.model<IStudents>('Students', StudentsSchema);
