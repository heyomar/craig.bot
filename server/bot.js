const request = require('request')
const cheerio = require('cheerio')
const Telegraf = require('telegraf')

const TOKEN = '783970827:AAFH5GXBXaQ9QIQ1cvxJGCoya4i4dCGu93g'
const bot = new Telegraf(TOKEN)

bot.start(msg => {
	msg.reply('Hello back to you')
})
bot.hears('check', msg => {
	msg.reply('hello')
})

bot.launch()
