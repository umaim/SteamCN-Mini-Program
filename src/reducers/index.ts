import { combineReducers } from 'redux';
import account from './account';
import system from './system';

export default combineReducers({
  account,
  system
});
