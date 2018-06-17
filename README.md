# Lög (`@itassu/log`) — a simple but hackable console logger

```javascript
import figures from 'figures';
import Log from '@itassu/log';

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

// Removes a logger by name
log.removeLogger('alert');

// Adds multiple loggers (test1 and test2 in this case)
log.addLoggers({
    test1: { /* snip */ },
    test2: { /* snip */ }
});

// Replaces logger table
log.setLoggers({ /* snip */ });

// Resets back to defaults
log.resetLoggers();
```

![Example output](https://safe.tassu.me/y10gxKREWIVl1ceVkyhmDfH3HjbTlqIy.png)
