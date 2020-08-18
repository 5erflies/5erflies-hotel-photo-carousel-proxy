const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const port = process.env.PORT || 3000;

// A new proxy is created by calling createProxyServer w/ an options object as argument
// need to define options
const proxy = httpProxy.createProxyServer();
const serverListing = 'http://localhost:3001',
      serverReview = 'http://localhost:3002',
      serverMorePlaces = 'http://localhost:3003';

app.use(express.static(__dirname + '/public'));

// * - match complete path from listing. listing/id?=6 or listing/id?=8
app.all("/listing/*", (req, res) => {
  console.log('redirecting to Server1');
  // proxy server send requet to other server
  proxy.web(req, res, {target: serverListing});
  proxy.on('error', (err) => {
    console.log("proxy: failed");
  });
});

// app.all("/reviews/*", (req, res) => {
//   console.log('redirecting to Server2');
//   proxy.web(req, res, {target: serverTwo});
//   proxy.on('error', (err) => {
//     console.log("proxy: failed");
//   });
// });

app.listen(3000, () => {
  console.log(`Listing app listening at http://localhost:3001`)
})

app.listen(4000, () => {
  console.log(`Reviews app listening at http://localhost:3002`)
})

app.listen(5000, () => {
  console.log(`More places app listening at http://localhost:3003`)
})
