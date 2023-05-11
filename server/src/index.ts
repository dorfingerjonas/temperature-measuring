const schedule = require('node-schedule');
const admin = require('firebase-admin');
const glob = require('glob');
const fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert(require('../firebasekey.json')),
  databaseURL: 'https://multiple-projects-9f123.firebaseio.com'
});

const db = admin.database();
const baseRef = db.ref('temperature');

glob('/sys/bus/w1/devices/28*/w1*', (err: any, files: any) => {
  if (!err && files[0]) {
    schedule.scheduleJob('*/5 * * * *', () => {
      baseRef.child('currentTemperature').set(readTemperature(files[0]));
    });

    schedule.scheduleJob('*/30 * * * *', () => {
      const { timestamp, temperature }: Measurement = readTemperature(files[0]);

      baseRef.child(`history/${ timestamp }`).set({
        timestamp,
        temperature
      });
    });

    console.log('Started measuring ...');
  }
});

function readTemperature(filename: string): Measurement {
  const content = fs.readFileSync(filename, { encoding: 'utf-8' });

  return {
    timestamp: Date.now(),
    temperature: formatTemperature(parseInt(content.split('t=')[1]) / 1000)
  };
}

function formatTemperature(temperature: number): number {
  const tempParts = temperature.toString().split('.');

  if (tempParts.length > 1) {
    return parseFloat(`${ tempParts[0] }.${ Math.round(parseFloat(tempParts[1]) / 100) }`);
  } else {
    return temperature;
  }
}

interface Measurement {
    timestamp: number;
    temperature: number;
}