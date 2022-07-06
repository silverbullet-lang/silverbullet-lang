/* Lexical grammar */

%lex

/* Use the rule with the longest match instead of the first match */
%options flex

/* States */
%x INLINE_COMMENT MULTILINE_COMMENT
%x TEXT

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
        //console.log('TEXT (start)', yytext.split());

        this.pushState('TEXT');
        yy.parser.yy.location = yylloc;
        return yytext;
    }

<TEXT>([^\'\n\\]|\\.)+
    {

        //console.log('TEXT', yytext.split());

        yy.parser.yy.location = yylloc;
        return 'TEXT';
    }

<TEXT>"'"
    {

        //console.log('TEXT (end)', yytext.split());

        this.popState();
        yy.parser.yy.location = yylloc;
        return yytext;
    }

","|"|"|"["|"]"|"->"|":="|"="|"&"|"("|")"
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

"$id"|"$iu"|"$i"|"$fd"|"$f"|"$b"
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

"use"|"at"|"let"|"nothing"|"if"|"else"|"while"|"return"
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
            $$ = [
                yy.module.getNewNode('moduleStmt', @0, $2, '').id
            ];
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
                yy.module.getNewNode('moduleBlock', @0, $1, '').id
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
                yy.module.getNewNode('importStmt', @0, $1, '').id
            ];
        }
    ;

importHead
    : 'use' nonEmptyObjectList 'at' path
        {
            $$ = [
                yy.module.getNewNode('list', @0, $2, '').id
            ].concat($4);
        }
    ;

nonEmptyObjectList
    : nonEmptyObjectList ',' object
        {
            $$ = $1.concat($3);
        }
    | object
    ;

object
    : variable
    | function
    ;

variable
    : nonEmptyModifierList identifier '|' nonReferenceType
        {
            $$ = [
                yy.module.getNewNode('variable', @0, [
                    yy.module.getNewNode('list', @0, $1, '').id
                ].concat($2, $4), '').id
            ];
        }
    | identifier '|' nonReferenceType
        {
            $$ = [
                yy.module.getNewNode('variable', @0, [
                    yy.module.getNewNode('list', @0, [], '').id
                ].concat($1, $3), '').id
            ];
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
                yy.module.getNewNode('modifier', @0, [], $1).id
            ];
        }
    ;

identifier
    : IDENTIFIER
        {
            $$ = [
                yy.module.getNewNode('identifier', @0, [], $1).id
            ];
        }
    ;

nonReferenceType
    : basicType
    ;

basicType
    : BASIC_TYPE
        {
            $$ = [
                yy.module.getNewNode('basicType', @0, [], $1).id
            ];
        }
    ;

referenceType
    : from '->' to
        {
            $$ = [
                yy.module.getNewNode('referenceType', @0, $1.concat($3), '').id
            ];
        }
    ;

from
    : '[' typeList ']'
        {
            $$ = [
                yy.module.getNewNode('list', @0, $2, '').id
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

type
    : nonReferenceType
    | referenceType
    ;

to
    : '[' type ']'
        {
            $$ = $2;
        }
    | '[' ']'
        {
            $$ = [
                yy.module.getNewNode('basicType', @0, [], '$v').id
            ];
        }
    ;

function
    : nonEmptyModifierList identifier '|' referenceType
        {
            $$ = [
                yy.module.getNewNode('function', @0, [
                    yy.module.getNewNode('list', @0, $1, '').id
                ].concat($2, $4), '').id
            ];
        }
    | nonEmptyModifierList operator '|' referenceType
        {
            $$ = [
                yy.module.getNewNode('function', @0, [
                    yy.module.getNewNode('list', @0, $1, '').id
                ].concat($2, $4), '').id
            ];
        }
    | identifier '|' referenceType
        {
            $$ = [
                yy.module.getNewNode('function', @0, [
                    yy.module.getNewNode('list', @0, [], '').id
                ].concat($1, $3), '').id
            ];
        }
    | operator '|' referenceType
        {
            $$ = [
                yy.module.getNewNode('function', @0, [
                    yy.module.getNewNode('list', @0, [], '').id
                ].concat($1, $3), '').id
            ];
        }
    ;

operator
    : '-'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], $1).id
            ];
        }
    | SUBTRACTION
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '-').id
            ];
        }
    | '+'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '+').id
            ];
        }
    | '*'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '*').id
            ];
        }
    | '/'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '/').id
            ];
        }
    | '%'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '%').id
            ];
        }
    | '=='
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '==').id
            ];
        }
    | '!='
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '!=').id
            ];
        }
    | '<'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '<').id
            ];
        }
    | '>'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '>').id
            ];
        }
    | '<='
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '<=').id
            ];
        }
    | '>='
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], '>=').id
            ];
        }
    | 'not'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], 'not').id
            ];
        }
    | 'and'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], 'and').id
            ];
        }
    | 'or'
        {
            $$ = [
                yy.module.getNewNode('operator', @0, [], 'or').id
            ];
        }
    ;

