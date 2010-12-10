var Timecop = (function(){

  var slice = Array.prototype.slice;

  // save the native Date implementation:
  var NativeDate = window.Date;

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
        Timecop.return();
      }
    }
  };

  return {
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
      window.Date = Timecop.MockDate;
    },

    // Have Timecop no longer intercept calls to new Date().
    uninstall: function() {
      window.Date = Timecop.NativeDate;
    },

    // The native Date implementation.
    NativeDate: NativeDate,

    // Travel to the given Date and keep time running.
    travel: function() {
      takeTrip('travel', slice.call(arguments));
    },

    // Travel to the given Date and stop time.
    freeze: function() {
      takeTrip('freeze', slice.call(arguments));
    },

    // Pop one level off the stack.
    return: function() {
      timeStack.clear();
    },

    // @return [Timecop.TimeStackItem] the current time-travel operation, if any
    topOfStack: function() {
      return timeStack.peek();
    }
  };

})();
