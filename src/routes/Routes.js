var BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://spica.eic.cefet-rj.br/olatcg-backend';

var API_BASE_PATH = BASE_URL + '/v1/api';

//BACKEND ROUTES
const API_ROUTES = {

    //ALIGNMENT
    ALIGN: API_BASE_PATH + '/alignment/{type}/type',
    SEARCH_ALIGNMENTS: API_BASE_PATH + '/sequenceAlignment/search',
    GET_ANALYSIS_BY_ID: API_BASE_PATH + '/analysis/{id}',

    //TAXONOMY SEARCH
    GET_TAXONOMY_FROM_SEQUENCES: API_BASE_PATH + '/homology/{value}/type',
    GET_TAXONOMY_SEARCH_RECORDS: API_BASE_PATH + '/taxonomySearch/search',
    GET_TAXONOMY_FROM_SEQUENCE: API_BASE_PATH + '/taxonomySearch/getTaxonomyNameFromSequenceId',
    BLASTN: API_BASE_PATH + '/taxonomySearch/getTaxonomyFromSequence',

    //PHYLOGENY
    GET_NEWICK_FROM_TAXONOMY: API_BASE_PATH + '/phylogeny/getNewickFromTaxonomy',

    //ANALYSIS
    SEARCH_ANALYSIS_BY_TYPE: API_BASE_PATH + '/analysis/{value}/type',
};



module.exports = {API_ROUTES: API_ROUTES}