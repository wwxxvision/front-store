import '../styles/index.scss';

import {animated, useTransition} from "react-spring";
import {useRouter} from "next/router";
import {StateProvider} from "../client/store";


function MyApp({Component, pageProps}) {
    const router = useRouter();
    const items = [
        {
            id: router.route,
            Component,
            pageProps
        }
    ];

    const transitions = useTransition(items, item => item.id, {
        from: {opacity: 0 },
        enter: {opacity: 1,  position: 'relative'},
        leave: { opacity: 0}
    })



    return <StateProvider>
        {
            transitions.map(({item: Item, key, props}) => <animated.div key={key} style={props}>
                <Item.Component {...Item.pageProps} /></animated.div>)
        }

        </StateProvider>
}

        export default MyApp
