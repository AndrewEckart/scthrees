import * as functions from 'firebase-functions';
import {CallableContext} from 'firebase-functions/lib/providers/https';
import nba from 'nba.js';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const getData = functions.https.onCall((data: any, context: CallableContext) => {

  return nba.data.playerProfile({
    year: '2018',
    personId: 201939
  }).then((res) => {
    console.log(res.league.standard.stats);
  }).catch((err) => console.error(err));

});
