const getBoardHTML = (scores) => {
  let html = ''
  for(let score of scores) {
    html += `<span>${score.user} : ${score.score}</span><br/>`
  }
  let div = document.createElement('div');
  div.classList.add('leader-board');
  div.innerHTML = html
  return div;
}

const getFormHTML = () => {
  let html = `
    <form id="form" class="">
      <input id="name" placeholder="Enter your name">
      <button type="submit" id="submit">Send</button>
    </form>
  `
  return html
}

const getById = (id) => {
  return document.getElementById(id)
}

const getByClass = (cls) => {
  return document.querySelector(cls)
}

export { getBoardHTML, getFormHTML, getById, getByClass }