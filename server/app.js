const request = require('request')
const cheerio = require('cheerio')

const URL =
	'https://stlouis.craigslist.org/search/cto?sort=pricedsc&auto_bodytype=10&hasPic=1&max_price=4000&min_auto_year=2000&min_price=100'

request(URL, (err, res, html) => {
	if (!err && res.statusCode == 200) {
		const $ = cheerio.load(html)
		let cars = []

		$('.result-title').each((i, el) => {
			const item = $(el).text()
			const price = $(el)
				.next()
				.children('.result-price')
				.text()

			const posting = {
				title: item,
				price: price
			}

			cars.push(posting)
		})
	}
})
