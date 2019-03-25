module.exports = {
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader',
          options: {
            svgo: {
              plugins: [
                {removeComments: true},
                {removeViewBox: false},
                {cleanupIDs: false},
                {addClassesToSVGElement: {className: 'svg-icon'}}
              ]
            }
          }
        }
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .test(() => false)
      .use('file-loader')
  }
}