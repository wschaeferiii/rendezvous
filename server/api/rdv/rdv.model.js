'use strict';

import mongoose from 'mongoose';
import User from '../user/user.model';


var RdvSchema = new mongoose.Schema({
  title: String,
  address: String,
  map: Object,
  users: [User.schema],
  userStartLocations: [{lat: Number, lng: Number}],
  rdvEndLocation: {lat: Number, lng: Number},
  rdvFinishTime: String
}, {timestamps: true}
);


export default mongoose.model('Rdv', RdvSchema);
