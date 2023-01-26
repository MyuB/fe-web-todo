import { log } from '../template/log.js';

const $target = document.querySelector('.header');
const $button = document.querySelector('.trigger');

const template = `
  <div class="sidebar hidden">
    <div class="empty-wrapper"></div>
    <div class="close-button trigger"><p>X</p></div>
    <div class="logs-wrapper">
    </div>
  </div>
`;

const sideBar = () => {
  $target.insertAdjacentHTML('afterend', template);
  document.addEventListener('click', sideBarBtnHandler);
};

const sideBarBtnHandler = ({ target }) => {
  if (target.classList.contains('trigger') || target.closest('.trigger')) {
    const sideBarEl = document.querySelector('.sidebar');
    sideBarEl.classList.toggle('hidden');
  }
};

export default sideBar;
