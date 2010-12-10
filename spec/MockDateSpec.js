describe('Timecop.MockDate', function() {

  var now, date;
  
  beforeEach(function() {
    now = new Date();
    Timecop.install();
  });

  afterEach(function() {
    Timecop.return();
    Timecop.uninstall();
  });

  describe('when created in the present without arguments', function() {
    beforeEach(function() {
      date = new Timecop.MockDate();
    });

    it('should be about the same as now', function() {
      expect(date).toBeCloseInTimeTo(now);
    });
  });

  describe('when created while time traveling to the past without arguments', function() {
    beforeEach(function() {
      Timecop.travel(1980, 4, 29);
      date = new Timecop.MockDate();
    });

    it('should be in the past', function() {
      expect(date.getFullYear()).toEqual(1980);
    });

    it('should stay in the past even after we return to the present', function() {
      Timecop.return();
      expect(date.getFullYear()).toEqual(1980);
    });
  });

  describe('when created with year, month, date', function() {
    beforeEach(function() {
      date = new Timecop.MockDate(1838, 8, 18, 16, 45);
    });

    it('should ignore our time travels', function() {
      expect(date.getFullYear()).toEqual(1838);
      Timecop.travel(1945, 5, 6);
      expect(date.getFullYear()).toEqual(1838);
      Timecop.return();
      expect(date.getFullYear()).toEqual(1838);
    });
  });

});
