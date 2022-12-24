import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";


const HomologyAnalysisDetails = () => {
    let { idAnalysis } = useParams();
    const [makeRequest] = useRequest();
    const [taxonomy, setTaxonomy] = useState([]);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);

    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }
    const onFailureGetAlignmentByIdAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    useEffect(() => {
        
        // /fetch(API_ROUTES.GET_TAXONOMY_BY_ID_ANALYSIS + '?idAnalysis=' + idAnalysis)
        // .then((taxonomy) => taxonomy.json())
        // .then((taxonomy) => {     
        //     setTaxonomy(taxonomy.alignments)
        // })
        // console.log(taxonomy)
        // //tablemaker()
        makeRequest(API_ROUTES.GET_TAXONOMY_BY_ID_ANALYSIS + '?idAnalysis=' + idAnalysis, 'GET', null, tablemaker, onFailureGetAlignmentByIdAnalysis);
    }, [idAnalysis]);

const tablemaker = (response)=> {
    console.log(response.alignments)
    setColumns([{
        id: 'inputSequenceId',
        label: getMessage('olatcgHomologyTable.label.inputSequenceId' )
    },
    {
        id: 'inputSequence',
        label: getMessage('olatcgHomologyTable.label.inputSequence')
    },
    {
        id: 'externalDatabaseId',
        label: getMessage('olatcgHomologyTable.label.externalDatabaseId'  )
    },
    {
        id: 'countryOrigin',
        label: getMessage('olatcgHomologyTable.label.countryOrigin' )
    },
    // {
    //     id: 'bases',
    //     label: getMessage('olatcgHomologyTable.label.bases' )
    // },
    // {
    //     id: 'matchAlignment',
    //     label: getMessage('olatcgHomologyTable.label.matchAlignment'  )
    // },
    {
        id: 'taxonomy',
        label: getMessage('olatcgHomologyTable.label.taxonomy' )
    },
    {
        id: 'taxonomyDescription',
        label: getMessage('olatcgHomologyTable.label.taxonomyDescription' )
    },
    {
        id: 'similarity',
        label: getMessage('olatcgHomologyTable.label.similarity' )
    },
    {
        id: 'score',
        label: getMessage('olatcgHomologyTable.label.score' )
    }]);




    setRows(response.alignments.map((homoAnalysis, index) => {
        return {
            code: index,
            inputSequenceId: homoAnalysis.inputSequenceId,
            inputSequence: homoAnalysis.inputSequence,
            externalDatabaseId: homoAnalysis.matchSequence.externalDatabaseId,
            countryOrigin: homoAnalysis.matchSequence.countryOrigin,
           // bases: homoAnalysis.matchSequence.bases,
            inputAlignment: homoAnalysis.inputAlignment,
            //matchAlignment: homoAnalysis.matchAlignment,
            taxonomy: homoAnalysis.taxonomy,
            taxonomyDescription: homoAnalysis.taxonomyDescription,
            similarity: homoAnalysis.similarity,
            score: homoAnalysis.score,
        };
    }));


}
    
    
    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
            <TableContainer sx={{ maxHeight: 1000 }}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={'center'}
                                    sx={{bgcolor: 'primary.main'}}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                            <TableRow hover role="checkbox" key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align="center" sx={{wordWrap: 'break-word', maxWidth: 150, verticalAlign: 'top'}}>
                                        {value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        <OlatcgSnackbar
            isOpened={isSnackbarOpened} 
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar} 
        />
        <OlatcgLoader show={isLoading}/>
    </>
}

export { HomologyAnalysisDetails };