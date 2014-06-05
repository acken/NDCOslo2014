#!/usr/bin/env node

if (process.argv.length > 2) {
    if (process.argv[2] === "reactive-script-reacts-to") {
        console.log("'evaluate-at-caret'");
        console.log("'editor' 'buffer-changed' '*.css'")
        console.log("run-as-service")
        process.exit();
    }
}

var readline = require('readline'),
    path = require('path'),
    WebSocketServer = require('./domhack-files/node_modules/ws').Server,
    wss = new WebSocketServer({port: 8081});

wss.broadcast = function(data) {
    for(var i in this.clients)
        this.clients[i].send(data);
};

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var state = 'idle';
var caretRaw = [];

console.log("starting domhack session");
rl.on('line', function (line) {
    if (line === 'shutdown') {
        console.log("shutting down");
        process.exit();
    }
    if (line === "'evaluate-at-caret'" || line.indexOf("'editor' 'buffer-changed' '") === 0) {
        state = 'get-caret';
        caretRaw = [];
        console.log('request|editor get-caret');
        return;
    }
    if (state === 'get-caret') {
        if (line === 'end-of-conversation') {
            state = 'idle';
            var caret = parseCaret(caretRaw);
            if (caret.file.indexOf('.css') > 0) {
                var expression = getExpression(caret);
                wss.broadcast(JSON.stringify(expression));
            }
            return;
        }
        caretRaw.push(line);
    }
});

function parseCaret(caretRaw) {
    var position = caretRaw[0].split('|');
    caretRaw.shift();
    return {
        file: position[0],
        line: parseInt(position[1]),
        column: parseInt(position[2]),
        content: caretRaw
    };
}

function getExpression(caret) {
    var expression = "";
    for (var i = caret.line - 1; i >= 0; i--) {
        line = caret.content[i];
        if (line.trim() === "") {
            break;
        }
        expression = line+"\n" + expression;
    };
    for (var i = caret.line; i < caret.content.length; i++) {
        line = caret.content[i];
        if (line.trim() === "") {
            break;
        }
        expression = expression + line+"\n";
    };
    return {
        rule: expression,
        name: expression.substring(0, expression.indexOf("{")).trim(),
        stylesheet: path.basename(caret.file)
    };
}
