const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development' // 判断是开发还是生产环境

const config = {
  target: 'web', //默认情况下，target的值是web，也就是为类浏览器的环境提供编译
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [  // rules 检测不同文件使用不同的loader
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, 
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 使用vue 和 react时,这段要加上,因为两个框架
    // 会根据不同的环境做不同的打包处理
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),

    new HTMLPlugin() //生成html
  ]
}

if (isDev) {  // 开发环境的配置
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map' // 调试模式,使编译过的代码在浏览器也能调试
  config.devServer = {
    port: 8000,
    host: '0.0.0.0', // 0.0.0.0 可以使同一局域网的终端能访问
    overlay: {
      errors: true, // 让错误在页面显示
    },
    hot: true  // 热加载,局部刷新数据,配合下面的插件使用
  }
  config.plugins.push( // plugins 配置是个数组,支持push 添加 plugins
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new webpack.NoEmitOnErrorsPlugin() // 去除不必要的错误信息
  )


} else {  // 生产环境的配置


  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true, // 开启源码调试
            }
          },
          'stylus-loader'
        ]
      })
    },
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({ // 抽离第三方库
      name: 'vendor' // 和上面 entry的 vendor 名字一样
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config
