import { Box, Stack, Typography } from "@mui/material";
import OlatcgImageCard from "../components/OlatcgImageCard";
import { getMessage } from "../services/MessageService";
import Alignment from '../static/images/alignment.png';
import HomologySearch from '../static/images/homologySearch.png';

const Tools = () => {
    const toolCards = [
        {
            imageSrc: Alignment,
            imageAlt: 'Alignment\'s image',
            title: getMessage('tools.card.alignment.title'),
            description: getMessage('tools.card.alignment.desc'),
            href: '/alignment'
        },
        {
            imageSrc: HomologySearch,
            imageAlt: 'Homology Search image',
            title: getMessage('tools.card.homologySearch.title'),
            description: getMessage('tools.card.homologySearch.desc'),
            href: '/homology'
        }
    ]

    return <>
        <Box sx={{textAlign: 'center', py: 4}}>
            <Typography variant="h3">
                {getMessage('tools.title')}
            </Typography>
            <Stack 
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={4}
                py={4}
            >
                {
                    toolCards.map((toolCard, index) => 
                            <OlatcgImageCard
                                key={index}
                                imageSrc={toolCard.imageSrc}
                                imageAlt={toolCard.imageAlt}
                                title={toolCard.title}
                                description={toolCard.description}
                                href={toolCard.href}
                            />  
                    )
                }
            </Stack>
        </Box>
    </>
}

export default Tools;