import { Button, Paper, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { getMessage } from "../services/MessageService";
import { useNavigate } from "react-router";

const OlatcgImageCard = ({
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    title,
    description,
    buttonLabel,
    href 
}) => {
    const imageCardStyle = { 
        p: 2, maxWidth: 300, backgroundColor: 'secondary.light', 
        textAlign: 'center', '&:hover': {background: purple[100]}
    }

    const navigateTo = useNavigate();

    const goTo = () => {
        navigateTo(href);
    }

    return <>
        <Paper
            sx={imageCardStyle}
            elevation={3}
        >
            <img src={imageSrc} alt={imageAlt} with={imageWidth ? imageWidth : 100} height={imageHeight ? imageHeight : 100}></img>
            <br /><br />
            <Typography variant="h4" color="#9c27b0">
                {title}
            </Typography>
            <Typography variant="p" fontWeight={600} color="#1d2b29c9">
                {description}
            </Typography>
            <br /><br />
            <Button variant="contained" onClick={() => navigateTo(href)}>
                {buttonLabel ? buttonLabel : getMessage('common.label.clickHere')}
            </Button>
        </Paper>
    </>
}

export default OlatcgImageCard;