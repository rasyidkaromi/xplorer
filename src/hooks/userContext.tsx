import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { api, apiSearch, detailUser, detailRepo } from '../services/api';
import { LimitUser } from '../constant'
import { IGithubUser, ISingleRepo } from '../interface'
import { async } from 'q';

interface UserProviderProps {
    children: ReactNode
}

interface UserContext {
    listUser: IGithubUser[],
    clearListUser: () => void;
    // singleRepo: ISingleRepo[];
    getDetailRepo: any;
    // getListUser: (username: string) => Promise<IGithubUser[]>,
    getListUser: (username: string) => void,
    onFocusInput: boolean,
    setOnFocusInput: Dispatch<SetStateAction<boolean>>,
    onLoadingListUser: boolean,
    setOnLoadingListUser: Dispatch<SetStateAction<boolean>>,
    onLoadingDetailRepo: boolean,
    setOnLoadingDetailRepo: Dispatch<SetStateAction<boolean>>,
}

const UserContext = createContext<UserContext>({} as UserContext);

export function UserProvider({ children }: UserProviderProps): JSX.Element {

    let navigate = useNavigate();

    const [listUser, setListUser] = useState<IGithubUser[]>([])
    // const [singleRepo, setSingleRepo] = useState<ISingleRepo[]>([])
    const [onFocusInput, setOnFocusInput] = useState<boolean>(false)
    const [onLoadingListUser, setOnLoadingListUser] = useState<boolean>(false)
    const [onLoadingDetailRepo, setOnLoadingDetailRepo] = useState<boolean>(false)

    useEffect(() => {
        console.log('onLoadingListUser', onLoadingListUser)
    }, [onLoadingListUser])

    useEffect(() => {
        console.log('onLoadingDetailRepo', onLoadingDetailRepo)
    }, [onLoadingDetailRepo])

    useEffect(() => {
        console.log('listUser', listUser)
    }, [listUser])


    async function getListUser(username: string) {
        setOnLoadingListUser(true)
        try {
            setTimeout(async () => {
                if (username) {
                    let resData = await apiSearch(LimitUser, username).get('')
                    if (resData.data.total_count > 0) {
                        let listUData = await Promise.all(resData.data.items.map(async (userdata: IGithubUser) => {
                            let detailUserData = await detailUser(userdata.login).get('')
                            userdata = detailUserData.data
                            userdata.showAccordion = false
                            userdata.dataRepo = []
                            return userdata
                        }))
                        setListUser(listUData)
                        setOnLoadingListUser(false)
                    }
                } 
            }, 1000)
        } catch (err) {
            console.log('err', err)
        }
    }

    const getDetailRepo = useCallback(async (username: string) => {
        // let bufferlistUser = listUser
        // console.log('bufferlistUser', bufferlistUser)
        setOnLoadingDetailRepo(true)
        try {
            setTimeout(async () => {
                if (username) {
                    let repoData = await detailRepo(username).get('')
                    if (repoData.status == 200 && repoData.data.length > 0) {
                        // console.log('repoData', repoData)
                        let bufferlistUser = listUser.map((lUser) => {
                            if (lUser.login == username) {
                                lUser.dataRepo = repoData.data
                                lUser.showAccordion = true
                            } else {
                                lUser.dataRepo = []
                                lUser.showAccordion = false
                            }
                            return lUser
                        })
                        setListUser(bufferlistUser)
                        setOnLoadingDetailRepo(false)
                    }
                }
            },1000)
        } catch (err) {
            console.log('err', err)
        }

    }, [listUser])

    function clearListUser() {
        setListUser([])
    }


    return (
        <UserContext.Provider
            value={{
                getListUser,
                listUser,
                // singleRepo,
                clearListUser,
                onFocusInput,
                setOnFocusInput,
                getDetailRepo,
                onLoadingListUser,
                setOnLoadingListUser,
                onLoadingDetailRepo,
                setOnLoadingDetailRepo,
            }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContext {
    const context = useContext(UserContext);
    return context;
}