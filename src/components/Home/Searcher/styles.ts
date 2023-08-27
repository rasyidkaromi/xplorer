import { ISearchStyle } from '../../../interface'

export const SearchStyle: ISearchStyle = {
    container: {
        backgroundColor: "#161b22",
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        borderRadius: 6,
        border: '1px solid #21262D',
        marginBottom: 32,
    },
    label: {
        marginBottom: '0.5rem',
        fontWeight: 300,
        fontSize: '0.8rem',
    },
    inputContainer: {
        position: 'relative'
    },
    input: {
        color:'#b2b2b2',
        width: '100%',
        outline: 'none',
        marginBottom: 16,
        paddingTop: 5,
        paddingBottom: 12,
        verticalAlign: 'middle',
        background: '#0d1117',
        border: '1px solid #30363D',
        borderRadius: 6,
        fontWeight: 300,
        fontSize: 14,
        // transition: 'all 0.2s',
    },
    inputFocus: {
        color: 'white',
        width: '100%',
        outline: 'none',
        marginBottom: 16,
        paddingTop: 5,
        paddingBottom: 12,
        verticalAlign: 'middle',
        background: '#0d1117',
        borderRadius: 6,
        fontWeight: 300,
        fontSize: 14,
        // transition: 'all 0.2s',
        border: '1px solid #1F6FEB',
        boxShadow: '0px 0px 0px 3px #0C2D6B'
    },
    button: {
        width: '100%',
        outline: 'none',
        background: '#238636',
        color: '#fff',
        fontFamily: 'Work Sans, sans-serif',
        fontSize: 14,
        fontWeight: 500,
        border: '1px solid rgba(240, 246, 252, 0.1)',
        paddingTop: 5,
        paddingBottom: 12,
        borderRadius: 6,
        // transition: 'all 0.2s'
    }
}