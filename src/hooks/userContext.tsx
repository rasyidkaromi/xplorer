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
    singleRepo: ISingleRepo[];
    getDetailRepo: any;
    getListUser: (username: string) => Promise<IGithubUser[]>,
    onFocusInput: boolean,
    setOnFocusInput: Dispatch<SetStateAction<boolean>>,
}

const UserContext = createContext<UserContext>({} as UserContext);

export function UserProvider({ children }: UserProviderProps): JSX.Element {

    let navigate = useNavigate();

    const [listUser, setListUser] = useState<IGithubUser[]>([])

    const [singleRepo, setSingleRepo] = useState<ISingleRepo[]>([])

    const [onFocusInput, setOnFocusInput] = useState<boolean>(false)

    async function getListUser(username: string): Promise<IGithubUser[]> {
        try {
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

    // async function getDetailRepo(username: string) {
    //     let bufferlistUser = [] as IGithubUser[]

    //     try {
    //         if (username) {
    //             let repoData = await detailRepo(username).get('')
    //             if (repoData.status == 200 && repoData.data.length > 0) {
    //                 console.log('repoData', repoData)
    //                 setSingleRepo(repoData.data)
    //                 listUser.map()
    //             } 
    //         } 

    //     } catch (err) {
    //         console.log('err', err)
    //     }
    // }

    useEffect(() => {
        console.log('listUser', listUser)
    },[listUser])

    const getDetailRepo = useCallback(async (username: string) => {
        // let bufferlistUser = listUser
        // console.log('bufferlistUser', bufferlistUser)
        try {
            if (username) {
                let repoData = await detailRepo(username).get('')
                if (repoData.status == 200 && repoData.data.length > 0) {
                    console.log('repoData', repoData)
                    setSingleRepo(repoData.data)
                    let bufferlistUser = listUser.map((lUser) => {
                        if(lUser.login == username){
                            lUser.dataRepo = repoData.data
                            lUser.showAccordion = true
                        }else{
                            lUser.dataRepo = []
                            lUser.showAccordion = false
                        }
                        return lUser
                    })
                    setListUser(bufferlistUser)
                }
            }

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
                singleRepo,
                clearListUser,
                onFocusInput,
                setOnFocusInput,
                getDetailRepo,
            }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContext {
    const context = useContext(UserContext);
    return context;
}