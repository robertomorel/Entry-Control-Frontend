import React, { useState, useEffect } from 'react';
import { FiMinimize2 } from 'react-icons/fi'; // -- Importando o Feather Icons
import Modal from 'react-modal';

import { ShowBalance } from '../../Useful/UsefulDate';

import './styles.css';

Modal.setAppElement('#root');

const FileCreator = (props) => {

    const [result, setResult] = useState(0);

    useEffect(() => {
        setResult(ShowBalance(props.files));
    }, [props.files]);

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
                    marginLeft: '25%',
                    marginRight: '25%',
                    border: '1px solid #ccc',
                    background: 'rgba(62, 150, 148, 0.65)',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px'
                }
            }}>

            <div className='div-modal-body'>

                {
                    result >= 0 ?
                        <h1>Saldo: {result.toFixed(2)} minutos</h1> :
                        <h1 style={{ color: "red" }}>A compensar: {(result * -1).toFixed(2)} minutos</h1>
                }

                <button onClick={props.onCancel} type="button" className="icon-btt">
                    <FiMinimize2 size={20} color="#a8a8b3" />
                </button>

            </div>

        </Modal>

    );

};

export default FileCreator;