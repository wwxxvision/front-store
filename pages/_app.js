import '../styles/index.scss';
import {StateProvider} from "../client/store";

function MyApp({Component, pageProps}) {
    return <StateProvider>
        <Component {...pageProps} />
    </StateProvider>
}

export default MyApp
