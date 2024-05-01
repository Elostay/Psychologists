export interface IInitialState {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

export interface IState {
  auth: {
    user: {
      name: string | null;
      email: string | null;
    };
    token: string | null;
    isLoggedIn: boolean;
    isRefreshing: boolean;
  };
}
