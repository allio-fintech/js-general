require('@babel/register')({ extensions: ['.js', '.ts'] });
require('dotenv').config();

// import all other files after the babel hook
// const app = require('./app');

// query market info testing
// const { default: quoteMarketInfo } = require('./feature/marketGraphApi/main');
// quoteMarketInfo();

// starting cors anywhere proxy
// const proxy = require('./feature/corsAnywhere/corsAnywhere');
// query financial news testing
// const { default: queryNews } = require('./feature/financialNewsApi/main');
// queryNews();

// get Finnhub
// require('./feature/Finnhub/tradesApi');

// get GoldApi
require('./feature/GoldApi/goldApi');
