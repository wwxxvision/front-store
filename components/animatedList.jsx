import {useTransition, animated} from 'react-spring';

export default function AnimatedList({items, children}) {
    const transitions = useTransition(items, item => item.key, {
        from: { transform: 'translate3d(0,-40px,0)' },
        enter: { transform: 'translate3d(0,0px,0)' },
        leave: { transform: 'translate3d(0,-40px,0)' },
    })
    return transitions.map(({ item, props, key }) =>
        <animated.div key={key} style={props}><View {...innerProps} /></animated.div>
    )
}
