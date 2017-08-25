function autoBind(obj, filter) {
	filter = filter || (() => true)

	Object.getOwnPropertyNames(obj.constructor.prototype).forEach((name) => {
		const val = obj[name]

		if (name !== 'constructor' && typeof val === 'function' && filter(name)) {
			obj[name] = val.bind(obj)
		}
	})

	return obj
}

export { autoBind }
export default autoBind

export const isReactMethod = (name) => {
	'render',
	'componentWillReceiveProps',
	'componentDidMount',
	'componentDidUpdate',
	'shouldComponentUpdate',
	'componentWillUnmount',
	'componentWillUpdate',
	'forceUpdate',
	'componentWillMount'
}

export function reactAutoBind(obj, filter) {
	filter = filter || (() => true)
	return autoBind(obj, (name) => (!isReactMethod(name) && filter(name)))
}
