import React, { useCallback, useRef } from 'react';

import { FiLogIn, FiMail, FiLock } from "react-icons/fi"
import { Form } from '@unform/web';
import logoImg from "../../assets/logo.svg"
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';
import { ValidationError } from "yup";



import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from "./styles";
import { FormHandles } from '@unform/core';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required()
                    .required('Senha obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });


        } catch (err: unknown) {
            const erros = getValidationErros(err as ValidationError);

            formRef.current?.setErrors(erros)
        }
    }, [])

    return (
        <>
            <Container>
                <Content>
                    <img src={logoImg} alt="LogoGoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>
                        <Input name='email' icon={FiMail} placeholder='E-mail' />
                        <Input name='password' icon={FiLock} type="password" placeholder='Senha' />

                        <Button type="submit">Entrar</Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>

                    <a href="forgot">
                        <FiLogIn />
                        Criar conta
                    </a>
                </Content>

                <Background />
            </Container>
        </>
    )
}

export default SignIn