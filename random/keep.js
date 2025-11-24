const fs = require("node:fs")
const file = require("./joyo_kanji.json")

const template = (shinjitai,meaning,strokes,radical,readings,kyujitai) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="../index.css">
  <script src="../change.js"></script>
  <link rel="manifest" href="manifest.json">
</head>

<body onclick="change()">
  <div class="main-kanji">${shinjitai}</div>
  <div class="details">
    <div class="kanji-meta">
      <div>${strokes}</div>
      <div>${radical}</div>
      <div>${kyujitai === "" ? "◯" : kyujitai}</div>
    </div>
    <div class="reading">${meaning}</div>
    <div class="yomi-kata">${readings.map(reading => `<div class="yomi">${reading}</div>`).join('\n')}</div>
  </div>
</body>

</html>
`

console.log(
  Object.entries(JSON.parse(fs.readFileSync('./joyo_kanji.json','utf-8'))).length
)
// console.log(file.length)

file
  .forEach((kanji,index) => {

    const html = template(
      kanji.shinjitai,
      kanji.meaning,
      kanji.strokes,
      kanji.radical,
      kanji.readings,
      kanji.kyujitai
    )

    fs.writeFileSync(`./pages/${index + 1}.html`,html,'utf8')
  })