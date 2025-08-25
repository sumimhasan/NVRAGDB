const mongoose = require('mongoose');
require('dotenv').config();

const DataSchema = new mongoose.Schema({
  DataID: { type: String, unique: true, required: true },
  Data: { type: String, required: true },
  Links: [String],
  Hs: [String],
  Ts: [String],
  CachesTable: { type: Boolean, default: false },
  Values: { type: Number, default: 0, min: 0, max: 10 }
});

const DataModel = mongoose.model('Data', DataSchema);

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("[INFO] MongoDB connected"))
.catch(err => console.error("[ERROR] MongoDB connection:", err));

module.exports = DataModel;
