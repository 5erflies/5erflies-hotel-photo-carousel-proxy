var express = require('express');
var app = express();
var axios = require('axios');
var cors = require('cors');
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.use(express.static(__dirname, + '/public'));

const serverListing = 'http://localhost:3001/listing/',
      serverReview = 'http://localhost:3002/reviews/',
      serverMorePlaces = 'http://localhost:3003/test1/';

// listen to client get request
// return response to client
app.get('/listing', (req, res) => {
  const reqId = req.query.propertyId;
  const url = serverListing + '?propertyId=' + reqId;
  // make a get request to service server
  axios.get(url)
  .then((listingRes) => {
    // console.log(listingRes.data);
    res.status(200).send(listingRes.data);
  })
  .catch((err) => {console.log(err)});
});

app.get('/reviews', (req, res) => {
  const reqId = req.query.propertyId;
  const url = serverReview + '?propertyId=' + reqId;
  axios.get(url)
  .then((reviewsRes) => {
    res.status(200).send(reviewsRes.data);
  })
  .catch((err) => {console.log(err)});
});

app.get('/test1', (req, res) => {
  const reqId = req.query.propertyId;
  const url = serverMorePlaces + '?propertyId=' + reqId;
  axios.get(url)
  .then((moreplacesRes) => {
    res.status(200).send(moreplacesRes.data);
  })
  .catch((err) => {console.log(err)});
});


app.listen(3000, () => {
  console.log('Listening on port,', port);
})
