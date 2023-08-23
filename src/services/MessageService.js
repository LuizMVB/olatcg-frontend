var data_en = {

    /* COMMON */

    'common.name'               : 'OLATCG',
    'common.label.clickHere'    : 'Click Here',
    'common.developedBy'        : 'Developed by Luiz Miguel',
    'common.label.success'      : 'Operation performed successfully',
    'common.label.homology'     : 'Homology',
    'common.label.alignment'    : 'Alignment',
    'common.label.details'      : 'Details',
    'common.label.show.tree'    : 'Show Tree',
    'common.asterisk'           : '*',

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
    'learn.contentList.listItem.label.keyConcepts'              : 'Key Concepts',

    /** TUTORIALS */
    'tutorials.contentList.label.title'                         : 'Tutorials',
    'tutorials.contentList.listItem.label.tutorials'            : 'How to Use OLATCG',

    /** HOMOLOGY */
    'homology.input.label.sequence'                     : 'Sequence',
    'homology.button.label.makeAnalysis'                : 'Make Analysis',
    'homology.input.label.databaseType'                 : 'Database Type',
    'homology.followYourResults.label.title'            : 'Follow your result in Analysis Section',
    'homology.followYourResults.label.desc'             : 'This can take a few minutes. Follow the ' +  
                                                           'update status of your analysis in the analysis section.',
    'homology.followYourResults.analysisId'             : 'Analysis ID: {0}',

    /** HOMOLOGY TABLE */
    'olatcgHomologyTable.label.IdAnalysis'              : 'ID Analysis',
    'olatcgHomologyTable.label.status'                  : 'Status',
    'olatcgHomologyTable.label.type'                    : 'Type',
    'olatcgHomologyTable.label.alignmentA'              : 'Alignment A',
    'olatcgHomologyTable.label.alignmentB'              : 'Alignment B',
    'olatcgHomologyTable.label.identityPercentage'      : 'Identity Percentage',
    'olatcgHomologyTable.label.sequenceA'               : 'Sequence A',
    'olatcgHomologyTable.label.sequenceB'               : 'Sequence B',
    'olatcgHomologyTable.label.taxonomy'                : 'Taxonomy',
    'olatcgHomologyTable.label.action'                  : 'Action',


    /** ALIGNMENT */
    'alignment.input.label.firstSequence'                        : 'First Sequence',
    'alignment.input.label.secondSequence'                       : 'Second Sequence',
    'alignment.button.tooltip.text.align'                        : 'Align',
    'alignment.step0.label'                                      : 'Adjusting configurations',
    'alignment.step1.label'                                      : 'Choose your sequences',
    'alignment.step2.label'                                      : 'Follow your results in Analysis section',
    'alignment.input.label.openPenalty'                          : 'Open Penalty',
    'alignment.input.label.extensionPenalty'                     : 'Extension Penalty',
    'alignment.input.label.sequenceType'                         : 'Sequence Type',
    'alignment.input.label.alignmentType'                        : 'Alignment Type',
    'alignment.followAnalysis.title'                             : 'Follow Your Results in Analysis Section',
    'alignment.followAnalysis.desc'                              : 'You can use the analysis section to consult your ' + 
                                                                    'results at any time. Record your identifier and ' + 
                                                                    'consult the table',
    'alignment.followAnalysis.preview'                           : 'Preview - ID {0}',
    'alignment.followAnalysis.button.label.goToAnalysis'         : 'Go to this Analysis',
    'alignment.followAnalysis.button.label.makeAnotherAnalysis'  : 'Make another analysis',

    /** ALIGNMENT TABLE */
    'olatcgAlignmentTable.label.sequenceA'              : 'Sequence A',
    'olatcgAlignmentTable.label.sequenceB'              : 'Sequence B',
    'olatcgAlignmentTable.label.alignmentA'             : 'Alignment A',
    'olatcgAlignmentTable.label.alignmentB'             : 'Alignment B',
    'olatcgAlignmentTable.label.identityPercentage'     : 'Identity Percentage',
    'olatcgAlignmentTable.label.status'                 : 'Status',
    'olatcgAlignmentTable.label.type'                   : 'Type',

    /** ALIGNMENT ANALYSIS DETAILS */

    'alignmentAnalsysisDetails.label.sequenceA'         : 'Sequence A',
    'alignmentAnalsysisDetails.label.sequenceB'         : 'Sequence B',
    

    /** OLATCG INPUT FILE */
    'oltcgInputFile.label.upload'                 : 'Click here and upload your file',

    /** STEPER */
    'steper.button.label.next'                      : 'Next Step',
    'steper.button.label.previous'                  : 'Previous Step',

    /** ALIGNMENT ANALYSIS */
    'alignmentAnalysis.label.id'                : 'ID',
    'alignmentAnalysis.label.status'            : 'Status',
    'alignmentAnalysis.label.action'            : 'Action',

    /** ENUM VALUES */

    // SequenceTypeEnum
    'enum.SequenceTypeEnum.DNA'                     : 'DNA',
    'enum.SequenceTypeEnum.RNA'                     : 'RNA',
    'enum.SequenceTypeEnum.PROTEIN'                 : 'Protein',

    // AlignmentTypeEnum
    'enum.AlignmentTypeEnum.GLOBAL'                 : 'Global',
    'enum.AlignmentTypeEnum.LOCAL'                  : 'Local',

    // DatabaseTypeEnum
    'enum.DatabaseTypeEnum.OLATCG'                : 'OLATCG',

    // INFOS

    'info.analysis.isnt.finished'            : 'The proccess still running. Try again when the status of this ' +
                                                    'analysis changes to \'FINSHED\'',

    // ERRORS

    'error.general'                             : 'An error occurred while trying to establish the connection. ' +
                                                    'Try again leater, please.', 
    'error.valitation.sequences.format'         : 'An error occurred while validating the sequences, ' + 
                                                    'check if they match the chosen type', 
    'error.validation.fillingFields'            : 'There cannot be blank fields. Check that all fields ' + 
                                                    'are filled in and try again.',      
    'error.validation.sequenceFile.format'      : 'Error while validating the content of sequence file. Please, check ' +
                                                    'if they match the choosen type and try again',
    'error.validation.sequenceFile.type'        : 'The sequence file must be of type .txt',
};

