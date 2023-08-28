import { useCallback, useEffect, useState, useRef, CSSProperties, useMemo, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiGitRepositoryFill, RiFileCodeLine, RiSendPlane2Fill, RiStarFill, RiShareFill } from "react-icons/ri";
import { FaCodeFork } from "react-icons/fa6";

import { useAnimate, stagger, motion, useCycle } from "framer-motion";

import { useUser } from '../../../hooks/userContext';
import { UserListStyle } from './styles'
import { ISingleRepo } from '../../../interface'

export function UserList() {
    let navigate = useNavigate();
    const { listUser, getDetailRepo, onLoadingListUser, onLoadingDetailRepo } = useUser();


    // useEffect(() => {
    //     console.log('UserList listUser', listUser)
    // }, [listUser])


    const singleUserRepo = (userName: string) => {
        getDetailRepo(userName)
    }


    // const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     console.log(event.target);
    //     console.log(event.currentTarget);
    //   };

    const detaiListUserRepo = (isAccordion: boolean, repoData: ISingleRepo[]): any[] => {
        if (isAccordion && repoData.length > 0) {
            return repoData.map(repo => {
                return (
                    <motion.div
                        key={repo.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            
                            backgroundColor: "#190824",
                            boxShadow: 'rgb(121 79 147) 0px 1px 13px 0px',
                            padding: 5,
                            borderRadius: 5,
                            border: '1px solid #0e3063',
                            marginBottom: 10,
                            marginLeft: '5%',
                            // alignItems: 'center',
                            // alignContent: 'center',
                            // justifyContent: 'center',
                            // height: 50,
                            height: 'auto',

                        }}>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                // backgroundColor: 'red',
                                alignItems: 'center',
                                height: 25,
                            }}>
                            <p style={{
                                // backgroundColor: 'green',
                                color: '#e5dbdb',
                                fontSize: 13,
                                fontWeight: 600,
                                // paddingLeft: 5,
                                margin: 1,
                            }}>
                                {repo.name}
                            </p>


                            <p style={{
                                // backgroundColor: 'green',
                                color: '#e5dbdb',
                                fontSize: 13,
                                fontWeight: 400,
                                marginLeft: 'auto',
                                // marginTop: 1,
                                // alignItems: 'center',

                                // paddingLeft: 5,
                                // margin: 1,
                            }}>
                                {repo.stargazers_count}
                            </p>
                            <FaCodeFork
                                style={{
                                    width: '10%',
                                    color: 'white',
                                    fontSize: 12,
                                }} />
                            <p style={{
                                // backgroundColor: 'green',
                                color: '#e5dbdb',
                                fontSize: 13,
                                fontWeight: 400,
                                // marginTop: 1,

                                // marginLeft: 'auto',
                                // paddingLeft: 5,
                                // margin: 1,
                            }}>
                                {repo.forks_count}
                            </p>
                            <RiStarFill
                                style={{
                                    width: '10%',
                                    color: 'white',
                                    fontSize: 13,
                                }} />
                        </div>


                        <div>
                            <p style={{
                                // backgroundColor: 'green',
                                color: '#e5dbdb',
                                paddingTop: 2,
                                fontSize: 10,
                                fontWeight: 300,
                                // paddingLeft: 5,
                                margin: 3,
                            }}>
                                {repo.description}
                            </p>
                        </div>
                    </motion.div>
                )
            })
        } else {
            return []
        }
    }

    const getViewUserList = useMemo(() => {
        if (listUser.length > 0) {
            return listUser.map((user, i) => {
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>

                        <div
                            key={user.node_id}
                            onClick={() => singleUserRepo(user.login)}

                            style={{
                                backgroundColor: "#f1f3f5db",
                                boxShadow: user.showAccordion ? 'rgb(244, 170, 185) 0px 1px 18px 10px' : '1px 2px 9px #F4AAB9',
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



                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <p style={{
                                        color: '#272626',
                                        fontSize: 10,
                                        paddingLeft: 5,
                                        paddingTop: 5,
                                        paddingBottom: 2,
                                        margin: 1,
                                    }}> {user.followers} followers - {user.following} following</p>
                                    <motion.div
                                        style={{
                                            // backgroundColor: 'red',
                                            marginLeft: 'auto',
                                        }}
                                        animate={{
                                            rotate: user.showAccordion ? 90 : 0
                                        }}>
                                        <RiSendPlane2Fill
                                            style={{
                                                // backgroundColor: 'grey',
                                                marginTop: 1,
                                                paddingLeft: 5,
                                                paddingTop: 5,
                                                paddingBottom: 2,
                                                width: '100%',
                                                color: '#272626',
                                                fontSize: 15,
                                            }} />
                                    </motion.div>

                                </div>


                            </div>


                        </div>
                        {detaiListUserRepo(user.showAccordion, user.dataRepo)}

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

