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
let scrollToBottom = (element) => {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }
let onLast = (ta) => ta.value.substr(0, ta.selectionStart).split("\n").length == ta.value.split("\n").length;
let prelude = "";


let code = document.getElementById("code");
code.setSelectionRange(code.value.length,code.value.length);
code.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        let s = getLine(code);
        let str = s.trim();
        console.log(str);
        let out = "";
        if(str == ")h") {out = `REPL Help:
)lb - show BQN keyboard
)cmds - show all commands
)clear - clears all variables
)cls - clears all text on screen.`; }
        else if(str == ")clear") { prelude = ""; }
        else if(str == ")cls") { code.value = ""; }
        else if(str == ")cmds") { out = `+   +  conjugate / add           ⥊  \\z  deshape / reshape
-   -  negate / subtract         ∾  \\,  join / join to
×  \\=  sign / multiply           ≍  \\.  solo / couple
÷  \\-  reciprocal / divide       ↑  \\r  prefixes / take
⋆  \\+  exponential / power       ↓  \\c  sufixes / drop
√  \\_  square root / nth root    ↕  \\d  range / windows
⌊  \\b  floor / minimum           «  \\H  nudge / shift before
⌈  \\B  ceiling / maximum         »  \\L  nudge after / shift after
∧  \\t  sort up / and             ⌽  \\q  reverse / rotate
∨  \\v  sort down / or            ⍉  \\a  transpose / reorder axes
¬  \\~  not / span                /   /  indices / replicate
|  |   absolute value / modulus  ⊏  \\i  first cell / select
≤  \\<  less than or equal to     ⊑  \\I  first / pick
<   <  enclose / less than       ⊐  \\o  classify / index of
>   >  merge / greater than      ⊒  \\O  occurence count / progressive index of
≥  \\>  greater than or equal to  ⍋  \\T  grade up / bins up
=   =  rank / equals             ⍒  \\V  grade down / bins down
≠  \\/  length / not equals       ∊  \\e  mark first / member of
≡  \\m  depth / match             ⍷  \\E  deduplicate / find
≢  \\M  shape / not match         ⊔  \\u  group indices / group
⊣  \\{  identity / left           !   !  assert / assert with message
⊢  \\}  identity / right`; }
        else if(str == ")lb") {let d=document;let e=d.createElement("script");e.src="https://abrudz.github.io/lb/bqn.js";d.body.appendChild(e)}
        else { try {
            out = fmt(bqn(prelude + str));
            if(str.match(/\b_?[a-z¯π∞0-9_]+_?\s*[←↩⇐]/i)) {
                prelude += str + "\n";
                console.log(prelude);
            }
        } catch (obj) {
            out = "ERROR: " + fmtErr(obj);
        } }
        if(!onLast(code)) { out = s + out; }
        code.value += code.value ? ( "\n" + out + "\n  ") : "  ";
        code.selectionStart = code.value.length;
        code.selectionEnd = code.value.length;
        scrollToBottom(code);
    }
});