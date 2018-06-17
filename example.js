import figures from 'figures';
import Log from './src';

// Create a new instance
const log = new Log();

// Use a default logger...
log.log('info', 'Hello world from Lög!');
log.log('warn', 'Danger! This logger is too awesome for you!');

// Or create your custom one
log.addLogger('alert', {
	styling: [
		{
			text: () => `[${new Date().toLocaleTimeString()}]`,
			styles: 'grey'
		},
		{
			text: '[alert]'
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
});

log.log('alert', 'Download now!');

// You can also do this:
log.removeLogger('alert');
log.addLoggers({
	test1: { /* snip */ },
	test2: { /* snip */ }
});

log.resetLoggers();
