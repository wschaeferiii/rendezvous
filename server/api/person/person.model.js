'use strict';

import mongoose from 'mongoose';

var PersonSchema = new mongoose.Schema({
  currentLat: Number,
  currentLng: Number
});

export default mongoose.model('Person', PersonSchema);
