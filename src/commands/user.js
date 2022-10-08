const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: 'user',
        description: 'Get info about a user',
        usage: `!user`,
        options: [
            {
                name: 'target',
                description: 'The user\'s info you want to get',
                type: 6, // USER
                required: true,
            },
        ],
    },
    async run (bot,message,args) {
        const user = message.options.getUser('target');
        if (user) {
            const member = message.guild.members.cache.get(user.id);
            const embed = new EmbedBuilder()
                .setTitle(`User info for ${user.username}`)
                .setThumbnail(`${user.displayAvatarURL()}`)
                .setColor(0x00AE86)
                .setTimestamp()
                message.reply({ 
                    embeds: [embed],
                    ephemeral: true,
                    
                });
        }else {
            message.reply('Please mention the user you want to get info from.');
        }
    }
};