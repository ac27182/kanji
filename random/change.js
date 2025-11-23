
const MAX = 250

const change = () => {
  const n = Math.floor(Math.random() * MAX);

  const href = window.location.href.split("/")

  href.pop()

  href.push(`${1000 + n}.html`)

  window.location.href = href.join("/")
}
