/**
 * Rdv model events
 */

'use strict';

import {EventEmitter} from 'events';
import Rdv from './rdv.model';
var RdvEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RdvEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Rdv.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RdvEvents.emit(event + ':' + doc._id, doc);
    RdvEvents.emit(event, doc);
  }
}

export default RdvEvents;
