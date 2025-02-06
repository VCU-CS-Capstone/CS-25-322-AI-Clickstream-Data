import mongoose from 'mongoose';

const ClickSchema = new mongoose.Schema({
  sessionId: String,
  buttonName: String,
  clickTime: Date,
});

export default mongoose.model('Click', ClickSchema);
