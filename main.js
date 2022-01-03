function getLine(textarea) {
    console.log("getting stuff");
    let v = textarea.value;
    let start = 0, end = v.length;
    for (let i = textarea.selectionStart; i < v.length; i++) {
        if (v[i] == '\n') { end = i + 1 ; break; }
    }
    for (let i = textarea.selectionStart - 1; i >=0 ; i--) {
        if (v[i] == '\n') { start = i + 1; break; }
    }

    return v.substr(start, end - start);
}

let prelude = "";


let code = document.getElementById("code");
code.setSelectionRange(code.value.length,code.value.length);
code.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        let str = getLine(code).trim();
        console.log(str);
        let out = "";
        if(str == ")h") {out = `REPL Help:
)clear - clears all variables
)cls - clears all text on screen.`; }
        else if(str == ")clear") { prelude = ""; }
        else if(str == ")cls") { code.value = ""; }
        else { try {
            out = fmt(bqn(prelude + str));
            if(str.match(/\b_?[a-z¯π∞0-9_]+_?\s*[←↩⇐]/i)) {
                prelude += str + "\n";
                console.log(prelude);
            }
        } catch (obj) {
            out = "ERROR: " + fmtErr(obj);
        } }
        code.value += code.value ? ("\n" + out + "\n  ") : "  ";
        code.selectionStart = code.value.length;
        code.selectionEnd = code.value.length;

    }
});