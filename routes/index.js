var express = require('express');
var router = express.Router();
// import async from 'hbs/lib/async';
const ApiRequestService = require('./../services/api.service');
// import { ApiRequestService } from './../services/api.service';

/* GET home page. */
router.post('/', async (req, res, next) => {
  console.log("route / ",JSON.stringify(req.body))
  const apiService =  new ApiRequestService();
  const response = await apiService.postApi('v1/messages',{ 
    'D360-API-KEY' : 'C0Wl7Q_sandbox'
  },{
    'recipient_type' : 'individual',
    'to' : '919409419763',
    'type' : 'text',
    'text' : {
      "body": "Hello, dear customer!"
    },
  })
  console.log('response',response);
  
  // res.render('index', { title: 'Express' });
});

module.exports = router;