import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";


const TableHeadCell = ({ index, color }) => (<TableCell
    key={index}
    align={'center'}
    sx={{ bgcolor: color }}
>
</TableCell>);

const TableBodyCell = ({ index, color, value }) => (<TableCell
    key={index}
    align="center"
    sx={{
        maxWidth: 150,
        verticalAlign: 'center',
        bgcolor: color
    }}
>
    {value}
</TableCell>);

const AlignmentAnalysisDetails = () => {

    const { idAnalysis } = useParams();

    const [makeRequest] = useRequest();
    const [rowAlnA, setRowAlnA] = useState([]);
    const [rowAlnB, setRowAlnB] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const getColorBaseOnBase = (base) => {
        base = base.toUpperCase();
        if (base === 'A') {
            return red[300];
        }
        if (base === 'T' || base === 'U') {
            return blue[300];
        }
        if (base === 'C') {
            return green[300];
        }
        if (base === 'G') {
            return orange[300];
        }
    }

    const onSuccessGetAlignmentByIdAnalysis = (data) => {
        let seqAln = data.alignments[0];

        let alnA = seqAln.alignmentA;
        let alnB = seqAln.alignmentB;

        let [longestAln, shortestAln] = alnA.length > alnB.length ? [alnA, alnB] : [alnB, alnA];

        for (let alnIndex = shortestAln.length; alnIndex < longestAln.length; alnIndex++) {
            shortestAln += ' ';
        }

        let arrAlnA = [getMessage('alignmentAnalsysisDetails.label.sequenceA')];
        let arrAlnB = [getMessage('alignmentAnalsysisDetails.label.sequenceB')];

        longestAln.split('').forEach(base => arrAlnA.push(base));
        shortestAln.split('').forEach(base => arrAlnB.push(base));

        setRowAlnA(arrAlnA);
        setRowAlnB(arrAlnB);
        showLoader(false);
    }

    const onFailureGetAlignmentByIdAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    const getTableHeadRow = (alnA, alnB) => {
        return alnA.map((baseA, index) => {
            if (baseA === alnB[index]) {
                return <TableHeadCell index={index} color={getColorBaseOnBase(baseA)} />
            }
            return <TableHeadCell index={index} color="primary.main" />
        });
    }

    const getTableBodyRow = (rows) => {
        return rows.map((base, index) => {
            if (index === 0) {
                return <TableBodyCell index={index} value={base} color="primary.main" />
            }
            return <TableBodyCell 
                        index={index} 
                        value={base} 
                        color={rowAlnA[index] === rowAlnB[index] ? getColorBaseOnBase(base) : ''}
                    />
        })
    }

    useEffect(() => {
        showLoader(true);

        let url = API_ROUTES.GET_ANALYSIS_BY_ID;

        url = url.replace('{id}', idAnalysis);

        makeRequest(url, 'GET', null, onSuccessGetAlignmentByIdAnalysis, onFailureGetAlignmentByIdAnalysis);
        // eslint-disable-next-line
    }, []);

    return <>
        <Box sx={{ px: 4 }}>
            <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
                <TableContainer sx={{ maxHeight: '60vh' }}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                {getTableHeadRow(rowAlnA, rowAlnB)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {getTableBodyRow(rowAlnA)}
                            </TableRow>
                            <TableRow>
                                {getTableBodyRow(rowAlnB)}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
        <OlatcgSnackbar
            isOpened={isSnackbarOpened}
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar}
        />
        <OlatcgLoader show={isLoading} />
    </>
};

export { AlignmentAnalysisDetails };