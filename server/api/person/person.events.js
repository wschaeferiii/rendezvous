/**
 * Person model events
 */

'use strict';

import {EventEmitter} from 'events';
import Person from './person.model';
var PersonEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PersonEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Person.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PersonEvents.emit(event + ':' + doc._id, doc);
    PersonEvents.emit(event, doc);
  }
}

export default PersonEvents;
