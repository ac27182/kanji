const fs = require('fs')
const kanji = require('./kanji_i5.json')

const FILE = 'partitions.html'

const base = {
  10: [],
  9: [],
  8: [],
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

      // console.log(kanjis)

      const cells = kanjis.map(kanji => `<a href="https://jisho.org/search/${kanji}%20%23kanji">${kanji}</a>`)

      return `<a href="#grade_${grade}"><div class=section id=grade_${grade}>${grade}</div></a><div class="partition">${cells.join("")}</div>`
    })

// .map(record => `<a href="https://jisho.org/search/${record.kanji}%20%23kanji">${record.kanji}</a>`)
// .reduce((result, item, index) => {
//   const chunkIndex = Math.floor(index / 100)

//   if (result[chunkIndex] === undefined) {
//     result[chunkIndex] = []
//   }

//   result[chunkIndex].push(item)

//   return result
// },[])
// .map((items,index) => `<a href="#section_${index + 1}"><div class=section id=section_${index + 1}>${index * 100 + 1}-${(index + 1) * 100}</div></a><div class="partition">${items.join("\n")}</div>`)


fs.writeFileSync(
  FILE,
  all.join("\n")
)   