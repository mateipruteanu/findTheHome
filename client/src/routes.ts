export class Routes {
  static HOME = "/";
  static LOGIN = "/login";
  static REGISTER = "/register";
  static SAVED_HOMES = "/saved-homes";
  static SEARCH = "/search";
  static ACCOUNT = "/account";
  static MY_HOMES = "/my-homes";
  static ADMIN = "/admin";
}

export class PrivateRoutes {
  static SAVED_HOMES = Routes.SAVED_HOMES;
  static ACCOUNT = Routes.ACCOUNT;
  static MY_HOMES = Routes.MY_HOMES;
}

export function isPrivateRoute(route: string) {
  return Object.values(PrivateRoutes).includes(route);
}

export function isAdminRoute(route: string) {
  return route === Routes.ADMIN;
}
