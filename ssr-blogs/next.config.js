// // next.config.js
// const withCSS = require('@zeit/next-css');
// // const withSass = require("@zeit/next-sass")
// function HACK_removeMinimizeOptionFromCssLoaders(config) {
//   console.warn(
//     'HACK: Removing `minimize` option from `css-loader` entries in Webpack config',
//   );
//   config.module.rules.forEach(rule => {
//     if (Array.isArray(rule.use)) {
//       rule.use.forEach(u => {
//         if (u.loader === 'css-loader' && u.options) {
//           delete u.options.minimize;
//         }
//       });
//     }
//   });
// }

// module.exports = withCSS({
//   webpack(config) {
//     HACK_removeMinimizeOptionFromCssLoaders(config);
//     return config;
//   },
// });
// // // module.exports = withSass({});
// // const withLess = require('@zeit/next-less')
// // module.exports = withLess({
//   /* config options here */
// // })

module.exports = {
    webpack: (config, { dev }) => {
        config.module.rules.push(
            {
                test: /\.(css|scss)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: 'babel-loader!raw-loader'
            },
            {
                test: /\.scss$/,
                loader: 'babel-loader!raw-loader!sass-loader'
            }
        )
        return config
    }
}