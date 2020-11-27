class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    checkStatus(res) {
        if (res.ok) {
            return res.json()
        }
        else { return Promise.reject(`Ошибка: ${res.status}`) }
    }

    getAppinfo() {
        return Promise.all([this.getInitialCards(), this.getUserInformation()])
    }

    // Получение массива карточек с сервера
    getInitialCards(token) {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        })
            .then(this.checkStatus)
    }

    // Метод для создания новой карточки
    postNewCard(data, token) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
            .then(this.checkStatus)
    };
    // Метод для удаления карточки
    deleteThisCard(cardId, token) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'Delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        })
            .then(this.checkStatus)
    }
    // Метод для получения инфы профиля
    getUserInformation(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        })
            .then(this.checkStatus)
    }
    //Метод для изменения инфы профиля
    setUserInfo(data, token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })

        }).then(this.checkStatus)

    }
    //Метод для изменения аватарки
    changeProfileAvatar(data, token) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            body: JSON.stringify({
                avatar: data.avatar
            })

        }).then(this.checkStatus)
    }
    // Лайкос

    changeLikeStatus(cardId, isLiked, token) {
        if (isLiked) {
            return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  }
            }).then(this.checkStatus)
        } else if (!isLiked) {
            return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  }
            }).then(this.checkStatus)
        }
    }

}
export const apiProfile = new Api({
    baseUrl: 'https://api.happycabage.students.nomoreparties.xyz',
});