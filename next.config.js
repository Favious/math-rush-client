module.exports = {
  webpack: (config, { isServer }) => {
    // Add the file-loader configuration to handle .mp3 files
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/sounds/",
          outputPath: `${isServer ? "../" : ""}static/sounds/`,
          name: "[name].[hash].[ext]",
          esModule: false,
        },
      },
    });

    return config;
  },
};
