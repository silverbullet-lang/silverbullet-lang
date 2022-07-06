function getModule(url) {
    return {
        url: url,
        code: '',

        /* Nodes */
        nodes: {
            id: 0,
            list: [],
            stack: [-1]
        },
        getNewNode: function(name, location, childIdList, value) {
            let node = {
                id: this.nodes.id,
                name: name,
                location: location,
                childIdList: childIdList,
                value: value,
                status: 'CREATED',
                object: {
                    type: '',
                    id: -1
                },
                ir: -1
            };

            this.nodes.id++;
            this.nodes.list.push(node);
            return node;
        },
        getLastNode: function() {
            return this.getNodeById(this.nodes.list.length - 1);
        },
        getNodeById: function(id) {
            return this.nodes.list[id];
        },
        setActiveNodeList: function(idList) {
            for (let i = idList.length - 1; i > -1; i--) {
                this.nodes.stack.unshift(idList[i]);
            }
        },
        getActiveNode: function() {
            return this.getNodeById(this.nodes.stack[0]);
        },
        unsetActiveNode: function() {
            this.nodes.stack.shift();
        },
        setNodeObject: function(node, type, id) {
            node.object.type = type;
            node.object.id = id;
        },

        /* Blocks */
        blocks: {
            id: 0,
            list: [],
            stack: [-1]
        },
        getNewBlock: function(hostType, hostId) {
            let block = {
                id: this.blocks.id,
                parentId: this.blocks.stack[0],
                host: {
                    type: hostType,
                    id: hostId
                },
                scope: {},
                ir: -1
            };

            this.blocks.id++;
            this.blocks.list.push(block);
            return block;
        },
        setActiveBlock: function(id) {
            this.blocks.stack.unshift(id);
        },
        getObjectByName: function(name) {
            let object = {
                type: '',
                idList: []
            };
            let block = this.getActiveBlock();

            while (block && !(name in block.scope)) {
                block = this.getBlockById(block.parentId);
            }
            if (block) {
                object = block.scope[name];
            }
            return object;
        },
        getActiveBlock: function() {
            return this.getBlockById(this.blocks.stack[0]);
        },
        getBlockById: function(id) {
            return this.blocks.list[id];
        },
        setObject: function(name, type, id) {
            let block = this.getActiveBlock();

            if (name in block.scope) {
                block.scope[name].idList.push(id);
            } else {
                block.scope[name] = {
                    type: type,
                    idList: [id]
                };
            }
        },
        unsetActiveBlock: function() {
            this.blocks.stack.shift();
        },

        /* Types */
        types: {
            id: 0,
            list: [],
            names: {}
        },
        getNewType: function(kind, name, fromIdList, toId) {
            let type = {
                id: this.types.id,
                kind: kind,
                name: name,
                fromIdList: fromIdList,
                toId: toId,
                ir: -1
            };

            this.types.id++;
            this.types.list.push(type);
            this.types.names[type.name] = type.id;
            return type;
        },
        getTypeByName: function(name) {
            return this.getTypeById(this.types.names[name]);
        },
        getTypeById: function(id) {
            return this.types.list[id];
        },
        getTypeName: function(type) {
            let typeName = type.name;

            if (type.id === this.getTypeByName('$v').id) {
                typeName = '\'void\'';
            }
            return typeName;
        },

        /* Functions */
        functions: {
            id: 0,
            list: [],
            mainId: -1
        },
        getNewFunction: function(nodeId, isPrivate, name, typeId) {
            let $function = {
                id: this.functions.id,
                nodeId: nodeId,
                isPrivate: isPrivate,
                name: name,
                typeId: typeId,
                blockId: -1,
                variables: {
                    index: 0,
                    idList: []
                }
            };

            this.functions.id++;
            this.functions.list.push($function);
            return $function;
        },
        getFunctionById: function(id) {
            return this.functions.list[id];
        },
        getActiveFunction: function() {
            let activeFunction;
            let block = this.getActiveBlock();

            while (block && (block.host.type !== 'function')) {
                block = this.getBlockById(block.parentId);
            }
            if (block) {
                activeFunction = this.getFunctionById(block.host.id);
            }
            return activeFunction;
        },
        setFunctionVariable: function($function, variable) {
            $function.variables.index++;
            $function.variables.idList.push(variable.id);
        },
        getFunctionName: function($function) {
            let functionType = this.getTypeById($function.typeId);

            return `${ $function.name }_${ functionType.name.replace(/\s/g, '') }`;
        },
        setMainFunction($function) {
            this.functions.mainId = $function.id;
        },

        /* Variables */
        variables: {
            id: 0,
            list: []
        },
        getNewVariable: function(nodeId, isConstant, isPrivate, name, typeId) {
            let variable = {
                id: this.variables.id,
                nodeId: nodeId,
                isConstant: isConstant,
                isPrivate: isPrivate,
                name: name,
                typeId: typeId,
                isParameter: false,
                index: -1
            };

            /* Set some initial values */
            this.setVariableIsParameter(variable);
            this.setVariableIndex(variable);

            this.variables.id++;
            this.variables.list.push(variable);
            return variable;
        },
        getVariableById: function(id) {
            return this.variables.list[id];
        },
        setVariableIsParameter: function(variable) {
            variable.isParameter = this.getActiveBlock().host.type === 'function';
        },
        setVariableIndex: function(variable) {
            let activeFunction = this.getActiveFunction();

            if (activeFunction) {
                variable.index = activeFunction.variables.index;
                this.setFunctionVariable(activeFunction, variable);
            }
        },

        /* Expressions */
        expressions: {
            id: 0,
            list: []
        },
        getNewExpression: function(nodeId, isLiteral, typeIdList, typeIdIndex) {
            let expression = {
                id: this.expressions.id,
                nodeId: nodeId,
                isLiteral: isLiteral,
                typeId: {
                    list: typeIdList,
                    index: typeIdIndex
                },
                valueId: {
                    list: [],
                    index: -1
                },
                ir: -1
            };

            this.expressions.id++;
            this.expressions.list.push(expression);
            return expression;
        },
        getExpressionById: function(id) {
            return this.expressions.list[id];
        },
        isExpressionInstanceOf: function(expression, type) {
            let answer = false;

            if (expression.typeId.index === -1) {
                /* This is a reference expression */
                /* The type of the expression is unknown, because it refers to a polymorphic function (a function with the same name, but different types of parameters)  */
                /* Let's find the final type of the expression and the polymorphic function we need to call */

                let i = 0;

                while ((i < expression.typeId.list.length) && (expression.typeId.index === -1)) {
                    if (expression.typeId.list[i] === type.id) {
                        expression.typeId.index = i;
                        expression.valueId.index = i;
                        answer = true;
                    }
                    i++;
                }
            } else {
                answer = this.getExpressionType(expression).id === type.id;
            }
            return answer;
        },
        getExpressionTypeName: function(expression) {
            let expressionTypeName = '';
            let type;

            if (expression.typeId.index === -1) {
                if (expression.typeId.list.length > 1) {
                    expressionTypeName = 'either ';
                }
                for (let i = 0; i < expression.typeId.list.length; i++) {
                    type = this.getTypeById(expression.typeId.list[i]);
                    expressionTypeName += this.getTypeName(type);
                    if (i < expression.typeId.list.length - 1) {
                        expressionTypeName += ' or ';
                    }
                }
            } else {
                type = this.getExpressionType(expression);
                expressionTypeName = this.getTypeName(type);
            }
            return expressionTypeName;
        },
        setExpressionTypeId: function(expression, typeId, typeIdIndex) {
            expression.typeId.list.push(typeId);
            expression.typeId.index = typeIdIndex;
        },
        getExpressionType: function(expression) {
            let expressionType;

            if (expression.typeId.index > -1) {
                expressionType = this.getTypeById(expression.typeId.list[expression.typeId.index]);
            }
            return expressionType;
        },
        setExpressionValueId: function(expression, valueId, valueIndex) {
            expression.valueId.list.push(valueId);
            expression.valueId.index = valueIndex;
        },
        getExpressionValueId: function(expression) {
            return expression.valueId.list[expression.valueId.index];
        },

        /* References */
        references: {
            id: 0,
            list: [],
            names: {},
            pointer: 0
        },
        getNewReference: function(name) {
            let reference = {
                id: this.references.id,
                name: name,
                pointer: this.references.pointer
            };

            this.references.id++;
            this.references.list.push(reference);
            this.references.names[reference.name] = reference.id;
            this.references.pointer++;
            return reference;
        },
        getReferenceByName: function(name) {
            return this.getReferenceById(this.references.names[name]);
        },
        getReferenceById: function(id) {
            return this.references.list[id];
        },

        /* Intermediate representation */
        ir: {},

        /* Output of the compiler */
        executable: ''
    };
}

export default getModule;
