const launches = new Map();
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    customers: ['ZTM','NASA'],
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    success: true,
    upcoming: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
    launches,
};