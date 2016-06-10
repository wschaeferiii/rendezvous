'use strict';

import mongoose from 'mongoose';

var RdvSchema = new mongoose.Schema({
  coords: {
    latitude: Number,
    longitude: Number
  },
  address: String
});

export default mongoose.model('Rdv', RdvSchema);
