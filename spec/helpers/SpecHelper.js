beforeEach(function() {
  this.addMatchers({
    toHaveFunction: function(methodName) {
      return jQuery.isFunction(this.actual[methodName]);
    },

    toHaveClass: function(expected) {
      return jQuery(this.actual).hasClass(expected);
    },

    toBeVisible: function() {
      return jQuery(this.actual).is(':visible');
    }
  });
});
