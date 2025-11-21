
const MAX = 2137

const change = () => {
  const n = Math.floor(Math.random() * MAX);

  const href = window.location.href.split("/")

  href.pop()

  href.push(`${n}.html`)

  window.location.href = href.join("/")
}
