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
            <Typography variant="h4">
                {title}
            </Typography>
            <br />
            <Typography variant="p" fontWeight={600}>
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