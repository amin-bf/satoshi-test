class Auth {
  check = false;
  user;
  token;

  constructor(user, token) {
    if (!user || !token) {
      return;
    }
    this.check = true;
    this.user = user;
    this.token = token;
  }

  getUser() {
    if (!this.check) return;
    return this.user;
  }

  getToken() {
    if (!this.check) return;
    return this.token;
  }
}

export default Auth;
