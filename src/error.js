function throwError(module, error) {
    error.message = `Error: ${ error.message }`;
    if (typeof error.location !== 'undefined') {
        let line = module.code.split('\n', error.location.first_line)[error.location.first_line - 1].replace(/[\t]/g, ' ');

        error.message += `\n\nAt ${ module.url.href }:${ error.location.first_line }`;
        if (line.length > 0) {
            let highlight = '';

            error.message += `\n\n${ line }`;
            for (let i = 0; i < line.length; i++) {
                if ((error.location.first_column <= i) && (i < error.location.last_column)) {
                    highlight += '^';
                } else {
                    highlight += ' ';
                }
            }
            if (highlight.trim().length > 0) {
                error.message += `\n${ highlight }`;
            }
        }
    }
    if (typeof error.note !== 'undefined') {
        error.message += `\n\nNote: ${ error.note }`;
    }
    //console.log(error.message);
    throw error;
}

export default throwError;
