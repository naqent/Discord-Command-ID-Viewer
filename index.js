import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import 'dotenv/config';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Semua slash command didefinisikan di sini
const commands = [
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Menampilkan daftar command bot ini'),

  new SlashCommandBuilder()
    .setName('about')
    .setDescription('Informasi tentang bot ini'),

  new SlashCommandBuilder()
    .setName('getcommands_other')
    .setDescription('Melihat command + ID dari bot lain (perlu token bot itu)')
    .addStringOption(opt =>
      opt
        .setName('application_id')
        .setDescription('Application ID bot lain')
        .setRequired(true),
    )
    .addStringOption(opt =>
      opt
        .setName('token')
        .setDescription('Token bot target (jaga kerahasiaannya)')
        .setRequired(true),
    ),
].map(cmd => cmd.toJSON());

// Ketika bot siap
client.once('ready', async () => {
  console.log(`✅ Bot online sebagai ${client.user.tag}`);

  // Auto update command setiap bot dijalankan
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    console.log('🔄 Memperbarui slash commands di Discord...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('🚀 Semua command berhasil diperbarui!');
  } catch (err) {
    console.error('❌ Gagal memperbarui command:', err);
  }
});

// Handler untuk slash command
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // --- /help ---
  if (interaction.commandName === 'help') {
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('📘 Daftar Command Bot')
      .setDescription('Berikut adalah command yang tersedia:')
      .addFields(
        { name: '/help', value: 'Menampilkan daftar command', inline: false },
        { name: '/about', value: 'Informasi tentang bot', inline: false },
        { name: '/getcommands_other', value: 'Melihat command + ID dari bot lain (butuh token bot target)', inline: false },
      )
      .setFooter({ text: 'Dibuat oleh Naqent 😎' });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

  // --- /about ---
  else if (interaction.commandName === 'about') {
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('🤖 Tentang Bot Ini')
      .setDescription('Bot ini dibuat untuk membantu developer Discord dalam mengelola command ID dan testing API.')
      .addFields(
        { name: 'Developer', value: 'Naqent', inline: true },
        { name: 'Versi', value: '1.0.0', inline: true },
        { name: 'Library', value: 'discord.js v14', inline: true },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

  // --- /getcommands_other ---
  else if (interaction.commandName === 'getcommands_other') {
    const targetAppId = interaction.options.getString('application_id');
    const targetToken = interaction.options.getString('token');
    await interaction.deferReply({ ephemeral: true });

    try {
      const res = await fetch(
        `https://discord.com/api/v10/applications/${targetAppId}/commands`,
        {
          headers: { Authorization: `Bot ${targetToken}` },
        },
      );

      if (!res.ok) {
        return interaction.editReply(`❌ Gagal mengakses bot itu (status ${res.status}). Pastikan token benar & aktif.`);
      }

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        return interaction.editReply(`⚠️ Bot dengan ID \`${targetAppId}\` tidak memiliki command global.`);
      }

      const commandsList = data.map(cmd => `/${cmd.name} — \`${cmd.id}\``).join('\n');

      await interaction.editReply(`🧾 **Daftar Command Bot \`${targetAppId}\`:**\n${commandsList}`);
    } catch (err) {
      console.error('❌ Error:', err);
      await interaction.editReply('❌ Terjadi kesalahan saat mengambil command bot lain.');
    }
  }
});

client.login(process.env.TOKEN);
