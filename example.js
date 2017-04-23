'use strict'

const stations = require('.')

console.log(stations.filter((s) => s.city.id === '46')) // Oslo
