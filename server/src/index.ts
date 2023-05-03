const admin = require('firebase-admin');
const glob = require('glob');
const fs = require('fs');

admin.initializeApp({
    credential: admin.credential.cert(require('../firebasekey.json')),
    databaseURL: 'https://multiple-projects-9f123.firebaseio.com'
});

const db = admin.database();
const baseRef = db.ref('temperature');

let interval: NodeJS.Timer;

glob('/sys/bus/w1/devices/28*/w1*', (err: any, files: any) => {
    if (!err && files[0]) {
        interval = createInterval(30, files[0]);

        console.log('Started measuring ...');

        baseRef.child('interval').on('value', (snapshot: any) => {
            clearInterval(interval);

            interval = createInterval(parseFloat(snapshot.val()), files[0]);
        });
    } else {
        console.error(err);
    }
});

function createInterval(delay: number, filename: string) {
    return setInterval(() => {
        fs.readFile(filename, {encoding: 'utf-8'}, (err: any, content: string) => {
            if (!err) {
                const timestamp = Date.now();
                const temperature = formatTemperature(parseInt(content.split('t=')[1]) / 1000);

                baseRef.child('currentTemperature').set({
                    timestamp,
                    temperature
                });

                baseRef.child(`history/${timestamp}`).set({
                    timestamp,
                    temperature
                });
            } else {
                console.error(err);
            }
        });
    }, delay * 1000 * 60);
}

function formatTemperature(temperature: number): number {
    const tempParts = temperature.toString().split('.');

    if (tempParts.length > 1) {
        return parseFloat(`${tempParts[0]}.${Math.round(parseFloat(tempParts[1]) / 100)}`);
    } else {
        return temperature;
    }
}