path
    : "'" TEXT "'"
        {
            $$ = [
                yy.module.getNewNode('path', @0, [], $2.trim()).id
            ];
        }
    ;

/* The initialization statement */
initializationStmt
    : initializationHead nonEmptyLineList
        {
            $$ = [
                yy.module.getNewNode('initializationStmt', @0, $1, '').id
            ];
        }
    ;

initializationHead
    : nonEmptyModifierList identifier ':=' expr '|' type
        {
            $$ = [
                yy.module.getNewNode('variable', @0, [
                    yy.module.getNewNode('list', @0, $1, '').id
                ].concat($2, $6), '').id
            ].concat($4);
        }
    | nonEmptyModifierList identifier ':=' expr
        {
            $$ = [
                yy.module.getNewNode('variable', @0, [
                    yy.module.getNewNode('list', @0, $1, '').id
                ].concat($2, [
                    yy.module.getNewNode('basicType', @0, [], '$v').id
                ]), '').id
            ].concat($4);
        }
    | identifier ':=' expr '|' type
        {
            $$ = [
                yy.module.getNewNode('variable', @0, [
                    yy.module.getNewNode('list', @0, [], '').id
                ].concat($1, $5), '').id
            ].concat($3);
        }
    | identifier ':=' expr
        {
            $$ = [
                yy.module.getNewNode('variable', @0, [
                    yy.module.getNewNode('list', @0, [], '').id
                ].concat($1, [
                    yy.module.getNewNode('basicType', @0, [], '$v').id
                ]), '').id
            ].concat($3);
        }
    ;

/* The function statement */
functionStmt
    : functionHead nonEmptyLineList nonModuleBlock
        {
            $$ = [
                yy.module.getNewNode('functionStmt', @0, $1.concat($3), '').id
            ];
        }
    ;

