const getBoardHTML = (scores) => {
  let html = '';
  for (let i = 0; i < scores.length; i += 1) {
    html += `<span>${scores[i].user} : ${scores[i].score}</span><br/>`;
  }
  const div = document.createElement('div');
  div.classList.add('leader-board');
  div.innerHTML = html;
  return div;
};

const getFormHTML = () => {
  const html = `
    <form id="form" class="">
      <input id="name" placeholder="Enter your name">
      <button type="submit" id="submit">Send</button>
    </form>
  `;
  return html;
};

const getById = (id) => document.getElementById(id);

const getByClass = (cls) => document.querySelector(cls);

export {
  getBoardHTML, getFormHTML, getById, getByClass,
};
