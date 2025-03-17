const fs = require('fs');
const util = require('util');
const path = require('path');

const __basedir = path.resolve(__dirname, '../../');

const logs_folder_path = path.join(__basedir, 'public', 'logs');
if (!fs.existsSync(logs_folder_path)) {
    fs.mkdirSync(logs_folder_path, { recursive: true });
}
const error_log_file = fs.createWriteStream(path.join(logs_folder_path, 'error.log'), { flags : 'a' });

const logging = {
    log: (messages) => console.log(JSON.stringify(messages)),
    info: (messages) => console.info(JSON.stringify(messages)),
    debug: (messages) => console.debug(JSON.stringify(messages)),
    error: (messages) => {
        error_log_file.write(util.format(new Date()) + ' ');
        error_log_file.write(util.format(JSON.stringify(messages)) + '\n');
        console.error(JSON.stringify(messages))
    },
    warning: (messages) => {
        error_log_file.write(util.format(new Date()) + ' ');
        error_log_file.write(util.format(JSON.stringify(messages)) + '\n');
        console.warn(JSON.stringify(messages));
    }
}

module.exports = {
    logging
}