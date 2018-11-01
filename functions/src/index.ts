import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
import {CallableContext} from 'firebase-functions/lib/providers/https';
import nba from 'nba.js';
const rp = require('request-promise');
const cheerio = require('cheerio');
const database = admin.database();

export const getData = functions.https.onCall((data: any, context: CallableContext) => {

  const uri = 'https://sports.yahoo.com/nba/players/4612/';

  const options = {uri, transform: (body) => cheerio.load(body)};

  const schedule$ = nba.data.teamSchedule({
    year: '2018',
    teamName: 'warriors'
  });

  Promise.all([rp(options), schedule$])
    .then(([$, s]) => {
      const i = s.league.lastStandardGamePlayedIndex;
      const games = s.league.standard;

      let gameCount = games.filter((g) => g.seasonStageId === 2)
        .filter((g) => g.statusNum === 3).length;

      const statsTables = $('#Col1-1-GraphStats-Proxy tbody');
      const gamesTable = statsTables.first();
      const score = $('td:nth-of-type(3) a', gamesTable).html();
      const live = !score.includes('W') && !score.includes('L') && gameCount <= 82;

      const totalsTable = statsTables.last();
      let tpm = parseInt($('tr:last-of-type td:nth-of-type(8)', totalsTable).text());
      let tpa = parseInt($('tr:last-of-type td:nth-of-type(9)', totalsTable).text());

      if (live) {
        gameCount += 1;
        tpm += parseInt($('td:nth-of-type(9) span', gamesTable).html());
        tpa += parseInt($('td:nth-of-type(10) span', gamesTable).html());
      }

      // const liveGames = games.filter((g) => g.statusNum === 2);
      // const live = !!liveGames.length && liveGames[0].seasonStageId === 2;

      const nextGame = gameCount >= 82
        ? 'SEASON COMPLETE'
        : games[i + 1].startTimeUTC;

      return database.ref('/').update({tpa, tpm, live, gameCount, nextGame});
    })
    .catch(console.error);
});
