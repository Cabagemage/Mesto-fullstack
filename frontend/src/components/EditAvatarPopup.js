import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  isClose,
  closeToOverlay,
  onUpdateAvatar,
}) {
  const avatarRef = React.useRef("");

  React.useEffect(() => {
    avatarRef.current.value = '';
  },[isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      form="avatar"
      title="Обновить аватар"
      buttonText="Обновить"
      btnClassName="edit"
      onSubmit={handleSubmit}
      popupCloseName="avatar"
      isOpen={isOpen}
      isClose={isClose}
      closeToOverlay={closeToOverlay}
      children={
        <>
          <div className="popup__inputs">
            <input
              type="url"
              ref={avatarRef}
              name="Аватар"
              required
              className="popup__input popup__input_type_link"
              placeholder="Ссылка"
            />
            <span id="avatar-error" className="popup__input_type_error"></span>
          </div>
        </>
      }
    />
  );
}
