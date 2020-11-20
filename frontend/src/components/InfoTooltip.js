import React from "react";
import success from '../images/success.png';
import fail from '../images/fail.png';


function InfoToolTip({setMessage, isOpen, isClose, closeToOverlay }) {
  return (
    <div
      className={`popup   popup_function_registration ${isOpen && "popup_opened"}  `}
      onClick={closeToOverlay}
    >
      <div className="popup__container popup__container_function_registration">
        <button
          type="button"
          className="popup__close popup__close_current_image"
          onClick={isClose}
        ></button>
        {setMessage ?  <img className="infotooltip__image"  src={success} alt=""/>  : <img className="infotooltip__image" src={fail} alt="" />}

        <h2 className="infotooltip__message">
          {setMessage ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так. Попробуйте ещё раз'}
        </h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
