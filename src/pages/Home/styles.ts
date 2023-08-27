import { IHomeStyle } from '../../interface'

export const HomeStyle: IHomeStyle = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        // transition: 'all 0.5s',
    },
    containerOnFocus: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        // width: '100vw',
        // height: '100vh',

        width: 'auto',
        // height: 'auto'
        // transition: 'all 0.5s',
    },
    pageContainer: {
        width: '80vw',
        // height: '100vh',
        maxWidth: 350
    }
}
