// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

fs = require('fs')
var data;
fs.readFile('alts.txt', 'utf8', function (err,rawData) {
  if (err) {
    return console.log(err);
  }
  data = rawData.split('\n');
});
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function getRandomLine(){
  return data[randomInt(0,data.length)];
}

var lines = 0;
//Using the first argument as the filename
var filename = "alts.txt";
var stream = fs.createReadStream(filename)
//When data is received, check all the character codes and
//if we find a carriage return, increment the line counter
stream.on("data", function(chunk) {
    for(var i = 0; i < chunk.length; i++) {
        if (chunk[i] == 10 || chunk[i] == 13) lines++;
    }
});

client.on('ready', () => {
    client.user.setActivity(lines + ' alts' + ' | !help', {type: 'PLAYING'});
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'help') {
      msg.channel.send('=== LegendAlts Bot by the LegendAlts developers. ===');
      msg.channel.send('Use !getalt');
      msg.channel.send('===============================================');
    }
    else if (command === 'invite') return msg.channel.send(process.env.INVITE);
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'getalt') {
      msg.channel.send("Check your PM " + msg.author);
      msg.author.send(':arrow_down: :regional_indicator_a: :regional_indicator_l: :regional_indicator_t: :arrow_down:');
      msg.author.send(getRandomLine());
      msg.author.send(':regional_indicator_e: :regional_indicator_n: :regional_indicator_j: :regional_indicator_o: :regional_indicator_y:');
      msg.author.send(':heart_decoration: :heart: :heart_decoration: :heart: :heart_decoration:');
    }
    else if (command === 'invite') return msg.channel.send(process.env.INVITE);
});

client.on('message', function(message) {
    if (message.content == "!clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }

});

client.login(process.env.TOKEN);
