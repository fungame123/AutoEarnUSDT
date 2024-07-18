import { Bot, InlineKeyboard } from 'https://deno.land/x/grammy@v1.24.0/mod.ts'

// 正式环境
const botToken = '7412729421:AAGiaOhFa8y87-qewoXOcaU1eDPmMTIqjXY' // 小鹿币机器人token
const botUrl = `https://t.me/FutureFun_earningwct_bot` // 机器人链接
const miniAppUrl = 'https://t.me/FutureFun_earningwct_bot/FutureFun' // 小程序链接
const groupUrl = 'https://t.me/FutureFunGenesisOfficial' // 群组链接
const homeUrl = 'https://ff.zone' // 主页
const walletUrl = 'https://ff.zone/pages/wallet' // 钱包
const promoteUrl = 'https://ff.zone/pages/promote?mode=1' // 推广
const welfareUrl = 'https://ff.zone/promote/welfare' // 发现金
const luckToken = 'EAKQimQtSm2kFZmnMkMz' // FutureFun_earningwct_bot 抽奖token

const channelUrl = 'https://t.me/FutureFunOfficial' // TG频道
const paperUrl = 'https://ff-whitepaper.ff.zone' // 白皮书

const bot = new Bot(botToken)
// 快捷消息列表
const commandList = [{ command: 'start', description: 'Start the bot' }]

// 指令列表
const instructList = ['start']

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

// 答复数据
const languageObj = {
  start: {
    photo: 'https://test-h5.ximi.world/static/img/telegram/digdeer.jpg',
    caption:
      '🔥🔥🔥 The platform coin airdrop is ready. Join early for the best offer! 🎉🎉🎉  \n\n📢 Share daily to invite friends for earning random USDT bonuses! Both you and your friend will gain benefit! Successful invitation and top-up get an extra 1 USDT bonus the next day! 📨💰  \n\n📢 Deposit ≥100 USDT get up to 20% bonus in WCT!  \n\nDeposit 100 USDT get 120 USDT (100 USDT + 20 USDT in WCT). The more you deposit, the more you earn, no upper limit! 💰💰  \n\nWhat are you waiting for? Come and join the future fun! 🚀🚀🚀',
  },
}

// start 指令
const keyboard1 = new InlineKeyboard()
  .webApp('💰USDT Bonus💰', welfareUrl)
  .row()
  .webApp('🎮Play now🎰', homeUrl)

await bot.api.setMyCommands(commandList)

bot.command(instructList, async (ctx: any) => {
  const {
    text,
    from: { id: chatId },
  } = ctx.message
  const str = encode(`id=${chatId}`)
  const inviteUrl = `${miniAppUrl}?startapp=p_str${str}`
  console.log('【消息信息】', ctx.message)
  console.log('【消息来源】', chatId)
  console.log('【邀请链接】', inviteUrl)

  if (text.includes('start')) {
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
    await bot.api.sendAnimation(chatId, '', {
      parse_mode: 'HTML',
      reply_markup: keyboard1,
      ...languageObj?.start,
    })
  }
})

// 错误提示
bot.catch((err: any) => {
  console.log('【错误提示】', err)
})
bot.start() // deno run --allow-net bot.ts
