import { getFormHTML, getById } from '../Util/DOM';
import 'regenerator-runtime/runtime';

let that;

const hideForm = () => {
  if (getById('form')) {
    const form = getById('form');
    form.reset();
    form.classList.remove('show');
    form.remove();
  }
};

const validateForm = () => {
  const name = getById('name').value;

  if (!name) {
    return false;
  }
  return true;
};

const makeApiRequest = async () => {
  const name = getById('name').value;
  that.sys.game.globals.playerScore.submitScore(name);
  await that.sys.game.globals.playerScore.getScores();
  that.scene.start('LeaderBoard');
  hideForm();
};

const dismisMessage = () => {
  setTimeout(() => {
    const span = getById('message');
    span.remove();
  }, 3000);
};

const showMessage = (msg) => {
  const span = document.createElement('span');
  span.innerText = msg;
  span.id = 'message';
  const form = getById('form');
  if (!getById('message')) {
    form.insertAdjacentElement('beforebegin', span);
  }
  dismisMessage();
};

const onFormSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    makeApiRequest();
  } else {
    showMessage('Please enter your name to continue');
  }
};

const showForm = (t) => {
  const html = getFormHTML();
  if (!getById('form')) {
    document.body.insertAdjacentHTML('beforeend', html);
  }
  that = t;
  const form = getById('form');
  form.classList.add('show');
  getById('form').addEventListener('submit', (e) => onFormSubmit(e));
};

export { showForm, hideForm };
