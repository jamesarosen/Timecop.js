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

    // Travel to the given Date.
    // @return the new Date.
    travel: function() {
      var d = Timecop.buildNativeDate.call(arguments);
      timeStack.push(d);
      console.log('traveled to ' + d);
      return d;
    },

    // Pop one level off the stack.
    return: function() {
      timeStack.pop();
    },

    // @return [Native Date] the current travelled-to time, if any
    topOfStack: function() {
      return timeStack.peek();
    }
  };

})();
