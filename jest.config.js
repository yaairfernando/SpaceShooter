module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: ['jest-canvas-mock'],
};
