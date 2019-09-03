import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import storiesSaga from './storiesSaga';
import imagesSaga from './imagesSaga';
import addStory from './addStory';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('ADD_STORY', addStory)
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    storiesSaga(),
    imagesSaga(),
  ]);
}
