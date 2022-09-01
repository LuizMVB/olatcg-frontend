import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import OlatcgContentList from "../components/OlatcgContentList";
import { getMessage } from "../services/MessageService";
import { useSelector } from "react-redux";

const Learn = () => {
    const selectedItem = useSelector(state => state.SelectedItemInContentList);

    const contentListItems = [
        { label: getMessage('learn.contentList.listItem.label.whatIsOlatcg')},
        { label: getMessage('learn.contentList.listItem.label.whatIsBioinformatics')},
        { label: getMessage('learn.contentList.listItem.label.theHumanGenomeProject')},
        { label: getMessage('learn.contentList.listItem.label.nowadays')},
        { label: getMessage('learn.contentList.listItem.label.keyConcepts')}
    ]

    return <>
        <Box height="85vh" display="flex" flexDirection="row">
            <Box overflow="auto" sx={{bgcolor: purple[50], mr: 6}} flex={1}>
                <OlatcgContentList 
                    title={getMessage('learn.contentList.label.title')} 
                    items={contentListItems}
                />
            </Box>
            <Box flex={2} sx={{mt: 6}}>
                {
                    contentListItems.map((item, index) => {
                        if(selectedItem === index){
                            return <Typography variant="h3">{item.label}</Typography>
                        }
                        return null;
                    })
                }
            </Box>
        </Box>
    </>
}

export default Learn;