/*
Script para login de usuário
*/
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'; // -- Importando o Feather Icons

import api from '../../services/api';

import Logo from "../../assets/icon1.png";
import './styles.css';

const Logon = () => {

    const userNameStorage = localStorage.getItem("userName") || "";

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [enableButton, setEnableButton] = useState(true);

    const history = useHistory();

    useEffect(() => {
        setUserName(userNameStorage);
    }, [userNameStorage]);

    /**
     * Método para realizar o login do usuário
     * 
     * @example 
     *   none
     * 
     * @param   username {String} obrigatorio
     * @param   password {String} obrigatorio
     * @returns { user } {JSON}
     */
    async function handleSubmit(event) {
        // -- Para que a página não aja por default, recarregando quando clica no botão
        event.preventDefault();

        //console.log({ userName, password });

        try {

            setEnableButton(false);

            const res = await api.get('users', {
                params: {
                    username: userName,
                    password
                }
            });

            const userId = res.data.user._id;
            const token = res.data.token;

            //alert(`Usuário encontrado. ID: ${userId}; Token: ${token}.`);
            //alert(`O usuário foi criado com sucesso. ID: ${userId}.`);

            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);

            setEnableButton(true);

            history.push('/files');

        } catch (err) {
            setEnableButton(true);
            alert(`Falha no login. Detalhe: "${err}".`);
        }

    }

    return (

        <div
            className="logon-container">

            <img
                className="logo"
                src={Logo}
                alt="Airbnb logo" />

            <section className="form">

                <form onSubmit={handleSubmit}>

                    <h1>Faça o logon na sua conta</h1>

                    <input
                        placeholder="Nome de Usuário"
                        value={userName}
                        onChange={e => setUserName(e.target.value)} />

                    <input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <button className="button" type="submit" disabled={!enableButton}>Entrar</button>

                    <Link to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Novo Usuário?
                    </Link>

                </form>

            </section>

        </div>

    );

};

export default Logon;