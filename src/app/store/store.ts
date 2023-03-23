// *** store.ts 파일
// 1. 루트리듀서를 만든다 : HYDRATE 액션을 처리하고, 슬라이스들을 통합한다.
// 2. store 생성함수를 만든다.
// 3. next-redux-wrapper 라이브러리의 wrapper를 만들어 export 해준다.

import {
  configureStore,
  Reducer,
  AnyAction,
  ThunkAction,
  Action,
  CombinedState,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import logger from "redux-logger";

import viewPortQuery, { queryState } from "./reducers/viewPortQuery";

// ### 리듀서 State 타입 정의
export interface ReducerStates {
  queryPort: queryState;
}

// ### 루트 리듀서 생성
// 1) next-redux-wrapper의 HYDRATE 액션을 정의해주고,
// 2) 슬라이스들을 통합한다.
// next-redux-wrapper의 사용 매뉴얼이므로 그냥 이대로 해주면 알아서 처리된다.
const rootReducer = (state: ReducerStates, action: AnyAction): CombinedState<ReducerStates> => {
  if (action.type === HYDRATE) return { ...state, ...action.payload };
  const combinedReducer = combineReducers({
    queryPort: viewPortQuery.reducer,
  });
  return combinedReducer(state, action);
};


export const store = configureStore({
  reducer: rootReducer as Reducer<ReducerStates, AnyAction>, // 리듀서
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // middleware: [...getDefaultMiddleware(), logger]
  devTools: process.env.NODE_ENV === "development", // 개발자도구
});

// ### 타입 익스포트
export type AppStore = ReturnType<typeof store.getState>; // store 타입
export type RootState = ReturnType<typeof rootReducer>; // RootState 타입
// export type RootState = ReturnType<AppStore['getState']>; // RootState 타입(위와 동일함)
export type AppDispatch = typeof store.dispatch; // dispatch 타입
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>; // Thunk 를 위한 타입

// ### next-redux-wrapper의 wrapper 생성
// wrapper 익스포트
// export const wrapper = createWrapper<AppStore>(makeStore, {
//   debug: process.env.NODE_ENV === "development",
// });


// export default wrapper;

