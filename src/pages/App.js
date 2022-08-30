import { Link } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgNavbar from "../components/OlatcgNavbar";
import AppRoutes from "../routes/AppRoutes";
import { getMessage } from "../services/MessageService";

const App = () => {
  const nPedingRequests = useSelector(state => state.pedingRequests);

  return <>
    <OlatcgLoader show={nPedingRequests} />
    <OlatcgNavbar />
    <AppRoutes />
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{backgroundColor: 'primary.main', color: "#ffffff", padding: 0.3, pr: 2}}
    > 
      <GitHub />
      <Link href="https://github.com/LuizMVB" underline="hover" sx={{color: "#ffffff"}}><span style={{paddingLeft: 8}}>{getMessage('common.developedBy')}</span></Link>
    </Stack>
  </>;
}

export default App;
