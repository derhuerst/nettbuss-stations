# nettbuss-stations

**A list of Nettbuss.se stations.**

[![npm version](https://img.shields.io/npm/v/nettbuss-stations.svg)](https://www.npmjs.com/package/nettbuss-stations)
[![build status](https://img.shields.io/travis/derhuerst/nettbuss-stations.svg)](https://travis-ci.org/derhuerst/nettbuss-stations)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/nettbuss-stations.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install nettbuss-stations
```


## Usage

The [npm package](https://npmjs.com/nettbuss-stations) contains data in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const stations = require('nettbuss-stations')

console.log(stations)
```

```js
[
	{
		id: '1394',
		name: 'Nils Ericson-terminalen',
		coordinates: null,
		city: {id: '210', name: 'Göteborg'},
		weight: 65463,
		tags: [],
		country: {id: '1', name: 'Sverige'}
	},
	// …
	{
		id: '242',
		name: 'Oslo Bussterminal',
		coordinates: null,
		city: {id: '46', name: 'Oslo'},
		weight: 112120,
		tags: [],
		country: {id: '2', name: 'Norge'}
	}
	// …
]
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/nettbuss-stations/issues).
