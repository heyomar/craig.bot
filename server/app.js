const request = require('request')
const cheerio = require('cheerio')

const URL =
	'https://stlouis.craigslist.org/search/cto?hasPic=1&search_distance=15&postal=63109&min_price=500&max_price=4000&min_auto_year=2000&auto_bodytype=10'

request(URL, (err, res, html) => {
	if (!err && res.statusCode == 200) {
		const $ = cheerio.load(html)
		let carsPermaLinks = []

		$('.result-info').each((i, el) => {
			const carPageURL = $(el)
				.children('.result-title')
				.attr('href')
			carsPermaLinks.push(carPageURL)
			// console.log(carsPermaLinks)
		})

		carsPermaLinks.forEach(singleURL => {
			request(singleURL, (err, res, html) => {
				if (!err && res.statusCode == 200) {
					const $ = cheerio.load(html)
					let carsObject = []

					$('.attrgroup span').each(function(i, el) {
						let carSpecItem = $(el).text()
						// console.log(carSpecItem, carSpecValue)
						carsObject.push({
							[i]: `${carSpecItem}`
						})
					})

					console.log(carsObject)
				}
			})
		})
	}
})
