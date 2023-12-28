/* Lexical grammar */

%lex

/* Use the rule with the longest match instead of the first match */
%options flex

/* States */
%x INLINE_COMMENT MULTILINE_COMMENT
%x INLINE_TEXT MULTILINE_TEXT

%%

<*><<EOF>>
    {

        //console.log('EOF', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'EOF';
    }

[\n\t ]*[\n][\t ]*
    {
        var tokenList = ['LINE'];
        var tail = yytext.slice(yytext.lastIndexOf('\n') + 1);

        if (tail.indexOf(' ') === -1) {
            if (tail.length > $tailLengthList[0]) {
                /* Indentation */
                if (tail.length - $tailLengthList[0] === 1) {
                    $tailLengthList.unshift(tail.length);
                    tokenList.unshift('INDENT');
                } else {
                    tokenList.unshift('INDENTATION_TOO_LONG');
                }
            } else if (tail.length < $tailLengthList[0]) {
                /* Outdentation */
                while (tail.length < $tailLengthList[0]) {
                    $tailLengthList.shift();
                    tokenList.unshift('OUTDENT');
                }
            } else {
                /* New line */
            }
        } else {
            tokenList.push('INDENTATION_SPACE_CHARACTER');
        }

        //console.log(tokenList.join(' '), yytext.replace(/[ ]/g, '␣').split(), $tailLengthList);

        yy.parser.yy.location = yylloc;
        return tokenList;
    }

[\t ]
    {
        //console.log('SPACE', yytext.replace(/[ ]/g, '␣').split());

        if ((yylloc.first_line === 1) && (yylloc.first_column === 0)) {
            var token = 'INDENT';
            var tail = yytext;

            if (tail.indexOf(' ') === -1) {
                if (tail.length > 1) {
                    token = 'INDENTATION_TOO_LONG';
                }
            } else {
                token = 'INDENTATION_SPACE_CHARACTER';
            }
            yy.parser.yy.location = yylloc;
            return token;
        }
    }

[\\][\t ]*[\n][\t \n]*
    {

        //console.log('LINE_BREAK', yytext.replace(/[ ]/g, '␣').split());

    }

"--"(?=[\n])
    {

        //console.log('INLINE COMMENT (EMPTY)', yytext.split());

    }

"--"(?![\n])
    {

        //console.log('INLINE COMMENT (START)', yytext.split());

        this.pushState('INLINE_COMMENT');
    }

<INLINE_COMMENT>.+
    {

        //console.log('INLINE COMMENT', yytext.split());

        this.popState();
    }

"--("
    {

        //console.log('MULTILINE COMMENT (START)', yytext.split());

        this.pushState('MULTILINE_COMMENT');
    }

<MULTILINE_COMMENT>(.|[\n])*?(?=")--")
    {

        //console.log('MULTILINE COMMENT', yytext.split());

    }

<MULTILINE_COMMENT>")--"
    {

        //console.log('MULTILINE COMMENT (END)', yytext.split());

        this.popState();
    }

("0x"[0-9A-F]+)|([0-9]+)
    {

        //console.log('INTEGER_SINGLE_SIGNED', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'INTEGER_SINGLE_SIGNED';
    }

(("0x"[0-9A-F]+)|([0-9]+))"u"
    {

        //console.log('INTEGER_SINGLE_UNSIGNED', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'INTEGER_SINGLE_UNSIGNED';
    }

(("0x"[0-9A-F]+)|([0-9]+))"d"
    {

        //console.log('INTEGER_DOUBLE', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'INTEGER_DOUBLE';
    }

[0-9]+"."[0-9]+
    {
        //console.log('FLOATING_POINT_SINGLE', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'FLOATING_POINT_SINGLE';
    }

([0-9]+"."[0-9]+)"d"
    {

        //console.log('FLOATING_POINT_DOUBLE');

        yy.parser.yy.location = yylloc;
        return 'FLOATING_POINT_DOUBLE';
    }

"'"
    {

        //console.log('INLINE_TEXT (start)', yytext.split());

        this.pushState('INLINE_TEXT');
        yy.parser.yy.location = yylloc;
        return yytext;
    }

