import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpen, isClose, closeToOverlay, onSubmit }) {

    const [placeValues, setFormValues] = React.useState({
        name: '',
        link: ''
    })




    const handleInputChange = React.useCallback((e) =>{
        const {name, value} = e.target;
        setFormValues(prevState => ({...prevState, [name]:value}))
    }, [setFormValues])


    const {name, link} = placeValues
    const nameRef = React.useRef('')
    const imageRef = React.useRef('')



    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name: nameRef.current.value, link: imageRef.current.value });
    }
    return (
        <PopupWithForm
            name="add"
            form="add"
            title='Новое место'
            onSubmit={handleSubmit}
            btnClassName="create"
            buttonText='Сохранить'
            isOpen={isOpen}
            isClose={isClose}
            closeToOverlay={closeToOverlay}
            children={
                <>
                    <div className="popup__inputs">
                        <input

                            type="text"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                            ref={nameRef}
                            required minLength="1"
                            maxLength="30"
                            className="popup__input popup__input_type_place"
                            placeholder="Место" />
                        <span
                            id="place-error"
                            className="popup__input_type_error"></span>
                        <input
                            type="url"
                            name="link"
                            value={link}
                            onChange={handleInputChange}
                            ref={imageRef}
                            required className="popup__input popup__input_type_link"
                            placeholder="Ссылка" />

                        <span
                            id="link-error"
                            className="popup__input_type_error"></span>
                    </div>

                </>
            }
        />
    )
}
