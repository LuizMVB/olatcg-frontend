import { Grid, Typography } from "@mui/material";
import OlatcgContentList from "../components/OlatcgContentList";
import { getMessage } from "../services/MessageService";
import { useSelector } from "react-redux";

const Learn = () => {
    const selectedItem = useSelector(state => state.selectedItemInContentList);

    const contentListItems = [
        {
            label: getMessage('learn.contentList.listItem.label.whatIsOlatcg.title'),
            text: getMessage('learn.contentList.listItem.label.whatIsOlatcg.text')
        },
        {
            label: getMessage('learn.contentList.listItem.label.whatIsBioinformatics.title'),
            text: getMessage('learn.contentList.listItem.label.whatIsBioinformatics.text')
        },
        {
            label: getMessage('learn.contentList.listItem.label.theHumanGenomeProject.title'),
            text: getMessage('learn.contentList.listItem.label.theHumanGenomeProject.text')
        },
        {
            label: getMessage('learn.contentList.listItem.label.nowadays.title'),
            text: getMessage('learn.contentList.listItem.label.nowadays.text')
        },
        {
            label: getMessage('learn.contentList.listItem.label.keyConcepts.title'),
            text: getMessage('learn.contentList.listItem.label.keyConcepts.text')
        }
    ]

    
    const splitTextIntoParagraphs = (text) => {
        return text.split('\n').map((paragraph, index) => (
            <Typography variant="h6" key={index} paragraph>
                {paragraph}
            </Typography>
        ));
    };

    return <>
        <Grid sx={{ height: '85vh' }} container spacing={0}>
            <Grid item xs={3} sx={{ backgroundColor: 'secondary.light', pb: 4 }}>
                <OlatcgContentList
                    title={getMessage('learn.contentList.label.title')}
                    items={contentListItems}
                />
            </Grid>
            <Grid item xs={9} sx={{ pl: 4, pt: 4 }}>
                {
                    contentListItems.map((item, index) => {
                        if (selectedItem === index) {
                            return (<>
                                <Typography variant="h3" key={index}>
                                    {item.label}
                                </Typography>
                                {splitTextIntoParagraphs(item.text)}
                            </>)
                        }
                        return null;
                    })
                }
            </Grid>
        </Grid>
    </>
}

export default Learn;