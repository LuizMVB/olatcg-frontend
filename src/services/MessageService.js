var data = {

    /* COMMON */

    'common.name'               : 'OLATCG',
    'common.label.clickHere'    : 'Click Here',
    'common.developedBy'        : 'Developed by Luiz Miguel',
    
    /* APPBAR */

    'appBar.navItems.home'          : 'Home',
    'appBar.navItems.tools'         : 'Tools',
    'appBar.navItems.analysis'      : 'Analysis',
    'appBar.navItems.learn'         : 'Learn',
    'appBar.navItems.tutorials'     : 'Tutorials',
    

    /* HOME */

    'home.jumbotron.title'          : 'Welcome to ',
    'home.jumbotron.description'    : 'An easy-to-use bioinformatic\'s interface for students ' + 
                                        'from all over the world 🌎',
    
    'home.about.title'              : 'A Little Bit More About',
    'home.about.desc'               : 'OLATCG is a didatic platform that has the purpose to ' + 
                                        'introduce to Bioinformatics through the use of the main ' + 
                                        'computational models existing in the scientific academy. ' +
                                        'We developed some tools to make it easy, using a simple web interface ' +
                                        'you can make analysis and understand the main notions involved. ' +
                                        'Concurrently with this, it has a "about" section with some of ' +
                                        'the main concepts that you\'ll learn ',
    
    'home.chooseYourPath'                       : 'Choose Your Path Wisely 🧙🏽‍♂️',
    'home.chooseYourPath.card.learn.title'      : 'Learn Bioinformatis',
    'home.chooseYourPath.card.learn.desc'       : 'Here you can discover more about Bioinformatics itself. ' +
                                                    'Want to know the main definitions and perspectives of ' +
                                                    'Bioinformatics nowadays? This path is for you. Recomended ' + 
                                                    'if you have no previous experience with this field',
    'home.chooseYourPath.card.tools.title'      : 'Use OLATCG\'s Tools',
    'home.chooseYourPath.card.tools.desc'       : 'Do you want to make some analysis and generate a clear ' + 
                                                    'visualization of it? Here is your place. Access the OLATCG\'s ' +
                                                    'tools and start to use models like: local alignment, phylogenitc ' +
                                                    'search, tree visualization and much more. Recomended if you already ' +
                                                    'have notions in Bioinformatics',
    'home.chooseYourPath.card.tutorials.title'  : 'Tutorials',
    'home.chooseYourPath.card.tutorials.desc'   : 'Here you can read more about what features are implemented ' +
                                                    'by OLATCG and discover more about how it works. This path ' + 
                                                    'is recomended if you want to know deeper about the platform ' + 
                                                    'and how the analysis are made',

    'home.collaboration.title'                  : 'Collaboration',
    'home.collaboration.description'            : 'OLATCG is a collaborative project between',

    /** TOOLS */
    'tools.title'                               : 'Tools',
    'tools.card.alignment.title'                : 'Alignment',
    'tools.card.alignment.desc'                 : 'Align two sequences based on local or global alignment. ' +
                                                    'Both alinments are showed in an interactive table where you can ' +
                                                    'compare the matches between them. This is a important path ' +
                                                    'to understand the base of other tools and how it works in detail.',
    'tools.card.homologySearch.title'           : 'Homology Search',
    'tools.card.homologySearch.desc'            : 'Submit a list of sequences against a phylogenetically ' + 
                                                    'annotated database and receive a comparative analysis ' + 
                                                    'of the combinations with the highest similarity ' + 
                                                    'regarding the alignment of these sequences',

    /** LEARN */
    'learn.contentList.label.title'                             : 'Topics',
    'learn.contentList.listItem.label.whatIsOlatcg'             : 'What Is OLATCG?',
    'learn.contentList.listItem.label.whatIsBioinformatics'     : 'What Is Bioinformatic?',
    'learn.contentList.listItem.label.theHumanGenomeProject'    : 'The Human Genome Project',
    'learn.contentList.listItem.label.nowadays'                 : 'Nowadays',
    'learn.contentList.listItem.label.keyConcepts'              : 'Key Concepts'
};

function getMessage (key, ...args) {
    let msg = data[key];
    if(!data || !msg) {
        return key;
    } else if (args.length === 0){
        return msg;
    } else {
        return format(msg, args);
    }
};

function format(msg, args) {
    let argsIndex = 0;
    for (let index = 0; index < msg.length; index++) {
        if(msg[index] === '{' && msg[index+1] === argsIndex.toString() && msg[index+2] === '}') {
            msg = insert(msg, index, args[argsIndex]);
            argsIndex++;
        }
    }
    return msg;
}

function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index+3);
}

module.exports = {getMessage: getMessage};