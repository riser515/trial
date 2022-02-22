var express = require('express');
var router = express.Router();
const ApiRequestService = require('./../services/api.service');
const dialogflow = require('@google-cloud/dialogflow');
const sessionClient = new dialogflow.SessionsClient();


/* GET home page. */
router.get('/', (req, res)=>{
  console.log("route / ",JSON.stringify(req.body));
  res.send("Works");
});

router.post('/', async (req, res, next) => {
  console.log("route / ",JSON.stringify(req.body));
 
  const apiService =  new ApiRequestService();
  if(req.body && req.body.messages){
  // const response = await apiService.postApi('v1/messages',{ 
  //   'D360-API-KEY' : process.env.Sandbox_API
  // },{
  //   'recipient_type' : 'individual',
  //   'to' : '917486835085',
  //   'type' : 'text',
  //   'text' : {
  //     "body": "Hey there!"
  //       },
  // });

      // res.render('index', { title: 'Express' });

      // console.log('response',response);
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
          } catch (error) {
            console.log(error);
          }
        }
      }

      executeQueries('pizzabot-a9bd', '1234', 'Order a pizza for today', 'en');
    } 
    else if(req.body && req.body.statuses){
      console.log('status', req.body.statuses[0].status);
    }
});

module.exports = router;