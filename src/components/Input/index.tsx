import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from "react";
import { IconBaseProps } from "react-icons/lib";
import { useField } from "@unform/core";
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    placeholder: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const { fieldName, defaultValue, error, registerField } = useField(name)

    const handleInputBlue = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value)
    }, [])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
        <Container isErrorred={!!error} isFocused={isFocused} isFilled={isFilled}>
            {Icon && <Icon size={20} />}
            <input
                defaultValue={defaultValue}
                {...rest}
                onFocus={() => setIsFocused(true)}
                onBlur={handleInputBlue}
                ref={inputRef} />
            {error &&
                <Error title={error}>
                    <FiAlertCircle color="#C53030" size={20} />
                </Error>
            }
        </Container>
    )
}

export default Input