var data = {

    /* COMMON */

    'common.name'               : 'OLATCG',
    'common.label.clickHere'    : 'Clique aqui',
    'common.developedBy'        : 'Desenvolvido por Luiz Miguel',
    'common.label.success'      : 'Operação realizada com sucesso!',
    'common.label.homology'     : 'Homologia',
    'common.label.alignment'    : 'Alinhamento',
    'common.label.details'      : 'Detalhes',
    'common.label.show.tree'    : 'Mostrar árvore',
    'common.asterisk'           : '*',

    /* APPBAR */

    'appBar.navItems.home'          : 'Home',
    'appBar.navItems.tools'         : 'Ferramentas',
    'appBar.navItems.analysis'      : 'Análises',
    'appBar.navItems.learn'         : 'Aprender',
    'appBar.navItems.tutorials'     : 'Tutoriais',
    

    /* HOME */

    'home.jumbotron.title'          : 'Bem vindo ao ',
    'home.jumbotron.description'    : 'Uma ferramenta interativa de Bioinformática para estudantes ' + 
                                        'de todos os lugares do mundo 🌎',
    
    'home.about.title'              : 'Um pouco mais sobre...',
    'home.about.desc'               : 'OLATCG é uma plataforma didática que tem como propósito ' +
                                        'introduzir a Bioinformática através do uso dos principais modelos ' +
                                        'computacionais existentes na academia científica. ' +
                                        'Nós desenvolvemos algumas ferramentas para tornar esta tarefa mais fácil, ' +
                                        'a partir de uma interface WEB você pode realizar e entender as principais noções ' +
                                        'envolvidas. Paralelamente a isso, em "sobre" você pode pesquisar sobre ' + 
                                        'os pontos que você está aprendendo',
    
    'home.chooseYourPath'                       : 'Escolha o seu caminho com sabedoria 🧙🏽‍♂️',
    'home.chooseYourPath.card.learn.title'      : 'Aprender bioinformática',
    'home.chooseYourPath.card.learn.desc'       : 'Aqui você pode descobrir mais sobre bioinformática. ' +
                                                    'Quer saber as principais definições e perspectivas das ' +
                                                    'ferramentas que estão sendo utilizadas? Este caminho é para você. '+ 
                                                    'Recomendado se você não possui experiência prévia com o campo.',
    'home.chooseYourPath.card.tools.title'      : 'Utilizar as ferramentas do OLATCG',
    'home.chooseYourPath.card.tools.desc'       : 'Você quer realizar análises e gerar uma visualização clara do que está fazendo? ' + 
                                                    'Aqui é o seu lugar. Acesse as ferramentas do OLATCG e comece ' +
                                                    'a utilizar modelo como: alinhamento de sequências, busca homóloga, ' +
                                                    'visualização de árvore filogenética e muito mais. Recomendado ' +
                                                    'se você já possui alguma noção em Bioinformática',
    'home.chooseYourPath.card.tutorials.title'  : 'Tutoriais',
    'home.chooseYourPath.card.tutorials.desc'   : 'Aqui você pode ler mais sobre quais funcionalidades são implementadas pelo OLATCG ' +
                                                    'e descobrir mais sobre como isso funciona. Este caminho é recomendado se ' + 
                                                    'você quer ter um conhecimento mais aprofundado sobre a plataforma ' + 
                                                    'e como as análises são realizadas',

    'home.collaboration.title'                  : 'Colaboração',
    'home.collaboration.description'            : 'OLATCG é uma colaboração entre',

    /** TOOLS */
    'tools.title'                               : 'Ferramentas',
    'tools.card.alignment.title'                : 'Alinhamento',
    'tools.card.alignment.desc'                 : 'Alinhe duas sequências local ou globalmente. Ambos alinhamentos ' +
                                                    'são mostrados em uma tabela interativa onde você pode comparar ' +
                                                    'as correspondências entre ele. Este é um caminho importante para ' +
                                                    'compreender a base das outras ferramentas e como elas funcionam em detalhes.',
    'tools.card.homologySearch.title'           : 'Busca Homóloga',
    'tools.card.homologySearch.desc'            : 'Subimeta uma lista de sequências contra um banco de dados filogeneticamente anotado ' +
                                                    'e receba uma análise comparativa das combinações com maior percentual de identidade.',

    /** LEARN */
    'learn.contentList.label.title'                             : 'Tópicos',
    'learn.contentList.listItem.label.whatIsOlatcg'             : 'O que é OLATCG?',
    'learn.contentList.listItem.label.whatIsBioinformatics'     : 'O que é Bioinformática',
    'learn.contentList.listItem.label.theHumanGenomeProject'    : 'O Projeto Genoma Humano',
    'learn.contentList.listItem.label.nowadays'                 : 'Atualmente',
    'learn.contentList.listItem.label.keyConcepts'              : 'Conceitos-chave',

    /** TUTORIALS */
    'tutorials.contentList.label.title'                         : 'Tutoriais',
    'tutorials.contentList.listItem.label.tutorials'            : 'Como usar o OLATCG',

    /** HOMOLOGY */
    'homology.input.label.sequence'                     : 'Sequência',
    'homology.button.label.makeAnalysis'                : 'Fazer análise',
    'homology.input.label.databaseType'                 : 'Banco de Dados',
    'homology.followYourResults.label.title'            : 'Veja seus resultados em "Análises"',
    'homology.followYourResults.label.desc'             : 'Isso pode demorar alguns minutos. Acompanhe o status ' +  
                                                           'acompanhe o staut em "Análises".',
    'homology.followYourResults.analysisId'             : 'ID da Análise: {0}',

    /** HOMOLOGY TABLE */
    'olatcgHomologyTable.label.IdAnalysis'              : 'ID da Análise',
    'olatcgHomologyTable.label.status'                  : 'Status',
    'olatcgHomologyTable.label.type'                    : 'Tipo',
    'olatcgHomologyTable.label.alignmentA'              : 'Alinhamento A',
    'olatcgHomologyTable.label.alignmentB'              : 'Alinhamento B',
    'olatcgHomologyTable.label.identityPercentage'      : 'Percentual de Identidade',
    'olatcgHomologyTable.label.sequenceA'               : 'Sequência A',
    'olatcgHomologyTable.label.sequenceB'               : 'Sequência B',
    'olatcgHomologyTable.label.taxonomy'                : 'Taxonomia',
    'olatcgHomologyTable.label.action'                  : 'Ação',


    /** ALIGNMENT */
    'alignment.input.label.firstSequence'                        : 'Primeira sequência',
    'alignment.input.label.secondSequence'                       : 'Segunda seuência',
    'alignment.button.tooltip.text.align'                        : 'Alinhar',
    'alignment.step0.label'                                      : 'Ajustando configuração',
    'alignment.step1.label'                                      : 'Escolha suas sequências',
    'alignment.step2.label'                                      : 'Veja seus resultados e "Análises"',
    'alignment.input.label.openPenalty'                          : 'Penalidade de abertura',
    'alignment.input.label.extensionPenalty'                     : 'Penalidade de extensão',
    'alignment.input.label.sequenceType'                         : 'Tipo de sequência',
    'alignment.input.label.alignmentType'                        : 'Tipo de alinhamento',
    'alignment.followAnalysis.title'                             : 'Acompanhe seus resultados em "Análises"',
    'alignment.followAnalysis.desc'                              : 'Você pode consultar suas análises a qualquer momento. ' + 
                                                                    'Lembre-se do seu identificador e consulte a tabela',
    'alignment.followAnalysis.preview'                           : 'Pré-visualização - ID {0}',
    'alignment.followAnalysis.button.label.goToAnalysis'         : 'Ir para esta análise',
    'alignment.followAnalysis.button.label.makeAnotherAnalysis'  : 'Realizar outra análise',

    /** ALIGNMENT TABLE */
    'olatcgAlignmentTable.label.sequenceA'              : 'Sequência A',
    'olatcgAlignmentTable.label.sequenceB'              : 'Sequência B',
    'olatcgAlignmentTable.label.alignmentA'             : 'Alinhamento A',
    'olatcgAlignmentTable.label.alignmentB'             : 'Alinhamento B',
    'olatcgAlignmentTable.label.identityPercentage'     : 'Percentual de identidade',
    'olatcgAlignmentTable.label.status'                 : 'Status',
    'olatcgAlignmentTable.label.type'                   : 'Tipo',

    /** ALIGNMENT ANALYSIS DETAILS */

    'alignmentAnalsysisDetails.label.sequenceA'         : 'Sequência A',
    'alignmentAnalsysisDetails.label.sequenceB'         : 'Sequência B',
    

    /** OLATCG INPUT FILE */
    'oltcgInputFile.label.upload'                 : 'Clique aqui e atualize seu arquivo',

    /** STEPER */
    'steper.button.label.next'                      : 'Próximo passo',
    'steper.button.label.previous'                  : 'Passo anterior',

    /** ALIGNMENT ANALYSIS */
    'alignmentAnalysis.label.id'                : 'ID',
    'alignmentAnalysis.label.status'            : 'Status',
    'alignmentAnalysis.label.action'            : 'Ação',

    /** ENUM VALUES */

    // SequenceTypeEnum
    'enum.SequenceTypeEnum.DNA'                     : 'DNA',
    'enum.SequenceTypeEnum.RNA'                     : 'RNA',
    'enum.SequenceTypeEnum.PROTEIN'                 : 'Proteína',

    // AlignmentTypeEnum
    'enum.AlignmentTypeEnum.GLOBAL'                 : 'Global',
    'enum.AlignmentTypeEnum.LOCAL'                  : 'Local',

    // DatabaseTypeEnum
    'enum.DatabaseTypeEnum.OLATCG'                : 'OLATCG',

    // INFOS

    'info.analysis.isnt.finished'            : 'O processo está em andamento. Tente de novo quando o status ' + 
                                                    'para está análise for \'FINSHED\'',

    // ERRORS

    'error.general'                             : 'Um erro ocorreu enquando tentávamos estebelecer conexão com o servidor. ' +
                                                    'Tente novamente mais tarde, por favor.', 
    'error.valitation.sequences.format'         : 'Um erro ocorreu ao realizar a validação das sequências, ' + 
                                                    'verifique se elas estão de acordo com o tipo escolhido', 
    'error.validation.fillingFields'            : 'Não pode haver campos em branco. Verifique se todos os campos estão preenchidos ' + 
                                                    'e tente de novo.',      
    'error.validation.sequenceFile.format'      : 'Erro ao tentar realizar a validação do conteúdo do arquivo de sequências. ' +
                                                    'Por favor verifique se elas estão de acordo com o tipo escolhido e tente novamente',
    'error.validation.sequenceFile.type'        : 'O arquivo de sequências precisa ser no formato .txt',
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