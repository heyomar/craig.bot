const Telegraf = require('telegraf')

const TOKEN = '783970827:AAFH5GXBXaQ9QIQ1cvxJGCoya4i4dCGu93g'

const bot = new Telegraf(TOKEN)
bot.start(msg => {
	msg.reply('Hello back to you')
	msg.replyWithPhoto('https://picsum.photos/200/300/')
})
bot.hears('hi', msg => msg.reply('Hey there'))
bot.launch()
