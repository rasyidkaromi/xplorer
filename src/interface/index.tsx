
import { CSSProperties } from 'react';


interface ISearchStyle {
    container: CSSProperties,
    label: CSSProperties,
    inputContainer: CSSProperties,
    input: CSSProperties,
    inputFocus: CSSProperties,
    button: CSSProperties,
}

interface IHomeStyle {
    container: CSSProperties,
    containerOnFocus: CSSProperties,
    pageContainer: CSSProperties,
}

interface iHeaderStyle {
    container: CSSProperties,
    motionImg: CSSProperties,
    img: CSSProperties,
    h1style: CSSProperties,
    imgHover: CSSProperties,
    imgOnFocus: CSSProperties
}

interface IGithubUser {
    avatar_url: string,
    events_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    gravatar_id: string,
    html_url: string,
    id: number,
    login: string,
    node_id: string,
    organizations_url: string
    received_events_url: string,
    repos_url: string,
    score: number,
    site_admin: boolean,
    starred_url: string
    subscriptions_url: string,
    type: string,
    url: string,
    bio: string,
    blog: string,
    company: string,
    created_at: string,
    email: string,
    followers: number,
    following: number,
    hireable: boolean,
    location: string,
    name: string,
    public_gists: number,
    public_repos: number,
    twitter_username: string,
    updated_at: string,
}


export type {
    ISearchStyle,
    iHeaderStyle,
    IHomeStyle,
    IGithubUser
}