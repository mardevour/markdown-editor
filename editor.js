! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).CodeMirror = t()
}(this, (function() {
    "use strict";
    var e = navigator.userAgent,
        t = navigator.platform,
        r = /gecko\/\d/i.test(e),
        n = /MSIE \d/.test(e),
        i = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
        o = /Edge\/(\d+)/.exec(e),
        a = n || i || o,
        l = a && (n ? document.documentMode || 6 : +(o || i)[1]),
        s = !o && /WebKit\//.test(e),
        c = s && /Qt\/\d+\.\d+/.test(e),
        u = !o && /Chrome\//.test(e),
        d = /Opera\//.test(e),
        f = /Apple Computer/.test(navigator.vendor),
        p = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
        h = /PhantomJS/.test(e),
        m = !o && /AppleWebKit/.test(e) && /Mobile\/\w+/.test(e),
        g = /Android/.test(e),
        v = m || g || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
        y = m || /Mac/.test(t),
        b = /\bCrOS\b/.test(e),
        x = /win/i.test(t),
        k = d && e.match(/Version\/(\d*\.\d*)/);
    k && (k = Number(k[1])), k && k >= 15 && (d = !1, s = !0);
    var w = y && (c || d && (null == k || k < 12.11)),
        _ = r || a && l >= 9;

    function C(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
    }
    var S, T = function(e, t) {
        var r = e.className,
            n = C(t).exec(r);
        if (n) {
            var i = r.slice(n.index + n[0].length);
            e.className = r.slice(0, n.index) + (i ? n[1] + i : "")
        }
    };

    function L(e) {
        for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
        return e
    }

    function M(e, t) {
        return L(e).appendChild(t)
    }

    function A(e, t, r, n) {
        var i = document.createElement(e);
        if (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t) i.appendChild(document.createTextNode(t));
        else if (t)
            for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
        return i
    }

    function E(e, t, r, n) {
        var i = A(e, t, r, n);
        return i.setAttribute("role", "presentation"), i
    }

    function D(e, t) {
        if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
        do {
            if (11 == t.nodeType && (t = t.host), t == e) return !0
        } while (t = t.parentNode)
    }

    function z() {
        var e;
        try {
            e = document.activeElement
        } catch (t) {
            e = document.body || null
        }
        for (; e && e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
        return e
    }

    function N(e, t) {
        var r = e.className;
        C(t).test(r) || (e.className += (r ? " " : "") + t)
    }

    function O(e, t) {
        for (var r = e.split(" "), n = 0; n < r.length; n++) r[n] && !C(r[n]).test(t) && (t += " " + r[n]);
        return t
    }
    S = document.createRange ? function(e, t, r, n) {
        var i = document.createRange();
        return i.setEnd(n || e, r), i.setStart(e, t), i
    } : function(e, t, r) {
        var n = document.body.createTextRange();
        try {
            n.moveToElementText(e.parentNode)
        } catch (e) {
            return n
        }
        return n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n
    };
    var F = function(e) {
        e.select()
    };

    function q(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
            return e.apply(null, t)
        }
    }

    function I(e, t, r) {
        for (var n in t || (t = {}), e) !e.hasOwnProperty(n) || !1 === r && t.hasOwnProperty(n) || (t[n] = e[n]);
        return t
    }

    function P(e, t, r, n, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
        for (var o = n || 0, a = i || 0;;) {
            var l = e.indexOf("\t", o);
            if (l < 0 || l >= t) return a + (t - o);
            a += l - o, a += r - a % r, o = l + 1
        }
    }
    m ? F = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length
    } : a && (F = function(e) {
        try {
            e.select()
        } catch (e) {}
    });
    var R = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = q(this.onTimeout, this)
    };

    function $(e, t) {
        for (var r = 0; r < e.length; ++r)
            if (e[r] == t) return r;
        return -1
    }
    R.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +new Date ? e.f() : setTimeout(e.handler, e.time - +new Date)
    }, R.prototype.set = function(e, t) {
        this.f = t;
        var r = +new Date + e;
        (!this.id || r < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = r)
    };
    var W = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        },
        B = {
            scroll: !1
        },
        H = {
            origin: "*mouse"
        },
        j = {
            origin: "+move"
        };

    function U(e, t, r) {
        for (var n = 0, i = 0;;) {
            var o = e.indexOf("\t", n); - 1 == o && (o = e.length);
            var a = o - n;
            if (o == e.length || i + a >= t) return n + Math.min(a, t - i);
            if (i += o - n, n = o + 1, (i += r - i % r) >= t) return n
        }
    }
    var G = [""];

    function V(e) {
        for (; G.length <= e;) G.push(K(G) + " ");
        return G[e]
    }

    function K(e) {
        return e[e.length - 1]
    }

    function Z(e, t) {
        for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
        return r
    }

    function X() {}

    function Y(e, t) {
        var r;
        return Object.create ? r = Object.create(e) : (X.prototype = e, r = new X), t && I(t, r), r
    }
    var Q = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

    function J(e) {
        return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Q.test(e))
    }

    function ee(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && J(e)) || t.test(e) : J(e)
    }

    function te(e) {
        for (var t in e)
            if (e.hasOwnProperty(t) && e[t]) return !1;
        return !0
    }
    var re = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

    function ne(e) {
        return e.charCodeAt(0) >= 768 && re.test(e)
    }

    function ie(e, t, r) {
        for (;
            (r < 0 ? t > 0 : t < e.length) && ne(e.charAt(t));) t += r;
        return t
    }

    function oe(e, t, r) {
        for (var n = t > r ? -1 : 1;;) {
            if (t == r) return t;
            var i = (t + r) / 2,
                o = n < 0 ? Math.ceil(i) : Math.floor(i);
            if (o == t) return e(o) ? t : r;
            e(o) ? r = o : t = o + n
        }
    }
    var ae = null;

    function le(e, t, r) {
        var n;
        ae = null;
        for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.from < t && o.to > t) return i;
            o.to == t && (o.from != o.to && "before" == r ? n = i : ae = i), o.from == t && (o.from != o.to && "before" != r ? n = i : ae = i)
        }
        return null != n ? n : ae
    }
    var se = function() {
        var e = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            t = /[stwN]/,
            r = /[LRr]/,
            n = /[Lb1n]/,
            i = /[1n]/;

        function o(e, t, r) {
            this.level = e, this.from = t, this.to = r
        }
        return function(a, l) {
            var s = "ltr" == l ? "L" : "R";
            if (0 == a.length || "ltr" == l && !e.test(a)) return !1;
            for (var c, u = a.length, d = [], f = 0; f < u; ++f) d.push((c = a.charCodeAt(f)) <= 247 ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(c) : 1424 <= c && c <= 1524 ? "R" : 1536 <= c && c <= 1785 ? "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(c - 1536) : 1774 <= c && c <= 2220 ? "r" : 8192 <= c && c <= 8203 ? "w" : 8204 == c ? "b" : "L");
            for (var p = 0, h = s; p < u; ++p) {
                var m = d[p];
                "m" == m ? d[p] = h : h = m
            }
            for (var g = 0, v = s; g < u; ++g) {
                var y = d[g];
                "1" == y && "r" == v ? d[g] = "n" : r.test(y) && (v = y, "r" == y && (d[g] = "R"))
            }
            for (var b = 1, x = d[0]; b < u - 1; ++b) {
                var k = d[b];
                "+" == k && "1" == x && "1" == d[b + 1] ? d[b] = "1" : "," != k || x != d[b + 1] || "1" != x && "n" != x || (d[b] = x), x = k
            }
            for (var w = 0; w < u; ++w) {
                var _ = d[w];
                if ("," == _) d[w] = "N";
                else if ("%" == _) {
                    var C = void 0;
                    for (C = w + 1; C < u && "%" == d[C]; ++C);
                    for (var S = w && "!" == d[w - 1] || C < u && "1" == d[C] ? "1" : "N", T = w; T < C; ++T) d[T] = S;
                    w = C - 1
                }
            }
            for (var L = 0, M = s; L < u; ++L) {
                var A = d[L];
                "L" == M && "1" == A ? d[L] = "L" : r.test(A) && (M = A)
            }
            for (var E = 0; E < u; ++E)
                if (t.test(d[E])) {
                    var D = void 0;
                    for (D = E + 1; D < u && t.test(d[D]); ++D);
                    for (var z = "L" == (E ? d[E - 1] : s), N = z == ("L" == (D < u ? d[D] : s)) ? z ? "L" : "R" : s, O = E; O < D; ++O) d[O] = N;
                    E = D - 1
                } for (var F, q = [], I = 0; I < u;)
                if (n.test(d[I])) {
                    var P = I;
                    for (++I; I < u && n.test(d[I]); ++I);
                    q.push(new o(0, P, I))
                } else {
                    var R = I,
                        $ = q.length;
                    for (++I; I < u && "L" != d[I]; ++I);
                    for (var W = R; W < I;)
                        if (i.test(d[W])) {
                            R < W && q.splice($, 0, new o(1, R, W));
                            var B = W;
                            for (++W; W < I && i.test(d[W]); ++W);
                            q.splice($, 0, new o(2, B, W)), R = W
                        } else ++W;
                    R < I && q.splice($, 0, new o(1, R, I))
                } return "ltr" == l && (1 == q[0].level && (F = a.match(/^\s+/)) && (q[0].from = F[0].length, q.unshift(new o(0, 0, F[0].length))), 1 == K(q).level && (F = a.match(/\s+$/)) && (K(q).to -= F[0].length, q.push(new o(0, u - F[0].length, u)))), "rtl" == l ? q.reverse() : q
        }
    }();

    function ce(e, t) {
        var r = e.order;
        return null == r && (r = e.order = se(e.text, t)), r
    }
    var ue = [],
        de = function(e, t, r) {
            if (e.addEventListener) e.addEventListener(t, r, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, r);
            else {
                var n = e._handlers || (e._handlers = {});
                n[t] = (n[t] || ue).concat(r)
            }
        };

    function fe(e, t) {
        return e._handlers && e._handlers[t] || ue
    }

    function pe(e, t, r) {
        if (e.removeEventListener) e.removeEventListener(t, r, !1);
        else if (e.detachEvent) e.detachEvent("on" + t, r);
        else {
            var n = e._handlers,
                i = n && n[t];
            if (i) {
                var o = $(i, r);
                o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)))
            }
        }
    }

    function he(e, t) {
        var r = fe(e, t);
        if (r.length)
            for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) r[i].apply(null, n)
    }

    function me(e, t, r) {
        return "string" == typeof t && (t = {
            type: t,
            preventDefault: function() {
                this.defaultPrevented = !0
            }
        }), he(e, r || t.type, e, t), ke(t) || t.codemirrorIgnore
    }

    function ge(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
            for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n) - 1 == $(r, t[n]) && r.push(t[n])
    }

    function ve(e, t) {
        return fe(e, t).length > 0
    }

    function ye(e) {
        e.prototype.on = function(e, t) {
            de(this, e, t)
        }, e.prototype.off = function(e, t) {
            pe(this, e, t)
        }
    }

    function be(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }

    function xe(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }

    function ke(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
    }

    function we(e) {
        be(e), xe(e)
    }

    function _e(e) {
        return e.target || e.srcElement
    }

    function Ce(e) {
        var t = e.which;
        return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), y && e.ctrlKey && 1 == t && (t = 3), t
    }
    var Se, Te, Le = function() {
        if (a && l < 9) return !1;
        var e = A("div");
        return "draggable" in e || "dragDrop" in e
    }();

    function Me(e) {
        if (null == Se) {
            var t = A("span", "​");
            M(e, A("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Se = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(a && l < 8))
        }
        var r = Se ? A("span", "​") : A("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        return r.setAttribute("cm-text", ""), r
    }

    function Ae(e) {
        if (null != Te) return Te;
        var t = M(e, document.createTextNode("AخA")),
            r = S(t, 0, 1).getBoundingClientRect(),
            n = S(t, 1, 2).getBoundingClientRect();
        return L(e), !(!r || r.left == r.right) && (Te = n.right - r.right < 3)
    }
    var Ee, De = 3 != "\n\nb".split(/\n/).length ? function(e) {
            for (var t = 0, r = [], n = e.length; t <= n;) {
                var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                    a = o.indexOf("\r"); - 1 != a ? (r.push(o.slice(0, a)), t += a + 1) : (r.push(o), t = i + 1)
            }
            return r
        } : function(e) {
            return e.split(/\r\n?|\n/)
        },
        ze = window.getSelection ? function(e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch (e) {
                return !1
            }
        } : function(e) {
            var t;
            try {
                t = e.ownerDocument.selection.createRange()
            } catch (e) {}
            return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
        },
        Ne = "oncopy" in (Ee = A("div")) || (Ee.setAttribute("oncopy", "return;"), "function" == typeof Ee.oncopy),
        Oe = null;
    var Fe = {},
        qe = {};

    function Ie(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Fe[e] = t
    }

    function Pe(e) {
        if ("string" == typeof e && qe.hasOwnProperty(e)) e = qe[e];
        else if (e && "string" == typeof e.name && qe.hasOwnProperty(e.name)) {
            var t = qe[e.name];
            "string" == typeof t && (t = {
                name: t
            }), (e = Y(t, e)).name = t.name
        } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return Pe("application/xml");
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return Pe("application/json")
        }
        return "string" == typeof e ? {
            name: e
        } : e || {
            name: "null"
        }
    }

    function Re(e, t) {
        t = Pe(t);
        var r = Fe[t.name];
        if (!r) return Re(e, "text/plain");
        var n = r(e, t);
        if ($e.hasOwnProperty(t.name)) {
            var i = $e[t.name];
            for (var o in i) i.hasOwnProperty(o) && (n.hasOwnProperty(o) && (n["_" + o] = n[o]), n[o] = i[o])
        }
        if (n.name = t.name, t.helperType && (n.helperType = t.helperType), t.modeProps)
            for (var a in t.modeProps) n[a] = t.modeProps[a];
        return n
    }
    var $e = {};

    function We(e, t) {
        I(t, $e.hasOwnProperty(e) ? $e[e] : $e[e] = {})
    }

    function Be(e, t) {
        if (!0 === t) return t;
        if (e.copyState) return e.copyState(t);
        var r = {};
        for (var n in t) {
            var i = t[n];
            i instanceof Array && (i = i.concat([])), r[n] = i
        }
        return r
    }

    function He(e, t) {
        for (var r; e.innerMode && (r = e.innerMode(t)) && r.mode != e;) t = r.state, e = r.mode;
        return r || {
            mode: e,
            state: t
        }
    }

    function je(e, t, r) {
        return !e.startState || e.startState(t, r)
    }
    var Ue = function(e, t, r) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = r
    };

    function Ge(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var r = e; !r.lines;)
            for (var n = 0;; ++n) {
                var i = r.children[n],
                    o = i.chunkSize();
                if (t < o) {
                    r = i;
                    break
                }
                t -= o
            }
        return r.lines[t]
    }

    function Ve(e, t, r) {
        var n = [],
            i = t.line;
        return e.iter(t.line, r.line + 1, (function(e) {
            var o = e.text;
            i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), ++i
        })), n
    }

    function Ke(e, t, r) {
        var n = [];
        return e.iter(t, r, (function(e) {
            n.push(e.text)
        })), n
    }

    function Ze(e, t) {
        var r = t - e.height;
        if (r)
            for (var n = e; n; n = n.parent) n.height += r
    }

    function Xe(e) {
        if (null == e.parent) return null;
        for (var t = e.parent, r = $(t.lines, e), n = t.parent; n; t = n, n = n.parent)
            for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
        return r + t.first
    }

    function Ye(e, t) {
        var r = e.first;
        e: do {
            for (var n = 0; n < e.children.length; ++n) {
                var i = e.children[n],
                    o = i.height;
                if (t < o) {
                    e = i;
                    continue e
                }
                t -= o, r += i.chunkSize()
            }
            return r
        } while (!e.lines);
        for (var a = 0; a < e.lines.length; ++a) {
            var l = e.lines[a].height;
            if (t < l) break;
            t -= l
        }
        return r + a
    }

    function Qe(e, t) {
        return t >= e.first && t < e.first + e.size
    }

    function Je(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber))
    }

    function et(e, t, r) {
        if (void 0 === r && (r = null), !(this instanceof et)) return new et(e, t, r);
        this.line = e, this.ch = t, this.sticky = r
    }

    function tt(e, t) {
        return e.line - t.line || e.ch - t.ch
    }

    function rt(e, t) {
        return e.sticky == t.sticky && 0 == tt(e, t)
    }

    function nt(e) {
        return et(e.line, e.ch)
    }

    function it(e, t) {
        return tt(e, t) < 0 ? t : e
    }

    function ot(e, t) {
        return tt(e, t) < 0 ? e : t
    }

    function at(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1))
    }

    function lt(e, t) {
        if (t.line < e.first) return et(e.first, 0);
        var r = e.first + e.size - 1;
        return t.line > r ? et(r, Ge(e, r).text.length) : function(e, t) {
            var r = e.ch;
            return null == r || r > t ? et(e.line, t) : r < 0 ? et(e.line, 0) : e
        }(t, Ge(e, t.line).text.length)
    }

    function st(e, t) {
        for (var r = [], n = 0; n < t.length; n++) r[n] = lt(e, t[n]);
        return r
    }
    Ue.prototype.eol = function() {
        return this.pos >= this.string.length
    }, Ue.prototype.sol = function() {
        return this.pos == this.lineStart
    }, Ue.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0
    }, Ue.prototype.next = function() {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++)
    }, Ue.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos);
        if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t
    }, Ue.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e););
        return this.pos > t
    }, Ue.prototype.eatSpace = function() {
        for (var e = this.pos;
            /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
        return this.pos > e
    }, Ue.prototype.skipToEnd = function() {
        this.pos = this.string.length
    }, Ue.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1) return this.pos = t, !0
    }, Ue.prototype.backUp = function(e) {
        this.pos -= e
    }, Ue.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = P(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? P(this.string, this.lineStart, this.tabSize) : 0)
    }, Ue.prototype.indentation = function() {
        return P(this.string, null, this.tabSize) - (this.lineStart ? P(this.string, this.lineStart, this.tabSize) : 0)
    }, Ue.prototype.match = function(e, t, r) {
        if ("string" != typeof e) {
            var n = this.string.slice(this.pos).match(e);
            return n && n.index > 0 ? null : (n && !1 !== t && (this.pos += n[0].length), n)
        }
        var i = function(e) {
            return r ? e.toLowerCase() : e
        };
        if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
    }, Ue.prototype.current = function() {
        return this.string.slice(this.start, this.pos)
    }, Ue.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
            return t()
        } finally {
            this.lineStart -= e
        }
    }, Ue.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e)
    }, Ue.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos)
    };
    var ct = function(e, t) {
            this.state = e, this.lookAhead = t
        },
        ut = function(e, t, r, n) {
            this.state = t, this.doc = e, this.line = r, this.maxLookAhead = n || 0, this.baseTokens = null, this.baseTokenPos = 1
        };

    function dt(e, t, r, n) {
        var i = [e.state.modeGen],
            o = {};
        xt(e, t.text, e.doc.mode, r, (function(e, t) {
            return i.push(e, t)
        }), o, n);
        for (var a = r.state, l = function(n) {
                r.baseTokens = i;
                var l = e.state.overlays[n],
                    s = 1,
                    c = 0;
                r.state = !0, xt(e, t.text, l.mode, r, (function(e, t) {
                    for (var r = s; c < e;) {
                        var n = i[s];
                        n > e && i.splice(s, 1, e, i[s + 1], n), s += 2, c = Math.min(e, n)
                    }
                    if (t)
                        if (l.opaque) i.splice(r, s - r, e, "overlay " + t), s = r + 2;
                        else
                            for (; r < s; r += 2) {
                                var o = i[r + 1];
                                i[r + 1] = (o ? o + " " : "") + "overlay " + t
                            }
                }), o), r.state = a, r.baseTokens = null, r.baseTokenPos = 1
            }, s = 0; s < e.state.overlays.length; ++s) l(s);
        return {
            styles: i,
            classes: o.bgClass || o.textClass ? o : null
        }
    }

    function ft(e, t, r) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var n = pt(e, Xe(t)),
                i = t.text.length > e.options.maxHighlightLength && Be(e.doc.mode, n.state),
                o = dt(e, t, n);
            i && (n.state = i), t.stateAfter = n.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), r === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))
        }
        return t.styles
    }

    function pt(e, t, r) {
        var n = e.doc,
            i = e.display;
        if (!n.mode.startState) return new ut(n, !0, t);
        var o = function(e, t, r) {
                for (var n, i, o = e.doc, a = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), l = t; l > a; --l) {
                    if (l <= o.first) return o.first;
                    var s = Ge(o, l - 1),
                        c = s.stateAfter;
                    if (c && (!r || l + (c instanceof ct ? c.lookAhead : 0) <= o.modeFrontier)) return l;
                    var u = P(s.text, null, e.options.tabSize);
                    (null == i || n > u) && (i = l - 1, n = u)
                }
                return i
            }(e, t, r),
            a = o > n.first && Ge(n, o - 1).stateAfter,
            l = a ? ut.fromSaved(n, a, o) : new ut(n, je(n.mode), o);
        return n.iter(o, t, (function(r) {
            ht(e, r.text, l);
            var n = l.line;
            r.stateAfter = n == t - 1 || n % 5 == 0 || n >= i.viewFrom && n < i.viewTo ? l.save() : null, l.nextLine()
        })), r && (n.modeFrontier = l.line), l
    }

    function ht(e, t, r, n) {
        var i = e.doc.mode,
            o = new Ue(t, e.options.tabSize, r);
        for (o.start = o.pos = n || 0, "" == t && mt(i, r.state); !o.eol();) gt(i, o, r.state), o.start = o.pos
    }

    function mt(e, t) {
        if (e.blankLine) return e.blankLine(t);
        if (e.innerMode) {
            var r = He(e, t);
            return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0
        }
    }

    function gt(e, t, r, n) {
        for (var i = 0; i < 10; i++) {
            n && (n[0] = He(e, r).mode);
            var o = e.token(t, r);
            if (t.pos > t.start) return o
        }
        throw new Error("Mode " + e.name + " failed to advance stream.")
    }
    ut.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
    }, ut.prototype.baseToken = function(e) {
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= e;) this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
            type: t && t.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - e
        }
    }, ut.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
    }, ut.fromSaved = function(e, t, r) {
        return t instanceof ct ? new ut(e, Be(e.mode, t.state), r, t.lookAhead) : new ut(e, Be(e.mode, t), r)
    }, ut.prototype.save = function(e) {
        var t = !1 !== e ? Be(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new ct(t, this.maxLookAhead) : t
    };
    var vt = function(e, t, r) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = r
    };

    function yt(e, t, r, n) {
        var i, o, a = e.doc,
            l = a.mode,
            s = Ge(a, (t = lt(a, t)).line),
            c = pt(e, t.line, r),
            u = new Ue(s.text, e.options.tabSize, c);
        for (n && (o = []);
            (n || u.pos < t.ch) && !u.eol();) u.start = u.pos, i = gt(l, u, c.state), n && o.push(new vt(u, i, Be(a.mode, c.state)));
        return n ? o : new vt(u, i, c.state)
    }

    function bt(e, t) {
        if (e)
            for (;;) {
                var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!r) break;
                e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
                var n = r[1] ? "bgClass" : "textClass";
                null == t[n] ? t[n] = r[2] : new RegExp("(?:^|s)" + r[2] + "(?:$|s)").test(t[n]) || (t[n] += " " + r[2])
            }
        return e
    }

    function xt(e, t, r, n, i, o, a) {
        var l = r.flattenSpans;
        null == l && (l = e.options.flattenSpans);
        var s, c = 0,
            u = null,
            d = new Ue(t, e.options.tabSize, n),
            f = e.options.addModeClass && [null];
        for ("" == t && bt(mt(r, n.state), o); !d.eol();) {
            if (d.pos > e.options.maxHighlightLength ? (l = !1, a && ht(e, t, n, d.pos), d.pos = t.length, s = null) : s = bt(gt(r, d, n.state, f), o), f) {
                var p = f[0].name;
                p && (s = "m-" + (s ? p + " " + s : p))
            }
            if (!l || u != s) {
                for (; c < d.start;) i(c = Math.min(d.start, c + 5e3), u);
                u = s
            }
            d.start = d.pos
        }
        for (; c < d.pos;) {
            var h = Math.min(d.pos, c + 5e3);
            i(h, u), c = h
        }
    }
    var kt = !1,
        wt = !1;

    function _t(e, t, r) {
        this.marker = e, this.from = t, this.to = r
    }

    function Ct(e, t) {
        if (e)
            for (var r = 0; r < e.length; ++r) {
                var n = e[r];
                if (n.marker == t) return n
            }
    }

    function St(e, t) {
        for (var r, n = 0; n < e.length; ++n) e[n] != t && (r || (r = [])).push(e[n]);
        return r
    }

    function Tt(e, t) {
        if (t.full) return null;
        var r = Qe(e, t.from.line) && Ge(e, t.from.line).markedSpans,
            n = Qe(e, t.to.line) && Ge(e, t.to.line).markedSpans;
        if (!r && !n) return null;
        var i = t.from.ch,
            o = t.to.ch,
            a = 0 == tt(t.from, t.to),
            l = function(e, t, r) {
                var n;
                if (e)
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            a = o.marker;
                        if (null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t) || o.from == t && "bookmark" == a.type && (!r || !o.marker.insertLeft)) {
                            var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                            (n || (n = [])).push(new _t(a, o.from, l ? null : o.to))
                        }
                    }
                return n
            }(r, i, a),
            s = function(e, t, r) {
                var n;
                if (e)
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            a = o.marker;
                        if (null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t) || o.from == t && "bookmark" == a.type && (!r || o.marker.insertLeft)) {
                            var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                            (n || (n = [])).push(new _t(a, l ? null : o.from - t, null == o.to ? null : o.to - t))
                        }
                    }
                return n
            }(n, o, a),
            c = 1 == t.text.length,
            u = K(t.text).length + (c ? i : 0);
        if (l)
            for (var d = 0; d < l.length; ++d) {
                var f = l[d];
                if (null == f.to) {
                    var p = Ct(s, f.marker);
                    p ? c && (f.to = null == p.to ? null : p.to + u) : f.to = i
                }
            }
        if (s)
            for (var h = 0; h < s.length; ++h) {
                var m = s[h];
                if (null != m.to && (m.to += u), null == m.from) Ct(l, m.marker) || (m.from = u, c && (l || (l = [])).push(m));
                else m.from += u, c && (l || (l = [])).push(m)
            }
        l && (l = Lt(l)), s && s != l && (s = Lt(s));
        var g = [l];
        if (!c) {
            var v, y = t.text.length - 2;
            if (y > 0 && l)
                for (var b = 0; b < l.length; ++b) null == l[b].to && (v || (v = [])).push(new _t(l[b].marker, null, null));
            for (var x = 0; x < y; ++x) g.push(v);
            g.push(s)
        }
        return g
    }

    function Lt(e) {
        for (var t = 0; t < e.length; ++t) {
            var r = e[t];
            null != r.from && r.from == r.to && !1 !== r.marker.clearWhenEmpty && e.splice(t--, 1)
        }
        return e.length ? e : null
    }

    function Mt(e) {
        var t = e.markedSpans;
        if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
            e.markedSpans = null
        }
    }

    function At(e, t) {
        if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
            e.markedSpans = t
        }
    }

    function Et(e) {
        return e.inclusiveLeft ? -1 : 0
    }

    function Dt(e) {
        return e.inclusiveRight ? 1 : 0
    }

    function zt(e, t) {
        var r = e.lines.length - t.lines.length;
        if (0 != r) return r;
        var n = e.find(),
            i = t.find(),
            o = tt(n.from, i.from) || Et(e) - Et(t);
        if (o) return -o;
        var a = tt(n.to, i.to) || Dt(e) - Dt(t);
        return a || t.id - e.id
    }

    function Nt(e, t) {
        var r, n = wt && e.markedSpans;
        if (n)
            for (var i = void 0, o = 0; o < n.length; ++o)(i = n[o]).marker.collapsed && null == (t ? i.from : i.to) && (!r || zt(r, i.marker) < 0) && (r = i.marker);
        return r
    }

    function Ot(e) {
        return Nt(e, !0)
    }

    function Ft(e) {
        return Nt(e, !1)
    }

    function qt(e, t) {
        var r, n = wt && e.markedSpans;
        if (n)
            for (var i = 0; i < n.length; ++i) {
                var o = n[i];
                o.marker.collapsed && (null == o.from || o.from < t) && (null == o.to || o.to > t) && (!r || zt(r, o.marker) < 0) && (r = o.marker)
            }
        return r
    }

    function It(e, t, r, n, i) {
        var o = Ge(e, t),
            a = wt && o.markedSpans;
        if (a)
            for (var l = 0; l < a.length; ++l) {
                var s = a[l];
                if (s.marker.collapsed) {
                    var c = s.marker.find(0),
                        u = tt(c.from, r) || Et(s.marker) - Et(i),
                        d = tt(c.to, n) || Dt(s.marker) - Dt(i);
                    if (!(u >= 0 && d <= 0 || u <= 0 && d >= 0) && (u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? tt(c.to, r) >= 0 : tt(c.to, r) > 0) || u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? tt(c.from, n) <= 0 : tt(c.from, n) < 0))) return !0
                }
            }
    }

    function Pt(e) {
        for (var t; t = Ot(e);) e = t.find(-1, !0).line;
        return e
    }

    function Rt(e, t) {
        var r = Ge(e, t),
            n = Pt(r);
        return r == n ? t : Xe(n)
    }

    function $t(e, t) {
        if (t > e.lastLine()) return t;
        var r, n = Ge(e, t);
        if (!Wt(e, n)) return t;
        for (; r = Ft(n);) n = r.find(1, !0).line;
        return Xe(n) + 1
    }

    function Wt(e, t) {
        var r = wt && t.markedSpans;
        if (r)
            for (var n = void 0, i = 0; i < r.length; ++i)
                if ((n = r[i]).marker.collapsed) {
                    if (null == n.from) return !0;
                    if (!n.marker.widgetNode && 0 == n.from && n.marker.inclusiveLeft && Bt(e, t, n)) return !0
                }
    }

    function Bt(e, t, r) {
        if (null == r.to) {
            var n = r.marker.find(1, !0);
            return Bt(e, n.line, Ct(n.line.markedSpans, r.marker))
        }
        if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == r.to && (null == i.to || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && Bt(e, t, i)) return !0
    }

    function Ht(e) {
        for (var t = 0, r = (e = Pt(e)).parent, n = 0; n < r.lines.length; ++n) {
            var i = r.lines[n];
            if (i == e) break;
            t += i.height
        }
        for (var o = r.parent; o; o = (r = o).parent)
            for (var a = 0; a < o.children.length; ++a) {
                var l = o.children[a];
                if (l == r) break;
                t += l.height
            }
        return t
    }

    function jt(e) {
        if (0 == e.height) return 0;
        for (var t, r = e.text.length, n = e; t = Ot(n);) {
            var i = t.find(0, !0);
            n = i.from.line, r += i.from.ch - i.to.ch
        }
        for (n = e; t = Ft(n);) {
            var o = t.find(0, !0);
            r -= n.text.length - o.from.ch, r += (n = o.to.line).text.length - o.to.ch
        }
        return r
    }

    function Ut(e) {
        var t = e.display,
            r = e.doc;
        t.maxLine = Ge(r, r.first), t.maxLineLength = jt(t.maxLine), t.maxLineChanged = !0, r.iter((function(e) {
            var r = jt(e);
            r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e)
        }))
    }
    var Gt = function(e, t, r) {
        this.text = e, At(this, t), this.height = r ? r(this) : 1
    };

    function Vt(e) {
        e.parent = null, Mt(e)
    }
    Gt.prototype.lineNo = function() {
        return Xe(this)
    }, ye(Gt);
    var Kt = {},
        Zt = {};

    function Xt(e, t) {
        if (!e || /^\s*$/.test(e)) return null;
        var r = t.addModeClass ? Zt : Kt;
        return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"))
    }

    function Yt(e, t) {
        var r = E("span", null, null, s ? "padding-right: .1px" : null),
            n = {
                pre: E("pre", [r], "CodeMirror-line"),
                content: r,
                col: 0,
                pos: 0,
                cm: e,
                trailingSpace: !1,
                splitSpaces: e.getOption("lineWrapping")
            };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
            var o = i ? t.rest[i - 1] : t.line,
                a = void 0;
            n.pos = 0, n.addToken = Jt, Ae(e.display.measure) && (a = ce(o, e.doc.direction)) && (n.addToken = er(n.addToken, a)), n.map = [], rr(o, n, ft(e, o, t != e.display.externalMeasured && Xe(o))), o.styleClasses && (o.styleClasses.bgClass && (n.bgClass = O(o.styleClasses.bgClass, n.bgClass || "")), o.styleClasses.textClass && (n.textClass = O(o.styleClasses.textClass, n.textClass || ""))), 0 == n.map.length && n.map.push(0, 0, n.content.appendChild(Me(e.display.measure))), 0 == i ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}))
        }
        if (s) {
            var l = n.content.lastChild;
            (/\bcm-tab\b/.test(l.className) || l.querySelector && l.querySelector(".cm-tab")) && (n.content.className = "cm-tab-wrap-hack")
        }
        return he(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = O(n.pre.className, n.textClass || "")), n
    }

    function Qt(e) {
        var t = A("span", "•", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
    }

    function Jt(e, t, r, n, i, o, s) {
        if (t) {
            var c, u = e.splitSpaces ? function(e, t) {
                    if (e.length > 1 && !/  /.test(e)) return e;
                    for (var r = t, n = "", i = 0; i < e.length; i++) {
                        var o = e.charAt(i);
                        " " != o || !r || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = " "), n += o, r = " " == o
                    }
                    return n
                }(t, e.trailingSpace) : t,
                d = e.cm.state.specialChars,
                f = !1;
            if (d.test(t)) {
                c = document.createDocumentFragment();
                for (var p = 0;;) {
                    d.lastIndex = p;
                    var h = d.exec(t),
                        m = h ? h.index - p : t.length - p;
                    if (m) {
                        var g = document.createTextNode(u.slice(p, p + m));
                        a && l < 9 ? c.appendChild(A("span", [g])) : c.appendChild(g), e.map.push(e.pos, e.pos + m, g), e.col += m, e.pos += m
                    }
                    if (!h) break;
                    p += m + 1;
                    var v = void 0;
                    if ("\t" == h[0]) {
                        var y = e.cm.options.tabSize,
                            b = y - e.col % y;
                        (v = c.appendChild(A("span", V(b), "cm-tab"))).setAttribute("role", "presentation"), v.setAttribute("cm-text", "\t"), e.col += b
                    } else "\r" == h[0] || "\n" == h[0] ? ((v = c.appendChild(A("span", "\r" == h[0] ? "␍" : "␤", "cm-invalidchar"))).setAttribute("cm-text", h[0]), e.col += 1) : ((v = e.cm.options.specialCharPlaceholder(h[0])).setAttribute("cm-text", h[0]), a && l < 9 ? c.appendChild(A("span", [v])) : c.appendChild(v), e.col += 1);
                    e.map.push(e.pos, e.pos + 1, v), e.pos++
                }
            } else e.col += t.length, c = document.createTextNode(u), e.map.push(e.pos, e.pos + t.length, c), a && l < 9 && (f = !0), e.pos += t.length;
            if (e.trailingSpace = 32 == u.charCodeAt(t.length - 1), r || n || i || f || o) {
                var x = r || "";
                n && (x += n), i && (x += i);
                var k = A("span", [c], x, o);
                if (s)
                    for (var w in s) s.hasOwnProperty(w) && "style" != w && "class" != w && k.setAttribute(w, s[w]);
                return e.content.appendChild(k)
            }
            e.content.appendChild(c)
        }
    }

    function er(e, t) {
        return function(r, n, i, o, a, l, s) {
            i = i ? i + " cm-force-border" : "cm-force-border";
            for (var c = r.pos, u = c + n.length;;) {
                for (var d = void 0, f = 0; f < t.length && !((d = t[f]).to > c && d.from <= c); f++);
                if (d.to >= u) return e(r, n, i, o, a, l, s);
                e(r, n.slice(0, d.to - c), i, o, null, l, s), o = null, n = n.slice(d.to - c), c = d.to
            }
        }
    }

    function tr(e, t, r, n) {
        var i = !n && r.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1
    }

    function rr(e, t, r) {
        var n = e.markedSpans,
            i = e.text,
            o = 0;
        if (n)
            for (var a, l, s, c, u, d, f, p = i.length, h = 0, m = 1, g = "", v = 0;;) {
                if (v == h) {
                    s = c = u = l = "", f = null, d = null, v = 1 / 0;
                    for (var y = [], b = void 0, x = 0; x < n.length; ++x) {
                        var k = n[x],
                            w = k.marker;
                        if ("bookmark" == w.type && k.from == h && w.widgetNode) y.push(w);
                        else if (k.from <= h && (null == k.to || k.to > h || w.collapsed && k.to == h && k.from == h)) {
                            if (null != k.to && k.to != h && v > k.to && (v = k.to, c = ""), w.className && (s += " " + w.className), w.css && (l = (l ? l + ";" : "") + w.css), w.startStyle && k.from == h && (u += " " + w.startStyle), w.endStyle && k.to == v && (b || (b = [])).push(w.endStyle, k.to), w.title && ((f || (f = {})).title = w.title), w.attributes)
                                for (var _ in w.attributes)(f || (f = {}))[_] = w.attributes[_];
                            w.collapsed && (!d || zt(d.marker, w) < 0) && (d = k)
                        } else k.from > h && v > k.from && (v = k.from)
                    }
                    if (b)
                        for (var C = 0; C < b.length; C += 2) b[C + 1] == v && (c += " " + b[C]);
                    if (!d || d.from == h)
                        for (var S = 0; S < y.length; ++S) tr(t, 0, y[S]);
                    if (d && (d.from || 0) == h) {
                        if (tr(t, (null == d.to ? p + 1 : d.to) - h, d.marker, null == d.from), null == d.to) return;
                        d.to == h && (d = !1)
                    }
                }
                if (h >= p) break;
                for (var T = Math.min(p, v);;) {
                    if (g) {
                        var L = h + g.length;
                        if (!d) {
                            var M = L > T ? g.slice(0, T - h) : g;
                            t.addToken(t, M, a ? a + s : s, u, h + M.length == v ? c : "", l, f)
                        }
                        if (L >= T) {
                            g = g.slice(T - h), h = T;
                            break
                        }
                        h = L, u = ""
                    }
                    g = i.slice(o, o = r[m++]), a = Xt(r[m++], t.cm.options)
                }
            } else
                for (var A = 1; A < r.length; A += 2) t.addToken(t, i.slice(o, o = r[A]), Xt(r[A + 1], t.cm.options))
    }

    function nr(e, t, r) {
        this.line = t, this.rest = function(e) {
            for (var t, r; t = Ft(e);) e = t.find(1, !0).line, (r || (r = [])).push(e);
            return r
        }(t), this.size = this.rest ? Xe(K(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = Wt(e, t)
    }

    function ir(e, t, r) {
        for (var n, i = [], o = t; o < r; o = n) {
            var a = new nr(e.doc, Ge(e.doc, o), o);
            n = o + a.size, i.push(a)
        }
        return i
    }
    var or = null;
    var ar = null;

    function lr(e, t) {
        var r = fe(e, t);
        if (r.length) {
            var n, i = Array.prototype.slice.call(arguments, 2);
            or ? n = or.delayedCallbacks : ar ? n = ar : (n = ar = [], setTimeout(sr, 0));
            for (var o = function(e) {
                    n.push((function() {
                        return r[e].apply(null, i)
                    }))
                }, a = 0; a < r.length; ++a) o(a)
        }
    }

    function sr() {
        var e = ar;
        ar = null;
        for (var t = 0; t < e.length; ++t) e[t]()
    }

    function cr(e, t, r, n) {
        for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o ? fr(e, t) : "gutter" == o ? hr(e, t, r, n) : "class" == o ? pr(e, t) : "widget" == o && mr(e, t, n)
        }
        t.changes = null
    }

    function ur(e) {
        return e.node == e.text && (e.node = A("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), a && l < 8 && (e.node.style.zIndex = 2)), e.node
    }

    function dr(e, t) {
        var r = e.display.externalMeasured;
        return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : Yt(e, t)
    }

    function fr(e, t) {
        var r = t.text.className,
            n = dr(e, t);
        t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, pr(e, t)) : r && (t.text.className = r)
    }

    function pr(e, t) {
        ! function(e, t) {
            var r = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
            if (r && (r += " CodeMirror-linebackground"), t.background) r ? t.background.className = r : (t.background.parentNode.removeChild(t.background), t.background = null);
            else if (r) {
                var n = ur(t);
                t.background = n.insertBefore(A("div", null, r), n.firstChild), e.display.input.setUneditable(t.background)
            }
        }(e, t), t.line.wrapClass ? ur(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var r = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = r || ""
    }

    function hr(e, t, r, n) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
            var i = ur(t);
            t.gutterBackground = A("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px; width: " + n.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text)
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
            var a = ur(t),
                l = t.gutter = A("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px");
            if (e.display.input.setUneditable(l), a.insertBefore(l, t.text), t.line.gutterClass && (l.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = l.appendChild(A("div", Je(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o)
                for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                    var c = e.display.gutterSpecs[s].className,
                        u = o.hasOwnProperty(c) && o[c];
                    u && l.appendChild(A("div", [u], "CodeMirror-gutter-elt", "left: " + n.gutterLeft[c] + "px; width: " + n.gutterWidth[c] + "px"))
                }
        }
    }

    function mr(e, t, r) {
        t.alignable && (t.alignable = null);
        for (var n = C("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o) o = i.nextSibling, n.test(i.className) && t.node.removeChild(i);
        vr(e, t, r)
    }

    function gr(e, t, r, n) {
        var i = dr(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), pr(e, t), hr(e, t, r, n), vr(e, t, n), t.node
    }

    function vr(e, t, r) {
        if (yr(e, t.line, t, r, !0), t.rest)
            for (var n = 0; n < t.rest.length; n++) yr(e, t.rest[n], t, r, !1)
    }

    function yr(e, t, r, n, i) {
        if (t.widgets)
            for (var o = ur(r), a = 0, l = t.widgets; a < l.length; ++a) {
                var s = l[a],
                    c = A("div", [s.node], "CodeMirror-linewidget" + (s.className ? " " + s.className : ""));
                s.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), br(s, c, r, n), e.display.input.setUneditable(c), i && s.above ? o.insertBefore(c, r.gutter || r.text) : o.appendChild(c), lr(s, "redraw")
            }
    }

    function br(e, t, r, n) {
        if (e.noHScroll) {
            (r.alignable || (r.alignable = [])).push(t);
            var i = n.wrapperWidth;
            t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px"
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"))
    }

    function xr(e) {
        if (null != e.height) return e.height;
        var t = e.doc.cm;
        if (!t) return 0;
        if (!D(document.body, e.node)) {
            var r = "position: relative;";
            e.coverGutter && (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"), M(t.display.measure, A("div", [e.node], null, r))
        }
        return e.height = e.node.parentNode.offsetHeight
    }

    function kr(e, t) {
        for (var r = _e(t); r != e.wrapper; r = r.parentNode)
            if (!r || 1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events") || r.parentNode == e.sizer && r != e.mover) return !0
    }

    function wr(e) {
        return e.lineSpace.offsetTop
    }

    function _r(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight
    }

    function Cr(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;
        var t = M(e.measure, A("pre", "x", "CodeMirror-line-like")),
            r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            n = {
                left: parseInt(r.paddingLeft),
                right: parseInt(r.paddingRight)
            };
        return isNaN(n.left) || isNaN(n.right) || (e.cachedPaddingH = n), n
    }

    function Sr(e) {
        return 30 - e.display.nativeBarWidth
    }

    function Tr(e) {
        return e.display.scroller.clientWidth - Sr(e) - e.display.barWidth
    }

    function Lr(e) {
        return e.display.scroller.clientHeight - Sr(e) - e.display.barHeight
    }

    function Mr(e, t, r) {
        if (e.line == t) return {
            map: e.measure.map,
            cache: e.measure.cache
        };
        for (var n = 0; n < e.rest.length; n++)
            if (e.rest[n] == t) return {
                map: e.measure.maps[n],
                cache: e.measure.caches[n]
            };
        for (var i = 0; i < e.rest.length; i++)
            if (Xe(e.rest[i]) > r) return {
                map: e.measure.maps[i],
                cache: e.measure.caches[i],
                before: !0
            }
    }

    function Ar(e, t, r, n) {
        return zr(e, Dr(e, t), r, n)
    }

    function Er(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[un(e, t)];
        var r = e.display.externalMeasured;
        return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0
    }

    function Dr(e, t) {
        var r = Xe(t),
            n = Er(e, r);
        n && !n.text ? n = null : n && n.changes && (cr(e, n, r, on(e)), e.curOp.forceUpdate = !0), n || (n = function(e, t) {
            var r = Xe(t = Pt(t)),
                n = e.display.externalMeasured = new nr(e.doc, t, r);
            n.lineN = r;
            var i = n.built = Yt(e, n);
            return n.text = i.pre, M(e.display.lineMeasure, i.pre), n
        }(e, t));
        var i = Mr(n, t, r);
        return {
            line: t,
            view: n,
            rect: null,
            map: i.map,
            cache: i.cache,
            before: i.before,
            hasHeights: !1
        }
    }

    function zr(e, t, r, n, i) {
        t.before && (r = -1);
        var o, s = r + (n || "");
        return t.cache.hasOwnProperty(s) ? o = t.cache[s] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (! function(e, t, r) {
            var n = e.options.lineWrapping,
                i = n && Tr(e);
            if (!t.measure.heights || n && t.measure.width != i) {
                var o = t.measure.heights = [];
                if (n) {
                    t.measure.width = i;
                    for (var a = t.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
                        var s = a[l],
                            c = a[l + 1];
                        Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - r.top)
                    }
                }
                o.push(r.bottom - r.top)
            }
        }(e, t.view, t.rect), t.hasHeights = !0), (o = function(e, t, r, n) {
            var i, o = Fr(t.map, r, n),
                s = o.node,
                c = o.start,
                u = o.end,
                d = o.collapse;
            if (3 == s.nodeType) {
                for (var f = 0; f < 4; f++) {
                    for (; c && ne(t.line.text.charAt(o.coverStart + c));) --c;
                    for (; o.coverStart + u < o.coverEnd && ne(t.line.text.charAt(o.coverStart + u));) ++u;
                    if ((i = a && l < 9 && 0 == c && u == o.coverEnd - o.coverStart ? s.parentNode.getBoundingClientRect() : qr(S(s, c, u).getClientRects(), n)).left || i.right || 0 == c) break;
                    u = c, c -= 1, d = "right"
                }
                a && l < 11 && (i = function(e, t) {
                    if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || ! function(e) {
                            if (null != Oe) return Oe;
                            var t = M(e, A("span", "x")),
                                r = t.getBoundingClientRect(),
                                n = S(t, 0, 1).getBoundingClientRect();
                            return Oe = Math.abs(r.left - n.left) > 1
                        }(e)) return t;
                    var r = screen.logicalXDPI / screen.deviceXDPI,
                        n = screen.logicalYDPI / screen.deviceYDPI;
                    return {
                        left: t.left * r,
                        right: t.right * r,
                        top: t.top * n,
                        bottom: t.bottom * n
                    }
                }(e.display.measure, i))
            } else {
                var p;
                c > 0 && (d = n = "right"), i = e.options.lineWrapping && (p = s.getClientRects()).length > 1 ? p["right" == n ? p.length - 1 : 0] : s.getBoundingClientRect()
            }
            if (a && l < 9 && !c && (!i || !i.left && !i.right)) {
                var h = s.parentNode.getClientRects()[0];
                i = h ? {
                    left: h.left,
                    right: h.left + nn(e.display),
                    top: h.top,
                    bottom: h.bottom
                } : Or
            }
            for (var m = i.top - t.rect.top, g = i.bottom - t.rect.top, v = (m + g) / 2, y = t.view.measure.heights, b = 0; b < y.length - 1 && !(v < y[b]); b++);
            var x = b ? y[b - 1] : 0,
                k = y[b],
                w = {
                    left: ("right" == d ? i.right : i.left) - t.rect.left,
                    right: ("left" == d ? i.left : i.right) - t.rect.left,
                    top: x,
                    bottom: k
                };
            i.left || i.right || (w.bogus = !0);
            e.options.singleCursorHeightPerLine || (w.rtop = m, w.rbottom = g);
            return w
        }(e, t, r, n)).bogus || (t.cache[s] = o)), {
            left: o.left,
            right: o.right,
            top: i ? o.rtop : o.top,
            bottom: i ? o.rbottom : o.bottom
        }
    }
    var Nr, Or = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    function Fr(e, t, r) {
        for (var n, i, o, a, l, s, c = 0; c < e.length; c += 3)
            if (l = e[c], s = e[c + 1], t < l ? (i = 0, o = 1, a = "left") : t < s ? o = (i = t - l) + 1 : (c == e.length - 3 || t == s && e[c + 3] > t) && (i = (o = s - l) - 1, t >= s && (a = "right")), null != i) {
                if (n = e[c + 2], l == s && r == (n.insertLeft ? "left" : "right") && (a = r), "left" == r && 0 == i)
                    for (; c && e[c - 2] == e[c - 3] && e[c - 1].insertLeft;) n = e[2 + (c -= 3)], a = "left";
                if ("right" == r && i == s - l)
                    for (; c < e.length - 3 && e[c + 3] == e[c + 4] && !e[c + 5].insertLeft;) n = e[(c += 3) + 2], a = "right";
                break
            } return {
            node: n,
            start: i,
            end: o,
            collapse: a,
            coverStart: l,
            coverEnd: s
        }
    }

    function qr(e, t) {
        var r = Or;
        if ("left" == t)
            for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++);
        else
            for (var i = e.length - 1; i >= 0 && (r = e[i]).left == r.right; i--);
        return r
    }

    function Ir(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
            for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
    }

    function Pr(e) {
        e.display.externalMeasure = null, L(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++) Ir(e.display.view[t])
    }

    function Rr(e) {
        Pr(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
    }

    function $r() {
        return u && g ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function Wr() {
        return u && g ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function Br(e) {
        var t = 0;
        if (e.widgets)
            for (var r = 0; r < e.widgets.length; ++r) e.widgets[r].above && (t += xr(e.widgets[r]));
        return t
    }

    function Hr(e, t, r, n, i) {
        if (!i) {
            var o = Br(t);
            r.top += o, r.bottom += o
        }
        if ("line" == n) return r;
        n || (n = "local");
        var a = Ht(t);
        if ("local" == n ? a += wr(e.display) : a -= e.display.viewOffset, "page" == n || "window" == n) {
            var l = e.display.lineSpace.getBoundingClientRect();
            a += l.top + ("window" == n ? 0 : Wr());
            var s = l.left + ("window" == n ? 0 : $r());
            r.left += s, r.right += s
        }
        return r.top += a, r.bottom += a, r
    }

    function jr(e, t, r) {
        if ("div" == r) return t;
        var n = t.left,
            i = t.top;
        if ("page" == r) n -= $r(), i -= Wr();
        else if ("local" == r || !r) {
            var o = e.display.sizer.getBoundingClientRect();
            n += o.left, i += o.top
        }
        var a = e.display.lineSpace.getBoundingClientRect();
        return {
            left: n - a.left,
            top: i - a.top
        }
    }

    function Ur(e, t, r, n, i) {
        return n || (n = Ge(e.doc, t.line)), Hr(e, n, Ar(e, n, t.ch, i), r)
    }

    function Gr(e, t, r, n, i, o) {
        function a(t, a) {
            var l = zr(e, i, t, a ? "right" : "left", o);
            return a ? l.left = l.right : l.right = l.left, Hr(e, n, l, r)
        }
        n = n || Ge(e.doc, t.line), i || (i = Dr(e, n));
        var l = ce(n, e.doc.direction),
            s = t.ch,
            c = t.sticky;
        if (s >= n.text.length ? (s = n.text.length, c = "before") : s <= 0 && (s = 0, c = "after"), !l) return a("before" == c ? s - 1 : s, "before" == c);

        function u(e, t, r) {
            return a(r ? e - 1 : e, 1 == l[t].level != r)
        }
        var d = le(l, s, c),
            f = ae,
            p = u(s, d, "before" == c);
        return null != f && (p.other = u(s, f, "before" != c)), p
    }

    function Vr(e, t) {
        var r = 0;
        t = lt(e.doc, t), e.options.lineWrapping || (r = nn(e.display) * t.ch);
        var n = Ge(e.doc, t.line),
            i = Ht(n) + wr(e.display);
        return {
            left: r,
            right: r,
            top: i,
            bottom: i + n.height
        }
    }

    function Kr(e, t, r, n, i) {
        var o = et(e, t, r);
        return o.xRel = i, n && (o.outside = n), o
    }

    function Zr(e, t, r) {
        var n = e.doc;
        if ((r += e.display.viewOffset) < 0) return Kr(n.first, 0, null, -1, -1);
        var i = Ye(n, r),
            o = n.first + n.size - 1;
        if (i > o) return Kr(n.first + n.size - 1, Ge(n, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var a = Ge(n, i);;) {
            var l = Jr(e, a, i, t, r),
                s = qt(a, l.ch + (l.xRel > 0 || l.outside > 0 ? 1 : 0));
            if (!s) return l;
            var c = s.find(1);
            if (c.line == i) return c;
            a = Ge(n, i = c.line)
        }
    }

    function Xr(e, t, r, n) {
        n -= Br(t);
        var i = t.text.length,
            o = oe((function(t) {
                return zr(e, r, t - 1).bottom <= n
            }), i, 0);
        return {
            begin: o,
            end: i = oe((function(t) {
                return zr(e, r, t).top > n
            }), o, i)
        }
    }

    function Yr(e, t, r, n) {
        return r || (r = Dr(e, t)), Xr(e, t, r, Hr(e, t, zr(e, r, n), "line").top)
    }

    function Qr(e, t, r, n) {
        return !(e.bottom <= r) && (e.top > r || (n ? e.left : e.right) > t)
    }

    function Jr(e, t, r, n, i) {
        i -= Ht(t);
        var o = Dr(e, t),
            a = Br(t),
            l = 0,
            s = t.text.length,
            c = !0,
            u = ce(t, e.doc.direction);
        if (u) {
            var d = (e.options.lineWrapping ? tn : en)(e, t, r, o, u, n, i);
            l = (c = 1 != d.level) ? d.from : d.to - 1, s = c ? d.to : d.from - 1
        }
        var f, p, h = null,
            m = null,
            g = oe((function(t) {
                var r = zr(e, o, t);
                return r.top += a, r.bottom += a, !!Qr(r, n, i, !1) && (r.top <= i && r.left <= n && (h = t, m = r), !0)
            }), l, s),
            v = !1;
        if (m) {
            var y = n - m.left < m.right - n,
                b = y == c;
            g = h + (b ? 0 : 1), p = b ? "after" : "before", f = y ? m.left : m.right
        } else {
            c || g != s && g != l || g++, p = 0 == g ? "after" : g == t.text.length ? "before" : zr(e, o, g - (c ? 1 : 0)).bottom + a <= i == c ? "after" : "before";
            var x = Gr(e, et(r, g, p), "line", t, o);
            f = x.left, v = i < x.top ? -1 : i >= x.bottom ? 1 : 0
        }
        return Kr(r, g = ie(t.text, g, 1), p, v, n - f)
    }

    function en(e, t, r, n, i, o, a) {
        var l = oe((function(l) {
                var s = i[l],
                    c = 1 != s.level;
                return Qr(Gr(e, et(r, c ? s.to : s.from, c ? "before" : "after"), "line", t, n), o, a, !0)
            }), 0, i.length - 1),
            s = i[l];
        if (l > 0) {
            var c = 1 != s.level,
                u = Gr(e, et(r, c ? s.from : s.to, c ? "after" : "before"), "line", t, n);
            Qr(u, o, a, !0) && u.top > a && (s = i[l - 1])
        }
        return s
    }

    function tn(e, t, r, n, i, o, a) {
        var l = Xr(e, t, n, a),
            s = l.begin,
            c = l.end;
        /\s/.test(t.text.charAt(c - 1)) && c--;
        for (var u = null, d = null, f = 0; f < i.length; f++) {
            var p = i[f];
            if (!(p.from >= c || p.to <= s)) {
                var h = zr(e, n, 1 != p.level ? Math.min(c, p.to) - 1 : Math.max(s, p.from)).right,
                    m = h < o ? o - h + 1e9 : h - o;
                (!u || d > m) && (u = p, d = m)
            }
        }
        return u || (u = i[i.length - 1]), u.from < s && (u = {
            from: s,
            to: u.to,
            level: u.level
        }), u.to > c && (u = {
            from: u.from,
            to: c,
            level: u.level
        }), u
    }

    function rn(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == Nr) {
            Nr = A("pre", null, "CodeMirror-line-like");
            for (var t = 0; t < 49; ++t) Nr.appendChild(document.createTextNode("x")), Nr.appendChild(A("br"));
            Nr.appendChild(document.createTextNode("x"))
        }
        M(e.measure, Nr);
        var r = Nr.offsetHeight / 50;
        return r > 3 && (e.cachedTextHeight = r), L(e.measure), r || 1
    }

    function nn(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = A("span", "xxxxxxxxxx"),
            r = A("pre", [t], "CodeMirror-line-like");
        M(e.measure, r);
        var n = t.getBoundingClientRect(),
            i = (n.right - n.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10
    }

    function on(e) {
        for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a) {
            var l = e.display.gutterSpecs[a].className;
            r[l] = o.offsetLeft + o.clientLeft + i, n[l] = o.clientWidth
        }
        return {
            fixedPos: an(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: r,
            gutterWidth: n,
            wrapperWidth: t.wrapper.clientWidth
        }
    }

    function an(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
    }

    function ln(e) {
        var t = rn(e.display),
            r = e.options.lineWrapping,
            n = r && Math.max(5, e.display.scroller.clientWidth / nn(e.display) - 3);
        return function(i) {
            if (Wt(e.doc, i)) return 0;
            var o = 0;
            if (i.widgets)
                for (var a = 0; a < i.widgets.length; a++) i.widgets[a].height && (o += i.widgets[a].height);
            return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t
        }
    }

    function sn(e) {
        var t = e.doc,
            r = ln(e);
        t.iter((function(e) {
            var t = r(e);
            t != e.height && Ze(e, t)
        }))
    }

    function cn(e, t, r, n) {
        var i = e.display;
        if (!r && "true" == _e(t).getAttribute("cm-not-content")) return null;
        var o, a, l = i.lineSpace.getBoundingClientRect();
        try {
            o = t.clientX - l.left, a = t.clientY - l.top
        } catch (t) {
            return null
        }
        var s, c = Zr(e, o, a);
        if (n && c.xRel > 0 && (s = Ge(e.doc, c.line).text).length == c.ch) {
            var u = P(s, s.length, e.options.tabSize) - s.length;
            c = et(c.line, Math.max(0, Math.round((o - Cr(e.display).left) / nn(e.display)) - u))
        }
        return c
    }

    function un(e, t) {
        if (t >= e.display.viewTo) return null;
        if ((t -= e.display.viewFrom) < 0) return null;
        for (var r = e.display.view, n = 0; n < r.length; n++)
            if ((t -= r[n].size) < 0) return n
    }

    function dn(e, t, r, n) {
        null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), n || (n = 0);
        var i = e.display;
        if (n && r < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) wt && Rt(e.doc, t) < i.viewTo && pn(e);
        else if (r <= i.viewFrom) wt && $t(e.doc, r + n) > i.viewFrom ? pn(e) : (i.viewFrom += n, i.viewTo += n);
        else if (t <= i.viewFrom && r >= i.viewTo) pn(e);
        else if (t <= i.viewFrom) {
            var o = hn(e, r, r + n, 1);
            o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : pn(e)
        } else if (r >= i.viewTo) {
            var a = hn(e, t, t, -1);
            a ? (i.view = i.view.slice(0, a.index), i.viewTo = a.lineN) : pn(e)
        } else {
            var l = hn(e, t, t, -1),
                s = hn(e, r, r + n, 1);
            l && s ? (i.view = i.view.slice(0, l.index).concat(ir(e, l.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += n) : pn(e)
        }
        var c = i.externalMeasured;
        c && (r < c.lineN ? c.lineN += n : t < c.lineN + c.size && (i.externalMeasured = null))
    }

    function fn(e, t, r) {
        e.curOp.viewChanged = !0;
        var n = e.display,
            i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
            var o = n.view[un(e, t)];
            if (null != o.node) {
                var a = o.changes || (o.changes = []); - 1 == $(a, r) && a.push(r)
            }
        }
    }

    function pn(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
    }

    function hn(e, t, r, n) {
        var i, o = un(e, t),
            a = e.display.view;
        if (!wt || r == e.doc.first + e.doc.size) return {
            index: o,
            lineN: r
        };
        for (var l = e.display.viewFrom, s = 0; s < o; s++) l += a[s].size;
        if (l != t) {
            if (n > 0) {
                if (o == a.length - 1) return null;
                i = l + a[o].size - t, o++
            } else i = l - t;
            t += i, r += i
        }
        for (; Rt(e.doc, r) != r;) {
            if (o == (n < 0 ? 0 : a.length - 1)) return null;
            r += n * a[o - (n < 0 ? 1 : 0)].size, o += n
        }
        return {
            index: o,
            lineN: r
        }
    }

    function mn(e) {
        for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
            var i = t[n];
            i.hidden || i.node && !i.changes || ++r
        }
        return r
    }

    function gn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection())
    }

    function vn(e, t) {
        void 0 === t && (t = !0);
        for (var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), a = 0; a < r.sel.ranges.length; a++)
            if (t || a != r.sel.primIndex) {
                var l = r.sel.ranges[a];
                if (!(l.from().line >= e.display.viewTo || l.to().line < e.display.viewFrom)) {
                    var s = l.empty();
                    (s || e.options.showCursorWhenSelecting) && yn(e, l.head, i), s || xn(e, l, o)
                }
            } return n
    }

    function yn(e, t, r) {
        var n = Gr(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            i = r.appendChild(A("div", " ", "CodeMirror-cursor"));
        if (i.style.left = n.left + "px", i.style.top = n.top + "px", i.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", n.other) {
            var o = r.appendChild(A("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            o.style.display = "", o.style.left = n.other.left + "px", o.style.top = n.other.top + "px", o.style.height = .85 * (n.other.bottom - n.other.top) + "px"
        }
    }

    function bn(e, t) {
        return e.top - t.top || e.left - t.left
    }

    function xn(e, t, r) {
        var n = e.display,
            i = e.doc,
            o = document.createDocumentFragment(),
            a = Cr(e.display),
            l = a.left,
            s = Math.max(n.sizerWidth, Tr(e) - n.sizer.offsetLeft) - a.right,
            c = "ltr" == i.direction;

        function u(e, t, r, n) {
            t < 0 && (t = 0), t = Math.round(t), n = Math.round(n), o.appendChild(A("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == r ? s - e : r) + "px;\n                             height: " + (n - t) + "px"))
        }

        function d(t, r, n) {
            var o, a, d = Ge(i, t),
                f = d.text.length;

            function p(r, n) {
                return Ur(e, et(t, r), "div", d, n)
            }

            function h(t, r, n) {
                var i = Yr(e, d, null, t),
                    o = "ltr" == r == ("after" == n) ? "left" : "right";
                return p("after" == n ? i.begin : i.end - (/\s/.test(d.text.charAt(i.end - 1)) ? 2 : 1), o)[o]
            }
            var m = ce(d, i.direction);
            return function(e, t, r, n) {
                if (!e) return n(t, r, "ltr", 0);
                for (var i = !1, o = 0; o < e.length; ++o) {
                    var a = e[o];
                    (a.from < r && a.to > t || t == r && a.to == t) && (n(Math.max(a.from, t), Math.min(a.to, r), 1 == a.level ? "rtl" : "ltr", o), i = !0)
                }
                i || n(t, r, "ltr")
            }(m, r || 0, null == n ? f : n, (function(e, t, i, d) {
                var g = "ltr" == i,
                    v = p(e, g ? "left" : "right"),
                    y = p(t - 1, g ? "right" : "left"),
                    b = null == r && 0 == e,
                    x = null == n && t == f,
                    k = 0 == d,
                    w = !m || d == m.length - 1;
                if (y.top - v.top <= 3) {
                    var _ = (c ? x : b) && w,
                        C = (c ? b : x) && k ? l : (g ? v : y).left,
                        S = _ ? s : (g ? y : v).right;
                    u(C, v.top, S - C, v.bottom)
                } else {
                    var T, L, M, A;
                    g ? (T = c && b && k ? l : v.left, L = c ? s : h(e, i, "before"), M = c ? l : h(t, i, "after"), A = c && x && w ? s : y.right) : (T = c ? h(e, i, "before") : l, L = !c && b && k ? s : v.right, M = !c && x && w ? l : y.left, A = c ? h(t, i, "after") : s), u(T, v.top, L - T, v.bottom), v.bottom < y.top && u(l, v.bottom, null, y.top), u(M, y.top, A - M, y.bottom)
                }(!o || bn(v, o) < 0) && (o = v), bn(y, o) < 0 && (o = y), (!a || bn(v, a) < 0) && (a = v), bn(y, a) < 0 && (a = y)
            })), {
                start: o,
                end: a
            }
        }
        var f = t.from(),
            p = t.to();
        if (f.line == p.line) d(f.line, f.ch, p.ch);
        else {
            var h = Ge(i, f.line),
                m = Ge(i, p.line),
                g = Pt(h) == Pt(m),
                v = d(f.line, f.ch, g ? h.text.length + 1 : null).end,
                y = d(p.line, g ? 0 : null, p.ch).start;
            g && (v.top < y.top - 2 ? (u(v.right, v.top, null, v.bottom), u(l, y.top, y.left, y.bottom)) : u(v.right, v.top, y.left - v.right, v.bottom)), v.bottom < y.top && u(l, v.bottom, null, y.top)
        }
        r.appendChild(o)
    }

    function kn(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var r = !0;
            t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval((function() {
                return t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden"
            }), e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
        }
    }

    function wn(e) {
        e.state.focused || (e.display.input.focus(), Cn(e))
    }

    function _n(e) {
        e.state.delayingBlurEvent = !0, setTimeout((function() {
            e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, Sn(e))
        }), 100)
    }

    function Cn(e, t) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (he(e, "focus", e, t), e.state.focused = !0, N(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), s && setTimeout((function() {
            return e.display.input.reset(!0)
        }), 20)), e.display.input.receivedFocus()), kn(e))
    }

    function Sn(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (he(e, "blur", e, t), e.state.focused = !1, T(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout((function() {
            e.state.focused || (e.display.shift = !1)
        }), 150))
    }

    function Tn(e) {
        for (var t = e.display, r = t.lineDiv.offsetTop, n = 0; n < t.view.length; n++) {
            var i = t.view[n],
                o = e.options.lineWrapping,
                s = void 0,
                c = 0;
            if (!i.hidden) {
                if (a && l < 8) {
                    var u = i.node.offsetTop + i.node.offsetHeight;
                    s = u - r, r = u
                } else {
                    var d = i.node.getBoundingClientRect();
                    s = d.bottom - d.top, !o && i.text.firstChild && (c = i.text.firstChild.getBoundingClientRect().right - d.left - 1)
                }
                var f = i.line.height - s;
                if ((f > .005 || f < -.005) && (Ze(i.line, s), Ln(i.line), i.rest))
                    for (var p = 0; p < i.rest.length; p++) Ln(i.rest[p]);
                if (c > e.display.sizerWidth) {
                    var h = Math.ceil(c / nn(e.display));
                    h > e.display.maxLineLength && (e.display.maxLineLength = h, e.display.maxLine = i.line, e.display.maxLineChanged = !0)
                }
            }
        }
    }

    function Ln(e) {
        if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t) {
                var r = e.widgets[t],
                    n = r.node.parentNode;
                n && (r.height = n.offsetHeight)
            }
    }

    function Mn(e, t, r) {
        var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;
        n = Math.floor(n - wr(e));
        var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
            o = Ye(t, n),
            a = Ye(t, i);
        if (r && r.ensure) {
            var l = r.ensure.from.line,
                s = r.ensure.to.line;
            l < o ? (o = l, a = Ye(t, Ht(Ge(t, l)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= a && (o = Ye(t, Ht(Ge(t, s)) - e.wrapper.clientHeight), a = s)
        }
        return {
            from: o,
            to: Math.max(a, o + 1)
        }
    }

    function An(e, t) {
        var r = e.display,
            n = rn(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : r.scroller.scrollTop,
            o = Lr(e),
            a = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var l = e.doc.height + _r(r),
            s = t.top < n,
            c = t.bottom > l - n;
        if (t.top < i) a.scrollTop = s ? 0 : t.top;
        else if (t.bottom > i + o) {
            var u = Math.min(t.top, (c ? l : t.bottom) - o);
            u != i && (a.scrollTop = u)
        }
        var d = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : r.scroller.scrollLeft,
            f = Tr(e) - (e.options.fixedGutter ? r.gutters.offsetWidth : 0),
            p = t.right - t.left > f;
        return p && (t.right = t.left + f), t.left < 10 ? a.scrollLeft = 0 : t.left < d ? a.scrollLeft = Math.max(0, t.left - (p ? 0 : 10)) : t.right > f + d - 3 && (a.scrollLeft = t.right + (p ? 0 : 10) - f), a
    }

    function En(e, t) {
        null != t && (Nn(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t)
    }

    function Dn(e) {
        Nn(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = {
            from: t,
            to: t,
            margin: e.options.cursorScrollMargin
        }
    }

    function zn(e, t, r) {
        null == t && null == r || Nn(e), null != t && (e.curOp.scrollLeft = t), null != r && (e.curOp.scrollTop = r)
    }

    function Nn(e) {
        var t = e.curOp.scrollToPos;
        t && (e.curOp.scrollToPos = null, On(e, Vr(e, t.from), Vr(e, t.to), t.margin))
    }

    function On(e, t, r, n) {
        var i = An(e, {
            left: Math.min(t.left, r.left),
            top: Math.min(t.top, r.top) - n,
            right: Math.max(t.right, r.right),
            bottom: Math.max(t.bottom, r.bottom) + n
        });
        zn(e, i.scrollLeft, i.scrollTop)
    }

    function Fn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (r || si(e, {
            top: t
        }), qn(e, t, !0), r && si(e), ni(e, 100))
    }

    function qn(e, t, r) {
        t = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t), (e.display.scroller.scrollTop != t || r) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t))
    }

    function In(e, t, r, n) {
        t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !n || (e.doc.scrollLeft = t, di(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
    }

    function Pn(e) {
        var t = e.display,
            r = t.gutters.offsetWidth,
            n = Math.round(e.doc.height + _r(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? r : 0,
            docHeight: n,
            scrollHeight: n + Sr(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: r
        }
    }
    var Rn = function(e, t, r) {
        this.cm = r;
        var n = this.vert = A("div", [A("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
            i = this.horiz = A("div", [A("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        n.tabIndex = i.tabIndex = -1, e(n), e(i), de(n, "scroll", (function() {
            n.clientHeight && t(n.scrollTop, "vertical")
        })), de(i, "scroll", (function() {
            i.clientWidth && t(i.scrollLeft, "horizontal")
        })), this.checkedZeroWidth = !1, a && l < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
    };
    Rn.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            r = e.scrollHeight > e.clientHeight + 1,
            n = e.nativeBarWidth;
        if (r) {
            this.vert.style.display = "block", this.vert.style.bottom = t ? n + "px" : "0";
            var i = e.viewHeight - (t ? n : 0);
            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
        } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
            this.horiz.style.display = "block", this.horiz.style.right = r ? n + "px" : "0", this.horiz.style.left = e.barLeft + "px";
            var o = e.viewWidth - e.barLeft - (r ? n : 0);
            this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px"
        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == n && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
            right: r ? n : 0,
            bottom: t ? n : 0
        }
    }, Rn.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
    }, Rn.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
    }, Rn.prototype.zeroWidthHack = function() {
        var e = y && !p ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new R, this.disableVert = new R
    }, Rn.prototype.enableZeroWidthBar = function(e, t, r) {
        e.style.pointerEvents = "auto", t.set(1e3, (function n() {
            var i = e.getBoundingClientRect();
            ("vert" == r ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, n)
        }))
    }, Rn.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert)
    };
    var $n = function() {};

    function Wn(e, t) {
        t || (t = Pn(e));
        var r = e.display.barWidth,
            n = e.display.barHeight;
        Bn(e, t);
        for (var i = 0; i < 4 && r != e.display.barWidth || n != e.display.barHeight; i++) r != e.display.barWidth && e.options.lineWrapping && Tn(e), Bn(e, Pn(e)), r = e.display.barWidth, n = e.display.barHeight
    }

    function Bn(e, t) {
        var r = e.display,
            n = r.scrollbars.update(t);
        r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", r.heightForcer.style.borderBottom = n.bottom + "px solid transparent", n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = ""
    }
    $n.prototype.update = function() {
        return {
            bottom: 0,
            right: 0
        }
    }, $n.prototype.setScrollLeft = function() {}, $n.prototype.setScrollTop = function() {}, $n.prototype.clear = function() {};
    var Hn = {
        native: Rn,
        null: $n
    };

    function jn(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && T(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new Hn[e.options.scrollbarStyle]((function(t) {
            e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), de(t, "mousedown", (function() {
                e.state.focused && setTimeout((function() {
                    return e.display.input.focus()
                }), 0)
            })), t.setAttribute("cm-not-content", "true")
        }), (function(t, r) {
            "horizontal" == r ? In(e, t) : Fn(e, t)
        }), e), e.display.scrollbars.addClass && N(e.display.wrapper, e.display.scrollbars.addClass)
    }
    var Un = 0;

    function Gn(e) {
        var t;
        e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: 0,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Un
        }, t = e.curOp, or ? or.ops.push(t) : t.ownsGroup = or = {
            ops: [t],
            delayedCallbacks: []
        }
    }

    function Vn(e) {
        var t = e.curOp;
        t && function(e, t) {
            var r = e.ownsGroup;
            if (r) try {
                ! function(e) {
                    var t = e.delayedCallbacks,
                        r = 0;
                    do {
                        for (; r < t.length; r++) t[r].call(null);
                        for (var n = 0; n < e.ops.length; n++) {
                            var i = e.ops[n];
                            if (i.cursorActivityHandlers)
                                for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
                        }
                    } while (r < t.length)
                }(r)
            } finally {
                or = null, t(r)
            }
        }(t, (function(e) {
            for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
            ! function(e) {
                for (var t = e.ops, r = 0; r < t.length; r++) Kn(t[r]);
                for (var n = 0; n < t.length; n++) Zn(t[n]);
                for (var i = 0; i < t.length; i++) Xn(t[i]);
                for (var o = 0; o < t.length; o++) Yn(t[o]);
                for (var a = 0; a < t.length; a++) Qn(t[a])
            }(e)
        }))
    }

    function Kn(e) {
        var t = e.cm,
            r = t.display;
        ! function(e) {
            var t = e.display;
            !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Sr(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Sr(e) + "px", t.scrollbarsClipped = !0)
        }(t), e.updateMaxLine && Ut(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < r.viewFrom || e.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new oi(t, e.mustUpdate && {
            top: e.scrollTop,
            ensure: e.scrollToPos
        }, e.forceUpdate)
    }

    function Zn(e) {
        e.updatedDisplay = e.mustUpdate && ai(e.cm, e.update)
    }

    function Xn(e) {
        var t = e.cm,
            r = t.display;
        e.updatedDisplay && Tn(t), e.barMeasure = Pn(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Ar(t, r.maxLine, r.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + Sr(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - Tr(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection())
    }

    function Yn(e) {
        var t = e.cm;
        null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && In(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var r = e.focus && e.focus == z();
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, r), (e.updatedDisplay || e.startHeight != t.doc.height) && Wn(t, e.barMeasure), e.updatedDisplay && ui(t, e.barMeasure), e.selectionChanged && kn(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), r && wn(e.cm)
    }

    function Qn(e) {
        var t = e.cm,
            r = t.display,
            n = t.doc;
        (e.updatedDisplay && li(t, e.update), null == r.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (r.wheelStartX = r.wheelStartY = null), null != e.scrollTop && qn(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && In(t, e.scrollLeft, !0, !0), e.scrollToPos) && function(e, t) {
            if (!me(e, "scrollCursorIntoView")) {
                var r = e.display,
                    n = r.sizer.getBoundingClientRect(),
                    i = null;
                if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !h) {
                    var o = A("div", "​", null, "position: absolute;\n                         top: " + (t.top - r.viewOffset - wr(e.display)) + "px;\n                         height: " + (t.bottom - t.top + Sr(e) + r.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
                    e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
                }
            }
        }(t, function(e, t, r, n) {
            var i;
            null == n && (n = 0), e.options.lineWrapping || t != r || (r = "before" == (t = t.ch ? et(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t).sticky ? et(t.line, t.ch + 1, "before") : t);
            for (var o = 0; o < 5; o++) {
                var a = !1,
                    l = Gr(e, t),
                    s = r && r != t ? Gr(e, r) : l,
                    c = An(e, i = {
                        left: Math.min(l.left, s.left),
                        top: Math.min(l.top, s.top) - n,
                        right: Math.max(l.left, s.left),
                        bottom: Math.max(l.bottom, s.bottom) + n
                    }),
                    u = e.doc.scrollTop,
                    d = e.doc.scrollLeft;
                if (null != c.scrollTop && (Fn(e, c.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (a = !0)), null != c.scrollLeft && (In(e, c.scrollLeft), Math.abs(e.doc.scrollLeft - d) > 1 && (a = !0)), !a) break
            }
            return i
        }(t, lt(n, e.scrollToPos.from), lt(n, e.scrollToPos.to), e.scrollToPos.margin));
        var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;
        if (i)
            for (var a = 0; a < i.length; ++a) i[a].lines.length || he(i[a], "hide");
        if (o)
            for (var l = 0; l < o.length; ++l) o[l].lines.length && he(o[l], "unhide");
        r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && he(t, "changes", t, e.changeObjs), e.update && e.update.finish()
    }

    function Jn(e, t) {
        if (e.curOp) return t();
        Gn(e);
        try {
            return t()
        } finally {
            Vn(e)
        }
    }

    function ei(e, t) {
        return function() {
            if (e.curOp) return t.apply(e, arguments);
            Gn(e);
            try {
                return t.apply(e, arguments)
            } finally {
                Vn(e)
            }
        }
    }

    function ti(e) {
        return function() {
            if (this.curOp) return e.apply(this, arguments);
            Gn(this);
            try {
                return e.apply(this, arguments)
            } finally {
                Vn(this)
            }
        }
    }

    function ri(e) {
        return function() {
            var t = this.cm;
            if (!t || t.curOp) return e.apply(this, arguments);
            Gn(t);
            try {
                return e.apply(this, arguments)
            } finally {
                Vn(t)
            }
        }
    }

    function ni(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, q(ii, e))
    }

    function ii(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
            var r = +new Date + e.options.workTime,
                n = pt(e, t.highlightFrontier),
                i = [];
            t.iter(n.line, Math.min(t.first + t.size, e.display.viewTo + 500), (function(o) {
                if (n.line >= e.display.viewFrom) {
                    var a = o.styles,
                        l = o.text.length > e.options.maxHighlightLength ? Be(t.mode, n.state) : null,
                        s = dt(e, o, n, !0);
                    l && (n.state = l), o.styles = s.styles;
                    var c = o.styleClasses,
                        u = s.classes;
                    u ? o.styleClasses = u : c && (o.styleClasses = null);
                    for (var d = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), f = 0; !d && f < a.length; ++f) d = a[f] != o.styles[f];
                    d && i.push(n.line), o.stateAfter = n.save(), n.nextLine()
                } else o.text.length <= e.options.maxHighlightLength && ht(e, o.text, n), o.stateAfter = n.line % 5 == 0 ? n.save() : null, n.nextLine();
                if (+new Date > r) return ni(e, e.options.workDelay), !0
            })), t.highlightFrontier = n.line, t.modeFrontier = Math.max(t.modeFrontier, n.line), i.length && Jn(e, (function() {
                for (var t = 0; t < i.length; t++) fn(e, i[t], "text")
            }))
        }
    }
    var oi = function(e, t, r) {
        var n = e.display;
        this.viewport = t, this.visible = Mn(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, this.oldDisplayWidth = Tr(e), this.force = r, this.dims = on(e), this.events = []
    };

    function ai(e, t) {
        var r = e.display,
            n = e.doc;
        if (t.editorIsHidden) return pn(e), !1;
        if (!t.force && t.visible.from >= r.viewFrom && t.visible.to <= r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && 0 == mn(e)) return !1;
        fi(e) && (pn(e), t.dims = on(e));
        var i = n.first + n.size,
            o = Math.max(t.visible.from - e.options.viewportMargin, n.first),
            a = Math.min(i, t.visible.to + e.options.viewportMargin);
        r.viewFrom < o && o - r.viewFrom < 20 && (o = Math.max(n.first, r.viewFrom)), r.viewTo > a && r.viewTo - a < 20 && (a = Math.min(i, r.viewTo)), wt && (o = Rt(e.doc, o), a = $t(e.doc, a));
        var l = o != r.viewFrom || a != r.viewTo || r.lastWrapHeight != t.wrapperHeight || r.lastWrapWidth != t.wrapperWidth;
        ! function(e, t, r) {
            var n = e.display;
            0 == n.view.length || t >= n.viewTo || r <= n.viewFrom ? (n.view = ir(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = ir(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(un(e, t))), n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(ir(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, un(e, r)))), n.viewTo = r
        }(e, o, a), r.viewOffset = Ht(Ge(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
        var c = mn(e);
        if (!l && 0 == c && !t.force && r.renderedView == r.view && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)) return !1;
        var u = function(e) {
            if (e.hasFocus()) return null;
            var t = z();
            if (!t || !D(e.display.lineDiv, t)) return null;
            var r = {
                activeElt: t
            };
            if (window.getSelection) {
                var n = window.getSelection();
                n.anchorNode && n.extend && D(e.display.lineDiv, n.anchorNode) && (r.anchorNode = n.anchorNode, r.anchorOffset = n.anchorOffset, r.focusNode = n.focusNode, r.focusOffset = n.focusOffset)
            }
            return r
        }(e);
        return c > 4 && (r.lineDiv.style.display = "none"),
            function(e, t, r) {
                var n = e.display,
                    i = e.options.lineNumbers,
                    o = n.lineDiv,
                    a = o.firstChild;

                function l(t) {
                    var r = t.nextSibling;
                    return s && y && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), r
                }
                for (var c = n.view, u = n.viewFrom, d = 0; d < c.length; d++) {
                    var f = c[d];
                    if (f.hidden);
                    else if (f.node && f.node.parentNode == o) {
                        for (; a != f.node;) a = l(a);
                        var p = i && null != t && t <= u && f.lineNumber;
                        f.changes && ($(f.changes, "gutter") > -1 && (p = !1), cr(e, f, u, r)), p && (L(f.lineNumber), f.lineNumber.appendChild(document.createTextNode(Je(e.options, u)))), a = f.node.nextSibling
                    } else {
                        var h = gr(e, f, u, r);
                        o.insertBefore(h, a)
                    }
                    u += f.size
                }
                for (; a;) a = l(a)
            }(e, r.updateLineNumbers, t.dims), c > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view,
            function(e) {
                if (e && e.activeElt && e.activeElt != z() && (e.activeElt.focus(), e.anchorNode && D(document.body, e.anchorNode) && D(document.body, e.focusNode))) {
                    var t = window.getSelection(),
                        r = document.createRange();
                    r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), t.removeAllRanges(), t.addRange(r), t.extend(e.focusNode, e.focusOffset)
                }
            }(u), L(r.cursorDiv), L(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, l && (r.lastWrapHeight = t.wrapperHeight, r.lastWrapWidth = t.wrapperWidth, ni(e, 400)), r.updateLineNumbers = null, !0
    }

    function li(e, t) {
        for (var r = t.viewport, n = !0;
            (n && e.options.lineWrapping && t.oldDisplayWidth != Tr(e) || (r && null != r.top && (r = {
                top: Math.min(e.doc.height + _r(e.display) - Lr(e), r.top)
            }), t.visible = Mn(e.display, e.doc, r), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && ai(e, t); n = !1) {
            Tn(e);
            var i = Pn(e);
            gn(e), Wn(e, i), ui(e, i), t.force = !1
        }
        t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
    }

    function si(e, t) {
        var r = new oi(e, t);
        if (ai(e, r)) {
            Tn(e), li(e, r);
            var n = Pn(e);
            gn(e), Wn(e, n), ui(e, n), r.finish()
        }
    }

    function ci(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px"
    }

    function ui(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Sr(e) + "px"
    }

    function di(e) {
        var t = e.display,
            r = t.view;
        if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
            for (var n = an(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", a = 0; a < r.length; a++)
                if (!r[a].hidden) {
                    e.options.fixedGutter && (r[a].gutter && (r[a].gutter.style.left = o), r[a].gutterBackground && (r[a].gutterBackground.style.left = o));
                    var l = r[a].alignable;
                    if (l)
                        for (var s = 0; s < l.length; s++) l[s].style.left = o
                } e.options.fixedGutter && (t.gutters.style.left = n + i + "px")
        }
    }

    function fi(e) {
        if (!e.options.lineNumbers) return !1;
        var t = e.doc,
            r = Je(e.options, t.first + t.size - 1),
            n = e.display;
        if (r.length != n.lineNumChars) {
            var i = n.measure.appendChild(A("div", [A("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                o = i.firstChild.offsetWidth,
                a = i.offsetWidth - o;
            return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - a) + 1, n.lineNumWidth = n.lineNumInnerWidth + a, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px", ci(e.display), !0
        }
        return !1
    }

    function pi(e, t) {
        for (var r = [], n = !1, i = 0; i < e.length; i++) {
            var o = e[i],
                a = null;
            if ("string" != typeof o && (a = o.style, o = o.className), "CodeMirror-linenumbers" == o) {
                if (!t) continue;
                n = !0
            }
            r.push({
                className: o,
                style: a
            })
        }
        return t && !n && r.push({
            className: "CodeMirror-linenumbers",
            style: null
        }), r
    }

    function hi(e) {
        var t = e.gutters,
            r = e.gutterSpecs;
        L(t), e.lineGutter = null;
        for (var n = 0; n < r.length; ++n) {
            var i = r[n],
                o = i.className,
                a = i.style,
                l = t.appendChild(A("div", null, "CodeMirror-gutter " + o));
            a && (l.style.cssText = a), "CodeMirror-linenumbers" == o && (e.lineGutter = l, l.style.width = (e.lineNumWidth || 1) + "px")
        }
        t.style.display = r.length ? "" : "none", ci(e)
    }

    function mi(e) {
        hi(e.display), dn(e), di(e)
    }

    function gi(e, t, n, i) {
        var o = this;
        this.input = n, o.scrollbarFiller = A("div", null, "CodeMirror-scrollbar-filler"), o.scrollbarFiller.setAttribute("cm-not-content", "true"), o.gutterFiller = A("div", null, "CodeMirror-gutter-filler"), o.gutterFiller.setAttribute("cm-not-content", "true"), o.lineDiv = E("div", null, "CodeMirror-code"), o.selectionDiv = A("div", null, null, "position: relative; z-index: 1"), o.cursorDiv = A("div", null, "CodeMirror-cursors"), o.measure = A("div", null, "CodeMirror-measure"), o.lineMeasure = A("div", null, "CodeMirror-measure"), o.lineSpace = E("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none");
        var c = E("div", [o.lineSpace], "CodeMirror-lines");
        o.mover = A("div", [c], null, "position: relative"), o.sizer = A("div", [o.mover], "CodeMirror-sizer"), o.sizerWidth = null, o.heightForcer = A("div", null, null, "position: absolute; height: 30px; width: 1px;"), o.gutters = A("div", null, "CodeMirror-gutters"), o.lineGutter = null, o.scroller = A("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll"), o.scroller.setAttribute("tabIndex", "-1"), o.wrapper = A("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror"), a && l < 8 && (o.gutters.style.zIndex = -1, o.scroller.style.paddingRight = 0), s || r && v || (o.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)), o.viewFrom = o.viewTo = t.first, o.reportedViewFrom = o.reportedViewTo = t.first, o.view = [], o.renderedView = null, o.externalMeasured = null, o.viewOffset = 0, o.lastWrapHeight = o.lastWrapWidth = 0, o.updateLineNumbers = null, o.nativeBarWidth = o.barHeight = o.barWidth = 0, o.scrollbarsClipped = !1, o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null, o.alignWidgets = !1, o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null, o.maxLine = null, o.maxLineLength = 0, o.maxLineChanged = !1, o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null, o.shift = !1, o.selForContextMenu = null, o.activeTouch = null, o.gutterSpecs = pi(i.gutters, i.lineNumbers), hi(o), n.init(o)
    }
    oi.prototype.signal = function(e, t) {
        ve(e, t) && this.events.push(arguments)
    }, oi.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++) he.apply(null, this.events[e])
    };
    var vi = 0,
        yi = null;

    function bi(e) {
        var t = e.wheelDeltaX,
            r = e.wheelDeltaY;
        return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == r && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : null == r && (r = e.wheelDelta), {
            x: t,
            y: r
        }
    }

    function xi(e) {
        var t = bi(e);
        return t.x *= yi, t.y *= yi, t
    }

    function ki(e, t) {
        var n = bi(t),
            i = n.x,
            o = n.y,
            a = e.display,
            l = a.scroller,
            c = l.scrollWidth > l.clientWidth,
            u = l.scrollHeight > l.clientHeight;
        if (i && c || o && u) {
            if (o && y && s) e: for (var f = t.target, p = a.view; f != l; f = f.parentNode)
                for (var h = 0; h < p.length; h++)
                    if (p[h].node == f) {
                        e.display.currentWheelTarget = f;
                        break e
                    } if (i && !r && !d && null != yi) return o && u && Fn(e, Math.max(0, l.scrollTop + o * yi)), In(e, Math.max(0, l.scrollLeft + i * yi)), (!o || o && u) && be(t), void(a.wheelStartX = null);
            if (o && null != yi) {
                var m = o * yi,
                    g = e.doc.scrollTop,
                    v = g + a.wrapper.clientHeight;
                m < 0 ? g = Math.max(0, g + m - 50) : v = Math.min(e.doc.height, v + m + 50), si(e, {
                    top: g,
                    bottom: v
                })
            }
            vi < 20 && (null == a.wheelStartX ? (a.wheelStartX = l.scrollLeft, a.wheelStartY = l.scrollTop, a.wheelDX = i, a.wheelDY = o, setTimeout((function() {
                if (null != a.wheelStartX) {
                    var e = l.scrollLeft - a.wheelStartX,
                        t = l.scrollTop - a.wheelStartY,
                        r = t && a.wheelDY && t / a.wheelDY || e && a.wheelDX && e / a.wheelDX;
                    a.wheelStartX = a.wheelStartY = null, r && (yi = (yi * vi + r) / (vi + 1), ++vi)
                }
            }), 200)) : (a.wheelDX += i, a.wheelDY += o))
        }
    }
    a ? yi = -.53 : r ? yi = 15 : u ? yi = -.7 : f && (yi = -1 / 3);
    var wi = function(e, t) {
        this.ranges = e, this.primIndex = t
    };
    wi.prototype.primary = function() {
        return this.ranges[this.primIndex]
    }, wi.prototype.equals = function(e) {
        if (e == this) return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
        for (var t = 0; t < this.ranges.length; t++) {
            var r = this.ranges[t],
                n = e.ranges[t];
            if (!rt(r.anchor, n.anchor) || !rt(r.head, n.head)) return !1
        }
        return !0
    }, wi.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new _i(nt(this.ranges[t].anchor), nt(this.ranges[t].head));
        return new wi(e, this.primIndex)
    }, wi.prototype.somethingSelected = function() {
        for (var e = 0; e < this.ranges.length; e++)
            if (!this.ranges[e].empty()) return !0;
        return !1
    }, wi.prototype.contains = function(e, t) {
        t || (t = e);
        for (var r = 0; r < this.ranges.length; r++) {
            var n = this.ranges[r];
            if (tt(t, n.from()) >= 0 && tt(e, n.to()) <= 0) return r
        }
        return -1
    };
    var _i = function(e, t) {
        this.anchor = e, this.head = t
    };

    function Ci(e, t, r) {
        var n = e && e.options.selectionsMayTouch,
            i = t[r];
        t.sort((function(e, t) {
            return tt(e.from(), t.from())
        })), r = $(t, i);
        for (var o = 1; o < t.length; o++) {
            var a = t[o],
                l = t[o - 1],
                s = tt(l.to(), a.from());
            if (n && !a.empty() ? s > 0 : s >= 0) {
                var c = ot(l.from(), a.from()),
                    u = it(l.to(), a.to()),
                    d = l.empty() ? a.from() == a.head : l.from() == l.head;
                o <= r && --r, t.splice(--o, 2, new _i(d ? u : c, d ? c : u))
            }
        }
        return new wi(t, r)
    }

    function Si(e, t) {
        return new wi([new _i(e, t || e)], 0)
    }

    function Ti(e) {
        return e.text ? et(e.from.line + e.text.length - 1, K(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
    }

    function Li(e, t) {
        if (tt(e, t.from) < 0) return e;
        if (tt(e, t.to) <= 0) return Ti(t);
        var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            n = e.ch;
        return e.line == t.to.line && (n += Ti(t).ch - t.to.ch), et(r, n)
    }

    function Mi(e, t) {
        for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
            var i = e.sel.ranges[n];
            r.push(new _i(Li(i.anchor, t), Li(i.head, t)))
        }
        return Ci(e.cm, r, e.sel.primIndex)
    }

    function Ai(e, t, r) {
        return e.line == t.line ? et(r.line, e.ch - t.ch + r.ch) : et(r.line + (e.line - t.line), e.ch)
    }

    function Ei(e) {
        e.doc.mode = Re(e.options, e.doc.modeOption), Di(e)
    }

    function Di(e) {
        e.doc.iter((function(e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
        })), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, ni(e, 100), e.state.modeGen++, e.curOp && dn(e)
    }

    function zi(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == K(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
    }

    function Ni(e, t, r, n) {
        function i(e) {
            return r ? r[e] : null
        }

        function o(e, r, i) {
            ! function(e, t, r, n) {
                e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), Mt(e), At(e, r);
                var i = n ? n(e) : 1;
                i != e.height && Ze(e, i)
            }(e, r, i, n), lr(e, "change", e, t)
        }

        function a(e, t) {
            for (var r = [], o = e; o < t; ++o) r.push(new Gt(c[o], i(o), n));
            return r
        }
        var l = t.from,
            s = t.to,
            c = t.text,
            u = Ge(e, l.line),
            d = Ge(e, s.line),
            f = K(c),
            p = i(c.length - 1),
            h = s.line - l.line;
        if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length);
        else if (zi(e, t)) {
            var m = a(0, c.length - 1);
            o(d, d.text, p), h && e.remove(l.line, h), m.length && e.insert(l.line, m)
        } else if (u == d)
            if (1 == c.length) o(u, u.text.slice(0, l.ch) + f + u.text.slice(s.ch), p);
            else {
                var g = a(1, c.length - 1);
                g.push(new Gt(f + u.text.slice(s.ch), p, n)), o(u, u.text.slice(0, l.ch) + c[0], i(0)), e.insert(l.line + 1, g)
            }
        else if (1 == c.length) o(u, u.text.slice(0, l.ch) + c[0] + d.text.slice(s.ch), i(0)), e.remove(l.line + 1, h);
        else {
            o(u, u.text.slice(0, l.ch) + c[0], i(0)), o(d, f + d.text.slice(s.ch), p);
            var v = a(1, c.length - 1);
            h > 1 && e.remove(l.line + 1, h - 1), e.insert(l.line + 1, v)
        }
        lr(e, "change", e, t)
    }

    function Oi(e, t, r) {
        ! function e(n, i, o) {
            if (n.linked)
                for (var a = 0; a < n.linked.length; ++a) {
                    var l = n.linked[a];
                    if (l.doc != i) {
                        var s = o && l.sharedHist;
                        r && !s || (t(l.doc, s), e(l.doc, n, s))
                    }
                }
        }(e, null, !0)
    }

    function Fi(e, t) {
        if (t.cm) throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, sn(e), Ei(e), qi(e), e.options.lineWrapping || Ut(e), e.options.mode = t.modeOption, dn(e)
    }

    function qi(e) {
        ("rtl" == e.doc.direction ? N : T)(e.display.lineDiv, "CodeMirror-rtl")
    }

    function Ii(e) {
        this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
    }

    function Pi(e, t) {
        var r = {
            from: nt(t.from),
            to: Ti(t),
            text: Ve(e, t.from, t.to)
        };
        return Hi(e, r, t.from.line, t.to.line + 1), Oi(e, (function(e) {
            return Hi(e, r, t.from.line, t.to.line + 1)
        }), !0), r
    }

    function Ri(e) {
        for (; e.length;) {
            if (!K(e).ranges) break;
            e.pop()
        }
    }

    function $i(e, t, r, n) {
        var i = e.history;
        i.undone.length = 0;
        var o, a, l = +new Date;
        if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastModTime > l - (e.cm ? e.cm.options.historyEventDelay : 500) || "*" == t.origin.charAt(0))) && (o = function(e, t) {
                return t ? (Ri(e.done), K(e.done)) : e.done.length && !K(e.done).ranges ? K(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), K(e.done)) : void 0
            }(i, i.lastOp == n))) a = K(o.changes), 0 == tt(t.from, t.to) && 0 == tt(t.from, a.to) ? a.to = Ti(t) : o.changes.push(Pi(e, t));
        else {
            var s = K(i.done);
            for (s && s.ranges || Bi(e.sel, i.done), o = {
                    changes: [Pi(e, t)],
                    generation: i.generation
                }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
        }
        i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, a || he(e, "historyAdded")
    }

    function Wi(e, t, r, n) {
        var i = e.history,
            o = n && n.origin;
        r == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || function(e, t, r, n) {
            var i = t.charAt(0);
            return "*" == i || "+" == i && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
        }(e, o, K(i.done), t)) ? i.done[i.done.length - 1] = t : Bi(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastSelOp = r, n && !1 !== n.clearRedo && Ri(i.undone)
    }

    function Bi(e, t) {
        var r = K(t);
        r && r.ranges && r.equals(e) || t.push(e)
    }

    function Hi(e, t, r, n) {
        var i = t["spans_" + e.id],
            o = 0;
        e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), (function(r) {
            r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o
        }))
    }

    function ji(e) {
        if (!e) return null;
        for (var t, r = 0; r < e.length; ++r) e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
        return t ? t.length ? t : null : e
    }

    function Ui(e, t) {
        var r = function(e, t) {
                var r = t["spans_" + e.id];
                if (!r) return null;
                for (var n = [], i = 0; i < t.text.length; ++i) n.push(ji(r[i]));
                return n
            }(e, t),
            n = Tt(e, t);
        if (!r) return n;
        if (!n) return r;
        for (var i = 0; i < r.length; ++i) {
            var o = r[i],
                a = n[i];
            if (o && a) e: for (var l = 0; l < a.length; ++l) {
                for (var s = a[l], c = 0; c < o.length; ++c)
                    if (o[c].marker == s.marker) continue e;
                o.push(s)
            } else a && (r[i] = a)
        }
        return r
    }

    function Gi(e, t, r) {
        for (var n = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) n.push(r ? wi.prototype.deepCopy.call(o) : o);
            else {
                var a = o.changes,
                    l = [];
                n.push({
                    changes: l
                });
                for (var s = 0; s < a.length; ++s) {
                    var c = a[s],
                        u = void 0;
                    if (l.push({
                            from: c.from,
                            to: c.to,
                            text: c.text
                        }), t)
                        for (var d in c)(u = d.match(/^spans_(\d+)$/)) && $(t, Number(u[1])) > -1 && (K(l)[d] = c[d], delete c[d])
                }
            }
        }
        return n
    }

    function Vi(e, t, r, n) {
        if (n) {
            var i = e.anchor;
            if (r) {
                var o = tt(t, i) < 0;
                o != tt(r, i) < 0 ? (i = t, t = r) : o != tt(t, r) < 0 && (t = r)
            }
            return new _i(i, t)
        }
        return new _i(r || t, t)
    }

    function Ki(e, t, r, n, i) {
        null == i && (i = e.cm && (e.cm.display.shift || e.extend)), Ji(e, new wi([Vi(e.sel.primary(), t, r, i)], 0), n)
    }

    function Zi(e, t, r) {
        for (var n = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) n[o] = Vi(e.sel.ranges[o], t[o], null, i);
        Ji(e, Ci(e.cm, n, e.sel.primIndex), r)
    }

    function Xi(e, t, r, n) {
        var i = e.sel.ranges.slice(0);
        i[t] = r, Ji(e, Ci(e.cm, i, e.sel.primIndex), n)
    }

    function Yi(e, t, r, n) {
        Ji(e, Si(t, r), n)
    }

    function Qi(e, t, r) {
        var n = e.history.done,
            i = K(n);
        i && i.ranges ? (n[n.length - 1] = t, eo(e, t, r)) : Ji(e, t, r)
    }

    function Ji(e, t, r) {
        eo(e, t, r), Wi(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r)
    }

    function eo(e, t, r) {
        (ve(e, "beforeSelectionChange") || e.cm && ve(e.cm, "beforeSelectionChange")) && (t = function(e, t, r) {
            var n = {
                ranges: t.ranges,
                update: function(t) {
                    this.ranges = [];
                    for (var r = 0; r < t.length; r++) this.ranges[r] = new _i(lt(e, t[r].anchor), lt(e, t[r].head))
                },
                origin: r && r.origin
            };
            return he(e, "beforeSelectionChange", e, n), e.cm && he(e.cm, "beforeSelectionChange", e.cm, n), n.ranges != t.ranges ? Ci(e.cm, n.ranges, n.ranges.length - 1) : t
        }(e, t, r));
        var n = r && r.bias || (tt(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        to(e, no(e, t, n, !0)), r && !1 === r.scroll || !e.cm || Dn(e.cm)
    }

    function to(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, ge(e.cm)), lr(e, "cursorActivity", e))
    }

    function ro(e) {
        to(e, no(e, e.sel, null, !1))
    }

    function no(e, t, r, n) {
        for (var i, o = 0; o < t.ranges.length; o++) {
            var a = t.ranges[o],
                l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                s = oo(e, a.anchor, l && l.anchor, r, n),
                c = oo(e, a.head, l && l.head, r, n);
            (i || s != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new _i(s, c))
        }
        return i ? Ci(e.cm, i, t.primIndex) : t
    }

    function io(e, t, r, n, i) {
        var o = Ge(e, t.line);
        if (o.markedSpans)
            for (var a = 0; a < o.markedSpans.length; ++a) {
                var l = o.markedSpans[a],
                    s = l.marker,
                    c = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft,
                    u = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
                if ((null == l.from || (c ? l.from <= t.ch : l.from < t.ch)) && (null == l.to || (u ? l.to >= t.ch : l.to > t.ch))) {
                    if (i && (he(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --a;
                            continue
                        }
                        break
                    }
                    if (!s.atomic) continue;
                    if (r) {
                        var d = s.find(n < 0 ? 1 : -1),
                            f = void 0;
                        if ((n < 0 ? u : c) && (d = ao(e, d, -n, d && d.line == t.line ? o : null)), d && d.line == t.line && (f = tt(d, r)) && (n < 0 ? f < 0 : f > 0)) return io(e, d, t, n, i)
                    }
                    var p = s.find(n < 0 ? -1 : 1);
                    return (n < 0 ? c : u) && (p = ao(e, p, n, p.line == t.line ? o : null)), p ? io(e, p, t, n, i) : null
                }
            }
        return t
    }

    function oo(e, t, r, n, i) {
        var o = n || 1,
            a = io(e, t, r, o, i) || !i && io(e, t, r, o, !0) || io(e, t, r, -o, i) || !i && io(e, t, r, -o, !0);
        return a || (e.cantEdit = !0, et(e.first, 0))
    }

    function ao(e, t, r, n) {
        return r < 0 && 0 == t.ch ? t.line > e.first ? lt(e, et(t.line - 1)) : null : r > 0 && t.ch == (n || Ge(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? et(t.line + 1, 0) : null : new et(t.line, t.ch + r)
    }

    function lo(e) {
        e.setSelection(et(e.firstLine(), 0), et(e.lastLine()), B)
    }

    function so(e, t, r) {
        var n = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function() {
                return n.canceled = !0
            }
        };
        return r && (n.update = function(t, r, i, o) {
            t && (n.from = lt(e, t)), r && (n.to = lt(e, r)), i && (n.text = i), void 0 !== o && (n.origin = o)
        }), he(e, "beforeChange", e, n), e.cm && he(e.cm, "beforeChange", e.cm, n), n.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : {
            from: n.from,
            to: n.to,
            text: n.text,
            origin: n.origin
        }
    }

    function co(e, t, r) {
        if (e.cm) {
            if (!e.cm.curOp) return ei(e.cm, co)(e, t, r);
            if (e.cm.state.suppressEdits) return
        }
        if (!(ve(e, "beforeChange") || e.cm && ve(e.cm, "beforeChange")) || (t = so(e, t, !0))) {
            var n = kt && !r && function(e, t, r) {
                var n = null;
                if (e.iter(t.line, r.line + 1, (function(e) {
                        if (e.markedSpans)
                            for (var t = 0; t < e.markedSpans.length; ++t) {
                                var r = e.markedSpans[t].marker;
                                !r.readOnly || n && -1 != $(n, r) || (n || (n = [])).push(r)
                            }
                    })), !n) return null;
                for (var i = [{
                        from: t,
                        to: r
                    }], o = 0; o < n.length; ++o)
                    for (var a = n[o], l = a.find(0), s = 0; s < i.length; ++s) {
                        var c = i[s];
                        if (!(tt(c.to, l.from) < 0 || tt(c.from, l.to) > 0)) {
                            var u = [s, 1],
                                d = tt(c.from, l.from),
                                f = tt(c.to, l.to);
                            (d < 0 || !a.inclusiveLeft && !d) && u.push({
                                from: c.from,
                                to: l.from
                            }), (f > 0 || !a.inclusiveRight && !f) && u.push({
                                from: l.to,
                                to: c.to
                            }), i.splice.apply(i, u), s += u.length - 3
                        }
                    }
                return i
            }(e, t.from, t.to);
            if (n)
                for (var i = n.length - 1; i >= 0; --i) uo(e, {
                    from: n[i].from,
                    to: n[i].to,
                    text: i ? [""] : t.text,
                    origin: t.origin
                });
            else uo(e, t)
        }
    }

    function uo(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != tt(t.from, t.to)) {
            var r = Mi(e, t);
            $i(e, t, r, e.cm ? e.cm.curOp.id : NaN), ho(e, t, r, Tt(e, t));
            var n = [];
            Oi(e, (function(e, r) {
                r || -1 != $(n, e.history) || (yo(e.history, t), n.push(e.history)), ho(e, t, null, Tt(e, t))
            }))
        }
    }

    function fo(e, t, r) {
        var n = e.cm && e.cm.state.suppressEdits;
        if (!n || r) {
            for (var i, o = e.history, a = e.sel, l = "undo" == t ? o.done : o.undone, s = "undo" == t ? o.undone : o.done, c = 0; c < l.length && (i = l[c], r ? !i.ranges || i.equals(e.sel) : i.ranges); c++);
            if (c != l.length) {
                for (o.lastOrigin = o.lastSelOrigin = null;;) {
                    if (!(i = l.pop()).ranges) {
                        if (n) return void l.push(i);
                        break
                    }
                    if (Bi(i, s), r && !i.equals(e.sel)) return void Ji(e, i, {
                        clearRedo: !1
                    });
                    a = i
                }
                var u = [];
                Bi(a, s), s.push({
                    changes: u,
                    generation: o.generation
                }), o.generation = i.generation || ++o.maxGeneration;
                for (var d = ve(e, "beforeChange") || e.cm && ve(e.cm, "beforeChange"), f = function(r) {
                        var n = i.changes[r];
                        if (n.origin = t, d && !so(e, n, !1)) return l.length = 0, {};
                        u.push(Pi(e, n));
                        var o = r ? Mi(e, n) : K(l);
                        ho(e, n, o, Ui(e, n)), !r && e.cm && e.cm.scrollIntoView({
                            from: n.from,
                            to: Ti(n)
                        });
                        var a = [];
                        Oi(e, (function(e, t) {
                            t || -1 != $(a, e.history) || (yo(e.history, n), a.push(e.history)), ho(e, n, null, Ui(e, n))
                        }))
                    }, p = i.changes.length - 1; p >= 0; --p) {
                    var h = f(p);
                    if (h) return h.v
                }
            }
        }
    }

    function po(e, t) {
        if (0 != t && (e.first += t, e.sel = new wi(Z(e.sel.ranges, (function(e) {
                return new _i(et(e.anchor.line + t, e.anchor.ch), et(e.head.line + t, e.head.ch))
            })), e.sel.primIndex), e.cm)) {
            dn(e.cm, e.first, e.first - t, t);
            for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++) fn(e.cm, n, "gutter")
        }
    }

    function ho(e, t, r, n) {
        if (e.cm && !e.cm.curOp) return ei(e.cm, ho)(e, t, r, n);
        if (t.to.line < e.first) po(e, t.text.length - 1 - (t.to.line - t.from.line));
        else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                po(e, i), t = {
                    from: et(e.first, 0),
                    to: et(t.to.line + i, t.to.ch),
                    text: [K(t.text)],
                    origin: t.origin
                }
            }
            var o = e.lastLine();
            t.to.line > o && (t = {
                from: t.from,
                to: et(o, Ge(e, o).text.length),
                text: [t.text[0]],
                origin: t.origin
            }), t.removed = Ve(e, t.from, t.to), r || (r = Mi(e, t)), e.cm ? function(e, t, r) {
                var n = e.doc,
                    i = e.display,
                    o = t.from,
                    a = t.to,
                    l = !1,
                    s = o.line;
                e.options.lineWrapping || (s = Xe(Pt(Ge(n, o.line))), n.iter(s, a.line + 1, (function(e) {
                    if (e == i.maxLine) return l = !0, !0
                })));
                n.sel.contains(t.from, t.to) > -1 && ge(e);
                Ni(n, t, r, ln(e)), e.options.lineWrapping || (n.iter(s, o.line + t.text.length, (function(e) {
                    var t = jt(e);
                    t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, l = !1)
                })), l && (e.curOp.updateMaxLine = !0));
                (function(e, t) {
                    if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
                        for (var r = e.first, n = t - 1; n > r; n--) {
                            var i = Ge(e, n).stateAfter;
                            if (i && (!(i instanceof ct) || n + i.lookAhead < t)) {
                                r = n + 1;
                                break
                            }
                        }
                        e.highlightFrontier = Math.min(e.highlightFrontier, r)
                    }
                })(n, o.line), ni(e, 400);
                var c = t.text.length - (a.line - o.line) - 1;
                t.full ? dn(e) : o.line != a.line || 1 != t.text.length || zi(e.doc, t) ? dn(e, o.line, a.line + 1, c) : fn(e, o.line, "text");
                var u = ve(e, "changes"),
                    d = ve(e, "change");
                if (d || u) {
                    var f = {
                        from: o,
                        to: a,
                        text: t.text,
                        removed: t.removed,
                        origin: t.origin
                    };
                    d && lr(e, "change", e, f), u && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f)
                }
                e.display.selForContextMenu = null
            }(e.cm, t, n) : Ni(e, t, n), eo(e, r, B), e.cantEdit && oo(e, et(e.firstLine(), 0)) && (e.cantEdit = !1)
        }
    }

    function mo(e, t, r, n, i) {
        var o;
        n || (n = r), tt(n, r) < 0 && (r = (o = [n, r])[0], n = o[1]), "string" == typeof t && (t = e.splitLines(t)), co(e, {
            from: r,
            to: n,
            text: t,
            origin: i
        })
    }

    function go(e, t, r, n) {
        r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0)
    }

    function vo(e, t, r, n) {
        for (var i = 0; i < e.length; ++i) {
            var o = e[i],
                a = !0;
            if (o.ranges) {
                o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                for (var l = 0; l < o.ranges.length; l++) go(o.ranges[l].anchor, t, r, n), go(o.ranges[l].head, t, r, n)
            } else {
                for (var s = 0; s < o.changes.length; ++s) {
                    var c = o.changes[s];
                    if (r < c.from.line) c.from = et(c.from.line + n, c.from.ch), c.to = et(c.to.line + n, c.to.ch);
                    else if (t <= c.to.line) {
                        a = !1;
                        break
                    }
                }
                a || (e.splice(0, i + 1), i = 0)
            }
        }
    }

    function yo(e, t) {
        var r = t.from.line,
            n = t.to.line,
            i = t.text.length - (n - r) - 1;
        vo(e.done, r, n, i), vo(e.undone, r, n, i)
    }

    function bo(e, t, r, n) {
        var i = t,
            o = t;
        return "number" == typeof t ? o = Ge(e, at(e, t)) : i = Xe(t), null == i ? null : (n(o, i) && e.cm && fn(e.cm, i, r), o)
    }

    function xo(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, r = 0; r < e.length; ++r) e[r].parent = this, t += e[r].height;
        this.height = t
    }

    function ko(e) {
        this.children = e;
        for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
            var i = e[n];
            t += i.chunkSize(), r += i.height, i.parent = this
        }
        this.size = t, this.height = r, this.parent = null
    }
    _i.prototype.from = function() {
        return ot(this.anchor, this.head)
    }, _i.prototype.to = function() {
        return it(this.anchor, this.head)
    }, _i.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
    }, xo.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(e, t) {
            for (var r = e, n = e + t; r < n; ++r) {
                var i = this.lines[r];
                this.height -= i.height, Vt(i), lr(i, "delete")
            }
            this.lines.splice(e, t)
        },
        collapse: function(e) {
            e.push.apply(e, this.lines)
        },
        insertInner: function(e, t, r) {
            this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var n = 0; n < t.length; ++n) t[n].parent = this
        },
        iterN: function(e, t, r) {
            for (var n = e + t; e < n; ++e)
                if (r(this.lines[e])) return !0
        }
    }, ko.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(e, t) {
            this.size -= t;
            for (var r = 0; r < this.children.length; ++r) {
                var n = this.children[r],
                    i = n.chunkSize();
                if (e < i) {
                    var o = Math.min(t, i - e),
                        a = n.height;
                    if (n.removeInner(e, o), this.height -= a - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), 0 == (t -= o)) break;
                    e = 0
                } else e -= i
            }
            if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof xo))) {
                var l = [];
                this.collapse(l), this.children = [new xo(l)], this.children[0].parent = this
            }
        },
        collapse: function(e) {
            for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
        },
        insertInner: function(e, t, r) {
            this.size += t.length, this.height += r;
            for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                    o = i.chunkSize();
                if (e <= o) {
                    if (i.insertInner(e, t, r), i.lines && i.lines.length > 50) {
                        for (var a = i.lines.length % 25 + 25, l = a; l < i.lines.length;) {
                            var s = new xo(i.lines.slice(l, l += 25));
                            i.height -= s.height, this.children.splice(++n, 0, s), s.parent = this
                        }
                        i.lines = i.lines.slice(0, a), this.maybeSpill()
                    }
                    break
                }
                e -= o
            }
        },
        maybeSpill: function() {
            if (!(this.children.length <= 10)) {
                var e = this;
                do {
                    var t = new ko(e.children.splice(e.children.length - 5, 5));
                    if (e.parent) {
                        e.size -= t.size, e.height -= t.height;
                        var r = $(e.parent.children, e);
                        e.parent.children.splice(r + 1, 0, t)
                    } else {
                        var n = new ko(e.children);
                        n.parent = e, e.children = [n, t], e = n
                    }
                    t.parent = e.parent
                } while (e.children.length > 10);
                e.parent.maybeSpill()
            }
        },
        iterN: function(e, t, r) {
            for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                    o = i.chunkSize();
                if (e < o) {
                    var a = Math.min(t, o - e);
                    if (i.iterN(e, a, r)) return !0;
                    if (0 == (t -= a)) break;
                    e = 0
                } else e -= o
            }
        }
    };
    var wo = function(e, t, r) {
        if (r)
            for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
        this.doc = e, this.node = t
    };

    function _o(e, t, r) {
        Ht(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && En(e, r)
    }
    wo.prototype.clear = function() {
        var e = this.doc.cm,
            t = this.line.widgets,
            r = this.line,
            n = Xe(r);
        if (null != n && t) {
            for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
            t.length || (r.widgets = null);
            var o = xr(this);
            Ze(r, Math.max(0, r.height - o)), e && (Jn(e, (function() {
                _o(e, r, -o), fn(e, n, "widget")
            })), lr(e, "lineWidgetCleared", e, this, n))
        }
    }, wo.prototype.changed = function() {
        var e = this,
            t = this.height,
            r = this.doc.cm,
            n = this.line;
        this.height = null;
        var i = xr(this) - t;
        i && (Wt(this.doc, n) || Ze(n, n.height + i), r && Jn(r, (function() {
            r.curOp.forceUpdate = !0, _o(r, n, i), lr(r, "lineWidgetChanged", r, e, Xe(n))
        })))
    }, ye(wo);
    var Co = 0,
        So = function(e, t) {
            this.lines = [], this.type = t, this.doc = e, this.id = ++Co
        };

    function To(e, t, r, n, i) {
        if (n && n.shared) return function(e, t, r, n, i) {
            (n = I(n)).shared = !1;
            var o = [To(e, t, r, n, i)],
                a = o[0],
                l = n.widgetNode;
            return Oi(e, (function(e) {
                l && (n.widgetNode = l.cloneNode(!0)), o.push(To(e, lt(e, t), lt(e, r), n, i));
                for (var s = 0; s < e.linked.length; ++s)
                    if (e.linked[s].isParent) return;
                a = K(o)
            })), new Lo(o, a)
        }(e, t, r, n, i);
        if (e.cm && !e.cm.curOp) return ei(e.cm, To)(e, t, r, n, i);
        var o = new So(e, i),
            a = tt(t, r);
        if (n && I(n, o, !1), a > 0 || 0 == a && !1 !== o.clearWhenEmpty) return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = E("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
            if (It(e, t.line, t, r, o) || t.line != r.line && It(e, r.line, t, r, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            wt = !0
        }
        o.addToHistory && $i(e, {
            from: t,
            to: r,
            origin: "markText"
        }, e.sel, NaN);
        var l, s = t.line,
            c = e.cm;
        if (e.iter(s, r.line + 1, (function(e) {
                c && o.collapsed && !c.options.lineWrapping && Pt(e) == c.display.maxLine && (l = !0), o.collapsed && s != t.line && Ze(e, 0),
                    function(e, t) {
                        e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
                    }(e, new _t(o, s == t.line ? t.ch : null, s == r.line ? r.ch : null)), ++s
            })), o.collapsed && e.iter(t.line, r.line + 1, (function(t) {
                Wt(e, t) && Ze(t, 0)
            })), o.clearOnEnter && de(o, "beforeCursorEnter", (function() {
                return o.clear()
            })), o.readOnly && (kt = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++Co, o.atomic = !0), c) {
            if (l && (c.curOp.updateMaxLine = !0), o.collapsed) dn(c, t.line, r.line + 1);
            else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
                for (var u = t.line; u <= r.line; u++) fn(c, u, "text");
            o.atomic && ro(c.doc), lr(c, "markerAdded", c, o)
        }
        return o
    }
    So.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            var e = this.doc.cm,
                t = e && !e.curOp;
            if (t && Gn(e), ve(this, "clear")) {
                var r = this.find();
                r && lr(this, "clear", r.from, r.to)
            }
            for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
                var a = this.lines[o],
                    l = Ct(a.markedSpans, this);
                e && !this.collapsed ? fn(e, Xe(a), "text") : e && (null != l.to && (i = Xe(a)), null != l.from && (n = Xe(a))), a.markedSpans = St(a.markedSpans, l), null == l.from && this.collapsed && !Wt(this.doc, a) && e && Ze(a, rn(e.display))
            }
            if (e && this.collapsed && !e.options.lineWrapping)
                for (var s = 0; s < this.lines.length; ++s) {
                    var c = Pt(this.lines[s]),
                        u = jt(c);
                    u > e.display.maxLineLength && (e.display.maxLine = c, e.display.maxLineLength = u, e.display.maxLineChanged = !0)
                }
            null != n && e && this.collapsed && dn(e, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && ro(e.doc)), e && lr(e, "markerCleared", e, this, n, i), t && Vn(e), this.parent && this.parent.clear()
        }
    }, So.prototype.find = function(e, t) {
        var r, n;
        null == e && "bookmark" == this.type && (e = 1);
        for (var i = 0; i < this.lines.length; ++i) {
            var o = this.lines[i],
                a = Ct(o.markedSpans, this);
            if (null != a.from && (r = et(t ? o : Xe(o), a.from), -1 == e)) return r;
            if (null != a.to && (n = et(t ? o : Xe(o), a.to), 1 == e)) return n
        }
        return r && {
            from: r,
            to: n
        }
    }, So.prototype.changed = function() {
        var e = this,
            t = this.find(-1, !0),
            r = this,
            n = this.doc.cm;
        t && n && Jn(n, (function() {
            var i = t.line,
                o = Xe(t.line),
                a = Er(n, o);
            if (a && (Ir(a), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !Wt(r.doc, i) && null != r.height) {
                var l = r.height;
                r.height = null;
                var s = xr(r) - l;
                s && Ze(i, i.height + s)
            }
            lr(n, "markerChanged", n, e)
        }))
    }, So.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            t.maybeHiddenMarkers && -1 != $(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(e)
    }, So.prototype.detachLine = function(e) {
        if (this.lines.splice($(this.lines, e), 1), !this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
        }
    }, ye(So);
    var Lo = function(e, t) {
        this.markers = e, this.primary = t;
        for (var r = 0; r < e.length; ++r) e[r].parent = this
    };

    function Mo(e) {
        return e.findMarks(et(e.first, 0), e.clipPos(et(e.lastLine())), (function(e) {
            return e.parent
        }))
    }

    function Ao(e) {
        for (var t = function(t) {
                var r = e[t],
                    n = [r.primary.doc];
                Oi(r.primary.doc, (function(e) {
                    return n.push(e)
                }));
                for (var i = 0; i < r.markers.length; i++) {
                    var o = r.markers[i]; - 1 == $(n, o.doc) && (o.parent = null, r.markers.splice(i--, 1))
                }
            }, r = 0; r < e.length; r++) t(r)
    }
    Lo.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
            lr(this, "clear")
        }
    }, Lo.prototype.find = function(e, t) {
        return this.primary.find(e, t)
    }, ye(Lo);
    var Eo = 0,
        Do = function(e, t, r, n, i) {
            if (!(this instanceof Do)) return new Do(e, t, r, n, i);
            null == r && (r = 0), ko.call(this, [new xo([new Gt("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = r;
            var o = et(r, 0);
            this.sel = Si(o), this.history = new Ii(null), this.id = ++Eo, this.modeOption = t, this.lineSep = n, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Ni(this, {
                from: o,
                to: o,
                text: e
            }), Ji(this, Si(o), B)
        };
    Do.prototype = Y(ko.prototype, {
        constructor: Do,
        iter: function(e, t, r) {
            r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e)
        },
        insert: function(e, t) {
            for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
            this.insertInner(e - this.first, t, r)
        },
        remove: function(e, t) {
            this.removeInner(e - this.first, t)
        },
        getValue: function(e) {
            var t = Ke(this, this.first, this.first + this.size);
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        setValue: ri((function(e) {
            var t = et(this.first, 0),
                r = this.first + this.size - 1;
            co(this, {
                from: t,
                to: et(r, Ge(this, r).text.length),
                text: this.splitLines(e),
                origin: "setValue",
                full: !0
            }, !0), this.cm && zn(this.cm, 0, 0), Ji(this, Si(t), B)
        })),
        replaceRange: function(e, t, r, n) {
            mo(this, e, t = lt(this, t), r = r ? lt(this, r) : t, n)
        },
        getRange: function(e, t, r) {
            var n = Ve(this, lt(this, e), lt(this, t));
            return !1 === r ? n : n.join(r || this.lineSeparator())
        },
        getLine: function(e) {
            var t = this.getLineHandle(e);
            return t && t.text
        },
        getLineHandle: function(e) {
            if (Qe(this, e)) return Ge(this, e)
        },
        getLineNumber: function(e) {
            return Xe(e)
        },
        getLineHandleVisualStart: function(e) {
            return "number" == typeof e && (e = Ge(this, e)), Pt(e)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(e) {
            return lt(this, e)
        },
        getCursor: function(e) {
            var t = this.sel.primary();
            return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from()
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: ri((function(e, t, r) {
            Yi(this, lt(this, "number" == typeof e ? et(e, t || 0) : e), null, r)
        })),
        setSelection: ri((function(e, t, r) {
            Yi(this, lt(this, e), lt(this, t || e), r)
        })),
        extendSelection: ri((function(e, t, r) {
            Ki(this, lt(this, e), t && lt(this, t), r)
        })),
        extendSelections: ri((function(e, t) {
            Zi(this, st(this, e), t)
        })),
        extendSelectionsBy: ri((function(e, t) {
            Zi(this, st(this, Z(this.sel.ranges, e)), t)
        })),
        setSelections: ri((function(e, t, r) {
            if (e.length) {
                for (var n = [], i = 0; i < e.length; i++) n[i] = new _i(lt(this, e[i].anchor), lt(this, e[i].head));
                null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Ji(this, Ci(this.cm, n, t), r)
            }
        })),
        addSelection: ri((function(e, t, r) {
            var n = this.sel.ranges.slice(0);
            n.push(new _i(lt(this, e), lt(this, t || e))), Ji(this, Ci(this.cm, n, n.length - 1), r)
        })),
        getSelection: function(e) {
            for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
                var i = Ve(this, r[n].from(), r[n].to());
                t = t ? t.concat(i) : i
            }
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        getSelections: function(e) {
            for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
                var i = Ve(this, r[n].from(), r[n].to());
                !1 !== e && (i = i.join(e || this.lineSeparator())), t[n] = i
            }
            return t
        },
        replaceSelection: function(e, t, r) {
            for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
            this.replaceSelections(n, t, r || "+input")
        },
        replaceSelections: ri((function(e, t, r) {
            for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                var a = i.ranges[o];
                n[o] = {
                    from: a.from(),
                    to: a.to(),
                    text: this.splitLines(e[o]),
                    origin: r
                }
            }
            for (var l = t && "end" != t && function(e, t, r) {
                    for (var n = [], i = et(e.first, 0), o = i, a = 0; a < t.length; a++) {
                        var l = t[a],
                            s = Ai(l.from, i, o),
                            c = Ai(Ti(l), i, o);
                        if (i = l.to, o = c, "around" == r) {
                            var u = e.sel.ranges[a],
                                d = tt(u.head, u.anchor) < 0;
                            n[a] = new _i(d ? c : s, d ? s : c)
                        } else n[a] = new _i(s, s)
                    }
                    return new wi(n, e.sel.primIndex)
                }(this, n, t), s = n.length - 1; s >= 0; s--) co(this, n[s]);
            l ? Qi(this, l) : this.cm && Dn(this.cm)
        })),
        undo: ri((function() {
            fo(this, "undo")
        })),
        redo: ri((function() {
            fo(this, "redo")
        })),
        undoSelection: ri((function() {
            fo(this, "undo", !0)
        })),
        redoSelection: ri((function() {
            fo(this, "redo", !0)
        })),
        setExtending: function(e) {
            this.extend = e
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++) e.done[n].ranges || ++t;
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++r;
            return {
                undo: t,
                redo: r
            }
        },
        clearHistory: function() {
            this.history = new Ii(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function(e) {
            return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
        },
        isClean: function(e) {
            return this.history.generation == (e || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: Gi(this.history.done),
                undone: Gi(this.history.undone)
            }
        },
        setHistory: function(e) {
            var t = this.history = new Ii(this.history.maxGeneration);
            t.done = Gi(e.done.slice(0), null, !0), t.undone = Gi(e.undone.slice(0), null, !0)
        },
        setGutterMarker: ri((function(e, t, r) {
            return bo(this, e, "gutter", (function(e) {
                var n = e.gutterMarkers || (e.gutterMarkers = {});
                return n[t] = r, !r && te(n) && (e.gutterMarkers = null), !0
            }))
        })),
        clearGutter: ri((function(e) {
            var t = this;
            this.iter((function(r) {
                r.gutterMarkers && r.gutterMarkers[e] && bo(t, r, "gutter", (function() {
                    return r.gutterMarkers[e] = null, te(r.gutterMarkers) && (r.gutterMarkers = null), !0
                }))
            }))
        })),
        lineInfo: function(e) {
            var t;
            if ("number" == typeof e) {
                if (!Qe(this, e)) return null;
                if (t = e, !(e = Ge(this, e))) return null
            } else if (null == (t = Xe(e))) return null;
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets
            }
        },
        addLineClass: ri((function(e, t, r) {
            return bo(this, e, "gutter" == t ? "gutter" : "class", (function(e) {
                var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                if (e[n]) {
                    if (C(r).test(e[n])) return !1;
                    e[n] += " " + r
                } else e[n] = r;
                return !0
            }))
        })),
        removeLineClass: ri((function(e, t, r) {
            return bo(this, e, "gutter" == t ? "gutter" : "class", (function(e) {
                var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
                    i = e[n];
                if (!i) return !1;
                if (null == r) e[n] = null;
                else {
                    var o = i.match(C(r));
                    if (!o) return !1;
                    var a = o.index + o[0].length;
                    e[n] = i.slice(0, o.index) + (o.index && a != i.length ? " " : "") + i.slice(a) || null
                }
                return !0
            }))
        })),
        addLineWidget: ri((function(e, t, r) {
            return function(e, t, r, n) {
                var i = new wo(e, r, n),
                    o = e.cm;
                return o && i.noHScroll && (o.display.alignWidgets = !0), bo(e, t, "widget", (function(t) {
                    var r = t.widgets || (t.widgets = []);
                    if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !Wt(e, t)) {
                        var n = Ht(t) < e.scrollTop;
                        Ze(t, t.height + xr(i)), n && En(o, i.height), o.curOp.forceUpdate = !0
                    }
                    return !0
                })), o && lr(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : Xe(t)), i
            }(this, e, t, r)
        })),
        removeLineWidget: function(e) {
            e.clear()
        },
        markText: function(e, t, r) {
            return To(this, lt(this, e), lt(this, t), r, r && r.type || "range")
        },
        setBookmark: function(e, t) {
            var r = {
                replacedWith: t && (null == t.nodeType ? t.widget : t),
                insertLeft: t && t.insertLeft,
                clearWhenEmpty: !1,
                shared: t && t.shared,
                handleMouseEvents: t && t.handleMouseEvents
            };
            return To(this, e = lt(this, e), e, r, "bookmark")
        },
        findMarksAt: function(e) {
            var t = [],
                r = Ge(this, (e = lt(this, e)).line).markedSpans;
            if (r)
                for (var n = 0; n < r.length; ++n) {
                    var i = r[n];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                }
            return t
        },
        findMarks: function(e, t, r) {
            e = lt(this, e), t = lt(this, t);
            var n = [],
                i = e.line;
            return this.iter(e.line, t.line + 1, (function(o) {
                var a = o.markedSpans;
                if (a)
                    for (var l = 0; l < a.length; l++) {
                        var s = a[l];
                        null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || r && !r(s.marker) || n.push(s.marker.parent || s.marker)
                    }++i
            })), n
        },
        getAllMarks: function() {
            var e = [];
            return this.iter((function(t) {
                var r = t.markedSpans;
                if (r)
                    for (var n = 0; n < r.length; ++n) null != r[n].from && e.push(r[n].marker)
            })), e
        },
        posFromIndex: function(e) {
            var t, r = this.first,
                n = this.lineSeparator().length;
            return this.iter((function(i) {
                var o = i.text.length + n;
                if (o > e) return t = e, !0;
                e -= o, ++r
            })), lt(this, et(r, t))
        },
        indexFromPos: function(e) {
            var t = (e = lt(this, e)).ch;
            if (e.line < this.first || e.ch < 0) return 0;
            var r = this.lineSeparator().length;
            return this.iter(this.first, e.line, (function(e) {
                t += e.text.length + r
            })), t
        },
        copy: function(e) {
            var t = new Do(Ke(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
            return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
        },
        linkedDoc: function(e) {
            e || (e = {});
            var t = this.first,
                r = this.first + this.size;
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);
            var n = new Do(Ke(this, t, r), e.mode || this.modeOption, t, this.lineSep, this.direction);
            return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({
                    doc: n,
                    sharedHist: e.sharedHist
                }), n.linked = [{
                    doc: this,
                    isParent: !0,
                    sharedHist: e.sharedHist
                }],
                function(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r],
                            i = n.find(),
                            o = e.clipPos(i.from),
                            a = e.clipPos(i.to);
                        if (tt(o, a)) {
                            var l = To(e, o, a, n.primary, n.primary.type);
                            n.markers.push(l), l.parent = n
                        }
                    }
                }(n, Mo(this)), n
        },
        unlinkDoc: function(e) {
            if (e instanceof La && (e = e.doc), this.linked)
                for (var t = 0; t < this.linked.length; ++t) {
                    if (this.linked[t].doc == e) {
                        this.linked.splice(t, 1), e.unlinkDoc(this), Ao(Mo(this));
                        break
                    }
                }
            if (e.history == this.history) {
                var r = [e.id];
                Oi(e, (function(e) {
                    return r.push(e.id)
                }), !0), e.history = new Ii(null), e.history.done = Gi(this.history.done, r), e.history.undone = Gi(this.history.undone, r)
            }
        },
        iterLinkedDocs: function(e) {
            Oi(this, e)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        },
        splitLines: function(e) {
            return this.lineSep ? e.split(this.lineSep) : De(e)
        },
        lineSeparator: function() {
            return this.lineSep || "\n"
        },
        setDirection: ri((function(e) {
            var t;
            ("rtl" != e && (e = "ltr"), e != this.direction) && (this.direction = e, this.iter((function(e) {
                return e.order = null
            })), this.cm && Jn(t = this.cm, (function() {
                qi(t), dn(t)
            })))
        }))
    }), Do.prototype.eachLine = Do.prototype.iter;
    var zo = 0;

    function No(e) {
        var t = this;
        if (Oo(t), !me(t, e) && !kr(t.display, e)) {
            be(e), a && (zo = +new Date);
            var r = cn(t, e, !0),
                n = e.dataTransfer.files;
            if (r && !t.isReadOnly())
                if (n && n.length && window.FileReader && window.File)
                    for (var i = n.length, o = Array(i), l = 0, s = function(e, n) {
                            if (!t.options.allowDropFileTypes || -1 != $(t.options.allowDropFileTypes, e.type)) {
                                var a = new FileReader;
                                a.onload = ei(t, (function() {
                                    var e = a.result;
                                    if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[n] = e, ++l == i) {
                                        var s = {
                                            from: r = lt(t.doc, r),
                                            to: r,
                                            text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
                                            origin: "paste"
                                        };
                                        co(t.doc, s), Qi(t.doc, Si(r, Ti(s)))
                                    }
                                })), a.readAsText(e)
                            }
                        }, c = 0; c < i; ++c) s(n[c], c);
                else {
                    if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), void setTimeout((function() {
                        return t.display.input.focus()
                    }), 20);
                    try {
                        var u = e.dataTransfer.getData("Text");
                        if (u) {
                            var d;
                            if (t.state.draggingText && !t.state.draggingText.copy && (d = t.listSelections()), eo(t.doc, Si(r, r)), d)
                                for (var f = 0; f < d.length; ++f) mo(t.doc, "", d[f].anchor, d[f].head, "drag");
                            t.replaceSelection(u, "around", "paste"), t.display.input.focus()
                        }
                    } catch (e) {}
                }
        }
    }

    function Oo(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
    }

    function Fo(e) {
        if (document.getElementsByClassName) {
            for (var t = document.getElementsByClassName("CodeMirror"), r = [], n = 0; n < t.length; n++) {
                var i = t[n].CodeMirror;
                i && r.push(i)
            }
            r.length && r[0].operation((function() {
                for (var t = 0; t < r.length; t++) e(r[t])
            }))
        }
    }
    var qo = !1;

    function Io() {
        var e;
        qo || (de(window, "resize", (function() {
            null == e && (e = setTimeout((function() {
                e = null, Fo(Po)
            }), 100))
        })), de(window, "blur", (function() {
            return Fo(Sn)
        })), qo = !0)
    }

    function Po(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize()
    }
    for (var Ro = {
            3: "Pause",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            106: "*",
            107: "=",
            109: "-",
            110: ".",
            111: "/",
            145: "ScrollLock",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63232: "Up",
            63233: "Down",
            63234: "Left",
            63235: "Right",
            63272: "Delete",
            63273: "Home",
            63275: "End",
            63276: "PageUp",
            63277: "PageDown",
            63302: "Insert"
        }, $o = 0; $o < 10; $o++) Ro[$o + 48] = Ro[$o + 96] = String($o);
    for (var Wo = 65; Wo <= 90; Wo++) Ro[Wo] = String.fromCharCode(Wo);
    for (var Bo = 1; Bo <= 12; Bo++) Ro[Bo + 111] = Ro[Bo + 63235] = "F" + Bo;
    var Ho = {};

    function jo(e) {
        var t, r, n, i, o = e.split(/-(?!$)/);
        e = o[o.length - 1];
        for (var a = 0; a < o.length - 1; a++) {
            var l = o[a];
            if (/^(cmd|meta|m)$/i.test(l)) i = !0;
            else if (/^a(lt)?$/i.test(l)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(l)) r = !0;
            else {
                if (!/^s(hift)?$/i.test(l)) throw new Error("Unrecognized modifier name: " + l);
                n = !0
            }
        }
        return t && (e = "Alt-" + e), r && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), n && (e = "Shift-" + e), e
    }

    function Uo(e) {
        var t = {};
        for (var r in e)
            if (e.hasOwnProperty(r)) {
                var n = e[r];
                if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;
                if ("..." == n) {
                    delete e[r];
                    continue
                }
                for (var i = Z(r.split(" "), jo), o = 0; o < i.length; o++) {
                    var a = void 0,
                        l = void 0;
                    o == i.length - 1 ? (l = i.join(" "), a = n) : (l = i.slice(0, o + 1).join(" "), a = "...");
                    var s = t[l];
                    if (s) {
                        if (s != a) throw new Error("Inconsistent bindings for " + l)
                    } else t[l] = a
                }
                delete e[r]
            } for (var c in t) e[c] = t[c];
        return e
    }

    function Go(e, t, r, n) {
        var i = (t = Xo(t)).call ? t.call(e, n) : t[e];
        if (!1 === i) return "nothing";
        if ("..." === i) return "multi";
        if (null != i && r(i)) return "handled";
        if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return Go(e, t.fallthrough, r, n);
            for (var o = 0; o < t.fallthrough.length; o++) {
                var a = Go(e, t.fallthrough[o], r, n);
                if (a) return a
            }
        }
    }

    function Vo(e) {
        var t = "string" == typeof e ? e : Ro[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
    }

    function Ko(e, t, r) {
        var n = e;
        return t.altKey && "Alt" != n && (e = "Alt-" + e), (w ? t.metaKey : t.ctrlKey) && "Ctrl" != n && (e = "Ctrl-" + e), (w ? t.ctrlKey : t.metaKey) && "Cmd" != n && (e = "Cmd-" + e), !r && t.shiftKey && "Shift" != n && (e = "Shift-" + e), e
    }

    function Zo(e, t) {
        if (d && 34 == e.keyCode && e.char) return !1;
        var r = Ro[e.keyCode];
        return null != r && !e.altGraphKey && (3 == e.keyCode && e.code && (r = e.code), Ko(r, e, t))
    }

    function Xo(e) {
        return "string" == typeof e ? Ho[e] : e
    }

    function Yo(e, t) {
        for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
            for (var o = t(r[i]); n.length && tt(o.from, K(n).to) <= 0;) {
                var a = n.pop();
                if (tt(a.from, o.from) < 0) {
                    o.from = a.from;
                    break
                }
            }
            n.push(o)
        }
        Jn(e, (function() {
            for (var t = n.length - 1; t >= 0; t--) mo(e.doc, "", n[t].from, n[t].to, "+delete");
            Dn(e)
        }))
    }

    function Qo(e, t, r) {
        var n = ie(e.text, t + r, r);
        return n < 0 || n > e.text.length ? null : n
    }

    function Jo(e, t, r) {
        var n = Qo(e, t.ch, r);
        return null == n ? null : new et(t.line, n, r < 0 ? "after" : "before")
    }

    function ea(e, t, r, n, i) {
        if (e) {
            var o = ce(r, t.doc.direction);
            if (o) {
                var a, l = i < 0 ? K(o) : o[0],
                    s = i < 0 == (1 == l.level) ? "after" : "before";
                if (l.level > 0 || "rtl" == t.doc.direction) {
                    var c = Dr(t, r);
                    a = i < 0 ? r.text.length - 1 : 0;
                    var u = zr(t, c, a).top;
                    a = oe((function(e) {
                        return zr(t, c, e).top == u
                    }), i < 0 == (1 == l.level) ? l.from : l.to - 1, a), "before" == s && (a = Qo(r, a, 1))
                } else a = i < 0 ? l.to : l.from;
                return new et(n, a, s)
            }
        }
        return new et(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after")
    }
    Ho.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    }, Ho.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    }, Ho.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
    }, Ho.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"]
    }, Ho.default = y ? Ho.macDefault : Ho.pcDefault;
    var ta = {
        selectAll: lo,
        singleSelection: function(e) {
            return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), B)
        },
        killLine: function(e) {
            return Yo(e, (function(t) {
                if (t.empty()) {
                    var r = Ge(e.doc, t.head.line).text.length;
                    return t.head.ch == r && t.head.line < e.lastLine() ? {
                        from: t.head,
                        to: et(t.head.line + 1, 0)
                    } : {
                        from: t.head,
                        to: et(t.head.line, r)
                    }
                }
                return {
                    from: t.from(),
                    to: t.to()
                }
            }))
        },
        deleteLine: function(e) {
            return Yo(e, (function(t) {
                return {
                    from: et(t.from().line, 0),
                    to: lt(e.doc, et(t.to().line + 1, 0))
                }
            }))
        },
        delLineLeft: function(e) {
            return Yo(e, (function(e) {
                return {
                    from: et(e.from().line, 0),
                    to: e.from()
                }
            }))
        },
        delWrappedLineLeft: function(e) {
            return Yo(e, (function(t) {
                var r = e.charCoords(t.head, "div").top + 5;
                return {
                    from: e.coordsChar({
                        left: 0,
                        top: r
                    }, "div"),
                    to: t.from()
                }
            }))
        },
        delWrappedLineRight: function(e) {
            return Yo(e, (function(t) {
                var r = e.charCoords(t.head, "div").top + 5,
                    n = e.coordsChar({
                        left: e.display.lineDiv.offsetWidth + 100,
                        top: r
                    }, "div");
                return {
                    from: t.from(),
                    to: n
                }
            }))
        },
        undo: function(e) {
            return e.undo()
        },
        redo: function(e) {
            return e.redo()
        },
        undoSelection: function(e) {
            return e.undoSelection()
        },
        redoSelection: function(e) {
            return e.redoSelection()
        },
        goDocStart: function(e) {
            return e.extendSelection(et(e.firstLine(), 0))
        },
        goDocEnd: function(e) {
            return e.extendSelection(et(e.lastLine()))
        },
        goLineStart: function(e) {
            return e.extendSelectionsBy((function(t) {
                return ra(e, t.head.line)
            }), {
                origin: "+move",
                bias: 1
            })
        },
        goLineStartSmart: function(e) {
            return e.extendSelectionsBy((function(t) {
                return na(e, t.head)
            }), {
                origin: "+move",
                bias: 1
            })
        },
        goLineEnd: function(e) {
            return e.extendSelectionsBy((function(t) {
                return function(e, t) {
                    var r = Ge(e.doc, t),
                        n = function(e) {
                            for (var t; t = Ft(e);) e = t.find(1, !0).line;
                            return e
                        }(r);
                    n != r && (t = Xe(n));
                    return ea(!0, e, r, t, -1)
                }(e, t.head.line)
            }), {
                origin: "+move",
                bias: -1
            })
        },
        goLineRight: function(e) {
            return e.extendSelectionsBy((function(t) {
                var r = e.cursorCoords(t.head, "div").top + 5;
                return e.coordsChar({
                    left: e.display.lineDiv.offsetWidth + 100,
                    top: r
                }, "div")
            }), j)
        },
        goLineLeft: function(e) {
            return e.extendSelectionsBy((function(t) {
                var r = e.cursorCoords(t.head, "div").top + 5;
                return e.coordsChar({
                    left: 0,
                    top: r
                }, "div")
            }), j)
        },
        goLineLeftSmart: function(e) {
            return e.extendSelectionsBy((function(t) {
                var r = e.cursorCoords(t.head, "div").top + 5,
                    n = e.coordsChar({
                        left: 0,
                        top: r
                    }, "div");
                return n.ch < e.getLine(n.line).search(/\S/) ? na(e, t.head) : n
            }), j)
        },
        goLineUp: function(e) {
            return e.moveV(-1, "line")
        },
        goLineDown: function(e) {
            return e.moveV(1, "line")
        },
        goPageUp: function(e) {
            return e.moveV(-1, "page")
        },
        goPageDown: function(e) {
            return e.moveV(1, "page")
        },
        goCharLeft: function(e) {
            return e.moveH(-1, "char")
        },
        goCharRight: function(e) {
            return e.moveH(1, "char")
        },
        goColumnLeft: function(e) {
            return e.moveH(-1, "column")
        },
        goColumnRight: function(e) {
            return e.moveH(1, "column")
        },
        goWordLeft: function(e) {
            return e.moveH(-1, "word")
        },
        goGroupRight: function(e) {
            return e.moveH(1, "group")
        },
        goGroupLeft: function(e) {
            return e.moveH(-1, "group")
        },
        goWordRight: function(e) {
            return e.moveH(1, "word")
        },
        delCharBefore: function(e) {
            return e.deleteH(-1, "char")
        },
        delCharAfter: function(e) {
            return e.deleteH(1, "char")
        },
        delWordBefore: function(e) {
            return e.deleteH(-1, "word")
        },
        delWordAfter: function(e) {
            return e.deleteH(1, "word")
        },
        delGroupBefore: function(e) {
            return e.deleteH(-1, "group")
        },
        delGroupAfter: function(e) {
            return e.deleteH(1, "group")
        },
        indentAuto: function(e) {
            return e.indentSelection("smart")
        },
        indentMore: function(e) {
            return e.indentSelection("add")
        },
        indentLess: function(e) {
            return e.indentSelection("subtract")
        },
        insertTab: function(e) {
            return e.replaceSelection("\t")
        },
        insertSoftTab: function(e) {
            for (var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0; i < r.length; i++) {
                var o = r[i].from(),
                    a = P(e.getLine(o.line), o.ch, n);
                t.push(V(n - a % n))
            }
            e.replaceSelections(t)
        },
        defaultTab: function(e) {
            e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
        },
        transposeChars: function(e) {
            return Jn(e, (function() {
                for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++)
                    if (t[n].empty()) {
                        var i = t[n].head,
                            o = Ge(e.doc, i.line).text;
                        if (o)
                            if (i.ch == o.length && (i = new et(i.line, i.ch - 1)), i.ch > 0) i = new et(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), et(i.line, i.ch - 2), i, "+transpose");
                            else if (i.line > e.doc.first) {
                            var a = Ge(e.doc, i.line - 1).text;
                            a && (i = new et(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), et(i.line - 1, a.length - 1), i, "+transpose"))
                        }
                        r.push(new _i(i, i))
                    } e.setSelections(r)
            }))
        },
        newlineAndIndent: function(e) {
            return Jn(e, (function() {
                for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--) e.replaceRange(e.doc.lineSeparator(), t[r].anchor, t[r].head, "+input");
                t = e.listSelections();
                for (var n = 0; n < t.length; n++) e.indentLine(t[n].from().line, null, !0);
                Dn(e)
            }))
        },
        openLine: function(e) {
            return e.replaceSelection("\n", "start")
        },
        toggleOverwrite: function(e) {
            return e.toggleOverwrite()
        }
    };

    function ra(e, t) {
        var r = Ge(e.doc, t),
            n = Pt(r);
        return n != r && (t = Xe(n)), ea(!0, e, n, t, 1)
    }

    function na(e, t) {
        var r = ra(e, t.line),
            n = Ge(e.doc, r.line),
            i = ce(n, e.doc.direction);
        if (!i || 0 == i[0].level) {
            var o = Math.max(0, n.text.search(/\S/)),
                a = t.line == r.line && t.ch <= o && t.ch;
            return et(r.line, a ? 0 : o, r.sticky)
        }
        return r
    }

    function ia(e, t, r) {
        if ("string" == typeof t && !(t = ta[t])) return !1;
        e.display.input.ensurePolled();
        var n = e.display.shift,
            i = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != W
        } finally {
            e.display.shift = n, e.state.suppressEdits = !1
        }
        return i
    }
    var oa = new R;

    function aa(e, t, r, n) {
        var i = e.state.keySeq;
        if (i) {
            if (Vo(t)) return "handled";
            if (/\'$/.test(t) ? e.state.keySeq = null : oa.set(50, (function() {
                    e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
                })), la(e, i + " " + t, r, n)) return !0
        }
        return la(e, t, r, n)
    }

    function la(e, t, r, n) {
        var i = function(e, t, r) {
            for (var n = 0; n < e.state.keyMaps.length; n++) {
                var i = Go(t, e.state.keyMaps[n], r, e);
                if (i) return i
            }
            return e.options.extraKeys && Go(t, e.options.extraKeys, r, e) || Go(t, e.options.keyMap, r, e)
        }(e, t, n);
        return "multi" == i && (e.state.keySeq = t), "handled" == i && lr(e, "keyHandled", e, t, r), "handled" != i && "multi" != i || (be(r), kn(e)), !!i
    }

    function sa(e, t) {
        var r = Zo(t, !0);
        return !!r && (t.shiftKey && !e.state.keySeq ? aa(e, "Shift-" + r, t, (function(t) {
            return ia(e, t, !0)
        })) || aa(e, r, t, (function(t) {
            if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return ia(e, t)
        })) : aa(e, r, t, (function(t) {
            return ia(e, t)
        })))
    }
    var ca = null;

    function ua(e) {
        var t = this;
        if (t.curOp.focus = z(), !me(t, e)) {
            a && l < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var i = sa(t, e);
            d && (ca = i ? n : null, !i && 88 == n && !Ne && (y ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), r && !y && !i && 46 == n && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || function(e) {
                var t = e.display.lineDiv;

                function r(e) {
                    18 != e.keyCode && e.altKey || (T(t, "CodeMirror-crosshair"), pe(document, "keyup", r), pe(document, "mouseover", r))
                }
                N(t, "CodeMirror-crosshair"), de(document, "keyup", r), de(document, "mouseover", r)
            }(t)
        }
    }

    function da(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), me(this, e)
    }

    function fa(e) {
        var t = this;
        if (!(kr(t.display, e) || me(t, e) || e.ctrlKey && !e.altKey || y && e.metaKey)) {
            var r = e.keyCode,
                n = e.charCode;
            if (d && r == ca) return ca = null, void be(e);
            if (!d || e.which && !(e.which < 10) || !sa(t, e)) {
                var i = String.fromCharCode(null == n ? r : n);
                "\b" != i && (function(e, t, r) {
                    return aa(e, "'" + r + "'", t, (function(t) {
                        return ia(e, t, !0)
                    }))
                }(t, e, i) || t.display.input.onKeyPress(e))
            }
        }
    }
    var pa, ha, ma = function(e, t, r) {
        this.time = e, this.pos = t, this.button = r
    };

    function ga(e) {
        var t = this,
            r = t.display;
        if (!(me(t, e) || r.activeTouch && r.input.supportsTouch()))
            if (r.input.ensurePolled(), r.shift = e.shiftKey, kr(r, e)) s || (r.scroller.draggable = !1, setTimeout((function() {
                return r.scroller.draggable = !0
            }), 100));
            else if (!ba(t, e)) {
            var n = cn(t, e),
                i = Ce(e),
                o = n ? function(e, t) {
                    var r = +new Date;
                    return ha && ha.compare(r, e, t) ? (pa = ha = null, "triple") : pa && pa.compare(r, e, t) ? (ha = new ma(r, e, t), pa = null, "double") : (pa = new ma(r, e, t), ha = null, "single")
                }(n, i) : "single";
            window.focus(), 1 == i && t.state.selectingText && t.state.selectingText(e), n && function(e, t, r, n, i) {
                var o = "Click";
                "double" == n ? o = "Double" + o : "triple" == n && (o = "Triple" + o);
                return aa(e, Ko(o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o, i), i, (function(t) {
                    if ("string" == typeof t && (t = ta[t]), !t) return !1;
                    var n = !1;
                    try {
                        e.isReadOnly() && (e.state.suppressEdits = !0), n = t(e, r) != W
                    } finally {
                        e.state.suppressEdits = !1
                    }
                    return n
                }))
            }(t, i, n, o, e) || (1 == i ? n ? function(e, t, r, n) {
                a ? setTimeout(q(wn, e), 0) : e.curOp.focus = z();
                var i, o = function(e, t, r) {
                        var n = e.getOption("configureMouse"),
                            i = n ? n(e, t, r) : {};
                        if (null == i.unit) {
                            var o = b ? r.shiftKey && r.metaKey : r.altKey;
                            i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line"
                        }(null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || r.shiftKey);
                        null == i.addNew && (i.addNew = y ? r.metaKey : r.ctrlKey);
                        null == i.moveOnDrag && (i.moveOnDrag = !(y ? r.altKey : r.ctrlKey));
                        return i
                    }(e, r, n),
                    c = e.doc.sel;
                e.options.dragDrop && Le && !e.isReadOnly() && "single" == r && (i = c.contains(t)) > -1 && (tt((i = c.ranges[i]).from(), t) < 0 || t.xRel > 0) && (tt(i.to(), t) > 0 || t.xRel < 0) ? function(e, t, r, n) {
                    var i = e.display,
                        o = !1,
                        c = ei(e, (function(t) {
                            s && (i.scroller.draggable = !1), e.state.draggingText = !1, pe(i.wrapper.ownerDocument, "mouseup", c), pe(i.wrapper.ownerDocument, "mousemove", u), pe(i.scroller, "dragstart", d), pe(i.scroller, "drop", c), o || (be(t), n.addNew || Ki(e.doc, r, null, null, n.extend), s || a && 9 == l ? setTimeout((function() {
                                i.wrapper.ownerDocument.body.focus(), i.input.focus()
                            }), 20) : i.input.focus())
                        })),
                        u = function(e) {
                            o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10
                        },
                        d = function() {
                            return o = !0
                        };
                    s && (i.scroller.draggable = !0);
                    e.state.draggingText = c, c.copy = !n.moveOnDrag, i.scroller.dragDrop && i.scroller.dragDrop();
                    de(i.wrapper.ownerDocument, "mouseup", c), de(i.wrapper.ownerDocument, "mousemove", u), de(i.scroller, "dragstart", d), de(i.scroller, "drop", c), _n(e), setTimeout((function() {
                        return i.input.focus()
                    }), 20)
                }(e, n, t, o) : function(e, t, r, n) {
                    var i = e.display,
                        o = e.doc;
                    be(t);
                    var a, l, s = o.sel,
                        c = s.ranges;
                    n.addNew && !n.extend ? (l = o.sel.contains(r), a = l > -1 ? c[l] : new _i(r, r)) : (a = o.sel.primary(), l = o.sel.primIndex);
                    if ("rectangle" == n.unit) n.addNew || (a = new _i(r, r)), r = cn(e, t, !0, !0), l = -1;
                    else {
                        var u = va(e, r, n.unit);
                        a = n.extend ? Vi(a, u.anchor, u.head, n.extend) : u
                    }
                    n.addNew ? -1 == l ? (l = c.length, Ji(o, Ci(e, c.concat([a]), l), {
                        scroll: !1,
                        origin: "*mouse"
                    })) : c.length > 1 && c[l].empty() && "char" == n.unit && !n.extend ? (Ji(o, Ci(e, c.slice(0, l).concat(c.slice(l + 1)), 0), {
                        scroll: !1,
                        origin: "*mouse"
                    }), s = o.sel) : Xi(o, l, a, H) : (l = 0, Ji(o, new wi([a], 0), H), s = o.sel);
                    var d = r;

                    function f(t) {
                        if (0 != tt(d, t))
                            if (d = t, "rectangle" == n.unit) {
                                for (var i = [], c = e.options.tabSize, u = P(Ge(o, r.line).text, r.ch, c), f = P(Ge(o, t.line).text, t.ch, c), p = Math.min(u, f), h = Math.max(u, f), m = Math.min(r.line, t.line), g = Math.min(e.lastLine(), Math.max(r.line, t.line)); m <= g; m++) {
                                    var v = Ge(o, m).text,
                                        y = U(v, p, c);
                                    p == h ? i.push(new _i(et(m, y), et(m, y))) : v.length > y && i.push(new _i(et(m, y), et(m, U(v, h, c))))
                                }
                                i.length || i.push(new _i(r, r)), Ji(o, Ci(e, s.ranges.slice(0, l).concat(i), l), {
                                    origin: "*mouse",
                                    scroll: !1
                                }), e.scrollIntoView(t)
                            } else {
                                var b, x = a,
                                    k = va(e, t, n.unit),
                                    w = x.anchor;
                                tt(k.anchor, w) > 0 ? (b = k.head, w = ot(x.from(), k.anchor)) : (b = k.anchor, w = it(x.to(), k.head));
                                var _ = s.ranges.slice(0);
                                _[l] = function(e, t) {
                                    var r = t.anchor,
                                        n = t.head,
                                        i = Ge(e.doc, r.line);
                                    if (0 == tt(r, n) && r.sticky == n.sticky) return t;
                                    var o = ce(i);
                                    if (!o) return t;
                                    var a = le(o, r.ch, r.sticky),
                                        l = o[a];
                                    if (l.from != r.ch && l.to != r.ch) return t;
                                    var s, c = a + (l.from == r.ch == (1 != l.level) ? 0 : 1);
                                    if (0 == c || c == o.length) return t;
                                    if (n.line != r.line) s = (n.line - r.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0;
                                    else {
                                        var u = le(o, n.ch, n.sticky),
                                            d = u - a || (n.ch - r.ch) * (1 == l.level ? -1 : 1);
                                        s = u == c - 1 || u == c ? d < 0 : d > 0
                                    }
                                    var f = o[c + (s ? -1 : 0)],
                                        p = s == (1 == f.level),
                                        h = p ? f.from : f.to,
                                        m = p ? "after" : "before";
                                    return r.ch == h && r.sticky == m ? t : new _i(new et(r.line, h, m), n)
                                }(e, new _i(lt(o, w), b)), Ji(o, Ci(e, _, l), H)
                            }
                    }
                    var p = i.wrapper.getBoundingClientRect(),
                        h = 0;

                    function m(t) {
                        e.state.selectingText = !1, h = 1 / 0, t && (be(t), i.input.focus()), pe(i.wrapper.ownerDocument, "mousemove", g), pe(i.wrapper.ownerDocument, "mouseup", v), o.history.lastSelOrigin = null
                    }
                    var g = ei(e, (function(t) {
                            0 !== t.buttons && Ce(t) ? function t(r) {
                                var a = ++h,
                                    l = cn(e, r, !0, "rectangle" == n.unit);
                                if (l)
                                    if (0 != tt(l, d)) {
                                        e.curOp.focus = z(), f(l);
                                        var s = Mn(i, o);
                                        (l.line >= s.to || l.line < s.from) && setTimeout(ei(e, (function() {
                                            h == a && t(r)
                                        })), 150)
                                    } else {
                                        var c = r.clientY < p.top ? -20 : r.clientY > p.bottom ? 20 : 0;
                                        c && setTimeout(ei(e, (function() {
                                            h == a && (i.scroller.scrollTop += c, t(r))
                                        })), 50)
                                    }
                            }(t) : m(t)
                        })),
                        v = ei(e, m);
                    e.state.selectingText = v, de(i.wrapper.ownerDocument, "mousemove", g), de(i.wrapper.ownerDocument, "mouseup", v)
                }(e, n, t, o)
            }(t, n, o, e) : _e(e) == r.scroller && be(e) : 2 == i ? (n && Ki(t.doc, n), setTimeout((function() {
                return r.input.focus()
            }), 20)) : 3 == i && (_ ? t.display.input.onContextMenu(e) : _n(t)))
        }
    }

    function va(e, t, r) {
        if ("char" == r) return new _i(t, t);
        if ("word" == r) return e.findWordAt(t);
        if ("line" == r) return new _i(et(t.line, 0), lt(e.doc, et(t.line + 1, 0)));
        var n = r(e, t);
        return new _i(n.from, n.to)
    }

    function ya(e, t, r, n) {
        var i, o;
        if (t.touches) i = t.touches[0].clientX, o = t.touches[0].clientY;
        else try {
            i = t.clientX, o = t.clientY
        } catch (t) {
            return !1
        }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
        n && be(t);
        var a = e.display,
            l = a.lineDiv.getBoundingClientRect();
        if (o > l.bottom || !ve(e, r)) return ke(t);
        o -= l.top - a.viewOffset;
        for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
            var c = a.gutters.childNodes[s];
            if (c && c.getBoundingClientRect().right >= i) return he(e, r, e, Ye(e.doc, o), e.display.gutterSpecs[s].className, t), ke(t)
        }
    }

    function ba(e, t) {
        return ya(e, t, "gutterClick", !0)
    }

    function xa(e, t) {
        kr(e.display, t) || function(e, t) {
            if (!ve(e, "gutterContextMenu")) return !1;
            return ya(e, t, "gutterContextMenu", !1)
        }(e, t) || me(e, t, "contextmenu") || _ || e.display.input.onContextMenu(t)
    }

    function ka(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Rr(e)
    }
    ma.prototype.compare = function(e, t, r) {
        return this.time + 400 > e && 0 == tt(t, this.pos) && r == this.button
    };
    var wa = {
            toString: function() {
                return "CodeMirror.Init"
            }
        },
        _a = {},
        Ca = {};

    function Sa(e, t, r) {
        if (!t != !(r && r != wa)) {
            var n = e.display.dragFunctions,
                i = t ? de : pe;
            i(e.display.scroller, "dragstart", n.start), i(e.display.scroller, "dragenter", n.enter), i(e.display.scroller, "dragover", n.over), i(e.display.scroller, "dragleave", n.leave), i(e.display.scroller, "drop", n.drop)
        }
    }

    function Ta(e) {
        e.options.lineWrapping ? (N(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (T(e.display.wrapper, "CodeMirror-wrap"), Ut(e)), sn(e), dn(e), Rr(e), setTimeout((function() {
            return Wn(e)
        }), 100)
    }

    function La(e, t) {
        var r = this;
        if (!(this instanceof La)) return new La(e, t);
        this.options = t = t ? I(t) : {}, I(_a, t, !1);
        var n = t.value;
        "string" == typeof n ? n = new Do(n, t.mode, null, t.lineSeparator, t.direction) : t.mode && (n.modeOption = t.mode), this.doc = n;
        var i = new La.inputStyles[t.inputStyle](this),
            o = this.display = new gi(e, n, i, t);
        for (var c in o.wrapper.CodeMirror = this, ka(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), jn(this), this.state = {
                    keyMaps: [],
                    overlays: [],
                    modeGen: 0,
                    overwrite: !1,
                    delayingBlurEvent: !1,
                    focused: !1,
                    suppressEdits: !1,
                    pasteIncoming: -1,
                    cutIncoming: -1,
                    selectingText: !1,
                    draggingText: !1,
                    highlight: new R,
                    keySeq: null,
                    specialChars: null
                }, t.autofocus && !v && o.input.focus(), a && l < 11 && setTimeout((function() {
                    return r.display.input.reset(!0)
                }), 20),
                function(e) {
                    var t = e.display;
                    de(t.scroller, "mousedown", ei(e, ga)), de(t.scroller, "dblclick", a && l < 11 ? ei(e, (function(t) {
                        if (!me(e, t)) {
                            var r = cn(e, t);
                            if (r && !ba(e, t) && !kr(e.display, t)) {
                                be(t);
                                var n = e.findWordAt(r);
                                Ki(e.doc, n.anchor, n.head)
                            }
                        }
                    })) : function(t) {
                        return me(e, t) || be(t)
                    });
                    de(t.scroller, "contextmenu", (function(t) {
                        return xa(e, t)
                    }));
                    var r, n = {
                        end: 0
                    };

                    function i() {
                        t.activeTouch && (r = setTimeout((function() {
                            return t.activeTouch = null
                        }), 1e3), (n = t.activeTouch).end = +new Date)
                    }

                    function o(e, t) {
                        if (null == t.left) return !0;
                        var r = t.left - e.left,
                            n = t.top - e.top;
                        return r * r + n * n > 400
                    }
                    de(t.scroller, "touchstart", (function(i) {
                        if (!me(e, i) && ! function(e) {
                                if (1 != e.touches.length) return !1;
                                var t = e.touches[0];
                                return t.radiusX <= 1 && t.radiusY <= 1
                            }(i) && !ba(e, i)) {
                            t.input.ensurePolled(), clearTimeout(r);
                            var o = +new Date;
                            t.activeTouch = {
                                start: o,
                                moved: !1,
                                prev: o - n.end <= 300 ? n : null
                            }, 1 == i.touches.length && (t.activeTouch.left = i.touches[0].pageX, t.activeTouch.top = i.touches[0].pageY)
                        }
                    })), de(t.scroller, "touchmove", (function() {
                        t.activeTouch && (t.activeTouch.moved = !0)
                    })), de(t.scroller, "touchend", (function(r) {
                        var n = t.activeTouch;
                        if (n && !kr(t, r) && null != n.left && !n.moved && new Date - n.start < 300) {
                            var a, l = e.coordsChar(t.activeTouch, "page");
                            a = !n.prev || o(n, n.prev) ? new _i(l, l) : !n.prev.prev || o(n, n.prev.prev) ? e.findWordAt(l) : new _i(et(l.line, 0), lt(e.doc, et(l.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), be(r)
                        }
                        i()
                    })), de(t.scroller, "touchcancel", i), de(t.scroller, "scroll", (function() {
                        t.scroller.clientHeight && (Fn(e, t.scroller.scrollTop), In(e, t.scroller.scrollLeft, !0), he(e, "scroll", e))
                    })), de(t.scroller, "mousewheel", (function(t) {
                        return ki(e, t)
                    })), de(t.scroller, "DOMMouseScroll", (function(t) {
                        return ki(e, t)
                    })), de(t.wrapper, "scroll", (function() {
                        return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0
                    })), t.dragFunctions = {
                        enter: function(t) {
                            me(e, t) || we(t)
                        },
                        over: function(t) {
                            me(e, t) || (! function(e, t) {
                                var r = cn(e, t);
                                if (r) {
                                    var n = document.createDocumentFragment();
                                    yn(e, r, n), e.display.dragCursor || (e.display.dragCursor = A("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), M(e.display.dragCursor, n)
                                }
                            }(e, t), we(t))
                        },
                        start: function(t) {
                            return function(e, t) {
                                if (a && (!e.state.draggingText || +new Date - zo < 100)) we(t);
                                else if (!me(e, t) && !kr(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !f)) {
                                    var r = A("img", null, null, "position: fixed; left: 0; top: 0;");
                                    r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", d && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), d && r.parentNode.removeChild(r)
                                }
                            }(e, t)
                        },
                        drop: ei(e, No),
                        leave: function(t) {
                            me(e, t) || Oo(e)
                        }
                    };
                    var s = t.input.getField();
                    de(s, "keyup", (function(t) {
                        return da.call(e, t)
                    })), de(s, "keydown", ei(e, ua)), de(s, "keypress", ei(e, fa)), de(s, "focus", (function(t) {
                        return Cn(e, t)
                    })), de(s, "blur", (function(t) {
                        return Sn(e, t)
                    }))
                }(this), Io(), Gn(this), this.curOp.forceUpdate = !0, Fi(this, n), t.autofocus && !v || this.hasFocus() ? setTimeout(q(Cn, this), 20) : Sn(this), Ca) Ca.hasOwnProperty(c) && Ca[c](this, t[c], wa);
        fi(this), t.finishInit && t.finishInit(this);
        for (var u = 0; u < Ma.length; ++u) Ma[u](this);
        Vn(this), s && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto")
    }
    La.defaults = _a, La.optionHandlers = Ca;
    var Ma = [];

    function Aa(e, t, r, n) {
        var i, o = e.doc;
        null == r && (r = "add"), "smart" == r && (o.mode.indent ? i = pt(e, t).state : r = "prev");
        var a = e.options.tabSize,
            l = Ge(o, t),
            s = P(l.text, null, a);
        l.stateAfter && (l.stateAfter = null);
        var c, u = l.text.match(/^\s*/)[0];
        if (n || /\S/.test(l.text)) {
            if ("smart" == r && ((c = o.mode.indent(i, l.text.slice(u.length), l.text)) == W || c > 150)) {
                if (!n) return;
                r = "prev"
            }
        } else c = 0, r = "not";
        "prev" == r ? c = t > o.first ? P(Ge(o, t - 1).text, null, a) : 0 : "add" == r ? c = s + e.options.indentUnit : "subtract" == r ? c = s - e.options.indentUnit : "number" == typeof r && (c = s + r), c = Math.max(0, c);
        var d = "",
            f = 0;
        if (e.options.indentWithTabs)
            for (var p = Math.floor(c / a); p; --p) f += a, d += "\t";
        if (f < c && (d += V(c - f)), d != u) return mo(o, d, et(t, 0), et(t, u.length), "+input"), l.stateAfter = null, !0;
        for (var h = 0; h < o.sel.ranges.length; h++) {
            var m = o.sel.ranges[h];
            if (m.head.line == t && m.head.ch < u.length) {
                var g = et(t, u.length);
                Xi(o, h, new _i(g, g));
                break
            }
        }
    }
    La.defineInitHook = function(e) {
        return Ma.push(e)
    };
    var Ea = null;

    function Da(e) {
        Ea = e
    }

    function za(e, t, r, n, i) {
        var o = e.doc;
        e.display.shift = !1, n || (n = o.sel);
        var a = +new Date - 200,
            l = "paste" == i || e.state.pasteIncoming > a,
            s = De(t),
            c = null;
        if (l && n.ranges.length > 1)
            if (Ea && Ea.text.join("\n") == t) {
                if (n.ranges.length % Ea.text.length == 0) {
                    c = [];
                    for (var u = 0; u < Ea.text.length; u++) c.push(o.splitLines(Ea.text[u]))
                }
            } else s.length == n.ranges.length && e.options.pasteLinesPerSelection && (c = Z(s, (function(e) {
                return [e]
            })));
        for (var d = e.curOp.updateInput, f = n.ranges.length - 1; f >= 0; f--) {
            var p = n.ranges[f],
                h = p.from(),
                m = p.to();
            p.empty() && (r && r > 0 ? h = et(h.line, h.ch - r) : e.state.overwrite && !l ? m = et(m.line, Math.min(Ge(o, m.line).text.length, m.ch + K(s).length)) : l && Ea && Ea.lineWise && Ea.text.join("\n") == t && (h = m = et(h.line, 0)));
            var g = {
                from: h,
                to: m,
                text: c ? c[f % c.length] : s,
                origin: i || (l ? "paste" : e.state.cutIncoming > a ? "cut" : "+input")
            };
            co(e.doc, g), lr(e, "inputRead", e, g)
        }
        t && !l && Oa(e, t), Dn(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = d), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1
    }

    function Na(e, t) {
        var r = e.clipboardData && e.clipboardData.getData("Text");
        if (r) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || Jn(t, (function() {
            return za(t, r, 0, null, "paste")
        })), !0
    }

    function Oa(e, t) {
        if (e.options.electricChars && e.options.smartIndent)
            for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
                var i = r.ranges[n];
                if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
                    var o = e.getModeAt(i.head),
                        a = !1;
                    if (o.electricChars) {
                        for (var l = 0; l < o.electricChars.length; l++)
                            if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                                a = Aa(e, i.head.line, "smart");
                                break
                            }
                    } else o.electricInput && o.electricInput.test(Ge(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = Aa(e, i.head.line, "smart"));
                    a && lr(e, "electricInput", e, i.head.line)
                }
            }
    }

    function Fa(e) {
        for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
            var i = e.doc.sel.ranges[n].head.line,
                o = {
                    anchor: et(i, 0),
                    head: et(i + 1, 0)
                };
            r.push(o), t.push(e.getRange(o.anchor, o.head))
        }
        return {
            text: t,
            ranges: r
        }
    }

    function qa(e, t, r, n) {
        e.setAttribute("autocorrect", r ? "" : "off"), e.setAttribute("autocapitalize", n ? "" : "off"), e.setAttribute("spellcheck", !!t)
    }

    function Ia() {
        var e = A("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            t = A("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return s ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), m && (e.style.border = "1px solid black"), qa(e), t
    }

    function Pa(e, t, r, n, i) {
        var o = t,
            a = r,
            l = Ge(e, t.line);

        function s(n) {
            var o, a;
            if (null == (o = i ? function(e, t, r, n) {
                    var i = ce(t, e.doc.direction);
                    if (!i) return Jo(t, r, n);
                    r.ch >= t.text.length ? (r.ch = t.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");
                    var o = le(i, r.ch, r.sticky),
                        a = i[o];
                    if ("ltr" == e.doc.direction && a.level % 2 == 0 && (n > 0 ? a.to > r.ch : a.from < r.ch)) return Jo(t, r, n);
                    var l, s = function(e, r) {
                            return Qo(t, e instanceof et ? e.ch : e, r)
                        },
                        c = function(r) {
                            return e.options.lineWrapping ? (l = l || Dr(e, t), Yr(e, t, l, r)) : {
                                begin: 0,
                                end: t.text.length
                            }
                        },
                        u = c("before" == r.sticky ? s(r, -1) : r.ch);
                    if ("rtl" == e.doc.direction || 1 == a.level) {
                        var d = 1 == a.level == n < 0,
                            f = s(r, d ? 1 : -1);
                        if (null != f && (d ? f <= a.to && f <= u.end : f >= a.from && f >= u.begin)) {
                            var p = d ? "before" : "after";
                            return new et(r.line, f, p)
                        }
                    }
                    var h = function(e, t, n) {
                            for (var o = function(e, t) {
                                    return t ? new et(r.line, s(e, 1), "before") : new et(r.line, e, "after")
                                }; e >= 0 && e < i.length; e += t) {
                                var a = i[e],
                                    l = t > 0 == (1 != a.level),
                                    c = l ? n.begin : s(n.end, -1);
                                if (a.from <= c && c < a.to) return o(c, l);
                                if (c = l ? a.from : s(a.to, -1), n.begin <= c && c < n.end) return o(c, l)
                            }
                        },
                        m = h(o + n, n, u);
                    if (m) return m;
                    var g = n > 0 ? u.end : s(u.begin, -1);
                    return null == g || n > 0 && g == t.text.length || !(m = h(n > 0 ? 0 : i.length - 1, n, c(g))) ? null : m
                }(e.cm, l, t, r) : Jo(l, t, r))) {
                if (n || (a = t.line + r) < e.first || a >= e.first + e.size || (t = new et(a, t.ch, t.sticky), !(l = Ge(e, a)))) return !1;
                t = ea(i, e.cm, l, t.line, r)
            } else t = o;
            return !0
        }
        if ("char" == n) s();
        else if ("column" == n) s(!0);
        else if ("word" == n || "group" == n)
            for (var c = null, u = "group" == n, d = e.cm && e.cm.getHelper(t, "wordChars"), f = !0; !(r < 0) || s(!f); f = !1) {
                var p = l.text.charAt(t.ch) || "\n",
                    h = ee(p, d) ? "w" : u && "\n" == p ? "n" : !u || /\s/.test(p) ? null : "p";
                if (!u || f || h || (h = "s"), c && c != h) {
                    r < 0 && (r = 1, s(), t.sticky = "after");
                    break
                }
                if (h && (c = h), r > 0 && !s(!f)) break
            }
        var m = oo(e, t, o, a, !0);
        return rt(o, m) && (m.hitSide = !0), m
    }

    function Ra(e, t, r, n) {
        var i, o, a = e.doc,
            l = t.left;
        if ("page" == n) {
            var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                c = Math.max(s - .5 * rn(e.display), 3);
            i = (r > 0 ? t.bottom : t.top) + r * c
        } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
        for (;
            (o = Zr(e, l, i)).outside;) {
            if (r < 0 ? i <= 0 : i >= a.height) {
                o.hitSide = !0;
                break
            }
            i += 5 * r
        }
        return o
    }
    var $a = function(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new R, this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null
    };

    function Wa(e, t) {
        var r = Er(e, t.line);
        if (!r || r.hidden) return null;
        var n = Ge(e.doc, t.line),
            i = Mr(r, n, t.line),
            o = ce(n, e.doc.direction),
            a = "left";
        o && (a = le(o, t.ch) % 2 ? "right" : "left");
        var l = Fr(i.map, t.ch, a);
        return l.offset = "right" == l.collapse ? l.end : l.start, l
    }

    function Ba(e, t) {
        return t && (e.bad = !0), e
    }

    function Ha(e, t, r) {
        var n;
        if (t == e.display.lineDiv) {
            if (!(n = e.display.lineDiv.childNodes[r])) return Ba(e.clipPos(et(e.display.viewTo - 1)), !0);
            t = null, r = 0
        } else
            for (n = t;; n = n.parentNode) {
                if (!n || n == e.display.lineDiv) return null;
                if (n.parentNode && n.parentNode == e.display.lineDiv) break
            }
        for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == n) return ja(o, t, r)
        }
    }

    function ja(e, t, r) {
        var n = e.text.firstChild,
            i = !1;
        if (!t || !D(n, t)) return Ba(et(Xe(e.line), 0), !0);
        if (t == n && (i = !0, t = n.childNodes[r], r = 0, !t)) {
            var o = e.rest ? K(e.rest) : e.line;
            return Ba(et(Xe(o), o.text.length), i)
        }
        var a = 3 == t.nodeType ? t : null,
            l = t;
        for (a || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (a = t.firstChild, r && (r = a.nodeValue.length)); l.parentNode != n;) l = l.parentNode;
        var s = e.measure,
            c = s.maps;

        function u(t, r, n) {
            for (var i = -1; i < (c ? c.length : 0); i++)
                for (var o = i < 0 ? s.map : c[i], a = 0; a < o.length; a += 3) {
                    var l = o[a + 2];
                    if (l == t || l == r) {
                        var u = Xe(i < 0 ? e.line : e.rest[i]),
                            d = o[a] + n;
                        return (n < 0 || l != t) && (d = o[a + (n ? 1 : 0)]), et(u, d)
                    }
                }
        }
        var d = u(a, l, r);
        if (d) return Ba(d, i);
        for (var f = l.nextSibling, p = a ? a.nodeValue.length - r : 0; f; f = f.nextSibling) {
            if (d = u(f, f.firstChild, 0)) return Ba(et(d.line, d.ch - p), i);
            p += f.textContent.length
        }
        for (var h = l.previousSibling, m = r; h; h = h.previousSibling) {
            if (d = u(h, h.firstChild, -1)) return Ba(et(d.line, d.ch + m), i);
            m += h.textContent.length
        }
    }
    $a.prototype.init = function(e) {
        var t = this,
            r = this,
            n = r.cm,
            i = r.div = e.lineDiv;

        function o(e) {
            if (!me(n, e)) {
                if (n.somethingSelected()) Da({
                    lineWise: !1,
                    text: n.getSelections()
                }), "cut" == e.type && n.replaceSelection("", null, "cut");
                else {
                    if (!n.options.lineWiseCopyCut) return;
                    var t = Fa(n);
                    Da({
                        lineWise: !0,
                        text: t.text
                    }), "cut" == e.type && n.operation((function() {
                        n.setSelections(t.ranges, 0, B), n.replaceSelection("", null, "cut")
                    }))
                }
                if (e.clipboardData) {
                    e.clipboardData.clearData();
                    var o = Ea.text.join("\n");
                    if (e.clipboardData.setData("Text", o), e.clipboardData.getData("Text") == o) return void e.preventDefault()
                }
                var a = Ia(),
                    l = a.firstChild;
                n.display.lineSpace.insertBefore(a, n.display.lineSpace.firstChild), l.value = Ea.text.join("\n");
                var s = document.activeElement;
                F(l), setTimeout((function() {
                    n.display.lineSpace.removeChild(a), s.focus(), s == i && r.showPrimarySelection()
                }), 50)
            }
        }
        qa(i, n.options.spellcheck, n.options.autocorrect, n.options.autocapitalize), de(i, "paste", (function(e) {
            me(n, e) || Na(e, n) || l <= 11 && setTimeout(ei(n, (function() {
                return t.updateFromDOM()
            })), 20)
        })), de(i, "compositionstart", (function(e) {
            t.composing = {
                data: e.data,
                done: !1
            }
        })), de(i, "compositionupdate", (function(e) {
            t.composing || (t.composing = {
                data: e.data,
                done: !1
            })
        })), de(i, "compositionend", (function(e) {
            t.composing && (e.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0)
        })), de(i, "touchstart", (function() {
            return r.forceCompositionEnd()
        })), de(i, "input", (function() {
            t.composing || t.readFromDOMSoon()
        })), de(i, "copy", o), de(i, "cut", o)
    }, $a.prototype.prepareSelection = function() {
        var e = vn(this.cm, !1);
        return e.focus = this.cm.state.focused, e
    }, $a.prototype.showSelection = function(e, t) {
        e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
    }, $a.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection()
    }, $a.prototype.showPrimarySelection = function() {
        var e = this.getSelection(),
            t = this.cm,
            n = t.doc.sel.primary(),
            i = n.from(),
            o = n.to();
        if (t.display.viewTo == t.display.viewFrom || i.line >= t.display.viewTo || o.line < t.display.viewFrom) e.removeAllRanges();
        else {
            var a = Ha(t, e.anchorNode, e.anchorOffset),
                l = Ha(t, e.focusNode, e.focusOffset);
            if (!a || a.bad || !l || l.bad || 0 != tt(ot(a, l), i) || 0 != tt(it(a, l), o)) {
                var s = t.display.view,
                    c = i.line >= t.display.viewFrom && Wa(t, i) || {
                        node: s[0].measure.map[2],
                        offset: 0
                    },
                    u = o.line < t.display.viewTo && Wa(t, o);
                if (!u) {
                    var d = s[s.length - 1].measure,
                        f = d.maps ? d.maps[d.maps.length - 1] : d.map;
                    u = {
                        node: f[f.length - 1],
                        offset: f[f.length - 2] - f[f.length - 3]
                    }
                }
                if (c && u) {
                    var p, h = e.rangeCount && e.getRangeAt(0);
                    try {
                        p = S(c.node, c.offset, u.offset, u.node)
                    } catch (e) {}
                    p && (!r && t.state.focused ? (e.collapse(c.node, c.offset), p.collapsed || (e.removeAllRanges(), e.addRange(p))) : (e.removeAllRanges(), e.addRange(p)), h && null == e.anchorNode ? e.addRange(h) : r && this.startGracePeriod()), this.rememberSelection()
                } else e.removeAllRanges()
            }
        }
    }, $a.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout((function() {
            e.gracePeriod = !1, e.selectionChanged() && e.cm.operation((function() {
                return e.cm.curOp.selectionChanged = !0
            }))
        }), 20)
    }, $a.prototype.showMultipleSelections = function(e) {
        M(this.cm.display.cursorDiv, e.cursors), M(this.cm.display.selectionDiv, e.selection)
    }, $a.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
    }, $a.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount) return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return D(this.div, t)
    }, $a.prototype.focus = function() {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0), this.div.focus())
    }, $a.prototype.blur = function() {
        this.div.blur()
    }, $a.prototype.getField = function() {
        return this.div
    }, $a.prototype.supportsTouch = function() {
        return !0
    }, $a.prototype.receivedFocus = function() {
        var e = this;
        this.selectionInEditor() ? this.pollSelection() : Jn(this.cm, (function() {
            return e.cm.curOp.selectionChanged = !0
        })), this.polling.set(this.cm.options.pollInterval, (function t() {
            e.cm.state.focused && (e.pollSelection(), e.polling.set(e.cm.options.pollInterval, t))
        }))
    }, $a.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
    }, $a.prototype.pollSelection = function() {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
            var e = this.getSelection(),
                t = this.cm;
            if (g && u && this.cm.display.gutterSpecs.length && function(e) {
                    for (var t = e; t; t = t.parentNode)
                        if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
                    return !1
                }(e.anchorNode)) return this.cm.triggerOnKeyDown({
                type: "keydown",
                keyCode: 8,
                preventDefault: Math.abs
            }), this.blur(), void this.focus();
            if (!this.composing) {
                this.rememberSelection();
                var r = Ha(t, e.anchorNode, e.anchorOffset),
                    n = Ha(t, e.focusNode, e.focusOffset);
                r && n && Jn(t, (function() {
                    Ji(t.doc, Si(r, n), B), (r.bad || n.bad) && (t.curOp.selectionChanged = !0)
                }))
            }
        }
    }, $a.prototype.pollContent = function() {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e, t, r, n = this.cm,
            i = n.display,
            o = n.doc.sel.primary(),
            a = o.from(),
            l = o.to();
        if (0 == a.ch && a.line > n.firstLine() && (a = et(a.line - 1, Ge(n.doc, a.line - 1).length)), l.ch == Ge(n.doc, l.line).text.length && l.line < n.lastLine() && (l = et(l.line + 1, 0)), a.line < i.viewFrom || l.line > i.viewTo - 1) return !1;
        a.line == i.viewFrom || 0 == (e = un(n, a.line)) ? (t = Xe(i.view[0].line), r = i.view[0].node) : (t = Xe(i.view[e].line), r = i.view[e - 1].node.nextSibling);
        var s, c, u = un(n, l.line);
        if (u == i.view.length - 1 ? (s = i.viewTo - 1, c = i.lineDiv.lastChild) : (s = Xe(i.view[u + 1].line) - 1, c = i.view[u + 1].node.previousSibling), !r) return !1;
        for (var d = n.doc.splitLines(function(e, t, r, n, i) {
                var o = "",
                    a = !1,
                    l = e.doc.lineSeparator(),
                    s = !1;

                function c() {
                    a && (o += l, s && (o += l), a = s = !1)
                }

                function u(e) {
                    e && (c(), o += e)
                }

                function d(t) {
                    if (1 == t.nodeType) {
                        var r = t.getAttribute("cm-text");
                        if (r) return void u(r);
                        var o, f = t.getAttribute("cm-marker");
                        if (f) {
                            var p = e.findMarks(et(n, 0), et(i + 1, 0), (g = +f, function(e) {
                                return e.id == g
                            }));
                            return void(p.length && (o = p[0].find(0)) && u(Ve(e.doc, o.from, o.to).join(l)))
                        }
                        if ("false" == t.getAttribute("contenteditable")) return;
                        var h = /^(pre|div|p|li|table|br)$/i.test(t.nodeName);
                        if (!/^br$/i.test(t.nodeName) && 0 == t.textContent.length) return;
                        h && c();
                        for (var m = 0; m < t.childNodes.length; m++) d(t.childNodes[m]);
                        /^(pre|p)$/i.test(t.nodeName) && (s = !0), h && (a = !0)
                    } else 3 == t.nodeType && u(t.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
                    var g
                }
                for (; d(t), t != r;) t = t.nextSibling, s = !1;
                return o
            }(n, r, c, t, s)), f = Ve(n.doc, et(t, 0), et(s, Ge(n.doc, s).text.length)); d.length > 1 && f.length > 1;)
            if (K(d) == K(f)) d.pop(), f.pop(), s--;
            else {
                if (d[0] != f[0]) break;
                d.shift(), f.shift(), t++
            } for (var p = 0, h = 0, m = d[0], g = f[0], v = Math.min(m.length, g.length); p < v && m.charCodeAt(p) == g.charCodeAt(p);) ++p;
        for (var y = K(d), b = K(f), x = Math.min(y.length - (1 == d.length ? p : 0), b.length - (1 == f.length ? p : 0)); h < x && y.charCodeAt(y.length - h - 1) == b.charCodeAt(b.length - h - 1);) ++h;
        if (1 == d.length && 1 == f.length && t == a.line)
            for (; p && p > a.ch && y.charCodeAt(y.length - h - 1) == b.charCodeAt(b.length - h - 1);) p--, h++;
        d[d.length - 1] = y.slice(0, y.length - h).replace(/^\u200b+/, ""), d[0] = d[0].slice(p).replace(/\u200b+$/, "");
        var k = et(t, p),
            w = et(s, f.length ? K(f).length - h : 0);
        return d.length > 1 || d[0] || tt(k, w) ? (mo(n.doc, d, k, w, "+input"), !0) : void 0
    }, $a.prototype.ensurePolled = function() {
        this.forceCompositionEnd()
    }, $a.prototype.reset = function() {
        this.forceCompositionEnd()
    }, $a.prototype.forceCompositionEnd = function() {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus())
    }, $a.prototype.readFromDOMSoon = function() {
        var e = this;
        null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout((function() {
            if (e.readDOMTimeout = null, e.composing) {
                if (!e.composing.done) return;
                e.composing = null
            }
            e.updateFromDOM()
        }), 80))
    }, $a.prototype.updateFromDOM = function() {
        var e = this;
        !this.cm.isReadOnly() && this.pollContent() || Jn(this.cm, (function() {
            return dn(e.cm)
        }))
    }, $a.prototype.setUneditable = function(e) {
        e.contentEditable = "false"
    }, $a.prototype.onKeyPress = function(e) {
        0 == e.charCode || this.composing || (e.preventDefault(), this.cm.isReadOnly() || ei(this.cm, za)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
    }, $a.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String("nocursor" != e)
    }, $a.prototype.onContextMenu = function() {}, $a.prototype.resetPosition = function() {}, $a.prototype.needsContentAttribute = !0;
    var Ua = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new R, this.hasSelection = !1, this.composing = null
    };
    Ua.prototype.init = function(e) {
            var t = this,
                r = this,
                n = this.cm;
            this.createField(e);
            var i = this.textarea;

            function o(e) {
                if (!me(n, e)) {
                    if (n.somethingSelected()) Da({
                        lineWise: !1,
                        text: n.getSelections()
                    });
                    else {
                        if (!n.options.lineWiseCopyCut) return;
                        var t = Fa(n);
                        Da({
                            lineWise: !0,
                            text: t.text
                        }), "cut" == e.type ? n.setSelections(t.ranges, null, B) : (r.prevInput = "", i.value = t.text.join("\n"), F(i))
                    }
                    "cut" == e.type && (n.state.cutIncoming = +new Date)
                }
            }
            e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), m && (i.style.width = "0px"), de(i, "input", (function() {
                a && l >= 9 && t.hasSelection && (t.hasSelection = null), r.poll()
            })), de(i, "paste", (function(e) {
                me(n, e) || Na(e, n) || (n.state.pasteIncoming = +new Date, r.fastPoll())
            })), de(i, "cut", o), de(i, "copy", o), de(e.scroller, "paste", (function(t) {
                if (!kr(e, t) && !me(n, t)) {
                    if (!i.dispatchEvent) return n.state.pasteIncoming = +new Date, void r.focus();
                    var o = new Event("paste");
                    o.clipboardData = t.clipboardData, i.dispatchEvent(o)
                }
            })), de(e.lineSpace, "selectstart", (function(t) {
                kr(e, t) || be(t)
            })), de(i, "compositionstart", (function() {
                var e = n.getCursor("from");
                r.composing && r.composing.range.clear(), r.composing = {
                    start: e,
                    range: n.markText(e, n.getCursor("to"), {
                        className: "CodeMirror-composing"
                    })
                }
            })), de(i, "compositionend", (function() {
                r.composing && (r.poll(), r.composing.range.clear(), r.composing = null)
            }))
        }, Ua.prototype.createField = function(e) {
            this.wrapper = Ia(), this.textarea = this.wrapper.firstChild
        }, Ua.prototype.prepareSelection = function() {
            var e = this.cm,
                t = e.display,
                r = e.doc,
                n = vn(e);
            if (e.options.moveInputWithCursor) {
                var i = Gr(e, r.sel.primary().head, "div"),
                    o = t.wrapper.getBoundingClientRect(),
                    a = t.lineDiv.getBoundingClientRect();
                n.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), n.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left))
            }
            return n
        }, Ua.prototype.showSelection = function(e) {
            var t = this.cm.display;
            M(t.cursorDiv, e.cursors), M(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
        }, Ua.prototype.reset = function(e) {
            if (!this.contextMenuPending && !this.composing) {
                var t = this.cm;
                if (t.somethingSelected()) {
                    this.prevInput = "";
                    var r = t.getSelection();
                    this.textarea.value = r, t.state.focused && F(this.textarea), a && l >= 9 && (this.hasSelection = r)
                } else e || (this.prevInput = this.textarea.value = "", a && l >= 9 && (this.hasSelection = null))
            }
        }, Ua.prototype.getField = function() {
            return this.textarea
        }, Ua.prototype.supportsTouch = function() {
            return !1
        }, Ua.prototype.focus = function() {
            if ("nocursor" != this.cm.options.readOnly && (!v || z() != this.textarea)) try {
                this.textarea.focus()
            } catch (e) {}
        }, Ua.prototype.blur = function() {
            this.textarea.blur()
        }, Ua.prototype.resetPosition = function() {
            this.wrapper.style.top = this.wrapper.style.left = 0
        }, Ua.prototype.receivedFocus = function() {
            this.slowPoll()
        }, Ua.prototype.slowPoll = function() {
            var e = this;
            this.pollingFast || this.polling.set(this.cm.options.pollInterval, (function() {
                e.poll(), e.cm.state.focused && e.slowPoll()
            }))
        }, Ua.prototype.fastPoll = function() {
            var e = !1,
                t = this;
            t.pollingFast = !0, t.polling.set(20, (function r() {
                t.poll() || e ? (t.pollingFast = !1, t.slowPoll()) : (e = !0, t.polling.set(60, r))
            }))
        }, Ua.prototype.poll = function() {
            var e = this,
                t = this.cm,
                r = this.textarea,
                n = this.prevInput;
            if (this.contextMenuPending || !t.state.focused || ze(r) && !n && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
            var i = r.value;
            if (i == n && !t.somethingSelected()) return !1;
            if (a && l >= 9 && this.hasSelection === i || y && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;
            if (t.doc.sel == t.display.selForContextMenu) {
                var o = i.charCodeAt(0);
                if (8203 != o || n || (n = "​"), 8666 == o) return this.reset(), this.cm.execCommand("undo")
            }
            for (var s = 0, c = Math.min(n.length, i.length); s < c && n.charCodeAt(s) == i.charCodeAt(s);) ++s;
            return Jn(t, (function() {
                za(t, i.slice(s), n.length - s, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? r.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                    className: "CodeMirror-composing"
                }))
            })), !0
        }, Ua.prototype.ensurePolled = function() {
            this.pollingFast && this.poll() && (this.pollingFast = !1)
        }, Ua.prototype.onKeyPress = function() {
            a && l >= 9 && (this.hasSelection = null), this.fastPoll()
        }, Ua.prototype.onContextMenu = function(e) {
            var t = this,
                r = t.cm,
                n = r.display,
                i = t.textarea;
            t.contextMenuPending && t.contextMenuPending();
            var o = cn(r, e),
                c = n.scroller.scrollTop;
            if (o && !d) {
                r.options.resetSelectionOnContextMenu && -1 == r.doc.sel.contains(o) && ei(r, Ji)(r.doc, Si(o), B);
                var u, f = i.style.cssText,
                    p = t.wrapper.style.cssText,
                    h = t.wrapper.offsetParent.getBoundingClientRect();
                if (t.wrapper.style.cssText = "position: static", i.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - h.top - 5) + "px; left: " + (e.clientX - h.left - 5) + "px;\n      z-index: 1000; background: " + (a ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", s && (u = window.scrollY), n.input.focus(), s && window.scrollTo(null, u), n.input.reset(), r.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = v, n.selForContextMenu = r.doc.sel, clearTimeout(n.detectingSelectAll), a && l >= 9 && g(), _) {
                    we(e);
                    var m = function() {
                        pe(window, "mouseup", m), setTimeout(v, 20)
                    };
                    de(window, "mouseup", m)
                } else setTimeout(v, 50)
            }

            function g() {
                if (null != i.selectionStart) {
                    var e = r.somethingSelected(),
                        o = "​" + (e ? i.value : "");
                    i.value = "⇚", i.value = o, t.prevInput = e ? "" : "​", i.selectionStart = 1, i.selectionEnd = o.length, n.selForContextMenu = r.doc.sel
                }
            }

            function v() {
                if (t.contextMenuPending == v && (t.contextMenuPending = !1, t.wrapper.style.cssText = p, i.style.cssText = f, a && l < 9 && n.scrollbars.setScrollTop(n.scroller.scrollTop = c), null != i.selectionStart)) {
                    (!a || a && l < 9) && g();
                    var e = 0,
                        o = function() {
                            n.selForContextMenu == r.doc.sel && 0 == i.selectionStart && i.selectionEnd > 0 && "​" == t.prevInput ? ei(r, lo)(r) : e++ < 10 ? n.detectingSelectAll = setTimeout(o, 500) : (n.selForContextMenu = null, n.input.reset())
                        };
                    n.detectingSelectAll = setTimeout(o, 200)
                }
            }
        }, Ua.prototype.readOnlyChanged = function(e) {
            e || this.reset(), this.textarea.disabled = "nocursor" == e
        }, Ua.prototype.setUneditable = function() {}, Ua.prototype.needsContentAttribute = !1,
        function(e) {
            var t = e.optionHandlers;

            function r(r, n, i, o) {
                e.defaults[r] = n, i && (t[r] = o ? function(e, t, r) {
                    r != wa && i(e, t, r)
                } : i)
            }
            e.defineOption = r, e.Init = wa, r("value", "", (function(e, t) {
                return e.setValue(t)
            }), !0), r("mode", null, (function(e, t) {
                e.doc.modeOption = t, Ei(e)
            }), !0), r("indentUnit", 2, Ei, !0), r("indentWithTabs", !1), r("smartIndent", !0), r("tabSize", 4, (function(e) {
                Di(e), Rr(e), dn(e)
            }), !0), r("lineSeparator", null, (function(e, t) {
                if (e.doc.lineSep = t, t) {
                    var r = [],
                        n = e.doc.first;
                    e.doc.iter((function(e) {
                        for (var i = 0;;) {
                            var o = e.text.indexOf(t, i);
                            if (-1 == o) break;
                            i = o + t.length, r.push(et(n, o))
                        }
                        n++
                    }));
                    for (var i = r.length - 1; i >= 0; i--) mo(e.doc, t, r[i], et(r[i].line, r[i].ch + t.length))
                }
            })), r("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, (function(e, t, r) {
                e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), r != wa && e.refresh()
            })), r("specialCharPlaceholder", Qt, (function(e) {
                return e.refresh()
            }), !0), r("electricChars", !0), r("inputStyle", v ? "contenteditable" : "textarea", (function() {
                throw new Error("inputStyle can not (yet) be changed in a running editor")
            }), !0), r("spellcheck", !1, (function(e, t) {
                return e.getInputField().spellcheck = t
            }), !0), r("autocorrect", !1, (function(e, t) {
                return e.getInputField().autocorrect = t
            }), !0), r("autocapitalize", !1, (function(e, t) {
                return e.getInputField().autocapitalize = t
            }), !0), r("rtlMoveVisually", !x), r("wholeLineUpdateBefore", !0), r("theme", "default", (function(e) {
                ka(e), mi(e)
            }), !0), r("keyMap", "default", (function(e, t, r) {
                var n = Xo(t),
                    i = r != wa && Xo(r);
                i && i.detach && i.detach(e, n), n.attach && n.attach(e, i || null)
            })), r("extraKeys", null), r("configureMouse", null), r("lineWrapping", !1, Ta, !0), r("gutters", [], (function(e, t) {
                e.display.gutterSpecs = pi(t, e.options.lineNumbers), mi(e)
            }), !0), r("fixedGutter", !0, (function(e, t) {
                e.display.gutters.style.left = t ? an(e.display) + "px" : "0", e.refresh()
            }), !0), r("coverGutterNextToScrollbar", !1, (function(e) {
                return Wn(e)
            }), !0), r("scrollbarStyle", "native", (function(e) {
                jn(e), Wn(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
            }), !0), r("lineNumbers", !1, (function(e, t) {
                e.display.gutterSpecs = pi(e.options.gutters, t), mi(e)
            }), !0), r("firstLineNumber", 1, mi, !0), r("lineNumberFormatter", (function(e) {
                return e
            }), mi, !0), r("showCursorWhenSelecting", !1, gn, !0), r("resetSelectionOnContextMenu", !0), r("lineWiseCopyCut", !0), r("pasteLinesPerSelection", !0), r("selectionsMayTouch", !1), r("readOnly", !1, (function(e, t) {
                "nocursor" == t && (Sn(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
            })), r("disableInput", !1, (function(e, t) {
                t || e.display.input.reset()
            }), !0), r("dragDrop", !0, Sa), r("allowDropFileTypes", null), r("cursorBlinkRate", 530), r("cursorScrollMargin", 0), r("cursorHeight", 1, gn, !0), r("singleCursorHeightPerLine", !0, gn, !0), r("workTime", 100), r("workDelay", 100), r("flattenSpans", !0, Di, !0), r("addModeClass", !1, Di, !0), r("pollInterval", 100), r("undoDepth", 200, (function(e, t) {
                return e.doc.history.undoDepth = t
            })), r("historyEventDelay", 1250), r("viewportMargin", 10, (function(e) {
                return e.refresh()
            }), !0), r("maxHighlightLength", 1e4, Di, !0), r("moveInputWithCursor", !0, (function(e, t) {
                t || e.display.input.resetPosition()
            })), r("tabindex", null, (function(e, t) {
                return e.display.input.getField().tabIndex = t || ""
            })), r("autofocus", null), r("direction", "ltr", (function(e, t) {
                return e.doc.setDirection(t)
            }), !0), r("phrases", null)
        }(La),
        function(e) {
            var t = e.optionHandlers,
                r = e.helpers = {};
            e.prototype = {
                constructor: e,
                focus: function() {
                    window.focus(), this.display.input.focus()
                },
                setOption: function(e, r) {
                    var n = this.options,
                        i = n[e];
                    n[e] == r && "mode" != e || (n[e] = r, t.hasOwnProperty(e) && ei(this, t[e])(this, r, i), he(this, "optionChange", this, e))
                },
                getOption: function(e) {
                    return this.options[e]
                },
                getDoc: function() {
                    return this.doc
                },
                addKeyMap: function(e, t) {
                    this.state.keyMaps[t ? "push" : "unshift"](Xo(e))
                },
                removeKeyMap: function(e) {
                    for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
                        if (t[r] == e || t[r].name == e) return t.splice(r, 1), !0
                },
                addOverlay: ti((function(t, r) {
                    var n = t.token ? t : e.getMode(this.options, t);
                    if (n.startState) throw new Error("Overlays may not be stateful.");
                    ! function(e, t, r) {
                        for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i;) n++;
                        e.splice(n, 0, t)
                    }(this.state.overlays, {
                        mode: n,
                        modeSpec: t,
                        opaque: r && r.opaque,
                        priority: r && r.priority || 0
                    }, (function(e) {
                        return e.priority
                    })), this.state.modeGen++, dn(this)
                })),
                removeOverlay: ti((function(e) {
                    for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
                        var n = t[r].modeSpec;
                        if (n == e || "string" == typeof e && n.name == e) return t.splice(r, 1), this.state.modeGen++, void dn(this)
                    }
                })),
                indentLine: ti((function(e, t, r) {
                    "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), Qe(this.doc, e) && Aa(this, e, t, r)
                })),
                indentSelection: ti((function(e) {
                    for (var t = this.doc.sel.ranges, r = -1, n = 0; n < t.length; n++) {
                        var i = t[n];
                        if (i.empty()) i.head.line > r && (Aa(this, i.head.line, e, !0), r = i.head.line, n == this.doc.sel.primIndex && Dn(this));
                        else {
                            var o = i.from(),
                                a = i.to(),
                                l = Math.max(r, o.line);
                            r = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
                            for (var s = l; s < r; ++s) Aa(this, s, e);
                            var c = this.doc.sel.ranges;
                            0 == o.ch && t.length == c.length && c[n].from().ch > 0 && Xi(this.doc, n, new _i(o, c[n].to()), B)
                        }
                    }
                })),
                getTokenAt: function(e, t) {
                    return yt(this, e, t)
                },
                getLineTokens: function(e, t) {
                    return yt(this, et(e), t, !0)
                },
                getTokenTypeAt: function(e) {
                    e = lt(this.doc, e);
                    var t, r = ft(this, Ge(this.doc, e.line)),
                        n = 0,
                        i = (r.length - 1) / 2,
                        o = e.ch;
                    if (0 == o) t = r[2];
                    else
                        for (;;) {
                            var a = n + i >> 1;
                            if ((a ? r[2 * a - 1] : 0) >= o) i = a;
                            else {
                                if (!(r[2 * a + 1] < o)) {
                                    t = r[2 * a + 2];
                                    break
                                }
                                n = a + 1
                            }
                        }
                    var l = t ? t.indexOf("overlay ") : -1;
                    return l < 0 ? t : 0 == l ? null : t.slice(0, l - 1)
                },
                getModeAt: function(t) {
                    var r = this.doc.mode;
                    return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r
                },
                getHelper: function(e, t) {
                    return this.getHelpers(e, t)[0]
                },
                getHelpers: function(e, t) {
                    var n = [];
                    if (!r.hasOwnProperty(t)) return n;
                    var i = r[t],
                        o = this.getModeAt(e);
                    if ("string" == typeof o[t]) i[o[t]] && n.push(i[o[t]]);
                    else if (o[t])
                        for (var a = 0; a < o[t].length; a++) {
                            var l = i[o[t][a]];
                            l && n.push(l)
                        } else o.helperType && i[o.helperType] ? n.push(i[o.helperType]) : i[o.name] && n.push(i[o.name]);
                    for (var s = 0; s < i._global.length; s++) {
                        var c = i._global[s];
                        c.pred(o, this) && -1 == $(n, c.val) && n.push(c.val)
                    }
                    return n
                },
                getStateAfter: function(e, t) {
                    var r = this.doc;
                    return pt(this, (e = at(r, null == e ? r.first + r.size - 1 : e)) + 1, t).state
                },
                cursorCoords: function(e, t) {
                    var r = this.doc.sel.primary();
                    return Gr(this, null == e ? r.head : "object" == typeof e ? lt(this.doc, e) : e ? r.from() : r.to(), t || "page")
                },
                charCoords: function(e, t) {
                    return Ur(this, lt(this.doc, e), t || "page")
                },
                coordsChar: function(e, t) {
                    return Zr(this, (e = jr(this, e, t || "page")).left, e.top)
                },
                lineAtHeight: function(e, t) {
                    return e = jr(this, {
                        top: e,
                        left: 0
                    }, t || "page").top, Ye(this.doc, e + this.display.viewOffset)
                },
                heightAtLine: function(e, t, r) {
                    var n, i = !1;
                    if ("number" == typeof e) {
                        var o = this.doc.first + this.doc.size - 1;
                        e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), n = Ge(this.doc, e)
                    } else n = e;
                    return Hr(this, n, {
                        top: 0,
                        left: 0
                    }, t || "page", r || i).top + (i ? this.doc.height - Ht(n) : 0)
                },
                defaultTextHeight: function() {
                    return rn(this.display)
                },
                defaultCharWidth: function() {
                    return nn(this.display)
                },
                getViewport: function() {
                    return {
                        from: this.display.viewFrom,
                        to: this.display.viewTo
                    }
                },
                addWidget: function(e, t, r, n, i) {
                    var o, a, l, s = this.display,
                        c = (e = Gr(this, lt(this.doc, e))).bottom,
                        u = e.left;
                    if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), s.sizer.appendChild(t), "over" == n) c = e.top;
                    else if ("above" == n || "near" == n) {
                        var d = Math.max(s.wrapper.clientHeight, this.doc.height),
                            f = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
                        ("above" == n || e.bottom + t.offsetHeight > d) && e.top > t.offsetHeight ? c = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= d && (c = e.bottom), u + t.offsetWidth > f && (u = f - t.offsetWidth)
                    }
                    t.style.top = c + "px", t.style.left = t.style.right = "", "right" == i ? (u = s.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? u = 0 : "middle" == i && (u = (s.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = u + "px"), r && (o = this, a = {
                        left: u,
                        top: c,
                        right: u + t.offsetWidth,
                        bottom: c + t.offsetHeight
                    }, null != (l = An(o, a)).scrollTop && Fn(o, l.scrollTop), null != l.scrollLeft && In(o, l.scrollLeft))
                },
                triggerOnKeyDown: ti(ua),
                triggerOnKeyPress: ti(fa),
                triggerOnKeyUp: da,
                triggerOnMouseDown: ti(ga),
                execCommand: function(e) {
                    if (ta.hasOwnProperty(e)) return ta[e].call(null, this)
                },
                triggerElectric: ti((function(e) {
                    Oa(this, e)
                })),
                findPosH: function(e, t, r, n) {
                    var i = 1;
                    t < 0 && (i = -1, t = -t);
                    for (var o = lt(this.doc, e), a = 0; a < t && !(o = Pa(this.doc, o, i, r, n)).hitSide; ++a);
                    return o
                },
                moveH: ti((function(e, t) {
                    var r = this;
                    this.extendSelectionsBy((function(n) {
                        return r.display.shift || r.doc.extend || n.empty() ? Pa(r.doc, n.head, e, t, r.options.rtlMoveVisually) : e < 0 ? n.from() : n.to()
                    }), j)
                })),
                deleteH: ti((function(e, t) {
                    var r = this.doc.sel,
                        n = this.doc;
                    r.somethingSelected() ? n.replaceSelection("", null, "+delete") : Yo(this, (function(r) {
                        var i = Pa(n, r.head, e, t, !1);
                        return e < 0 ? {
                            from: i,
                            to: r.head
                        } : {
                            from: r.head,
                            to: i
                        }
                    }))
                })),
                findPosV: function(e, t, r, n) {
                    var i = 1,
                        o = n;
                    t < 0 && (i = -1, t = -t);
                    for (var a = lt(this.doc, e), l = 0; l < t; ++l) {
                        var s = Gr(this, a, "div");
                        if (null == o ? o = s.left : s.left = o, (a = Ra(this, s, i, r)).hitSide) break
                    }
                    return a
                },
                moveV: ti((function(e, t) {
                    var r = this,
                        n = this.doc,
                        i = [],
                        o = !this.display.shift && !n.extend && n.sel.somethingSelected();
                    if (n.extendSelectionsBy((function(a) {
                            if (o) return e < 0 ? a.from() : a.to();
                            var l = Gr(r, a.head, "div");
                            null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left);
                            var s = Ra(r, l, e, t);
                            return "page" == t && a == n.sel.primary() && En(r, Ur(r, s, "div").top - l.top), s
                        }), j), i.length)
                        for (var a = 0; a < n.sel.ranges.length; a++) n.sel.ranges[a].goalColumn = i[a]
                })),
                findWordAt: function(e) {
                    var t = Ge(this.doc, e.line).text,
                        r = e.ch,
                        n = e.ch;
                    if (t) {
                        var i = this.getHelper(e, "wordChars");
                        "before" != e.sticky && n != t.length || !r ? ++n : --r;
                        for (var o = t.charAt(r), a = ee(o, i) ? function(e) {
                                return ee(e, i)
                            } : /\s/.test(o) ? function(e) {
                                return /\s/.test(e)
                            } : function(e) {
                                return !/\s/.test(e) && !ee(e)
                            }; r > 0 && a(t.charAt(r - 1));) --r;
                        for (; n < t.length && a(t.charAt(n));) ++n
                    }
                    return new _i(et(e.line, r), et(e.line, n))
                },
                toggleOverwrite: function(e) {
                    null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? N(this.display.cursorDiv, "CodeMirror-overwrite") : T(this.display.cursorDiv, "CodeMirror-overwrite"), he(this, "overwriteToggle", this, this.state.overwrite))
                },
                hasFocus: function() {
                    return this.display.input.getField() == z()
                },
                isReadOnly: function() {
                    return !(!this.options.readOnly && !this.doc.cantEdit)
                },
                scrollTo: ti((function(e, t) {
                    zn(this, e, t)
                })),
                getScrollInfo: function() {
                    var e = this.display.scroller;
                    return {
                        left: e.scrollLeft,
                        top: e.scrollTop,
                        height: e.scrollHeight - Sr(this) - this.display.barHeight,
                        width: e.scrollWidth - Sr(this) - this.display.barWidth,
                        clientHeight: Lr(this),
                        clientWidth: Tr(this)
                    }
                },
                scrollIntoView: ti((function(e, t) {
                    null == e ? (e = {
                        from: this.doc.sel.primary().head,
                        to: null
                    }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                        from: et(e, 0),
                        to: null
                    } : null == e.from && (e = {
                        from: e,
                        to: null
                    }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? function(e, t) {
                        Nn(e), e.curOp.scrollToPos = t
                    }(this, e) : On(this, e.from, e.to, e.margin)
                })),
                setSize: ti((function(e, t) {
                    var r = this,
                        n = function(e) {
                            return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                        };
                    null != e && (this.display.wrapper.style.width = n(e)), null != t && (this.display.wrapper.style.height = n(t)), this.options.lineWrapping && Pr(this);
                    var i = this.display.viewFrom;
                    this.doc.iter(i, this.display.viewTo, (function(e) {
                        if (e.widgets)
                            for (var t = 0; t < e.widgets.length; t++)
                                if (e.widgets[t].noHScroll) {
                                    fn(r, i, "widget");
                                    break
                                }++ i
                    })), this.curOp.forceUpdate = !0, he(this, "refresh", this)
                })),
                operation: function(e) {
                    return Jn(this, e)
                },
                startOperation: function() {
                    return Gn(this)
                },
                endOperation: function() {
                    return Vn(this)
                },
                refresh: ti((function() {
                    var e = this.display.cachedTextHeight;
                    dn(this), this.curOp.forceUpdate = !0, Rr(this), zn(this, this.doc.scrollLeft, this.doc.scrollTop), ci(this.display), (null == e || Math.abs(e - rn(this.display)) > .5) && sn(this), he(this, "refresh", this)
                })),
                swapDoc: ti((function(e) {
                    var t = this.doc;
                    return t.cm = null, this.state.selectingText && this.state.selectingText(), Fi(this, e), Rr(this), this.display.input.reset(), zn(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, lr(this, "swapDoc", this, t), t
                })),
                phrase: function(e) {
                    var t = this.options.phrases;
                    return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e
                },
                getInputField: function() {
                    return this.display.input.getField()
                },
                getWrapperElement: function() {
                    return this.display.wrapper
                },
                getScrollerElement: function() {
                    return this.display.scroller
                },
                getGutterElement: function() {
                    return this.display.gutters
                }
            }, ye(e), e.registerHelper = function(t, n, i) {
                r.hasOwnProperty(t) || (r[t] = e[t] = {
                    _global: []
                }), r[t][n] = i
            }, e.registerGlobalHelper = function(t, n, i, o) {
                e.registerHelper(t, n, o), r[t]._global.push({
                    pred: i,
                    val: o
                })
            }
        }(La);
    var Ga = "iter insert remove copy getEditor constructor".split(" ");
    for (var Va in Do.prototype) Do.prototype.hasOwnProperty(Va) && $(Ga, Va) < 0 && (La.prototype[Va] = function(e) {
        return function() {
            return e.apply(this.doc, arguments)
        }
    }(Do.prototype[Va]));
    return ye(Do), La.inputStyles = {
            textarea: Ua,
            contenteditable: $a
        }, La.defineMode = function(e) {
            La.defaults.mode || "null" == e || (La.defaults.mode = e), Ie.apply(this, arguments)
        }, La.defineMIME = function(e, t) {
            qe[e] = t
        }, La.defineMode("null", (function() {
            return {
                token: function(e) {
                    return e.skipToEnd()
                }
            }
        })), La.defineMIME("text/plain", "null"), La.defineExtension = function(e, t) {
            La.prototype[e] = t
        }, La.defineDocExtension = function(e, t) {
            Do.prototype[e] = t
        }, La.fromTextArea = function(e, t) {
            if ((t = t ? I(t) : {}).value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
                var r = z();
                t.autofocus = r == e || null != e.getAttribute("autofocus") && r == document.body
            }

            function n() {
                e.value = l.getValue()
            }
            var i;
            if (e.form && (de(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
                var o = e.form;
                i = o.submit;
                try {
                    var a = o.submit = function() {
                        n(), o.submit = i, o.submit(), o.submit = a
                    }
                } catch (e) {}
            }
            t.finishInit = function(r) {
                r.save = n, r.getTextArea = function() {
                    return e
                }, r.toTextArea = function() {
                    r.toTextArea = isNaN, n(), e.parentNode.removeChild(r.getWrapperElement()), e.style.display = "", e.form && (pe(e.form, "submit", n), t.leaveSubmitMethodAlone || "function" != typeof e.form.submit || (e.form.submit = i))
                }
            }, e.style.display = "none";
            var l = La((function(t) {
                return e.parentNode.insertBefore(t, e.nextSibling)
            }), t);
            return l
        },
        function(e) {
            e.off = pe, e.on = de, e.wheelEventPixels = xi, e.Doc = Do, e.splitLines = De, e.countColumn = P, e.findColumn = U, e.isWordChar = J, e.Pass = W, e.signal = he, e.Line = Gt, e.changeEnd = Ti, e.scrollbarModel = Hn, e.Pos = et, e.cmpPos = tt, e.modes = Fe, e.mimeModes = qe, e.resolveMode = Pe, e.getMode = Re, e.modeExtensions = $e, e.extendMode = We, e.copyState = Be, e.startState = je, e.innerMode = He, e.commands = ta, e.keyMap = Ho, e.keyName = Zo, e.isModifierKey = Vo, e.lookupKey = Go, e.normalizeKeyMap = Uo, e.StringStream = Ue, e.SharedTextMarker = Lo, e.TextMarker = So, e.LineWidget = wo, e.e_preventDefault = be, e.e_stopPropagation = xe, e.e_stop = we, e.addClass = N, e.contains = D, e.rmClass = T, e.keyNames = Ro
        }(La), La.version = "5.50.2", La
})),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).marked = t()
}(this, (function() {
    "use strict";

    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function t(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t
    }

    function r(e) {
        return c[e]
    }
    var n, i = (function(e) {
            function t() {
                return {
                    baseUrl: null,
                    breaks: !1,
                    gfm: !0,
                    headerIds: !0,
                    headerPrefix: "",
                    highlight: null,
                    langPrefix: "language-",
                    mangle: !0,
                    pedantic: !1,
                    renderer: null,
                    sanitize: !1,
                    sanitizer: null,
                    silent: !1,
                    smartLists: !1,
                    smartypants: !1,
                    xhtml: !1
                }
            }
            e.exports = {
                defaults: {
                    baseUrl: null,
                    breaks: !1,
                    gfm: !0,
                    headerIds: !0,
                    headerPrefix: "",
                    highlight: null,
                    langPrefix: "language-",
                    mangle: !0,
                    pedantic: !1,
                    renderer: null,
                    sanitize: !1,
                    sanitizer: null,
                    silent: !1,
                    smartLists: !1,
                    smartypants: !1,
                    xhtml: !1
                },
                getDefaults: t,
                changeDefaults: function(t) {
                    e.exports.defaults = t
                }
            }
        }(n = {
            exports: {}
        }), n.exports),
        o = (i.defaults, i.getDefaults, i.changeDefaults, /[&<>"']/),
        a = /[&<>"']/g,
        l = /[<>"']|&(?!#?\w+;)/,
        s = /[<>"']|&(?!#?\w+;)/g,
        c = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        },
        u = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

    function d(e) {
        return e.replace(u, (function(e, t) {
            return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
        }))
    }
    var f = /(^|[^\[])\^/g,
        p = /[^\w:]/g,
        h = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i,
        m = {},
        g = /^[^:]+:\/*[^/]*$/,
        v = /^([^:]+:)[\s\S]*$/,
        y = /^([^:]+:\/*[^/]*)[\s\S]*$/;

    function b(e, t, r) {
        var n = e.length;
        if (0 === n) return "";
        for (var i = 0; i < n;) {
            var o = e.charAt(n - i - 1);
            if (o !== t || r) {
                if (o === t || !r) break;
                i++
            } else i++
        }
        return e.substr(0, n - i)
    }
    var x = function(e, t) {
            if (t) {
                if (o.test(e)) return e.replace(a, r)
            } else if (l.test(e)) return e.replace(s, r);
            return e
        },
        k = d,
        w = function(e) {
            for (var t, r, n = 1; n < arguments.length; n++)
                for (r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        },
        _ = b,
        C = {
            exec: function() {}
        },
        S = function(e, t) {
            e = e.source || e, t = t || "";
            var r = {
                replace: function(t, n) {
                    return n = (n = n.source || n).replace(f, "$1"), e = e.replace(t, n), r
                },
                getRegex: function() {
                    return new RegExp(e, t)
                }
            };
            return r
        },
        T = w,
        L = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
            hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
            heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
            blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
            list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
            html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
            def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
            nptable: C,
            table: C,
            lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
            _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
            text: /^[^\n]+/,
            _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
            _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
        };
    L.def = S(L.def).replace("label", L._label).replace("title", L._title).getRegex(), L.bullet = /(?:[*+-]|\d{1,9}\.)/, L.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/, L.item = S(L.item, "gm").replace(/bull/g, L.bullet).getRegex(), L.list = S(L.list).replace(/bull/g, L.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + L.def.source + ")").getRegex(), L._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", L._comment = /<!--(?!-?>)[\s\S]*?-->/, L.html = S(L.html, "i").replace("comment", L._comment).replace("tag", L._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), L.paragraph = S(L._paragraph).replace("hr", L.hr).replace("heading", " {0,3}#{1,6} +").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", L._tag).getRegex(), L.blockquote = S(L.blockquote).replace("paragraph", L.paragraph).getRegex(), L.normal = T({}, L), L.gfm = T({}, L.normal, {
        nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
        table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
    }), L.pedantic = T({}, L.normal, {
        html: S("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", L._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
        fences: C,
        paragraph: S(L.normal._paragraph).replace("hr", L.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", L.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    });
    var M = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: C,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
        nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
        strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
        em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: C,
        text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,
        _punctuation: "!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~"
    };
    M.em = S(M.em).replace(/punctuation/g, M._punctuation).getRegex(), M._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, M._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, M._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, M.autolink = S(M.autolink).replace("scheme", M._scheme).replace("email", M._email).getRegex(), M._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, M.tag = S(M.tag).replace("comment", L._comment).replace("attribute", M._attribute).getRegex(), M._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, M._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/, M._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, M.link = S(M.link).replace("label", M._label).replace("href", M._href).replace("title", M._title).getRegex(), M.reflink = S(M.reflink).replace("label", M._label).getRegex(), M.normal = T({}, M), M.pedantic = T({}, M.normal, {
        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
        link: S(/^!?\[(label)\]\((.*?)\)/).replace("label", M._label).getRegex(),
        reflink: S(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", M._label).getRegex()
    }), M.gfm = T({}, M.normal, {
        escape: S(M.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
        del: /^~+(?=\S)([\s\S]*?\S)~+/,
        text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
    }), M.gfm.url = S(M.gfm.url, "i").replace("email", M.gfm._extended_email).getRegex(), M.breaks = T({}, M.gfm, {
        br: S(M.br).replace("{2,}", "*").getRegex(),
        text: S(M.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    });
    var A = {
            block: L,
            inline: M
        },
        E = i.defaults,
        D = A.block,
        z = _,
        N = function(e, t) {
            var r = e.replace(/\|/g, (function(e, t, r) {
                    for (var n = !1, i = t; 0 <= --i && "\\" === r[i];) n = !n;
                    return n ? "|" : " |"
                })).split(/ \|/),
                n = 0;
            if (r.length > t) r.splice(t);
            else
                for (; r.length < t;) r.push("");
            for (; n < r.length; n++) r[n] = r[n].trim().replace(/\\\|/g, "|");
            return r
        },
        O = x,
        F = function() {
            function e(e) {
                this.tokens = [], this.tokens.links = Object.create(null), this.options = e || E, this.rules = D.normal, this.options.pedantic ? this.rules = D.pedantic : this.options.gfm && (this.rules = D.gfm)
            }
            e.lex = function(t, r) {
                return new e(r).lex(t)
            };
            var r = e.prototype;
            return r.lex = function(e) {
                return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "), this.token(e, !0)
            }, r.token = function(e, t) {
                var r, n, i, o, a, l, s, c, u, d, f, p, h, m, g, v;
                for (e = e.replace(/^ +$/gm, ""); e;)
                    if ((i = this.rules.newline.exec(e)) && (e = e.substring(i[0].length), 1 < i[0].length && this.tokens.push({
                            type: "space"
                        })), i = this.rules.code.exec(e)) {
                        var y = this.tokens[this.tokens.length - 1];
                        e = e.substring(i[0].length), y && "paragraph" === y.type ? y.text += "\n" + i[0].trimRight() : (i = i[0].replace(/^ {4}/gm, ""), this.tokens.push({
                            type: "code",
                            codeBlockStyle: "indented",
                            text: this.options.pedantic ? i : z(i, "\n")
                        }))
                    } else if (i = this.rules.fences.exec(e)) e = e.substring(i[0].length), this.tokens.push({
                    type: "code",
                    lang: i[2] ? i[2].trim() : i[2],
                    text: i[3] || ""
                });
                else if (i = this.rules.heading.exec(e)) e = e.substring(i[0].length), this.tokens.push({
                    type: "heading",
                    depth: i[1].length,
                    text: i[2]
                });
                else if ((i = this.rules.nptable.exec(e)) && (l = {
                        type: "table",
                        header: N(i[1].replace(/^ *| *\| *$/g, "")),
                        align: i[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                        cells: i[3] ? i[3].replace(/\n$/, "").split("\n") : []
                    }).header.length === l.align.length) {
                    for (e = e.substring(i[0].length), f = 0; f < l.align.length; f++) /^ *-+: *$/.test(l.align[f]) ? l.align[f] = "right" : /^ *:-+: *$/.test(l.align[f]) ? l.align[f] = "center" : /^ *:-+ *$/.test(l.align[f]) ? l.align[f] = "left" : l.align[f] = null;
                    for (f = 0; f < l.cells.length; f++) l.cells[f] = N(l.cells[f], l.header.length);
                    this.tokens.push(l)
                } else if (i = this.rules.hr.exec(e)) e = e.substring(i[0].length), this.tokens.push({
                    type: "hr"
                });
                else if (i = this.rules.blockquote.exec(e)) e = e.substring(i[0].length), this.tokens.push({
                    type: "blockquote_start"
                }), i = i[0].replace(/^ *> ?/gm, ""), this.token(i, t), this.tokens.push({
                    type: "blockquote_end"
                });
                else if (i = this.rules.list.exec(e)) {
                    for (e = e.substring(i[0].length), s = {
                            type: "list_start",
                            ordered: m = 1 < (o = i[2]).length,
                            start: m ? +o : "",
                            loose: !1
                        }, this.tokens.push(s), r = !(c = []), h = (i = i[0].match(this.rules.item)).length, f = 0; f < h; f++) d = (l = i[f]).length, ~(l = l.replace(/^ *([*+-]|\d+\.) */, "")).indexOf("\n ") && (d -= l.length, l = this.options.pedantic ? l.replace(/^ {1,4}/gm, "") : l.replace(new RegExp("^ {1," + d + "}", "gm"), "")), f !== h - 1 && (a = D.bullet.exec(i[f + 1])[0], (1 < o.length ? 1 === a.length : 1 < a.length || this.options.smartLists && a !== o) && (e = i.slice(f + 1).join("\n") + e, f = h - 1)), n = r || /\n\n(?!\s*$)/.test(l), f !== h - 1 && (r = "\n" === l.charAt(l.length - 1), n = n || r), n && (s.loose = !0), v = void 0, (g = /^\[[ xX]\] /.test(l)) && (v = " " !== l[1], l = l.replace(/^\[[ xX]\] +/, "")), u = {
                        type: "list_item_start",
                        task: g,
                        checked: v,
                        loose: n
                    }, c.push(u), this.tokens.push(u), this.token(l, !1), this.tokens.push({
                        type: "list_item_end"
                    });
                    if (s.loose)
                        for (h = c.length, f = 0; f < h; f++) c[f].loose = !0;
                    this.tokens.push({
                        type: "list_end"
                    })
                } else if (i = this.rules.html.exec(e)) e = e.substring(i[0].length), this.tokens.push({
                    type: this.options.sanitize ? "paragraph" : "html",
                    pre: !this.options.sanitizer && ("pre" === i[1] || "script" === i[1] || "style" === i[1]),
                    text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(i[0]) : O(i[0]) : i[0]
                });
                else if (t && (i = this.rules.def.exec(e))) e = e.substring(i[0].length), i[3] && (i[3] = i[3].substring(1, i[3].length - 1)), p = i[1].toLowerCase().replace(/\s+/g, " "), this.tokens.links[p] || (this.tokens.links[p] = {
                    href: i[2],
                    title: i[3]
                });
                else if ((i = this.rules.table.exec(e)) && (l = {
                        type: "table",
                        header: N(i[1].replace(/^ *| *\| *$/g, "")),
                        align: i[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                        cells: i[3] ? i[3].replace(/\n$/, "").split("\n") : []
                    }).header.length === l.align.length) {
                    for (e = e.substring(i[0].length), f = 0; f < l.align.length; f++) /^ *-+: *$/.test(l.align[f]) ? l.align[f] = "right" : /^ *:-+: *$/.test(l.align[f]) ? l.align[f] = "center" : /^ *:-+ *$/.test(l.align[f]) ? l.align[f] = "left" : l.align[f] = null;
                    for (f = 0; f < l.cells.length; f++) l.cells[f] = N(l.cells[f].replace(/^ *\| *| *\| *$/g, ""), l.header.length);
                    this.tokens.push(l)
                } else if (i = this.rules.lheading.exec(e)) e = e.substring(i[0].length), this.tokens.push({
                    type: "heading",
                    depth: "=" === i[2].charAt(0) ? 1 : 2,
                    text: i[1]
                });
                else if (t && (i = this.rules.paragraph.exec(e))) e = e.substring(i[0].length), this.tokens.push({
                    type: "paragraph",
                    text: "\n" === i[1].charAt(i[1].length - 1) ? i[1].slice(0, -1) : i[1]
                });
                else if (i = this.rules.text.exec(e)) e = e.substring(i[0].length), this.tokens.push({
                    type: "text",
                    text: i[0]
                });
                else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
                return this.tokens
            }, t(e, null, [{
                key: "rules",
                get: function() {
                    return D
                }
            }]), e
        }(),
        q = i.defaults,
        I = function(e, t, r) {
            if (e) {
                var n;
                try {
                    n = decodeURIComponent(d(r)).replace(p, "").toLowerCase()
                } catch (e) {
                    return null
                }
                if (0 === n.indexOf("javascript:") || 0 === n.indexOf("vbscript:") || 0 === n.indexOf("data:")) return null
            }
            t && !h.test(r) && (r = function(e, t) {
                m[" " + e] || (g.test(e) ? m[" " + e] = e + "/" : m[" " + e] = b(e, "/", !0));
                var r = -1 === (e = m[" " + e]).indexOf(":");
                return "//" === t.substring(0, 2) ? r ? t : e.replace(v, "$1") + t : "/" === t.charAt(0) ? r ? t : e.replace(y, "$1") + t : e + t
            }(t, r));
            try {
                r = encodeURI(r).replace(/%25/g, "%")
            } catch (e) {
                return null
            }
            return r
        },
        P = x,
        R = function() {
            function e(e) {
                this.options = e || q
            }
            var t = e.prototype;
            return t.code = function(e, t, r) {
                var n = (t || "").match(/\S*/)[0];
                if (this.options.highlight) {
                    var i = this.options.highlight(e, n);
                    null != i && i !== e && (r = !0, e = i)
                }
                return n ? '<pre><code class="' + this.options.langPrefix + P(n, !0) + '">' + (r ? e : P(e, !0)) + "</code></pre>\n" : "<pre><code>" + (r ? e : P(e, !0)) + "</code></pre>"
            }, t.blockquote = function(e) {
                return "<blockquote>\n" + e + "</blockquote>\n"
            }, t.html = function(e) {
                return e
            }, t.heading = function(e, t, r, n) {
                return this.options.headerIds ? "<h" + t + ' id="' + this.options.headerPrefix + n.slug(r) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n"
            }, t.hr = function() {
                return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
            }, t.list = function(e, t, r) {
                var n = t ? "ol" : "ul";
                return "<" + n + (t && 1 !== r ? ' start="' + r + '"' : "") + ">\n" + e + "</" + n + ">\n"
            }, t.listitem = function(e) {
                return "<li>" + e + "</li>\n"
            }, t.checkbox = function(e) {
                return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
            }, t.paragraph = function(e) {
                return "<p>" + e + "</p>\n"
            }, t.table = function(e, t) {
                return "<table>\n<thead>\n" + e + "</thead>\n" + (t = t && "<tbody>" + t + "</tbody>") + "</table>\n"
            }, t.tablerow = function(e) {
                return "<tr>\n" + e + "</tr>\n"
            }, t.tablecell = function(e, t) {
                var r = t.header ? "th" : "td";
                return (t.align ? "<" + r + ' align="' + t.align + '">' : "<" + r + ">") + e + "</" + r + ">\n"
            }, t.strong = function(e) {
                return "<strong>" + e + "</strong>"
            }, t.em = function(e) {
                return "<em>" + e + "</em>"
            }, t.codespan = function(e) {
                return "<code>" + e + "</code>"
            }, t.br = function() {
                return this.options.xhtml ? "<br/>" : "<br>"
            }, t.del = function(e) {
                return "<del>" + e + "</del>"
            }, t.link = function(e, t, r) {
                if (null === (e = I(this.options.sanitize, this.options.baseUrl, e))) return r;
                var n = '<a href="' + P(e) + '"';
                return t && (n += ' title="' + t + '"'), n + ">" + r + "</a>"
            }, t.image = function(e, t, r) {
                if (null === (e = I(this.options.sanitize, this.options.baseUrl, e))) return r;
                var n = '<img src="' + e + '" alt="' + r + '"';
                return t && (n += ' title="' + t + '"'), n + (this.options.xhtml ? "/>" : ">")
            }, t.text = function(e) {
                return e
            }, e
        }(),
        $ = function() {
            function e() {
                this.seen = {}
            }
            return e.prototype.slug = function(e) {
                var t = e.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
                if (this.seen.hasOwnProperty(t))
                    for (var r = t; this.seen[r]++, t = r + "-" + this.seen[r], this.seen.hasOwnProperty(t););
                return this.seen[t] = 0, t
            }, e
        }(),
        W = i.defaults,
        B = A.inline,
        H = function(e, t) {
            if (-1 === e.indexOf(t[1])) return -1;
            for (var r = e.length, n = 0, i = 0; i < r; i++)
                if ("\\" === e[i]) i++;
                else if (e[i] === t[0]) n++;
            else if (e[i] === t[1] && --n < 0) return i;
            return -1
        },
        j = x,
        U = function() {
            function e(e, t) {
                if (this.options = t || W, this.links = e, this.rules = B.normal, this.options.renderer = this.options.renderer || new R, this.renderer = this.options.renderer, this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");
                this.options.pedantic ? this.rules = B.pedantic : this.options.gfm && (this.options.breaks ? this.rules = B.breaks : this.rules = B.gfm)
            }
            e.output = function(t, r, n) {
                return new e(r, n).output(t)
            };
            var r = e.prototype;
            return r.output = function(t) {
                for (var r, n, i, o, a, l, s = ""; t;)
                    if (a = this.rules.escape.exec(t)) t = t.substring(a[0].length), s += j(a[1]);
                    else if (a = this.rules.tag.exec(t)) !this.inLink && /^<a /i.test(a[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(a[0]) && (this.inLink = !1), !this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(a[0]) ? this.inRawBlock = !0 : this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(a[0]) && (this.inRawBlock = !1), t = t.substring(a[0].length), s += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(a[0]) : j(a[0]) : a[0];
                else if (a = this.rules.link.exec(t)) {
                    var c = H(a[2], "()");
                    if (-1 < c) {
                        var u = (0 === a[0].indexOf("!") ? 5 : 4) + a[1].length + c;
                        a[2] = a[2].substring(0, c), a[0] = a[0].substring(0, u).trim(), a[3] = ""
                    }
                    t = t.substring(a[0].length), this.inLink = !0, i = a[2], o = this.options.pedantic ? (r = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i)) ? (i = r[1], r[3]) : "" : a[3] ? a[3].slice(1, -1) : "", i = i.trim().replace(/^<([\s\S]*)>$/, "$1"), s += this.outputLink(a, {
                        href: e.escapes(i),
                        title: e.escapes(o)
                    }), this.inLink = !1
                } else if ((a = this.rules.reflink.exec(t)) || (a = this.rules.nolink.exec(t))) {
                    if (t = t.substring(a[0].length), r = (a[2] || a[1]).replace(/\s+/g, " "), !(r = this.links[r.toLowerCase()]) || !r.href) {
                        s += a[0].charAt(0), t = a[0].substring(1) + t;
                        continue
                    }
                    this.inLink = !0, s += this.outputLink(a, r), this.inLink = !1
                } else if (a = this.rules.strong.exec(t)) t = t.substring(a[0].length), s += this.renderer.strong(this.output(a[4] || a[3] || a[2] || a[1]));
                else if (a = this.rules.em.exec(t)) t = t.substring(a[0].length), s += this.renderer.em(this.output(a[6] || a[5] || a[4] || a[3] || a[2] || a[1]));
                else if (a = this.rules.code.exec(t)) t = t.substring(a[0].length), s += this.renderer.codespan(j(a[2].trim(), !0));
                else if (a = this.rules.br.exec(t)) t = t.substring(a[0].length), s += this.renderer.br();
                else if (a = this.rules.del.exec(t)) t = t.substring(a[0].length), s += this.renderer.del(this.output(a[1]));
                else if (a = this.rules.autolink.exec(t)) t = t.substring(a[0].length), i = "@" === a[2] ? "mailto:" + (n = j(this.mangle(a[1]))) : n = j(a[1]), s += this.renderer.link(i, null, n);
                else if (this.inLink || !(a = this.rules.url.exec(t))) {
                    if (a = this.rules.text.exec(t)) t = t.substring(a[0].length), this.inRawBlock ? s += this.renderer.text(this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(a[0]) : j(a[0]) : a[0]) : s += this.renderer.text(j(this.smartypants(a[0])));
                    else if (t) throw new Error("Infinite loop on byte: " + t.charCodeAt(0))
                } else {
                    if ("@" === a[2]) i = "mailto:" + (n = j(a[0]));
                    else {
                        for (; l = a[0], a[0] = this.rules._backpedal.exec(a[0])[0], l !== a[0];);
                        n = j(a[0]), i = "www." === a[1] ? "http://" + n : n
                    }
                    t = t.substring(a[0].length), s += this.renderer.link(i, null, n)
                }
                return s
            }, e.escapes = function(t) {
                return t ? t.replace(e.rules._escapes, "$1") : t
            }, r.outputLink = function(e, t) {
                var r = t.href,
                    n = t.title ? j(t.title) : null;
                return "!" !== e[0].charAt(0) ? this.renderer.link(r, n, this.output(e[1])) : this.renderer.image(r, n, j(e[1]))
            }, r.smartypants = function(e) {
                return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
            }, r.mangle = function(e) {
                if (!this.options.mangle) return e;
                for (var t, r = e.length, n = "", i = 0; i < r; i++) t = e.charCodeAt(i), .5 < Math.random() && (t = "x" + t.toString(16)), n += "&#" + t + ";";
                return n
            }, t(e, null, [{
                key: "rules",
                get: function() {
                    return B
                }
            }]), e
        }(),
        G = function() {
            function e() {}
            var t = e.prototype;
            return t.strong = function(e) {
                return e
            }, t.em = function(e) {
                return e
            }, t.codespan = function(e) {
                return e
            }, t.del = function(e) {
                return e
            }, t.text = function(e) {
                return e
            }, t.link = function(e, t, r) {
                return "" + r
            }, t.image = function(e, t, r) {
                return "" + r
            }, t.br = function() {
                return ""
            }, e
        }(),
        V = i.defaults,
        K = w,
        Z = k,
        X = function() {
            function e(e) {
                this.tokens = [], this.token = null, this.options = e || V, this.options.renderer = this.options.renderer || new R, this.renderer = this.options.renderer, this.renderer.options = this.options, this.slugger = new $
            }
            e.parse = function(t, r) {
                return new e(r).parse(t)
            };
            var t = e.prototype;
            return t.parse = function(e) {
                this.inline = new U(e.links, this.options), this.inlineText = new U(e.links, K({}, this.options, {
                    renderer: new G
                })), this.tokens = e.reverse();
                for (var t = ""; this.next();) t += this.tok();
                return t
            }, t.next = function() {
                return this.token = this.tokens.pop(), this.token
            }, t.peek = function() {
                return this.tokens[this.tokens.length - 1] || 0
            }, t.parseText = function() {
                for (var e = this.token.text;
                    "text" === this.peek().type;) e += "\n" + this.next().text;
                return this.inline.output(e)
            }, t.tok = function() {
                var e = "";
                switch (this.token.type) {
                    case "space":
                        return "";
                    case "hr":
                        return this.renderer.hr();
                    case "heading":
                        return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, Z(this.inlineText.output(this.token.text)), this.slugger);
                    case "code":
                        return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                    case "table":
                        var t, r, n, i, o = "";
                        for (n = "", t = 0; t < this.token.header.length; t++) n += this.renderer.tablecell(this.inline.output(this.token.header[t]), {
                            header: !0,
                            align: this.token.align[t]
                        });
                        for (o += this.renderer.tablerow(n), t = 0; t < this.token.cells.length; t++) {
                            for (r = this.token.cells[t], n = "", i = 0; i < r.length; i++) n += this.renderer.tablecell(this.inline.output(r[i]), {
                                header: !1,
                                align: this.token.align[i]
                            });
                            e += this.renderer.tablerow(n)
                        }
                        return this.renderer.table(o, e);
                    case "blockquote_start":
                        for (e = "";
                            "blockquote_end" !== this.next().type;) e += this.tok();
                        return this.renderer.blockquote(e);
                    case "list_start":
                        e = "";
                        for (var a = this.token.ordered, l = this.token.start;
                            "list_end" !== this.next().type;) e += this.tok();
                        return this.renderer.list(e, a, l);
                    case "list_item_start":
                        e = "";
                        var s = this.token.loose,
                            c = this.token.checked,
                            u = this.token.task;
                        if (this.token.task)
                            if (s)
                                if ("text" === this.peek().type) {
                                    var d = this.peek();
                                    d.text = this.renderer.checkbox(c) + " " + d.text
                                } else this.tokens.push({
                                    type: "text",
                                    text: this.renderer.checkbox(c)
                                });
                        else e += this.renderer.checkbox(c);
                        for (;
                            "list_item_end" !== this.next().type;) e += s || "text" !== this.token.type ? this.tok() : this.parseText();
                        return this.renderer.listitem(e, u, c);
                    case "html":
                        return this.renderer.html(this.token.text);
                    case "paragraph":
                        return this.renderer.paragraph(this.inline.output(this.token.text));
                    case "text":
                        return this.renderer.paragraph(this.parseText());
                    default:
                        var f = 'Token with "' + this.token.type + '" type was not found.';
                        if (!this.options.silent) throw new Error(f);
                        console.log(f)
                }
            }, e
        }(),
        Y = w,
        Q = function(e) {
            e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
        },
        J = x,
        ee = i.getDefaults,
        te = i.changeDefaults,
        re = i.defaults;

    function ne(e, t, r) {
        if (null == e) throw new Error("marked(): input parameter is undefined or null");
        if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        if (r || "function" == typeof t) {
            var n = function() {
                r || (r = t, t = null), t = Y({}, ne.defaults, t || {}), Q(t);
                var n, i, o = t.highlight,
                    a = 0;
                try {
                    n = F.lex(e, t)
                } catch (a) {
                    return {
                        v: r(a)
                    }
                }

                function l(e) {
                    if (e) return t.highlight = o, r(e);
                    var i;
                    try {
                        i = X.parse(n, t)
                    } catch (i) {
                        e = i
                    }
                    return t.highlight = o, e ? r(e) : r(null, i)
                }
                if (i = n.length, !o || o.length < 3) return {
                    v: l()
                };
                if (delete t.highlight, !i) return {
                    v: l()
                };
                for (; a < n.length; a++) ! function(e) {
                    "code" !== e.type ? --i || l() : o(e.text, e.lang, (function(t, r) {
                        return t ? l(t) : null == r || r === e.text ? --i || l() : (e.text = r, e.escaped = !0, void(--i || l()))
                    }))
                }(n[a]);
                return {
                    v: void 0
                }
            }();
            if ("object" == typeof n) return n.v
        }
        try {
            return t = Y({}, ne.defaults, t || {}), Q(t), X.parse(F.lex(e, t), t)
        } catch (n) {
            if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", (t || ne.defaults).silent) return "<p>An error occurred:</p><pre>" + J(n.message + "", !0) + "</pre>";
            throw n
        }
    }
    return ne.options = ne.setOptions = function(e) {
        return Y(ne.defaults, e), te(ne.defaults), ne
    }, ne.getDefaults = ee, ne.defaults = re, ne.Parser = X, ne.parser = X.parse, ne.Renderer = R, ne.TextRenderer = G, ne.Lexer = F, ne.lexer = F.lex, ne.InlineLexer = U, ne.inlineLexer = U.output, ne.Slugger = $, ne.parse = ne
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    function t(e) {
        e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null)
    }

    function r(e) {
        t(e);
        var r = e.state.placeholder = document.createElement("pre");
        r.style.cssText = "height: 0; overflow: visible", r.style.direction = e.getOption("direction"), r.className = "CodeMirror-placeholder CodeMirror-line-like";
        var n = e.getOption("placeholder");
        "string" == typeof n && (n = document.createTextNode(n)), r.appendChild(n), e.display.lineSpace.insertBefore(r, e.display.lineSpace.firstChild)
    }

    function n(e) {
        o(e) && r(e)
    }

    function i(e) {
        var n = e.getWrapperElement(),
            i = o(e);
        n.className = n.className.replace(" CodeMirror-empty", "") + (i ? " CodeMirror-empty" : ""), i ? r(e) : t(e)
    }

    function o(e) {
        return 1 === e.lineCount() && "" === e.getLine(0)
    }
    e.defineOption("placeholder", "", (function(r, o, a) {
        var l = a && a != e.Init;
        if (o && !l) r.on("blur", n), r.on("change", i), r.on("swapDoc", i), i(r);
        else if (!o && l) {
            r.off("blur", n), r.off("change", i), r.off("swapDoc", i), t(r);
            var s = r.getWrapperElement();
            s.className = s.className.replace(" CodeMirror-empty", "")
        }
        o && !r.hasFocus() && n(r)
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    var t = {
            pairs: "()[]{}''\"\"",
            closeBefore: ")]}'\":;>",
            triples: "",
            explode: "[]{}"
        },
        r = e.Pos;

    function n(e, r) {
        return "pairs" == r && "string" == typeof e ? e : "object" == typeof e && null != e[r] ? e[r] : t[r]
    }
    e.defineOption("autoCloseBrackets", !1, (function(t, r, a) {
        a && a != e.Init && (t.removeKeyMap(i), t.state.closeBrackets = null), r && (o(n(r, "pairs")), t.state.closeBrackets = r, t.addKeyMap(i))
    }));
    var i = {
        Backspace: function(t) {
            var i = l(t);
            if (!i || t.getOption("disableInput")) return e.Pass;
            for (var o = n(i, "pairs"), a = t.listSelections(), c = 0; c < a.length; c++) {
                if (!a[c].empty()) return e.Pass;
                var u = s(t, a[c].head);
                if (!u || o.indexOf(u) % 2 != 0) return e.Pass
            }
            for (c = a.length - 1; c >= 0; c--) {
                var d = a[c].head;
                t.replaceRange("", r(d.line, d.ch - 1), r(d.line, d.ch + 1), "+delete")
            }
        },
        Enter: function(t) {
            var r = l(t),
                i = r && n(r, "explode");
            if (!i || t.getOption("disableInput")) return e.Pass;
            for (var o = t.listSelections(), a = 0; a < o.length; a++) {
                if (!o[a].empty()) return e.Pass;
                var c = s(t, o[a].head);
                if (!c || i.indexOf(c) % 2 != 0) return e.Pass
            }
            t.operation((function() {
                var e = t.lineSeparator() || "\n";
                t.replaceSelection(e + e, null), t.execCommand("goCharLeft"), o = t.listSelections();
                for (var r = 0; r < o.length; r++) {
                    var n = o[r].head.line;
                    t.indentLine(n, null, !0), t.indentLine(n + 1, null, !0)
                }
            }))
        }
    };

    function o(e) {
        for (var t = 0; t < e.length; t++) {
            var r = e.charAt(t),
                n = "'" + r + "'";
            i[n] || (i[n] = a(r))
        }
    }

    function a(t) {
        return function(i) {
            return function(t, i) {
                var o = l(t);
                if (!o || t.getOption("disableInput")) return e.Pass;
                var a = n(o, "pairs"),
                    s = a.indexOf(i);
                if (-1 == s) return e.Pass;
                for (var u, d = n(o, "closeBefore"), f = n(o, "triples"), p = a.charAt(s + 1) == i, h = t.listSelections(), m = s % 2 == 0, g = 0; g < h.length; g++) {
                    var v, y = h[g],
                        b = y.head,
                        x = t.getRange(b, r(b.line, b.ch + 1));
                    if (m && !y.empty()) v = "surround";
                    else if (!p && m || x != i)
                        if (p && b.ch > 1 && f.indexOf(i) >= 0 && t.getRange(r(b.line, b.ch - 2), b) == i + i) {
                            if (b.ch > 2 && /\bstring/.test(t.getTokenTypeAt(r(b.line, b.ch - 2)))) return e.Pass;
                            v = "addFour"
                        } else if (p) {
                        var k = 0 == b.ch ? " " : t.getRange(r(b.line, b.ch - 1), b);
                        if (e.isWordChar(x) || k == i || e.isWordChar(k)) return e.Pass;
                        v = "both"
                    } else {
                        if (!m || !(0 === x.length || /\s/.test(x) || d.indexOf(x) > -1)) return e.Pass;
                        v = "both"
                    } else v = p && c(t, b) ? "both" : f.indexOf(i) >= 0 && t.getRange(b, r(b.line, b.ch + 3)) == i + i + i ? "skipThree" : "skip";
                    if (u) {
                        if (u != v) return e.Pass
                    } else u = v
                }
                var w = s % 2 ? a.charAt(s - 1) : i,
                    _ = s % 2 ? i : a.charAt(s + 1);
                t.operation((function() {
                    if ("skip" == u) t.execCommand("goCharRight");
                    else if ("skipThree" == u)
                        for (var n = 0; n < 3; n++) t.execCommand("goCharRight");
                    else if ("surround" == u) {
                        var i = t.getSelections();
                        for (n = 0; n < i.length; n++) i[n] = w + i[n] + _;
                        t.replaceSelections(i, "around"), i = t.listSelections().slice();
                        for (n = 0; n < i.length; n++) i[n] = (o = i[n], a = void 0, a = e.cmpPos(o.anchor, o.head) > 0, {
                            anchor: new r(o.anchor.line, o.anchor.ch + (a ? -1 : 1)),
                            head: new r(o.head.line, o.head.ch + (a ? 1 : -1))
                        });
                        t.setSelections(i)
                    } else "both" == u ? (t.replaceSelection(w + _, null), t.triggerElectric(w + _), t.execCommand("goCharLeft")) : "addFour" == u && (t.replaceSelection(w + w + w + w, "before"), t.execCommand("goCharRight"));
                    var o, a
                }))
            }(i, t)
        }
    }

    function l(e) {
        var t = e.state.closeBrackets;
        return !t || t.override ? t : e.getModeAt(e.getCursor()).closeBrackets || t
    }

    function s(e, t) {
        var n = e.getRange(r(t.line, t.ch - 1), r(t.line, t.ch + 1));
        return 2 == n.length ? n : null
    }

    function c(e, t) {
        var n = e.getTokenAt(r(t.line, t.ch + 1));
        return /\bstring/.test(n.type) && n.start == t.ch && (0 == t.ch || !/\bstring/.test(e.getTokenTypeAt(t)))
    }
    o(t.pairs + "`")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    var t = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,
        r = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,
        n = /[*+-]\s/;

    function i(e, r) {
        var n = r.line,
            i = 0,
            o = 0,
            a = t.exec(e.getLine(n)),
            l = a[1];
        do {
            var s = n + (i += 1),
                c = e.getLine(s),
                u = t.exec(c);
            if (u) {
                var d = u[1],
                    f = parseInt(a[3], 10) + i - o,
                    p = parseInt(u[3], 10),
                    h = p;
                if (l !== d || isNaN(p)) {
                    if (l.length > d.length) return;
                    if (l.length < d.length && 1 === i) return;
                    o += 1
                } else f === p && (h = p + 1), f > p && (h = f + 1), e.replaceRange(c.replace(t, d + h + u[4] + u[5]), {
                    line: s,
                    ch: 0
                }, {
                    line: s,
                    ch: c.length
                })
            }
        } while (u)
    }
    e.commands.newlineAndIndentContinueMarkdownList = function(o) {
        if (o.getOption("disableInput")) return e.Pass;
        for (var a = o.listSelections(), l = [], s = 0; s < a.length; s++) {
            var c = a[s].head,
                u = o.getStateAfter(c.line),
                d = e.innerMode(o.getMode(), u);
            if ("markdown" !== d.mode.name) return void o.execCommand("newlineAndIndent");
            var f = !1 !== (u = d.state).list,
                p = 0 !== u.quote,
                h = o.getLine(c.line),
                m = t.exec(h),
                g = /^\s*$/.test(h.slice(0, c.ch));
            if (!a[s].empty() || !f && !p || !m || g) return void o.execCommand("newlineAndIndent");
            if (r.test(h)) />\s*$/.test(h) || o.replaceRange("", {
                line: c.line,
                ch: 0
            }, {
                line: c.line,
                ch: c.ch + 1
            }), l[s] = "\n";
            else {
                var v = m[1],
                    y = m[5],
                    b = !(n.test(m[2]) || m[2].indexOf(">") >= 0),
                    x = b ? parseInt(m[3], 10) + 1 + m[4] : m[2].replace("x", " ");
                l[s] = "\n" + v + x + y, b && i(o, c)
            }
        }
        o.replaceSelections(l)
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    var t = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
        r = e.Pos,
        n = {
            "(": ")>",
            ")": "(<",
            "[": "]>",
            "]": "[<",
            "{": "}>",
            "}": "{<",
            "<": ">>",
            ">": "<<"
        };

    function i(e) {
        return e && e.bracketRegex || /[(){}[\]]/
    }

    function o(e, t, o) {
        var l = e.getLineHandle(t.line),
            s = t.ch - 1,
            c = o && o.afterCursor;
        null == c && (c = /(^| )cm-fat-cursor($| )/.test(e.getWrapperElement().className));
        var u = i(o),
            d = !c && s >= 0 && u.test(l.text.charAt(s)) && n[l.text.charAt(s)] || u.test(l.text.charAt(s + 1)) && n[l.text.charAt(++s)];
        if (!d) return null;
        var f = ">" == d.charAt(1) ? 1 : -1;
        if (o && o.strict && f > 0 != (s == t.ch)) return null;
        var p = e.getTokenTypeAt(r(t.line, s + 1)),
            h = a(e, r(t.line, s + (f > 0 ? 1 : 0)), f, p || null, o);
        return null == h ? null : {
            from: r(t.line, s),
            to: h && h.pos,
            match: h && h.ch == d.charAt(0),
            forward: f > 0
        }
    }

    function a(e, t, o, a, l) {
        for (var s = l && l.maxScanLineLength || 1e4, c = l && l.maxScanLines || 1e3, u = [], d = i(l), f = o > 0 ? Math.min(t.line + c, e.lastLine() + 1) : Math.max(e.firstLine() - 1, t.line - c), p = t.line; p != f; p += o) {
            var h = e.getLine(p);
            if (h) {
                var m = o > 0 ? 0 : h.length - 1,
                    g = o > 0 ? h.length : -1;
                if (!(h.length > s))
                    for (p == t.line && (m = t.ch - (o < 0 ? 1 : 0)); m != g; m += o) {
                        var v = h.charAt(m);
                        if (d.test(v) && (void 0 === a || e.getTokenTypeAt(r(p, m + 1)) == a)) {
                            var y = n[v];
                            if (y && ">" == y.charAt(1) == o > 0) u.push(v);
                            else {
                                if (!u.length) return {
                                    pos: r(p, m),
                                    ch: v
                                };
                                u.pop()
                            }
                        }
                    }
            }
        }
        return p - o != (o > 0 ? e.lastLine() : e.firstLine()) && null
    }

    function l(e, n, i) {
        for (var a = e.state.matchBrackets.maxHighlightLineLength || 1e3, l = [], s = e.listSelections(), c = 0; c < s.length; c++) {
            var u = s[c].empty() && o(e, s[c].head, i);
            if (u && e.getLine(u.from.line).length <= a) {
                var d = u.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
                l.push(e.markText(u.from, r(u.from.line, u.from.ch + 1), {
                    className: d
                })), u.to && e.getLine(u.to.line).length <= a && l.push(e.markText(u.to, r(u.to.line, u.to.ch + 1), {
                    className: d
                }))
            }
        }
        if (l.length) {
            t && e.state.focused && e.focus();
            var f = function() {
                e.operation((function() {
                    for (var e = 0; e < l.length; e++) l[e].clear()
                }))
            };
            if (!n) return f;
            setTimeout(f, 800)
        }
    }

    function s(e) {
        e.operation((function() {
            e.state.matchBrackets.currentlyHighlighted && (e.state.matchBrackets.currentlyHighlighted(), e.state.matchBrackets.currentlyHighlighted = null), e.state.matchBrackets.currentlyHighlighted = l(e, !1, e.state.matchBrackets)
        }))
    }
    e.defineOption("matchBrackets", !1, (function(t, r, n) {
        n && n != e.Init && (t.off("cursorActivity", s), t.state.matchBrackets && t.state.matchBrackets.currentlyHighlighted && (t.state.matchBrackets.currentlyHighlighted(), t.state.matchBrackets.currentlyHighlighted = null)), r && (t.state.matchBrackets = "object" == typeof r ? r : {}, t.on("cursorActivity", s))
    })), e.defineExtension("matchBrackets", (function() {
        l(this, !0)
    })), e.defineExtension("findMatchingBracket", (function(e, t, r) {
        return (r || "boolean" == typeof t) && (r ? (r.strict = t, t = r) : t = t ? {
            strict: !0
        } : null), o(this, e, t)
    })), e.defineExtension("scanForBracket", (function(e, t, r, n) {
        return a(this, e, t, r, n)
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.registerHelper("fold", "markdown", (function(t, r) {
        function n(r) {
            var n = t.getTokenTypeAt(e.Pos(r, 0));
            return n && /\bheader\b/.test(n)
        }

        function i(e, t, r) {
            var i = t && t.match(/^#+/);
            return i && n(e) ? i[0].length : (i = r && r.match(/^[=\-]+\s*$/)) && n(e + 1) ? "=" == r[0] ? 1 : 2 : 100
        }
        var o = t.getLine(r.line),
            a = t.getLine(r.line + 1),
            l = i(r.line, o, a);
        if (100 !== l) {
            for (var s = t.lastLine(), c = r.line, u = t.getLine(c + 2); c < s && !(i(c + 1, a, u) <= l);) ++c, a = u, u = t.getLine(c + 2);
            return {
                from: e.Pos(r.line, o.length),
                to: e.Pos(c, t.getLine(c).length)
            }
        }
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.runMode = function(t, r, n, i) {
        var o = e.getMode(e.defaults, r),
            a = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 9);
        if (n.appendChild) {
            var l = i && i.tabSize || e.defaults.tabSize,
                s = n,
                c = 0;
            s.innerHTML = "", n = function(e, t) {
                if ("\n" == e) return s.appendChild(document.createTextNode(a ? "\r" : e)), void(c = 0);
                for (var r = "", n = 0;;) {
                    var i = e.indexOf("\t", n);
                    if (-1 == i) {
                        r += e.slice(n), c += e.length - n;
                        break
                    }
                    c += i - n, r += e.slice(n, i);
                    var o = l - c % l;
                    c += o;
                    for (var u = 0; u < o; ++u) r += " ";
                    n = i + 1
                }
                if (t) {
                    var d = s.appendChild(document.createElement("span"));
                    d.className = "cm-" + t.replace(/ +/g, " cm-"), d.appendChild(document.createTextNode(r))
                } else s.appendChild(document.createTextNode(r))
            }
        }
        for (var u = e.splitLines(t), d = i && i.state || e.startState(o), f = 0, p = u.length; f < p; ++f) {
            f && n("\n");
            var h = new e.StringStream(u[f]);
            for (!h.string && o.blankLine && o.blankLine(d); !h.eol();) {
                var m = o.token(h, d);
                n(h.current(), m, f, h.start, d), h.start = h.pos
            }
        }
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    var t = "CodeMirror-activeline-background";

    function r(e) {
        for (var r = 0; r < e.state.activeLines.length; r++) e.removeLineClass(e.state.activeLines[r], "wrap", "CodeMirror-activeline"), e.removeLineClass(e.state.activeLines[r], "background", t), e.removeLineClass(e.state.activeLines[r], "gutter", "CodeMirror-activeline-gutter")
    }

    function n(e, n) {
        for (var i = [], o = 0; o < n.length; o++) {
            var a = n[o],
                l = e.getOption("styleActiveLine");
            if ("object" == typeof l && l.nonEmpty ? a.anchor.line == a.head.line : a.empty()) {
                var s = e.getLineHandleVisualStart(a.head.line);
                i[i.length - 1] != s && i.push(s)
            }
        }(function(e, t) {
            if (e.length != t.length) return !1;
            for (var r = 0; r < e.length; r++)
                if (e[r] != t[r]) return !1;
            return !0
        })(e.state.activeLines, i) || e.operation((function() {
            r(e);
            for (var n = 0; n < i.length; n++) e.addLineClass(i[n], "wrap", "CodeMirror-activeline"), e.addLineClass(i[n], "background", t), e.addLineClass(i[n], "gutter", "CodeMirror-activeline-gutter");
            e.state.activeLines = i
        }))
    }

    function i(e, t) {
        n(e, t.ranges)
    }
    e.defineOption("styleActiveLine", !1, (function(t, o, a) {
        var l = a != e.Init && a;
        o != l && (l && (t.off("beforeSelectionChange", i), r(t), delete t.state.activeLines), o && (t.state.activeLines = [], n(t, t.listSelections()), t.on("beforeSelectionChange", i)))
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        e.state.markedSelection && e.operation((function() {
            ! function(e) {
                if (!e.somethingSelected()) return a(e);
                if (e.listSelections().length > 1) return l(e);
                var t = e.getCursor("start"),
                    r = e.getCursor("end"),
                    n = e.state.markedSelection;
                if (!n.length) return o(e, t, r);
                var s = n[0].find(),
                    c = n[n.length - 1].find();
                if (!s || !c || r.line - t.line <= 8 || i(t, c.to) >= 0 || i(r, s.from) <= 0) return l(e);
                for (; i(t, s.from) > 0;) n.shift().clear(), s = n[0].find();
                i(t, s.from) < 0 && (s.to.line - t.line < 8 ? (n.shift().clear(), o(e, t, s.to, 0)) : o(e, t, s.from, 0));
                for (; i(r, c.to) < 0;) n.pop().clear(), c = n[n.length - 1].find();
                i(r, c.to) > 0 && (r.line - c.from.line < 8 ? (n.pop().clear(), o(e, c.from, r)) : o(e, c.to, r))
            }(e)
        }))
    }

    function r(e) {
        e.state.markedSelection && e.state.markedSelection.length && e.operation((function() {
            a(e)
        }))
    }
    e.defineOption("styleSelectedText", !1, (function(n, i, o) {
        var s = o && o != e.Init;
        i && !s ? (n.state.markedSelection = [], n.state.markedSelectionStyle = "string" == typeof i ? i : "CodeMirror-selectedtext", l(n), n.on("cursorActivity", t), n.on("change", r)) : !i && s && (n.off("cursorActivity", t), n.off("change", r), a(n), n.state.markedSelection = n.state.markedSelectionStyle = null)
    }));
    var n = e.Pos,
        i = e.cmpPos;

    function o(e, t, r, o) {
        if (0 != i(t, r))
            for (var a = e.state.markedSelection, l = e.state.markedSelectionStyle, s = t.line;;) {
                var c = s == t.line ? t : n(s, 0),
                    u = s + 8,
                    d = u >= r.line,
                    f = d ? r : n(u, 0),
                    p = e.markText(c, f, {
                        className: l
                    });
                if (null == o ? a.push(p) : a.splice(o++, 0, p), d) break;
                s = u
            }
    }

    function a(e) {
        for (var t = e.state.markedSelection, r = 0; r < t.length; ++r) t[r].clear();
        t.length = 0
    }

    function l(e) {
        a(e);
        for (var t = e.listSelections(), r = 0; r < t.length; r++) o(e, t[r].from(), t[r].to())
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../xml/xml"), require("../meta")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../meta"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("markdown", (function(t, r) {
        var n = e.getMode(t, "text/html"),
            i = "null" == n.name;
        void 0 === r.highlightFormatting && (r.highlightFormatting = !1), void 0 === r.maxBlockquoteDepth && (r.maxBlockquoteDepth = 0), void 0 === r.taskLists && (r.taskLists = !1), void 0 === r.strikethrough && (r.strikethrough = !1), void 0 === r.emoji && (r.emoji = !1), void 0 === r.fencedCodeBlockHighlighting && (r.fencedCodeBlockHighlighting = !0), void 0 === r.xml && (r.xml = !0), void 0 === r.tokenTypeOverrides && (r.tokenTypeOverrides = {});
        var o = {
            header: "header",
            code: "comment",
            quote: "quote",
            list1: "variable-2",
            list2: "variable-3",
            list3: "keyword",
            hr: "hr",
            image: "image",
            imageAltText: "image-alt-text",
            imageMarker: "image-marker",
            formatting: "formatting",
            linkInline: "link",
            linkEmail: "link",
            linkText: "link",
            linkHref: "string",
            em: "em",
            strong: "strong",
            strikethrough: "strikethrough",
            emoji: "builtin"
        };
        for (var a in o) o.hasOwnProperty(a) && r.tokenTypeOverrides[a] && (o[a] = r.tokenTypeOverrides[a]);
        var l = /^([*\-_])(?:\s*\1){2,}\s*$/,
            s = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
            c = /^\[(x| )\](?=\s)/i,
            u = r.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
            d = /^ *(?:\={1,}|-{1,})\s*$/,
            f = /^[^#!\[\]*_\\<>` "'(~:]+/,
            p = /^(~~~+|```+)[ \t]*([\w+#-]*)[^\n`]*$/,
            h = /^\s*\[[^\]]+?\]:.*$/,
            m = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/;

        function g(e, t, r) {
            return t.f = t.inline = r, r(e, t)
        }

        function v(e, t, r) {
            return t.f = t.block = r, r(e, t)
        }

        function y(t) {
            if (t.linkTitle = !1, t.linkHref = !1, t.linkText = !1, t.em = !1, t.strong = !1, t.strikethrough = !1, t.quote = 0, t.indentedCode = !1, t.f == x) {
                var r = i;
                if (!r) {
                    var o = e.innerMode(n, t.htmlState);
                    r = "xml" == o.mode.name && null === o.state.tagStart && !o.state.context && o.state.tokenize.isInText
                }
                r && (t.f = C, t.block = b, t.htmlState = null)
            }
            return t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.prevLine = t.thisLine, t.thisLine = {
                stream: null
            }, null
        }

        function b(n, i) {
            var a, f = n.column() === i.indentation,
                m = !(a = i.prevLine.stream) || !/\S/.test(a.string),
                v = i.indentedCode,
                y = i.prevLine.hr,
                b = !1 !== i.list,
                x = (i.listStack[i.listStack.length - 1] || 0) + 3;
            i.indentedCode = !1;
            var _ = i.indentation;
            if (null === i.indentationDiff && (i.indentationDiff = i.indentation, b)) {
                for (i.list = null; _ < i.listStack[i.listStack.length - 1];) i.listStack.pop(), i.listStack.length ? i.indentation = i.listStack[i.listStack.length - 1] : i.list = !1;
                !1 !== i.list && (i.indentationDiff = _ - i.listStack[i.listStack.length - 1])
            }
            var C = !(m || y || i.prevLine.header || b && v || i.prevLine.fencedCodeEnd),
                S = (!1 === i.list || y || m) && i.indentation <= x && n.match(l),
                T = null;
            if (i.indentationDiff >= 4 && (v || i.prevLine.fencedCodeEnd || i.prevLine.header || m)) return n.skipToEnd(), i.indentedCode = !0, o.code;
            if (n.eatSpace()) return null;
            if (f && i.indentation <= x && (T = n.match(u)) && T[1].length <= 6) return i.quote = 0, i.header = T[1].length, i.thisLine.header = !0, r.highlightFormatting && (i.formatting = "header"), i.f = i.inline, w(i);
            if (i.indentation <= x && n.eat(">")) return i.quote = f ? 1 : i.quote + 1, r.highlightFormatting && (i.formatting = "quote"), n.eatSpace(), w(i);
            if (!S && !i.setext && f && i.indentation <= x && (T = n.match(s))) {
                var L = T[1] ? "ol" : "ul";
                return i.indentation = _ + n.current().length, i.list = !0, i.quote = 0, i.listStack.push(i.indentation), i.em = !1, i.strong = !1, i.code = !1, i.strikethrough = !1, r.taskLists && n.match(c, !1) && (i.taskList = !0), i.f = i.inline, r.highlightFormatting && (i.formatting = ["list", "list-" + L]), w(i)
            }
            return f && i.indentation <= x && (T = n.match(p, !0)) ? (i.quote = 0, i.fencedEndRE = new RegExp(T[1] + "+ *$"), i.localMode = r.fencedCodeBlockHighlighting && function(r) {
                if (e.findModeByName) {
                    var n = e.findModeByName(r);
                    n && (r = n.mime || n.mimes[0])
                }
                var i = e.getMode(t, r);
                return "null" == i.name ? null : i
            }(T[2]), i.localMode && (i.localState = e.startState(i.localMode)), i.f = i.block = k, r.highlightFormatting && (i.formatting = "code-block"), i.code = -1, w(i)) : i.setext || !(C && b || i.quote || !1 !== i.list || i.code || S || h.test(n.string)) && (T = n.lookAhead(1)) && (T = T.match(d)) ? (i.setext ? (i.header = i.setext, i.setext = 0, n.skipToEnd(), r.highlightFormatting && (i.formatting = "header")) : (i.header = "=" == T[0].charAt(0) ? 1 : 2, i.setext = i.header), i.thisLine.header = !0, i.f = i.inline, w(i)) : S ? (n.skipToEnd(), i.hr = !0, i.thisLine.hr = !0, o.hr) : "[" === n.peek() ? g(n, i, M) : g(n, i, i.inline)
        }

        function x(t, r) {
            var o = n.token(t, r.htmlState);
            if (!i) {
                var a = e.innerMode(n, r.htmlState);
                ("xml" == a.mode.name && null === a.state.tagStart && !a.state.context && a.state.tokenize.isInText || r.md_inside && t.current().indexOf(">") > -1) && (r.f = C, r.block = b, r.htmlState = null)
            }
            return o
        }

        function k(e, t) {
            var n, i = t.listStack[t.listStack.length - 1] || 0,
                a = t.indentation < i,
                l = i + 3;
            return t.fencedEndRE && t.indentation <= l && (a || e.match(t.fencedEndRE)) ? (r.highlightFormatting && (t.formatting = "code-block"), a || (n = w(t)), t.localMode = t.localState = null, t.block = b, t.f = C, t.fencedEndRE = null, t.code = 0, t.thisLine.fencedCodeEnd = !0, a ? v(e, t, t.block) : n) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), o.code)
        }

        function w(e) {
            var t = [];
            if (e.formatting) {
                t.push(o.formatting), "string" == typeof e.formatting && (e.formatting = [e.formatting]);
                for (var n = 0; n < e.formatting.length; n++) t.push(o.formatting + "-" + e.formatting[n]), "header" === e.formatting[n] && t.push(o.formatting + "-" + e.formatting[n] + "-" + e.header), "quote" === e.formatting[n] && (!r.maxBlockquoteDepth || r.maxBlockquoteDepth >= e.quote ? t.push(o.formatting + "-" + e.formatting[n] + "-" + e.quote) : t.push("error"))
            }
            if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;
            if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;
            if (e.linkHref ? t.push(o.linkHref, "url") : (e.strong && t.push(o.strong), e.em && t.push(o.em), e.strikethrough && t.push(o.strikethrough), e.emoji && t.push(o.emoji), e.linkText && t.push(o.linkText), e.code && t.push(o.code), e.image && t.push(o.image), e.imageAltText && t.push(o.imageAltText, "link"), e.imageMarker && t.push(o.imageMarker)), e.header && t.push(o.header, o.header + "-" + e.header), e.quote && (t.push(o.quote), !r.maxBlockquoteDepth || r.maxBlockquoteDepth >= e.quote ? t.push(o.quote + "-" + e.quote) : t.push(o.quote + "-" + r.maxBlockquoteDepth)), !1 !== e.list) {
                var i = (e.listStack.length - 1) % 3;
                i ? 1 === i ? t.push(o.list2) : t.push(o.list3) : t.push(o.list1)
            }
            return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null
        }

        function _(e, t) {
            if (e.match(f, !0)) return w(t)
        }

        function C(t, i) {
            var a = i.text(t, i);
            if (void 0 !== a) return a;
            if (i.list) return i.list = null, w(i);
            if (i.taskList) return " " === t.match(c, !0)[1] ? i.taskOpen = !0 : i.taskClosed = !0, r.highlightFormatting && (i.formatting = "task"), i.taskList = !1, w(i);
            if (i.taskOpen = !1, i.taskClosed = !1, i.header && t.match(/^#+$/, !0)) return r.highlightFormatting && (i.formatting = "header"), w(i);
            var l = t.next();
            if (i.linkTitle) {
                i.linkTitle = !1;
                var s = l;
                "(" === l && (s = ")");
                var u = "^\\s*(?:[^" + (s = (s + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1")) + "\\\\]+|\\\\\\\\|\\\\.)" + s;
                if (t.match(new RegExp(u), !0)) return o.linkHref
            }
            if ("`" === l) {
                var d = i.formatting;
                r.highlightFormatting && (i.formatting = "code"), t.eatWhile("`");
                var f = t.current().length;
                if (0 != i.code || i.quote && 1 != f) {
                    if (f == i.code) {
                        var p = w(i);
                        return i.code = 0, p
                    }
                    return i.formatting = d, w(i)
                }
                return i.code = f, w(i)
            }
            if (i.code) return w(i);
            if ("\\" === l && (t.next(), r.highlightFormatting)) {
                var h = w(i),
                    g = o.formatting + "-escape";
                return h ? h + " " + g : g
            }
            if ("!" === l && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return i.imageMarker = !0, i.image = !0, r.highlightFormatting && (i.formatting = "image"), w(i);
            if ("[" === l && i.imageMarker && t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)) return i.imageMarker = !1, i.imageAltText = !0, r.highlightFormatting && (i.formatting = "image"), w(i);
            if ("]" === l && i.imageAltText) {
                r.highlightFormatting && (i.formatting = "image");
                var h = w(i);
                return i.imageAltText = !1, i.image = !1, i.inline = i.f = T, h
            }
            if ("[" === l && !i.image) return i.linkText && t.match(/^.*?\]/) ? w(i) : (i.linkText = !0, r.highlightFormatting && (i.formatting = "link"), w(i));
            if ("]" === l && i.linkText) {
                r.highlightFormatting && (i.formatting = "link");
                var h = w(i);
                return i.linkText = !1, i.inline = i.f = t.match(/\(.*?\)| ?\[.*?\]/, !1) ? T : C, h
            }
            if ("<" === l && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) return i.f = i.inline = S, r.highlightFormatting && (i.formatting = "link"), (h = w(i)) ? h += " " : h = "", h + o.linkInline;
            if ("<" === l && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) return i.f = i.inline = S, r.highlightFormatting && (i.formatting = "link"), (h = w(i)) ? h += " " : h = "", h + o.linkEmail;
            if (r.xml && "<" === l && t.match(/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i, !1)) {
                var y = t.string.indexOf(">", t.pos);
                if (-1 != y) {
                    var b = t.string.substring(t.start, y);
                    /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(b) && (i.md_inside = !0)
                }
                return t.backUp(1), i.htmlState = e.startState(n), v(t, i, x)
            }
            if (r.xml && "<" === l && t.match(/^\/\w*?>/)) return i.md_inside = !1, "tag";
            if ("*" === l || "_" === l) {
                for (var k = 1, _ = 1 == t.pos ? " " : t.string.charAt(t.pos - 2); k < 3 && t.eat(l);) k++;
                var L = t.peek() || " ",
                    M = !/\s/.test(L) && (!m.test(L) || /\s/.test(_) || m.test(_)),
                    A = !/\s/.test(_) && (!m.test(_) || /\s/.test(L) || m.test(L)),
                    E = null,
                    D = null;
                if (k % 2 && (i.em || !M || "*" !== l && A && !m.test(_) ? i.em != l || !A || "*" !== l && M && !m.test(L) || (E = !1) : E = !0), k > 1 && (i.strong || !M || "*" !== l && A && !m.test(_) ? i.strong != l || !A || "*" !== l && M && !m.test(L) || (D = !1) : D = !0), null != D || null != E) {
                    r.highlightFormatting && (i.formatting = null == E ? "strong" : null == D ? "em" : "strong em"), !0 === E && (i.em = l), !0 === D && (i.strong = l);
                    p = w(i);
                    return !1 === E && (i.em = !1), !1 === D && (i.strong = !1), p
                }
            } else if (" " === l && (t.eat("*") || t.eat("_"))) {
                if (" " === t.peek()) return w(i);
                t.backUp(1)
            }
            if (r.strikethrough)
                if ("~" === l && t.eatWhile(l)) {
                    if (i.strikethrough) {
                        r.highlightFormatting && (i.formatting = "strikethrough");
                        p = w(i);
                        return i.strikethrough = !1, p
                    }
                    if (t.match(/^[^\s]/, !1)) return i.strikethrough = !0, r.highlightFormatting && (i.formatting = "strikethrough"), w(i)
                } else if (" " === l && t.match(/^~~/, !0)) {
                if (" " === t.peek()) return w(i);
                t.backUp(2)
            }
            if (r.emoji && ":" === l && t.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)) {
                i.emoji = !0, r.highlightFormatting && (i.formatting = "emoji");
                var z = w(i);
                return i.emoji = !1, z
            }
            return " " === l && (t.match(/^ +$/, !1) ? i.trailingSpace++ : i.trailingSpace && (i.trailingSpaceNewLine = !0)), w(i)
        }

        function S(e, t) {
            if (">" === e.next()) {
                t.f = t.inline = C, r.highlightFormatting && (t.formatting = "link");
                var n = w(t);
                return n ? n += " " : n = "", n + o.linkInline
            }
            return e.match(/^[^>]+/, !0), o.linkInline
        }

        function T(e, t) {
            if (e.eatSpace()) return null;
            var n, i = e.next();
            return "(" === i || "[" === i ? (t.f = t.inline = (n = "(" === i ? ")" : "]", function(e, t) {
                if (e.next() === n) {
                    t.f = t.inline = C, r.highlightFormatting && (t.formatting = "link-string");
                    var i = w(t);
                    return t.linkHref = !1, i
                }
                return e.match(L[n]), t.linkHref = !0, w(t)
            }), r.highlightFormatting && (t.formatting = "link-string"), t.linkHref = !0, w(t)) : "error"
        }
        var L = {
            ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
            "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/
        };

        function M(e, t) {
            return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = A, e.next(), r.highlightFormatting && (t.formatting = "link"), t.linkText = !0, w(t)) : g(e, t, C)
        }

        function A(e, t) {
            if (e.match(/^\]:/, !0)) {
                t.f = t.inline = E, r.highlightFormatting && (t.formatting = "link");
                var n = w(t);
                return t.linkText = !1, n
            }
            return e.match(/^([^\]\\]|\\.)+/, !0), o.linkText
        }

        function E(e, t) {
            return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = C, o.linkHref + " url")
        }
        var D = {
            startState: function() {
                return {
                    f: b,
                    prevLine: {
                        stream: null
                    },
                    thisLine: {
                        stream: null
                    },
                    block: b,
                    htmlState: null,
                    indentation: 0,
                    inline: C,
                    text: _,
                    formatting: !1,
                    linkText: !1,
                    linkHref: !1,
                    linkTitle: !1,
                    code: 0,
                    em: !1,
                    strong: !1,
                    header: 0,
                    setext: 0,
                    hr: !1,
                    taskList: !1,
                    list: !1,
                    listStack: [],
                    quote: 0,
                    trailingSpace: 0,
                    trailingSpaceNewLine: !1,
                    strikethrough: !1,
                    emoji: !1,
                    fencedEndRE: null
                }
            },
            copyState: function(t) {
                return {
                    f: t.f,
                    prevLine: t.prevLine,
                    thisLine: t.thisLine,
                    block: t.block,
                    htmlState: t.htmlState && e.copyState(n, t.htmlState),
                    indentation: t.indentation,
                    localMode: t.localMode,
                    localState: t.localMode ? e.copyState(t.localMode, t.localState) : null,
                    inline: t.inline,
                    text: t.text,
                    formatting: !1,
                    linkText: t.linkText,
                    linkTitle: t.linkTitle,
                    linkHref: t.linkHref,
                    code: t.code,
                    em: t.em,
                    strong: t.strong,
                    strikethrough: t.strikethrough,
                    emoji: t.emoji,
                    header: t.header,
                    setext: t.setext,
                    hr: t.hr,
                    taskList: t.taskList,
                    list: t.list,
                    listStack: t.listStack.slice(0),
                    quote: t.quote,
                    indentedCode: t.indentedCode,
                    trailingSpace: t.trailingSpace,
                    trailingSpaceNewLine: t.trailingSpaceNewLine,
                    md_inside: t.md_inside,
                    fencedEndRE: t.fencedEndRE
                }
            },
            token: function(e, t) {
                if (t.formatting = !1, e != t.thisLine.stream) {
                    if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0)) return y(t), null;
                    if (t.prevLine = t.thisLine, t.thisLine = {
                            stream: e
                        }, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, !t.localState && (t.f = t.block, t.f != x)) {
                        var r = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;
                        if (t.indentation = r, t.indentationDiff = null, r > 0) return null
                    }
                }
                return t.f(e, t)
            },
            innerMode: function(e) {
                return e.block == x ? {
                    state: e.htmlState,
                    mode: n
                } : e.localState ? {
                    state: e.localState,
                    mode: e.localMode
                } : {
                    state: e,
                    mode: D
                }
            },
            indent: function(t, r, i) {
                return t.block == x && n.indent ? n.indent(t.htmlState, r, i) : t.localState && t.localMode.indent ? t.localMode.indent(t.localState, r, i) : e.Pass
            },
            blankLine: y,
            getType: w,
            blockCommentStart: "\x3c!--",
            blockCommentEnd: "--\x3e",
            closeBrackets: "()[]{}''\"\"``",
            fold: "markdown"
        };
        return D
    }), "xml"), e.defineMIME("text/markdown", "markdown"), e.defineMIME("text/x-markdown", "markdown")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t, r, n, i, o) {
        this.indented = e, this.column = t, this.type = r, this.info = n, this.align = i, this.prev = o
    }

    function r(e, r, n, i) {
        var o = e.indented;
        return e.context && "statement" == e.context.type && "statement" != n && (o = e.context.indented), e.context = new t(o, r, n, i, null, e.context)
    }

    function n(e) {
        var t = e.context.type;
        return ")" != t && "]" != t && "}" != t || (e.indented = e.context.indented), e.context = e.context.prev
    }

    function i(e, t, r) {
        return "variable" == t.prevToken || "type" == t.prevToken || (!!/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(e.string.slice(0, r)) || (!(!t.typeAtEndOfLine || e.column() != e.indentation()) || void 0))
    }

    function o(e) {
        for (;;) {
            if (!e || "top" == e.type) return !0;
            if ("}" == e.type && "namespace" != e.prev.info) return !1;
            e = e.prev
        }
    }

    function a(e) {
        for (var t = {}, r = e.split(" "), n = 0; n < r.length; ++n) t[r[n]] = !0;
        return t
    }

    function l(e, t) {
        return "function" == typeof e ? e(t) : e.propertyIsEnumerable(t)
    }
    e.defineMode("clike", (function(a, s) {
        var c, u, d = a.indentUnit,
            f = s.statementIndentUnit || d,
            p = s.dontAlignCalls,
            h = s.keywords || {},
            m = s.types || {},
            g = s.builtin || {},
            v = s.blockKeywords || {},
            y = s.defKeywords || {},
            b = s.atoms || {},
            x = s.hooks || {},
            k = s.multiLineStrings,
            w = !1 !== s.indentStatements,
            _ = !1 !== s.indentSwitch,
            C = s.namespaceSeparator,
            S = s.isPunctuationChar || /[\[\]{}\(\),;\:\.]/,
            T = s.numberStart || /[\d\.]/,
            L = s.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
            M = s.isOperatorChar || /[+\-*&%=<>!?|\/]/,
            A = s.isIdentifierChar || /[\w\$_\xa1-\uffff]/,
            E = s.isReservedIdentifier || !1;

        function D(e, t) {
            var r, n = e.next();
            if (x[n]) {
                var i = x[n](e, t);
                if (!1 !== i) return i
            }
            if ('"' == n || "'" == n) return t.tokenize = (r = n, function(e, t) {
                for (var n, i = !1, o = !1; null != (n = e.next());) {
                    if (n == r && !i) {
                        o = !0;
                        break
                    }
                    i = !i && "\\" == n
                }
                return (o || !i && !k) && (t.tokenize = null), "string"
            }), t.tokenize(e, t);
            if (S.test(n)) return c = n, null;
            if (T.test(n)) {
                if (e.backUp(1), e.match(L)) return "number";
                e.next()
            }
            if ("/" == n) {
                if (e.eat("*")) return t.tokenize = z, z(e, t);
                if (e.eat("/")) return e.skipToEnd(), "comment"
            }
            if (M.test(n)) {
                for (; !e.match(/^\/[\/*]/, !1) && e.eat(M););
                return "operator"
            }
            if (e.eatWhile(A), C)
                for (; e.match(C);) e.eatWhile(A);
            var o = e.current();
            return l(h, o) ? (l(v, o) && (c = "newstatement"), l(y, o) && (u = !0), "keyword") : l(m, o) ? "type" : l(g, o) || E && E(o) ? (l(v, o) && (c = "newstatement"), "builtin") : l(b, o) ? "atom" : "variable"
        }

        function z(e, t) {
            for (var r, n = !1; r = e.next();) {
                if ("/" == r && n) {
                    t.tokenize = null;
                    break
                }
                n = "*" == r
            }
            return "comment"
        }

        function N(e, t) {
            s.typeFirstDefinitions && e.eol() && o(t.context) && (t.typeAtEndOfLine = i(e, t, e.pos))
        }
        return {
            startState: function(e) {
                return {
                    tokenize: null,
                    context: new t((e || 0) - d, 0, "top", null, !1),
                    indented: 0,
                    startOfLine: !0,
                    prevToken: null
                }
            },
            token: function(e, t) {
                var a = t.context;
                if (e.sol() && (null == a.align && (a.align = !1), t.indented = e.indentation(), t.startOfLine = !0), e.eatSpace()) return N(e, t), null;
                c = u = null;
                var l = (t.tokenize || D)(e, t);
                if ("comment" == l || "meta" == l) return l;
                if (null == a.align && (a.align = !0), ";" == c || ":" == c || "," == c && e.match(/^\s*(?:\/\/.*)?$/, !1))
                    for (;
                        "statement" == t.context.type;) n(t);
                else if ("{" == c) r(t, e.column(), "}");
                else if ("[" == c) r(t, e.column(), "]");
                else if ("(" == c) r(t, e.column(), ")");
                else if ("}" == c) {
                    for (;
                        "statement" == a.type;) a = n(t);
                    for ("}" == a.type && (a = n(t));
                        "statement" == a.type;) a = n(t)
                } else c == a.type ? n(t) : w && (("}" == a.type || "top" == a.type) && ";" != c || "statement" == a.type && "newstatement" == c) && r(t, e.column(), "statement", e.current());
                if ("variable" == l && ("def" == t.prevToken || s.typeFirstDefinitions && i(e, t, e.start) && o(t.context) && e.match(/^\s*\(/, !1)) && (l = "def"), x.token) {
                    var d = x.token(e, t, l);
                    void 0 !== d && (l = d)
                }
                return "def" == l && !1 === s.styleDefs && (l = "variable"), t.startOfLine = !1, t.prevToken = u ? "def" : l || c, N(e, t), l
            },
            indent: function(t, r) {
                if (t.tokenize != D && null != t.tokenize || t.typeAtEndOfLine) return e.Pass;
                var n = t.context,
                    i = r && r.charAt(0),
                    o = i == n.type;
                if ("statement" == n.type && "}" == i && (n = n.prev), s.dontIndentStatements)
                    for (;
                        "statement" == n.type && s.dontIndentStatements.test(n.info);) n = n.prev;
                if (x.indent) {
                    var a = x.indent(t, n, r, d);
                    if ("number" == typeof a) return a
                }
                var l = n.prev && "switch" == n.prev.info;
                if (s.allmanIndentation && /[{(]/.test(i)) {
                    for (;
                        "top" != n.type && "}" != n.type;) n = n.prev;
                    return n.indented
                }
                return "statement" == n.type ? n.indented + ("{" == i ? 0 : f) : !n.align || p && ")" == n.type ? ")" != n.type || o ? n.indented + (o ? 0 : d) + (o || !l || /^(?:case|default)\b/.test(r) ? 0 : d) : n.indented + f : n.column + (o ? 0 : 1)
            },
            electricInput: _ ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            blockCommentContinue: " * ",
            lineComment: "//",
            fold: "brace"
        }
    }));
    var s = "auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran",
        c = "alignas alignof and and_eq audit axiom bitand bitor catch class compl concept constexpr const_cast decltype delete dynamic_cast explicit export final friend import module mutable namespace new noexcept not not_eq operator or or_eq override private protected public reinterpret_cast requires static_assert static_cast template this thread_local throw try typeid typename using virtual xor xor_eq",
        u = "bycopy byref in inout oneway out self super atomic nonatomic retain copy readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd @interface @implementation @end @protocol @encode @property @synthesize @dynamic @class @public @package @private @protected @required @optional @try @catch @finally @import @selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available",
        d = "FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION  NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT",
        f = a("int long char short double float unsigned signed void bool"),
        p = a("SEL instancetype id Class Protocol BOOL");

    function h(e) {
        return l(f, e) || /.+_t$/.test(e)
    }

    function m(e) {
        return h(e) || l(p, e)
    }
    var g = "case do else for if switch while struct enum union";

    function v(e, t) {
        if (!t.startOfLine) return !1;
        for (var r, n = null; r = e.peek();) {
            if ("\\" == r && e.match(/^.$/)) {
                n = v;
                break
            }
            if ("/" == r && e.match(/^\/[\/\*]/, !1)) break;
            e.next()
        }
        return t.tokenize = n, "meta"
    }

    function y(e, t) {
        return "type" == t.prevToken && "type"
    }

    function b(e) {
        return !(!e || e.length < 2) && ("_" == e[0] && ("_" == e[1] || e[1] !== e[1].toLowerCase()))
    }

    function x(e) {
        return e.eatWhile(/[\w\.']/), "number"
    }

    function k(e, t) {
        if (e.backUp(1), e.match(/(R|u8R|uR|UR|LR)/)) {
            var r = e.match(/"([^\s\\()]{0,16})\(/);
            return !!r && (t.cpp11RawStringDelim = r[1], t.tokenize = C, C(e, t))
        }
        return e.match(/(u8|u|U|L)/) ? !!e.match(/["']/, !1) && "string" : (e.next(), !1)
    }

    function w(e) {
        var t = /(\w+)::~?(\w+)$/.exec(e);
        return t && t[1] == t[2]
    }

    function _(e, t) {
        for (var r; null != (r = e.next());)
            if ('"' == r && !e.eat('"')) {
                t.tokenize = null;
                break
            } return "string"
    }

    function C(e, t) {
        var r = t.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&");
        return e.match(new RegExp(".*?\\)" + r + '"')) ? t.tokenize = null : e.skipToEnd(), "string"
    }

    function S(t, r) {
        "string" == typeof t && (t = [t]);
        var n = [];

        function i(e) {
            if (e)
                for (var t in e) e.hasOwnProperty(t) && n.push(t)
        }
        i(r.keywords), i(r.types), i(r.builtin), i(r.atoms), n.length && (r.helperType = t[0], e.registerHelper("hintWords", t[0], n));
        for (var o = 0; o < t.length; ++o) e.defineMIME(t[o], r)
    }

    function T(e, t) {
        for (var r = !1; !e.eol();) {
            if (!r && e.match('"""')) {
                t.tokenize = null;
                break
            }
            r = "\\" == e.next() && !r
        }
        return "string"
    }

    function L(e) {
        return function(t, r) {
            for (var n; n = t.next();) {
                if ("*" == n && t.eat("/")) {
                    if (1 == e) {
                        r.tokenize = null;
                        break
                    }
                    return r.tokenize = L(e - 1), r.tokenize(t, r)
                }
                if ("/" == n && t.eat("*")) return r.tokenize = L(e + 1), r.tokenize(t, r)
            }
            return "comment"
        }
    }
    S(["text/x-csrc", "text/x-c", "text/x-chdr"], {
        name: "clike",
        keywords: a(s),
        types: h,
        blockKeywords: a(g),
        defKeywords: a("struct enum union"),
        typeFirstDefinitions: !0,
        atoms: a("NULL true false"),
        isReservedIdentifier: b,
        hooks: {
            "#": v,
            "*": y
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    }), S(["text/x-c++src", "text/x-c++hdr"], {
        name: "clike",
        keywords: a(s + " " + c),
        types: h,
        blockKeywords: a(g + " class try catch"),
        defKeywords: a("struct enum union class namespace"),
        typeFirstDefinitions: !0,
        atoms: a("true false NULL nullptr"),
        dontIndentStatements: /^template$/,
        isIdentifierChar: /[\w\$_~\xa1-\uffff]/,
        isReservedIdentifier: b,
        hooks: {
            "#": v,
            "*": y,
            u: k,
            U: k,
            L: k,
            R: k,
            0: x,
            1: x,
            2: x,
            3: x,
            4: x,
            5: x,
            6: x,
            7: x,
            8: x,
            9: x,
            token: function(e, t, r) {
                if ("variable" == r && "(" == e.peek() && (";" == t.prevToken || null == t.prevToken || "}" == t.prevToken) && w(e.current())) return "def"
            }
        },
        namespaceSeparator: "::",
        modeProps: {
            fold: ["brace", "include"]
        }
    }), S("text/x-java", {
        name: "clike",
        keywords: a("abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),
        types: a("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
        blockKeywords: a("catch class do else finally for if switch try while"),
        defKeywords: a("class interface enum @interface"),
        typeFirstDefinitions: !0,
        atoms: a("true false null"),
        number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
        hooks: {
            "@": function(e) {
                return !e.match("interface", !1) && (e.eatWhile(/[\w\$_]/), "meta")
            }
        },
        modeProps: {
            fold: ["brace", "import"]
        }
    }), S("text/x-csharp", {
        name: "clike",
        keywords: a("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
        types: a("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
        blockKeywords: a("catch class do else finally for foreach if struct switch try while"),
        defKeywords: a("class interface namespace struct var"),
        typeFirstDefinitions: !0,
        atoms: a("true false null"),
        hooks: {
            "@": function(e, t) {
                return e.eat('"') ? (t.tokenize = _, _(e, t)) : (e.eatWhile(/[\w\$_]/), "meta")
            }
        }
    }), S("text/x-scala", {
        name: "clike",
        keywords: a("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"),
        types: a("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
        multiLineStrings: !0,
        blockKeywords: a("catch class enum do else finally for forSome if match switch try while"),
        defKeywords: a("class enum def object package trait type val var"),
        atoms: a("true false null"),
        indentStatements: !1,
        indentSwitch: !1,
        isOperatorChar: /[+\-*&%=<>!?|\/#:@]/,
        hooks: {
            "@": function(e) {
                return e.eatWhile(/[\w\$_]/), "meta"
            },
            '"': function(e, t) {
                return !!e.match('""') && (t.tokenize = T, t.tokenize(e, t))
            },
            "'": function(e) {
                return e.eatWhile(/[\w\$_\xa1-\uffff]/), "atom"
            },
            "=": function(e, r) {
                var n = r.context;
                return !("}" != n.type || !n.align || !e.eat(">")) && (r.context = new t(n.indented, n.column, n.type, n.info, null, n.prev), "operator")
            },
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = L(1), t.tokenize(e, t))
            }
        },
        modeProps: {
            closeBrackets: {
                pairs: '()[]{}""',
                triples: '"'
            }
        }
    }), S("text/x-kotlin", {
        name: "clike",
        keywords: a("package as typealias class interface this super val operator var fun for is in This throw return annotation break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend actual expect setparam"),
        types: a("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy LazyThreadSafetyMode LongArray Nothing ShortArray Unit"),
        intendSwitch: !1,
        indentStatements: !1,
        multiLineStrings: !0,
        number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
        blockKeywords: a("catch class do else finally for if where try while enum"),
        defKeywords: a("class val var object interface fun"),
        atoms: a("true false null this"),
        hooks: {
            "@": function(e) {
                return e.eatWhile(/[\w\$_]/), "meta"
            },
            "*": function(e, t) {
                return "." == t.prevToken ? "variable" : "operator"
            },
            '"': function(e, t) {
                var r;
                return t.tokenize = (r = e.match('""'), function(e, t) {
                    for (var n, i = !1, o = !1; !e.eol();) {
                        if (!r && !i && e.match('"')) {
                            o = !0;
                            break
                        }
                        if (r && e.match('"""')) {
                            o = !0;
                            break
                        }
                        n = e.next(), !i && "$" == n && e.match("{") && e.skipTo("}"), i = !i && "\\" == n && !r
                    }
                    return !o && r || (t.tokenize = null), "string"
                }), t.tokenize(e, t)
            },
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = L(1), t.tokenize(e, t))
            },
            indent: function(e, t, r, n) {
                var i = r && r.charAt(0);
                return "}" != e.prevToken && ")" != e.prevToken || "" != r ? "operator" == e.prevToken && "}" != r && "}" != e.context.type || "variable" == e.prevToken && "." == i || ("}" == e.prevToken || ")" == e.prevToken) && "." == i ? 2 * n + t.indented : t.align && "}" == t.type ? t.indented + (e.context.type == (r || "").charAt(0) ? 0 : n) : void 0 : e.indented
            }
        },
        modeProps: {
            closeBrackets: {
                triples: '"'
            }
        }
    }), S(["x-shader/x-vertex", "x-shader/x-fragment"], {
        name: "clike",
        keywords: a("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),
        types: a("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),
        blockKeywords: a("for while do if else struct"),
        builtin: a("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
        atoms: a("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
        indentSwitch: !1,
        hooks: {
            "#": v
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    }), S("text/x-nesc", {
        name: "clike",
        keywords: a(s + " as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),
        types: h,
        blockKeywords: a(g),
        atoms: a("null true false"),
        hooks: {
            "#": v
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    }), S("text/x-objectivec", {
        name: "clike",
        keywords: a(s + " " + u),
        types: m,
        builtin: a(d),
        blockKeywords: a(g + " @synthesize @try @catch @finally @autoreleasepool @synchronized"),
        defKeywords: a("struct enum union @interface @implementation @protocol @class"),
        dontIndentStatements: /^@.*$/,
        typeFirstDefinitions: !0,
        atoms: a("YES NO NULL Nil nil true false nullptr"),
        isReservedIdentifier: b,
        hooks: {
            "#": v,
            "*": y
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    }), S("text/x-objectivec++", {
        name: "clike",
        keywords: a(s + " " + u + " " + c),
        types: m,
        builtin: a(d),
        blockKeywords: a(g + " @synthesize @try @catch @finally @autoreleasepool @synchronized class try catch"),
        defKeywords: a("struct enum union @interface @implementation @protocol @class class namespace"),
        dontIndentStatements: /^@.*$|^template$/,
        typeFirstDefinitions: !0,
        atoms: a("YES NO NULL Nil nil true false nullptr"),
        isReservedIdentifier: b,
        hooks: {
            "#": v,
            "*": y,
            u: k,
            U: k,
            L: k,
            R: k,
            0: x,
            1: x,
            2: x,
            3: x,
            4: x,
            5: x,
            6: x,
            7: x,
            8: x,
            9: x,
            token: function(e, t, r) {
                if ("variable" == r && "(" == e.peek() && (";" == t.prevToken || null == t.prevToken || "}" == t.prevToken) && w(e.current())) return "def"
            }
        },
        namespaceSeparator: "::",
        modeProps: {
            fold: ["brace", "include"]
        }
    }), S("text/x-squirrel", {
        name: "clike",
        keywords: a("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
        types: h,
        blockKeywords: a("case catch class else for foreach if switch try while"),
        defKeywords: a("function local class"),
        typeFirstDefinitions: !0,
        atoms: a("true false null"),
        hooks: {
            "#": v
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    });
    var M = null;
    S("text/x-ceylon", {
        name: "clike",
        keywords: a("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
        types: function(e) {
            var t = e.charAt(0);
            return t === t.toUpperCase() && t !== t.toLowerCase()
        },
        blockKeywords: a("case catch class dynamic else finally for function if interface module new object switch try while"),
        defKeywords: a("class dynamic function interface module object package value"),
        builtin: a("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),
        isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
        isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
        numberStart: /[\d#$]/,
        number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
        multiLineStrings: !0,
        typeFirstDefinitions: !0,
        atoms: a("true false null larger smaller equal empty finished"),
        indentSwitch: !1,
        styleDefs: !1,
        hooks: {
            "@": function(e) {
                return e.eatWhile(/[\w\$_]/), "meta"
            },
            '"': function(e, t) {
                return t.tokenize = function e(t) {
                    return function(r, n) {
                        for (var i, o = !1, a = !1; !r.eol();) {
                            if (!o && r.match('"') && ("single" == t || r.match('""'))) {
                                a = !0;
                                break
                            }
                            if (!o && r.match("``")) {
                                M = e(t), a = !0;
                                break
                            }
                            i = r.next(), o = "single" == t && !o && "\\" == i
                        }
                        return a && (n.tokenize = null), "string"
                    }
                }(e.match('""') ? "triple" : "single"), t.tokenize(e, t)
            },
            "`": function(e, t) {
                return !(!M || !e.match("`")) && (t.tokenize = M, M = null, t.tokenize(e, t))
            },
            "'": function(e) {
                return e.eatWhile(/[\w\$_\xa1-\uffff]/), "atom"
            },
            token: function(e, t, r) {
                if (("variable" == r || "type" == r) && "." == t.prevToken) return "variable-2"
            }
        },
        modeProps: {
            fold: ["brace", "import"],
            closeBrackets: {
                triples: '"'
            }
        }
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("coffeescript", (function(e, t) {
        function r(e) {
            return new RegExp("^((" + e.join(")|(") + "))\\b")
        }
        var n = /^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/,
            i = /^(?:[()\[\]{},:`=;]|\.\.?\.?)/,
            o = /^[_A-Za-z$][_A-Za-z$0-9]*/,
            a = /^@[_A-Za-z$][_A-Za-z$0-9]*/,
            l = r(["and", "or", "not", "is", "isnt", "in", "instanceof", "typeof"]),
            s = ["for", "while", "loop", "if", "unless", "else", "switch", "try", "catch", "finally", "class"],
            c = r(s.concat(["break", "by", "continue", "debugger", "delete", "do", "in", "of", "new", "return", "then", "this", "@", "throw", "when", "until", "extends"]));
        s = r(s);
        var u = /^('{3}|\"{3}|['\"])/,
            d = /^(\/{3}|\/)/,
            f = r(["Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no"]);

        function p(e, t) {
            if (e.sol()) {
                null === t.scope.align && (t.scope.align = !1);
                var r = t.scope.offset;
                if (e.eatSpace()) {
                    var s = e.indentation();
                    return s > r && "coffee" == t.scope.type ? "indent" : s < r ? "dedent" : null
                }
                r > 0 && v(e, t)
            }
            if (e.eatSpace()) return null;
            var p = e.peek();
            if (e.match("####")) return e.skipToEnd(), "comment";
            if (e.match("###")) return t.tokenize = m, t.tokenize(e, t);
            if ("#" === p) return e.skipToEnd(), "comment";
            if (e.match(/^-?[0-9\.]/, !1)) {
                var g = !1;
                if (e.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i) && (g = !0), e.match(/^-?\d+\.\d*/) && (g = !0), e.match(/^-?\.\d+/) && (g = !0), g) return "." == e.peek() && e.backUp(1), "number";
                var y = !1;
                if (e.match(/^-?0x[0-9a-f]+/i) && (y = !0), e.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/) && (y = !0), e.match(/^-?0(?![\dx])/i) && (y = !0), y) return "number"
            }
            if (e.match(u)) return t.tokenize = h(e.current(), !1, "string"), t.tokenize(e, t);
            if (e.match(d)) {
                if ("/" != e.current() || e.match(/^.*\//, !1)) return t.tokenize = h(e.current(), !0, "string-2"), t.tokenize(e, t);
                e.backUp(1)
            }
            return e.match(n) || e.match(l) ? "operator" : e.match(i) ? "punctuation" : e.match(f) ? "atom" : e.match(a) || t.prop && e.match(o) ? "property" : e.match(c) ? "keyword" : e.match(o) ? "variable" : (e.next(), "error")
        }

        function h(e, r, n) {
            return function(i, o) {
                for (; !i.eol();)
                    if (i.eatWhile(/[^'"\/\\]/), i.eat("\\")) {
                        if (i.next(), r && i.eol()) return n
                    } else {
                        if (i.match(e)) return o.tokenize = p, n;
                        i.eat(/['"\/]/)
                    } return r && (t.singleLineStringErrors ? n = "error" : o.tokenize = p), n
            }
        }

        function m(e, t) {
            for (; !e.eol();) {
                if (e.eatWhile(/[^#]/), e.match("###")) {
                    t.tokenize = p;
                    break
                }
                e.eatWhile("#")
            }
            return "comment"
        }

        function g(t, r, n) {
            n = n || "coffee";
            for (var i = 0, o = !1, a = null, l = r.scope; l; l = l.prev)
                if ("coffee" === l.type || "}" == l.type) {
                    i = l.offset + e.indentUnit;
                    break
                }
            "coffee" !== n ? (o = null, a = t.column() + t.current().length) : r.scope.align && (r.scope.align = !1), r.scope = {
                offset: i,
                type: n,
                prev: r.scope,
                align: o,
                alignOffset: a
            }
        }

        function v(e, t) {
            if (t.scope.prev) {
                if ("coffee" === t.scope.type) {
                    for (var r = e.indentation(), n = !1, i = t.scope; i; i = i.prev)
                        if (r === i.offset) {
                            n = !0;
                            break
                        } if (!n) return !0;
                    for (; t.scope.prev && t.scope.offset !== r;) t.scope = t.scope.prev;
                    return !1
                }
                return t.scope = t.scope.prev, !1
            }
        }
        return {
            startState: function(e) {
                return {
                    tokenize: p,
                    scope: {
                        offset: e || 0,
                        type: "coffee",
                        prev: null,
                        align: !1
                    },
                    prop: !1,
                    dedent: 0
                }
            },
            token: function(e, t) {
                var r = null === t.scope.align && t.scope;
                r && e.sol() && (r.align = !1);
                var n = function(e, t) {
                    var r = t.tokenize(e, t),
                        n = e.current();
                    "return" === n && (t.dedent = !0), (("->" === n || "=>" === n) && e.eol() || "indent" === r) && g(e, t);
                    var i = "[({".indexOf(n);
                    if (-1 !== i && g(e, t, "])}".slice(i, i + 1)), s.exec(n) && g(e, t), "then" == n && v(e, t), "dedent" === r && v(e, t)) return "error";
                    if (-1 !== (i = "])}".indexOf(n))) {
                        for (;
                            "coffee" == t.scope.type && t.scope.prev;) t.scope = t.scope.prev;
                        t.scope.type == n && (t.scope = t.scope.prev)
                    }
                    return t.dedent && e.eol() && ("coffee" == t.scope.type && t.scope.prev && (t.scope = t.scope.prev), t.dedent = !1), r
                }(e, t);
                return n && "comment" != n && (r && (r.align = !0), t.prop = "punctuation" == n && "." == e.current()), n
            },
            indent: function(e, t) {
                if (e.tokenize != p) return 0;
                var r = e.scope,
                    n = t && "])}".indexOf(t.charAt(0)) > -1;
                if (n)
                    for (;
                        "coffee" == r.type && r.prev;) r = r.prev;
                var i = n && r.type === t.charAt(0);
                return r.align ? r.alignOffset - (i ? 1 : 0) : (i ? r.prev : r).offset
            },
            lineComment: "#",
            fold: "indent"
        }
    })), e.defineMIME("application/vnd.coffeescript", "coffeescript"), e.defineMIME("text/x-coffeescript", "coffeescript"), e.defineMIME("text/coffeescript", "coffeescript")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        for (var t = {}, r = 0; r < e.length; ++r) t[e[r].toLowerCase()] = !0;
        return t
    }
    e.defineMode("css", (function(t, r) {
        var n = r.inline;
        r.propertyKeywords || (r = e.resolveMode("text/css"));
        var i, o, a = t.indentUnit,
            l = r.tokenHooks,
            s = r.documentTypes || {},
            c = r.mediaTypes || {},
            u = r.mediaFeatures || {},
            d = r.mediaValueKeywords || {},
            f = r.propertyKeywords || {},
            p = r.nonStandardPropertyKeywords || {},
            h = r.fontProperties || {},
            m = r.counterDescriptors || {},
            g = r.colorKeywords || {},
            v = r.valueKeywords || {},
            y = r.allowNested,
            b = r.lineComment,
            x = !0 === r.supportsAtComponent;

        function k(e, t) {
            return i = t, e
        }

        function w(e, t) {
            var r = e.next();
            if (l[r]) {
                var n = l[r](e, t);
                if (!1 !== n) return n
            }
            return "@" == r ? (e.eatWhile(/[\w\\\-]/), k("def", e.current())) : "=" == r || ("~" == r || "|" == r) && e.eat("=") ? k(null, "compare") : '"' == r || "'" == r ? (t.tokenize = _(r), t.tokenize(e, t)) : "#" == r ? (e.eatWhile(/[\w\\\-]/), k("atom", "hash")) : "!" == r ? (e.match(/^\s*\w*/), k("keyword", "important")) : /\d/.test(r) || "." == r && e.eat(/\d/) ? (e.eatWhile(/[\w.%]/), k("number", "unit")) : "-" !== r ? /[,+>*\/]/.test(r) ? k(null, "select-op") : "." == r && e.match(/^-?[_a-z][_a-z0-9-]*/i) ? k("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(r) ? k(null, r) : e.match(/[\w-.]+(?=\()/) ? (/^(url(-prefix)?|domain|regexp)$/.test(e.current().toLowerCase()) && (t.tokenize = C), k("variable callee", "variable")) : /[\w\\\-]/.test(r) ? (e.eatWhile(/[\w\\\-]/), k("property", "word")) : k(null, null) : /[\d.]/.test(e.peek()) ? (e.eatWhile(/[\w.%]/), k("number", "unit")) : e.match(/^-[\w\\\-]*/) ? (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? k("variable-2", "variable-definition") : k("variable-2", "variable")) : e.match(/^\w+-/) ? k("meta", "meta") : void 0
        }

        function _(e) {
            return function(t, r) {
                for (var n, i = !1; null != (n = t.next());) {
                    if (n == e && !i) {
                        ")" == e && t.backUp(1);
                        break
                    }
                    i = !i && "\\" == n
                }
                return (n == e || !i && ")" != e) && (r.tokenize = null), k("string", "string")
            }
        }

        function C(e, t) {
            return e.next(), e.match(/\s*[\"\')]/, !1) ? t.tokenize = null : t.tokenize = _(")"), k(null, "(")
        }

        function S(e, t, r) {
            this.type = e, this.indent = t, this.prev = r
        }

        function T(e, t, r, n) {
            return e.context = new S(r, t.indentation() + (!1 === n ? 0 : a), e.context), r
        }

        function L(e) {
            return e.context.prev && (e.context = e.context.prev), e.context.type
        }

        function M(e, t, r) {
            return D[r.context.type](e, t, r)
        }

        function A(e, t, r, n) {
            for (var i = n || 1; i > 0; i--) r.context = r.context.prev;
            return M(e, t, r)
        }

        function E(e) {
            var t = e.current().toLowerCase();
            o = v.hasOwnProperty(t) ? "atom" : g.hasOwnProperty(t) ? "keyword" : "variable"
        }
        var D = {
            top: function(e, t, r) {
                if ("{" == e) return T(r, t, "block");
                if ("}" == e && r.context.prev) return L(r);
                if (x && /@component/i.test(e)) return T(r, t, "atComponentBlock");
                if (/^@(-moz-)?document$/i.test(e)) return T(r, t, "documentTypes");
                if (/^@(media|supports|(-moz-)?document|import)$/i.test(e)) return T(r, t, "atBlock");
                if (/^@(font-face|counter-style)/i.test(e)) return r.stateArg = e, "restricted_atBlock_before";
                if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e)) return "keyframes";
                if (e && "@" == e.charAt(0)) return T(r, t, "at");
                if ("hash" == e) o = "builtin";
                else if ("word" == e) o = "tag";
                else {
                    if ("variable-definition" == e) return "maybeprop";
                    if ("interpolation" == e) return T(r, t, "interpolation");
                    if (":" == e) return "pseudo";
                    if (y && "(" == e) return T(r, t, "parens")
                }
                return r.context.type
            },
            block: function(e, t, r) {
                if ("word" == e) {
                    var n = t.current().toLowerCase();
                    return f.hasOwnProperty(n) ? (o = "property", "maybeprop") : p.hasOwnProperty(n) ? (o = "string-2", "maybeprop") : y ? (o = t.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag", "block") : (o += " error", "maybeprop")
                }
                return "meta" == e ? "block" : y || "hash" != e && "qualifier" != e ? D.top(e, t, r) : (o = "error", "block")
            },
            maybeprop: function(e, t, r) {
                return ":" == e ? T(r, t, "prop") : M(e, t, r)
            },
            prop: function(e, t, r) {
                if (";" == e) return L(r);
                if ("{" == e && y) return T(r, t, "propBlock");
                if ("}" == e || "{" == e) return A(e, t, r);
                if ("(" == e) return T(r, t, "parens");
                if ("hash" != e || /^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())) {
                    if ("word" == e) E(t);
                    else if ("interpolation" == e) return T(r, t, "interpolation")
                } else o += " error";
                return "prop"
            },
            propBlock: function(e, t, r) {
                return "}" == e ? L(r) : "word" == e ? (o = "property", "maybeprop") : r.context.type
            },
            parens: function(e, t, r) {
                return "{" == e || "}" == e ? A(e, t, r) : ")" == e ? L(r) : "(" == e ? T(r, t, "parens") : "interpolation" == e ? T(r, t, "interpolation") : ("word" == e && E(t), "parens")
            },
            pseudo: function(e, t, r) {
                return "meta" == e ? "pseudo" : "word" == e ? (o = "variable-3", r.context.type) : M(e, t, r)
            },
            documentTypes: function(e, t, r) {
                return "word" == e && s.hasOwnProperty(t.current()) ? (o = "tag", r.context.type) : D.atBlock(e, t, r)
            },
            atBlock: function(e, t, r) {
                if ("(" == e) return T(r, t, "atBlock_parens");
                if ("}" == e || ";" == e) return A(e, t, r);
                if ("{" == e) return L(r) && T(r, t, y ? "block" : "top");
                if ("interpolation" == e) return T(r, t, "interpolation");
                if ("word" == e) {
                    var n = t.current().toLowerCase();
                    o = "only" == n || "not" == n || "and" == n || "or" == n ? "keyword" : c.hasOwnProperty(n) ? "attribute" : u.hasOwnProperty(n) ? "property" : d.hasOwnProperty(n) ? "keyword" : f.hasOwnProperty(n) ? "property" : p.hasOwnProperty(n) ? "string-2" : v.hasOwnProperty(n) ? "atom" : g.hasOwnProperty(n) ? "keyword" : "error"
                }
                return r.context.type
            },
            atComponentBlock: function(e, t, r) {
                return "}" == e ? A(e, t, r) : "{" == e ? L(r) && T(r, t, y ? "block" : "top", !1) : ("word" == e && (o = "error"), r.context.type)
            },
            atBlock_parens: function(e, t, r) {
                return ")" == e ? L(r) : "{" == e || "}" == e ? A(e, t, r, 2) : D.atBlock(e, t, r)
            },
            restricted_atBlock_before: function(e, t, r) {
                return "{" == e ? T(r, t, "restricted_atBlock") : "word" == e && "@counter-style" == r.stateArg ? (o = "variable", "restricted_atBlock_before") : M(e, t, r)
            },
            restricted_atBlock: function(e, t, r) {
                return "}" == e ? (r.stateArg = null, L(r)) : "word" == e ? (o = "@font-face" == r.stateArg && !h.hasOwnProperty(t.current().toLowerCase()) || "@counter-style" == r.stateArg && !m.hasOwnProperty(t.current().toLowerCase()) ? "error" : "property", "maybeprop") : "restricted_atBlock"
            },
            keyframes: function(e, t, r) {
                return "word" == e ? (o = "variable", "keyframes") : "{" == e ? T(r, t, "top") : M(e, t, r)
            },
            at: function(e, t, r) {
                return ";" == e ? L(r) : "{" == e || "}" == e ? A(e, t, r) : ("word" == e ? o = "tag" : "hash" == e && (o = "builtin"), "at")
            },
            interpolation: function(e, t, r) {
                return "}" == e ? L(r) : "{" == e || ";" == e ? A(e, t, r) : ("word" == e ? o = "variable" : "variable" != e && "(" != e && ")" != e && (o = "error"), "interpolation")
            }
        };
        return {
            startState: function(e) {
                return {
                    tokenize: null,
                    state: n ? "block" : "top",
                    stateArg: null,
                    context: new S(n ? "block" : "top", e || 0, null)
                }
            },
            token: function(e, t) {
                if (!t.tokenize && e.eatSpace()) return null;
                var r = (t.tokenize || w)(e, t);
                return r && "object" == typeof r && (i = r[1], r = r[0]), o = r, "comment" != i && (t.state = D[t.state](i, e, t)), o
            },
            indent: function(e, t) {
                var r = e.context,
                    n = t && t.charAt(0),
                    i = r.indent;
                return "prop" != r.type || "}" != n && ")" != n || (r = r.prev), r.prev && ("}" != n || "block" != r.type && "top" != r.type && "interpolation" != r.type && "restricted_atBlock" != r.type ? (")" != n || "parens" != r.type && "atBlock_parens" != r.type) && ("{" != n || "at" != r.type && "atBlock" != r.type) || (i = Math.max(0, r.indent - a)) : i = (r = r.prev).indent), i
            },
            electricChars: "}",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            blockCommentContinue: " * ",
            lineComment: b,
            fold: "brace"
        }
    }));
    var r = ["domain", "regexp", "url", "url-prefix"],
        n = t(r),
        i = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
        o = t(i),
        a = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "orientation", "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio", "pointer", "any-pointer", "hover", "any-hover"],
        l = t(a),
        s = ["landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover", "interlace", "progressive"],
        c = t(s),
        u = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "justify-items", "justify-self", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "mix-blend-mode", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"],
        d = t(u),
        f = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"],
        p = t(f),
        h = t(["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"]),
        m = t(["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"]),
        g = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
        v = t(g),
        y = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "unset", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"],
        b = t(y),
        x = r.concat(i).concat(a).concat(s).concat(u).concat(f).concat(g).concat(y);

    function k(e, t) {
        for (var r, n = !1; null != (r = e.next());) {
            if (n && "/" == r) {
                t.tokenize = null;
                break
            }
            n = "*" == r
        }
        return ["comment", "comment"]
    }
    e.registerHelper("hintWords", "css", x), e.defineMIME("text/css", {
        documentTypes: n,
        mediaTypes: o,
        mediaFeatures: l,
        mediaValueKeywords: c,
        propertyKeywords: d,
        nonStandardPropertyKeywords: p,
        fontProperties: h,
        counterDescriptors: m,
        colorKeywords: v,
        valueKeywords: b,
        tokenHooks: {
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = k, k(e, t))
            }
        },
        name: "css"
    }), e.defineMIME("text/x-scss", {
        mediaTypes: o,
        mediaFeatures: l,
        mediaValueKeywords: c,
        propertyKeywords: d,
        nonStandardPropertyKeywords: p,
        colorKeywords: v,
        valueKeywords: b,
        fontProperties: h,
        allowNested: !0,
        lineComment: "//",
        tokenHooks: {
            "/": function(e, t) {
                return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = k, k(e, t)) : ["operator", "operator"]
            },
            ":": function(e) {
                return !!e.match(/\s*\{/, !1) && [null, null]
            },
            $: function(e) {
                return e.match(/^[\w-]+/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]
            },
            "#": function(e) {
                return !!e.eat("{") && [null, "interpolation"]
            }
        },
        name: "css",
        helperType: "scss"
    }), e.defineMIME("text/x-less", {
        mediaTypes: o,
        mediaFeatures: l,
        mediaValueKeywords: c,
        propertyKeywords: d,
        nonStandardPropertyKeywords: p,
        colorKeywords: v,
        valueKeywords: b,
        fontProperties: h,
        allowNested: !0,
        lineComment: "//",
        tokenHooks: {
            "/": function(e, t) {
                return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = k, k(e, t)) : ["operator", "operator"]
            },
            "@": function(e) {
                return e.eat("{") ? [null, "interpolation"] : !e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, !1) && (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"])
            },
            "&": function() {
                return ["atom", "atom"]
            }
        },
        name: "css",
        helperType: "less"
    }), e.defineMIME("text/x-gss", {
        documentTypes: n,
        mediaTypes: o,
        mediaFeatures: l,
        propertyKeywords: d,
        nonStandardPropertyKeywords: p,
        fontProperties: h,
        counterDescriptors: m,
        colorKeywords: v,
        valueKeywords: b,
        supportsAtComponent: !0,
        tokenHooks: {
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = k, k(e, t))
            }
        },
        name: "css",
        helperType: "gss"
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript"), require("../css/css")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    var t = {
        script: [
            ["lang", /(javascript|babel)/i, "javascript"],
            ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
            ["type", /./, "text/plain"],
            [null, null, "javascript"]
        ],
        style: [
            ["lang", /^css$/i, "css"],
            ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
            ["type", /./, "text/plain"],
            [null, null, "css"]
        ]
    };
    var r = {};

    function n(e, t) {
        var n = e.match(function(e) {
            var t = r[e];
            return t || (r[e] = new RegExp("\\s+" + e + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*"))
        }(t));
        return n ? /^\s*(.*?)\s*$/.exec(n[2])[1] : ""
    }

    function i(e, t) {
        return new RegExp((t ? "^" : "") + "</s*" + e + "s*>", "i")
    }

    function o(e, t) {
        for (var r in e)
            for (var n = t[r] || (t[r] = []), i = e[r], o = i.length - 1; o >= 0; o--) n.unshift(i[o])
    }
    e.defineMode("htmlmixed", (function(r, a) {
        var l = e.getMode(r, {
                name: "xml",
                htmlMode: !0,
                multilineTagIndentFactor: a.multilineTagIndentFactor,
                multilineTagIndentPastTag: a.multilineTagIndentPastTag
            }),
            s = {},
            c = a && a.tags,
            u = a && a.scriptTypes;
        if (o(t, s), c && o(c, s), u)
            for (var d = u.length - 1; d >= 0; d--) s.script.unshift(["type", u[d].matches, u[d].mode]);

        function f(t, o) {
            var a, c = l.token(t, o.htmlState),
                u = /\btag\b/.test(c);
            if (u && !/[<>\s\/]/.test(t.current()) && (a = o.htmlState.tagName && o.htmlState.tagName.toLowerCase()) && s.hasOwnProperty(a)) o.inTag = a + " ";
            else if (o.inTag && u && />$/.test(t.current())) {
                var d = /^([\S]+) (.*)/.exec(o.inTag);
                o.inTag = null;
                var p = ">" == t.current() && function(e, t) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            if (!i[0] || i[1].test(n(t, i[0]))) return i[2]
                        }
                    }(s[d[1]], d[2]),
                    h = e.getMode(r, p),
                    m = i(d[1], !0),
                    g = i(d[1], !1);
                o.token = function(e, t) {
                    return e.match(m, !1) ? (t.token = f, t.localState = t.localMode = null, null) : function(e, t, r) {
                        var n = e.current(),
                            i = n.search(t);
                        return i > -1 ? e.backUp(n.length - i) : n.match(/<\/?$/) && (e.backUp(n.length), e.match(t, !1) || e.match(n)), r
                    }(e, g, t.localMode.token(e, t.localState))
                }, o.localMode = h, o.localState = e.startState(h, l.indent(o.htmlState, "", ""))
            } else o.inTag && (o.inTag += t.current(), t.eol() && (o.inTag += " "));
            return c
        }
        return {
            startState: function() {
                return {
                    token: f,
                    inTag: null,
                    localMode: null,
                    localState: null,
                    htmlState: e.startState(l)
                }
            },
            copyState: function(t) {
                var r;
                return t.localState && (r = e.copyState(t.localMode, t.localState)), {
                    token: t.token,
                    inTag: t.inTag,
                    localMode: t.localMode,
                    localState: r,
                    htmlState: e.copyState(l, t.htmlState)
                }
            },
            token: function(e, t) {
                return t.token(e, t)
            },
            indent: function(t, r, n) {
                return !t.localMode || /^\s*<\//.test(r) ? l.indent(t.htmlState, r, n) : t.localMode.indent ? t.localMode.indent(t.localState, r, n) : e.Pass
            },
            innerMode: function(e) {
                return {
                    state: e.localState || e.htmlState,
                    mode: e.localMode || l
                }
            }
        }
    }), "xml", "javascript", "css"), e.defineMIME("text/html", "htmlmixed")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("javascript", (function(t, r) {
        var n, i, o = t.indentUnit,
            a = r.statementIndent,
            l = r.jsonld,
            s = r.json || l,
            c = r.typescript,
            u = r.wordCharacters || /[\w$\xa1-\uffff]/,
            d = function() {
                function e(e) {
                    return {
                        type: e,
                        style: "keyword"
                    }
                }
                var t = e("keyword a"),
                    r = e("keyword b"),
                    n = e("keyword c"),
                    i = e("keyword d"),
                    o = e("operator"),
                    a = {
                        type: "atom",
                        style: "atom"
                    };
                return {
                    if: e("if"),
                    while: t,
                    with: t,
                    else: r,
                    do: r,
                    try: r,
                    finally: r,
                    return: i,
                    break: i,
                    continue: i,
                    new: e("new"),
                    delete: n,
                    void: n,
                    throw: n,
                    debugger: e("debugger"),
                    var: e("var"),
                    const: e("var"),
                    let: e("var"),
                    function: e("function"),
                    catch: e("catch"),
                    for: e("for"),
                    switch: e("switch"),
                    case: e("case"),
                    default: e("default"),
                    in: o,
                    typeof: o,
                    instanceof: o,
                    true: a,
                    false: a,
                    null: a,
                    undefined: a,
                    NaN: a,
                    Infinity: a,
                    this: e("this"),
                    class: e("class"),
                    super: e("atom"),
                    yield: n,
                    export: e("export"),
                    import: e("import"),
                    extends: n,
                    await: n
                }
            }(),
            f = /[+\-*&%=<>!?|~^@]/,
            p = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

        function h(e, t, r) {
            return n = e, i = r, t
        }

        function m(e, t) {
            var r, n = e.next();
            if ('"' == n || "'" == n) return t.tokenize = (r = n, function(e, t) {
                var n, i = !1;
                if (l && "@" == e.peek() && e.match(p)) return t.tokenize = m, h("jsonld-keyword", "meta");
                for (; null != (n = e.next()) && (n != r || i);) i = !i && "\\" == n;
                return i || (t.tokenize = m), h("string", "string")
            }), t.tokenize(e, t);
            if ("." == n && e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) return h("number", "number");
            if ("." == n && e.match("..")) return h("spread", "meta");
            if (/[\[\]{}\(\),;\:\.]/.test(n)) return h(n);
            if ("=" == n && e.eat(">")) return h("=>", "operator");
            if ("0" == n && e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) return h("number", "number");
            if (/\d/.test(n)) return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), h("number", "number");
            if ("/" == n) return e.eat("*") ? (t.tokenize = g, g(e, t)) : e.eat("/") ? (e.skipToEnd(), h("comment", "comment")) : Ve(e, t, 1) ? (function(e) {
                for (var t, r = !1, n = !1; null != (t = e.next());) {
                    if (!r) {
                        if ("/" == t && !n) return;
                        "[" == t ? n = !0 : n && "]" == t && (n = !1)
                    }
                    r = !r && "\\" == t
                }
            }(e), e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), h("regexp", "string-2")) : (e.eat("="), h("operator", "operator", e.current()));
            if ("`" == n) return t.tokenize = v, v(e, t);
            if ("#" == n) return e.skipToEnd(), h("error", "error");
            if ("<" == n && e.match("!--") || "-" == n && e.match("->")) return e.skipToEnd(), h("comment", "comment");
            if (f.test(n)) return ">" == n && t.lexical && ">" == t.lexical.type || (e.eat("=") ? "!" != n && "=" != n || e.eat("=") : /[<>*+\-]/.test(n) && (e.eat(n), ">" == n && e.eat(n))), h("operator", "operator", e.current());
            if (u.test(n)) {
                e.eatWhile(u);
                var i = e.current();
                if ("." != t.lastType) {
                    if (d.propertyIsEnumerable(i)) {
                        var o = d[i];
                        return h(o.type, o.style, i)
                    }
                    if ("async" == i && e.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/, !1)) return h("async", "keyword", i)
                }
                return h("variable", "variable", i)
            }
        }

        function g(e, t) {
            for (var r, n = !1; r = e.next();) {
                if ("/" == r && n) {
                    t.tokenize = m;
                    break
                }
                n = "*" == r
            }
            return h("comment", "comment")
        }

        function v(e, t) {
            for (var r, n = !1; null != (r = e.next());) {
                if (!n && ("`" == r || "$" == r && e.eat("{"))) {
                    t.tokenize = m;
                    break
                }
                n = !n && "\\" == r
            }
            return h("quasi", "string-2", e.current())
        }

        function y(e, t) {
            t.fatArrowAt && (t.fatArrowAt = null);
            var r = e.string.indexOf("=>", e.start);
            if (!(r < 0)) {
                if (c) {
                    var n = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, r));
                    n && (r = n.index)
                }
                for (var i = 0, o = !1, a = r - 1; a >= 0; --a) {
                    var l = e.string.charAt(a),
                        s = "([{}])".indexOf(l);
                    if (s >= 0 && s < 3) {
                        if (!i) {
                            ++a;
                            break
                        }
                        if (0 == --i) {
                            "(" == l && (o = !0);
                            break
                        }
                    } else if (s >= 3 && s < 6) ++i;
                    else if (u.test(l)) o = !0;
                    else if (/["'\/`]/.test(l))
                        for (;; --a) {
                            if (0 == a) return;
                            if (e.string.charAt(a - 1) == l && "\\" != e.string.charAt(a - 2)) {
                                a--;
                                break
                            }
                        } else if (o && !i) {
                            ++a;
                            break
                        }
                }
                o && !i && (t.fatArrowAt = a)
            }
        }
        var b = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0,
            this: !0,
            "jsonld-keyword": !0
        };

        function x(e, t, r, n, i, o) {
            this.indented = e, this.column = t, this.type = r, this.prev = i, this.info = o, null != n && (this.align = n)
        }

        function k(e, t) {
            for (var r = e.localVars; r; r = r.next)
                if (r.name == t) return !0;
            for (var n = e.context; n; n = n.prev)
                for (r = n.vars; r; r = r.next)
                    if (r.name == t) return !0
        }
        var w = {
            state: null,
            column: null,
            marked: null,
            cc: null
        };

        function _() {
            for (var e = arguments.length - 1; e >= 0; e--) w.cc.push(arguments[e])
        }

        function C() {
            return _.apply(null, arguments), !0
        }

        function S(e, t) {
            for (var r = t; r; r = r.next)
                if (r.name == e) return !0;
            return !1
        }

        function T(e) {
            var t = w.state;
            if (w.marked = "def", t.context)
                if ("var" == t.lexical.info && t.context && t.context.block) {
                    var n = function e(t, r) {
                        if (r) {
                            if (r.block) {
                                var n = e(t, r.prev);
                                return n ? n == r.prev ? r : new M(n, r.vars, !0) : null
                            }
                            return S(t, r.vars) ? r : new M(r.prev, new A(t, r.vars), !1)
                        }
                        return null
                    }(e, t.context);
                    if (null != n) return void(t.context = n)
                } else if (!S(e, t.localVars)) return void(t.localVars = new A(e, t.localVars));
            r.globalVars && !S(e, t.globalVars) && (t.globalVars = new A(e, t.globalVars))
        }

        function L(e) {
            return "public" == e || "private" == e || "protected" == e || "abstract" == e || "readonly" == e
        }

        function M(e, t, r) {
            this.prev = e, this.vars = t, this.block = r
        }

        function A(e, t) {
            this.name = e, this.next = t
        }
        var E = new A("this", new A("arguments", null));

        function D() {
            w.state.context = new M(w.state.context, w.state.localVars, !1), w.state.localVars = E
        }

        function z() {
            w.state.context = new M(w.state.context, w.state.localVars, !0), w.state.localVars = null
        }

        function N() {
            w.state.localVars = w.state.context.vars, w.state.context = w.state.context.prev
        }

        function O(e, t) {
            var r = function() {
                var r = w.state,
                    n = r.indented;
                if ("stat" == r.lexical.type) n = r.lexical.indented;
                else
                    for (var i = r.lexical; i && ")" == i.type && i.align; i = i.prev) n = i.indented;
                r.lexical = new x(n, w.stream.column(), e, null, r.lexical, t)
            };
            return r.lex = !0, r
        }

        function F() {
            var e = w.state;
            e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
        }

        function q(e) {
            return function t(r) {
                return r == e ? C() : ";" == e || "}" == r || ")" == r || "]" == r ? _() : C(t)
            }
        }

        function I(e, t) {
            return "var" == e ? C(O("vardef", t), ye, q(";"), F) : "keyword a" == e ? C(O("form"), W, I, F) : "keyword b" == e ? C(O("form"), I, F) : "keyword d" == e ? w.stream.match(/^\s*$/, !1) ? C() : C(O("stat"), H, q(";"), F) : "debugger" == e ? C(q(";")) : "{" == e ? C(O("}"), z, oe, F, N) : ";" == e ? C() : "if" == e ? ("else" == w.state.lexical.info && w.state.cc[w.state.cc.length - 1] == F && w.state.cc.pop()(), C(O("form"), W, I, F, Ce)) : "function" == e ? C(Me) : "for" == e ? C(O("form"), Se, I, F) : "class" == e || c && "interface" == t ? (w.marked = "keyword", C(O("form", "class" == e ? e : t), Ne, F)) : "variable" == e ? c && "declare" == t ? (w.marked = "keyword", C(I)) : c && ("module" == t || "enum" == t || "type" == t) && w.stream.match(/^\s*\w/, !1) ? (w.marked = "keyword", "enum" == t ? C(Ue) : "type" == t ? C(Ee, q("operator"), ue, q(";")) : C(O("form"), be, q("{"), O("}"), oe, F, F)) : c && "namespace" == t ? (w.marked = "keyword", C(O("form"), R, I, F)) : c && "abstract" == t ? (w.marked = "keyword", C(I)) : C(O("stat"), Q) : "switch" == e ? C(O("form"), W, q("{"), O("}", "switch"), z, oe, F, F, N) : "case" == e ? C(R, q(":")) : "default" == e ? C(q(":")) : "catch" == e ? C(O("form"), D, P, I, F, N) : "export" == e ? C(O("stat"), Ie, F) : "import" == e ? C(O("stat"), Re, F) : "async" == e ? C(I) : "@" == t ? C(R, I) : _(O("stat"), R, q(";"), F)
        }

        function P(e) {
            if ("(" == e) return C(De, q(")"))
        }

        function R(e, t) {
            return B(e, t, !1)
        }

        function $(e, t) {
            return B(e, t, !0)
        }

        function W(e) {
            return "(" != e ? _() : C(O(")"), R, q(")"), F)
        }

        function B(e, t, r) {
            if (w.state.fatArrowAt == w.stream.start) {
                var n = r ? Z : K;
                if ("(" == e) return C(D, O(")"), ne(De, ")"), F, q("=>"), n, N);
                if ("variable" == e) return _(D, be, q("=>"), n, N)
            }
            var i = r ? U : j;
            return b.hasOwnProperty(e) ? C(i) : "function" == e ? C(Me, i) : "class" == e || c && "interface" == t ? (w.marked = "keyword", C(O("form"), ze, F)) : "keyword c" == e || "async" == e ? C(r ? $ : R) : "(" == e ? C(O(")"), H, q(")"), F, i) : "operator" == e || "spread" == e ? C(r ? $ : R) : "[" == e ? C(O("]"), je, F, i) : "{" == e ? ie(ee, "}", null, i) : "quasi" == e ? _(G, i) : "new" == e ? C(function(e) {
                return function(t) {
                    return "." == t ? C(e ? Y : X) : "variable" == t && c ? C(me, e ? U : j) : _(e ? $ : R)
                }
            }(r)) : "import" == e ? C(R) : C()
        }

        function H(e) {
            return e.match(/[;\}\)\],]/) ? _() : _(R)
        }

        function j(e, t) {
            return "," == e ? C(R) : U(e, t, !1)
        }

        function U(e, t, r) {
            var n = 0 == r ? j : U,
                i = 0 == r ? R : $;
            return "=>" == e ? C(D, r ? Z : K, N) : "operator" == e ? /\+\+|--/.test(t) || c && "!" == t ? C(n) : c && "<" == t && w.stream.match(/^([^>]|<.*?>)*>\s*\(/, !1) ? C(O(">"), ne(ue, ">"), F, n) : "?" == t ? C(R, q(":"), i) : C(i) : "quasi" == e ? _(G, n) : ";" != e ? "(" == e ? ie($, ")", "call", n) : "." == e ? C(J, n) : "[" == e ? C(O("]"), H, q("]"), F, n) : c && "as" == t ? (w.marked = "keyword", C(ue, n)) : "regexp" == e ? (w.state.lastType = w.marked = "operator", w.stream.backUp(w.stream.pos - w.stream.start - 1), C(i)) : void 0 : void 0
        }

        function G(e, t) {
            return "quasi" != e ? _() : "${" != t.slice(t.length - 2) ? C(G) : C(R, V)
        }

        function V(e) {
            if ("}" == e) return w.marked = "string-2", w.state.tokenize = v, C(G)
        }

        function K(e) {
            return y(w.stream, w.state), _("{" == e ? I : R)
        }

        function Z(e) {
            return y(w.stream, w.state), _("{" == e ? I : $)
        }

        function X(e, t) {
            if ("target" == t) return w.marked = "keyword", C(j)
        }

        function Y(e, t) {
            if ("target" == t) return w.marked = "keyword", C(U)
        }

        function Q(e) {
            return ":" == e ? C(F, I) : _(j, q(";"), F)
        }

        function J(e) {
            if ("variable" == e) return w.marked = "property", C()
        }

        function ee(e, t) {
            return "async" == e ? (w.marked = "property", C(ee)) : "variable" == e || "keyword" == w.style ? (w.marked = "property", "get" == t || "set" == t ? C(te) : (c && w.state.fatArrowAt == w.stream.start && (r = w.stream.match(/^\s*:\s*/, !1)) && (w.state.fatArrowAt = w.stream.pos + r[0].length), C(re))) : "number" == e || "string" == e ? (w.marked = l ? "property" : w.style + " property", C(re)) : "jsonld-keyword" == e ? C(re) : c && L(t) ? (w.marked = "keyword", C(ee)) : "[" == e ? C(R, ae, q("]"), re) : "spread" == e ? C($, re) : "*" == t ? (w.marked = "keyword", C(ee)) : ":" == e ? _(re) : void 0;
            var r
        }

        function te(e) {
            return "variable" != e ? _(re) : (w.marked = "property", C(Me))
        }

        function re(e) {
            return ":" == e ? C($) : "(" == e ? _(Me) : void 0
        }

        function ne(e, t, r) {
            function n(i, o) {
                if (r ? r.indexOf(i) > -1 : "," == i) {
                    var a = w.state.lexical;
                    return "call" == a.info && (a.pos = (a.pos || 0) + 1), C((function(r, n) {
                        return r == t || n == t ? _() : _(e)
                    }), n)
                }
                return i == t || o == t ? C() : r && r.indexOf(";") > -1 ? _(e) : C(q(t))
            }
            return function(r, i) {
                return r == t || i == t ? C() : _(e, n)
            }
        }

        function ie(e, t, r) {
            for (var n = 3; n < arguments.length; n++) w.cc.push(arguments[n]);
            return C(O(t, r), ne(e, t), F)
        }

        function oe(e) {
            return "}" == e ? C() : _(I, oe)
        }

        function ae(e, t) {
            if (c) {
                if (":" == e) return C(ue);
                if ("?" == t) return C(ae)
            }
        }

        function le(e, t) {
            if (c && (":" == e || "in" == t)) return C(ue)
        }

        function se(e) {
            if (c && ":" == e) return w.stream.match(/^\s*\w+\s+is\b/, !1) ? C(R, ce, ue) : C(ue)
        }

        function ce(e, t) {
            if ("is" == t) return w.marked = "keyword", C()
        }

        function ue(e, t) {
            return "keyof" == t || "typeof" == t || "infer" == t ? (w.marked = "keyword", C("typeof" == t ? $ : ue)) : "variable" == e || "void" == t ? (w.marked = "type", C(he)) : "|" == t || "&" == t ? C(ue) : "string" == e || "number" == e || "atom" == e ? C(he) : "[" == e ? C(O("]"), ne(ue, "]", ","), F, he) : "{" == e ? C(O("}"), ne(fe, "}", ",;"), F, he) : "(" == e ? C(ne(pe, ")"), de, he) : "<" == e ? C(ne(ue, ">"), ue) : void 0
        }

        function de(e) {
            if ("=>" == e) return C(ue)
        }

        function fe(e, t) {
            return "variable" == e || "keyword" == w.style ? (w.marked = "property", C(fe)) : "?" == t || "number" == e || "string" == e ? C(fe) : ":" == e ? C(ue) : "[" == e ? C(q("variable"), le, q("]"), fe) : "(" == e ? _(Ae, fe) : void 0
        }

        function pe(e, t) {
            return "variable" == e && w.stream.match(/^\s*[?:]/, !1) || "?" == t ? C(pe) : ":" == e ? C(ue) : "spread" == e ? C(pe) : _(ue)
        }

        function he(e, t) {
            return "<" == t ? C(O(">"), ne(ue, ">"), F, he) : "|" == t || "." == e || "&" == t ? C(ue) : "[" == e ? C(ue, q("]"), he) : "extends" == t || "implements" == t ? (w.marked = "keyword", C(ue)) : "?" == t ? C(ue, q(":"), ue) : void 0
        }

        function me(e, t) {
            if ("<" == t) return C(O(">"), ne(ue, ">"), F, he)
        }

        function ge() {
            return _(ue, ve)
        }

        function ve(e, t) {
            if ("=" == t) return C(ue)
        }

        function ye(e, t) {
            return "enum" == t ? (w.marked = "keyword", C(Ue)) : _(be, ae, we, _e)
        }

        function be(e, t) {
            return c && L(t) ? (w.marked = "keyword", C(be)) : "variable" == e ? (T(t), C()) : "spread" == e ? C(be) : "[" == e ? ie(ke, "]") : "{" == e ? ie(xe, "}") : void 0
        }

        function xe(e, t) {
            return "variable" != e || w.stream.match(/^\s*:/, !1) ? ("variable" == e && (w.marked = "property"), "spread" == e ? C(be) : "}" == e ? _() : "[" == e ? C(R, q("]"), q(":"), xe) : C(q(":"), be, we)) : (T(t), C(we))
        }

        function ke() {
            return _(be, we)
        }

        function we(e, t) {
            if ("=" == t) return C($)
        }

        function _e(e) {
            if ("," == e) return C(ye)
        }

        function Ce(e, t) {
            if ("keyword b" == e && "else" == t) return C(O("form", "else"), I, F)
        }

        function Se(e, t) {
            return "await" == t ? C(Se) : "(" == e ? C(O(")"), Te, F) : void 0
        }

        function Te(e) {
            return "var" == e ? C(ye, Le) : "variable" == e ? C(Le) : _(Le)
        }

        function Le(e, t) {
            return ")" == e ? C() : ";" == e ? C(Le) : "in" == t || "of" == t ? (w.marked = "keyword", C(R, Le)) : _(R, Le)
        }

        function Me(e, t) {
            return "*" == t ? (w.marked = "keyword", C(Me)) : "variable" == e ? (T(t), C(Me)) : "(" == e ? C(D, O(")"), ne(De, ")"), F, se, I, N) : c && "<" == t ? C(O(">"), ne(ge, ">"), F, Me) : void 0
        }

        function Ae(e, t) {
            return "*" == t ? (w.marked = "keyword", C(Ae)) : "variable" == e ? (T(t), C(Ae)) : "(" == e ? C(D, O(")"), ne(De, ")"), F, se, N) : c && "<" == t ? C(O(">"), ne(ge, ">"), F, Ae) : void 0
        }

        function Ee(e, t) {
            return "keyword" == e || "variable" == e ? (w.marked = "type", C(Ee)) : "<" == t ? C(O(">"), ne(ge, ">"), F) : void 0
        }

        function De(e, t) {
            return "@" == t && C(R, De), "spread" == e ? C(De) : c && L(t) ? (w.marked = "keyword", C(De)) : c && "this" == e ? C(ae, we) : _(be, ae, we)
        }

        function ze(e, t) {
            return "variable" == e ? Ne(e, t) : Oe(e, t)
        }

        function Ne(e, t) {
            if ("variable" == e) return T(t), C(Oe)
        }

        function Oe(e, t) {
            return "<" == t ? C(O(">"), ne(ge, ">"), F, Oe) : "extends" == t || "implements" == t || c && "," == e ? ("implements" == t && (w.marked = "keyword"), C(c ? ue : R, Oe)) : "{" == e ? C(O("}"), Fe, F) : void 0
        }

        function Fe(e, t) {
            return "async" == e || "variable" == e && ("static" == t || "get" == t || "set" == t || c && L(t)) && w.stream.match(/^\s+[\w$\xa1-\uffff]/, !1) ? (w.marked = "keyword", C(Fe)) : "variable" == e || "keyword" == w.style ? (w.marked = "property", C(c ? qe : Me, Fe)) : "number" == e || "string" == e ? C(c ? qe : Me, Fe) : "[" == e ? C(R, ae, q("]"), c ? qe : Me, Fe) : "*" == t ? (w.marked = "keyword", C(Fe)) : c && "(" == e ? _(Ae, Fe) : ";" == e || "," == e ? C(Fe) : "}" == e ? C() : "@" == t ? C(R, Fe) : void 0
        }

        function qe(e, t) {
            if ("?" == t) return C(qe);
            if (":" == e) return C(ue, we);
            if ("=" == t) return C($);
            var r = w.state.lexical.prev;
            return _(r && "interface" == r.info ? Ae : Me)
        }

        function Ie(e, t) {
            return "*" == t ? (w.marked = "keyword", C(He, q(";"))) : "default" == t ? (w.marked = "keyword", C(R, q(";"))) : "{" == e ? C(ne(Pe, "}"), He, q(";")) : _(I)
        }

        function Pe(e, t) {
            return "as" == t ? (w.marked = "keyword", C(q("variable"))) : "variable" == e ? _($, Pe) : void 0
        }

        function Re(e) {
            return "string" == e ? C() : "(" == e ? _(R) : _($e, We, He)
        }

        function $e(e, t) {
            return "{" == e ? ie($e, "}") : ("variable" == e && T(t), "*" == t && (w.marked = "keyword"), C(Be))
        }

        function We(e) {
            if ("," == e) return C($e, We)
        }

        function Be(e, t) {
            if ("as" == t) return w.marked = "keyword", C($e)
        }

        function He(e, t) {
            if ("from" == t) return w.marked = "keyword", C(R)
        }

        function je(e) {
            return "]" == e ? C() : _(ne($, "]"))
        }

        function Ue() {
            return _(O("form"), be, q("{"), O("}"), ne(Ge, "}"), F, F)
        }

        function Ge() {
            return _(be, we)
        }

        function Ve(e, t, r) {
            return t.tokenize == m && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType) || "quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (r || 0)))
        }
        return N.lex = !0, F.lex = !0, {
            startState: function(e) {
                var t = {
                    tokenize: m,
                    lastType: "sof",
                    cc: [],
                    lexical: new x((e || 0) - o, 0, "block", !1),
                    localVars: r.localVars,
                    context: r.localVars && new M(null, null, !1),
                    indented: e || 0
                };
                return r.globalVars && "object" == typeof r.globalVars && (t.globalVars = r.globalVars), t
            },
            token: function(e, t) {
                if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation(), y(e, t)), t.tokenize != g && e.eatSpace()) return null;
                var r = t.tokenize(e, t);
                return "comment" == n ? r : (t.lastType = "operator" != n || "++" != i && "--" != i ? n : "incdec", function(e, t, r, n, i) {
                    var o = e.cc;
                    for (w.state = e, w.stream = i, w.marked = null, w.cc = o, w.style = t, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);;) {
                        if ((o.length ? o.pop() : s ? R : I)(r, n)) {
                            for (; o.length && o[o.length - 1].lex;) o.pop()();
                            return w.marked ? w.marked : "variable" == r && k(e, n) ? "variable-2" : t
                        }
                    }
                }(t, r, n, i, e))
            },
            indent: function(t, n) {
                if (t.tokenize == g) return e.Pass;
                if (t.tokenize != m) return 0;
                var i, l = n && n.charAt(0),
                    s = t.lexical;
                if (!/^\s*else\b/.test(n))
                    for (var c = t.cc.length - 1; c >= 0; --c) {
                        var u = t.cc[c];
                        if (u == F) s = s.prev;
                        else if (u != Ce) break
                    }
                for (;
                    ("stat" == s.type || "form" == s.type) && ("}" == l || (i = t.cc[t.cc.length - 1]) && (i == j || i == U) && !/^[,\.=+\-*:?[\(]/.test(n));) s = s.prev;
                a && ")" == s.type && "stat" == s.prev.type && (s = s.prev);
                var d = s.type,
                    p = l == d;
                return "vardef" == d ? s.indented + ("operator" == t.lastType || "," == t.lastType ? s.info.length + 1 : 0) : "form" == d && "{" == l ? s.indented : "form" == d ? s.indented + o : "stat" == d ? s.indented + (function(e, t) {
                    return "operator" == e.lastType || "," == e.lastType || f.test(t.charAt(0)) || /[,.]/.test(t.charAt(0))
                }(t, n) ? a || o : 0) : "switch" != s.info || p || 0 == r.doubleIndentSwitch ? s.align ? s.column + (p ? 0 : 1) : s.indented + (p ? 0 : o) : s.indented + (/^(?:case|default)\b/.test(n) ? o : 2 * o)
            },
            electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
            blockCommentStart: s ? null : "/*",
            blockCommentEnd: s ? null : "*/",
            blockCommentContinue: s ? null : " * ",
            lineComment: s ? null : "//",
            fold: "brace",
            closeBrackets: "()[]{}''\"\"``",
            helperType: s ? "json" : "javascript",
            jsonldMode: l,
            jsonMode: s,
            expressionAllowed: Ve,
            skipExpression: function(e) {
                var t = e.cc[e.cc.length - 1];
                t != R && t != $ || e.cc.pop()
            }
        }
    })), e.registerHelper("wordChars", "javascript", /[\w$]/), e.defineMIME("text/javascript", "javascript"), e.defineMIME("text/ecmascript", "javascript"), e.defineMIME("application/javascript", "javascript"), e.defineMIME("application/x-javascript", "javascript"), e.defineMIME("application/ecmascript", "javascript"), e.defineMIME("application/json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/x-json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: !0
    }), e.defineMIME("text/typescript", {
        name: "javascript",
        typescript: !0
    }), e.defineMIME("application/typescript", {
        name: "javascript",
        typescript: !0
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t) {
        return e.string.charAt(e.pos + (t || 0))
    }

    function r(e, t) {
        if (t) {
            var r = e.pos - t;
            return e.string.substr(r >= 0 ? r : 0, t)
        }
        return e.string.substr(0, e.pos - 1)
    }

    function n(e, t) {
        var r = e.string.length,
            n = r - e.pos + 1;
        return e.string.substr(e.pos, t && t < r ? t : n)
    }

    function i(e, t) {
        var r, n = e.pos + t;
        n <= 0 ? e.pos = 0 : n >= (r = e.string.length - 1) ? e.pos = r : e.pos = n
    }
    e.defineMode("perl", (function() {
        var e = {
                "->": 4,
                "++": 4,
                "--": 4,
                "**": 4,
                "=~": 4,
                "!~": 4,
                "*": 4,
                "/": 4,
                "%": 4,
                x: 4,
                "+": 4,
                "-": 4,
                ".": 4,
                "<<": 4,
                ">>": 4,
                "<": 4,
                ">": 4,
                "<=": 4,
                ">=": 4,
                lt: 4,
                gt: 4,
                le: 4,
                ge: 4,
                "==": 4,
                "!=": 4,
                "<=>": 4,
                eq: 4,
                ne: 4,
                cmp: 4,
                "~~": 4,
                "&": 4,
                "|": 4,
                "^": 4,
                "&&": 4,
                "||": 4,
                "//": 4,
                "..": 4,
                "...": 4,
                "?": 4,
                ":": 4,
                "=": 4,
                "+=": 4,
                "-=": 4,
                "*=": 4,
                ",": 4,
                "=>": 4,
                "::": 4,
                not: 4,
                and: 4,
                or: 4,
                xor: 4,
                BEGIN: [5, 1],
                END: [5, 1],
                PRINT: [5, 1],
                PRINTF: [5, 1],
                GETC: [5, 1],
                READ: [5, 1],
                READLINE: [5, 1],
                DESTROY: [5, 1],
                TIE: [5, 1],
                TIEHANDLE: [5, 1],
                UNTIE: [5, 1],
                STDIN: 5,
                STDIN_TOP: 5,
                STDOUT: 5,
                STDOUT_TOP: 5,
                STDERR: 5,
                STDERR_TOP: 5,
                $ARG: 5,
                $_: 5,
                "@ARG": 5,
                "@_": 5,
                $LIST_SEPARATOR: 5,
                '$"': 5,
                $PROCESS_ID: 5,
                $PID: 5,
                $$: 5,
                $REAL_GROUP_ID: 5,
                $GID: 5,
                "$(": 5,
                $EFFECTIVE_GROUP_ID: 5,
                $EGID: 5,
                "$)": 5,
                $PROGRAM_NAME: 5,
                $0: 5,
                $SUBSCRIPT_SEPARATOR: 5,
                $SUBSEP: 5,
                "$;": 5,
                $REAL_USER_ID: 5,
                $UID: 5,
                "$<": 5,
                $EFFECTIVE_USER_ID: 5,
                $EUID: 5,
                "$>": 5,
                $a: 5,
                $b: 5,
                $COMPILING: 5,
                "$^C": 5,
                $DEBUGGING: 5,
                "$^D": 5,
                "${^ENCODING}": 5,
                $ENV: 5,
                "%ENV": 5,
                $SYSTEM_FD_MAX: 5,
                "$^F": 5,
                "@F": 5,
                "${^GLOBAL_PHASE}": 5,
                "$^H": 5,
                "%^H": 5,
                "@INC": 5,
                "%INC": 5,
                $INPLACE_EDIT: 5,
                "$^I": 5,
                "$^M": 5,
                $OSNAME: 5,
                "$^O": 5,
                "${^OPEN}": 5,
                $PERLDB: 5,
                "$^P": 5,
                $SIG: 5,
                "%SIG": 5,
                $BASETIME: 5,
                "$^T": 5,
                "${^TAINT}": 5,
                "${^UNICODE}": 5,
                "${^UTF8CACHE}": 5,
                "${^UTF8LOCALE}": 5,
                $PERL_VERSION: 5,
                "$^V": 5,
                "${^WIN32_SLOPPY_STAT}": 5,
                $EXECUTABLE_NAME: 5,
                "$^X": 5,
                $1: 5,
                $MATCH: 5,
                "$&": 5,
                "${^MATCH}": 5,
                $PREMATCH: 5,
                "$`": 5,
                "${^PREMATCH}": 5,
                $POSTMATCH: 5,
                "$'": 5,
                "${^POSTMATCH}": 5,
                $LAST_PAREN_MATCH: 5,
                "$+": 5,
                $LAST_SUBMATCH_RESULT: 5,
                "$^N": 5,
                "@LAST_MATCH_END": 5,
                "@+": 5,
                "%LAST_PAREN_MATCH": 5,
                "%+": 5,
                "@LAST_MATCH_START": 5,
                "@-": 5,
                "%LAST_MATCH_START": 5,
                "%-": 5,
                $LAST_REGEXP_CODE_RESULT: 5,
                "$^R": 5,
                "${^RE_DEBUG_FLAGS}": 5,
                "${^RE_TRIE_MAXBUF}": 5,
                $ARGV: 5,
                "@ARGV": 5,
                ARGV: 5,
                ARGVOUT: 5,
                $OUTPUT_FIELD_SEPARATOR: 5,
                $OFS: 5,
                "$,": 5,
                $INPUT_LINE_NUMBER: 5,
                $NR: 5,
                "$.": 5,
                $INPUT_RECORD_SEPARATOR: 5,
                $RS: 5,
                "$/": 5,
                $OUTPUT_RECORD_SEPARATOR: 5,
                $ORS: 5,
                "$\\": 5,
                $OUTPUT_AUTOFLUSH: 5,
                "$|": 5,
                $ACCUMULATOR: 5,
                "$^A": 5,
                $FORMAT_FORMFEED: 5,
                "$^L": 5,
                $FORMAT_PAGE_NUMBER: 5,
                "$%": 5,
                $FORMAT_LINES_LEFT: 5,
                "$-": 5,
                $FORMAT_LINE_BREAK_CHARACTERS: 5,
                "$:": 5,
                $FORMAT_LINES_PER_PAGE: 5,
                "$=": 5,
                $FORMAT_TOP_NAME: 5,
                "$^": 5,
                $FORMAT_NAME: 5,
                "$~": 5,
                "${^CHILD_ERROR_NATIVE}": 5,
                $EXTENDED_OS_ERROR: 5,
                "$^E": 5,
                $EXCEPTIONS_BEING_CAUGHT: 5,
                "$^S": 5,
                $WARNING: 5,
                "$^W": 5,
                "${^WARNING_BITS}": 5,
                $OS_ERROR: 5,
                $ERRNO: 5,
                "$!": 5,
                "%OS_ERROR": 5,
                "%ERRNO": 5,
                "%!": 5,
                $CHILD_ERROR: 5,
                "$?": 5,
                $EVAL_ERROR: 5,
                "$@": 5,
                $OFMT: 5,
                "$#": 5,
                "$*": 5,
                $ARRAY_BASE: 5,
                "$[": 5,
                $OLD_PERL_VERSION: 5,
                "$]": 5,
                if: [1, 1],
                elsif: [1, 1],
                else: [1, 1],
                while: [1, 1],
                unless: [1, 1],
                for: [1, 1],
                foreach: [1, 1],
                abs: 1,
                accept: 1,
                alarm: 1,
                atan2: 1,
                bind: 1,
                binmode: 1,
                bless: 1,
                bootstrap: 1,
                break: 1,
                caller: 1,
                chdir: 1,
                chmod: 1,
                chomp: 1,
                chop: 1,
                chown: 1,
                chr: 1,
                chroot: 1,
                close: 1,
                closedir: 1,
                connect: 1,
                continue: [1, 1],
                cos: 1,
                crypt: 1,
                dbmclose: 1,
                dbmopen: 1,
                default: 1,
                defined: 1,
                delete: 1,
                die: 1,
                do: 1,
                dump: 1,
                each: 1,
                endgrent: 1,
                endhostent: 1,
                endnetent: 1,
                endprotoent: 1,
                endpwent: 1,
                endservent: 1,
                eof: 1,
                eval: 1,
                exec: 1,
                exists: 1,
                exit: 1,
                exp: 1,
                fcntl: 1,
                fileno: 1,
                flock: 1,
                fork: 1,
                format: 1,
                formline: 1,
                getc: 1,
                getgrent: 1,
                getgrgid: 1,
                getgrnam: 1,
                gethostbyaddr: 1,
                gethostbyname: 1,
                gethostent: 1,
                getlogin: 1,
                getnetbyaddr: 1,
                getnetbyname: 1,
                getnetent: 1,
                getpeername: 1,
                getpgrp: 1,
                getppid: 1,
                getpriority: 1,
                getprotobyname: 1,
                getprotobynumber: 1,
                getprotoent: 1,
                getpwent: 1,
                getpwnam: 1,
                getpwuid: 1,
                getservbyname: 1,
                getservbyport: 1,
                getservent: 1,
                getsockname: 1,
                getsockopt: 1,
                given: 1,
                glob: 1,
                gmtime: 1,
                goto: 1,
                grep: 1,
                hex: 1,
                import: 1,
                index: 1,
                int: 1,
                ioctl: 1,
                join: 1,
                keys: 1,
                kill: 1,
                last: 1,
                lc: 1,
                lcfirst: 1,
                length: 1,
                link: 1,
                listen: 1,
                local: 2,
                localtime: 1,
                lock: 1,
                log: 1,
                lstat: 1,
                m: null,
                map: 1,
                mkdir: 1,
                msgctl: 1,
                msgget: 1,
                msgrcv: 1,
                msgsnd: 1,
                my: 2,
                new: 1,
                next: 1,
                no: 1,
                oct: 1,
                open: 1,
                opendir: 1,
                ord: 1,
                our: 2,
                pack: 1,
                package: 1,
                pipe: 1,
                pop: 1,
                pos: 1,
                print: 1,
                printf: 1,
                prototype: 1,
                push: 1,
                q: null,
                qq: null,
                qr: null,
                quotemeta: null,
                qw: null,
                qx: null,
                rand: 1,
                read: 1,
                readdir: 1,
                readline: 1,
                readlink: 1,
                readpipe: 1,
                recv: 1,
                redo: 1,
                ref: 1,
                rename: 1,
                require: 1,
                reset: 1,
                return: 1,
                reverse: 1,
                rewinddir: 1,
                rindex: 1,
                rmdir: 1,
                s: null,
                say: 1,
                scalar: 1,
                seek: 1,
                seekdir: 1,
                select: 1,
                semctl: 1,
                semget: 1,
                semop: 1,
                send: 1,
                setgrent: 1,
                sethostent: 1,
                setnetent: 1,
                setpgrp: 1,
                setpriority: 1,
                setprotoent: 1,
                setpwent: 1,
                setservent: 1,
                setsockopt: 1,
                shift: 1,
                shmctl: 1,
                shmget: 1,
                shmread: 1,
                shmwrite: 1,
                shutdown: 1,
                sin: 1,
                sleep: 1,
                socket: 1,
                socketpair: 1,
                sort: 1,
                splice: 1,
                split: 1,
                sprintf: 1,
                sqrt: 1,
                srand: 1,
                stat: 1,
                state: 1,
                study: 1,
                sub: 1,
                substr: 1,
                symlink: 1,
                syscall: 1,
                sysopen: 1,
                sysread: 1,
                sysseek: 1,
                system: 1,
                syswrite: 1,
                tell: 1,
                telldir: 1,
                tie: 1,
                tied: 1,
                time: 1,
                times: 1,
                tr: null,
                truncate: 1,
                uc: 1,
                ucfirst: 1,
                umask: 1,
                undef: 1,
                unlink: 1,
                unpack: 1,
                unshift: 1,
                untie: 1,
                use: 1,
                utime: 1,
                values: 1,
                vec: 1,
                wait: 1,
                waitpid: 1,
                wantarray: 1,
                warn: 1,
                when: 1,
                write: 1,
                y: null
            },
            o = "string-2",
            a = /[goseximacplud]/;

        function l(e, t, r, n, i) {
            return t.chain = null, t.style = null, t.tail = null, t.tokenize = function(e, t) {
                for (var o, a = !1, l = 0; o = e.next();) {
                    if (o === r[l] && !a) return void 0 !== r[++l] ? (t.chain = r[l], t.style = n, t.tail = i) : i && e.eatWhile(i), t.tokenize = c, n;
                    a = !a && "\\" == o
                }
                return n
            }, t.tokenize(e, t)
        }

        function s(e, t, r) {
            return t.tokenize = function(e, t) {
                return e.string == r && (t.tokenize = c), e.skipToEnd(), "string"
            }, t.tokenize(e, t)
        }

        function c(c, u) {
            if (c.eatSpace()) return null;
            if (u.chain) return l(c, u, u.chain, u.style, u.tail);
            if (c.match(/^\-?[\d\.]/, !1) && c.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/)) return "number";
            if (c.match(/^<<(?=\w)/)) return c.eatWhile(/\w/), s(c, u, c.current().substr(2));
            if (c.sol() && c.match(/^\=item(?!\w)/)) return s(c, u, "=cut");
            var d = c.next();
            if ('"' == d || "'" == d) {
                if (r(c, 3) == "<<" + d) {
                    var f = c.pos;
                    c.eatWhile(/\w/);
                    var p = c.current().substr(1);
                    if (p && c.eat(d)) return s(c, u, p);
                    c.pos = f
                }
                return l(c, u, [d], "string")
            }
            if ("q" == d && (!(h = t(c, -2)) || !/\w/.test(h)))
                if ("x" == (h = t(c, 0))) {
                    if ("(" == (h = t(c, 1))) return i(c, 2), l(c, u, [")"], o, a);
                    if ("[" == h) return i(c, 2), l(c, u, ["]"], o, a);
                    if ("{" == h) return i(c, 2), l(c, u, ["}"], o, a);
                    if ("<" == h) return i(c, 2), l(c, u, [">"], o, a);
                    if (/[\^'"!~\/]/.test(h)) return i(c, 1), l(c, u, [c.eat(h)], o, a)
                } else if ("q" == h) {
                if ("(" == (h = t(c, 1))) return i(c, 2), l(c, u, [")"], "string");
                if ("[" == h) return i(c, 2), l(c, u, ["]"], "string");
                if ("{" == h) return i(c, 2), l(c, u, ["}"], "string");
                if ("<" == h) return i(c, 2), l(c, u, [">"], "string");
                if (/[\^'"!~\/]/.test(h)) return i(c, 1), l(c, u, [c.eat(h)], "string")
            } else if ("w" == h) {
                if ("(" == (h = t(c, 1))) return i(c, 2), l(c, u, [")"], "bracket");
                if ("[" == h) return i(c, 2), l(c, u, ["]"], "bracket");
                if ("{" == h) return i(c, 2), l(c, u, ["}"], "bracket");
                if ("<" == h) return i(c, 2), l(c, u, [">"], "bracket");
                if (/[\^'"!~\/]/.test(h)) return i(c, 1), l(c, u, [c.eat(h)], "bracket")
            } else if ("r" == h) {
                if ("(" == (h = t(c, 1))) return i(c, 2), l(c, u, [")"], o, a);
                if ("[" == h) return i(c, 2), l(c, u, ["]"], o, a);
                if ("{" == h) return i(c, 2), l(c, u, ["}"], o, a);
                if ("<" == h) return i(c, 2), l(c, u, [">"], o, a);
                if (/[\^'"!~\/]/.test(h)) return i(c, 1), l(c, u, [c.eat(h)], o, a)
            } else if (/[\^'"!~\/(\[{<]/.test(h)) {
                if ("(" == h) return i(c, 1), l(c, u, [")"], "string");
                if ("[" == h) return i(c, 1), l(c, u, ["]"], "string");
                if ("{" == h) return i(c, 1), l(c, u, ["}"], "string");
                if ("<" == h) return i(c, 1), l(c, u, [">"], "string");
                if (/[\^'"!~\/]/.test(h)) return l(c, u, [c.eat(h)], "string")
            }
            if ("m" == d && ((!(h = t(c, -2)) || !/\w/.test(h)) && (h = c.eat(/[(\[{<\^'"!~\/]/)))) {
                if (/[\^'"!~\/]/.test(h)) return l(c, u, [h], o, a);
                if ("(" == h) return l(c, u, [")"], o, a);
                if ("[" == h) return l(c, u, ["]"], o, a);
                if ("{" == h) return l(c, u, ["}"], o, a);
                if ("<" == h) return l(c, u, [">"], o, a)
            }
            if ("s" == d && (!(h = /[\/>\]})\w]/.test(t(c, -2))) && (h = c.eat(/[(\[{<\^'"!~\/]/)))) return l(c, u, "[" == h ? ["]", "]"] : "{" == h ? ["}", "}"] : "<" == h ? [">", ">"] : "(" == h ? [")", ")"] : [h, h], o, a);
            if ("y" == d && (!(h = /[\/>\]})\w]/.test(t(c, -2))) && (h = c.eat(/[(\[{<\^'"!~\/]/)))) return l(c, u, "[" == h ? ["]", "]"] : "{" == h ? ["}", "}"] : "<" == h ? [">", ">"] : "(" == h ? [")", ")"] : [h, h], o, a);
            if ("t" == d && (!(h = /[\/>\]})\w]/.test(t(c, -2))) && (h = c.eat("r")) && (h = c.eat(/[(\[{<\^'"!~\/]/)))) return l(c, u, "[" == h ? ["]", "]"] : "{" == h ? ["}", "}"] : "<" == h ? [">", ">"] : "(" == h ? [")", ")"] : [h, h], o, a);
            if ("`" == d) return l(c, u, [d], "variable-2");
            if ("/" == d) return /~\s*$/.test(r(c)) ? l(c, u, [d], o, a) : "operator";
            if ("$" == d) {
                f = c.pos;
                if (c.eatWhile(/\d/) || c.eat("{") && c.eatWhile(/\d/) && c.eat("}")) return "variable-2";
                c.pos = f
            }
            if (/[$@%]/.test(d)) {
                f = c.pos;
                if (c.eat("^") && c.eat(/[A-Z]/) || !/[@$%&]/.test(t(c, -2)) && c.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)) {
                    var h = c.current();
                    if (e[h]) return "variable-2"
                }
                c.pos = f
            }
            if (/[$@%&]/.test(d) && (c.eatWhile(/[\w$\[\]]/) || c.eat("{") && c.eatWhile(/[\w$\[\]]/) && c.eat("}"))) {
                h = c.current();
                return e[h] ? "variable-2" : "variable"
            }
            if ("#" == d && "$" != t(c, -2)) return c.skipToEnd(), "comment";
            if (/[:+\-\^*$&%@=<>!?|\/~\.]/.test(d)) {
                f = c.pos;
                if (c.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/), e[c.current()]) return "operator";
                c.pos = f
            }
            if ("_" == d && 1 == c.pos) {
                if ("_END__" == n(c, 6)) return l(c, u, ["\0"], "comment");
                if ("_DATA__" == n(c, 7)) return l(c, u, ["\0"], "variable-2");
                if ("_C__" == n(c, 7)) return l(c, u, ["\0"], "string")
            }
            if (/\w/.test(d)) {
                f = c.pos;
                if ("{" == t(c, -2) && ("}" == t(c, 0) || c.eatWhile(/\w/) && "}" == t(c, 0))) return "string";
                c.pos = f
            }
            if (/[A-Z]/.test(d)) {
                var m = t(c, -2);
                f = c.pos;
                if (c.eatWhile(/[A-Z_]/), !/[\da-z]/.test(t(c, 0))) return (h = e[c.current()]) ? (h[1] && (h = h[0]), ":" != m ? 1 == h ? "keyword" : 2 == h ? "def" : 3 == h ? "atom" : 4 == h ? "operator" : 5 == h ? "variable-2" : "meta" : "meta") : "meta";
                c.pos = f
            }
            if (/[a-zA-Z_]/.test(d)) {
                m = t(c, -2);
                return c.eatWhile(/\w/), (h = e[c.current()]) ? (h[1] && (h = h[0]), ":" != m ? 1 == h ? "keyword" : 2 == h ? "def" : 3 == h ? "atom" : 4 == h ? "operator" : 5 == h ? "variable-2" : "meta" : "meta") : "meta"
            }
            return null
        }
        return {
            startState: function() {
                return {
                    tokenize: c,
                    chain: null,
                    style: null,
                    tail: null
                }
            },
            token: function(e, t) {
                return (t.tokenize || c)(e, t)
            },
            lineComment: "#"
        }
    })), e.registerHelper("wordChars", "perl", /[\w$]/), e.defineMIME("text/x-perl", "perl")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../clike/clike")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../clike/clike"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        for (var t = {}, r = e.split(" "), n = 0; n < r.length; ++n) t[r[n]] = !0;
        return t
    }

    function r(e, t, i) {
        return 0 == e.length ? n(t) : function(o, a) {
            for (var l = e[0], s = 0; s < l.length; s++)
                if (o.match(l[s][0])) return a.tokenize = r(e.slice(1), t), l[s][1];
            return a.tokenize = n(t, i), "string"
        }
    }

    function n(e, t) {
        return function(n, i) {
            return function(e, t, n, i) {
                if (!1 !== i && e.match("${", !1) || e.match("{$", !1)) return t.tokenize = null, "string";
                if (!1 !== i && e.match(/^\$[a-zA-Z_][a-zA-Z0-9_]*/)) return e.match("[", !1) && (t.tokenize = r([
                    [
                        ["[", null]
                    ],
                    [
                        [/\d[\w\.]*/, "number"],
                        [/\$[a-zA-Z_][a-zA-Z0-9_]*/, "variable-2"],
                        [/[\w\$]+/, "variable"]
                    ],
                    [
                        ["]", null]
                    ]
                ], n, i)), e.match(/\-\>\w/, !1) && (t.tokenize = r([
                    [
                        ["->", null]
                    ],
                    [
                        [/[\w]+/, "variable"]
                    ]
                ], n, i)), "variable-2";
                var o = !1;
                for (; !e.eol() && (o || !1 === i || !e.match("{$", !1) && !e.match(/^(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{)/, !1));) {
                    if (!o && e.match(n)) {
                        t.tokenize = null, t.tokStack.pop(), t.tokStack.pop();
                        break
                    }
                    o = "\\" == e.next() && !o
                }
                return "string"
            }(n, i, e, t)
        }
    }
    var i = "abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent yield insteadof finally",
        o = "true false null TRUE FALSE NULL __CLASS__ __DIR__ __FILE__ __LINE__ __METHOD__ __FUNCTION__ __NAMESPACE__ __TRAIT__",
        a = "func_num_args func_get_arg func_get_args strlen strcmp strncmp strcasecmp strncasecmp each error_reporting define defined trigger_error user_error set_error_handler restore_error_handler get_declared_classes get_loaded_extensions extension_loaded get_extension_funcs debug_backtrace constant bin2hex hex2bin sleep usleep time mktime gmmktime strftime gmstrftime strtotime date gmdate getdate localtime checkdate flush wordwrap htmlspecialchars htmlentities html_entity_decode md5 md5_file crc32 getimagesize image_type_to_mime_type phpinfo phpversion phpcredits strnatcmp strnatcasecmp substr_count strspn strcspn strtok strtoupper strtolower strpos strrpos strrev hebrev hebrevc nl2br basename dirname pathinfo stripslashes stripcslashes strstr stristr strrchr str_shuffle str_word_count strcoll substr substr_replace quotemeta ucfirst ucwords strtr addslashes addcslashes rtrim str_replace str_repeat count_chars chunk_split trim ltrim strip_tags similar_text explode implode setlocale localeconv parse_str str_pad chop strchr sprintf printf vprintf vsprintf sscanf fscanf parse_url urlencode urldecode rawurlencode rawurldecode readlink linkinfo link unlink exec system escapeshellcmd escapeshellarg passthru shell_exec proc_open proc_close rand srand getrandmax mt_rand mt_srand mt_getrandmax base64_decode base64_encode abs ceil floor round is_finite is_nan is_infinite bindec hexdec octdec decbin decoct dechex base_convert number_format fmod ip2long long2ip getenv putenv getopt microtime gettimeofday getrusage uniqid quoted_printable_decode set_time_limit get_cfg_var magic_quotes_runtime set_magic_quotes_runtime get_magic_quotes_gpc get_magic_quotes_runtime import_request_variables error_log serialize unserialize memory_get_usage var_dump var_export debug_zval_dump print_r highlight_file show_source highlight_string ini_get ini_get_all ini_set ini_alter ini_restore get_include_path set_include_path restore_include_path setcookie header headers_sent connection_aborted connection_status ignore_user_abort parse_ini_file is_uploaded_file move_uploaded_file intval floatval doubleval strval gettype settype is_null is_resource is_bool is_long is_float is_int is_integer is_double is_real is_numeric is_string is_array is_object is_scalar ereg ereg_replace eregi eregi_replace split spliti join sql_regcase dl pclose popen readfile rewind rmdir umask fclose feof fgetc fgets fgetss fread fopen fpassthru ftruncate fstat fseek ftell fflush fwrite fputs mkdir rename copy tempnam tmpfile file file_get_contents file_put_contents stream_select stream_context_create stream_context_set_params stream_context_set_option stream_context_get_options stream_filter_prepend stream_filter_append fgetcsv flock get_meta_tags stream_set_write_buffer set_file_buffer set_socket_blocking stream_set_blocking socket_set_blocking stream_get_meta_data stream_register_wrapper stream_wrapper_register stream_set_timeout socket_set_timeout socket_get_status realpath fnmatch fsockopen pfsockopen pack unpack get_browser crypt opendir closedir chdir getcwd rewinddir readdir dir glob fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype file_exists is_writable is_writeable is_readable is_executable is_file is_dir is_link stat lstat chown touch clearstatcache mail ob_start ob_flush ob_clean ob_end_flush ob_end_clean ob_get_flush ob_get_clean ob_get_length ob_get_level ob_get_status ob_get_contents ob_implicit_flush ob_list_handlers ksort krsort natsort natcasesort asort arsort sort rsort usort uasort uksort shuffle array_walk count end prev next reset current key min max in_array array_search extract compact array_fill range array_multisort array_push array_pop array_shift array_unshift array_splice array_slice array_merge array_merge_recursive array_keys array_values array_count_values array_reverse array_reduce array_pad array_flip array_change_key_case array_rand array_unique array_intersect array_intersect_assoc array_diff array_diff_assoc array_sum array_filter array_map array_chunk array_key_exists array_intersect_key array_combine array_column pos sizeof key_exists assert assert_options version_compare ftok str_rot13 aggregate session_name session_module_name session_save_path session_id session_regenerate_id session_decode session_register session_unregister session_is_registered session_encode session_start session_destroy session_unset session_set_save_handler session_cache_limiter session_cache_expire session_set_cookie_params session_get_cookie_params session_write_close preg_match preg_match_all preg_replace preg_replace_callback preg_split preg_quote preg_grep overload ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_lower ctype_graph ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit virtual apache_request_headers apache_note apache_lookup_uri apache_child_terminate apache_setenv apache_response_headers apache_get_version getallheaders mysql_connect mysql_pconnect mysql_close mysql_select_db mysql_create_db mysql_drop_db mysql_query mysql_unbuffered_query mysql_db_query mysql_list_dbs mysql_list_tables mysql_list_fields mysql_list_processes mysql_error mysql_errno mysql_affected_rows mysql_insert_id mysql_result mysql_num_rows mysql_num_fields mysql_fetch_row mysql_fetch_array mysql_fetch_assoc mysql_fetch_object mysql_data_seek mysql_fetch_lengths mysql_fetch_field mysql_field_seek mysql_free_result mysql_field_name mysql_field_table mysql_field_len mysql_field_type mysql_field_flags mysql_escape_string mysql_real_escape_string mysql_stat mysql_thread_id mysql_client_encoding mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql mysql_fieldname mysql_fieldtable mysql_fieldlen mysql_fieldtype mysql_fieldflags mysql_selectdb mysql_createdb mysql_dropdb mysql_freeresult mysql_numfields mysql_numrows mysql_listdbs mysql_listtables mysql_listfields mysql_db_name mysql_dbname mysql_tablename mysql_table_name pg_connect pg_pconnect pg_close pg_connection_status pg_connection_busy pg_connection_reset pg_host pg_dbname pg_port pg_tty pg_options pg_ping pg_query pg_send_query pg_cancel_query pg_fetch_result pg_fetch_row pg_fetch_assoc pg_fetch_array pg_fetch_object pg_fetch_all pg_affected_rows pg_get_result pg_result_seek pg_result_status pg_free_result pg_last_oid pg_num_rows pg_num_fields pg_field_name pg_field_num pg_field_size pg_field_type pg_field_prtlen pg_field_is_null pg_get_notify pg_get_pid pg_result_error pg_last_error pg_last_notice pg_put_line pg_end_copy pg_copy_to pg_copy_from pg_trace pg_untrace pg_lo_create pg_lo_unlink pg_lo_open pg_lo_close pg_lo_read pg_lo_write pg_lo_read_all pg_lo_import pg_lo_export pg_lo_seek pg_lo_tell pg_escape_string pg_escape_bytea pg_unescape_bytea pg_client_encoding pg_set_client_encoding pg_meta_data pg_convert pg_insert pg_update pg_delete pg_select pg_exec pg_getlastoid pg_cmdtuples pg_errormessage pg_numrows pg_numfields pg_fieldname pg_fieldsize pg_fieldtype pg_fieldnum pg_fieldprtlen pg_fieldisnull pg_freeresult pg_result pg_loreadall pg_locreate pg_lounlink pg_loopen pg_loclose pg_loread pg_lowrite pg_loimport pg_loexport http_response_code get_declared_traits getimagesizefromstring socket_import_stream stream_set_chunk_size trait_exists header_register_callback class_uses session_status session_register_shutdown echo print global static exit array empty eval isset unset die include require include_once require_once json_decode json_encode json_last_error json_last_error_msg curl_close curl_copy_handle curl_errno curl_error curl_escape curl_exec curl_file_create curl_getinfo curl_init curl_multi_add_handle curl_multi_close curl_multi_exec curl_multi_getcontent curl_multi_info_read curl_multi_init curl_multi_remove_handle curl_multi_select curl_multi_setopt curl_multi_strerror curl_pause curl_reset curl_setopt_array curl_setopt curl_share_close curl_share_init curl_share_setopt curl_strerror curl_unescape curl_version mysqli_affected_rows mysqli_autocommit mysqli_change_user mysqli_character_set_name mysqli_close mysqli_commit mysqli_connect_errno mysqli_connect_error mysqli_connect mysqli_data_seek mysqli_debug mysqli_dump_debug_info mysqli_errno mysqli_error_list mysqli_error mysqli_fetch_all mysqli_fetch_array mysqli_fetch_assoc mysqli_fetch_field_direct mysqli_fetch_field mysqli_fetch_fields mysqli_fetch_lengths mysqli_fetch_object mysqli_fetch_row mysqli_field_count mysqli_field_seek mysqli_field_tell mysqli_free_result mysqli_get_charset mysqli_get_client_info mysqli_get_client_stats mysqli_get_client_version mysqli_get_connection_stats mysqli_get_host_info mysqli_get_proto_info mysqli_get_server_info mysqli_get_server_version mysqli_info mysqli_init mysqli_insert_id mysqli_kill mysqli_more_results mysqli_multi_query mysqli_next_result mysqli_num_fields mysqli_num_rows mysqli_options mysqli_ping mysqli_prepare mysqli_query mysqli_real_connect mysqli_real_escape_string mysqli_real_query mysqli_reap_async_query mysqli_refresh mysqli_rollback mysqli_select_db mysqli_set_charset mysqli_set_local_infile_default mysqli_set_local_infile_handler mysqli_sqlstate mysqli_ssl_set mysqli_stat mysqli_stmt_init mysqli_store_result mysqli_thread_id mysqli_thread_safe mysqli_use_result mysqli_warning_count";
    e.registerHelper("hintWords", "php", [i, o, a].join(" ").split(" ")), e.registerHelper("wordChars", "php", /[\w$]/);
    var l = {
        name: "clike",
        helperType: "php",
        keywords: t(i),
        blockKeywords: t("catch do else elseif for foreach if switch try while finally"),
        defKeywords: t("class function interface namespace trait"),
        atoms: t(o),
        builtin: t(a),
        multiLineStrings: !0,
        hooks: {
            $: function(e) {
                return e.eatWhile(/[\w\$_]/), "variable-2"
            },
            "<": function(e, t) {
                var r;
                if (r = e.match(/<<\s*/)) {
                    var i = e.eat(/['"]/);
                    e.eatWhile(/[\w\.]/);
                    var o = e.current().slice(r[0].length + (i ? 2 : 1));
                    if (i && e.eat(i), o) return (t.tokStack || (t.tokStack = [])).push(o, 0), t.tokenize = n(o, "'" != i), "string"
                }
                return !1
            },
            "#": function(e) {
                for (; !e.eol() && !e.match("?>", !1);) e.next();
                return "comment"
            },
            "/": function(e) {
                if (e.eat("/")) {
                    for (; !e.eol() && !e.match("?>", !1);) e.next();
                    return "comment"
                }
                return !1
            },
            '"': function(e, t) {
                return (t.tokStack || (t.tokStack = [])).push('"', 0), t.tokenize = n('"'), "string"
            },
            "{": function(e, t) {
                return t.tokStack && t.tokStack.length && t.tokStack[t.tokStack.length - 1]++, !1
            },
            "}": function(e, t) {
                return t.tokStack && t.tokStack.length > 0 && !--t.tokStack[t.tokStack.length - 1] && (t.tokenize = n(t.tokStack[t.tokStack.length - 2])), !1
            }
        }
    };
    e.defineMode("php", (function(t, r) {
        var n = e.getMode(t, r && r.htmlMode || "text/html"),
            i = e.getMode(t, l);
        return {
            startState: function() {
                var t = e.startState(n),
                    o = r.startOpen ? e.startState(i) : null;
                return {
                    html: t,
                    php: o,
                    curMode: r.startOpen ? i : n,
                    curState: r.startOpen ? o : t,
                    pending: null
                }
            },
            copyState: function(t) {
                var r, o = t.html,
                    a = e.copyState(n, o),
                    l = t.php,
                    s = l && e.copyState(i, l);
                return r = t.curMode == n ? a : s, {
                    html: a,
                    php: s,
                    curMode: t.curMode,
                    curState: r,
                    pending: t.pending
                }
            },
            token: function(t, r) {
                var o = r.curMode == i;
                if (t.sol() && r.pending && '"' != r.pending && "'" != r.pending && (r.pending = null), o) return o && null == r.php.tokenize && t.match("?>") ? (r.curMode = n, r.curState = r.html, r.php.context.prev || (r.php = null), "meta") : i.token(t, r.curState);
                if (t.match(/^<\?\w*/)) return r.curMode = i, r.php || (r.php = e.startState(i, n.indent(r.html, "", ""))), r.curState = r.php, "meta";
                if ('"' == r.pending || "'" == r.pending) {
                    for (; !t.eol() && t.next() != r.pending;);
                    var a = "string"
                } else if (r.pending && t.pos < r.pending.end) {
                    t.pos = r.pending.end;
                    a = r.pending.style
                } else a = n.token(t, r.curState);
                r.pending && (r.pending = null);
                var l, s = t.current(),
                    c = s.search(/<\?/);
                return -1 != c && ("string" == a && (l = s.match(/[\'\"]$/)) && !/\?>/.test(s) ? r.pending = l[0] : r.pending = {
                    end: t.pos,
                    style: a
                }, t.backUp(s.length - c)), a
            },
            indent: function(e, t, r) {
                return e.curMode != i && /^\s*<\//.test(t) || e.curMode == i && /^\?>/.test(t) ? n.indent(e.html, t, r) : e.curMode.indent(e.curState, t, r)
            },
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            lineComment: "//",
            innerMode: function(e) {
                return {
                    state: e.curState,
                    mode: e.curMode
                }
            }
        }
    }), "htmlmixed", "clike"), e.defineMIME("application/x-httpd-php", "php"), e.defineMIME("application/x-httpd-php-open", {
        name: "php",
        startOpen: !0
    }), e.defineMIME("text/x-php", l)
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        return new RegExp("^((" + e.join(")|(") + "))\\b")
    }
    var r = t(["and", "or", "not", "is"]),
        n = ["as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield", "in"],
        i = ["abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__"];

    function o(e) {
        return e.scopes[e.scopes.length - 1]
    }
    e.registerHelper("hintWords", "python", n.concat(i)), e.defineMode("python", (function(a, l) {
        for (var s = l.delimiters || l.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.\\]/, c = [l.singleOperators, l.doubleOperators, l.doubleDelimiters, l.tripleDelimiters, l.operators || /^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/], u = 0; u < c.length; u++) c[u] || c.splice(u--, 1);
        var d = l.hangingIndent || a.indentUnit,
            f = n,
            p = i;
        null != l.extra_keywords && (f = f.concat(l.extra_keywords)), null != l.extra_builtins && (p = p.concat(l.extra_builtins));
        var h = !(l.version && Number(l.version) < 3);
        if (h) {
            var m = l.identifiers || /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;
            f = f.concat(["nonlocal", "False", "True", "None", "async", "await"]), p = p.concat(["ascii", "bytes", "exec", "print"]);
            var g = new RegExp("^(([rbuf]|(br)|(fr))?('{3}|\"{3}|['\"]))", "i")
        } else {
            m = l.identifiers || /^[_A-Za-z][_A-Za-z0-9]*/;
            f = f.concat(["exec", "print"]), p = p.concat(["apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None"]);
            g = new RegExp("^(([rubf]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i")
        }
        var v = t(f),
            y = t(p);

        function b(e, t) {
            var r = e.sol() && "\\" != t.lastToken;
            if (r && (t.indent = e.indentation()), r && "py" == o(t).type) {
                var n = o(t).offset;
                if (e.eatSpace()) {
                    var i = e.indentation();
                    return i > n ? k(t) : i < n && w(e, t) && "#" != e.peek() && (t.errorToken = !0), null
                }
                var a = x(e, t);
                return n > 0 && w(e, t) && (a += " error"), a
            }
            return x(e, t)
        }

        function x(e, t) {
            if (e.eatSpace()) return null;
            if (e.match(/^#.*/)) return "comment";
            if (e.match(/^[0-9\.]/, !1)) {
                var n = !1;
                if (e.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i) && (n = !0), e.match(/^[\d_]+\.\d*/) && (n = !0), e.match(/^\.\d+/) && (n = !0), n) return e.eat(/J/i), "number";
                var i = !1;
                if (e.match(/^0x[0-9a-f_]+/i) && (i = !0), e.match(/^0b[01_]+/i) && (i = !0), e.match(/^0o[0-7_]+/i) && (i = !0), e.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/) && (e.eat(/J/i), i = !0), e.match(/^0(?![\dx])/i) && (i = !0), i) return e.eat(/L/i), "number"
            }
            if (e.match(g)) return -1 !== e.current().toLowerCase().indexOf("f") ? (t.tokenize = function(e, t) {
                for (;
                    "rubf".indexOf(e.charAt(0).toLowerCase()) >= 0;) e = e.substr(1);
                var r = 1 == e.length;

                function n(e) {
                    return function(t, r) {
                        var o = x(t, r);
                        return "punctuation" == o && ("{" == t.current() ? r.tokenize = n(e + 1) : "}" == t.current() && (r.tokenize = e > 1 ? n(e - 1) : i)), o
                    }
                }

                function i(i, o) {
                    for (; !i.eol();)
                        if (i.eatWhile(/[^'"\{\}\\]/), i.eat("\\")) {
                            if (i.next(), r && i.eol()) return "string"
                        } else {
                            if (i.match(e)) return o.tokenize = t, "string";
                            if (i.match("{{")) return "string";
                            if (i.match("{", !1)) return o.tokenize = n(0), i.current() ? "string" : o.tokenize(i, o);
                            if (i.match("}}")) return "string";
                            if (i.match("}")) return "error";
                            i.eat(/['"]/)
                        } if (r) {
                        if (l.singleLineStringErrors) return "error";
                        o.tokenize = t
                    }
                    return "string"
                }
                return i.isString = !0, i
            }(e.current(), t.tokenize), t.tokenize(e, t)) : (t.tokenize = function(e, t) {
                for (;
                    "rubf".indexOf(e.charAt(0).toLowerCase()) >= 0;) e = e.substr(1);
                var r = 1 == e.length;

                function n(n, i) {
                    for (; !n.eol();)
                        if (n.eatWhile(/[^'"\\]/), n.eat("\\")) {
                            if (n.next(), r && n.eol()) return "string"
                        } else {
                            if (n.match(e)) return i.tokenize = t, "string";
                            n.eat(/['"]/)
                        } if (r) {
                        if (l.singleLineStringErrors) return "error";
                        i.tokenize = t
                    }
                    return "string"
                }
                return n.isString = !0, n
            }(e.current(), t.tokenize), t.tokenize(e, t));
            for (var o = 0; o < c.length; o++)
                if (e.match(c[o])) return "operator";
            return e.match(s) ? "punctuation" : "." == t.lastToken && e.match(m) ? "property" : e.match(v) || e.match(r) ? "keyword" : e.match(y) ? "builtin" : e.match(/^(self|cls)\b/) ? "variable-2" : e.match(m) ? "def" == t.lastToken || "class" == t.lastToken ? "def" : "variable" : (e.next(), "error")
        }

        function k(e) {
            for (;
                "py" != o(e).type;) e.scopes.pop();
            e.scopes.push({
                offset: o(e).offset + a.indentUnit,
                type: "py",
                align: null
            })
        }

        function w(e, t) {
            for (var r = e.indentation(); t.scopes.length > 1 && o(t).offset > r;) {
                if ("py" != o(t).type) return !0;
                t.scopes.pop()
            }
            return o(t).offset != r
        }

        function _(e, t) {
            e.sol() && (t.beginningOfLine = !0);
            var r = t.tokenize(e, t),
                n = e.current();
            if (t.beginningOfLine && "@" == n) return e.match(m, !1) ? "meta" : h ? "operator" : "error";
            if (/\S/.test(n) && (t.beginningOfLine = !1), "variable" != r && "builtin" != r || "meta" != t.lastToken || (r = "meta"), "pass" != n && "return" != n || (t.dedent += 1), "lambda" == n && (t.lambda = !0), ":" != n || t.lambda || "py" != o(t).type || k(t), 1 == n.length && !/string|comment/.test(r)) {
                var i = "[({".indexOf(n);
                if (-1 != i && function(e, t, r) {
                        var n = e.match(/^([\s\[\{\(]|#.*)*$/, !1) ? null : e.column() + 1;
                        t.scopes.push({
                            offset: t.indent + d,
                            type: r,
                            align: n
                        })
                    }(e, t, "])}".slice(i, i + 1)), -1 != (i = "])}".indexOf(n))) {
                    if (o(t).type != n) return "error";
                    t.indent = t.scopes.pop().offset - d
                }
            }
            return t.dedent > 0 && e.eol() && "py" == o(t).type && (t.scopes.length > 1 && t.scopes.pop(), t.dedent -= 1), r
        }
        return {
            startState: function(e) {
                return {
                    tokenize: b,
                    scopes: [{
                        offset: e || 0,
                        type: "py",
                        align: null
                    }],
                    indent: e || 0,
                    lastToken: null,
                    lambda: !1,
                    dedent: 0
                }
            },
            token: function(e, t) {
                var r = t.errorToken;
                r && (t.errorToken = !1);
                var n = _(e, t);
                return n && "comment" != n && (t.lastToken = "keyword" == n || "punctuation" == n ? e.current() : n), "punctuation" == n && (n = null), e.eol() && t.lambda && (t.lambda = !1), r ? n + " error" : n
            },
            indent: function(t, r) {
                if (t.tokenize != b) return t.tokenize.isString ? e.Pass : 0;
                var n = o(t),
                    i = n.type == r.charAt(0);
                return null != n.align ? n.align - (i ? 1 : 0) : n.offset - (i ? d : 0)
            },
            electricInput: /^\s*[\}\]\)]$/,
            closeBrackets: {
                triples: "'\""
            },
            lineComment: "#",
            fold: "indent"
        }
    })), e.defineMIME("text/x-python", "python");
    var a;
    e.defineMIME("text/x-cython", {
        name: "python",
        extra_keywords: (a = "by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE", a.split(" "))
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        for (var t; null != (t = e.next());)
            if ("`" == t && !e.eat("`")) return "variable-2";
        return e.backUp(e.current().length - 1), e.eatWhile(/\w/) ? "variable-2" : null
    }

    function r(e) {
        return e.eat("@") && (e.match(/^session\./), e.match(/^local\./), e.match(/^global\./)), e.eat("'") ? (e.match(/^.*'/), "variable-2") : e.eat('"') ? (e.match(/^.*"/), "variable-2") : e.eat("`") ? (e.match(/^.*`/), "variable-2") : e.match(/^[0-9a-zA-Z$\.\_]+/) ? "variable-2" : null
    }

    function n(e) {
        return e.eat("N") ? "atom" : e.match(/^[a-zA-Z.#!?]/) ? "variable-2" : null
    }
    e.defineMode("sql", (function(t, r) {
        var n = r.client || {},
            l = r.atoms || {
                false: !0,
                true: !0,
                null: !0
            },
            s = r.builtin || o(a),
            c = r.keywords || o(i),
            u = r.operatorChars || /^[*+\-%<>!=&|~^\/]/,
            d = r.support || {},
            f = r.hooks || {},
            p = r.dateSQL || {
                date: !0,
                time: !0,
                timestamp: !0
            },
            h = !1 !== r.backslashStringEscapes,
            m = r.brackets || /^[\{}\(\)\[\]]/,
            g = r.punctuation || /^[;.,:]/;

        function v(e, t) {
            var r = e.next();
            if (f[r]) {
                var i = f[r](e, t);
                if (!1 !== i) return i
            }
            if (d.hexNumber && ("0" == r && e.match(/^[xX][0-9a-fA-F]+/) || ("x" == r || "X" == r) && e.match(/^'[0-9a-fA-F]+'/))) return "number";
            if (d.binaryNumber && (("b" == r || "B" == r) && e.match(/^'[01]+'/) || "0" == r && e.match(/^b[01]+/))) return "number";
            if (r.charCodeAt(0) > 47 && r.charCodeAt(0) < 58) return e.match(/^[0-9]*(\.[0-9]+)?([eE][-+]?[0-9]+)?/), d.decimallessFloat && e.match(/^\.(?!\.)/), "number";
            if ("?" == r && (e.eatSpace() || e.eol() || e.eat(";"))) return "variable-3";
            if ("'" == r || '"' == r && d.doubleQuote) return t.tokenize = y(r), t.tokenize(e, t);
            if ((d.nCharCast && ("n" == r || "N" == r) || d.charsetCast && "_" == r && e.match(/[a-z][a-z0-9]*/i)) && ("'" == e.peek() || '"' == e.peek())) return "keyword";
            if (d.escapeConstant && ("e" == r || "E" == r) && ("'" == e.peek() || '"' == e.peek() && d.doubleQuote)) return t.tokenize = function(e, t) {
                return (t.tokenize = y(e.next(), !0))(e, t)
            }, "keyword";
            if (d.commentSlashSlash && "/" == r && e.eat("/")) return e.skipToEnd(), "comment";
            if (d.commentHash && "#" == r || "-" == r && e.eat("-") && (!d.commentSpaceRequired || e.eat(" "))) return e.skipToEnd(), "comment";
            if ("/" == r && e.eat("*")) return t.tokenize = function e(t) {
                return function(r, n) {
                    var i = r.match(/^.*?(\/\*|\*\/)/);
                    return i ? "/*" == i[1] ? n.tokenize = e(t + 1) : n.tokenize = t > 1 ? e(t - 1) : v : r.skipToEnd(), "comment"
                }
            }(1), t.tokenize(e, t);
            if ("." != r) {
                if (u.test(r)) return e.eatWhile(u), "operator";
                if (m.test(r)) return "bracket";
                if (g.test(r)) return e.eatWhile(g), "punctuation";
                if ("{" == r && (e.match(/^( )*(d|D|t|T|ts|TS)( )*'[^']*'( )*}/) || e.match(/^( )*(d|D|t|T|ts|TS)( )*"[^"]*"( )*}/))) return "number";
                e.eatWhile(/^[_\w\d]/);
                var o = e.current().toLowerCase();
                return p.hasOwnProperty(o) && (e.match(/^( )+'[^']*'/) || e.match(/^( )+"[^"]*"/)) ? "number" : l.hasOwnProperty(o) ? "atom" : s.hasOwnProperty(o) ? "builtin" : c.hasOwnProperty(o) ? "keyword" : n.hasOwnProperty(o) ? "string-2" : null
            }
            return d.zerolessFloat && e.match(/^(?:\d+(?:e[+-]?\d+)?)/i) ? "number" : e.match(/^\.+/) ? null : d.ODBCdotTable && e.match(/^[\w\d_]+/) ? "variable-2" : void 0
        }

        function y(e, t) {
            return function(r, n) {
                for (var i, o = !1; null != (i = r.next());) {
                    if (i == e && !o) {
                        n.tokenize = v;
                        break
                    }
                    o = (h || t) && !o && "\\" == i
                }
                return "string"
            }
        }

        function b(e, t, r) {
            t.context = {
                prev: t.context,
                indent: e.indentation(),
                col: e.column(),
                type: r
            }
        }
        return {
            startState: function() {
                return {
                    tokenize: v,
                    context: null
                }
            },
            token: function(e, t) {
                if (e.sol() && t.context && null == t.context.align && (t.context.align = !1), t.tokenize == v && e.eatSpace()) return null;
                var r = t.tokenize(e, t);
                if ("comment" == r) return r;
                t.context && null == t.context.align && (t.context.align = !0);
                var n = e.current();
                return "(" == n ? b(e, t, ")") : "[" == n ? b(e, t, "]") : t.context && t.context.type == n && function(e) {
                    e.indent = e.context.indent, e.context = e.context.prev
                }(t), r
            },
            indent: function(r, n) {
                var i = r.context;
                if (!i) return e.Pass;
                var o = n.charAt(0) == i.type;
                return i.align ? i.col + (o ? 0 : 1) : i.indent + (o ? 0 : t.indentUnit)
            },
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            lineComment: d.commentSlashSlash ? "//" : d.commentHash ? "#" : "--",
            closeBrackets: "()[]{}''\"\"``"
        }
    }));
    var i = "alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit ";

    function o(e) {
        for (var t = {}, r = e.split(" "), n = 0; n < r.length; ++n) t[r[n]] = !0;
        return t
    }
    var a = "bool boolean bit blob enum long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision real date datetime year unsigned signed decimal numeric";
    e.defineMIME("text/x-sql", {
        name: "sql",
        keywords: o(i + "begin"),
        builtin: o(a),
        atoms: o("false true null unknown"),
        dateSQL: o("date time timestamp"),
        support: o("ODBCdotTable doubleQuote binaryNumber hexNumber")
    }), e.defineMIME("text/x-mssql", {
        name: "sql",
        client: o("$partition binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id"),
        keywords: o(i + "begin trigger proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx updlock with"),
        builtin: o("bigint numeric bit smallint decimal smallmoney int tinyint money float real char varchar text nchar nvarchar ntext binary varbinary image cursor timestamp hierarchyid uniqueidentifier sql_variant xml table "),
        atoms: o("is not null like and or in left right between inner outer join all any some cross unpivot pivot exists"),
        operatorChars: /^[*+\-%<>!=^\&|\/]/,
        brackets: /^[\{}\(\)]/,
        punctuation: /^[;.,:/]/,
        backslashStringEscapes: !1,
        dateSQL: o("date datetimeoffset datetime2 smalldatetime datetime time"),
        hooks: {
            "@": r
        }
    }), e.defineMIME("text/x-mysql", {
        name: "sql",
        client: o("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
        keywords: o(i + "accessible action add after algorithm all analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general get global grant grants group group_concat handler hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show signal slave slow smallint snapshot soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),
        builtin: o("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),
        atoms: o("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^]/,
        dateSQL: o("date time timestamp"),
        support: o("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),
        hooks: {
            "@": r,
            "`": t,
            "\\": n
        }
    }), e.defineMIME("text/x-mariadb", {
        name: "sql",
        client: o("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
        keywords: o(i + "accessible action add after algorithm all always analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general generated get global grant grants group groupby_concat handler hard hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password persistent phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show shutdown signal slave slow smallint snapshot soft soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views virtual warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),
        builtin: o("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),
        atoms: o("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^]/,
        dateSQL: o("date time timestamp"),
        support: o("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),
        hooks: {
            "@": r,
            "`": t,
            "\\": n
        }
    }), e.defineMIME("text/x-sqlite", {
        name: "sql",
        client: o("auth backup bail binary changes check clone databases dbinfo dump echo eqp exit explain fullschema headers help import imposter indexes iotrace limit lint load log mode nullvalue once open output print prompt quit read restore save scanstats schema separator session shell show stats system tables testcase timeout timer trace vfsinfo vfslist vfsname width"),
        keywords: o(i + "abort action add after all analyze attach autoincrement before begin cascade case cast check collate column commit conflict constraint cross current_date current_time current_timestamp database default deferrable deferred detach each else end escape except exclusive exists explain fail for foreign full glob if ignore immediate index indexed initially inner instead intersect isnull key left limit match natural no notnull null of offset outer plan pragma primary query raise recursive references regexp reindex release rename replace restrict right rollback row savepoint temp temporary then to transaction trigger unique using vacuum view virtual when with without"),
        builtin: o("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text clob bigint int int2 int8 integer float double char varchar date datetime year unsigned signed numeric real"),
        atoms: o("null current_date current_time current_timestamp"),
        operatorChars: /^[*+\-%<>!=&|/~]/,
        dateSQL: o("date time timestamp datetime"),
        support: o("decimallessFloat zerolessFloat"),
        identifierQuote: '"',
        hooks: {
            "@": r,
            ":": r,
            "?": r,
            $: r,
            '"': function(e) {
                for (var t; null != (t = e.next());)
                    if ('"' == t && !e.eat('"')) return "variable-2";
                return e.backUp(e.current().length - 1), e.eatWhile(/\w/) ? "variable-2" : null
            },
            "`": t
        }
    }), e.defineMIME("text/x-cassandra", {
        name: "sql",
        client: {},
        keywords: o("add all allow alter and any apply as asc authorize batch begin by clustering columnfamily compact consistency count create custom delete desc distinct drop each_quorum exists filtering from grant if in index insert into key keyspace keyspaces level limit local_one local_quorum modify nan norecursive nosuperuser not of on one order password permission permissions primary quorum rename revoke schema select set storage superuser table three to token truncate ttl two type unlogged update use user users using values where with writetime"),
        builtin: o("ascii bigint blob boolean counter decimal double float frozen inet int list map static text timestamp timeuuid tuple uuid varchar varint"),
        atoms: o("false true infinity NaN"),
        operatorChars: /^[<>=]/,
        dateSQL: {},
        support: o("commentSlashSlash decimallessFloat"),
        hooks: {}
    }), e.defineMIME("text/x-plsql", {
        name: "sql",
        client: o("appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define describe echo editfile embedded escape exec execute feedback flagger flush heading headsep instance linesize lno loboffset logsource long longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar release repfooter repheader serveroutput shiftinout show showmode size spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout time timing trimout trimspool ttitle underline verify version wrap"),
        keywords: o("abort accept access add all alter and any array arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body boolean by case cast char char_base check close cluster clusters colauth column comment commit compress connect connected constant constraint crash create current currval cursor data_base database date dba deallocate debugoff debugon decimal declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry escape exception exception_init exchange exclusive exists exit external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging long loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base object of off offline on online only open option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw read rebuild record ref references refresh release rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate session set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work"),
        builtin: o("abs acos add_months ascii asin atan atan2 average bfile bfilename bigserial bit blob ceil character chartorowid chr clob concat convert cos cosh count dec decode deref dual dump dup_val_on_index empty error exp false float floor found glb greatest hextoraw initcap instr instrb int integer isopen last_day least length lengthb ln lower lpad ltrim lub make_ref max min mlslabel mod months_between natural naturaln nchar nclob new_time next_day nextval nls_charset_decl_len nls_charset_id nls_charset_name nls_initcap nls_lower nls_sort nls_upper nlssort no_data_found notfound null number numeric nvarchar2 nvl others power rawtohex real reftohex round rowcount rowidtochar rowtype rpad rtrim serial sign signtype sin sinh smallint soundex sqlcode sqlerrm sqrt stddev string substr substrb sum sysdate tan tanh to_char text to_date to_label to_multi_byte to_number to_single_byte translate true trunc uid unlogged upper user userenv varchar varchar2 variance varying vsize xml"),
        operatorChars: /^[*\/+\-%<>!=~]/,
        dateSQL: o("date time timestamp"),
        support: o("doubleQuote nCharCast zerolessFloat binaryNumber hexNumber")
    }), e.defineMIME("text/x-hive", {
        name: "sql",
        keywords: o("select alter $elem$ $key$ $value$ add after all analyze and archive as asc before between binary both bucket buckets by cascade case cast change cluster clustered clusterstatus collection column columns comment compute concatenate continue create cross cursor data database databases dbproperties deferred delete delimited desc describe directory disable distinct distribute drop else enable end escaped exclusive exists explain export extended external fetch fields fileformat first format formatted from full function functions grant group having hold_ddltime idxproperties if import in index indexes inpath inputdriver inputformat insert intersect into is items join keys lateral left like limit lines load local location lock locks mapjoin materialized minus msck no_drop nocompress not of offline on option or order out outer outputdriver outputformat overwrite partition partitioned partitions percent plus preserve procedure purge range rcfile read readonly reads rebuild recordreader recordwriter recover reduce regexp rename repair replace restrict revoke right rlike row schema schemas semi sequencefile serde serdeproperties set shared show show_database sort sorted ssl statistics stored streamtable table tables tablesample tblproperties temporary terminated textfile then tmp to touch transform trigger unarchive undo union uniquejoin unlock update use using utc utc_tmestamp view when where while with admin authorization char compact compactions conf cube current current_date current_timestamp day decimal defined dependency directories elem_type exchange file following for grouping hour ignore inner interval jar less logical macro minute month more none noscan over owner partialscan preceding pretty principals protection reload rewrite role roles rollup rows second server sets skewed transactions truncate unbounded unset uri user values window year"),
        builtin: o("bool boolean long timestamp tinyint smallint bigint int float double date datetime unsigned string array struct map uniontype key_type utctimestamp value_type varchar"),
        atoms: o("false true null unknown"),
        operatorChars: /^[*+\-%<>!=]/,
        dateSQL: o("date timestamp"),
        support: o("ODBCdotTable doubleQuote binaryNumber hexNumber")
    }), e.defineMIME("text/x-pgsql", {
        name: "sql",
        client: o("source"),
        keywords: o(i + "a abort abs absent absolute access according action ada add admin after aggregate alias all allocate also alter always analyse analyze and any are array array_agg array_max_cardinality as asc asensitive assert assertion assignment asymmetric at atomic attach attribute attributes authorization avg backward base64 before begin begin_frame begin_partition bernoulli between bigint binary bit bit_length blob blocked bom boolean both breadth by c cache call called cardinality cascade cascaded case cast catalog catalog_name ceil ceiling chain char char_length character character_length character_set_catalog character_set_name character_set_schema characteristics characters check checkpoint class class_origin clob close cluster coalesce cobol collate collation collation_catalog collation_name collation_schema collect column column_name columns command_function command_function_code comment comments commit committed concurrently condition condition_number configuration conflict connect connection connection_name constant constraint constraint_catalog constraint_name constraint_schema constraints constructor contains content continue control conversion convert copy corr corresponding cost count covar_pop covar_samp create cross csv cube cume_dist current current_catalog current_date current_default_transform_group current_path current_role current_row current_schema current_time current_timestamp current_transform_group_for_type current_user cursor cursor_name cycle data database datalink datatype date datetime_interval_code datetime_interval_precision day db deallocate debug dec decimal declare default defaults deferrable deferred defined definer degree delete delimiter delimiters dense_rank depends depth deref derived desc describe descriptor detach detail deterministic diagnostics dictionary disable discard disconnect dispatch distinct dlnewcopy dlpreviouscopy dlurlcomplete dlurlcompleteonly dlurlcompletewrite dlurlpath dlurlpathonly dlurlpathwrite dlurlscheme dlurlserver dlvalue do document domain double drop dump dynamic dynamic_function dynamic_function_code each element else elseif elsif empty enable encoding encrypted end end_frame end_partition endexec enforced enum equals errcode error escape event every except exception exclude excluding exclusive exec execute exists exit exp explain expression extension external extract false family fetch file filter final first first_value flag float floor following for force foreach foreign fortran forward found frame_row free freeze from fs full function functions fusion g general generated get global go goto grant granted greatest group grouping groups handler having header hex hierarchy hint hold hour id identity if ignore ilike immediate immediately immutable implementation implicit import in include including increment indent index indexes indicator info inherit inherits initially inline inner inout input insensitive insert instance instantiable instead int integer integrity intersect intersection interval into invoker is isnull isolation join k key key_member key_type label lag language large last last_value lateral lead leading leakproof least left length level library like like_regex limit link listen ln load local localtime localtimestamp location locator lock locked log logged loop lower m map mapping match matched materialized max max_cardinality maxvalue member merge message message_length message_octet_length message_text method min minute minvalue mod mode modifies module month more move multiset mumps name names namespace national natural nchar nclob nesting new next nfc nfd nfkc nfkd nil no none normalize normalized not nothing notice notify notnull nowait nth_value ntile null nullable nullif nulls number numeric object occurrences_regex octet_length octets of off offset oids old on only open operator option options or order ordering ordinality others out outer output over overlaps overlay overriding owned owner p pad parallel parameter parameter_mode parameter_name parameter_ordinal_position parameter_specific_catalog parameter_specific_name parameter_specific_schema parser partial partition pascal passing passthrough password path percent percent_rank percentile_cont percentile_disc perform period permission pg_context pg_datatype_name pg_exception_context pg_exception_detail pg_exception_hint placing plans pli policy portion position position_regex power precedes preceding precision prepare prepared preserve primary print_strict_params prior privileges procedural procedure procedures program public publication query quote raise range rank read reads real reassign recheck recovery recursive ref references referencing refresh regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reindex relative release rename repeatable replace replica requiring reset respect restart restore restrict result result_oid return returned_cardinality returned_length returned_octet_length returned_sqlstate returning returns reverse revoke right role rollback rollup routine routine_catalog routine_name routine_schema routines row row_count row_number rows rowtype rule savepoint scale schema schema_name schemas scope scope_catalog scope_name scope_schema scroll search second section security select selective self sensitive sequence sequences serializable server server_name session session_user set setof sets share show similar simple size skip slice smallint snapshot some source space specific specific_name specifictype sql sqlcode sqlerror sqlexception sqlstate sqlwarning sqrt stable stacked standalone start state statement static statistics stddev_pop stddev_samp stdin stdout storage strict strip structure style subclass_origin submultiset subscription substring substring_regex succeeds sum symmetric sysid system system_time system_user t table table_name tables tablesample tablespace temp template temporary text then ties time timestamp timezone_hour timezone_minute to token top_level_count trailing transaction transaction_active transactions_committed transactions_rolled_back transform transforms translate translate_regex translation treat trigger trigger_catalog trigger_name trigger_schema trim trim_array true truncate trusted type types uescape unbounded uncommitted under unencrypted union unique unknown unlink unlisten unlogged unnamed unnest until untyped update upper uri usage use_column use_variable user user_defined_type_catalog user_defined_type_code user_defined_type_name user_defined_type_schema using vacuum valid validate validator value value_of values var_pop var_samp varbinary varchar variable_conflict variadic varying verbose version versioning view views volatile warning when whenever where while whitespace width_bucket window with within without work wrapper write xml xmlagg xmlattributes xmlbinary xmlcast xmlcomment xmlconcat xmldeclaration xmldocument xmlelement xmlexists xmlforest xmliterate xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltext xmlvalidate year yes zone"),
        builtin: o("bigint int8 bigserial serial8 bit varying varbit boolean bool box bytea character char varchar cidr circle date double precision float8 inet integer int int4 interval json jsonb line lseg macaddr macaddr8 money numeric decimal path pg_lsn point polygon real float4 smallint int2 smallserial serial2 serial serial4 text time without zone with timetz timestamp timestamptz tsquery tsvector txid_snapshot uuid xml"),
        atoms: o("false true null unknown"),
        operatorChars: /^[*\/+\-%<>!=&|^\/#@?~]/,
        backslashStringEscapes: !1,
        dateSQL: o("date time timestamp"),
        support: o("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber nCharCast charsetCast escapeConstant")
    }), e.defineMIME("text/x-gql", {
        name: "sql",
        keywords: o("ancestor and asc by contains desc descendant distinct from group has in is limit offset on order select superset where"),
        atoms: o("false true"),
        builtin: o("blob datetime first key __key__ string integer double boolean null"),
        operatorChars: /^[*+\-%<>!=]/
    }), e.defineMIME("text/x-gpsql", {
        name: "sql",
        client: o("source"),
        keywords: o("abort absolute access action active add admin after aggregate all also alter always analyse analyze and any array as asc assertion assignment asymmetric at authorization backward before begin between bigint binary bit boolean both by cache called cascade cascaded case cast chain char character characteristics check checkpoint class close cluster coalesce codegen collate column comment commit committed concurrency concurrently configuration connection constraint constraints contains content continue conversion copy cost cpu_rate_limit create createdb createexttable createrole createuser cross csv cube current current_catalog current_date current_role current_schema current_time current_timestamp current_user cursor cycle data database day deallocate dec decimal declare decode default defaults deferrable deferred definer delete delimiter delimiters deny desc dictionary disable discard distinct distributed do document domain double drop dxl each else enable encoding encrypted end enum errors escape every except exchange exclude excluding exclusive execute exists explain extension external extract false family fetch fields filespace fill filter first float following for force foreign format forward freeze from full function global grant granted greatest group group_id grouping handler hash having header hold host hour identity if ignore ilike immediate immutable implicit in including inclusive increment index indexes inherit inherits initially inline inner inout input insensitive insert instead int integer intersect interval into invoker is isnull isolation join key language large last leading least left level like limit list listen load local localtime localtimestamp location lock log login mapping master match maxvalue median merge minute minvalue missing mode modifies modify month move name names national natural nchar new newline next no nocreatedb nocreateexttable nocreaterole nocreateuser noinherit nologin none noovercommit nosuperuser not nothing notify notnull nowait null nullif nulls numeric object of off offset oids old on only operator option options or order ordered others out outer over overcommit overlaps overlay owned owner parser partial partition partitions passing password percent percentile_cont percentile_disc placing plans position preceding precision prepare prepared preserve primary prior privileges procedural procedure protocol queue quote randomly range read readable reads real reassign recheck recursive ref references reindex reject relative release rename repeatable replace replica reset resource restart restrict returning returns revoke right role rollback rollup rootpartition row rows rule savepoint scatter schema scroll search second security segment select sequence serializable session session_user set setof sets share show similar simple smallint some split sql stable standalone start statement statistics stdin stdout storage strict strip subpartition subpartitions substring superuser symmetric sysid system table tablespace temp template temporary text then threshold ties time timestamp to trailing transaction treat trigger trim true truncate trusted type unbounded uncommitted unencrypted union unique unknown unlisten until update user using vacuum valid validation validator value values varchar variadic varying verbose version view volatile web when where whitespace window with within without work writable write xml xmlattributes xmlconcat xmlelement xmlexists xmlforest xmlparse xmlpi xmlroot xmlserialize year yes zone"),
        builtin: o("bigint int8 bigserial serial8 bit varying varbit boolean bool box bytea character char varchar cidr circle date double precision float float8 inet integer int int4 interval json jsonb line lseg macaddr macaddr8 money numeric decimal path pg_lsn point polygon real float4 smallint int2 smallserial serial2 serial serial4 text time without zone with timetz timestamp timestamptz tsquery tsvector txid_snapshot uuid xml"),
        atoms: o("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^\/#@?~]/,
        dateSQL: o("date time timestamp"),
        support: o("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber nCharCast charsetCast")
    }), e.defineMIME("text/x-sparksql", {
        name: "sql",
        keywords: o("add after all alter analyze and anti archive array as asc at between bucket buckets by cache cascade case cast change clear cluster clustered codegen collection column columns comment commit compact compactions compute concatenate cost create cross cube current current_date current_timestamp database databases datata dbproperties defined delete delimited deny desc describe dfs directories distinct distribute drop else end escaped except exchange exists explain export extended external false fields fileformat first following for format formatted from full function functions global grant group grouping having if ignore import in index indexes inner inpath inputformat insert intersect interval into is items join keys last lateral lazy left like limit lines list load local location lock locks logical macro map minus msck natural no not null nulls of on optimize option options or order out outer outputformat over overwrite partition partitioned partitions percent preceding principals purge range recordreader recordwriter recover reduce refresh regexp rename repair replace reset restrict revoke right rlike role roles rollback rollup row rows schema schemas select semi separated serde serdeproperties set sets show skewed sort sorted start statistics stored stratify struct table tables tablesample tblproperties temp temporary terminated then to touch transaction transactions transform true truncate unarchive unbounded uncache union unlock unset use using values view when where window with"),
        builtin: o("tinyint smallint int bigint boolean float double string binary timestamp decimal array map struct uniontype delimited serde sequencefile textfile rcfile inputformat outputformat"),
        atoms: o("false true null"),
        operatorChars: /^[*\/+\-%<>!=~&|^]/,
        dateSQL: o("date time timestamp"),
        support: o("ODBCdotTable doubleQuote zerolessFloat")
    }), e.defineMIME("text/x-esper", {
        name: "sql",
        client: o("source"),
        keywords: o("alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit after all and as at asc avedev avg between by case cast coalesce count create current_timestamp day days delete define desc distinct else end escape events every exists false first from full group having hour hours in inner insert instanceof into irstream is istream join last lastweekday left limit like max match_recognize matches median measures metadatasql min minute minutes msec millisecond milliseconds not null offset on or order outer output partition pattern prev prior regexp retain-union retain-intersection right rstream sec second seconds select set some snapshot sql stddev sum then true unidirectional until update variable weekday when where window"),
        builtin: {},
        atoms: o("false true null"),
        operatorChars: /^[*+\-%<>!=&|^\/#@?~]/,
        dateSQL: o("time"),
        support: o("decimallessFloat zerolessFloat binaryNumber hexNumber")
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("shell", (function() {
        var t = {};

        function r(e, r) {
            for (var n = 0; n < r.length; n++) t[r[n]] = e
        }
        var n = ["true", "false"],
            i = ["if", "then", "do", "else", "elif", "while", "until", "for", "in", "esac", "fi", "fin", "fil", "done", "exit", "set", "unset", "export", "function"],
            o = ["ab", "awk", "bash", "beep", "cat", "cc", "cd", "chown", "chmod", "chroot", "clear", "cp", "curl", "cut", "diff", "echo", "find", "gawk", "gcc", "get", "git", "grep", "hg", "kill", "killall", "ln", "ls", "make", "mkdir", "openssl", "mv", "nc", "nl", "node", "npm", "ping", "ps", "restart", "rm", "rmdir", "sed", "service", "sh", "shopt", "shred", "source", "sort", "sleep", "ssh", "start", "stop", "su", "sudo", "svn", "tee", "telnet", "top", "touch", "vi", "vim", "wall", "wc", "wget", "who", "write", "yes", "zsh"];

        function a(e, r) {
            if (e.eatSpace()) return null;
            var n = e.sol(),
                i = e.next();
            if ("\\" === i) return e.next(), null;
            if ("'" === i || '"' === i || "`" === i) return r.tokens.unshift(l(i, "`" === i ? "quote" : "string")), u(e, r);
            if ("#" === i) return n && e.eat("!") ? (e.skipToEnd(), "meta") : (e.skipToEnd(), "comment");
            if ("$" === i) return r.tokens.unshift(c), u(e, r);
            if ("+" === i || "=" === i) return "operator";
            if ("-" === i) return e.eat("-"), e.eatWhile(/\w/), "attribute";
            if (/\d/.test(i) && (e.eatWhile(/\d/), e.eol() || !/\w/.test(e.peek()))) return "number";
            e.eatWhile(/[\w-]/);
            var o = e.current();
            return "=" === e.peek() && /\w+/.test(o) ? "def" : t.hasOwnProperty(o) ? t[o] : null
        }

        function l(e, t) {
            var r = "(" == e ? ")" : "{" == e ? "}" : e;
            return function(n, i) {
                for (var o, a = !1; null != (o = n.next());) {
                    if (o === r && !a) {
                        i.tokens.shift();
                        break
                    }
                    if ("$" === o && !a && "'" !== e && n.peek() != r) {
                        a = !0, n.backUp(1), i.tokens.unshift(c);
                        break
                    }
                    if (!a && e !== r && o === e) return i.tokens.unshift(l(e, t)), u(n, i);
                    if (!a && /['"]/.test(o) && !/['"]/.test(e)) {
                        i.tokens.unshift(s(o, "string")), n.backUp(1);
                        break
                    }
                    a = !a && "\\" === o
                }
                return t
            }
        }

        function s(e, t) {
            return function(r, n) {
                return n.tokens[0] = l(e, t), r.next(), u(r, n)
            }
        }
        e.registerHelper("hintWords", "shell", n.concat(i, o)), r("atom", n), r("keyword", i), r("builtin", o);
        var c = function(e, t) {
            t.tokens.length > 1 && e.eat("$");
            var r = e.next();
            return /['"({]/.test(r) ? (t.tokens[0] = l(r, "(" == r ? "quote" : "{" == r ? "def" : "string"), u(e, t)) : (/\d/.test(r) || e.eatWhile(/\w/), t.tokens.shift(), "def")
        };

        function u(e, t) {
            return (t.tokens[0] || a)(e, t)
        }
        return {
            startState: function() {
                return {
                    tokens: []
                }
            },
            token: function(e, t) {
                return u(e, t)
            },
            closeBrackets: "()[]{}''\"\"``",
            lineComment: "#",
            fold: "brace"
        }
    })), e.defineMIME("text/x-sh", "shell"), e.defineMIME("application/x-sh", "shell")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("vb", (function(t, r) {
        function n(e) {
            return new RegExp("^((" + e.join(")|(") + "))\\b", "i")
        }
        var i = new RegExp("^[\\+\\-\\*/%&\\\\|\\^~<>!]"),
            o = new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"),
            a = new RegExp("^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"),
            l = new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"),
            s = new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"),
            c = new RegExp("^[_A-Za-z][_A-Za-z0-9]*"),
            u = ["class", "module", "sub", "enum", "select", "while", "if", "function", "get", "set", "property", "try", "structure", "synclock", "using", "with"],
            d = ["else", "elseif", "case", "catch", "finally"],
            f = ["next", "loop"],
            p = ["and", "andalso", "or", "orelse", "xor", "in", "not", "is", "isnot", "like"],
            h = n(p),
            m = ["#const", "#else", "#elseif", "#end", "#if", "#region", "addhandler", "addressof", "alias", "as", "byref", "byval", "cbool", "cbyte", "cchar", "cdate", "cdbl", "cdec", "cint", "clng", "cobj", "compare", "const", "continue", "csbyte", "cshort", "csng", "cstr", "cuint", "culng", "cushort", "declare", "default", "delegate", "dim", "directcast", "each", "erase", "error", "event", "exit", "explicit", "false", "for", "friend", "gettype", "goto", "handles", "implements", "imports", "infer", "inherits", "interface", "isfalse", "istrue", "lib", "me", "mod", "mustinherit", "mustoverride", "my", "mybase", "myclass", "namespace", "narrowing", "new", "nothing", "notinheritable", "notoverridable", "of", "off", "on", "operator", "option", "optional", "out", "overloads", "overridable", "overrides", "paramarray", "partial", "private", "protected", "public", "raiseevent", "readonly", "redim", "removehandler", "resume", "return", "shadows", "shared", "static", "step", "stop", "strict", "then", "throw", "to", "true", "trycast", "typeof", "until", "until", "when", "widening", "withevents", "writeonly"],
            g = ["object", "boolean", "char", "string", "byte", "sbyte", "short", "ushort", "int16", "uint16", "integer", "uinteger", "int32", "uint32", "long", "ulong", "int64", "uint64", "decimal", "single", "double", "float", "date", "datetime", "intptr", "uintptr"],
            v = n(m),
            y = n(g),
            b = n(u),
            x = n(d),
            k = n(f),
            w = n(["end"]),
            _ = n(["do"]);

        function C(e, t) {
            t.currentIndent++
        }

        function S(e, t) {
            t.currentIndent--
        }

        function T(e, t) {
            if (e.eatSpace()) return null;
            var n, u;
            if ("'" === e.peek()) return e.skipToEnd(), "comment";
            if (e.match(/^((&H)|(&O))?[0-9\.a-f]/i, !1)) {
                var d = !1;
                if (e.match(/^\d*\.\d+F?/i) ? d = !0 : e.match(/^\d+\.\d*F?/) ? d = !0 : e.match(/^\.\d+F?/) && (d = !0), d) return e.eat(/J/i), "number";
                var f = !1;
                if (e.match(/^&H[0-9a-f]+/i) ? f = !0 : e.match(/^&O[0-7]+/i) ? f = !0 : e.match(/^[1-9]\d*F?/) ? (e.eat(/J/i), f = !0) : e.match(/^0(?![\dx])/i) && (f = !0), f) return e.eat(/L/i), "number"
            }
            return e.match('"') ? (t.tokenize = (n = e.current(), u = 1 == n.length, function(e, t) {
                for (; !e.eol();) {
                    if (e.eatWhile(/[^'"]/), e.match(n)) return t.tokenize = T, "string";
                    e.eat(/['"]/)
                }
                if (u) {
                    if (r.singleLineStringErrors) return "error";
                    t.tokenize = T
                }
                return "string"
            }), t.tokenize(e, t)) : e.match(s) || e.match(l) ? null : e.match(a) || e.match(i) || e.match(h) ? "operator" : e.match(o) ? null : e.match(_) ? (C(0, t), t.doInCurrentLine = !0, "keyword") : e.match(b) ? (t.doInCurrentLine ? t.doInCurrentLine = !1 : C(0, t), "keyword") : e.match(x) ? "keyword" : e.match(w) ? (S(0, t), S(0, t), "keyword") : e.match(k) ? (S(0, t), "keyword") : e.match(y) ? "keyword" : e.match(v) ? "keyword" : e.match(c) ? "variable" : (e.next(), "error")
        }
        return e.registerHelper("hintWords", "vb", u.concat(d).concat(f).concat(p).concat(m).concat(g)), {
            electricChars: "dDpPtTfFeE ",
            startState: function() {
                return {
                    tokenize: T,
                    lastToken: null,
                    currentIndent: 0,
                    nextLineIndent: 0,
                    doInCurrentLine: !1
                }
            },
            token: function(e, t) {
                e.sol() && (t.currentIndent += t.nextLineIndent, t.nextLineIndent = 0, t.doInCurrentLine = 0);
                var r = function(e, t) {
                    var r = t.tokenize(e, t),
                        n = e.current();
                    if ("." === n) return "variable" === (r = t.tokenize(e, t)) ? "variable" : "error";
                    var i = "[({".indexOf(n);
                    return -1 !== i && C(0, t), -1 !== (i = "])}".indexOf(n)) && S(0, t) ? "error" : r
                }(e, t);
                return t.lastToken = {
                    style: r,
                    content: e.current()
                }, r
            },
            indent: function(e, r) {
                var n = r.replace(/^\s+|\s+$/g, "");
                return n.match(k) || n.match(w) || n.match(x) ? t.indentUnit * (e.currentIndent - 1) : e.currentIndent < 0 ? 0 : e.currentIndent * t.indentUnit
            },
            lineComment: "'"
        }
    })), e.defineMIME("text/x-vb", "vb")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    var t = {
            autoSelfClosers: {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0,
                menuitem: !0
            },
            implicitlyClosed: {
                dd: !0,
                li: !0,
                optgroup: !0,
                option: !0,
                p: !0,
                rp: !0,
                rt: !0,
                tbody: !0,
                td: !0,
                tfoot: !0,
                th: !0,
                tr: !0
            },
            contextGrabbers: {
                dd: {
                    dd: !0,
                    dt: !0
                },
                dt: {
                    dd: !0,
                    dt: !0
                },
                li: {
                    li: !0
                },
                option: {
                    option: !0,
                    optgroup: !0
                },
                optgroup: {
                    optgroup: !0
                },
                p: {
                    address: !0,
                    article: !0,
                    aside: !0,
                    blockquote: !0,
                    dir: !0,
                    div: !0,
                    dl: !0,
                    fieldset: !0,
                    footer: !0,
                    form: !0,
                    h1: !0,
                    h2: !0,
                    h3: !0,
                    h4: !0,
                    h5: !0,
                    h6: !0,
                    header: !0,
                    hgroup: !0,
                    hr: !0,
                    menu: !0,
                    nav: !0,
                    ol: !0,
                    p: !0,
                    pre: !0,
                    section: !0,
                    table: !0,
                    ul: !0
                },
                rp: {
                    rp: !0,
                    rt: !0
                },
                rt: {
                    rp: !0,
                    rt: !0
                },
                tbody: {
                    tbody: !0,
                    tfoot: !0
                },
                td: {
                    td: !0,
                    th: !0
                },
                tfoot: {
                    tbody: !0
                },
                th: {
                    td: !0,
                    th: !0
                },
                thead: {
                    tbody: !0,
                    tfoot: !0
                },
                tr: {
                    tr: !0
                }
            },
            doNotIndent: {
                pre: !0
            },
            allowUnquoted: !0,
            allowMissing: !0,
            caseFold: !0
        },
        r = {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: !1,
            allowMissing: !1,
            allowMissingTagName: !1,
            caseFold: !1
        };
    e.defineMode("xml", (function(n, i) {
        var o, a, l = n.indentUnit,
            s = {},
            c = i.htmlMode ? t : r;
        for (var u in c) s[u] = c[u];
        for (var u in i) s[u] = i[u];

        function d(e, t) {
            function r(r) {
                return t.tokenize = r, r(e, t)
            }
            var n = e.next();
            return "<" == n ? e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? r(p("atom", "]]>")) : null : e.match("--") ? r(p("comment", "--\x3e")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), r(function e(t) {
                return function(r, n) {
                    for (var i; null != (i = r.next());) {
                        if ("<" == i) return n.tokenize = e(t + 1), n.tokenize(r, n);
                        if (">" == i) {
                            if (1 == t) {
                                n.tokenize = d;
                                break
                            }
                            return n.tokenize = e(t - 1), n.tokenize(r, n)
                        }
                    }
                    return "meta"
                }
            }(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = p("meta", "?>"), "meta") : (o = e.eat("/") ? "closeTag" : "openTag", t.tokenize = f, "tag bracket") : "&" == n ? (e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";")) ? "atom" : "error" : (e.eatWhile(/[^&<]/), null)
        }

        function f(e, t) {
            var r, n, i = e.next();
            if (">" == i || "/" == i && e.eat(">")) return t.tokenize = d, o = ">" == i ? "endTag" : "selfcloseTag", "tag bracket";
            if ("=" == i) return o = "equals", null;
            if ("<" == i) {
                t.tokenize = d, t.state = v, t.tagName = t.tagStart = null;
                var a = t.tokenize(e, t);
                return a ? a + " tag error" : "tag error"
            }
            return /[\'\"]/.test(i) ? (t.tokenize = (r = i, (n = function(e, t) {
                for (; !e.eol();)
                    if (e.next() == r) {
                        t.tokenize = f;
                        break
                    } return "string"
            }).isInAttribute = !0, n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
        }

        function p(e, t) {
            return function(r, n) {
                for (; !r.eol();) {
                    if (r.match(t)) {
                        n.tokenize = d;
                        break
                    }
                    r.next()
                }
                return e
            }
        }

        function h(e, t, r) {
            this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = r, (s.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0)
        }

        function m(e) {
            e.context && (e.context = e.context.prev)
        }

        function g(e, t) {
            for (var r;;) {
                if (!e.context) return;
                if (r = e.context.tagName, !s.contextGrabbers.hasOwnProperty(r) || !s.contextGrabbers[r].hasOwnProperty(t)) return;
                m(e)
            }
        }

        function v(e, t, r) {
            return "openTag" == e ? (r.tagStart = t.column(), y) : "closeTag" == e ? b : v
        }

        function y(e, t, r) {
            return "word" == e ? (r.tagName = t.current(), a = "tag", w) : s.allowMissingTagName && "endTag" == e ? (a = "tag bracket", w(e, t, r)) : (a = "error", y)
        }

        function b(e, t, r) {
            if ("word" == e) {
                var n = t.current();
                return r.context && r.context.tagName != n && s.implicitlyClosed.hasOwnProperty(r.context.tagName) && m(r), r.context && r.context.tagName == n || !1 === s.matchClosing ? (a = "tag", x) : (a = "tag error", k)
            }
            return s.allowMissingTagName && "endTag" == e ? (a = "tag bracket", x(e, t, r)) : (a = "error", k)
        }

        function x(e, t, r) {
            return "endTag" != e ? (a = "error", x) : (m(r), v)
        }

        function k(e, t, r) {
            return a = "error", x(e, 0, r)
        }

        function w(e, t, r) {
            if ("word" == e) return a = "attribute", _;
            if ("endTag" == e || "selfcloseTag" == e) {
                var n = r.tagName,
                    i = r.tagStart;
                return r.tagName = r.tagStart = null, "selfcloseTag" == e || s.autoSelfClosers.hasOwnProperty(n) ? g(r, n) : (g(r, n), r.context = new h(r, n, i == r.indented)), v
            }
            return a = "error", w
        }

        function _(e, t, r) {
            return "equals" == e ? C : (s.allowMissing || (a = "error"), w(e, 0, r))
        }

        function C(e, t, r) {
            return "string" == e ? S : "word" == e && s.allowUnquoted ? (a = "string", w) : (a = "error", w(e, 0, r))
        }

        function S(e, t, r) {
            return "string" == e ? S : w(e, 0, r)
        }
        return d.isInText = !0, {
            startState: function(e) {
                var t = {
                    tokenize: d,
                    state: v,
                    indented: e || 0,
                    tagName: null,
                    tagStart: null,
                    context: null
                };
                return null != e && (t.baseIndent = e), t
            },
            token: function(e, t) {
                if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;
                o = null;
                var r = t.tokenize(e, t);
                return (r || o) && "comment" != r && (a = null, t.state = t.state(o || r, e, t), a && (r = "error" == a ? r + " error" : a)), r
            },
            indent: function(t, r, n) {
                var i = t.context;
                if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + l;
                if (i && i.noIndent) return e.Pass;
                if (t.tokenize != f && t.tokenize != d) return n ? n.match(/^(\s*)/)[0].length : 0;
                if (t.tagName) return !1 !== s.multilineTagIndentPastTag ? t.tagStart + t.tagName.length + 2 : t.tagStart + l * (s.multilineTagIndentFactor || 1);
                if (s.alignCDATA && /<!\[CDATA\[/.test(r)) return 0;
                var o = r && /^<(\/)?([\w_:\.-]*)/.exec(r);
                if (o && o[1])
                    for (; i;) {
                        if (i.tagName == o[2]) {
                            i = i.prev;
                            break
                        }
                        if (!s.implicitlyClosed.hasOwnProperty(i.tagName)) break;
                        i = i.prev
                    } else if (o)
                        for (; i;) {
                            var a = s.contextGrabbers[i.tagName];
                            if (!a || !a.hasOwnProperty(o[2])) break;
                            i = i.prev
                        }
                for (; i && i.prev && !i.startOfLine;) i = i.prev;
                return i ? i.indent + l : t.baseIndent || 0
            },
            electricInput: /<\/[\s\w:]+>$/,
            blockCommentStart: "\x3c!--",
            blockCommentEnd: "--\x3e",
            configuration: s.htmlMode ? "html" : "xml",
            helperType: s.htmlMode ? "html" : "xml",
            skipAttribute: function(e) {
                e.state == C && (e.state = w)
            },
            xmlCurrentTag: function(e) {
                return e.tagName ? {
                    name: e.tagName,
                    close: "closeTag" == e.type
                } : null
            },
            xmlCurrentContext: function(e) {
                for (var t = [], r = e.context; r; r = r.prev) r.tagName && t.push(r.tagName);
                return t.reverse()
            }
        }
    })), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
        name: "xml",
        htmlMode: !0
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("yaml", (function() {
        var e = new RegExp("\\b((" + ["true", "false", "on", "off", "yes", "no"].join(")|(") + "))$", "i");
        return {
            token: function(t, r) {
                var n = t.peek(),
                    i = r.escaped;
                if (r.escaped = !1, "#" == n && (0 == t.pos || /\s/.test(t.string.charAt(t.pos - 1)))) return t.skipToEnd(), "comment";
                if (t.match(/^('([^']|\\.)*'?|"([^"]|\\.)*"?)/)) return "string";
                if (r.literal && t.indentation() > r.keyCol) return t.skipToEnd(), "string";
                if (r.literal && (r.literal = !1), t.sol()) {
                    if (r.keyCol = 0, r.pair = !1, r.pairStart = !1, t.match(/---/)) return "def";
                    if (t.match(/\.\.\./)) return "def";
                    if (t.match(/\s*-\s+/)) return "meta"
                }
                if (t.match(/^(\{|\}|\[|\])/)) return "{" == n ? r.inlinePairs++ : "}" == n ? r.inlinePairs-- : "[" == n ? r.inlineList++ : r.inlineList--, "meta";
                if (r.inlineList > 0 && !i && "," == n) return t.next(), "meta";
                if (r.inlinePairs > 0 && !i && "," == n) return r.keyCol = 0, r.pair = !1, r.pairStart = !1, t.next(), "meta";
                if (r.pairStart) {
                    if (t.match(/^\s*(\||\>)\s*/)) return r.literal = !0, "meta";
                    if (t.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i)) return "variable-2";
                    if (0 == r.inlinePairs && t.match(/^\s*-?[0-9\.\,]+\s?$/)) return "number";
                    if (r.inlinePairs > 0 && t.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/)) return "number";
                    if (t.match(e)) return "keyword"
                }
                return !r.pair && t.match(/^\s*(?:[,\[\]{}&*!|>'"%@`][^\s'":]|[^,\[\]{}#&*!|>'"%@`])[^#]*?(?=\s*:($|\s))/) ? (r.pair = !0, r.keyCol = t.indentation(), "atom") : r.pair && t.match(/^:\s*/) ? (r.pairStart = !0, "meta") : (r.pairStart = !1, r.escaped = "\\" == n, t.next(), null)
            },
            startState: function() {
                return {
                    pair: !1,
                    pairStart: !1,
                    keyCol: 0,
                    inlinePairs: 0,
                    inlineList: 0,
                    literal: !1,
                    escaped: !1
                }
            },
            lineComment: "#",
            fold: "indent"
        }
    })), e.defineMIME("text/x-yaml", "yaml"), e.defineMIME("text/yaml", "yaml")
}));
(function() {
    new(function() {
        class e {
            static cmHeadline(e, t) {
                var r, n, o, a;
                return r = e.getCursor("from"), o = e.getLine(r.line), a = {
                    line: r.line,
                    ch: 0
                }, n = {
                    line: r.line,
                    ch: o.match(/^(?:#|>)*\s*/)[0].length
                }, e.replaceRange(t, a, n)
            }
            constructor() {
                // Bindings
                this.registerEventHandlers = this.registerEventHandlers.bind(this);
                this.onUploadMarkdown = this.onUploadMarkdown.bind(this);
                this.onDownloadMarkdown = this.onDownloadMarkdown.bind(this);
                
                // Mover toda la inicialización dentro del DOMContentLoaded
                document.addEventListener('DOMContentLoaded', () => {
                    // Configuración de marked
                    marked.setOptions({
                        gfm: !0,
                        tables: !0,
                        breaks: !0,
                        pedantic: !1,
                        smartLists: !0,
                        smartypants: !0,
                        footnotes: !0,
                        highlight: function(e, t) {
                            var r, n;
                            return e && t && (
                                r = t, 
                                "c" !== t && "c++" !== t && "objectivec" !== t && 
                                "objective-c" !== t && "c#" !== t && "csharp" !== t || (r = "clike"), 
                                "html" === t && (r = "htmlmixed"), 
                                n = document.createElement("div"), 
                                CodeMirror.runMode(e, r, n), 
                                e = n.innerHTML
                            ), e
                        }
                    });
                
                    // Inicialización de elementos y datos
                    let t = document.querySelector("#source-container textarea");
                    this.preview = document.querySelector("#preview");
                    this.previewContainer = document.querySelector("#preview-container");
                    let n = window.localStorage;
                    let o = this.data;
                
                    // Cargar contenido previo si existe
                    let r = n["marqdown.lastSession"] || t.innerHTML;
                    if (r) {
                        o.codeMirror.placeholder = t.innerHTML;
                        o.codeMirror.value = r;
                        t.innerHTML = r;
                        this.data.source = r;
                        this.preview.innerHTML = marked(r);
                    }
                
                    // Inicializar CodeMirror
                    this.cm = CodeMirror.fromTextArea(t, o.codeMirror);
                
                    // Restaurar historial si existe
                    if (n["marqdown.history"] && "" !== n["marqdown.history"]) {
                        this.cm.clearHistory();
                        this.cm.setHistory(JSON.parse(n["marqdown.history"]));
                    }
                
                    // Registrar manejadores de eventos
                    this.registerEventHandlers();
                });
            }
            registerEventHandlers() {
                var e, t;
                return (t = function(e, t, r) {
                    return document.querySelector(e).addEventListener(t, r)
                })("#download-markdown", "focus", this.onDownloadMarkdown),
                t("#upload-markdown input", "change", this.onUploadMarkdown),
                this.cm.on("change", () => {
                    var e, t;
                    return e = this.cm.getValue(), t = window.localStorage, "string" == typeof e && (t["marqdown.lastSession"] = e), t["marqdown.history"] = JSON.stringify(this.cm.getHistory()), this.data.source = e, this.preview.innerHTML = marked(e || "")
                }), e = null, this.cm.on("scroll", () => (e && window.cancelAnimationFrame(e), e = window.requestAnimationFrame(() => {
                    var e, t, r;
                    return t = (r = this.cm.getScrollInfo()).height - r.clientHeight + 1, e = (r.top / t).toFixed(3), this.previewContainer.scrollTop = e * (this.previewContainer.scrollHeight - this.previewContainer.clientHeight + 1)
                }))), t("#preview-container", "scroll", t => (e && window.cancelAnimationFrame(e), e = window.requestAnimationFrame(() => {
                    var e, r, n, o;
                    return n = (r = t.target).scrollHeight - r.clientHeight + 1, e = (r.scrollTop / n).toFixed(3) * ((o = this.cm.getScrollInfo()).height - o.clientHeight + 1), this.cm.scrollTo(null, e)
                })))
            }
            onUploadMarkdown(e) {
                var t, r, n, o, a, i, l;
                try {
                    for (a = e.target.files, l = [], r = 0, n = a.length; r < n; r++) {
                        if ((t = a[r]).size > 5242880) throw new Error("Filesize greater than 5MB.");
                        if ("text/plain" !== (i = t.type) && "text/css" !== i && "text/html" !== i && "text/markdown" !== i && "application/xml" !== i && "application/markdown" !== i) throw new Error("Not supported file type");
                        (o = new FileReader).readAsText(t, "UTF-8"), o.onerror = function(e) {
                            throw new Error("Error reading file.")
                        }, l.push(o.onload = e => this.cm.setValue(e.target.result))
                    }
                    return l
                } catch (e) {
                    return alert(e)
                }
            }
            onDownloadMarkdown(e) {
                var t;
                return t = encodeURIComponent(this.data.source), e.target.href = "data:application/markdown;charset=utf-8," + t
            }
        }
        return e.prototype.data = {
            codeMirror: {
                mode: "markdown",
                theme: "marqdown",
                lineNumbers: !0,
                lineWrapping: !0,
                styleActiveLine: !0,
                foldGutter: !0,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                matchBrackets: !0,
                autoCloseBrackets: !0,
                extraKeys: {
                    Enter: "newlineAndIndentContinueMarkdownList",
                    "Ctrl-1": function(t) {
                        return e.cmHeadline(t, "# ")
                    },
                    "Ctrl-2": function(t) {
                        return e.cmHeadline(t, "## ")
                    },
                    "Ctrl-3": function(t) {
                        return e.cmHeadline(t, "### ")
                    },
                    "Ctrl-4": function(t) {
                        return e.cmHeadline(t, "#### ")
                    },
                    "Ctrl-5": function(t) {
                        return e.cmHeadline(t, "##### ")
                    },
                    "Ctrl-6": function(t) {
                        return e.cmHeadline(t, "###### ")
                    },
                    "Ctrl-0": function(t) {
                        return e.cmHeadline(t, "")
                    },
                    "Ctrl-Q": function(t) {
                        return e.cmHeadline(t, "> ")
                    },
                    "Ctrl-I": function(e) {
                        var t;
                        return t = e.getSelection(), e.replaceSelection("*" + t + "*")
                    },
                    "Ctrl-B": function(e) {
                        var t;
                        return t = e.getSelection(), e.replaceSelection("**" + t + "**")
                    },
                    "Ctrl-O": function(e) {
                        var t;
                        return t = e.getSelection(), e.replaceSelection("~~" + t + "~~")
                    },
                    "Ctrl-K": function(e) {
                        var t;
                        return t = e.getSelection(), e.replaceSelection("`" + t + "`", "around")
                    },
                    "Ctrl-H": function(e) {
                        var t;
                        return t = e.getCursor(), e.replaceRange("\n---\n\n", {
                            line: t.line,
                            ch: 0
                        })
                    },
                    "Ctrl-L": function(e) {
                        var t, r;
                        return t = e.getCursor(), (r = e.getSelection()).match(/^(http|\/\/|ftp|mailto)/) ? (e.replaceSelection(`[](${r})`), e.setCursor({
                            line: t.line,
                            ch: t.ch + 1
                        })) : r.length > 0 ? (e.replaceSelection(`[${r}]()`), e.execCommand("goColumnLeft")) : (e.replaceSelection("[]()"), e.setCursor({
                            line: t.line,
                            ch: t.ch + 1
                        }))
                    }
                }
            },
            source: "",
            scrollOffset: 0
        }, e
    }.call(this))
}).call(this);