import React, { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi'; // -- Importando o Feather Icons
import Modal from 'react-modal';

import DateTimeMask from '../../Useful/UsefulValidate';

import './styles.css';

Modal.setAppElement('#root');

const FileCreator = (props) => {

    const [hora, setHora] = useState('');

    const getInitialState = () => {
        setHora("");
    }

    useEffect(() => {
        getInitialState();
    }, [props.isVisible]);

    return (

        <Modal
            className="modal-container"
            isOpen={props.isVisible}
            shouldCloseOnOverlayClick={false}
            onRequestClose={props.onCancel}
            animationType='slide'
            transparent={false}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(1, 1, 1, 0.65)'
                },
                content: {
                    marginTop: '100px',
                    marginLeft: '40%',
                    marginRight: '40%',
                    border: '1px solid #ccc',
                    background: 'rgba(62, 150, 148, 0.65)',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px'
                }
            }}>

            <form>

                <input
                    type="text"
                    placeholder="08:00"
                    required
                    onBlur={e => DateTimeMask(e, true)}
                    value={hora}
                    hint="Digite a hora de entrada."
                    maxLength={5}
                    onChange={e => setHora(e.target.value)} />

                <button
                    onClick={() => props.onSave(hora)}
                    type="button"
                    className="save">
                    <FiSave size={20} color="#a8a8b3" />
                </button>

            </form>

        </Modal>

    );

};

export default FileCreator;