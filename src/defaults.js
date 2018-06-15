import figures from 'figures';

export default {
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
	}
};
