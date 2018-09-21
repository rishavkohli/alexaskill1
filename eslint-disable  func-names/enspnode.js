/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetBirdSpeciesIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Endangered species';
const GET_FACT_MESSAGE = 'Here\'s your list: ';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  ' White-bellied heron(Ardea insignis)  The white-bellied heron (Ardea insignis), also known as the imperial heron or great white-bellied heron, is a species of large heron found in the foothills of the eastern Himalayas in India, northeastern Bangladesh, Burma and Bhutan.',
  ' Great Indian bustard (Ardeotis nigriceps) The Great Indian Bustard (Ardeotis nigriceps) or Indian bustard is a bustard found on the Indian subcontinent. A large bird with a horizontal body and long bare legs, giving it an ostrich like appearance, this bird is among the heaviest of the flying birds.',
  'Forest owlet (Athene blewitti) The forest owlet (Athene blewitti) is an endangered owl that is endemic to the forests of central India. The species belongs to the typical owls family, Strigidae. First described in 1873, it was not seen after 1884 and considered extinct[2] until it was rediscovered 113 years later in 1997 by Pamela Rasmussen.',
  'Baers pochard (Aythya baeri) Baers pochard (Aythya baeri) is a diving duck found in eastern Asia. It breeds in southeast Russia and northeast China, migrating in winter to southern China, Vietnam, Japan, and India. The name commemorates the Estonian naturalist Karl Ernst von Baer.',
  'Spoon-billed sandpiper (Calidris pygmaea)  The spoon-billed sandpiper (Calidris pygmaea) is a small wader which breeds in north-eastern Russia and winters in Southeast Asia.',
  'Siberian crane (Grus leucogeranus) The Siberian crane (Leucogeranus leucogeranus), also known as the Siberian white crane or the snow crane, is a bird of the family Gruidae, the cranes.',
  'White-rumped vulture (Gyps bengalensis) The White-Rumped Vulture (Gyps bengalensis) is an Old World vulture native to South and Southeast Asia. It has been listed as Critically Endangered on the IUCN Red List since 2000, as the population severely declined.', 
  
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