<INLINE_TEXT>[^\'\\\n]+
    {

        //console.log('INLINE_TEXT', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'INLINE_TEXT';
    }

<INLINE_TEXT,MULTILINE_TEXT>[\\].
    {

        //console.log(yy.lexer.conditionStack[yy.lexer.conditionStack.length - 1], yytext.split());

        var conditionStack = yy.lexer.conditionStack;
        var token = conditionStack[conditionStack.length - 1];

        if (yytext === '\\0') {
            yytext = String.fromCodePoint(0);
        } else if (yytext === '\\\'') {
            yytext = String.fromCodePoint(39);
        } else if (yytext === '\\\"') {
            yytext = String.fromCodePoint(34);
        } else if (yytext === '\\\\') {
            yytext = String.fromCodePoint(92);
        } else if (yytext === '\\n') {
            yytext = String.fromCodePoint(10);
        } else if (yytext === '\\r') {
            yytext = String.fromCodePoint(13);
        } else if (yytext === '\\v') {
            yytext = String.fromCodePoint(11);
        } else if (yytext === '\\t') {
            yytext = String.fromCodePoint(9);
        } else if (yytext === '\\b') {
            yytext = String.fromCodePoint(8);
        } else if (yytext === '\\f') {
            yytext = String.fromCodePoint(12);
        } else {
            yytext = yytext.slice(1);
        }
        yy.parser.yy.location = yylloc;
        return token;
    }

<INLINE_TEXT,MULTILINE_TEXT>[\\]"u"[0-9]+
    {

        //console.log(yy.lexer.conditionStack[yy.lexer.conditionStack.length - 1], yytext.split());

        var conditionStack = yy.lexer.conditionStack;
        var token = conditionStack[conditionStack.length - 1];
        var value = parseInt(yytext.slice(2), 10);

        if (value <= 1114111) {
            yytext = String.fromCodePoint(value);
        } else {
            token = 'UNICODE_CODE_POINT_INVALID';
        }
        yy.parser.yy.location = yylloc;
        return token;
    }

<INLINE_TEXT>"'"
    {

        //console.log('INLINE_TEXT (end)', yytext.split());

        this.popState();
        yy.parser.yy.location = yylloc;
        return yytext;
    }

"\""
    {

        //console.log('MULTILINE_TEXT (start)', yytext.split());

        this.pushState('MULTILINE_TEXT');
        yy.parser.yy.location = yylloc;
        return yytext;
    }

<MULTILINE_TEXT>[^\"\\]+
    {

        //console.log('MULTILINE_TEXT', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'MULTILINE_TEXT';
    }

<MULTILINE_TEXT>"\""
    {

        //console.log('MULTILINE_TEXT (end)', yytext.split());

        this.popState();
        yy.parser.yy.location = yylloc;
        return yytext;
    }

","|"|"|"["|"]"|"->"|":="|"="|"&"|"("|")"|"."
    {

        //console.log('SYMBOL', yytext.split());

        yy.parser.yy.location = yylloc;
        return yytext;
    }

"-"|"+"|"*"|"/"|"%"|"=="|"!="|"<="|">="|"<"|">"
    {

        //console.log('OPERATOR', yytext.split());

        yy.parser.yy.location = yylloc;
        return yytext;
    }

" - "
    {

        //console.log('OPERATOR', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'SUBTRACTION';
    }

"not"|"and"|"or"
    {

        //console.log('OPERATOR', yytext.split());

        yy.parser.yy.location = yylloc;
        return yytext;
    }

"$id"|"$iu"|"$i"|"$fd"|"$f"|"$b"|"$s"
    {

        //console.log('BASIC_TYPE', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'BASIC_TYPE';
    }

"false"|"true"
    {

        //console.log('BOOLEAN', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'BOOLEAN';
    }

"use"|"as"|"from"|"at"|"let"|"nothing"|"if"|"else"|"while"|"return"
    {

        //console.log('KEYWORD', yytext.split());

        yy.parser.yy.location = yylloc;
        return yytext;
    }

"constant"|"private"
    {

        //console.log('MODIFIER', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'MODIFIER';
    }

"$"[a-zA-Z0-9_$]+
    {

        //console.log('INSTRUCTION', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'INSTRUCTION';
    }

[a-zA-Z]("-"?[a-zA-Z0-9]+)*
    {

        //console.log('IDENTIFIER', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'IDENTIFIER';
    }

<*>.|[\n]
    {

        //console.log('ERROR', yytext.split());

        var token = yytext;

        if (yytext === '\n') {
            token = 'LINE';
        }
        yy.parser.yy.location = yylloc;
        return token;
    }

%%

/* The list of lengths of 'tails' */
/* Here, a 'tail' is a synonym for either an indentation or outdentation */
var $tailLengthList = [0];

/lex

/* Associativity and precedence (low to high) */
%left 'or'
%left 'and'
%left '==' '!='
%left '<' '>' '<=' '>='
%left SUBTRACTION '+'
%left '*' '/' '%'
%right UNARY_NEGATION LOGICAL_NEGATION
%nonassoc '(' ')'

%start moduleStmt

/* This option enables us to return both a token and a list of tokens from the lexer */
%options token-stack

/* Language grammar */

%%

/* The module statement */
moduleStmt
    : lineList moduleBlock eof
        {
            /* Basic types */
            var typeNodeListNode = yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$s').id
            ], '');

            /* Instructions and built-in functions */
            var functionNodeListNode = yy.getNewNode(yy.compiler, yy.module, 'list', @0, [

                /* $sub | [$i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $sub | [$iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $sub | [$id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $sub | [$f] -> [$f] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                    ], '').id
                ], '').id,

                /* $sub | [$fd] -> [$fd] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                    ], '').id
                ], '').id,

                /* $sub | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $sub | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $sub | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $sub | [$f, $f] -> [$f] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                    ], '').id
                ], '').id,

                /* $sub | [$fd, $fd] -> [$fd] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$sub').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                    ], '').id
                ], '').id,

                /* $add | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$add').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $add | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$add').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $add | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$add').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $add | [$f, $f] -> [$f] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$add').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                    ], '').id
                ], '').id,

                /* $add | [$fd, $fd] -> [$fd] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$add').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                    ], '').id
                ], '').id,

                /* $mul | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$mul').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $mul | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$mul').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $mul | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$mul').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $mul | [$f, $f] -> [$f] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$mul').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                    ], '').id
                ], '').id,

                /* $mul | [$fd, $fd] -> [$fd] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$mul').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                    ], '').id
                ], '').id,

                /* $div | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$div').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $div | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$div').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $div | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$div').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $div | [$f, $f] -> [$f] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$div').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                    ], '').id
                ], '').id,

                /* $div | [$fd, $fd] -> [$fd] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$div').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                    ], '').id
                ], '').id,

                /* $rem | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$rem').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $rem | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$rem').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $rem | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$rem').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $eq | [$i, $i] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$eq').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $eq | [$iu, $iu] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$eq').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $eq | [$id, $id] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$eq').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $eq | [$f, $f] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$eq').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $eq | [$fd, $fd] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$eq').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ne | [$i, $i] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ne').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ne | [$iu, $iu] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ne').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ne | [$id, $id] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ne').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ne | [$f, $f] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ne').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ne | [$fd, $fd] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ne').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $lt | [$i, $i] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$lt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $lt | [$iu, $iu] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$lt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $lt | [$id, $id] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$lt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $lt | [$f, $f] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$lt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $lt | [$fd, $fd] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$lt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $gt | [$i, $i] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$gt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $gt | [$iu, $iu] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$gt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $gt | [$id, $id] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$gt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $gt | [$f, $f] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$gt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $gt | [$fd, $fd] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$gt').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $le | [$i, $i] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$le').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $le | [$iu, $iu] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$le').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $le | [$id, $id] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$le').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $le | [$f, $f] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$le').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $le | [$fd, $fd] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$le').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ge | [$i, $i] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ge').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ge | [$iu, $iu] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ge').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ge | [$id, $id] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ge').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ge | [$f, $f] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ge').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $ge | [$fd, $fd] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$ge').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $not | [$i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$not').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $not | [$iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$not').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $not | [$id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$not').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $not | [$b] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$not').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $and | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$and').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $and | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$and').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $and | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$and').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $and | [$b, $b] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$and').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $or | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$or').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $or | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$or').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $or | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$or').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $or | [$b, $b] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$or').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $store | [$iu, $i] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store | [$iu, $iu] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store | [$iu, $id] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store | [$iu, $f] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store | [$iu, $fd] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store | [$iu, $b] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store8 | [$iu, $i] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store8').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store8 | [$iu, $iu] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store8').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store16 | [$iu, $i] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store16').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $store16 | [$iu, $iu] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$store16').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* $load_$i | [$iu] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load_$i').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $load_$iu | [$iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load_$iu').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $load_$id | [$iu] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load_$id').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $load_$f | [$iu] -> [$f] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load_$f').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                    ], '').id
                ], '').id,

                /* $load_$fd | [$iu] -> [$fd] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load_$fd').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                    ], '').id
                ], '').id,

                /* $load_$b | [$iu] -> [$b] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load_$b').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                    ], '').id
                ], '').id,

                /* $load8_$i | [$iu] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load8_$i').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $load8_$iu | [$iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load8_$iu').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $load16_$i | [$iu] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load16_$i').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $load16_$iu | [$iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$load16_$iu').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $growMemory | [$iu] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$growMemory').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $getMemorySize | [] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$getMemorySize').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $shl | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$shl').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $shl | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$shl').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $shl | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$shl').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $shr | [$i, $i] -> [$i] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$shr').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                    ], '').id
                ], '').id,

                /* $shr | [$iu, $iu] -> [$iu] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$shr').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                    ], '').id
                ], '').id,

                /* $shr | [$id, $id] -> [$id] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$shr').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                    ], '').id
                ], '').id,

                /* $copyMemory | [$iu, $iu, $iu] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], '$copyMemory').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id,
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* show | [$i] -> []  */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], 'show').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$i').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* show | [$iu] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], 'show').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$iu').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* show | [$id] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], 'show').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$id').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* show | [$f] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], 'show').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$f').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* show | [$fd] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], 'show').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$fd').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* show | [$b] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], 'show').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$b').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id,

                /* show | [$s] -> [] */
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                    ], '').id,
                    yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], 'show').id,
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$s').id
                        ], '').id,
                        yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                    ], '').id
                ], '').id
            ], '');

            var moduleStmtNode = yy.getNewNode(yy.compiler, yy.module, 'moduleStmt', @0, [typeNodeListNode.id, functionNodeListNode.id].concat($2), '');

            yy.setMainNode(yy.compiler, yy.module, moduleStmtNode);
            $$ = [moduleStmtNode.id];
        }
    ;

