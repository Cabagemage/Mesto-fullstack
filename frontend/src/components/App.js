import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import PopupImage from "./PopupImage";
import { apiProfile } from "../utils/Api.js";
import { currentUserContext } from "../contexts/currentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import {
  Route,
  Switch,
  useHistory,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./HOC/ProtectedRoute";
import Register from "./Register";
import * as Auth from "../utils/Auth";
import InfoToolTip from "./InfoTooltip";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddImagePopupOpen, setAddImagePopupOpen] = useState(false);
  const [isChangeAvatarPopupOpen, setChangeAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [login, setLogin] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false); // Открытие и закрытие попапа
  const [infoPopup, setInfoPopup] = useState(false) // Этот стейт указывает тру или фоллс для отображения нужного элемента
  const [email, setEmail] = useState(""); //Сохранение емейла в стейте
  const [token, setToken] = useState("")
  useEffect(() => {
    Promise.all([
      apiProfile.getUserInformation(token),
      apiProfile.getInitialCards(token)
    ])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  const handleUpdateUser = (user) => {
    apiProfile
      .setUserInfo(user, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (url) => {
    apiProfile
      .changeProfileAvatar(url, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  // const handleEscClose = () => {
  //   document.addEventListener('keyup', (e) => {
  //     if (e.key === 'escape') closeAllPopups();
  //    });
  //  }

  const handleAddPlaceSubmit = (data) => {
    apiProfile
      .postNewCard(data, token)
      .then((res) => {
        setCards([...cards, res]);
        closeAllPopups();

      })
      .catch((err) => console.log(err));
  };
  const handleEditClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddClick = () => {
    setAddImagePopupOpen(true);
  };
  const handleAvatarClick = () => {
    setChangeAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setChangeAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddImagePopupOpen(false);
    setSelectedCard(null);
    setInfoPopupOpen(false)
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i  === currentUser._id);
    apiProfile
      .changeLikeStatus(card._id, !isLiked, token)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    apiProfile
      .deleteThisCard(card._id, token)
      .then(() => {
        const newCards = cards.filter((c) =>  c._id !== card._id)
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }


  // const handleEscClose = () => {
  //   document.addEventListener('keyup', (e) => {
  //     if (e.key === 'escape') closeAllPopups();
  //    });
  //  }

  // Логика регистрации, авторизации, токенов и т.д.

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if(jwt){setToken(jwt)
      Auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLogin(true);
          setEmail(res.email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
  const onInfoPopup = () => {
    setInfoPopupOpen(true);
  };

  const signOut = () => {
    setEmail("");
    localStorage.removeItem("jwt");
    history.push("/signin");
  };

  const onRegister = (email, password) => {
    Auth.register(email, password).then((res) => {
      if (res) {
        onInfoPopup(); // Открытие попапа
        setInfoPopup(true) // показать сообщение об успешной регистрации
        history.push("/signin"); // Прокинуть юзера на страницу логина
        console.log(res)
      }
    }).catch((err) => {
      if(err === 400){
    console.log('Некорректно заполнено одно из полей ')
    onInfoPopup()
    setInfoPopup(false)}
  })
  }

  const handleLogin = (email, password) => {
    Auth.signIn(email, password)
      .then((res) => {
        if (res && res.token) {
          //  Поменял ('jwt', token) на текущий вариант
          localStorage.setItem("jwt", res.token);
          setLogin(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((error) => {
      setInfoPopup(false)
      onInfoPopup()
      if(error === 401){
      console.log('Пользователь с email не найден')}
      else if(error === 400){
      console.log('Не передано одно из полей ')
      }
    })
  }
  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header login={login} email={email} signOut={signOut}></Header>

        <Switch>
          <ProtectedRoute
            login={login}
            exact
            path="/"
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditClick}
            onAddPlace={handleAddClick}
            onEditAvatar={handleAvatarClick}
            onCardClick={handleCardClick}
          ></ProtectedRoute>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/">
            {login ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
          </Switch>
          <InfoToolTip
          isOpen={isInfoPopupOpen}
          setMessage={infoPopup}
          isClose={closeAllPopups}
          closeToOverlay={handleOverlayClose}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            isClose={closeAllPopups}
            closeToOverlay={handleOverlayClose}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddImagePopupOpen}
            isClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
            closeToOverlay={handleOverlayClose}
          />
          <EditAvatarPopup
            isClose={closeAllPopups}
            closeToOverlay={handleOverlayClose}
            isOpen={isChangeAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupImage
            card={selectedCard}
            isClose={closeAllPopups}
            closeToOverlay={handleOverlayClose}
          />

          <Footer />

      </div>
    </currentUserContext.Provider>
  );
}

export default App;
