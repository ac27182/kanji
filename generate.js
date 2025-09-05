const fs = require('fs')
const kanji = require('./kanji.json')

const JISHO_FILE = 'index.html'

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
    result[item.grade].push(item.kanji)
    return result
  },base)


const mappings =
  new Map(fs
    .readFileSync('./lookup.txt','utf8')
    .split('\n')
    .map(mapping => mapping.split('\t')))

const sorted = Object.entries(grouped).sort((x,y) => Number(y[0]) - Number(x[0]))

const jisho = sorted.map(([grade,kanjis]) => {
  // const cells = kanjis.map(kanji => `<a href="https://www.kanjipedia.jp/kanji/${mappings.get(kanji)}#contentsWrapper">${kanji}</a>`)

  const cells = kanjis.map(kanji => `<a href="https://jisho.org/search/${kanji}%20%23kanji">${kanji}</a>`)
  
  return `<a href="#grade_${grade}"><div class=section id=grade_${grade}>${grade}</div></a><div class="partition">${cells.join("")}</div>`
})
  .join("\n")

const makePage = (partitions) => `
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="./style_kanji.css">
</head>

<body class="container">${partitions}</body>

</html>
`

fs.writeFileSync(JISHO_FILE,makePage(jisho))
