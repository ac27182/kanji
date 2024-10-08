const fs = require('fs')
const kanji = require('./kanji.json')

const JISHO_FILE = 'index.html'
const SENTANCES_FILE = 'sentances.html'

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
  .reduce((result, item) => {
    result[item.grade].push(item.kanji)
    return result
  }, base)

const sorted = Object.entries(grouped).sort((x, y) => Number(y[0]) - Number(x[0]))

const jisho = sorted.map(([grade, kanjis]) => {
  const cells = kanjis.map(kanji => `<a onclick="copy('${kanji}')">${kanji}</a>`)

  return `<a href="#grade_${grade}"><div class=section id=grade_${grade}>${grade}</div></a><div class="partition">${cells.join("")}</div>`
})
  .join("\n")

const sentances = sorted.map(([grade, kanjis]) => {
  const cells = kanjis.map(kanji => `<a href="https://ac27182.github.io/sentances/compiled/sentances.html?query=${kanji}">${kanji}</a>`)

  return `<a href="#grade_${grade}"><div class=section id=grade_${grade}>${grade}</div></a><div class="partition">${cells.join("")}</div>`
})
  .join("\n")



const makePage = (partitions) => `
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="./style_kanji.css">
</head>

<script>
  async function copy(element) {
    return navigator
      .clipboard
      .writeText(element)
  }
</script>

<body class="container">${partitions}</body>

</html>
`

fs.writeFileSync(JISHO_FILE, makePage(jisho))

fs.writeFileSync(SENTANCES_FILE, makePage(sentances))