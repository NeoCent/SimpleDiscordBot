const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 🌍 переменная языка
let lang = "en";

// 📦 тексты
const text = {
  en: {
    hello: "Hello 🤖",
    info: "This is a simple bot",
    lang: "Language: EN"
  },
  ru: {
    hello: "Привет 🤖",
    info: "Это простой бот",
    lang: "Язык: RU"
  }
};

// 🚀 запуск
client.once("ready", () => {
  console.log("Bot is online");
});

// 💬 команды
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const t = text[lang];

  if (message.content === "!hello") {
    message.reply(t.hello);
  }

  if (message.content === "!info") {
    message.reply(t.info);
  }

  if (message.content === "!panel") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("hello")
        .setLabel("Hello")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("info")
        .setLabel("Info")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("lang")
        .setLabel("Lang")
        .setStyle(ButtonStyle.Secondary)
    );

    message.reply({
      content: "Simple Panel",
      components: [row]
    });
  }
});

// 🔘 кнопки
client.on("interactionCreate", (i) => {
  if (!i.isButton()) return;

  const t = text[lang];

  if (i.customId === "hello") {
    return i.reply(t.hello);
  }

  if (i.customId === "info") {
    return i.reply(t.info);
  }

  if (i.customId === "lang") {
    lang = lang === "en" ? "ru" : "en";
    return i.reply(t.lang);
  }
});

client.login("YOUR_BOT_TOKEN");
