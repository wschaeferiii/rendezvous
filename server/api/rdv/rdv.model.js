'use strict';

import mongoose from 'mongoose';

var RdvSchema = new mongoose.Schema({
  title: String,
  originAddress: String,
  destinationAddress: String
});

export default mongoose.model('Rdv', RdvSchema);
