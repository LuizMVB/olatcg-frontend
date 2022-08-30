import { Button, Paper, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";

const OlatcgImageCard = ({
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    title,
    description,
    buttonLabel
}) => {
    return <>
        <Paper
            sx={{ p: 4, maxWidth: 400, my: 0, backgroundColor: 'secondary.light' }}
            elevation={3}
        >
            <img src={imageSrc} alt={imageAlt} with={imageWidth} height={imageHeight}></img>
            <br /><br />
            <Typography variant="h4" color="#9c27b0">
                {title}
            </Typography>
            <Typography variant="p" fontWeight={600} color="#1d2b29c9">
                {description}
            </Typography>
            <br /><br />
            <Button variant="contained" href="/learn">
                {buttonLabel ? buttonLabel : getMessage('common.label.clickHere')}
            </Button>
        </Paper>
    </>
}

export default OlatcgImageCard;