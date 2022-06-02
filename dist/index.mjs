import e from "postcss-selector-parser";

const t = t => {
    t = "object" == typeof t && t || s;
    const c = Boolean(!("preserve" in t) || t.preserve);
    return {
        postcssPlugin: "css-has-pseudo", Rule: (t, {result: s}) => {
            if (!t.selector.includes(":has(")) return;
            let r;
            try {
                const s = e((t => {
                    t.walkPseudos((t => {
                        if (":has" === t.value && t.nodes) {
                            const s = o(t);
                            t.value = s ? "not-has" : "has";
                            const c = e.attribute({attribute: n(String(t))});
                            s ? t.parent.parent.replaceWith(c) : t.replaceWith(c)
                        }
                    }))
                })).processSync(t.selector);
                r = String(s)
            } catch (e) {
                return void t.warn(s, `Failed to parse selector : ${t.selector}`)
            }
            void 0 !== r && r !== t.selector && (c ? t.cloneBefore({selector: r}) : t.selector = r)
        }
    }
};
t.postcss = !0;
const s = {preserve: !0}, n = e => {
    let t = "", s = "";
    const n = () => {
        if (s) {
            const e = encodeURIComponent(s);
            let n = "", o = "";
            const c = () => {
                n && (o += n, n = "")
            };
            let r = !1;
            for (let t = 0; t < e.length; t++) {
                const s = e[t];
                if (r) n += s, r = !1; else switch (s) {
                    case"%":
                        c(), o += "\\" + s;
                        continue;
                    case"\\":
                        n += s, r = !0;
                        continue;
                    default:
                        n += s;
                        continue
                }
            }
            c(), t += o, s = ""
        }
    };
    let o = !1;
    for (let c = 0; c < e.length; c++) {
        const r = e[c];
        if (o) s += r, o = !1; else switch (r) {
            case":":
            case"[":
            case"]":
            case",":
            case"(":
            case")":
                n(), t += "\\" + r;
                continue;
            case"\\":
                s += r, o = !0;
                continue;
            default:
                s += r;
                continue
        }
    }
    return n(), t
}, o = e => {
    var t, s;
    return "pseudo" === (null == (t = e.parent) || null == (s = t.parent) ? void 0 : s.type) && ":not" === e.parent.parent.value
};
export {t as default};
