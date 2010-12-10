beforeEach(function() {
  this.addMatchers({
    toHaveFunction: function(methodName) {
      return jQuery.isFunction(this.actual[methodName]);
    },

    toBeCloseInTimeTo: function(otherDate, delta) {
      delta = delta || 500;
      return otherDate.getTime() - delta <= this.getTime() &&
             otherDate.getTime + delta >= this.getTime();
    }
  });
});
