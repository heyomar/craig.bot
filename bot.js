// -------------------------EXPRESS
const express = require('express')
const app = express()

const port = process.env.PORT || 5555
require('dotenv').config()

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`)
})

// -------------------------BOT
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const Telegraf = require('telegraf')

const URL =
	'https://stlouis.craigslist.org/search/cto?hasPic=1&postedToday=1&search_distance=16&postal=63109&min_price=500&max_price=4000&min_auto_year=2000&auto_bodytype=10'

function getCars() {
	return fetch(URL).then(res => res.text())
}

const bot = new Telegraf(process.env.TOKEN)

bot.start(msg => {
	msg.reply('Bee! boop! Welcome 🤖')
})

bot.hears('check', msg => {
	getCars().then(body => {
		const cars = []
		const $ = cheerio.load(body)

		$('.result-info').each((i, el) => {
			const carURL = $(el)
				.children('.result-title')
				.attr('href')

			const carPrice = $(el)
				.find('.result-meta .result-price')
				.text()

			const carPost = {
				link: carURL,
				price: carPrice
			}
			cars.push(carPost)
		})

		cars.forEach(el => {
			msg.reply(`${el.price} ${el.link}`)
		})
	})
})

bot.launch()
