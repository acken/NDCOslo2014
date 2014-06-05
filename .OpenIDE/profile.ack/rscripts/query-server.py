#!/usr/bin/env python
import os,sys,urllib

def print_react_patterns():
    print("'evaluate-at-caret'")
    print("'user-inputted' 'query-server' '*")
    
def get_caret():
    output = [];
    sys.stdout.write("request|editor get-caret\n")
    sys.stdout.flush()
    while True:
        line = sys.stdin.readline().strip("\n")
        if line == "end-of-conversation":
            break;
        output.append(line)
    caret = output[0].split("|")
    return caret[0], int(caret[1]), int(caret[2]), output[1:]

def read(f):
    content = f.read()
    f.close()
    return content

def write(f, contents):
    f.write(contents)
    f.close()

def run_query(tmpfl):
    filename, line, column, content = get_caret()
    if filename.endswith(".cs"):
        trimmed = content[line-1].strip()
        if trimmed.startswith("Get[\""):
            trimmed = trimmed[5:]
            url = "http://localhost:1234"+trimmed[0:trimmed.index("\"")]
            print("command|editor user-input query-server \""+url+"\"")
        else:
            if os.path.exists(tmpfl):
                url = read(open(tmpfl, "r"))
                print(read(urllib.urlopen(url)))

def run_inputted_query(tmpfl, selection):
    if selection == "user-cancelled":
        return
    print(selection)
    print(read(urllib.urlopen(selection)))
    write(open(tmpfl, "w"), selection)

def handle_event(event, global_profile, local_profile, args):
    tmpfl = "/tmp/ndcurl.url"
    if event == "'evaluate-at-caret'":
        run_query(tmpfl)
    elif event.startswith("'user-inputted' 'query-server' '"):
        token = "'user-inputted' 'query-server' '"
        run_inputted_query(tmpfl, event[len(token):-1])

if __name__ == "__main__":
    args = sys.argv
    if len(args) > 1 and args[1] == 'reactive-script-reacts-to':
        print_react_patterns()
    else:
        handle_event(args[1], args[2], args[3], args[4:])
