import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import 'antd/dist/antd.min.css';
import { applyMiddleware, createStore } from 'redux'; // applyMiddleware() : 입력한 미들웨어를 적용시켜줌
import promiseMiddleware from 'redux-promise'; // action의 return 값으로 객체 뿐만아니라 Promise도 내보낼 수 있게 해줌
// primiseMiddleware가 없으면 dispatch에서 에러 발생
import ReduxThunk from 'redux-thunk'; // action의 return 값으로 객체 뿐만아니라 함수도 내보낼 수 있게 해줌
import Reducer from './_reducers'; // index.js를 알아서 읽음

// 미들웨어(promiseMiddleware, ReduxThunk) 사용 등록, 이 미들웨어들은 action과 reducer 사이에 동작함
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__() // 크롬의 redux 확장 프로그램에서 상태 변화를 볼 수 있게 해줌
    )}
  >
    <App />
  </Provider>
);