functionHead
    : functionHeadMandatoryPart functionHeadOptionalPart
        {
            var variableNodeListNode = yy.module.getNodeById($2[0]);
            var fromTypeNodeIdList = [];
            var toTypeNodeId = $2[1];

            for (var i = 0; i < variableNodeListNode.childIdList.length; i++) {
                var variableNode = yy.module.getNodeById(variableNodeListNode.childIdList[i]);
                var fromTypeNodeId = variableNode.childIdList[2];

                fromTypeNodeIdList.push(fromTypeNodeId);
            }
            $$ = [
                yy.module.getNewNode('function', @0, $1.concat([
                    yy.module.getNewNode('referenceType', @0, [
                        yy.module.getNewNode('list', @0, fromTypeNodeIdList, '').id,
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
                yy.module.getNewNode('list', @0, $1, '').id
            ].concat($3);
        }
    | nonEmptyModifierList 'let' operator
        {
            $$ = [
                yy.module.getNewNode('list', @0, $1, '').id
            ].concat($3);
        }
    | 'let' identifier
        {
            $$ = [
                yy.module.getNewNode('list', @0, [], '').id
            ].concat($2);
        }
    | 'let' operator
        {
            $$ = [
                yy.module.getNewNode('list', @0, [], '').id
            ].concat($2);
        }
    ;

functionHeadOptionalPart
    : '[' paramList ']' '|' type
        {
            $$ = [
                yy.module.getNewNode('list', @0, $2, '').id
            ].concat($5);
        }
    | '[' paramList ']'
        {
            $$ = [
                yy.module.getNewNode('list', @0, $2, '').id,
                yy.module.getNewNode('basicType', @0, [], '$v').id
            ];
        }
    | '|' type
        {
            $$ = [
                yy.module.getNewNode('list', @0, [], '').id
            ].concat($2);
        }
    |
        {
            $$ = [
                yy.module.getNewNode('list', @0, [], '').id,
                yy.module.getNewNode('basicType', @0, [], '$v').id
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
                yy.module.getNewNode('variable', @0, [
                    yy.module.getNewNode('list', @0, [], '').id
                ].concat($1, $3), '').id
            ];
        }
    ;

nonModuleBlock
    : indent lineList nonModuleBody outdent lineList
        {
            $$ = [
                yy.module.getNewNode('nonModuleBlock', @0, $3, '').id
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
    | targetStmt
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
                yy.module.getNewNode('assignmentStmt', @0, $1, '').id
            ];
        }
    ;

assignmentHead
    : identifier '=' expr
        {
            $$ = $1.concat($3);
        }
    ;

/* The target statement */
targetStmt
    : targetHead nonEmptyLineList
        {
            $$ = [
                yy.module.getNewNode('targetStmt', @0, $1, '').id
            ];
        }
    ;

targetHead
    : target
    ;

/* The statement 'nothing' */
nothingStmt
    : nothingHead nonEmptyLineList
        {
            $$ = [
                yy.module.getNewNode('nothingStmt', @0, [], '').id
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

                elseListNodeId = yy.module.getNewNode('nonModuleBlock', @0, [
                    yy.module.getNewNode('ifElseStmt', @0, [
                        exprNodeId,
                        ifListNodeId,
                        elseListNodeId
                    ], '').id
                ], '').id;
            }
            $$ = [
                yy.module.getNewNode('ifElseStmt', @0, $1.concat([
                    elseListNodeId
                ]), '').id
            ];
        }
    | ifExprStmt nonEmptyElseExprStmtList
        {
            var elseListNodeId = yy.module.getNewNode('nonModuleBlock', @0, [
                yy.module.getNewNode('nothingStmt', @0, [], '').id
            ], '').id;

            for (var i = $2.length - 1; i > -1; i = i - 2) {
                var exprNodeId = $2[i - 1];
                var ifListNodeId = $2[i];

                elseListNodeId = yy.module.getNewNode('nonModuleBlock', @0, [
                    yy.module.getNewNode('ifElseStmt', @0, [
                        exprNodeId,
                        ifListNodeId,
                        elseListNodeId
                    ], '').id
                ], '').id;
            }
            $$ = [
                yy.module.getNewNode('ifElseStmt', @0, $1.concat([
                    elseListNodeId
                ]), '').id
            ];
        }
    | ifExprStmt elseStmt
        {
            $$ = [
                yy.module.getNewNode('ifElseStmt', @0, $1.concat($2), '').id
            ];
        }
    | ifExprStmt
        {
            $$ = [
                yy.module.getNewNode('ifElseStmt', @0, $1.concat([
                    yy.module.getNewNode('nonModuleBlock', @0, [
                        yy.module.getNewNode('nothingStmt', @0, [], '').id
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
                yy.module.getNewNode('whileStmt', @0, $1.concat($3), '').id
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
                yy.module.getNewNode('returnStmt', @0, $1, '').id
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
                yy.module.getNewNode('void', @0, [], '').id
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
    | target
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
    ;

integerSingleSigned
    : INTEGER_SINGLE_SIGNED
        {
            $$ = [
                yy.module.getNewNode('integerSingleSigned', @0, [], $1).id
            ];
        }
    ;

integerSingleUnsigned
    : INTEGER_SINGLE_UNSIGNED
        {
            $$ = [
                yy.module.getNewNode('integerSingleUnsigned', @0, [], $1.slice(0, -1)).id
            ];
        }
    ;

integerDouble
    : INTEGER_DOUBLE
        {
            $$ = [
                yy.module.getNewNode('integerDouble', @0, [], $1.slice(0, -1)).id
            ];
        }
    ;

floatingPointSingle
    : FLOATING_POINT_SINGLE
        {
            $$ = [
                yy.module.getNewNode('floatingPointSingle', @0, [], $1).id
            ];
        }
    ;

floatingPointDouble
    : FLOATING_POINT_DOUBLE
        {
            $$ = [
                yy.module.getNewNode('floatingPointDouble', @0, [], $1.slice(0, -1)).id
            ];
        }
    ;

boolean
    : BOOLEAN
        {
            $$ = [
                yy.module.getNewNode('boolean', @0, [], $1).id
            ];
        }
    ;

/* The reference expression */
reference
    : '&' identifier
        {
            $$ = [
                yy.module.getNewNode('reference', @0, $2, '').id
            ];
        }
    ;

/* Arithmetic expressions */
arithmetic
    : '-' expr %prec UNARY_NEGATION
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '-').id,
                    yy.module.getNewNode('list', @0, $2, '').id
                ], '').id
            ];
        }
    | expr SUBTRACTION expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '-').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '+' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '+').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '*' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '*').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '/' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '/').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '%' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '%').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    ;

/* Comparison expressions */
comparison
    : expr '==' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '==').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '!=' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '!=').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '<' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '<').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '>' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '>').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '<=' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '<=').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr '>=' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], '>=').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    ;

