import { useCallback, useEffect, useState, useRef, CSSProperties, useMemo, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiGitRepositoryFill, RiFileCodeLine, RiSendPlane2Fill } from "react-icons/ri";
import { useAnimate, stagger, motion } from "framer-motion";

import { useUser } from '../../../hooks/userContext';
import { UserListStyle } from './styles'


export function UserList() {
    let navigate = useNavigate();
    const { listUser, getDetailRepo, singleRepo, getListUser, onFocusInput, setOnFocusInput } = useUser();

    useEffect(() => {
        console.log('UserList listUser', listUser)
    }, [listUser])

    useEffect(() => {
        console.log('singleRepo ', singleRepo)
    }, [singleRepo])

    const singleUserRepo = (userName: string) => {
        getDetailRepo(userName)
    }


    // const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     console.log(event.target);
    //     console.log(event.currentTarget);
    //   };

    const getViewUserList = useMemo(() => {
        if (listUser.length > 0) {
            return listUser.map((user, i) => {
                return (
                    <div
                        key={user.node_id}
                        onClick={() => singleUserRepo(user.login)}

                        style={{
                            backgroundColor: "#f1f3f5db",
                            boxShadow: '1px 2px 9px #F4AAB9',
                            display: 'flex',
                            flexDirection: 'row',
                            padding: 10,
                            borderRadius: 3,
                            border: '1px solid #cbd1da',
                            marginBottom: 20,
                            alignItems: 'center',
                            height: 80,
                        }}>
                        <img
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 40,
                                borderWidth: 1,
                                borderColor: 'white',
                                boxShadow: '1px 2px 9px #F4AAB9',
                            }}
                            src={user.avatar_url}>
                        </img>

                        <div style={{
                            width: '5%'
                        }}></div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            // backgroundColor: 'red',
                            width: '75%',
                            marginLeft: '2%',
                            padding: 5,
                        }}>
                            <p style={{
                                color: '#0e0d0d',
                                fontSize: 15,
                                fontWeight: 500,
                                paddingLeft: 5,
                                margin: 1,
                            }}> {user.name}</p>
                            <p style={{
                                // backgroundColor: 'green',
                                color: '#272626',
                                fontWeight: 500,
                                fontSize: 13,
                                paddingLeft: 5,
                                paddingBottom: 10,
                                margin: 1,
                            }}> {user.login} </p>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    // paddingBottom: 3,
                                }}>
                                <RiGitRepositoryFill
                                    style={{
                                        width: '10%',
                                        color: '#272626',
                                        fontSize: 16,
                                    }} />
                                <p style={{
                                    // backgroundColor: 'green',
                                    color: '#272626',
                                    fontSize: 12,
                                    // paddingLeft: 5,
                                    margin: 1,
                                }}>
                                    {user.public_repos}
                                </p>
                                <RiFileCodeLine
                                    style={{
                                        width: '10%',
                                        color: '#272626',
                                        fontSize: 16,
                                    }} />
                                <p style={{
                                    // backgroundColor: 'green',
                                    color: '#272626',
                                    fontSize: 12,
                                    // paddingLeft: 5,
                                    margin: 1,
                                }}>
                                    {user.public_gists}
                                </p>
                            </div>
                            <p style={{
                                // backgroundColor: 'green',
                                color: '#272626',
                                fontSize: 10,
                                paddingLeft: 5,
                                paddingTop: 5,
                                paddingBottom: 2,
                                margin: 1,
                            }}> {user.followers} followers - {user.following} following</p>
                        </div>
                    </div>
                )
            })

        } else {
            return ([])
        }
    }, [listUser])

    return (
        <>
            {getViewUserList}
        </>
    );
}

