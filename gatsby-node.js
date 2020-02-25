/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const glob = require('glob');
const path = require('path');
const babel = require('@babel/core');
const fs = require('fs');

exports.onPostBuild = () => {
  const srcLocation = `${__dirname}/src/functions`;
  const outputLocation = `${__dirname}/public/functions`;

  const modules = glob.sync('*.js', { cwd: srcLocation });
  modules.forEach(src => {
    const moduleSrc = path.join(srcLocation, src);
    const moduleOut = path.join(outputLocation, path.basename(src, path.extname(src)) + '.js');

    console.log('Compile module: ', moduleSrc);
    const out = babel.transformFileSync(moduleSrc, {
      babelrc: true,
      babelrcRoots: srcLocation,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '8.10',
            },
          },
        ]
      ],
    });
    fs.writeFileSync(moduleOut, out.code);
  });
};
