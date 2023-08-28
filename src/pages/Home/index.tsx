import { Header } from '../../components/Home/Header';
import { Searcher } from '../../components/Home/Searcher';
import { useUser } from '../../hooks/userContext';
import { UserList } from '../../components/Home/UserList'
import { HomeStyle } from './styles'

export function Home() {
    const { onFocusInput } = useUser();
    return (
        <div style={onFocusInput ? HomeStyle.containerOnFocus : HomeStyle.container}>
            <div style={HomeStyle.pageContainer}>
                <Header />
                <Searcher />
                <UserList />
            </div>
        </div>
    );
}




