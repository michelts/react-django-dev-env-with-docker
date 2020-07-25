const BundleTracker = require('webpack-bundle-tracker');
const inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  webpack: (config, env) => {
    // Use an explicit common chunks name to avoid call it "undefined" in the django side
    config.optimization.splitChunks.name = 'vendors';

    config.output.publicPath = (!inProduction ? 'http://localhost:3000/' : '');

    // Generate the stats file to tell where each chunk can be located
    config.plugins.push(
      new BundleTracker({ filename: '../bundles/frontend-stats.json' }),
    );

    if (!inProduction) {
      // Configure hot reload
      config.entry = config.entry.filter(
        confItem => !confItem.includes('webpackHotDevClient')
      );
      config.entry.push(
        require.resolve('webpack-dev-server/client') + '?http://localhost:3000'
      );
      config.entry.push(require.resolve('webpack/hot/dev-server'));
    }
    return config;
  },

  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {'Access-Control-Allow-Origin': '*'};
      return config;
    };
  },
};
