class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  getUserInfoData() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  editProfile({ name, about }) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addNewCard({ name, link }) {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  changeLikeCardStatus(id, state) {
    return this._request(`${this.baseUrl}/cards/${id}/likes`, {
      method: state,
      headers: {
        authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  editProfileAvatar(link) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: `https://api.mesto.anton.glazunov.nomoredomains.work`,
});