lineList
    : nonEmptyLineList
    |
    ;

nonEmptyLineList
    : nonEmptyLineList line
    | line
    ;

line
    : LINE
    ;

moduleBlock
    : moduleBody
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'moduleBlock', @0, $1, '').id
            ];
        }
    ;

moduleBody
    : nonEmptyImportStmtList nonEmptyInitializationStmtList nonEmptyFunctionStmtList
        {
            $$ = $1.concat($2, $3);
        }
    | nonEmptyImportStmtList nonEmptyInitializationStmtList
        {
            $$ = $1.concat($2);
        }
    | nonEmptyImportStmtList nonEmptyFunctionStmtList
        {
            $$ = $1.concat($2);
        }
    | nonEmptyInitializationStmtList nonEmptyFunctionStmtList
        {
            $$ = $1.concat($2);
        }
    | nonEmptyInitializationStmtList
    | nonEmptyFunctionStmtList
    ;

nonEmptyImportStmtList
    : nonEmptyImportStmtList importStmt
        {
            $$ = $1.concat($2);
        }
    | importStmt
    ;

nonEmptyInitializationStmtList
    : nonEmptyInitializationStmtList initializationStmt
        {
            $$ = $1.concat($2);
        }
    | initializationStmt
    ;

nonEmptyFunctionStmtList
    : nonEmptyFunctionStmtList functionStmt
        {
            $$ = $1.concat($2);
        }
    | functionStmt
    ;

