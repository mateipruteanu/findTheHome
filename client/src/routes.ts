export class Routes {
  static HOME = "/";
  static LOGIN = "/Login";
  static REGISTER = "/Register";
  static SAVED_HOMES = "/SavedHomes";
  static SEARCH = "/Search";
  static ACCOUNT = "/Account";
  static MY_HOMES = "/my-homes";
}

export class PrivateRoutes {
  static SAVED_HOMES = "/SavedHomes";
  static ACCOUNT = "/Account";
  static MY_HOMES = "/my-homes";
}

export function isPrivateRoute(route: string) {
  return Object.values(PrivateRoutes).includes(route);
}