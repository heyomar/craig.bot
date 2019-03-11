const request = require('request')
const cheerio = require('cheerio')
const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.TOKEN)

bot.start(msg => {
	msg.reply('Hello back to you')
})
bot.hears('check', msg => {
	msg.reply('hello')
})

bot.launch()
