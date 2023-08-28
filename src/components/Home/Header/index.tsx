import { useEffect } from 'react';
import { motion, useCycle } from 'framer-motion'
import GithubLogo from '../../../assets/github-icon.png';
import { HeaderStyle } from './styles';
import { useUser } from '../../../hooks/userContext';

const motionVariant = {
    motionOne: {
        x: 0,
        y: 0,
        height: 'auto',
        transition: {
            x: {
                duration: 0.5
            },
            y: {
                duration: 0.25,
                ease: 'easeOut'
            }
        }
    },
    motionTwo: {
        x: '-10vh',
        padding: 5,
        transition: {
            y: {
                duration: 0.25,
                ease: 'easeOut'
            }

        }
    }
}


export function Header() {
    const { onFocusInput } = useUser();
    const [animation, cycleAnimation] = useCycle('motionOne', 'motionTwo')

    useEffect(() => {
        if (onFocusInput) {
            cycleAnimation(1)
        } else {
            cycleAnimation(2)
        }
    }, [onFocusInput, cycleAnimation])

    return (
        <div style={HeaderStyle.container}>
            <motion.div
                variants={motionVariant}
                animate={animation}
                style={HeaderStyle.motionImg}>
                <img
                    style={onFocusInput ? HeaderStyle.imgOnFocus : HeaderStyle.img}
                    src={GithubLogo} 
                    alt="Github"/>
            </motion.div>
            {!onFocusInput ? <h1>Xplorer</h1> : []}
        </div>
    );
}