"use strict";

function e(e) {
    return e && "object" == typeof e && "default" in e ? e : {default: e}
}

var t = e(require("postcss-selector-parser"));
const s = e => {
    e = "object" == typeof e && e || n;
    const s = Boolean(!("preserve" in e) || e.preserve);
    return {
        postcssPlugin: "css-has-pseudo", Rule: (e, {result: n}) => {
            if (!e.selector.includes(":has(")) return;
            let c;
            try {
                const s = t.default((e => {
                    e.walkPseudos((e => {
                        if (":has" === e.value && e.nodes) {
                            const s = r(e);
                            e.value = s ? "not-has" : "has";
                            const n = t.default.attribute({attribute: o(String(e))});
                            s ? e.parent.parent.replaceWith(n) : e.replaceWith(n)
                        }
                    }))
                })).processSync(e.selector);
                c = String(s)
            } catch (t) {
                return void e.warn(n, `Failed to parse selector : ${e.selector}`)
            }
            void 0 !== c && c !== e.selector && (s ? e.cloneBefore({selector: c}) : e.selector = c)
        }
    }
};
s.postcss = !0;
const n = {preserve: !0}, o = e => {
    let t = "", s = "";
    const n = () => {
        if (s) {
            const e = encodeURIComponent(s);
            let n = "", o = "";
            const r = () => {
                n && (o += n, n = "")
            };
            let c = !1;
            for (let t = 0; t < e.length; t++) {
                const s = e[t];
                if (c) n += s, c = !1; else switch (s) {
                    case"%":
                        r(), o += "\\" + s;
                        continue;
                    case"\\":
                        n += s, c = !0;
                        continue;
                    default:
                        n += s;
                        continue
                }
            }
            r(), t += o, s = ""
        }
    };
    let o = !1;
    for (let r = 0; r < e.length; r++) {
        const c = e[r];
        if (o) s += c, o = !1; else switch (c) {
            case":":
            case"[":
            case"]":
            case",":
            case"(":
            case")":
                n(), t += "\\" + c;
                continue;
            case"\\":
                s += c, o = !0;
                continue;
            default:
                s += c;
                continue
        }
    }
    return n(), t
}, r = e => {
    var t, s;
    return "pseudo" === (null == (t = e.parent) || null == (s = t.parent) ? void 0 : s.type) && ":not" === e.parent.parent.value
};
module.exports = s;
