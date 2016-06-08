'use strict';

import mongoose from 'mongoose';

var RdvSchema = new mongoose.Schema({
  destinationAddress: String
});

export default mongoose.model('Rdv', RdvSchema);