/* Logical expressions */
logical
    : 'not' expr %prec LOGICAL_NEGATION
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], 'not').id,
                    yy.module.getNewNode('list', @0, $2, '').id
                ], '').id
            ];
        }
    | expr 'and' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], 'and').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    | expr 'or' expr
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, [
                    yy.module.getNewNode('operator', @0, [], 'or').id,
                    yy.module.getNewNode('list', @0, $1.concat($3), '').id
                ], '').id
            ];
        }
    ;

/* The target expression */
target
    : name
    | call
    ;

name
    : identifier
        {
            $$ = [
                yy.module.getNewNode('name', @0, $1, '').id
            ];
        }
    | instruction
        {
            $$ = [
                yy.module.getNewNode('name', @0, $1, '').id
            ];
        }
    ;

instruction
    : INSTRUCTION
        {
            $$ = [
                yy.module.getNewNode('instruction', @0, [], $1).id
            ];
        }
    ;

call
    : callByName
    | callByExpression
    ;

callByName
    : identifier '[' argList ']'
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, $1.concat([
                    yy.module.getNewNode('list', @0, $3, '').id
                ]), '').id
            ];
        }
    | instruction '[' argList ']'
        {
            $$ = [
                yy.module.getNewNode('callByName', @0, $1.concat([
                    yy.module.getNewNode('list', @0, $3, '').id
                ]), '').id
            ];
        }
    ;

callByExpression
    : call '[' argList ']'
        {
            $$ = [
                yy.module.getNewNode('callByExpression', @0, $1.concat([
                    yy.module.getNewNode('list', @0, $3, '').id
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
        } else if (token === 'TEXT') {
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
        }
        return tokenText;
    };
    var getTokenTextList = function(hash) {
        let tokenTextList = [];

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

        if ((hash.token === 'INDENTATION_SPACE_CHARACTER') || (hash.token === 'INDENTATION_TOO_LONG')) {
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
        let note = undefined;

        return note;
    };

    //console.log(hash);

    this.yy.throwError(this.yy.module, {
        code: 'E_PARSE_' + hash.token,
        message: getMessage(hash),
        location: getLocation.call(this, hash.token),
        note: getNote(hash.token)
    });
};
