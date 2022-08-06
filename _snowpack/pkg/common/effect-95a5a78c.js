import { O as Observable } from './observable-08535f24.js';
import { L as Logger } from './logger-bef9f4b6.js';
import { a as __extends } from './tslib.es6-2542203d.js';
import { _ as _WarnImport } from './devTools-40c203e4.js';

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Checks if the window object exists
 * @returns true if the window object exists
 */
function IsWindowObjectExist() {
    return typeof window !== "undefined";
}
/**
 * Checks if the navigator object exists
 * @returns true if the navigator object exists
 */
function IsNavigatorAvailable() {
    return typeof navigator !== "undefined";
}
/**
 * Check if the document object exists
 * @returns true if the document object exists
 */
function IsDocumentAvailable() {
    return typeof document !== "undefined";
}
/**
 * Extracts text content from a DOM element hierarchy
 * @param element defines the root element
 * @returns a string
 */
function GetDOMTextContent(element) {
    var result = "";
    var child = element.firstChild;
    while (child) {
        if (child.nodeType === 3) {
            result += child.textContent;
        }
        child = child.nextSibling;
    }
    return result;
}
/**
 * Sets of helpers dealing with the DOM and some of the recurrent functions needed in
 * Babylon.js
 */
var DomManagement = {
    /**
     * Checks if the window object exists
     * @returns true if the window object exists
     */
    IsWindowObjectExist: IsWindowObjectExist,
    /**
     * Checks if the navigator object exists
     * @returns true if the navigator object exists
     */
    IsNavigatorAvailable: IsNavigatorAvailable,
    /**
     * Check if the document object exists
     * @returns true if the document object exists
     */
    IsDocumentAvailable: IsDocumentAvailable,
    /**
     * Extracts text content from a DOM element hierarchy
     * @param element defines the root element
     * @returns a string
     */
    GetDOMTextContent: GetDOMTextContent,
};

