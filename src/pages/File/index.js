/*
Script para criação de tela de apresentação das anotações de folha.
Possui também a abertura à 3 modais
1. Cadastro inicial da folha: apenas para a data de entrada;
2. Atualização da folha: para preenchimento das demais informações (individualmente ou não)
3. Apresentação do totalizador de saldo/atraso por usuário
*/
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
    parseISO,
    format
} from 'date-fns';
import { FiTrash2, FiPower, FiEdit2, FiAlertTriangle } from 'react-icons/fi'; // -- Importando o Feather Icons

import api from '../../services/api';
import FileCreator from '../Modal/FileCreator';
import FileEditor from '../Modal/FileEditor';
import ShowResult from '../Modal/ShowResult';

import { HourSequence } from '../../Useful/UsefulValidate';
import HourStringToDateFormat, { TimeValidate } from '../../Useful/UsefulDate';

import Logo from "../../assets/icon1.png";
import './styles.css';

const File = () => {

    const history = useHistory();

    const name = localStorage.getItem("name") || "Usuário";
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [files, setFiles] = useState([]);
    const [modalFileCreatorIsVisible, setModalFileCreatorIsVisible] = useState(false);
    const [modalShowResultIsVisible, setModalShowResultIsVisible] = useState(true);
    const [modalFileEditor, setModalFileEditor] = useState(null);

    /**
     * Método para busca de todos os files do usuário logado
     * 
     * @example 
     *   none
     * 
     * @param   token {String} obrigatorio
     * @returns { files } {[JSON]}
     */
    const findFiles = async function () {

        await api.get('fileByUser', {
            headers: {
                Authorization: "Bearer " + token + ""
            }
        }).then(res => {
            setFiles(res.data);
        });

    }

    // -- Rodar uma vez só para buscar todos os registros de folha do usuário logado
    // -- Caso mude o usuário, o useEffect rodará novamente
    useEffect(() => {
        findFiles();
    }, [userId]);

    /**
     * Método para deleção individual de um file
     * 
     * @example 
     *   none
     * 
     * @param   id {String} obrigatorio
     * @returns { confirmation } {String}
     */
    async function handleDelete(id) {
        try {

            //console.log(id);

            await api.delete(`file/${id}`, {
                headers: {
                    Authorization: "Bearer " + token + ""
                }
            })

            //alert(`Arquivo de id ${id} foi deletado com sucesso!`);

            // -- Settar o arr de files filtrando por todos aqueles que possuem o id diferente daquele deletado
            setFiles(files.filter(file => file._id !== id));

        } catch (err) {
            alert(`Erro ao deletar o arquivo. Detalhe: "${err}".`);
        }
    }

    /**
     * Método para realizar o logout da tela
     * 
     * @example 
     *   none
     * 
     * @param none 
     * @returns none
     */
    function handleLogout() {
        /*
        localStorage.setItem("userName", "");
        localStorage.setItem("userId", "");
        localStorage.setItem("token", "");
        */
        localStorage.clear();
        history.push("/");

    }

    /**
     * Método para a criação de um novo file
     * 
     * @example 
     *   none
     * 
     * @param   desc {String},
     * @param   iniHour {Date} obrigatório,
     * @param   date {Date} obrigatório 
     * @returns { file } {JSON}
     */
    const criateNewFile = async function (date) {

        if (!date) {
            return false;
            setModalFileCreatorIsVisible(false);
        }

        var postData = {
            desc: "Inicio da folha",
            iniHour: HourStringToDateFormat(date),
            date: new Date()
        };

        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + token + ""
            }
        };

        await api.post('file', postData, axiosConfig)
            .then((res) => {
                //console.log("Sucesso! ", res);
                setModalFileCreatorIsVisible(false, findFiles());
            }).catch((err) => {
                console.log("Erro! ", err);
                setModalFileCreatorIsVisible(false);
            });

    }

    /**
     * Método para a edição de um file
     * 
     * @example 
     *   none
     * 
     * @param   desc {String},
     * @param   lunchIniHour {Date}, 
     * @param   lunchEndHour {Date}, 
     * @param   endHour {Date}, 
     * @returns { file } {JSON}
     */
    const editFile = async function (obj) {

        if (!HourSequence(obj)) {
            return;
        }

        const { lunchIniHour, lunchEndHour, endHour, observacao } = obj;

        const f_iniHour = parseISO(files.filter(file => file._id === modalFileEditor)[0].iniHour, 'dd/MM/YYYY HH:mm');
        const f_lunchIniHour = (lunchIniHour ? HourStringToDateFormat(lunchIniHour) : null);
        const f_lunchEndHour = (lunchEndHour ? HourStringToDateFormat(lunchEndHour) : null);
        const f_endHour = (endHour ? HourStringToDateFormat(endHour) : null);

        if (!TimeValidate({
            f_iniHour,
            f_lunchIniHour,
            f_lunchEndHour,
            f_endHour
        })) {
            return;
        };

        var postData = {
            desc: observacao || "Inicio da folha",
            endHour: f_endHour || null,
            lunchIniHour: f_lunchIniHour || null,
            lunchEndHour: f_lunchEndHour || null
        };

        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + token + ""
            }
        };

        await api.put(`file/${modalFileEditor}`, postData, axiosConfig)
            .then((res) => {
                //console.log("Sucesso! ", res);
                setModalFileEditor(null, findFiles());
            }).catch((err) => {
                console.log("Erro! ", err);
                setModalFileEditor(null);
            });

    }

    return (

        <>

            <ShowResult
                files={files}
                isVisible={modalShowResultIsVisible}
                onCancel={() => setModalShowResultIsVisible(false)} />

            <FileCreator
                isVisible={modalFileCreatorIsVisible}
                onSave={criateNewFile} />

            <FileEditor
                isVisible={modalFileEditor}
                onSave={editFile}
                file={files.filter(file => file._id === modalFileEditor)} />

            <div className="profile-container">

                <header>
                    <img src={Logo} alt="Pet XPTO" />
                    <span>Bem vindo(a), {name}.</span>

                    <button className="b_Novo"
                        value=""
                        onClick={() => setModalFileCreatorIsVisible(true)}>
                        Novo
                    </button>

                    <button type="button" onClick={handleLogout}>
                        <FiPower size={18} color="#E02041" />
                    </button>
                </header>

                {
                    (files && files.length > 0) ?
                        <h1>Dias Cadastrados</h1> :
                        <h1
                            style={{ color: "#f05a5b", textShadow: "0.4px 0.4px 0px black" }}>
                            Não existem folhas cadastradas para este usuário.
                        </h1>
                }

                <ul>

                    {files.map(file => (

                        <li key={file._id}>

                            <strong>Dia: </strong>
                            <p>{format(parseISO(file.date), "dd/MM/yyyy")}</p>

                            <strong>Hora Entrada: </strong>
                            <p>{format(parseISO(file.iniHour), "HH:mm:ss")}</p>

                            <strong>Intervalo Inicio: </strong>
                            <p>{file.lunchIniHour ? format(parseISO(file.lunchIniHour), "HH:mm:ss") : "--:--"}</p>

                            <strong>Intervalo Fim: </strong>
                            <p>{file.lunchEndHour ? format(parseISO(file.lunchEndHour), "HH:mm:ss") : "--:--"}</p>

                            <strong>Hora Saída: </strong>
                            <p>{file.endHour ? format(parseISO(file.endHour), "HH:mm:ss") : "--:--"}</p>

                            <strong>Observação: </strong>
                            <p>{file.desc}</p>

                            <button onClick={() => setModalFileEditor(file._id)} type="button" className="edit">
                                <FiEdit2 size={20} color="#a8a8b3" />
                            </button>

                            <button onClick={() => handleDelete(file._id)} type="button" className="trash">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>

                    ))}

                </ul>

                <Link
                    className="black-link" to="/files"
                    onClick={() => setModalShowResultIsVisible(true)}>
                    <FiAlertTriangle size={16} color="#E02041" style={{ marginRight: "5px" }} />
                        Mostrar Saldo/Atraso
                </Link>

            </div>

        </>

    );

}

export default File;