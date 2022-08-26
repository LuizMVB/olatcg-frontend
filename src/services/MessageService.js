var data = {

    //COMMON

    'common.name'       : 'olATCG',
    
    //APPBAR

    'appBar.navItems.home'          : 'Home',
    'appBar.navItems.tools'         : 'Tools',
    'appBar.navItems.learn'         : 'Learn',
    'appBar.navItems.analysis'      : 'Analysis'
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