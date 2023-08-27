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
    const ref = useRef<any>(null);

    const [username, setUsername] = useState<string>('');
    const [goOnFocus, setGoOnFocus] = useState<boolean>(false)
    const { getListUser, onFocusInput, setOnFocusInput, clearListUser } = useUser();

    const handleSearchCB = useCallback(async () => {
        if (username) {
            await getListUser(username)
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
                    style={onFocusInput ? SearchStyle.inputFocus : SearchStyle.input}>
                    <input
                        style={{
                            width: '90%',
                            color: 'white',
                            background: '#0d1117',
                            border: '0px solid #30363D',
                            outline: 'none',
                            verticalAlign: 'middle',


                        }}
                        onKeyDown={(e) => iseOnKeyDown(e)}
                        onFocus={isOnFocus}
                        onBlur={isOnBlur}
                        // id="usernameInput"
                        ref={ref}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <CiCircleRemove
                        style={{
                            position: 'absolute',
                            width: '8%',
                            color: 'white',
                            fontSize: 24,
                        }}
                        onClick={resetInput} />
                </div>
            </div>
            <button
                style={SearchStyle.button}
                type="button"
                onClick={() => handleSearchCB()}>
                Search
            </button>
            <div>

            </div>
        </div>
    );
}




