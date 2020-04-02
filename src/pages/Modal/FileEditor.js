import React, { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi'; // -- Importando o Feather Icons
import Modal from 'react-modal';
import {
    parseISO,
    format
} from 'date-fns';

import DateTimeMask from '../../Useful/UsefulValidate'

import './styles.css';

Modal.setAppElement('#root');

const FileCreator = (props) => {

    const [lunchIniHour, setLunchIniHour] = useState('');
    const [lunchEndHour, setLunchEndHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [observacao, setObservacao] = useState('');

    const getInitialState = () => {
        setLunchIniHour("");
        setLunchEndHour("");
        setEndHour("");
        setObservacao("");
    }

    useEffect(() => {

        getInitialState();

        const file = props.file && props.file[0] && props.file[0];
        if (file) {
            if (file.lunchIniHour)
                setLunchIniHour(format(parseISO(file.lunchIniHour), "HH:mm"));
            if (file.lunchEndHour)
                setLunchEndHour(format(parseISO(file.lunchEndHour), "HH:mm"));
            if (file.endHour)
                setEndHour(format(parseISO(file.endHour), "HH:mm"));
            if (file.desc)
                setObservacao(file.desc);
        }


    }, [props.isVisible]);

    return (

        <Modal
            className="modal-container"
            isOpen={props.isVisible ? true : false}
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
                    marginLeft: '10%',
                    marginRight: '10%',
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
                    value={props.file && props.file[0] && props.file[0].iniHour ?
                        format(parseISO(props.file[0].iniHour), "HH:mm") :
                        "08:00"}
                    readOnly={true}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

                <input
                    type="text"
                    placeholder="12:00"
                    onBlur={lunchIniHour ? e => DateTimeMask(e) : null}
                    value={lunchIniHour}
                    hint="Digite a hora de entrada."
                    maxLength={5}
                    onChange={e => setLunchIniHour(e.target.value)} />

                <input
                    type="text"
                    placeholder="13:00"
                    onBlur={lunchEndHour ? e => DateTimeMask(e) : null}
                    value={lunchEndHour}
                    hint="Digite a hora de entrada."
                    maxLength={5}
                    onChange={e => setLunchEndHour(e.target.value)} />

                <input
                    type="text"
                    placeholder="18:00"
                    onBlur={endHour ? e => DateTimeMask(e) : null}
                    value={endHour}
                    hint="Digite a hora de entrada."
                    maxLength={5}
                    onChange={e => setEndHour(e.target.value)} />

                <input
                    type="text"
                    className="input-obs"
                    placeholder="Observação"
                    value={observacao}
                    hint="Digite a hora de entrada."
                    maxLength={40}
                    onChange={e => setObservacao(e.target.value)} />

                <button
                    onClick={() => props.onSave({ lunchIniHour, lunchEndHour, endHour, observacao })}
                    type="button"
                    className="save">
                    <FiSave size={20} color="#a8a8b3" />
                </button>

            </form>

        </Modal>

    );

};

export default FileCreator;