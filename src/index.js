import chalk from 'chalk';
import defaultLoggers from './defaults';

export default class Logger {
	output = console.log;

	loggers = undefined;

	enabled = true;

	constructor() {
		this.setLoggers(defaultLoggers);
	}

	_createMessage = objectIn => {
		if (typeof objectIn !== 'object') {
			return objectIn;
		}

		let string = '';

		objectIn.forEach(object => {
			let chalkInstance;

			if (typeof object.styles === 'string') {
				chalkInstance = chalk[object.styles];
			} else if (typeof object.styles === 'object') {
				chalkInstance = chalk;
				object.styles.forEach(element => {
					chalkInstance = chalkInstance[element];
				});
			}

			if (chalkInstance) {
				string += chalkInstance(typeof object.text === 'function' ? object.text() : object.text) + ' ';
			} else {
				string += (typeof object.text === 'function' ? object.text() : object.text) + ' ';
			}
		});

		return string;
	}

	setLoggers = loggers => {
		this.loggers = loggers;
	}

	addLogger = (name, logger) => {
		this.loggers[name] = logger;
	}

	addLoggers = loggers => {
		this.loggers = Object.assign({}, this.loggers, loggers);
	}

	removeLogger = name => {
		this.loggers[name] = undefined;
	}

	resetLoggers = () => {
		this.loggers = defaultLoggers;
	}

	log = (loggerName, messageIn) => {
		if (!this.loggers[loggerName]) {
			throw new Error('LOGGER_NOT_FOUND');
		}

		if (!messageIn) {
			throw new Error('NO_MESSAGE_SPECIFIED');
		}

		const logger = this.loggers[loggerName];

		if (typeof logger.enabled === 'function') {
			if (!logger.enabled()) {
				return false;
			}
		} else if (logger.enabled === false) {
			return false;
		}

		if (typeof this.enabled === 'function') {
			if (!this.enabled()) {
				return false;
			}
		} else if (this.enabled === false) {
			return false;
		}

		let string = '';

		string += this._createMessage(logger.styling);
		string += this._createMessage(messageIn);

		this.output(string);
		return true;
	}
}
