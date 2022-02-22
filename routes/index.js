var express = require('express');
var router = express.Router();
// import async from 'hbs/lib/async';
const ApiRequestService = require('./../services/api.service');
// import { ApiRequestService } from './../services/api.service';


/* GET home page. */
router.get('/', async (req, res)=>{
  console.log("route GET/ ",JSON.stringify(req.body));
  res.send("Works");

  const apiService_1 =  new ApiRequestService();
  if(req.body && req.body.messages){
  const user_input = await apiService_1.getApi('v1/messages', {
    'D360-API-KEY' : process.env.Sandbox_API
  }, {})

  console.log(req.body.messages);
  }
});

router.post('/', async (req, res, next) => {
  console.log("route POST/ ",JSON.stringify(req.body));
 
  const apiService =  new ApiRequestService();
  if(req.body && req.body.messages){
  
  const response = await apiService.postApi('v1/messages',{ 
    'D360-API-KEY' : process.env.Sandbox_API
  },{
    'recipient_type' : 'individual',
    'to' : '917486835085',
    'type' : 'text',
    'text' : {
      "body": user_input
        },
  });

      res.render('index', { title: 'Express' });

      // console.log('response',response);
    } 
    else if(req.body && req.body.statuses){
      console.log('status', req.body.statuses[0].status);
    }
});

module.exports = router;