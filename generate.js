const fs = require('fs')
const kanji = require('./kanken_json.json')

const FILE = 'partition.html'

const list =
  kanji
    .map(({ kanji,_,jisho_link }) => `<a href="${jisho_link}">${kanji}</a>`)

fs.writeFileSync(
  FILE,
  `<div class="partition">
    ${list.join("\n")}
  </div>`
)   