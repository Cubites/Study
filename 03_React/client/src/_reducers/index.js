import { combineReducers } from 'redux';
import user from './user_reducer';

// 원래는 각 state마다 reducer가 필요함
// combineReducers는 그 reducer 들을 하나로 묶어줌
const rootReducer = combineReducers({
    user
});

export default rootReducer;