eof
    : EOF
    ;

/* The import statement */
importStmt
    : importHead nonEmptyLineList
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'importStmt', @0, $1, '').id
            ];
        }
    ;

importHead
    : 'use' nonEmptyExternalObjectList 'from' identifier 'at' path
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, $2, '').id,
                yy.getNewNode(yy.compiler, yy.module, 'submodule', @4, $4.concat($6), '').id
            ];
        }
    | 'use' nonEmptyExternalObjectList 'from' identifier
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, $2, '').id,
                yy.getNewNode(yy.compiler, yy.module, 'submodule', @4, $4.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'path', @0, [], '').id
                ]), '').id
            ];
        }
    | 'use' identifier 'at' path
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id,
                yy.getNewNode(yy.compiler, yy.module, 'submodule', @2, $2.concat($4), '').id
            ];
        }
    | 'use' identifier
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id,
                yy.getNewNode(yy.compiler, yy.module, 'submodule', @2, $2.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'path', @0, [], '').id
                ]), '').id
            ];
        }
    ;

nonEmptyExternalObjectList
    : nonEmptyExternalObjectList ',' externalObject
        {
            $$ = $1.concat($3);
        }
    | externalObject
    ;

externalObject
    : externalName 'as' externalName '|' type
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'externalObject', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'object', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                                yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                            ], '').id
                        ].concat($3, $5), '').id
                    ], '').id
                ]), '').id
            ];
        }
    | externalName 'as' externalName
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'externalObject', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'object', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                                yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                            ], '').id
                        ].concat($3, [-1]), '').id
                    ], '').id
                ]), '').id
            ];
        }
    | externalName '|' type
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'externalObject', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'object', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                                yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                            ], '').id
                        ].concat($1, $3), '').id
                    ], '').id
                ]), '').id
            ];
        }
    | externalName
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'externalObject', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'object', @0, [
                            yy.getNewNode(yy.compiler, yy.module, 'list', @0, [
                                yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], 'private').id
                            ], '').id
                        ].concat($1, [-1]), '').id
                    ], '').id
                ]), '').id
            ];
        }
    ;

externalName
    : identifier
    | operator
    ;

identifier
    : IDENTIFIER
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'identifier', @0, [], $1).id
            ];
        }
    ;