/** @hidden */
var ShaderCodeNode = /** @class */ (function () {
    function ShaderCodeNode() {
        this.children = [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ShaderCodeNode.prototype.isValid = function (preprocessors) {
        return true;
    };
    ShaderCodeNode.prototype.process = function (preprocessors, options) {
        var result = "";
        if (this.line) {
            var value = this.line;
            var processor = options.processor;
            if (processor) {
                // This must be done before other replacements to avoid mistakenly changing something that was already changed.
                if (processor.lineProcessor) {
                    value = processor.lineProcessor(value, options.isFragment, options.processingContext);
                }
                if (processor.attributeProcessor && this.line.startsWith("attribute")) {
                    value = processor.attributeProcessor(this.line, preprocessors, options.processingContext);
                }
                else if (processor.varyingProcessor && this.line.startsWith("varying")) {
                    value = processor.varyingProcessor(this.line, options.isFragment, preprocessors, options.processingContext);
                }
                else if (processor.uniformProcessor && processor.uniformRegexp && processor.uniformRegexp.test(this.line)) {
                    if (!options.lookForClosingBracketForUniformBuffer) {
                        value = processor.uniformProcessor(this.line, options.isFragment, preprocessors, options.processingContext);
                    }
                }
                else if (processor.uniformBufferProcessor && processor.uniformBufferRegexp && processor.uniformBufferRegexp.test(this.line)) {
                    if (!options.lookForClosingBracketForUniformBuffer) {
                        value = processor.uniformBufferProcessor(this.line, options.isFragment, options.processingContext);
                        options.lookForClosingBracketForUniformBuffer = true;
                    }
                }
                else if (processor.textureProcessor && processor.textureRegexp && processor.textureRegexp.test(this.line)) {
                    value = processor.textureProcessor(this.line, options.isFragment, preprocessors, options.processingContext);
                }
                else if ((processor.uniformProcessor || processor.uniformBufferProcessor) && this.line.startsWith("uniform") && !options.lookForClosingBracketForUniformBuffer) {
                    var regex = /uniform\s+(?:(?:highp)?|(?:lowp)?)\s*(\S+)\s+(\S+)\s*;/;
                    if (regex.test(this.line)) {
                        // uniform
                        if (processor.uniformProcessor) {
                            value = processor.uniformProcessor(this.line, options.isFragment, preprocessors, options.processingContext);
                        }
                    }
                    else {
                        // Uniform buffer
                        if (processor.uniformBufferProcessor) {
                            value = processor.uniformBufferProcessor(this.line, options.isFragment, options.processingContext);
                            options.lookForClosingBracketForUniformBuffer = true;
                        }
                    }
                }
                if (options.lookForClosingBracketForUniformBuffer && this.line.indexOf("}") !== -1) {
                    options.lookForClosingBracketForUniformBuffer = false;
                    if (processor.endOfUniformBufferProcessor) {
                        value = processor.endOfUniformBufferProcessor(this.line, options.isFragment, options.processingContext);
                    }
                }
            }
            result += value + "\r\n";
        }
        this.children.forEach(function (child) {
            result += child.process(preprocessors, options);
        });
        if (this.additionalDefineKey) {
            preprocessors[this.additionalDefineKey] = this.additionalDefineValue || "true";
        }
        return result;
    };
    return ShaderCodeNode;
}());

/** @hidden */
var ShaderCodeCursor = /** @class */ (function () {
    function ShaderCodeCursor() {
    }
    Object.defineProperty(ShaderCodeCursor.prototype, "currentLine", {
        get: function () {
            return this._lines[this.lineIndex];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderCodeCursor.prototype, "canRead", {
        get: function () {
            return this.lineIndex < this._lines.length - 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderCodeCursor.prototype, "lines", {
        set: function (value) {
            this._lines = [];
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var line = value_1[_i];
                // Prevent removing line break in macros.
                if (line[0] === "#") {
                    this._lines.push(line);
                    continue;
                }
                // Do not split single line comments
                if (line.trim().startsWith("//")) {
                    this._lines.push(line);
                    continue;
                }
                var split = line.split(";");
                for (var index = 0; index < split.length; index++) {
                    var subLine = split[index];
                    subLine = subLine.trim();
                    if (!subLine) {
                        continue;
                    }
                    this._lines.push(subLine + (index !== split.length - 1 ? ";" : ""));
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    return ShaderCodeCursor;
}());

/** @hidden */
var ShaderCodeConditionNode = /** @class */ (function (_super) {
    __extends(ShaderCodeConditionNode, _super);
    function ShaderCodeConditionNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShaderCodeConditionNode.prototype.process = function (preprocessors, options) {
        for (var index = 0; index < this.children.length; index++) {
            var node = this.children[index];
            if (node.isValid(preprocessors)) {
                return node.process(preprocessors, options);
            }
        }
        return "";
    };
    return ShaderCodeConditionNode;
}(ShaderCodeNode));

/** @hidden */
var ShaderCodeTestNode = /** @class */ (function (_super) {
    __extends(ShaderCodeTestNode, _super);
    function ShaderCodeTestNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShaderCodeTestNode.prototype.isValid = function (preprocessors) {
        return this.testExpression.isTrue(preprocessors);
    };
    return ShaderCodeTestNode;
}(ShaderCodeNode));

/* eslint-disable @typescript-eslint/naming-convention */
/** @hidden */
var ShaderDefineExpression = /** @class */ (function () {
    function ShaderDefineExpression() {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ShaderDefineExpression.prototype.isTrue = function (preprocessors) {
        return true;
    };
    ShaderDefineExpression.postfixToInfix = function (postfix) {
        var stack = [];
        for (var _i = 0, postfix_1 = postfix; _i < postfix_1.length; _i++) {
            var c = postfix_1[_i];
            if (ShaderDefineExpression._OperatorPriority[c] === undefined) {
                stack.push(c);
            }
            else {
                var v1 = stack[stack.length - 1], v2 = stack[stack.length - 2];
                stack.length -= 2;
                stack.push("(".concat(v2).concat(c).concat(v1, ")"));
            }
        }
        return stack[stack.length - 1];
    };
    ShaderDefineExpression.infixToPostfix = function (infix) {
        var result = [];
        var stackIdx = -1;
        var pushOperand = function () {
            operand = operand.trim();
            if (operand !== "") {
                result.push(operand);
                operand = "";
            }
        };
        var push = function (s) {
            if (stackIdx < ShaderDefineExpression._Stack.length - 1) {
                ShaderDefineExpression._Stack[++stackIdx] = s;
            }
        };
        var peek = function () { return ShaderDefineExpression._Stack[stackIdx]; };
        var pop = function () { return (stackIdx === -1 ? "!!INVALID EXPRESSION!!" : ShaderDefineExpression._Stack[stackIdx--]); };
        var idx = 0, operand = "";
        while (idx < infix.length) {
            var c = infix.charAt(idx), token = idx < infix.length - 1 ? infix.substr(idx, 2) : "";
            if (c === "(") {
                operand = "";
                push(c);
            }
            else if (c === ")") {
                pushOperand();
                while (stackIdx !== -1 && peek() !== "(") {
                    result.push(pop());
                }
                pop();
            }
            else if (ShaderDefineExpression._OperatorPriority[token] > 1) {
                pushOperand();
                while (stackIdx !== -1 && ShaderDefineExpression._OperatorPriority[peek()] >= ShaderDefineExpression._OperatorPriority[token]) {
                    result.push(pop());
                }
                push(token);
                idx++;
            }
            else {
                operand += c;
            }
            idx++;
        }
        pushOperand();
        while (stackIdx !== -1) {
            if (peek() === "(") {
                pop();
            }
            else {
                result.push(pop());
            }
        }
        return result;
    };
    ShaderDefineExpression._OperatorPriority = {
        ")": 0,
        "(": 1,
        "||": 2,
        "&&": 3,
    };
    ShaderDefineExpression._Stack = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    return ShaderDefineExpression;
}());

/** @hidden */
var ShaderDefineIsDefinedOperator = /** @class */ (function (_super) {
    __extends(ShaderDefineIsDefinedOperator, _super);
    function ShaderDefineIsDefinedOperator(define, not) {
        if (not === void 0) { not = false; }
        var _this = _super.call(this) || this;
        _this.define = define;
        _this.not = not;
        return _this;
    }
    ShaderDefineIsDefinedOperator.prototype.isTrue = function (preprocessors) {
        var condition = preprocessors[this.define] !== undefined;
        if (this.not) {
            condition = !condition;
        }
        return condition;
    };
    return ShaderDefineIsDefinedOperator;
}(ShaderDefineExpression));

/** @hidden */
var ShaderDefineOrOperator = /** @class */ (function (_super) {
    __extends(ShaderDefineOrOperator, _super);
    function ShaderDefineOrOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShaderDefineOrOperator.prototype.isTrue = function (preprocessors) {
        return this.leftOperand.isTrue(preprocessors) || this.rightOperand.isTrue(preprocessors);
    };
    return ShaderDefineOrOperator;
}(ShaderDefineExpression));

/** @hidden */
var ShaderDefineAndOperator = /** @class */ (function (_super) {
    __extends(ShaderDefineAndOperator, _super);
    function ShaderDefineAndOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShaderDefineAndOperator.prototype.isTrue = function (preprocessors) {
        return this.leftOperand.isTrue(preprocessors) && this.rightOperand.isTrue(preprocessors);
    };
    return ShaderDefineAndOperator;
}(ShaderDefineExpression));

/** @hidden */
var ShaderDefineArithmeticOperator = /** @class */ (function (_super) {
    __extends(ShaderDefineArithmeticOperator, _super);
    function ShaderDefineArithmeticOperator(define, operand, testValue) {
        var _this = _super.call(this) || this;
        _this.define = define;
        _this.operand = operand;
        _this.testValue = testValue;
        return _this;
    }
    ShaderDefineArithmeticOperator.prototype.isTrue = function (preprocessors) {
        var value = preprocessors[this.define];
        if (value === undefined) {
            value = this.define;
        }
        var condition = false;
        var left = parseInt(value);
        var right = parseInt(this.testValue);
        switch (this.operand) {
            case ">":
                condition = left > right;
                break;
            case "<":
                condition = left < right;
                break;
            case "<=":
                condition = left <= right;
                break;
            case ">=":
                condition = left >= right;
                break;
            case "==":
                condition = left === right;
                break;
        }
        return condition;
    };
    return ShaderDefineArithmeticOperator;
}(ShaderDefineExpression));

/**
 * Language of the shader code
 */
var ShaderLanguage;
(function (ShaderLanguage) {
    /** language is GLSL (used by WebGL) */
    ShaderLanguage[ShaderLanguage["GLSL"] = 0] = "GLSL";
    /** language is WGSL (used by WebGPU) */
    ShaderLanguage[ShaderLanguage["WGSL"] = 1] = "WGSL";
})(ShaderLanguage || (ShaderLanguage = {}));

/* eslint-disable @typescript-eslint/no-unused-vars */
var regexSE = /defined\s*?\((.+?)\)/g;
var regexSERevert = /defined\s*?\[(.+?)\]/g;
var regexShaderInclude = /#include\s?<(.+)>(\((.*)\))*(\[(.*)\])*/g;
/** @hidden */
var ShaderProcessor = /** @class */ (function () {
    function ShaderProcessor() {
    }
    ShaderProcessor.Initialize = function (options) {
        if (options.processor && options.processor.initializeShaders) {
            options.processor.initializeShaders(options.processingContext);
        }
    };
    ShaderProcessor.Process = function (sourceCode, options, callback, engine) {
        var _this = this;
        var _a;
        if ((_a = options.processor) === null || _a === void 0 ? void 0 : _a.preProcessShaderCode) {
            sourceCode = options.processor.preProcessShaderCode(sourceCode, options.isFragment);
        }
        this._ProcessIncludes(sourceCode, options, function (codeWithIncludes) {
            if (options.processCodeAfterIncludes) {
                codeWithIncludes = options.processCodeAfterIncludes(options.isFragment ? "fragment" : "vertex", codeWithIncludes);
            }
            var migratedCode = _this._ProcessShaderConversion(codeWithIncludes, options, engine);
            callback(migratedCode);
        });
    };
    ShaderProcessor.PreProcess = function (sourceCode, options, callback, engine) {
        var _this = this;
        var _a;
        if ((_a = options.processor) === null || _a === void 0 ? void 0 : _a.preProcessShaderCode) {
            sourceCode = options.processor.preProcessShaderCode(sourceCode, options.isFragment);
        }
        this._ProcessIncludes(sourceCode, options, function (codeWithIncludes) {
            if (options.processCodeAfterIncludes) {
                codeWithIncludes = options.processCodeAfterIncludes(options.isFragment ? "fragment" : "vertex", codeWithIncludes);
            }
            var migratedCode = _this._ApplyPreProcessing(codeWithIncludes, options, engine);
            callback(migratedCode);
        });
    };
    ShaderProcessor.Finalize = function (vertexCode, fragmentCode, options) {
        if (!options.processor || !options.processor.finalizeShaders) {
            return { vertexCode: vertexCode, fragmentCode: fragmentCode };
        }
        return options.processor.finalizeShaders(vertexCode, fragmentCode, options.processingContext);
    };
    ShaderProcessor._ProcessPrecision = function (source, options) {
        var _a;
        if ((_a = options.processor) === null || _a === void 0 ? void 0 : _a.noPrecision) {
            return source;
        }
        var shouldUseHighPrecisionShader = options.shouldUseHighPrecisionShader;
        if (source.indexOf("precision highp float") === -1) {
            if (!shouldUseHighPrecisionShader) {
                source = "precision mediump float;\n" + source;
            }
            else {
                source = "precision highp float;\n" + source;
            }
        }
        else {
            if (!shouldUseHighPrecisionShader) {
                // Moving highp to mediump
                source = source.replace("precision highp float", "precision mediump float");
            }
        }
        return source;
    };
    ShaderProcessor._ExtractOperation = function (expression) {
        var regex = /defined\((.+)\)/;
        var match = regex.exec(expression);
        if (match && match.length) {
            return new ShaderDefineIsDefinedOperator(match[1].trim(), expression[0] === "!");
        }
        var operators = ["==", ">=", "<=", "<", ">"];
        var operator = "";
        var indexOperator = 0;
        for (var _i = 0, operators_1 = operators; _i < operators_1.length; _i++) {
            operator = operators_1[_i];
            indexOperator = expression.indexOf(operator);
            if (indexOperator > -1) {
                break;
            }
        }
        if (indexOperator === -1) {
            return new ShaderDefineIsDefinedOperator(expression);
        }
        var define = expression.substring(0, indexOperator).trim();
        var value = expression.substring(indexOperator + operator.length).trim();
        return new ShaderDefineArithmeticOperator(define, operator, value);
    };
    ShaderProcessor._BuildSubExpression = function (expression) {
        expression = expression.replace(regexSE, "defined[$1]");
        var postfix = ShaderDefineExpression.infixToPostfix(expression);
        var stack = [];
        for (var _i = 0, postfix_1 = postfix; _i < postfix_1.length; _i++) {
            var c = postfix_1[_i];
            if (c !== "||" && c !== "&&") {
                stack.push(c);
            }
            else if (stack.length >= 2) {
                var v1 = stack[stack.length - 1], v2 = stack[stack.length - 2];
                stack.length -= 2;
                var operator = c == "&&" ? new ShaderDefineAndOperator() : new ShaderDefineOrOperator();
                if (typeof v1 === "string") {
                    v1 = v1.replace(regexSERevert, "defined($1)");
                }
                if (typeof v2 === "string") {
                    v2 = v2.replace(regexSERevert, "defined($1)");
                }
                operator.leftOperand = typeof v2 === "string" ? this._ExtractOperation(v2) : v2;
                operator.rightOperand = typeof v1 === "string" ? this._ExtractOperation(v1) : v1;
                stack.push(operator);
            }
        }
        var result = stack[stack.length - 1];
        if (typeof result === "string") {
            result = result.replace(regexSERevert, "defined($1)");
        }
        // note: stack.length !== 1 if there was an error in the parsing
        return typeof result === "string" ? this._ExtractOperation(result) : result;
    };
    ShaderProcessor._BuildExpression = function (line, start) {
        var node = new ShaderCodeTestNode();
        var command = line.substring(0, start);
        var expression = line.substring(start);
        expression = expression.substring(0, (expression.indexOf("//") + 1 || expression.length + 1) - 1).trim();
        if (command === "#ifdef") {
            node.testExpression = new ShaderDefineIsDefinedOperator(expression);
        }
        else if (command === "#ifndef") {
            node.testExpression = new ShaderDefineIsDefinedOperator(expression, true);
        }
        else {
            node.testExpression = this._BuildSubExpression(expression);
        }
        return node;
    };
    ShaderProcessor._MoveCursorWithinIf = function (cursor, rootNode, ifNode) {
        var line = cursor.currentLine;
        while (this._MoveCursor(cursor, ifNode)) {
            line = cursor.currentLine;
            var first5 = line.substring(0, 5).toLowerCase();
            if (first5 === "#else") {
                var elseNode = new ShaderCodeNode();
                rootNode.children.push(elseNode);
                this._MoveCursor(cursor, elseNode);
                return;
            }
            else if (first5 === "#elif") {
                var elifNode = this._BuildExpression(line, 5);
                rootNode.children.push(elifNode);
                ifNode = elifNode;
            }
        }
    };
    ShaderProcessor._MoveCursor = function (cursor, rootNode) {
        while (cursor.canRead) {
            cursor.lineIndex++;
            var line = cursor.currentLine;
            var keywords = /(#ifdef)|(#else)|(#elif)|(#endif)|(#ifndef)|(#if)/;
            var matches = keywords.exec(line);
            if (matches && matches.length) {
                var keyword = matches[0];
                switch (keyword) {
                    case "#ifdef": {
                        var newRootNode = new ShaderCodeConditionNode();
                        rootNode.children.push(newRootNode);
                        var ifNode = this._BuildExpression(line, 6);
                        newRootNode.children.push(ifNode);
                        this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                        break;
                    }
                    case "#else":
                    case "#elif":
                        return true;
                    case "#endif":
                        return false;
                    case "#ifndef": {
                        var newRootNode = new ShaderCodeConditionNode();
                        rootNode.children.push(newRootNode);
                        var ifNode = this._BuildExpression(line, 7);
                        newRootNode.children.push(ifNode);
                        this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                        break;
                    }
                    case "#if": {
                        var newRootNode = new ShaderCodeConditionNode();
                        var ifNode = this._BuildExpression(line, 3);
                        rootNode.children.push(newRootNode);
                        newRootNode.children.push(ifNode);
                        this._MoveCursorWithinIf(cursor, newRootNode, ifNode);
                        break;
                    }
                }
            }
            else {
                var newNode = new ShaderCodeNode();
                newNode.line = line;
                rootNode.children.push(newNode);
                // Detect additional defines
                if (line[0] === "#" && line[1] === "d") {
                    var split = line.replace(";", "").split(" ");
                    newNode.additionalDefineKey = split[1];
                    if (split.length === 3) {
                        newNode.additionalDefineValue = split[2];
                    }
                }
            }
        }
        return false;
    };
    ShaderProcessor._EvaluatePreProcessors = function (sourceCode, preprocessors, options) {
        var rootNode = new ShaderCodeNode();
        var cursor = new ShaderCodeCursor();
        cursor.lineIndex = -1;
        cursor.lines = sourceCode.split("\n");
        // Decompose (We keep it in 2 steps so it is easier to maintain and perf hit is insignificant)
        this._MoveCursor(cursor, rootNode);
        // Recompose
        return rootNode.process(preprocessors, options);
    };
    ShaderProcessor._PreparePreProcessors = function (options, engine) {
        var _a;
        var defines = options.defines;
        var preprocessors = {};
        for (var _i = 0, defines_1 = defines; _i < defines_1.length; _i++) {
            var define = defines_1[_i];
            var keyValue = define.replace("#define", "").replace(";", "").trim();
            var split = keyValue.split(" ");
            preprocessors[split[0]] = split.length > 1 ? split[1] : "";
        }
        if (((_a = options.processor) === null || _a === void 0 ? void 0 : _a.shaderLanguage) === ShaderLanguage.GLSL) {
            preprocessors["GL_ES"] = "true";
        }
        preprocessors["__VERSION__"] = options.version;
        preprocessors[options.platformName] = "true";
        engine._getGlobalDefines(preprocessors);
        return preprocessors;
    };
    ShaderProcessor._ProcessShaderConversion = function (sourceCode, options, engine) {
        var preparedSourceCode = this._ProcessPrecision(sourceCode, options);
        if (!options.processor) {
            return preparedSourceCode;
        }
        // Already converted
        if (options.processor.shaderLanguage === ShaderLanguage.GLSL && preparedSourceCode.indexOf("#version 3") !== -1) {
            return preparedSourceCode.replace("#version 300 es", "");
        }
        var defines = options.defines;
        var preprocessors = this._PreparePreProcessors(options, engine);
        // General pre processing
        if (options.processor.preProcessor) {
            preparedSourceCode = options.processor.preProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext);
        }
        preparedSourceCode = this._EvaluatePreProcessors(preparedSourceCode, preprocessors, options);
        // Post processing
        if (options.processor.postProcessor) {
            preparedSourceCode = options.processor.postProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext, engine);
        }
        // Inline functions tagged with #define inline
        if (engine._features.needShaderCodeInlining) {
            preparedSourceCode = engine.inlineShaderCode(preparedSourceCode);
        }
        return preparedSourceCode;
    };
    ShaderProcessor._ApplyPreProcessing = function (sourceCode, options, engine) {
        var _a, _b;
        var preparedSourceCode = sourceCode;
        var defines = options.defines;
        var preprocessors = this._PreparePreProcessors(options, engine);
        // General pre processing
        if ((_a = options.processor) === null || _a === void 0 ? void 0 : _a.preProcessor) {
            preparedSourceCode = options.processor.preProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext);
        }
        preparedSourceCode = this._EvaluatePreProcessors(preparedSourceCode, preprocessors, options);
        // Post processing
        if ((_b = options.processor) === null || _b === void 0 ? void 0 : _b.postProcessor) {
            preparedSourceCode = options.processor.postProcessor(preparedSourceCode, defines, options.isFragment, options.processingContext, engine);
        }
        // Inline functions tagged with #define inline
        if (engine._features.needShaderCodeInlining) {
            preparedSourceCode = engine.inlineShaderCode(preparedSourceCode);
        }
        return preparedSourceCode;
    };
    ShaderProcessor._ProcessIncludes = function (sourceCode, options, callback) {
        var _this = this;
        var match = regexShaderInclude.exec(sourceCode);
        var returnValue = new String(sourceCode);
        var keepProcessing = false;
        var _loop_1 = function () {
            var includeFile = match[1];
            // Uniform declaration
            if (includeFile.indexOf("__decl__") !== -1) {
                includeFile = includeFile.replace(/__decl__/, "");
                if (options.supportsUniformBuffers) {
                    includeFile = includeFile.replace(/Vertex/, "Ubo");
                    includeFile = includeFile.replace(/Fragment/, "Ubo");
                }
                includeFile = includeFile + "Declaration";
            }
            if (options.includesShadersStore[includeFile]) {
                // Substitution
                var includeContent = options.includesShadersStore[includeFile];
                if (match[2]) {
                    var splits = match[3].split(",");
                    for (var index = 0; index < splits.length; index += 2) {
                        var source = new RegExp(splits[index], "g");
                        var dest = splits[index + 1];
                        includeContent = includeContent.replace(source, dest);
                    }
                }
                if (match[4]) {
                    var indexString = match[5];
                    if (indexString.indexOf("..") !== -1) {
                        var indexSplits = indexString.split("..");
                        var minIndex = parseInt(indexSplits[0]);
                        var maxIndex = parseInt(indexSplits[1]);
                        var sourceIncludeContent = includeContent.slice(0);
                        includeContent = "";
                        if (isNaN(maxIndex)) {
                            maxIndex = options.indexParameters[indexSplits[1]];
                        }
                        for (var i = minIndex; i < maxIndex; i++) {
                            if (!options.supportsUniformBuffers) {
                                // Ubo replacement
                                sourceIncludeContent = sourceIncludeContent.replace(/light\{X\}.(\w*)/g, function (str, p1) {
                                    return p1 + "{X}";
                                });
                            }
                            includeContent += sourceIncludeContent.replace(/\{X\}/g, i.toString()) + "\n";
                        }
                    }
                    else {
                        if (!options.supportsUniformBuffers) {
                            // Ubo replacement
                            includeContent = includeContent.replace(/light\{X\}.(\w*)/g, function (str, p1) {
                                return p1 + "{X}";
                            });
                        }
                        includeContent = includeContent.replace(/\{X\}/g, indexString);
                    }
                }
                // Replace
                returnValue = returnValue.replace(match[0], includeContent);
                keepProcessing = keepProcessing || includeContent.indexOf("#include<") >= 0 || includeContent.indexOf("#include <") >= 0;
            }
            else {
                var includeShaderUrl = options.shadersRepository + "ShadersInclude/" + includeFile + ".fx";
                ShaderProcessor._FileToolsLoadFile(includeShaderUrl, function (fileContent) {
                    options.includesShadersStore[includeFile] = fileContent;
                    _this._ProcessIncludes(returnValue, options, callback);
                });
                return { value: void 0 };
            }
            match = regexShaderInclude.exec(sourceCode);
        };
        while (match != null) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
        if (keepProcessing) {
            this._ProcessIncludes(returnValue.toString(), options, callback);
        }
        else {
            callback(returnValue);
        }
    };
    /**
     * Loads a file from a url
     * @param url url to load
     * @param onSuccess callback called when the file successfully loads
     * @param onProgress callback called while file is loading (if the server supports this mode)
     * @param offlineProvider defines the offline provider for caching
     * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
     * @param onError callback called when the file fails to load
     * @returns a file request object
     * @hidden
     */
    ShaderProcessor._FileToolsLoadFile = function (url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError) {
        throw _WarnImport("FileTools");
    };
    return ShaderProcessor;
}());

/**
 * Defines the shader related stores and directory
 */
var ShaderStore = /** @class */ (function () {
    function ShaderStore() {
    }
    /**
     * Gets the shaders repository path for a given shader language
     * @param shaderLanguage the shader language
     * @returns the path to the shaders repository
     */
    ShaderStore.GetShadersRepository = function (shaderLanguage) {
        if (shaderLanguage === void 0) { shaderLanguage = ShaderLanguage.GLSL; }
        return shaderLanguage === ShaderLanguage.GLSL ? ShaderStore.ShadersRepository : ShaderStore.ShadersRepositoryWGSL;
    };
    /**
     * Gets the shaders store of a given shader language
     * @param shaderLanguage the shader language
     * @returns the shaders store
     */
    ShaderStore.GetShadersStore = function (shaderLanguage) {
        if (shaderLanguage === void 0) { shaderLanguage = ShaderLanguage.GLSL; }
        return shaderLanguage === ShaderLanguage.GLSL ? ShaderStore.ShadersStore : ShaderStore.ShadersStoreWGSL;
    };
    /**
     * Gets the include shaders store of a given shader language
     * @param shaderLanguage the shader language
     * @returns the include shaders store
     */
    ShaderStore.GetIncludesShadersStore = function (shaderLanguage) {
        if (shaderLanguage === void 0) { shaderLanguage = ShaderLanguage.GLSL; }
        return shaderLanguage === ShaderLanguage.GLSL ? ShaderStore.IncludesShadersStore : ShaderStore.IncludesShadersStoreWGSL;
    };
    /**
     * Gets or sets the relative url used to load shaders if using the engine in non-minified mode
     */
    ShaderStore.ShadersRepository = "src/Shaders/";
    /**
     * Store of each shader (The can be looked up using effect.key)
     */
    ShaderStore.ShadersStore = {};
    /**
     * Store of each included file for a shader (The can be looked up using effect.key)
     */
    ShaderStore.IncludesShadersStore = {};
    /**
     * Gets or sets the relative url used to load shaders (WGSL) if using the engine in non-minified mode
     */
    ShaderStore.ShadersRepositoryWGSL = "src/ShadersWGSL/";
    /**
     * Store of each shader  (WGSL)
     */
    ShaderStore.ShadersStoreWGSL = {};
    /**
     * Store of each included file for a shader (WGSL)
     */
    ShaderStore.IncludesShadersStoreWGSL = {};
    return ShaderStore;
}());

/**
 * Effect containing vertex and fragment shader that can be executed on an object.
 */
var Effect = /** @class */ (function () {
    /**
     * Instantiates an effect.
     * An effect can be used to create/manage/execute vertex and fragment shaders.
     * @param baseName Name of the effect.
     * @param attributesNamesOrOptions List of attribute names that will be passed to the shader or set of all options to create the effect.
     * @param uniformsNamesOrEngine List of uniform variable names that will be passed to the shader or the engine that will be used to render effect.
     * @param samplers List of sampler variables that will be passed to the shader.
     * @param engine Engine to be used to render the effect
     * @param defines Define statements to be added to the shader.
     * @param fallbacks Possible fallbacks for this effect to improve performance when needed.
     * @param onCompiled Callback that will be called when the shader is compiled.
     * @param onError Callback that will be called if an error occurs during shader compilation.
     * @param indexParameters Parameters to be used with Babylons include syntax to iterate over an array (eg. {lights: 10})
     * @param key Effect Key identifying uniquely compiled shader variants
     * @param shaderLanguage the language the shader is written in (default: GLSL)
     */
    function Effect(baseName, attributesNamesOrOptions, uniformsNamesOrEngine, samplers, engine, defines, fallbacks, onCompiled, onError, indexParameters, key, shaderLanguage) {
        if (samplers === void 0) { samplers = null; }
        if (defines === void 0) { defines = null; }
        if (fallbacks === void 0) { fallbacks = null; }
        if (onCompiled === void 0) { onCompiled = null; }
        if (onError === void 0) { onError = null; }
        if (key === void 0) { key = ""; }
        if (shaderLanguage === void 0) { shaderLanguage = ShaderLanguage.GLSL; }
        var _this = this;
        var _a, _b, _c;
        /**
         * Name of the effect.
         */
        this.name = null;
        /**
         * String container all the define statements that should be set on the shader.
         */
        this.defines = "";
        /**
         * Callback that will be called when the shader is compiled.
         */
        this.onCompiled = null;
        /**
         * Callback that will be called if an error occurs during shader compilation.
         */
        this.onError = null;
        /**
         * Callback that will be called when effect is bound.
         */
        this.onBind = null;
        /**
         * Unique ID of the effect.
         */
        this.uniqueId = 0;
        /**
         * Observable that will be called when the shader is compiled.
         * It is recommended to use executeWhenCompile() or to make sure that scene.isReady() is called to get this observable raised.
         */
        this.onCompileObservable = new Observable();
        /**
         * Observable that will be called if an error occurs during shader compilation.
         */
        this.onErrorObservable = new Observable();
        /** @hidden */
        this._onBindObservable = null;
        /**
         * @hidden
         * Specifies if the effect was previously ready
         */
        this._wasPreviouslyReady = false;
        /**
         * @hidden
         * Specifies if the effect was previously using instances
         */
        this._wasPreviouslyUsingInstances = null;
        this._isDisposed = false;
        /** @hidden */
        this._bonesComputationForcedToCPU = false;
        /** @hidden */
        this._uniformBuffersNames = {};
        /** @hidden */
        this._multiTarget = false;
        this._samplers = {};
        this._isReady = false;
        this._compilationError = "";
        this._allFallbacksProcessed = false;
        this._uniforms = {};
        /**
         * Key for the effect.
         * @hidden
         */
        this._key = "";
        this._fallbacks = null;
        this._vertexSourceCodeOverride = "";
        this._fragmentSourceCodeOverride = "";
        this._transformFeedbackVaryings = null;
        /**
         * Compiled shader to webGL program.
         * @hidden
         */
        this._pipelineContext = null;
        /** @hidden */
        this._vertexSourceCode = "";
        /** @hidden */
        this._fragmentSourceCode = "";
        /** @hidden */
        this._rawVertexSourceCode = "";
        /** @hidden */
        this._rawFragmentSourceCode = "";
        this.name = baseName;
        this._key = key;
        var processCodeAfterIncludes = undefined;
        var processFinalCode = null;
        if (attributesNamesOrOptions.attributes) {
            var options = attributesNamesOrOptions;
            this._engine = uniformsNamesOrEngine;
            this._attributesNames = options.attributes;
            this._uniformsNames = options.uniformsNames.concat(options.samplers);
            this._samplerList = options.samplers.slice();
            this.defines = options.defines;
            this.onError = options.onError;
            this.onCompiled = options.onCompiled;
            this._fallbacks = options.fallbacks;
            this._indexParameters = options.indexParameters;
            this._transformFeedbackVaryings = options.transformFeedbackVaryings || null;
            this._multiTarget = !!options.multiTarget;
            this._shaderLanguage = (_a = options.shaderLanguage) !== null && _a !== void 0 ? _a : ShaderLanguage.GLSL;
            if (options.uniformBuffersNames) {
                this._uniformBuffersNamesList = options.uniformBuffersNames.slice();
                for (var i = 0; i < options.uniformBuffersNames.length; i++) {
                    this._uniformBuffersNames[options.uniformBuffersNames[i]] = i;
                }
            }
            processFinalCode = (_b = options.processFinalCode) !== null && _b !== void 0 ? _b : null;
            processCodeAfterIncludes = (_c = options.processCodeAfterIncludes) !== null && _c !== void 0 ? _c : undefined;
        }
        else {
            this._engine = engine;
            this.defines = defines == null ? "" : defines;
            this._uniformsNames = uniformsNamesOrEngine.concat(samplers);
            this._samplerList = samplers ? samplers.slice() : [];
            this._attributesNames = attributesNamesOrOptions;
            this._uniformBuffersNamesList = [];
            this._shaderLanguage = shaderLanguage;
            this.onError = onError;
            this.onCompiled = onCompiled;
            this._indexParameters = indexParameters;
            this._fallbacks = fallbacks;
        }
        this._attributeLocationByName = {};
        this.uniqueId = Effect._UniqueIdSeed++;
        var vertexSource;
        var fragmentSource;
        var hostDocument = IsWindowObjectExist() ? this._engine.getHostDocument() : null;
        if (baseName.vertexSource) {
            vertexSource = "source:" + baseName.vertexSource;
        }
        else if (baseName.vertexElement) {
            vertexSource = hostDocument ? hostDocument.getElementById(baseName.vertexElement) : null;
            if (!vertexSource) {
                vertexSource = baseName.vertexElement;
            }
        }
        else {
            vertexSource = baseName.vertex || baseName;
        }
        if (baseName.fragmentSource) {
            fragmentSource = "source:" + baseName.fragmentSource;
        }
        else if (baseName.fragmentElement) {
            fragmentSource = hostDocument ? hostDocument.getElementById(baseName.fragmentElement) : null;
            if (!fragmentSource) {
                fragmentSource = baseName.fragmentElement;
            }
        }
        else {
            fragmentSource = baseName.fragment || baseName;
        }
        this._processingContext = this._engine._getShaderProcessingContext(this._shaderLanguage);
        var processorOptions = {
            defines: this.defines.split("\n"),
            indexParameters: this._indexParameters,
            isFragment: false,
            shouldUseHighPrecisionShader: this._engine._shouldUseHighPrecisionShader,
            processor: this._engine._getShaderProcessor(this._shaderLanguage),
            supportsUniformBuffers: this._engine.supportsUniformBuffers,
            shadersRepository: ShaderStore.GetShadersRepository(this._shaderLanguage),
            includesShadersStore: ShaderStore.GetIncludesShadersStore(this._shaderLanguage),
            version: (this._engine.version * 100).toString(),
            platformName: this._engine.shaderPlatformName,
            processingContext: this._processingContext,
            isNDCHalfZRange: this._engine.isNDCHalfZRange,
            useReverseDepthBuffer: this._engine.useReverseDepthBuffer,
            processCodeAfterIncludes: processCodeAfterIncludes,
        };
        var shaderCodes = [undefined, undefined];
        var shadersLoaded = function () {
            if (shaderCodes[0] && shaderCodes[1]) {
                processorOptions.isFragment = true;
                var migratedVertexCode_1 = shaderCodes[0], fragmentCode = shaderCodes[1];
                ShaderProcessor.Process(fragmentCode, processorOptions, function (migratedFragmentCode) {
                    if (processFinalCode) {
                        migratedFragmentCode = processFinalCode("fragment", migratedFragmentCode);
                    }
                    var finalShaders = ShaderProcessor.Finalize(migratedVertexCode_1, migratedFragmentCode, processorOptions);
                    _this._useFinalCode(finalShaders.vertexCode, finalShaders.fragmentCode, baseName);
                }, _this._engine);
            }
        };
        this._loadShader(vertexSource, "Vertex", "", function (vertexCode) {
            ShaderProcessor.Initialize(processorOptions);
            ShaderProcessor.Process(vertexCode, processorOptions, function (migratedVertexCode) {
                _this._rawVertexSourceCode = vertexCode;
                if (processFinalCode) {
                    migratedVertexCode = processFinalCode("vertex", migratedVertexCode);
                }
                shaderCodes[0] = migratedVertexCode;
                shadersLoaded();
            }, _this._engine);
        });
        this._loadShader(fragmentSource, "Fragment", "Pixel", function (fragmentCode) {
            _this._rawFragmentSourceCode = fragmentCode;
            shaderCodes[1] = fragmentCode;
            shadersLoaded();
        });
    }
    Object.defineProperty(Effect, "ShadersRepository", {
        /**
         * Gets or sets the relative url used to load shaders if using the engine in non-minified mode
         */
        get: function () {
            return ShaderStore.ShadersRepository;
        },
        set: function (repo) {
            ShaderStore.ShadersRepository = repo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "onBindObservable", {
        /**
         * Observable that will be called when effect is bound.
         */
        get: function () {
            if (!this._onBindObservable) {
                this._onBindObservable = new Observable();
            }
            return this._onBindObservable;
        },
        enumerable: false,
        configurable: true
    });
    Effect.prototype._useFinalCode = function (migratedVertexCode, migratedFragmentCode, baseName) {
        if (baseName) {
            var vertex = baseName.vertexElement || baseName.vertex || baseName.spectorName || baseName;
            var fragment = baseName.fragmentElement || baseName.fragment || baseName.spectorName || baseName;
            this._vertexSourceCode = (this._shaderLanguage === ShaderLanguage.WGSL ? "//" : "") + "#define SHADER_NAME vertex:" + vertex + "\n" + migratedVertexCode;
            this._fragmentSourceCode = (this._shaderLanguage === ShaderLanguage.WGSL ? "//" : "") + "#define SHADER_NAME fragment:" + fragment + "\n" + migratedFragmentCode;
        }
        else {
            this._vertexSourceCode = migratedVertexCode;
            this._fragmentSourceCode = migratedFragmentCode;
        }
        this._prepareEffect();
    };
    Object.defineProperty(Effect.prototype, "key", {
        /**
         * Unique key for this effect
         */
        get: function () {
            return this._key;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * If the effect has been compiled and prepared.
     * @returns if the effect is compiled and prepared.
     */
    Effect.prototype.isReady = function () {
        try {
            return this._isReadyInternal();
        }
        catch (_a) {
            return false;
        }
    };
    Effect.prototype._isReadyInternal = function () {
        if (this._isReady) {
            return true;
        }
        if (this._pipelineContext) {
            return this._pipelineContext.isReady;
        }
        return false;
    };
    /**
     * The engine the effect was initialized with.
     * @returns the engine.
     */
    Effect.prototype.getEngine = function () {
        return this._engine;
    };
    /**
     * The pipeline context for this effect
     * @returns the associated pipeline context
     */
    Effect.prototype.getPipelineContext = function () {
        return this._pipelineContext;
    };
    /**
     * The set of names of attribute variables for the shader.
     * @returns An array of attribute names.
     */
    Effect.prototype.getAttributesNames = function () {
        return this._attributesNames;
    };
    /**
     * Returns the attribute at the given index.
     * @param index The index of the attribute.
     * @returns The location of the attribute.
     */
    Effect.prototype.getAttributeLocation = function (index) {
        return this._attributes[index];
    };
    /**
     * Returns the attribute based on the name of the variable.
     * @param name of the attribute to look up.
     * @returns the attribute location.
     */
    Effect.prototype.getAttributeLocationByName = function (name) {
        return this._attributeLocationByName[name];
    };
    /**
     * The number of attributes.
     * @returns the number of attributes.
     */
    Effect.prototype.getAttributesCount = function () {
        return this._attributes.length;
    };
    /**
     * Gets the index of a uniform variable.
     * @param uniformName of the uniform to look up.
     * @returns the index.
     */
    Effect.prototype.getUniformIndex = function (uniformName) {
        return this._uniformsNames.indexOf(uniformName);
    };
    /**
     * Returns the attribute based on the name of the variable.
     * @param uniformName of the uniform to look up.
     * @returns the location of the uniform.
     */
    Effect.prototype.getUniform = function (uniformName) {
        return this._uniforms[uniformName];
    };
    /**
     * Returns an array of sampler variable names
     * @returns The array of sampler variable names.
     */
    Effect.prototype.getSamplers = function () {
        return this._samplerList;
    };
    /**
     * Returns an array of uniform variable names
     * @returns The array of uniform variable names.
     */
    Effect.prototype.getUniformNames = function () {
        return this._uniformsNames;
    };
    /**
     * Returns an array of uniform buffer variable names
     * @returns The array of uniform buffer variable names.
     */
    Effect.prototype.getUniformBuffersNames = function () {
        return this._uniformBuffersNamesList;
    };
    /**
     * Returns the index parameters used to create the effect
     * @returns The index parameters object
     */
    Effect.prototype.getIndexParameters = function () {
        return this._indexParameters;
    };
    /**
     * The error from the last compilation.
     * @returns the error string.
     */
    Effect.prototype.getCompilationError = function () {
        return this._compilationError;
    };
    /**
     * Gets a boolean indicating that all fallbacks were used during compilation
     * @returns true if all fallbacks were used
     */
    Effect.prototype.allFallbacksProcessed = function () {
        return this._allFallbacksProcessed;
    };
    /**
     * Adds a callback to the onCompiled observable and call the callback immediately if already ready.
     * @param func The callback to be used.
     */
    Effect.prototype.executeWhenCompiled = function (func) {
        var _this = this;
        if (this.isReady()) {
            func(this);
            return;
        }
        this.onCompileObservable.add(function (effect) {
            func(effect);
        });
        if (!this._pipelineContext || this._pipelineContext.isAsync) {
            setTimeout(function () {
                _this._checkIsReady(null);
            }, 16);
        }
    };
    Effect.prototype._checkIsReady = function (previousPipelineContext) {
        var _this = this;
        try {
            if (this._isReadyInternal()) {
                return;
            }
        }
        catch (e) {
            this._processCompilationErrors(e, previousPipelineContext);
            return;
        }
        if (this._isDisposed) {
            return;
        }
        setTimeout(function () {
            _this._checkIsReady(previousPipelineContext);
        }, 16);
    };
    Effect.prototype._loadShader = function (shader, key, optionalKey, callback) {
        if (typeof HTMLElement !== "undefined") {
            // DOM element ?
            if (shader instanceof HTMLElement) {
                var shaderCode = GetDOMTextContent(shader);
                callback(shaderCode);
                return;
            }
        }
        // Direct source ?
        if (shader.substr(0, 7) === "source:") {
            callback(shader.substr(7));
            return;
        }
        // Base64 encoded ?
        if (shader.substr(0, 7) === "base64:") {
            var shaderBinary = window.atob(shader.substr(7));
            callback(shaderBinary);
            return;
        }
        var shaderStore = ShaderStore.GetShadersStore(this._shaderLanguage);
        // Is in local store ?
        if (shaderStore[shader + key + "Shader"]) {
            callback(shaderStore[shader + key + "Shader"]);
            return;
        }
        if (optionalKey && shaderStore[shader + optionalKey + "Shader"]) {
            callback(shaderStore[shader + optionalKey + "Shader"]);
            return;
        }
        var shaderUrl;
        if (shader[0] === "." || shader[0] === "/" || shader.indexOf("http") > -1) {
            shaderUrl = shader;
        }
        else {
            shaderUrl = ShaderStore.GetShadersRepository(this._shaderLanguage) + shader;
        }
        // Vertex shader
        this._engine._loadFile(shaderUrl + "." + key.toLowerCase() + ".fx", callback);
    };
    Object.defineProperty(Effect.prototype, "vertexSourceCode", {
        /**
         * Gets the vertex shader source code of this effect
         */
        get: function () {
            var _a, _b;
            return this._vertexSourceCodeOverride && this._fragmentSourceCodeOverride
                ? this._vertexSourceCodeOverride
                : (_b = (_a = this._pipelineContext) === null || _a === void 0 ? void 0 : _a._getVertexShaderCode()) !== null && _b !== void 0 ? _b : this._vertexSourceCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "fragmentSourceCode", {
        /**
         * Gets the fragment shader source code of this effect
         */
        get: function () {
            var _a, _b;
            return this._vertexSourceCodeOverride && this._fragmentSourceCodeOverride
                ? this._fragmentSourceCodeOverride
                : (_b = (_a = this._pipelineContext) === null || _a === void 0 ? void 0 : _a._getFragmentShaderCode()) !== null && _b !== void 0 ? _b : this._fragmentSourceCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "rawVertexSourceCode", {
        /**
         * Gets the vertex shader source code before it has been processed by the preprocessor
         */
        get: function () {
            return this._rawVertexSourceCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "rawFragmentSourceCode", {
        /**
         * Gets the fragment shader source code before it has been processed by the preprocessor
         */
        get: function () {
            return this._rawFragmentSourceCode;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Recompiles the webGL program
     * @param vertexSourceCode The source code for the vertex shader.
     * @param fragmentSourceCode The source code for the fragment shader.
     * @param onCompiled Callback called when completed.
     * @param onError Callback called on error.
     * @hidden
     */
    Effect.prototype._rebuildProgram = function (vertexSourceCode, fragmentSourceCode, onCompiled, onError) {
        var _this = this;
        this._isReady = false;
        this._vertexSourceCodeOverride = vertexSourceCode;
        this._fragmentSourceCodeOverride = fragmentSourceCode;
        this.onError = function (effect, error) {
            if (onError) {
                onError(error);
            }
        };
        this.onCompiled = function () {
            var scenes = _this.getEngine().scenes;
            if (scenes) {
                for (var i = 0; i < scenes.length; i++) {
                    scenes[i].markAllMaterialsAsDirty(63);
                }
            }
            _this._pipelineContext._handlesSpectorRebuildCallback(onCompiled);
        };
        this._fallbacks = null;
        this._prepareEffect();
    };
    /**
     * Prepares the effect
     * @hidden
     */
    Effect.prototype._prepareEffect = function () {
        var _this = this;
        var attributesNames = this._attributesNames;
        var defines = this.defines;
        var previousPipelineContext = this._pipelineContext;
        this._isReady = false;
        try {
            var engine_1 = this._engine;
            this._pipelineContext = engine_1.createPipelineContext(this._processingContext);
            this._pipelineContext._name = this._key;
            var rebuildRebind = this._rebuildProgram.bind(this);
            if (this._vertexSourceCodeOverride && this._fragmentSourceCodeOverride) {
                engine_1._preparePipelineContext(this._pipelineContext, this._vertexSourceCodeOverride, this._fragmentSourceCodeOverride, true, this._rawVertexSourceCode, this._rawFragmentSourceCode, rebuildRebind, null, this._transformFeedbackVaryings, this._key);
            }
            else {
                engine_1._preparePipelineContext(this._pipelineContext, this._vertexSourceCode, this._fragmentSourceCode, false, this._rawVertexSourceCode, this._rawFragmentSourceCode, rebuildRebind, defines, this._transformFeedbackVaryings, this._key);
            }
            engine_1._executeWhenRenderingStateIsCompiled(this._pipelineContext, function () {
                _this._attributes = [];
                _this._pipelineContext._fillEffectInformation(_this, _this._uniformBuffersNames, _this._uniformsNames, _this._uniforms, _this._samplerList, _this._samplers, attributesNames, _this._attributes);
                // Caches attribute locations.
                if (attributesNames) {
                    for (var i = 0; i < attributesNames.length; i++) {
                        var name_1 = attributesNames[i];
                        _this._attributeLocationByName[name_1] = _this._attributes[i];
                    }
                }
                engine_1.bindSamplers(_this);
                _this._compilationError = "";
                _this._isReady = true;
                if (_this.onCompiled) {
                    _this.onCompiled(_this);
                }
                _this.onCompileObservable.notifyObservers(_this);
                _this.onCompileObservable.clear();
                // Unbind mesh reference in fallbacks
                if (_this._fallbacks) {
                    _this._fallbacks.unBindMesh();
                }
                if (previousPipelineContext) {
                    _this.getEngine()._deletePipelineContext(previousPipelineContext);
                }
            });
            if (this._pipelineContext.isAsync) {
                this._checkIsReady(previousPipelineContext);
            }
        }
        catch (e) {
            this._processCompilationErrors(e, previousPipelineContext);
        }
    };
    Effect.prototype._getShaderCodeAndErrorLine = function (code, error, isFragment) {
        var regexp = isFragment ? /FRAGMENT SHADER ERROR: 0:(\d+?):/ : /VERTEX SHADER ERROR: 0:(\d+?):/;
        var errorLine = null;
        if (error && code) {
            var res = error.match(regexp);
            if (res && res.length === 2) {
                var lineNumber = parseInt(res[1]);
                var lines = code.split("\n", -1);
                if (lines.length >= lineNumber) {
                    errorLine = "Offending line [".concat(lineNumber, "] in ").concat(isFragment ? "fragment" : "vertex", " code: ").concat(lines[lineNumber - 1]);
                }
            }
        }
        return [code, errorLine];
    };
    Effect.prototype._processCompilationErrors = function (e, previousPipelineContext) {
        var _a, _b;
        var _c, _d, _e;
        if (previousPipelineContext === void 0) { previousPipelineContext = null; }
        this._compilationError = e.message;
        var attributesNames = this._attributesNames;
        var fallbacks = this._fallbacks;
        // Let's go through fallbacks then
        Logger.Error("Unable to compile effect:");
        Logger.Error("Uniforms: " +
            this._uniformsNames.map(function (uniform) {
                return " " + uniform;
            }));
        Logger.Error("Attributes: " +
            attributesNames.map(function (attribute) {
                return " " + attribute;
            }));
        Logger.Error("Defines:\r\n" + this.defines);
        if (Effect.LogShaderCodeOnCompilationError) {
            var lineErrorVertex = null, lineErrorFragment = null, code = null;
            if ((_c = this._pipelineContext) === null || _c === void 0 ? void 0 : _c._getVertexShaderCode()) {
                _a = this._getShaderCodeAndErrorLine(this._pipelineContext._getVertexShaderCode(), this._compilationError, false), code = _a[0], lineErrorVertex = _a[1];
                if (code) {
                    Logger.Error("Vertex code:");
                    Logger.Error(code);
                }
            }
            if ((_d = this._pipelineContext) === null || _d === void 0 ? void 0 : _d._getFragmentShaderCode()) {
                _b = this._getShaderCodeAndErrorLine((_e = this._pipelineContext) === null || _e === void 0 ? void 0 : _e._getFragmentShaderCode(), this._compilationError, true), code = _b[0], lineErrorFragment = _b[1];
                if (code) {
                    Logger.Error("Fragment code:");
                    Logger.Error(code);
                }
            }
            if (lineErrorVertex) {
                Logger.Error(lineErrorVertex);
            }
            if (lineErrorFragment) {
                Logger.Error(lineErrorFragment);
            }
        }
        Logger.Error("Error: " + this._compilationError);
        if (previousPipelineContext) {
            this._pipelineContext = previousPipelineContext;
            this._isReady = true;
            if (this.onError) {
                this.onError(this, this._compilationError);
            }
            this.onErrorObservable.notifyObservers(this);
        }
        if (fallbacks) {
            this._pipelineContext = null;
            if (fallbacks.hasMoreFallbacks) {
                this._allFallbacksProcessed = false;
                Logger.Error("Trying next fallback.");
                this.defines = fallbacks.reduce(this.defines, this);
                this._prepareEffect();
            }
            else {
                // Sorry we did everything we can
                this._allFallbacksProcessed = true;
                if (this.onError) {
                    this.onError(this, this._compilationError);
                }
                this.onErrorObservable.notifyObservers(this);
                this.onErrorObservable.clear();
                // Unbind mesh reference in fallbacks
                if (this._fallbacks) {
                    this._fallbacks.unBindMesh();
                }
            }
        }
        else {
            this._allFallbacksProcessed = true;
        }
    };
    Object.defineProperty(Effect.prototype, "isSupported", {
        /**
         * Checks if the effect is supported. (Must be called after compilation)
         */
        get: function () {
            return this._compilationError === "";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Binds a texture to the engine to be used as output of the shader.
     * @param channel Name of the output variable.
     * @param texture Texture to bind.
     * @hidden
     */
    Effect.prototype._bindTexture = function (channel, texture) {
        this._engine._bindTexture(this._samplers[channel], texture, channel);
    };
    /**
     * Sets a texture on the engine to be used in the shader.
     * @param channel Name of the sampler variable.
     * @param texture Texture to set.
     */
    Effect.prototype.setTexture = function (channel, texture) {
        this._engine.setTexture(this._samplers[channel], this._uniforms[channel], texture, channel);
    };
    /**
     * Sets a depth stencil texture from a render target on the engine to be used in the shader.
     * @param channel Name of the sampler variable.
     * @param texture Texture to set.
     */
    Effect.prototype.setDepthStencilTexture = function (channel, texture) {
        this._engine.setDepthStencilTexture(this._samplers[channel], this._uniforms[channel], texture, channel);
    };
    /**
     * Sets an array of textures on the engine to be used in the shader.
     * @param channel Name of the variable.
     * @param textures Textures to set.
     */
    Effect.prototype.setTextureArray = function (channel, textures) {
        var exName = channel + "Ex";
        if (this._samplerList.indexOf(exName + "0") === -1) {
            var initialPos = this._samplerList.indexOf(channel);
            for (var index = 1; index < textures.length; index++) {
                var currentExName = exName + (index - 1).toString();
                this._samplerList.splice(initialPos + index, 0, currentExName);
            }
            // Reset every channels
            var channelIndex = 0;
            for (var _i = 0, _a = this._samplerList; _i < _a.length; _i++) {
                var key = _a[_i];
                this._samplers[key] = channelIndex;
                channelIndex += 1;
            }
        }
        this._engine.setTextureArray(this._samplers[channel], this._uniforms[channel], textures, channel);
    };
    /**
     * Sets a texture to be the input of the specified post process. (To use the output, pass in the next post process in the pipeline)
     * @param channel Name of the sampler variable.
     * @param postProcess Post process to get the input texture from.
     */
    Effect.prototype.setTextureFromPostProcess = function (channel, postProcess) {
        this._engine.setTextureFromPostProcess(this._samplers[channel], postProcess, channel);
    };
    /**
     * (Warning! setTextureFromPostProcessOutput may be desired instead)
     * Sets the input texture of the passed in post process to be input of this effect. (To use the output of the passed in post process use setTextureFromPostProcessOutput)
     * @param channel Name of the sampler variable.
     * @param postProcess Post process to get the output texture from.
     */
    Effect.prototype.setTextureFromPostProcessOutput = function (channel, postProcess) {
        this._engine.setTextureFromPostProcessOutput(this._samplers[channel], postProcess, channel);
    };
    /**
     * Binds a buffer to a uniform.
     * @param buffer Buffer to bind.
     * @param name Name of the uniform variable to bind to.
     */
    Effect.prototype.bindUniformBuffer = function (buffer, name) {
        var bufferName = this._uniformBuffersNames[name];
        if (bufferName === undefined || (Effect._BaseCache[bufferName] === buffer && this._engine._features.useUBOBindingCache)) {
            return;
        }
        Effect._BaseCache[bufferName] = buffer;
        this._engine.bindUniformBufferBase(buffer, bufferName, name);
    };
    /**
     * Binds block to a uniform.
     * @param blockName Name of the block to bind.
     * @param index Index to bind.
     */
    Effect.prototype.bindUniformBlock = function (blockName, index) {
        this._engine.bindUniformBlock(this._pipelineContext, blockName, index);
    };
    /**
     * Sets an integer value on a uniform variable.
     * @param uniformName Name of the variable.
     * @param value Value to be set.
     * @returns this effect.
     */
    Effect.prototype.setInt = function (uniformName, value) {
        this._pipelineContext.setInt(uniformName, value);
        return this;
    };
    /**
     * Sets an int2 value on a uniform variable.
     * @param uniformName Name of the variable.
     * @param x First int in int2.
     * @param y Second int in int2.
     * @returns this effect.
     */
    Effect.prototype.setInt2 = function (uniformName, x, y) {
        this._pipelineContext.setInt2(uniformName, x, y);
        return this;
    };
    /**
     * Sets an int3 value on a uniform variable.
     * @param uniformName Name of the variable.
     * @param x First int in int3.
     * @param y Second int in int3.
     * @param z Third int in int3.
     * @returns this effect.
     */
    Effect.prototype.setInt3 = function (uniformName, x, y, z) {
        this._pipelineContext.setInt3(uniformName, x, y, z);
        return this;
    };
    /**
     * Sets an int4 value on a uniform variable.
     * @param uniformName Name of the variable.
     * @param x First int in int4.
     * @param y Second int in int4.
     * @param z Third int in int4.
     * @param w Fourth int in int4.
     * @returns this effect.
     */
    Effect.prototype.setInt4 = function (uniformName, x, y, z, w) {
        this._pipelineContext.setInt4(uniformName, x, y, z, w);
        return this;
    };
    /**
     * Sets an int array on a uniform variable.
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setIntArray = function (uniformName, array) {
        this._pipelineContext.setIntArray(uniformName, array);
        return this;
    };
    /**
     * Sets an int array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setIntArray2 = function (uniformName, array) {
        this._pipelineContext.setIntArray2(uniformName, array);
        return this;
    };
    /**
     * Sets an int array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setIntArray3 = function (uniformName, array) {
        this._pipelineContext.setIntArray3(uniformName, array);
        return this;
    };
    /**
     * Sets an int array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setIntArray4 = function (uniformName, array) {
        this._pipelineContext.setIntArray4(uniformName, array);
        return this;
    };
    /**
     * Sets an float array on a uniform variable.
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setFloatArray = function (uniformName, array) {
        this._pipelineContext.setArray(uniformName, array);
        return this;
    };
    /**
     * Sets an float array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setFloatArray2 = function (uniformName, array) {
        this._pipelineContext.setArray2(uniformName, array);
        return this;
    };
    /**
     * Sets an float array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setFloatArray3 = function (uniformName, array) {
        this._pipelineContext.setArray3(uniformName, array);
        return this;
    };
    /**
     * Sets an float array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setFloatArray4 = function (uniformName, array) {
        this._pipelineContext.setArray4(uniformName, array);
        return this;
    };
    /**
     * Sets an array on a uniform variable.
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setArray = function (uniformName, array) {
        this._pipelineContext.setArray(uniformName, array);
        return this;
    };
    /**
     * Sets an array 2 on a uniform variable. (Array is specified as single array eg. [1,2,3,4] will result in [[1,2],[3,4]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setArray2 = function (uniformName, array) {
        this._pipelineContext.setArray2(uniformName, array);
        return this;
    };
    /**
     * Sets an array 3 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6] will result in [[1,2,3],[4,5,6]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setArray3 = function (uniformName, array) {
        this._pipelineContext.setArray3(uniformName, array);
        return this;
    };
    /**
     * Sets an array 4 on a uniform variable. (Array is specified as single array eg. [1,2,3,4,5,6,7,8] will result in [[1,2,3,4],[5,6,7,8]] in the shader)
     * @param uniformName Name of the variable.
     * @param array array to be set.
     * @returns this effect.
     */
    Effect.prototype.setArray4 = function (uniformName, array) {
        this._pipelineContext.setArray4(uniformName, array);
        return this;
    };
    /**
     * Sets matrices on a uniform variable.
     * @param uniformName Name of the variable.
     * @param matrices matrices to be set.
     * @returns this effect.
     */
    Effect.prototype.setMatrices = function (uniformName, matrices) {
        this._pipelineContext.setMatrices(uniformName, matrices);
        return this;
    };
    /**
     * Sets matrix on a uniform variable.
     * @param uniformName Name of the variable.
     * @param matrix matrix to be set.
     * @returns this effect.
     */
    Effect.prototype.setMatrix = function (uniformName, matrix) {
        this._pipelineContext.setMatrix(uniformName, matrix);
        return this;
    };
    /**
     * Sets a 3x3 matrix on a uniform variable. (Specified as [1,2,3,4,5,6,7,8,9] will result in [1,2,3][4,5,6][7,8,9] matrix)
     * @param uniformName Name of the variable.
     * @param matrix matrix to be set.
     * @returns this effect.
     */
    Effect.prototype.setMatrix3x3 = function (uniformName, matrix) {
        // the cast is ok because it is gl.uniformMatrix3fv() which is called at the end, and this function accepts Float32Array and Array<number>
        this._pipelineContext.setMatrix3x3(uniformName, matrix);
        return this;
    };
    /**
     * Sets a 2x2 matrix on a uniform variable. (Specified as [1,2,3,4] will result in [1,2][3,4] matrix)
     * @param uniformName Name of the variable.
     * @param matrix matrix to be set.
     * @returns this effect.
     */
    Effect.prototype.setMatrix2x2 = function (uniformName, matrix) {
        // the cast is ok because it is gl.uniformMatrix3fv() which is called at the end, and this function accepts Float32Array and Array<number>
        this._pipelineContext.setMatrix2x2(uniformName, matrix);
        return this;
    };
    /**
     * Sets a float on a uniform variable.
     * @param uniformName Name of the variable.
     * @param value value to be set.
     * @returns this effect.
     */
    Effect.prototype.setFloat = function (uniformName, value) {
        this._pipelineContext.setFloat(uniformName, value);
        return this;
    };
    /**
     * Sets a boolean on a uniform variable.
     * @param uniformName Name of the variable.
     * @param bool value to be set.
     * @returns this effect.
     */
    Effect.prototype.setBool = function (uniformName, bool) {
        this._pipelineContext.setInt(uniformName, bool ? 1 : 0);
        return this;
    };
    /**
     * Sets a Vector2 on a uniform variable.
     * @param uniformName Name of the variable.
     * @param vector2 vector2 to be set.
     * @returns this effect.
     */
    Effect.prototype.setVector2 = function (uniformName, vector2) {
        this._pipelineContext.setVector2(uniformName, vector2);
        return this;
    };
    /**
     * Sets a float2 on a uniform variable.
     * @param uniformName Name of the variable.
     * @param x First float in float2.
     * @param y Second float in float2.
     * @returns this effect.
     */
    Effect.prototype.setFloat2 = function (uniformName, x, y) {
        this._pipelineContext.setFloat2(uniformName, x, y);
        return this;
    };
    /**
     * Sets a Vector3 on a uniform variable.
     * @param uniformName Name of the variable.
     * @param vector3 Value to be set.
     * @returns this effect.
     */
    Effect.prototype.setVector3 = function (uniformName, vector3) {
        this._pipelineContext.setVector3(uniformName, vector3);
        return this;
    };
    /**
     * Sets a float3 on a uniform variable.
     * @param uniformName Name of the variable.
     * @param x First float in float3.
     * @param y Second float in float3.
     * @param z Third float in float3.
     * @returns this effect.
     */
    Effect.prototype.setFloat3 = function (uniformName, x, y, z) {
        this._pipelineContext.setFloat3(uniformName, x, y, z);
        return this;
    };
    /**
     * Sets a Vector4 on a uniform variable.
     * @param uniformName Name of the variable.
     * @param vector4 Value to be set.
     * @returns this effect.
     */
    Effect.prototype.setVector4 = function (uniformName, vector4) {
        this._pipelineContext.setVector4(uniformName, vector4);
        return this;
    };
    /**
     * Sets a Quaternion on a uniform variable.
     * @param uniformName Name of the variable.
     * @param quaternion Value to be set.
     * @returns this effect.
     */
    Effect.prototype.setQuaternion = function (uniformName, quaternion) {
        this._pipelineContext.setQuaternion(uniformName, quaternion);
        return this;
    };
    /**
     * Sets a float4 on a uniform variable.
     * @param uniformName Name of the variable.
     * @param x First float in float4.
     * @param y Second float in float4.
     * @param z Third float in float4.
     * @param w Fourth float in float4.
     * @returns this effect.
     */
    Effect.prototype.setFloat4 = function (uniformName, x, y, z, w) {
        this._pipelineContext.setFloat4(uniformName, x, y, z, w);
        return this;
    };
    /**
     * Sets a Color3 on a uniform variable.
     * @param uniformName Name of the variable.
     * @param color3 Value to be set.
     * @returns this effect.
     */
    Effect.prototype.setColor3 = function (uniformName, color3) {
        this._pipelineContext.setColor3(uniformName, color3);
        return this;
    };
    /**
     * Sets a Color4 on a uniform variable.
     * @param uniformName Name of the variable.
     * @param color3 Value to be set.
     * @param alpha Alpha value to be set.
     * @returns this effect.
     */
    Effect.prototype.setColor4 = function (uniformName, color3, alpha) {
        this._pipelineContext.setColor4(uniformName, color3, alpha);
        return this;
    };
    /**
     * Sets a Color4 on a uniform variable
     * @param uniformName defines the name of the variable
     * @param color4 defines the value to be set
     * @returns this effect.
     */
    Effect.prototype.setDirectColor4 = function (uniformName, color4) {
        this._pipelineContext.setDirectColor4(uniformName, color4);
        return this;
    };
    /**
     * Release all associated resources.
     **/
    Effect.prototype.dispose = function () {
        if (this._pipelineContext) {
            this._pipelineContext.dispose();
        }
        this._engine._releaseEffect(this);
        this._isDisposed = true;
    };
    /**
     * This function will add a new shader to the shader store
     * @param name the name of the shader
     * @param pixelShader optional pixel shader content
     * @param vertexShader optional vertex shader content
     * @param shaderLanguage the language the shader is written in (default: GLSL)
     */
    Effect.RegisterShader = function (name, pixelShader, vertexShader, shaderLanguage) {
        if (shaderLanguage === void 0) { shaderLanguage = ShaderLanguage.GLSL; }
        if (pixelShader) {
            ShaderStore.GetShadersStore(shaderLanguage)["".concat(name, "PixelShader")] = pixelShader;
        }
        if (vertexShader) {
            ShaderStore.GetShadersStore(shaderLanguage)["".concat(name, "VertexShader")] = vertexShader;
        }
    };
    /**
     * Resets the cache of effects.
     */
    Effect.ResetCache = function () {
        Effect._BaseCache = {};
    };
    /**
     * Enable logging of the shader code when a compilation error occurs
     */
    Effect.LogShaderCodeOnCompilationError = true;
    Effect._UniqueIdSeed = 0;
    Effect._BaseCache = {};
    /**
     * Store of each shader (The can be looked up using effect.key)
     */
    Effect.ShadersStore = ShaderStore.ShadersStore;
    /**
     * Store of each included file for a shader (The can be looked up using effect.key)
     */
    Effect.IncludesShadersStore = ShaderStore.IncludesShadersStore;
    return Effect;
}());

export { DomManagement as D, Effect as E, GetDOMTextContent as G, IsWindowObjectExist as I, ShaderLanguage as S, IsNavigatorAvailable as a, IsDocumentAvailable as b, ShaderProcessor as c, ShaderStore as d };
