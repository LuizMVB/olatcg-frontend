import React from 'react';
import OlatcgPhyloTree from '../components/OlatcgPhyloTree';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const exampleNewick = '(Vaca:0.69395,(Gibão:0.36079,(Orangotango:0.33636,(Gorila:0.17147,(Chimpanzé:1.19268,Humano:0.11927):0.08386):0.06124):0.15057):0.54939, Rato:1.21460);';
//const exampleNewick = '(query_1:0.164874736,(query_2:0.0,query_3:0.0):0.164874736);';


const PhyloTree = () => {
  let treeId = useParams();
  const [makeRequest] = useRequest();
  const navigateTo = useNavigate();
  const [isLoading, showLoader] = useState(false);
  const [isSnackbarOpened, openSnackbar] = useState(false);
  const [statusSnackbar, setStatusSanckbar] = useState('error');
  const [msgSnackbar, setMsgSnackbar] = useState('');
  const [idAnalysis, setIdAnalysis] = useState(0);
  const [analysisName, setAnalysisName] = useState('');
  const [newickTree, setNewickTree] = useState('');
  

  const showSnackbar = (msg, status) => {
    setMsgSnackbar(msg);
    setStatusSanckbar(status);
    openSnackbar(true);
}

  const onFailureGetPhyloTree = (error) => {
    showSnackbar(getMessage(error.errorDescription), 'error');
    showLoader(false);
}

const onSuccessGetPhyloTree = (obj) => {

  setIdAnalysis(obj.data.generated_from_analysis);
  setAnalysisName(obj.data.title)
  //setNewickTree(obj.data.nwk)
  setNewickTree('(Vaca:0.69395,(Gibão:0.36079,(Orangotango:0.33636,(Gorila:0.17147,(Chimpanzé:1.19268,Humano:0.11927):0.08386):0.06124):0.15057):0.54939, Rato:1.21460);')


  showLoader(false);
}

useEffect(() => {
  showLoader(true);
  
  let url = API_ROUTES.GET_ANALYSIS_BY_ID;
  url = url.replace('{id}', treeId.idAnalysis);

  makeRequest(url, 'GET', null, onSuccessGetPhyloTree, onFailureGetPhyloTree);
}, [treeId]);


    return ( <>
          <Box sx={{ px: 4, my: 'auto'}}>
            <Paper sx={{ maxWidth:'90%', /*overflow: 'hidden',*/ bgcolor: 'primary.light', margin: 'auto'}}>
              <Typography component="div" variant="h4" sx={{backgroundColor: 'primary.dark', borderTopRightRadius: '4px', borderTopLeftRadius: '4px', color: 'primary.contrastText', textAlign: 'center'}}>
                ID {idAnalysis} - {analysisName}
              </Typography>
              {newickTree && (
                 <OlatcgPhyloTree newick={exampleNewick} />
                )
                }
              <Button startIcon={<ContentPasteIcon/>} sx={{width:'100%', color: 'primary.contrastText', backgroundColor:'primary.dark', borderTopRightRadius: 0, borderTopLeftRadius: 0}} onClick={() => idAnalysis !=0 && navigateTo("/analysis/homology/" + idAnalysis)}>
                {getMessage('phyloTree.label.return')}
              </Button>
            </Paper>
          </Box>
          <OlatcgSnackbar
            isOpened={isSnackbarOpened} 
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar} 
          />
          <OlatcgLoader show={isLoading}/>
        </>

      );
}

export default PhyloTree;