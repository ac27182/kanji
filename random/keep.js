const fs = require("node:fs")
const file = require("./joyo_kanji.json")

const template = (shinjitai,meaning,strokes,radical,readings,kyujitai) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="../index.css">
  <script src="../change.js"></script>
</head>

<body>
  <div class="main-kanji" onclick="change()">${shinjitai}</div>
  <div class="details">
    <div class="reading">${meaning}</div>
    <div>${strokes}</div>
    <div>${radical}</div>
    <div class="reading">${readings}</div>
    <div>${kyujitai}</div>
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

    const i = kanji
      .readings
      .split('')
      .findIndex(value => {
        const charcode = value.charCodeAt(0)

        if (charcode >= 0x0061 && charcode <= 0x007A) {
          return true
        } else {
          return false
        }
      })

    const readingf = kanji.readings.substring(0,i)

    const html = template(kanji.shinjitai,kanji.meaning,kanji.strokes,kanji.radical,readingf,kanji.kyujitai)
    fs.writeFileSync(`./pages/${index + 1}.html`,html,'utf8')
  })