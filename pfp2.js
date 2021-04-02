const cherio = require('cherio');
const request = require('request');
const ora = require('ora');
const chalk = require('chalk')
const { prompt } = require('enquirer');
const white = chalk.hex('#FFFFFF');
const red = chalk.hex('#DC143C');
const Spinner = ora({ color: 'red' });



let originalConsoleLog = console.log;
porn = function() {
        args = [];
        let date = new Date();

        let hours = date.getUTCHours().toString().padStart(2, '0');
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');
        let seconds = date.getUTCSeconds().toString().padStart(2, '0');
        args.push(`${white(`[${red(`${hours}:${minutes}:${seconds}`)}]`)}`);
    for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    originalConsoleLog.apply(console, args);
}

const logo = (`
${chalk.hex('#FFFFFF')("                               ┌┼┐  ╦╔═  ╔═╗  ╔╦╗  ╔═╗  ╔╦╗  ╔╦╗  ╦    ╔═╗")}
${chalk.hex('#8D8C8C')("                               └┼┐  ╠╩╗  ╠═╣   ║║  ╠═╣   ║║   ║║  ║    ║╣")}
${chalk.hex('#DC143C')("                               └┼┘  ╩ ╩  ╩ ╩  ═╩╝  ╩ ╩  ═╩╝  ═╩╝  ╩═╝  ╚═╝")}
`)

console.log(logo)


async function main() {
  const letters = ['$ ', 'K ', 'A ', 'D ', 'A ', 'D ', 'D ', 'L ', 'E'];
  let pusher = "";
  letters.forEach((l, i) => {
      setTimeout(() => {
          pusher += l;
          process.title = pusher;
      }, i * 75);
  })
    let res = await prompt({
        type: 'input',
        name: 'url',
        message: `Please give me a url to start scanning`
    })
    if (!res.url) return Main()
    const url = res.url;
    let res2 = await prompt({
        type: 'password',
        name: 'webhook',
        message: `Which webhook would you like the images to be sent?`
    })
    const Discord = require('discord.js');
    res2.webhook = res2.webhook.replace(/https:\/\/discord\.com\/api\/webhooks\//g, '').replace(/https:\/\/canary\.discord\.com\/api\/webhooks\//g, '');
    const Webhook = res2.webhook.split('/')
    const webhook = new Discord.WebhookClient(Webhook[0], Webhook[1])
    Spinner.start(`skadaddle is now scanning ${url}...`)
    request(url, (err, resp, html) => {
        Spinner.succeed(`Done Scraping ${url}`)
        if (!err && resp.statusCode == 200) {
            const $ = cherio.load(html);
              $("img").each((index ,image) => {
                const img = $(image).attr('src');
                const Links = img;
                webhook.send({
                    "content": null,
                    "embeds": [
                      {
                        "color": 0,
                        "author": {
                          "name": `Pix's PFPs`,
                          "url": `${Links}`,
                          "icon_url": `${Links}`
                        },
                        "footer": {
                          "text": "powered by skadaddle",
                          "icon_url": "https://cdn.discordapp.com/icons/815155331348561920/eb90ec21afe30f712500eca717cd2133.png?size=4096"
                        },
                        "image": {
                          "url": `${Links}`
                        }
                      }
                    ],
                    "username": `pix was here`,
                    "avatarURL": "https://cdn.discordapp.com/attachments/823616607942869042/823626290195202048/image0.jpg"
                  },porn(`SENDING » ${red(`${Links}`)}`))
                  
                }
        );
        }
        
    });
}
main()
