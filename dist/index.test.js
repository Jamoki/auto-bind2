'use strict';

var _ = require('./');

test('unbound fails', () => {
  class Life {
    constructor() {
      this.value = 42;
    }
    message() {
      return this ? this.value : undefined;
    }
  }

  const life = new Life();
  const message = life.message;

  expect(message()).toBeUndefined();
});

test('bound succeeds', () => {
  class Life {
    constructor() {
      (0, _.autoBind)(this);
      this.value = 42;
    }
    message() {
      return this ? this.value : undefined;
    }
  }

  const life = new Life();
  const message = life.message;

  expect(message()).toEqual(42);
});
//# sourceMappingURL=index.test.js.map