// import WebSocket from 'ws';
import axios from 'axios';

// const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`);

// // Connection opened -> Subscribe
// socket.addEventListener('open', () => {
//   socket.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }));
// });

// // Listen for messages
// socket.addEventListener('message', (event) => {
//   console.log('Message from server', event.data);
// });

// // Unsubscribe
// const unsubscribe = (symbol: string) => {
//   socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
// };

// setTimeout(() => {
//   console.log('closing socket');
//   unsubscribe('AAPL');
// }, 300000);

const main = async () => {
  const searchUrl = 'https://finnhub.io/api/v1/search';
  const response = await axios.get(searchUrl, {
    params: { q: 'reit', token: process.env.FINNHUB_API_KEY },
  });
  console.log(JSON.stringify(response.data));
};

main();
