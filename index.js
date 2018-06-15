import figures from 'figures';

const defaultPattern = [
  [
    {
      text:() => new Date().toLocaleTimeString(),
      styles: 'grey'
    },
    {
      text = figures.pointerSmall,
      styles: 'grey'
    },
  ]
];

const defaultLoggers = {
  info: Object.assign({}, defaultPattern[0], {
    text: 'info',
    styles: 'blue underline'
  })
};

export default class Logger {
  output = console.log;
}
