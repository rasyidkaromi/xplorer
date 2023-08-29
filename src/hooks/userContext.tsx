import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { apiSearch, detailUser, detailRepo, detailRepoMultiple } from '../services/api';
import { LimitUser } from '../constant'

import { UserProviderProps, IUserContext, IGithubUser, errorMessage, ISingleRepo } from './IUserContext'



const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: UserProviderProps): JSX.Element {

    const [listUser, setListUser] = useState<IGithubUser[]>([])
    const [onFocusInput, setOnFocusInput] = useState<boolean>(false)
    const [onLoadingListUser, setOnLoadingListUser] = useState<boolean>(false)
    const [onLoadingDetailRepo, setOnLoadingDetailRepo] = useState<boolean>(false)
    const [onErrorRequest, setOnErrorRequest] = useState<errorMessage>({ isError: false, messsage: '' })

    // useEffect(() => {
    //     console.log('listUser', listUser)
    // }, [listUser])

    const getListUser = useCallback((username: string) => {
        setListUser([])
        setOnLoadingListUser(true)
        const timer = setTimeout(async () => {
            if (username) {
                try {
                    let resData = await apiSearch(LimitUser, username).get('')
                    if (resData.data.total_count > 0) {
                        let similarUsername = resData.data.items.filter((o: any) => o.login.toLowerCase().includes((username).toLowerCase())).filter((item: any, idx: any) => idx < 5);
                        let listUData = await Promise.all(similarUsername.map(async (userdata: IGithubUser) => {
                            try {
                                let detailUserData = await detailUser(userdata.login).get('')
                                userdata = detailUserData.data
                                userdata.showAccordion = false
                                userdata.dataRepo = []
                                return userdata
                            } catch (err) {
                                // console.log(err)
                                return userdata
                            }
                        }))
                        setListUser(listUData)
                        setOnLoadingListUser(false)
                        clearTimeout(timer);
                    } else {
                        setOnLoadingListUser(false)
                        clearTimeout(timer);
                    }
                } catch (err) {
                    // console.log('err', err)
                    setOnLoadingListUser(false)
                    setOnErrorRequest({
                        isError: true,
                        messsage: 'Limit Request'
                    })
                    clearTimeout(timer);
                }
            } else {
                setOnLoadingListUser(false)
                clearTimeout(timer);
            }
        }, 1000)

    }, [])

    const getDetailRepo = useCallback(async (username: string) => {
        setOnLoadingDetailRepo(true)

        const timer = setTimeout(async () => {
            if (username) {
                try {
                    let repoData = await detailRepo(username).get('')
                    if (repoData.status === 200 && repoData.data.length > 0) {
                        let bufferlistUser = listUser.map((lUser) => {
                            if (lUser.login === username) {
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
                        clearTimeout(timer);
                    } else {
                        setOnLoadingDetailRepo(false)
                        clearTimeout(timer);
                    }
                    if (repoData.data.length === 0) {
                        let bufferlistUser = listUser.map((lUser) => {
                            lUser.dataRepo = []
                            lUser.showAccordion = false
                            return lUser
                        })
                        setListUser(bufferlistUser)
                        setOnLoadingDetailRepo(false)
                        clearTimeout(timer);
                    } else {
                        setOnLoadingDetailRepo(false)
                        clearTimeout(timer);
                    }
                } catch (err) {
                    // console.log('err', err)
                    setOnLoadingDetailRepo(false)
                    setOnErrorRequest({
                        isError: true,
                        messsage: 'Limit Request'
                    })
                    clearTimeout(timer);
                }
            }
        }, 1000)

    }, [listUser])



    const getDetailRepoMultiple = useCallback(async (username: string, totalRepo: number) => {
        let pages = Math.ceil(totalRepo / 100)
        setOnLoadingDetailRepo(true)
        const timer = setTimeout(async () => {
            try {
                if (username) {
                    let repoData = await detailRepoMultiple(username, pages)
                    if (repoData.length === pages) {
                        let allLongRepoData = repoData.map(({ data }) => [].concat(data)).flat()
                        let bufferlistUser = listUser.map((lUser) => {
                            if (lUser.login === username) {
                                lUser.dataRepo = allLongRepoData
                                lUser.showAccordion = true
                            } else {
                                lUser.dataRepo = []
                                lUser.showAccordion = false
                            }
                            return lUser
                        })
                        setListUser(bufferlistUser)
                        setOnLoadingDetailRepo(false)
                        clearTimeout(timer);
                    }
                    else {
                        setOnLoadingDetailRepo(false)
                        clearTimeout(timer);
                    }
                }
            } catch (err) {
                // console.log('err', err)
                setOnLoadingDetailRepo(false)
                setOnErrorRequest({
                    isError: true,
                    messsage: 'Limit Request'
                })
                clearTimeout(timer);
            }
        }, 1000)
    }, [listUser])


    function clearListUser() {
        setListUser([])
    }


    return (
        <UserContext.Provider
            value={{
                onErrorRequest,
                setOnErrorRequest,
                getListUser,
                listUser,
                setListUser,
                clearListUser,
                onFocusInput,
                setOnFocusInput,
                getDetailRepo,
                getDetailRepoMultiple,
                onLoadingListUser,
                setOnLoadingListUser,
                onLoadingDetailRepo,
                setOnLoadingDetailRepo,
            }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): IUserContext {
    const context = useContext(UserContext);
    return context;
}