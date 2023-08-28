import { useCallback, useEffect, useState, useRef, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCircleRemove } from "react-icons/ci";
import { useAnimate, stagger, motion } from "framer-motion";

import { useUser } from '../../../hooks/userContext';
import { SearchStyle } from './styles'

interface KeyboardEvent {
    key: string;
}

export function Searcher() {
    let navigate = useNavigate();
    const { getListUser, onFocusInput, setOnFocusInput, clearListUser, onLoadingListUser } = useUser();

    const ref = useRef<any>(null);

    const [username, setUsername] = useState<string>('');
    const [goOnFocus, setGoOnFocus] = useState<boolean>(false)
    const [disableButtonSearch, setDisableButtonSearch] = useState<boolean>(false)

    useEffect(() => {
        switch (onLoadingListUser) {
            case true:
                setDisableButtonSearch(true)
                break;
            case false:
                setDisableButtonSearch(false)
                break;
        }
    }, [onLoadingListUser])

    const handleSearchCB = useCallback(() => {
        if (username) {
            getListUser(username)
        }
    }, [username])

    const resetInput = () => {
        console.log('resetInput')
        setUsername('')
        clearListUser()
        setOnFocusInput(false)
    }

    const isOnFocus = useCallback(() => {
        setOnFocusInput(true)
    }, [username, onFocusInput])

    const isOnBlur = useCallback(() => {
        if (username === '' && onFocusInput === true) {
            console.log(`username === '' && onFocusInput === false`, username)
            setOnFocusInput(false)
        }
    }, [username, onFocusInput])

    const iseOnKeyDown = (e: KeyboardEvent) => {
        if (e.key == 'Escape') {
            ref.current.blur()
        }
        if (e.key == 'Enter') handleSearchCB();
    }

    return (
        <div style={SearchStyle.container}>
            <label style={SearchStyle.label}>Username</label>
            <div style={SearchStyle.inputContainer}>
                <div
                    style={onFocusInput ? SearchStyle.div_inputFocus : SearchStyle.div_input}>
                    <input
                        style={SearchStyle.input}
                        onKeyDown={(e) => iseOnKeyDown(e)}
                        onFocus={isOnFocus}
                        onBlur={isOnBlur}
                        ref={ref}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <CiCircleRemove
                        style={SearchStyle.x_icon}
                        onClick={resetInput} />
                </div>
            </div>
            {onFocusInput ?
                <button
                    disabled={disableButtonSearch}
                    style={disableButtonSearch ? SearchStyle.buttonDisable : SearchStyle.button}
                    type="button"
                    onClick={() => handleSearchCB()}>
                    Search
                </button> : []}

            <div>

            </div>
        </div>
    );
}




