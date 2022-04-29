const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

function isHabitable(planet) {
  return planet['koi_disposition'] === 'CONFIRMED' && // only confirmed planets
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && // only planets with an insolation flux in range 0.36 to 1.11
    planet['koi_prad'] < 1.6; // only planets with a radius less than 1.6

    // Reference: https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
}

function loadPlanetsData(){
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../../data/kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
                delimiter: ','
            }))
            .on('data', (data) => {
                if (isHabitable(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`Found ${habitablePlanets.length} habitable planets.`);
                resolve();
            });
    });

}

module.exports = {
    loadPlanetsData,
    planets: habitablePlanets,
}