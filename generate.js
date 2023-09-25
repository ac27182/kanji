const fs = require('fs')
const kanji = require('./kanji_i2.json')

const FILE = 'partitions.html'

const list =
  kanji
    .map(record => `<a href="https://jisho.org/search/${record.kanji}%20%23kanji">${record.kanji}</a>`)
    .reduce((result,item,index) => {
      const chunkIndex = Math.floor(index / 100)

      if (result[chunkIndex] === undefined) {
        result[chunkIndex] = []
      }

      result[chunkIndex].push(item)

      return result
    },[])
    .map((items,index) => `<a href="#section_${index + 1}"><div class=section id=section_${index + 1}>${index * 100 + 1}-${(index + 1) * 100}</div></a><div class="partition">${items.join("\n")}</div>`)

fs.writeFileSync(
  FILE,
  list.join("\n")
)   