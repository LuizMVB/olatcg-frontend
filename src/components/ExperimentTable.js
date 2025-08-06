import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgNodata from "../components/OlatcgNoData";
import OlatcgLoader from "../components/OlatcgLoader";
import { styled, alpha } from "@mui/material/styles";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ExperimentTable = ({filters}) => {

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [info, setInfo] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const token = 'e818fa447cf7e74e60855449dee35dcb9efac42f';

    useEffect (() => {

        const onComponentMount = async () => {
            showLoader(true);

            let url = API_ROUTES.GET_EXPERIMENT;
            if (filters.experiment_id || filters.experiment_title) {

                if (filters.experiment_id!==0 && filters.experiment_id !== undefined) {
                    url += '&id__in=' + filters.experiment_id;
                }
                if (filters.experiment_title!=='' && filters.experiment_title !== undefined) {
                    url += '&title__icontains=' + filters.experiment_title;
                }
            }

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },
                });

                if(response.ok) {
                    const data = await response.json();
                    onSuccessGetExperiment(data);
                } else {
                    const errorData = await response.json();
                    onFailureGetExperiment(errorData);
                }
            }
            catch(error) {
                onFailureGetExperiment(error);
            }
        };

        onComponentMount();

    }, [filters])


    const onSuccessGetExperiment = (obj) => {
        if (obj.results.length === 0) {
            setInfo(true);
        } else {
            setInfo(false);
        }
        setColumns([{id: 'id', label: getMessage('olatcgExperimentTable.label.idExperiment')},
                    {id: 'title', label: getMessage('olatcgExperimentTable.label.titleExperiment')},
                    {id:'description', label: getMessage('olatcgExperimentTable.label.description')},
                    {id: 'action', label:''}
        ]);
        setRows(obj.results.map((experiment, index) => {
            return {
                code: index,
                id: experiment.id,
                title: experiment.title,
                description: experiment.description,
                action: experimentActionButton(experiment.id)
            }
        }));

        setTotalPages(Math.ceil(obj.count /15));
        showLoader(false);
    }

    const onFailureGetExperiment = (error) => {
        showSnackbar(getMessage(error.detail), 'error');
        showLoader(false);
    }

    const StyledMenu = styled((props) => (
        <Menu elevation={0} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} 
        transformOrigin={{ vertical: 'top', horizontal: 'right'}} {...props} />
    )) (({theme}) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color: 'rgb(55, 65, 81)',
            boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',

            '& .MuiMenu-list': {
            padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity,
                ),
            },
            },
        },
    }))

    const handleOpenMenu = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    }

    const experimentActionButton = (expId) => {
        return (
            <>
            <Button
                aria-controls={open ? 'customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                size="small"
                onClick={(e) => handleOpenMenu(e, expId)}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {getMessage('olatcgExperimentTable.label.actions')}
            </Button>
            </>
        );
    };

    const handlePaginationChange = async (e, page) => {
        showLoader(true);

        let url = API_ROUTES.GET_EXPERIMENT + "&page=" + (page);
        if (filters.experiment_id || filters.experiment_title) {

                if (filters.experiment_id!==0 && filters.experiment_id !== undefined) {
                    url += '&id__in=' + filters.experiment_id;
                }
                if (filters.experiment_title!=='' && filters.experiment_title !== undefined) {
                    url += '&title__icontains=' + filters.experiment_title;
                }
        }

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });

            if(response.ok) {
                const data = await response.json();
                onSuccessGetExperiment(data);
            } else {
                const errorData = await response.json();
                onFailureGetExperiment(errorData);
            }
        }
        catch(error) {
            onFailureGetExperiment(error);
        }
    }
    
    return <> 
         
            <Box sx={{px: 4, pb: 8}}>{info ? <OlatcgNodata />: 
                <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
                    <TableContainer sx={{ maxHeight: '60vh' }}>
                        <Table stickyHeader aria-label="sticky table" >
                        
                            <TableHead>
                                <TableRow>
                                    
                                    {columns.map((column) => (
                                        <TableCell
                                        
                                            key={column.id}
                                            align={'center'}
                                            sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                        const value = row[column.id];
                                            return (
                                                <TableCell 
                                                    key={column.id} 
                                                    align="center" 
                                                    sx={{ 
                                                            maxWidth: 150, 
                                                            verticalAlign: 'center',
                                                            backgroundColor: 'primary.light',
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word'
                                                        }}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        }
                                    )};
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>}
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination 
                        count={totalPages} 
                        color="primary" 
                        onChange={handlePaginationChange}
                    />
                </Box>
            </Box>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={() => { handleCloseMenu(); alert(`Visualizar experimento ${selectedRowId}`); }} disableRipple>
                <VisibilityIcon />
                {getMessage('olatcgExperimentTable.actions.visualize')}
                </MenuItem>
                <MenuItem onClick={() => { handleCloseMenu(); alert(`Editar experimento ${selectedRowId}`); }} disableRipple>
                <EditIcon />
                {getMessage('olatcgExperimentTable.actions.edit')}
                </MenuItem>
                <MenuItem onClick={() => { handleCloseMenu(); alert(`Excluir experimento ${selectedRowId}`); }} disableRipple>
                <DeleteIcon />
                {getMessage('olatcgExperimentTable.actions.delete')}
                </MenuItem>
            </StyledMenu>

            <OlatcgSnackbar
                isOpened={isSnackbarOpened} 
                onClose={() => openSnackbar(false)}
                status={statusSnackbar}
                msg={msgSnackbar} 
            />
            <OlatcgLoader show={isLoading}/>
        </>

}

export {ExperimentTable};