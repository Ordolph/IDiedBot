require("dotenv").config();
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");

//Initialize snoowrap config
const r = new Snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS,
});

//Initialize snoowrap client
const client = new Snoowrap(r);

//Set options for comment stream
const streamOpts = {
  subreddit: "BotTestSubreddit1",
  limit: 1,
};

//Create comment stream
const comments = new Snoostorm.CommentStream(client, streamOpts);

//Bot start function
const start = function () {
  comments.on("item", (item) => {
    console.log(item);
    let commentDateMS = item.created_utc * 1000;
    let currentTime = Date.now();
    if (
      item.body.toLowerCase().includes("i died") || item.body.toLowerCase().includes("killed me")
      && commentDateMS + 300000 >= currentTime
    ) {
      console.log("I have been summoned!");
      item.reply(`RIP ${item.author.name}`)
    }
  });
};

start();
