const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path               = require('path');

module.exports = (config, env) => {
    config.plugins = config.plugins.concat([
        new PrerenderSPAPlugin({
            routes   : ['/'],
            staticDir: path.join(__dirname, 'build'),
        }),
    ]);


    return config;
};
