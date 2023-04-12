import { OlatcgPhylogeneticTree } from '../components/OlatcgPhylogeneticTree';

const HomologyAnalysisTree = () => {
    return <>
        <OlatcgPhylogeneticTree newickString = '((raccoon:19.19959,bear:6.80041):0.84600,((sea_lion:11.99700, seal:12.00300):7.52973,((monkey:100.85930,cat:47.14069):20.59201, weasel:18.87953):2.09460):3.87382);'/>
    </>
}

export { HomologyAnalysisTree };