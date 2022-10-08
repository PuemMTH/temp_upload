const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'check',
        description: 'Get info about a check',
        usage: `!check`,
    },
    async run (bot,message,args) {
        // check if not admin
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.reply('You do not have permission to use this command.');
            return;
        }else{
            // get the ip
            const IPv4 = await axios.get('https://api.ipify.org/').then(res => res.data);
            const IPv6 = await axios.get('https://ipapi.co/ip/').then(res => res.data);
            
            const embed = new EmbedBuilder()
                .addFields(
                        { name: 'IPv4', value: `${IPv4}` },
                        { name: 'IPv6', value: `${IPv6}` },
                    )
                .setColor(0x00AE86)
                .setTimestamp()
            message.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
    }
};