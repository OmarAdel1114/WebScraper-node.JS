const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

const website = "https://news.sky.com";

try {
  axios(website).then((response) => {
    const data = response.data;
    const $ = cheerio.load(data);
    let content = [];

    $(".sdc-site-tile__headline", data).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");

      content.push({
        title,
        url,
      });
      app.get("/", (req, res) => {
        res.json(content);
      });
    });
  });
} catch (error) {
  console.log(error, error.message);
}

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
