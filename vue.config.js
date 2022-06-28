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
          downed:
            "downed@https://62bae0a07443c2098ca3a8c1--bespoke-cupcake-5c99a5.netlify.app/remoteEntry.js",
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
