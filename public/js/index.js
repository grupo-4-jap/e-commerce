import { CATEGORY } from './constants/CONSTANTS.js';
import addEvents from './utils/addEvents.js';

document.addEventListener('DOMContentLoaded', function () {
  addEvents('card', CATEGORY);
});
