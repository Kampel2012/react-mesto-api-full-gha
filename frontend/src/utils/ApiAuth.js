class ApiAuth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  signup({ email, password }) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }

  signin({ email, password }) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  checkToken(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    });
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: `https://api.mesto.anton.glazunov.nomoredomains.work`,
  headers: {
    'Content-Type': 'application/json',
  },
});
