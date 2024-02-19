module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: '16',
        },
      }],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [],
  };
};
