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
		],
		enabled: true
	}
};

export default class Logger {
	output = console.log;

	loggers = undefined;

	constructor() {
		this.setLoggers(defaultLoggers);
	}

	_createMessage(objectIn) {
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
				console.log(JSON.stringify(object));
				string += chalkInstance(object.text()) + ' ';
			}
		});

		return string;
	}

	setLoggers(loggers) {
		this.loggers = loggers;
	}

	log(loggerName, messageIn) {
		if (!this.loggers[loggerName]) {
			throw new Error('LOGGER_NOT_FOUND');
		}

		const logger = this.loggers[loggerName];

		console.log('logger:', JSON.stringify(logger));

		let string = '';

		string += this._createMessage(logger.styling);

		console.log(string);
	}
}
