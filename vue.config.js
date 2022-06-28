const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
module.exports = defineConfig({
  publicPath: "auto",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "running",
        filename: "remoteEntry.js",
        remotes: {
          downed: "downed@http://localhost:8091/remoteEntry.js",
        },
        exposes: {},
        shared: {
          ...deps,
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: deps.vue,
            strictVersion: true,
          },
        },
      }),
    ],
  },
  devServer: {
    port: 8090,
    historyApiFallback: true,
  },
  transpileDependencies: true,
});
