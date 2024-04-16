import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface ISchedule extends Document {
    options: string,
    programs: Array<{
      _id: string;
      program: string,
      major: string,
      year: string,
      semester: string,
      block: string,
      sched: Array<{
          _id: string;
          courseCode: string,
          courseDescription: string,
          courseUnit: string,
          day: string,
          time: string, 
          room: string,
          instructor: string,
        }>;
    }>;
  };

 /** schema */
 const ScheduleSchema = new Schema({
  options: { type: String, required: true },
  programs: [{
    _id: { type: Schema.Types.ObjectId, auto: true }, // Specify Schema.Types.ObjectId for automatic generation
    program: { type: String, required: true },
    major: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    block: { type: String, required: true },
    sched: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true }, // Specify Schema.Types.ObjectId for automatic generation
        courseCode: { type: String, required: true },
        courseDescription: { type: String, required: true },
        courseUnit: { type: String, required: true },
        day: { type: String, required: true },
        time: { type: String, required: true },
        room: { type: String, required: true },
        instructor: { type: String, required: true },
      },
    ],
  }],
});
  
export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);