operator
    : '-'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], $1).id
            ];
        }
    | SUBTRACTION
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '-').id
            ];
        }
    | '+'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '+').id
            ];
        }
    | '*'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '*').id
            ];
        }
    | '/'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '/').id
            ];
        }
    | '%'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '%').id
            ];
        }
    | '=='
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '==').id
            ];
        }
    | '!='
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '!=').id
            ];
        }
    | '<'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '<').id
            ];
        }
    | '>'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '>').id
            ];
        }
    | '<='
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '<=').id
            ];
        }
    | '>='
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '>=').id
            ];
        }
    | 'not'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], 'not').id
            ];
        }
    | 'and'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], 'and').id
            ];
        }
    | 'or'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], 'or').id
            ];
        }
    ;

type
    : nonReferenceType
    | referenceType
    ;

nonReferenceType
    : basicType
    ;

basicType
    : BASIC_TYPE
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], $1).id
            ];
        }
    ;

referenceType
    : referenceTypeFrom '->' referenceTypeTo
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, $1.concat($3), '').id
            ];
        }
    ;

referenceTypeFrom
    : '[' typeList ']'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, $2, '').id
            ];
        }
    ;

typeList
    : nonEmptyTypeList
    |
        {
            $$ = [];
        }
    ;

nonEmptyTypeList
    : nonEmptyTypeList ',' type
        {
            $$ = $1.concat($3);
        }
    | type
    ;

referenceTypeTo
    : '[' type ']'
        {
            $$ = $2;
        }
    | '[' ']'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
            ];
        }
    ;

path
    : "'" inlineText "'"
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'path', @0, [], $2.trim()).id
            ];
        }
    ;

inlineText
    : inlineText INLINE_TEXT
        {
            $$ = $1 + $2;
        }
    | INLINE_TEXT
    ;

/* The initialization statement */
initializationStmt
    : initializationHead nonEmptyLineList
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'initializationStmt', @0, $1, '').id
            ];
        }
    ;

initializationHead
    : nonEmptyModifierList identifier ':=' expr '|' type
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'variable', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1, '').id
                ].concat($2, $6), '').id
            ].concat($4);
        }
    | nonEmptyModifierList identifier ':=' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'variable', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1, '').id
                ].concat($2, [
                    yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                ]), '').id
            ].concat($4);
        }
    | identifier ':=' expr '|' type
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'variable', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id
                ].concat($1, $5), '').id
            ].concat($3);
        }
    | identifier ':=' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'variable', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id
                ].concat($1, [
                    yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
                ]), '').id
            ].concat($3);
        }
    ;

nonEmptyModifierList
    : nonEmptyModifierList modifier
        {
            $$ = $1.concat($2);
        }
    | modifier
    ;

modifier
    : MODIFIER
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'modifier', @0, [], $1).id
            ];
        }
    ;

/* The function statement */
functionStmt
    : functionHead nonEmptyLineList nonModuleBlock
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'functionStmt', @0, $1.concat($3), '').id
            ];
        }
    ;

functionHead
    : functionHeadMandatoryPart functionHeadOptionalPart
        {
            var variableNodeListNode = yy.getNodeById(yy.compiler, yy.module, $2[0]);
            var fromTypeNodeIdList = [];
            var toTypeNodeId = $2[1];

            for (var i = 0; i < variableNodeListNode.childIdList.length; i++) {
                var variableNode = yy.getNodeById(yy.compiler, yy.module, variableNodeListNode.childIdList[i]);
                var fromTypeNodeId = variableNode.childIdList[2];

                fromTypeNodeIdList.push(fromTypeNodeId);
            }
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'function', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'referenceType', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'list', @0, fromTypeNodeIdList, '').id,
                        toTypeNodeId
                    ], '').id
                ]), '').id,
                variableNodeListNode.id
            ];
        }
    ;

functionHeadMandatoryPart
    : nonEmptyModifierList 'let' identifier
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1, '').id
            ].concat($3);
        }
    | nonEmptyModifierList 'let' operator
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1, '').id
            ].concat($3);
        }
    | 'let' identifier
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id
            ].concat($2);
        }
    | 'let' operator
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id
            ].concat($2);
        }
    ;

functionHeadOptionalPart
    : '[' paramList ']' '|' type
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, $2, '').id
            ].concat($5);
        }
    | '[' paramList ']'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, $2, '').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
            ];
        }
    | '|' type
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id
            ].concat($2);
        }
    |
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id,
                yy.getNewNode(yy.compiler, yy.module, 'basicType', @0, [], '$v').id
            ];
        }
    ;

paramList
    : nonEmptyParamList
    |
        {
            $$ = [];
        }
    ;

nonEmptyParamList
    : nonEmptyParamList ',' param
        {
            $$ = $1.concat($3);
        }
    | param
    ;

