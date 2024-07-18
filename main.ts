import { Bot, InlineKeyboard } from 'https://deno.land/x/grammy@v1.24.0/mod.ts'

// 正式环境
const botToken = '7412729421:AAGiaOhFa8y87-qewoXOcaU1eDPmMTIqjXY' // 小鹿币机器人ID
const miniAppUrl = 'https://t.me/DigDeer_bot/AutoEarnUSDT' // 小鹿币小程序链接
const luckToken = 'iV2SVTTTkXmVjtNBs0Lq' // haiyanstar_bot 抽奖token

const bot = new Bot(botToken)
// 快捷消息列表
const commandList = [{ command: 'start', description: 'Start the bot' }]

// 字符串转base64
const encode = (str) => {
  let _str = encodeURI(str)
  let base64 = btoa(_str)
  return base64
}

// base64转字符串
const decode = (base64) => {
  let _base64 = atob(base64)
  let str = decodeURI(_base64)
  return str
}

// 7140201455 思琪  7344034452 海燕
// 获取个人信息
const me = await bot.api.getMe()
console.log('【个人信息】', me)

// 获取个人信息
const updates = await bot.api.getUpdates()
console.log('【更新信息】', updates)

// 获取按钮信息
const chatMenuButton = await bot.api.getChatMenuButton()
console.log('【按钮信息】', chatMenuButton)

await bot.api.setMyCommands(commandList)

// start 指令
const keyboard = new InlineKeyboard().url('💰Auto-earn📈', miniAppUrl)

bot.command('start', async (ctx: any) => {
  const {
    text,
    from: { id: chatId },
  } = ctx.message
  const str = encode(`id=${chatId}`)
  const inviteUrl = `${miniAppUrl}?startapp=p_str${str}`
  console.log('【消息信息】', ctx.message)
  console.log('【消息来源】', chatId)
  console.log('【邀请链接】', inviteUrl)

  if (text.includes('Base64_')) {
    const params = text.replace('/start Base64_', '')
    console.log(params)
    const str = decode(params)
    console.log(str)

    // 使用fetch发送GET请求
    fetch('https://api.moquest.xyz/partner/bot/callback?' + str, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'LDM-API-TOKEN': luckToken,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('【回调成功】', data))
      .catch((error) => console.error('【回调失败】', error))
  }
  await bot.api.sendPhoto(chatId, '', {
    parse_mode: 'HTML',
    reply_markup: keyboard,
    photo: 'https://test-h5.ximi.world/static/img/telegram/digdeer.jpg',
    caption:
      'The most promising project in the TON ecosystem for the second half of 2024: 🌟 DigDeer 🌟\n\n🎮 Automatically earn DigDeerCoins every day!\n\n💎 Invite friends to get diamonds and unlock more rewards!\n\n💰 Earn up to 100 USDT worth of Deer Coins daily!\n\n🤝 DigDeerCoins will soon be available for USDT withdrawal (1DDC=0.000012USDT)\n\nJoin now to experience effortless gaming and earn USDT rewards!',
  })
})

// 错误提示
bot.catch((err: any) => {
  console.log('【错误提示】', err)
})
bot.start() // deno run --allow-net bot.ts
