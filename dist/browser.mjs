function e(e) {
    var t = [], n = e.createElement("x");

    function o() {
        requestAnimationFrame((function () {
            t.forEach((function (t) {
                var o = [];
                [].forEach.call(e.querySelectorAll(t.scopeSelector), (function (r) {
                    var l = [].indexOf.call(r.parentNode.children, r) + 1, c = t.relativeSelectors.map((function (e) {
                        return t.scopeSelector + ":nth-child(" + l + ") " + e
                    })).join(), a = r.parentNode.querySelector(c);
                    (t.isNot ? !a : a) && (o.push(r), n.innerHTML = "<x " + t.attributeName + ">", r.setAttributeNode(n.children[0].attributes[0].cloneNode()), e.documentElement.style.zoom = 1, e.documentElement.style.zoom = null)
                })), t.nodes.forEach((function (n) {
                    -1 === o.indexOf(n) && (n.removeAttribute(t.attributeName), e.documentElement.style.zoom = 1, e.documentElement.style.zoom = null)
                })), t.nodes = o
            }))
        }))
    }

    function r(e) {
        try {
            [].forEach.call(e.cssRules || [], (function (e) {
                if (e.selectorText) {
                    var n = decodeURIComponent(e.selectorText.replace(/\\(.)/g, "$1")).match(/^(.*?)\[(not-)?has\((.+?)\)\](.*?)$/);
                    if (n) {
                        var o = (n[2] ? "not-" : "") + "has(" + encodeURIComponent(n[3]).replace(/%3A/g, ":").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%2C/g, ",") + ")";
                        t.push({
                            rule: e,
                            scopeSelector: n[1],
                            isNot: n[2],
                            relativeSelectors: n[3].split(/\s*,\s*/),
                            attributeName: o,
                            nodes: []
                        })
                    }
                } else r(e)
            }))
        } catch (e) {
        }
    }

    [].forEach.call(e.styleSheets, r), o(), new MutationObserver((function (n) {
        n.forEach((function (n) {
            [].forEach.call(n.addedNodes || [], (function (e) {
                1 === e.nodeType && e.sheet && r(e.sheet)
            })), [].push.apply(t, t.splice(0).filter((function (t) {
                return t.rule.parentStyleSheet && t.rule.parentStyleSheet.ownerNode && e.documentElement.contains(t.rule.parentStyleSheet.ownerNode)
            }))), o()
        }))
    })).observe(e, {
        childList: !0,
        subtree: !0
    }), e.addEventListener("focus", o, !0), e.addEventListener("blur", o, !0), e.addEventListener("input", o)
}

export {e as default};
//# sourceMappingURL=browser.mjs.map
