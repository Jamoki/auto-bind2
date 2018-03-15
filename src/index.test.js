import { autoBind, reactAutoBind, isReactMethod } from './'

test('unbound fails', () => {
  class Life {
    constructor() {
      this.value = 42
    }
    message() {
      return this ? this.value : undefined
    }
  }

	const life = new Life()
	const message = life.message

  expect(message()).toBeUndefined()
})

test('bound succeeds', () => {
  class Life {
    constructor() {
      autoBind(this)
      this.value = 42
    }
    message() {
      return this.value
    }
  }

	const life = new Life()
	const func = life.message

  expect(func()).toEqual(42)
})

test('property succeeds', () => {
  class WithValue {
    constructor() {
      autoBind(this)
      this.value = 42
    }

    get theValue() {
      return this.value
    }
    set theValue(value) {
      this.value = value
    }
  }

  let withValue = new WithValue()

  withValue.theValue = 100
  expect(withValue.theValue).toEqual(100)
})

test('react method check succeeds', () => {
  expect(isReactMethod('componentWillMount')).toBeTruthy()
})

test('react bind succeeds', () => {
  class Life {
    constructor() {
      reactAutoBind(this)
      this.value = 42
    }
    componentWillMount() {
      return this ? this.value : undefined
    }
  }

  const life = new Life()
  const func = life.componentWillMount

  expect(func()).toBeUndefined()
})
