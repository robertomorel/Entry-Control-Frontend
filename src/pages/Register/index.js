/*
Script para registro de novo usuário
*/
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // -- Importando o Feather Icons

import api from '../../services/api';

import Logo from "../../assets/icon1.png";
import './styles.css';

const Register = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [level, setLevel] = useState('');

    const [enableButton, setEnableButton] = useState(true);

    const history = useHistory();

    /**
     * Método para registro de um novo usuário
     * 
     * @example 
     *   none
     * 
     * @param   userName {String} obrigatorio,
     * @param   password {String} obrigatorio,
     * @param   name {String},
     * @param   email {String} obrigatorio,
     * @param   position {String},
     * @param   level {String},
     * @returns { User } {[JSON]}
     */
    async function handleSubmit(event) {

        event.preventDefault();

        const data = {
            userName, password, name, email, position, level
        }

        console.log(data);

        if (password !== confirmPassword) {
            setConfirmPassword('');
            alert('A senha confirmada não corresponde à cadastrada!');
            return;
        }

        try {

            setEnableButton(false);

            const res = await api.post('users', {
                username: userName,
                password,
                name,
                email,
                position,
                level
            });

            //const userId = res.data.user._id;
            //const token = res.data.token;

            //alert(`O usuário foi criado com sucesso. ID: ${userId}; Token: ${token}.`);
            //alert(`O usuário foi criado com sucesso. ID: ${userId}.`);

            localStorage.setItem('userName', userName);

            setEnableButton(true);

            history.push('/');

        } catch (err) {
            setEnableButton(true);
            alert(`Erro no cadastro. Detalhe: "${err}".`);
        }

    }

    return (

        <div className="register-container">
            <div className="content">

                <section>

                    <img
                        className="logo"
                        src={Logo}
                        alt="Pet XPTO" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro de usuário no Pet XPTO</p>

                    <Link
                        className="black-link"
                        to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                            Já sou cadastrado!
                    </Link>

                </section>

                <form onSubmit={handleSubmit}>

                    <input
                        placeholder="Digite seu nome completo"
                        value={name}
                        onChange={e => setName(e.target.value)} />

                    <input
                        placeholder="Digite seu nome de usuário"
                        value={userName}
                        onChange={e => setUserName(e.target.value)} />

                    <div className="inputPassword">
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />

                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} />
                    </div>

                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <div className="inputPos">
                        <input
                            placeholder="Apresente sua posição na empresa"
                            value={position}
                            onChange={e => setPosition(e.target.value)} />

                        <input
                            placeholder="Nível"
                            style={{ width: 80 }}
                            value={level}
                            onChange={e => setLevel(e.target.value)} />
                    </div>

                    <button className="button" type="submit" disabled={!enableButton}>Cadastrar</button>

                </form>

            </div>
        </div>

    );

};

export default Register;