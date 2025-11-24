const MAX = 50
const BASE = 1000
const KEY = "kanji_indexes"
const BASE_KEY = "BASE"
const SEPARATOR = "|"

const clear = () => {
  localStorage.removeItem(KEY)
}

const sync = () => {
  const base = localStorage.getItem(BASE_KEY)
  console.log(base)
  if (base == null) {
    document.getElementById("base").value = 0
  } else {
    document.getElementById("base").value = Number(base)
  }
}
const set = () => {
  const value = document.getElementById("base").value
  console.log(value)
  localStorage.setItem(BASE_KEY,value)
}

const initialise = () => {
  const array = []

  const base = Number(localStorage.getItem(BASE_KEY)) ?? 1000

  for (i = 0; i < MAX; i++) array.push(i + base)

  array.sort(() => Math.random() - 0.5)

  localStorage.setItem(KEY,array.join(SEPARATOR))
}

const change = () => {
  let array =
    localStorage
      ?.getItem(KEY)
      ?.split(SEPARATOR)

  if (array === undefined || array.length === 0) {
    initialise()
    array = localStorage
      .getItem(KEY)
      .split(SEPARATOR)
  }

  const item = array.pop()

  const href = window.location.href.split("/")

  href.pop()

  href.push(`${item}.html`)

  if (array.length === 0) {
    initialise()
    array = localStorage
      .getItem(KEY)
      .split(SEPARATOR)
  }

  localStorage.setItem(KEY,array.join(SEPARATOR))

  window.location.href = href.join("/")
}
