import { useSelector } from "react-redux";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgNavbar from "../components/OlatcgNavbar";
import AppRoutes from "../routes/AppRoutes";

const App = () => {
  const nPedingRequests = useSelector(state => state.pedingRequests);

  return <>
    <OlatcgLoader show={nPedingRequests} />
    <OlatcgNavbar />
    <AppRoutes />
  </>;
}

export default App;