param
    : identifier '|' type
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'variable', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, [], '').id
                ].concat($1, $3), '').id
            ];
        }
    ;

nonModuleBlock
    : indent lineList nonModuleBody outdent lineList
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'nonModuleBlock', @0, $3, '').id
            ];
        }
    ;

indent
    : INDENT
    ;

nonModuleBody
    : nonEmptyNonBranchingStmtList branchingStmt
        {
            $$ = $1.concat($2);
        }
    | nonEmptyNonBranchingStmtList
    | branchingStmt
    ;

nonEmptyNonBranchingStmtList
    : nonEmptyNonBranchingStmtList nonBranchingStmt
        {
            $$ = $1.concat($2);
        }
    | nonBranchingStmt
    ;

nonBranchingStmt
    : initializationStmt
    | assignmentStmt
    | exprStmt
    | nothingStmt
    | ifElseStmt
    | whileStmt
    ;

branchingStmt
    : returnStmt
    ;

outdent
    : OUTDENT
    ;

/* The assignment statement */
assignmentStmt
    : assignmentHead nonEmptyLineList
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'assignmentStmt', @0, $1, '').id
            ];
        }
    ;

assignmentHead
    : identifier '=' expr
        {
            $$ = $1.concat($3);
        }
    ;

/* The expression statement */
exprStmt
    : exprHead nonEmptyLineList
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'exprStmt', @0, $1, '').id
            ];
        }
    ;

exprHead
    : expr
    ;

/* The statement 'nothing' */
nothingStmt
    : nothingHead nonEmptyLineList
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'nothingStmt', @0, [], '').id
            ];
        }
    ;

nothingHead
    : 'nothing'
    ;

/* The statement 'if-else' */
ifElseStmt
    : ifExprStmt nonEmptyElseExprStmtList elseStmt
        {
            var elseListNodeId = $3[0];

            for (var i = $2.length - 1; i > -1; i = i - 2) {
                var exprNodeId = $2[i - 1];
                var ifListNodeId = $2[i];

                elseListNodeId = yy.getNewNode(yy.compiler, yy.module, 'nonModuleBlock', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'ifElseStmt', @0, [
                        exprNodeId,
                        ifListNodeId,
                        elseListNodeId
                    ], '').id
                ], '').id;
            }
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'ifElseStmt', @0, $1.concat([
                    elseListNodeId
                ]), '').id
            ];
        }
    | ifExprStmt nonEmptyElseExprStmtList
        {
            var elseListNodeId = yy.getNewNode(yy.compiler, yy.module, 'nonModuleBlock', @0, [
                yy.getNewNode(yy.compiler, yy.module, 'nothingStmt', @0, [], '').id
            ], '').id;

            for (var i = $2.length - 1; i > -1; i = i - 2) {
                var exprNodeId = $2[i - 1];
                var ifListNodeId = $2[i];

                elseListNodeId = yy.getNewNode(yy.compiler, yy.module, 'nonModuleBlock', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'ifElseStmt', @0, [
                        exprNodeId,
                        ifListNodeId,
                        elseListNodeId
                    ], '').id
                ], '').id;
            }
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'ifElseStmt', @0, $1.concat([
                    elseListNodeId
                ]), '').id
            ];
        }
    | ifExprStmt elseStmt
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'ifElseStmt', @0, $1.concat($2), '').id
            ];
        }
    | ifExprStmt
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'ifElseStmt', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'nonModuleBlock', @0, [
                        yy.getNewNode(yy.compiler, yy.module, 'nothingStmt', @0, [], '').id
                    ], '').id
                ]), '').id
            ];
        }
    ;

ifExprStmt
    : ifExprHead nonEmptyLineList nonModuleBlock
        {
            $$ = $1.concat($3);
        }
    ;

ifExprHead
    : 'if' expr
        {
            $$ = $2;
        }
    ;

nonEmptyElseExprStmtList
    : nonEmptyElseExprStmtList elseExprStmt
        {
            $$ = $1.concat($2);
        }
    | elseExprStmt
    ;

elseExprStmt
    : elseExprHead nonEmptyLineList nonModuleBlock
        {
            $$ = $1.concat($3);
        }
    ;

elseExprHead
    : 'else' expr
        {
            $$ = $2;
        }
    ;

elseStmt
    : elseHead nonEmptyLineList nonModuleBlock
        {
            $$ = $3;
        }
    ;

elseHead
    : 'else'
    ;

/* The statement 'while' */
whileStmt
    : whileHead nonEmptyLineList nonModuleBlock
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'whileStmt', @0, $1.concat($3), '').id
            ];
        }
    ;

whileHead
    : 'while' expr
        {
            $$ = $2;
        }
    ;

