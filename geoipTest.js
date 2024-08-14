const geoip = require('geoip-lite');

// Ejemplo de IP para pruebas
const ip = '8.8.8.8'; // IP pública de Google DNS para pruebas
const geo = geoip.lookup(ip);

console.log(geo);
