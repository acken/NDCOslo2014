$(document).ready(function() {
    var client = new WebSocket("ws://127.0.0.1:8081/");
    client.onopen = function () {
        console.log("Connected")
    };
    client.onmessage = function (event) {
        var body = JSON.parse(event.data);
        changeRule(body.stylesheet, body.name, body.rule);
    };
    client.onclose = function () {
        console.log("Disconnecting");
    };

    compileTemplate("#sampleTemplate", "#sample", {
        data: {
            "hello": "Hello",
            "world": "World!"
        }
    });
});

function compileTemplate(name, destination, data) {
    var source   = $(name).html();
    var template = Handlebars.compile(source);
    var html    = template(data);
    $(destination).html(html);
}

function changeRule(sheetname, rulename, content) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var stylesheet = document.styleSheets[i];
        if (stylesheet.href.indexOf(sheetname) > -1) {
            for (var a = 0; a < stylesheet.cssRules.length; a++) {
                if (stylesheet.cssRules[a].selectorText == rulename) {
                    stylesheet.deleteRule(a);
                    stylesheet.insertRule(content, 0);
                    return;
                }
            };
            stylesheet.insertRule(content, 0);
            return;
        }
    };
}