import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import product from './product/reducer.product';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import user from './user/reducers';
import authentication from './authentication/reducer.authentication';
import auction from './auction/reducer.auction';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp,
  user,
  product,
  authentication,
  auction,
});

export default reducers;
