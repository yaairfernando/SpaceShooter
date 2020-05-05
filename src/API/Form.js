import { getFormHTML, getById } from '../Util/DOM'

let that;

const showForm = (t) => {
  let html = getFormHTML();
  if (!getById('form')) {
    document.body.insertAdjacentHTML("beforeend", html);
  }
  that = t;
  let form = getById('form')
  form.classList.add('show');
  getById('form').addEventListener('submit', (e) => onFormSubmit(e))
}

const makeApiRequest = async () => {
  let name = getById('name').value
  that.sys.game.globals.playerScore.submitScore(name)
  await that.sys.game.globals.playerScore.getScores();
  that.scene.start('LeaderBoard')
  hideForm();
}

const hideForm = () => {
  if (getById('form')) {
    let form = getById('form')
    form.reset();
    form.classList.remove('show');
    form.remove();
  }
}

const onFormSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    makeApiRequest();
  } else {
    showMessage('Please enter your name to continue')
  }
}

const validateForm = () => {
  let name = getById('name').value

  if (!name) {
    return false
  } else {
    return true
  }
}

const showMessage = (msg) => {
  let span = document.createElement('span');
  span.innerText = msg
  span.id = 'message'
  let form = getById('form')
  if (!getById('message')) {
    form.insertAdjacentElement("beforebegin", span);
  }
  dismisMessage()
}

const dismisMessage = () => {
  setTimeout(() => {
    let span = getById('message')
    span.remove();
  }, 3000);
}

export { showForm, hideForm }