const request = require('request')
const cheerio = require('cheerio')

module.exports = {
	getCars: () => {
		const URL =
			'https://stlouis.craigslist.org/search/cto?hasPic=1&postedToday=1&search_distance=15&postal=63109&min_price=500&max_price=4000&min_auto_year=2000&auto_bodytype=10'

		request(URL, (err, res, html) => {
			let carsObject = []
			if (!err && res.statusCode == 200) {
				const $ = cheerio.load(html)
				let carsPermaLinks = []

				$('.result-info').each((i, el) => {
					const carPageURL = $(el)
						.children('.result-title')
						.attr('href')
					carsPermaLinks.push(carPageURL)
				})
			}
		}).then(res => {
			carsPermaLinks.forEach(singleURL => {
				request(singleURL, (err, res, html) => {
					if (!err && res.statusCode == 200) {
						const $ = cheerio.load(html)
						const carTitle = $('#titletextonly').text()
						const carLocation = $('.postingtitletext small').text()
						const carImageURL = $('.swipe-wrap .first.visible > img').attr('src')

						$('#postingbody > div').remove()
						const carDescription = $('#postingbody')
							.text()
							.replace(/\r?\n|\r/g, '')

						carsObject.push({
							carTitle: carTitle,
							carDescription: carDescription,
							carLocation: carLocation,
							carImageURL: carImageURL,
							carPostURL: singleURL
						})
					}
				})
			})
		})
	}
}

async function getNewCars() {
	try {
		const cars = await request(URL, (err, res, html) => {
			if (!err && res.statusCode == 200) {
				const $ = cheerio.load(html)
				let carsPermaLinks = []

				$('.result-info').each((i, el) => {
					const carPageURL = $(el)
						.children('.result-title')
						.attr('href')
					carsPermaLinks.push(carPageURL)
				})
			}
		})

		return cars
	} catch (err) {
		console.log(err)
	}
}
