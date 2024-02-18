const fs = require('fs')
const kanji = require('./kanji.json')

const FILE = 'partitions.html'

const base = {
  10: [],
  9: [],
  8: [],
  7: [],
  6: [],
  5: [],
  4: [],
  3: [],
  2.5: [],
  2: [],
  1.5: [],
  1: [],
}

const grouped = kanji
  .reduce((result,item) => {
    // console.log(result)
    result[item.grade].push(item.kanji)
    return result
  },base)

const all =
  Object
    .entries(grouped)
    .sort((x,y) => Number(y[0]) - Number(x[0]))
    .map(([grade,kanjis]) => {

      const cells = kanjis.map(kanji => `<a href="https://jisho.org/search/${kanji}%20%23kanji">${kanji}</a>`)

      return `<a href="#grade_${grade}"><div class=section id=grade_${grade}>${grade}</div></a><div class="partition">${cells.join("")}</div>`
    })

fs.writeFileSync(
  FILE,
  all.join("\n")
)   