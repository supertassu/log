import figures from 'figures';
import chalk from 'chalk';

const defaultLoggers = {
	info: {
		styling: [
			{
				text: () => `[${new Date().toLocaleTimeString()}]`,
				styles: 'grey'
			},
			{
				text: 'info',
				styles: ['blue', 'underline']
			},
			{
				text: figures.pointerSmall,
				styles: 'grey'
			}
		]
	},
	warn: {
		styling: [
			{
				text: () => `[${new Date().toLocaleTimeString()}]`,
				styles: 'grey'
			},
			{
				text: 'warning',
				styles: ['yellow', 'underline']
			},
			{
				text: figures.pointerSmall,
				styles: 'grey'
			}
		]
	},
	debug: {
		styling: [
			{
				text: () => `[${new Date().toLocaleTimeString()}]`,
				styles: 'grey'
			},
			{
				text: 'debug',
				styles: ['magenta', 'underline']
			},
			{
				text: figures.pointerSmall,
				styles: 'grey'
			}
		],
		enabled: process.env.NODE_ENV !== 'production'
	},
	disabled: {
		styling: [],
		enabled: false
	}
};

export default class Logger {
	output = console.log;

	loggers = undefined;

	constructor() {
		this.setLoggers(defaultLoggers);
	}

	_createMessage = objectIn => {
		if (typeof objectIn !== 'object') {
			return objectIn;
		}

		let string = '';

		objectIn.forEach(object => {
			let chalkInstance = chalk;

			if (typeof object.styles === 'string') {
				chalkInstance = chalkInstance[object.styles];
			} else if (typeof object.styles === 'object') {
				object.styles.forEach(element => {
					chalkInstance = chalkInstance[element];
				});
			} else {
				throw new TypeError('INVALID_TYPE ' + typeof object.styles);
			}

			if (typeof object.text === 'string') {
				string += chalkInstance(object.text) + ' ';
			} else {
				string += chalkInstance(object.text()) + ' ';
			}
		});

		return string;
	}

	setLoggers = loggers => {
		this.loggers = loggers;
	}

	log = (loggerName, messageIn) => {
		if (!this.loggers[loggerName]) {
			throw new Error('LOGGER_NOT_FOUND');
		}

		if (!messageIn) {
			throw new Error('NO_MESSAGE_SPECIFIED');
		}

		const logger = this.loggers[loggerName];

		if (logger.enabled === false) {
			return false;
		}

		let string = '';

		string += this._createMessage(logger.styling);
		string += this._createMessage(messageIn);

		this.output(string);
		return true;
	}
}
