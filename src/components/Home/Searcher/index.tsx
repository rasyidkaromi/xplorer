import { useCallback, useEffect, useState, useRef } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { useUser } from '../../../hooks/userContext';
import { SearchStyle } from './styles'

interface KeyboardEvent {
    key: string;
}

export function Searcher() {
    const { getListUser, onFocusInput, setOnFocusInput, clearListUser, onLoadingListUser, setOnLoadingListUser, onErrorRequest, setOnErrorRequest } = useUser();

    const ref = useRef<any>(null);

    const [username, setUsername] = useState<string>('');
    const [disableButtonSearch, setDisableButtonSearch] = useState<boolean>(false)

    useEffect(() => {
        if (onErrorRequest.isError) {
            const timmer = setTimeout(() => {
                setOnErrorRequest({
                    isError: false,
                    messsage: ''
                })
                clearTimeout(timmer)
            }, 5000)
        }
    }, [onErrorRequest])

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
    }, [username, getListUser])

    const resetInput = () => {
        console.log('resetInput')
        setUsername('')
        clearListUser()
        setOnFocusInput(false)
        setOnLoadingListUser(false)
    }

    const isOnFocus = useCallback(() => {
        setOnFocusInput(true)
    }, [setOnFocusInput])

    const isOnBlur = useCallback(() => {
        if (username === '' && onFocusInput === true) {
            setOnFocusInput(false)
        }
    }, [username, onFocusInput, setOnFocusInput])

    const iseOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            ref.current.blur()
        }
        if (e.key === 'Enter') handleSearchCB();
    }

    return (
        <div>
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
            </div>
            {onErrorRequest.isError ?
                <div style={SearchStyle.errorContainer}>
                    <div style={SearchStyle.errorMessage}> {onErrorRequest.messsage} </div>
                </div> : []}
        </div>
    );
}




