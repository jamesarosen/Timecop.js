//  Timecop.js version 0.0.2
//  (c) 2010 James A. Rosen, Zendesk Inc.
//  Timecop.js is freely distributable under the MIT license.
//  The concept and some of the structure is borrowed from Timecop,
//  John Trupiano's Ruby gem, which can be found at
//  https://github.com/jtrupiano/timecop. Some project structure
//  inspired by Underscore, Jeremy Ashkenas's Javascript library for
//  functional programming support, which can be found at
//  https://github.com/documentcloud/underscore.
//  For all details, documentation, and bug reports, see
//  http://github.com/jamesarosen/Timecop.js

(function(){
// Establish the root object, `window` in the browser, or `global` on the server.
var root = this;

// Save the previous value of the 'Timecop' variable:
var previousUnderscore = root.Timecop;

var slice = Array.prototype.slice;

// the stack of Timecop.NativeDates.
var timeStack = [];

timeStack.peek = function() {
  if (this.length > 0) {
    return this[this.length - 1];
  } else {
    return null;
  }
};

timeStack.clear = function() {
  this.splice(0, this.length);
};

// Extract a function from a list of arguments if it's the last.
// @return [Array] an Array, in which element 0 is the remaining
//                 arguments and element 1 is the function, if given.
var extractFunction = function(args) {
  if (args.length > 0 && typeof(args[args.length - 1]) === 'function') {
    var fn = args.pop();
    return fn;
  }
  return null;
};

var takeTrip = function(type, args) {
  var fn = extractFunction(args);
  var date = Timecop.buildNativeDate.apply(Timecop, args);
  if (isNaN(date.getYear())) {
    throw 'Could not parse date: "' + args.join(', ') + '"';
  }
  timeStack.push(new Timecop.TimeStackItem(type, date));

  if (fn) {
    try {
      fn();
    } finally {
      Timecop.returnToPresent();
    }
  }
};

var Timecop = {
  // The native Date implementation.
  NativeDate: root.Date,

  // Build a native Date object from the arguments.
  // Uses the same semantics as normal Javascript
  // Dates.
  // @return [Timecop.NativeDate] a new Date
  buildNativeDate: function() {
    // Sadly, there's no way to apply arguments
    // to a constructor without passing them as an
    // array, which changes the semantics of new Date().
    if (arguments.length === 0) {
      return new Timecop.NativeDate();
    }
    if (arguments.length === 1) {
      return new Timecop.NativeDate(arguments[0]);
    }
    if (arguments.length === 2) {
      return new Timecop.NativeDate(arguments[0], arguments[1]);
    }
    if (arguments.length === 3) {
      return new Timecop.NativeDate(arguments[0], arguments[1], arguments[2]);
    }
    if (arguments.length === 4) {
      return new Timecop.NativeDate(arguments[0], arguments[1], arguments[2], arguments[3]);
    }
    if (arguments.length === 5) {
      return new Timecop.NativeDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    }
    if (arguments.length === 6) {
      return new Timecop.NativeDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    }
    if (arguments.length === 7) {
      return new Timecop.NativeDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
    }
  },

  // Have Timecop intercept calls to new Date()
  // so you can time travel.
  install: function() {
    root.Date = Timecop.MockDate;
  },

  // Have Timecop no longer intercept calls to new Date().
  uninstall: function() {
    root.Date = Timecop.NativeDate;
  },

  // Travel to the given Date and keep time running.
  travel: function() {
    takeTrip('travel', slice.call(arguments));
  },

  // Travel to the given Date and stop time.
  freeze: function() {
    takeTrip('freeze', slice.call(arguments));
  },

  // Pop one level off the stack.
  returnToPresent: function() {
    timeStack.clear();
  },

  // @return [Timecop.TimeStackItem] the current time-travel operation, if any
  topOfStack: function() {
    return timeStack.peek();
  }
};

// Export Timecop to the global namespace:
root.Timecop = Timecop;

// Export it as a V8 module, if applicable:
if (typeof(exports) !== 'undefined') { exports._ = _; }


// A mock Date implementation.
Timecop.MockDate = function() {
  if (arguments.length > 0 || !Timecop.topOfStack()) {
    this._underlyingDate = Timecop.buildNativeDate.apply(Timecop, Array.prototype.slice.apply(arguments));
  } else {
    this._underlyingDate = Timecop.topOfStack().date();
  }
};

Timecop.MockDate.prototype = {
  getDate:            function() { return this._underlyingDate.getDate(); },
  getDay:             function() { return this._underlyingDate.getDay(); },
  getFullYear:        function() { return this._underlyingDate.getFullYear(); },
  getHours:           function() { return this._underlyingDate.getHours(); },
  getMilliseconds:    function() { return this._underlyingDate.getMilliseconds(); },
  getMinutes:         function() { return this._underlyingDate.getMinutes(); },
  getMonth:           function() { return this._underlyingDate.getMonth(); },
  getSeconds:         function() { return this._underlyingDate.getSeconds(); },
  getTime:            function() { return this._underlyingDate.getTime(); },
  getTimezoneOffset:  function() { return this._underlyingDate.getTimezoneOffset(); },
  getUTCDate:         function() { return this._underlyingDate.getUTCDate(); },
  getUTCDay:          function() { return this._underlyingDate.getUTCDay(); },
  getUTCFullYear:     function() { return this._underlyingDate.getUTCFullYear(); },
  getUTCHours:        function() { return this._underlyingDate.getUTCHours(); },
  getUTCMilliseconds: function() { return this._underlyingDate.getUTCMilliseconds(); },
  getUTCMinutes:      function() { return this._underlyingDate.getUTCMinutes(); },
  getUTCMonth:        function() { return this._underlyingDate.getUTCMonth(); },
  getUTCSeconds:      function() { return this._underlyingDate.getUTCSeconds(); },
  getYear:            function() { return this._underlyingDate.getYear(); },
  toString:           function() { return this._underlyingDate.toString(); }
};


// A data class for carrying around 'time movement' objects.
// Makes it easy to keep track of the time movements on a simple stack.
Timecop.TimeStackItem = function(mockType, time) {
  if (mockType !== 'freeze' && mockType !== 'travel') {
    throw 'Unknown mock_type ' + mockType;
  }
  this.mockType = mockType;
  this._time = time;
  this._travelOffset = this._computeTravelOffset();
};

Timecop.TimeStackItem.prototype = {
  date: function() {
    return this.time();
  },

  time: function() {
    if (this._travelOffset === null) {
      return this._time;
    }
    // console.log('Now: ');
    return new Timecop.NativeDate((new Timecop.NativeDate()).getTime() + this._travelOffset);
  },

  // @api private
  // @return [Integer] millisecond offset traveled, if mockType is 'travel'
  _computeTravelOffset: function() {
    if (this.mockType === 'freeze') {
      return null;
    }
    return this._time.getTime() - (new Timecop.NativeDate()).getTime();
  }
};

})();
