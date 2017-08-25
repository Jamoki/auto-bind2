'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.reactAutoBind = reactAutoBind;
function autoBind(obj, filter) {
	filter = filter || (() => true);

	Object.getOwnPropertyNames(obj.constructor.prototype).forEach(name => {
		const val = obj[name];

		if (name !== 'constructor' && typeof val === 'function' && filter(name)) {
			obj[name] = val.bind(obj);
		}
	});

	return obj;
}

exports.autoBind = autoBind;
exports.default = autoBind;
const isReactMethod = exports.isReactMethod = name => {
	'render', 'componentWillReceiveProps', 'componentDidMount', 'componentDidUpdate', 'shouldComponentUpdate', 'componentWillUnmount', 'componentWillUpdate', 'forceUpdate', 'componentWillMount';
};

function reactAutoBind(obj, filter) {
	filter = filter || (() => true);
	return autoBind(obj, name => !isReactMethod(name) && filter(name));
}
//# sourceMappingURL=index.js.map