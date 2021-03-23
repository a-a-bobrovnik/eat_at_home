import { Observer } from "mobx-react-lite";
//import { useRootStore } from "../store/RootStoreContext";

export const Home = (props: any) => {
    //const { userStore } = useRootStore()
    return <Observer>
        {() => <div>
            <p>it is HP</p>
        </div>}
    </Observer>

}