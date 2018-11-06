import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import nba from 'nba.js';
admin.initializeApp();
const rp = require('request-promise');
const cheerio = require('cheerio');
const database = admin.database();
const cors = require('cors')({origin: true});

export const getData = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {

    const uri = 'https://sports.yahoo.com/nba/players/4612/';

    const options = {uri, transform: (body) => cheerio.load(body)};

    const schedule$ = nba.data.teamSchedule({
      year: '2018',
      teamName: 'warriors'
    });

    const profile$ = nba.data.playerProfile({
      year: '2018',
      personId: '201939'
    }).then((r) => r.league.standard.stats.latest);

    Promise.all([rp(options), schedule$, profile$])
      .then(([$, s, p]) => {

        const i = s.league.lastStandardGamePlayedIndex;
        const games = s.league.standard;
        let gameCount = games.filter((g) => g.seasonStageId === 2 && g.statusNum === 3).length;
        const nextGame = gameCount < 82 && games.length > i + 1 ? games[i + 1] : null;

        const statsTables = $('#Col1-1-GraphStats-Proxy tbody');
        const gameRow = $('tr:first-of-type', statsTables.first()).first();
        const score = $('td:nth-of-type(3) a', gameRow).html();
        const live = nextGame && !score.includes('W') && !score.includes('L')
          && new Date(nextGame.startTimeUTC).getTime() < Date.now();

        let tpm = parseInt(p.tpm);
        let tpa = parseInt(p.tpa);

        if (live) {
          tpm += parseInt($('td:nth-of-type(9) span', gameRow).html()) || 0;
          tpa += parseInt($('td:nth-of-type(10) span', gameRow).html()) || 0;
          gameCount += 1;
        }

        const next = nextGame ? nextGame.startTimeUTC : null;

        return database.ref('/').update({tpa, tpm, live, gameCount, next});
      })
      .then(() => {
        res.status(200).send();
      })
      .catch(console.error);
  });
});
