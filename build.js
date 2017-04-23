'use strict'

const fetch = require('isomorphic-fetch')
const cheerio = require('cheerio')
const {parse} = require('acorn')
const {traverse} = require('estraverse')
const natsort = require('natsort')
const uniqBy = require('lodash.uniqby')

const {parseCountry, parseStation} = require('./parse')



const setterName = 'tbAutoCompleteStops'

const isSetterCall = (node) =>
	node.type === 'CallExpression'
	&& node.callee.type === 'MemberExpression'
	&& node.callee.property.type === 'Identifier'
	&& node.callee.property.name === setterName
	&& Array.isArray(node.arguments)
	&& node.arguments[0].type === 'Literal'
	&& node.arguments[0].value === 'setData'
	&& node.arguments[1].type === 'ArrayExpression'
	&& node.arguments[2].type === 'ArrayExpression'
	&& node.arguments[3].type === 'ArrayExpression'

const setterCallData = (node) => ({
	stations: node.arguments[1].elements,
	countries: node.arguments[2].elements
	// todo: third arg
	// countryIDs: node.arguments[3].elements
})



const showError = (err) => {
	console.error(err)
	process.exit(1)
}

fetch('https://m.nettbuss.se/m/sok-kop-resa', {
	redirect: 'follow'
})
.then((res) => res.text())
.then((html) => { // find the right <script> tag
	const $ = cheerio.load(html)
	const scripts = Array.from($('script'))

	for (let script of scripts) {
		for (let js of script.children) {
			if (js.type === 'text' && js.data.indexOf(setterName) >= 0) return js.data
		}
	}

	throw new Error('no matching <script> found')
})
.then((js) => { // find the fn call containing the data
	const ast = parse(js)
	traverse(ast, {
		enter: (node, parent) => {
			if (!isSetterCall(node)) return
			const data = setterCallData(node)

			const countries = data.countries.map(parseCountry(js))

			const sort = natsort()
			const stations =
				uniqBy(
					data.stations
					.map(parseStation(js, countries))
					.filter((s) => s.id !== null && s.name)
				, (s) => s.id)
				.sort((a, b) => sort(a.id, b.id))

			process.stdout.write(JSON.stringify(stations) + '\n')
		}
	})
})
.catch(showError)
