import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { apiSearch, detailUser, detailRepo, detailRepoMultiple } from '../services/api';
import { LimitUser } from '../constant'
import { IGithubUser } from '../interface'

interface UserProviderProps {
    children: ReactNode
}

interface IUserContext {
    listUser: IGithubUser[],
    setListUser: Dispatch<SetStateAction<IGithubUser[]>>,
    clearListUser: () => void;
    getDetailRepo: (username: string) => Promise<void>;
    getDetailRepoMultiple: (username: string, totalRepo: number) => Promise<void>;
    getListUser: (username: string) => void,
    onFocusInput: boolean,
    setOnFocusInput: Dispatch<SetStateAction<boolean>>,
    onLoadingListUser: boolean,
    setOnLoadingListUser: Dispatch<SetStateAction<boolean>>,
    onLoadingDetailRepo: boolean,
    setOnLoadingDetailRepo: Dispatch<SetStateAction<boolean>>,
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: UserProviderProps): JSX.Element {

    const [listUser, setListUser] = useState<IGithubUser[]>([])
    const [onFocusInput, setOnFocusInput] = useState<boolean>(false)
    const [onLoadingListUser, setOnLoadingListUser] = useState<boolean>(false)
    const [onLoadingDetailRepo, setOnLoadingDetailRepo] = useState<boolean>(false)


    useEffect(() => {
        console.log('listUser', listUser)
    }, [listUser])

    const getListUser = useCallback((username: string) => {
        setListUser([])
        setOnLoadingListUser(true)
        setTimeout(async () => {
            if (username) {
                try {

                    let resData = await apiSearch(LimitUser, username).get('')
                    console.log('resData', resData)

                    if (resData.data.total_count > 0) {
                        let similarUsername = resData.data.items.filter((o: any) => o.login.includes(username)).filter((item: any, idx: any) => idx < 5);
                        console.log('similarUsername', similarUsername)
                        let listUData = await Promise.all(similarUsername.map(async (userdata: IGithubUser) => {
                            console.log('userdata Promise', userdata)
                            try {
                                let detailUserData = await detailUser(userdata.login).get('')
                                console.log('detailUserData', detailUserData)
                                userdata = detailUserData.data
                                userdata.showAccordion = false
                                userdata.dataRepo = []
                                return userdata
                            } catch (err) {
                                console.log(err)
                                return userdata
                            }
                        }))
                        setListUser(listUData)
                        setOnLoadingListUser(false)
                    } else {
                        setOnLoadingListUser(false)
                    }
                } catch (err) {
                    console.log('err', err)
                    setOnLoadingListUser(false)
                    // Buat info error 403 limit req
                }
            } else {
                setOnLoadingListUser(false)
            }
        }, 1000)

    }, [])

    const getDetailRepo = useCallback(async (username: string) => {
        setOnLoadingDetailRepo(true)

        setTimeout(async () => {
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
                    } else {
                        setOnLoadingDetailRepo(false)
                    }
                    if (repoData.data.length === 0) {
                        let bufferlistUser = listUser.map((lUser) => {
                            lUser.dataRepo = []
                            lUser.showAccordion = false
                            return lUser
                        })
                        setListUser(bufferlistUser)
                        setOnLoadingDetailRepo(false)
                    } else {
                        setOnLoadingDetailRepo(false)
                    }
                } catch (err) {
                    console.log('err', err)
                    // Buat info error 403 limit req

                }
            }
        }, 1000)

    }, [listUser])



    const getDetailRepoMultiple = useCallback(async (username: string, totalRepo: number) => {
        let pages = Math.ceil(totalRepo / 100)
        setOnLoadingDetailRepo(true)
        setTimeout(async () => {
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
                    }
                    else {
                        setOnLoadingDetailRepo(false)
                    }
                }
            } catch (err) {
                console.log('err', err)
            }
        }, 1000)
    }, [listUser])


    function clearListUser() {
        setListUser([])
    }


    return (
        <UserContext.Provider
            value={{
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