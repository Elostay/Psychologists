import { IState } from "Interface/redux.types";

export const selectIsLoggedIn = (state: IState) => state.auth.isLoggedIn;

export const selectUser = (state: IState) => state.auth.user;

export const selectIseRefreshing = (state: IState) => state.auth.isRefreshing;
