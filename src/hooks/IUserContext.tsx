import { ReactNode, Dispatch, SetStateAction } from 'react';

interface errorMessage {
    isError: boolean
    messsage: string
}
interface UserProviderProps {
    children: ReactNode
}

interface IUserContext {
    onErrorRequest: errorMessage
    setOnErrorRequest: Dispatch<SetStateAction<errorMessage>>
    listUser: IGithubUser[]
    setListUser: Dispatch<SetStateAction<IGithubUser[]>>
    clearListUser: () => void
    getDetailRepo: (username: string) => Promise<void>
    getDetailRepoMultiple: (username: string, totalRepo: number) => Promise<void>
    getListUser: (username: string) => void
    onFocusInput: boolean
    setOnFocusInput: Dispatch<SetStateAction<boolean>>
    onLoadingListUser: boolean
    setOnLoadingListUser: Dispatch<SetStateAction<boolean>>
    onLoadingDetailRepo: boolean
    setOnLoadingDetailRepo: Dispatch<SetStateAction<boolean>>
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
    dataRepo: ISingleRepo[],
    showAccordion: boolean
}

interface ISingleRepo {
    allow_forking: boolean,
    archive_url: string,
    archived: boolean
    assignees_url: string
    blobs_url: string
    branches_url: string
    clone_url: string
    collaborators_url: string
    comments_url: string
    commits_url: string
    compare_url: string
    contents_url: string
    contributors_url: string
    created_at: string
    default_branch: string
    deployments_url: string
    description: string
    disabled: boolean
    downloads_url: string
    events_url: string
    fork: boolean
    forks: number
    forks_count: number
    forks_url: string
    full_name: string
    git_commits_url: string
    git_refs_url: string
    git_tags_url: string
    git_url: string
    has_discussions: boolean
    has_downloads: boolean
    has_issues: boolean
    has_pages: boolean
    has_projects: boolean
    has_wiki: boolean
    homepage: string
    hooks_url: string
    html_url: string
    id: number
    is_template: boolean
    issue_comment_url: string
    issue_events_url: string
    issues_url: string
    keys_url: string
    labels_url: string
    language: string
    languages_url: string
    license: {}
    merges_url: string
    milestones_url: string
    mirror_url: string
    name: string
    node_id: string
    notifications_url: string
    open_issues: number
    open_issues_count: number
    owner: {}
    private: boolean
    pulls_url: string
    pushed_at: string
    releases_url: string
    size: number
    ssh_url: string
    stargazers_count: number
    stargazers_url: string
    statuses_url: string
    subscribers_url: string
    subscription_url: string
    svn_url: string
    tags_url: string
    teams_url: string
    topics: []
    trees_url: string
    updated_at: string
    url: string
    visibility: string
    watchers: number
    watchers_count: number
    web_commit_signoff_required: boolean
}

export type {
    errorMessage,
    UserProviderProps,
    IUserContext,
    IGithubUser,
    ISingleRepo
}