import { useSelector } from "react-redux";
import OlatcgLoader from "./OlatcgLoader";

const App = () => {
  const nPedingRequests = useSelector(state => state.pedingRequests);

  return (
    <OlatcgLoader show={nPedingRequests} />
  );
}

export default App;
