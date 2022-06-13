// get QQ website status
import axios from 'axios'
import { writeFileSync } from 'fs'
import { rm } from 'fs/promises'

const check = async (name: string, url: string) => {
  const response = await axios
    .get(url, {
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        reference: url,
      },
    })
    .catch((er) => {
      console.log(er)

      return {
        status: 500,
      }
    })

  const ok = response.status === 200

  const now = new Date()

  const currentDateTime = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

  const resultText = ok ? '没倒闭' : '倒闭了'

  const bigHead = '# 今天' + name + '倒闭了吗'

  writeFileSync(
    './readme.md',
    `${bigHead}\n\n${currentDateTime} ${resultText}\n\n`,
    {
      flag: 'a+',
    },
  )
}

async function main() {
  await rm('./readme.md', {
    force: true,
  })
  await Promise.all([
    check('腾讯', 'https://www.qq.com'),
    check('微博', 'https://weibo.com'),
    check('百度', 'https://www.baidu.com'),
  ])
}

main()
