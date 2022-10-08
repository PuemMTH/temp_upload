const { REST, Routes, time } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const intents = 32767;
const client = new Client({ intents: intents });

// config
const CLIENT_ID = '888828682918064169';
const rest = new REST({ version: '10' }).setToken(process.env.dis_token);
// read all the commands from the commands folders
const commands = [];
const cmdsReads = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of cmdsReads) {
    const command = require(`./commands/${file}`);
    commands.push(command.config);
}
// deploy the commands
(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();
// end of deploy commands

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const args = interaction.options._hoistedOptions;
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (interaction.commandName === command.config.name) {
      command.run(client, interaction, args);
    }
  }
});

client.login(process.env.dis_token);