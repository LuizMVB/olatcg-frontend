import { getMessage } from "../services/MessageService";

const Home = () => {
    return <>
        {getMessage('common.name')}    
    </>
}

export default Home;