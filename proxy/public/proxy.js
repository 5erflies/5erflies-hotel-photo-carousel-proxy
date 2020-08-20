const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const port = process.env.PORT || 3000;
// const cors = require('cors');
// A new proxy is created by calling createProxyServer w/ an options object as argument
// need to define options
const proxy = httpProxy.createProxyServer();
const serverListing = 'http://localhost:3001',
      serverReview = 'http://localhost:3002',
      serverMorePlaces = 'http://localhost:3003';

app.use(express.static(__dirname, + '/public'));
// console.log(__dirname) //public
// app.use(cors());

// * - match complete path from listing. listing/id?=6 or listing/id?=8
app.all("/listing/*", (req, res) => {
  console.log('redirecting to serverListing');
  // proxy server send requet to other server
  // the targte will become in future our AWS hosted url
  proxy.web(req, res, {target: serverListing});
  // need to handle request and send client the response! - which is our pretty react built app :D :D
  proxy.on('error', (err) => {
    console.log("proxy: failed");
  });
  // res.status(200).send(res)
});

app.all("/reviews/*", (req, res) => {
  console.log('redirecting to serverReview');
  proxy.web(req, res, {target: serverReview});
  proxy.on('error', (err) => {
    console.log("proxy: serverReview failed");
  });
});

app.all("/test1*", (req, res) => {
  console.log('redirecting to serverMorePlaces');
  proxy.web(req, res, {target: serverMorePlaces});
  proxy.on('error', (err) => {
    console.log("proxy: MorePlaces failed");
  });
});

app.all("/test-seeder*", (req, res) => {
  console.log('redirecting to serverMorePlacesAll');
  proxy.web(req, res, {target: serverMorePlaces});
  proxy.on('error', (err) => {
    console.log("proxy: serverMorePlacesAll failed");
  });
});


app.listen(3000, () => {
  console.log(`Listing app listening at http://localhost:3000`)
})
