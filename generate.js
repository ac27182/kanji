const fs = require('fs')
const kanji = require('./kanji_i2.json')

const FILE = 'partitions.html'

const list =
  kanji
    .map(record => `<a href="https://jisho.org/search/${record.kanji}%20%23kanji">${record.kanji}</a>`)

fs.writeFileSync(
  FILE,
  `<div class="partition">
    ${list.join("\n")}
  </div>`
)   