var express = require('express');
var router = express.Router();
// import async from 'hbs/lib/async';
const ApiRequestService = require('./../services/api.service');
// import { ApiRequestService } from './../services/api.service';
const dialogflow = require('@google-cloud/dialogflow');
const sessionClient = new dialogflow.SessionsClient();



/* GET home page. */
router.get('/', async (req, res)=>{
  console.log("route GET/ ",JSON.stringify(req.body));
  res.send("Works");
});

router.post('/', async (req, res, next) => {
  console.log("route POST/ ",JSON.stringify(req.body));
  // console.log(req.body);
  const apiService =  new ApiRequestService();
  if(req.body && req.body.messages){
    const msg = req.body.messages[0].text.body;
  
    const reply = await executeQueries('pizzabot-a9bd', '1', [msg], 'en');
    console.log("Reply: ", reply);

  const response = await apiService.postApi('v1/messages',{ 
    'D360-API-KEY' : process.env.Sandbox_API
  },{
    'recipient_type' : 'individual',
    'to' : '917486835085',
    'type' : 'text',
    'text' : {
      "body": `${reply}`
        },
  });

      res.render('index', { title: 'Express' });

      console.log('response',response);
    } 
    else if(req.body && req.body.statuses){
      console.log('status', req.body.statuses[0].status);
    }
});

async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
  // Keeping the context across queries let's us simulate an ongoing conversation with the bot
  let context;
  let intentResponse;
  for (const query of queries) {
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      console.log('Detected intent');
      console.log(
        `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
      );
      // Use the context from this response for next queries
      context = intentResponse.queryResult.outputContexts;
      return intentResponse.queryResult.fulfillmentText;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = router;