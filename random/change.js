const MAX = 200
const BASE = 1000
const KEY = "kanji_indexes"
const SEPARATOR = "|"

const initialise = () => {
  const array = []

  for (i = 0; i < MAX; i++) array.push(i + BASE)

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
