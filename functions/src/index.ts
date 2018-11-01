import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
import {CallableContext} from 'firebase-functions/lib/providers/https';
import nba from 'nba.js';
const database = admin.database();

export const getData = functions.https.onCall((data: any, context: CallableContext) => {
  const profile$ = nba.data.playerProfile({
    year: '2018',
    personId: 201939
  }).then((res) => {
    const stats = res.league.standard.stats.latest;
    return database.ref('/').update({
      'tpm': stats.tpm,
      'tpa': stats.tpa
    })
  });

  const schedule$ = nba.data.teamSchedule({
    year: '2018',
    teamName: 'warriors'
  }).then((res) => {
    const i = res.league.lastStandardGamePlayedIndex;
    const games = res.league.standard;

    const gameCount = games.filter((g) => g.seasonStageId === 2)
      .filter((g) => g.statusNum !== 1).length;

    const liveGames = games.filter((g) => g.statusNum === 2);
    const live = !!liveGames.length && liveGames[0].seasonStageId === 2;

    const nextGame = gameCount >= 82
      ? 'SEASON COMPLETE'
      : games[i + 1].startTimeUTC;

    return database.ref('/').update({live, gameCount, nextGame})
  });

  return Promise.all([profile$, schedule$])
    .catch((err) => console.error)

});
