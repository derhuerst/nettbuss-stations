'use strict'

const parseCountry = (js) => (data) => {
	data = JSON.parse(js.slice(data.start, data.end))
	return {
		id: data.Id + '',
		name: data.N
	}
}

const parseStation = (js, countries) => (data) => {
	data = JSON.parse(js.slice(data.start, data.end))

	// todo: data.Sid, data.Ad, data.H, data.O

	return {
		id: data.Id ? data.Id + '' : null,
		name: data.Sn || data.Cn,
		coordinates: data.La && data.Lo ? {
			latitude: data.La,
			longitude: data.Lo
		} : null,
		city: data.Cid && data.Cn ? {
			id: data.Cid + '',
			name: data.Cn
		} : null,
		weight: data.P,
		tags: data.A ? data.A.split(/,\s+/) : [],
		country: countries.find((c) => c.id === data.CyId + '') || null
	}
}

module.exports = {parseCountry, parseStation}
