'use strict';

import mongoose from 'mongoose';

var PersonSchema = new mongoose.Schema({
  coords: {
    latitude: Number,
    longitude: Number
  }
});

export default mongoose.model('Person', PersonSchema);
