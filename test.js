'use strict'

const test = require('tape')
const stations = require('.')

test('stations is an array with items', (t) => {
	t.plan(2)
	t.ok(Array.isArray(stations))
	t.ok(stations.length > 0)
})

test('each station is valid', (t) => {
	for (let s of stations) {
		t.equal(typeof s.id, 'string')
		t.ok(s.id)

		t.equal(typeof s.name, 'string')
		t.ok(s.name)

		if (s.coordinates) {
			t.equal(typeof s.coordinates.latitude, 'number')
			t.equal(typeof s.coordinates.longitude, 'number')
		}

		if (s.city) {
			t.equal(typeof s.city.id, 'string')
			t.ok(s.city.id)

			t.equal(typeof s.city.name, 'string')
			t.ok(s.city.name)
		}

		t.equal(typeof s.weight, 'number')

		if (s.tags) {
			t.ok(Array.isArray(s.tags))
			for (let tag of s.tags) t.equal(typeof tag, 'string')
		}

		t.equal(typeof s.country.id, 'string')
		t.ok(s.country.id)

		t.equal(typeof s.country.name, 'string')
		t.ok(s.country.name)
	}
	t.end()
})
