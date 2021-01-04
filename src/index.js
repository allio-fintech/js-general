require('@babel/register')({ extensions: ['.js', '.ts'] });
// import all other files after the babel hook
// const app = require('./app');

// const { default: quoteMarketInfo } = require('./feature/marketGraphApi/main');

// quoteMarketInfo();

const proxy = require('./feature/corsAnywhere/corsAnywhere');
