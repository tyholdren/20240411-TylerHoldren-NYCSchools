// craco.config.js
module.exports = {
  webpack: {
    configure: {
      resolve: {
        alias: {
          '@mui/styled-engine': '@mui/styled-engine-sc',
        },
      },
    },
  },
};
