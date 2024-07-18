import { Bot, InlineKeyboard } from 'https://deno.land/x/grammy@v1.24.0/mod.ts'

// 外测环境
const botToken = '7388996011:AAHnWNmEBm66fwt_twpY9i3KPzxHX9vkolI' // 蒙娜丽莎机器人ID
const botUrl = `https://t.me/haiyanstar_bot` // 机器人链接
const miniAppUrl = 'https://t.me/haiyanstar_bot/ximi' // 小程序链接
const groupUrl = 'https://t.me/FutureFunGenesisOfficial' // 群组链接
const homeUrl = 'https://test-h5.ximi.world' // 主页
const walletUrl = 'https://test-h5.ximi.world/pages/wallet' // 钱包
const promoteUrl = 'https://test-h5.ximi.world/pages/promote?mode=1' // 推广
const welfareUrl = 'https://test-h5.ximi.world/promote/welfare' // 发现金
const luckToken = 'iV2SVTTTkXmVjtNBs0Lq' // haiyanstar_bot 抽奖token

// 正式环境
// const botToken = '6998202214:AAE3YW0fMx-Q5zAF8nlJPuTdPI7VMi0iRLU' // FF机器人ID
// const botUrl = `https://t.me/FutureFun_earningwct_bot` // 机器人链接
// const miniAppUrl = 'https://t.me/FutureFun_earningwct_bot/FutureFun' // 小程序链接
// const groupUrl = 'https://t.me/FutureFunGenesisOfficial' // 群组链接
// const homeUrl = 'https://ff.zone' // 主页
// const walletUrl = 'https://ff.zone/pages/wallet' // 钱包
// const promoteUrl = 'https://ff.zone/pages/promote?mode=1' // 推广
// const welfareUrl = 'https://ff.zone/promote/welfare' // 发现金
// const luckToken = 'EAKQimQtSm2kFZmnMkMz' // FutureFun_earningwct_bot 抽奖token

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
    animation: 'https://test-h5.ximi.world/static/img/telegram/xl.gif',
    caption:
      '🔥🔥🔥 The platform coin airdrop is ready. Join early for the best offer! 🎉🎉🎉  \n\n📢 Share daily to invite friends for earning random USDT bonuses! Both you and your friend will gain benefit! Successful invitation and top-up get an extra 1 USDT bonus the next day! 📨💰  \n\n📢 Deposit ≥100 USDT get up to 20% bonus in WCT!  \n\nDeposit 100 USDT get 120 USDT (100 USDT + 20 USDT in WCT). The more you deposit, the more you earn, no upper limit! 💰💰  \n\nWhat are you waiting for? Come and join the future fun! 🚀🚀🚀',
  },
}

// USDT Bonus 发现金
// Deposit Now —— TG平台钱包主页
// Play Now ——TG平台主页
// Join the Community —— 平台TG频道
// Whitepaper —— WCT白皮书
// Online Customer Service ——官方群

// start 指令
const keyboard1 = new InlineKeyboard()
  .webApp('💰USDT Bonus💰', welfareUrl)
  .row()
  .webApp('🎮Play now🎰', homeUrl)

// const keyboard1 = new InlineKeyboard()
//   .webApp('💰USDT Bonus💰', welfareUrl)
//   .row()
//   .webApp('💳Deposit Now💳', walletUrl)
//   .row()
//   .webApp('🎮Play now🎰', homeUrl)
//   .row()
//   .url('Join the Community🤝', channelUrl)
//   .url('Whitepaper📄', paperUrl)
//   .row()
//   .url('Online Customer Service💬', groupUrl)

// invite指令
const keyboard2 = new InlineKeyboard()
  .webApp('Invite a friend', promoteUrl)
  .row()
  .webApp('Back to game', homeUrl)

// help指令
const keyboard3 = new InlineKeyboard().webApp('Play now', homeUrl)

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

// bot.on('message', async (ctx) => {
//   console.log('【会话信息】', ctx.message)
// })

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
