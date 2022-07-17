import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.getElementById('span');

const countModifier = (state) => { // reducer
  console.log(state);
  return state;
};

const countStore = createStore(countModifier); // store

// console.log(countStore.getState());