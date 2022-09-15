import { Link } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgNavbar from "../components/OlatcgNavbar";
import AppRoutes from "../routes/AppRoutes";
import { getMessage } from "../services/MessageService";

const App = () => {
  const nPendingRequests = useSelector(state => state.pendingRequests);

  return <>
    <OlatcgLoader show={nPendingRequests > 0} />
    <OlatcgNavbar />
    <AppRoutes />
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{position: 'fixed', width: '100%', bottom: 0, backgroundColor: 'primary.main', color: "#ffffff", padding: 0.3}}
    > 
      <GitHub />
      <Link href="https://github.com/LuizMVB" underline="hover" sx={{color: "#ffffff", pr: 2}}><span style={{paddingLeft: 8}}>{getMessage('common.developedBy')}</span></Link>
    </Stack>
  </>;
}

export default App;
