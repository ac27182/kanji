const fs = require("node:fs")
const file = require("./joyo_kanji.json")
const kanken = require("./kanji.json")

const lookup = {}

kanken.forEach(item => {
  lookup[item.kanji] = item.grade
})

// console.log(lookup)

file.forEach(item => {

  const grade = lookup[item.shinjitai]

  if (grade === undefined) {
    console.error(item)
    return
  }

  item["grade"] = Number(grade)

})


file.sort((a,b) => {
  if (a.shinjitai.charCodeAt(0) < b.shinjitai.charCodeAt(0)) return -1
  else if (a.shinjitai.charCodeAt(0) > b.shinjitai.charCodeAt(0)) return 1
  else return 0
})

file.sort((a,b) => {
  if (a["grade"] > b["grade"]) return -1
  else if (a["grade"] < b["grade"]) return 1
  else return 0
})

file.forEach((item,index) => {
  item.id = (index + 1)
})


fs.writeFileSync("./joyo_kanji_new.json",JSON.stringify(file,null,4),'utf-8')