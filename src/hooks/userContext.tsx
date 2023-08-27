import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { api, apiSearch, detailUser } from '../services/api';
import { LimitUser } from '../constant'
import { IGithubUser } from '../interface'

interface UserProviderProps {
    children: ReactNode
}

export interface FollowData {
    id: number,
    login: string,
    avatar_url: string
}

interface UserContext {
    listUser: IGithubUser[],
    clearListUser: () => void;
    getListUser: (username: string) => Promise<IGithubUser[]>,
    onFocusInput: boolean,
    setOnFocusInput: Dispatch<SetStateAction<boolean>>,
}

const UserContext = createContext<UserContext>({} as UserContext);

export function UserProvider({ children }: UserProviderProps): JSX.Element {

    let navigate = useNavigate();

    const [listUser, setListUser] = useState<IGithubUser[]>([])
    const [onFocusInput, setOnFocusInput] = useState<boolean>(false)
    async function getListUser(username: string): Promise<IGithubUser[]> {
        try {
            if (username) {
                let resData = await apiSearch(LimitUser, username).get('')
                if (resData.data.total_count > 0) {
                    let listUData = await Promise.all(resData.data.items.map(async (userdata: IGithubUser) => {
                        let detailUserData = await detailUser(userdata.login).get('')
                        userdata = detailUserData.data
                        return userdata
                    }))
                    setListUser(listUData)
                    return listUData
                } else {
                    return []
                }
            } else {
                return []
            }

        } catch (err) {
            console.log('err', err)
            return []
        }
    }

    function clearListUser() {
        setListUser([])
    }


    return (
        <UserContext.Provider
            value={{
                getListUser,
                listUser,
                clearListUser,
                onFocusInput,
                setOnFocusInput,
            }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContext {
    const context = useContext(UserContext);
    return context;
}