/* The statement 'return' */
returnStmt
    : returnHead nonEmptyLineList
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'returnStmt', @0, $1, '').id
            ];
        }
    ;

returnHead
    : 'return' expr
        {
            $$ = $2;
        }
    | 'return'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'void', @0, [], '').id
            ];
        }
    ;

/* Expressions */
expr
    : value
    | reference
    | arithmetic
    | comparison
    | logical
    | name
    | call
    | grouping
    ;

/* Literal values */
value
    : integerSingleSigned
    | integerSingleUnsigned
    | integerDouble
    | floatingPointSingle
    | floatingPointDouble
    | boolean
    | stringNonInterpolated
    ;

integerSingleSigned
    : INTEGER_SINGLE_SIGNED
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'integerSingleSigned', @0, [], $1).id
            ];
        }
    ;

integerSingleUnsigned
    : INTEGER_SINGLE_UNSIGNED
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'integerSingleUnsigned', @0, [], $1.slice(0, -1)).id
            ];
        }
    ;

integerDouble
    : INTEGER_DOUBLE
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'integerDouble', @0, [], $1.slice(0, -1)).id
            ];
        }
    ;

floatingPointSingle
    : FLOATING_POINT_SINGLE
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'floatingPointSingle', @0, [], $1).id
            ];
        }
    ;

floatingPointDouble
    : FLOATING_POINT_DOUBLE
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'floatingPointDouble', @0, [], $1.slice(0, -1)).id
            ];
        }
    ;

boolean
    : BOOLEAN
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'boolean', @0, [], $1).id
            ];
        }
    ;

stringNonInterpolated
    : string
        {
            /* Based on empirical experiments using node v18.18.0 and npm v9.8.1, a non-interpolated string may contain at most 3355429 characters of the English alphabet */
            /* If there are more characters, the parser throws the error 'Maximum call stack size exceeded' */

            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'stringNonInterpolated', @0, $1, '').id
            ];
        }
    ;

string
    : "'" inlineText "'"
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'string', @0, [], $2).id
            ];
        }
    | "'" "'"
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'string', @0, [], '').id
            ];
        }
    | '"' multilineText '"'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'string', @0, [], $2).id
            ];
        }
    | '"' '"'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'string', @0, [], '').id
            ];
        }
    ;

multilineText
    : multilineText MULTILINE_TEXT
        {
            $$ = $1 + $2;
        }
    | MULTILINE_TEXT
    ;

/* The reference expression */
reference
    : '&' identifier
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'reference', @0, $2, '').id
            ];
        }
    | '&' externalIdentifier
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'reference', @0, $2, '').id
            ];
        }
    ;

externalIdentifier
    : identifier '.' identifier
        {
            var submoduleNameNode = yy.getNodeById(yy.compiler, yy.module, $1[0]);
            var externalNameNode = yy.getNodeById(yy.compiler, yy.module, $3[0]);

            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'externalIdentifier', @0, $1.concat($3), submoduleNameNode.value + '.' + externalNameNode.value).id
            ];
        }
    ;

/* Arithmetic expressions */
arithmetic
    : '-' expr %prec UNARY_NEGATION
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '-').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $2, '').id
                ], '').id
            ];
        }
    | expr SUBTRACTION expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '-').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '+' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '+').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '*' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '*').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '/' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '/').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '%' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '%').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    ;

/* Comparison expressions */
comparison
    : expr '==' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '==').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '!=' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '!=').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '<' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '<').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '>' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '>').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '<=' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '<=').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '>=' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], '>=').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    ;

/* Logical expressions */
logical
    : 'not' expr %prec LOGICAL_NEGATION
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], 'not').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $2, '').id
                ], '').id
            ];
        }
    | expr 'and' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], 'and').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr 'or' expr
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, [
                    yy.getNewNode(yy.compiler, yy.module, 'operator', @0, [], 'or').id,
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    ;

/* The name expression */
name
    : identifier
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'name', @0, $1, '').id
            ];
        }
    | instruction
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'name', @0, $1, '').id
            ];
        }
    | externalIdentifier
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'name', @0, $1, '').id
            ];
        }
    ;

instruction
    : INSTRUCTION
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'instruction', @0, [], $1).id
            ];
        }
    ;

/* The call expression */
call
    : callByName
    | callByExpression
    ;

callByName
    : identifier '[' argList ']'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $3, '').id
                ]), '').id
            ];
        }
    | instruction '[' argList ']'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $3, '').id
                ]), '').id
            ];
        }
    | externalIdentifier '[' argList ']'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByName', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $3, '').id
                ]), '').id
            ];
        }
    ;

