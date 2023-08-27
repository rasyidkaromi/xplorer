import { useCallback, useEffect, useState, useRef, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCircleRemove } from "react-icons/ci";
import { useAnimate, stagger, motion } from "framer-motion";

import { useUser } from '../../../hooks/useUser';
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

    // const handleFocusOut = useCallback(() => {
    //     if (username === '' && onFocusInput === true) {
    //         console.log(`username === '' && onFocusInput === false`, username)
    //         setOnFocusInput(false)
    //     }
    // }, [username, onFocusInput])

    // useEffect(() => {
    //     console.log('username', username)
    // }, [username])




    // useEffect(() => {
    //     // const usernameInput : HTMLElement | null  = document.getElementById("usernameInput");

    //     // const handleFO = () => {
    //     //     console.log('handleFO username', username)
    //     //     if (username === '' && onFocusInput === true) {
    //     //         console.log('out-focus handleFO username', username)
    //     //         setOnFocusInput(false)
    //     //     }
    //     // }
    //     // usernameInput?.addEventListener('focusout', handleFocusOut);

    //     if (ref && ref.current) {

    //         ref.current.addEventListener('focusout', () => {
    //             console.log('focusout')
    //             // inputEffect(0);
    //             // handleFocusOut()
    //             // handleFO()
    //             // if (goOnFocus == true) {
    //             setOnFocusInput(false)
    //             // }
    //         });
    //         ref.current.addEventListener('focusin', () => {
    //             console.log('listener in-focus ref')
    //             if (onFocusInput === false) {
    //                 setOnFocusInput(true)
    //             }
    //         });
    //         ref.current.addEventListener('keydown', (e: KeyboardEvent) => {
    //             // console.log(e.key)
    //             if (e.key == 'Escape') {
    //                 // setOnFocusInput(false) 
    //                 ref.current.blur()
    //             }
    //             if (e.key == 'Enter') handleSearchCB();
    //         });
    //     }

    //     return () => {
    //         if (ref && ref.current) {
    //             ref.current.removeEventListener('focusout', () => {
    //                 console.log('remove focus out')
    //             }, true);
    //             ref.current.removeEventListener('focusin', () => {
    //                 console.log('remove focus in')
    //             }, true);
    //             ref.current.removeEventListener('keydown', () => {
    //                 console.log('remove focus in')
    //             }, true);
    //         }
    //     }
    // }, [onFocusInput])

    // function inputEffect(option: number) {
    //     const userInput = document.getElementById('usernameInput');
    //     const alertIcon = document.getElementById('alert-icon');

    //     if (option === 1) {
    //         userInput?.classList.add('empty');
    //         alertIcon?.classList.add('active');
    //         userInput?.focus();
    //     } else {
    //         userInput?.classList.remove('empty');
    //         alertIcon?.classList.remove('active');
    //     }
    // }



    const handleFocusIn = useCallback(() => {

    }, [onFocusInput])

    const handleSearch = async (uName: string) => {
        await getListUser(uName)
            .then(response => {
                console.log('handleSearch', response)
            });
    }
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