callByExpression
    : call '[' argList ']'
        {
            $$ = [
                yy.getNewNode(yy.compiler, yy.module, 'callByExpression', @0, $1.concat([
                    yy.getNewNode(yy.compiler, yy.module, 'list', @0, $3, '').id
                ]), '').id
            ];
        }
    ;

argList
    : nonEmptyArgList
    |
        {
            $$ = [];
        }
    ;

nonEmptyArgList
    : nonEmptyArgList ',' arg
        {
            $$ = $1.concat($3);
        }
    | arg
    ;

arg
    : expr
    ;

/* The grouping expression */
grouping
    : '(' expr ')'
        {
            $$ = $2;
        }
    ;

%%

/* We rewrite the function 'parseError' in order to provide our own error messages */
parser.parseError = function(str, hash) {
    var getTokenText = function(token) {
        var tokenText = '\'' + token + '\'';

        if (token === 'EOF') {
            tokenText = 'end of file';
        } else if (token === 'LINE') {
            tokenText = 'new line';
        } else if (token === 'INDENTATION_SPACE_CHARACTER') {
            tokenText = 'unexpected space character(s) in an indentation or outdentation'
                + '; expected vertical tab character(s) only';
        } else if (token === 'INDENTATION_TOO_LONG') {
            tokenText = 'the indentation is too long';
        } else if (token === 'INDENT') {
            tokenText = 'indentation';
        } else if (token === 'OUTDENT') {
            tokenText = 'outdentation';
        } else if (token === 'BASIC_TYPE') {
            tokenText = 'type';
        } else if (token === 'INLINE_TEXT') {
            tokenText = 'text';
        } else if (token === 'MULTILINE_TEXT') {
            tokenText = 'text';
        } else if (token === 'MODIFIER') {
            tokenText = 'modifier';
        } else if (token === 'IDENTIFIER') {
            tokenText = 'identifier';
        } else if (token === 'INSTRUCTION') {
            tokenText = 'instruction';
        } else if (token === 'INTEGER_SINGLE_SIGNED') {
            tokenText = 'integer value';
        } else if (token === 'INTEGER_SINGLE_UNSIGNED') {
            tokenText = 'integer value';
        } else if (token === 'INTEGER_DOUBLE') {
            tokenText = 'integer value';
        } else if (token === 'FLOATING_POINT_SINGLE') {
            tokenText = 'floating-point value';
        } else if (token === 'FLOATING_POINT_DOUBLE') {
            tokenText = 'floating-point value';
        } else if (token === 'BOOLEAN') {
            tokenText = 'boolean value';
        } else if (token === 'SUBTRACTION') {
            tokenText = 'subtraction operator \'-\'';
        } else if (token === 'UNICODE_CODE_POINT_INVALID') {
            tokenText = 'Unicode code point is out of bounds';
        }
        return tokenText;
    };
    var getTokenTextList = function(hash) {
        var tokenTextList = [];

        if (('expected' in hash) && (hash.expected.length > 0)) {
            var length = Math.min(3, hash.expected.length);

            for (var i = 0; i < length; i++) {
                tokenTextList.push(getTokenText(hash.expected[i].slice(1, -1)));
            }
        }
        return tokenTextList;
    };
    var getMessage = function(hash) {
        var message = '';

        if ((hash.token === 'INDENTATION_SPACE_CHARACTER') || (hash.token === 'INDENTATION_TOO_LONG') || (hash.token === 'UNICODE_CODE_POINT_INVALID')) {
            message = getTokenText(hash.token);
        } else {
            var tokenTextList = getTokenTextList(hash);

            message = 'unexpected ' + getTokenText(hash.token);
            if (tokenTextList.length > 0) {
                message += '; expected ' + tokenTextList.join(', ');
            }
        }
        return message;
    };
    var getLocation = function(token) {
        var location = this.yy.location;

        if (token === 'LINE') {
            location = {
                first_line: location.first_line,
                last_line: location.first_line,
                first_column: 0,
                last_column: 0
            };
        } else if ((token === 'INDENTATION_SPACE_CHARACTER') || (token === 'INDENTATION_TOO_LONG') || (token === 'INDENT') || (token === 'OUTDENT')) {
            location = {
                first_line: location.last_line,
                last_line: location.last_line,
                first_column: 0,
                last_column: location.last_column
            };
        }
        return location;
    };
    var getNote = function(token) {
        var note = undefined;

        if (token === 'UNICODE_CODE_POINT_INVALID') {
            note = 'Unicode code point must be an integer between 0 and 1114111';
        }
        return note;
    };

    //console.log(hash);

    throw {
        code: 'E_PARSE_' + hash.token,
        message: getMessage(hash),
        location: getLocation.call(this, hash.token),
        note: getNote(hash.token)
    };
};
