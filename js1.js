function Carousel(e) {
    this.$root = $(e), this.maxPostsPerSlide = this.$root.data("max-posts-per-slide"), this.currentSlideIndex = 0, this.$slideContainer = this.$root.find(".slide-container"), this.$carouselElements = this._get$CarouselElements(), this.$carouselNav = this.$root.find(".carousel-nav"), this.render(), this._bindNavigationHandlers(), this._bindWindowResizeHandler()
}

function ZoogleMedia() {
    this.players = [], this.currentPlayer = undefined, this.players.remove = function (e, t) {
        var n = this.slice((t || e) + 1 || this.length);
        return this.length = e < 0 ? this.length + e : e, this.push.apply(this, n)
    }, this.getPlayers = function () {
        return this.players
    }, this.current = function () {
        return this.currentPlayer
    }, this.register = function (e) {
        this.players.push(e)
    }, this.setActive = function (e) {
        this.currentPlayer !== e && (this.pause(), this.currentPlayer = e)
    }, this.pause = function () {
        this.currentPlayer && this.currentPlayer.pause()
    }, this.pauseOnExit = function () {
        this.currentPlayer && this.currentPlayer.classList.contains("continue-on-exit") || this.pause()
    };
    var a = function (e) {
        var t = window.zgl.getClosest(e, "li");
        return t || window.zgl.getClosest(e, "td")
    };
    this.toggle = function (e) {
        var t, n, i, r = this.currentTrack,
            o = document.querySelector("a.play.current");
        if (o && (i = a(o), o.classList.remove("current"), i.classList.remove("current")), e !== undefined) return t = e.playable, n = e.player, this.setActive(n), e.classList.add("current"), (i = a(e)).classList.add("current"), t === r ? 0 === r.position && 3 === r.readyState ? r.play() : r.position >= r.duration && 1 !== r.readyState ? r.setPosition(0) : r.paused ? r.resume() : r.pause() : (window.soundManager.pauseAll(), r && 0 < r.position && handleStats(r.parent, "Skip", {
            position: r.position,
            duration: r.duration
        }), (r = t).setPosition(0), r.play()), !(this.currentTrack = r).paused;
        window.soundManager.pauseAll()
    };
    var r = ".zoogle-music-player";
    this.addPlayers = function () {
        for (var e = document.querySelectorAll(r), t = 0; t < e.length; t++) {
            var n = e[t];
            if (!n.classList.contains("registered-player")) {
                new ZoogleMediaPlayer(n), n.classList.add("registered-player");
                var i = new CustomEvent("playerAdded", {
                    detail: {
                        player: n
                    }
                });
                document.dispatchEvent(i)
            }
        }
    }, this.setup = function () {
        this.resetIfNeeded();
        var e = this;
        "undefined" != typeof window.soundManager && "undefined" == typeof window.SOUNDMANAGER_IS_SETUP ? (window.SOUNDMANAGER_IS_SETUP = !0, window.soundManager.setup({
            preferFlash: !1,
            flashVersion: 9,
            ignoreMobileRestrictions: !0,
            useHTML5Audio: !0,
            waitForWindowLoad: !0,
            debugMode: !1,
            onready: function () {
                e.isLoaded = !0, e.addPlayers()
            },
            ontimeout: function () {
                e.isLoaded = !1, document.addEventListener("click", function (e) {
                    (e.target.classList.contains("play") || e.target.classList.contains("play-button")) && e.preventDefault()
                })
            }
        })) : e.addPlayers()
    }, this.resetIfNeeded = function () {
        this.needsReset && (this.tearDown(), this.needsReset = !1)
    }, this.tearDown = function () {
        document.querySelectorAll(".registered-player").forEach(function (e) {
            e.classList.remove("registered-player")
        })
    }, this.setup()
}

function onYouTubePlayerAPIReady() {
    window.onYouTubeIframeAPIReady()
}
window.zoogle = window.zoogle || {}, Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector),
    function () {
        function e(e, t) {
            t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: undefined
            };
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
        }
        "function" != typeof window.CustomEvent && (e.prototype = window.Event.prototype, window.CustomEvent = e)
    }(), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function a(e) {
            "use strict";
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var t = Object(e), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (null != i)
                    for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
            }
            return t
        },
        writable: !0,
        configurable: !0
    }), window.zgl = {
        formatTime: function (e) {
            var t = Math.floor(e / 1e3),
                n = Math.floor(t / 60),
                i = t - 60 * n;
            return n + ":" + (i < 10 ? "0" + i : i)
        },
        escapeHTML: function (e) {
            var t = document.createElement("pre"),
                n = document.createTextNode(e);
            return t.appendChild(n), t.innerHTML
        },
        getClosest: function (e, t) {
            for (; e && e !== document; e = e.parentNode)
                if (e.matches(t)) return e;
            return null
        },
        toDom: function (e) {
            var t = document.createElement("template");
            return e = e.trim(), t.innerHTML = e, t.content ? t.content.firstChild : t.firstChild
        }
    },
    function (e, t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function (S, e) {
        function s(e) {
            var t = !!e && "length" in e && e.length,
                n = fe.type(e);
            return "function" !== n && !fe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
        }

        function t(e, n, i) {
            if (fe.isFunction(n)) return fe.grep(e, function (e, t) {
                return !!n.call(e, t, e) !== i
            });
            if (n.nodeType) return fe.grep(e, function (e) {
                return e === n !== i
            });
            if ("string" == typeof n) {
                if (Se.test(n)) return fe.filter(n, e, i);
                n = fe.filter(n, e)
            }
            return fe.grep(e, function (e) {
                return -1 < fe.inArray(e, n) !== i
            })
        }

        function n(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function c(e) {
            var n = {};
            return fe.each(e.match(Me) || [], function (e, t) {
                n[t] = !0
            }), n
        }

        function r() {
            ie.addEventListener ? (ie.removeEventListener("DOMContentLoaded", o), S.removeEventListener("load", o)) : (ie.detachEvent("onreadystatechange", o), S.detachEvent("onload", o))
        }

        function o() {
            (ie.addEventListener || "load" === S.event.type || "complete" === ie.readyState) && (r(), fe.ready())
        }

        function l(e, t, n) {
            if (n === undefined && 1 === e.nodeType) {
                var i = "data-" + t.replace(De, "-$1").toLowerCase();
                if ("string" == typeof (n = e.getAttribute(i))) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Ie.test(n) ? fe.parseJSON(n) : n)
                    } catch (r) {}
                    fe.data(e, t, n)
                } else n = undefined
            }
            return n
        }

        function u(e) {
            var t;
            for (t in e)
                if (("data" !== t || !fe.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
            return !0
        }

        function i(e, t, n, i) {
            if (Pe(e)) {
                var r, o, a = fe.expando,
                    s = e.nodeType,
                    l = s ? fe.cache : e,
                    u = s ? e[a] : e[a] && a;
                if (u && l[u] && (i || l[u].data) || n !== undefined || "string" != typeof t) return u || (u = s ? e[a] = ne.pop() || fe.guid++ : a), l[u] || (l[u] = s ? {} : {
                    toJSON: fe.noop
                }), "object" != typeof t && "function" != typeof t || (i ? l[u] = fe.extend(l[u], t) : l[u].data = fe.extend(l[u].data, t)), o = l[u], i || (o.data || (o.data = {}), o = o.data), n !== undefined && (o[fe.camelCase(t)] = n), "string" == typeof t ? null == (r = o[t]) && (r = o[fe.camelCase(t)]) : r = o, r
            }
        }

        function a(e, t, n) {
            if (Pe(e)) {
                var i, r, o = e.nodeType,
                    a = o ? fe.cache : e,
                    s = o ? e[fe.expando] : fe.expando;
                if (a[s]) {
                    if (t && (i = n ? a[s] : a[s].data)) {
                        r = (t = fe.isArray(t) ? t.concat(fe.map(t, fe.camelCase)) : t in i ? [t] : (t = fe.camelCase(t)) in i ? [t] : t.split(" ")).length;
                        for (; r--;) delete i[t[r]];
                        if (n ? !u(i) : !fe.isEmptyObject(i)) return
                    }(n || (delete a[s].data, u(a[s]))) && (o ? fe.cleanData([e], !0) : de.deleteExpando || a != a.window ? delete a[s] : a[s] = undefined)
                }
            }
        }

        function d(e, t, n, i) {
            var r, o = 1,
                a = 20,
                s = i ? function () {
                    return i.cur()
                } : function () {
                    return fe.css(e, t, "")
                },
                l = s(),
                u = n && n[3] || (fe.cssNumber[t] ? "" : "px"),
                c = (fe.cssNumber[t] || "px" !== u && +l) && Re.exec(fe.css(e, t));
            if (c && c[3] !== u)
                for (u = u || c[3], n = n || [], c = +l || 1; c /= o = o || ".5", fe.style(e, t, c + u), o !== (o = s() / l) && 1 !== o && --a;);
            return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r
        }

        function g(e) {
            var t = Ve.split("|"),
                n = e.createDocumentFragment();
            if (n.createElement)
                for (; t.length;) n.createElement(t.pop());
            return n
        }

        function y(e, t) {
            var n, i, r = 0,
                o = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : undefined;
            if (!o)
                for (o = [], n = e.childNodes || e; null != (i = n[r]); r++) !t || fe.nodeName(i, t) ? o.push(i) : fe.merge(o, y(i, t));
            return t === undefined || t && fe.nodeName(e, t) ? fe.merge([e], o) : o
        }

        function v(e, t) {
            for (var n, i = 0; null != (n = e[i]); i++) fe._data(n, "globalEval", !t || fe._data(t[i], "globalEval"))
        }

        function w(e) {
            We.test(e.type) && (e.defaultChecked = e.checked)
        }

        function m(e, t, n, i, r) {
            for (var o, a, s, l, u, c, d, h = e.length, f = g(t), p = [], m = 0; m < h; m++)
                if ((a = e[m]) || 0 === a)
                    if ("object" === fe.type(a)) fe.merge(p, a.nodeType ? [a] : a);
                    else if (Qe.test(a)) {
                for (l = l || f.appendChild(t.createElement("div")), u = (Be.exec(a) || ["", ""])[1].toLowerCase(), d = Ge[u] || Ge._default, l.innerHTML = d[1] + fe.htmlPrefilter(a) + d[2], o = d[0]; o--;) l = l.lastChild;
                if (!de.leadingWhitespace && Ue.test(a) && p.push(t.createTextNode(Ue.exec(a)[0])), !de.tbody)
                    for (o = (a = "table" !== u || Je.test(a) ? "<table>" !== d[1] || Je.test(a) ? 0 : l : l.firstChild) && a.childNodes.length; o--;) fe.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c);
                for (fe.merge(p, l.childNodes), l.textContent = ""; l.firstChild;) l.removeChild(l.firstChild);
                l = f.lastChild
            } else p.push(t.createTextNode(a));
            for (l && f.removeChild(l), de.appendChecked || fe.grep(y(p, "input"), w), m = 0; a = p[m++];)
                if (i && -1 < fe.inArray(a, i)) r && r.push(a);
                else if (s = fe.contains(a.ownerDocument, a), l = y(f.appendChild(a), "script"), s && v(l), n)
                for (o = 0; a = l[o++];) Ye.test(a.type || "") && n.push(a);
            return l = null, f
        }

        function h() {
            return !0
        }

        function f() {
            return !1
        }

        function p() {
            try {
                return ie.activeElement
            } catch (e) {}
        }

        function b(e, t, n, i, r, o) {
            var a, s;
            if ("object" == typeof t) {
                for (s in "string" != typeof n && (i = i || n, n = undefined), t) b(e, s, n, i, t[s], o);
                return e
            }
            if (null == i && null == r ? (r = n, i = n = undefined) : null == r && ("string" == typeof n ? (r = i, i = undefined) : (r = i, i = n, n = undefined)), !1 === r) r = f;
            else if (!r) return e;
            return 1 === o && (a = r, (r = function (e) {
                return fe().off(e), a.apply(this, arguments)
            }).guid = a.guid || (a.guid = fe.guid++)), e.each(function () {
                fe.event.add(this, t, r, i, n)
            })
        }

        function _(e, t) {
            return fe.nodeName(e, "table") && fe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function x(e) {
            return e.type = (null !== fe.find.attr(e, "type")) + "/" + e.type, e
        }

        function k(e) {
            var t = st.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function T(e, t) {
            if (1 === t.nodeType && fe.hasData(e)) {
                var n, i, r, o = fe._data(e),
                    a = fe._data(t, o),
                    s = o.events;
                if (s)
                    for (n in delete a.handle, a.events = {}, s)
                        for (i = 0, r = s[n].length; i < r; i++) fe.event.add(t, n, s[n][i]);
                a.data && (a.data = fe.extend({}, a.data))
            }
        }

        function C(e, t) {
            var n, i, r;
            if (1 === t.nodeType) {
                if (n = t.nodeName.toLowerCase(), !de.noCloneEvent && t[fe.expando]) {
                    for (i in (r = fe._data(t)).events) fe.removeEvent(t, i, r.handle);
                    t.removeAttribute(fe.expando)
                }
                "script" === n && t.text !== e.text ? (x(t).text = e.text, k(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), de.html5Clone && e.innerHTML && !fe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && We.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
            }
        }

        function E(n, i, r, o) {
            i = oe.apply([], i);
            var e, t, a, s, l, u, c = 0,
                d = n.length,
                h = d - 1,
                f = i[0],
                p = fe.isFunction(f);
            if (p || 1 < d && "string" == typeof f && !de.checkClone && at.test(f)) return n.each(function (e) {
                var t = n.eq(e);
                p && (i[0] = f.call(this, e, t.html())), E(t, i, r, o)
            });
            if (d && (e = (u = m(i, n[0].ownerDocument, !1, n, o)).firstChild, 1 === u.childNodes.length && (u = e), e || o)) {
                for (a = (s = fe.map(y(u, "script"), x)).length; c < d; c++) t = u, c !== h && (t = fe.clone(t, !0, !0), a && fe.merge(s, y(t, "script"))), r.call(n[c], t, c);
                if (a)
                    for (l = s[s.length - 1].ownerDocument, fe.map(s, k), c = 0; c < a; c++) t = s[c], Ye.test(t.type || "") && !fe._data(t, "globalEval") && fe.contains(l, t) && (t.src ? fe._evalUrl && fe._evalUrl(t.src) : fe.globalEval((t.text || t.textContent || t.innerHTML || "").replace(lt, "")));
                u = e = null
            }
            return n
        }

        function A(e, t, n) {
            for (var i, r = t ? fe.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || fe.cleanData(y(i)), i.parentNode && (n && fe.contains(i.ownerDocument, i) && v(y(i, "script")), i.parentNode.removeChild(i));
            return e
        }

        function $(e, t) {
            var n = fe(t.createElement(e)).appendTo(t.body),
                i = fe.css(n[0], "display");
            return n.detach(), i
        }

        function M(e) {
            var t = ie,
                n = dt[e];
            return n || ("none" !== (n = $(e, t)) && n || ((t = ((ct = (ct || fe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || ct[0].contentDocument).document).write(), t.close(), n = $(e, t), ct.detach()), dt[e] = n), n
        }

        function L(e, t) {
            return {
                get: function () {
                    if (!e()) return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }

        function P(e) {
            if (e in Ct) return e;
            for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = Tt.length; n--;)
                if ((e = Tt[n] + t) in Ct) return e
        }

        function I(e, t) {
            for (var n, i, r, o = [], a = 0, s = e.length; a < s; a++)(i = e[a]).style && (o[a] = fe._data(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Fe(i) && (o[a] = fe._data(i, "olddisplay", M(i.nodeName)))) : (r = Fe(i), (n && "none" !== n || !r) && fe._data(i, "olddisplay", r ? n : fe.css(i, "display"))));
            for (a = 0; a < s; a++)(i = e[a]).style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
            return e
        }

        function D(e, t, n) {
            var i = xt.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
        }

        function O(e, t, n, i, r) {
            for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += fe.css(e, n + He[o], !0, r)), i ? ("content" === n && (a -= fe.css(e, "padding" + He[o], !0, r)), "margin" !== n && (a -= fe.css(e, "border" + He[o] + "Width", !0, r))) : (a += fe.css(e, "padding" + He[o], !0, r), "padding" !== n && (a += fe.css(e, "border" + He[o] + "Width", !0, r)));
            return a
        }

        function N(e, t, n) {
            var i = !0,
                r = "width" === t ? e.offsetWidth : e.offsetHeight,
                o = gt(e),
                a = de.boxSizing && "border-box" === fe.css(e, "boxSizing", !1, o);
            if (r <= 0 || null == r) {
                if (((r = yt(e, t, o)) < 0 || null == r) && (r = e.style[t]), ft.test(r)) return r;
                i = a && (de.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
            }
            return r + O(e, t, n || (a ? "border" : "content"), i, o) + "px"
        }

        function j(e, t, n, i, r) {
            return new j.prototype.init(e, t, n, i, r)
        }

        function z() {
            return S.setTimeout(function () {
                Et = undefined
            }), Et = fe.now()
        }

        function R(e, t) {
            var n, i = {
                    height: e
                },
                r = 0;
            for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = He[r])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function H(e, t, n) {
            for (var i, r = (W.tweeners[t] || []).concat(W.tweeners["*"]), o = 0, a = r.length; o < a; o++)
                if (i = r[o].call(n, t, e)) return i
        }

        function F(t, e, n) {
            var i, r, o, a, s, l, u, c = this,
                d = {},
                h = t.style,
                f = t.nodeType && Fe(t),
                p = fe._data(t, "fxshow");
            for (i in n.queue || (null == (s = fe._queueHooks(t, "fx")).unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
                    s.unqueued || l()
                }), s.unqueued++, c.always(function () {
                    c.always(function () {
                        s.unqueued--, fe.queue(t, "fx").length || s.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === ("none" === (u = fe.css(t, "display")) ? fe._data(t, "olddisplay") || M(t.nodeName) : u) && "none" === fe.css(t, "float") && (de.inlineBlockNeedsLayout && "inline" !== M(t.nodeName) ? h.zoom = 1 : h.display = "inline-block")), n.overflow && (h.overflow = "hidden", de.shrinkWrapBlocks() || c.always(function () {
                    h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                })), e)
                if (r = e[i], Dt.exec(r)) {
                    if (delete e[i], o = o || "toggle" === r, r === (f ? "hide" : "show")) {
                        if ("show" !== r || !p || p[i] === undefined) continue;
                        f = !0
                    }
                    d[i] = p && p[i] || fe.style(t, i)
                } else u = undefined;
            if (fe.isEmptyObject(d)) "inline" === ("none" === u ? M(t.nodeName) : u) && (h.display = u);
            else
                for (i in p ? "hidden" in p && (f = p.hidden) : p = fe._data(t, "fxshow", {}), o && (p.hidden = !f), f ? fe(t).show() : c.done(function () {
                        fe(t).hide()
                    }), c.done(function () {
                        var e;
                        for (e in fe._removeData(t, "fxshow"), d) fe.style(t, e, d[e])
                    }), d) a = H(f ? p[i] : 0, i, c), i in p || (p[i] = a.start, f && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
        }

        function q(e, t) {
            var n, i, r, o, a;
            for (n in e)
                if (r = t[i = fe.camelCase(n)], o = e[n], fe.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), (a = fe.cssHooks[i]) && "expand" in a)
                    for (n in o = a.expand(o), delete e[i], o) n in e || (e[n] = o[n], t[n] = r);
                else t[i] = r
        }

        function W(o, e, t) {
            var n, a, i = 0,
                r = W.prefilters.length,
                s = fe.Deferred().always(function () {
                    delete l.elem
                }),
                l = function () {
                    if (a) return !1;
                    for (var e = Et || z(), t = Math.max(0, u.startTime + u.duration - e), n = 1 - (t / u.duration || 0), i = 0, r = u.tweens.length; i < r; i++) u.tweens[i].run(n);
                    return s.notifyWith(o, [u, n, t]), n < 1 && r ? t : (s.resolveWith(o, [u]), !1)
                },
                u = s.promise({
                    elem: o,
                    props: fe.extend({}, e),
                    opts: fe.extend(!0, {
                        specialEasing: {},
                        easing: fe.easing._default
                    }, t),
                    originalProperties: e,
                    originalOptions: t,
                    startTime: Et || z(),
                    duration: t.duration,
                    tweens: [],
                    createTween: function (e, t) {
                        var n = fe.Tween(o, u.opts, e, t, u.opts.specialEasing[e] || u.opts.easing);
                        return u.tweens.push(n), n
                    },
                    stop: function (e) {
                        var t = 0,
                            n = e ? u.tweens.length : 0;
                        if (a) return this;
                        for (a = !0; t < n; t++) u.tweens[t].run(1);
                        return e ? (s.notifyWith(o, [u, 1, 0]), s.resolveWith(o, [u, e])) : s.rejectWith(o, [u, e]), this
                    }
                }),
                c = u.props;
            for (q(c, u.opts.specialEasing); i < r; i++)
                if (n = W.prefilters[i].call(u, o, c, u.opts)) return fe.isFunction(n.stop) && (fe._queueHooks(u.elem, u.opts.queue).stop = fe.proxy(n.stop, n)), n;
            return fe.map(c, H, u), fe.isFunction(u.opts.start) && u.opts.start.call(o, u), fe.fx.timer(fe.extend(l, {
                elem: o,
                anim: u,
                queue: u.opts.queue
            })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }

        function B(e) {
            return fe.attr(e, "class") || ""
        }

        function Y(o) {
            return function (e, t) {
                "string" != typeof e && (t = e, e = "*");
                var n, i = 0,
                    r = e.toLowerCase().match(Me) || [];
                if (fe.isFunction(t))
                    for (; n = r[i++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
            }
        }

        function U(t, r, o, a) {
            function s(e) {
                var i;
                return l[e] = !0, fe.each(t[e] || [], function (e, t) {
                    var n = t(r, o, a);
                    return "string" != typeof n || u || l[n] ? u ? !(i = n) : void 0 : (r.dataTypes.unshift(n), s(n), !1)
                }), i
            }
            var l = {},
                u = t === an;
            return s(r.dataTypes[0]) || !l["*"] && s("*")
        }

        function V(e, t) {
            var n, i, r = fe.ajaxSettings.flatOptions || {};
            for (i in t) t[i] !== undefined && ((r[i] ? e : n || (n = {}))[i] = t[i]);
            return n && fe.extend(!0, e, n), e
        }

        function G(e, t, n) {
            for (var i, r, o, a, s = e.contents, l = e.dataTypes;
                "*" === l[0];) l.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r)
                for (a in s)
                    if (s[a] && s[a].test(r)) {
                        l.unshift(a);
                        break
                    } if (l[0] in n) o = l[0];
            else {
                for (a in n) {
                    if (!l[0] || e.converters[a + " " + l[0]]) {
                        o = a;
                        break
                    }
                    i || (i = a)
                }
                o = o || i
            }
            if (o) return o !== l[0] && l.unshift(o), n[o]
        }

        function Q(e, t, n, i) {
            var r, o, a, s, l, u = {},
                c = e.dataTypes.slice();
            if (c[1])
                for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
            for (o = c.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                if (!(a = u[l + " " + o] || u["* " + o]))
                    for (r in u)
                        if ((s = r.split(" "))[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                            !0 === a ? a = u[r] : !0 !== u[r] && (o = s[0], c.unshift(s[1]));
                            break
                        } if (!0 !== a)
                    if (a && e["throws"]) t = a(t);
                    else try {
                        t = a(t)
                    } catch (d) {
                        return {
                            state: "parsererror",
                            error: a ? d : "No conversion from " + l + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function J(e) {
            return e.style && e.style.display || fe.css(e, "display")
        }

        function Z(e) {
            if (!fe.contains(e.ownerDocument || ie, e)) return !0;
            for (; e && 1 === e.nodeType;) {
                if ("none" === J(e) || "hidden" === e.type) return !0;
                e = e.parentNode
            }
            return !1
        }

        function K(n, e, i, r) {
            var t;
            if (fe.isArray(e)) fe.each(e, function (e, t) {
                i || dn.test(n) ? r(n, t) : K(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, i, r)
            });
            else if (i || "object" !== fe.type(e)) r(n, e);
            else
                for (t in e) K(n + "[" + t + "]", e[t], i, r)
        }

        function X() {
            try {
                return new S.XMLHttpRequest
            } catch (e) {}
        }

        function ee() {
            try {
                return new S.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function te(e) {
            return fe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
        }
        var ne = [],
            ie = S.document,
            re = ne.slice,
            oe = ne.concat,
            ae = ne.push,
            se = ne.indexOf,
            le = {},
            ue = le.toString,
            ce = le.hasOwnProperty,
            de = {},
            he = "1.12.4",
            fe = function (e, t) {
                return new fe.fn.init(e, t)
            },
            pe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            me = /^-ms-/,
            ge = /-([\da-z])/gi,
            ye = function (e, t) {
                return t.toUpperCase()
            };
        fe.fn = fe.prototype = {
            jquery: he,
            constructor: fe,
            selector: "",
            length: 0,
            toArray: function () {
                return re.call(this)
            },
            get: function (e) {
                return null != e ? e < 0 ? this[e + this.length] : this[e] : re.call(this)
            },
            pushStack: function (e) {
                var t = fe.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function (e) {
                return fe.each(this, e)
            },
            map: function (n) {
                return this.pushStack(fe.map(this, function (e, t) {
                    return n.call(e, t, e)
                }))
            },
            slice: function () {
                return this.pushStack(re.apply(this, arguments))
            },
            first: function () {
                return this.eq(0)
            },
            last: function () {
                return this.eq(-1)
            },
            eq: function (e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(0 <= n && n < t ? [this[n]] : [])
            },
            end: function () {
                return this.prevObject || this.constructor()
            },
            push: ae,
            sort: ne.sort,
            splice: ne.splice
        }, fe.extend = fe.fn.extend = function (e) {
            var t, n, i, r, o, a, s = e || {},
                l = 1,
                u = arguments.length,
                c = !1;
            for ("boolean" == typeof s && (c = s, s = arguments[l] || {}, l++), "object" == typeof s || fe.isFunction(s) || (s = {}), l === u && (s = this, l--); l < u; l++)
                if (null != (o = arguments[l]))
                    for (r in o) t = s[r], s !== (i = o[r]) && (c && i && (fe.isPlainObject(i) || (n = fe.isArray(i))) ? (n ? (n = !1, a = t && fe.isArray(t) ? t : []) : a = t && fe.isPlainObject(t) ? t : {}, s[r] = fe.extend(c, a, i)) : i !== undefined && (s[r] = i));
            return s
        }, fe.extend({
            expando: "jQuery" + (he + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (e) {
                throw new Error(e)
            },
            noop: function () {},
            isFunction: function (e) {
                return "function" === fe.type(e)
            },
            isArray: Array.isArray || function (e) {
                return "array" === fe.type(e)
            },
            isWindow: function (e) {
                return null != e && e == e.window
            },
            isNumeric: function (e) {
                var t = e && e.toString();
                return !fe.isArray(e) && 0 <= t - parseFloat(t) + 1
            },
            isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            isPlainObject: function (e) {
                var t;
                if (!e || "object" !== fe.type(e) || e.nodeType || fe.isWindow(e)) return !1;
                try {
                    if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (n) {
                    return !1
                }
                if (!de.ownFirst)
                    for (t in e) return ce.call(e, t);
                for (t in e);
                return t === undefined || ce.call(e, t)
            },
            type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? le[ue.call(e)] || "object" : typeof e
            },
            globalEval: function (e) {
                e && fe.trim(e) && (S.execScript || function (e) {
                    S.eval.call(S, e)
                })(e)
            },
            camelCase: function (e) {
                return e.replace(me, "ms-").replace(ge, ye)
            },
            nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function (e, t) {
                var n, i = 0;
                if (s(e))
                    for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
                else
                    for (i in e)
                        if (!1 === t.call(e[i], i, e[i])) break;
                return e
            },
            trim: function (e) {
                return null == e ? "" : (e + "").replace(pe, "")
            },
            makeArray: function (e, t) {
                var n = t || [];
                return null != e && (s(Object(e)) ? fe.merge(n, "string" == typeof e ? [e] : e) : ae.call(n, e)), n
            },
            inArray: function (e, t, n) {
                var i;
                if (t) {
                    if (se) return se.call(t, e, n);
                    for (i = t.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
                        if (n in t && t[n] === e) return n
                }
                return -1
            },
            merge: function (e, t) {
                for (var n = +t.length, i = 0, r = e.length; i < n;) e[r++] = t[i++];
                if (n != n)
                    for (; t[i] !== undefined;) e[r++] = t[i++];
                return e.length = r, e
            },
            grep: function (e, t, n) {
                for (var i = [], r = 0, o = e.length, a = !n; r < o; r++) !t(e[r], r) !== a && i.push(e[r]);
                return i
            },
            map: function (e, t, n) {
                var i, r, o = 0,
                    a = [];
                if (s(e))
                    for (i = e.length; o < i; o++) null != (r = t(e[o], o, n)) && a.push(r);
                else
                    for (o in e) null != (r = t(e[o], o, n)) && a.push(r);
                return oe.apply([], a)
            },
            guid: 1,
            proxy: function (e, t) {
                var n, i, r;
                return "string" == typeof t && (r = e[t], t = e, e = r), fe.isFunction(e) ? (n = re.call(arguments, 2), (i = function () {
                    return e.apply(t || this, n.concat(re.call(arguments)))
                }).guid = e.guid = e.guid || fe.guid++, i) : undefined
            },
            now: function () {
                return +new Date
            },
            support: de
        }), "function" == typeof Symbol && (fe.fn[Symbol.iterator] = ne[Symbol.iterator]), fe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
            le["[object " + t + "]"] = t.toLowerCase()
        });
        var ve = function (n) {
            function b(e, t, n, i) {
                var r, o, a, s, l, u, c, d, h = t && t.ownerDocument,
                    f = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== f && 9 !== f && 11 !== f) return n;
                if (!i && ((t ? t.ownerDocument || t : H) !== P && L(t), t = t || P, D)) {
                    if (11 !== f && (u = ye.exec(e)))
                        if (r = u[1]) {
                            if (9 === f) {
                                if (!(a = t.getElementById(r))) return n;
                                if (a.id === r) return n.push(a), n
                            } else if (h && (a = h.getElementById(r)) && z(t, a) && a.id === r) return n.push(a), n
                        } else {
                            if (u[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                            if ((r = u[3]) && y.getElementsByClassName && t.getElementsByClassName) return K.apply(n, t.getElementsByClassName(r)), n
                        } if (y.qsa && !Y[e + " "] && (!O || !O.test(e))) {
                        if (1 !== f) h = t, d = e;
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((s = t.getAttribute("id")) ? s = s.replace(we, "\\$&") : t.setAttribute("id", s = R), o = (c = T(e)).length, l = he.test(s) ? "#" + s : "[id='" + s + "']"; o--;) c[o] = l + " " + g(c[o]);
                            d = c.join(","), h = ve.test(e) && m(t.parentNode) || t
                        }
                        if (d) try {
                            return K.apply(n, h.querySelectorAll(d)), n
                        } catch (p) {} finally {
                            s === R && t.removeAttribute("id")
                        }
                    }
                }
                return E(e.replace(se, "$1"), t, n, i)
            }

            function e() {
                function n(e, t) {
                    return i.push(e + " ") > x.cacheLength && delete n[i.shift()], n[e + " "] = t
                }
                var i = [];
                return n
            }

            function l(e) {
                return e[R] = !0, e
            }

            function r(e) {
                var t = P.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function t(e, t) {
                for (var n = e.split("|"), i = n.length; i--;) x.attrHandle[n[i]] = t
            }

            function u(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function i(t) {
                return function (e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }

            function o(n) {
                return function (e) {
                    var t = e.nodeName.toLowerCase();
                    return ("input" === t || "button" === t) && e.type === n
                }
            }

            function a(a) {
                return l(function (o) {
                    return o = +o, l(function (e, t) {
                        for (var n, i = a([], e.length, o), r = i.length; r--;) e[n = i[r]] && (e[n] = !(t[n] = e[n]))
                    })
                })
            }

            function m(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function s() {}

            function g(e) {
                for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                return i
            }

            function d(s, e, t) {
                var l = e.dir,
                    u = t && "parentNode" === l,
                    c = q++;
                return e.first ? function (e, t, n) {
                    for (; e = e[l];)
                        if (1 === e.nodeType || u) return s(e, t, n)
                } : function (e, t, n) {
                    var i, r, o, a = [F, c];
                    if (n) {
                        for (; e = e[l];)
                            if ((1 === e.nodeType || u) && s(e, t, n)) return !0
                    } else
                        for (; e = e[l];)
                            if (1 === e.nodeType || u) {
                                if ((i = (r = (o = e[R] || (e[R] = {}))[e.uniqueID] || (o[e.uniqueID] = {}))[l]) && i[0] === F && i[1] === c) return a[2] = i[2];
                                if ((r[l] = a)[2] = s(e, t, n)) return !0
                            }
                }
            }

            function h(r) {
                return 1 < r.length ? function (e, t, n) {
                    for (var i = r.length; i--;)
                        if (!r[i](e, t, n)) return !1;
                    return !0
                } : r[0]
            }

            function v(e, t, n) {
                for (var i = 0, r = t.length; i < r; i++) b(e, t[i], n);
                return n
            }

            function _(e, t, n, i, r) {
                for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++)(o = e[s]) && (n && !n(o, i, r) || (a.push(o), u && t.push(s)));
                return a
            }

            function w(f, p, m, g, y, e) {
                return g && !g[R] && (g = w(g)), y && !y[R] && (y = w(y, e)), l(function (e, t, n, i) {
                    var r, o, a, s = [],
                        l = [],
                        u = t.length,
                        c = e || v(p || "*", n.nodeType ? [n] : n, []),
                        d = !f || !e && p ? c : _(c, s, f, n, i),
                        h = m ? y || (e ? f : u || g) ? [] : t : d;
                    if (m && m(d, h, n, i), g)
                        for (r = _(h, l), g(r, [], n, i), o = r.length; o--;)(a = r[o]) && (h[l[o]] = !(d[l[o]] = a));
                    if (e) {
                        if (y || f) {
                            if (y) {
                                for (r = [], o = h.length; o--;)(a = h[o]) && r.push(d[o] = a);
                                y(null, h = [], r, i)
                            }
                            for (o = h.length; o--;)(a = h[o]) && -1 < (r = y ? ee(e, a) : s[o]) && (e[r] = !(t[r] = a))
                        }
                    } else h = _(h === t ? h.splice(u, h.length) : h), y ? y(null, t, h, i) : K.apply(t, h)
                })
            }

            function f(e) {
                for (var r, t, n, i = e.length, o = x.relative[e[0].type], a = o || x.relative[" "], s = o ? 1 : 0, l = d(function (e) {
                        return e === r
                    }, a, !0), u = d(function (e) {
                        return -1 < ee(r, e)
                    }, a, !0), c = [function (e, t, n) {
                        var i = !o && (n || t !== A) || ((r = t).nodeType ? l(e, t, n) : u(e, t, n));
                        return r = null, i
                    }]; s < i; s++)
                    if (t = x.relative[e[s].type]) c = [d(h(c), t)];
                    else {
                        if ((t = x.filter[e[s].type].apply(null, e[s].matches))[R]) {
                            for (n = ++s; n < i && !x.relative[e[n].type]; n++);
                            return w(1 < s && h(c), 1 < s && g(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace(se, "$1"), t, s < n && f(e.slice(s, n)), n < i && f(e = e.slice(n)), n < i && g(e))
                        }
                        c.push(t)
                    } return h(c)
            }

            function c(g, y) {
                var v = 0 < y.length,
                    w = 0 < g.length,
                    e = function (e, t, n, i, r) {
                        var o, a, s, l = 0,
                            u = "0",
                            c = e && [],
                            d = [],
                            h = A,
                            f = e || w && x.find.TAG("*", r),
                            p = F += null == h ? 1 : Math.random() || .1,
                            m = f.length;
                        for (r && (A = t === P || t || r); u !== m && null != (o = f[u]); u++) {
                            if (w && o) {
                                for (a = 0, t || o.ownerDocument === P || (L(o), n = !D); s = g[a++];)
                                    if (s(o, t || P, n)) {
                                        i.push(o);
                                        break
                                    } r && (F = p)
                            }
                            v && ((o = !s && o) && l--, e && c.push(o))
                        }
                        if (l += u, v && u !== l) {
                            for (a = 0; s = y[a++];) s(c, d, t, n);
                            if (e) {
                                if (0 < l)
                                    for (; u--;) c[u] || d[u] || (d[u] = J.call(i));
                                d = _(d)
                            }
                            K.apply(i, d), r && !e && 0 < d.length && 1 < l + y.length && b.uniqueSort(i)
                        }
                        return r && (F = p, A = h), c
                    };
                return v ? l(e) : e
            }
            var p, y, x, S, k, T, C, E, A, $, M, L, P, I, D, O, N, j, z, R = "sizzle" + 1 * new Date,
                H = n.document,
                F = 0,
                q = 0,
                W = e(),
                B = e(),
                Y = e(),
                U = function (e, t) {
                    return e === t && (M = !0), 0
                },
                V = 1 << 31,
                G = {}.hasOwnProperty,
                Q = [],
                J = Q.pop,
                Z = Q.push,
                K = Q.push,
                X = Q.slice,
                ee = function (e, t) {
                    for (var n = 0, i = e.length; n < i; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
                ae = new RegExp(ne + "+", "g"),
                se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                le = new RegExp("^" + ne + "*," + ne + "*"),
                ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                de = new RegExp(oe),
                he = new RegExp("^" + ie + "$"),
                fe = {
                    ID: new RegExp("^#(" + ie + ")"),
                    CLASS: new RegExp("^\\.(" + ie + ")"),
                    TAG: new RegExp("^(" + ie + "|[*])"),
                    ATTR: new RegExp("^" + re),
                    PSEUDO: new RegExp("^" + oe),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                pe = /^(?:input|select|textarea|button)$/i,
                me = /^h\d$/i,
                ge = /^[^{]+\{\s*\[native \w/,
                ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ve = /[+~]/,
                we = /'|\\/g,
                be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                _e = function (e, t, n) {
                    var i = "0x" + t - 65536;
                    return i != i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                xe = function () {
                    L()
                };
            try {
                K.apply(Q = X.call(H.childNodes), H.childNodes), Q[H.childNodes.length].nodeType
            } catch (Se) {
                K = {
                    apply: Q.length ? function (e, t) {
                        Z.apply(e, X.call(t))
                    } : function (e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }
                }
            }
            for (p in y = b.support = {}, k = b.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }, L = b.setDocument = function (e) {
                    var t, n, i = e ? e.ownerDocument || e : H;
                    return i !== P && 9 === i.nodeType && i.documentElement && (I = (P = i).documentElement, D = !k(P), (n = P.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), y.attributes = r(function (e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), y.getElementsByTagName = r(function (e) {
                        return e.appendChild(P.createComment("")), !e.getElementsByTagName("*").length
                    }), y.getElementsByClassName = ge.test(P.getElementsByClassName), y.getById = r(function (e) {
                        return I.appendChild(e).id = R, !P.getElementsByName || !P.getElementsByName(R).length
                    }), y.getById ? (x.find.ID = function (e, t) {
                        if ("undefined" != typeof t.getElementById && D) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }, x.filter.ID = function (e) {
                        var t = e.replace(be, _e);
                        return function (e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete x.find.ID, x.filter.ID = function (e) {
                        var n = e.replace(be, _e);
                        return function (e) {
                            var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return t && t.value === n
                        }
                    }), x.find.TAG = y.getElementsByTagName ? function (e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : y.qsa ? t.querySelectorAll(e) : void 0
                    } : function (e, t) {
                        var n, i = [],
                            r = 0,
                            o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                            return i
                        }
                        return o
                    }, x.find.CLASS = y.getElementsByClassName && function (e, t) {
                        if ("undefined" != typeof t.getElementsByClassName && D) return t.getElementsByClassName(e)
                    }, N = [], O = [], (y.qsa = ge.test(P.querySelectorAll)) && (r(function (e) {
                        I.appendChild(e).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && O.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || O.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + R + "-]").length || O.push("~="), e.querySelectorAll(":checked").length || O.push(":checked"), e.querySelectorAll("a#" + R + "+*").length || O.push(".#.+[+~]")
                    }), r(function (e) {
                        var t = P.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && O.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), O.push(",.*:")
                    })), (y.matchesSelector = ge.test(j = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && r(function (e) {
                        y.disconnectedMatch = j.call(e, "div"), j.call(e, "[s!='']:x"), N.push("!=", oe)
                    }), O = O.length && new RegExp(O.join("|")), N = N.length && new RegExp(N.join("|")), t = ge.test(I.compareDocumentPosition), z = t || ge.test(I.contains) ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                    } : function (e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, U = t ? function (e, t) {
                        if (e === t) return M = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !y.sortDetached && t.compareDocumentPosition(e) === n ? e === P || e.ownerDocument === H && z(H, e) ? -1 : t === P || t.ownerDocument === H && z(H, t) ? 1 : $ ? ee($, e) - ee($, t) : 0 : 4 & n ? -1 : 1)
                    } : function (e, t) {
                        if (e === t) return M = !0, 0;
                        var n, i = 0,
                            r = e.parentNode,
                            o = t.parentNode,
                            a = [e],
                            s = [t];
                        if (!r || !o) return e === P ? -1 : t === P ? 1 : r ? -1 : o ? 1 : $ ? ee($, e) - ee($, t) : 0;
                        if (r === o) return u(e, t);
                        for (n = e; n = n.parentNode;) a.unshift(n);
                        for (n = t; n = n.parentNode;) s.unshift(n);
                        for (; a[i] === s[i];) i++;
                        return i ? u(a[i], s[i]) : a[i] === H ? -1 : s[i] === H ? 1 : 0
                    }), P
                }, b.matches = function (e, t) {
                    return b(e, null, null, t)
                }, b.matchesSelector = function (e, t) {
                    if ((e.ownerDocument || e) !== P && L(e), t = t.replace(ce, "='$1']"), y.matchesSelector && D && !Y[t + " "] && (!N || !N.test(t)) && (!O || !O.test(t))) try {
                        var n = j.call(e, t);
                        if (n || y.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                    } catch (Se) {}
                    return 0 < b(t, P, null, [e]).length
                }, b.contains = function (e, t) {
                    return (e.ownerDocument || e) !== P && L(e), z(e, t)
                }, b.attr = function (e, t) {
                    (e.ownerDocument || e) !== P && L(e);
                    var n = x.attrHandle[t.toLowerCase()],
                        i = n && G.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !D) : undefined;
                    return i !== undefined ? i : y.attributes || !D ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                }, b.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, b.uniqueSort = function (e) {
                    var t, n = [],
                        i = 0,
                        r = 0;
                    if (M = !y.detectDuplicates, $ = !y.sortStable && e.slice(0), e.sort(U), M) {
                        for (; t = e[r++];) t === e[r] && (i = n.push(r));
                        for (; i--;) e.splice(n[i], 1)
                    }
                    return $ = null, e
                }, S = b.getText = function (e) {
                    var t, n = "",
                        i = 0,
                        r = e.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += S(e)
                        } else if (3 === r || 4 === r) return e.nodeValue
                    } else
                        for (; t = e[i++];) n += S(t);
                    return n
                }, (x = b.selectors = {
                    cacheLength: 50,
                    createPseudo: l,
                    match: fe,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function (e) {
                            return e[1] = e[1].replace(be, _e), e[3] = (e[3] || e[4] || e[5] || "").replace(be, _e), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function (e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || b.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && b.error(e[0]), e
                        },
                        PSEUDO: function (e) {
                            var t, n = !e[6] && e[2];
                            return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (e) {
                            var t = e.replace(be, _e).toLowerCase();
                            return "*" === e ? function () {
                                return !0
                            } : function (e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function (e) {
                            var t = W[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && W(e, function (e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function (n, i, r) {
                            return function (e) {
                                var t = b.attr(e, n);
                                return null == t ? "!=" === i : !i || (t += "", "=" === i ? t === r : "!=" === i ? t !== r : "^=" === i ? r && 0 === t.indexOf(r) : "*=" === i ? r && -1 < t.indexOf(r) : "$=" === i ? r && t.slice(-r.length) === r : "~=" === i ? -1 < (" " + t.replace(ae, " ") + " ").indexOf(r) : "|=" === i && (t === r || t.slice(0, r.length + 1) === r + "-"))
                            }
                        },
                        CHILD: function (p, e, t, m, g) {
                            var y = "nth" !== p.slice(0, 3),
                                v = "last" !== p.slice(-4),
                                w = "of-type" === e;
                            return 1 === m && 0 === g ? function (e) {
                                return !!e.parentNode
                            } : function (e, t, n) {
                                var i, r, o, a, s, l, u = y !== v ? "nextSibling" : "previousSibling",
                                    c = e.parentNode,
                                    d = w && e.nodeName.toLowerCase(),
                                    h = !n && !w,
                                    f = !1;
                                if (c) {
                                    if (y) {
                                        for (; u;) {
                                            for (a = e; a = a[u];)
                                                if (w ? a.nodeName.toLowerCase() === d : 1 === a.nodeType) return !1;
                                            l = u = "only" === p && !l && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (l = [v ? c.firstChild : c.lastChild], v && h) {
                                        for (f = (s = (i = (r = (o = (a = c)[R] || (a[R] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] || [])[0] === F && i[1]) && i[2], a = s && c.childNodes[s]; a = ++s && a && a[u] || (f = s = 0) || l.pop();)
                                            if (1 === a.nodeType && ++f && a === e) {
                                                r[p] = [F, s, f];
                                                break
                                            }
                                    } else if (h && (f = s = (i = (r = (o = (a = e)[R] || (a[R] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] || [])[0] === F && i[1]), !1 === f)
                                        for (;
                                            (a = ++s && a && a[u] || (f = s = 0) || l.pop()) && ((w ? a.nodeName.toLowerCase() !== d : 1 !== a.nodeType) || !++f || (h && ((r = (o = a[R] || (a[R] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] = [F, f]), a !== e)););
                                    return (f -= g) === m || f % m == 0 && 0 <= f / m
                                }
                            }
                        },
                        PSEUDO: function (e, o) {
                            var t, a = x.pseudos[e] || x.setFilters[e.toLowerCase()] || b.error("unsupported pseudo: " + e);
                            return a[R] ? a(o) : 1 < a.length ? (t = [e, e, "", o], x.setFilters.hasOwnProperty(e.toLowerCase()) ? l(function (e, t) {
                                for (var n, i = a(e, o), r = i.length; r--;) e[n = ee(e, i[r])] = !(t[n] = i[r])
                            }) : function (e) {
                                return a(e, 0, t)
                            }) : a
                        }
                    },
                    pseudos: {
                        not: l(function (e) {
                            var i = [],
                                r = [],
                                s = C(e.replace(se, "$1"));
                            return s[R] ? l(function (e, t, n, i) {
                                for (var r, o = s(e, null, i, []), a = e.length; a--;)(r = o[a]) && (e[a] = !(t[a] = r))
                            }) : function (e, t, n) {
                                return i[0] = e, s(i, null, n, r), i[0] = null, !r.pop()
                            }
                        }),
                        has: l(function (t) {
                            return function (e) {
                                return 0 < b(t, e).length
                            }
                        }),
                        contains: l(function (t) {
                            return t = t.replace(be, _e),
                                function (e) {
                                    return -1 < (e.textContent || e.innerText || S(e)).indexOf(t)
                                }
                        }),
                        lang: l(function (n) {
                            return he.test(n || "") || b.error("unsupported lang: " + n), n = n.replace(be, _e).toLowerCase(),
                                function (e) {
                                    var t;
                                    do {
                                        if (t = D ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                    } while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function (e) {
                            var t = n.location && n.location.hash;
                            return t && t.slice(1) === e.id
                        },
                        root: function (e) {
                            return e === I
                        },
                        focus: function (e) {
                            return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function (e) {
                            return !1 === e.disabled
                        },
                        disabled: function (e) {
                            return !0 === e.disabled
                        },
                        checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                        },
                        empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function (e) {
                            return !x.pseudos.empty(e)
                        },
                        header: function (e) {
                            return me.test(e.nodeName)
                        },
                        input: function (e) {
                            return pe.test(e.nodeName)
                        },
                        button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function (e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: a(function () {
                            return [0]
                        }),
                        last: a(function (e, t) {
                            return [t - 1]
                        }),
                        eq: a(function (e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: a(function (e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e
                        }),
                        odd: a(function (e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e
                        }),
                        lt: a(function (e, t, n) {
                            for (var i = n < 0 ? n + t : n; 0 <= --i;) e.push(i);
                            return e
                        }),
                        gt: a(function (e, t, n) {
                            for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                            return e
                        })
                    }
                }).pseudos.nth = x.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) x.pseudos[p] = i(p);
            for (p in {
                    submit: !0,
                    reset: !0
                }) x.pseudos[p] = o(p);
            return s.prototype = x.filters = x.pseudos, x.setFilters = new s, T = b.tokenize = function (e, t) {
                var n, i, r, o, a, s, l, u = B[e + " "];
                if (u) return t ? 0 : u.slice(0);
                for (a = e, s = [], l = x.preFilter; a;) {
                    for (o in n && !(i = le.exec(a)) || (i && (a = a.slice(i[0].length) || a), s.push(r = [])), n = !1, (i = ue.exec(a)) && (n = i.shift(), r.push({
                            value: n,
                            type: i[0].replace(se, " ")
                        }), a = a.slice(n.length)), x.filter) !(i = fe[o].exec(a)) || l[o] && !(i = l[o](i)) || (n = i.shift(), r.push({
                        value: n,
                        type: o,
                        matches: i
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return t ? a.length : a ? b.error(e) : B(e, s).slice(0)
            }, C = b.compile = function (e, t) {
                var n, i = [],
                    r = [],
                    o = Y[e + " "];
                if (!o) {
                    for (t || (t = T(e)), n = t.length; n--;)(o = f(t[n]))[R] ? i.push(o) : r.push(o);
                    (o = Y(e, c(r, i))).selector = e
                }
                return o
            }, E = b.select = function (e, t, n, i) {
                var r, o, a, s, l, u = "function" == typeof e && e,
                    c = !i && T(e = u.selector || e);
                if (n = n || [], 1 === c.length) {
                    if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && y.getById && 9 === t.nodeType && D && x.relative[o[1].type]) {
                        if (!(t = (x.find.ID(a.matches[0].replace(be, _e), t) || [])[0])) return n;
                        u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (r = fe.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !x.relative[s = a.type]);)
                        if ((l = x.find[s]) && (i = l(a.matches[0].replace(be, _e), ve.test(o[0].type) && m(t.parentNode) || t))) {
                            if (o.splice(r, 1), !(e = i.length && g(o))) return K.apply(n, i), n;
                            break
                        }
                }
                return (u || C(e, c))(i, t, !D, n, !t || ve.test(e) && m(t.parentNode) || t), n
            }, y.sortStable = R.split("").sort(U).join("") === R, y.detectDuplicates = !!M, L(), y.sortDetached = r(function (e) {
                return 1 & e.compareDocumentPosition(P.createElement("div"))
            }), r(function (e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || t("type|href|height|width", function (e, t, n) {
                if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), y.attributes && r(function (e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || t("value", function (e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
            }), r(function (e) {
                return null == e.getAttribute("disabled")
            }) || t(te, function (e, t, n) {
                var i;
                if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }), b
        }(S);
        fe.find = ve, fe.expr = ve.selectors, fe.expr[":"] = fe.expr.pseudos, fe.uniqueSort = fe.unique = ve.uniqueSort, fe.text = ve.getText, fe.isXMLDoc = ve.isXML, fe.contains = ve.contains;
        var we = function (e, t, n) {
                for (var i = [], r = n !== undefined;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (r && fe(e).is(n)) break;
                        i.push(e)
                    } return i
            },
            be = function (e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            },
            _e = fe.expr.match.needsContext,
            xe = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            Se = /^.[^:#\[\.,]*$/;
        fe.filter = function (e, t, n) {
            var i = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? fe.find.matchesSelector(i, e) ? [i] : [] : fe.find.matches(e, fe.grep(t, function (e) {
                return 1 === e.nodeType
            }))
        }, fe.fn.extend({
            find: function (e) {
                var t, n = [],
                    i = this,
                    r = i.length;
                if ("string" != typeof e) return this.pushStack(fe(e).filter(function () {
                    for (t = 0; t < r; t++)
                        if (fe.contains(i[t], this)) return !0
                }));
                for (t = 0; t < r; t++) fe.find(e, i[t], n);
                return (n = this.pushStack(1 < r ? fe.unique(n) : n)).selector = this.selector ? this.selector + " " + e : e, n
            },
            filter: function (e) {
                return this.pushStack(t(this, e || [], !1))
            },
            not: function (e) {
                return this.pushStack(t(this, e || [], !0))
            },
            is: function (e) {
                return !!t(this, "string" == typeof e && _e.test(e) ? fe(e) : e || [], !1).length
            }
        });
        var ke, Te = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        (fe.fn.init = function (e, t, n) {
            var i, r;
            if (!e) return this;
            if (n = n || ke, "string" == typeof e) {
                if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && 3 <= e.length ? [null, e, null] : Te.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (i[1]) {
                    if (t = t instanceof fe ? t[0] : t, fe.merge(this, fe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : ie, !0)), xe.test(i[1]) && fe.isPlainObject(t))
                        for (i in t) fe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                    return this
                }
                if ((r = ie.getElementById(i[2])) && r.parentNode) {
                    if (r.id !== i[2]) return ke.find(e);
                    this.length = 1, this[0] = r
                }
                return this.context = ie, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : fe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(fe) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), fe.makeArray(e, this))
        }).prototype = fe.fn, ke = fe(ie);
        var Ce = /^(?:parents|prev(?:Until|All))/,
            Ee = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        fe.fn.extend({
            has: function (e) {
                var t, n = fe(e, this),
                    i = n.length;
                return this.filter(function () {
                    for (t = 0; t < i; t++)
                        if (fe.contains(this, n[t])) return !0
                })
            },
            closest: function (e, t) {
                for (var n, i = 0, r = this.length, o = [], a = _e.test(e) || "string" != typeof e ? fe(e, t || this.context) : 0; i < r; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && fe.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        } return this.pushStack(1 < o.length ? fe.uniqueSort(o) : o)
            },
            index: function (e) {
                return e ? "string" == typeof e ? fe.inArray(this[0], fe(e)) : fe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function (e, t) {
                return this.pushStack(fe.uniqueSort(fe.merge(this.get(), fe(e, t))))
            },
            addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), fe.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function (e) {
                return we(e, "parentNode")
            },
            parentsUntil: function (e, t, n) {
                return we(e, "parentNode", n)
            },
            next: function (e) {
                return n(e, "nextSibling")
            },
            prev: function (e) {
                return n(e, "previousSibling")
            },
            nextAll: function (e) {
                return we(e, "nextSibling")
            },
            prevAll: function (e) {
                return we(e, "previousSibling")
            },
            nextUntil: function (e, t, n) {
                return we(e, "nextSibling", n)
            },
            prevUntil: function (e, t, n) {
                return we(e, "previousSibling", n)
            },
            siblings: function (e) {
                return be((e.parentNode || {}).firstChild, e)
            },
            children: function (e) {
                return be(e.firstChild)
            },
            contents: function (e) {
                return fe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : fe.merge([], e.childNodes)
            }
        }, function (i, r) {
            fe.fn[i] = function (e, t) {
                var n = fe.map(this, r, e);
                return "Until" !== i.slice(-5) && (t = e), t && "string" == typeof t && (n = fe.filter(t, n)), 1 < this.length && (Ee[i] || (n = fe.uniqueSort(n)), Ce.test(i) && (n = n.reverse())), this.pushStack(n)
            }
        });
        var Ae, $e, Me = /\S+/g;
        for ($e in fe.Callbacks = function (i) {
                i = "string" == typeof i ? c(i) : fe.extend({}, i);
                var r, e, t, n, o = [],
                    a = [],
                    s = -1,
                    l = function () {
                        for (n = i.once, t = r = !0; a.length; s = -1)
                            for (e = a.shift(); ++s < o.length;) !1 === o[s].apply(e[0], e[1]) && i.stopOnFalse && (s = o.length, e = !1);
                        i.memory || (e = !1), r = !1, n && (o = e ? [] : "")
                    },
                    u = {
                        add: function () {
                            return o && (e && !r && (s = o.length - 1, a.push(e)), function n(e) {
                                fe.each(e, function (e, t) {
                                    fe.isFunction(t) ? i.unique && u.has(t) || o.push(t) : t && t.length && "string" !== fe.type(t) && n(t)
                                })
                            }(arguments), e && !r && l()), this
                        },
                        remove: function () {
                            return fe.each(arguments, function (e, t) {
                                for (var n; - 1 < (n = fe.inArray(t, o, n));) o.splice(n, 1), n <= s && s--
                            }), this
                        },
                        has: function (e) {
                            return e ? -1 < fe.inArray(e, o) : 0 < o.length
                        },
                        empty: function () {
                            return o && (o = []), this
                        },
                        disable: function () {
                            return n = a = [], o = e = "", this
                        },
                        disabled: function () {
                            return !o
                        },
                        lock: function () {
                            return n = !0, e || u.disable(), this
                        },
                        locked: function () {
                            return !!n
                        },
                        fireWith: function (e, t) {
                            return n || (t = [e, (t = t || []).slice ? t.slice() : t], a.push(t), r || l()), this
                        },
                        fire: function () {
                            return u.fireWith(this, arguments), this
                        },
                        fired: function () {
                            return !!t
                        }
                    };
                return u
            }, fe.extend({
                Deferred: function (e) {
                    var o = [
                            ["resolve", "done", fe.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", fe.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", fe.Callbacks("memory")]
                        ],
                        r = "pending",
                        a = {
                            state: function () {
                                return r
                            },
                            always: function () {
                                return s.done(arguments).fail(arguments), this
                            },
                            then: function () {
                                var r = arguments;
                                return fe.Deferred(function (i) {
                                    fe.each(o, function (e, t) {
                                        var n = fe.isFunction(r[e]) && r[e];
                                        s[t[1]](function () {
                                            var e = n && n.apply(this, arguments);
                                            e && fe.isFunction(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[t[0] + "With"](this === a ? i.promise() : this, n ? [e] : arguments)
                                        })
                                    }), r = null
                                }).promise()
                            },
                            promise: function (e) {
                                return null != e ? fe.extend(e, a) : a
                            }
                        },
                        s = {};
                    return a.pipe = a.then, fe.each(o, function (e, t) {
                        var n = t[2],
                            i = t[3];
                        a[t[1]] = n.add, i && n.add(function () {
                            r = i
                        }, o[1 ^ e][2].disable, o[2][2].lock), s[t[0]] = function () {
                            return s[t[0] + "With"](this === s ? a : this, arguments), this
                        }, s[t[0] + "With"] = n.fireWith
                    }), a.promise(s), e && e.call(s, s), s
                },
                when: function (e) {
                    var r, t, n, i = 0,
                        o = re.call(arguments),
                        a = o.length,
                        s = 1 !== a || e && fe.isFunction(e.promise) ? a : 0,
                        l = 1 === s ? e : fe.Deferred(),
                        u = function (t, n, i) {
                            return function (e) {
                                n[t] = this, i[t] = 1 < arguments.length ? re.call(arguments) : e, i === r ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                            }
                        };
                    if (1 < a)
                        for (r = new Array(a), t = new Array(a), n = new Array(a); i < a; i++) o[i] && fe.isFunction(o[i].promise) ? o[i].promise().progress(u(i, t, r)).done(u(i, n, o)).fail(l.reject) : --s;
                    return s || l.resolveWith(n, o), l.promise()
                }
            }), fe.fn.ready = function (e) {
                return fe.ready.promise().done(e), this
            }, fe.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function (e) {
                    e ? fe.readyWait++ : fe.ready(!0)
                },
                ready: function (e) {
                    (!0 === e ? --fe.readyWait : fe.isReady) || (fe.isReady = !0) !== e && 0 < --fe.readyWait || (Ae.resolveWith(ie, [fe]), fe.fn.triggerHandler && (fe(ie).triggerHandler("ready"), fe(ie).off("ready")))
                }
            }), fe.ready.promise = function (e) {
                if (!Ae)
                    if (Ae = fe.Deferred(), "complete" === ie.readyState || "loading" !== ie.readyState && !ie.documentElement.doScroll) S.setTimeout(fe.ready);
                    else if (ie.addEventListener) ie.addEventListener("DOMContentLoaded", o), S.addEventListener("load", o);
                else {
                    ie.attachEvent("onreadystatechange", o), S.attachEvent("onload", o);
                    var t = !1;
                    try {
                        t = null == S.frameElement && ie.documentElement
                    } catch (n) {}
                    t && t.doScroll && function i() {
                        if (!fe.isReady) {
                            try {
                                t.doScroll("left")
                            } catch (n) {
                                return S.setTimeout(i, 50)
                            }
                            r(), fe.ready()
                        }
                    }()
                }
                return Ae.promise(e)
            }, fe.ready.promise(), fe(de)) break;
        de.ownFirst = "0" === $e, de.inlineBlockNeedsLayout = !1, fe(function () {
                var e, t, n, i;
                (n = ie.getElementsByTagName("body")[0]) && n.style && (t = ie.createElement("div"), (i = ie.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", de.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
            }),
            function () {
                var e = ie.createElement("div");
                de.deleteExpando = !0;
                try {
                    delete e.test
                } catch (t) {
                    de.deleteExpando = !1
                }
                e = null
            }();
        var Le, Pe = function (e) {
                var t = fe.noData[(e.nodeName + " ").toLowerCase()],
                    n = +e.nodeType || 1;
                return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
            },
            Ie = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            De = /([A-Z])/g;
        fe.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function (e) {
                return !!(e = e.nodeType ? fe.cache[e[fe.expando]] : e[fe.expando]) && !u(e)
            },
            data: function (e, t, n) {
                return i(e, t, n)
            },
            removeData: function (e, t) {
                return a(e, t)
            },
            _data: function (e, t, n) {
                return i(e, t, n, !0)
            },
            _removeData: function (e, t) {
                return a(e, t, !0)
            }
        }), fe.fn.extend({
            data: function (e, t) {
                var n, i, r, o = this[0],
                    a = o && o.attributes;
                if (e === undefined) {
                    if (this.length && (r = fe.data(o), 1 === o.nodeType && !fe._data(o, "parsedAttrs"))) {
                        for (n = a.length; n--;) a[n] && 0 === (i = a[n].name).indexOf("data-") && l(o, i = fe.camelCase(i.slice(5)), r[i]);
                        fe._data(o, "parsedAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof e ? this.each(function () {
                    fe.data(this, e)
                }) : 1 < arguments.length ? this.each(function () {
                    fe.data(this, e, t)
                }) : o ? l(o, e, fe.data(o, e)) : undefined
            },
            removeData: function (e) {
                return this.each(function () {
                    fe.removeData(this, e)
                })
            }
        }), fe.extend({
            queue: function (e, t, n) {
                var i;
                if (e) return t = (t || "fx") + "queue", i = fe._data(e, t), n && (!i || fe.isArray(n) ? i = fe._data(e, t, fe.makeArray(n)) : i.push(n)), i || []
            },
            dequeue: function (e, t) {
                t = t || "fx";
                var n = fe.queue(e, t),
                    i = n.length,
                    r = n.shift(),
                    o = fe._queueHooks(e, t),
                    a = function () {
                        fe.dequeue(e, t)
                    };
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return fe._data(e, n) || fe._data(e, n, {
                    empty: fe.Callbacks("once memory").add(function () {
                        fe._removeData(e, t + "queue"), fe._removeData(e, n)
                    })
                })
            }
        }), fe.fn.extend({
            queue: function (t, n) {
                var e = 2;
                return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? fe.queue(this[0], t) : n === undefined ? this : this.each(function () {
                    var e = fe.queue(this, t, n);
                    fe._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && fe.dequeue(this, t)
                })
            },
            dequeue: function (e) {
                return this.each(function () {
                    fe.dequeue(this, e)
                })
            },
            clearQueue: function (e) {
                return this.queue(e || "fx", [])
            },
            promise: function (e, t) {
                var n, i = 1,
                    r = fe.Deferred(),
                    o = this,
                    a = this.length,
                    s = function () {
                        --i || r.resolveWith(o, [o])
                    };
                for ("string" != typeof e && (t = e, e = undefined), e = e || "fx"; a--;)(n = fe._data(o[a], e + "queueHooks")) && n.empty && (i++, n.empty.add(s));
                return s(), r.promise(t)
            }
        }), de.shrinkWrapBlocks = function () {
            return null != Le ? Le : (Le = !1, (t = ie.getElementsByTagName("body")[0]) && t.style ? (e = ie.createElement("div"), (n = ie.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", t.appendChild(n).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(ie.createElement("div")).style.width = "5px", Le = 3 !== e.offsetWidth), t.removeChild(n), Le) : void 0);
            var e, t, n
        };
        var Oe, Ne, je, ze = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Re = new RegExp("^(?:([+-])=|)(" + ze + ")([a-z%]*)$", "i"),
            He = ["Top", "Right", "Bottom", "Left"],
            Fe = function (e, t) {
                return e = t || e, "none" === fe.css(e, "display") || !fe.contains(e.ownerDocument, e)
            },
            qe = function (e, t, n, i, r, o, a) {
                var s = 0,
                    l = e.length,
                    u = null == n;
                if ("object" === fe.type(n))
                    for (s in r = !0, n) qe(e, t, s, n[s], !0, o, a);
                else if (i !== undefined && (r = !0, fe.isFunction(i) || (a = !0), u && (a ? (t.call(e, i), t = null) : (u = t, t = function (e, t, n) {
                        return u.call(fe(e), n)
                    })), t))
                    for (; s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                return r ? e : u ? t.call(e) : l ? t(e[0], n) : o
            },
            We = /^(?:checkbox|radio)$/i,
            Be = /<([\w:-]+)/,
            Ye = /^$|\/(?:java|ecma)script/i,
            Ue = /^\s+/,
            Ve = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
        Oe = ie.createElement("div"), Ne = ie.createDocumentFragment(), je = ie.createElement("input"), Oe.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", de.leadingWhitespace = 3 === Oe.firstChild.nodeType, de.tbody = !Oe.getElementsByTagName("tbody").length, de.htmlSerialize = !!Oe.getElementsByTagName("link").length, de.html5Clone = "<:nav></:nav>" !== ie.createElement("nav").cloneNode(!0).outerHTML, je.type = "checkbox", je.checked = !0, Ne.appendChild(je), de.appendChecked = je.checked, Oe.innerHTML = "<textarea>x</textarea>", de.noCloneChecked = !!Oe.cloneNode(!0).lastChild.defaultValue, Ne.appendChild(Oe), (je = ie.createElement("input")).setAttribute("type", "radio"), je.setAttribute("checked", "checked"), je.setAttribute("name", "t"), Oe.appendChild(je), de.checkClone = Oe.cloneNode(!0).cloneNode(!0).lastChild.checked, de.noCloneEvent = !!Oe.addEventListener, Oe[fe.expando] = 1, de.attributes = !Oe.getAttribute(fe.expando);
        var Ge = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: de.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        };
        Ge.optgroup = Ge.option, Ge.tbody = Ge.tfoot = Ge.colgroup = Ge.caption = Ge.thead, Ge.th = Ge.td;
        var Qe = /<|&#?\w+;/,
            Je = /<tbody/i;
        ! function () {
            var e, t, n = ie.createElement("div");
            for (e in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) t = "on" + e, (de[e] = t in S) || (n.setAttribute(t, "t"), de[e] = !1 === n.attributes[t].expando);
            n = null
        }();
        var Ze = /^(?:input|select|textarea)$/i,
            Ke = /^key/,
            Xe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            et = /^(?:focusinfocus|focusoutblur)$/,
            tt = /^([^.]*)(?:\.(.+)|)/;
        fe.event = {
            global: {},
            add: function (e, t, n, i, r) {
                var o, a, s, l, u, c, d, h, f, p, m, g = fe._data(e);
                if (g) {
                    for (n.handler && (n = (l = n).handler, r = l.selector), n.guid || (n.guid = fe.guid++), (a = g.events) || (a = g.events = {}), (c = g.handle) || ((c = g.handle = function (e) {
                            return void 0 === fe || e && fe.event.triggered === e.type ? undefined : fe.event.dispatch.apply(c.elem, arguments)
                        }).elem = e), s = (t = (t || "").match(Me) || [""]).length; s--;) f = m = (o = tt.exec(t[s]) || [])[1], p = (o[2] || "").split(".").sort(), f && (u = fe.event.special[f] || {}, f = (r ? u.delegateType : u.bindType) || f, u = fe.event.special[f] || {}, d = fe.extend({
                        type: f,
                        origType: m,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && fe.expr.match.needsContext.test(r),
                        namespace: p.join(".")
                    }, l), (h = a[f]) || ((h = a[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, p, c) || (e.addEventListener ? e.addEventListener(f, c, !1) : e.attachEvent && e.attachEvent("on" + f, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), r ? h.splice(h.delegateCount++, 0, d) : h.push(d), fe.event.global[f] = !0);
                    e = null
                }
            },
            remove: function (e, t, n, i, r) {
                var o, a, s, l, u, c, d, h, f, p, m, g = fe.hasData(e) && fe._data(e);
                if (g && (c = g.events)) {
                    for (u = (t = (t || "").match(Me) || [""]).length; u--;)
                        if (f = m = (s = tt.exec(t[u]) || [])[1], p = (s[2] || "").split(".").sort(), f) {
                            for (d = fe.event.special[f] || {}, h = c[f = (i ? d.delegateType : d.bindType) || f] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = h.length; o--;) a = h[o], !r && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (h.splice(o, 1), a.selector && h.delegateCount--, d.remove && d.remove.call(e, a));
                            l && !h.length && (d.teardown && !1 !== d.teardown.call(e, p, g.handle) || fe.removeEvent(e, f, g.handle), delete c[f])
                        } else
                            for (f in c) fe.event.remove(e, f + t[u], n, i, !0);
                    fe.isEmptyObject(c) && (delete g.handle, fe._removeData(e, "events"))
                }
            },
            trigger: function (e, t, n, i) {
                var r, o, a, s, l, u, c, d = [n || ie],
                    h = ce.call(e, "type") ? e.type : e,
                    f = ce.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = u = n = n || ie, 3 !== n.nodeType && 8 !== n.nodeType && !et.test(h + fe.event.triggered) && (-1 < h.indexOf(".") && (h = (f = h.split(".")).shift(), f.sort()), o = h.indexOf(":") < 0 && "on" + h, (e = e[fe.expando] ? e : new fe.Event(h, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = f.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = null == t ? [e] : fe.makeArray(t, [e]), l = fe.event.special[h] || {}, i || !l.trigger || !1 !== l.trigger.apply(n, t))) {
                    if (!i && !l.noBubble && !fe.isWindow(n)) {
                        for (s = l.delegateType || h, et.test(s + h) || (a = a.parentNode); a; a = a.parentNode) d.push(a), u = a;
                        u === (n.ownerDocument || ie) && d.push(u.defaultView || u.parentWindow || S)
                    }
                    for (c = 0;
                        (a = d[c++]) && !e.isPropagationStopped();) e.type = 1 < c ? s : l.bindType || h, (r = (fe._data(a, "events") || {})[e.type] && fe._data(a, "handle")) && r.apply(a, t), (r = o && a[o]) && r.apply && Pe(a) && (e.result = r.apply(a, t), !1 === e.result && e.preventDefault());
                    if (e.type = h, !i && !e.isDefaultPrevented() && (!l._default || !1 === l._default.apply(d.pop(), t)) && Pe(n) && o && n[h] && !fe.isWindow(n)) {
                        (u = n[o]) && (n[o] = null), fe.event.triggered = h;
                        try {
                            n[h]()
                        } catch (p) {}
                        fe.event.triggered = undefined, u && (n[o] = u)
                    }
                    return e.result
                }
            },
            dispatch: function (e) {
                e = fe.event.fix(e);
                var t, n, i, r, o, a = [],
                    s = re.call(arguments),
                    l = (fe._data(this, "events") || {})[e.type] || [],
                    u = fe.event.special[e.type] || {};
                if ((s[0] = e).delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                    for (a = fe.event.handlers.call(this, e, l), t = 0;
                        (r = a[t++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = r.elem, n = 0;
                            (o = r.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o, e.data = o.data, (i = ((fe.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s)) !== undefined && !1 === (e.result = i) && (e.preventDefault(), e.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, e), e.result
                }
            },
            handlers: function (e, t) {
                var n, i, r, o, a = [],
                    s = t.delegateCount,
                    l = e.target;
                if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                    for (; l != this; l = l.parentNode || this)
                        if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                            for (i = [], n = 0; n < s; n++) i[r = (o = t[n]).selector + " "] === undefined && (i[r] = o.needsContext ? -1 < fe(r, this).index(l) : fe.find(r, this, null, [l]).length), i[r] && i.push(o);
                            i.length && a.push({
                                elem: l,
                                handlers: i
                            })
                        } return s < t.length && a.push({
                    elem: this,
                    handlers: t.slice(s)
                }), a
            },
            fix: function (e) {
                if (e[fe.expando]) return e;
                var t, n, i, r = e.type,
                    o = e,
                    a = this.fixHooks[r];
                for (a || (this.fixHooks[r] = a = Xe.test(r) ? this.mouseHooks : Ke.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new fe.Event(o), t = i.length; t--;) e[n = i[t]] = o[n];
                return e.target || (e.target = o.srcElement || ie), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (e, t) {
                    var n, i, r, o = t.button,
                        a = t.fromElement;
                    return null == e.pageX && null != t.clientX && (r = (i = e.target.ownerDocument || ie).documentElement, n = i.body, e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || o === undefined || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function () {
                        if (this !== p() && this.focus) try {
                            return this.focus(), !1
                        } catch (e) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        if (this === p() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function () {
                        if (fe.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                    },
                    _default: function (e) {
                        return fe.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function (e) {
                        e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function (e, t, n) {
                var i = fe.extend(new fe.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                fe.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
            }
        }, fe.removeEvent = ie.removeEventListener ? function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        } : function (e, t, n) {
            var i = "on" + t;
            e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null), e.detachEvent(i, n))
        }, fe.Event = function (e, t) {
            if (!(this instanceof fe.Event)) return new fe.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? h : f) : this.type = e, t && fe.extend(this, t), this.timeStamp = e && e.timeStamp || fe.now(), this[fe.expando] = !0
        }, fe.Event.prototype = {
            constructor: fe.Event,
            isDefaultPrevented: f,
            isPropagationStopped: f,
            isImmediatePropagationStopped: f,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = h, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = h, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = h, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, fe.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (e, o) {
            fe.event.special[e] = {
                delegateType: o,
                bindType: o,
                handle: function (e) {
                    var t, n = this,
                        i = e.relatedTarget,
                        r = e.handleObj;
                    return i && (i === n || fe.contains(n, i)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = o), t
                }
            }
        }), de.submit || (fe.event.special.submit = {
            setup: function () {
                if (fe.nodeName(this, "form")) return !1;
                fe.event.add(this, "click._submit keypress._submit", function (e) {
                    var t = e.target,
                        n = fe.nodeName(t, "input") || fe.nodeName(t, "button") ? fe.prop(t, "form") : undefined;
                    n && !fe._data(n, "submit") && (fe.event.add(n, "submit._submit", function (e) {
                        e._submitBubble = !0
                    }), fe._data(n, "submit", !0))
                })
            },
            postDispatch: function (e) {
                e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && fe.event.simulate("submit", this.parentNode, e))
            },
            teardown: function () {
                if (fe.nodeName(this, "form")) return !1;
                fe.event.remove(this, "._submit")
            }
        }), de.change || (fe.event.special.change = {
            setup: function () {
                if (Ze.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (fe.event.add(this, "propertychange._change", function (e) {
                    "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
                }), fe.event.add(this, "click._change", function (e) {
                    this._justChanged && !e.isTrigger && (this._justChanged = !1), fe.event.simulate("change", this, e)
                })), !1;
                fe.event.add(this, "beforeactivate._change", function (e) {
                    var t = e.target;
                    Ze.test(t.nodeName) && !fe._data(t, "change") && (fe.event.add(t, "change._change", function (e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || fe.event.simulate("change", this.parentNode, e)
                    }), fe._data(t, "change", !0))
                })
            },
            handle: function (e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
            },
            teardown: function () {
                return fe.event.remove(this, "._change"), !Ze.test(this.nodeName)
            }
        }), de.focusin || fe.each({
            focus: "focusin",
            blur: "focusout"
        }, function (n, i) {
            var r = function (e) {
                fe.event.simulate(i, e.target, fe.event.fix(e))
            };
            fe.event.special[i] = {
                setup: function () {
                    var e = this.ownerDocument || this,
                        t = fe._data(e, i);
                    t || e.addEventListener(n, r, !0), fe._data(e, i, (t || 0) + 1)
                },
                teardown: function () {
                    var e = this.ownerDocument || this,
                        t = fe._data(e, i) - 1;
                    t ? fe._data(e, i, t) : (e.removeEventListener(n, r, !0), fe._removeData(e, i))
                }
            }
        }), fe.fn.extend({
            on: function (e, t, n, i) {
                return b(this, e, t, n, i)
            },
            one: function (e, t, n, i) {
                return b(this, e, t, n, i, 1)
            },
            off: function (e, t, n) {
                var i, r;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, fe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (r in e) this.off(r, t, e[r]);
                    return this
                }
                return !1 !== t && "function" != typeof t || (n = t, t = undefined), !1 === n && (n = f), this.each(function () {
                    fe.event.remove(this, e, n, t)
                })
            },
            trigger: function (e, t) {
                return this.each(function () {
                    fe.event.trigger(e, t, this)
                })
            },
            triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return fe.event.trigger(e, t, n, !0)
            }
        });
        var nt = / jQuery\d+="(?:null|\d+)"/g,
            it = new RegExp("<(?:" + Ve + ")[\\s/>]", "i"),
            rt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            ot = /<script|<style|<link/i,
            at = /checked\s*(?:[^=]|=\s*.checked.)/i,
            st = /^true\/(.*)/,
            lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            ut = g(ie).appendChild(ie.createElement("div"));
        fe.extend({
            htmlPrefilter: function (e) {
                return e.replace(rt,
                    "<$1></$2>")
            },
            clone: function (e, t, n) {
                var i, r, o, a, s, l = fe.contains(e.ownerDocument, e);
                if (de.html5Clone || fe.isXMLDoc(e) || !it.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ut.innerHTML = e.outerHTML, ut.removeChild(o = ut.firstChild)), !(de.noCloneEvent && de.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || fe.isXMLDoc(e)))
                    for (i = y(o), s = y(e), a = 0; null != (r = s[a]); ++a) i[a] && C(r, i[a]);
                if (t)
                    if (n)
                        for (s = s || y(e), i = i || y(o), a = 0; null != (r = s[a]); a++) T(r, i[a]);
                    else T(e, o);
                return 0 < (i = y(o, "script")).length && v(i, !l && y(e, "script")), i = s = r = null, o
            },
            cleanData: function (e, t) {
                for (var n, i, r, o, a = 0, s = fe.expando, l = fe.cache, u = de.attributes, c = fe.event.special; null != (n = e[a]); a++)
                    if ((t || Pe(n)) && (o = (r = n[s]) && l[r])) {
                        if (o.events)
                            for (i in o.events) c[i] ? fe.event.remove(n, i) : fe.removeEvent(n, i, o.handle);
                        l[r] && (delete l[r], u || "undefined" == typeof n.removeAttribute ? n[s] = undefined : n.removeAttribute(s), ne.push(r))
                    }
            }
        }), fe.fn.extend({
            domManip: E,
            detach: function (e) {
                return A(this, e, !0)
            },
            remove: function (e) {
                return A(this, e)
            },
            text: function (e) {
                return qe(this, function (e) {
                    return e === undefined ? fe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ie).createTextNode(e))
                }, null, e, arguments.length)
            },
            append: function () {
                return E(this, arguments, function (e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || _(this, e).appendChild(e)
                })
            },
            prepend: function () {
                return E(this, arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = _(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function () {
                return E(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function () {
                return E(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && fe.cleanData(y(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                    e.options && fe.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            },
            clone: function (e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function () {
                    return fe.clone(this, e, t)
                })
            },
            html: function (e) {
                return qe(this, function (e) {
                    var t = this[0] || {},
                        n = 0,
                        i = this.length;
                    if (e === undefined) return 1 === t.nodeType ? t.innerHTML.replace(nt, "") : undefined;
                    if ("string" == typeof e && !ot.test(e) && (de.htmlSerialize || !it.test(e)) && (de.leadingWhitespace || !Ue.test(e)) && !Ge[(Be.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = fe.htmlPrefilter(e);
                        try {
                            for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (fe.cleanData(y(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (r) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function () {
                var n = [];
                return E(this, arguments, function (e) {
                    var t = this.parentNode;
                    fe.inArray(this, n) < 0 && (fe.cleanData(y(this)), t && t.replaceChild(e, this))
                }, n)
            }
        }), fe.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (e, a) {
            fe.fn[e] = function (e) {
                for (var t, n = 0, i = [], r = fe(e), o = r.length - 1; n <= o; n++) t = n === o ? this : this.clone(!0), fe(r[n])[a](t), ae.apply(i, t.get());
                return this.pushStack(i)
            }
        });
        var ct, dt = {
                HTML: "block",
                BODY: "block"
            },
            ht = /^margin/,
            ft = new RegExp("^(" + ze + ")(?!px)[a-z%]+$", "i"),
            pt = function (e, t, n, i) {
                var r, o, a = {};
                for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                for (o in r = n.apply(e, i || []), t) e.style[o] = a[o];
                return r
            },
            mt = ie.documentElement;
        ! function () {
            function e() {
                var e, t, n = ie.documentElement;
                n.appendChild(u), c.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i = o = l = !1, r = s = !0, S.getComputedStyle && (t = S.getComputedStyle(c), i = "1%" !== (t || {}).top, l = "2px" === (t || {}).marginLeft, o = "4px" === (t || {
                    width: "4px"
                }).width, c.style.marginRight = "50%", r = "4px" === (t || {
                    marginRight: "4px"
                }).marginRight, (e = c.appendChild(ie.createElement("div"))).style.cssText = c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", c.style.width = "1px", s = !parseFloat((S.getComputedStyle(e) || {}).marginRight), c.removeChild(e)), c.style.display = "none", (a = 0 === c.getClientRects().length) && (c.style.display = "", c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c.childNodes[0].style.borderCollapse = "separate", (e = c.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", (a = 0 === e[0].offsetHeight) && (e[0].style.display = "", e[1].style.display = "none", a = 0 === e[0].offsetHeight)), n.removeChild(u)
            }
            var i, r, o, a, s, l, u = ie.createElement("div"),
                c = ie.createElement("div");
            c.style && (c.style.cssText = "float:left;opacity:.5", de.opacity = "0.5" === c.style.opacity, de.cssFloat = !!c.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", de.clearCloneStyle = "content-box" === c.style.backgroundClip, (u = ie.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", c.innerHTML = "", u.appendChild(c), de.boxSizing = "" === c.style.boxSizing || "" === c.style.MozBoxSizing || "" === c.style.WebkitBoxSizing, fe.extend(de, {
                reliableHiddenOffsets: function () {
                    return null == i && e(), a
                },
                boxSizingReliable: function () {
                    return null == i && e(), o
                },
                pixelMarginRight: function () {
                    return null == i && e(), r
                },
                pixelPosition: function () {
                    return null == i && e(), i
                },
                reliableMarginRight: function () {
                    return null == i && e(), s
                },
                reliableMarginLeft: function () {
                    return null == i && e(), l
                }
            }))
        }();
        var gt, yt, vt = /^(top|right|bottom|left)$/;
        S.getComputedStyle ? (gt = function (e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = S), t.getComputedStyle(e)
        }, yt = function (e, t, n) {
            var i, r, o, a, s = e.style;
            return "" !== (a = (n = n || gt(e)) ? n.getPropertyValue(t) || n[t] : undefined) && a !== undefined || fe.contains(e.ownerDocument, e) || (a = fe.style(e, t)), n && !de.pixelMarginRight() && ft.test(a) && ht.test(t) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o), a === undefined ? a : a + ""
        }) : mt.currentStyle && (gt = function (e) {
            return e.currentStyle
        }, yt = function (e, t, n) {
            var i, r, o, a, s = e.style;
            return null == (a = (n = n || gt(e)) ? n[t] : undefined) && s && s[t] && (a = s[t]), ft.test(a) && !vt.test(t) && (i = s.left, (o = (r = e.runtimeStyle) && r.left) && (r.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = i, o && (r.left = o)), a === undefined ? a : a + "" || "auto"
        });
        var wt = /alpha\([^)]*\)/i,
            bt = /opacity\s*=\s*([^)]*)/i,
            _t = /^(none|table(?!-c[ea]).+)/,
            xt = new RegExp("^(" + ze + ")(.*)$", "i"),
            St = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            kt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            Tt = ["Webkit", "O", "Moz", "ms"],
            Ct = ie.createElement("div").style;
        fe.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var n = yt(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": de.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function (e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var r, o, a, s = fe.camelCase(t),
                        l = e.style;
                    if (t = fe.cssProps[s] || (fe.cssProps[s] = P(s) || s), a = fe.cssHooks[t] || fe.cssHooks[s], n === undefined) return a && "get" in a && (r = a.get(e, !1, i)) !== undefined ? r : l[t];
                    if ("string" === (o = typeof n) && (r = Re.exec(n)) && r[1] && (n = d(e, t, r), o = "number"), null != n && n == n && ("number" === o && (n += r && r[3] || (fe.cssNumber[s] ? "" : "px")), de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set" in a && (n = a.set(e, n, i)) === undefined))) try {
                        l[t] = n
                    } catch (u) {}
                }
            },
            css: function (e, t, n, i) {
                var r, o, a, s = fe.camelCase(t);
                return t = fe.cssProps[s] || (fe.cssProps[s] = P(s) || s), (a = fe.cssHooks[t] || fe.cssHooks[s]) && "get" in a && (o = a.get(e, !0, n)), o === undefined && (o = yt(e, t, i)), "normal" === o && t in kt && (o = kt[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
            }
        }), fe.each(["height", "width"], function (e, r) {
            fe.cssHooks[r] = {
                get: function (e, t, n) {
                    if (t) return _t.test(fe.css(e, "display")) && 0 === e.offsetWidth ? pt(e, St, function () {
                        return N(e, r, n)
                    }) : N(e, r, n)
                },
                set: function (e, t, n) {
                    var i = n && gt(e);
                    return D(e, t, n ? O(e, r, n, de.boxSizing && "border-box" === fe.css(e, "boxSizing", !1, i), i) : 0)
                }
            }
        }), de.opacity || (fe.cssHooks.opacity = {
            get: function (e, t) {
                return bt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function (e, t) {
                var n = e.style,
                    i = e.currentStyle,
                    r = fe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                    o = i && i.filter || n.filter || "";
                ((n.zoom = 1) <= t || "" === t) && "" === fe.trim(o.replace(wt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = wt.test(o) ? o.replace(wt, r) : o + " " + r)
            }
        }), fe.cssHooks.marginRight = L(de.reliableMarginRight, function (e, t) {
            if (t) return pt(e, {
                display: "inline-block"
            }, yt, [e, "marginRight"])
        }), fe.cssHooks.marginLeft = L(de.reliableMarginLeft, function (e, t) {
            if (t) return (parseFloat(yt(e, "marginLeft")) || (fe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - pt(e, {
                marginLeft: 0
            }, function () {
                return e.getBoundingClientRect().left
            }) : 0)) + "px"
        }), fe.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (r, o) {
            fe.cssHooks[r + o] = {
                expand: function (e) {
                    for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[r + He[t] + o] = i[t] || i[t - 2] || i[0];
                    return n
                }
            }, ht.test(r) || (fe.cssHooks[r + o].set = D)
        }), fe.fn.extend({
            css: function (e, t) {
                return qe(this, function (e, t, n) {
                    var i, r, o = {},
                        a = 0;
                    if (fe.isArray(t)) {
                        for (i = gt(e), r = t.length; a < r; a++) o[t[a]] = fe.css(e, t[a], !1, i);
                        return o
                    }
                    return n !== undefined ? fe.style(e, t, n) : fe.css(e, t)
                }, e, t, 1 < arguments.length)
            },
            show: function () {
                return I(this, !0)
            },
            hide: function () {
                return I(this)
            },
            toggle: function (e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                    Fe(this) ? fe(this).show() : fe(this).hide()
                })
            }
        }), (fe.Tween = j).prototype = {
            constructor: j,
            init: function (e, t, n, i, r, o) {
                this.elem = e, this.prop = n, this.easing = r || fe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (fe.cssNumber[n] ? "" : "px")
            },
            cur: function () {
                var e = j.propHooks[this.prop];
                return e && e.get ? e.get(this) : j.propHooks._default.get(this)
            },
            run: function (e) {
                var t, n = j.propHooks[this.prop];
                return this.options.duration ? this.pos = t = fe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
            }
        }, j.prototype.init.prototype = j.prototype, j.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = fe.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                },
                set: function (e) {
                    fe.fx.step[e.prop] ? fe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[fe.cssProps[e.prop]] && !fe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : fe.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, fe.easing = {
            linear: function (e) {
                return e
            },
            swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, fe.fx = j.prototype.init, fe.fx.step = {};
        var Et, At, $t, Mt, Lt, Pt, It, Dt = /^(?:toggle|show|hide)$/,
            Ot = /queueHooks$/;
        fe.Animation = fe.extend(W, {
            tweeners: {
                "*": [function (e, t) {
                    var n = this.createTween(e, t);
                    return d(n.elem, e, Re.exec(t), n), n
                }]
            },
            tweener: function (e, t) {
                fe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Me);
                for (var n, i = 0, r = e.length; i < r; i++) n = e[i], W.tweeners[n] = W.tweeners[n] || [], W.tweeners[n].unshift(t)
            },
            prefilters: [F],
            prefilter: function (e, t) {
                t ? W.prefilters.unshift(e) : W.prefilters.push(e)
            }
        }), fe.speed = function (e, t, n) {
            var i = e && "object" == typeof e ? fe.extend({}, e) : {
                complete: n || !n && t || fe.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !fe.isFunction(t) && t
            };
            return i.duration = fe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in fe.fx.speeds ? fe.fx.speeds[i.duration] : fe.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
                fe.isFunction(i.old) && i.old.call(this), i.queue && fe.dequeue(this, i.queue)
            }, i
        }, fe.fn.extend({
            fadeTo: function (e, t, n, i) {
                return this.filter(Fe).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function (t, e, n, i) {
                var r = fe.isEmptyObject(t),
                    o = fe.speed(e, n, i),
                    a = function () {
                        var e = W(this, fe.extend({}, t), o);
                        (r || fe._data(this, "finish")) && e.stop(!0)
                    };
                return a.finish = a, r || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function (r, e, o) {
                var a = function (e) {
                    var t = e.stop;
                    delete e.stop, t(o)
                };
                return "string" != typeof r && (o = e, e = r, r = undefined), e && !1 !== r && this.queue(r || "fx", []), this.each(function () {
                    var e = !0,
                        t = null != r && r + "queueHooks",
                        n = fe.timers,
                        i = fe._data(this);
                    if (t) i[t] && i[t].stop && a(i[t]);
                    else
                        for (t in i) i[t] && i[t].stop && Ot.test(t) && a(i[t]);
                    for (t = n.length; t--;) n[t].elem !== this || null != r && n[t].queue !== r || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                    !e && o || fe.dequeue(this, r)
                })
            },
            finish: function (a) {
                return !1 !== a && (a = a || "fx"), this.each(function () {
                    var e, t = fe._data(this),
                        n = t[a + "queue"],
                        i = t[a + "queueHooks"],
                        r = fe.timers,
                        o = n ? n.length : 0;
                    for (t.finish = !0, fe.queue(this, a, []), i && i.stop && i.stop.call(this, !0), e = r.length; e--;) r[e].elem === this && r[e].queue === a && (r[e].anim.stop(!0), r.splice(e, 1));
                    for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete t.finish
                })
            }
        }), fe.each(["toggle", "show", "hide"], function (e, i) {
            var r = fe.fn[i];
            fe.fn[i] = function (e, t, n) {
                return null == e || "boolean" == typeof e ? r.apply(this, arguments) : this.animate(R(i, !0), e, t, n)
            }
        }), fe.each({
            slideDown: R("show"),
            slideUp: R("hide"),
            slideToggle: R("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (e, i) {
            fe.fn[e] = function (e, t, n) {
                return this.animate(i, e, t, n)
            }
        }), fe.timers = [], fe.fx.tick = function () {
            var e, t = fe.timers,
                n = 0;
            for (Et = fe.now(); n < t.length; n++)(e = t[n])() || t[n] !== e || t.splice(n--, 1);
            t.length || fe.fx.stop(), Et = undefined
        }, fe.fx.timer = function (e) {
            fe.timers.push(e), e() ? fe.fx.start() : fe.timers.pop()
        }, fe.fx.interval = 13, fe.fx.start = function () {
            At || (At = S.setInterval(fe.fx.tick, fe.fx.interval))
        }, fe.fx.stop = function () {
            S.clearInterval(At), At = null
        }, fe.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, fe.fn.delay = function (i, e) {
            return i = fe.fx && fe.fx.speeds[i] || i, e = e || "fx", this.queue(e, function (e, t) {
                var n = S.setTimeout(e, i);
                t.stop = function () {
                    S.clearTimeout(n)
                }
            })
        }, Mt = ie.createElement("input"), Lt = ie.createElement("div"), Pt = ie.createElement("select"), It = Pt.appendChild(ie.createElement("option")), (Lt = ie.createElement("div")).setAttribute("className", "t"), Lt.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", $t = Lt.getElementsByTagName("a")[0], Mt.setAttribute("type", "checkbox"), Lt.appendChild(Mt), ($t = Lt.getElementsByTagName("a")[0]).style.cssText = "top:1px", de.getSetAttribute = "t" !== Lt.className, de.style = /top/.test($t.getAttribute("style")), de.hrefNormalized = "/a" === $t.getAttribute("href"), de.checkOn = !!Mt.value, de.optSelected = It.selected, de.enctype = !!ie.createElement("form").enctype, Pt.disabled = !0, de.optDisabled = !It.disabled, (Mt = ie.createElement("input")).setAttribute("value", ""), de.input = "" === Mt.getAttribute("value"), Mt.value = "t", Mt.setAttribute("type", "radio"), de.radioValue = "t" === Mt.value;
        var Nt = /\r/g,
            jt = /[\x20\t\r\n\f]+/g;
        fe.fn.extend({
            val: function (n) {
                var i, e, r, t = this[0];
                return arguments.length ? (r = fe.isFunction(n), this.each(function (e) {
                    var t;
                    1 === this.nodeType && (null == (t = r ? n.call(this, e, fe(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : fe.isArray(t) && (t = fe.map(t, function (e) {
                        return null == e ? "" : e + ""
                    })), (i = fe.valHooks[this.type] || fe.valHooks[this.nodeName.toLowerCase()]) && "set" in i && i.set(this, t, "value") !== undefined || (this.value = t))
                })) : t ? (i = fe.valHooks[t.type] || fe.valHooks[t.nodeName.toLowerCase()]) && "get" in i && (e = i.get(t, "value")) !== undefined ? e : "string" == typeof (e = t.value) ? e.replace(Nt, "") : null == e ? "" : e : void 0
            }
        }), fe.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = fe.find.attr(e, "value");
                        return null != t ? t : fe.trim(fe.text(e)).replace(jt, " ")
                    }
                },
                select: {
                    get: function (e) {
                        for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || r < 0, a = o ? null : [], s = o ? r + 1 : i.length, l = r < 0 ? s : o ? r : 0; l < s; l++)
                            if (((n = i[l]).selected || l === r) && (de.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !fe.nodeName(n.parentNode, "optgroup"))) {
                                if (t = fe(n).val(), o) return t;
                                a.push(t)
                            } return a
                    },
                    set: function (e, t) {
                        for (var n, i, r = e.options, o = fe.makeArray(t), a = r.length; a--;)
                            if (i = r[a], -1 < fe.inArray(fe.valHooks.option.get(i), o)) try {
                                i.selected = n = !0
                            } catch (s) {
                                i.scrollHeight
                            } else i.selected = !1;
                        return n || (e.selectedIndex = -1), r
                    }
                }
            }
        }), fe.each(["radio", "checkbox"], function () {
            fe.valHooks[this] = {
                set: function (e, t) {
                    if (fe.isArray(t)) return e.checked = -1 < fe.inArray(fe(e).val(), t)
                }
            }, de.checkOn || (fe.valHooks[this].get = function (e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var zt, Rt, Ht = fe.expr.attrHandle,
            Ft = /^(?:checked|selected)$/i,
            qt = de.getSetAttribute,
            Wt = de.input;
        fe.fn.extend({
            attr: function (e, t) {
                return qe(this, fe.attr, e, t, 1 < arguments.length)
            },
            removeAttr: function (e) {
                return this.each(function () {
                    fe.removeAttr(this, e)
                })
            }
        }), fe.extend({
            attr: function (e, t, n) {
                var i, r, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? fe.prop(e, t, n) : (1 === o && fe.isXMLDoc(e) || (t = t.toLowerCase(), r = fe.attrHooks[t] || (fe.expr.match.bool.test(t) ? Rt : zt)), n !== undefined ? null === n ? void fe.removeAttr(e, t) : r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : null == (i = fe.find.attr(e, t)) ? undefined : i)
            },
            attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!de.radioValue && "radio" === t && fe.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function (e, t) {
                var n, i, r = 0,
                    o = t && t.match(Me);
                if (o && 1 === e.nodeType)
                    for (; n = o[r++];) i = fe.propFix[n] || n, fe.expr.match.bool.test(n) ? Wt && qt || !Ft.test(n) ? e[i] = !1 : e[fe.camelCase("default-" + n)] = e[i] = !1 : fe.attr(e, n, ""), e.removeAttribute(qt ? n : i)
            }
        }), Rt = {
            set: function (e, t, n) {
                return !1 === t ? fe.removeAttr(e, n) : Wt && qt || !Ft.test(n) ? e.setAttribute(!qt && fe.propFix[n] || n, n) : e[fe.camelCase("default-" + n)] = e[n] = !0, n
            }
        }, fe.each(fe.expr.match.bool.source.match(/\w+/g), function (e, t) {
            var o = Ht[t] || fe.find.attr;
            Wt && qt || !Ft.test(t) ? Ht[t] = function (e, t, n) {
                var i, r;
                return n || (r = Ht[t], Ht[t] = i, i = null != o(e, t, n) ? t.toLowerCase() : null, Ht[t] = r), i
            } : Ht[t] = function (e, t, n) {
                if (!n) return e[fe.camelCase("default-" + t)] ? t.toLowerCase() : null
            }
        }), Wt && qt || (fe.attrHooks.value = {
            set: function (e, t, n) {
                if (!fe.nodeName(e, "input")) return zt && zt.set(e, t, n);
                e.defaultValue = t
            }
        }), qt || (zt = {
            set: function (e, t, n) {
                var i = e.getAttributeNode(n);
                if (i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n)) return t
            }
        }, Ht.id = Ht.name = Ht.coords = function (e, t, n) {
            var i;
            if (!n) return (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
        }, fe.valHooks.button = {
            get: function (e, t) {
                var n = e.getAttributeNode(t);
                if (n && n.specified) return n.value
            },
            set: zt.set
        }, fe.attrHooks.contenteditable = {
            set: function (e, t, n) {
                zt.set(e, "" !== t && t, n)
            }
        }, fe.each(["width", "height"], function (e, n) {
            fe.attrHooks[n] = {
                set: function (e, t) {
                    if ("" === t) return e.setAttribute(n, "auto"), t
                }
            }
        })), de.style || (fe.attrHooks.style = {
            get: function (e) {
                return e.style.cssText || undefined
            },
            set: function (e, t) {
                return e.style.cssText = t + ""
            }
        });
        var Bt = /^(?:input|select|textarea|button|object)$/i,
            Yt = /^(?:a|area)$/i;
        fe.fn.extend({
            prop: function (e, t) {
                return qe(this, fe.prop, e, t, 1 < arguments.length)
            },
            removeProp: function (t) {
                return t = fe.propFix[t] || t, this.each(function () {
                    try {
                        this[t] = undefined, delete this[t]
                    } catch (e) {}
                })
            }
        }), fe.extend({
            prop: function (e, t, n) {
                var i, r, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && fe.isXMLDoc(e) || (t = fe.propFix[t] || t, r = fe.propHooks[t]), n !== undefined ? r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function (e) {
                        var t = fe.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : Bt.test(e.nodeName) || Yt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), de.hrefNormalized || fe.each(["href", "src"], function (e, t) {
            fe.propHooks[t] = {
                get: function (e) {
                    return e.getAttribute(t, 4)
                }
            }
        }), de.optSelected || (fe.propHooks.selected = {
            get: function (e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            },
            set: function (e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), fe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            fe.propFix[this.toLowerCase()] = this
        }), de.enctype || (fe.propFix.enctype = "encoding");
        var Ut = /[\t\r\n\f]/g;
        fe.fn.extend({
            addClass: function (t) {
                var e, n, i, r, o, a, s, l = 0;
                if (fe.isFunction(t)) return this.each(function (e) {
                    fe(this).addClass(t.call(this, e, B(this)))
                });
                if ("string" == typeof t && t)
                    for (e = t.match(Me) || []; n = this[l++];)
                        if (r = B(n), i = 1 === n.nodeType && (" " + r + " ").replace(Ut, " ")) {
                            for (a = 0; o = e[a++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                            r !== (s = fe.trim(i)) && fe.attr(n, "class", s)
                        } return this
            },
            removeClass: function (t) {
                var e, n, i, r, o, a, s, l = 0;
                if (fe.isFunction(t)) return this.each(function (e) {
                    fe(this).removeClass(t.call(this, e, B(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof t && t)
                    for (e = t.match(Me) || []; n = this[l++];)
                        if (r = B(n), i = 1 === n.nodeType && (" " + r + " ").replace(Ut, " ")) {
                            for (a = 0; o = e[a++];)
                                for (; - 1 < i.indexOf(" " + o + " ");) i = i.replace(" " + o + " ", " ");
                            r !== (s = fe.trim(i)) && fe.attr(n, "class", s)
                        } return this
            },
            toggleClass: function (r, t) {
                var o = typeof r;
                return "boolean" == typeof t && "string" === o ? t ? this.addClass(r) : this.removeClass(r) : fe.isFunction(r) ? this.each(function (e) {
                    fe(this).toggleClass(r.call(this, e, B(this), t), t)
                }) : this.each(function () {
                    var e, t, n, i;
                    if ("string" === o)
                        for (t = 0, n = fe(this), i = r.match(Me) || []; e = i[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                    else r !== undefined && "boolean" !== o || ((e = B(this)) && fe._data(this, "__className__", e), fe.attr(this, "class", e || !1 === r ? "" : fe._data(this, "__className__") || ""))
                })
            },
            hasClass: function (e) {
                var t, n, i = 0;
                for (t = " " + e + " "; n = this[i++];)
                    if (1 === n.nodeType && -1 < (" " + B(n) + " ").replace(Ut, " ").indexOf(t)) return !0;
                return !1
            }
        }), fe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, n) {
            fe.fn[n] = function (e, t) {
                return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
            }
        }), fe.fn.extend({
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        });
        var Vt = S.location,
            Gt = fe.now(),
            Qt = /\?/,
            Jt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        fe.parseJSON = function (e) {
            if (S.JSON && S.JSON.parse) return S.JSON.parse(e + "");
            var r, o = null,
                t = fe.trim(e + "");
            return t && !fe.trim(t.replace(Jt, function (e, t, n, i) {
                return r && t && (o = 0), 0 === o ? e : (r = n || t, o += !i - !n, "")
            })) ? Function("return " + t)() : fe.error("Invalid JSON: " + e)
        }, fe.parseXML = function (e) {
            var t;
            if (!e || "string" != typeof e) return null;
            try {
                S.DOMParser ? t = (new S.DOMParser).parseFromString(e, "text/xml") : ((t = new S.ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e))
            } catch (n) {
                t = undefined
            }
            return t && t.documentElement && !t.getElementsByTagName("parsererror").length || fe.error("Invalid XML: " + e), t
        };
        var Zt = /#.*$/,
            Kt = /([?&])_=[^&]*/,
            Xt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            en = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            tn = /^(?:GET|HEAD)$/,
            nn = /^\/\//,
            rn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            on = {},
            an = {},
            sn = "*/".concat("*"),
            ln = Vt.href,
            un = rn.exec(ln.toLowerCase()) || [];
        fe.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ln,
                type: "GET",
                isLocal: en.test(un[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": sn,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": fe.parseJSON,
                    "text xml": fe.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function (e, t) {
                return t ? V(V(e, fe.ajaxSettings), t) : V(fe.ajaxSettings, e)
            },
            ajaxPrefilter: Y(on),
            ajaxTransport: Y(an),
            ajax: function (e, t) {
                function n(e, t, n, i) {
                    var r, o, a, s, l, u = t;
                    2 !== _ && (_ = 2, h && S.clearTimeout(h), p = undefined, d = i || "", x.readyState = 0 < e ? 4 : 0, r = 200 <= e && e < 300 || 304 === e, n && (s = G(m, x, n)), s = Q(m, s, x, r), r ? (m.ifModified && ((l = x.getResponseHeader("Last-Modified")) && (fe.lastModified[c] = l), (l = x.getResponseHeader("etag")) && (fe.etag[c] = l)), 204 === e || "HEAD" === m.type ? u = "nocontent" : 304 === e ? u = "notmodified" : (u = s.state, o = s.data, r = !(a = s.error))) : (a = u, !e && u || (u = "error", e < 0 && (e = 0))), x.status = e, x.statusText = (t || u) + "", r ? v.resolveWith(g, [o, u, x]) : v.rejectWith(g, [x, u, a]), x.statusCode(b), b = undefined, f && y.trigger(r ? "ajaxSuccess" : "ajaxError", [x, m, r ? o : a]), w.fireWith(g, [x, u]), f && (y.trigger("ajaxComplete", [x, m]), --fe.active || fe.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (t = e, e = undefined), t = t || {};
                var i, r, c, d, h, f, p, o, m = fe.ajaxSetup({}, t),
                    g = m.context || m,
                    y = m.context && (g.nodeType || g.jquery) ? fe(g) : fe.event,
                    v = fe.Deferred(),
                    w = fe.Callbacks("once memory"),
                    b = m.statusCode || {},
                    a = {},
                    s = {},
                    _ = 0,
                    l = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function (e) {
                            var t;
                            if (2 === _) {
                                if (!o)
                                    for (o = {}; t = Xt.exec(d);) o[t[1].toLowerCase()] = t[2];
                                t = o[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function () {
                            return 2 === _ ? d : null
                        },
                        setRequestHeader: function (e, t) {
                            var n = e.toLowerCase();
                            return _ || (e = s[n] = s[n] || e, a[e] = t), this
                        },
                        overrideMimeType: function (e) {
                            return _ || (m.mimeType = e), this
                        },
                        statusCode: function (e) {
                            var t;
                            if (e)
                                if (_ < 2)
                                    for (t in e) b[t] = [b[t], e[t]];
                                else x.always(e[x.status]);
                            return this
                        },
                        abort: function (e) {
                            var t = e || l;
                            return p && p.abort(t), n(0, t), this
                        }
                    };
                if (v.promise(x).complete = w.add, x.success = x.done, x.error = x.fail, m.url = ((e || m.url || ln) + "").replace(Zt, "").replace(nn, un[1] + "//"), m.type = t.method || t.type || m.method || m.type, m.dataTypes = fe.trim(m.dataType || "*").toLowerCase().match(Me) || [""], null == m.crossDomain && (i = rn.exec(m.url.toLowerCase()), m.crossDomain = !(!i || i[1] === un[1] && i[2] === un[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (un[3] || ("http:" === un[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = fe.param(m.data, m.traditional)), U(on, m, t, x), 2 === _) return x;
                for (r in (f = fe.event && m.global) && 0 == fe.active++ && fe.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !tn.test(m.type), c = m.url, m.hasContent || (m.data && (c = m.url += (Qt.test(c) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (m.url = Kt.test(c) ? c.replace(Kt, "$1_=" + Gt++) : c + (Qt.test(c) ? "&" : "?") + "_=" + Gt++)), m.ifModified && (fe.lastModified[c] && x.setRequestHeader("If-Modified-Since", fe.lastModified[c]), fe.etag[c] && x.setRequestHeader("If-None-Match", fe.etag[c])), (m.data && m.hasContent && !1 !== m.contentType || t.contentType) && x.setRequestHeader("Content-Type", m.contentType), x.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + sn + "; q=0.01" : "") : m.accepts["*"]), m.headers) x.setRequestHeader(r, m.headers[r]);
                if (m.beforeSend && (!1 === m.beforeSend.call(g, x, m) || 2 === _)) return x.abort();
                for (r in l = "abort", {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[r](m[r]);
                if (p = U(an, m, t, x)) {
                    if (x.readyState = 1, f && y.trigger("ajaxSend", [x, m]), 2 === _) return x;
                    m.async && 0 < m.timeout && (h = S.setTimeout(function () {
                        x.abort("timeout")
                    }, m.timeout));
                    try {
                        _ = 1, p.send(a, n)
                    } catch (u) {
                        if (!(_ < 2)) throw u;
                        n(-1, u)
                    }
                } else n(-1, "No Transport");
                return x
            },
            getJSON: function (e, t, n) {
                return fe.get(e, t, n, "json")
            },
            getScript: function (e, t) {
                return fe.get(e, undefined, t, "script")
            }
        }), fe.each(["get", "post"], function (e, r) {
            fe[r] = function (e, t, n, i) {
                return fe.isFunction(t) && (i = i || n, n = t, t = undefined), fe.ajax(fe.extend({
                    url: e,
                    type: r,
                    dataType: i,
                    data: t,
                    success: n
                }, fe.isPlainObject(e) && e))
            }
        }), fe._evalUrl = function (e) {
            return fe.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                "throws": !0
            })
        }, fe.fn.extend({
            wrapAll: function (t) {
                if (fe.isFunction(t)) return this.each(function (e) {
                    fe(this).wrapAll(t.call(this, e))
                });
                if (this[0]) {
                    var e = fe(t, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            },
            wrapInner: function (n) {
                return fe.isFunction(n) ? this.each(function (e) {
                    fe(this).wrapInner(n.call(this, e))
                }) : this.each(function () {
                    var e = fe(this),
                        t = e.contents();
                    t.length ? t.wrapAll(n) : e.append(n)
                })
            },
            wrap: function (t) {
                var n = fe.isFunction(t);
                return this.each(function (e) {
                    fe(this).wrapAll(n ? t.call(this, e) : t)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    fe.nodeName(this, "body") || fe(this).replaceWith(this.childNodes)
                }).end()
            }
        }), fe.expr.filters.hidden = function (e) {
            return de.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : Z(e)
        }, fe.expr.filters.visible = function (e) {
            return !fe.expr.filters.hidden(e)
        };
        var cn = /%20/g,
            dn = /\[\]$/,
            hn = /\r?\n/g,
            fn = /^(?:submit|button|image|reset|file)$/i,
            pn = /^(?:input|select|textarea|keygen)/i;
        fe.param = function (e, t) {
            var n, i = [],
                r = function (e, t) {
                    t = fe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (t === undefined && (t = fe.ajaxSettings && fe.ajaxSettings.traditional), fe.isArray(e) || e.jquery && !fe.isPlainObject(e)) fe.each(e, function () {
                r(this.name, this.value)
            });
            else
                for (n in e) K(n, e[n], t, r);
            return i.join("&").replace(cn, "+")
        }, fe.fn.extend({
            serialize: function () {
                return fe.param(this.serializeArray())
            },
            serializeArray: function () {
                return this.map(function () {
                    var e = fe.prop(this, "elements");
                    return e ? fe.makeArray(e) : this
                }).filter(function () {
                    var e = this.type;
                    return this.name && !fe(this).is(":disabled") && pn.test(this.nodeName) && !fn.test(e) && (this.checked || !We.test(e))
                }).map(function (e, t) {
                    var n = fe(this).val();
                    return null == n ? null : fe.isArray(n) ? fe.map(n, function (e) {
                        return {
                            name: t.name,
                            value: e.replace(hn, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(hn, "\r\n")
                    }
                }).get()
            }
        }), fe.ajaxSettings.xhr = S.ActiveXObject !== undefined ? function () {
            return this.isLocal ? ee() : 8 < ie.documentMode ? X() : /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || ee()
        } : X;
        var mn = 0,
            gn = {},
            yn = fe.ajaxSettings.xhr();
        S.attachEvent && S.attachEvent("onunload", function () {
            for (var e in gn) gn[e](undefined, !0)
        }), de.cors = !!yn && "withCredentials" in yn, (yn = de.ajax = !!yn) && fe.ajaxTransport(function (u) {
            var c;
            if (!u.crossDomain || de.cors) return {
                send: function (e, a) {
                    var t, s = u.xhr(),
                        l = ++mn;
                    if (s.open(u.type, u.url, u.async, u.username, u.password), u.xhrFields)
                        for (t in u.xhrFields) s[t] = u.xhrFields[t];
                    for (t in u.mimeType && s.overrideMimeType && s.overrideMimeType(u.mimeType), u.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) e[t] !== undefined && s.setRequestHeader(t, e[t] + "");
                    s.send(u.hasContent && u.data || null), c = function (e, t) {
                        var n, i, r;
                        if (c && (t || 4 === s.readyState))
                            if (delete gn[l], c = undefined, s.onreadystatechange = fe.noop, t) 4 !== s.readyState && s.abort();
                            else {
                                r = {}, n = s.status, "string" == typeof s.responseText && (r.text = s.responseText);
                                try {
                                    i = s.statusText
                                } catch (o) {
                                    i = ""
                                }
                                n || !u.isLocal || u.crossDomain ? 1223 === n && (n = 204) : n = r.text ? 200 : 404
                            } r && a(n, i, r, s.getAllResponseHeaders())
                    }, u.async ? 4 === s.readyState ? S.setTimeout(c) : s.onreadystatechange = gn[l] = c : c()
                },
                abort: function () {
                    c && c(undefined, !0)
                }
            }
        }), fe.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function (e) {
                    return fe.globalEval(e), e
                }
            }
        }), fe.ajaxPrefilter("script", function (e) {
            e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), fe.ajaxTransport("script", function (t) {
            if (t.crossDomain) {
                var i, r = ie.head || fe("head")[0] || ie.documentElement;
                return {
                    send: function (e, n) {
                        (i = ie.createElement("script")).async = !0, t.scriptCharset && (i.charset = t.scriptCharset), i.src = t.url, i.onload = i.onreadystatechange = function (e, t) {
                            (t || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, t || n(200, "success"))
                        }, r.insertBefore(i, r.firstChild)
                    },
                    abort: function () {
                        i && i.onload(undefined, !0)
                    }
                }
            }
        });
        var vn = [],
            wn = /(=)\?(?=&|$)|\?\?/;
        fe.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var e = vn.pop() || fe.expando + "_" + Gt++;
                return this[e] = !0, e
            }
        }), fe.ajaxPrefilter("json jsonp", function (e, t, n) {
            var i, r, o, a = !1 !== e.jsonp && (wn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && wn.test(e.data) && "data");
            if (a || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = fe.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(wn, "$1" + i) : !1 !== e.jsonp && (e.url += (Qt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
                return o || fe.error(i + " was not called"), o[0]
            }, e.dataTypes[0] = "json", r = S[i], S[i] = function () {
                o = arguments
            }, n.always(function () {
                r === undefined ? fe(S).removeProp(i) : S[i] = r, e[i] && (e.jsonpCallback = t.jsonpCallback, vn.push(i)), o && fe.isFunction(r) && r(o[0]), o = r = undefined
            }), "script"
        }), fe.parseHTML = function (e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || ie;
            var i = xe.exec(e),
                r = !n && [];
            return i ? [t.createElement(i[1])] : (i = m([e], t, r), r && r.length && fe(r).remove(), fe.merge([], i.childNodes))
        };
        var bn = fe.fn.load;
        fe.fn.load = function (e, t, n) {
            if ("string" != typeof e && bn) return bn.apply(this,
                arguments);
            var i, r, o, a = this,
                s = e.indexOf(" ");
            return -1 < s && (i = fe.trim(e.slice(s, e.length)), e = e.slice(0, s)), fe.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (r = "POST"), 0 < a.length && fe.ajax({
                url: e,
                type: r || "GET",
                dataType: "html",
                data: t
            }).done(function (e) {
                o = arguments, a.html(i ? fe("<div>").append(fe.parseHTML(e)).find(i) : e)
            }).always(n && function (e, t) {
                a.each(function () {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }), this
        }, fe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
            fe.fn[t] = function (e) {
                return this.on(t, e)
            }
        }), fe.expr.filters.animated = function (t) {
            return fe.grep(fe.timers, function (e) {
                return t === e.elem
            }).length
        }, fe.offset = {
            setOffset: function (e, t, n) {
                var i, r, o, a, s, l, u = fe.css(e, "position"),
                    c = fe(e),
                    d = {};
                "static" === u && (e.style.position = "relative"), s = c.offset(), o = fe.css(e, "top"), l = fe.css(e, "left"), ("absolute" === u || "fixed" === u) && -1 < fe.inArray("auto", [o, l]) ? (a = (i = c.position()).top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), fe.isFunction(t) && (t = t.call(e, n, fe.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + r), "using" in t ? t.using.call(e, d) : c.css(d)
            }
        }, fe.fn.extend({
            offset: function (t) {
                if (arguments.length) return t === undefined ? this : this.each(function (e) {
                    fe.offset.setOffset(this, t, e)
                });
                var e, n, i = {
                        top: 0,
                        left: 0
                    },
                    r = this[0],
                    o = r && r.ownerDocument;
                return o ? (e = o.documentElement, fe.contains(e, r) ? ("undefined" != typeof r.getBoundingClientRect && (i = r.getBoundingClientRect()), n = te(o), {
                    top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                }) : i) : void 0
            },
            position: function () {
                if (this[0]) {
                    var e, t, n = {
                            top: 0,
                            left: 0
                        },
                        i = this[0];
                    return "fixed" === fe.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), fe.nodeName(e[0], "html") || (n = e.offset()), n.top += fe.css(e[0], "borderTopWidth", !0), n.left += fe.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - n.top - fe.css(i, "marginTop", !0),
                        left: t.left - n.left - fe.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent; e && !fe.nodeName(e, "html") && "static" === fe.css(e, "position");) e = e.offsetParent;
                    return e || mt
                })
            }
        }), fe.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (t, r) {
            var o = /Y/.test(r);
            fe.fn[t] = function (e) {
                return qe(this, function (e, t, n) {
                    var i = te(e);
                    if (n === undefined) return i ? r in i ? i[r] : i.document.documentElement[t] : e[t];
                    i ? i.scrollTo(o ? fe(i).scrollLeft() : n, o ? n : fe(i).scrollTop()) : e[t] = n
                }, t, e, arguments.length, null)
            }
        }), fe.each(["top", "left"], function (e, n) {
            fe.cssHooks[n] = L(de.pixelPosition, function (e, t) {
                if (t) return t = yt(e, n), ft.test(t) ? fe(e).position()[n] + "px" : t
            })
        }), fe.each({
            Height: "height",
            Width: "width"
        }, function (o, a) {
            fe.each({
                padding: "inner" + o,
                content: a,
                "": "outer" + o
            }, function (i, e) {
                fe.fn[e] = function (e, t) {
                    var n = arguments.length && (i || "boolean" != typeof e),
                        r = i || (!0 === e || !0 === t ? "margin" : "border");
                    return qe(this, function (e, t, n) {
                        var i;
                        return fe.isWindow(e) ? e.document.documentElement["client" + o] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + o], i["scroll" + o], e.body["offset" + o], i["offset" + o], i["client" + o])) : n === undefined ? fe.css(e, t, r) : fe.style(e, t, n, r)
                    }, a, n ? e : undefined, n, null)
                }
            })
        }), fe.fn.extend({
            bind: function (e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function (e, t) {
                return this.off(e, null, t)
            },
            delegate: function (e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }), fe.fn.size = function () {
            return this.length
        }, fe.fn.andSelf = fe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return fe
        });
        var _n = S.jQuery,
            xn = S.$;
        return fe.noConflict = function (e) {
            return S.$ === fe && (S.$ = xn), e && S.jQuery === fe && (S.jQuery = _n), fe
        }, e || (S.jQuery = S.$ = fe), fe
    }), jQuery.fn.jquery = "1.11.99", void 0 === jQuery.migrateMute && (jQuery.migrateMute = !0),
    function (u, n, c) {
        function d(e) {
            var t = n.console;
            i[e] || (i[e] = !0, u.migrateWarnings.push(e), t && t.warn && !u.migrateMute && (t.warn("JQMIGRATE: " + e), u.migrateTrace && t.trace && t.trace()))
        }

        function e(e, t, n, i) {
            if (Object.defineProperty) try {
                return Object.defineProperty(e, t, {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                        return d(i), n
                    },
                    set: function (e) {
                        d(i), n = e
                    }
                }), c
            } catch (s) {}
            u._definePropertyBroken = !0, e[t] = n
        }
        var i = {};
        u.migrateWarnings = [], !u.migrateMute && n.console && n.console.log && n.console.log("JQMIGRATE: Logging is active"), u.migrateTrace === c && (u.migrateTrace = !0), u.migrateReset = function () {
            i = {}, u.migrateWarnings.length = 0
        }, "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
        var a = u("<input/>", {
                size: 1
            }).attr("size") && u.attrFn,
            s = u.attr,
            r = u.attrHooks.value && u.attrHooks.value.get || function () {
                return null
            },
            o = u.attrHooks.value && u.attrHooks.value.set || function () {
                return c
            },
            l = /^(?:input|button)$/i,
            h = /^[238]$/,
            f = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            p = /^(?:checked|selected)$/i;
        e(u, "attrFn", a || {}, "jQuery.attrFn is deprecated"), u.attr = function (e, t, n, i) {
            var r = t.toLowerCase(),
                o = e && e.nodeType;
            return i && (s.length < 4 && d("jQuery.fn.attr( props, pass ) is deprecated"), e && !h.test(o) && (a ? t in a : u.isFunction(u.fn[t]))) ? u(e)[t](n) : ("type" === t && n !== c && l.test(e.nodeName) && e.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), !u.attrHooks[r] && f.test(r) && (u.attrHooks[r] = {
                get: function (e, t) {
                    var n, i = u.prop(e, t);
                    return !0 === i || "boolean" != typeof i && (n = e.getAttributeNode(t)) && !1 !== n.nodeValue ? t.toLowerCase() : c
                },
                set: function (e, t, n) {
                    var i;
                    return !1 === t ? u.removeAttr(e, n) : ((i = u.propFix[n] || n) in e && (e[i] = !0), e.setAttribute(n, n.toLowerCase())), n
                }
            }, p.test(r) && d("jQuery.fn.attr('" + r + "') may use property instead of attribute")), s.call(u, e, t, n))
        }, u.attrHooks.value = {
            get: function (e, t) {
                var n = (e.nodeName || "").toLowerCase();
                return "button" === n ? r.apply(this, arguments) : ("input" !== n && "option" !== n && d("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
            },
            set: function (e, t) {
                var n = (e.nodeName || "").toLowerCase();
                return "button" === n ? o.apply(this, arguments) : ("input" !== n && "option" !== n && d("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, c)
            }
        };
        var t, m, g = u.fn.init,
            y = u.parseJSON,
            v = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        u.fn.init = function (e, t, n) {
            var i;
            return e && "string" == typeof e && !u.isPlainObject(t) && (i = v.exec(u.trim(e))) && i[0] && ("<" !== e.charAt(0) && d("$(html) HTML strings must start with '<' character"), i[3] && d("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) && (d("HTML string cannot start with a '#' character"), u.error("JQMIGRATE: Invalid selector string (XSS)")), t && t.context && (t = t.context), u.parseHTML) ? g.call(this, u.parseHTML(i[2], t, !0), t, n) : g.apply(this, arguments)
        }, u.fn.init.prototype = u.fn, u.parseJSON = function (e) {
            return e || null === e ? y.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), null)
        }, u.uaMatch = function (e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        }, u.browser || (m = {}, (t = u.uaMatch(navigator.userAgent)).browser && (m[t.browser] = !0, m.version = t.version), m.chrome ? m.webkit = !0 : m.webkit && (m.safari = !0), u.browser = m), e(u, "browser", u.browser, "jQuery.browser is deprecated"), u.sub = function () {
            function n(e, t) {
                return new n.fn.init(e, t)
            }
            u.extend(!0, n, this), n.superclass = this, n.fn = n.prototype = this(), (n.fn.constructor = n).sub = this.sub, n.fn.init = function (e, t) {
                return t && t instanceof u && !(t instanceof n) && (t = n(t)), u.fn.init.call(this, e, t, i)
            }, n.fn.init.prototype = n.fn;
            var i = n(document);
            return d("jQuery.sub() is deprecated"), n
        }, u.ajaxSetup({
            converters: {
                "text json": u.parseJSON
            }
        });
        var w = u.fn.data;
        u.fn.data = function (e) {
            var t, n, i = this[0];
            return !i || "events" !== e || 1 !== arguments.length || (t = u.data(i, e), n = u._data(i, e), t !== c && t !== n || n === c) ? w.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), n)
        };
        var b = /\/(java|ecma)script/i,
            _ = u.fn.andSelf || u.fn.addBack;
        u.fn.andSelf = function () {
            return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), _.apply(this, arguments)
        }, u.clean || (u.clean = function (e, t, n, i) {
            t = (t = !(t = t || document).nodeType && t[0] || t).ownerDocument || t, d("jQuery.clean() is deprecated");
            var r, o, a, s, l = [];
            if (u.merge(l, u.buildFragment(e, t).childNodes), n)
                for (a = function (e) {
                        return !e.type || b.test(e.type) ? i ? i.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e) : c
                    }, r = 0; null != (o = l[r]); r++) u.nodeName(o, "script") && a(o) || (n.appendChild(o), o.getElementsByTagName !== c && (s = u.grep(u.merge([], o.getElementsByTagName("script")), a), l.splice.apply(l, [r + 1, 0].concat(s)), r += s.length));
            return l
        });
        var x = u.event.add,
            S = u.event.remove,
            k = u.event.trigger,
            T = u.fn.toggle,
            C = u.fn.live,
            E = u.fn.die,
            A = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            $ = RegExp("\\b(?:" + A + ")\\b"),
            M = /(?:^|\s)hover(\.\S+|)\b/,
            L = function (e) {
                return "string" != typeof e || u.event.special.hover ? e : (M.test(e) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), e && e.replace(M, "mouseenter$1 mouseleave$1"))
            };
        u.event.props && "attrChange" !== u.event.props[0] && u.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), u.event.dispatch && e(u.event, "handle", u.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), u.event.add = function (e, t, n, i, r) {
            e !== document && $.test(t) && d("AJAX events should be attached to document: " + t), x.call(this, e, L(t || ""), n, i, r)
        }, u.event.remove = function (e, t, n, i, r) {
            S.call(this, e, L(t) || "", n, i, r)
        }, u.fn.error = function () {
            var e = Array.prototype.slice.call(arguments, 0);
            return d("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
        }, u.fn.toggle = function (n, e) {
            if (!u.isFunction(n) || !u.isFunction(e)) return T.apply(this, arguments);
            d("jQuery.fn.toggle(handler, handler...) is deprecated");
            var i = arguments,
                t = n.guid || u.guid++,
                r = 0,
                o = function (e) {
                    var t = (u._data(this, "lastToggle" + n.guid) || 0) % r;
                    return u._data(this, "lastToggle" + n.guid, t + 1), e.preventDefault(), i[t].apply(this, arguments) || !1
                };
            for (o.guid = t; i.length > r;) i[r++].guid = t;
            return this.click(o)
        }, u.fn.live = function (e, t, n) {
            return d("jQuery.fn.live() is deprecated"), C ? C.apply(this, arguments) : (u(this.context).on(e, this.selector, t, n), this)
        }, u.fn.die = function (e, t) {
            return d("jQuery.fn.die() is deprecated"), E ? E.apply(this, arguments) : (u(this.context).off(e, this.selector || "**", t), this)
        }, u.event.trigger = function (e, t, n, i) {
            return n || $.test(e) || d("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, i)
        }, u.each(A.split("|"), function (e, t) {
            u.event.special[t] = {
                setup: function () {
                    var e = this;
                    return e !== document && (u.event.add(document, t + "." + u.guid, function () {
                        u.event.trigger(t, null, e, !0)
                    }), u._data(this, t, u.guid++)), !1
                },
                teardown: function () {
                    return this !== document && u.event.remove(document, t + "." + u._data(this, t)), !1
                }
            }
        })
    }(jQuery, window),
    function (c, l) {
        "use strict";
        var u;
        c.rails !== l && c.error("jquery-ujs has already been loaded!");
        var e = c(document);
        c.rails = u = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
            buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
            disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
            fileInputSelector: "input[name][type=file]:not([disabled])",
            linkDisableSelector: "a[data-disable-with], a[data-disable]",
            buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
            csrfToken: function () {
                return c("meta[name=csrf-token]").attr("content")
            },
            csrfParam: function () {
                return c("meta[name=csrf-param]").attr("content")
            },
            CSRFProtection: function (e) {
                var t = u.csrfToken();
                t && e.setRequestHeader("X-CSRF-Token", t)
            },
            refreshCSRFTokens: function () {
                c('form input[name="' + u.csrfParam() + '"]').val(u.csrfToken())
            },
            fire: function (e, t, n) {
                var i = c.Event(t);
                return e.trigger(i, n), !1 !== i.result
            },
            confirm: function (e) {
                return confirm(e)
            },
            ajax: function (e) {
                return c.ajax(e)
            },
            href: function (e) {
                return e[0].href
            },
            isRemote: function (e) {
                return e.data("remote") !== l && !1 !== e.data("remote")
            },
            handleRemote: function (i) {
                var e, t, n, r, o, a;
                if (u.fire(i, "ajax:before")) {
                    if (r = i.data("with-credentials") || null, o = i.data("type") || c.ajaxSettings && c.ajaxSettings.dataType, i.is("form")) {
                        e = i.data("ujs:submit-button-formmethod") || i.attr("method"), t = i.data("ujs:submit-button-formaction") || i.attr("action"), n = c(i[0]).serializeArray();
                        var s = i.data("ujs:submit-button");
                        s && (n.push(s), i.data("ujs:submit-button", null)), i.data("ujs:submit-button-formmethod", null), i.data("ujs:submit-button-formaction", null)
                    } else i.is(u.inputChangeSelector) ? (e = i.data("method"), t = i.data("url"), n = i.serialize(), i.data("params") && (n = n + "&" + i.data("params"))) : i.is(u.buttonClickSelector) ? (e = i.data("method") || "get", t = i.data("url"), n = i.serialize(), i.data("params") && (n = n + "&" + i.data("params"))) : (e = i.data("method"), t = u.href(i), n = i.data("params") || null);
                    return a = {
                        type: e || "GET",
                        data: n,
                        dataType: o,
                        beforeSend: function (e, t) {
                            if (t.dataType === l && e.setRequestHeader("accept", "*/*;q=0.5, " + t.accepts.script), !u.fire(i, "ajax:beforeSend", [e, t])) return !1;
                            i.trigger("ajax:send", e)
                        },
                        success: function (e, t, n) {
                            i.trigger("ajax:success", [e, t, n])
                        },
                        complete: function (e, t) {
                            i.trigger("ajax:complete", [e, t])
                        },
                        error: function (e, t, n) {
                            i.trigger("ajax:error", [e, t, n])
                        },
                        crossDomain: u.isCrossDomain(t)
                    }, r && (a.xhrFields = {
                        withCredentials: r
                    }), t && (a.url = t), u.ajax(a)
                }
                return !1
            },
            isCrossDomain: function (e) {
                var t = document.createElement("a");
                t.href = location.href;
                var n = document.createElement("a");
                try {
                    return n.href = e, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
                } catch (i) {
                    return !0
                }
            },
            handleMethod: function (e) {
                var t = u.href(e),
                    n = e.data("method"),
                    i = e.attr("target"),
                    r = u.csrfToken(),
                    o = u.csrfParam(),
                    a = c('<form method="post" action="' + t + '"></form>'),
                    s = '<input name="_method" value="' + n + '" type="hidden" />';
                o === l || r === l || u.isCrossDomain(t) || (s += '<input name="' + o + '" value="' + r + '" type="hidden" />'), i && a.attr("target", i), a.hide().append(s).appendTo("body"), a.submit()
            },
            formElements: function (e, t) {
                return e.is("form") ? c(e[0].elements).filter(t) : e.find(t)
            },
            disableFormElements: function (e) {
                u.formElements(e, u.disableSelector).each(function () {
                    u.disableFormElement(c(this))
                })
            },
            disableFormElement: function (e) {
                var t, n;
                t = e.is("button") ? "html" : "val", (n = e.data("disable-with")) !== l && (e.data("ujs:enable-with", e[t]()), e[t](n)), e.prop("disabled", !0), e.data("ujs:disabled", !0)
            },
            enableFormElements: function (e) {
                u.formElements(e, u.enableSelector).each(function () {
                    u.enableFormElement(c(this))
                })
            },
            enableFormElement: function (e) {
                var t = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with") !== l && (e[t](e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.prop("disabled", !1), e.removeData("ujs:disabled")
            },
            allowAction: function (e) {
                var t, n = e.data("confirm"),
                    i = !1;
                if (!n) return !0;
                if (u.fire(e, "confirm")) {
                    try {
                        i = u.confirm(n)
                    } catch (r) {
                        (console.error || console.log).call(console, r.stack || r)
                    }
                    t = u.fire(e, "confirm:complete", [i])
                }
                return i && t
            },
            blankInputs: function (e, t, n) {
                var i, r, o, a = c(),
                    s = t || "input,textarea",
                    l = e.find(s),
                    u = {};
                return l.each(function () {
                    (i = c(this)).is("input[type=radio]") ? (o = i.attr("name"), u[o] || (0 === e.find('input[type=radio]:checked[name="' + o + '"]').length && (r = e.find('input[type=radio][name="' + o + '"]'), a = a.add(r)), u[o] = o)) : (i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") : !!i.val()) === n && (a = a.add(i))
                }), !!a.length && a
            },
            nonBlankInputs: function (e, t) {
                return u.blankInputs(e, t, !0)
            },
            stopEverything: function (e) {
                return c(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
            },
            disableElement: function (e) {
                var t = e.data("disable-with");
                t !== l && (e.data("ujs:enable-with", e.html()), e.html(t)), e.bind("click.railsDisable", function (e) {
                    return u.stopEverything(e)
                }), e.data("ujs:disabled", !0)
            },
            enableElement: function (e) {
                e.data("ujs:enable-with") !== l && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable"), e.removeData("ujs:disabled")
            }
        }, u.fire(e, "rails:attachBindings") && (c.ajaxPrefilter(function (e, t, n) {
            e.crossDomain || u.CSRFProtection(n)
        }), c(window).on("pageshow.rails", function () {
            c(c.rails.enableSelector).each(function () {
                var e = c(this);
                e.data("ujs:disabled") && c.rails.enableFormElement(e)
            }), c(c.rails.linkDisableSelector).each(function () {
                var e = c(this);
                e.data("ujs:disabled") && c.rails.enableElement(e)
            })
        }), e.on("ajax:complete", u.linkDisableSelector, function () {
            u.enableElement(c(this))
        }), e.on("ajax:complete", u.buttonDisableSelector, function () {
            u.enableFormElement(c(this))
        }), e.on("click.rails", u.linkClickSelector, function (e) {
            var t = c(this),
                n = t.data("method"),
                i = t.data("params"),
                r = e.metaKey || e.ctrlKey;
            if (!u.allowAction(t)) return u.stopEverything(e);
            if (!r && t.is(u.linkDisableSelector) && u.disableElement(t), u.isRemote(t)) {
                if (r && (!n || "GET" === n) && !i) return !0;
                var o = u.handleRemote(t);
                return !1 === o ? u.enableElement(t) : o.fail(function () {
                    u.enableElement(t)
                }), !1
            }
            return n ? (u.handleMethod(t), !1) : void 0
        }), e.on("click.rails", u.buttonClickSelector, function (e) {
            var t = c(this);
            if (!u.allowAction(t) || !u.isRemote(t)) return u.stopEverything(e);
            t.is(u.buttonDisableSelector) && u.disableFormElement(t);
            var n = u.handleRemote(t);
            return !1 === n ? u.enableFormElement(t) : n.fail(function () {
                u.enableFormElement(t)
            }), !1
        }), e.on("change.rails", u.inputChangeSelector, function (e) {
            var t = c(this);
            return u.allowAction(t) && u.isRemote(t) ? (u.handleRemote(t), !1) : u.stopEverything(e)
        }), e.on("submit.rails", u.formSubmitSelector, function (e) {
            var t, n, i = c(this),
                r = u.isRemote(i);
            if (!u.allowAction(i)) return u.stopEverything(e);
            if (i.attr("novalidate") === l)
                if (i.data("ujs:formnovalidate-button") === l) {
                    if ((t = u.blankInputs(i, u.requiredInputSelector, !1)) && u.fire(i, "ajax:aborted:required", [t])) return u.stopEverything(e)
                } else i.data("ujs:formnovalidate-button", l);
            if (r) {
                if (n = u.nonBlankInputs(i, u.fileInputSelector)) {
                    setTimeout(function () {
                        u.disableFormElements(i)
                    }, 13);
                    var o = u.fire(i, "ajax:aborted:file", [n]);
                    return o || setTimeout(function () {
                        u.enableFormElements(i)
                    }, 13), o
                }
                return u.handleRemote(i), !1
            }
            setTimeout(function () {
                u.disableFormElements(i)
            }, 13)
        }), e.on("click.rails", u.formInputClickSelector, function (e) {
            var t = c(this);
            if (!u.allowAction(t)) return u.stopEverything(e);
            var n = t.attr("name"),
                i = n ? {
                    name: n,
                    value: t.val()
                } : null,
                r = t.closest("form");
            0 === r.length && (r = c("#" + t.attr("form"))), r.data("ujs:submit-button", i), r.data("ujs:formnovalidate-button", t.attr("formnovalidate")), r.data("ujs:submit-button-formaction", t.attr("formaction")), r.data("ujs:submit-button-formmethod", t.attr("formmethod"))
        }), e.on("ajax:send.rails", u.formSubmitSelector, function (e) {
            this === e.target && u.disableFormElements(c(this))
        }), e.on("ajax:complete.rails", u.formSubmitSelector, function (e) {
            this === e.target && u.enableFormElements(c(this))
        }), c(function () {
            u.refreshCSRFTokens()
        }))
    }(jQuery), Array.prototype.indexOf || (Array.prototype.indexOf = function (e, t) {
        "use strict";
        if (null == this) throw new TypeError;
        var n = Object(this),
            i = n.length >>> 0;
        if (0 === i) return -1;
        var r = 0;
        if (1 < arguments.length && ((r = Number(t)) != r ? r = 0 : 0 != r && r != Infinity && r != -Infinity && (r = (0 < r || -1) * Math.floor(Math.abs(r)))), i <= r) return -1;
        for (var o = 0 <= r ? r : Math.max(i - Math.abs(r), 0); o < i; o++)
            if (o in n && n[o] === e) return o;
        return -1
    }), Array.prototype.forEach || (Array.prototype.forEach = function forEach(e, t) {
        var n, i;
        if (null == this) throw new TypeError("this is null or not defined");
        var r = Object(this),
            o = r.length >>> 0;
        if ("[object Function]" !== {}.toString.call(e)) throw new TypeError(e + " is not a function");
        for (t && (n = t), i = 0; i < o;) {
            var a;
            Object.prototype.hasOwnProperty.call(r, i) && (a = r[i], e.call(n, a, i, r)), i++
        }
    }), Array.prototype.some || (Array.prototype.some = function (e, t) {
        "use strict";
        if (null == this) throw new TypeError;
        var n = Object(this),
            i = n.length >>> 0;
        if ("function" != typeof e) throw new TypeError;
        for (var r = 2 <= arguments.length ? t : void 0, o = 0; o < i; o++)
            if (o in n && e.call(r, n[o], o, n)) return !0;
        return !1
    }),
    function (e, t) {
        "function" == typeof define && define.amd ? define("i18n", function () {
            return t(e)
        }) : "object" == typeof module && module.exports ? module.exports = t(e) : e.I18n = t(e)
    }(this, function (e) {
        "use strict";
        var y = e && e.I18n || {},
            r = Array.prototype.slice,
            v = function (e) {
                return ("0" + e.toString()).substr(-2)
            },
            u = function (e, t) {
                return d("round", e, -t).toFixed(t)
            },
            l = function (e) {
                var t = typeof e;
                return "function" === t || "object" === t
            },
            n = function (e) {
                return "function" === typeof e
            },
            c = function (e) {
                return null != e
            },
            i = function (e) {
                return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
            },
            o = function (e) {
                return "string" == typeof value || "[object String]" === Object.prototype.toString.call(e)
            },
            a = function (e) {
                return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
            },
            s = function (e) {
                return !0 === e || !1 === e
            },
            d = function (e, t, n) {
                return void 0 === n || 0 == +n ? Math[e](t) : (t = +t, n = +n, isNaN(t) || "number" != typeof n || n % 1 != 0 ? NaN : (t = t.toString().split("e"), +((t = (t = Math[e](+(t[0] + "e" + (t[1] ? +t[1] - n : -n)))).toString().split("e"))[0] + "e" + (t[1] ? +t[1] + n : n))))
            },
            h = function (e, t) {
                return n(e) ? e(t) : e
            },
            f = function (e, t) {
                var n, i;
                for (n in t) t.hasOwnProperty(n) && (i = t[n], o(i) || a(i) || s(i) ? e[n] = i : (null == e[n] && (e[n] = {}), f(e[n], i)));
                return e
            },
            w = {
                day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                meridian: ["AM", "PM"]
            },
            p = {
                precision: 3,
                separator: ".",
                delimiter: ",",
                strip_insignificant_zeros: !1
            },
            m = {
                unit: "$",
                precision: 2,
                format: "%u%n",
                sign_first: !0,
                delimiter: ",",
                separator: "."
            },
            g = {
                unit: "%",
                precision: 3,
                format: "%n%u",
                separator: ".",
                delimiter: ""
            },
            b = [null, "kb", "mb", "gb", "tb"],
            t = {
                defaultLocale: "en",
                locale: "en",
                defaultSeparator: ".",
                placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
                fallbacks: !1,
                translations: {},
                missingBehaviour: "message",
                missingTranslationPrefix: ""
            };
        return y.reset = function () {
            var e;
            for (e in t) this[e] = t[e]
        }, y.initializeOptions = function () {
            var e;
            for (e in t) c(this[e]) || (this[e] = t[e])
        }, y.initializeOptions(), y.locales = {}, y.locales.get = function (e) {
            var t = this[e] || this[y.locale] || this["default"];
            return n(t) && (t = t(e)), !1 === i(t) && (t = [t]), t
        }, y.locales["default"] = function (e) {
            var t = [],
                r = [];
            return e && t.push(e), !e && y.locale && t.push(y.locale), y.fallbacks && y.defaultLocale && t.push(y.defaultLocale), t.forEach(function (t) {
                var e = t.split("-"),
                    n = null,
                    i = null;
                3 === e.length ? (n = e[0], i = [e[0], e[1]].join("-")) : 2 === e.length && (n = e[0]), -1 === r.indexOf(t) && r.push(t), y.fallbacks && [n, i].forEach(function (e) {
                    null != e && e !== t && -1 === r.indexOf(e) && r.push(e)
                })
            }), t.length || t.push("en"), r
        }, y.pluralization = {}, y.pluralization.get = function (e) {
            return this[e] || this[y.locale] || this["default"]
        }, y.pluralization["default"] = function (e) {
            switch (e) {
                case 0:
                    return ["zero", "other"];
                case 1:
                    return ["one"];
                default:
                    return ["other"]
            }
        }, y.currentLocale = function () {
            return this.locale || this.defaultLocale
        }, y.isSet = c, y.lookup = function (e, t) {
            t = t || {};
            var n, i, r, o, a = this.locales.get(t.locale).slice();
            a[0];
            for (r = this.getFullScope(e, t); a.length;)
                if (n = a.shift(), i = r.split(this.defaultSeparator), o = this.translations[n]) {
                    for (; i.length && (o = o[i.shift()]) !== undefined && null !== o;);
                    if (o !== undefined && null !== o) return o
                } if (c(t.defaultValue)) return h(t.defaultValue, e)
        }, y.pluralizationLookupWithoutFallback = function (e, t, n) {
            var i, r, o = this.pluralization.get(t)(e);
            if (l(n))
                for (; o.length;)
                    if (i = o.shift(), c(n[i])) {
                        r = n[i];
                        break
                    } return r
        }, y.pluralizationLookup = function (e, t, n) {
            n = n || {};
            var i, r, o, a, s = this.locales.get(n.locale).slice();
            s[0];
            for (t = this.getFullScope(t, n); s.length;)
                if (i = s.shift(), r = t.split(this.defaultSeparator), o = this.translations[i]) {
                    for (; r.length && (o = o[r.shift()], l(o));) 0 == r.length && (a = this.pluralizationLookupWithoutFallback(e, i, o));
                    if (null != a && a != undefined) break
                } return null != a && a != undefined || c(n.defaultValue) && (a = l(n.defaultValue) ? this.pluralizationLookupWithoutFallback(e, n.locale, n.defaultValue) : n.defaultValue, o = n.defaultValue), {
                message: a,
                translations: o
            }
        }, y.meridian = function () {
            var e = this.lookup("time"),
                t = this.lookup("date");
            return e && e.am && e.pm ? [e.am, e.pm] : t && t.meridian ? t.meridian : w.meridian
        }, y.prepareOptions = function () {
            for (var e, t = r.call(arguments), n = {}; t.length;)
                if ("object" == typeof (e = t.shift()))
                    for (var i in e) e.hasOwnProperty(i) && (c(n[i]) || (n[i] = e[i]));
            return n
        }, y.createTranslationOptions = function (e, t) {
            var n = [{
                scope: e
            }];
            return c(t.defaults) && (n = n.concat(t.defaults)), c(t.defaultValue) && n.push({
                message: t.defaultValue
            }), n
        }, y.translate = function (t, e) {
            e = e || {};
            var n, i = this.createTranslationOptions(t, e),
                r = this.prepareOptions(e);
            return delete r.defaultValue, i.some(function (e) {
                if (c(e.scope) ? n = this.lookup(e.scope, r) : c(e.message) && (n = h(e.message, t)), n !== undefined && null !== n) return !0
            }, this) ? ("string" == typeof n ? n = this.interpolate(n, e) : l(n) && c(e.count) && (n = this.pluralize(e.count, t, e)), n) : this.missingTranslation(t, e)
        }, y.interpolate = function (e, t) {
            t = t || {};
            var n, i, r, o, a = e.match(this.placeholder);
            if (!a) return e;
            for (; a.length;) i = (n = a.shift()).replace(this.placeholder, "$1"), o = c(t[i]) ? t[i].toString().replace(/\$/gm, "_#$#_") : i in t ? this.nullPlaceholder(n, e, t) : this.missingPlaceholder(n, e, t), r = new RegExp(n.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")), e = e.replace(r, o);
            return e.replace(/_#\$#_/g, "$")
        }, y.pluralize = function (e, t, n) {
            var i, r;
            return n = this.prepareOptions({
                count: String(e)
            }, n), (r = this.pluralizationLookup(e, t, n)).translations == undefined || null == r.translations ? this.missingTranslation(t, n) : r.message != undefined && null != r.message ? this.interpolate(r.message, n) : (i = this.pluralization.get(n.locale), this.missingTranslation(t + "." + i(e)[0], n))
        }, y.missingTranslation = function (e, t) {
            if ("guess" == this.missingBehaviour) {
                var n = e.split(".").slice(-1)[0];
                return (0 < this.missingTranslationPrefix.length ? this.missingTranslationPrefix : "") + n.replace("_", " ").replace(/([a-z])([A-Z])/g, function (e, t, n) {
                    return t + " " + n.toLowerCase()
                })
            }
            return '[missing "' + [null != t && null != t.locale ? t.locale : this.currentLocale(), this.getFullScope(e, t)].join(this.defaultSeparator) + '" translation]'
        }, y.missingPlaceholder = function (e) {
            return "[missing " + e + " value]"
        }, y.nullPlaceholder = function () {
            return y.missingPlaceholder.apply(y, arguments)
        }, y.toNumber = function (e, t) {
            t = this.prepareOptions(t, this.lookup("number.format"), p);
            var n, i, r = e < 0,
                o = u(Math.abs(e), t.precision).toString().split("."),
                a = [],
                s = t.format || "%n",
                l = r ? "-" : "";
            for (e = o[0], n = o[1]; 0 < e.length;) a.unshift(e.substr(Math.max(0, e.length - 3), 3)), e = e.substr(0, e.length - 3);
            return i = a.join(t.delimiter), t.strip_insignificant_zeros && n && (n = n.replace(/0+$/, "")), 0 < t.precision && n && (i += t.separator + n), i = (s = t.sign_first ? "%s" + s : s.replace("%n", "%s%n")).replace("%u", t.unit).replace("%n", i).replace("%s", l)
        }, y.toCurrency = function (e, t) {
            return t = this.prepareOptions(t, this.lookup("number.currency.format"), this.lookup("number.format"), m), this.toNumber(e, t)
        }, y.localize = function (e, t, n) {
            switch (n || (n = {}), e) {
                case "currency":
                    return this.toCurrency(t);
                case "number":
                    return e = this.lookup("number.format"), this.toNumber(t, e);
                case "percentage":
                    return this.toPercentage(t);
                default:
                    var i;
                    return i = e.match(/^(date|time)/) ? this.toTime(e, t) : t.toString(), this.interpolate(i, n)
            }
        }, y.parseDate = function (e) {
            var t, n, i;
            if ("object" == typeof e) return e;
            if (t = e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/)) {
                for (var r = 1; r <= 6; r++) t[r] = parseInt(t[r], 10) || 0;
                t[2] -= 1, i = t[7] ? 1e3 * ("0" + t[7]) : null, n = t[8] ? new Date(Date.UTC(t[1], t[2], t[3], t[4], t[5], t[6], i)) : new Date(t[1], t[2], t[3], t[4], t[5], t[6], i)
            } else "number" == typeof e ? (n = new Date).setTime(e) : e.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/) ? (n = new Date).setTime(Date.parse([RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5].join(" "))) : (e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/), (n = new Date).setTime(Date.parse(e)));
            return n
        }, y.strftime = function (e, t) {
            var n = this.lookup("date"),
                i = y.meridian();
            if (n || (n = {}), n = this.prepareOptions(n, w), isNaN(e.getTime())) throw new Error("I18n.strftime() requires a valid date object, but received an invalid date.");
            var r = e.getDay(),
                o = e.getDate(),
                a = e.getFullYear(),
                s = e.getMonth() + 1,
                l = e.getHours(),
                u = l,
                c = 11 < l ? 1 : 0,
                d = e.getSeconds(),
                h = e.getMinutes(),
                f = e.getTimezoneOffset(),
                p = Math.floor(Math.abs(f / 60)),
                m = Math.abs(f) - 60 * p,
                g = (0 < f ? "-" : "+") + (p.toString().length < 2 ? "0" + p : p) + (m.toString().length < 2 ? "0" + m : m);
            return 12 < u ? u -= 12 : 0 === u && (u = 12), t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = t.replace("%a", n.abbr_day_names[r])).replace("%A", n.day_names[r])).replace("%b", n.abbr_month_names[s])).replace("%B", n.month_names[s])).replace("%d", v(o))).replace("%e", o)).replace("%-d", o)).replace("%H", v(l))).replace("%-H", l)).replace("%I", v(u))).replace("%-I", u)).replace("%m", v(s))).replace("%-m", s)).replace("%M", v(h))).replace("%-M", h)).replace("%p", i[c])).replace("%S", v(d))).replace("%-S", d)).replace("%w", r)).replace("%y", v(a))).replace("%-y", v(a).replace(/^0+/, ""))).replace("%Y", a)).replace("%z", g)
        }, y.toTime = function (e, t) {
            var n = this.parseDate(t),
                i = this.lookup(e);
            return n.toString().match(/invalid/i) ? n.toString() : i ? this.strftime(n, i) : n.toString()
        }, y.toPercentage = function (e, t) {
            return t = this.prepareOptions(t, this.lookup("number.percentage.format"), this.lookup("number.format"), g), this.toNumber(e, t)
        }, y.toHumanSize = function (e, t) {
            for (var n, i, r = 1024, o = e, a = 0; r <= o && a < 4;) o /= r, a += 1;
            return 0 === a ? (n = this.t("number.human.storage_units.units.byte", {
                count: o
            }), i = 0) : (n = this.t("number.human.storage_units.units." + b[a]), i = o - Math.floor(o) == 0 ? 0 : 1), t = this.prepareOptions(t, {
                unit: n,
                precision: i,
                format: "%n%u",
                delimiter: ""
            }), this.toNumber(o, t)
        }, y.getFullScope = function (e, t) {
            return t = t || {}, i(e) && (e = e.join(this.defaultSeparator)), t.scope && (e = [t.scope, e].join(this.defaultSeparator)), e
        }, y.extend = function (e, t) {
            return void 0 === e && void 0 === t ? {} : f(e, t)
        }, y.t = y.translate, y.l = y.localize, y.p = y.pluralize, y
    }),
    function (e, t) {
        "function" == typeof define && define.amd ? define(["i18n"], t) : "object" == typeof module && module.exports ? t(require("i18n")) : t(e.I18n)
    }(this, function (e) {
        "use strict";
        e.translations = {
            de: {
                dictionary: {
                    close: "schliessen",
                    read_more_html: "Weiterlesen&hellip;"
                },
                errors: {
                    messages: {
                        accepted: "muss akzeptiert werden",
                        already_confirmed: "was already confirmed",
                        blank: "muss ausgef\xfcllt werden",
                        confirmation: "stimmt nicht mit %{attribute} \xfcberein",
                        email: "Diese E-Mail scheint nicht g\xfcltig zu sein",
                        empty: "muss ausgef\xfcllt werden",
                        equal_to: "muss genau %{count} sein",
                        even: "muss gerade sein",
                        exclusion: "ist nicht verf\xfcgbar",
                        external_url_format: "Ung\xfcltige URL",
                        file_presence: "Bitte eine Datei ausw\xe4hlen",
                        greater_than: "muss gr\xf6\xdfer als %{count} sein",
                        greater_than_or_equal_to: "muss gr\xf6\xdfer oder gleich %{count} sein",
                        in_between: "must be in between %{min} and %{max}",
                        inclusion: "ist kein g\xfcltiger Wert",
                        invalid: "ist nicht g\xfcltig",
                        less_than: "muss kleiner als %{count} sein",
                        less_than_or_equal_to: "muss kleiner oder gleich %{count} sein",
                        model_invalid: "G\xfcltigkeitspr\xfcfung ist fehlgeschlagen: %{errors}",
                        not_a_number: "ist keine Zahl",
                        not_an_integer: "muss ganzzahlig sein",
                        not_found: "not found",
                        not_locked: "was not locked",
                        odd: "muss ungerade sein",
                        other_than: "darf nicht gleich %{count} sein",
                        presence: "Dieses Feld ist nicht optional",
                        present: "muss leer sein",
                        required: "muss ausgef\xfcllt werden",
                        sale_price: {
                            blank: "Verkaufspreis kann nicht leer sein",
                            too_big: "Der Sales-Preis muss weniger sein als der regul\xe4re Preis."
                        },
                        spoofed_media_type: "has contents that are not what they are reported to be",
                        taken: "ist bereits vergeben",
                        too_long: {
                            one: "ist zu lang (mehr als 1 Zeichen)",
                            other: "ist zu lang (mehr als %{count} Zeichen)"
                        },
                        too_short: {
                            one: "ist zu kurz (weniger als 1 Zeichen)",
                            other: "ist zu kurz (weniger als %{count} Zeichen)"
                        },
                        wrong_length: {
                            one: "hat die falsche L\xe4nge (muss genau 1 Zeichen haben)",
                            other: "hat die falsche L\xe4nge (muss genau %{count} Zeichen haben)"
                        }
                    }
                },
                global: {
                    share_dialog: {
                        by_artist: "von <strong>%{artist}</strong>",
                        share_button_email: "Per Email teilen",
                        share_button_facebook: "Auf Facebook teilen",
                        share_button_twitter: "Auf Twitter teilen",
                        share_embed_hint: "Use this code snippet to embed your %{type} onto another website.",
                        share_embed_label: "Embed code",
                        share_link_label: "Oder, teile diesen Link:",
                        title: "<strong>%{item_name}</strong> teilen"
                    }
                },
                usersite: {
                    cart: {
                        update_quantity_button: "Anzahl aktualisieren"
                    },
                    errors: {
                        generic: "Entschuldigung, es gab ein Problem",
                        not_found: "Nicht gefunden",
                        try_again: "Bitte nochmal probieren",
                        unsupported_object_type: "Nicht unterst\xfctzter Objekttyp %{type}"
                    },
                    products: {
                        status: {
                            in_cart: "Im Warenkorb",
                            not_available: "Nicht verf\xfcgbar",
                            out_of_stock: "Ausverkauft"
                        }
                    }
                }
            },
            en: {
                dictionary: {
                    close: "close",
                    read_more_html: "Read more&hellip;"
                },
                errors: {
                    messages: {
                        accepted: "must be accepted",
                        already_confirmed: "was already confirmed",
                        blank: "can't be blank",
                        confirmation: "doesn't match %{attribute}",
                        email: "This email does not appear to be valid",
                        empty: "can't be empty",
                        equal_to: "must be equal to %{count}",
                        even: "must be even",
                        exclusion: "is reserved",
                        external_url_format: "Invalid url",
                        file_presence: "Please pick a file",
                        greater_than: "must be greater than %{count}",
                        greater_than_or_equal_to: "must be greater than or equal to %{count}",
                        in_between: "must be in between %{min} and %{max}",
                        inclusion: "is not included in the list",
                        invalid: "is invalid",
                        less_than: "must be less than %{count}",
                        less_than_or_equal_to: "must be less than or equal to %{count}",
                        model_invalid: "Validation failed: %{errors}",
                        not_a_number: "is not a number",
                        not_an_integer: "must be an integer",
                        not_found: "not found",
                        not_locked: "was not locked",
                        odd: "must be odd",
                        other_than: "must be other than %{count}",
                        presence: "This field is required",
                        present: "must be blank",
                        required: "must exist",
                        sale_price: {
                            blank: "Sale price cannot be blank",
                            too_big: "Sale price must be less than regular price."
                        },
                        spoofed_media_type: "has contents that are not what they are reported to be",
                        taken: "has already been taken",
                        too_long: {
                            one: "is too long (maximum is 1 character)",
                            other: "is too long (maximum is %{count} characters)"
                        },
                        too_short: {
                            one: "is too short (minimum is 1 character)",
                            other: "is too short (minimum is %{count} characters)"
                        },
                        wrong_length: {
                            one: "is the wrong length (should be 1 character)",
                            other: "is the wrong length (should be %{count} characters)"
                        }
                    }
                },
                global: {
                    share_dialog: {
                        by_artist: "by <strong>%{artist}</strong>",
                        share_button_email: "Share by Email",
                        share_button_facebook: "Share on Facebook",
                        share_button_twitter: "Share on Twitter",
                        share_embed_hint: "Use this code snippet to embed your %{type} onto another website.",
                        share_embed_label: "Embed code",
                        share_link_label: "Or, share this link:",
                        title: "Share <strong>%{item_name}</strong>"
                    }
                },
                usersite: {
                    cart: {
                        update_quantity_button: "Update Qty"
                    },
                    errors: {
                        generic: "Sorry, there was a problem",
                        not_found: "Not found",
                        try_again: "Sorry, please try again",
                        unsupported_object_type: "Unsupported object type %{type}"
                    },
                    products: {
                        status: {
                            in_cart: "In cart",
                            not_available: "Not available",
                            out_of_stock: "Out of stock"
                        }
                    }
                }
            },
            es: {
                dictionary: {
                    close: "Cerrar",
                    read_more_html: "Leer m\xe1s&hellip;"
                },
                errors: {
                    messages: {
                        accepted: "debe ser aceptado",
                        already_confirmed: "was already confirmed",
                        blank: "no puede estar en blanco",
                        confirmation: "no coincide",
                        email: "Direcci\xf3n de correo electr\xf3nico inv\xe1lida",
                        empty: "no puede estar vac\xedo",
                        equal_to: "debe ser igual a %{count}",
                        even: "debe ser par",
                        exclusion: "est\xe1 reservado",
                        external_url_format: "url inv\xe1lida",
                        file_presence: "Selecciona un archivo",
                        greater_than: "debe ser mayor que %{count}",
                        greater_than_or_equal_to: "debe ser mayor que o igual a %{count}",
                        in_between: "must be in between %{min} and %{max}",
                        inclusion: "no est\xe1 incluido en la lista",
                        invalid: "no es v\xe1lido",
                        less_than: "debe ser menor que %{count}",
                        less_than_or_equal_to: "debe ser menor que o igual a %{count}",
                        model_invalid: "La validaci\xf3n fall\xf3: %{errors}",
                        not_a_number: "no es un n\xfamero",
                        not_an_integer: "debe ser un entero",
                        not_found: "not found",
                        not_locked: "was not locked",
                        odd: "debe ser impar",
                        other_than: "debe ser distinto de %{count}",
                        presence: "Campo obligatorio",
                        present: "debe estar en blanco",
                        required: "debe existir",
                        sale_price: {
                            blank: "Debes ingresar un precio",
                            too_big: "El precio de oferta deber\xe1 ser menor que el precio regular."
                        },
                        spoofed_media_type: "has contents that are not what they are reported to be",
                        taken: "ya est\xe1 en uso",
                        too_long: {
                            one: "es demasiado largo (1 car\xe1cter m\xe1ximo)",
                            other: "es demasiado largo (%{count} caracteres m\xe1ximo)"
                        },
                        too_short: {
                            one: "es demasiado corto (1 car\xe1cter m\xednimo)",
                            other: "es demasiado corto (%{count} caracteres m\xednimo)"
                        },
                        wrong_length: {
                            one: "no tiene la longitud correcta (1 car\xe1cter exactos)",
                            other: "no tiene la longitud correcta (%{count} caracteres exactos)"
                        }
                    }
                },
                global: {
                    share_dialog: {
                        by_artist: "de <strong>%{artist}</strong>",
                        share_button_email: "Compartir por E-mail",
                        share_button_facebook: "Compartir en Facebook",
                        share_button_twitter: "Compartir en Twitter",
                        share_embed_hint: "Use this code snippet to embed your %{type} onto another website.",
                        share_embed_label: "Embed code",
                        share_link_label: "O, comparte este enlace:",
                        title: "Compartir <strong>%{item_name}</strong>"
                    }
                },
                usersite: {
                    cart: {
                        update_quantity_button: "Actualizar cantidad"
                    },
                    errors: {
                        generic: "Lo sentimos, hubo un problema.",
                        not_found: "No encontrado",
                        try_again: "Lo sentimos, favor de intentar nuevamente",
                        unsupported_object_type: "Unsupported object type %{type}"
                    },
                    products: {
                        status: {
                            in_cart: "En el carrito de compras",
                            not_available: "No disponible",
                            out_of_stock: "Agotado"
                        }
                    }
                }
            },
            "es-419": {
                dictionary: {
                    close: "Cerrar",
                    read_more_html: "Leer m\xe1s&hellip;"
                },
                errors: {
                    messages: {
                        accepted: "debe ser aceptado",
                        already_confirmed: "was already confirmed",
                        blank: "no puede estar en blanco",
                        confirmation: "no coincide",
                        email: "Direcci\xf3n de correo electr\xf3nico inv\xe1lida",
                        empty: "no puede estar vac\xedo",
                        equal_to: "debe ser igual a %{count}",
                        even: "debe ser un n\xfamero par",
                        exclusion: "est\xe1 reservado",
                        external_url_format: "url inv\xe1lida",
                        file_presence: "Selecciona un archivo",
                        greater_than: "debe ser mayor que %{count}",
                        greater_than_or_equal_to: "debe ser mayor o igual que %{count}",
                        in_between: "must be in between %{min} and %{max}",
                        inclusion: "no est\xe1 incluido en la lista",
                        invalid: "es inv\xe1lido",
                        less_than: "debe ser menor que %{count}",
                        less_than_or_equal_to: "debe ser menor o igual que %{count}",
                        model_invalid: "La validaci\xf3n fall\xf3: %{errors}",
                        not_a_number: "no es un n\xfamero",
                        not_an_integer: "debe ser un entero",
                        not_found: "not found",
                        not_locked: "was not locked",
                        odd: "debe ser un n\xfamero non",
                        other_than: "debe ser diferente de %{count}",
                        presence: "Campo obligatorio",
                        present: "debe estar en blanco",
                        required: "debe existir",
                        sale_price: {
                            blank: "Debes ingresar un precio",
                            too_big: "El precio de oferta deber\xe1 ser menor que el precio regular."
                        },
                        spoofed_media_type: "has contents that are not what they are reported to be",
                        taken: "ya ha sido tomado",
                        too_long: {
                            one: "es demasiado largo (m\xe1ximo 1 caracter)",
                            other: "es demasiado largo (m\xe1ximo %{count} caracteres)"
                        },
                        too_short: {
                            one: "es demasiado corto (m\xednimo 1 caracter)",
                            other: "es demasiado corto (m\xednimo %{count} caracteres)"
                        },
                        wrong_length: {
                            one: "longitud err\xf3nea (debe ser de 1 caracter)",
                            other: "longitud err\xf3nea (debe ser de %{count} caracteres)"
                        }
                    }
                },
                global: {
                    share_dialog: {
                        by_artist: "de <strong>%{artist}</strong>",
                        share_button_email: "Compartir por E-mail",
                        share_button_facebook: "Compartir en Facebook",
                        share_button_twitter: "Compartir en Twitter",
                        share_embed_hint: "Use this code snippet to embed your %{type} onto another website.",
                        share_embed_label: "Embed code",
                        share_link_label: "O, comparte este enlace:",
                        title: "Compartir <strong>%{item_name}</strong>"
                    }
                },
                usersite: {
                    cart: {
                        update_quantity_button: "Actualizar cantidad"
                    },
                    errors: {
                        generic: "Lo sentimos, hubo un problema.",
                        not_found: "No encontrado",
                        try_again: "Lo sentimos, favor de intentar nuevamente",
                        unsupported_object_type: "Unsupported object type %{type}"
                    },
                    products: {
                        status: {
                            in_cart: "En el carrito de compras",
                            not_available: "No disponible",
                            out_of_stock: "Agotado"
                        }
                    }
                }
            },
            fr: {
                dictionary: {
                    close: "fermer",
                    read_more_html: "Lire la suite"
                },
                errors: {
                    messages: {
                        accepted: "doit \xeatre accept\xe9(e)",
                        already_confirmed: "was already confirmed",
                        blank: "doit \xeatre rempli(e)",
                        confirmation: "ne concorde pas avec %{attribute}",
                        email: "Cette adresse courriel n'est pas valide.",
                        empty: "doit \xeatre rempli(e)",
                        equal_to: "doit \xeatre \xe9gal \xe0 %{count}",
                        even: "doit \xeatre pair",
                        exclusion: "n'est pas disponible",
                        external_url_format: "Cette URL n'est pas valide.",
                        file_presence: "Veuillez choisir un fichier.",
                        greater_than: "doit \xeatre sup\xe9rieur \xe0 %{count}",
                        greater_than_or_equal_to: "doit \xeatre sup\xe9rieur ou \xe9gal \xe0 %{count}",
                        in_between: "must be in between %{min} and %{max}",
                        inclusion: "n'est pas inclus(e) dans la liste",
                        invalid: "n'est pas valide",
                        less_than: "doit \xeatre inf\xe9rieur \xe0 %{count}",
                        less_than_or_equal_to: "doit \xeatre inf\xe9rieur ou \xe9gal \xe0 %{count}",
                        model_invalid: "Validation \xe9chou\xe9e : %{errors}",
                        not_a_number: "n'est pas un nombre",
                        not_an_integer: "doit \xeatre un nombre entier",
                        not_found: "not found",
                        not_locked: "was not locked",
                        odd: "doit \xeatre impair",
                        other_than: "doit \xeatre diff\xe9rent de %{count}",
                        presence: "Ce champ est obligatoire.",
                        present: "Ce champ doit rester vide.",
                        required: "doit exister",
                        sale_price: {
                            blank: "Le prix de vente doit \xeatre indiqu\xe9.",
                            too_big: "Le prix de vente doit \xeatre inf\xe9rieur au prix courant."
                        },
                        spoofed_media_type: "has contents that are not what they are reported to be",
                        taken: "n'est pas disponible",
                        too_long: {
                            one: "est trop long (pas plus d'un caract\xe8re)",
                            other: "est trop long (pas plus de %{count} caract\xe8res)"
                        },
                        too_short: {
                            one: "est trop court (au moins un caract\xe8re)",
                            other: "est trop court (au moins %{count} caract\xe8res)"
                        },
                        wrong_length: {
                            one: "ne fait pas la bonne longueur (doit comporter un seul caract\xe8re)",
                            other: "ne fait pas la bonne longueur (doit comporter %{count} caract\xe8res)"
                        }
                    }
                },
                global: {
                    share_dialog: {
                        by_artist: "de <strong>%{artist}</strong>",
                        share_button_email: "Partager par courriel",
                        share_button_facebook: "Partager sur Facebook",
                        share_button_twitter: "Partager sur Twitter",
                        share_embed_hint: "Use this code snippet to embed your %{type} onto another website.",
                        share_embed_label: "Embed code",
                        share_link_label: "Ou, partager ce lien :",
                        title: "Partager <strong>%{item_name}</strong>"
                    }
                },
                usersite: {
                    cart: {
                        update_quantity_button: "Modifier la quantit\xe9"
                    },
                    errors: {
                        generic: "D\xe9sol\xe9, nous rencontrons un probl\xe8me.",
                        not_found: "Non trouv\xe9",
                        try_again: "D\xe9sol\xe9, veuillez r\xe9essayer.",
                        unsupported_object_type: "Object de type %{type} non reconnu"
                    },
                    products: {
                        status: {
                            in_cart: "Ajout\xe9 au panier",
                            not_available: "Indisponible",
                            out_of_stock: "En rupture de stock"
                        }
                    }
                }
            }
        }
    }),
    function () {
        null == window.I18n && (window.I18n = {}), I18n.defaultLocale = "en", I18n.locale = document.documentElement.lang || "en"
    }.call(this),
    function (a) {
        function t(e, t) {
            var n = e.nodeName.toLowerCase();
            if ("area" === n) {
                var i, r = e.parentNode,
                    o = r.name;
                return !(!e.href || !o || "map" !== r.nodeName.toLowerCase()) && (!!(i = a("img[usemap=#" + o + "]")[0]) && s(i))
            }
            return (/input|select|textarea|button|object/.test(n) ? !e.disabled : "a" === n && e.href || t) && s(e)
        }

        function s(e) {
            return !a(e).parents().andSelf().filter(function () {
                return "hidden" === a.curCSS(this, "visibility") || a.expr.filters.hidden(this)
            }).length
        }
        a.extend(a.expr[":"], {
            focusable: function (e) {
                return t(e, !isNaN(a.attr(e, "tabindex")))
            }
        })
    }(jQuery),
    function (n) {
        function i(e, t) {
            var n = typeof e[t];
            return "function" === n || !("object" != n || !e[t]) || "unknown" == n
        }

        function r(e, t) {
            return typeof e[t] != a
        }

        function o(e, t) {
            return !("object" != typeof e[t] || !e[t])
        }

        function s(e) {
            window.console && window.console.log && window.console.log("TextInputs module for Rangy not supported in your browser. Reason: " + e)
        }

        function l(e, t, n) {
            return t < 0 && (t += e.value.length), typeof n == a && (n = t), n < 0 && (n += e.value.length), {
                start: t,
                end: n
            }
        }

        function u(e, t, n) {
            return {
                start: t,
                end: n,
                length: n - t,
                text: e.value.slice(t, n)
            }
        }

        function c() {
            return o(document, "body") ? document.body : document.getElementsByTagName("body")[0]
        }
        var d, h, f, p, m, g, y, v, w, a = "undefined";
        n(document).ready(function () {
            function e(r, o) {
                return function () {
                    var e = this.jquery ? this[0] : this,
                        t = e.nodeName.toLowerCase();
                    if (1 == e.nodeType && ("textarea" == t || "input" == t && "text" == e.type)) {
                        var n = [e].concat(Array.prototype.slice.call(arguments)),
                            i = r.apply(this, n);
                        if (!o) return i
                    }
                    if (o) return this
                }
            }
            var t = document.createElement("textarea");
            if (c().appendChild(t), r(t, "selectionStart") && r(t, "selectionEnd")) d = function (e) {
                return u(e, e.selectionStart, e.selectionEnd)
            }, h = function (e, t, n) {
                var i = l(e, t, n);
                e.selectionStart = i.start, e.selectionEnd = i.end
            }, w = function (e, t) {
                t ? e.selectionEnd = e.selectionStart : e.selectionStart = e.selectionEnd
            };
            else {
                if (!(i(t, "createTextRange") && o(document, "selection") && i(document.selection, "createRange"))) return c().removeChild(t), void s("No means of finding text input caret position");
                d = function (e) {
                    var t, n, i, r, o = 0,
                        a = 0,
                        s = document.selection.createRange();
                    return s && s.parentElement() == e && (i = e.value.length, t = e.value.replace(/\r\n/g, "\n"), (n = e.createTextRange()).moveToBookmark(s.getBookmark()), (r = e.createTextRange()).collapse(!1), -1 < n.compareEndPoints("StartToEnd", r) ? o = a = i : (o = -n.moveStart("character", -i), o += t.slice(0, o).split("\n").length - 1, -1 < n.compareEndPoints("EndToEnd", r) ? a = i : (a = -n.moveEnd("character", -i), a += t.slice(0, a).split("\n").length - 1))), u(e, o, a)
                };
                var a = function (e, t) {
                    return t - (e.value.slice(0, t).split("\r\n").length - 1)
                };
                h = function (e, t, n) {
                    var i = l(e, t, n),
                        r = e.createTextRange(),
                        o = a(e, i.start);
                    r.collapse(!0), i.start == i.end ? r.move("character", o) : (r.moveEnd("character", a(e, i.end)), r.moveStart("character", o)), r.select()
                }, w = function (e, t) {
                    var n = document.selection.createRange();
                    n.collapse(t), n.select()
                }
            }
            c().removeChild(t), p = function (e, t, n, i) {
                var r;
                t != n && (r = e.value, e.value = r.slice(0, t) + r.slice(n)), i && h(e, t, t)
            }, f = function (e) {
                var t = d(e);
                p(e, t.start, t.end, !0)
            }, v = function (e) {
                var t, n = d(e);
                return n.start != n.end && (t = e.value, e.value = t.slice(0, n.start) + t.slice(n.end)), h(e, n.start, n.start), n.text
            }, m = function (e, t, n, i) {
                var r, o = e.value;
                e.value = o.slice(0, n) + t + o.slice(n), i && (r = n + t.length, h(e, r, r))
            }, g = function (e, t) {
                var n = d(e),
                    i = e.value;
                e.value = i.slice(0, n.start) + t + i.slice(n.end);
                var r = n.start + t.length;
                h(e, r, r)
            }, y = function (e, t, n) {
                var i = d(e),
                    r = e.value;
                e.value = r.slice(0, i.start) + t + i.text + n + r.slice(i.end);
                var o = i.start + t.length,
                    a = o + i.length;
                h(e, o, a)
            }, n.fn.extend({
                getSelection: e(d, !1),
                setSelection: e(h, !0),
                collapseSelection: e(w, !0),
                deleteSelectedText: e(f, !0),
                deleteText: e(p, !0),
                extractSelectedText: e(v, !1),
                insertText: e(m, !0),
                replaceSelectedText: e(g, !0),
                surroundSelectedText: e(y, !0)
            })
        })
    }(jQuery),
    function () {
        function e() {}

        function o(e, t) {
            for (var n = e.length; n--;)
                if (e[n].listener === t) return n;
            return -1
        }

        function t(e) {
            return function () {
                return this[e].apply(this, arguments)
            }
        }
        var n = e.prototype,
            i = this,
            r = i.EventEmitter;
        n.getListeners = function (e) {
            var t, n, i = this._getEvents();
            if ("object" == typeof e)
                for (n in t = {}, i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
            else t = i[e] || (i[e] = []);
            return t
        }, n.flattenListeners = function (e) {
            var t, n = [];
            for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
            return n
        }, n.getListenersAsObject = function (e) {
            var t, n = this.getListeners(e);
            return n instanceof Array && ((t = {})[e] = n), t || n
        }, n.addListener = function (e, t) {
            var n, i = this.getListenersAsObject(e),
                r = "object" == typeof t;
            for (n in i) i.hasOwnProperty(n) && -1 === o(i[n], t) && i[n].push(r ? t : {
                listener: t,
                once: !1
            });
            return this
        }, n.on = t("addListener"), n.addOnceListener = function (e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, n.once = t("addOnceListener"), n.defineEvent = function (e) {
            return this.getListeners(e), this
        }, n.defineEvents = function (e) {
            for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
            return this
        }, n.removeListener = function (e, t) {
            var n, i, r = this.getListenersAsObject(e);
            for (i in r) r.hasOwnProperty(i) && (-1 !== (n = o(r[i], t)) && r[i].splice(n, 1));
            return this
        }, n.off = t("removeListener"), n.addListeners = function (e, t) {
            return this.manipulateListeners(!1, e, t)
        }, n.removeListeners = function (e, t) {
            return this.manipulateListeners(!0, e, t)
        }, n.manipulateListeners = function (e, t, n) {
            var i, r, o = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (i = n.length; i--;) o.call(this, t, n[i]);
            else
                for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : a.call(this, i, r));
            return this
        }, n.removeEvent = function (e) {
            var t, n = typeof e,
                i = this._getEvents();
            if ("string" === n) delete i[e];
            else if ("object" === n)
                for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
            else delete this._events;
            return this
        }, n.removeAllListeners = t("removeEvent"), n.emitEvent = function (e, t) {
            var n, i, r, o = this.getListenersAsObject(e);
            for (r in o)
                if (o.hasOwnProperty(r))
                    for (i = o[r].length; i--;) !0 === (n = o[r][i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
            return this
        }, n.trigger = t("emitEvent"), n.emit = function (e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, n.setOnceReturnValue = function (e) {
            return this._onceReturnValue = e, this
        }, n._getOnceReturnValue = function () {
            return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, n._getEvents = function () {
            return this._events || (this._events = {})
        }, e.noConflict = function () {
            return i.EventEmitter = r, e
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
            return e
        }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
    }.call(this),
    function (n) {
        function i(e) {
            var t = n.event;
            return t.target = t.target || t.srcElement || e, t
        }
        var e = document.documentElement,
            r = function () {};
        e.addEventListener ? r = function (e, t, n) {
            e.addEventListener(t, n, !1)
        } : e.attachEvent && (r = function (t, e, n) {
            t[e + n] = n.handleEvent ? function () {
                var e = i(t);
                n.handleEvent.call(n, e)
            } : function () {
                var e = i(t);
                n.call(t, e)
            }, t.attachEvent("on" + e, t[e + n])
        });
        var t = function () {};
        e.removeEventListener ? t = function (e, t, n) {
            e.removeEventListener(t, n, !1)
        } : e.detachEvent && (t = function (e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (r) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: r,
            unbind: t
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : n.eventie = o
    }(this),
    function (n, i) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (e, t) {
            return i(n, e, t)
        }) : "object" == typeof exports ? module.exports = i(n, require("wolfy87-eventemitter"), require("eventie")) : n.imagesLoaded = i(n, n.EventEmitter, n.eventie)
    }(window, function (e, t, n) {
        function r(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function o(e) {
            return "[object Array]" === h.call(e)
        }

        function a(e) {
            var t = [];
            if (o(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; n < i; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function s(e, t, n) {
            if (!(this instanceof s)) return new s(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = a(e), this.options = r({}, this.options), "function" == typeof t ? n = t : r(this.options, t), n && this.on("always", n), this.getImages(), u && (this.jqDeferred = new u.Deferred);
            var i = this;
            setTimeout(function () {
                i.check()
            })
        }

        function i(e) {
            this.img = e
        }

        function l(e) {
            this.src = e, f[e] = this
        }
        var u = e.jQuery,
            c = e.console,
            d = void 0 !== c,
            h = Object.prototype.toString;
        s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
            this.images = [];
            for (var e = 0, t = this.elements.length; e < t; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                var i = n.nodeType;
                if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, a = r.length; o < a; o++) {
                        var s = r[o];
                        this.addImage(s)
                    }
            }
        }, s.prototype.addImage = function (e) {
            var t = new i(e);
            this.images.push(t)
        }, s.prototype.check = function () {
            function e(e, t) {
                return n.options.debug && d && c.log("confirm", e, t), n.progress(e), ++i === r && n.complete(), !0
            }
            var n = this,
                i = 0,
                r = this.images.length;
            if (this.hasAnyBroken = !1, r)
                for (var t = 0; t < r; t++) {
                    var o = this.images[t];
                    o.on("confirm", e), o.check()
                } else this.complete()
        }, s.prototype.progress = function (e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function () {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, s.prototype.complete = function () {
            var t = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var n = this;
            setTimeout(function () {
                if (n.emit(t, n), n.emit("always", n), n.jqDeferred) {
                    var e = n.hasAnyBroken ? "reject" : "resolve";
                    n.jqDeferred[e](n)
                }
            })
        }, u && (u.fn.imagesLoaded = function (e, t) {
            return new s(this, e, t).jqDeferred.promise(u(this))
        }), i.prototype = new t, i.prototype.check = function () {
            var e = f[this.img.src] || new l(this.img.src);
            if (e.isConfirmed) this.confirm(e.isLoaded, "cached was confirmed");
            else if (this.img.complete && void 0 !== this.img.naturalWidth) this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            else {
                var n = this;
                e.on("confirm", function (e, t) {
                    return n.confirm(e.isLoaded, t), !0
                }), e.check()
            }
        }, i.prototype.confirm = function (e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var f = {};
        return l.prototype = new t, l.prototype.check = function () {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, l.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, l.prototype.onload = function (e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, l.prototype.onerror = function (e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, l.prototype.confirm = function (e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, l.prototype.unbindProxyEvents = function (e) {
            n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
        }, s
    }),
    function (e) {
        function t() {}

        function n(u) {
            function n(e) {
                e.prototype.option || (e.prototype.option = function (e) {
                    u.isPlainObject(e) && (this.options = u.extend(!0, this.options, e))
                })
            }

            function i(s, l) {
                u.fn[s] = function (t) {
                    if ("string" == typeof t) {
                        for (var e = d.call(arguments, 1), n = 0, i = this.length; n < i; n++) {
                            var r = this[n],
                                o = u.data(r, s);
                            if (o)
                                if (u.isFunction(o[t]) && "_" !== t.charAt(0)) {
                                    var a = o[t].apply(o, e);
                                    if (void 0 !== a) return a
                                } else c("no such method '" + t + "' for " + s + " instance");
                            else c("cannot call methods on " + s + " prior to initialization; attempted to call '" + t + "'")
                        }
                        return this
                    }
                    return this.each(function () {
                        var e = u.data(this, s);
                        e ? (e.option(t), e._init()) : (e = new l(this, t), u.data(this, s, e))
                    })
                }
            }
            if (u) {
                var c = "undefined" == typeof console ? t : function (e) {
                    console.error(e)
                };
                return u.bridget = function (e, t) {
                    n(t), i(e, t)
                }, u.bridget
            }
        }
        var d = Array.prototype.slice;
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], n) : n(e.jQuery)
    }(window),
    function (n) {
        function i(e) {
            var t = n.event;
            return t.target = t.target || t.srcElement || e, t
        }
        var e = document.documentElement,
            r = function () {};
        e.addEventListener ? r = function (e, t, n) {
            e.addEventListener(t, n, !1)
        } : e.attachEvent && (r = function (t, e, n) {
            t[e + n] = n.handleEvent ? function () {
                var e = i(t);
                n.handleEvent.call(n, e)
            } : function () {
                var e = i(t);
                n.call(t, e)
            }, t.attachEvent("on" + e, t[e + n])
        });
        var t = function () {};
        e.removeEventListener ? t = function (e, t, n) {
            e.removeEventListener(t, n, !1)
        } : e.detachEvent && (t = function (e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (r) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: r,
            unbind: t
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : "object" == typeof exports ? module.exports = o : n.eventie = o
    }(this),
    function (t) {
        function r(e) {
            "function" == typeof e && (r.isReady ? e() : a.push(e))
        }

        function n(e) {
            var t = "readystatechange" === e.type && "complete" !== o.readyState;
            if (!r.isReady && !t) {
                r.isReady = !0;
                for (var n = 0, i = a.length; n < i; n++) {
                    (0, a[n])()
                }
            }
        }

        function e(e) {
            return e.bind(o, "DOMContentLoaded", n), e.bind(o, "readystatechange", n), e.bind(t, "load", n), r
        }
        var o = t.document,
            a = [];
        r.isReady = !1, "function" == typeof define && define.amd ? (r.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], e)) : t.docReady = e(t.eventie)
    }(this),
    function () {
        function e() {}

        function o(e, t) {
            for (var n = e.length; n--;)
                if (e[n].listener === t) return n;
            return -1
        }

        function t(e) {
            return function () {
                return this[e].apply(this, arguments)
            }
        }
        var n = e.prototype,
            i = this,
            r = i.EventEmitter;
        n.getListeners = function (e) {
            var t, n, i = this._getEvents();
            if (e instanceof RegExp)
                for (n in t = {}, i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
            else t = i[e] || (i[e] = []);
            return t
        }, n.flattenListeners = function (e) {
            var t, n = [];
            for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
            return n
        }, n.getListenersAsObject = function (e) {
            var t, n = this.getListeners(e);
            return n instanceof Array && ((t = {})[e] = n), t || n
        }, n.addListener = function (e, t) {
            var n, i = this.getListenersAsObject(e),
                r = "object" == typeof t;
            for (n in i) i.hasOwnProperty(n) && -1 === o(i[n], t) && i[n].push(r ? t : {
                listener: t,
                once: !1
            });
            return this
        }, n.on = t("addListener"), n.addOnceListener = function (e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, n.once = t("addOnceListener"), n.defineEvent = function (e) {
            return this.getListeners(e), this
        }, n.defineEvents = function (e) {
            for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
            return this
        }, n.removeListener = function (e, t) {
            var n, i, r = this.getListenersAsObject(e);
            for (i in r) r.hasOwnProperty(i) && (-1 !== (n = o(r[i], t)) && r[i].splice(n, 1));
            return this
        }, n.off = t("removeListener"), n.addListeners = function (e, t) {
            return this.manipulateListeners(!1, e, t)
        }, n.removeListeners = function (e, t) {
            return this.manipulateListeners(!0, e, t)
        }, n.manipulateListeners = function (e, t, n) {
            var i, r, o = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (i = n.length; i--;) o.call(this, t, n[i]);
            else
                for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : a.call(this, i, r));
            return this
        }, n.removeEvent = function (e) {
            var t, n = typeof e,
                i = this._getEvents();
            if ("string" === n) delete i[e];
            else if (e instanceof RegExp)
                for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
            else delete this._events;
            return this
        }, n.removeAllListeners = t("removeEvent"), n.emitEvent = function (e, t) {
            var n, i, r, o = this.getListenersAsObject(e);
            for (r in o)
                if (o.hasOwnProperty(r))
                    for (i = o[r].length; i--;) !0 === (n = o[r][i]).once && this.removeListener(e, n.listener), n.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, n.listener);
            return this
        }, n.trigger = t("emitEvent"), n.emit = function (e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, n.setOnceReturnValue = function (e) {
            return this._onceReturnValue = e, this
        }, n._getOnceReturnValue = function () {
            return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, n._getEvents = function () {
            return this._events || (this._events = {})
        }, e.noConflict = function () {
            return i.EventEmitter = r, e
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
            return e
        }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
    }.call(this),
    function (e) {
        function t(e) {
            if (e) {
                if ("string" == typeof o[e]) return e;
                e = e.charAt(0).toUpperCase() + e.slice(1);
                for (var t, n = 0, i = r.length; n < i; n++)
                    if (t = r[n] + e, "string" == typeof o[t]) return t
            }
        }
        var r = "Webkit Moz ms Ms O".split(" "),
            o = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
            return t
        }) : "object" == typeof exports ? module.exports = t : e.getStyleProperty = t
    }(window),
    function (e) {
        function _(e) {
            var t = parseFloat(e);
            return -1 === e.indexOf("%") && !isNaN(t) && t
        }

        function x() {
            for (var e = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, t = 0, n = k.length; t < n; t++) {
                e[k[t]] = 0
            }
            return e
        }

        function t(e) {
            function t(e) {
                if ("string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                    var t = S(e);
                    if ("none" === t.display) return x();
                    var n = {};
                    n.width = e.offsetWidth, n.height = e.offsetHeight;
                    for (var i = n.isBorderBox = !(!b || !t[b] || "border-box" !== t[b]), r = 0, o = k.length; r < o; r++) {
                        var a = k[r],
                            s = t[a];
                        s = v(e, s);
                        var l = parseFloat(s);
                        n[a] = isNaN(l) ? 0 : l
                    }
                    var u = n.paddingLeft + n.paddingRight,
                        c = n.paddingTop + n.paddingBottom,
                        d = n.marginLeft + n.marginRight,
                        h = n.marginTop + n.marginBottom,
                        f = n.borderLeftWidth + n.borderRightWidth,
                        p = n.borderTopWidth + n.borderBottomWidth,
                        m = i && w,
                        g = _(t.width);
                    !1 !== g && (n.width = g + (m ? 0 : u + f));
                    var y = _(t.height);
                    return !1 !== y && (n.height = y + (m ? 0 : c + p)), n.innerWidth = n.width - (u + f), n.innerHeight = n.height - (c + p), n.outerWidth = n.width + d, n.outerHeight = n.height + h, n
                }
            }

            function v(e, t) {
                if (a || -1 === t.indexOf("%")) return t;
                var n = e.style,
                    i = n.left,
                    r = e.runtimeStyle,
                    o = r && r.left;
                return o && (r.left = e.currentStyle.left), n.left = t, t = n.pixelLeft, n.left = i, o && (r.left = o), t
            }
            var w, b = e("boxSizing");
            return function () {
                if (b) {
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[b] = "border-box";
                    var t = document.body || document.documentElement;
                    t.appendChild(e);
                    var n = S(e);
                    w = 200 === _(n.width), t.removeChild(e)
                }
            }(), t
        }
        var a = e.getComputedStyle,
            S = a ? function (e) {
                return a(e, null)
            } : function (e) {
                return e.currentStyle
            },
            k = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], t) : "object" == typeof exports ? module.exports = t(require("get-style-property")) : e.getSize = t(e.getStyleProperty)
    }(window),
    function (e, r) {
        function n(e, t) {
            return e[s](t)
        }

        function o(e) {
            e.parentNode || document.createDocumentFragment().appendChild(e)
        }

        function t(e, t) {
            o(e);
            for (var n = e.parentNode.querySelectorAll(t), i = 0, r = n.length; i < r; i++)
                if (n[i] === e) return !0;
            return !1
        }

        function i(e, t) {
            return o(e), n(e, t)
        }
        var a, s = function () {
            if (r.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], t = 0, n = e.length; t < n; t++) {
                var i = e[t] + "MatchesSelector";
                if (r[i]) return i
            }
        }();
        if (s) {
            var l = n(document.createElement("div"), "div");
            a = l ? n : i
        } else a = t;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
            return a
        }) : window.matchesSelector = a
    }(0, Element.prototype),
    function (e) {
        function m(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function g(e) {
            for (var t in e) return !1;
            return !null
        }

        function y(e) {
            return e.replace(/([A-Z])/g, function (e) {
                return "-" + e.toLowerCase()
            })
        }

        function t(e, t, o) {
            function n(e, t) {
                e && (this.element = e, this.layout = t, this.position = {
                    x: 0,
                    y: 0
                }, this._create())
            }
            var i = o("transition"),
                r = o("transform"),
                a = i && r,
                s = !!o("perspective"),
                l = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                } [i],
                u = ["transform", "transition", "transitionDuration", "transitionProperty"],
                c = function () {
                    for (var e = {}, t = 0, n = u.length; t < n; t++) {
                        var i = u[t],
                            r = o(i);
                        r && r !== i && (e[i] = r)
                    }
                    return e
                }();
            m(n.prototype, e.prototype), n.prototype._create = function () {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                })
            }, n.prototype.handleEvent = function (e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, n.prototype.getSize = function () {
                this.size = t(this.element)
            }, n.prototype.css = function (e) {
                var t = this.element.style;
                for (var n in e) {
                    t[c[n] || n] = e[n]
                }
            }, n.prototype.getPosition = function () {
                var e = v(this.element),
                    t = this.layout.options,
                    n = t.isOriginLeft,
                    i = t.isOriginTop,
                    r = parseInt(e[n ? "left" : "right"], 10),
                    o = parseInt(e[i ? "top" : "bottom"], 10);
                r = isNaN(r) ? 0 : r, o = isNaN(o) ? 0 : o;
                var a = this.layout.size;
                r -= n ? a.paddingLeft : a.paddingRight, o -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = o
            }, n.prototype.layoutPosition = function () {
                var e = this.layout.size,
                    t = this.layout.options,
                    n = {};
                t.isOriginLeft ? (n.left = this.position.x + e.paddingLeft + "px", n.right = "") : (n.right = this.position.x + e.paddingRight + "px", n.left = ""), t.isOriginTop ? (n.top = this.position.y + e.paddingTop + "px", n.bottom = "") : (n.bottom = this.position.y + e.paddingBottom + "px", n.top = ""), this.css(n), this.emitEvent("layout", [this])
            };
            var d = s ? function (e, t) {
                return "translate3d(" + e + "px, " + t + "px, 0)"
            } : function (e, t) {
                return "translate(" + e + "px, " + t + "px)"
            };
            n.prototype._transitionTo = function (e, t) {
                this.getPosition();
                var n = this.position.x,
                    i = this.position.y,
                    r = parseInt(e, 10),
                    o = parseInt(t, 10),
                    a = r === this.position.x && o === this.position.y;
                if (this.setPosition(e, t), !a || this.isTransitioning) {
                    var s = e - n,
                        l = t - i,
                        u = {},
                        c = this.layout.options;
                    s = c.isOriginLeft ? s : -s, l = c.isOriginTop ? l : -l, u.transform = d(s, l), this.transition({
                        to: u,
                        onTransitionEnd: {
                            transform: this.layoutPosition
                        },
                        isCleaning: !0
                    })
                } else this.layoutPosition()
            }, n.prototype.goTo = function (e, t) {
                this.setPosition(e, t), this.layoutPosition()
            }, n.prototype.moveTo = a ? n.prototype._transitionTo : n.prototype.goTo, n.prototype.setPosition = function (e, t) {
                this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
            }, n.prototype._nonTransition = function (e) {
                for (var t in this.css(e.to), e.isCleaning && this._removeStyles(e.to), e.onTransitionEnd) e.onTransitionEnd[t].call(this)
            }, n.prototype._transition = function (e) {
                if (parseFloat(this.layout.options.transitionDuration)) {
                    var t = this._transn;
                    for (var n in e.onTransitionEnd) t.onEnd[n] = e.onTransitionEnd[n];
                    for (n in e.to) t.ingProperties[n] = !0, e.isCleaning && (t.clean[n] = !0);
                    if (e.from) {
                        this.css(e.from);
                        this.element.offsetHeight;
                        null
                    }
                    this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
                } else this._nonTransition(e)
            };
            var h = r && y(r) + ",opacity";
            n.prototype.enableTransition = function () {
                this.isTransitioning || (this.css({
                    transitionProperty: h,
                    transitionDuration: this.layout.options.transitionDuration
                }), this.element.addEventListener(l, this, !1))
            }, n.prototype.transition = n.prototype[i ? "_transition" : "_nonTransition"], n.prototype.onwebkitTransitionEnd = function (e) {
                this.ontransitionend(e)
            }, n.prototype.onotransitionend = function (e) {
                this.ontransitionend(e)
            };
            var f = {
                "-webkit-transform": "transform",
                "-moz-transform": "transform",
                "-o-transform": "transform"
            };
            n.prototype.ontransitionend = function (e) {
                if (e.target === this.element) {
                    var t = this._transn,
                        n = f[e.propertyName] || e.propertyName;
                    if (delete t.ingProperties[n], g(t.ingProperties) && this.disableTransition(), n in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[n]), n in t.onEnd) t.onEnd[n].call(this), delete t.onEnd[n];
                    this.emitEvent("transitionEnd", [this])
                }
            }, n.prototype.disableTransition = function () {
                this.removeTransitionStyles(), this.element.removeEventListener(l, this, !1), this.isTransitioning = !1
            }, n.prototype._removeStyles = function (e) {
                var t = {};
                for (var n in e) t[n] = "";
                this.css(t)
            };
            var p = {
                transitionProperty: "",
                transitionDuration: ""
            };
            return n.prototype.removeTransitionStyles = function () {
                this.css(p)
            }, n.prototype.removeElem = function () {
                this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
            }, n.prototype.remove = function () {
                if (i && parseFloat(this.layout.options.transitionDuration)) {
                    var e = this;
                    this.on("transitionEnd", function () {
                        return e.removeElem(), !0
                    }), this.hide()
                } else this.removeElem()
            }, n.prototype.reveal = function () {
                delete this.isHidden, this.css({
                    display: ""
                });
                var e = this.layout.options;
                this.transition({
                    from: e.hiddenStyle,
                    to: e.visibleStyle,
                    isCleaning: !0
                })
            }, n.prototype.hide = function () {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var e = this.layout.options;
                this.transition({
                    from: e.visibleStyle,
                    to: e.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: {
                        opacity: function () {
                            this.isHidden && this.css({
                                display: "none"
                            })
                        }
                    }
                })
            }, n.prototype.destroy = function () {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }, n
        }
        var n = e.getComputedStyle,
            v = n ? function (e) {
                return n(e, null)
            } : function (e) {
                return e.currentStyle
            };
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], t) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EventEmitter, e.getSize, e.getStyleProperty))
    }(window),
    function (l) {
        function h(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function r(e) {
            return "[object Array]" === t.call(e)
        }

        function u(e) {
            var t = [];
            if (r(e)) t = e;
            else if (e && "number" == typeof e.length)
                for (var n = 0, i = e.length; n < i; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function c(e, t) {
            var n = i(t, e); - 1 !== n && t.splice(n, 1)
        }

        function f(e) {
            return e.replace(/(.)([A-Z])/g, function (e, t, n) {
                return t + "-" + n
            }).toLowerCase()
        }

        function e(e, t, n, r, d, i) {
            function o(e, t) {
                if ("string" == typeof e && (e = p.querySelector(e)), e && v(e)) {
                    this.element = e, this.options = h({}, this.constructor.defaults), this.option(t);
                    var n = ++a;
                    this.element.outlayerGUID = n, (s[n] = this)._create(), this.options.isInitLayout && this.layout()
                } else m && m.error("Bad " + this.constructor.namespace + " element: " + e)
            }
            var a = 0,
                s = {};
            return o.namespace = "outlayer", o.Item = i, o.defaults = {
                containerStyle: {
                    position: "relative"
                },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                isResizingContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }, h(o.prototype, n.prototype), o.prototype.option = function (e) {
                h(this.options, e)
            }, o.prototype._create = function () {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), h(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
            }, o.prototype.reloadItems = function () {
                this.items = this._itemize(this.element.children)
            }, o.prototype._itemize = function (e) {
                for (var t = this._filterFindItemElements(e), n = this.constructor.Item, i = [], r = 0, o = t.length; r < o; r++) {
                    var a = new n(t[r], this);
                    i.push(a)
                }
                return i
            }, o.prototype._filterFindItemElements = function (e) {
                e = u(e);
                for (var t = this.options.itemSelector, n = [], i = 0, r = e.length; i < r; i++) {
                    var o = e[i];
                    if (v(o))
                        if (t) {
                            d(o, t) && n.push(o);
                            for (var a = o.querySelectorAll(t), s = 0, l = a.length; s < l; s++) n.push(a[s])
                        } else n.push(o)
                }
                return n
            }, o.prototype.getItemElements = function () {
                for (var e = [], t = 0, n = this.items.length; t < n; t++) e.push(this.items[t].element);
                return e
            }, o.prototype.layout = function () {
                this._resetLayout(), this._manageStamps();
                var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, e), this._isLayoutInited = !0
            }, o.prototype._init = o.prototype.layout, o.prototype._resetLayout = function () {
                this.getSize()
            }, o.prototype.getSize = function () {
                this.size = r(this.element)
            }, o.prototype._getMeasurement = function (e, t) {
                var n, i = this.options[e];
                i ? ("string" == typeof i ? n = this.element.querySelector(i) : v(i) && (n = i), this[e] = n ? r(n)[t] : i) : this[e] = 0
            }, o.prototype.layoutItems = function (e, t) {
                e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
            }, o.prototype._getItemsForLayout = function (e) {
                for (var t = [], n = 0, i = e.length; n < i; n++) {
                    var r = e[n];
                    r.isIgnored || t.push(r)
                }
                return t
            }, o.prototype._layoutItems = function (e, t) {
                function n() {
                    i.emitEvent("layoutComplete", [i, e])
                }
                var i = this;
                if (e && e.length) {
                    this._itemsOn(e, "layout", n);
                    for (var r = [], o = 0, a = e.length; o < a; o++) {
                        var s = e[o],
                            l = this._getItemLayoutPosition(s);
                        l.item = s, l.isInstant = t || s.isLayoutInstant, r.push(l)
                    }
                    this._processLayoutQueue(r)
                } else n()
            }, o.prototype._getItemLayoutPosition = function () {
                return {
                    x: 0,
                    y: 0
                }
            }, o.prototype._processLayoutQueue = function (e) {
                for (var t = 0, n = e.length; t < n; t++) {
                    var i = e[t];
                    this._positionItem(i.item, i.x, i.y, i.isInstant)
                }
            }, o.prototype._positionItem = function (e, t, n, i) {
                i ? e.goTo(t, n) : e.moveTo(t, n)
            }, o.prototype._postLayout = function () {
                this.resizeContainer()
            }, o.prototype.resizeContainer = function () {
                if (this.options.isResizingContainer) {
                    var e = this._getContainerSize();
                    e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
                }
            }, o.prototype._getContainerSize = y, o.prototype._setContainerMeasure = function (e, t) {
                if (void 0 !== e) {
                    var n = this.size;
                    n.isBorderBox && (e += t ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
                }
            }, o.prototype._itemsOn = function (e, t, n) {
                function i() {
                    return ++r === o && n.call(a), !0
                }
                for (var r = 0, o = e.length, a = this, s = 0, l = e.length; s < l; s++) {
                    e[s].on(t, i)
                }
            }, o.prototype.ignore = function (e) {
                var t = this.getItem(e);
                t && (t.isIgnored = !0)
            }, o.prototype.unignore = function (e) {
                var t = this.getItem(e);
                t && delete t.isIgnored
            }, o.prototype.stamp = function (e) {
                if (e = this._find(e)) {
                    this.stamps = this.stamps.concat(e);
                    for (var t = 0, n = e.length; t < n; t++) {
                        var i = e[t];
                        this.ignore(i)
                    }
                }
            }, o.prototype.unstamp = function (e) {
                if (e = this._find(e))
                    for (var t = 0, n = e.length; t < n; t++) {
                        var i = e[t];
                        c(i, this.stamps), this.unignore(i)
                    }
            }, o.prototype._find = function (e) {
                return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = u(e)) : void 0
            }, o.prototype._manageStamps = function () {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var e = 0, t = this.stamps.length; e < t; e++) {
                        var n = this.stamps[e];
                        this._manageStamp(n)
                    }
                }
            }, o.prototype._getBoundingRect = function () {
                var e = this.element.getBoundingClientRect(),
                    t = this.size;
                this._boundingRect = {
                    left: e.left + t.paddingLeft + t.borderLeftWidth,
                    top: e.top + t.paddingTop + t.borderTopWidth,
                    right: e.right - (t.paddingRight + t.borderRightWidth),
                    bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
                }
            }, o.prototype._manageStamp = y, o.prototype._getElementOffset = function (e) {
                var t = e.getBoundingClientRect(),
                    n = this._boundingRect,
                    i = r(e);
                return {
                    left: t.left - n.left - i.marginLeft,
                    top: t.top - n.top - i.marginTop,
                    right: n.right - t.right - i.marginRight,
                    bottom: n.bottom - t.bottom - i.marginBottom
                }
            }, o.prototype.handleEvent = function (e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, o.prototype.bindResize = function () {
                this.isResizeBound || (e.bind(l, "resize", this), this.isResizeBound = !0)
            }, o.prototype.unbindResize = function () {
                this.isResizeBound && e.unbind(l, "resize", this), this.isResizeBound = !1
            }, o.prototype.onresize = function () {
                function e() {
                    t.resize(), delete t.resizeTimeout
                }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var t = this;
                this.resizeTimeout = setTimeout(e, 100)
            }, o.prototype.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }, o.prototype.needsResizeLayout = function () {
                var e = r(this.element);
                return this.size && e && e.innerWidth !== this.size.innerWidth
            }, o.prototype.addItems = function (e) {
                var t = this._itemize(e);
                return t.length && (this.items = this.items.concat(t)), t
            }, o.prototype.appended = function (e) {
                var t = this.addItems(e);
                t.length && (this.layoutItems(t, !0), this.reveal(t))
            }, o.prototype.prepended = function (e) {
                var t = this._itemize(e);
                if (t.length) {
                    var n = this.items.slice(0);
                    this.items = t.concat(n), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(n)
                }
            }, o.prototype.reveal = function (e) {
                var t = e && e.length;
                if (t)
                    for (var n = 0; n < t; n++) {
                        e[n].reveal()
                    }
            }, o.prototype.hide = function (e) {
                var t = e && e.length;
                if (t)
                    for (var n = 0; n < t; n++) {
                        e[n].hide()
                    }
            }, o.prototype.getItem = function (e) {
                for (var t = 0, n = this.items.length; t < n; t++) {
                    var i = this.items[t];
                    if (i.element === e) return i
                }
            }, o.prototype.getItems = function (e) {
                if (e && e.length) {
                    for (var t = [], n = 0, i = e.length; n < i; n++) {
                        var r = e[n],
                            o = this.getItem(r);
                        o && t.push(o)
                    }
                    return t
                }
            }, o.prototype.remove = function (e) {
                e = u(e);
                var t = this.getItems(e);
                if (t && t.length) {
                    this._itemsOn(t, "remove", function () {
                        this.emitEvent("removeComplete", [this, t])
                    });
                    for (var n = 0, i = t.length; n < i; n++) {
                        var r = t[n];
                        r.remove(), c(r, this.items)
                    }
                }
            }, o.prototype.destroy = function () {
                var e = this.element.style;
                e.height = "", e.position = "", e.width = "";
                for (var t = 0, n = this.items.length; t < n; t++) {
                    this.items[t].destroy()
                }
                this.unbindResize(), delete this.element.outlayerGUID, g && g.removeData(this.element, this.constructor.namespace)
            }, o.data = function (e) {
                var t = e && e.outlayerGUID;
                return t && s[t]
            }, o.create = function (u, e) {
                function c() {
                    o.apply(this, arguments)
                }
                return Object.create ? c.prototype = Object.create(o.prototype) : h(c.prototype, o.prototype), (c.prototype.constructor = c).defaults = h({}, o.defaults), h(c.defaults, e), c.prototype.settings = {}, c.namespace = u, c.data = o.data, c.Item = function () {
                    i.apply(this, arguments)
                }, c.Item.prototype = new i, t(function () {
                    for (var e = f(u), t = p.querySelectorAll(".js-" + e), n = "data-" + e + "-options", i = 0, r = t.length; i < r; i++) {
                        var o, a = t[i],
                            s = a.getAttribute(n);
                        try {
                            o = s && JSON.parse(s)
                        } catch (d) {
                            m && m.error("Error parsing " + n + " on " + a.nodeName.toLowerCase() + (a.id ? "#" + a.id : "") + ": " + d);
                            continue
                        }
                        var l = new c(a, o);
                        g && g.data(a, u, l)
                    }
                }), g && g.bridget && g.bridget(u, c), c
            }, o.Item = i, o
        }
        var p = l.document,
            m = l.console,
            g = l.jQuery,
            y = function () {},
            t = Object.prototype.toString,
            v = "object" == typeof HTMLElement ? function (e) {
                return e instanceof HTMLElement
            } : function (e) {
                return e && "object" == typeof e && 1 === e.nodeType && "string" == typeof e.nodeName
            },
            i = Array.prototype.indexOf ? function (e, t) {
                return e.indexOf(t)
            } : function (e, t) {
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n] === t) return n;
                return -1
            };
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], e) : l.Outlayer = e(l.eventie, l.docReady, l.EventEmitter, l.getSize, l.matchesSelector, l.Outlayer.Item)
    }(window),
    function (e) {
        function t(e) {
            function t() {
                e.Item.apply(this, arguments)
            }
            return t.prototype = new e.Item, t.prototype._create = function () {
                this.id = this.layout.itemGUID++, e.Item.prototype._create.call(this), this.sortData = {}
            }, t.prototype.updateSortData = function () {
                if (!this.isIgnored) {
                    this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                    var e = this.layout.options.getSortData,
                        t = this.layout._sorters;
                    for (var n in e) {
                        var i = t[n];
                        this.sortData[n] = i(this.element, this)
                    }
                }
            }, t
        }
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], t) : (e.Isotope = e.Isotope || {}, e.Isotope.Item = t(e.Outlayer))
    }(window),
    function (e) {
        function t(t, o) {
            function a(e) {
                (this.isotope = e) && (this.options = e.options[this.namespace], this.element = e.element, this.items = e.filteredItems, this.size = e.size)
            }
            return function () {
                function e(e) {
                    return function () {
                        return o.prototype[e].apply(this.isotope, arguments)
                    }
                }
                for (var t = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], n = 0, i = t.length; n < i; n++) {
                    var r = t[n];
                    a.prototype[r] = e(r)
                }
            }(), a.prototype.needsVerticalResizeLayout = function () {
                var e = t(this.isotope.element);
                return this.isotope.size && e && e.innerHeight !== this.isotope.size.innerHeight
            }, a.prototype._getMeasurement = function () {
                this.isotope._getMeasurement.apply(this, arguments)
            }, a.prototype.getColumnWidth = function () {
                this.getSegmentSize("column", "Width")
            }, a.prototype.getRowHeight = function () {
                this.getSegmentSize("row", "Height")
            }, a.prototype.getSegmentSize = function (e, t) {
                var n = e + t,
                    i = "outer" + t;
                if (this._getMeasurement(n, i), !this[n]) {
                    var r = this.getFirstItemSize();
                    this[n] = r && r[i] || this.isotope.size["inner" + t]
                }
            }, a.prototype.getFirstItemSize = function () {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element)
            }, a.prototype.layout = function () {
                this.isotope.layout.apply(this.isotope, arguments)
            }, a.prototype.getSize = function () {
                this.isotope.getSize(), this.size = this.isotope.size
            }, a.modes = {}, a.create = function (e, t) {
                function n() {
                    a.apply(this, arguments)
                }
                return n.prototype = new a, t && (n.options = t), n.prototype.namespace = e, a.modes[e] = n
            }, a
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : (e.Isotope = e.Isotope || {}, e.Isotope.LayoutMode = t(e.getSize, e.Outlayer))
    }(window),
    function (e) {
        function t(e, u) {
            var t = e.create("masonry");
            return t.prototype._resetLayout = function () {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                var e = this.cols;
                for (this.colYs = []; e--;) this.colYs.push(0);
                this.maxY = 0
            }, t.prototype.measureColumns = function () {
                if (this.getContainerWidth(), !this.columnWidth) {
                    var e = this.items[0],
                        t = e && e.element;
                    this.columnWidth = t && u(t).outerWidth || this.containerWidth
                }
                this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, t.prototype.getContainerWidth = function () {
                var e = this.options.isFitWidth ? this.element.parentNode : this.element,
                    t = u(e);
                this.containerWidth = t && t.innerWidth
            }, t.prototype._getItemLayoutPosition = function (e) {
                e.getSize();
                var t = e.size.outerWidth % this.columnWidth,
                    n = Math[t && t < 1 ? "round" : "ceil"](e.size.outerWidth / this.columnWidth);
                n = Math.min(n, this.cols);
                for (var i = this._getColGroup(n), r = Math.min.apply(Math, i), o = c(i, r), a = {
                        x: this.columnWidth * o,
                        y: r
                    }, s = r + e.size.outerHeight, l = this.cols + 1 - i.length, u = 0; u < l; u++) this.colYs[o + u] = s;
                return a
            }, t.prototype._getColGroup = function (e) {
                if (e < 2) return this.colYs;
                for (var t = [], n = this.cols + 1 - e, i = 0; i < n; i++) {
                    var r = this.colYs.slice(i, i + e);
                    t[i] = Math.max.apply(Math, r)
                }
                return t
            }, t.prototype._manageStamp = function (e) {
                var t = u(e),
                    n = this._getElementOffset(e),
                    i = this.options.isOriginLeft ? n.left : n.right,
                    r = i + t.outerWidth,
                    o = Math.floor(i / this.columnWidth);
                o = Math.max(0, o);
                var a = Math.floor(r / this.columnWidth);
                a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
                for (var s = (this.options.isOriginTop ? n.top : n.bottom) + t.outerHeight, l = o; l <= a; l++) this.colYs[l] = Math.max(s, this.colYs[l])
            }, t.prototype._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var e = {
                    height: this.maxY
                };
                return this.options.isFitWidth && (e.width = this._getContainerFitWidth()), e
            }, t.prototype._getContainerFitWidth = function () {
                for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
                return (this.cols - e) * this.columnWidth - this.gutter
            }, t.prototype.needsResizeLayout = function () {
                var e = this.containerWidth;
                return this.getContainerWidth(), e !== this.containerWidth
            }, t
        }
        var c = Array.prototype.indexOf ? function (e, t) {
            return e.indexOf(t)
        } : function (e, t) {
            for (var n = 0, i = e.length; n < i; n++) {
                if (e[n] === t) return n
            }
            return -1
        };
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], t) : e.Masonry = t(e.Outlayer, e.getSize)
    }(window),
    function (e) {
        function l(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function t(e, t) {
            var n = e.create("masonry"),
                i = n.prototype._getElementOffset,
                r = n.prototype.layout,
                o = n.prototype._getMeasurement;
            l(n.prototype, t.prototype), n.prototype._getElementOffset = i, n.prototype.layout = r, n.prototype._getMeasurement = o;
            var a = n.prototype.measureColumns;
            n.prototype.measureColumns = function () {
                this.items = this.isotope.filteredItems, a.call(this)
            };
            var s = n.prototype._manageStamp;
            return n.prototype._manageStamp = function () {
                this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, s.apply(this, arguments)
            }, n
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], t) : t(e.Isotope.LayoutMode, e.Masonry)
    }(window),
    function (e) {
        function t(e) {
            var t = e.create("fitRows");
            return t.prototype._resetLayout = function () {
                this.x = 0, this.y = 0, this.maxY = 0
            }, t.prototype._getItemLayoutPosition = function (e) {
                e.getSize(), 0 !== this.x && e.size.outerWidth + this.x > this.isotope.size.innerWidth && (this.x = 0, this.y = this.maxY);
                var t = {
                    x: this.x,
                    y: this.y
                };
                return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight), this.x += e.size.outerWidth, t
            }, t.prototype._getContainerSize = function () {
                return {
                    height: this.maxY
                }
            }, t
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], t) : t(e.Isotope.LayoutMode)
    }(window),
    function (e) {
        function t(e) {
            var t = e.create("vertical", {
                horizontalAlignment: 0
            });
            return t.prototype._resetLayout = function () {
                this.y = 0
            }, t.prototype._getItemLayoutPosition = function (e) {
                e.getSize();
                var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment,
                    n = this.y;
                return this.y += e.size.outerHeight, {
                    x: t,
                    y: n
                }
            }, t.prototype._getContainerSize = function () {
                return {
                    height: this.y
                }
            }, t
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], t) : t(e.Isotope.LayoutMode)
    }(window),
    function (e) {
        function u(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function r(e) {
            return "[object Array]" === n.call(e)
        }

        function c(e) {
            var t = [];
            if (r(e)) t = e;
            else if (e && "number" == typeof e.length)
                for (var n = 0, i = e.length; n < i; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function d(e, t) {
            var n = i(t, e); - 1 !== n && t.splice(n, 1)
        }

        function t(i, e, n, t, r) {
            function o(s, l) {
                return function (e, t) {
                    for (var n = 0, i = s.length; n < i; n++) {
                        var r = s[n],
                            o = e.sortData[r],
                            a = t.sortData[r];
                        if (a < o || o < a) return (a < o ? 1 : -1) * ((void 0 !== l[r] ? l[r] : l) ? 1 : -1)
                    }
                    return 0
                }
            }
            var s = i.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
            s.Item = t, s.LayoutMode = r, s.prototype._create = function () {
                for (var e in this.itemGUID = 0, this._sorters = {}, this._getSorters(), i.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"], r.modes) this._initLayoutMode(e)
            }, s.prototype.reloadItems = function () {
                this.itemGUID = 0, i.prototype.reloadItems.call(this)
            }, s.prototype._itemize = function () {
                for (var e = i.prototype._itemize.apply(this, arguments), t = 0, n = e.length; t < n; t++) {
                    e[t].id = this.itemGUID++
                }
                return this._updateItemsSortData(e), e
            }, s.prototype._initLayoutMode = function (e) {
                var t = r.modes[e],
                    n = this.options[e] || {};
                this.options[e] = t.options ? u(t.options, n) : n, this.modes[e] = new t(this)
            }, s.prototype.layout = function () {
                return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
            }, s.prototype._layout = function () {
                var e = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), this._isLayoutInited = !0
            }, s.prototype.arrange = function (e) {
                this.option(e), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
            }, s.prototype._init = s.prototype.arrange, s.prototype._getIsInstant = function () {
                var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                return this._isInstant = e
            }, s.prototype._filter = function (e) {
                function t() {
                    d.reveal(r), d.hide(o)
                }
                var n = this.options.filter;
                n = n || "*";
                for (var i = [], r = [], o = [], a = this._getFilterTest(n), s = 0, l = e.length; s < l; s++) {
                    var u = e[s];
                    if (!u.isIgnored) {
                        var c = a(u);
                        c && i.push(u), c && u.isHidden ? r.push(u) : c || u.isHidden || o.push(u)
                    }
                }
                var d = this;
                return this._isInstant ? this._noTransition(t) : t(), i
            }, s.prototype._getFilterTest = function (t) {
                return h && this.options.isJQueryFiltering ? function (e) {
                    return h(e.element).is(t)
                } : "function" == typeof t ? function (e) {
                    return t(e.element)
                } : function (e) {
                    return n(e.element, t)
                }
            }, s.prototype.updateSortData = function (e) {
                this._getSorters(), e = c(e);
                var t = this.getItems(e);
                t = t.length ? t : this.items, this._updateItemsSortData(t)
            }, s.prototype._getSorters = function () {
                var e = this.options.getSortData;
                for (var t in e) {
                    var n = e[t];
                    this._sorters[t] = a(n)
                }
            }, s.prototype._updateItemsSortData = function (e) {
                for (var t = 0, n = e.length; t < n; t++) {
                    e[t].updateSortData()
                }
            };
            var a = function () {
                function e(e) {
                    if ("string" != typeof e) return e;
                    var t = f(e).split(" "),
                        n = t[0],
                        i = n.match(/^\[(.+)\]$/),
                        r = a(i && i[1], n),
                        o = s.sortDataParsers[t[1]];
                    return o ? function (e) {
                        return e && o(r(e))
                    } : function (e) {
                        return e && r(e)
                    }
                }

                function a(t, n) {
                    return t ? function (e) {
                        return e.getAttribute(t)
                    } : function (e) {
                        var t = e.querySelector(n);
                        return t && p(t)
                    }
                }
                return e
            }();
            s.sortDataParsers = {
                parseInt: function (e) {
                    return parseInt(e, 10)
                },
                parseFloat: function (e) {
                    return parseFloat(e)
                }
            }, s.prototype._sort = function () {
                var e = this.options.sortBy;
                if (e) {
                    var t = o([].concat.apply(e, this.sortHistory), this.options.sortAscending);
                    this.filteredItems.sort(t), e !== this.sortHistory[0] && this.sortHistory.unshift(e)
                }
            }, s.prototype._mode = function () {
                var e = this.options.layoutMode,
                    t = this.modes[e];
                if (!t) throw Error("No layout mode: " + e);
                return t.options = this.options[e], t
            }, s.prototype._resetLayout = function () {
                i.prototype._resetLayout.call(this), this._mode()._resetLayout()
            }, s.prototype._getItemLayoutPosition = function (e) {
                return this._mode()._getItemLayoutPosition(e)
            }, s.prototype._manageStamp = function (e) {
                this._mode()._manageStamp(e)
            }, s.prototype._getContainerSize = function () {
                return this._mode()._getContainerSize()
            }, s.prototype.needsResizeLayout = function () {
                return this._mode().needsResizeLayout()
            }, s.prototype.appended = function (e) {
                var t = this.addItems(e);
                if (t.length) {
                    var n = this._filterRevealAdded(t);
                    this.filteredItems = this.filteredItems.concat(n)
                }
            }, s.prototype.prepended = function (e) {
                var t = this._itemize(e);
                if (t.length) {
                    var n = this.items.slice(0);
                    this.items = t.concat(n), this._resetLayout(), this._manageStamps();
                    var i = this._filterRevealAdded(t);
                    this.layoutItems(n), this.filteredItems = i.concat(this.filteredItems)
                }
            }, s.prototype._filterRevealAdded = function (e) {
                var t = this._noTransition(function () {
                    return this._filter(e)
                });
                return this.layoutItems(t, !0), this.reveal(t), e
            }, s.prototype.insert = function (e) {
                var t = this.addItems(e);
                if (t.length) {
                    var n, i, r = t.length;
                    for (n = 0; n < r; n++) i = t[n], this.element.appendChild(i.element);
                    var o = this._filter(t);
                    for (this._noTransition(function () {
                            this.hide(o)
                        }), n = 0; n < r; n++) t[n].isLayoutInstant = !0;
                    for (this.arrange(), n = 0; n < r; n++) delete t[n].isLayoutInstant;
                    this.reveal(o)
                }
            };
            var l = s.prototype.remove;
            return s.prototype.remove = function (e) {
                e = c(e);
                var t = this.getItems(e);
                if (l.call(this, e), t && t.length)
                    for (var n = 0, i = t.length; n < i; n++) {
                        d(t[n], this.filteredItems)
                    }
            }, s.prototype._noTransition = function (e) {
                var t = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var n = e.call(this);
                return this.options.transitionDuration = t, n
            }, s
        }
        var h = e.jQuery,
            f = String.prototype.trim ? function (e) {
                return e.trim()
            } : function (e) {
                return e.replace(/^\s+|\s+$/g, "")
            },
            p = document.documentElement.textContent ? function (e) {
                return e.textContent
            } : function (e) {
                return e.innerText
            },
            n = Object.prototype.toString,
            i = Array.prototype.indexOf ? function (e, t) {
                return e.indexOf(t)
            } : function (e, t) {
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n] === t) return n;
                return -1
            };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], t) : e.Isotope = t(e.Outlayer, e.getSize, e.matchesSelector, e.Isotope.Item, e.Isotope.LayoutMode)
    }(window),
    function () {
        $.app = $.app || {}
    }.call(this),
    function () {
        var decodeEntities, isOurCDN;
        $(function () {
            return $(document).on("ajaxSend", function (e, t, n) {
                return t._ajaxSettings = n
            }), $(document).on("ajaxError", function (evt, xhr) {
                return /^text\/javascript/.test(xhr.getResponseHeader("Content-Type")) && eval(xhr.responseText), !0
            }), $(document).on("ajaxComplete", function (e, t) {
                var n, i, r, o, a, s;
                if (n = $.parseJSON(t.getResponseHeader("X-Flash")))
                    for (i = 0, r = n.length; i < r; i++) s = (a = n[i])[0], o = a[1], $.zoogleFlash(decodeEntities(o), s);
                return $(document).trigger("refresh"), !0
            })
        }), isOurCDN = function (e) {
            var t;
            return (t = document.createElement("a")).href = e, "s3.amazonaws.com" === t.hostname && 0 === t.pathname.lastIndexOf("/content.sitezoogle.com/assets", 0)
        }, decodeEntities = function (e) {
            var t;
            return (t = document.createElement("textarea")).innerHTML = e, t.value
        }, $.ajaxPrefilter(function (e, t) {
            return e.global || (e.global = e.crossDomain && !t.crossDomain && isOurCDN(e.url))
        })
    }.call(this), window.zoogle = window.zoogle || {}, window.zoogle.blockTemplate = '<div id="overlay">\n\t<div><h1>Please wait</h1></div>\n</div>\n<style>\n#overlay {\n\tposition: fixed;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: rgba(0,0,0,0.6);\n\tdisplay: flex;\n\ttop: 0;\n\talign-items: center;\n\tjustify-content: center;\n\tz-index: 200000;\n\tcursor: wait;\n}\n#overlay > div {\n\tbackground: white;\n\tpadding: 20px;\n\tborder: 3px solid rgb(170, 170, 170);\n}\n#overlay > div > h1 {\n\tmargin-left: 30px;\n\tmargin-right: 30px;\n}\n</style>\n', window.zoogle.blockUI = function () {
        document.body.insertAdjacentHTML("beforeend", window.zoogle.blockTemplate)
    }, window.zoogle.unblockUI = function () {
        var e = document.querySelector("body > #overlay");
        e && e.parentElement.removeChild(e)
    }, window.zImages = {
        dimensions: {
            mini: 100,
            thumb: 125,
            small: 200,
            square: 200,
            medium: 300,
            large: 600,
            square_retina: 400
        },
        imageUrl: function (e, t, n) {
            var i, r = [];
            return e.generic_url ? (e.rotation && 0 !== parseInt(e.rotation, 10) && r.push(["t", e.rotation]), "original" != t && r.push(["size", t]), 0 < r.length || !0 === n ? ("undefined" == typeof e.image_type ? e.image_type = "jpg" : "gif" == e.image_type && (e.image_type = "png"), i = "b:" + window.btoa(JSON.stringify(r)) + "." + e.image_type, null !== e.meta_path && (i = e.meta_path + "/" + i), e.generic_url + "/!!/" + i) : null !== e.meta_path ? e.generic_url + "/!!/" + e.meta_path : e.generic_url) : ""
        }
    },
    function (n) {
        for (var e, t = ["Width", "Height"], i = function (e, i) {
                var t;
                t = e in new Image ? function () {
                    return this[0] && this[0][e]
                } : function () {
                    var e, t, n = this[0];
                    return void 0 !== n && "img" === n.tagName.toLowerCase() && ((e = new Image).src = n.src, t = e[i]), t
                }, n.fn[e] = t
            }; e = t.pop();) i("natural" + e, e.toLowerCase())
    }(jQuery),
    function (a) {
        function s() {
            this.removeEventListener("touchmove", t), this.removeEventListener("touchend", s), c = !1
        }

        function t(e) {
            if (a.detectSwipe.preventDefault && e.preventDefault(), c) {
                var t, n = e.touches[0].pageX,
                    i = e.touches[0].pageY,
                    r = l - n,
                    o = u - i;
                Math.abs(r) >= a.detectSwipe.threshold ? t = 0 < r ? "left" : "right" : Math.abs(o) >= a.detectSwipe.threshold && (t = 0 < o ? "down" : "up"), t && (s.call(this), a(this).trigger("swipe", t).trigger("swipe" + t))
            }
        }

        function e(e) {
            1 == e.touches.length && (l = e.touches[0].pageX, u = e.touches[0].pageY, c = !0, this.addEventListener("touchmove", t, !1), this.addEventListener("touchend", s, !1))
        }

        function n() {
            this.addEventListener("touchstart", e, !1)
        }
        var l, u, c = !(a.detectSwipe = {
            version: "2.1.1",
            enabled: "ontouchstart" in document.documentElement,
            preventDefault: !0,
            threshold: 20
        });
        a.event.special.swipe = {
            setup: n
        }, a.each(["left", "up", "down", "right"], function () {
            a.event.special["swipe" + this] = {
                setup: function () {
                    a(this).on("swipe", a.noop)
                }
            }
        })
    }(jQuery),
    function (c) {
        "use strict";

        function r(e, t) {
            if (!(this instanceof r)) {
                var n = new r(e, t);
                return n.open(), n
            }
            this.id = r.id++, this.setup(e, t), this.chainCallbacks(r._callbackChain)
        }

        function o(e, t) {
            var n = {};
            for (var i in e) i in t && (n[i] = e[i], delete e[i]);
            return n
        }

        function a(e, t) {
            var n = {},
                i = new RegExp("^" + t + "([A-Z])(.*)");
            for (var r in e) {
                var o = r.match(i);
                if (o) n[(o[1] + o[2].replace(/([A-Z])/g, "-$1")).toLowerCase()] = e[r]
            }
            return n
        }
        if (void 0 !== c)
            if (c.fn.jquery.match(/-ajax/)) "console" in window && window.console.info("Featherlight needs regular jQuery, not the slim version.");
            else {
                var i = [],
                    s = function (t) {
                        return i = c.grep(i, function (e) {
                            return e !== t && 0 < e.$instance.closest("body").length
                        })
                    },
                    l = {
                        allowfullscreen: 1,
                        frameborder: 1,
                        height: 1,
                        longdesc: 1,
                        marginheight: 1,
                        marginwidth: 1,
                        name: 1,
                        referrerpolicy: 1,
                        scrolling: 1,
                        sandbox: 1,
                        src: 1,
                        srcdoc: 1,
                        width: 1
                    },
                    n = {
                        keyup: "onKeyUp",
                        resize: "onResize"
                    },
                    u = function (e) {
                        c.each(r.opened().reverse(), function () {
                            if (!e.isDefaultPrevented() && !1 === this[n[e.type]](e)) return e.preventDefault(), e.stopPropagation(), !1
                        })
                    },
                    d = function (e) {
                        if (e !== r._globalHandlerInstalled) {
                            r._globalHandlerInstalled = e;
                            var t = c.map(n, function (e, t) {
                                return t + "." + r.prototype.namespace
                            }).join(" ");
                            c(window)[e ? "on" : "off"](t, u)
                        }
                    };
                r.prototype = {
                    constructor: r,
                    namespace: "featherlight",
                    targetAttr: "data-featherlight",
                    variant: null,
                    resetCss: !1,
                    background: null,
                    openTrigger: "click",
                    closeTrigger: "click",
                    filter: null,
                    root: "body",
                    openSpeed: 250,
                    closeSpeed: 250,
                    closeOnClick: "background",
                    closeOnEsc: !0,
                    closeIcon: "&#10005;",
                    loading: "",
                    persist: !1,
                    otherClose: null,
                    beforeOpen: c.noop,
                    beforeContent: c.noop,
                    beforeClose: c.noop,
                    afterOpen: c.noop,
                    afterContent: c.noop,
                    afterClose: c.noop,
                    onKeyUp: c.noop,
                    onResize: c.noop,
                    type: null,
                    contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
                    setup: function (e, t) {
                        "object" != typeof e || e instanceof c != !1 || t || (t = e, e = undefined);
                        var n = c.extend(this, t, {
                                target: e
                            }),
                            i = n.resetCss ? n.namespace + "-reset" : n.namespace,
                            r = c(n.background || ['<div class="' + i + "-loading " + i + '">', '<div class="' + i + '-content">', '<button class="' + i + "-close-icon " + n.namespace + '-close" aria-label="Close">', n.closeIcon, "</button>", '<div class="' + n.namespace + '-inner">' + n.loading + "</div>", "</div>", "</div>"].join("")),
                            o = "." + n.namespace + "-close" + (n.otherClose ? "," + n.otherClose : "");
                        return n.$instance = r.clone().addClass(n.variant), n.$instance.on(n.closeTrigger + "." + n.namespace, function (e) {
                            if (!e.isDefaultPrevented()) {
                                var t = c(e.target);
                                ("background" === n.closeOnClick && t.is("." + n.namespace) || "anywhere" === n.closeOnClick || t.closest(o).length) && (n.close(e), e.preventDefault())
                            }
                        }), this
                    },
                    getContent: function () {
                        if (!1 !== this.persist && this.$content) return this.$content;
                        var t = this,
                            e = this.constructor.contentFilters,
                            n = function (e) {
                                return t.$currentTarget && t.$currentTarget.attr(e)
                            },
                            i = n(t.targetAttr),
                            r = t.target || i || "",
                            o = e[t.type];
                        if (!o && r in e && (o = e[r], r = t.target && i), r = r || n("href") || "", !o)
                            for (var a in e) t[a] && (o = e[a], r = t[a]);
                        if (!o) {
                            var s = r;
                            if (r = null, c.each(t.contentFilters, function () {
                                    return (o = e[this]).test && (r = o.test(s)), !r && o.regex && s.match && s.match(o.regex) && (r = s), !r
                                }), !r) return "console" in window && window.console.error("Featherlight: no content filter found " + (s ? ' for "' + s + '"' : " (no target specified)")), !1
                        }
                        return o.process.call(t, r)
                    },
                    setContent: function (e) {
                        return this.$instance.removeClass(this.namespace + "-loading"), this.$instance.toggleClass(this.namespace + "-iframe", e.is("iframe")), this.$instance.find("." + this.namespace + "-inner").not(e).slice(1).remove().end().replaceWith(c.contains(this.$instance[0], e[0]) ? "" : e), this.$content = e.addClass(this.namespace + "-inner"), this
                    },
                    open: function (t) {
                        var n = this;
                        if (n.$instance.hide().appendTo(n.root), !(t && t.isDefaultPrevented() || !1 === n.beforeOpen(t))) {
                            t && t.preventDefault();
                            var e = n.getContent();
                            if (e) return i.push(n), d(!0), n.$instance.fadeIn(n.openSpeed), n.beforeContent(t), c.when(e).always(function (e) {
                                n.setContent(e), n.afterContent(t)
                            }).then(n.$instance.promise()).done(function () {
                                n.afterOpen(t)
                            })
                        }
                        return n.$instance.detach(), c.Deferred().reject().promise()
                    },
                    close: function (e) {
                        var t = this,
                            n = c.Deferred();
                        return !1 === t.beforeClose(e) ? n.reject() : (0 === s(t).length && d(!1), t.$instance.fadeOut(t.closeSpeed, function () {
                            t.$instance.detach(), t.afterClose(e), n.resolve()
                        })), n.promise()
                    },
                    resize: function (e, t) {
                        if (e && t) {
                            this.$content.css("width", "").css("height", "");
                            var n = Math.max(e / (this.$content.parent().width() - 1), t / (this.$content.parent().height() - 1));
                            1 < n && (n = t / Math.floor(t / n), this.$content.css("width", e / n + "px").css("height", t / n + "px"))
                        }
                    },
                    chainCallbacks: function (e) {
                        for (var t in e) this[t] = c.proxy(e[t], this, c.proxy(this[t], this))
                    }
                }, c.extend(r, {
                    id: 0,
                    autoBind: "[data-featherlight]",
                    defaults: r.prototype,
                    contentFilters: {
                        jquery: {
                            regex: /^[#.]\w/,
                            test: function (e) {
                                return e instanceof c && e
                            },
                            process: function (e) {
                                return !1 !== this.persist ? c(e) : c(e).clone(!0)
                            }
                        },
                        image: {
                            regex: /\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,
                            process: function (e) {
                                var t = this,
                                    n = c.Deferred(),
                                    i = new Image,
                                    r = c('<img src="' + e + '" alt="" class="' + t.namespace + '-image" />');
                                return i.onload = function () {
                                    r.naturalWidth = i.width, r.naturalHeight = i.height, n.resolve(r)
                                }, i.onerror = function () {
                                    n.reject(r)
                                }, i.src = e, n.promise()
                            }
                        },
                        html: {
                            regex: /^\s*<[\w!][^<]*>/,
                            process: function (e) {
                                return c(e)
                            }
                        },
                        ajax: {
                            regex: /./,
                            process: function (e) {
                                var n = c.Deferred(),
                                    i = c("<div></div>").load(e, function (e, t) {
                                        "error" !== t && n.resolve(i.contents()), n.fail()
                                    });
                                return n.promise()
                            }
                        },
                        iframe: {
                            process: function (e) {
                                var t = new c.Deferred,
                                    n = c("<iframe/>"),
                                    i = a(this, "iframe"),
                                    r = o(i, l);
                                return n.hide().attr("src", e).attr(r).css(i).on("load", function () {
                                    t.resolve(n.show())
                                }).appendTo(this.$instance.find("." + this.namespace + "-content")), t.promise()
                            }
                        },
                        text: {
                            process: function (e) {
                                return c("<div>", {
                                    text: e
                                })
                            }
                        }
                    },
                    functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"],
                    readElementConfig: function (e, t) {
                        var r = this,
                            o = new RegExp("^data-" + t + "-(.*)"),
                            a = {};
                        return e && e.attributes && c.each(e.attributes, function () {
                            var e = this.name.match(o);
                            if (e) {
                                var t = this.value,
                                    n = c.camelCase(e[1]);
                                if (0 <= c.inArray(n, r.functionAttributes)) t = new Function(t);
                                else try {
                                    t = JSON.parse(t)
                                } catch (i) {}
                                a[n] = t
                            }
                        }), a
                    },
                    extend: function (e, t) {
                        var n = function () {
                            this.constructor = e
                        };
                        return n.prototype = this.prototype, e.prototype = new n, e.__super__ = this.prototype, c.extend(e, this, t), e.defaults = e.prototype, e
                    },
                    attach: function (r, o, a) {
                        var s = this;
                        "object" != typeof o || o instanceof c != !1 || a || (a = o, o = undefined);
                        var l, e = (a = c.extend({}, a)).namespace || s.defaults.namespace,
                            u = c.extend({}, s.defaults, s.readElementConfig(r[0], e), a),
                            t = function (e) {
                                var t = c(e.currentTarget),
                                    n = c.extend({
                                        $source: r,
                                        $currentTarget: t
                                    }, s.readElementConfig(r[0], u.namespace), s.readElementConfig(e.currentTarget, u.namespace), a),
                                    i = l || t.data("featherlight-persisted") || new s(o, n);
                                "shared" === i.persist ? l = i : !1 !== i.persist && t.data("featherlight-persisted", i), n.$currentTarget.blur && n.$currentTarget.blur(), i.open(e)
                            };
                        return r.on(u.openTrigger + "." + u.namespace, u.filter, t), t
                    },
                    current: function () {
                        var e = this.opened();
                        return e[e.length - 1] || null
                    },
                    opened: function () {
                        var t = this;
                        return s(), c.grep(i, function (e) {
                            return e instanceof t
                        })
                    },
                    close: function (e) {
                        var t = this.current();
                        if (t) return t.close(e)
                    },
                    _onReady: function () {
                        var t = this;
                        t.autoBind && (c(t.autoBind).each(function () {
                            t.attach(c(this))
                        }), c(document).on("click", t.autoBind, function (e) {
                            if (!e.isDefaultPrevented() && !c(e.target).hasClass("no-featherlight")) {
                                t.attach(c(e.currentTarget));
                                c(e.target).trigger(e)
                            }
                        }))
                    },
                    _callbackChain: {
                        onKeyUp: function (e, t) {
                            return 27 === t.keyCode ? (this.closeOnEsc && c.featherlight.close(t), !1) : e(t)
                        },
                        beforeOpen: function (e, t) {
                            return c(document.documentElement).addClass("with-featherlight"), this._previouslyActive = document.activeElement, this._$previouslyTabbable = c("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")), this._$previouslyWithTabIndex = c("[tabindex]").not('[tabindex="-1"]'), this._previousWithTabIndices = this._$previouslyWithTabIndex.map(function (e, t) {
                                return c(t).attr("tabindex")
                            }), this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex", -1), document.activeElement && document.activeElement.blur && document.activeElement.blur(), e(t)
                        },
                        afterClose: function (e, t) {
                            var n = e(t),
                                i = this;
                            return this._$previouslyTabbable.removeAttr("tabindex"), this._$previouslyWithTabIndex.each(function (e, t) {
                                c(t).attr("tabindex", i._previousWithTabIndices[e])
                            }), this._previouslyActive.focus(), 0 === r.opened().length && c(document.documentElement).removeClass("with-featherlight"), n
                        },
                        onResize: function (e, t) {
                            return this.resize(this.$content.naturalWidth, this.$content.naturalHeight), e(t)
                        },
                        afterContent: function (e, t) {
                            var n = e(t);
                            return this.$instance.find("[autofocus]:not([disabled])").focus(), this.onResize(t), n
                        }
                    }
                }), c.featherlight = r, c.fn.featherlight = function (e, t) {
                    return r.attach(this, e, t), this
                }, c(document).ready(function () {
                    r._onReady()
                })
            }
        else "console" in window && window.console.info("Too much lightness, Featherlight needs jQuery.")
    }(jQuery),
    function (o) {
        "use strict";

        function i(e, t) {
            if (!(this instanceof i)) {
                var n = new i(o.extend({
                    $source: e,
                    $currentTarget: e.first()
                }, t));
                return n.open(), n
            }
            o.featherlight.apply(this, arguments), this.chainCallbacks(s)
        }
        var e = function (e) {
            window.console && window.console.warn && window.console.warn("FeatherlightGallery: " + e)
        };
        if (void 0 === o) return e("Too much lightness, Featherlight needs jQuery.");
        if (!o.featherlight) return e("Load the featherlight plugin before the gallery plugin");
        var t = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            n = o.event && o.event.special.swipeleft && o,
            r = window.Hammer && function (e) {
                var t = new window.Hammer.Manager(e[0]);
                return t.add(new window.Hammer.Swipe), t
            },
            a = t && (n || r);
        t && !a && e("No compatible swipe library detected; one must be included before featherlightGallery for swipe motions to navigate the galleries.");
        var s = {
            afterClose: function (e, t) {
                var n = this;
                return n.$instance.off("next." + n.namespace + " previous." + n.namespace), n._swiper && (n._swiper.off("swipeleft", n._swipeleft).off("swiperight", n._swiperight), n._swiper = null), e(t)
            },
            beforeOpen: function (e, t) {
                var n = this;
                return n.$instance.on("next." + n.namespace + " previous." + n.namespace, function (e) {
                    var t = "next" === e.type ? 1 : -1;
                    n.navigateTo(n.currentNavigation() + t)
                }), a && (n._swiper = a(n.$instance).on("swipeleft", n._swipeleft = function () {
                    n.$instance.trigger("next")
                }).on("swiperight", n._swiperight = function () {
                    n.$instance.trigger("previous")
                }), n.$instance.addClass(this.namespace + "-swipe-aware", a)), n.$instance.find("." + n.namespace + "-content").append(n.createNavigation("previous")).append(n.createNavigation("next")), e(t)
            },
            beforeContent: function (e, t) {
                var n = this.currentNavigation(),
                    i = this.slides().length;
                return this.$instance.toggleClass(this.namespace + "-first-slide", 0 === n).toggleClass(this.namespace + "-last-slide", n === i - 1), e(t)
            },
            onKeyUp: function (e, t) {
                var n = {
                    37: "previous",
                    39: "next"
                } [t.keyCode];
                return n ? (this.$instance.trigger(n), !1) : e(t)
            }
        };
        o.featherlight.extend(i, {
            autoBind: "[data-featherlight-gallery]"
        }), o.extend(i.prototype, {
            previousIcon: "&#9664;",
            nextIcon: "&#9654;",
            galleryFadeIn: 100,
            galleryFadeOut: 300,
            slides: function () {
                return this.filter ? this.$source.find(this.filter) : this.$source
            },
            images: function () {
                return e("images is deprecated, please use slides instead"), this.slides()
            },
            currentNavigation: function () {
                return this.slides().index(this.$currentTarget)
            },
            navigateTo: function (e) {
                var t = this,
                    n = t.slides(),
                    i = n.length,
                    r = t.$instance.find("." + t.namespace + "-inner");
                return e = (e % i + i) % i, t.$currentTarget = n.eq(e), t.beforeContent(), o.when(t.getContent(), r.fadeTo(t.galleryFadeOut, .2)).always(function (e) {
                    t.setContent(e), t.afterContent(), e.fadeTo(t.galleryFadeIn, 1)
                })
            },
            createNavigation: function (t) {
                var n = this;
                return o('<span title="' + t + '" class="' + this.namespace + "-" + t + '"><span>' + this[t + "Icon"] + "</span></span>").click(function (e) {
                    o(this).trigger(t + "." + n.namespace), e.preventDefault()
                })
            }
        }), o.featherlightGallery = i, o.fn.featherlightGallery = function (e) {
            return i.attach(this, e), this
        }, o(document).ready(function () {
            i._onReady()
        })
    }(jQuery), $.featherlight.defaults.otherClose = ".close", $.featherlight.defaults.root = "#usersite-container", $.extend($.featherlight.prototype, {
        beforeContent: function () {
            return this.$instance.find(".featherlight-content")
        },
        afterContent: function () {
            var e = this.$instance.find("video"),
                t = this.$instance.find(".featherlight-content");
            return t.toggleClass("with-video", 0 !== e.length), e.length && (this.$content.naturalWidth = e.attr("width"), this.$content.naturalHeight = e.attr("height")), $.onload ? $.onload.partial.run(t) : $
        }
    }), $.extend(!0, $.featherlightGallery.defaults, {
        variant: "dialog-image",
        afterContent: function () {
            var e;
            return this.$instance.find(".title").remove(), e = this.$currentTarget.attr("title"), $('<div class="title">').text(e).appendTo(this.$instance.find(".featherlight-content")), $.featherlight.prototype.afterContent.call(this)
        }
    }), $.featherlight.prototype.reload = function () {
        return this.load({})
    }, $.featherlight.prototype.load = function (e) {
        var t = this;
        return $.extend(this, e), $.when(this.getContent()).always(function (e) {
            return t.setContent(e)
        })
    },
    function (e, t) {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.Handlebars = e.Handlebars || t()
    }(this, function () {
        var f = function () {
                "use strict";

                function e(e) {
                    this.string = e
                }
                return e.prototype.toString = function () {
                    return "" + this.string
                }, e
            }(),
            m = function () {
                "use strict";

                function t(e) {
                    return s[e]
                }

                function e(e) {
                    for (var t = 1; t < arguments.length; t++)
                        for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
                    return e
                }

                function n(e) {
                    return e instanceof a ? e.toString() : null == e ? "" : e ? (e = "" + e, u.test(e) ? e.replace(l, t) : e) : e + ""
                }

                function i(e) {
                    return !e && 0 !== e || !(!h(e) || 0 !== e.length)
                }

                function r(e, t) {
                    return (e ? e + "." : "") + t
                }
                var o = {},
                    a = f,
                    s = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#x27;",
                        "`": "&#x60;"
                    },
                    l = /[&<>"'`]/g,
                    u = /[&<>"'`]/;
                o.extend = e;
                var c, d = Object.prototype.toString;
                o.toString = d, (c = function (e) {
                    return "function" == typeof e
                })(/x/) && (c = function (e) {
                    return "function" == typeof e && "[object Function]" === d.call(e)
                }), o.isFunction = c;
                var h = Array.isArray || function (e) {
                    return !(!e || "object" != typeof e) && "[object Array]" === d.call(e)
                };
                return o.isArray = h, o.escapeExpression = n, o.isEmpty = i, o.appendContextPath = r, o
            }(),
            v = function () {
                "use strict";

                function e(e, t) {
                    var n;
                    t && t.firstLine && (e += " - " + (n = t.firstLine) + ":" + t.firstColumn);
                    for (var i = Error.prototype.constructor.call(this, e), r = 0; r < o.length; r++) this[o[r]] = i[o[r]];
                    n && (this.lineNumber = n, this.column = t.firstColumn)
                }
                var o = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
                return e.prototype = new Error, e
            }(),
            s = function () {
                "use strict";

                function e(e, t) {
                    this.helpers = e || {}, this.partials = t || {}, n(this)
                }

                function n(o) {
                    o.registerHelper("helperMissing", function () {
                        if (1 === arguments.length) return undefined;
                        throw new d("Missing helper: '" + arguments[arguments.length - 1].name + "'")
                    }), o.registerHelper("blockHelperMissing", function (e, t) {
                        var n = t.inverse,
                            i = t.fn;
                        if (!0 === e) return i(this);
                        if (!1 === e || null == e) return n(this);
                        if (h(e)) return 0 < e.length ? (t.ids && (t.ids = [t.name]), o.helpers.each(e, t)) : n(this);
                        if (t.data && t.ids) {
                            var r = p(t.data);
                            r.contextPath = c.appendContextPath(t.data.contextPath, t.name), t = {
                                data: r
                            }
                        }
                        return i(e, t)
                    }), o.registerHelper("each", function (e, t) {
                        if (!t) throw new d("Must pass iterator to #each");
                        var n, i, r = t.fn,
                            o = t.inverse,
                            a = 0,
                            s = "";
                        if (t.data && t.ids && (i = c.appendContextPath(t.data.contextPath, t.ids[0]) + "."), f(e) && (e = e.call(this)), t.data && (n = p(t.data)), e && "object" == typeof e)
                            if (h(e))
                                for (var l = e.length; a < l; a++) n && (n.index = a, n.first = 0 === a, n.last = a === e.length - 1, i && (n.contextPath = i + a)), s += r(e[a], {
                                    data: n
                                });
                            else
                                for (var u in e) e.hasOwnProperty(u) && (n && (n.key = u, n.index = a, n.first = 0 === a, i && (n.contextPath = i + u)), s += r(e[u], {
                                    data: n
                                }), a++);
                        return 0 === a && (s = o(this)), s
                    }), o.registerHelper("if", function (e, t) {
                        return f(e) && (e = e.call(this)), !t.hash.includeZero && !e || c.isEmpty(e) ? t.inverse(this) : t.fn(this)
                    }), o.registerHelper("unless", function (e, t) {
                        return o.helpers["if"].call(this, e, {
                            fn: t.inverse,
                            inverse: t.fn,
                            hash: t.hash
                        })
                    }), o.registerHelper("with", function (e, t) {
                        f(e) && (e = e.call(this));
                        var n = t.fn;
                        if (c.isEmpty(e)) return t.inverse(this);
                        if (t.data && t.ids) {
                            var i = p(t.data);
                            i.contextPath = c.appendContextPath(t.data.contextPath, t.ids[0]), t = {
                                data: i
                            }
                        }
                        return n(e, t)
                    }), o.registerHelper("log", function (e, t) {
                        var n = t.data && null != t.data.level ? parseInt(t.data.level, 10) : 1;
                        o.log(n, e)
                    }), o.registerHelper("lookup", function (e, t) {
                        return e && e[t]
                    })
                }
                var t = {},
                    c = m,
                    d = v,
                    i = "2.0.0";
                t.VERSION = i;
                var r = 6;
                t.COMPILER_REVISION = r;
                var o = {
                    1: "<= 1.0.rc.2",
                    2: "== 1.0.0-rc.3",
                    3: "== 1.0.0-rc.4",
                    4: "== 1.x.x",
                    5: "== 2.0.0-alpha.x",
                    6: ">= 2.0.0-beta.1"
                };
                t.REVISION_CHANGES = o;
                var h = c.isArray,
                    f = c.isFunction,
                    a = c.toString,
                    s = "[object Object]";
                (t.HandlebarsEnvironment = e).prototype = {
                    constructor: e,
                    logger: l,
                    log: u,
                    registerHelper: function (e, t) {
                        if (a.call(e) === s) {
                            if (t) throw new d("Arg not supported with multiple helpers");
                            c.extend(this.helpers, e)
                        } else this.helpers[e] = t
                    },
                    unregisterHelper: function (e) {
                        delete this.helpers[e]
                    },
                    registerPartial: function (e, t) {
                        a.call(e) === s ? c.extend(this.partials, e) : this.partials[e] = t
                    },
                    unregisterPartial: function (e) {
                        delete this.partials[e]
                    }
                };
                var l = {
                        methodMap: {
                            0: "debug",
                            1: "info",
                            2: "warn",
                            3: "error"
                        },
                        DEBUG: 0,
                        INFO: 1,
                        WARN: 2,
                        ERROR: 3,
                        level: 3,
                        log: function (e, t) {
                            if (l.level <= e) {
                                var n = l.methodMap[e];
                                "undefined" != typeof console && console[n] && console[n].call(console, t)
                            }
                        }
                    },
                    u = (t.logger = l).log;
                t.log = u;
                var p = function (e) {
                    var t = c.extend({}, e);
                    return t._parent = e, t
                };
                return t.createFrame = p, t
            }(),
            l = function (e, t, n) {
                "use strict";

                function i(e) {
                    var t = e && e[0] || 1;
                    if (t !== c) {
                        if (t < c) {
                            var n = d[c],
                                i = d[t];
                            throw new y("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + i + ").")
                        }
                        throw new y("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
                    }
                }

                function r(p, m) {
                    if (!m) throw new y("No environment passed to template");
                    if (!p || !p.main) throw new y("Unknown template object: " + typeof p);
                    m.VM.checkRevision(p.compiler);
                    var e = function (e, t, n, i, r, o, a, s, l) {
                            r && (i = g.extend({}, i, r));
                            var u = m.VM.invokePartial.call(this, e, n, i, o, a, s, l);
                            if (null == u && m.compile) {
                                var c = {
                                    helpers: o,
                                    partials: a,
                                    data: s,
                                    depths: l
                                };
                                a[n] = m.compile(e, {
                                    data: s !== undefined,
                                    compat: p.compat
                                }, m), u = a[n](i, c)
                            }
                            if (null != u) {
                                if (t) {
                                    for (var d = u.split("\n"), h = 0, f = d.length; h < f && (d[h] || h + 1 !== f); h++) d[h] = t + d[h];
                                    u = d.join("\n")
                                }
                                return u
                            }
                            throw new y("The partial " + n + " could not be compiled when running in runtime-only mode")
                        },
                        r = {
                            lookup: function (e, t) {
                                for (var n = e.length, i = 0; i < n; i++)
                                    if (e[i] && null != e[i][t]) return e[i][t]
                            },
                            lambda: function (e, t) {
                                return "function" == typeof e ? e.call(t) : e
                            },
                            escapeExpression: g.escapeExpression,
                            invokePartial: e,
                            fn: function (e) {
                                return p[e]
                            },
                            programs: [],
                            program: function (e, t, n) {
                                var i = this.programs[e],
                                    r = this.fn(e);
                                return t || n ? i = a(this, e, r, t, n) : i || (i = this.programs[e] = a(this, e, r)), i
                            },
                            data: function (e, t) {
                                for (; e && t--;) e = e._parent;
                                return e
                            },
                            merge: function (e, t) {
                                var n = e || t;
                                return e && t && e !== t && (n = g.extend({}, t, e)), n
                            },
                            noop: m.VM.noop,
                            compilerInfo: p.compiler
                        },
                        o = function (e, t) {
                            var n, i = (t = t || {}).data;
                            return o._setup(t), !t.partial && p.useData && (i = l(e, i)), p.useDepths && (n = t.depths ? [e].concat(t.depths) : [e]), p.main.call(r, e, r.helpers, r.partials, i, n)
                        };
                    return o.isTop = !0, o._setup = function (e) {
                        e.partial ? (r.helpers = e.helpers, r.partials = e.partials) : (r.helpers = r.merge(e.helpers, m.helpers), p.usePartial && (r.partials = r.merge(e.partials, m.partials)))
                    }, o._child = function (e, t, n) {
                        if (p.useDepths && !n) throw new y("must pass parent depths");
                        return a(r, e, p[e], t, n)
                    }, o
                }

                function a(n, e, i, r, o) {
                    var t = function (e, t) {
                        return t = t || {}, i.call(n, e, n.helpers, n.partials, t.data || r, o && [e].concat(o))
                    };
                    return t.program = e, t.depth = o ? o.length : 0, t
                }

                function o(e, t, n, i, r, o, a) {
                    var s = {
                        partial: !0,
                        helpers: i,
                        partials: r,
                        data: o,
                        depths: a
                    };
                    if (e === undefined) throw new y("The partial " + t + " could not be found");
                    if (e instanceof Function) return e(n, s)
                }

                function s() {
                    return ""
                }

                function l(e, t) {
                    return t && "root" in t || ((t = t ? h(t) : {}).root = e), t
                }
                var u = {},
                    g = m,
                    y = v,
                    c = n.COMPILER_REVISION,
                    d = n.REVISION_CHANGES,
                    h = n.createFrame;
                return u.checkRevision = i, u.template = r, u.program = a, u.invokePartial = o, u.noop = s, u
            }(0, 0, s),
            g = function () {
                "use strict";
                var e = s,
                    n = f,
                    i = v,
                    r = m,
                    o = l,
                    t = function () {
                        var t = new e.HandlebarsEnvironment;
                        return r.extend(t, e), t.SafeString = n, t.Exception = i, t.Utils = r, t.escapeExpression = r.escapeExpression, t.VM = o, t.template = function (e) {
                            return o.template(e, t)
                        }, t
                    },
                    a = t();
                return a.create = t, a["default"] = a
            }(),
            y = function () {
                "use strict";

                function u(e) {
                    e = e || {}, this.firstLine = e.first_line, this.firstColumn = e.first_column, this.lastColumn = e.last_column, this.lastLine = e.last_line
                }
                var c = v,
                    a = {
                        ProgramNode: function (e, t, n) {
                            u.call(this, n), this.type = "program", this.statements = e, this.strip = t
                        },
                        MustacheNode: function (e, t, n, i, r) {
                            if (u.call(this, r), this.type = "mustache", this.strip = i, null != n && n.charAt) {
                                var o = n.charAt(3) || n.charAt(2);
                                this.escaped = "{" !== o && "&" !== o
                            } else this.escaped = !!n;
                            e instanceof a.SexprNode ? this.sexpr = e : this.sexpr = new a.SexprNode(e, t), this.id = this.sexpr.id, this.params = this.sexpr.params, this.hash = this.sexpr.hash, this.eligibleHelper = this.sexpr.eligibleHelper, this.isHelper = this.sexpr.isHelper
                        },
                        SexprNode: function (e, t, n) {
                            u.call(this, n), this.type = "sexpr", this.hash = t;
                            var i = this.id = e[0],
                                r = this.params = e.slice(1);
                            this.isHelper = !(!r.length && !t), this.eligibleHelper = this.isHelper || i.isSimple
                        },
                        PartialNode: function (e, t, n, i, r) {
                            u.call(this, r), this.type = "partial", this.partialName = e, this.context = t, this.hash = n, this.strip = i, this.strip.inlineStandalone = !0
                        },
                        BlockNode: function (e, t, n, i, r) {
                            u.call(this, r), this.type = "block", this.mustache = e, this.program = t, this.inverse = n, this.strip = i, n && !t && (this.isInverse = !0)
                        },
                        RawBlockNode: function (e, t, n, i) {
                            if (u.call(this, i), e.sexpr.id.original !== n) throw new c(e.sexpr.id.original + " doesn't match " + n, this);
                            t = new a.ContentNode(t, i), this.type = "block", this.mustache = e, this.program = new a.ProgramNode([t], {}, i)
                        },
                        ContentNode: function (e, t) {
                            u.call(this, t), this.type = "content", this.original = this.string = e
                        },
                        HashNode: function (e, t) {
                            u.call(this, t), this.type = "hash", this.pairs = e
                        },
                        IdNode: function (e, t) {
                            u.call(this, t), this.type = "ID";
                            for (var n = "", i = [], r = 0, o = "", a = 0, s = e.length; a < s; a++) {
                                var l = e[a].part;
                                if (n += (e[a].separator || "") + l, ".." === l || "." === l || "this" === l) {
                                    if (0 < i.length) throw new c("Invalid path: " + n, this);
                                    ".." === l ? (r++, o += "../") : this.isScoped = !0
                                } else i.push(l)
                            }
                            this.original = n, this.parts = i, this.string = i.join("."), this.depth = r, this.idName = o + this.string, this.isSimple = 1 === e.length && !this.isScoped && 0 === r, this.stringModeValue = this.string
                        },
                        PartialNameNode: function (e, t) {
                            u.call(this, t), this.type = "PARTIAL_NAME", this.name = e.original
                        },
                        DataNode: function (e, t) {
                            u.call(this, t), this.type = "DATA", this.id = e, this.stringModeValue = e.stringModeValue, this.idName = "@" + e.stringModeValue
                        },
                        StringNode: function (e, t) {
                            u.call(this, t), this.type = "STRING", this.original = this.string = this.stringModeValue = e
                        },
                        NumberNode: function (e, t) {
                            u.call(this, t), this.type = "NUMBER", this.original = this.number = e, this.stringModeValue = Number(e)
                        },
                        BooleanNode: function (e, t) {
                            u.call(this, t), this.type = "BOOLEAN", this.bool = e, this.stringModeValue = "true" === e
                        },
                        CommentNode: function (e, t) {
                            u.call(this, t), this.type = "comment", this.comment = e, this.strip = {
                                inlineStandalone: !0
                            }
                        }
                    };
                return a
            }(),
            u = function () {
                "use strict";
                return function () {
                    function e() {
                        this.yy = {}
                    }
                    var t = {
                            trace: function i() {},
                            yy: {},
                            symbols_: {
                                error: 2,
                                root: 3,
                                program: 4,
                                EOF: 5,
                                program_repetition0: 6,
                                statement: 7,
                                mustache: 8,
                                block: 9,
                                rawBlock: 10,
                                partial: 11,
                                CONTENT: 12,
                                COMMENT: 13,
                                openRawBlock: 14,
                                END_RAW_BLOCK: 15,
                                OPEN_RAW_BLOCK: 16,
                                sexpr: 17,
                                CLOSE_RAW_BLOCK: 18,
                                openBlock: 19,
                                block_option0: 20,
                                closeBlock: 21,
                                openInverse: 22,
                                block_option1: 23,
                                OPEN_BLOCK: 24,
                                CLOSE: 25,
                                OPEN_INVERSE: 26,
                                inverseAndProgram: 27,
                                INVERSE: 28,
                                OPEN_ENDBLOCK: 29,
                                path: 30,
                                OPEN: 31,
                                OPEN_UNESCAPED: 32,
                                CLOSE_UNESCAPED: 33,
                                OPEN_PARTIAL: 34,
                                partialName: 35,
                                param: 36,
                                partial_option0: 37,
                                partial_option1: 38,
                                sexpr_repetition0: 39,
                                sexpr_option0: 40,
                                dataName: 41,
                                STRING: 42,
                                NUMBER: 43,
                                BOOLEAN: 44,
                                OPEN_SEXPR: 45,
                                CLOSE_SEXPR: 46,
                                hash: 47,
                                hash_repetition_plus0: 48,
                                hashSegment: 49,
                                ID: 50,
                                EQUALS: 51,
                                DATA: 52,
                                pathSegments: 53,
                                SEP: 54,
                                $accept: 0,
                                $end: 1
                            },
                            terminals_: {
                                2: "error",
                                5: "EOF",
                                12: "CONTENT",
                                13: "COMMENT",
                                15: "END_RAW_BLOCK",
                                16: "OPEN_RAW_BLOCK",
                                18: "CLOSE_RAW_BLOCK",
                                24: "OPEN_BLOCK",
                                25: "CLOSE",
                                26: "OPEN_INVERSE",
                                28: "INVERSE",
                                29: "OPEN_ENDBLOCK",
                                31: "OPEN",
                                32: "OPEN_UNESCAPED",
                                33: "CLOSE_UNESCAPED",
                                34: "OPEN_PARTIAL",
                                42: "STRING",
                                43: "NUMBER",
                                44: "BOOLEAN",
                                45: "OPEN_SEXPR",
                                46: "CLOSE_SEXPR",
                                50: "ID",
                                51: "EQUALS",
                                52: "DATA",
                                54: "SEP"
                            },
                            productions_: [0, [3, 2],
                                [4, 1],
                                [7, 1],
                                [7, 1],
                                [7, 1],
                                [7, 1],
                                [7, 1],
                                [7, 1],
                                [10, 3],
                                [14, 3],
                                [9, 4],
                                [9, 4],
                                [19, 3],
                                [22, 3],
                                [27, 2],
                                [21, 3],
                                [8, 3],
                                [8, 3],
                                [11, 5],
                                [11, 4],
                                [17, 3],
                                [17, 1],
                                [36, 1],
                                [36, 1],
                                [36, 1],
                                [36, 1],
                                [36, 1],
                                [36, 3],
                                [47, 1],
                                [49, 3],
                                [35, 1],
                                [35, 1],
                                [35, 1],
                                [41, 2],
                                [30, 1],
                                [53, 3],
                                [53, 1],
                                [6, 0],
                                [6, 2],
                                [20, 0],
                                [20, 1],
                                [23, 0],
                                [23, 1],
                                [37, 0],
                                [37, 1],
                                [38, 0],
                                [38, 1],
                                [39, 0],
                                [39, 2],
                                [40, 0],
                                [40, 1],
                                [48, 1],
                                [48, 2]
                            ],
                            performAction: function s(e, t, n, i, r, o) {
                                var a = o.length - 1;
                                switch (r) {
                                    case 1:
                                        return i.prepareProgram(o[a - 1].statements, !0), o[a - 1];
                                    case 2:
                                        this.$ = new i.ProgramNode(i.prepareProgram(o[a]), {}, this._$);
                                        break;
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                        this.$ = o[a];
                                        break;
                                    case 7:
                                        this.$ = new i.ContentNode(o[a], this._$);
                                        break;
                                    case 8:
                                        this.$ = new i.CommentNode(o[a], this._$);
                                        break;
                                    case 9:
                                        this.$ = new i.RawBlockNode(o[a - 2], o[a - 1], o[a], this._$);
                                        break;
                                    case 10:
                                        this.$ = new i.MustacheNode(o[a - 1], null, "", "", this._$);
                                        break;
                                    case 11:
                                        this.$ = i.prepareBlock(o[a - 3], o[a - 2], o[a - 1], o[a], !1, this._$);
                                        break;
                                    case 12:
                                        this.$ = i.prepareBlock(o[a - 3], o[a - 2], o[a - 1], o[a], !0, this._$);
                                        break;
                                    case 13:
                                    case 14:
                                        this.$ = new i.MustacheNode(o[a - 1], null, o[a - 2], i.stripFlags(o[a - 2], o[a]), this._$);
                                        break;
                                    case 15:
                                        this.$ = {
                                            strip: i.stripFlags(o[a - 1], o[a - 1]),
                                            program: o[a]
                                        };
                                        break;
                                    case 16:
                                        this.$ = {
                                            path: o[a - 1],
                                            strip: i.stripFlags(o[a - 2], o[a])
                                        };
                                        break;
                                    case 17:
                                    case 18:
                                        this.$ = new i.MustacheNode(o[a - 1], null, o[a - 2], i.stripFlags(o[a - 2], o[a]), this._$);
                                        break;
                                    case 19:
                                        this.$ = new i.PartialNode(o[a - 3], o[a - 2], o[a - 1], i.stripFlags(o[a - 4], o[a]), this._$);
                                        break;
                                    case 20:
                                        this.$ = new i.PartialNode(o[a - 2], undefined, o[a - 1], i.stripFlags(o[a - 3], o[a]), this._$);
                                        break;
                                    case 21:
                                        this.$ = new i.SexprNode([o[a - 2]].concat(o[a - 1]), o[a], this._$);
                                        break;
                                    case 22:
                                        this.$ = new i.SexprNode([o[a]], null, this._$);
                                        break;
                                    case 23:
                                        this.$ = o[a];
                                        break;
                                    case 24:
                                        this.$ = new i.StringNode(o[a], this._$);
                                        break;
                                    case 25:
                                        this.$ = new i.NumberNode(o[a], this._$);
                                        break;
                                    case 26:
                                        this.$ = new i.BooleanNode(o[a], this._$);
                                        break;
                                    case 27:
                                        this.$ = o[a];
                                        break;
                                    case 28:
                                        o[a - 1].isHelper = !0, this.$ = o[a - 1];
                                        break;
                                    case 29:
                                        this.$ = new i.HashNode(o[a], this._$);
                                        break;
                                    case 30:
                                        this.$ = [o[a - 2], o[a]];
                                        break;
                                    case 31:
                                        this.$ = new i.PartialNameNode(o[a], this._$);
                                        break;
                                    case 32:
                                        this.$ = new i.PartialNameNode(new i.StringNode(o[a], this._$), this._$);
                                        break;
                                    case 33:
                                        this.$ = new i.PartialNameNode(new i.NumberNode(o[a], this._$));
                                        break;
                                    case 34:
                                        this.$ = new i.DataNode(o[a], this._$);
                                        break;
                                    case 35:
                                        this.$ = new i.IdNode(o[a], this._$);
                                        break;
                                    case 36:
                                        o[a - 2].push({
                                            part: o[a],
                                            separator: o[a - 1]
                                        }), this.$ = o[a - 2];
                                        break;
                                    case 37:
                                        this.$ = [{
                                            part: o[a]
                                        }];
                                        break;
                                    case 38:
                                        this.$ = [];
                                        break;
                                    case 39:
                                        o[a - 1].push(o[a]);
                                        break;
                                    case 48:
                                        this.$ = [];
                                        break;
                                    case 49:
                                        o[a - 1].push(o[a]);
                                        break;
                                    case 52:
                                        this.$ = [o[a]];
                                        break;
                                    case 53:
                                        o[a - 1].push(o[a])
                                }
                            },
                            table: [{
                                3: 1,
                                4: 2,
                                5: [2, 38],
                                6: 3,
                                12: [2, 38],
                                13: [2, 38],
                                16: [2, 38],
                                24: [2, 38],
                                26: [2, 38],
                                31: [2, 38],
                                32: [2, 38],
                                34: [2, 38]
                            }, {
                                1: [3]
                            }, {
                                5: [1, 4]
                            }, {
                                5: [2, 2],
                                7: 5,
                                8: 6,
                                9: 7,
                                10: 8,
                                11: 9,
                                12: [1, 10],
                                13: [1, 11],
                                14: 16,
                                16: [1, 20],
                                19: 14,
                                22: 15,
                                24: [1, 18],
                                26: [1, 19],
                                28: [2, 2],
                                29: [2, 2],
                                31: [1, 12],
                                32: [1, 13],
                                34: [1, 17]
                            }, {
                                1: [2, 1]
                            }, {
                                5: [2, 39],
                                12: [2, 39],
                                13: [2, 39],
                                16: [2, 39],
                                24: [2, 39],
                                26: [2, 39],
                                28: [2, 39],
                                29: [2, 39],
                                31: [2, 39],
                                32: [2, 39],
                                34: [2, 39]
                            }, {
                                5: [2, 3],
                                12: [2, 3],
                                13: [2, 3],
                                16: [2, 3],
                                24: [2, 3],
                                26: [2, 3],
                                28: [2, 3],
                                29: [2, 3],
                                31: [2, 3],
                                32: [2, 3],
                                34: [2, 3]
                            }, {
                                5: [2, 4],
                                12: [2, 4],
                                13: [2, 4],
                                16: [2, 4],
                                24: [2, 4],
                                26: [2, 4],
                                28: [2, 4],
                                29: [2, 4],
                                31: [2, 4],
                                32: [2, 4],
                                34: [2, 4]
                            }, {
                                5: [2, 5],
                                12: [2, 5],
                                13: [2, 5],
                                16: [2, 5],
                                24: [2, 5],
                                26: [2, 5],
                                28: [2, 5],
                                29: [2, 5],
                                31: [2, 5],
                                32: [2, 5],
                                34: [2, 5]
                            }, {
                                5: [2, 6],
                                12: [2, 6],
                                13: [2, 6],
                                16: [2, 6],
                                24: [2, 6],
                                26: [2, 6],
                                28: [2, 6],
                                29: [2, 6],
                                31: [2, 6],
                                32: [2, 6],
                                34: [2, 6]
                            }, {
                                5: [2, 7],
                                12: [2, 7],
                                13: [2, 7],
                                16: [2, 7],
                                24: [2, 7],
                                26: [2, 7],
                                28: [2, 7],
                                29: [2, 7],
                                31: [2, 7],
                                32: [2, 7],
                                34: [2, 7]
                            }, {
                                5: [2, 8],
                                12: [2, 8],
                                13: [2, 8],
                                16: [2, 8],
                                24: [2, 8],
                                26: [2, 8],
                                28: [2, 8],
                                29: [2, 8],
                                31: [2, 8],
                                32: [2, 8],
                                34: [2, 8]
                            }, {
                                17: 21,
                                30: 22,
                                41: 23,
                                50: [1, 26],
                                52: [1, 25],
                                53: 24
                            }, {
                                17: 27,
                                30: 22,
                                41: 23,
                                50: [1, 26],
                                52: [1, 25],
                                53: 24
                            }, {
                                4: 28,
                                6: 3,
                                12: [2, 38],
                                13: [2, 38],
                                16: [2, 38],
                                24: [2, 38],
                                26: [2, 38],
                                28: [2, 38],
                                29: [2, 38],
                                31: [2, 38],
                                32: [2, 38],
                                34: [2, 38]
                            }, {
                                4: 29,
                                6: 3,
                                12: [2, 38],
                                13: [2, 38],
                                16: [2, 38],
                                24: [2, 38],
                                26: [2, 38],
                                28: [2, 38],
                                29: [2, 38],
                                31: [2, 38],
                                32: [2, 38],
                                34: [2, 38]
                            }, {
                                12: [1, 30]
                            }, {
                                30: 32,
                                35: 31,
                                42: [1, 33],
                                43: [1, 34],
                                50: [1, 26],
                                53: 24
                            }, {
                                17: 35,
                                30: 22,
                                41: 23,
                                50: [1, 26],
                                52: [1, 25],
                                53: 24
                            }, {
                                17: 36,
                                30: 22,
                                41: 23,
                                50: [1, 26],
                                52: [1, 25],
                                53: 24
                            }, {
                                17: 37,
                                30: 22,
                                41: 23,
                                50: [1, 26],
                                52: [1, 25],
                                53: 24
                            }, {
                                25: [1, 38]
                            }, {
                                18: [2, 48],
                                25: [2, 48],
                                33: [2, 48],
                                39: 39,
                                42: [2, 48],
                                43: [2, 48],
                                44: [2, 48],
                                45: [2, 48],
                                46: [2, 48],
                                50: [2, 48],
                                52: [2, 48]
                            }, {
                                18: [2, 22],
                                25: [2, 22],
                                33: [2, 22],
                                46: [2, 22]
                            }, {
                                18: [2, 35],
                                25: [2, 35],
                                33: [2, 35],
                                42: [2, 35],
                                43: [2, 35],
                                44: [2, 35],
                                45: [2, 35],
                                46: [2, 35],
                                50: [2, 35],
                                52: [2, 35],
                                54: [1, 40]
                            }, {
                                30: 41,
                                50: [1, 26],
                                53: 24
                            }, {
                                18: [2, 37],
                                25: [2, 37],
                                33: [2, 37],
                                42: [2, 37],
                                43: [2, 37],
                                44: [2, 37],
                                45: [2, 37],
                                46: [2, 37],
                                50: [2, 37],
                                52: [2, 37],
                                54: [2, 37]
                            }, {
                                33: [1, 42]
                            }, {
                                20: 43,
                                27: 44,
                                28: [1, 45],
                                29: [2, 40]
                            }, {
                                23: 46,
                                27: 47,
                                28: [1, 45],
                                29: [2, 42]
                            }, {
                                15: [1, 48]
                            }, {
                                25: [2, 46],
                                30: 51,
                                36: 49,
                                38: 50,
                                41: 55,
                                42: [1, 52],
                                43: [1, 53],
                                44: [1, 54],
                                45: [1, 56],
                                47: 57,
                                48: 58,
                                49: 60,
                                50: [1, 59],
                                52: [1, 25],
                                53: 24
                            }, {
                                25: [2, 31],
                                42: [2, 31],
                                43: [2, 31],
                                44: [2, 31],
                                45: [2, 31],
                                50: [2, 31],
                                52: [2, 31]
                            }, {
                                25: [2, 32],
                                42: [2, 32],
                                43: [2, 32],
                                44: [2, 32],
                                45: [2, 32],
                                50: [2, 32],
                                52: [2, 32]
                            }, {
                                25: [2, 33],
                                42: [2, 33],
                                43: [2, 33],
                                44: [2, 33],
                                45: [2, 33],
                                50: [2, 33],
                                52: [2, 33]
                            }, {
                                25: [1, 61]
                            }, {
                                25: [1, 62]
                            }, {
                                18: [1, 63]
                            }, {
                                5: [2, 17],
                                12: [2, 17],
                                13: [2, 17],
                                16: [2, 17],
                                24: [2, 17],
                                26: [2, 17],
                                28: [2, 17],
                                29: [2, 17],
                                31: [2, 17],
                                32: [2, 17],
                                34: [2, 17]
                            }, {
                                18: [2, 50],
                                25: [2, 50],
                                30: 51,
                                33: [2, 50],
                                36: 65,
                                40: 64,
                                41: 55,
                                42: [1, 52],
                                43: [1, 53],
                                44: [1, 54],
                                45: [1, 56],
                                46: [2, 50],
                                47: 66,
                                48: 58,
                                49: 60,
                                50: [1, 59],
                                52: [1, 25],
                                53: 24
                            }, {
                                50: [1, 67]
                            }, {
                                18: [2, 34],
                                25: [2, 34],
                                33: [2, 34],
                                42: [2, 34],
                                43: [2, 34],
                                44: [2, 34],
                                45: [2, 34],
                                46: [2, 34],
                                50: [2, 34],
                                52: [2, 34]
                            }, {
                                5: [2, 18],
                                12: [2, 18],
                                13: [2, 18],
                                16: [2, 18],
                                24: [2, 18],
                                26: [2, 18],
                                28: [2, 18],
                                29: [2, 18],
                                31: [2, 18],
                                32: [2, 18],
                                34: [2, 18]
                            }, {
                                21: 68,
                                29: [1, 69]
                            }, {
                                29: [2, 41]
                            }, {
                                4: 70,
                                6: 3,
                                12: [2, 38],
                                13: [2, 38],
                                16: [2, 38],
                                24: [2, 38],
                                26: [2, 38],
                                29: [2, 38],
                                31: [2, 38],
                                32: [2, 38],
                                34: [2, 38]
                            }, {
                                21: 71,
                                29: [1, 69]
                            }, {
                                29: [2, 43]
                            }, {
                                5: [2, 9],
                                12: [2, 9],
                                13: [2, 9],
                                16: [2, 9],
                                24: [2, 9],
                                26: [2, 9],
                                28: [2, 9],
                                29: [2, 9],
                                31: [2, 9],
                                32: [2, 9],
                                34: [2, 9]
                            }, {
                                25: [2, 44],
                                37: 72,
                                47: 73,
                                48: 58,
                                49: 60,
                                50: [1, 74]
                            }, {
                                25: [1, 75]
                            }, {
                                18: [2, 23],
                                25: [2, 23],
                                33: [2, 23],
                                42: [2, 23],
                                43: [2, 23],
                                44: [2, 23],
                                45: [2, 23],
                                46: [2, 23],
                                50: [2, 23],
                                52: [2, 23]
                            }, {
                                18: [2, 24],
                                25: [2, 24],
                                33: [2, 24],
                                42: [2, 24],
                                43: [2, 24],
                                44: [2, 24],
                                45: [2, 24],
                                46: [2, 24],
                                50: [2, 24],
                                52: [2, 24]
                            }, {
                                18: [2, 25],
                                25: [2, 25],
                                33: [2, 25],
                                42: [2, 25],
                                43: [2, 25],
                                44: [2, 25],
                                45: [2, 25],
                                46: [2, 25],
                                50: [2, 25],
                                52: [2, 25]
                            }, {
                                18: [2, 26],
                                25: [2, 26],
                                33: [2, 26],
                                42: [2, 26],
                                43: [2, 26],
                                44: [2, 26],
                                45: [2, 26],
                                46: [2, 26],
                                50: [2, 26],
                                52: [2, 26]
                            }, {
                                18: [2, 27],
                                25: [2, 27],
                                33: [2, 27],
                                42: [2, 27],
                                43: [2, 27],
                                44: [2, 27],
                                45: [2, 27],
                                46: [2, 27],
                                50: [2, 27],
                                52: [2, 27]
                            }, {
                                17: 76,
                                30: 22,
                                41: 23,
                                50: [1, 26],
                                52: [1, 25],
                                53: 24
                            }, {
                                25: [2, 47]
                            }, {
                                18: [2, 29],
                                25: [2, 29],
                                33: [2, 29],
                                46: [2, 29],
                                49: 77,
                                50: [1, 74]
                            }, {
                                18: [2, 37],
                                25: [2, 37],
                                33: [2, 37],
                                42: [2, 37],
                                43: [2, 37],
                                44: [2, 37],
                                45: [2, 37],
                                46: [2, 37],
                                50: [2, 37],
                                51: [1, 78],
                                52: [2, 37],
                                54: [2, 37]
                            }, {
                                18: [2, 52],
                                25: [2, 52],
                                33: [2, 52],
                                46: [2, 52],
                                50: [2, 52]
                            }, {
                                12: [2, 13],
                                13: [2, 13],
                                16: [2, 13],
                                24: [2, 13],
                                26: [2, 13],
                                28: [2, 13],
                                29: [2, 13],
                                31: [2, 13],
                                32: [2, 13],
                                34: [2, 13]
                            }, {
                                12: [2, 14],
                                13: [2, 14],
                                16: [2, 14],
                                24: [2, 14],
                                26: [2, 14],
                                28: [2, 14],
                                29: [2, 14],
                                31: [2, 14],
                                32: [2, 14],
                                34: [2, 14]
                            }, {
                                12: [2, 10]
                            }, {
                                18: [2, 21],
                                25: [2, 21],
                                33: [2, 21],
                                46: [2, 21]
                            }, {
                                18: [2, 49],
                                25: [2, 49],
                                33: [2, 49],
                                42: [2, 49],
                                43: [2, 49],
                                44: [2, 49],
                                45: [2, 49],
                                46: [2, 49],
                                50: [2, 49],
                                52: [2, 49]
                            }, {
                                18: [2, 51],
                                25: [2, 51],
                                33: [2, 51],
                                46: [2, 51]
                            }, {
                                18: [2, 36],
                                25: [2, 36],
                                33: [2, 36],
                                42: [2, 36],
                                43: [2, 36],
                                44: [2, 36],
                                45: [2, 36],
                                46: [2, 36],
                                50: [2, 36],
                                52: [2, 36],
                                54: [2, 36]
                            }, {
                                5: [2, 11],
                                12: [2, 11],
                                13: [2, 11],
                                16: [2, 11],
                                24: [2, 11],
                                26: [2, 11],
                                28: [2, 11],
                                29: [2, 11],
                                31: [2, 11],
                                32: [2, 11],
                                34: [2, 11]
                            }, {
                                30: 79,
                                50: [1, 26],
                                53: 24
                            }, {
                                29: [2, 15]
                            }, {
                                5: [2, 12],
                                12: [2, 12],
                                13: [2, 12],
                                16: [2, 12],
                                24: [2, 12],
                                26: [2, 12],
                                28: [2, 12],
                                29: [2, 12],
                                31: [2, 12],
                                32: [2, 12],
                                34: [2, 12]
                            }, {
                                25: [1, 80]
                            }, {
                                25: [2, 45]
                            }, {
                                51: [1, 78]
                            }, {
                                5: [2, 20],
                                12: [2, 20],
                                13: [2, 20],
                                16: [2, 20],
                                24: [2, 20],
                                26: [2, 20],
                                28: [2, 20],
                                29: [2, 20],
                                31: [2, 20],
                                32: [2, 20],
                                34: [2, 20]
                            }, {
                                46: [1, 81]
                            }, {
                                18: [2, 53],
                                25: [2, 53],
                                33: [2, 53],
                                46: [2, 53],
                                50: [2, 53]
                            }, {
                                30: 51,
                                36: 82,
                                41: 55,
                                42: [1, 52],
                                43: [1, 53],
                                44: [1, 54],
                                45: [1, 56],
                                50: [1, 26],
                                52: [1, 25],
                                53: 24
                            }, {
                                25: [1, 83]
                            }, {
                                5: [2, 19],
                                12: [2, 19],
                                13: [2, 19],
                                16: [2, 19],
                                24: [2, 19],
                                26: [2, 19],
                                28: [2, 19],
                                29: [2, 19],
                                31: [2, 19],
                                32: [2, 19],
                                34: [2, 19]
                            }, {
                                18: [2, 28],
                                25: [2, 28],
                                33: [2, 28],
                                42: [2, 28],
                                43: [2, 28],
                                44: [2, 28],
                                45: [2, 28],
                                46: [2, 28],
                                50: [2, 28],
                                52: [2, 28]
                            }, {
                                18: [2, 30],
                                25: [2, 30],
                                33: [2, 30],
                                46: [2, 30],
                                50: [2, 30]
                            }, {
                                5: [2, 16],
                                12: [2, 16],
                                13: [2, 16],
                                16: [2, 16],
                                24: [2, 16],
                                26: [2, 16],
                                28: [2, 16],
                                29: [2, 16],
                                31: [2, 16],
                                32: [2, 16],
                                34: [2, 16]
                            }],
                            defaultActions: {
                                4: [2, 1],
                                44: [2, 41],
                                47: [2, 43],
                                57: [2, 47],
                                63: [2, 10],
                                70: [2, 15],
                                73: [2, 45]
                            },
                            parseError: function r(e) {
                                throw new Error(e)
                            },
                            parse: function k(e) {
                                function t() {
                                    var e;
                                    return "number" != typeof (e = n.lexer.lex() || 1) && (e = n.symbols_[e] || e), e
                                }
                                var n = this,
                                    i = [0],
                                    r = [null],
                                    o = [],
                                    a = this.table,
                                    s = "",
                                    l = 0,
                                    u = 0,
                                    c = 0;
                                this.lexer.setInput(e), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, "undefined" == typeof (this.yy.parser = this).lexer.yylloc && (this.lexer.yylloc = {});
                                var d = this.lexer.yylloc;
                                o.push(d);
                                var h = this.lexer.options && this.lexer.options.ranges;
                                "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                                for (var f, p, m, g, y, v, w, b, _, x = {};;) {
                                    if (m = i[i.length - 1], this.defaultActions[m] ? g = this.defaultActions[m] : (null == f && (f = t()), g = a[m] && a[m][f]), void 0 === g || !g.length || !g[0]) {
                                        var S = "";
                                        if (!c) {
                                            for (v in _ = [], a[m]) this.terminals_[v] && 2 < v && _.push("'" + this.terminals_[v] + "'");
                                            S = this.lexer.showPosition ? "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + _.join(", ") + ", got '" + (this.terminals_[f] || f) + "'" : "Parse error on line " + (l + 1) + ": Unexpected " + (1 == f ? "end of input" : "'" + (this.terminals_[f] || f) + "'"), this.parseError(S, {
                                                text: this.lexer.match,
                                                token: this.terminals_[f] || f,
                                                line: this.lexer.yylineno,
                                                loc: d,
                                                expected: _
                                            })
                                        }
                                    }
                                    if (g[0] instanceof Array && 1 < g.length) throw new Error("Parse Error: multiple actions possible at state: " + m + ", token: " + f);
                                    switch (g[0]) {
                                        case 1:
                                            i.push(f), r.push(this.lexer.yytext), o.push(this.lexer.yylloc), i.push(g[1]), f = null, p ? (f = p, p = null) : (u = this.lexer.yyleng, s = this.lexer.yytext, l = this.lexer.yylineno, d = this.lexer.yylloc, 0 < c && c--);
                                            break;
                                        case 2:
                                            if (w = this.productions_[g[1]][1], x.$ = r[r.length - w], x._$ = {
                                                    first_line: o[o.length - (w || 1)].first_line,
                                                    last_line: o[o.length - 1].last_line,
                                                    first_column: o[o.length - (w || 1)].first_column,
                                                    last_column: o[o.length - 1].last_column
                                                }, h && (x._$.range = [o[o.length - (w || 1)].range[0], o[o.length - 1].range[1]]), void 0 !== (y = this.performAction.call(x, s, u, l, this.yy, g[1], r, o))) return y;
                                            w && (i = i.slice(0, -1 * w * 2), r = r.slice(0, -1 * w), o = o.slice(0, -1 * w)), i.push(this.productions_[g[1]][0]), r.push(x.$), o.push(x._$), b = a[i[i.length - 2]][i[i.length - 1]], i.push(b);
                                            break;
                                        case 3:
                                            return !0
                                    }
                                }
                                return !0
                            }
                        },
                        n = {
                            EOF: 1,
                            parseError: function o(e, t) {
                                if (!this.yy.parser) throw new Error(e);
                                this.yy.parser.parseError(e, t)
                            },
                            setInput: function (e) {
                                return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                    first_line: 1,
                                    first_column: 0,
                                    last_line: 1,
                                    last_column: 0
                                }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                            },
                            input: function () {
                                var e = this._input[0];
                                return this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e, e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
                            },
                            unput: function (e) {
                                var t = e.length,
                                    n = e.split(/(?:\r\n?|\n)/g);
                                this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t - 1), this.offset -= t;
                                var i = this.match.split(/(?:\r\n?|\n)/g);
                                this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
                                var r = this.yylloc.range;
                                return this.yylloc = {
                                    first_line: this.yylloc.first_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.first_column,
                                    last_column: n ? (n.length === i.length ? this.yylloc.first_column : 0) + i[i.length - n.length].length - n[0].length : this.yylloc.first_column - t
                                }, this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - t]), this
                            },
                            more: function () {
                                return this._more = !0, this
                            },
                            less: function (e) {
                                this.unput(this.match.slice(e))
                            },
                            pastInput: function () {
                                var e = this.matched.substr(0, this.matched.length - this.match.length);
                                return (20 < e.length ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                            },
                            upcomingInput: function () {
                                var e = this.match;
                                return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (20 < e.length ? "..." : "")).replace(/\n/g, "")
                            },
                            showPosition: function () {
                                var e = this.pastInput(),
                                    t = new Array(e.length + 1).join("-");
                                return e + this.upcomingInput() + "\n" + t + "^"
                            },
                            next: function () {
                                if (this.done) return this.EOF;
                                var e, t, n, i, r;
                                this._input || (this.done = !0), this._more || (this.yytext = "", this.match = "");
                                for (var o = this._currentRules(), a = 0; a < o.length && (!(n = this._input.match(this.rules[o[a]])) || t && !(n[0].length > t[0].length) || (t = n, i = a, this.options.flex)); a++);
                                return t ? ((r = t[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += r.length), this.yylloc = {
                                    first_line: this.yylloc.last_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.last_column,
                                    last_column: r ? r[r.length - 1].length - r[r.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length
                                }, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], e = this.performAction.call(this, this.yy, this, o[i], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), e || void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                    text: "",
                                    token: null,
                                    line: this.yylineno
                                })
                            },
                            lex: function a() {
                                var e = this.next();
                                return void 0 !== e ? e : this.lex()
                            },
                            begin: function l(e) {
                                this.conditionStack.push(e)
                            },
                            popState: function u() {
                                return this.conditionStack.pop()
                            },
                            _currentRules: function c() {
                                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                            },
                            topState: function () {
                                return this.conditionStack[this.conditionStack.length - 2]
                            },
                            pushState: function l(e) {
                                this.begin(e)
                            },
                            options: {},
                            performAction: function d(e, n, t) {
                                function i(e, t) {
                                    return n.yytext = n.yytext.substr(e, n.yyleng - t)
                                }
                                switch (t) {
                                    case 0:
                                        if ("\\\\" === n.yytext.slice(-2) ? (i(0, 1), this.begin("mu")) : "\\" === n.yytext.slice(-1) ? (i(0, 1), this.begin("emu")) : this.begin("mu"), n.yytext) return 12;
                                        break;
                                    case 1:
                                        return 12;
                                    case 2:
                                        return this.popState(), 12;
                                    case 3:
                                        return n.yytext = n.yytext.substr(5, n.yyleng - 9), this.popState(), 15;
                                    case 4:
                                        return 12;
                                    case 5:
                                        return i(0, 4), this.popState(), 13;
                                    case 6:
                                        return 45;
                                    case 7:
                                        return 46;
                                    case 8:
                                        return 16;
                                    case 9:
                                        return this.popState(), this.begin("raw"), 18;
                                    case 10:
                                        return 34;
                                    case 11:
                                        return 24;
                                    case 12:
                                        return 29;
                                    case 13:
                                    case 14:
                                        return this.popState(), 28;
                                    case 15:
                                    case 16:
                                        return 26;
                                    case 17:
                                        return 32;
                                    case 18:
                                        return 31;
                                    case 19:
                                        this.popState(), this.begin("com");
                                        break;
                                    case 20:
                                        return i(3, 5), this.popState(), 13;
                                    case 21:
                                        return 31;
                                    case 22:
                                        return 51;
                                    case 23:
                                    case 24:
                                        return 50;
                                    case 25:
                                        return 54;
                                    case 26:
                                        break;
                                    case 27:
                                        return this.popState(), 33;
                                    case 28:
                                        return this.popState(), 25;
                                    case 29:
                                        return n.yytext = i(1, 2).replace(/\\"/g, '"'), 42;
                                    case 30:
                                        return n.yytext = i(1, 2).replace(/\\'/g, "'"), 42;
                                    case 31:
                                        return 52;
                                    case 32:
                                    case 33:
                                        return 44;
                                    case 34:
                                        return 43;
                                    case 35:
                                        return 50;
                                    case 36:
                                        return n.yytext = i(1, 2), 50;
                                    case 37:
                                        return "INVALID";
                                    case 38:
                                        return 5
                                }
                            },
                            rules: [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/],
                            conditions: {
                                mu: {
                                    rules: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
                                    inclusive: !1
                                },
                                emu: {
                                    rules: [2],
                                    inclusive: !1
                                },
                                com: {
                                    rules: [5],
                                    inclusive: !1
                                },
                                raw: {
                                    rules: [3, 4],
                                    inclusive: !1
                                },
                                INITIAL: {
                                    rules: [0, 1, 38],
                                    inclusive: !0
                                }
                            }
                        };
                    return t.lexer = n, new((e.prototype = t).Parser = e)
                }()
            }(),
            c = function () {
                "use strict";

                function e(e, t) {
                    return {
                        left: "~" === e.charAt(2),
                        right: "~" === t.charAt(t.length - 3)
                    }
                }

                function t(e, t, n, i, r, o) {
                    if (e.sexpr.id.original !== i.path.original) throw new u(e.sexpr.id.original + " doesn't match " + i.path.original, e);
                    var a = n && n.program,
                        s = {
                            left: e.strip.left,
                            right: i.strip.right,
                            openStandalone: h(t.statements),
                            closeStandalone: d((a || t).statements)
                        };
                    if (e.strip.right && f(t.statements, null, !0), a) {
                        var l = n.strip;
                        l.left && p(t.statements, null, !0), l.right && f(a.statements, null, !0), i.strip.left && p(a.statements, null, !0), d(t.statements) && h(a.statements) && (p(t.statements), f(a.statements))
                    } else i.strip.left && p(t.statements, null, !0);
                    return r ? new this.BlockNode(e, a, t, s, o) : new this.BlockNode(e, t, a, s, o)
                }

                function n(e, t) {
                    for (var n = 0, i = e.length; n < i; n++) {
                        var r = e[n],
                            o = r.strip;
                        if (o) {
                            var a = d(e, n, t, "partial" === r.type),
                                s = h(e, n, t),
                                l = o.openStandalone && a,
                                u = o.closeStandalone && s,
                                c = o.inlineStandalone && a && s;
                            o.right && f(e, n, !0), o.left && p(e, n, !0), c && (f(e, n), p(e, n) && "partial" === r.type && (r.indent = /([ \t]+$)/.exec(e[n - 1].original) ? RegExp.$1 : "")), l && (f((r.program || r.inverse).statements), p(e, n)), u && (f(e, n), p((r.inverse || r.program).statements))
                        }
                    }
                    return e
                }

                function d(e, t, n) {
                    t === undefined && (t = e.length);
                    var i = e[t - 1],
                        r = e[t - 2];
                    return i ? "content" === i.type ? (r || !n ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(i.original) : void 0 : n
                }

                function h(e, t, n) {
                    t === undefined && (t = -1);
                    var i = e[t + 1],
                        r = e[t + 2];
                    return i ? "content" === i.type ? (r || !n ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(i.original) : void 0 : n
                }

                function f(e, t, n) {
                    var i = e[null == t ? 0 : t + 1];
                    if (i && "content" === i.type && (n || !i.rightStripped)) {
                        var r = i.string;
                        i.string = i.string.replace(n ? /^\s+/ : /^[ \t]*\r?\n?/, ""), i.rightStripped = i.string !== r
                    }
                }

                function p(e, t, n) {
                    var i = e[null == t ? e.length - 1 : t - 1];
                    if (i && "content" === i.type && (n || !i.leftStripped)) {
                        var r = i.string;
                        return i.string = i.string.replace(n ? /\s+$/ : /[ \t]+$/, ""), i.leftStripped = i.string !== r, i.leftStripped
                    }
                }
                var i = {},
                    u = v;
                return i.stripFlags = e, i.prepareBlock = t, i.prepareProgram = n, i
            }();
        return function (e, t, n, i, r) {
            "use strict";
            var o = g,
                a = y,
                s = n.parser,
                l = n.parse,
                u = i.Compiler,
                c = i.compile,
                d = i.precompile,
                h = r,
                f = o.create,
                p = function () {
                    var n = f();
                    return n.compile = function (e, t) {
                        return c(e, t, n)
                    }, n.precompile = function (e, t) {
                        return d(e, t, n)
                    }, n.AST = a, n.Compiler = u, n.JavaScriptCompiler = h, n.Parser = s, n.parse = l, n
                };
            return (o = p()).create = p, o["default"] = o
        }(0, 0, function () {
            "use strict";

            function e(e) {
                return e.constructor === i.ProgramNode ? e : (n.yy = a, n.parse(e))
            }
            var t = {},
                n = u,
                i = y,
                r = c,
                o = m.extend;
            t.parser = n;
            var a = {};
            return o(a, r, i), t.parse = e, t
        }(), function () {
            "use strict";

            function e() {}

            function t(e, t, n) {
                if (null == e || "string" != typeof e && e.constructor !== n.AST.ProgramNode) throw new l("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + e);
                "data" in (t = t || {}) || (t.data = !0), t.compat && (t.useDepths = !0);
                var i = n.parse(e),
                    r = (new n.Compiler).compile(i, t);
                return (new n.JavaScriptCompiler).compile(r, t)
            }

            function n(i, r, o) {
                function a() {
                    var e = o.parse(i),
                        t = (new o.Compiler).compile(e, r),
                        n = (new o.JavaScriptCompiler).compile(t, r, undefined, !0);
                    return o.template(n)
                }
                if (null == i || "string" != typeof i && i.constructor !== o.AST.ProgramNode) throw new l("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + i);
                var s;
                "data" in (r = r || {}) || (r.data = !0), r.compat && (r.useDepths = !0);
                var e = function (e, t) {
                    return s || (s = a()), s.call(this, e, t)
                };
                return e._setup = function (e) {
                    return s || (s = a()), s._setup(e)
                }, e._child = function (e, t, n) {
                    return s || (s = a()), s._child(e, t, n)
                }, e
            }

            function o(e, t) {
                if (e === t) return !0;
                if (r(e) && r(t) && e.length === t.length) {
                    for (var n = 0; n < e.length; n++)
                        if (!o(e[n], t[n])) return !1;
                    return !0
                }
            }
            var i = {},
                l = v,
                r = m.isArray,
                a = [].slice;
            return (i.Compiler = e).prototype = {
                compiler: e,
                equals: function (e) {
                    var t = this.opcodes.length;
                    if (e.opcodes.length !== t) return !1;
                    for (var n = 0; n < t; n++) {
                        var i = this.opcodes[n],
                            r = e.opcodes[n];
                        if (i.opcode !== r.opcode || !o(i.args, r.args)) return !1
                    }
                    for (t = this.children.length, n = 0; n < t; n++)
                        if (!this.children[n].equals(e.children[n])) return !1;
                    return !0
                },
                guid: 0,
                compile: function (e, t) {
                    this.opcodes = [], this.children = [], this.depths = {
                        list: []
                    }, this.options = t, this.stringParams = t.stringParams, this.trackIds = t.trackIds;
                    var n = this.options.knownHelpers;
                    if (this.options.knownHelpers = {
                            helperMissing: !0,
                            blockHelperMissing: !0,
                            each: !0,
                            "if": !0,
                            unless: !0,
                            "with": !0,
                            log: !0,
                            lookup: !0
                        }, n)
                        for (var i in n) this.options.knownHelpers[i] = n[i];
                    return this.accept(e)
                },
                accept: function (e) {
                    return this[e.type](e)
                },
                program: function (e) {
                    for (var t = e.statements, n = 0, i = t.length; n < i; n++) this.accept(t[n]);
                    return this.isSimple = 1 === i, this.depths.list = this.depths.list.sort(function (e, t) {
                        return e - t
                    }), this
                },
                compileProgram: function (e) {
                    var t, n = (new this.compiler).compile(e, this.options),
                        i = this.guid++;
                    this.usePartial = this.usePartial || n.usePartial;
                    for (var r = 0, o = (this.children[i] = n).depths.list.length; r < o; r++)(t = n.depths.list[r]) < 2 || this.addDepth(t - 1);
                    return i
                },
                block: function (e) {
                    var t = e.mustache,
                        n = e.program,
                        i = e.inverse;
                    n && (n = this.compileProgram(n)), i && (i = this.compileProgram(i));
                    var r = t.sexpr,
                        o = this.classifySexpr(r);
                    "helper" === o ? this.helperSexpr(r, n, i) : "simple" === o ? (this.simpleSexpr(r), this.opcode("pushProgram", n), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("blockValue", r.id.original)) : (this.ambiguousSexpr(r, n, i), this.opcode("pushProgram", n), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
                },
                hash: function (e) {
                    var t, n, i = e.pairs;
                    for (this.opcode("pushHash"), t = 0, n = i.length; t < n; t++) this.pushParam(i[t][1]);
                    for (; t--;) this.opcode("assignToHash", i[t][0]);
                    this.opcode("popHash")
                },
                partial: function (e) {
                    var t = e.partialName;
                    this.usePartial = !0, e.hash ? this.accept(e.hash) : this.opcode("push", "undefined"), e.context ? this.accept(e.context) : (this.opcode("getContext", 0), this.opcode("pushContext")), this.opcode("invokePartial", t.name, e.indent || ""), this.opcode("append")
                },
                content: function (e) {
                    e.string && this.opcode("appendContent", e.string)
                },
                mustache: function (e) {
                    this.sexpr(e.sexpr), e.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
                },
                ambiguousSexpr: function (e, t, n) {
                    var i = e.id,
                        r = i.parts[0],
                        o = null != t || null != n;
                    this.opcode("getContext", i.depth), this.opcode("pushProgram", t), this.opcode("pushProgram", n), this.ID(i), this.opcode("invokeAmbiguous", r, o)
                },
                simpleSexpr: function (e) {
                    var t = e.id;
                    "DATA" === t.type ? this.DATA(t) : t.parts.length ? this.ID(t) : (this.addDepth(t.depth), this.opcode("getContext", t.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
                },
                helperSexpr: function (e, t, n) {
                    var i = this.setupFullMustacheParams(e, t, n),
                        r = e.id,
                        o = r.parts[0];
                    if (this.options.knownHelpers[o]) this.opcode("invokeKnownHelper", i.length, o);
                    else {
                        if (this.options.knownHelpersOnly) throw new l("You specified knownHelpersOnly, but used the unknown helper " + o, e);
                        r.falsy = !0, this.ID(r), this.opcode("invokeHelper", i.length, r.original, r.isSimple)
                    }
                },
                sexpr: function (e) {
                    var t = this.classifySexpr(e);
                    "simple" === t ? this.simpleSexpr(e) : "helper" === t ? this.helperSexpr(e) : this.ambiguousSexpr(e)
                },
                ID: function (e) {
                    this.addDepth(e.depth), this.opcode("getContext", e.depth), e.parts[0] ? this.opcode("lookupOnContext", e.parts, e.falsy, e.isScoped) : this.opcode("pushContext")
                },
                DATA: function (e) {
                    this.options.data = !0, this.opcode("lookupData", e.id.depth, e.id.parts)
                },
                STRING: function (e) {
                    this.opcode("pushString", e.string)
                },
                NUMBER: function (e) {
                    this.opcode("pushLiteral", e.number)
                },
                BOOLEAN: function (e) {
                    this.opcode("pushLiteral", e.bool)
                },
                comment: function () {},
                opcode: function (e) {
                    this.opcodes.push({
                        opcode: e,
                        args: a.call(arguments, 1)
                    })
                },
                addDepth: function (e) {
                    0 !== e && (this.depths[e] || (this.depths[e] = !0, this.depths.list.push(e)))
                },
                classifySexpr: function (e) {
                    var t = e.isHelper,
                        n = e.eligibleHelper,
                        i = this.options;
                    if (n && !t) {
                        var r = e.id.parts[0];
                        i.knownHelpers[r] ? t = !0 : i.knownHelpersOnly && (n = !1)
                    }
                    return t ? "helper" : n ? "ambiguous" : "simple"
                },
                pushParams: function (e) {
                    for (var t = 0, n = e.length; t < n; t++) this.pushParam(e[t])
                },
                pushParam: function (e) {
                    this.stringParams ? (e.depth && this.addDepth(e.depth), this.opcode("getContext", e.depth || 0), this.opcode("pushStringParam", e.stringModeValue, e.type), "sexpr" === e.type && this.sexpr(e)) : (this.trackIds && this.opcode("pushId", e.type, e.idName || e.stringModeValue), this.accept(e))
                },
                setupFullMustacheParams: function (e, t, n) {
                    var i = e.params;
                    return this.pushParams(i), this.opcode("pushProgram", t), this.opcode("pushProgram", n), e.hash ? this.hash(e.hash) : this.opcode("emptyHash"), i
                }
            }, i.precompile = t, i.compile = n, i
        }(), function (e, t) {
            "use strict";

            function l(e) {
                this.value = e
            }

            function n() {}
            var i = e.COMPILER_REVISION,
                r = e.REVISION_CHANGES,
                d = t;
            n.prototype = {
                nameLookup: function (e, t) {
                    return n.isValidJavaScriptVariableName(t) ? e + "." + t : e + "['" + t + "']"
                },
                depthedLookup: function (e) {
                    return this.aliases.lookup = "this.lookup", 'lookup(depths, "' + e + '")'
                },
                compilerInfo: function () {
                    return [i, r[i]]
                },
                appendToBuffer: function (e) {
                    return this.environment.isSimple ? "return " + e + ";" : {
                        appendToBuffer: !0,
                        content: e,
                        toString: function () {
                            return "buffer += " + e + ";"
                        }
                    }
                },
                initializeBuffer: function () {
                    return this.quotedString("")
                },
                namespace: "Handlebars",
                compile: function (e, t, n, i) {
                    this.environment = e, this.options = t, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !i, this.name = this.environment.name, this.isChild = !!n, this.context = n || {
                        programs: [],
                        environments: []
                    }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = {
                        list: []
                    }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.compileChildren(e, t), this.useDepths = this.useDepths || e.depths.list.length || this.options.compat;
                    var r, o, a, s = e.opcodes;
                    for (o = 0, a = s.length; o < a; o++) this[(r = s[o]).opcode].apply(this, r.args);
                    if (this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new d("Compile completed with content left on stack");
                    var l = this.createFunctionContext(i);
                    if (this.isChild) return l;
                    var u = {
                            compiler: this.compilerInfo(),
                            main: l
                        },
                        c = this.context.programs;
                    for (o = 0, a = c.length; o < a; o++) c[o] && (u[o] = c[o]);
                    return this.environment.usePartial && (u.usePartial = !0), this.options.data && (u.useData = !0), this.useDepths && (u.useDepths = !0), this.options.compat && (u.compat = !0), i || (u.compiler = JSON.stringify(u.compiler), u = this.objectLiteral(u)), u
                },
                preamble: function () {
                    this.lastContext = 0, this.source = []
                },
                createFunctionContext: function (e) {
                    var t = "",
                        n = this.stackVars.concat(this.registers.list);
                    for (var i in 0 < n.length && (t += ", " + n.join(", ")), this.aliases) this.aliases.hasOwnProperty(i) && (t += ", " + i + "=" + this.aliases[i]);
                    var r = ["depth0", "helpers", "partials", "data"];
                    this.useDepths && r.push("depths");
                    var o = this.mergeSource(t);
                    return e ? (r.push(o), Function.apply(this, r)) : "function(" + r.join(",") + ") {\n  " + o + "}"
                },
                mergeSource: function (e) {
                    for (var t, n, i = "", r = !this.forceBuffer, o = 0, a = this.source.length; o < a; o++) {
                        var s = this.source[o];
                        s.appendToBuffer ? t = t ? t + "\n    + " + s.content : s.content : (t && (i ? i += "buffer += " + t + ";\n  " : (n = !0, i = t + ";\n  "), t = undefined), i += s + "\n  ", this.environment.isSimple || (r = !1))
                    }
                    return r ? !t && i || (i += "return " + (t || '""') + ";\n") : (e += ", buffer = " + (n ? "" : this.initializeBuffer()), i += t ? "return buffer + " + t + ";\n" : "return buffer;\n"), e && (i = "var " + e.substring(2) + (n ? "" : ";\n  ") + i), i
                },
                blockValue: function (e) {
                    this.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                    var t = [this.contextName(0)];
                    this.setupParams(e, 0, t);
                    var n = this.popStack();
                    t.splice(1, 0, n), this.push("blockHelperMissing.call(" + t.join(", ") + ")")
                },
                ambiguousBlockValue: function () {
                    this.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                    var e = [this.contextName(0)];
                    this.setupParams("", 0, e, !0), this.flushInline();
                    var t = this.topStack();
                    e.splice(1, 0, t), this.pushSource("if (!" + this.lastHelper + ") { " + t + " = blockHelperMissing.call(" + e.join(", ") + "); }")
                },
                appendContent: function (e) {
                    this.pendingContent && (e = this.pendingContent + e), this.pendingContent = e
                },
                append: function () {
                    this.flushInline();
                    var e = this.popStack();
                    this.pushSource("if (" + e + " != null) { " + this.appendToBuffer(e) + " }"), this.environment.isSimple && this.pushSource("else { " + this.appendToBuffer("''") + " }")
                },
                appendEscaped: function () {
                    this.aliases.escapeExpression = "this.escapeExpression", this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
                },
                getContext: function (e) {
                    this.lastContext = e
                },
                pushContext: function () {
                    this.pushStackLiteral(this.contextName(this.lastContext))
                },
                lookupOnContext: function (n, i, e) {
                    var r = 0,
                        t = n.length;
                    for (e || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(n[r++])); r < t; r++) this.replaceStack(function (e) {
                        var t = this.nameLookup(e, n[r], "context");
                        return i ? " && " + t : " != null ? " + t + " : " + e
                    })
                },
                lookupData: function (e, t) {
                    e ? this.pushStackLiteral("this.data(data, " + e + ")") : this.pushStackLiteral("data");
                    for (var n = t.length, i = 0; i < n; i++) this.replaceStack(function (e) {
                        return " && " + this.nameLookup(e, t[i], "data")
                    })
                },
                resolvePossibleLambda: function () {
                    this.aliases.lambda = "this.lambda", this.push("lambda(" + this.popStack() + ", " + this.contextName(0) + ")")
                },
                pushStringParam: function (e, t) {
                    this.pushContext(), this.pushString(t), "sexpr" !== t && ("string" == typeof e ? this.pushString(e) : this.pushStackLiteral(e))
                },
                emptyHash: function () {
                    this.pushStackLiteral("{}"), this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}"))
                },
                pushHash: function () {
                    this.hash && this.hashes.push(this.hash), this.hash = {
                        values: [],
                        types: [],
                        contexts: [],
                        ids: []
                    }
                },
                popHash: function () {
                    var e = this.hash;
                    this.hash = this.hashes.pop(), this.trackIds && this.push("{" + e.ids.join(",") + "}"), this.stringParams && (this.push("{" + e.contexts.join(",") + "}"), this.push("{" + e.types.join(",") + "}")), this.push("{\n    " + e.values.join(",\n    ") + "\n  }")
                },
                pushString: function (e) {
                    this.pushStackLiteral(this.quotedString(e))
                },
                push: function (e) {
                    return this.inlineStack.push(e), e
                },
                pushLiteral: function (e) {
                    this.pushStackLiteral(e)
                },
                pushProgram: function (e) {
                    null != e ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null)
                },
                invokeHelper: function (e, t, n) {
                    this.aliases.helperMissing = "helpers.helperMissing";
                    var i = this.popStack(),
                        r = this.setupHelper(e, t),
                        o = (n ? r.name + " || " : "") + i + " || helperMissing";
                    this.push("((" + o + ").call(" + r.callParams + "))")
                },
                invokeKnownHelper: function (e, t) {
                    var n = this.setupHelper(e, t);
                    this.push(n.name + ".call(" + n.callParams + ")")
                },
                invokeAmbiguous: function (e, t) {
                    this.aliases.functionType = '"function"', this.aliases.helperMissing = "helpers.helperMissing", this.useRegister("helper");
                    var n = this.popStack();
                    this.emptyHash();
                    var i = this.setupHelper(0, e, t),
                        r = this.lastHelper = this.nameLookup("helpers", e, "helper");
                    this.push("((helper = (helper = " + r + " || " + n + ") != null ? helper : helperMissing" + (i.paramsInit ? "),(" + i.paramsInit : "") + "),(typeof helper === functionType ? helper.call(" + i.callParams + ") : helper))")
                },
                invokePartial: function (e, t) {
                    var n = [this.nameLookup("partials", e, "partial"), "'" + t + "'", "'" + e + "'", this.popStack(), this.popStack(), "helpers", "partials"];
                    this.options.data ? n.push("data") : this.options.compat && n.push("undefined"), this.options.compat && n.push("depths"), this.push("this.invokePartial(" + n.join(", ") + ")")
                },
                assignToHash: function (e) {
                    var t, n, i, r = this.popStack();
                    this.trackIds && (i = this.popStack()), this.stringParams && (n = this.popStack(), t = this.popStack());
                    var o = this.hash;
                    t && o.contexts.push("'" + e + "': " + t), n && o.types.push("'" + e + "': " + n), i && o.ids.push("'" + e + "': " + i), o.values.push("'" + e + "': (" + r + ")")
                },
                pushId: function (e, t) {
                    "ID" === e || "DATA" === e ? this.pushString(t) : "sexpr" === e ? this.pushStackLiteral("true") : this.pushStackLiteral("null")
                },
                compiler: n,
                compileChildren: function (e, t) {
                    for (var n, i, r = e.children, o = 0, a = r.length; o < a; o++) {
                        n = r[o], i = new this.compiler;
                        var s = this.matchExistingProgram(n);
                        null == s ? (this.context.programs.push(""), s = this.context.programs.length, n.index = s, n.name = "program" + s, this.context.programs[s] = i.compile(n, t, this.context, !this.precompile), this.context.environments[s] = n, this.useDepths = this.useDepths || i.useDepths) : (n.index = s, n.name = "program" + s)
                    }
                },
                matchExistingProgram: function (e) {
                    for (var t = 0, n = this.context.environments.length; t < n; t++) {
                        var i = this.context.environments[t];
                        if (i && i.equals(e)) return t
                    }
                },
                programExpression: function (e) {
                    var t = this.environment.children[e],
                        n = (t.depths.list, this.useDepths),
                        i = [t.index, "data"];
                    return n && i.push("depths"), "this.program(" + i.join(", ") + ")"
                },
                useRegister: function (e) {
                    this.registers[e] || (this.registers[e] = !0, this.registers.list.push(e))
                },
                pushStackLiteral: function (e) {
                    return this.push(new l(e))
                },
                pushSource: function (e) {
                    this.pendingContent && (this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))), this.pendingContent = undefined), e && this.source.push(e)
                },
                pushStack: function (e) {
                    this.flushInline();
                    var t = this.incrStack();
                    return this.pushSource(t + " = " + e + ";"), this.compileStack.push(t), t
                },
                replaceStack: function (e) {
                    var t, n, i, r = "";
                    this.isInline();
                    if (!this.isInline()) throw new d("replaceStack on non-inline");
                    var o = this.popStack(!0);
                    if (o instanceof l) r = t = o.value, i = !0;
                    else {
                        var a = (n = !this.stackSlot) ? this.incrStack() : this.topStackName();
                        r = "(" + this.push(a) + " = " + o + ")", t = this.topStack()
                    }
                    var s = e.call(this, t);
                    i || this.popStack(), n && this.stackSlot--, this.push("(" + r + s + ")")
                },
                incrStack: function () {
                    return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
                },
                topStackName: function () {
                    return "stack" + this.stackSlot
                },
                flushInline: function () {
                    var e = this.inlineStack;
                    if (e.length) {
                        this.inlineStack = [];
                        for (var t = 0, n = e.length; t < n; t++) {
                            var i = e[t];
                            i instanceof l ? this.compileStack.push(i) : this.pushStack(i)
                        }
                    }
                },
                isInline: function () {
                    return this.inlineStack.length
                },
                popStack: function (e) {
                    var t = this.isInline(),
                        n = (t ? this.inlineStack : this.compileStack).pop();
                    if (!e && n instanceof l) return n.value;
                    if (!t) {
                        if (!this.stackSlot) throw new d("Invalid stack pop");
                        this.stackSlot--
                    }
                    return n
                },
                topStack: function () {
                    var e = this.isInline() ? this.inlineStack : this.compileStack,
                        t = e[e.length - 1];
                    return t instanceof l ? t.value : t
                },
                contextName: function (e) {
                    return this.useDepths && e ? "depths[" + e + "]" : "depth" + e
                },
                quotedString: function (e) {
                    return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
                },
                objectLiteral: function (e) {
                    var t = [];
                    for (var n in e) e.hasOwnProperty(n) && t.push(this.quotedString(n) + ":" + e[n]);
                    return "{" + t.join(",") + "}"
                },
                setupHelper: function (e, t, n) {
                    var i = [];
                    return {
                        params: i,
                        paramsInit: this.setupParams(t, e, i, n),
                        name: this.nameLookup("helpers", t, "helper"),
                        callParams: [this.contextName(0)].concat(i).join(", ")
                    }
                },
                setupOptions: function (e, t, n) {
                    var i, r, o, a = {},
                        s = [],
                        l = [],
                        u = [];
                    a.name = this.quotedString(e), a.hash = this.popStack(), this.trackIds && (a.hashIds = this.popStack()), this.stringParams && (a.hashTypes = this.popStack(), a.hashContexts = this.popStack()), r = this.popStack(), ((o = this.popStack()) || r) && (o || (o = "this.noop"), r || (r = "this.noop"), a.fn = o, a.inverse = r);
                    for (var c = t; c--;) i = this.popStack(), n[c] = i, this.trackIds && (u[c] = this.popStack()), this.stringParams && (l[c] = this.popStack(), s[c] = this.popStack());
                    return this.trackIds && (a.ids = "[" + u.join(",") + "]"), this.stringParams && (a.types = "[" + l.join(",") + "]", a.contexts = "[" + s.join(",") + "]"), this.options.data && (a.data = "data"), a
                },
                setupParams: function (e, t, n, i) {
                    var r = this.objectLiteral(this.setupOptions(e, t, n));
                    return i ? (this.useRegister("options"), n.push("options"), "options=" + r) : (n.push(r), "")
                }
            };
            for (var o = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), a = n.RESERVED_WORDS = {}, s = 0, u = o.length; s < u; s++) a[o[s]] = !0;
            return n.isValidJavaScriptVariableName = function (e) {
                return !n.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e)
            }, n
        }(s, v))
    }),
    function () {
        var e, t, n, i;
        for (n in i = " KMGTPEZYXWVU", t = {
                spinner: function (e) {
                    return '<div class="spinner ' + e + '">\n\t<div class="sk-spinner sk-spinner-wave">\n\t\t<div class="sk-rect1"></div>\n\t\t<div class="sk-rect2"></div>\n\t\t<div class="sk-rect3"></div>\n\t\t<div class="sk-rect4"></div>\n\t\t<div class="sk-rect5"></div>\n\t</div>\n</div>'
                },
                humanizeBytes: function (e) {
                    var t;
                    return e <= 0 ? "-" : (t = Math.min(Math.floor(Math.log(e) / Math.log(1024)), 12), Math.round(10 * e / Math.pow(1024, t)) / 10 + " " + i.charAt(t) + "B")
                },
                imageUrl: function (e, t, n) {
                    return null == n && (n = !1), window.zImages.imageUrl(e, t, n)
                },
                toDataAttr: function (e) {
                    var t, n, i, r;
                    for (i in n = [], e) "function" != typeof (r = e[i]) && (t = "data-" + i.replace(/[|&;$%@"<>()+,]/g, "").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase(), "string" == typeof r && (r = r.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")), n.push(t + '="' + r + '"'));
                    return n.join(" ")
                },
                I18n: function (e, t) {
                    return "undefined" != typeof I18n && null !== I18n ? I18n.t(e, t.hash) : e
                }
            }) e = t[n], Handlebars.registerHelper(n, $.app[n] = e)
    }.call(this),
    function () {
        $.fn.addAtIndex = function (n, i) {
            return i < 0 && (i = 0), this.each(function () {
                var e, t;
                return (e = (t = $(this)).children().eq(i)).length ? e.before(n) : t.append(n)
            })
        }
    }.call(this),
    function () {
        $.curCSS = $.css
    }.call(this),
    function () {
        var c = [].slice;
        $.fn.ensureVisible = function (e) {
            var r, o, t, n, a, i, s, l, u;
            if (this.is(":visible")) return e();
            for (u = function () {
                    var e, t, n, i;
                    for (i = [], e = 0, t = (n = c.call(this.parents().get().reverse()).concat(c.call(this.get()))).length; e < t; e++) o = n[e], (r = $(o)).is(":hidden") && (a = r.attr("style") || "", r.attr("style", a + "display: block !important;"), i.push([a, r]));
                    return i
                }.call(this), l = e(), t = 0, n = u.length; t < n; t++) i = (s = u[t])[0], (r = s[1]).attr("style", i);
            return l
        }
    }.call(this),
    function () {
        $.fn.gigSalad = function () {
            var i, t, e;
            return e = function (e) {
                var t, n;
                return n = $("<" + e + ' style="display: none;">'), $("#usersite-container").append(n), t = n.css("color"), n.remove(), i(t)
            }, i = function (e) {
                return -1 === e.search("rgb") ? e : (e = e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/), "#" + t(e[1]) + t(e[2]) + t(e[3]))
            }, t = function (e) {
                return ("0" + parseInt(e).toString(16)).slice(-2)
            }, {
                getElementColor: e
            }
        }
    }.call(this),
    function () {
        $.fn.gigSaladQuoteForm = function () {
            var i, t;
            if (i = function (e) {
                    var t, n;
                    return $("#s-gigsalad-quote")[0] ? "undefined" != typeof GsContactForm ? e() : setTimeout(1, function () {
                        return i(e)
                    }) : ((t = document.createElement("script")).src = "https://www.gigsalad.com/js/quote_widget.min.js", t.id = "s-gigsalad-quote", t.onload = function () {
                        return e()
                    }, (n = document.getElementsByTagName("script")[0]).parentNode.insertBefore(t, n))
                }, t = $(this).data("gs-path")) return i(function () {
                var e;
                return (e = new GsContactForm).initialize({
                    path: t,
                    textColor: $.fn.gigSalad().getElementColor("p"),
                    linkColor: $.fn.gigSalad().getElementColor("a"),
                    backgroundColor: "transparent"
                }), e.display()
            })
        }
    }.call(this),
    function () {
        $.fn.gigSaladReview = function () {
            var e, i, t;
            if (i = function (e) {
                    var t, n;
                    return $("#s-gigsalad-review")[0] ? "undefined" != typeof GsReviewsWidget ? e() : setTimeout(1, function () {
                        return i(e)
                    }) : ((t = document.createElement("script")).src = "https://www.gigsalad.com/js/gigsalad-reviews-widget.min.js", t.id = "s-gigsalad-review", t.onload = function () {
                        return e()
                    }, (n = document.getElementsByTagName("script")[0]).parentNode.insertBefore(t, n))
                }, t = $(this).data("gs-path"), e = $(this).data("gs-count"), t) return i(function () {
                return new GsReviewsWidget({
                    path: t,
                    count: e,
                    textColor: $.fn.gigSalad().getElementColor("p"),
                    linkColor: $.fn.gigSalad().getElementColor("a"),
                    backgroundColor: "transparent"
                }).display()
            })
        }
    }.call(this),
    function () {
        $.fn.oneForAll = function (t, n) {
            var i;
            return (i = $(this)).on(t, function (e) {
                return i.off(t), n(e)
            })
        }
    }.call(this),
    function () {
        $.fn.presence = function () {
            if (this.length) return this
        }
    }.call(this),
    function () {
        jQuery.fn.toggleVisibility = function (e) {
            return null == e && (e = "hidden" === this.css("visibility")), this.css("visibility", e ? "visible" : "hidden")
        }
    }.call(this),
    function () {
        var t;
        $.zoogleFlash = function (e, t) {
            var n;
            return null == t && (t = "notice"), t += " alert " + ("notice" === t ? "positive alert-success" : "negative alert-warning"), n = $("<section/>").addClass(t).append("<p>" + e.replace(/\n/g, "<br/>") + "</p>"), $(".zoogle_flash").append(n)
        }, t = function () {
            return $(".zoogle_flash section").slideUp()
        }, $(document).on("mouseup", t), $(function () {
            try {
                return $("textarea.rich_text").ckeditorGet().on("focus", t)
            } catch (e) {
                e
            }
        })
    }.call(this),
    function () {
        $.fn.zoogleSlideshow = function (x, S) {
            return this.each(function (e, t) {
                var n, i, a, s, r, o, l, u, c, d, h, f, p, m, g, y, v, w, b, _;
                return a = {
                    "display-time": {
                        slow: 6e3,
                        medium: 4e3,
                        fast: 2e3,
                        "default": "medium"
                    },
                    "transition-speed": {
                        slow: "1s",
                        medium: "0.5s",
                        fast: "0.2s",
                        "default": "medium"
                    },
                    "transition-type": {
                        fade: "fade",
                        "slide-left": "slideLeft",
                        "slide-right": "slideRight",
                        "default": "fade"
                    }
                }, n = $(t), i = $(".null"), s = {}, l = function () {
                    var r, o;
                    return o = {}, r = n.attr("class"), $.each(a, function (e, t) {
                        var n, i;
                        return i = (n = r.match(e + "-([^\\s]+)")) && t[n[1]] ? t[n[1]] : t[t["default"]], o[$.camelCase(e)] = i
                    }), s = $.extend({
                        slidesSelector: ".page-photo",
                        cssClass: "zoogle-slideshow",
                        siblingsToIgnore: ".edit-page-media-overlay,.page-photos-expose"
                    }, o, S), i = n.find(s.slidesSelector)
                }, b = function () {
                    if (_(), (i = n.find(s.slidesSelector)).removeClass("hide selected"), r(), 1 < i.length) return d(), w(), n.addClass(s.cssClass)
                }, _ = function () {
                    return clearInterval(n.data("intervalId")), n.removeData("intervalId"), g(), n.removeClass(s.cssClass)
                }, w = function () {
                    var e, t;
                    return e = 1e3 * parseFloat(s.transitionSpeed), t = setInterval(p, s.displayTime + e), n.data("intervalId", t)
                }, d = function () {
                    return i.css({
                        opacity: 0,
                        zIndex: 1
                    }), y(0), i.eq(0).css({
                        opacity: 1,
                        zIndex: 2
                    })
                }, g = function () {
                    return i.css({
                        opacity: 1,
                        zIndex: 1,
                        transform: "none",
                        transition: "none"
                    }), m(), y(0)
                }, r = function () {
                    if (h()) return m(), i.eq(i.length - 1).clone().css({
                        position: "static",
                        visibility: "hidden",
                        display: "block"
                    }).addClass("slideshow-placeholder").insertBefore(i.eq(0))
                }, h = function () {
                    return i.eq(0).is("img")
                }, m = function () {
                    return n.find(".slideshow-placeholder").remove()
                }, p = function () {
                    var e, t;
                    if (f()) {
                        switch (e = i.eq(u()), y(u() + 1), (t = i.eq(u())).siblings().not(s.siblingsToIgnore).css({
                            zIndex: 1,
                            transition: "none"
                        }), s.transitionType) {
                            case "slideLeft":
                            case "slideRight":
                                v(e, t);
                                break;
                            default:
                                o(e, t)
                        }
                        return setTimeout(function () {
                            return i.eq(u()).siblings().not(s.siblingsToIgnore).css({
                                opacity: 0,
                                transform: "none",
                                transition: "none"
                            })
                        }, c())
                    }
                }, v = function (e, t) {
                    var n;
                    return t.css({
                        opacity: 1,
                        zIndex: 1
                    }), n = 100 * ("slideLeft" === s.transitionType ? -1 : 1), e.css({
                        transition: "transform " + s.transitionSpeed + " ease-in-out",
                        transform: "translateX(" + n + "%)",
                        zIndex: 2
                    })
                }, o = function (e, t) {
                    return t.css({
                        transition: "opacity " + s.transitionSpeed + " ease-in-out",
                        opacity: 1,
                        zIndex: 2
                    })
                }, c = function () {
                    return 1e3 * parseFloat(s.transitionSpeed) + s.displayTime / 2
                }, u = function () {
                    return n.data("currentSlideIdx")
                }, y = function (e) {
                    return e >= i.length && (e = 0), n.data("currentSlideIdx", e)
                }, f = function () {
                    return "hidden" !== window.document.visibilityState
                }, "stop" === x ? _() : ("reset" === x && _(), l(), b()), this
            })
        }
    }.call(this),
    function (a, d, f) {
        function p(e, t) {
            return typeof e === t
        }

        function e() {
            var e, t, n, i, r, o;
            for (var a in x)
                if (x.hasOwnProperty(a)) {
                    if (e = [], (t = x[a]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                        for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                    for (i = p(t.fn, "function") ? t.fn() : t.fn, r = 0; r < e.length; r++) 1 === (o = e[r].split(".")).length ? S[o[0]] = i : (!S[o[0]] || S[o[0]] instanceof Boolean || (S[o[0]] = new Boolean(S[o[0]])), S[o[0]][o[1]] = i), _.push((i ? "" : "no-") + o.join("-"))
                }
        }

        function o(e) {
            var t = T.className,
                n = S._config.classPrefix || "";
            if (C && (t = t.baseVal), S._config.enableJSClass) {
                var i = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
                t = t.replace(i, "$1" + n + "js$2")
            }
            S._config.enableClasses && (t += " " + n + e.join(" " + n), C ? T.className.baseVal = t : T.className = t)
        }

        function s(e, t) {
            if ("object" == typeof e)
                for (var n in e) E(e, n) && s(n, e[n]);
            else {
                var i = (e = e.toLowerCase()).split("."),
                    r = S[i[0]];
                if (2 == i.length && (r = r[i[1]]), void 0 !== r) return S;
                t = "function" == typeof t ? t() : t, 1 == i.length ? S[i[0]] = t : (!S[i[0]] || S[i[0]] instanceof Boolean || (S[i[0]] = new Boolean(S[i[0]])), S[i[0]][i[1]] = t), o([(t && 0 != t ? "" : "no-") + i.join("-")]), S._trigger(e, t)
            }
            return S
        }

        function m(e) {
            return "function" != typeof d.createElement ? d.createElement(e) : C ? d.createElementNS.call(d, "http://www.w3.org/2000/svg", e) : d.createElement.apply(d, arguments)
        }

        function g(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function h() {
            var e = d.body;
            return e || ((e = m(C ? "svg" : "body")).fake = !0), e
        }

        function r(e, t, n, i) {
            var r, o, a, s, l = "modernizr",
                u = m("div"),
                c = h();
            if (parseInt(n, 10))
                for (; n--;)(a = m("div")).id = i ? i[n] : l + (n + 1), u.appendChild(a);
            return (r = m("style")).type = "text/css", r.id = "s" + l, (c.fake ? c : u).appendChild(r), c.appendChild(u), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(d.createTextNode(e)), u.id = l, c.fake && (c.style.background = "", c.style.overflow = "hidden", s = T.style.overflow, T.style.overflow = "hidden", T.appendChild(c)), o = t(u, e), c.fake ? (c.parentNode.removeChild(c), T.style.overflow = s, T.offsetHeight) : u.parentNode.removeChild(u), !!o
        }

        function y(e) {
            return e.replace(/([a-z])-([a-z])/g, function (e, t, n) {
                return t + n.toUpperCase()
            }).replace(/^-/, "")
        }

        function l(e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }

        function u(e, t, n) {
            var i;
            for (var r in e)
                if (e[r] in t) return !1 === n ? e[r] : p(i = t[e[r]], "function") ? l(i, n || t) : i;
            return !1
        }

        function c(e) {
            return e.replace(/([A-Z])/g, function (e, t) {
                return "-" + t.toLowerCase()
            }).replace(/^ms-/, "-ms-")
        }

        function v(e, t) {
            var n = e.length;
            if ("CSS" in a && "supports" in a.CSS) {
                for (; n--;)
                    if (a.CSS.supports(c(e[n]), t)) return !0;
                return !1
            }
            if ("CSSSupportsRule" in a) {
                for (var i = []; n--;) i.push("(" + c(e[n]) + ":" + t + ")");
                return r("@supports (" + (i = i.join(" or ")) + ") { #modernizr { position: absolute; } }", function (e) {
                    return "absolute" == getComputedStyle(e, null).position
                })
            }
            return f
        }

        function w(e, t, n, i) {
            function r() {
                a && (delete Q.style, delete Q.modElem)
            }
            if (i = !p(i, "undefined") && i, !p(n, "undefined")) {
                var o = v(e, n);
                if (!p(o, "undefined")) return o
            }
            for (var a, s, l, u, c, d = ["modernizr", "tspan"]; !Q.style;) a = !0, Q.modElem = m(d.shift()), Q.style = Q.modElem.style;
            for (l = e.length, s = 0; s < l; s++)
                if (u = e[s], c = Q.style[u], g(u, "-") && (u = y(u)), Q.style[u] !== f) {
                    if (i || p(n, "undefined")) return r(), "pfx" != t || u;
                    try {
                        Q.style[u] = n
                    } catch (h) {}
                    if (Q.style[u] != c) return r(), "pfx" != t || u
                } return r(), !1
        }

        function i(e, t, n, i, r) {
            var o = e.charAt(0).toUpperCase() + e.slice(1),
                a = (e + " " + U.join(o + " ") + o).split(" ");
            return p(t, "string") || p(t, "undefined") ? w(a, t, i, r) : u(a = (e + " " + $.join(o + " ") + o).split(" "), t, n)
        }

        function b(e, t, n) {
            return i(e, f, f, t, n)
        }
        var _ = [],
            x = [],
            t = {
                _version: "3.3.1",
                _config: {
                    classPrefix: "",
                    enableClasses: !0,
                    enableJSClass: !0,
                    usePrefixes: !0
                },
                _q: [],
                on: function (e, t) {
                    var n = this;
                    setTimeout(function () {
                        t(n[e])
                    }, 0)
                },
                addTest: function (e, t, n) {
                    x.push({
                        name: e,
                        fn: t,
                        options: n
                    })
                },
                addAsyncTest: function (e) {
                    x.push({
                        name: null,
                        fn: e
                    })
                }
            },
            S = function () {};
        S.prototype = t, (S = new S).addTest("applicationcache", "applicationCache" in a), S.addTest("history", function () {
            var e = navigator.userAgent;
            return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && (a.history && "pushState" in a.history)
        }), S.addTest("postmessage", "postMessage" in a), S.addTest("websockets", "WebSocket" in a && 2 === a.WebSocket.CLOSING), S.addTest("localstorage", function () {
            var e = "modernizr";
            try {
                return localStorage.setItem(e, e), localStorage.removeItem(e), !0
            } catch (t) {
                return !1
            }
        }), S.addTest("sessionstorage", function () {
            var e = "modernizr";
            try {
                return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
            } catch (t) {
                return !1
            }
        }), S.addTest("websqldatabase", "openDatabase" in a), S.addTest("webworkers", "Worker" in a);
        var k = t._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
        t._prefixes = k;
        var T = d.documentElement,
            C = "svg" === T.nodeName.toLowerCase();
        C || function (e, a) {
            function n(e, t) {
                var n = e.createElement("p"),
                    i = e.getElementsByTagName("head")[0] || e.documentElement;
                return n.innerHTML = "x<style>" + t + "</style>", i.insertBefore(n.lastChild, i.firstChild)
            }

            function s() {
                var e = w.elements;
                return "string" == typeof e ? e.split(" ") : e
            }

            function t(e, t) {
                var n = w.elements;
                "string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), w.elements = n + " " + e, u(t)
            }

            function l(e) {
                var t = v[e[g]];
                return t || (t = {}, y++, e[g] = y, v[y] = t), t
            }

            function i(e, t, n) {
                return t || (t = a), d ? t.createElement(e) : (n || (n = l(t)), !(i = n.cache[e] ? n.cache[e].cloneNode() : m.test(e) ? (n.cache[e] = n.createElem(e)).cloneNode() : n.createElem(e)).canHaveChildren || p.test(e) || i.tagUrn ? i : n.frag.appendChild(i));
                var i
            }

            function r(e, t) {
                if (e || (e = a), d) return e.createDocumentFragment();
                for (var n = (t = t || l(e)).frag.cloneNode(), i = 0, r = s(), o = r.length; i < o; i++) n.createElement(r[i]);
                return n
            }

            function o(t, n) {
                n.cache || (n.cache = {}, n.createElem = t.createElement, n.createFrag = t.createDocumentFragment, n.frag = n.createFrag()), t.createElement = function (e) {
                    return w.shivMethods ? i(e, t, n) : n.createElem(e)
                }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + s().join().replace(/[\w\-:]+/g, function (e) {
                    return n.createElem(e), n.frag.createElement(e), 'c("' + e + '")'
                }) + ");return n}")(w, n.frag)
            }

            function u(e) {
                e || (e = a);
                var t = l(e);
                return !w.shivCSS || c || t.hasCSS || (t.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), d || o(e, t), e
            }
            var c, d, h = "3.7.3",
                f = e.html5 || {},
                p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                m = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                g = "_html5shiv",
                y = 0,
                v = {};
            ! function () {
                try {
                    var e = a.createElement("a");
                    e.innerHTML = "<xyz></xyz>", c = "hidden" in e, d = 1 == e.childNodes.length || function () {
                        a.createElement("a");
                        var e = a.createDocumentFragment();
                        return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                    }()
                } catch (t) {
                    d = c = !0
                }
            }();
            var w = {
                elements: f.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
                version: h,
                shivCSS: !1 !== f.shivCSS,
                supportsUnknownElements: d,
                shivMethods: !1 !== f.shivMethods,
                type: "default",
                shivDocument: u,
                createElement: i,
                createDocumentFragment: r,
                addElements: t
            };
            e.html5 = w, u(a), "object" == typeof module && module.exports && (module.exports = w)
        }(void 0 !== a ? a : this, d);
        var E, n, A = "Moz O ms Webkit",
            $ = t._config.usePrefixes ? A.toLowerCase().split(" ") : [];
        t._domPrefixes = $, n = {}.hasOwnProperty, E = p(n, "undefined") || p(n.call, "undefined") ? function (e, t) {
            return t in e && p(e.constructor.prototype[t], "undefined")
        } : function (e, t) {
            return n.call(e, t)
        }, t._l = {}, t.on = function (e, t) {
            this._l[e] || (this._l[e] = []), this._l[e].push(t), S.hasOwnProperty(e) && setTimeout(function () {
                S._trigger(e, S[e])
            }, 0)
        }, t._trigger = function (e, t) {
            if (this._l[e]) {
                var n = this._l[e];
                setTimeout(function () {
                    var e;
                    for (e = 0; e < n.length; e++)(0, n[e])(t)
                }, 0), delete this._l[e]
            }
        }, S._q.push(function () {
            t.addTest = s
        });
        var M = function () {
            function e(e, t) {
                var n;
                return !!e && (t && "string" != typeof t || (t = m(t || "div")), !(n = (e = "on" + e) in t) && i && (t.setAttribute || (t = m("div")), t.setAttribute(e, ""), n = "function" == typeof t[e], t[e] !== f && (t[e] = f), t.removeAttribute(e)), n)
            }
            var i = !("onblur" in d.documentElement);
            return e
        }();
        t.hasEvent = M, S.addTest("hashchange", function () {
            return !1 !== M("hashchange", a) && (d.documentMode === f || 7 < d.documentMode)
        }), S.addTest("audio", function () {
            var e = m("audio"),
                t = !1;
            try {
                (t = !!e.canPlayType) && ((t = new Boolean(t)).ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), t.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (n) {}
            return t
        }), S.addTest("canvas", function () {
            var e = m("canvas");
            return !(!e.getContext || !e.getContext("2d"))
        }), S.addTest("canvastext", function () {
            return !1 !== S.canvas && "function" == typeof m("canvas").getContext("2d").fillText
        }), S.addTest("video", function () {
            var e = m("video"),
                t = !1;
            try {
                (t = !!e.canPlayType) && ((t = new Boolean(t)).ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
            } catch (n) {}
            return t
        }), S.addTest("multiplebgs", function () {
            var e = m("a").style;
            return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background)
        }), S.addTest("opacity", function () {
            var e = m("a").style;
            return e.cssText = k.join("opacity:.55;"), /^0.55$/.test(e.opacity)
        }), S.addTest("fileinput", function () {
            if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return !1;
            var e = m("input");
            return e.type = "file", !e.disabled
        });
        var L = m("input"),
            P = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),
            I = {};
        S.input = function (e) {
            for (var t = 0, n = e.length; t < n; t++) I[e[t]] = !!(e[t] in L);
            return I.list && (I.list = !(!m("datalist") || !a.HTMLDataListElement)), I
        }(P);
        var D = "search tel url email datetime date month week time datetime-local number range color".split(" "),
            O = {};
        S.inputtypes = function (e) {
            for (var t, n, i, r = e.length, o = "1)", a = 0; a < r; a++) L.setAttribute("type", t = e[a]), (i = "text" !== L.type && "style" in L) && (L.value = o, L.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(t) && L.style.WebkitAppearance !== f ? (T.appendChild(L), i = (n = d.defaultView).getComputedStyle && "textfield" !== n.getComputedStyle(L, null).WebkitAppearance && 0 !== L.offsetHeight, T.removeChild(L)) : /^(search|tel)$/.test(t) || (i = /^(url|email)$/.test(t) ? L.checkValidity && !1 === L.checkValidity() : L.value != o)), O[e[a]] = !!i;
            return O
        }(D);
        var N = "CSS" in a && "supports" in a.CSS,
            j = "supportsCSS" in a;
        S.addTest("supports", N || j), S.addTest("hsla", function () {
            var e = m("a").style;
            return e.cssText = "background-color:hsla(120,40%,100%,.5)", g(e.backgroundColor, "rgba") || g(e.backgroundColor, "hsla")
        });
        var z, R = (z = a.matchMedia || a.msMatchMedia) ? function (e) {
            var t = z(e);
            return t && t.matches || !1
        } : function (e) {
            var t = !1;
            return r("@media " + e + " { #modernizr { position: absolute; } }", function (e) {
                t = "absolute" == (a.getComputedStyle ? a.getComputedStyle(e, null) : e.currentStyle).position
            }), t
        };
        t.mq = R;
        var H, F, q, W, B, Y = t.testStyles = r;
        S.addTest("touchevents", function () {
            var t;
            if ("ontouchstart" in a || a.DocumentTouch && d instanceof DocumentTouch) t = !0;
            else {
                var e = ["@media (", k.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
                Y(e, function (e) {
                    t = 9 === e.offsetTop
                })
            }
            return t
        }), (H = navigator.userAgent, F = H.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1), q = H.match(/w(eb)?osbrowser/gi), W = H.match(/windows phone/gi) && H.match(/iemobile\/([0-9])+/gi) && 9 <= parseFloat(RegExp.$1), B = F < 533 && H.match(/android/gi), q || B || W) ? S.addTest("fontface", !1) : Y('@font-face {font-family:"font";src:url("https://")}', function (e, t) {
            var n = d.getElementById("smodernizr"),
                i = n.sheet || n.styleSheet,
                r = i ? i.cssRules && i.cssRules[0] ? i.cssRules[0].cssText : i.cssText || "" : "",
                o = /src/i.test(r) && 0 === r.indexOf(t.split(" ")[0]);
            S.addTest("fontface", o)
        }), Y('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function (e) {
            S.addTest("generatedcontent", 7 <= e.offsetHeight)
        }), Y("#modernizr { height: 50vh; }", function (e) {
            var t = parseInt(a.innerHeight / 2, 10),
                n = parseInt((a.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).height, 10);
            S.addTest("cssvhunit", n == t)
        }), Y("#modernizr { width: 50vw; }", function (e) {
            var t = parseInt(a.innerWidth / 2, 10),
                n = parseInt((a.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).width, 10);
            S.addTest("cssvwunit", n == t)
        });
        var U = t._config.usePrefixes ? A.split(" ") : [];
        t._cssomPrefixes = U;
        var V = function (e) {
            var t, n = k.length,
                i = a.CSSRule;
            if (void 0 === i) return f;
            if (!e) return !1;
            if ((t = (e = e.replace(/^@/, "")).replace(/-/g, "_").toUpperCase() + "_RULE") in i) return "@" + e;
            for (var r = 0; r < n; r++) {
                var o = k[r];
                if (o.toUpperCase() + "_" + t in i) return "@-" + o.toLowerCase() + "-" + e
            }
            return !1
        };
        t.atRule = V;
        var G = {
            elem: m("modernizr")
        };
        S._q.push(function () {
            delete G.elem
        });
        var Q = {
            style: G.elem.style
        };
        S._q.unshift(function () {
            delete Q.style
        });
        var J = t.testProp = function (e, t, n) {
            return w([e], f, t, n)
        };
        S.addTest("textshadow", J("textShadow", "1px 1px")), t.testAllProps = i, t.testAllProps = b, S.addTest("cssanimations", b("animationName", "a", !0)), S.addTest("backgroundsize", b("backgroundSize", "100%", !0)), S.addTest("bgsizecover", b("backgroundSize", "cover")), S.addTest("borderimage", b("borderImage", "url() 1", !0)), S.addTest("borderradius", b("borderRadius", "0px", !0)), S.addTest("boxshadow", b("boxShadow", "1px 1px", !0)), S.addTest("boxsizing", b("boxSizing", "border-box", !0) && (d.documentMode === f || 7 < d.documentMode)),
            function () {
                S.addTest("csscolumns", function () {
                    var e = !1,
                        t = b("columnCount");
                    try {
                        (e = !!t) && (e = new Boolean(e))
                    } catch (n) {}
                    return e
                });
                for (var e, t, n = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], i = 0; i < n.length; i++) e = n[i].toLowerCase(), t = b("column" + n[i]), "breakbefore" !== e && "breakafter" !== e && "breakinside" != e || (t = t || b(n[i])), S.addTest("csscolumns." + e, t)
            }(), S.addTest("cssfilters", function () {
                if (S.supports) return b("filter", "blur(2px)");
                var e = m("a");
                return e.style.cssText = k.join("filter:blur(2px); "), !!e.style.length && (d.documentMode === f || 9 < d.documentMode)
            }), S.addTest("flexbox", b("flexBasis", "1px", !0)), S.addTest("flexboxlegacy", b("boxDirection", "reverse", !0)), S.addTest("cssreflections", b("boxReflect", "above", !0)), S.addTest("csstransforms", function () {
                return -1 === navigator.userAgent.indexOf("Android 2.") && b("transform", "scale(1)", !0)
            }), S.addTest("csstransforms3d", function () {
                var t = !!b("perspective", "1px", !0),
                    e = S._config.usePrefixes;
                if (t && (!e || "webkitPerspective" in T.style)) {
                    var n, i = "#modernizr{width:0;height:0}";
                    S.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", e && (n += ",(-webkit-transform-3d)")), Y(i + (n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}"), function (e) {
                        t = 7 === e.offsetWidth && 18 === e.offsetHeight
                    })
                }
                return t
            }), S.addTest("csstransitions", b("transition", "all", !0));
        var Z, K = t.prefixed = function (e, t, n) {
            return 0 === e.indexOf("@") ? V(e) : (-1 != e.indexOf("-") && (e = y(e)), t ? i(e, t, n) : i(e, "pfx"))
        };
        try {
            Z = K("indexedDB", a)
        } catch (ee) {}
        S.addTest("indexeddb", !!Z), Z && S.addTest("indexeddb.deletedatabase", "deleteDatabase" in Z), S.addTest("backgroundblendmode", K("backgroundBlendMode", "text")), e(), o(_), delete t.addTest, delete t.addAsyncTest;
        for (var X = 0; X < S._q.length; X++) S._q[X]();
        a.Modernizr = S
    }(window, document),
    function () {
        var e = [].indexOf || function (e) {
            for (var t = 0, n = this.length; t < n; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
        Modernizr.addTest("ios", function () {
            return /iPod|iPhone|iPad/i.test(navigator.userAgent)
        }), Modernizr.addTest("ie", function () {
            return /msie|trident|edge/i.test(navigator.userAgent)
        }), Modernizr.addTest("ie10", function () {
            return /MSIE 10/i.test(navigator.appVersion)
        }), Modernizr.addTest("ie11", function () {
            return /Trident.*rv[ :]*11\./i.test(navigator.userAgent)
        }), Modernizr.addTest("safari", function () {
            return /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)
        }), Modernizr.addTest("android", function () {
            return /Android/i.test(navigator.userAgent)
        }), Modernizr.addTest("iframed", function () {
            return window.self !== window.top
        }), Modernizr.addTest("hidpi", function () {
            var e;
            return e = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)", 1 < window.devicePixelRatio || window.matchMedia && window.matchMedia(e).matches
        }), Modernizr.addTest("microsofttablet", function () {
            return 0 <= e.call(window, "ontouchstart") || 0 < navigator.msMaxTouchPoints
        }), Modernizr.touchevents = Modernizr.touchevents || Modernizr.microsofttablet, Modernizr.microsofttablet && document.querySelector("html").classList.add("touchevents")
    }.call(this), document.createElement("picture"), $(document).on("refresh", function () {
        picturefill()
    }),
    function () {
        $(document).ready(function () {
            return $("body").on("click", ".popup-on-click", function (e) {
                var t, n;
                return n = $(this).data("width"), t = $(this).data("height"), window.open($(this).attr("href"), "popup", "width=" + n + ",height=" + t), e.preventDefault()
            })
        })
    }.call(this), $(document).ready(function () {
        var a = function a(e) {
            var t, n;
            return n = e.artist ? I18n.t("global.share_dialog.by_artist", {
                artist: e.artist
            }) : e.byline ? "<strong>" + e.byline + "</strong>" : "", t = '<section class="dialog dialog-share"><div class="share_desc"><div>' + e.title + '<br><span class="byline">' + n + '</span></div></div><div class="actions"><ul class="share_icons"><li class="facebook"><a href="' + e.fb_url + '" class="popup-on-click" data-width="550" data-height="357"><div class="share_icon"><span class="icon-facebook"></span></div><div class="share_text">' + I18n.t("global.share_dialog.share_button_facebook") + '</div></a></li><li class="twitter"><a href="' + e.twitter_url + '" class="popup-on-click" data-width="685" data-height="246"><div class="share_icon"><span class="icon-twitter"></span></div><div class="share_text">' + I18n.t("global.share_dialog.share_button_twitter") + '</div></a></li><li class="email"><a href="' + e.mailto_url + '" class="popup-on-click" target="_blank" rel="noopener"><div class="share_icon"><span class="icon-envelope"></span></div><div class="share_text">' + I18n.t("global.share_dialog.share_button_email") + '</div></a></li><li class="permalink">' + I18n.t("global.share_dialog.share_link_label") + '<br /><input type="text" value="' + e.url + '" class="select-on-focus" readonly="true" /></li>', e.embed !== undefined && (t = t + '<li class="embed">' + I18n.t("global.share_dialog.share_embed_label") + ": <span class='hint'><small>" + I18n.t("global.share_dialog.share_embed_hint", {
                type: e.type
            }) + '</small></span><br /><textarea class="select-on-focus" readonly="true">' + e.embed + "</textarea></li>"), t += "</ul></div></section>"
        };
        $(document).on("click", ".select-on-focus", function () {
            $(this).select()
        }).on("click", ".zoogle-share", function (e) {
            var t = $(this).data(),
                n = encodeURIComponent(t.title),
                i = {
                    body: t.url
                },
                r = {
                    href: t.url,
                    app_id: t.fbAppId,
                    display: "popup"
                },
                o = {
                    url: t.url,
                    text: t.text
                };
            t.twitterUrl && (o.url = t.twitterUrl), e.preventDefault(), t.fb_url = "https://www.facebook.com/dialog/share?" + $.param(r), t.twitter_url = "https://twitter.com/share?" + $.param(o), t.mailto_url = "mailto:?subject=" + n + "&" + $.param(i), $.featherlight({
                html: a(t)
            }).resize()
        })
    }),
    function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
    }(this, function () {
        "use strict";

        function u() {
            return gi.apply(null, arguments)
        }

        function e(e) {
            gi = e
        }

        function a(e) {
            return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
        }

        function s(e) {
            return null != e && "[object Object]" === Object.prototype.toString.call(e)
        }

        function l(e) {
            var t;
            for (t in e) return !1;
            return !0
        }

        function c(e) {
            return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
        }

        function r(e) {
            return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
        }

        function n(e, t) {
            var n, i = [];
            for (n = 0; n < e.length; ++n) i.push(t(e[n], n));
            return i
        }

        function d(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }

        function h(e, t) {
            for (var n in t) d(t, n) && (e[n] = t[n]);
            return d(t, "toString") && (e.toString = t.toString), d(t, "valueOf") && (e.valueOf = t.valueOf), e
        }

        function f(e, t, n, i) {
            return yt(e, t, n, i, !0).utc()
        }

        function t() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1,
                parsedDateParts: [],
                meridiem: null
            }
        }

        function p(e) {
            return null == e._pf && (e._pf = t()), e._pf
        }

        function m(e) {
            if (null == e._isValid) {
                var t = p(e),
                    n = yi.call(t.parsedDateParts, function (e) {
                        return null != e
                    }),
                    i = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
                if (e._strict && (i = i && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && t.bigHour === undefined), null != Object.isFrozen && Object.isFrozen(e)) return i;
                e._isValid = i
            }
            return e._isValid
        }

        function i(e) {
            var t = f(NaN);
            return null != e ? h(p(t), e) : p(t).userInvalidated = !0, t
        }

        function o(e) {
            return void 0 === e
        }

        function g(e, t) {
            var n, i, r;
            if (o(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), o(t._i) || (e._i = t._i), o(t._f) || (e._f = t._f), o(t._l) || (e._l = t._l), o(t._strict) || (e._strict = t._strict), o(t._tzm) || (e._tzm = t._tzm), o(t._isUTC) || (e._isUTC = t._isUTC), o(t._offset) || (e._offset = t._offset), o(t._pf) || (e._pf = p(t)), o(t._locale) || (e._locale = t._locale), 0 < vi.length)
                for (n in vi) o(r = t[i = vi[n]]) || (e[i] = r);
            return e
        }

        function y(e) {
            g(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === wi && (wi = !0, u.updateOffset(this), wi = !1)
        }

        function v(e) {
            return e instanceof y || null != e && null != e._isAMomentObject
        }

        function w(e) {
            return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
        }

        function b(e) {
            var t = +e,
                n = 0;
            return 0 !== t && isFinite(t) && (n = w(t)), n
        }

        function _(e, t, n) {
            var i, r = Math.min(e.length, t.length),
                o = Math.abs(e.length - t.length),
                a = 0;
            for (i = 0; i < r; i++)(n && e[i] !== t[i] || !n && b(e[i]) !== b(t[i])) && a++;
            return a + o
        }

        function x(e) {
            !1 === u.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
        }

        function S(o, a) {
            var s = !0;
            return h(function (e) {
                if (null != u.deprecationHandler && u.deprecationHandler(null, o), s) {
                    for (var t, n = [], i = 0; i < arguments.length; i++) {
                        if (t = "", "object" == typeof arguments[i]) {
                            for (var r in t += "\n[" + i + "] ", e) t += r + ": " + arguments[0][r] + ", ";
                            t = t.slice(0, -2)
                        } else t = arguments[i];
                        n.push(t)
                    }
                    x(o + "\nArguments: " + Array.prototype.slice.call(n).join("") + "\n" + (new Error).stack), s = !1
                }
                return a.apply(this, arguments)
            }, a)
        }

        function k(e, t) {
            null != u.deprecationHandler && u.deprecationHandler(e, t), bi[e] || (x(t), bi[e] = !0)
        }

        function T(e) {
            return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
        }

        function C(e) {
            var t, n;
            for (n in e) T(t = e[n]) ? this[n] = t : this["_" + n] = t;
            this._config = e, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        }

        function E(e, t) {
            var n, i = h({}, e);
            for (n in t) d(t, n) && (s(e[n]) && s(t[n]) ? (i[n] = {}, h(i[n], e[n]), h(i[n], t[n])) : null != t[n] ? i[n] = t[n] : delete i[n]);
            for (n in e) d(e, n) && !d(t, n) && s(e[n]) && (i[n] = h({}, i[n]));
            return i
        }

        function A(e) {
            null != e && this.set(e)
        }

        function $(e, t, n) {
            var i = this._calendar[e] || this._calendar.sameElse;
            return T(i) ? i.call(t, n) : i
        }

        function M(e) {
            var t = this._longDateFormat[e],
                n = this._longDateFormat[e.toUpperCase()];
            return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function (e) {
                return e.slice(1)
            }), this._longDateFormat[e])
        }

        function L() {
            return this._invalidDate
        }

        function P(e) {
            return this._ordinal.replace("%d", e)
        }

        function I(e, t, n, i) {
            var r = this._relativeTime[n];
            return T(r) ? r(e, t, n, i) : r.replace(/%d/i, e)
        }

        function D(e, t) {
            var n = this._relativeTime[0 < e ? "future" : "past"];
            return T(n) ? n(t) : n.replace(/%s/i, t)
        }

        function O(e, t) {
            var n = e.toLowerCase();
            Ai[n] = Ai[n + "s"] = Ai[t] = e
        }

        function N(e) {
            return "string" == typeof e ? Ai[e] || Ai[e.toLowerCase()] : undefined
        }

        function j(e) {
            var t, n, i = {};
            for (n in e) d(e, n) && (t = N(n)) && (i[t] = e[n]);
            return i
        }

        function z(e, t) {
            $i[e] = t
        }

        function R(e) {
            var t = [];
            for (var n in e) t.push({
                unit: n,
                priority: $i[n]
            });
            return t.sort(function (e, t) {
                return e.priority - t.priority
            }), t
        }

        function H(t, n) {
            return function (e) {
                return null != e ? (q(this, t, e), u.updateOffset(this, n), this) : F(this, t)
            }
        }

        function F(e, t) {
            return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
        }

        function q(e, t, n) {
            e.isValid() && e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
        }

        function W(e) {
            return T(this[e = N(e)]) ? this[e]() : this
        }

        function B(e, t) {
            if ("object" == typeof e)
                for (var n = R(e = j(e)), i = 0; i < n.length; i++) this[n[i].unit](e[n[i].unit]);
            else if (T(this[e = N(e)])) return this[e](t);
            return this
        }

        function Y(e, t, n) {
            var i = "" + Math.abs(e),
                r = t - i.length;
            return (0 <= e ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i
        }

        function U(e, t, n, i) {
            var r = i;
            "string" == typeof i && (r = function () {
                return this[i]()
            }), e && (Ii[e] = r), t && (Ii[t[0]] = function () {
                return Y(r.apply(this, arguments), t[1], t[2])
            }), n && (Ii[n] = function () {
                return this.localeData().ordinal(r.apply(this, arguments), e)
            })
        }

        function V(e) {
            return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
        }

        function G(i) {
            var e, r, o = i.match(Mi);
            for (e = 0, r = o.length; e < r; e++) Ii[o[e]] ? o[e] = Ii[o[e]] : o[e] = V(o[e]);
            return function (e) {
                var t, n = "";
                for (t = 0; t < r; t++) n += o[t] instanceof Function ? o[t].call(e, i) : o[t];
                return n
            }
        }

        function Q(e, t) {
            return e.isValid() ? (t = J(t, e.localeData()), Pi[t] = Pi[t] || G(t), Pi[t](e)) : e.localeData().invalidDate()
        }

        function J(e, t) {
            function n(e) {
                return t.longDateFormat(e) || e
            }
            var i = 5;
            for (Li.lastIndex = 0; 0 <= i && Li.test(e);) e = e.replace(Li, n), Li.lastIndex = 0, i -= 1;
            return e
        }

        function Z(e, t, n) {
            Zi[e] = T(t) ? t : function (e) {
                return e && n ? n : t
            }
        }

        function K(e, t) {
            return d(Zi, e) ? Zi[e](t._strict, t._locale) : new RegExp(X(e))
        }

        function X(e) {
            return ee(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, i, r) {
                return t || n || i || r
            }))
        }

        function ee(e) {
            return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function te(e, n) {
            var t, i = n;
            for ("string" == typeof e && (e = [e]), c(n) && (i = function (e, t) {
                    t[n] = b(e)
                }), t = 0; t < e.length; t++) Ki[e[t]] = i
        }

        function ne(e, r) {
            te(e, function (e, t, n, i) {
                n._w = n._w || {}, r(e, n._w, n, i)
            })
        }

        function ie(e, t, n) {
            null != t && d(Ki, e) && Ki[e](t, n._a, n, e)
        }

        function re(e, t) {
            return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
        }

        function oe(e, t) {
            return e ? a(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || ur).test(t) ? "format" : "standalone"][e.month()] : this._months
        }

        function ae(e, t) {
            return e ? a(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[ur.test(t) ? "format" : "standalone"][e.month()] : this._monthsShort
        }

        function se(e, t, n) {
            var i, r, o, a = e.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i) o = f([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(o, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(o, "").toLocaleLowerCase();
            return n ? "MMM" === t ? -1 !== (r = lr.call(this._shortMonthsParse, a)) ? r : null : -1 !== (r = lr.call(this._longMonthsParse, a)) ? r : null : "MMM" === t ? -1 !== (r = lr.call(this._shortMonthsParse, a)) ? r : -1 !== (r = lr.call(this._longMonthsParse, a)) ? r : null : -1 !== (r = lr.call(this._longMonthsParse, a)) ? r : -1 !== (r = lr.call(this._shortMonthsParse, a)) ? r : null
        }

        function le(e, t, n) {
            var i, r, o;
            if (this._monthsParseExact) return se.call(this, e, t, n);
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
                if (r = f([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (o = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[i] = new RegExp(o.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[i].test(e)) return i;
                if (n && "MMM" === t && this._shortMonthsParse[i].test(e)) return i;
                if (!n && this._monthsParse[i].test(e)) return i
            }
        }

        function ue(e, t) {
            var n;
            if (!e.isValid()) return e;
            if ("string" == typeof t)
                if (/^\d+$/.test(t)) t = b(t);
                else if (!c(t = e.localeData().monthsParse(t))) return e;
            return n = Math.min(e.date(), re(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e
        }

        function ce(e) {
            return null != e ? (ue(this, e), u.updateOffset(this, !0), this) : F(this, "Month")
        }

        function de() {
            return re(this.year(), this.month())
        }

        function he(e) {
            return this._monthsParseExact ? (d(this, "_monthsRegex") || pe.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (d(this, "_monthsShortRegex") || (this._monthsShortRegex = hr), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        }

        function fe(e) {
            return this._monthsParseExact ? (d(this, "_monthsRegex") || pe.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (d(this, "_monthsRegex") || (this._monthsRegex = fr), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
        }

        function pe() {
            function e(e, t) {
                return t.length - e.length
            }
            var t, n, i = [],
                r = [],
                o = [];
            for (t = 0; t < 12; t++) n = f([2e3, t]), i.push(this.monthsShort(n, "")), r.push(this.months(n, "")), o.push(this.months(n, "")), o.push(this.monthsShort(n, ""));
            for (i.sort(e), r.sort(e), o.sort(e), t = 0; t < 12; t++) i[t] = ee(i[t]), r[t] = ee(r[t]);
            for (t = 0; t < 24; t++) o[t] = ee(o[t]);
            this._monthsRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")
        }

        function me(e) {
            return ge(e) ? 366 : 365
        }

        function ge(e) {
            return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
        }

        function ye() {
            return ge(this.year())
        }

        function ve(e, t, n, i, r, o, a) {
            var s = new Date(e, t, n, i, r, o, a);
            return e < 100 && 0 <= e && isFinite(s.getFullYear()) && s.setFullYear(e), s
        }

        function we(e) {
            var t = new Date(Date.UTC.apply(null, arguments));
            return e < 100 && 0 <= e && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e), t
        }

        function be(e, t, n) {
            var i = 7 + t - n;
            return -((7 + we(e, 0, i).getUTCDay() - t) % 7) + i - 1
        }

        function _e(e, t, n, i, r) {
            var o, a, s = 1 + 7 * (t - 1) + (7 + n - i) % 7 + be(e, i, r);
            return s <= 0 ? a = me(o = e - 1) + s : s > me(e) ? (o = e + 1, a = s - me(e)) : (o = e, a = s), {
                year: o,
                dayOfYear: a
            }
        }

        function xe(e, t, n) {
            var i, r, o = be(e.year(), t, n),
                a = Math.floor((e.dayOfYear() - o - 1) / 7) + 1;
            return a < 1 ? i = a + Se(r = e.year() - 1, t, n) : a > Se(e.year(), t, n) ? (i = a - Se(e.year(), t, n), r = e.year() + 1) : (r = e.year(), i = a), {
                week: i,
                year: r
            }
        }

        function Se(e, t, n) {
            var i = be(e, t, n),
                r = be(e + 1, t, n);
            return (me(e) - i + r) / 7
        }

        function ke(e) {
            return xe(e, this._week.dow, this._week.doy).week
        }

        function Te() {
            return this._week.dow
        }

        function Ce() {
            return this._week.doy
        }

        function Ee(e) {
            var t = this.localeData().week(this);
            return null == e ? t : this.add(7 * (e - t), "d")
        }

        function Ae(e) {
            var t = xe(this, 1, 4).week;
            return null == e ? t : this.add(7 * (e - t), "d")
        }

        function $e(e, t) {
            return "string" != typeof e ? e : isNaN(e) ? "number" == typeof (e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10)
        }

        function Me(e, t) {
            return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
        }

        function Le(e, t) {
            return e ? a(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : this._weekdays
        }

        function Pe(e) {
            return e ? this._weekdaysShort[e.day()] : this._weekdaysShort
        }

        function Ie(e) {
            return e ? this._weekdaysMin[e.day()] : this._weekdaysMin
        }

        function De(e, t, n) {
            var i, r, o, a = e.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i) o = f([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(o, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(o, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(o, "").toLocaleLowerCase();
            return n ? "dddd" === t ? -1 !== (r = lr.call(this._weekdaysParse, a)) ? r : null : "ddd" === t ? -1 !== (r = lr.call(this._shortWeekdaysParse, a)) ? r : null : -1 !== (r = lr.call(this._minWeekdaysParse, a)) ? r : null : "dddd" === t ? -1 !== (r = lr.call(this._weekdaysParse, a)) ? r : -1 !== (r = lr.call(this._shortWeekdaysParse, a)) ? r : -1 !== (r = lr.call(this._minWeekdaysParse, a)) ? r : null : "ddd" === t ? -1 !== (r = lr.call(this._shortWeekdaysParse, a)) ? r : -1 !== (r = lr.call(this._weekdaysParse, a)) ? r : -1 !== (r = lr.call(this._minWeekdaysParse, a)) ? r : null : -1 !== (r = lr.call(this._minWeekdaysParse, a)) ? r : -1 !== (r = lr.call(this._weekdaysParse, a)) ? r : -1 !== (r = lr.call(this._shortWeekdaysParse, a)) ? r : null
        }

        function Oe(e, t, n) {
            var i, r, o;
            if (this._weekdaysParseExact) return De.call(this, e, t, n);
            for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
                if (r = f([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(r, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[i] || (o = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[i] = new RegExp(o.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[i].test(e)) return i;
                if (n && "ddd" === t && this._shortWeekdaysParse[i].test(e)) return i;
                if (n && "dd" === t && this._minWeekdaysParse[i].test(e)) return i;
                if (!n && this._weekdaysParse[i].test(e)) return i
            }
        }

        function Ne(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e ? (e = $e(e, this.localeData()), this.add(e - t, "d")) : t
        }

        function je(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == e ? t : this.add(e - t, "d")
        }

        function ze(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
                var t = Me(e, this.localeData());
                return this.day(this.day() % 7 ? t : t - 7)
            }
            return this.day() || 7
        }

        function Re(e) {
            return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || qe.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (d(this, "_weekdaysRegex") || (this._weekdaysRegex = wr), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        }

        function He(e) {
            return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || qe.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (d(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = br), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        }

        function Fe(e) {
            return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || qe.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (d(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = _r), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        }

        function qe() {
            function e(e, t) {
                return t.length - e.length
            }
            var t, n, i, r, o, a = [],
                s = [],
                l = [],
                u = [];
            for (t = 0; t < 7; t++) n = f([2e3, 1]).day(t), i = this.weekdaysMin(n, ""), r = this.weekdaysShort(n, ""), o = this.weekdays(n, ""), a.push(i), s.push(r), l.push(o), u.push(i), u.push(r), u.push(o);
            for (a.sort(e), s.sort(e), l.sort(e), u.sort(e), t = 0; t < 7; t++) s[t] = ee(s[t]), l[t] = ee(l[t]), u[t] = ee(u[t]);
            this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
        }

        function We() {
            return this.hours() % 12 || 12
        }

        function Be() {
            return this.hours() || 24
        }

        function Ye(e, t) {
            U(e, 0, 0, function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), t)
            })
        }

        function Ue(e, t) {
            return t._meridiemParse
        }

        function Ve(e) {
            return "p" === (e + "").toLowerCase().charAt(0)
        }

        function Ge(e, t, n) {
            return 11 < e ? n ? "pm" : "PM" : n ? "am" : "AM"
        }

        function Qe(e) {
            return e ? e.toLowerCase().replace("_", "-") : e
        }

        function Je(e) {
            for (var t, n, i, r, o = 0; o < e.length;) {
                for (t = (r = Qe(e[o]).split("-")).length, n = (n = Qe(e[o + 1])) ? n.split("-") : null; 0 < t;) {
                    if (i = Ze(r.slice(0, t).join("-"))) return i;
                    if (n && n.length >= t && _(r, n, !0) >= t - 1) break;
                    t--
                }
                o++
            }
            return null
        }

        function Ze(e) {
            var t = null;
            if (!Cr[e] && "undefined" != typeof module && module && module.exports) try {
                t = xr._abbr, require("./locale/" + e), Ke(t)
            } catch (n) {}
            return Cr[e]
        }

        function Ke(e, t) {
            var n;
            return e && (n = o(t) ? tt(e) : Xe(e, t)) && (xr = n), xr._abbr
        }

        function Xe(e, t) {
            if (null !== t) {
                var n = Tr;
                if (t.abbr = e, null != Cr[e]) k("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = Cr[e]._config;
                else if (null != t.parentLocale) {
                    if (null == Cr[t.parentLocale]) return Er[t.parentLocale] || (Er[t.parentLocale] = []), Er[t.parentLocale].push({
                        name: e,
                        config: t
                    }), null;
                    n = Cr[t.parentLocale]._config
                }
                return Cr[e] = new A(E(n, t)), Er[e] && Er[e].forEach(function (e) {
                    Xe(e.name, e.config)
                }), Ke(e), Cr[e]
            }
            return delete Cr[e], null
        }

        function et(e, t) {
            if (null != t) {
                var n, i = Tr;
                null != Cr[e] && (i = Cr[e]._config), (n = new A(t = E(i, t))).parentLocale = Cr[e], Cr[e] = n, Ke(e)
            } else null != Cr[e] && (null != Cr[e].parentLocale ? Cr[e] = Cr[e].parentLocale : null != Cr[e] && delete Cr[e]);
            return Cr[e]
        }

        function tt(e) {
            var t;
            if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return xr;
            if (!a(e)) {
                if (t = Ze(e)) return t;
                e = [e]
            }
            return Je(e)
        }

        function nt() {
            return _i(Cr)
        }

        function it(e) {
            var t, n = e._a;
            return n && -2 === p(e).overflow && (t = n[er] < 0 || 11 < n[er] ? er : n[tr] < 1 || n[tr] > re(n[Xi], n[er]) ? tr : n[nr] < 0 || 24 < n[nr] || 24 === n[nr] && (0 !== n[ir] || 0 !== n[rr] || 0 !== n[or]) ? nr : n[ir] < 0 || 59 < n[ir] ? ir : n[rr] < 0 || 59 < n[rr] ? rr : n[or] < 0 || 999 < n[or] ? or : -1, p(e)._overflowDayOfYear && (t < Xi || tr < t) && (t = tr), p(e)._overflowWeeks && -1 === t && (t = ar), p(e)._overflowWeekday && -1 === t && (t = sr), p(e).overflow = t), e
        }

        function rt(e) {
            var t, n, i, r, o, a, s = e._i,
                l = Ar.exec(s) || $r.exec(s);
            if (l) {
                for (p(e).iso = !0, t = 0, n = Lr.length; t < n; t++)
                    if (Lr[t][1].exec(l[1])) {
                        r = Lr[t][0], i = !1 !== Lr[t][2];
                        break
                    } if (null == r) return void(e._isValid = !1);
                if (l[3]) {
                    for (t = 0, n = Pr.length; t < n; t++)
                        if (Pr[t][1].exec(l[3])) {
                            o = (l[2] || " ") + Pr[t][0];
                            break
                        } if (null == o) return void(e._isValid = !1)
                }
                if (!i && null != o) return void(e._isValid = !1);
                if (l[4]) {
                    if (!Mr.exec(l[4])) return void(e._isValid = !1);
                    a = "Z"
                }
                e._f = r + (o || "") + (a || ""), ct(e)
            } else e._isValid = !1
        }

        function ot(e) {
            var t = Ir.exec(e._i);
            null === t ? (rt(e), !1 === e._isValid && (delete e._isValid, u.createFromInputFallback(e))) : e._d = new Date(+t[1])
        }

        function at(e, t, n) {
            return null != e ? e : null != t ? t : n
        }

        function st(e) {
            var t = new Date(u.now());
            return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
        }

        function lt(e) {
            var t, n, i, r, o = [];
            if (!e._d) {
                for (i = st(e), e._w && null == e._a[tr] && null == e._a[er] && ut(e), e._dayOfYear && (r = at(e._a[Xi], i[Xi]), e._dayOfYear > me(r) && (p(e)._overflowDayOfYear = !0), n = we(r, 0, e._dayOfYear), e._a[er] = n.getUTCMonth(), e._a[tr] = n.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = o[t] = i[t];
                for (; t < 7; t++) e._a[t] = o[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
                24 === e._a[nr] && 0 === e._a[ir] && 0 === e._a[rr] && 0 === e._a[or] && (e._nextDay = !0, e._a[nr] = 0), e._d = (e._useUTC ? we : ve).apply(null, o), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[nr] = 24)
            }
        }

        function ut(e) {
            var t, n, i, r, o, a, s, l;
            if (null != (t = e._w).GG || null != t.W || null != t.E) o = 1, a = 4, n = at(t.GG, e._a[Xi], xe(vt(), 1, 4).year), i = at(t.W, 1), ((r = at(t.E, 1)) < 1 || 7 < r) && (l = !0);
            else {
                o = e._locale._week.dow, a = e._locale._week.doy;
                var u = xe(vt(), o, a);
                n = at(t.gg, e._a[Xi], u.year), i = at(t.w, u.week), null != t.d ? ((r = t.d) < 0 || 6 < r) && (l = !0) : null != t.e ? (r = t.e + o, (t.e < 0 || 6 < t.e) && (l = !0)) : r = o
            }
            i < 1 || i > Se(n, o, a) ? p(e)._overflowWeeks = !0 : null != l ? p(e)._overflowWeekday = !0 : (s = _e(n, i, r, o, a), e._a[Xi] = s.year, e._dayOfYear = s.dayOfYear)
        }

        function ct(e) {
            if (e._f !== u.ISO_8601) {
                e._a = [], p(e).empty = !0;
                var t, n, i, r, o, a = "" + e._i,
                    s = a.length,
                    l = 0;
                for (i = J(e._f, e._locale).match(Mi) || [], t = 0; t < i.length; t++) r = i[t], (n = (a.match(K(r, e)) || [])[0]) && (0 < (o = a.substr(0, a.indexOf(n))).length && p(e).unusedInput.push(o), a = a.slice(a.indexOf(n) + n.length), l += n.length), Ii[r] ? (n ? p(e).empty = !1 : p(e).unusedTokens.push(r), ie(r, n, e)) : e._strict && !n && p(e).unusedTokens.push(r);
                p(e).charsLeftOver = s - l, 0 < a.length && p(e).unusedInput.push(a), e._a[nr] <= 12 && !0 === p(e).bigHour && 0 < e._a[nr] && (p(e).bigHour = undefined), p(e).parsedDateParts = e._a.slice(0), p(e).meridiem = e._meridiem, e._a[nr] = dt(e._locale, e._a[nr], e._meridiem), lt(e), it(e)
            } else rt(e)
        }

        function dt(e, t, n) {
            var i;
            return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : (null != e.isPM && ((i = e.isPM(n)) && t < 12 && (t += 12), i || 12 !== t || (t = 0)), t)
        }

        function ht(e) {
            var t, n, i, r, o;
            if (0 === e._f.length) return p(e).invalidFormat = !0, void(e._d = new Date(NaN));
            for (r = 0; r < e._f.length; r++) o = 0, t = g({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[r], ct(t), m(t) && (o += p(t).charsLeftOver, o += 10 * p(t).unusedTokens.length, p(t).score = o, (null == i || o < i) && (i = o, n = t));
            h(e, n || t)
        }

        function ft(e) {
            if (!e._d) {
                var t = j(e._i);
                e._a = n([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function (e) {
                    return e && parseInt(e, 10)
                }), lt(e)
            }
        }

        function pt(e) {
            var t = new y(it(mt(e)));
            return t._nextDay && (t.add(1, "d"), t._nextDay = undefined), t
        }

        function mt(e) {
            var t = e._i,
                n = e._f;
            return e._locale = e._locale || tt(e._l), null === t || n === undefined && "" === t ? i({
                nullInput: !0
            }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), v(t) ? new y(it(t)) : (r(t) ? e._d = t : a(n) ? ht(e) : n ? ct(e) : gt(e), m(e) || (e._d = null), e))
        }

        function gt(e) {
            var t = e._i;
            t === undefined ? e._d = new Date(u.now()) : r(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? ot(e) : a(t) ? (e._a = n(t.slice(0), function (e) {
                return parseInt(e, 10)
            }), lt(e)) : "object" == typeof t ? ft(e) : c(t) ? e._d = new Date(t) : u.createFromInputFallback(e)
        }

        function yt(e, t, n, i, r) {
            var o = {};
            return !0 !== n && !1 !== n || (i = n, n = undefined), (s(e) && l(e) || a(e) && 0 === e.length) && (e = undefined), o._isAMomentObject = !0, o._useUTC = o._isUTC = r, o._l = n, o._i = e, o._f = t, o._strict = i, pt(o)
        }

        function vt(e, t, n, i) {
            return yt(e, t, n, i, !1)
        }

        function wt(e, t) {
            var n, i;
            if (1 === t.length && a(t[0]) && (t = t[0]), !t.length) return vt();
            for (n = t[0], i = 1; i < t.length; ++i) t[i].isValid() && !t[i][e](n) || (n = t[i]);
            return n
        }

        function bt() {
            return wt("isBefore", [].slice.call(arguments, 0))
        }

        function _t() {
            return wt("isAfter", [].slice.call(arguments, 0))
        }

        function xt(e) {
            var t = j(e),
                n = t.year || 0,
                i = t.quarter || 0,
                r = t.month || 0,
                o = t.week || 0,
                a = t.day || 0,
                s = t.hour || 0,
                l = t.minute || 0,
                u = t.second || 0,
                c = t.millisecond || 0;
            this._milliseconds = +c + 1e3 * u + 6e4 * l + 1e3 * s * 60 * 60, this._days = +a + 7 * o, this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = tt(), this._bubble()
        }

        function St(e) {
            return e instanceof xt
        }

        function kt(e) {
            return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
        }

        function Tt(e, n) {
            U(e, 0, 0, function () {
                var e = this.utcOffset(),
                    t = "+";
                return e < 0 && (e = -e, t = "-"), t + Y(~~(e / 60), 2) + n + Y(~~e % 60, 2)
            })
        }

        function Ct(e, t) {
            var n = (t || "").match(e);
            if (null === n) return null;
            var i = ((n[n.length - 1] || []) + "").match(jr) || ["-", 0, 0],
                r = 60 * i[1] + b(i[2]);
            return 0 === r ? 0 : "+" === i[0] ? r : -r
        }

        function Et(e, t) {
            var n, i;
            return t._isUTC ? (n = t.clone(), i = (v(e) || r(e) ? e.valueOf() : vt(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + i), u.updateOffset(n, !1), n) : vt(e).local()
        }

        function At(e) {
            return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
        }

        function $t(e, t) {
            var n, i = this._offset || 0;
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
                if ("string" == typeof e) {
                    if (null === (e = Ct(Gi, e))) return this
                } else Math.abs(e) < 16 && (e *= 60);
                return !this._isUTC && t && (n = At(this)), this._offset = e, this._isUTC = !0, null != n && this.add(n, "m"), i !== e && (!t || this._changeInProgress ? Yt(this, Ht(e - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, u.updateOffset(this, !0), this._changeInProgress = null)), this
            }
            return this._isUTC ? i : At(this)
        }

        function Mt(e, t) {
            return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
        }

        function Lt(e) {
            return this.utcOffset(0, e)
        }

        function Pt(e) {
            return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(At(this), "m")), this
        }

        function It() {
            if (null != this._tzm) this.utcOffset(this._tzm);
            else if ("string" == typeof this._i) {
                var e = Ct(Vi, this._i);
                null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
            }
            return this
        }

        function Dt(e) {
            return !!this.isValid() && (e = e ? vt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
        }

        function Ot() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }

        function Nt() {
            if (!o(this._isDSTShifted)) return this._isDSTShifted;
            var e = {};
            if (g(e, this), (e = mt(e))._a) {
                var t = e._isUTC ? f(e._a) : vt(e._a);
                this._isDSTShifted = this.isValid() && 0 < _(e._a, t.toArray())
            } else this._isDSTShifted = !1;
            return this._isDSTShifted
        }

        function jt() {
            return !!this.isValid() && !this._isUTC
        }

        function zt() {
            return !!this.isValid() && this._isUTC
        }

        function Rt() {
            return !!this.isValid() && (this._isUTC && 0 === this._offset)
        }

        function Ht(e, t) {
            var n, i, r, o = e,
                a = null;
            return St(e) ? o = {
                ms: e._milliseconds,
                d: e._days,
                M: e._months
            } : c(e) ? (o = {}, t ? o[t] = e : o.milliseconds = e) : (a = zr.exec(e)) ? (n = "-" === a[1] ? -1 : 1, o = {
                y: 0,
                d: b(a[tr]) * n,
                h: b(a[nr]) * n,
                m: b(a[ir]) * n,
                s: b(a[rr]) * n,
                ms: b(kt(1e3 * a[or])) * n
            }) : (a = Rr.exec(e)) ? (n = "-" === a[1] ? -1 : 1, o = {
                y: Ft(a[2], n),
                M: Ft(a[3], n),
                w: Ft(a[4], n),
                d: Ft(a[5], n),
                h: Ft(a[6], n),
                m: Ft(a[7], n),
                s: Ft(a[8], n)
            }) : null == o ? o = {} : "object" == typeof o && ("from" in o || "to" in o) && (r = Wt(vt(o.from), vt(o.to)), (o = {}).ms = r.milliseconds, o.M = r.months), i = new xt(o), St(e) && d(e, "_locale") && (i._locale = e._locale), i
        }

        function Ft(e, t) {
            var n = e && parseFloat(e.replace(",", "."));
            return (isNaN(n) ? 0 : n) * t
        }

        function qt(e, t) {
            var n = {
                milliseconds: 0,
                months: 0
            };
            return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
        }

        function Wt(e, t) {
            var n;
            return e.isValid() && t.isValid() ? (t = Et(t, e), e.isBefore(t) ? n = qt(e, t) : ((n = qt(t, e)).milliseconds = -n.milliseconds, n.months = -n.months), n) : {
                milliseconds: 0,
                months: 0
            }
        }

        function Bt(i, r) {
            return function (e, t) {
                var n;
                return null === t || isNaN(+t) || (k(r, "moment()." + r + "(period, number) is deprecated. Please use moment()." + r + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), n = e, e = t, t = n), Yt(this, Ht(e = "string" == typeof e ? +e : e, t), i), this
            }
        }

        function Yt(e, t, n, i) {
            var r = t._milliseconds,
                o = kt(t._days),
                a = kt(t._months);
            e.isValid() && (i = null == i || i, r && e._d.setTime(e._d.valueOf() + r * n), o && q(e, "Date", F(e, "Date") + o * n), a && ue(e, F(e, "Month") + a * n), i && u.updateOffset(e, o || a))
        }

        function Ut(e, t) {
            var n = e.diff(t, "days", !0);
            return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
        }

        function Vt(e, t) {
            var n = e || vt(),
                i = Et(n, this).startOf("day"),
                r = u.calendarFormat(this, i) || "sameElse",
                o = t && (T(t[r]) ? t[r].call(this, n) : t[r]);
            return this.format(o || this.localeData().calendar(r, this, vt(n)))
        }

        function Gt() {
            return new y(this)
        }

        function Qt(e, t) {
            var n = v(e) ? e : vt(e);
            return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = N(o(t) ? "millisecond" : t)) ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
        }

        function Jt(e, t) {
            var n = v(e) ? e : vt(e);
            return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = N(o(t) ? "millisecond" : t)) ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
        }

        function Zt(e, t, n, i) {
            return ("(" === (i = i || "()")[0] ? this.isAfter(e, n) : !this.isBefore(e, n)) && (")" === i[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
        }

        function Kt(e, t) {
            var n, i = v(e) ? e : vt(e);
            return !(!this.isValid() || !i.isValid()) && ("millisecond" === (t = N(t || "millisecond")) ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
        }

        function Xt(e, t) {
            return this.isSame(e, t) || this.isAfter(e, t)
        }

        function en(e, t) {
            return this.isSame(e, t) || this.isBefore(e, t)
        }

        function tn(e, t, n) {
            var i, r, o, a;
            return this.isValid() && (i = Et(e, this)).isValid() ? (r = 6e4 * (i.utcOffset() - this.utcOffset()), "year" === (t = N(t)) || "month" === t || "quarter" === t ? (a = nn(this, i), "quarter" === t ? a /= 3 : "year" === t && (a /= 12)) : (o = this - i, a = "second" === t ? o / 1e3 : "minute" === t ? o / 6e4 : "hour" === t ? o / 36e5 : "day" === t ? (o - r) / 864e5 : "week" === t ? (o - r) / 6048e5 : o), n ? a : w(a)) : NaN
        }

        function nn(e, t) {
            var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
                i = e.clone().add(n, "months");
            return -(n + (t - i < 0 ? (t - i) / (i - e.clone().add(n - 1, "months")) : (t - i) / (e.clone().add(n + 1, "months") - i))) || 0
        }

        function rn() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }

        function on() {
            var e = this.clone().utc();
            return 0 < e.year() && e.year() <= 9999 ? T(Date.prototype.toISOString) ? this.toDate().toISOString() : Q(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : Q(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }

        function an() {
            if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
            var e = "moment",
                t = "";
            this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
            var n = "[" + e + '("]',
                i = 0 < this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                r = "-MM-DD[T]HH:mm:ss.SSS",
                o = t + '[")]';
            return this.format(n + i + r + o)
        }

        function sn(e) {
            e || (e = this.isUtc() ? u.defaultFormatUtc : u.defaultFormat);
            var t = Q(this, e);
            return this.localeData().postformat(t)
        }

        function ln(e, t) {
            return this.isValid() && (v(e) && e.isValid() || vt(e).isValid()) ? Ht({
                to: this,
                from: e
            }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
        }

        function un(e) {
            return this.from(vt(), e)
        }

        function cn(e, t) {
            return this.isValid() && (v(e) && e.isValid() || vt(e).isValid()) ? Ht({
                from: this,
                to: e
            }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
        }

        function dn(e) {
            return this.to(vt(), e)
        }

        function hn(e) {
            var t;
            return e === undefined ? this._locale._abbr : (null != (t = tt(e)) && (this._locale = t), this)
        }

        function fn() {
            return this._locale
        }

        function pn(e) {
            switch (e = N(e)) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                case "date":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
        }

        function mn(e) {
            return (e = N(e)) === undefined || "millisecond" === e ? this : ("date" === e && (e = "day"), this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"))
        }

        function gn() {
            return this._d.valueOf() - 6e4 * (this._offset || 0)
        }

        function yn() {
            return Math.floor(this.valueOf() / 1e3)
        }

        function vn() {
            return new Date(this.valueOf())
        }

        function wn() {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
        }

        function bn() {
            var e = this;
            return {
                years: e.year(),
                months: e.month(),
                date: e.date(),
                hours: e.hours(),
                minutes: e.minutes(),
                seconds: e.seconds(),
                milliseconds: e.milliseconds()
            }
        }

        function _n() {
            return this.isValid() ? this.toISOString() : null
        }

        function xn() {
            return m(this)
        }

        function Sn() {
            return h({}, p(this))
        }

        function kn() {
            return p(this).overflow
        }

        function Tn() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict
            }
        }

        function Cn(e, t) {
            U(0, [e, e.length], 0, t)
        }

        function En(e) {
            return Ln.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
        }

        function An(e) {
            return Ln.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
        }

        function $n() {
            return Se(this.year(), 1, 4)
        }

        function Mn() {
            var e = this.localeData()._week;
            return Se(this.year(), e.dow, e.doy)
        }

        function Ln(e, t, n, i, r) {
            var o;
            return null == e ? xe(this, i, r).year : ((o = Se(e, i, r)) < t && (t = o), Pn.call(this, e, t, n, i, r))
        }

        function Pn(e, t, n, i, r) {
            var o = _e(e, t, n, i, r),
                a = we(o.year, 0, o.dayOfYear);
            return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
        }

        function In(e) {
            return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
        }

        function Dn(e) {
            var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == e ? t : this.add(e - t, "d")
        }

        function On(e, t) {
            t[or] = b(1e3 * ("0." + e))
        }

        function Nn() {
            return this._isUTC ? "UTC" : ""
        }

        function jn() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }

        function zn(e) {
            return vt(1e3 * e)
        }

        function Rn() {
            return vt.apply(null, arguments).parseZone()
        }

        function Hn(e) {
            return e
        }

        function Fn(e, t, n, i) {
            var r = tt(),
                o = f().set(i, t);
            return r[n](o, e)
        }

        function qn(e, t, n) {
            if (c(e) && (t = e, e = undefined), e = e || "", null != t) return Fn(e, t, n, "month");
            var i, r = [];
            for (i = 0; i < 12; i++) r[i] = Fn(e, i, n, "month");
            return r
        }

        function Wn(e, t, n, i) {
            "boolean" == typeof e ? c(t) && (n = t, t = undefined) : (t = e, e = !1, c(n = t) && (n = t, t = undefined)), t = t || "";
            var r, o = tt(),
                a = e ? o._week.dow : 0;
            if (null != n) return Fn(t, (n + a) % 7, i, "day");
            var s = [];
            for (r = 0; r < 7; r++) s[r] = Fn(t, (r + a) % 7, i, "day");
            return s
        }

        function Bn(e, t) {
            return qn(e, t, "months")
        }

        function Yn(e, t) {
            return qn(e, t, "monthsShort")
        }

        function Un(e, t, n) {
            return Wn(e, t, n, "weekdays")
        }

        function Vn(e, t, n) {
            return Wn(e, t, n, "weekdaysShort")
        }

        function Gn(e, t, n) {
            return Wn(e, t, n, "weekdaysMin")
        }

        function Qn() {
            var e = this._data;
            return this._milliseconds = Jr(this._milliseconds), this._days = Jr(this._days), this._months = Jr(this._months), e.milliseconds = Jr(e.milliseconds), e.seconds = Jr(e.seconds), e.minutes = Jr(e.minutes), e.hours = Jr(e.hours), e.months = Jr(e.months), e.years = Jr(e.years), this
        }

        function Jn(e, t, n, i) {
            var r = Ht(t, n);
            return e._milliseconds += i * r._milliseconds, e._days += i * r._days, e._months += i * r._months, e._bubble()
        }

        function Zn(e, t) {
            return Jn(this, e, t, 1)
        }

        function Kn(e, t) {
            return Jn(this, e, t, -1)
        }

        function Xn(e) {
            return e < 0 ? Math.floor(e) : Math.ceil(e)
        }

        function ei() {
            var e, t, n, i, r, o = this._milliseconds,
                a = this._days,
                s = this._months,
                l = this._data;
            return 0 <= o && 0 <= a && 0 <= s || o <= 0 && a <= 0 && s <= 0 || (o += 864e5 * Xn(ni(s) + a), s = a = 0), l.milliseconds = o % 1e3, e = w(o / 1e3), l.seconds = e % 60, t = w(e / 60), l.minutes = t % 60, n = w(t / 60), l.hours = n % 24, s += r = w(ti(a += w(n / 24))), a -= Xn(ni(r)), i = w(s / 12), s %= 12, l.days = a, l.months = s, l.years = i, this
        }

        function ti(e) {
            return 4800 * e / 146097
        }

        function ni(e) {
            return 146097 * e / 4800
        }

        function ii(e) {
            var t, n, i = this._milliseconds;
            if ("month" === (e = N(e)) || "year" === e) return t = this._days + i / 864e5, n = this._months + ti(t), "month" === e ? n : n / 12;
            switch (t = this._days + Math.round(ni(this._months)), e) {
                case "week":
                    return t / 7 + i / 6048e5;
                case "day":
                    return t + i / 864e5;
                case "hour":
                    return 24 * t + i / 36e5;
                case "minute":
                    return 1440 * t + i / 6e4;
                case "second":
                    return 86400 * t + i / 1e3;
                case "millisecond":
                    return Math.floor(864e5 * t) + i;
                default:
                    throw new Error("Unknown unit " + e)
            }
        }

        function ri() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * b(this._months / 12)
        }

        function oi(e) {
            return function () {
                return this.as(e)
            }
        }

        function ai(e) {
            return this[(e = N(e)) + "s"]()
        }

        function si(e) {
            return function () {
                return this._data[e]
            }
        }

        function li() {
            return w(this.days() / 7)
        }

        function ui(e, t, n, i, r) {
            return r.relativeTime(t || 1, !!n, e, i)
        }

        function ci(e, t, n) {
            var i = Ht(e).abs(),
                r = fo(i.as("s")),
                o = fo(i.as("m")),
                a = fo(i.as("h")),
                s = fo(i.as("d")),
                l = fo(i.as("M")),
                u = fo(i.as("y")),
                c = r < po.s && ["s", r] || o <= 1 && ["m"] || o < po.m && ["mm", o] || a <= 1 && ["h"] || a < po.h && ["hh", a] || s <= 1 && ["d"] || s < po.d && ["dd", s] || l <= 1 && ["M"] || l < po.M && ["MM", l] || u <= 1 && ["y"] || ["yy", u];
            return c[2] = t, c[3] = 0 < +e, c[4] = n, ui.apply(null, c)
        }

        function di(e) {
            return e === undefined ? fo : "function" == typeof e && (fo = e, !0)
        }

        function hi(e, t) {
            return po[e] !== undefined && (t === undefined ? po[e] : (po[e] = t, !0))
        }

        function fi(e) {
            var t = this.localeData(),
                n = ci(this, !e, t);
            return e && (n = t.pastFuture(+this, n)), t.postformat(n)
        }

        function pi() {
            var e, t, n = mo(this._milliseconds) / 1e3,
                i = mo(this._days),
                r = mo(this._months);
            t = w((e = w(n / 60)) / 60), n %= 60, e %= 60;
            var o = w(r / 12),
                a = r %= 12,
                s = i,
                l = t,
                u = e,
                c = n,
                d = this.asSeconds();
            return d ? (d < 0 ? "-" : "") + "P" + (o ? o + "Y" : "") + (a ? a + "M" : "") + (s ? s + "D" : "") + (l || u || c ? "T" : "") + (l ? l + "H" : "") + (u ? u + "M" : "") + (c ? c + "S" : "") : "P0D"
        }

        function mi(e, t, n) {
            var i = {
                m: ["eine Minute", "einer Minute"],
                h: ["eine Stunde", "einer Stunde"],
                d: ["ein Tag", "einem Tag"],
                dd: [e + " Tage", e + " Tagen"],
                M: ["ein Monat", "einem Monat"],
                MM: [e + " Monate", e + " Monaten"],
                y: ["ein Jahr", "einem Jahr"],
                yy: [e + " Jahre", e + " Jahren"]
            };
            return t ? i[n][0] : i[n][1]
        }
        var gi, yi = Array.prototype.some ? Array.prototype.some : function (e) {
                for (var t = Object(this), n = t.length >>> 0, i = 0; i < n; i++)
                    if (i in t && e.call(this, t[i], i, t)) return !0;
                return !1
            },
            vi = u.momentProperties = [],
            wi = !1,
            bi = {};
        u.suppressDeprecationWarnings = !1, u.deprecationHandler = null;
        var _i = Object.keys ? Object.keys : function (e) {
                var t, n = [];
                for (t in e) d(e, t) && n.push(t);
                return n
            },
            xi = {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            Si = {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            ki = "Invalid date",
            Ti = "%d",
            Ci = /\d{1,2}/,
            Ei = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            Ai = {},
            $i = {},
            Mi = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            Li = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            Pi = {},
            Ii = {},
            Di = /\d/,
            Oi = /\d\d/,
            Ni = /\d{3}/,
            ji = /\d{4}/,
            zi = /[+-]?\d{6}/,
            Ri = /\d\d?/,
            Hi = /\d\d\d\d?/,
            Fi = /\d\d\d\d\d\d?/,
            qi = /\d{1,3}/,
            Wi = /\d{1,4}/,
            Bi = /[+-]?\d{1,6}/,
            Yi = /\d+/,
            Ui = /[+-]?\d+/,
            Vi = /Z|[+-]\d\d:?\d\d/gi,
            Gi = /Z|[+-]\d\d(?::?\d\d)?/gi,
            Qi = /[+-]?\d+(\.\d{1,3})?/,
            Ji = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            Zi = {},
            Ki = {},
            Xi = 0,
            er = 1,
            tr = 2,
            nr = 3,
            ir = 4,
            rr = 5,
            or = 6,
            ar = 7,
            sr = 8,
            lr = Array.prototype.indexOf ? Array.prototype.indexOf : function (e) {
                var t;
                for (t = 0; t < this.length; ++t)
                    if (this[t] === e) return t;
                return -1
            };
        U("M", ["MM", 2], "Mo", function () {
            return this.month() + 1
        }), U("MMM", 0, 0, function (e) {
            return this.localeData().monthsShort(this, e)
        }), U("MMMM", 0, 0, function (e) {
            return this.localeData().months(this, e)
        }), O("month", "M"), z("month", 8), Z("M", Ri), Z("MM", Ri, Oi), Z("MMM", function (e, t) {
            return t.monthsShortRegex(e)
        }), Z("MMMM", function (e, t) {
            return t.monthsRegex(e)
        }), te(["M", "MM"], function (e, t) {
            t[er] = b(e) - 1
        }), te(["MMM", "MMMM"], function (e, t, n, i) {
            var r = n._locale.monthsParse(e, i, n._strict);
            null != r ? t[er] = r : p(n).invalidMonth = e
        });
        var ur = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            cr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            dr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            hr = Ji,
            fr = Ji;
        U("Y", 0, 0, function () {
            var e = this.year();
            return e <= 9999 ? "" + e : "+" + e
        }), U(0, ["YY", 2], 0, function () {
            return this.year() % 100
        }), U(0, ["YYYY", 4], 0, "year"), U(0, ["YYYYY", 5], 0, "year"), U(0, ["YYYYYY", 6, !0], 0, "year"), O("year", "y"), z("year", 1), Z("Y", Ui), Z("YY", Ri, Oi), Z("YYYY", Wi, ji), Z("YYYYY", Bi, zi), Z("YYYYYY", Bi, zi), te(["YYYYY", "YYYYYY"], Xi), te("YYYY", function (e, t) {
            t[Xi] = 2 === e.length ? u.parseTwoDigitYear(e) : b(e)
        }), te("YY", function (e, t) {
            t[Xi] = u.parseTwoDigitYear(e)
        }), te("Y", function (e, t) {
            t[Xi] = parseInt(e, 10)
        }), u.parseTwoDigitYear = function (e) {
            return b(e) + (68 < b(e) ? 1900 : 2e3)
        };
        var pr = H("FullYear", !0);
        U("w", ["ww", 2], "wo", "week"), U("W", ["WW", 2], "Wo", "isoWeek"), O("week", "w"), O("isoWeek", "W"), z("week", 5), z("isoWeek", 5), Z("w", Ri), Z("ww", Ri, Oi), Z("W", Ri), Z("WW", Ri, Oi), ne(["w", "ww", "W", "WW"], function (e, t, n, i) {
            t[i.substr(0, 1)] = b(e)
        });
        var mr = {
            dow: 0,
            doy: 6
        };
        U("d", 0, "do", "day"), U("dd", 0, 0, function (e) {
            return this.localeData().weekdaysMin(this, e)
        }), U("ddd", 0, 0, function (e) {
            return this.localeData().weekdaysShort(this, e)
        }), U("dddd", 0, 0, function (e) {
            return this.localeData().weekdays(this, e)
        }), U("e", 0, 0, "weekday"), U("E", 0, 0, "isoWeekday"), O("day", "d"), O("weekday", "e"), O("isoWeekday", "E"), z("day", 11), z("weekday", 11), z("isoWeekday", 11), Z("d", Ri), Z("e", Ri), Z("E", Ri), Z("dd", function (e, t) {
            return t.weekdaysMinRegex(e)
        }), Z("ddd", function (e, t) {
            return t.weekdaysShortRegex(e)
        }), Z("dddd", function (e, t) {
            return t.weekdaysRegex(e)
        }), ne(["dd", "ddd", "dddd"], function (e, t, n, i) {
            var r = n._locale.weekdaysParse(e, i, n._strict);
            null != r ? t.d = r : p(n).invalidWeekday = e
        }), ne(["d", "e", "E"], function (e, t, n, i) {
            t[i] = b(e)
        });
        var gr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            yr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            vr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            wr = Ji,
            br = Ji,
            _r = Ji;
        U("H", ["HH", 2], 0, "hour"), U("h", ["hh", 2], 0, We), U("k", ["kk", 2], 0, Be), U("hmm", 0, 0, function () {
            return "" + We.apply(this) + Y(this.minutes(), 2)
        }), U("hmmss", 0, 0, function () {
            return "" + We.apply(this) + Y(this.minutes(), 2) + Y(this.seconds(), 2)
        }), U("Hmm", 0, 0, function () {
            return "" + this.hours() + Y(this.minutes(), 2)
        }), U("Hmmss", 0, 0, function () {
            return "" + this.hours() + Y(this.minutes(), 2) + Y(this.seconds(), 2)
        }), Ye("a", !0), Ye("A", !1), O("hour", "h"), z("hour", 13), Z("a", Ue), Z("A", Ue), Z("H", Ri), Z("h", Ri), Z("HH", Ri, Oi), Z("hh", Ri, Oi), Z("hmm", Hi), Z("hmmss", Fi), Z("Hmm", Hi), Z("Hmmss", Fi), te(["H", "HH"], nr), te(["a", "A"], function (e, t, n) {
            n._isPm = n._locale.isPM(e), n._meridiem = e
        }), te(["h", "hh"], function (e, t, n) {
            t[nr] = b(e), p(n).bigHour = !0
        }), te("hmm", function (e, t, n) {
            var i = e.length - 2;
            t[nr] = b(e.substr(0, i)), t[ir] = b(e.substr(i)), p(n).bigHour = !0
        }), te("hmmss", function (e, t, n) {
            var i = e.length - 4,
                r = e.length - 2;
            t[nr] = b(e.substr(0, i)), t[ir] = b(e.substr(i, 2)), t[rr] = b(e.substr(r)), p(n).bigHour = !0
        }), te("Hmm", function (e, t) {
            var n = e.length - 2;
            t[nr] = b(e.substr(0, n)), t[ir] = b(e.substr(n))
        }), te("Hmmss", function (e, t) {
            var n = e.length - 4,
                i = e.length - 2;
            t[nr] = b(e.substr(0, n)), t[ir] = b(e.substr(n, 2)), t[rr] = b(e.substr(i))
        });
        var xr, Sr = /[ap]\.?m?\.?/i,
            kr = H("Hours", !0),
            Tr = {
                calendar: xi,
                longDateFormat: Si,
                invalidDate: ki,
                ordinal: Ti,
                ordinalParse: Ci,
                relativeTime: Ei,
                months: cr,
                monthsShort: dr,
                week: mr,
                weekdays: gr,
                weekdaysMin: vr,
                weekdaysShort: yr,
                meridiemParse: Sr
            },
            Cr = {},
            Er = {},
            Ar = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            $r = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            Mr = /Z|[+-]\d\d(?::?\d\d)?/,
            Lr = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                ["YYYY-DDD", /\d{4}-\d{3}/],
                ["YYYY-MM", /\d{4}-\d\d/, !1],
                ["YYYYYYMMDD", /[+-]\d{10}/],
                ["YYYYMMDD", /\d{8}/],
                ["GGGG[W]WWE", /\d{4}W\d{3}/],
                ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                ["YYYYDDD", /\d{7}/]
            ],
            Pr = [
                ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                ["HH:mm", /\d\d:\d\d/],
                ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                ["HHmmss", /\d\d\d\d\d\d/],
                ["HHmm", /\d\d\d\d/],
                ["HH", /\d\d/]
            ],
            Ir = /^\/?Date\((\-?\d+)/i;
        u.createFromInputFallback = S("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (e) {
            e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
        }), u.ISO_8601 = function () {};
        var Dr = S("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                var e = vt.apply(null, arguments);
                return this.isValid() && e.isValid() ? e < this ? this : e : i()
            }),
            Or = S("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                var e = vt.apply(null, arguments);
                return this.isValid() && e.isValid() ? this < e ? this : e : i()
            }),
            Nr = function () {
                return Date.now ? Date.now() : +new Date
            };
        Tt("Z", ":"), Tt("ZZ", ""), Z("Z", Gi), Z("ZZ", Gi), te(["Z", "ZZ"], function (e, t, n) {
            n._useUTC = !0, n._tzm = Ct(Gi, e)
        });
        var jr = /([\+\-]|\d\d)/gi;
        u.updateOffset = function () {};
        var zr = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
            Rr = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
        Ht.fn = xt.prototype;
        var Hr = Bt(1, "add"),
            Fr = Bt(-1, "subtract");
        u.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", u.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        var qr = S("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) {
            return e === undefined ? this.localeData() : this.locale(e)
        });
        U(0, ["gg", 2], 0, function () {
            return this.weekYear() % 100
        }), U(0, ["GG", 2], 0, function () {
            return this.isoWeekYear() % 100
        }), Cn("gggg", "weekYear"), Cn("ggggg", "weekYear"), Cn("GGGG", "isoWeekYear"), Cn("GGGGG", "isoWeekYear"), O("weekYear", "gg"), O("isoWeekYear", "GG"), z("weekYear", 1), z("isoWeekYear", 1), Z("G", Ui), Z("g", Ui), Z("GG", Ri, Oi), Z("gg", Ri, Oi), Z("GGGG", Wi, ji), Z("gggg", Wi, ji), Z("GGGGG", Bi, zi), Z("ggggg", Bi, zi), ne(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, i) {
            t[i.substr(0, 2)] = b(e)
        }), ne(["gg", "GG"], function (e, t, n, i) {
            t[i] = u.parseTwoDigitYear(e)
        }), U("Q", 0, "Qo", "quarter"), O("quarter", "Q"), z("quarter", 7), Z("Q", Di), te("Q", function (e, t) {
            t[er] = 3 * (b(e) - 1)
        }), U("D", ["DD", 2], "Do", "date"), O("date", "D"), z("date", 9), Z("D", Ri), Z("DD", Ri, Oi), Z("Do", function (e, t) {
            return e ? t._ordinalParse : t._ordinalParseLenient
        }), te(["D", "DD"], tr), te("Do", function (e, t) {
            t[tr] = b(e.match(Ri)[0], 10)
        });
        var Wr = H("Date", !0);
        U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), O("dayOfYear", "DDD"), z("dayOfYear", 4), Z("DDD", qi), Z("DDDD", Ni), te(["DDD", "DDDD"], function (e, t, n) {
            n._dayOfYear = b(e)
        }), U("m", ["mm", 2], 0, "minute"), O("minute", "m"), z("minute", 14), Z("m", Ri), Z("mm", Ri, Oi), te(["m", "mm"], ir);
        var Br = H("Minutes", !1);
        U("s", ["ss", 2], 0, "second"), O("second", "s"), z("second", 15), Z("s", Ri), Z("ss", Ri, Oi), te(["s", "ss"], rr);
        var Yr, Ur = H("Seconds", !1);
        for (U("S", 0, 0, function () {
                return ~~(this.millisecond() / 100)
            }), U(0, ["SS", 2], 0, function () {
                return ~~(this.millisecond() / 10)
            }), U(0, ["SSS", 3], 0, "millisecond"), U(0, ["SSSS", 4], 0, function () {
                return 10 * this.millisecond()
            }), U(0, ["SSSSS", 5], 0, function () {
                return 100 * this.millisecond()
            }), U(0, ["SSSSSS", 6], 0, function () {
                return 1e3 * this.millisecond()
            }), U(0, ["SSSSSSS", 7], 0, function () {
                return 1e4 * this.millisecond()
            }), U(0, ["SSSSSSSS", 8], 0, function () {
                return 1e5 * this.millisecond()
            }), U(0, ["SSSSSSSSS", 9], 0, function () {
                return 1e6 * this.millisecond()
            }), O("millisecond", "ms"), z("millisecond", 16), Z("S", qi, Di), Z("SS", qi, Oi), Z("SSS", qi, Ni), Yr = "SSSS"; Yr.length <= 9; Yr += "S") Z(Yr, Yi);
        for (Yr = "S"; Yr.length <= 9; Yr += "S") te(Yr, On);
        var Vr = H("Milliseconds", !1);
        U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0, "zoneName");
        var Gr = y.prototype;
        Gr.add = Hr, Gr.calendar = Vt, Gr.clone = Gt, Gr.diff = tn, Gr.endOf = mn, Gr.format = sn, Gr.from = ln, Gr.fromNow = un, Gr.to = cn, Gr.toNow = dn, Gr.get = W, Gr.invalidAt = kn, Gr.isAfter = Qt, Gr.isBefore = Jt, Gr.isBetween = Zt, Gr.isSame = Kt, Gr.isSameOrAfter = Xt, Gr.isSameOrBefore = en, Gr.isValid = xn, Gr.lang = qr, Gr.locale = hn, Gr.localeData = fn, Gr.max = Or, Gr.min = Dr, Gr.parsingFlags = Sn, Gr.set = B, Gr.startOf = pn, Gr.subtract = Fr, Gr.toArray = wn, Gr.toObject = bn, Gr.toDate = vn, Gr.toISOString = on, Gr.inspect = an, Gr.toJSON = _n, Gr.toString = rn, Gr.unix = yn, Gr.valueOf = gn, Gr.creationData = Tn, Gr.year = pr, Gr.isLeapYear = ye, Gr.weekYear = En, Gr.isoWeekYear = An, Gr.quarter = Gr.quarters = In, Gr.month = ce, Gr.daysInMonth = de, Gr.week = Gr.weeks = Ee, Gr.isoWeek = Gr.isoWeeks = Ae, Gr.weeksInYear = Mn, Gr.isoWeeksInYear = $n, Gr.date = Wr, Gr.day = Gr.days = Ne, Gr.weekday = je, Gr.isoWeekday = ze, Gr.dayOfYear = Dn, Gr.hour = Gr.hours = kr, Gr.minute = Gr.minutes = Br, Gr.second = Gr.seconds = Ur, Gr.millisecond = Gr.milliseconds = Vr, Gr.utcOffset = $t, Gr.utc = Lt, Gr.local = Pt, Gr.parseZone = It, Gr.hasAlignedHourOffset = Dt, Gr.isDST = Ot, Gr.isLocal = jt, Gr.isUtcOffset = zt, Gr.isUtc = Rt, Gr.isUTC = Rt, Gr.zoneAbbr = Nn, Gr.zoneName = jn, Gr.dates = S("dates accessor is deprecated. Use date instead.", Wr), Gr.months = S("months accessor is deprecated. Use month instead", ce), Gr.years = S("years accessor is deprecated. Use year instead", pr), Gr.zone = S("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Mt), Gr.isDSTShifted = S("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Nt);
        var Qr = A.prototype;
        Qr.calendar = $, Qr.longDateFormat = M, Qr.invalidDate = L, Qr.ordinal = P, Qr.preparse = Hn, Qr.postformat = Hn, Qr.relativeTime = I, Qr.pastFuture = D, Qr.set = C, Qr.months = oe, Qr.monthsShort = ae, Qr.monthsParse = le, Qr.monthsRegex = fe, Qr.monthsShortRegex = he, Qr.week = ke, Qr.firstDayOfYear = Ce, Qr.firstDayOfWeek = Te, Qr.weekdays = Le, Qr.weekdaysMin = Ie, Qr.weekdaysShort = Pe, Qr.weekdaysParse = Oe, Qr.weekdaysRegex = Re, Qr.weekdaysShortRegex = He, Qr.weekdaysMinRegex = Fe, Qr.isPM = Ve, Qr.meridiem = Ge, Ke("en", {
            ordinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function (e) {
                var t = e % 10;
                return e + (1 === b(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
            }
        }), u.lang = S("moment.lang is deprecated. Use moment.locale instead.", Ke), u.langData = S("moment.langData is deprecated. Use moment.localeData instead.", tt);
        var Jr = Math.abs,
            Zr = oi("ms"),
            Kr = oi("s"),
            Xr = oi("m"),
            eo = oi("h"),
            to = oi("d"),
            no = oi("w"),
            io = oi("M"),
            ro = oi("y"),
            oo = si("milliseconds"),
            ao = si("seconds"),
            so = si("minutes"),
            lo = si("hours"),
            uo = si("days"),
            co = si("months"),
            ho = si("years"),
            fo = Math.round,
            po = {
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            },
            mo = Math.abs,
            go = xt.prototype;
        go.abs = Qn, go.add = Zn, go.subtract = Kn, go.as = ii, go.asMilliseconds = Zr, go.asSeconds = Kr, go.asMinutes = Xr, go.asHours = eo, go.asDays = to, go.asWeeks = no, go.asMonths = io, go.asYears = ro, go.valueOf = ri, go._bubble = ei, go.get = ai, go.milliseconds = oo, go.seconds = ao, go.minutes = so, go.hours = lo, go.days = uo, go.weeks = li, go.months = co, go.years = ho, go.humanize = fi, go.toISOString = pi, go.toString = pi, go.toJSON = pi, go.locale = hn, go.localeData = fn, go.toIsoString = S("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", pi), go.lang = qr, U("X", 0, 0, "unix"), U("x", 0, 0, "valueOf"), Z("x", Ui), Z("X", Qi), te("X", function (e, t, n) {
            n._d = new Date(1e3 * parseFloat(e, 10))
        }), te("x", function (e, t, n) {
            n._d = new Date(b(e))
        }), u.version = "2.17.1", e(vt), u.fn = Gr, u.min = bt, u.max = _t, u.now = Nr, u.utc = f, u.unix = zn, u.months = Bn, u.isDate = r, u.locale = Ke, u.invalid = i, u.duration = Ht, u.isMoment = v, u.weekdays = Un, u.parseZone = Rn, u.localeData = tt, u.isDuration = St, u.monthsShort = Yn, u.weekdaysMin = Gn, u.defineLocale = Xe, u.updateLocale = et, u.locales = nt, u.weekdaysShort = Vn, u.normalizeUnits = N, u.relativeTimeRounding = di, u.relativeTimeThreshold = hi, u.calendarFormat = Ut, u.prototype = Gr, u.defineLocale("fr", {
            months: "janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),
            monthsShort: "janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),
            monthsParseExact: !0,
            weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar: {
                sameDay: "[Aujourd\u2019hui \xe0] LT",
                nextDay: "[Demain \xe0] LT",
                nextWeek: "dddd [\xe0] LT",
                lastDay: "[Hier \xe0] LT",
                lastWeek: "dddd [dernier \xe0] LT",
                sameElse: "L"
            },
            relativeTime: {
                future: "dans %s",
                past: "il y a %s",
                s: "quelques secondes",
                m: "une minute",
                mm: "%d minutes",
                h: "une heure",
                hh: "%d heures",
                d: "un jour",
                dd: "%d jours",
                M: "un mois",
                MM: "%d mois",
                y: "un an",
                yy: "%d ans"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
            ordinal: function (e, t) {
                switch (t) {
                    case "D":
                        return e + (1 === e ? "er" : "");
                    default:
                    case "M":
                    case "Q":
                    case "DDD":
                    case "d":
                        return e + (1 === e ? "er" : "e");
                    case "w":
                    case "W":
                        return e + (1 === e ? "re" : "e")
                }
            },
            week: {
                dow: 1,
                doy: 4
            }
        });
        var yo = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
            vo = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
        return u.defineLocale("es", {
            months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
            monthsShort: function (e, t) {
                return e ? /-MMM-/.test(t) ? vo[e.month()] : yo[e.month()] : yo
            },
            monthsParseExact: !0,
            weekdays: "domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),
            weekdaysShort: "dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),
            weekdaysMin: "do_lu_ma_mi_ju_vi_s\xe1".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D [de] MMMM [de] YYYY",
                LLL: "D [de] MMMM [de] YYYY H:mm",
                LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
            },
            calendar: {
                sameDay: function () {
                    return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                nextDay: function () {
                    return "[ma\xf1ana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                nextWeek: function () {
                    return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                lastDay: function () {
                    return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                lastWeek: function () {
                    return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                sameElse: "L"
            },
            relativeTime: {
                future: "en %s",
                past: "hace %s",
                s: "unos segundos",
                m: "un minuto",
                mm: "%d minutos",
                h: "una hora",
                hh: "%d horas",
                d: "un d\xeda",
                dd: "%d d\xedas",
                M: "un mes",
                MM: "%d meses",
                y: "un a\xf1o",
                yy: "%d a\xf1os"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\xba/,
            ordinal: "%d\xba",
            week: {
                dow: 1,
                doy: 4
            }
        }), u.defineLocale("de", {
            months: "Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
            monthsShort: "Jan._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
            monthsParseExact: !0,
            weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
            weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY HH:mm",
                LLLL: "dddd, D. MMMM YYYY HH:mm"
            },
            calendar: {
                sameDay: "[heute um] LT [Uhr]",
                sameElse: "L",
                nextDay: "[morgen um] LT [Uhr]",
                nextWeek: "dddd [um] LT [Uhr]",
                lastDay: "[gestern um] LT [Uhr]",
                lastWeek: "[letzten] dddd [um] LT [Uhr]"
            },
            relativeTime: {
                future: "in %s",
                past: "vor %s",
                s: "ein paar Sekunden",
                m: mi,
                mm: "%d Minuten",
                h: mi,
                hh: "%d Stunden",
                d: mi,
                dd: mi,
                M: mi,
                MM: mi,
                y: mi,
                yy: mi
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: {
                dow: 1,
                doy: 4
            }
        }), u.locale("en"), u
    }),
    function () {}.call(this),
    function () {
        $(document).on("click", "a.toggle_with_hide", function (e) {
            return e.preventDefault(), $($(this).attr("data-hide")).toggleClass("hide").trigger("toggled"), $($(this).attr("href")).each(function (e, t) {
                return $(t).toggleClass("hide").trigger("toggled"), $(t).find("input,textarea").filter(":focusable:first").focus(), $(t).find("input,textarea").filter(".rich_text").each(function (e, t) {
                    return CKEDITOR.instances[t.id].focus()
                })
            }), setTimeout(function () {
                return $(window).trigger("resize")
            }, 600)
        }), $(document).on("click", ".one-way-toggle", function (e) {
            var t, n;
            return e.preventDefault(), t = $(this).data("hide"), n = $(this).val(), $(t).addClass("hide"), $(n).removeClass("hide")
        })
    }.call(this),
    function (e) {
        var t, r, n, i, o, a, s, l = navigator.userAgent;
        e.HTMLPictureElement && /ecko/.test(l) && l.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", (r = document.createElement("source"), n = function (e) {
            var t, n, i = e.parentNode;
            "PICTURE" === i.nodeName.toUpperCase() ? (t = r.cloneNode(), i.insertBefore(t, i.firstElementChild), setTimeout(function () {
                i.removeChild(t)
            })) : (!e._pfLastSize || e.offsetWidth > e._pfLastSize) && (e._pfLastSize = e.offsetWidth, n = e.sizes, e.sizes += ",100vw", setTimeout(function () {
                e.sizes = n
            }))
        }, i = function () {
            var e, t = document.querySelectorAll("picture > img, img[srcset][sizes]");
            for (e = 0; e < t.length; e++) n(t[e])
        }, o = function () {
            clearTimeout(t), t = setTimeout(i, 99)
        }, a = e.matchMedia && matchMedia("(orientation: landscape)"), s = function () {
            o(), a && a.addListener && a.addListener(o)
        }, r.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? s() : document.addEventListener("DOMContentLoaded", s), o))
    }(window),
    function (i, o, u) {
        "use strict";

        function m(e) {
            return " " === e || "\t" === e || "\n" === e || "\f" === e || "\r" === e
        }

        function e(e, t) {
            var n = new i.Image;
            return n.onerror = function () {
                R[e] = !1, pe()
            }, n.onload = function () {
                R[e] = 1 === n.width, pe()
            }, n.src = t, "pending"
        }

        function r() {
            Z = !1, ee = i.devicePixelRatio, K = {}, X = {}, L.DPR = ee || 1, te.width = Math.max(i.innerWidth || 0, z.clientWidth), te.height = Math.max(i.innerHeight || 0, z.clientHeight), te.vw = te.width / 100, te.vh = te.height / 100, l = [te.height, te.width, ee].join("-"), te.em = L.getEmValue(), te.rem = te.em
        }

        function f(e, t, n, i) {
            var r, o, a;
            return "saveData" === H.algorithm ? 2.7 < e ? a = n + 1 : (o = (t - n) * (r = Math.pow(e - .6, 1.5)), i && (o += .1 * r), a = e + o) : a = 1 < n ? Math.sqrt(e * t) : e, n < a
        }

        function a(e) {
            var t, n = L.getSet(e),
                i = !1;
            "pending" !== n && (i = l, n && (t = L.setRes(n), L.applySetCandidate(t, e))), e[L.ns].evaled = i
        }

        function p(e, t) {
            return e.res - t.res
        }

        function g(e, t, n) {
            var i;
            return !n && t && (n = (n = e[L.ns].sets) && n[n.length - 1]), (i = c(t, n)) && (t = L.makeUrl(t), e[L.ns].curSrc = t, (e[L.ns].curCan = i).res || fe(i, i.set.sizes)), i
        }

        function c(e, t) {
            var n, i, r;
            if (e && t)
                for (r = L.parseSet(t), e = L.makeUrl(e), n = 0; n < r.length; n++)
                    if (e === L.makeUrl(r[n].url)) {
                        i = r[n];
                        break
                    } return i
        }

        function d(e, t) {
            var n, i, r, o, a = e.getElementsByTagName("source");
            for (n = 0, i = a.length; n < i; n++)(r = a[n])[L.ns] = !0, (o = r.getAttribute("srcset")) && t.push({
                srcset: o,
                media: r.getAttribute("media"),
                type: r.getAttribute("type"),
                sizes: r.getAttribute("sizes")
            })
        }

        function t(i, d) {
            function e(e) {
                var t, n = e.exec(i.substring(l));
                return n ? (t = n[0], l += t.length, t) : void 0
            }

            function t() {
                var e, t, n, i, r, o, a, s, l, u = !1,
                    c = {};
                for (i = 0; i < f.length; i++) o = (r = f[i])[r.length - 1], a = r.substring(0, r.length - 1), s = parseInt(a, 10), l = parseFloat(a), le.test(a) && "w" === o ? ((e || t) && (u = !0), 0 === s ? u = !0 : e = s) : ue.test(a) && "x" === o ? ((e || t || n) && (u = !0), l < 0 ? u = !0 : t = l) : le.test(a) && "h" === o ? ((n || t) && (u = !0), 0 === s ? u = !0 : n = s) : u = !0;
                u || (c.url = h, e && (c.w = e), t && (c.d = t), n && (c.h = n), n || t || e || (c.d = 1), 1 === c.d && (d.has1x = !0), c.set = d, p.push(c))
            }

            function n() {
                for (e(re), r = "", o = "in descriptor";;) {
                    if (a = i.charAt(l), "in descriptor" === o)
                        if (m(a)) r && (f.push(r), r = "", o = "after descriptor");
                        else {
                            if ("," === a) return l += 1, r && f.push(r), void t();
                            if ("(" === a) r += a, o = "in parens";
                            else {
                                if ("" === a) return r && f.push(r), void t();
                                r += a
                            }
                        }
                    else if ("in parens" === o)
                        if (")" === a) r += a, o = "in descriptor";
                        else {
                            if ("" === a) return f.push(r), void t();
                            r += a
                        }
                    else if ("after descriptor" === o)
                        if (m(a));
                        else {
                            if ("" === a) return void t();
                            o = "in descriptor", l -= 1
                        } l += 1
                }
            }
            for (var h, f, r, o, a, s = i.length, l = 0, p = [];;) {
                if (e(oe), s <= l) return p;
                h = e(ae), f = [], "," === h.slice(-1) ? (h = h.replace(se, ""), t()) : n()
            }
        }

        function n(e) {
            function t(e) {
                function t() {
                    r && (o.push(r), r = "")
                }

                function n() {
                    o[0] && (a.push(o), o = [])
                }
                for (var i, r = "", o = [], a = [], s = 0, l = 0, u = !1;;) {
                    if ("" === (i = e.charAt(l))) return t(), n(), a;
                    if (u) {
                        if ("*" === i && "/" === e[l + 1]) {
                            u = !1, l += 2, t();
                            continue
                        }
                        l += 1
                    } else {
                        if (m(i)) {
                            if (e.charAt(l - 1) && m(e.charAt(l - 1)) || !r) {
                                l += 1;
                                continue
                            }
                            if (0 === s) {
                                t(), l += 1;
                                continue
                            }
                            i = " "
                        } else if ("(" === i) s += 1;
                        else if (")" === i) s -= 1;
                        else {
                            if ("," === i) {
                                t(), n(), l += 1;
                                continue
                            }
                            if ("/" === i && "*" === e.charAt(l + 1)) {
                                u = !0, l += 2;
                                continue
                            }
                        }
                        r += i, l += 1
                    }
                }
            }

            function n(e) {
                return !!(u.test(e) && 0 <= parseFloat(e)) || (!!c.test(e) || ("0" === e || "-0" === e || "+0" === e))
            }
            var i, r, o, a, s, l, u = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
                c = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
            for (o = (r = t(e)).length, i = 0; i < o; i++)
                if (n(s = (a = r[i])[a.length - 1])) {
                    if (l = s, a.pop(), 0 === a.length) return l;
                    if (a = a.join(" "), L.matchesMedia(a)) return l
                } return "100vw"
        }
        o.createElement("picture");
        var s, h, l, y, v, w, b, _, x, S, k, T, C, E, A, $, M, L = {},
            P = !1,
            I = function () {},
            D = o.createElement("img"),
            O = D.getAttribute,
            N = D.setAttribute,
            j = D.removeAttribute,
            z = o.documentElement,
            R = {},
            H = {
                algorithm: ""
            },
            F = "data-pfsrc",
            q = F + "set",
            W = navigator.userAgent,
            B = /rident/.test(W) || /ecko/.test(W) && W.match(/rv\:(\d+)/) && 35 < RegExp.$1,
            Y = "currentSrc",
            U = /\s+\+?\d+(e\d+)?w/,
            V = /(\([^)]+\))?\s*(.+)/,
            G = i.picturefillCFG,
            Q = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
            J = "font-size:100%!important;",
            Z = !0,
            K = {},
            X = {},
            ee = i.devicePixelRatio,
            te = {
                px: 1,
                "in": 96
            },
            ne = o.createElement("a"),
            ie = !1,
            re = /^[ \t\n\r\u000c]+/,
            oe = /^[, \t\n\r\u000c]+/,
            ae = /^[^ \t\n\r\u000c]+/,
            se = /[,]+$/,
            le = /^\d+$/,
            ue = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
            ce = function (e, t, n, i) {
                e.addEventListener ? e.addEventListener(t, n, i || !1) : e.attachEvent && e.attachEvent("on" + t, n)
            },
            de = function (t) {
                var n = {};
                return function (e) {
                    return e in n || (n[e] = t(e)), n[e]
                }
            },
            he = (y = /^([\d\.]+)(em|vw|px)$/, v = function () {
                for (var e = arguments, t = 0, n = e[0]; ++t in e;) n = n.replace(e[t], e[++t]);
                return n
            }, w = de(function (e) {
                return "return " + v((e || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
            }), function (e, t) {
                var n;
                if (!(e in K))
                    if (K[e] = !1, t && (n = e.match(y))) K[e] = n[1] * te[n[2]];
                    else try {
                        K[e] = new Function("e", w(e))(te)
                    } catch (r) {}
                return K[e]
            }),
            fe = function (e, t) {
                return e.w ? (e.cWidth = L.calcListLength(t || "100vw"), e.res = e.w / e.cWidth) : e.res = e.d, e
            },
            pe = function (e) {
                if (P) {
                    var t, n, i, r = e || {};
                    if (r.elements && 1 === r.elements.nodeType && ("IMG" === r.elements.nodeName.toUpperCase() ? r.elements = [r.elements] : (r.context = r.elements, r.elements = null)), i = (t = r.elements || L.qsa(r.context || o, r.reevaluate || r.reselect ? L.sel : L.selShort)).length) {
                        for (L.setupRun(r), ie = !0, n = 0; n < i; n++) L.fillImg(t[n], r);
                        L.teardownRun(r)
                    }
                }
            };
        i.console && console.warn, Y in D || (Y = "src"), R["image/jpeg"] = !0, R["image/gif"] = !0, R["image/png"] = !0, R["image/svg+xml"] = o.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), L.ns = ("pf" + (new Date).getTime()).substr(0, 9), L.supSrcset = "srcset" in D, L.supSizes = "sizes" in D, L.supPicture = !!i.HTMLPictureElement, L.supSrcset && L.supPicture && !L.supSizes && (M = o.createElement("img"), D.srcset = "data:,a", M.src = "data:,a", L.supSrcset = D.complete === M.complete, L.supPicture = L.supSrcset && L.supPicture), L.supSrcset && !L.supSizes ? (C = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==", E = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", A = o.createElement("img"), $ = function () {
            2 === A.width && (L.supSizes = !0), h = L.supSrcset && !L.supSizes, P = !0, setTimeout(pe)
        }, A.onload = $, A.onerror = $, A.setAttribute("sizes", "9px"), A.srcset = E + " 1w," + C + " 9w", A.src = E) : P = !0, L.selShort = "picture>img,img[srcset]", L.sel = L.selShort, L.cfg = H, L.DPR = ee || 1, L.u = te, L.types = R, L.setSize = I, L.makeUrl = de(function (e) {
            return ne.href = e, ne.href
        }), L.qsa = function (e, t) {
            return "querySelector" in e ? e.querySelectorAll(t) : []
        }, L.matchesMedia = function () {
            return i.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? L.matchesMedia = function (e) {
                return !e || matchMedia(e).matches
            } : L.matchesMedia = L.mMQ, L.matchesMedia.apply(this, arguments)
        }, L.mMQ = function (e) {
            return !e || he(e)
        }, L.calcLength = function (e) {
            var t = he(e, !0) || !1;
            return t < 0 && (t = !1), t
        }, L.supportsType = function (e) {
            return !e || R[e]
        }, L.parseSize = de(function (e) {
            var t = (e || "").match(V);
            return {
                media: t && t[1],
                length: t && t[2]
            }
        }), L.parseSet = function (e) {
            return e.cands || (e.cands = t(e.srcset, e)), e.cands
        }, L.getEmValue = function () {
            var e;
            if (!s && (e = o.body)) {
                var t = o.createElement("div"),
                    n = z.style.cssText,
                    i = e.style.cssText;
                t.style.cssText = Q, z.style.cssText = J, e.style.cssText = J, e.appendChild(t), s = t.offsetWidth, e.removeChild(t), s = parseFloat(s, 10), z.style.cssText = n, e.style.cssText = i
            }
            return s || 16
        }, L.calcListLength = function (e) {
            if (!(e in X) || H.uT) {
                var t = L.calcLength(n(e));
                X[e] = t || te.width
            }
            return X[e]
        }, L.setRes = function (e) {
            var t;
            if (e)
                for (var n = 0, i = (t = L.parseSet(e)).length; n < i; n++) fe(t[n], e.sizes);
            return t
        }, L.setRes.res = fe, L.applySetCandidate = function (e, t) {
            if (e.length) {
                var n, i, r, o, a, s, l, u, c, d = t[L.ns],
                    h = L.DPR;
                if (s = d.curSrc || t[Y], (l = d.curCan || g(t, s, e[0].set)) && l.set === e[0].set && ((c = B && !t.complete && l.res - .1 > h) || (l.cached = !0, l.res >= h && (a = l))), !a)
                    for (e.sort(p), a = e[(o = e.length) - 1], i = 0; i < o; i++)
                        if ((n = e[i]).res >= h) {
                            a = e[r = i - 1] && (c || s !== L.makeUrl(n.url)) && f(e[r].res, n.res, h, e[r].cached) ? e[r] : n;
                            break
                        } a && (u = L.makeUrl(a.url), d.curSrc = u, d.curCan = a, u !== s && L.setSrc(t, a), L.setSize(t))
            }
        }, L.setSrc = function (e, t) {
            var n;
            e.src = t.url, "image/svg+xml" === t.set.type && (n = e.style.width, e.style.width = e.offsetWidth + 1 + "px", e.offsetWidth + 1 && (e.style.width = n))
        }, L.getSet = function (e) {
            var t, n, i, r = !1,
                o = e[L.ns].sets;
            for (t = 0; t < o.length && !r; t++)
                if ((n = o[t]).srcset && L.matchesMedia(n.media) && (i = L.supportsType(n.type))) {
                    "pending" === i && (n = i), r = n;
                    break
                } return r
        }, L.parseSets = function (e, t, n) {
            var i, r, o, a, s = t && "PICTURE" === t.nodeName.toUpperCase(),
                l = e[L.ns];
            (l.src === u || n.src) && (l.src = O.call(e, "src"), l.src ? N.call(e, F, l.src) : j.call(e, F)), (l.srcset === u || n.srcset || !L.supSrcset || e.srcset) && (i = O.call(e, "srcset"), l.srcset = i, a = !0), l.sets = [], s && (l.pic = !0, d(t, l.sets)), l.srcset ? (r = {
                srcset: l.srcset,
                sizes: O.call(e, "sizes")
            }, l.sets.push(r), (o = (h || l.src) && U.test(l.srcset || "")) || !l.src || c(l.src, r) || r.has1x || (r.srcset += ", " + l.src, r.cands.push({
                url: l.src,
                d: 1,
                set: r
            }))) : l.src && l.sets.push({
                srcset: l.src,
                sizes: null
            }), l.curCan = null, l.curSrc = u, l.supported = !(s || r && !L.supSrcset || o && !L.supSizes), a && L.supSrcset && !l.supported && (i ? (N.call(e, q, i), e.srcset = "") : j.call(e, q)), l.supported && !l.srcset && (!l.src && e.src || e.src !== L.makeUrl(l.src)) && (null === l.src ? e.removeAttribute("src") : e.src = l.src), l.parsed = !0
        }, L.fillImg = function (e, t) {
            var n, i = t.reselect || t.reevaluate;
            e[L.ns] || (e[L.ns] = {}), n = e[L.ns], (i || n.evaled !== l) && ((!n.parsed || t.reevaluate) && L.parseSets(e, e.parentNode, t), n.supported ? n.evaled = l : a(e))
        }, L.setupRun = function () {
            (!ie || Z || ee !== i.devicePixelRatio) && r()
        }, L.supPicture ? (pe = I, L.fillImg = I) : (_ = i.attachEvent ? /d$|^c/ : /d$|^c|^i/, x = function () {
            var e = o.readyState || "";
            S = setTimeout(x, "loading" === e ? 200 : 999), o.body && (L.fillImgs(), (b = b || _.test(e)) && clearTimeout(S))
        }, S = setTimeout(x, o.body ? 9 : 99), k = function (t, n) {
            var i, r, o = function () {
                var e = new Date - r;
                e < n ? i = setTimeout(o, n - e) : (i = null, t())
            };
            return function () {
                r = new Date, i || (i = setTimeout(o, n))
            }
        }, T = z.clientHeight, ce(i, "resize", k(function () {
            Z = Math.max(i.innerWidth || 0, z.clientWidth) !== te.width || z.clientHeight !== T, T = z.clientHeight, Z && L.fillImgs()
        }, 99)), ce(o, "readystatechange", x)), L.picturefill = pe, L.fillImgs = pe, L.teardownRun = I, pe._ = L, i.picturefillCFG = {
            pf: L,
            push: function (e) {
                var t = e.shift();
                "function" == typeof L[t] ? L[t].apply(L, e) : (H[t] = e[0], ie && L.fillImgs({
                    reselect: !0
                }))
            }
        };
        for (; G && G.length;) i.picturefillCFG.push(G.shift());
        i.picturefill = pe, "object" == typeof module && "object" == typeof module.exports ? module.exports = pe : "function" == typeof define && define.amd && define("picturefill", function () {
            return pe
        }), L.supPicture || (R["image/webp"] = e("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
    }(window, document),
    function (I, D) {
        function O(e, t) {
            return new Date(e, t + 1, 0).getDate()
        }

        function c(e, t) {
            for (e = "" + e, t = t || 2; e.length < t;) e = "0" + e;
            return e
        }

        function d(e, t, n, i) {
            var r = t.getDate(),
                o = t.getDay(),
                a = t.getMonth(),
                s = t.getFullYear(),
                l = {
                    d: r,
                    dd: c(r),
                    ddd: H[i].shortDays[o],
                    dddd: H[i].days[o],
                    m: a + 1,
                    mm: c(a + 1),
                    mmm: H[i].shortMonths[a],
                    mmmm: H[i].months[a],
                    yy: String(s).slice(2),
                    yyyy: s
                },
                u = f[e](n, t, l, i);
            return p.html(u).html()
        }

        function N(e) {
            return parseInt(e, 10)
        }

        function j(e, t) {
            return e.getFullYear() === t.getFullYear() && e.getMonth() == t.getMonth() && e.getDate() == t.getDate()
        }

        function z(e) {
            if (e !== D) {
                if (e.constructor == Date) return e;
                if ("string" == typeof e) {
                    var t = e.split("-");
                    if (3 == t.length) return new Date(N(t[0]), N(t[1]) - 1, N(t[2]));
                    if (!/^-?\d+$/.test(e)) return;
                    e = N(e)
                }
                var n = new Date;
                return n.setDate(n.getDate() + e), n
            }
        }

        function r(o, f) {
            function p(e, t, n) {
                y = (C = e).getFullYear(), v = e.getMonth(), w = e.getDate(), n || (n = I.Event("api")), "click" != n.type || I.browser.msie || o.focus(), n.type = "beforeChange", l.trigger(n, [e]), n.isDefaultPrevented() || (o.val(d(t.formatter, e, t.format, t.lang)), l.change(), o.data("date", e), _.hide(n))
            }

            function n(e) {
                e.type = "onShow", l.trigger(e), I(document).on("keydown.d", function (e) {
                    if (e.ctrlKey) return !0;
                    var t = e.keyCode;
                    if (8 == t || 46 == t) return o.val(""), _.hide(e);
                    if (27 == t || 9 == t) return _.hide(e);
                    if (0 <= I(R).index(t)) {
                        if (!b) return _.show(e), e.preventDefault();
                        var n = I("#" + S.weeks + " a"),
                            i = I("." + S.focus),
                            r = n.index(i);
                        return i.removeClass(S.focus), 74 == t || 40 == t ? r += 7 : 75 == t || 38 == t ? r -= 7 : 76 == t || 39 == t ? r += 1 : 72 != t && 37 != t || (r -= 1), 41 < r ? (_.addMonth(), i = I("#" + S.weeks + " a:eq(" + (r - 42) + ")")) : r < 0 ? (_.addMonth(-1), i = I("#" + S.weeks + " a:eq(" + (r + 42) + ")")) : i = n.eq(r), i.addClass(S.focus), e.preventDefault()
                    }
                    return 34 == t ? _.addMonth() : 33 == t ? _.addMonth(-1) : 36 == t ? _.today() : (13 == t && (I(e.target).is("select") || I("." + S.focus).click()), 0 <= I([16, 17, 18, 9]).index(t))
                }), I(document).on("click.d", function (e) {
                    var t = e.target;
                    I(t).parents("#" + S.root).length || t == o[0] || i && t == i[0] || _.hide(e)
                })
            }
            var i, m, g, y, v, w, b, _ = this,
                x = new Date,
                e = x.getFullYear(),
                S = f.css,
                k = H[f.lang],
                r = I("#" + S.root),
                T = r.find("#" + S.title),
                C = o.attr("data-value") || f.value || o.val(),
                E = o.attr("min") || f.min,
                A = o.attr("max") || f.max,
                $ = o.attr("year-range") || f.yearRange;
            if (0 === E && (E = "0"), "string" == typeof $ && ($ = JSON.parse($)), C = z(C) || x, E = z(E || new Date(e + $[0], 1, 1)), A = z(A || new Date(e + $[1] + 1, 1, -1)), !k) throw "Dateinput: invalid language: " + f.lang;
            if ("date" == o.attr("type")) {
                var t, a = (t = o.clone()).wrap("<div/>").parent().html(),
                    s = I(a.replace(/type/i, "type=text data-orig-type"));
                f.value && s.val(f.value), o.replaceWith(s), o = s
            }
            o.addClass(S.input);
            var l = o.add(_);
            if (!r.length) {
                if ((r = I("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({
                        position: "absolute"
                    }).attr("id", S.root)).children().eq(0).attr("id", S.head).end().eq(1).attr("id", S.body).children().eq(0).attr("id", S.days).end().eq(1).attr("id", S.weeks).end().end().end().find("a").eq(0).attr("id", S.prev).end().eq(1).attr("id", S.next), T = r.find("#" + S.head).find("div").attr("id", S.title), f.selectors) {
                    var M = I("<select/>").attr("id", S.month),
                        L = I("<select/>").attr("id", S.year);
                    T.html(M.add(L))
                }
                for (var u = r.find("#" + S.days), c = 0; c < 7; c++) u.append(I("<span/>").text(k.shortDays[(c + f.firstDay) % 7]));
                I("body").append(r)
            }
            f.trigger && (i = I("<a/>").attr("href", "#").addClass(S.trigger).click(function (e) {
                return f.toggle ? _.toggle() : _.show(), e.preventDefault()
            }).insertAfter(o));
            var P = r.find("#" + S.weeks);
            L = r.find("#" + S.year), M = r.find("#" + S.month), I.extend(_, {
                show: function (e) {
                    if (!(o.attr("readonly") || o.attr("disabled") || b || ((e = e || I.Event()).type = "onBeforeShow", l.trigger(e), e.isDefaultPrevented()))) {
                        I.each(h, function () {
                            this.hide()
                        }), b = !0, M.off("change").change(function () {
                            _.setValue(N(L.val()), N(I(this).val()))
                        }), L.off("change").change(function () {
                            _.setValue(N(I(this).val()), N(M.val()))
                        }), m = r.find("#" + S.prev).off("click").click(function () {
                            return m.hasClass(S.disabled) || _.addMonth(-1), !1
                        }), g = r.find("#" + S.next).off("click").click(function () {
                            return g.hasClass(S.disabled) || _.addMonth(), !1
                        }), _.setValue(C);
                        var t = o.offset();
                        return /iPad/i.test(navigator.userAgent) && (t.top -= I(window).scrollTop()), r.css({
                            top: t.top + o.outerHeight(!0) + f.offset[0],
                            left: t.left + f.offset[1]
                        }), f.speed ? r.show(f.speed, function () {
                            n(e)
                        }) : (r.show(), n(e)), _
                    }
                },
                setValue: function (n, e, t) {
                    var i = -1 <= N(e) ? new Date(N(n), N(e), N(t == D || isNaN(t) ? 1 : t)) : n || C;
                    if (i < E ? i = E : A < i && (i = A), "string" == typeof n && (i = z(n)), n = i.getFullYear(), e = i.getMonth(), t = i.getDate(), -1 == e ? (e = 11, n--) : 12 == e && (e = 0, n++), !b) return p(i, f), _;
                    v = e, y = n, w = t;
                    var r, o = new Date(n, e, 1 - f.firstDay).getDay(),
                        a = O(n, e),
                        s = O(n, e - 1);
                    if (f.selectors) {
                        M.empty(), I.each(k.months, function (e, t) {
                            E < new Date(n, e + 1, 1) && A > new Date(n, e, 0) && M.append(I("<option/>").html(t).attr("value", e))
                        }), L.empty();
                        for (var l = x.getFullYear(), u = l + $[0]; u < l + $[1]; u++) E < new Date(u + 1, 0, 1) && A > new Date(u, 0, 0) && L.append(I("<option/>").text(u));
                        M.val(e), L.val(n)
                    } else T.html(k.months[e] + " " + n);
                    P.empty(), m.add(g).removeClass(S.disabled);
                    for (var c, d, h = o ? 0 : -7; h < (o ? 42 : 35); h++) c = I("<a/>"), h % 7 == 0 && (r = I("<div/>").addClass(S.week), P.append(r)), h < o ? (c.addClass(S.off), d = s - o + h + 1, i = new Date(n, e - 1, d)) : o + a <= h ? (c.addClass(S.off), d = h - a - o + 1, i = new Date(n, e + 1, d)) : (d = h - o + 1, i = new Date(n, e, d), j(C, i) ? c.attr("id", S.current).addClass(S.focus) : j(x, i) && c.attr("id", S.today)), E && i < E && c.add(m).addClass(S.disabled), A && A < i && c.add(g).addClass(S.disabled), c.attr("href", "#" + d).text(d).data("date", i), r.append(c);
                    return P.find("a").click(function (e) {
                        var t = I(this);
                        return t.hasClass(S.disabled) || (I("#" + S.current).removeAttr("id"), t.attr("id", S.current), p(t.data("date"), f, e)), !1
                    }), S.sunday && P.find("." + S.week).each(function () {
                        var e = f.firstDay ? 7 - f.firstDay : 0;
                        I(this).children().slice(e, e + 1).addClass(S.sunday)
                    }), _
                },
                setMin: function (e, t) {
                    return E = z(e), t && C < E && _.setValue(E), _
                },
                setMax: function (e, t) {
                    return A = z(e), t && A < C && _.setValue(A), _
                },
                today: function () {
                    return _.setValue(x)
                },
                addDay: function (e) {
                    return this.setValue(y, v, w + (e || 1))
                },
                addMonth: function (e) {
                    var t = v + (e || 1),
                        n = O(y, t),
                        i = w <= n ? w : n;
                    return this.setValue(y, t, i)
                },
                addYear: function (e) {
                    return this.setValue(y + (e || 1), v, w)
                },
                destroy: function () {
                    o.add(document).off("click.d keydown.d"), r.add(i).remove(), o.removeData("dateinput").removeClass(S.input), t && o.replaceWith(t)
                },
                hide: function (e) {
                    if (b) {
                        if ((e = I.Event()).type = "onHide", l.trigger(e), e.isDefaultPrevented()) return;
                        I(document).off("click.d keydown.d"), r.hide(), b = !1
                    }
                    return _
                },
                toggle: function () {
                    return _.isOpen() ? _.hide() : _.show()
                },
                getConf: function () {
                    return f
                },
                getInput: function () {
                    return o
                },
                getCalendar: function () {
                    return r
                },
                getValue: function (e) {
                    return e ? d(f.formatter, C, e, f.lang) : C
                },
                isOpen: function () {
                    return b
                }
            }), I.each(["onBeforeShow", "onShow", "change", "onHide"], function (e, t) {
                I.isFunction(f[t]) && I(_).on(t, f[t]), _[t] = function (e) {
                    return e && I(_).on(t, e), _
                }
            }), f.editable || o.on("focus.d click.d", _.show).keydown(function (e) {
                var t = e.keyCode;
                return !b && 0 <= I(R).index(t) ? (_.show(e), e.preventDefault()) : (8 != t && 46 != t || (o.val(""), l.change()), !!(e.shiftKey || e.ctrlKey || e.altKey || 9 == t) || e.preventDefault())
            }), z(o.val()) && p(C, f)
        }
        I.tools = I.tools || {
            version: "@VERSION"
        };
        var e, h = [],
            f = {},
            R = [75, 76, 38, 39, 74, 72, 40, 37],
            H = {};
        (e = I.tools.dateinput = {
            conf: {
                format: "mm/dd/yy",
                formatter: "default",
                selectors: !1,
                yearRange: [-5, 5],
                lang: "en",
                offset: [0, 0],
                speed: 0,
                firstDay: 0,
                min: D,
                max: D,
                trigger: 0,
                toggle: 0,
                editable: 0,
                css: {
                    prefix: "cal",
                    input: "date",
                    root: 0,
                    head: 0,
                    title: 0,
                    prev: 0,
                    next: 0,
                    month: 0,
                    year: 0,
                    days: 0,
                    body: 0,
                    weeks: 0,
                    today: 0,
                    current: 0,
                    week: 0,
                    off: 0,
                    sunday: 0,
                    focus: 0,
                    disabled: 0,
                    trigger: 0
                }
            },
            addFormatter: function (e, t) {
                f[e] = t
            },
            localize: function (e, n) {
                I.each(n, function (e, t) {
                    n[e] = t.split(",")
                }), H[e] = n
            }
        }).localize("en", {
            months: "January,February,March,April,May,June,July,August,September,October,November,December",
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
            days: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
            shortDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat"
        });
        var p = I("<a/>");
        e.addFormatter("default", function (e, t, n) {
            return e.replace(/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, function (e) {
                return e in n ? n[e] : e
            })
        }), e.addFormatter("prefixed", function (e, t, n) {
            return e.replace(/%(d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*')/g, function (e, t) {
                return t in n ? n[t] : e
            })
        }), I.expr[":"].date = function (e) {
            var t = e.getAttribute("type");
            return t && "date" == t || !!I(e).data("dateinput")
        }, I.fn.dateinput = function (n) {
            return this.data("dateinput") ? this : (n = I.extend(!0, {}, e.conf, n), I.each(n.css, function (e, t) {
                t || "prefix" == e || (n.css[e] = (n.css.prefix || "") + (t || e))
            }), this.each(function () {
                var e = new r(I(this), n);
                h.push(e);
                var t = e.getInput().data("dateinput", e);
                i = i ? i.add(t) : t
            }), i || this);
            var i
        }
    }(jQuery), $(document).ready(function () {
        $("body").on("click", ".detruncate", function (e) {
            e.preventDefault(), $(this).prev(".truncate-long").removeClass("truncate-long").addClass("truncated"), $(this).next(".retruncate").removeClass("hide"), $(this).addClass("hide")
        }).on("click", ".retruncate", function (e) {
            e.preventDefault(), $(this).siblings(".truncated").removeClass("truncated").addClass("truncate-long"), $(this).siblings(".detruncate").removeClass("hide"), $(this).addClass("hide"), t(this)
        });
        var t = function (e) {
                var t = $(e).next(".detruncate.hide");
                n(e) ? $(t).removeClass("hide") : $(t).addClass("hide")
            },
            n = function (e) {
                return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth
            },
            e = function () {
                $(".truncate-long").each(function () {
                    t(this)
                })
            };
        e(), document.addEventListener("pageLoad", e)
    }),
    function () {
        var n, u, i, e, c, d, t, r;
        d = 100, c = 1400, u = 20, n = i = null, r = function (e) {
            return (e = e || $("body")).find("#usersite-container, .zoogle-content, .feature, section#cart.cart").each(function () {
                var e, t, n, i, r, o, a, s, l;
                if ((e = $(this)).ensureVisible) {
                    for (l = e.ensureVisible(function () {
                            return e.width()
                        }), s = [], a = i = d, r = c, o = u; 0 < o ? i <= r : r <= i; a = i += o) s.push((a < l ? ">" : "<") + a);
                    return t = (e.hasClass("feature") ? "feature" : "content") + "-width", n = s.join(" "), e.attr(t, n), "usersite-container" === e.attr("id") ? $("html").attr(t, n) : void 0
                }
            })
        }, t = function (e) {
            var t;
            return null == e && (e = !1), t = n.width(), (e || t !== i) && r(), i = t
        }, e = function () {
            return n = $("#usersite-container"), t(!0), setTimeout(function () {
                return t(!0)
            }, 1), n.on("zoogle_refresh", function () {
                return t(!0)
            })
        }, $(window).on("resize", function (e, t) {
            var n, i;
            return n = $(window).width(), "featherlight" !== t && n === i || r(), n
        }), $.fn.traceFeatureWidths = function () {
            return r(this)
        }, $(function () {
            return e()
        }), document.addEventListener("pageLoad", e)
    }.call(this),
    function () {
        var e, t = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        };
        e = function () {
            function e() {
                return this.handlePageLoad = t(this.handlePageLoad, this), this._plugins = {}, this._currentTheme = this.blankJs(), this
            }
            return e.prototype.handlePageLoad = function () {
                return this._tearDown(), this._setup()
            }, e.prototype.blankJs = function () {
                return {
                    id: "void",
                    setup: $.noop,
                    tearDown: $.noop,
                    plugins: {}
                }
            }, e.prototype.registerPlugin = function (e) {
                return this._plugins[e.id] = e
            }, e.prototype.registerTheme = function (e, t) {
                return t.hasOwnProperty("setup") && t.hasOwnProperty("tearDown") && t.hasOwnProperty("plugins") ? (this._tearDown(), this._currentTheme = $.extend({
                    id: e
                }, t), this._setup()) : console.error("Tried to register Theme JS without matching definition")
            }, e.prototype.isWysiwyg = function () {
                return $("body").hasClass("wysiwyg")
            }, e.prototype.scrollContext = function (e) {
                var t;
                return null == e && (e = !0), t = $("#wysiwyg-designer").length ? "#usersite-container" : window, e ? $(t)[0] : t
            }, e.prototype._setup = function () {
                return this._runPlugins(), this._currentTheme.setup(this)
            }, e.prototype._tearDown = function () {
                return this._currentTheme.tearDown(this), this._runPlugins("tearDown")
            }, e.prototype._runPlugins = function (e) {
                var t, n, i, r;
                for (t in null == e && (e = "setup"), r = [], i = this._currentTheme.plugins) n = i[t], this._plugins.hasOwnProperty(t) ? r.push(this._plugins[t][e](n)) : r.push(console.error("No plugin found for " + t));
                return r
            }, e
        }(), window.themeJsManager = new e, $(function () {
            return window.themeJsManager.handlePageLoad(), document.addEventListener("pageLoad", window.themeJsManager.handlePageLoad)
        })
    }.call(this),
    function () {
        var e;
        e = function () {
            function e() {}
            return e.prototype.id = "scrollToContentTab", e.prototype.defaultOptions = {
                scrollTop: function () {
                    return $(window).height()
                },
                duration: 1e3
            }, e.prototype.setup = function (e) {
                var n;
                return null == e && (e = {}), n = $.extend({}, this.defaultOptions, e), $("#scroll-to-content").on("click", function () {
                    var e, t;
                    return e = $("#usersite-container").css("overflow"), t = "html, body", ($(".wysiwyg").length && "auto" === e || "scroll" === e) && (t = "#usersite-container"), $(t).animate({
                        scrollTop: n.scrollTop()
                    }, n.duration)
                })
            }, e.prototype.tearDown = function (e) {
                return null == e && (e = {}), $("#scroll-to-content").off("click")
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function () {
        var e;
        e = function () {
            function e() {
                return this
            }
            return e.prototype.id = "responsiveFullScreenPagePhoto", e.prototype.defaultOptions = {
                pageTypeClass: "landing-page",
                force: !1,
                selectors: ["#page-header", ".page-media-wrap"],
                doHeightAdjustment: !0,
                hasMobileHeaderHeightControl: !1
            }, e.prototype.eventName = "resize.responsiveFullScreenPagePhoto", e.prototype.containerEventName = "zoogle_refresh.responsiveFullScreenPagePhoto", e.prototype.isApplicationNecessary = function (e) {
                return !!e.force || (0 === $(".previewing-within-container").length || !(!$("html").hasClass("no-cssvhunit") && !Modernizr.ios))
            }, e.prototype.setup = function (e) {
                var a, t, n, i, s, r, o, l, u, c, d;
                if (null == e && (e = {}), s = $.extend({}, this.defaultOptions, e), this.isApplicationNecessary(s)) return o = function () {
                    if (c.mobileHeaderHeight !== t()) return r()
                }, r = function () {
                    var e, t, n, i, r, o;
                    if ($("#page-root").hasClass(s.pageTypeClass)) {
                        for (n = a(), r = [], e = 0, t = (i = s.selectors).length; e < t; e++) o = i[e], r.push($("#usersite-container " + o).css("height", n));
                        return r
                    }
                }, a = function () {
                    var e;
                    return e = $(".usersite-container-wrap").height(), $(".previewing-within-container").length && (e = $("#usersite-container").height()), Modernizr.iframed && (e = l()), s.doHeightAdjustment && (e -= n()), e -= i(e)
                }, l = function () {
                    return Modernizr.ios ? window.parent.$("#usersite_preview_frame_wrap").height() : $("html").height()
                }, n = function () {
                    var e;
                    return e = 0, $(".has-swmp").length && (e += $(".music-player.display-swmp").height()), e
                }, d = c = u = this, i = function (e) {
                    var t;
                    return t = 0, d.mobileHeaderHeight < 100 && (t = e * (100 - d.mobileHeaderHeight) / 100), t
                }, (t = function () {
                    var e;
                    return u.mobileHeaderHeight = 100, s.hasMobileHeaderHeightControl && 0 !== $(".mobile-view").length && ((e = window.getComputedStyle(document.documentElement)).getPropertyValue, "true" === e.getPropertyValue("--use-custom-mobile-header-height").trim() && (u.mobileHeaderHeight = parseInt(e.getPropertyValue("--mobile-header-height-number"), 10))), u.mobileHeaderHeight
                })(), r(), $(window).off(this.eventName).on(this.eventName, r), s.hasMobileHeaderHeightControl && $(".previewing-within-container").length ? $("#usersite-container").off(this.containerEventName).on(this.containerEventName, o) : void 0
            }, e.prototype.tearDown = function (e) {
                var t, n, i, r, o;
                if (null == e && (e = {}), i = $.extend({}, this.defaultOptions, e), this.isApplicationNecessary(i)) {
                    for (t = 0, n = (r = i.selectors).length; t < n; t++) o = r[t], $("#usersite-container " + o).css("height", "");
                    return $(window).off(this.eventName), $("#usersite-container").off(this.containerEventName)
                }
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function () {
        var e;
        e = function () {
            function e() {}
            return e.prototype.id = "setAsLogoSizeTarget", e.prototype.defaultOptions = {
                selector: ""
            }, e.prototype.attr = "data-logo-size-target", e.prototype.setup = function (e) {
                var t;
                return null == e && (e = {}), t = $.extend({}, this.defaultOptions, e), $(t.selector).attr(this.attr, "")
            }, e.prototype.tearDown = function (e) {
                var t;
                return null == e && (e = {}), t = $.extend({}, this.defaultOptions, e), $(t.selector).removeAttr(this.attr)
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function (u, S, k) {
        "use strict";

        function t(e) {
            if (_ = e.targetElement || S.documentElement, r = e.targetContainer || S.body, U(), le = this, fe = (e = e || {}).constants || {}, e.easing)
                for (var t in e.easing) Q[t] = e.easing[t];
            be = e.edgeStrategy || "set", de = {
                beforerender: e.beforerender,
                render: e.render,
                keyframe: e.keyframe
            }, (he = !1 !== e.forceHeight) && (je = e.scale || 1), pe = e.mobileDeceleration || h, ge = !1 !== e.smoothScrolling, ye = e.smoothScrollingDuration || p, ve = {
                targetTop: le.getScrollTop()
            }, (Ye = (e.mobileCheck || function () {
                return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || u.opera)
            })()) ? ((ce = S.getElementById(e.skrollrBody || f)) && se(), J(), Le(_, [o, l], [a])) : Le(_, [o, s], [a]), le.refresh(), Se(u, "resize orientationchange", function () {
                var e = _.clientWidth,
                    t = _.clientHeight;
                t === qe && e === Fe || (qe = t, Fe = e, We = !0)
            });
            var n = V();
            return function i() {
                X(), xe = n(i)
            }(), le
        }
        var _, r, T = {
                get: function () {
                    return le
                },
                init: function (e) {
                    return le || new t(e)
                },
                VERSION: "0.6.29"
            },
            C = Object.prototype.hasOwnProperty,
            x = u.Math,
            i = u.getComputedStyle,
            E = "touchstart",
            A = "touchmove",
            $ = "touchcancel",
            M = "touchend",
            L = "skrollable",
            P = L + "-before",
            I = L + "-between",
            D = L + "-after",
            o = "skrollr",
            a = "no-" + o,
            s = o + "-desktop",
            l = o + "-mobile",
            c = "linear",
            d = 1e3,
            h = .004,
            f = "skrollr-body",
            p = 200,
            O = "start",
            N = "end",
            m = "center",
            g = "bottom",
            j = "___skrollable_id",
            z = /^(?:input|textarea|button|select)$/i,
            n = /^\s+|\s+$/g,
            R = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
            y = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
            v = /^(@?[a-z\-]+)\[(\w+)\]$/,
            H = /-([a-z0-9_])/g,
            F = function (e, t) {
                return t.toUpperCase()
            },
            w = /[\-+]?[\d]*\.?[\d]+/g,
            b = /\{\?\}/g,
            q = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
            W = /[a-z\-]+-gradient/g,
            B = "",
            Y = "",
            U = function () {
                var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
                if (i) {
                    var t = i(r, null);
                    for (var n in t)
                        if (B = n.match(e) || +n == n && t[n].match(e)) break;
                    B ? "-" === (B = B[0]).slice(0, 1) ? B = {
                        "-webkit-": "webkit",
                        "-moz-": "Moz",
                        "-ms-": "ms",
                        "-o-": "O"
                    } [Y = B] : Y = "-" + B.toLowerCase() + "-" : B = Y = ""
                }
            },
            V = function () {
                var e = u.requestAnimationFrame || u[B.toLowerCase() + "RequestAnimationFrame"],
                    i = De();
                return !Ye && e || (e = function (e) {
                    var t = De() - i,
                        n = x.max(0, 1e3 / 60 - t);
                    return u.setTimeout(function () {
                        i = De(), e()
                    }, n)
                }), e
            },
            G = function () {
                var e = u.cancelAnimationFrame || u[B.toLowerCase() + "CancelAnimationFrame"];
                return !Ye && e || (e = function (e) {
                    return u.clearTimeout(e)
                }), e
            },
            Q = {
                begin: function () {
                    return 0
                },
                end: function () {
                    return 1
                },
                linear: function (e) {
                    return e
                },
                quadratic: function (e) {
                    return e * e
                },
                cubic: function (e) {
                    return e * e * e
                },
                swing: function (e) {
                    return -x.cos(e * x.PI) / 2 + .5
                },
                sqrt: function (e) {
                    return x.sqrt(e)
                },
                outCubic: function (e) {
                    return x.pow(e - 1, 3) + 1
                },
                bounce: function (e) {
                    var t;
                    if (e <= .5083) t = 3;
                    else if (e <= .8489) t = 9;
                    else if (e <= .96208) t = 27;
                    else {
                        if (!(e <= .99981)) return 1;
                        t = 91
                    }
                    return 1 - x.abs(3 * x.cos(e * t * 1.028) / t)
                }
            };
        t.prototype.refresh = function (e) {
            var t, n, i = !1;
            for (e === k ? (i = !0, ue = [], Be = 0, e = S.getElementsByTagName("*")) : e.length === k && (e = [e]), t = 0, n = e.length; t < n; t++) {
                var r = e[t],
                    o = r,
                    a = [],
                    s = ge,
                    l = be,
                    u = !1;
                if (i && j in r && delete r[j],
                    r.attributes) {
                    for (var c, d, h, f = 0, p = r.attributes.length; f < p; f++) {
                        var m = r.attributes[f];
                        if ("data-anchor-target" !== m.name)
                            if ("data-smooth-scrolling" !== m.name)
                                if ("data-edge-strategy" !== m.name)
                                    if ("data-emit-events" !== m.name) {
                                        var g = m.name.match(R);
                                        if (null !== g) {
                                            var y = {
                                                props: m.value,
                                                element: r,
                                                eventType: m.name.replace(H, F)
                                            };
                                            a.push(y);
                                            var v = g[1];
                                            v && (y.constant = v.substr(1));
                                            var w = g[2];
                                            /p$/.test(w) ? (y.isPercentage = !0, y.offset = (0 | w.slice(0, -1)) / 100) : y.offset = 0 | w;
                                            var b = g[3],
                                                _ = g[4] || b;
                                            b && b !== O && b !== N ? (y.mode = "relative", y.anchors = [b, _]) : (y.mode = "absolute", b === N ? y.isEnd = !0 : y.isPercentage || (y.offset = y.offset * je))
                                        }
                                    } else u = !0;
                        else l = m.value;
                        else s = "off" !== m.value;
                        else if (null === (o = S.querySelector(m.value))) throw 'Unable to find anchor target "' + m.value + '"'
                    }
                    if (a.length) !i && j in r ? (h = r[j], c = ue[h].styleAttr, d = ue[h].classAttr) : (h = r[j] = Be++, c = r.style.cssText, d = Me(r)), ue[h] = {
                        element: r,
                        styleAttr: c,
                        classAttr: d,
                        anchorTarget: o,
                        keyFrames: a,
                        smoothScrolling: s,
                        edgeStrategy: l,
                        emitEvents: u,
                        lastFrameIndex: -1
                    }, Le(r, [L], [])
                }
            }
            for (Ee(), t = 0, n = e.length; t < n; t++) {
                var x = ue[e[t][j]];
                x !== k && (ee(x), ne(x))
            }
            return le
        }, t.prototype.relativeToAbsolute = function (e, t, n) {
            var i = _.clientHeight,
                r = e.getBoundingClientRect(),
                o = r.top,
                a = r.bottom - r.top;
            return t === g ? o -= i : t === m && (o -= i / 2), n === g ? o += a : n === m && (o += a / 2), (o += le.getScrollTop()) + .5 | 0
        }, t.prototype.animateTo = function (e, t) {
            t = t || {};
            var n = De(),
                i = le.getScrollTop();
            return (me = {
                startTop: i,
                topDiff: e - i,
                targetTop: e,
                duration: t.duration || d,
                startTime: n,
                endTime: n + (t.duration || d),
                easing: Q[t.easing || c],
                done: t.done
            }).topDiff || (me.done && me.done.call(le, !1), me = k), le
        }, t.prototype.stopAnimateTo = function () {
            me && me.done && me.done.call(le, !0), me = k
        }, t.prototype.isAnimatingTo = function () {
            return !!me
        }, t.prototype.isMobile = function () {
            return Ye
        }, t.prototype.setScrollTop = function (e, t) {
            return we = !0 === t, Ye ? Ue = x.min(x.max(e, 0), Ne) : u.scrollTo(0, e), le
        }, t.prototype.getScrollTop = function () {
            return Ye ? Ue : u.pageYOffset || _.scrollTop || r.scrollTop || 0
        }, t.prototype.getMaxScrollTop = function () {
            return Ne
        }, t.prototype.on = function (e, t) {
            return de[e] = t, le
        }, t.prototype.off = function (e) {
            return delete de[e], le
        }, t.prototype.destroy = function () {
            G()(xe), Te(), Le(_, [a], [o, s, l]);
            for (var e = 0, t = ue.length; e < t; e++) ae(ue[e].element);
            _.style.overflow = r.style.overflow = "", _.style.height = r.style.height = "", ce && T.setStyle(ce, "transform", "none"), ze = "down", Ye = We = !(Re = -(je = 1)), Ue = Be = qe = Fe = Ne = 0, _e = be = we = ve = ye = ge = me = pe = fe = he = de = ce = le = k
        };
        var J = function () {
                var c, d, h, f, p, m, g, y, v, w, b;
                Se(_, [E, A, $, M].join(" "), function (e) {
                    var t = e.changedTouches[0];
                    for (f = e.target; 3 === f.nodeType;) f = f.parentNode;
                    switch (p = t.clientY, m = t.clientX, v = e.timeStamp, z.test(f.tagName) || e.preventDefault(), e.type) {
                        case E:
                            c && c.blur(), le.stopAnimateTo(), c = f, d = g = p, h = m, v;
                            break;
                        case A:
                            z.test(f.tagName) && S.activeElement !== f && e.preventDefault(), y = p - g, b = v - w, le.setScrollTop(Ue - y, !0), g = p, w = v;
                            break;
                        default:
                        case $:
                        case M:
                            var n = d - p,
                                i = h - m;
                            if (i * i + n * n < 49) {
                                if (!z.test(c.tagName)) {
                                    c.focus();
                                    var r = S.createEvent("MouseEvents");
                                    r.initMouseEvent("click", !0, !0, e.view, 1, t.screenX, t.screenY, t.clientX, t.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), c.dispatchEvent(r)
                                }
                                return
                            }
                            c = k;
                            var o = y / b;
                            o = x.max(x.min(o, 3), -3);
                            var a = x.abs(o / pe),
                                s = o * a + .5 * pe * a * a,
                                l = le.getScrollTop() - s,
                                u = 0;
                            Ne < l ? (u = (Ne - l) / s, l = Ne) : l < 0 && (u = -l / s, l = 0), a *= 1 - u, le.animateTo(l + .5 | 0, {
                                easing: "outCubic",
                                duration: a
                            })
                    }
                }), u.scrollTo(0, 0), _.style.overflow = r.style.overflow = "hidden"
            },
            Z = function () {
                var e, t, n, i, r, o, a, s, l, u, c, d = _.clientHeight,
                    h = Ae();
                for (s = 0, l = ue.length; s < l; s++)
                    for (t = (e = ue[s]).element, n = e.anchorTarget, r = 0, o = (i = e.keyFrames).length; r < o; r++) u = (a = i[r]).offset, c = h[a.constant] || 0, a.frame = u, a.isPercentage && (u *= d, a.frame = u), "relative" === a.mode && (ae(t), a.frame = le.relativeToAbsolute(n, a.anchors[0], a.anchors[1]) - u, ae(t, !0)), a.frame += c, he && !a.isEnd && a.frame > Ne && (Ne = a.frame);
                for (Ne = x.max(Ne, $e()), s = 0, l = ue.length; s < l; s++) {
                    for (r = 0, o = (i = (e = ue[s]).keyFrames).length; r < o; r++) c = h[(a = i[r]).constant] || 0, a.isEnd && (a.frame = Ne - a.offset + c);
                    e.keyFrames.sort(Oe)
                }
            },
            K = function (e, t) {
                for (var n = 0, i = ue.length; n < i; n++) {
                    var r, o, a = ue[n],
                        s = a.element,
                        l = a.smoothScrolling ? e : t,
                        u = a.keyFrames,
                        c = u.length,
                        d = u[0],
                        h = u[u.length - 1],
                        f = l < d.frame,
                        p = l > h.frame,
                        m = f ? d : h,
                        g = a.emitEvents,
                        y = a.lastFrameIndex;
                    if (f || p) {
                        if (f && -1 === a.edge || p && 1 === a.edge) continue;
                        switch (f ? (Le(s, [P], [D, I]), g && -1 < y && (Ce(s, d.eventType, ze), a.lastFrameIndex = -1)) : (Le(s, [D], [P, I]), g && y < c && (Ce(s, h.eventType, ze), a.lastFrameIndex = c)), a.edge = f ? -1 : 1, a.edgeStrategy) {
                            case "reset":
                                ae(s);
                                continue;
                            case "ease":
                                l = m.frame;
                                break;
                            default:
                            case "set":
                                var v = m.props;
                                for (r in v) C.call(v, r) && (o = oe(v[r].value), 0 === r.indexOf("@") ? s.setAttribute(r.substr(1), o) : T.setStyle(s, r, o));
                                continue
                        }
                    } else 0 !== a.edge && (Le(s, [L, I], [P, D]), a.edge = 0);
                    for (var w = 0; w < c - 1; w++)
                        if (l >= u[w].frame && l <= u[w + 1].frame) {
                            var b = u[w],
                                _ = u[w + 1];
                            for (r in b.props)
                                if (C.call(b.props, r)) {
                                    var x = (l - b.frame) / (_.frame - b.frame);
                                    x = b.props[r].easing(x), o = re(b.props[r].value, _.props[r].value, x), o = oe(o), 0 === r.indexOf("@") ? s.setAttribute(r.substr(1), o) : T.setStyle(s, r, o)
                                } g && y !== w && (Ce(s, "down" === ze ? b.eventType : _.eventType, ze), a.lastFrameIndex = w);
                            break
                        }
                }
            },
            X = function () {
                We && (We = !1, Ee());
                var e, t, n = le.getScrollTop(),
                    i = De();
                if (me) i >= me.endTime ? (n = me.targetTop, e = me.done, me = k) : (t = me.easing((i - me.startTime) / me.duration), n = me.startTop + t * me.topDiff | 0), le.setScrollTop(n, !0);
                else if (!we) {
                    ve.targetTop - n && (ve = {
                        startTop: Re,
                        topDiff: n - Re,
                        targetTop: n,
                        startTime: He,
                        endTime: He + ye
                    }), i <= ve.endTime && (t = Q.sqrt((i - ve.startTime) / ye), n = ve.startTop + t * ve.topDiff | 0)
                }
                if (we || Re !== n) {
                    var r = {
                        curTop: n,
                        lastTop: Re,
                        maxTop: Ne,
                        direction: ze = Re < n ? "down" : n < Re ? "up" : ze
                    };
                    (we = !1) !== (de.beforerender && de.beforerender.call(le, r)) && (K(n, le.getScrollTop()), Ye && ce && T.setStyle(ce, "transform", "translate(0, " + -Ue + "px) " + _e), Re = n, de.render && de.render.call(le, r)), e && e.call(le, !1)
                }
                He = i
            },
            ee = function (e) {
                for (var t = 0, n = e.keyFrames.length; t < n; t++) {
                    for (var i, r, o, a, s = e.keyFrames[t], l = {}; null !== (a = y.exec(s.props));) o = a[1], r = a[2], null !== (i = o.match(v)) ? (o = i[1], i = i[2]) : i = c, r = r.indexOf("!") ? te(r) : [r.slice(1)], l[o] = {
                        value: r,
                        easing: Q[i]
                    };
                    s.props = l
                }
            },
            te = function (e) {
                var t = [];
                return q.lastIndex = 0, e = e.replace(q, function (e) {
                    return e.replace(w, function (e) {
                        return e / 255 * 100 + "%"
                    })
                }), Y && (W.lastIndex = 0, e = e.replace(W, function (e) {
                    return Y + e
                })), e = e.replace(w, function (e) {
                    return t.push(+e), "{?}"
                }), t.unshift(e), t
            },
            ne = function (e) {
                var t, n, i = {};
                for (t = 0, n = e.keyFrames.length; t < n; t++) ie(e.keyFrames[t], i);
                for (i = {}, t = e.keyFrames.length - 1; 0 <= t; t--) ie(e.keyFrames[t], i)
            },
            ie = function (e, t) {
                var n;
                for (n in t) C.call(e.props, n) || (e.props[n] = t[n]);
                for (n in e.props) t[n] = e.props[n]
            },
            re = function (e, t, n) {
                var i, r = e.length;
                if (r !== t.length) throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
                var o = [e[0]];
                for (i = 1; i < r; i++) o[i] = e[i] + (t[i] - e[i]) * n;
                return o
            },
            oe = function (e) {
                var t = 1;
                return b.lastIndex = 0, e[0].replace(b, function () {
                    return e[t++]
                })
            },
            ae = function (e, t) {
                for (var n, i, r = 0, o = (e = [].concat(e)).length; r < o; r++) i = e[r], (n = ue[i[j]]) && (t ? (i.style.cssText = n.dirtyStyleAttr, Le(i, n.dirtyClassAttr)) : (n.dirtyStyleAttr = i.style.cssText, n.dirtyClassAttr = Me(i), i.style.cssText = n.styleAttr, Le(i, n.classAttr)))
            },
            se = function () {
                _e = "translateZ(0)", T.setStyle(ce, "transform", _e);
                var e = i(ce),
                    t = e.getPropertyValue("transform"),
                    n = e.getPropertyValue(Y + "transform");
                t && "none" !== t || n && "none" !== n || (_e = "")
            };
        T.setStyle = function (e, t, n) {
            var i = e.style;
            if ("zIndex" === (t = t.replace(H, F).replace("-", ""))) isNaN(n) ? i[t] = n : i[t] = "" + (0 | n);
            else if ("float" === t) i.styleFloat = i.cssFloat = n;
            else try {
                B && (i[B + t.slice(0, 1).toUpperCase() + t.slice(1)] = n), i[t] = n
            } catch (r) {}
        };
        var le, ue, ce, de, he, fe, pe, me, ge, ye, ve, we, be, _e, xe, Se = T.addEvent = function (e, t, n) {
                for (var i, r = function (e) {
                        return (e = e || u.event).target || (e.target = e.srcElement), e.preventDefault || (e.preventDefault = function () {
                            e.returnValue = !1, e.defaultPrevented = !0
                        }), n.call(this, e)
                    }, o = 0, a = (t = t.split(" ")).length; o < a; o++) i = t[o], e.addEventListener ? e.addEventListener(i, n, !1) : e.attachEvent("on" + i, r), Ve.push({
                    element: e,
                    name: i,
                    listener: n
                })
            },
            ke = T.removeEvent = function (e, t, n) {
                for (var i = 0, r = (t = t.split(" ")).length; i < r; i++) e.removeEventListener ? e.removeEventListener(t[i], n, !1) : e.detachEvent("on" + t[i], n)
            },
            Te = function () {
                for (var e, t = 0, n = Ve.length; t < n; t++) e = Ve[t], ke(e.element, e.name, e.listener);
                Ve = []
            },
            Ce = function (e, t, n) {
                de.keyframe && de.keyframe.call(le, e, t, n)
            },
            Ee = function () {
                var e = le.getScrollTop();
                Ne = 0, he && !Ye && (r.style.height = ""), Z(), he && !Ye && (r.style.height = Ne + _.clientHeight + "px"), Ye ? le.setScrollTop(x.min(le.getScrollTop(), Ne)) : le.setScrollTop(e, !0), we = !0
            },
            Ae = function () {
                var e, t, n = _.clientHeight,
                    i = {};
                for (e in fe) "function" == typeof (t = fe[e]) ? t = t.call(le) : /p$/.test(t) && (t = t.slice(0, -1) / 100 * n), i[e] = t;
                return i
            },
            $e = function () {
                var e = 0;
                return ce && (e = x.max(ce.offsetHeight, ce.scrollHeight)), x.max(e, r.scrollHeight, r.offsetHeight, _.scrollHeight, _.offsetHeight, _.clientHeight) - _.clientHeight
            },
            Me = function (e) {
                var t = "className";
                return u.SVGElement && e instanceof u.SVGElement && (e = e[t], t = "baseVal"), e[t]
            },
            Le = function (e, t, n) {
                var i = "className";
                if (u.SVGElement && e instanceof u.SVGElement && (e = e[i], i = "baseVal"), n !== k) {
                    for (var r = e[i], o = 0, a = n.length; o < a; o++) r = Ie(r).replace(Ie(n[o]), " ");
                    r = Pe(r);
                    for (var s = 0, l = t.length; s < l; s++) - 1 === Ie(r).indexOf(Ie(t[s])) && (r += " " + t[s]);
                    e[i] = Pe(r)
                } else e[i] = t
            },
            Pe = function (e) {
                return e.replace(n, "")
            },
            Ie = function (e) {
                return " " + e + " "
            },
            De = Date.now || function () {
                return +new Date
            },
            Oe = function (e, t) {
                return e.frame - t.frame
            },
            Ne = 0,
            je = 1,
            ze = "down",
            Re = -1,
            He = De(),
            Fe = 0,
            qe = 0,
            We = !1,
            Be = 0,
            Ye = !1,
            Ue = 0,
            Ve = [];
        "function" == typeof define && define.amd ? define([], function () {
            return T
        }) : "undefined" != typeof module && module.exports ? module.exports = T : u.skrollr = T
    }(window, document),
    function () {
        function r(n) {
            var e = n.target || n.srcElement;
            e.__resizeRAF__ && l(e.__resizeRAF__), e.__resizeRAF__ = i(function () {
                var t = e.__resizeTrigger__;
                t.__resizeListeners__.forEach(function (e) {
                    e.call(t, n)
                })
            })
        }

        function o() {
            this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__, this.contentDocument.defaultView.addEventListener("resize", r)
        }
        var t, n, a = document.attachEvent,
            s = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/),
            i = (t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (e) {
                return window.setTimeout(e, 20)
            }, function (e) {
                return t(e)
            }),
            l = (n = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout, function (e) {
                return n(e)
            });
        window.addResizeListener = function (e, t, n) {
            if (!e.__resizeListeners__)
                if (e.__resizeListeners__ = [], a)(e.__resizeTrigger__ = e).attachEvent("onresize", r);
                else {
                    n = void 0 === n || n, "static" == getComputedStyle(e).position && n && (e.style.position = "relative");
                    var i = e.__resizeTrigger__ = document.createElement("object");
                    i.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;"), i.__resizeElement__ = e, i.onload = o, i.type = "text/html", s && e.appendChild(i), i.data = "about:blank", s || e.appendChild(i)
                } e.__resizeListeners__.push(t)
        }, window.removeResizeListener = function (e, t) {
            e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t), 1), e.__resizeListeners__.length || (a ? e.detachEvent("onresize", r) : (e.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize", r), e.__resizeTrigger__ = !e.removeChild(e.__resizeTrigger__)))
        }
    }(),
    function () {
        var e;
        e = function () {
            function e() {}
            return e.prototype.id = "parallaxyPagePhoto", e.prototype.defaultOptions = {
                containerSelector: "#page-media",
                elementSelector: ".page-media-wrap",
                scrollSpeed: 1
            }, e.prototype.enabled = !window.location.href.match("disable_header_parallax=true"), e.prototype._getDimensions = function () {
                var e;
                if ((e = $(this._opts.containerSelector)).length) return this._sectionHeight = e.outerHeight(), "undefined" == typeof this._sectionTop && (this._sectionTop = e.offset().top), this._scrollEnd = this._sectionTop + this._sectionHeight
            }, e.prototype._onScroll = function () {
                var e, t;
                if (e = (t = $(window.themeJsManager.scrollContext()).scrollTop()) - this._scrollStart, t < this._scrollEnd) return this._element || (this._element = $(this._opts.elementSelector)), this._element.css({
                    transform: "translateY(" + (e * this._opts.scrollSpeed - e) + "px)"
                })
            }, e.prototype.setup = function (e) {
                var t, n;
                if (null == e && (e = {}), this._opts = $.extend({}, this.defaultOptions, e), this._scrollStart = 0, this._getDimensions(), $(window.themeJsManager.scrollContext()).on("scroll.parallaxyPagePhoto", (t = this, function () {
                        return t._onScroll()
                    })), $(window).on("resize.parallaxyPagePhoto", (n = this, function () {
                        return n._getDimensions()
                    })), $(this._opts.containerSelector).length) return this._element = $(this._opts.elementSelector), window.addResizeListener($(this._opts.containerSelector)[0], this._getDimensions.bind(this), !1)
            }, e.prototype.tearDown = function () {
                $(window.themeJsManager.scrollContext()).off("scroll.parallaxyPagePhoto"), $(window).off("resize.parallaxyPagePhoto");
                try {
                    if ($(this._opts.containerSelector).length) return window.removeResizeListener($(this._opts.containerSelector)[0], this._getDimensions)
                } catch (e) {
                    e
                }
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function () {
        "use strict";

        function t(e) {
            if (!e) throw new Error("No options passed to Waypoint constructor");
            if (!e.element) throw new Error("No element option passed to Waypoint constructor");
            if (!e.handler) throw new Error("No handler option passed to Waypoint constructor");
            this.key = "waypoint-" + n, this.options = t.Adapter.extend({}, t.defaults, e), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = e.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis
            }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), o[this.key] = this, n += 1
        }
        var n = 0,
            o = {};
        t.prototype.queueTrigger = function (e) {
            this.group.queueTrigger(this, e)
        }, t.prototype.trigger = function (e) {
            this.enabled && this.callback && this.callback.apply(this, e)
        }, t.prototype.destroy = function () {
            this.context.remove(this), this.group.remove(this), delete o[this.key]
        }, t.prototype.disable = function () {
            return this.enabled = !1, this
        }, t.prototype.enable = function () {
            return this.context.refresh(), this.enabled = !0, this
        }, t.prototype.next = function () {
            return this.group.next(this)
        }, t.prototype.previous = function () {
            return this.group.previous(this)
        }, t.invokeAll = function (e) {
            var t = [];
            for (var n in o) t.push(o[n]);
            for (var i = 0, r = t.length; i < r; i++) t[i][e]()
        }, t.destroyAll = function () {
            t.invokeAll("destroy")
        }, t.disableAll = function () {
            t.invokeAll("disable")
        }, t.enableAll = function () {
            t.invokeAll("enable")
        }, t.refreshAll = function () {
            t.Context.refreshAll()
        }, t.viewportHeight = function () {
            return window.innerHeight || document.documentElement.clientHeight
        }, t.viewportWidth = function () {
            return document.documentElement.clientWidth
        }, t.adapters = [], t.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: "default",
            horizontal: !1,
            offset: 0
        }, t.offsetAliases = {
            "bottom-in-view": function () {
                return this.context.innerHeight() - this.adapter.outerHeight()
            },
            "right-in-view": function () {
                return this.context.innerWidth() - this.adapter.outerWidth()
            }
        }, window.Waypoint = t
    }(),
    function () {
        "use strict";

        function t(e) {
            window.setTimeout(e, 1e3 / 60)
        }

        function n(e) {
            this.element = e, this.Adapter = o.Adapter, this.adapter = new this.Adapter(e), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }, this.waypoints = {
                vertical: {},
                horizontal: {}
            }, e.waypointContextKey = this.key, r[e.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
        }
        var i = 0,
            r = {},
            o = window.Waypoint,
            e = window.onload;
        n.prototype.add = function (e) {
            var t = e.options.horizontal ? "horizontal" : "vertical";
            this.waypoints[t][e.key] = e, this.refresh()
        }, n.prototype.checkEmpty = function () {
            var e = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                t = this.Adapter.isEmptyObject(this.waypoints.vertical);
            e && t && (this.adapter.off(".waypoints"), delete r[this.key])
        }, n.prototype.createThrottledResizeHandler = function () {
            function e() {
                t.handleResize(), t.didResize = !1
            }
            var t = this;
            this.adapter.on("resize.waypoints", function () {
                t.didResize || (t.didResize = !0, o.requestAnimationFrame(e))
            })
        }, n.prototype.createThrottledScrollHandler = function () {
            function e() {
                t.handleScroll(), t.didScroll = !1
            }
            var t = this;
            this.adapter.on("scroll.waypoints", function () {
                (!t.didScroll || o.isTouch) && (t.didScroll = !0, o.requestAnimationFrame(e))
            })
        }, n.prototype.handleResize = function () {
            o.Context.refreshAll()
        }, n.prototype.handleScroll = function () {
            var e = {},
                t = {
                    horizontal: {
                        newScroll: this.adapter.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.adapter.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
            for (var n in t) {
                var i = t[n],
                    r = i.newScroll > i.oldScroll ? i.forward : i.backward;
                for (var o in this.waypoints[n]) {
                    var a = this.waypoints[n][o],
                        s = i.oldScroll < a.triggerPoint,
                        l = i.newScroll >= a.triggerPoint;
                    (s && l || !s && !l) && (a.queueTrigger(r), e[a.group.id] = a.group)
                }
            }
            for (var u in e) e[u].flushTriggers();
            this.oldScroll = {
                x: t.horizontal.newScroll,
                y: t.vertical.newScroll
            }
        }, n.prototype.innerHeight = function () {
            return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
        }, n.prototype.remove = function (e) {
            delete this.waypoints[e.axis][e.key], this.checkEmpty()
        }, n.prototype.innerWidth = function () {
            return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
        }, n.prototype.destroy = function () {
            var e = [];
            for (var t in this.waypoints)
                for (var n in this.waypoints[t]) e.push(this.waypoints[t][n]);
            for (var i = 0, r = e.length; i < r; i++) e[i].destroy()
        }, n.prototype.refresh = function () {
            var e, t = this.element == this.element.window,
                n = this.adapter.offset(),
                i = {};
            for (var r in this.handleScroll(), e = {
                    horizontal: {
                        contextOffset: t ? 0 : n.left,
                        contextScroll: t ? 0 : this.oldScroll.x,
                        contextDimension: this.innerWidth(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: t ? 0 : n.top,
                        contextScroll: t ? 0 : this.oldScroll.y,
                        contextDimension: this.innerHeight(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }) {
                var o = e[r];
                for (var a in this.waypoints[r]) {
                    var s, l, u, c, d = this.waypoints[r][a],
                        h = d.options.offset,
                        f = d.triggerPoint,
                        p = 0,
                        m = null == f;
                    d.element !== d.element.window && (p = d.adapter.offset()[o.offsetProp]), "function" == typeof h ? h = h.apply(d) : "string" == typeof h && (h = parseFloat(h), -1 < d.options.offset.indexOf("%") && (h = Math.ceil(o.contextDimension * h / 100))), s = o.contextScroll - o.contextOffset, d.triggerPoint = p + s - h, l = f < o.oldScroll, u = d.triggerPoint >= o.oldScroll, c = !l && !u, !m && (l && u) ? (d.queueTrigger(o.backward), i[d.group.id] = d.group) : !m && c ? (d.queueTrigger(o.forward), i[d.group.id] = d.group) : m && o.oldScroll >= d.triggerPoint && (d.queueTrigger(o.forward), i[d.group.id] = d.group)
                }
            }
            for (var g in i) i[g].flushTriggers();
            return this
        }, n.findOrCreateByElement = function (e) {
            return n.findByElement(e) || new n(e)
        }, n.refreshAll = function () {
            for (var e in r) r[e].refresh()
        }, n.findByElement = function (e) {
            return r[e.waypointContextKey]
        }, window.onload = function () {
            e && e(), n.refreshAll()
        }, o.requestAnimationFrame = function (e) {
            (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t).call(window, e)
        }, o.Context = n
    }(),
    function () {
        "use strict";

        function a(e, t) {
            return e.triggerPoint - t.triggerPoint
        }

        function s(e, t) {
            return t.triggerPoint - e.triggerPoint
        }

        function t(e) {
            this.name = e.name, this.axis = e.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), n[this.axis][this.name] = this
        }
        var n = {
                vertical: {},
                horizontal: {}
            },
            i = window.Waypoint;
        t.prototype.add = function (e) {
            this.waypoints.push(e)
        }, t.prototype.clearTriggerQueues = function () {
            this.triggerQueues = {
                up: [],
                down: [],
                left: [],
                right: []
            }
        }, t.prototype.flushTriggers = function () {
            for (var e in this.triggerQueues) {
                var t = this.triggerQueues[e],
                    n = "up" === e || "left" === e;
                t.sort(n ? s : a);
                for (var i = 0, r = t.length; i < r; i += 1) {
                    var o = t[i];
                    (o.options.continuous || i === t.length - 1) && o.trigger([e])
                }
            }
            this.clearTriggerQueues()
        }, t.prototype.next = function (e) {
            this.waypoints.sort(a);
            var t = i.Adapter.inArray(e, this.waypoints);
            return t === this.waypoints.length - 1 ? null : this.waypoints[t + 1]
        }, t.prototype.previous = function (e) {
            this.waypoints.sort(a);
            var t = i.Adapter.inArray(e, this.waypoints);
            return t ? this.waypoints[t - 1] : null
        }, t.prototype.queueTrigger = function (e, t) {
            this.triggerQueues[t].push(e)
        }, t.prototype.remove = function (e) {
            var t = i.Adapter.inArray(e, this.waypoints); - 1 < t && this.waypoints.splice(t, 1)
        }, t.prototype.first = function () {
            return this.waypoints[0]
        }, t.prototype.last = function () {
            return this.waypoints[this.waypoints.length - 1]
        }, t.findOrCreate = function (e) {
            return n[e.axis][e.name] || new t(e)
        }, i.Group = t
    }(),
    function () {
        "use strict";

        function n(e) {
            this.$element = i(e)
        }
        var i = window.jQuery,
            e = window.Waypoint;
        i.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, t) {
            n.prototype[t] = function () {
                var e = Array.prototype.slice.call(arguments);
                return this.$element[t].apply(this.$element, e)
            }
        }), i.each(["extend", "inArray", "isEmptyObject"], function (e, t) {
            n[t] = i[t]
        }), e.adapters.push({
            name: "jquery",
            Adapter: n
        }), e.Adapter = n
    }(),
    function () {
        "use strict";

        function e(r) {
            return function (e, t) {
                var n = [],
                    i = e;
                return r.isFunction(arguments[0]) && ((i = r.extend({}, t)).handler = arguments[0]), this.each(function () {
                    var e = r.extend({}, i, {
                        element: this
                    });
                    "string" == typeof e.context && (e.context = r(this).closest(e.context)[0]), n.push(new o(e))
                }), n
            }
        }
        var o = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = e(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = e(window.Zepto))
    }(),
    function () {
        "use strict";

        function t(e) {
            this.options = n.extend({}, r.defaults, t.defaults, e), this.element = this.options.element, this.$element = n(this.element), this.createWrapper(), this.createWaypoint()
        }
        var n = window.jQuery,
            r = window.Waypoint;
        t.prototype.createWaypoint = function () {
            var i = this.options.handler;
            this.waypoint = new r(n.extend({}, this.options, {
                element: this.wrapper,
                handler: n.proxy(function (e) {
                    var t = -1 < this.options.direction.indexOf(e),
                        n = t ? this.$element.outerHeight(!0) : "";
                    this.$wrapper.height(n), this.$element.toggleClass(this.options.stuckClass, t), i && i.call(this, e)
                }, this)
            }))
        }, t.prototype.createWrapper = function () {
            this.$element.wrap(this.options.wrapper), this.$wrapper = this.$element.parent(), this.wrapper = this.$wrapper[0]
        }, t.prototype.destroy = function () {
            this.$element.parent()[0] === this.wrapper && (this.waypoint.destroy(), this.$element.removeClass(this.options.stuckClass).unwrap())
        }, t.defaults = {
            wrapper: '<div class="sticky-wrapper" />',
            stuckClass: "stuck",
            direction: "down right"
        }, r.Sticky = t
    }(),
    function () {
        var e;
        e = function () {
            function e() {}
            return e.prototype.id = "waypoints", e.prototype.defaultOptions = {
                points: {}
            }, e.prototype.setup = function (e) {
                var t, n, i, r, o, a, s;
                for (a in null == e && (e = {}), o = [], r = $.extend({}, this.defaultOptions, e).points) i = r[a], n = $.extend({
                    handler: $.noop,
                    context: window.themeJsManager.scrollContext(!1)
                }, i), s = (t = $(a)).waypoint(n), o.push(t.data("waypointInstances", s));
                return o
            }, e.prototype.tearDown = function (e) {
                var t, n, i, r, o, a, s, l;
                for (s in null == e && (e = {}), a = [], o = $.extend({}, this.defaultOptions, e).points) {
                    for (n = o[s], t = $("selector"), "function" == typeof n.tearDown && n.tearDown(), i = 0, r = (l = t.data("waypointInstances") || []).length; i < r; i++) l[i].destroy();
                    a.push(t.data("waypointInstances", null))
                }
                return a
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function () {
        var e;
        e = function () {
            function e() {}
            return e.prototype.id = "navTitleNextToFlexbox", e.prototype.eventName = "resize.navTitleNextToFlexbox", e.prototype.containerEventName = "zoogle_refresh.navTitleNextToFlexbox", e.prototype._checkNav = function () {
                return this._getContainerWidth() < this._getTitleWidth() + this._getNavWidth() ? this.container.addClass("multiple-line") : this.container.removeClass("multiple-line")
            }, e.prototype._getContainerWidth = function () {
                return this.container.width()
            }, e.prototype._getNavWidth = function () {
                var e, t;
                return t = this.nav.width(), e = 0, this.navItem.each(function () {
                    return e += $(this).width()
                }), e < t ? t : e
            }, e.prototype._getTitleWidth = function () {
                return this.title.outerWidth(!0)
            }, e.prototype.setup = function (e) {
                if (null == e && (e = {}), this.container = $(".title-nav-container"), this.nav = $(".nav-bar"), this.navItem = $("#main-nav.non-mobile ul li.top"), this.title = $(".page-title"), this.resizeListenerFn = this._checkNav.bind(this), this.resizeListenerFn(), setTimeout(this.resizeListenerFn, 100), setTimeout(this.resizeListenerFn, 300), $(window).on(this.eventName, this.resizeListenerFn), 0 < $(".previewing-within-container").length) return $("#usersite-container").on(this.containerEventName, this.resizeListenerFn)
            }, e.prototype.tearDown = function (e) {
                return null == e && (e = {}), $(window).off(this.eventName, this.resizeListenerFn), $("#usersite-container").off(this.containerEventName, this.resizeListenerFn)
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function () {
        var e;
        e = function () {
            function e() {}
            return e.prototype.id = "hasScrolledCheck", e.prototype._scrollCheck = function () {
                return this.$html.removeClass("never-scrolled"), 20 < this.$window.scrollTop() || 20 < this.$container.scrollTop() ? this.$html.addClass("scrolled") : this.$html.removeClass("scrolled")
            }, e.prototype._debounce = function (e, t, n) {
                return i = this,
                    function () {
                        return i.delayHandler && clearTimeout(i.delayHandler), i.delayHandler = setTimeout(function () {
                            return e.call(n)
                        }, t)
                    };
                var i
            }, e.prototype.setup = function (e) {
                return null == e && (e = {}), this.$html = $("html"), this.$window = $(window), this.$container = $("#usersite-container"), this.$html.addClass("never-scrolled"), this.scrollListenerFn = this._debounce(this._scrollCheck, 50, this), this.$window.on("scroll", this.scrollListenerFn), this.$container.on("scroll", this.scrollListenerFn)
            }, e.prototype.tearDown = function (e) {
                return null == e && (e = {}), this.$window.off("scroll", this.scrollListenerFn), this.$container.off("scroll", this.scrollListenerFn)
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function () {
        var e, t = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        };
        e = function () {
            function e() {
                this._toggleMobileMenu = t(this._toggleMobileMenu, this)
            }
            return e.prototype.id = "secondaryMobileMenuStyle", e.prototype._adjustHeight = function () {
                var e, t;
                return e = $("aside.sidebar").outerHeight(), t = $(".display-swmp").outerHeight(), $("#main-nav.mobile").css({
                    top: e,
                    bottom: t
                })
            }, e.prototype._toggleMobileMenu = function () {
                return this._adjustHeight(), $(".mobile-nav-toggle").toggleClass("closed").toggleClass("open"), $("body").toggleClass("mobile-nav-open-sidebar")
            }, e.prototype.setup = function (e) {
                return null == e && (e = {}), $(".mobile-nav-toggle, #main-nav.mobile a").on("click", this._toggleMobileMenu), $(window).on("resize.secondaryMobileMenuStyle", this._adjustHeight)
            }, e.prototype.tearDown = function (e) {
                return null == e && (e = {}), $(".mobile-nav-toggle, #main-nav.mobile a").off("click", this._toggleMobileMenu), $(window).off("resize.secondaryMobileMenuStyle", this._adjustHeight)
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function () {
        var e;
        e = function () {
            function e() {}
            return e.prototype.id = "navDesktopHamburger", e.prototype._toggleNav = function (e, t) {
                var n;
                if (null == e && (e = !1), null == t && (t = !1), !(0 < $(".mobile-view").length)) return n = !this.body.hasClass("mobile-nav-open"), e && (n = t), this.root.toggleClass("mobile-nav-open", n), this.overlay.toggleClass("mobile-nav-open", n), this.body.toggleClass("mobile-nav-open", n), this.desktopHamburgerNavIcon.toggleClass("icon-close", n), this.desktopHamburgerNavIcon.toggleClass("icon-hamburger", !n)
            }, e.prototype.setup = function (e) {
                var t, n;
                return null == e && (e = {}), this.body = $("body"), this.nav = $(".nav-bar"), this.root = $("#page-root"), this.desktopHamburgerNav = $(".toggle-mobile-menu"), this.desktopHamburgerNavIcon = $("#toggle-mobile-menu i"), this.navItem = $("#main-nav.mobile a"), this.overlay = $(".mobile-nav-open-site-overlay"), this.body.addClass("desktop-hamburger-nav"), n = this._toggleNav.bind(this, !1, !1), this.desktopHamburgerNav.on("click.navDesktopHamburger", n), t = this._toggleNav.bind(this, !0, !1), this.overlay.on("click.navDesktopHamburger", t), 0 === $(".wysiwyg .state-content").length ? this.navItem.on("click.navDesktopHamburger", t) : t()
            }, e.prototype.tearDown = function (e) {
                return null == e && (e = {}), this.desktopHamburgerNav.off("click.navDesktopHamburger"), this.overlay.on("click.navDesktopHamburger"), this.navItem.off("click.navDesktopHamburger"), this.body.removeClass("desktop-hamburger-nav")
            }, e
        }(), window.themeJsManager.registerPlugin(new e)
    }.call(this),
    function () {}.call(this),
    function () {}.call(this), $(document).ready(function () {
        $(document).on("click", ".calendar_feature .table-style tbody td, .bandsintown_feature .table-style tbody td", function (e) {
            0 == $(e.target).closest("a").length && $("a:first", this).click()
        });
        var e = function () {
            $(".calendar_feature .carousel").carousel()
        };
        e(), document.addEventListener("pageLoad", e), $.prepareUsersiteEventsCarousel = e
    }), $(document).ready(function () {
        var e = function (e) {
                var t, n, i, r, o;
                if (0 !== (t = (n = $(this).closest("form")).find("input[name='cart_item[price]']")).length && (i = parseFloat(t.data("minPrice")), o = t.val(), r = parseFloat(o), "" === o || isNaN(r) || r < i)) return n.find(".min-price-alert").removeClass("hide"), e.preventDefault(), e.stopImmediatePropagation()
            },
            t = function (e) {
                var r, o, t, a, n;
                return e.preventDefault(), n = "/go/cart", a = !(r = {}), o = null, $(".cart-items .cart-item").each(function (e, t) {
                    var n, i;
                    if (n = $(t).data("id"), $(t).find("input").length ? i = parseInt($(t).find("input").val(), 10) : 9 < (i = parseInt($(t).find("select").val(), 10)) && (a = !0, o = t), void 0 !== n) return r[n] = i
                }), a ? i($(o).find("select")) : (t = {
                    cart: r
                }, $.ajax({
                    url: n,
                    type: "put",
                    dataType: "script",
                    data: t
                })), !1
            },
            i = function (e) {
                return e.replaceWith('<a href="/go/cart" class="update_qty hide cart-option no-pjax">' + I18n.t("usersite.cart.update_quantity_button") + '</a><input id="quantity" name="quantity" type="tel" autofocus>')
            },
            n = function (e) {
                return $(e).attr("href"), $.ajax({
                    url: e,
                    type: "put",
                    dataType: "script",
                    data: {
                        code: $("input[name='cart[promocode]']").val()
                    }
                })
            },
            r = function (e) {
                return $(e).attr("href"), $.ajax({
                    url: e,
                    type: "put",
                    dataType: "script",
                    data: {
                        code: null
                    }
                })
            },
            o = function (e) {
                return parseInt($(e).val(), 10) === parseInt($(e).attr("data-quantity-on-load"), 10) ? $(e).siblings("a.update_qty").addClass("hide") : $(e).siblings("a.update_qty").removeClass("hide")
            },
            a = function () {
                var e, t, n, i, r, o;
                for ($(".salable-item.in-cart").removeClass("in-cart").addClass("not-in-cart"), n = 0, i = (o = $("#cart .cart-item")).length; n < i; n++) r = o[n], e = $(r).data("item-id"), t = $(r).data("item-type"), $(".without-quantity.salable-item[data-item-id=" + e + "][data-item-type=" + t + "]").addClass("in-cart").removeClass("not-in-cart");
                return $(".salable-item .button").removeClass("in-cart"), $(".salable-item.in-cart .button").addClass("in-cart")
            },
            s = function () {
                if (0 < $("#cart").length && !$("body.wysiwyg").length && $.cookie("guid") !== undefined && !$("#cart").hasClass("loaded")) return $.getScript("/go/cart")
            };
        if (!$("body.wysiwyg").length) {
            $(".dialog-for-download form").on("submit", e), $("body").on("keyup", "input[name='cart_item[price]'][data-min-price='0.0']", function () {
                var e = parseFloat($(this).val()) <= 0;
                !0 !== $(this).parents("form").data("requiresCheckout") && ($(".cart-action").toggleClass("hide", e), $(".free-download").toggleClass("hide", !e))
            }), $("body").on("click", "section#cart a.update_qty", function (e) {
                return t(e)
            }).on("click", "section#cart a.apply-promocode", function (e) {
                return e.preventDefault(), n(this)
            }).on("click", "section#cart a.remove-promocode", function (e) {
                return e.preventDefault(), r(this)
            }).on("change", "select#quantity", function (e) {
                return t(e)
            }).on("input", "input#quantity", function (e) {
                return e.preventDefault(), o(this)
            }).on("click", ".checkout.paypal", function (e) {
                var t = $(this).attr("data-href");
                return e.preventDefault(), window.zoogle.blockUI(), $.ajax({
                    url: t,
                    type: "put",
                    dataType: "script"
                })
            }).on("click", ".checkout.stripe", function (e) {
                $(this).attr("href");
                var t = $(this).data(),
                    n = $(this).parent("form");
                e.preventDefault(), StripeCheckout.configure({
                    key: t.key,
                    image: "https://stripe.com/img/documentation/checkout/marketplace.png",
                    locale: "auto",
                    currency: t.currency,
                    token: function (e) {
                        $(n).find("input[name='stripeToken']").val(e.id), $(n).find("input[name='stripeEmail']").val(e.email), $(n).submit()
                    }
                }).open({
                    email: t.email,
                    name: t.name,
                    description: t.description,
                    amount: t.amount,
                    currency: t.currency,
                    zipCode: !0
                })
            }).on("click", "section#cart .checkout-action a.button", function () {
                "undefined" != typeof fbq && fbq("track", "InitiateCheckout")
            });
            var l = function () {
                0 === $("#cart .cart-items .cart-items-list .cart-item").length ? $("#cart").addClass("hide") : $("#cart").removeClass("hide")
            };
            $(document).on("refresh", "#cart", function () {
                a(), l()
            }).trigger("refresh"), l(), $(".cart .mobile-toggle").click(function () {
                $(".cart").toggleClass("expanded")
            }), s(), document.addEventListener("pageLoad", s)
        }
    }), $(document).ready(function () {
        var e = function () {
                var e = document.querySelector("[name=easypost_rate_id]:checked").value;
                console.log(e), $.ajax({
                    url: "/go/cart/cart_shipping",
                    method: "PUT",
                    data: {
                        cart: {
                            easypost_rate_id: e
                        }
                    },
                    dataType: "script"
                })
            },
            t = function () {
                var e = document.querySelector("[name='cart[shipping_country]']").value;
                $.ajax({
                    url: "/go/cart/cart_country",
                    method: "PUT",
                    data: {
                        cart: {
                            shipping_country: e
                        }
                    },
                    dataType: "script"
                })
            };
        $(".toggle-edit").on("click", function () {
            $(".data-display").addClass("hide"), $(".data-input").removeClass("hide")
        }), $("body").on("change", "[name=easypost_rate_id]", function () {
            e()
        }), $("body").on("change", "[name='cart[shipping_country]']", t)
    }), $(document).ready(function () {
        $(document).on("click", "a.comment-link", function () {
            return $("form.comment :visible").find(":text, textarea").first().focus()
        }).on("ajax:success", "#new_comment", function () {
            $("#comment_name,#comment_location,#comment_message").val("").data("changed", !0), $('#new_comment input[type="submit"]').prop("disabled", !1), $(".add-comment").replaceWith('<div id="comment-form" class="comment-form-holder hide"></div>')
        }).on("submit", "#new_comment", function () {
            $('#new_comment input[type="submit"]').prop("disabled", !0)
        }), $(".guestbook_feature .pagination .first").length || $(".guestbook_feature .comment-list li").first().prepend('<a id="latest_comment"></a>'), $(".forum_feature .pagination .last").length || $(".forum_feature .comment-list li").last().prepend('<a id="latest_comment"></a>')
    }), $(document).ready(function () {
        $(document).one("submit", "form.download_code", function () {
            $(this).bind("ajax:success", function (e, t) {
                window.zoogle.blockUI(), window.location.href = t.url
            }).bind("ajax:error", function () {
                $(".invalid_code_warning").removeClass("hide")
            })
        })
    }),
    function () {
        $.fn.getUrlParams = function () {
            var e, t, n, i, r, o, a;
            for (i = {}, e = 0, n = (r = window.location.search.substring(1).split("&")).length; e < n; e++) t = (o = r[e].split("="))[0], a = o[1], i[t] = decodeURIComponent(a);
            return i.hasOwnProperty("") ? {} : i
        }, $.fn.setUrlParam = function (e, t) {
            var n, i, r;
            for (n in (r = $.fn.getUrlParams())[e] = t, i = "", r) "" !== i && (i += "&"), i += n + "=" + encodeURIComponent(r[n]);
            return window.history.pushState("", "", "?" + i)
        }, $.fn.removeUrlParam = function (e) {
            var t, n, i;
            for (t in delete(i = $.fn.getUrlParams())[e], n = "", i) "" !== n && (n += "&"), n += t + "=" + encodeURIComponent(i[t]);
            return window.history.pushState("", "", "?" + n)
        }
    }.call(this), $(document).ready(function () {
        var e = function (e) {
                null == e && (e = "0.4s");
                var t = $(".blog.tiled").masonry({
                    columnWidth: ".tiled-sizer",
                    itemSelector: "article.post-tiled",
                    percentPosition: !0,
                    transitionDuration: e
                });
                return t.imagesLoaded(function () {
                    return t.masonry("layout")
                })
            },
            t = function () {
                e(), $(".blog_feature .carousel").carousel()
            };
        t(), document.addEventListener("pageLoad", t), $.prepareUsersiteBlogs = t
    }), $.extend(Carousel.prototype, {
        MOBILE_BREAK_POINT: 459,
        MED_SCREEN_BREAK_POINT: 699,
        FULL_NAV_BREAK_POINT: 920,
        render: function () {
            this.screenWidth = $(window).width(), this.$contentContainerWidth = parseInt(this.$root.parent().css("width")), this.$slides = this._build$Slides(), this._showCurrentSlide(), this._toggleResponsiveNav()
        },
        _build$Slides: function () {
            var e = this._calculateElementsPerSlide();
            return this._prepare$Slides(e)
        },
        _showCurrentSlide: function () {
            return this.showSlideAt(this.currentSlideIndex)
        },
        _toggleResponsiveNav: function () {
            this.$carouselElements.removeClass("full-width"), this.$carouselNav.toggleClass("full-width", this._toggleFullWidthNav())
        },
        _toggleFullWidthNav: function () {
            return !(this._isContainedInColumn(".layout_third") || this._isContainedInColumn(".layout_half") || this._isContainedInColumn(".layout_two_thirds") || this.screenWidth <= this.FULL_NAV_BREAK_POINT || this.$contentContainerWidth <= this.FULL_NAV_BREAK_POINT)
        },
        showSlideAt: function (e) {
            this.$slides.removeClass("active"), this.$activeSlide = this.$slides.eq(e), this.$activeSlide.addClass("active"), this._toggleNavButtons()
        },
        _toggleNavButtons: function () {
            this.$root.find(".button-nav.next").toggleClass("disable", !this.canShowNextSlide()), this.$root.find(".button-nav.prev").toggleClass("disable", !this.canShowPrevSlide()), this.$root.find("nav.carousel-nav").toggleClass("hide", !this.hasMultipleSlides())
        },
        _get$CarouselElements: function () {
            return this.$root.find("article.carousel-item").detach()
        },
        _calculateElementsPerSlide: function () {
            return Math.min(this.maxPostsPerSlide, this._maxPostsForColumn(), this._maxPostsForScreenWidth())
        },
        _bindWindowResizeHandler: function () {
            var e = this;
            $(window).on("resize", function () {
                e._debounceRender()
            })
        },
        _debounceRender: function () {
            this.renderingTimeoutHandler && clearTimeout(this.renderingTimeoutHandler);
            var e = this;
            this.renderingTimeoutHandler = setTimeout(function () {
                e.render()
            }, 300)
        },
        _maxPostsForColumn: function () {
            return this._isContainedInColumn(".layout_third") ? 1 : this._isContainedInColumn(".layout_half") ? 2 : 4
        },
        _isContainedInColumn: function (e) {
            return 0 < $(e).has(this.$root).length
        },
        _maxPostsForScreenWidth: function () {
            return this.screenWidth <= this.MOBILE_BREAK_POINT ? 1 : this.screenWidth <= this.MED_SCREEN_BREAK_POINT ? 2 : 4
        },
        _prepare$Slides: function (e) {
            var t = this.$carouselElements.toArray();
            this.$slideContainer.empty();
            for (var n = 0; n < t.length; n += e) {
                var i = this._getNext$CarouselElements(n, e);
                this._addElementsToSlide(i, e)
            }
            return this.$root.find(".slide")
        },
        _getNext$CarouselElements: function (e, t) {
            return this.$carouselElements.slice(e, e + t)
        },
        _addElementsToSlide: function (e, t) {
            this.$slideContainer.append(e.wrapAll(this._buildSlideLi(t).toggleClass("slide-realign", !this._toggleContentRealign(e, t))).parent())
        },
        _buildSlideLi: function (e) {
            return $("<li></li>").addClass("slide").addClass("slide-" + e + "-items")
        },
        _toggleContentRealign: function (e, t) {
            if (e.length === t) return !0
        },
        _bindNavigationHandlers: function () {
            var t = this;
            this.$root.on("click", ".button-nav", function () {
                this.blur();
                var e = $(this);
                if (e.is(".disabled")) return !1;
                e.is(".next") ? t.showNextSlide() : t.showPrevSlide()
            })
        },
        showNextSlide: function () {
            this.canShowNextSlide() && (this.currentSlideIndex += 1, this._showCurrentSlide(), this._animateNextSlide())
        },
        canShowNextSlide: function () {
            return this.currentSlideIndex + 1 < this._slidesCount()
        },
        showPrevSlide: function () {
            this.canShowPrevSlide() && (this.currentSlideIndex -= 1, this._showCurrentSlide(), this._animatePrevSlide())
        },
        canShowPrevSlide: function () {
            return 0 < this.currentSlideIndex
        },
        hasMultipleSlides: function () {
            return 1 < this._slidesCount()
        },
        _slidesCount: function () {
            return this.$root.find(".slide").length
        },
        _animateNextSlide: function () {
            this._removeAnimationClasses(), this.$activeSlide.prev().addClass("move-out-left"), this.$activeSlide.addClass("move-in-right")
        },
        _animatePrevSlide: function () {
            this._removeAnimationClasses(), this.$activeSlide.next().addClass("move-out-right"), this.$activeSlide.addClass("move-in-left")
        },
        _removeAnimationClasses: function () {
            this.$slides.removeClass("move-out-right"), this.$slides.removeClass("move-out-left"), this.$slides.removeClass("move-in-right"), this.$slides.removeClass("move-in-left")
        }
    }), $.fn.carousel = function (n) {
        return this.each(function (e, t) {
            $(t).data("carousel", new Carousel(t, n))
        })
    }, $(document).ready(function () {
        var e = function () {
            $("body.wysiwyg").length || ($("input.date_picker").dateinput({
                format: "mm/dd/yyyy",
                yearRange: [-100, 5]
            }), $(".input.select_date_picker").each(function () {
                var n = $("input", this).dateinput({
                        trigger: !0,
                        format: "mm/dd/yyyy",
                        yearRange: [-100, 5],
                        css: {
                            trigger: "caltrigger icon icon-calendar"
                        }
                    }).data("dateinput"),
                    i = $('[name="[(1i)]"]', this),
                    r = $('[name="[(2i)]"]', this),
                    o = $('[name="[(3i)]"]', this);
                $("select", this).change(function () {
                    for (var e = [parseInt(o.val(), 10), parseInt(r.val(), 10), parseInt(i.val(), 10)], t = new Date(e[2], e[1] - 1, e[0]); t.getDate() !== e[0];) e[0]--, t.setFullYear(e[2], e[1] - 1, e[0]);
                    o.val(e[0]), n.setValue(new Date(e[2], e[1] - 1, e[0]))
                }), n.change(function (e) {
                    var t = e.target.getValue();
                    return i.val(t.getFullYear()), r.val(t.getMonth() + 1), o.val(t.getDate())
                })
            }))
        };
        $("body:not(.wysiwyg)").on("submit", "form[role=custom_form]", function () {
            var e = $(this).find(".required.input").filter(".radio,.checkbox").not(":has(input:checked)");
            e.find("span.error").remove(), e.addClass("field_with_errors").append('<span class="error">' + I18n.t("errors.messages.presence") + "</span>").find("input").on("click", function () {
                $(this).closest(".input").removeClass("field_with_errors").find(".error").remove()
            });
            var t = !1,
                n = $(this).attr("id");
            return 0 < $("[name^=" + n + "]").serializeArray().map(function (e) {
                return e.value
            }).filter(function (e) {
                return "" !== e
            }).length && (t = !0), t && 0 === e.length
        });
        $("body:not(.wysiwyg)").on("submit", "form[role=custom_form]", function () {
            var e = $(this),
                t = e.find("input[type=submit]");
            0 === e.find(".error").length && (t.prop("disabled", !0), setTimeout(function () {
                t.prop("disabled", !1)
            }, 3e3))
        });
        var t = function () {
            0 < $(".custom_form_feature").length && e()
        };
        t(), document.addEventListener("pageLoad", t)
    }),
    function (u) {
        "use strict";

        function l(e) {
            return (e || "").toLowerCase()
        }
        var e = "2.1.6";
        u.fn.cycle = function (s) {
            var e;
            return 0 !== this.length || u.isReady ? this.each(function () {
                var e, n, t, i, r = u(this),
                    o = u.fn.cycle.log;
                if (!r.data("cycle.opts")) {
                    for (var a in (!1 === r.data("cycle-log") || s && !1 === s.log || n && !1 === n.log) && (o = u.noop), e = r.data()) e.hasOwnProperty(a) && /^cycle[A-Z]+/.test(a) && (i = e[a], o((t = a.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, l)) + ":", i, "(" + typeof i + ")"), e[t] = i);
                    (n = u.extend({}, u.fn.cycle.defaults, e, s || {})).timeoutId = 0, n.paused = n.paused || !1, n.container = r, n._maxZ = n.maxZ, n.API = u.extend({
                        _container: r
                    }, u.fn.cycle.API), n.API.log = o, n.API.trigger = function (e, t) {
                        return n.container.trigger(e, t), n.API
                    }, r.data("cycle.opts", n), r.data("cycle.API", n.API), n.API.trigger("cycle-bootstrap", [n, n.API]), n.API.addInitialSlides(), n.API.preInitSlideshow(), n.slides.length && n.API.initSlideshow()
                }
            }) : (e = {
                s: this.selector,
                c: this.context
            }, u.fn.cycle.log("requeuing slideshow (dom not ready)"), u(function () {
                u(e.s, e.c).cycle(s)
            }), this)
        }, u.fn.cycle.API = {
            opts: function () {
                return this._container.data("cycle.opts")
            },
            addInitialSlides: function () {
                var e = this.opts(),
                    t = e.slides;
                e.slideCount = 0, e.slides = u(), t = t.jquery ? t : e.container.find(t), e.random && t.sort(function () {
                    return Math.random() - .5
                }), e.API.add(t)
            },
            preInitSlideshow: function () {
                var e = this.opts();
                e.API.trigger("cycle-pre-initialize", [e]);
                var t = u.fn.cycle.transitions[e.fx];
                t && u.isFunction(t.preInit) && t.preInit(e), e._preInitialized = !0
            },
            postInitSlideshow: function () {
                var e = this.opts();
                e.API.trigger("cycle-post-initialize", [e]);
                var t = u.fn.cycle.transitions[e.fx];
                t && u.isFunction(t.postInit) && t.postInit(e)
            },
            initSlideshow: function () {
                var e, t = this.opts(),
                    n = t.container;
                t.API.calcFirstSlide(), "static" == t.container.css("position") && t.container.css("position", "relative"), u(t.slides[t.currSlide]).css({
                    opacity: 1,
                    display: "block",
                    visibility: "visible"
                }), t.API.stackSlides(t.slides[t.currSlide], t.slides[t.nextSlide], !t.reverse), t.pauseOnHover && (!0 !== t.pauseOnHover && (n = u(t.pauseOnHover)), n.hover(function () {
                    t.API.pause(!0)
                }, function () {
                    t.API.resume(!0)
                })), t.timeout && (e = t.API.getSlideOpts(t.currSlide), t.API.queueTransition(e, e.timeout + t.delay)), t._initialized = !0, t.API.updateView(!0), t.API.trigger("cycle-initialized", [t]), t.API.postInitSlideshow()
            },
            pause: function (e) {
                var t = this.opts(),
                    n = t.API.getSlideOpts(),
                    i = t.hoverPaused || t.paused;
                e ? t.hoverPaused = !0 : t.paused = !0, i || (t.container.addClass("cycle-paused"), t.API.trigger("cycle-paused", [t]).log("cycle-paused"), n.timeout && (clearTimeout(t.timeoutId), t.timeoutId = 0, t._remainingTimeout -= u.now() - t._lastQueue, (t._remainingTimeout < 0 || isNaN(t._remainingTimeout)) && (t._remainingTimeout = undefined)))
            },
            resume: function (e) {
                var t = this.opts(),
                    n = !t.hoverPaused && !t.paused;
                e ? t.hoverPaused = !1 : t.paused = !1, n || (t.container.removeClass("cycle-paused"), 0 === t.slides.filter(":animated").length && t.API.queueTransition(t.API.getSlideOpts(), t._remainingTimeout), t.API.trigger("cycle-resumed", [t, t._remainingTimeout]).log("cycle-resumed"))
            },
            add: function (e, n) {
                var i = this.opts();
                if (i) {
                    var t, r = i.slideCount;
                    "string" == u.type(e) && (e = u.trim(e)), u(e).each(function () {
                        var e, t = u(this);
                        i.injectInContainer && (n ? i.container.prepend(t) : i.container.append(t)), t.data("initialStyleAttr", t.attr("style")), i.slideCount++, e = i.API.buildSlideOpts(t), i.slides = n ? u(t).add(i.slides) : i.slides.add(t), i.API.initSlide(e, t, --i._maxZ), t.data("cycle.opts", e), i.API.trigger("cycle-slide-added", [i, e, t])
                    }), i.API.updateView(!0), i._preInitialized && r < 2 && 1 <= i.slideCount && (i._initialized ? i.timeout && (t = i.slides.length, i.nextSlide = i.reverse ? t - 1 : 1, i.timeoutId || i.API.queueTransition(i)) : i.API.initSlideshow())
                }
            },
            calcFirstSlide: function () {
                var e, t = this.opts();
                ((e = parseInt(t.startingSlide || 0, 10)) >= t.slides.length || e < 0) && (e = 0), t.currSlide = e, t.reverse ? (t.nextSlide = e - 1, t.nextSlide < 0 && (t.nextSlide = t.slides.length - 1)) : (t.nextSlide = e + 1, t.nextSlide == t.slides.length && (t.nextSlide = 0))
            },
            calcNextSlide: function () {
                var e, t = this.opts();
                t.reverse ? (e = t.nextSlide - 1 < 0, t.nextSlide = e ? t.slideCount - 1 : t.nextSlide - 1, t.currSlide = e ? 0 : t.nextSlide + 1) : (e = t.nextSlide + 1 == t.slides.length, t.nextSlide = e ? 0 : t.nextSlide + 1, t.currSlide = e ? t.slides.length - 1 : t.nextSlide - 1)
            },
            calcTx: function (e, t) {
                var n, i = e;
                return i._tempFx ? n = u.fn.cycle.transitions[i._tempFx] : t && i.manualFx && (n = u.fn.cycle.transitions[i.manualFx]), n || (n = u.fn.cycle.transitions[i.fx]), i._tempFx = null, this.opts()._tempFx = null, n || (n = u.fn.cycle.transitions.fade, i.API.log('Transition "' + i.fx + '" not found.  Using fade.')), n
            },
            prepareTx: function (e, t) {
                var n, i, r, o, a, s = this.opts();
                s && (s.slideCount < 2 ? s.timeoutId = 0 : (!e || s.busy && !s.manualTrump || (s.API.stopTransition(), s.busy = !1, clearTimeout(s.timeoutId), s.timeoutId = 0), s.busy || (0 !== s.timeoutId || e) && (i = s.slides[s.currSlide], r = s.slides[s.nextSlide], o = s.API.getSlideOpts(s.nextSlide), a = s.API.calcTx(o, e), s._tx = a, e && o.manualSpeed !== undefined && (o.speed = o.manualSpeed), s.nextSlide != s.currSlide && (e || !s.paused && !s.hoverPaused && s.timeout) ? (s.API.trigger("cycle-before", [o, i, r, t]), a.before && a.before(o, i, r, t), n = function () {
                    s.busy = !1, s.container.data("cycle.opts") && (a.after && a.after(o, i, r, t), s.API.trigger("cycle-after", [o, i, r, t]), s.API.queueTransition(o), s.API.updateView(!0))
                }, s.busy = !0, a.transition ? a.transition(o, i, r, t, n) : s.API.doTransition(o, i, r, t, n), s.API.calcNextSlide(), s.API.updateView()) : s.API.queueTransition(o))))
            },
            doTransition: function (e, t, n, i, r) {
                var o = e,
                    a = u(t),
                    s = u(n),
                    l = function () {
                        s.animate(o.animIn || {
                            opacity: 1
                        }, o.speed, o.easeIn || o.easing, r)
                    };
                s.css(o.cssBefore || {}), a.animate(o.animOut || {}, o.speed, o.easeOut || o.easing, function () {
                    a.css(o.cssAfter || {}), o.sync || l()
                }), o.sync && l()
            },
            queueTransition: function (e, t) {
                var n = this.opts(),
                    i = t !== undefined ? t : e.timeout;
                return 0 === n.nextSlide && 0 == --n.loop ? (n.API.log("terminating; loop=0"), n.timeout = 0, i ? setTimeout(function () {
                    n.API.trigger("cycle-finished", [n])
                }, i) : n.API.trigger("cycle-finished", [n]), void(n.nextSlide = n.currSlide)) : n.continueAuto !== undefined && (!1 === n.continueAuto || u.isFunction(n.continueAuto) && !1 === n.continueAuto()) ? (n.API.log("terminating automatic transitions"), n.timeout = 0, void(n.timeoutId && clearTimeout(n.timeoutId))) : void(i && (n._lastQueue = u.now(), t === undefined && (n._remainingTimeout = e.timeout), n.paused || n.hoverPaused || (n.timeoutId = setTimeout(function () {
                    n.API.prepareTx(!1, !n.reverse)
                }, i))))
            },
            stopTransition: function () {
                var e = this.opts();
                e.slides.filter(":animated").length && (e.slides.stop(!1, !0), e.API.trigger("cycle-transition-stopped", [e])), e._tx && e._tx.stopTransition && e._tx.stopTransition(e)
            },
            advanceSlide: function (e) {
                var t = this.opts();
                return clearTimeout(t.timeoutId), t.timeoutId = 0, t.nextSlide = t.currSlide + e, t.nextSlide < 0 ? t.nextSlide = t.slides.length - 1 : t.nextSlide >= t.slides.length && (t.nextSlide = 0), t.API.prepareTx(!0, 0 <= e), !1
            },
            buildSlideOpts: function (e) {
                var t, n, i = this.opts(),
                    r = e.data() || {};
                for (var o in r) r.hasOwnProperty(o) && /^cycle[A-Z]+/.test(o) && (t = r[o], n = o.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, l), i.API.log("[" + (i.slideCount - 1) + "]", n + ":", t, "(" + typeof t + ")"), r[n] = t);
                (r = u.extend({}, u.fn.cycle.defaults, i, r)).slideNum = i.slideCount;
                try {
                    delete r.API, delete r.slideCount, delete r.currSlide, delete r.nextSlide, delete r.slides
                } catch (a) {}
                return r
            },
            getSlideOpts: function (e) {
                var t = this.opts();
                e === undefined && (e = t.currSlide);
                var n = t.slides[e],
                    i = u(n).data("cycle.opts");
                return u.extend({}, t, i)
            },
            initSlide: function (e, t, n) {
                var i = this.opts();
                t.css(e.slideCss || {}), 0 < n && t.css("zIndex", n), isNaN(e.speed) && (e.speed = u.fx.speeds[e.speed] || u.fx.speeds._default), e.sync || (e.speed = e.speed / 2), t.addClass(i.slideClass)
            },
            updateView: function (e, t) {
                var n = this.opts();
                if (n._initialized) {
                    var i = n.API.getSlideOpts(),
                        r = n.slides[n.currSlide];
                    !e && !0 !== t && (n.API.trigger("cycle-update-view-before", [n, i, r]), n.updateView < 0) || (n.slideActiveClass && n.slides.removeClass(n.slideActiveClass).eq(n.currSlide).addClass(n.slideActiveClass), e && n.hideNonActive && n.slides.filter(":not(." + n.slideActiveClass + ")").css("visibility", "hidden"), 0 === n.updateView && setTimeout(function () {
                        n.API.trigger("cycle-update-view", [n, i, r, e])
                    }, i.speed / (n.sync ? 2 : 1)), 0 !== n.updateView && n.API.trigger("cycle-update-view", [n, i, r, e]), e && n.API.trigger("cycle-update-view-after", [n, i, r]))
                }
            },
            getComponent: function (e) {
                var t = this.opts();
                if (t === undefined) return u();
                var n = t[e];
                return "string" == typeof n ? /^\s*[\>|\+|~]/.test(n) ? t.container.find(n) : u(n) : n.jquery ? n : u(n)
            },
            stackSlides: function (e, t, n) {
                var i, r = this.opts();
                e || (e = r.slides[r.currSlide], t = r.slides[r.nextSlide], n = !r.reverse), u(e).css("zIndex", r.maxZ);
                var o = r.maxZ - 2,
                    a = r.slideCount;
                if (n) {
                    for (i = r.currSlide + 1; i < a; i++) u(r.slides[i]).css("zIndex", o--);
                    for (i = 0; i < r.currSlide; i++) u(r.slides[i]).css("zIndex", o--)
                } else {
                    for (i = r.currSlide - 1; 0 <= i; i--) u(r.slides[i]).css("zIndex", o--);
                    for (i = a - 1; i > r.currSlide; i--) u(r.slides[i]).css("zIndex", o--)
                }
                u(t).css("zIndex", r.maxZ - 1)
            },
            getSlideIndex: function (e) {
                return this.opts().slides.index(e)
            }
        }, u.fn.cycle.log = function t() {
            window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " "))
        }, u.fn.cycle.version = function () {
            return "Cycle2: " + e
        }, u.fn.cycle.transitions = {
            custom: {},
            none: {
                before: function (e, t, n, i) {
                    e.API.stackSlides(n, t, i), e.cssBefore = {
                        opacity: 1,
                        visibility: "visible",
                        display: "block"
                    }
                }
            },
            fade: {
                before: function (e, t, n, i) {
                    var r = e.API.getSlideOpts(e.nextSlide).slideCss || {};
                    e.API.stackSlides(t, n, i), e.cssBefore = u.extend(r, {
                        opacity: 0,
                        visibility: "visible",
                        display: "block"
                    }), e.animIn = {
                        opacity: 1
                    }, e.animOut = {
                        opacity: 0
                    }
                }
            },
            fadeout: {
                before: function (e, t, n, i) {
                    var r = e.API.getSlideOpts(e.nextSlide).slideCss || {};
                    e.API.stackSlides(t, n, i), e.cssBefore = u.extend(r, {
                        opacity: 1,
                        visibility: "visible",
                        display: "block"
                    }), e.animOut = {
                        opacity: 0
                    }
                }
            },
            scrollHorz: {
                before: function (e, t, n, i) {
                    e.API.stackSlides(t, n, i);
                    var r = e.container.css("overflow", "hidden").width();
                    e.cssBefore = {
                        left: i ? r : -r,
                        top: 0,
                        opacity: 1,
                        visibility: "visible",
                        display: "block"
                    }, e.cssAfter = {
                        zIndex: e._maxZ - 2,
                        left: 0
                    }, e.animIn = {
                        left: 0
                    }, e.animOut = {
                        left: i ? -r : r
                    }
                }
            }
        }, u.fn.cycle.defaults = {
            allowWrap: !0,
            autoSelector: ".cycle-slideshow[data-cycle-auto-init!=false]",
            delay: 0,
            easing: null,
            fx: "fade",
            hideNonActive: !0,
            loop: 0,
            manualFx: undefined,
            manualSpeed: undefined,
            manualTrump: !0,
            maxZ: 100,
            pauseOnHover: !1,
            reverse: !1,
            slideActiveClass: "cycle-slide-active",
            slideClass: "cycle-slide",
            slideCss: {
                position: "absolute",
                top: 0,
                left: 0
            },
            slides: "> img",
            speed: 500,
            startingSlide: 0,
            sync: !0,
            timeout: 4e3,
            updateView: 0,
            injectInContainer: !0
        }, u(document).ready(function () {
            u(u.fn.cycle.defaults.autoSelector).cycle()
        })
    }(jQuery),
    function (s) {
        "use strict";

        function l(e, t) {
            var n, i, r, o = t.autoHeight;
            if ("container" == o) i = s(t.slides[t.currSlide]).outerHeight(), t.container.height(i);
            else if (t._autoHeightRatio) t.container.height(t.container.width() / t._autoHeightRatio);
            else if ("calc" === o || "number" == s.type(o) && 0 <= o) {
                if ((r = "calc" === o ? a(e, t) : o >= t.slides.length ? 0 : o) == t._sentinelIndex) return;
                t._sentinelIndex = r, t._sentinel && t._sentinel.remove(), (n = s(t.slides[r].cloneNode(!0))).removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"), n.css({
                    position: "static",
                    visibility: "hidden",
                    display: "block"
                }).prependTo(t.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"), n.find("*").css("visibility", "hidden"), t._sentinel = n
            }
        }

        function a(e, t) {
            var n = 0,
                i = -1;
            return t.slides.each(function (e) {
                var t = s(this).height();
                i < t && (i = t, n = e)
            }), n
        }

        function u(e, t, n, i) {
            var r = s(i).outerHeight();
            t.container.animate({
                height: r
            }, t.autoHeightSpeed, t.autoHeightEasing)
        }

        function c(e, t) {
            t._autoHeightOnResize && (s(window).off("resize orientationchange", t._autoHeightOnResize), t._autoHeightOnResize = null), t.container.off("cycle-slide-added cycle-slide-removed", l), t.container.off("cycle-destroyed", c), t.container.off("cycle-before", u), t._sentinel && (t._sentinel.remove(), t._sentinel = null)
        }
        s.extend(s.fn.cycle.defaults, {
            autoHeight: 0,
            autoHeightSpeed: 250,
            autoHeightEasing: null
        }), s(document).on("cycle-initialized", function (e, t) {
            function n() {
                l(e, t)
            }
            var i, r = t.autoHeight,
                o = s.type(r),
                a = null;
            "string" !== o && "number" !== o || (t.container.on("cycle-slide-added cycle-slide-removed", l), t.container.on("cycle-destroyed", c), "container" == r ? t.container.on("cycle-before", u) : "string" === o && /\d+\:\d+/.test(r) && (i = (i = r.match(/(\d+)\:(\d+)/))[1] / i[2], t._autoHeightRatio = i), "number" !== o && (t._autoHeightOnResize = function () {
                clearTimeout(a), a = setTimeout(n, 50)
            }, s(window).on("resize orientationchange", t._autoHeightOnResize)), setTimeout(n, 30))
        })
    }(jQuery),
    function (t) {
        "use strict";
        t.extend(t.fn.cycle.defaults, {
            caption: "> .cycle-caption",
            captionTemplate: "{{slideNum}} / {{slideCount}}",
            overlay: "> .cycle-overlay",
            overlayTemplate: "<div>{{title}}</div><div>{{desc}}</div>",
            captionModule: "caption"
        }), t(document).on("cycle-update-view", function (e, i, r, o) {
            "caption" === i.captionModule && t.each(["caption", "overlay"], function () {
                var e = this,
                    t = r[e + "Template"],
                    n = i.API.getComponent(e);
                n.length && t ? (n.html(i.API.tmpl(t, r, i, o)), n.show()) : n.hide()
            })
        }), t(document).on("cycle-destroyed", function (e, n) {
            t.each(["caption", "overlay"], function () {
                var e = this,
                    t = n[e + "Template"];
                n[e] && t && n.API.getComponent("caption").empty()
            })
        })
    }(jQuery),
    function (s) {
        "use strict";
        var a = s.fn.cycle;
        s.fn.cycle = function (t) {
            var n, i, r, o = s.makeArray(arguments);
            return "number" == s.type(t) ? this.cycle("goto", t) : "string" == s.type(t) ? this.each(function () {
                var e;
                if (n = t, (r = s(this).data("cycle.opts")) !== undefined) return n = "goto" == n ? "jump" : n, i = r.API[n], s.isFunction(i) ? ((e = s.makeArray(o)).shift(), i.apply(r.API, e)) : void a.log("unknown command: ", n);
                a.log('slideshow must be initialized before sending commands; "' + n + '" ignored')
            }) : a.apply(this, arguments)
        }, s.extend(s.fn.cycle, a), s.extend(a.API, {
            next: function () {
                var e = this.opts();
                if (!e.busy || e.manualTrump) {
                    var t = e.reverse ? -1 : 1;
                    !1 === e.allowWrap && e.currSlide + t >= e.slideCount || (e.API.advanceSlide(t), e.API.trigger("cycle-next", [e]).log("cycle-next"))
                }
            },
            prev: function () {
                var e = this.opts();
                if (!e.busy || e.manualTrump) {
                    var t = e.reverse ? 1 : -1;
                    !1 === e.allowWrap && e.currSlide + t < 0 || (e.API.advanceSlide(t), e.API.trigger("cycle-prev", [e]).log("cycle-prev"))
                }
            },
            destroy: function () {
                this.stop();
                var t = this.opts(),
                    n = s.isFunction(s._data) ? s._data : s.noop;
                clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stop(), t.API.trigger("cycle-destroyed", [t]).log("cycle-destroyed"), t.container.removeData(), n(t.container[0], "parsedAttrs", !1), t.retainStylesOnDestroy || (t.container.removeAttr("style"), t.slides.each(function () {
                    var e = s(this);
                    e.attr("style", e.data("initialStyleAttr"))
                }), t.slides.removeClass(t.slideActiveClass)), t.slides.each(function () {
                    var e = s(this);
                    e.removeData(), e.removeClass(t.slideClass), n(this, "parsedAttrs", !1)
                })
            },
            jump: function (e, t) {
                var n, i = this.opts();
                if (!i.busy || i.manualTrump) {
                    var r = parseInt(e, 10);
                    isNaN(r) || r < 0 || r >= i.slides.length ? i.API.log("goto: invalid slide index: " + r) : r != i.currSlide ? (i.nextSlide = r, clearTimeout(i.timeoutId), i.timeoutId = 0, i.API.log("goto: ", r, " (zero-index)"), n = i.currSlide < i.nextSlide, i._tempFx = t, i.API.prepareTx(!0, n)) : i.API.log("goto: skipping, already on slide", r)
                }
            },
            stop: function () {
                var e = this.opts(),
                    t = e.container;
                clearTimeout(e.timeoutId), e.timeoutId = 0, e.API.stopTransition(), e.pauseOnHover && (!0 !== e.pauseOnHover && (t = s(e.pauseOnHover)), t.off("mouseenter mouseleave")), e.API.trigger("cycle-stopped", [e]).log("cycle-stopped")
            },
            reinit: function () {
                var e = this.opts();
                e.API.destroy(), e.container.cycle()
            },
            remove: function (e) {
                for (var t, n, i = this.opts(), r = [], o = 1, a = 0; a < i.slides.length; a++) t = i.slides[a], a == e ? n = t : (r.push(t), s(t).data("cycle.opts").slideNum = o, o++);
                n && (i.slides = s(r), i.slideCount--, s(n).remove(), e == i.currSlide ? i.API.advanceSlide(1) : e < i.currSlide ? i.currSlide-- : i.currSlide++, i.API.trigger("cycle-slide-removed", [i, e, n]).log("cycle-slide-removed"), i.API.updateView())
            }
        }), s(document).on("click.cycle", "[data-cycle-cmd]", function (e) {
            e.preventDefault();
            var t = s(this),
                n = t.data("cycle-cmd"),
                i = t.data("cycle-context") || ".cycle-slideshow";
            s(i).cycle(n, t.data("cycle-arg"))
        })
    }(jQuery),
    function (o) {
        "use strict";

        function n(n, i) {
            var r;
            n._hashFence ? n._hashFence = !1 : (r = window.location.hash.substring(1), n.slides.each(function (e) {
                if (o(this).data("cycle-hash") == r) {
                    if (!0 === i) n.startingSlide = e;
                    else {
                        var t = n.currSlide < e;
                        n.nextSlide = e, n.API.prepareTx(!0, t)
                    }
                    return !1
                }
            }))
        }
        o(document).on("cycle-pre-initialize", function (e, t) {
            n(t, !0), t._onHashChange = function () {
                n(t, !1)
            }, o(window).on("hashchange", t._onHashChange)
        }), o(document).on("cycle-update-view", function (e, t, n) {
            n.hash && "#" + n.hash != window.location.hash && (t._hashFence = !0, window.location.hash = n.hash)
        }), o(document).on("cycle-destroyed", function (e, t) {
            t._onHashChange && o(window).off("hashchange", t._onHashChange)
        })
    }(jQuery),
    function (d) {
        "use strict";
        d.extend(d.fn.cycle.defaults, {
            loader: !1
        }), d(document).on("cycle-bootstrap", function (e, u) {
            function t(e, o) {
                function a(e) {
                    var t;
                    "wait" == u.loader ? (s.push(e), 0 === l && (s.sort(n), c.apply(u.API, [s, o]), u.container.removeClass("cycle-loading"))) : (t = d(u.slides[u.currSlide]), c.apply(u.API, [e, o]), t.show(), u.container.removeClass("cycle-loading"))
                }

                function n(e, t) {
                    return e.data("index") - t.data("index")
                }
                var s = [];
                if ("string" == d.type(e)) e = d.trim(e);
                else if ("array" === d.type(e))
                    for (var t = 0; t < e.length; t++) e[t] = d(e[t])[0];
                var l = (e = d(e)).length;
                l && (e.css({
                    visibility: "hidden",
                    display: "none"
                }).appendTo("body").each(function (e) {
                    function t() {
                        0 == --n && (--l, a(i))
                    }
                    var n = 0,
                        i = d(this),
                        r = i.is("img") ? i : i.find("img");
                    if (i.data("index", e), !(r = r.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])')).length) return --l, void s.push(i);
                    n = r.length, r.each(function () {
                        this.complete ? t() : d(this).load(function () {
                            t()
                        }).on("error", function () {
                            0 == --n && (u.API.log("slide skipped; img not loaded:", this.src), 0 == --l && "wait" == u.loader && c.apply(u.API, [s, o]))
                        })
                    })
                }), l && u.container.addClass("cycle-loading"))
            }
            var c;
            u.loader && (c = u.API.add, u.API.add = t)
        })
    }(jQuery),
    function (a) {
        "use strict";

        function i(n, i, r) {
            var o;
            n.API.getComponent("pager").each(function () {
                var t = a(this);
                if (i.pagerTemplate) {
                    var e = n.API.tmpl(i.pagerTemplate, i, n, r[0]);
                    o = a(e).appendTo(t)
                } else o = t.children().eq(n.slideCount - 1);
                o.on(n.pagerEvent, function (e) {
                    n.pagerEventBubble || e.preventDefault(), n.API.page(t, e.currentTarget)
                })
            })
        }

        function r(e, t) {
            var n = this.opts();
            if (!n.busy || n.manualTrump) {
                var i = e.children().index(t),
                    r = n.currSlide < i;
                n.currSlide != i && (n.nextSlide = i, n._tempFx = n.pagerFx, n.API.prepareTx(!0, r), n.API.trigger("cycle-pager-activated", [n, e, t]))
            }
        }
        a.extend(a.fn.cycle.defaults, {
            pager: "> .cycle-pager",
            pagerActiveClass: "cycle-pager-active",
            pagerEvent: "click.cycle",
            pagerEventBubble: undefined,
            pagerTemplate: "<span>&bull;</span>"
        }), a(document).on("cycle-bootstrap", function (e, t, n) {
            n.buildPagerLink = i
        }), a(document).on("cycle-slide-added", function (e, t, n, i) {
            t.pager && (t.API.buildPagerLink(t, n, i), t.API.page = r)
        }), a(document).on("cycle-slide-removed", function (e, t, n) {
            t.pager && t.API.getComponent("pager").each(function () {
                var e = a(this);
                a(e.children()[n]).remove()
            })
        }), a(document).on("cycle-update-view", function (e, t) {
            t.pager && t.API.getComponent("pager").each(function () {
                a(this).children().removeClass(t.pagerActiveClass).eq(t.currSlide).addClass(t.pagerActiveClass)
            })
        }), a(document).on("cycle-destroyed", function (e, t) {
            var n = t.API.getComponent("pager");
            n && (n.children().off(t.pagerEvent), t.pagerTemplate && n.empty())
        })
    }(jQuery),
    function (e) {
        "use strict";
        e.extend(e.fn.cycle.defaults, {
            next: "> .cycle-next",
            nextEvent: "click.cycle",
            disabledClass: "disabled",
            prev: "> .cycle-prev",
            prevEvent: "click.cycle",
            swipe: !1
        }), e(document).on("cycle-initialized", function (e, t) {
            if (t.API.getComponent("next").on(t.nextEvent, function (e) {
                    e.preventDefault(), t.API.next()
                }), t.API.getComponent("prev").on(t.prevEvent, function (e) {
                    e.preventDefault(), t.API.prev()
                }), t.swipe) {
                var n = t.swipeVert ? "swipeUp.cycle" : "swipeLeft.cycle swipeleft.cycle",
                    i = t.swipeVert ? "swipeDown.cycle" : "swipeRight.cycle swiperight.cycle";
                t.container.on(n, function () {
                    t._tempFx = t.swipeFx, t.API.next()
                }), t.container.on(i, function () {
                    t._tempFx = t.swipeFx, t.API.prev()
                })
            }
        }), e(document).on("cycle-update-view", function (e, t) {
            if (!t.allowWrap) {
                var n = t.disabledClass,
                    i = t.API.getComponent("next"),
                    r = t.API.getComponent("prev"),
                    o = t._prevBoundry || 0,
                    a = t._nextBoundry !== undefined ? t._nextBoundry : t.slideCount - 1;
                t.currSlide == a ? i.addClass(n).prop("disabled", !0) : i.removeClass(n).prop("disabled", !1), t.currSlide === o ? r.addClass(n).prop("disabled", !0) : r.removeClass(n).prop("disabled", !1)
            }
        }), e(document).on("cycle-destroyed", function (e, t) {
            t.API.getComponent("prev").off(t.nextEvent), t.API.getComponent("next").off(t.prevEvent), t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")
        })
    }(jQuery),
    function (c) {
        "use strict";
        c.extend(c.fn.cycle.defaults, {
            progressive: !1
        }), c(document).on("cycle-pre-initialize", function (e, r) {
            if (r.progressive) {
                var o, t, n = r.API,
                    i = n.next,
                    a = n.prev,
                    s = n.prepareTx,
                    l = c.type(r.progressive);
                if ("array" == l) o = r.progressive;
                else if (c.isFunction(r.progressive)) o = r.progressive(r);
                else if ("string" == l) {
                    if (t = c(r.progressive), !(o = c.trim(t.html()))) return;
                    if (/^(\[)/.test(o)) try {
                        o = c.parseJSON(o)
                    } catch (u) {
                        return void n.log("error parsing progressive slides", u)
                    } else(o = o.split(new RegExp(t.data("cycle-split") || "\n")))[o.length - 1] || o.pop()
                }
                s && (n.prepareTx = function (e, t) {
                    var n, i;
                    e || 0 === o.length ? s.apply(r.API, [e, t]) : t && r.currSlide == r.slideCount - 1 ? (i = o[0], o = o.slice(1), r.container.one("cycle-slide-added", function (e, t) {
                        setTimeout(function () {
                            t.API.advanceSlide(1)
                        }, 50)
                    }), r.API.add(i)) : t || 0 !== r.currSlide ? s.apply(r.API, [e, t]) : (n = o.length - 1, i = o[n], o = o.slice(0, n), r.container.one("cycle-slide-added", function (e, t) {
                        setTimeout(function () {
                            t.currSlide = 1, t.API.advanceSlide(-1)
                        }, 50)
                    }), r.API.add(i, !0))
                }), i && (n.next = function () {
                    var e = this.opts();
                    if (o.length && e.currSlide == e.slideCount - 1) {
                        var t = o[0];
                        o = o.slice(1), e.container.one("cycle-slide-added", function (e, t) {
                            i.apply(t.API), t.container.removeClass("cycle-loading")
                        }), e.container.addClass("cycle-loading"), e.API.add(t)
                    } else i.apply(e.API)
                }), a && (n.prev = function () {
                    var e = this.opts();
                    if (o.length && 0 === e.currSlide) {
                        var t = o.length - 1,
                            n = o[t];
                        o = o.slice(0, t), e.container.one("cycle-slide-added", function (e, t) {
                            t.currSlide = 1, t.API.advanceSlide(-1), t.container.removeClass("cycle-loading")
                        }), e.container.addClass("cycle-loading"), e.API.add(n, !0)
                    } else a.apply(e.API)
                })
            }
        })
    }(jQuery),
    function (l) {
        "use strict";
        l.extend(l.fn.cycle.defaults, {
            tmplRegex: "{{((.)?.*?)}}"
        }), l.extend(l.fn.cycle.API, {
            tmpl: function (e, t) {
                var n = new RegExp(t.tmplRegex || l.fn.cycle.defaults.tmplRegex, "g"),
                    s = l.makeArray(arguments);
                return s.shift(), e.replace(n, function (e, t) {
                    var n, i, r, o, a = t.split(".");
                    for (n = 0; n < s.length; n++)
                        if (r = s[n]) {
                            if (1 < a.length)
                                for (o = r, i = 0; i < a.length; i++) o = (r = o)[a[i]] || t;
                            else o = r[t];
                            if (l.isFunction(o)) return o.apply(r, s);
                            if (o !== undefined && null !== o && o != t) return o
                        } return t
                })
            }
        })
    }(jQuery),
    function () {
        var e, t, n, i;
        n = function (e) {
            return e.isotope({
                itemSelector: "div.gallery-item",
                layoutMode: "masonry",
                transitionDuration: 0,
                masonry: {
                    itemSelector: ".item",
                    columnWidth: 1,
                    gutter: 0
                },
                sortBy: "random" === e.data("sort") ? "random" : "original-order"
            }), e.imagesLoaded(function () {
                return e.isotope("layout"), e.isotope("on", "layoutComplete", function () {
                    return $(window).trigger("resize")
                })
            })
        }, t = function (e) {
            return e.cycle({
                log: !1
            }).on("click", "> .gallery-item .img-wrap", function () {
                return e.cycle("next")
            }).on("cycle-slide-before", function (e, t, n, i) {
                return picturefill({
                    elements: i.find("img").toArray()
                })
            }).one("cycle-after", function () {
                return e.find(".cycle-next").removeClass("initializing")
            })
        }, e = function () {
            return $(".gallery_feature .gallery-grid img").die("load").load(function () {
                var e, t, n, i, r, o, a, s, l, u, c;
                for (t = (e = $(this)).closest(".img-wrap"), l = [], r = 0, o = (s = ["x", "y"]).length; r < o; r++) a = "x" === (n = s[r]) ? "left" : "top", c = t[i = "x" === n ? "width" : "height"](), u = (u = (e[i]() - c) / 2) / c * -100 + "%", l.push(e.css(a, u));
                return l
            })
        }, i = function () {
            return $("body").hasClass("wysiwyg"), $(".zoogle-feature .gallery_feature").has("img").addClass("loaded"), $(".gallery_feature .caption p, .gallery_feature .caption a").addClass("no-featherlight"), e(), $(".zoogle-feature section.gallery_feature.loaded div.gallery-modern").each(function () {
                return n($(this))
            }), $("section.gallery_feature.loaded div.gallery-slideshow").each(function () {
                return $(this).find(".cycle-next").addClass("initializing"), t($(this))
            }), picturefill({
                elements: $("section.gallery_feature.loaded div.gallery-slideshow .cycle-slide .img-wrap img")
            })
        }, $(function () {
            return i(), document.addEventListener("pageLoad", i)
        }), $.prepareUsersiteGalleries = i
    }.call(this), $(document).ready(function () {
        var e = function () {
            document.getElementById("gigsalad_quote_widget") && $("#gigsalad_quote_widget").gigSaladQuoteForm(), document.getElementById("gigsalad-reviews-widget") && $("#gigsalad-reviews-widget").gigSaladReview()
        };
        e(), document.addEventListener("pageLoad", e)
    }), $(document).ready(function () {
        var t = function (t, e) {
                var n = t.data("id");
                $.ajax({
                    url: e + "go/instagram_features/" + n + "/render_gallery"
                }).then(function (e) {
                    t.html(e)
                })
            },
            e = function () {
                var e = $("body").hasClass("wysiwyg") ? gon.usersiteBaseUrl : "";
                $(".instagram-feature-placeholder").each(function () {
                    t($(this), e)
                })
            };
        document.addEventListener("pageLoad", e), e(), $.loadInstagramFeatures = e
    }), $(document).ready(function () {
        $(document).on("click", "div.details a.animal_details.image", function () {
            return $(this).closest(".animal").find(".images a.animal_details.image:first").click(), !1
        })
    }), $(document).ready(function () {
        $("body").on("click", ".store-layout-list .store-item:not(.disable-featherlight) a.main-image", function (e) {
            e.stopImmediatePropagation(), $.featherlightGallery($(this).siblings("ul.image-thumbnails").find("li a"), {
                variant: "store-layout-list"
            })
        }), $("body").on("click", "section.feature .store-layout-grid .store-item:not(.disable-featherlight) a.main-image,\t\t\tsection.feature .store-layout-grid .store-item:not(.disable-featherlight) a.store-grid-link", function (e) {
            e.stopImmediatePropagation(), $.featherlight($(this).parents(".store-item"), {
                variant: "store-layout-list",
                afterOpen: function () {
                    document.dispatchEvent(new CustomEvent("pageLoad"))
                }
            })
        }), $("body").on("click", ".featherlight-content .store-item a.main-image", function (e) {
            e.stopImmediatePropagation(), $(this).siblings("ul.image-thumbnails").find("li:first a").click()
        })
    }), $(document).ready(function () {
        var e = function (e) {
                var t = "/go/hit_counter_features/" + e;
                $(".wysiwyg").length || e === undefined || $.ajax({
                    url: t,
                    type: "put",
                    dataType: "text",
                    data: {}
                })
            },
            t = function () {
                $(".hit_counter_feature").each(function () {
                    e($(this).data("feature-id"))
                })
            };
        t(), document.addEventListener("pageLoad", t)
    }), $(document).ready(function () {
        var e = ".music-player a.download,.post a.download, .store_feature .download, .product-action .download, .free-download .download",
            t = function (e) {
                $.ajax({
                    url: e,
                    dataType: "script"
                }).done(function () {
                    setTimeout(o, 2500)
                })
            },
            o = function () {
                var e = $("[data-poll-url]:visible").data("poll-url");
                e !== undefined && t(e)
            };
        $("body").on("click", ".free-download a.download", function (e) {
            e.preventDefault(), $.featherlight.current().load({
                ajax: $(this).attr("href")
            })
        }), $("body").on("click", e, function (e) {
            var t, n, i;
            i = this, e.preventDefault(), e.stopPropagation(), $(i).attr("disabled") || (t = {
                afterContent: function r() {
                    var e = $("#new_member").data("clientSideValidations");
                    void 0 !== e && delete e.validators["member[email]"].uniqueness, o(), $(document).on("sessioncreated", function () {
                        $.featherlight.close(), $.featherlight({
                            ajax: n
                        })
                    }), this.$instance.find(":input:enabled:visible:first").focus()
                }
            }, (n = $(this).attr("href")) && "#" !== n ? t.ajax = n : t.jquery = $(this).next(".dialog-for-download").find("> form"), $.featherlight.close(), $.featherlight(t))
        })
    }), $(document).ready(function () {
        var e = function () {
            var i = document.querySelector(".member_user_image"),
                e = document.querySelector("a.change_image");
            i && e && e.addEventListener("click", function () {
                var e = i.querySelector("ul.upload_list"),
                    t = i.querySelector("input[type=file]"),
                    n = e.querySelector("li.upload");
                e.addEventListener("refresh", function () {
                    n && n.parentNode.removeChild(n), n = null
                }), t.click()
            })
        };
        $(document).on("sessioncreated", function () {
            $(".protected_page_warning").length && document.location.reload()
        }), $("body").on("click", "a.register,a.login,a.forgot-password", function () {
            var e = $(this).attr("href"),
                t = "?",
                n = document.location.href; - 1 !== e.indexOf("?") && (t = "&"), $(this).attr("href", e + t + "return_to=" + n)
        }), e()
    }),
    function () {
        "undefined" == typeof window.zoogle && (window.zoogle = {});
        var n = function (e) {
            !1 !== e.success && (window.zoogle.userData = e, window.zoogle.applyData())
        };
        window.zoogle.applyData = function () {
            window.zoogle.userData !== undefined && ("undefined" != typeof window.zoogle.userData.name && "" !== window.zoogle.userData.name && null !== window.zoogle.userData.name || (window.zoogle.userData.name = ""), $("html").addClass("logged-in").removeClass("not-logged-in"), $("span.username").html(window.zoogle.userData.name), $(".topic_comment_name, .topic_location_name").remove(), $(".unless-logged-in input").remove())
        }, window.zoogle.loadUserData = function () {
            $("html").hasClass("wysiwyg") || (window.zoogle.userData ? window.zoogle.applyData() : $.ajax({
                url: "/go/member/profile",
                dataType: "json",
                success: n
            }))
        }, document.addEventListener("pageLoad", window.zoogle.loadUserData), window.zoogle.loadUserData(), $(document).on("sessioncreated", function (e, t) {
            n(t)
        })
    }(),
    function (e) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery)
    }(function (f) {
        function p(e) {
            return e
        }

        function m(e) {
            return decodeURIComponent(e.replace(t, " "))
        }

        function g(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return y.json ? JSON.parse(e) : e
            } catch (t) {}
        }
        var t = /\+/g,
            y = f.cookie = function (e, t, n) {
                if (t !== undefined) {
                    if ("number" == typeof (n = f.extend({}, y.defaults, n)).expires) {
                        var i = n.expires,
                            r = n.expires = new Date;
                        r.setDate(r.getDate() + i)
                    }
                    return t = y.json ? JSON.stringify(t) : String(t), document.cookie = [encodeURIComponent(e), "=", y.raw ? t : encodeURIComponent(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
                }
                for (var o = y.raw ? p : m, a = document.cookie.split("; "), s = e ? undefined : {}, l = 0, u = a.length; l < u; l++) {
                    var c = a[l].split("="),
                        d = o(c.shift()),
                        h = o(c.join("="));
                    if (e && e === d) {
                        s = g(h);
                        break
                    }
                    e || (s[d] = g(h))
                }
                return s
            };
        y.defaults = {}, f.removeCookie = function (e, t) {
            return f.cookie(e) !== undefined && (f.cookie(e, "", f.extend(t, {
                expires: -1
            })), !0)
        }
    }), $(document).ready(function () {
        var n = function (e) {
                $(e).find(".poll-wrapper,.poll-results").toggleClass("hide")
            },
            i = function (e) {
                $(".poll-thanks", $(e)).removeClass("hide")
            },
            r = function (e) {
                $(".actions", $(e)).addClass("hide")
            },
            e = function () {
                $("form.poll_vote").each(function () {
                    var e = $(this).data("check-id");
                    if (void 0 !== e && void 0 !== $.cookie(e)) {
                        var t = $(this).parents("section");
                        n(t), i(t), r(t)
                    }
                })
            };
        $(document).on("submit", "form.poll_vote", function (e) {
            if (0 === $(this).find("input:checked").length) return e.preventDefault(), !1;
            n()
        }).on("click", "a.toggle-poll-results", function (e) {
            e.preventDefault();
            var t = $(this).parents("section");
            n(t)
        }), e(), document.addEventListener("pageLoad", e)
    }), jQuery.fn.extend({
        everyTime: function (e, t, n, i) {
            return this.each(function () {
                jQuery.timer.add(this, e, t, n, i)
            })
        },
        oneTime: function (e, t, n) {
            return this.each(function () {
                jQuery.timer.add(this, e, t, n, 1)
            })
        },
        stopTime: function (e, t) {
            return this.each(function () {
                jQuery.timer.remove(this, e, t)
            })
        }
    }), jQuery.extend({
        timer: {
            global: [],
            guid: 1,
            dataKey: "jQuery.timer",
            regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
            powers: {
                ms: 1,
                cs: 10,
                ds: 100,
                s: 1e3,
                das: 1e4,
                hs: 1e5,
                ks: 1e6
            },
            timeParse: function (e) {
                if (e == undefined || null == e) return null;
                var t = this.regex.exec(jQuery.trim(e.toString()));
                return t[2] ? parseFloat(t[1]) * (this.powers[t[2]] || 1) : e
            },
            add: function (e, t, n, i, r) {
                var o = 0;
                if (jQuery.isFunction(n) && (r || (r = i), i = n, n = t), !("number" != typeof (t = jQuery.timer.timeParse(t)) || isNaN(t) || t < 0)) {
                    ("number" != typeof r || isNaN(r) || r < 0) && (r = 0), r = r || 0;
                    var a = jQuery.data(e, this.dataKey) || jQuery.data(e, this.dataKey, {});
                    a[n] || (a[n] = {}), i.timerID = i.timerID || this.guid++;
                    var s = function () {
                        (++o > r && 0 !== r || !1 === i.call(e, o)) && jQuery.timer.remove(e, n, i)
                    };
                    s.timerID = i.timerID, a[n][i.timerID] || (a[n][i.timerID] = window.setInterval(s, t)), this.global.push(e)
                }
            },
            remove: function (e, t, n) {
                var i, r = jQuery.data(e, this.dataKey);
                if (r) {
                    if (t) {
                        if (r[t]) {
                            if (n) n.timerID && (window.clearInterval(r[t][n.timerID]), delete r[t][n.timerID]);
                            else
                                for (var n in r[t]) window.clearInterval(r[t][n]), delete r[t][n];
                            for (i in r[t]) break;
                            i || (i = null, delete r[t])
                        }
                    } else
                        for (t in r) this.remove(e, t, n);
                    for (i in r) break;
                    i || jQuery.removeData(e, this.dataKey)
                }
            }
        }
    }), jQuery(window).bind("unload", function () {
        jQuery.each(jQuery.timer.global, function (e, t) {
            jQuery.timer.remove(t)
        })
    }), $(document).ready(function () {
        var e = function () {
            var e = $(".purchase_items").data("statusUrl");
            $.ajax({
                url: e,
                dataType: "script",
                success: function () {
                    0 === $(".purchase_items .building").length && $(".purchase_items").stopTime()
                }
            })
        };
        0 < $(".purchase_items .building").length && $(".purchase_items").everyTime(3e3, function () {
            e()
        })
    }), $(document).ready(function () {
        $(document).on("pjax:start", function () {
            "undefined" != typeof window.zoogleMedia && window.zoogleMedia.pauseOnExit()
        }), $(document).on("click", ".display-swmp .player-track-inner, .swmp-toggle-expand", function (e) {
            e.preventDefault(), $player = $(e.target).closest(".music-player"), $player.hasClass("display-swmp") && $player.hasClass("is-expandable") && (t(), $player.toggleClass("open"))
        });
        var t = function () {
            var e = document.querySelector(".display-swmp.is-expandable .player-extra");
            if (e) {
                var t = Math.max(document.documentElement.clientHeight, window.innerHeight);
                t && e.setAttribute("style", "max-height: " + t + "px")
            }
        }
    });
var SELECT_LOOKUP = 'select[name^="cart_item[option_"]',
    TRACK_INVENTORY_FORMS = "form.salable-item[data-track-inventory=true]",
    refreshInventoryForm = function (e) {
        var t, n = $(e).data(),
            i = $(e).find("button.add-to-cart"),
            r = !1;
        if (n.variations && 0 < n.variations.length) {
            var o = n.variations,
                a = $(e).find("[name='cart_item[option_1_value]']").val(),
                s = $(e).find("[name='cart_item[option_2_value]']").val();
            t = o.find(function (e) {
                return e.value_1 === a && (null === e.value_2 || e.value_2 === s)
            })
        } else t = n;
        if (t.inventory <= 0) {
            var l = i.data("out-of-stock");
            i.text(l).attr("disabled", "disabled"), r = !0
        } else {
            l = i.data("available");
            i.text(l).removeAttr("disabled")
        }
        $(e).toggleClass("out-of-stock", r).toggleClass("in-stock", !r)
    },
    refreshVariations = function (e, t) {
        var n, i, r, o, a, s, l = e.find(SELECT_LOOKUP).length;
        if (o = $(t).parents("form").data(), i = $(t).val(), 2 === l && ("cart_item[option_1_value]" == t.name ? (n = "value_1", otherKey = "value_2", r = e.find("[name='cart_item[option_2_value]'] option"), a = e.find("[name='cart_item[option_2_value]'] option:selected")) : (n = "value_2", otherKey = "value_1", r = e.find("[name='cart_item[option_1_value]'] option"), a = e.find("[name='cart_item[option_1_value]'] option:selected")), s = o.variations.filter(function (e) {
                return e[n] === i
            }).map(function (e) {
                return e[otherKey]
            })), r) {
            for (var u = 0; u < r.length; u++) {
                var c = r.get(u),
                    d = c.value;
                s.includes(d) ? (c.disabled = !1, $(c).text(c.value)) : (c.disabled = !0, $(c).text(c.value + " - " + I18n.t("usersite.products.status.not_available")))
            }
            a && "disabled" === $(a).attr("disabled") && $(a).prop("selected", !1)
        }
    };
$(document).on("change", SELECT_LOOKUP, function () {
    var e = $(this).parents("form");
    refreshVariations(e, this), "true" === e.get(0).dataset.trackInventory && refreshInventoryForm(e)
});
var refresh = function () {
    $(TRACK_INVENTORY_FORMS).each(function () {
        refreshInventoryForm(this), refreshVariations($(this), $(this).find("select:first").get(0))
    })
};
$("#cart").on("refresh", refresh), $(function () {
        refresh(), document.addEventListener("pageLoad", refresh)
    }), $(document).ready(function () {
        var e = function e() {
            window.forceRedraw(".fb-page")
        };
        window.forceRedraw = function (e) {
            $(e).trigger("resize")
        }, $(window).on("load", function () {
            "undefined" != typeof FB && null !== FB && ".fb-page".length && FB.Event.subscribe("xfbml.render", e)
        })
    }), $(document).ready(function () {
        var e = function () {
            $("table.ui-collection").each(function (e, t) {
                0 < $(t).find(".ui-collection-result").size() && $(t).find(".ui-collection-empty").addClass("hide")
            })
        };
        e(), document.addEventListener("pageLoad", e)
    }),
    function () {
        function e(e) {
            "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
        }
        zoogle.documentReady = e
    }(),
    function () {
        var n = ".feature-placeholder",
            i = "feature-placeholder-observed",
            e = {
                rootMargin: "300px 0px 0px 0px",
                threshold: 0
            },
            r = {},
            o = function () {
                var e;
                return document.querySelector("#page-root").dataset.pageId ? document.querySelector("#page-root").dataset.pageId : ("/" === (e = document.querySelector("#page-root").dataset.slug ? document.querySelector("#page-root").dataset.slug : window.location.pathname) && (e = document.body.classList.contains("intro-page") ? "intro" : "home"), e = e.replace(/^\//, ""))
            },
            a = function (e) {
                for (var t = o(), n = 0; n < e.length; n++) {
                    var i = e[n].dataset.blockId;
                    r[i] || s(t, i, e[n])
                }
            },
            s = function (e, t) {
                var n = "/" + e + "/deferred_features/" + t + ".html",
                    i = new XMLHttpRequest;
                "" !== window.location.search && (n += window.location.search), i.open("GET", n, !0), i.onload = function () {
                    if (200 <= i.status && i.status < 400) {
                        var e = i.responseText;
                        $(".feature-placeholder[data-block-id=" + t + "]").parent().replaceWith(e), document.dispatchEvent(new CustomEvent("pageLoad"))
                    }
                }, i.send()
            },
            t = function (e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    n.isIntersecting && (observer.unobserve(n.target), a([n.target]))
                }
            },
            l = function () {
                for (var e = document.querySelectorAll(n + ":not(." + i + ")"), t = 0; t < e.length; t++) e[t].classList.add(i), observer.observe(e[t])
            },
            u = function () {
                "undefined" == typeof IntersectionObserver ? (a(document.querySelectorAll(n)), document.addEventListener("pageLoad", a)) : (observer = new IntersectionObserver(t, e), l(), document.addEventListener("pageLoad", l))
            };
        zoogle.documentReady(u)
    }(),
    function () {
        $(function () {
            var r, n, o, i, a, s, l;
            if (0 !== (o = $("#edit-bar-wrap")).length && (n = r = null, a = function () {
                    return n.removeClass("active").filter("#desktop-view").addClass("active")
                }, i = function () {
                    return window.location.href.replace(/&?(cp_return_url|preview_from_cp)=([^&]+)/g, "").replace("?&", "?").replace(/\?$/, "").replace(/#.*/, "")
                }, l = function () {
                    var e, t;
                    return n = $(".view-toggle", r).removeClass("active"), e = $(this).addClass("active"), $("html").toggleClass("mobile-preview", "mobile-view" === e.attr("id")), "mobile-view" === e.attr("id") ? (zoogleMedia.pause(), t = (t = i()) + (t.match(/\?/) ? "&" : "?") + Math.floor(1e5 * Math.random()), $.featherlight({
                        html: '<div class="scroll-to-top">Scroll to top</div><iframe class="mobile-preview" name="mobile_preview" src="' + t + '"/>',
                        variant: "mobile-preview",
                        closeOnClick: !1,
                        afterClose: a
                    }), $(".scroll-to-top").click(s)) : $.featherlight.close(), !1
                }, s = function () {
                    return $(frames.mobile_preview.document).find("body").animate({
                        scrollTop: 0
                    }, 750)
                }, $('<iframe id="edit-bar" />').load(function () {
                    var e, t, n, i;
                    for (r = $("#edit-bar").contents(), $("body", r).append("<div id='controlpanel-container'>" + o.html() + "</div>"), $("head", r).append("<link href='//fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css'>"), e = 0, t = (n = o.data("stylesheet-url").split(";")).length; e < t; e++) i = n[e], $("head", r).append($('<link href="' + i + '" media="screen" rel="stylesheet" type="text/css">'));
                    if ($(".view-toggle", r).on("click", l), $(".popup-on-click", r).on("click", function (e) {
                            var t, n;
                            return n = $(this).data("width"), t = $(this).data("height"), window.open($(this).attr("href"), "popup", "width=" + n + ",height=" + t), e.preventDefault()
                        }), "function" != typeof window.matchMedia) return $(".view-toggle", r).remove()
                }).appendTo("body"), $("html").addClass("with-edit-bar"), $(document).on("pjax:end", function () {
                    var t;
                    return t = window.location.href.replace(/.*\/\/[^\/]+\/([^\/]+).*/, "$1"), $("#action-link a", r).each(function () {
                        var e;
                        if ((e = $(this)).attr("href").match(/controlpanel\/pages/)) return e.attr("href", unescape(e.data("template")).replace("{{page}}", t))
                    })
                }), $.support.pjax)) return window.history.replaceState("", $("title").text(), i())
        })
    }.call(this),
    function () {
        undefined;
        for (var o = function (e) {
                e.classList.contains("submit-check") || (e.classList.add("submit-check"), e.addEventListener("invalid", function () {
                    e.classList.add("submitted")
                }, !0), e.addEventListener("submit", function () {
                    e.classList.add("submitted")
                }))
            }, e = function () {
                var e = {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                };
                new MutationObserver(function (e) {
                    for (var t = 0; t < e.length; t++)
                        for (var n = e[t], i = 0; i < n.addedNodes.length; i++) {
                            var r = n.addedNodes[i];
                            "FORM" === r.tagName && o(r)
                        }
                }).observe(document.documentElement, e)
            }, t = document.querySelectorAll("form"), n = 0; n < t.length; n++) o(t[n]);
        e()
    }();
var ZoogleStats = function () {
    this.trackGA = function (e, t) {
        "undefined" != typeof gtag && (void 0 === t && (t = {}), gtag("event", e, t))
    }, this.trackZoogle = function (e) {
        window._zaq && window._zaq.push(e)
    }, this.Play = function (e) {
        this.trackGA(e.type, {
            event_category: "Tracks",
            event_label: e.title.toString()
        }), this.trackZoogle(["_track", e.id, "Track", e.type])
    }, this.Skip = function (e) {
        var t = 0;
        "Plays" === e.type && 0 < e.position && ((t = e.position / e.duration) < .1 ? (this.trackGA("Skips", {
            event_category: "Tracks",
            event_label: e.title.toString()
        }), this.trackZoogle(["_track", e.id, "Track", "Skip"])) : t < .8 && (this.trackGA("Partial", {
            event_category: "Tracks",
            event_label: e.title.toString()
        }), this.trackZoogle(["_track", e.id, "Track", "Partial"])))
    }, this.Finish = function (e) {
        e.type
    }
};
window.zoogleStats = new ZoogleStats, document.addEventListener("click", function (e) {
        if (e.target.dataset.statAction) {
            var t = e.target.dataset;
            window.zoogleStats.trackGA(t.statAction, {
                event_category: t.category,
                event_label: t.title.toString()
            }), window.zoogleStats.trackZoogle(["_track", t.id, t.category, t.statAction])
        }
    }), document.addEventListener("pageLoad", function () {
        if ("undefined" != typeof gtag && gtag("config", window.GA_TRACKING_CODE, {
                anonymize_ip: !0
            }), "undefined" != typeof window._zaq) {
            var e = document.querySelectorAll("[data-page-id]")[0];
            if (e) {
                var t = e.dataset.pageId;
                window._zaq.push(["_trackPage", t])
            }
        }
    }),
    function () {}.call(this), $(document).ready(function () {
        $(document).on("click", ".lock-page", function () {
            $(".lock-page").attr("disabled", !0)
        })
    }),
    function (Je, Ze) {
        function t(e, t) {
            function r(e) {
                return ue.preferFlash && ne && !ue.ignoreFlash && ue.flash[e] !== Ze && ue.flash[e]
            }

            function n(n) {
                return function (e) {
                    var t = this._s;
                    return t && t._a ? n.call(this, e) : null
                }
            }
            this.setupOptions = {
                url: e || null,
                flashVersion: 8,
                debugMode: !0,
                debugFlash: !1,
                useConsole: !0,
                consoleOnly: !0,
                waitForWindowLoad: !1,
                bgColor: "#ffffff",
                useHighPerformance: !1,
                flashPollingInterval: null,
                html5PollingInterval: null,
                flashLoadTimeout: 1e3,
                wmode: null,
                allowScriptAccess: "always",
                useFlashBlock: !1,
                useHTML5Audio: !0,
                forceUseGlobalHTML5Audio: !1,
                ignoreMobileRestrictions: !1,
                html5Test: /^(probably|maybe)$/i,
                preferFlash: !1,
                noSWFCache: !1,
                idPrefix: "sound"
            }, this.defaultOptions = {
                autoLoad: !1,
                autoPlay: !1,
                from: null,
                loops: 1,
                onid3: null,
                onerror: null,
                onload: null,
                whileloading: null,
                onplay: null,
                onpause: null,
                onresume: null,
                whileplaying: null,
                onposition: null,
                onstop: null,
                onfinish: null,
                multiShot: !0,
                multiShotEvents: !1,
                position: null,
                pan: 0,
                playbackRate: 1,
                stream: !0,
                to: null,
                type: null,
                usePolicyFile: !1,
                volume: 100
            }, this.flash9Options = {
                onfailure: null,
                isMovieStar: null,
                usePeakData: !1,
                useWaveformData: !1,
                useEQData: !1,
                onbufferchange: null,
                ondataerror: null
            }, this.movieStarOptions = {
                bufferTime: 3,
                serverURL: null,
                onconnect: null,
                duration: null
            }, this.audioFormats = {
                mp3: {
                    type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                    required: !0
                },
                mp4: {
                    related: ["aac", "m4a", "m4b"],
                    type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                    required: !1
                },
                ogg: {
                    type: ["audio/ogg; codecs=vorbis"],
                    required: !1
                },
                opus: {
                    type: ["audio/ogg; codecs=opus", "audio/opus"],
                    required: !1
                },
                wav: {
                    type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                    required: !1
                },
                flac: {
                    type: ["audio/flac"],
                    required: !1
                }
            }, this.movieID = "sm2-container", this.id = t || "sm2movie", this.debugID = "soundmanager-debug", this.debugURLParam = /([#?&])debug=1/i, this.versionNumber = "V2.97a.20170601", this.altURL = this.movieURL = this.version = null, this.enabled = this.swfLoaded = !1, this.oMC = null, this.sounds = {}, this.soundIDs = [], this.didFlashBlock = this.muted = !1, this.filePattern = null, this.filePatterns = {
                flash8: /\.mp3(\?.*)?$/i,
                flash9: /\.mp3(\?.*)?$/i
            }, this.features = {
                buffering: !1,
                peakData: !1,
                waveformData: !1,
                eqData: !1,
                movieStar: !1
            }, this.sandbox = {}, this.html5 = {
                usingFlash: null
            }, this.flash = {}, this.ignoreFlash = this.html5Only = !1;
            var o, d, i, a, h, y, s, v, l, u, c, f, p, m, g, w, b, _, x, S, k, T, C, E, A, $, M, L, P, I, D, O, N, j, z, R, H, F, q, W, B, Y, U, V, G, Q, J, Z, K, X, ee, te, ne, ie, re, oe, ae, se, le, ue = this,
                ce = null,
                de = null,
                he = navigator.userAgent,
                fe = Je.location.href.toString(),
                pe = document,
                me = [],
                ge = !1,
                ye = !1,
                ve = !1,
                we = !1,
                be = !1,
                _e = null,
                xe = null,
                Se = !1,
                ke = !1,
                Te = 0,
                Ce = null,
                Ee = [],
                Ae = null,
                $e = Array.prototype.slice,
                Me = !1,
                Le = 0,
                Pe = he.match(/(ipad|iphone|ipod)/i),
                Ie = he.match(/android/i),
                De = he.match(/msie|trident/i),
                Oe = he.match(/webkit/i),
                Ne = he.match(/safari/i) && !he.match(/chrome/i),
                je = he.match(/opera/i),
                ze = he.match(/(mobile|pre\/|xoom)/i) || Pe || Ie,
                Re = !fe.match(/usehtml5audio/i) && !fe.match(/sm2-ignorebadua/i) && Ne && !he.match(/silk/i) && he.match(/OS\sX\s10_6_([3-7])/i),
                He = pe.hasFocus !== Ze ? pe.hasFocus() : null,
                Fe = Ne && (pe.hasFocus === Ze || !pe.hasFocus()),
                qe = !Fe,
                We = /(mp3|mp4|mpa|m4a|m4b)/i,
                Be = pe.location ? pe.location.protocol.match(/http/i) : null,
                Ye = Be ? "" : "//",
                Ue = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4|m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
                Ve = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),
                Ge = new RegExp("\\.(" + Ve.join("|") + ")(\\?.*)?$", "i");
            this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i, this.useAltURL = !Be, Q = [null, "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED"];
            try {
                le = Audio !== Ze && (je && opera !== Ze && opera.version() < 10 ? new Audio(null) : new Audio).canPlayType !== Ze
            } catch (Qe) {
                le = !1
            }
            this.hasHTML5 = le, this.setup = function (e) {
                var t = !ue.url;
                return e !== Ze && ve && Ae && ue.ok(), l(e), Me || (ze ? ue.setupOptions.ignoreMobileRestrictions && !ue.setupOptions.forceUseGlobalHTML5Audio || (Ee.push(x.globalHTML5), Me = !0) : ue.setupOptions.forceUseGlobalHTML5Audio && (Ee.push(x.globalHTML5), Me = !0)), !se && ze && (ue.setupOptions.ignoreMobileRestrictions ? Ee.push(x.ignoreMobile) : (ue.setupOptions.useHTML5Audio = !0, ue.setupOptions.preferFlash = !1, Pe ? ue.ignoreFlash = !0 : (Ie && !he.match(/android\s2\.3/i) || !Ie) && (Me = !0))), e && (t && C && e.url !== Ze && ue.beginDelayedInit(), C || e.url === Ze || "complete" !== pe.readyState || setTimeout(k, 1)), se = !0, ue
            }, this.supported = this.ok = function () {
                return Ae ? ve && !we : ue.useHTML5Audio && ue.hasHTML5
            }, this.getMovie = function (e) {
                return d(e) || pe[e] || Je[e]
            }, this.createSound = function (e, t) {
                function n() {
                    return i = z(i), ue.sounds[i.id] = new o(i), ue.soundIDs.push(i.id), ue.sounds[i.id]
                }
                var i, r = null;
                if (!ve || !ue.ok()) return !1;
                if (t !== Ze && (e = {
                        id: e,
                        url: t
                    }), (i = v(e)).url = B(i.url), i.id === Ze && (i.id = ue.setupOptions.idPrefix + Le++), H(i.id, !0)) return ue.sounds[i.id];
                if (V(i))(r = n())._setup_html5(i);
                else {
                    if (ue.html5Only || ue.html5.usingFlash && i.url && i.url.match(/data:/i)) return n();
                    8 < y && null === i.isMovieStar && (i.isMovieStar = !!(i.serverURL || i.type && i.type.match(Ue) || i.url && i.url.match(Ge))), i = R(i, void 0), r = n(), 8 === y ? de._createSound(i.id, i.loops || 1, i.usePolicyFile) : (de._createSound(i.id, i.url, i.usePeakData, i.useWaveformData, i.useEQData, i.isMovieStar, !!i.isMovieStar && i.bufferTime, i.loops || 1, i.serverURL, i.duration || null, i.autoPlay, !0, i.autoLoad, i.usePolicyFile), i.serverURL || (r.connected = !0, i.onconnect && i.onconnect.apply(r))), i.serverURL || !i.autoLoad && !i.autoPlay || r.load(i)
                }
                return !i.serverURL && i.autoPlay && r.play(), r
            }, this.destroySound = function (e, t) {
                if (!H(e)) return !1;
                var n, i = ue.sounds[e];
                for (i.stop(), i._iO = {}, i.unload(), n = 0; n < ue.soundIDs.length; n++)
                    if (ue.soundIDs[n] === e) {
                        ue.soundIDs.splice(n, 1);
                        break
                    } return t || i.destruct(!0), delete ue.sounds[e], !0
            }, this.load = function (e, t) {
                return !!H(e) && ue.sounds[e].load(t)
            }, this.unload = function (e) {
                return !!H(e) && ue.sounds[e].unload()
            }, this.onposition = this.onPosition = function (e, t, n, i) {
                return !!H(e) && ue.sounds[e].onposition(t, n, i)
            }, this.clearOnPosition = function (e, t, n) {
                return !!H(e) && ue.sounds[e].clearOnPosition(t, n)
            }, this.start = this.play = function (e, t) {
                var n = null,
                    i = t && !(t instanceof Object);
                if (!ve || !ue.ok()) return !1;
                if (H(e, i)) i && (t = {
                    url: t
                });
                else {
                    if (!i) return !1;
                    i && (t = {
                        url: t
                    }), t && t.url && (t.id = e, n = ue.createSound(t).play())
                }
                return null === n && (n = ue.sounds[e].play(t)), n
            }, this.setPlaybackRate = function (e, t, n) {
                return !!H(e) && ue.sounds[e].setPlaybackRate(t, n)
            }, this.setPosition = function (e, t) {
                return !!H(e) && ue.sounds[e].setPosition(t)
            }, this.stop = function (e) {
                return !!H(e) && ue.sounds[e].stop()
            }, this.stopAll = function () {
                for (var e in ue.sounds) ue.sounds.hasOwnProperty(e) && ue.sounds[e].stop()
            }, this.pause = function (e) {
                return !!H(e) && ue.sounds[e].pause()
            }, this.pauseAll = function () {
                var e;
                for (e = ue.soundIDs.length - 1; 0 <= e; e--) ue.sounds[ue.soundIDs[e]].pause()
            }, this.resume = function (e) {
                return !!H(e) && ue.sounds[e].resume()
            }, this.resumeAll = function () {
                var e;
                for (e = ue.soundIDs.length - 1; 0 <= e; e--) ue.sounds[ue.soundIDs[e]].resume()
            }, this.togglePause = function (e) {
                return !!H(e) && ue.sounds[e].togglePause()
            }, this.setPan = function (e, t) {
                return !!H(e) && ue.sounds[e].setPan(t)
            }, this.setVolume = function (e, t) {
                var n, i;
                if (e !== Ze && !isNaN(e) && t === Ze) {
                    for (n = 0, i = ue.soundIDs.length; n < i; n++) ue.sounds[ue.soundIDs[n]].setVolume(e);
                    return !1
                }
                return !!H(e) && ue.sounds[e].setVolume(t)
            }, this.mute = function (e) {
                var t = 0;
                if (e instanceof String && (e = null), e) return !!H(e) && ue.sounds[e].mute();
                for (t = ue.soundIDs.length - 1; 0 <= t; t--) ue.sounds[ue.soundIDs[t]].mute();
                return ue.muted = !0
            }, this.muteAll = function () {
                ue.mute()
            }, this.unmute = function (e) {
                if (e instanceof String && (e = null), e) return !!H(e) && ue.sounds[e].unmute();
                for (e = ue.soundIDs.length - 1; 0 <= e; e--) ue.sounds[ue.soundIDs[e]].unmute();
                return !(ue.muted = !1)
            }, this.unmuteAll = function () {
                ue.unmute()
            }, this.toggleMute = function (e) {
                return !!H(e) && ue.sounds[e].toggleMute()
            }, this.getMemoryUse = function () {
                var e = 0;
                return de && 8 !== y && (e = parseInt(de._getMemoryUse(), 10)), e
            }, this.disable = function (e) {
                var t;
                if (e === Ze && (e = !1), we) return !1;
                for (we = !0, t = ue.soundIDs.length - 1; 0 <= t; t--) P(ue.sounds[ue.soundIDs[t]]);
                return P(ue), s(e), ee.remove(Je, "load", p), !0
            }, this.canPlayMIME = function (e) {
                var t;
                return ue.hasHTML5 && (t = G({
                    type: e
                })), !t && Ae && (t = e && ue.ok() ? !!(8 < y && e.match(Ue) || e.match(ue.mimePattern)) : null), t
            }, this.canPlayURL = function (e) {
                var t;
                return ue.hasHTML5 && (t = G({
                    url: e
                })), !t && Ae && (t = e && ue.ok() ? !!e.match(ue.filePattern) : null), t
            }, this.canPlayLink = function (e) {
                return !(e.type === Ze || !e.type || !ue.canPlayMIME(e.type)) || ue.canPlayURL(e.href)
            }, this.getSoundById = function (e) {
                return e ? ue.sounds[e] : null
            }, this.onready = function (e, t) {
                if ("function" != typeof e) throw O("needFunction", "onready");
                return t || (t = Je), c("onready", e, t), f(), !0
            }, this.ontimeout = function (e, t) {
                if ("function" != typeof e) throw O("needFunction", "ontimeout");
                return t || (t = Je), c("ontimeout", e, t), f({
                    type: "ontimeout"
                }), !0
            }, this._wD = this._writeDebug = function () {
                return !0
            }, this._debug = function () {}, this.reboot = function (e, t) {
                var n, i, r;
                for (n = ue.soundIDs.length - 1; 0 <= n; n--) ue.sounds[ue.soundIDs[n]].destruct();
                if (de) try {
                    De && (xe = de.innerHTML), _e = de.parentNode.removeChild(de)
                } catch (Ze) {}
                if (xe = _e = Ae = de = null, ue.enabled = C = ve = Se = ke = ge = ye = we = Me = ue.swfLoaded = !1, ue.soundIDs = [], ue.sounds = {}, Le = 0, se = !1, e) me = [];
                else
                    for (n in me)
                        if (me.hasOwnProperty(n))
                            for (i = 0, r = me[n].length; i < r; i++) me[n][i].fired = !1;
                return ue.html5 = {
                    usingFlash: null
                }, ue.flash = {}, ue.html5Only = !1, ue.ignoreFlash = !1, Je.setTimeout(function () {
                    t || ue.beginDelayedInit()
                }, 20), ue
            }, this.reset = function () {
                return ue.reboot(!0, !0)
            }, this.getMoviePercent = function () {
                return de && "PercentLoaded" in de ? de.PercentLoaded() : null
            }, this.beginDelayedInit = function () {
                be = !0, k(), setTimeout(function () {
                    return !ke && (A(), S(), ke = !0)
                }, 20), m()
            }, this.destruct = function () {
                ue.disable(!0)
            }, o = function (e) {
                var r, o, a, s, t, n, l, u, i, c, d, h = this,
                    f = !1,
                    p = [],
                    m = 0,
                    g = null;
                o = r = null, this.sID = this.id = e.id, this.url = e.url, this._iO = this.instanceOptions = this.options = v(e), this.pan = this.options.pan, this.volume = this.options.volume, this.isHTML5 = !1, this._a = null, d = !this.url, this.id3 = {}, this._debug = function () {}, this.load = function (e) {
                    var t;
                    if (e !== Ze ? h._iO = v(e, h.options) : (e = h.options, h._iO = e, g && g !== h.url && (h._iO.url = h.url, h.url = null)), h._iO.url || (h._iO.url = h.url), h._iO.url = B(h._iO.url), !(t = h.instanceOptions = h._iO).url && !h.url) return h;
                    if (t.url === h.url && 0 !== h.readyState && 2 !== h.readyState) return 3 === h.readyState && t.onload && ae(h, function () {
                        t.onload.apply(h, [!!h.duration])
                    }), h;
                    if (h.loaded = !1, h.readyState = 1, h.playState = 0, h.id3 = {}, V(t)) h._setup_html5(t)._called_load || (h._html5_canplay = !1, h.url !== t.url && (h._a.src = t.url, h.setPosition(0)), h._a.autobuffer = "auto", h._a.preload = "auto", h._a._called_load = !0);
                    else {
                        if (ue.html5Only || h._iO.url && h._iO.url.match(/data:/i)) return h;
                        try {
                            h.isHTML5 = !1, h._iO = R(z(t)), h._iO.autoPlay && (h._iO.position || h._iO.from) && (h._iO.autoPlay = !1), t = h._iO, 8 === y ? de._load(h.id, t.url, t.stream, t.autoPlay, t.usePolicyFile) : de._load(h.id, t.url, !!t.stream, !!t.autoPlay, t.loops || 1, !!t.autoLoad, t.usePolicyFile)
                        } catch (a) {
                            $({
                                type: "SMSOUND_LOAD_JS_EXCEPTION",
                                fatal: !0
                            })
                        }
                    }
                    return h.url = t.url, h
                }, this.unload = function () {
                    return 0 !== h.readyState && (h.isHTML5 ? (n(), h._a && (h._a.pause(), g = Z(h._a))) : 8 === y ? de._unload(h.id, "about:blank") : de._unload(h.id), a()), h
                }, this.destruct = function (e) {
                    h.isHTML5 ? (n(), h._a && (h._a.pause(), Z(h._a), Me || t(), h._a._s = null, h._a = null)) : (h._iO.onfailure = null, de._destroySound(h.id)), e || ue.destroySound(h.id, !0)
                }, this.start = this.play = function (e, t) {
                    var n, i, r, o;
                    if (n = !0, t = t === Ze || t, e || (e = {}), h.url && (h._iO.url = h.url), h._iO = v(h._iO, h.options), h._iO = v(e, h._iO), h._iO.url = B(h._iO.url), h.instanceOptions = h._iO, !h.isHTML5 && h._iO.serverURL && !h.connected) return h.getAutoPlay() || h.setAutoPlay(!0), h;
                    if (V(h._iO) && (h._setup_html5(h._iO), l()), 1 === h.playState && !h.paused && !(n = h._iO.multiShot)) return h.isHTML5 && h.setPosition(h._iO.position), h;
                    if (e.url && e.url !== h.url && (h.readyState || h.isHTML5 || 8 !== y || !d ? h.load(h._iO) : d = !1), !h.loaded)
                        if (0 === h.readyState) {
                            if (h.isHTML5 || ue.html5Only) {
                                if (!h.isHTML5) return h;
                                h.load(h._iO)
                            } else h._iO.autoPlay = !0, h.load(h._iO);
                            h.instanceOptions = h._iO
                        } else if (2 === h.readyState) return h;
                    return !h.isHTML5 && 9 === y && 0 < h.position && h.position === h.duration && (e.position = 0), h.paused && 0 <= h.position && (!h._iO.serverURL || 0 < h.position) ? h.resume() : (h._iO = v(e, h._iO), (!h.isHTML5 && null !== h._iO.position && 0 < h._iO.position || null !== h._iO.from && 0 < h._iO.from || null !== h._iO.to) && 0 === h.instanceCount && 0 === h.playState && !h._iO.serverURL && (n = function () {
                        h._iO = v(e, h._iO), h.play(h._iO)
                    }, h.isHTML5 && !h._html5_canplay ? h.load({
                        _oncanplay: n
                    }) : h.isHTML5 || h.loaded || h.readyState && 2 === h.readyState || h.load({
                        onload: n
                    }), h._iO = c()), (!h.instanceCount || h._iO.multiShotEvents || h.isHTML5 && h._iO.multiShot && !Me || !h.isHTML5 && 8 < y && !h.getAutoPlay()) && h.instanceCount++, h._iO.onposition && 0 === h.playState && u(h), h.playState = 1, h.paused = !1, h.position = h._iO.position === Ze || isNaN(h._iO.position) ? 0 : h._iO.position, h.isHTML5 || (h._iO = R(z(h._iO))), h._iO.onplay && t && (h._iO.onplay.apply(h), f = !0), h.setVolume(h._iO.volume, !0), h.setPan(h._iO.pan, !0), 1 !== h._iO.playbackRate && h.setPlaybackRate(h._iO.playbackRate), h.isHTML5 ? h.instanceCount < 2 ? (l(), n = h._setup_html5(), h.setPosition(h._iO.position), n.play()) : (i = new Audio(h._iO.url), r = function () {
                        ee.remove(i, "ended", r), h._onfinish(h), Z(i), i = null
                    }, o = function () {
                        ee.remove(i, "canplay", o);
                        try {
                            i.currentTime = h._iO.position / 1e3
                        } catch (e) {}
                        i.play()
                    }, ee.add(i, "ended", r), h._iO.volume !== Ze && (i.volume = Math.max(0, Math.min(1, h._iO.volume / 100))), h.muted && (i.muted = !0), h._iO.position ? ee.add(i, "canplay", o) : i.play()) : (n = de._start(h.id, h._iO.loops || 1, 9 === y ? h.position : h.position / 1e3, h._iO.multiShot || !1), 9 !== y || n || h._iO.onplayerror && h._iO.onplayerror.apply(h))), h
                }, this.stop = function (e) {
                    var t = h._iO;
                    return 1 === h.playState && (h._onbufferchange(0), h._resetOnPosition(0), h.paused = !1, h.isHTML5 || (h.playState = 0), i(), t.to && h.clearOnPosition(t.to), h.isHTML5 ? h._a && (e = h.position, h.setPosition(0), h.position = e, h._a.pause(), h.playState = 0, h._onTimer(), n()) : (de._stop(h.id, e), t.serverURL && h.unload()), h.instanceCount = 0, h._iO = {}, t.onstop && t.onstop.apply(h)), h
                }, this.setAutoPlay = function (e) {
                    h._iO.autoPlay = e, h.isHTML5 || (de._setAutoPlay(h.id, e), e && (h.instanceCount || 1 !== h.readyState || h.instanceCount++))
                }, this.getAutoPlay = function () {
                    return h._iO.autoPlay
                }, this.setPlaybackRate = function (e) {
                    if (e = Math.max(.5, Math.min(4, e)), h.isHTML5) try {
                        h._iO.playbackRate = e, h._a.playbackRate = e
                    } catch (ue) {}
                    return h
                }, this.setPosition = function (e) {
                    e === Ze && (e = 0);
                    var t = h.isHTML5 ? Math.max(e, 0) : Math.min(h.duration || h._iO.duration, Math.max(e, 0));
                    if (h.position = t, e = h.position / 1e3, h._resetOnPosition(h.position), h._iO.position = t, h.isHTML5) {
                        if (h._a) {
                            if (h._html5_canplay) {
                                if (h._a.currentTime.toFixed(3) !== e.toFixed(3)) try {
                                    h._a.currentTime = e, (0 === h.playState || h.paused) && h._a.pause()
                                } catch (o) {}
                            } else if (e) return h;
                            h.paused && h._onTimer(!0)
                        }
                    } else e = 9 === y ? h.position : e, h.readyState && 2 !== h.readyState && de._setPosition(h.id, e, h.paused || !h.playState, h._iO.multiShot);
                    return h
                }, this.pause = function (e) {
                    return h.paused || 0 === h.playState && 1 !== h.readyState || (h.paused = !0, h.isHTML5 ? (h._setup_html5().pause(), n()) : (e || e === Ze) && de._pause(h.id, h._iO.multiShot), h._iO.onpause && h._iO.onpause.apply(h)), h
                }, this.resume = function () {
                    var e = h._iO;
                    return h.paused && (h.paused = !1, h.playState = 1, h.isHTML5 ? (h._setup_html5().play(), l()) : (e.isMovieStar && !e.serverURL && h.setPosition(h.position), de._pause(h.id, e.multiShot)), !f && e.onplay ? (e.onplay.apply(h), f = !0) : e.onresume && e.onresume.apply(h)), h
                }, this.togglePause = function () {
                    return 0 === h.playState ? h.play({
                        position: 9 !== y || h.isHTML5 ? h.position / 1e3 : h.position
                    }) : h.paused ? h.resume() : h.pause(), h
                }, this.setPan = function (e, t) {
                    return e === Ze && (e = 0), t === Ze && (t = !1), h.isHTML5 || de._setPan(h.id, e), h._iO.pan = e, t || (h.pan = e, h.options.pan = e), h
                }, this.setVolume = function (e, t) {
                    return e === Ze && (e = 100), t === Ze && (t = !1), h.isHTML5 ? h._a && (ue.muted && !h.muted && (h.muted = !0, h._a.muted = !0), h._a.volume = Math.max(0, Math.min(1, e / 100))) : de._setVolume(h.id, ue.muted && !h.muted || h.muted ? 0 : e), h._iO.volume = e, t || (h.volume = e, h.options.volume = e), h
                }, this.mute = function () {
                    return h.muted = !0, h.isHTML5 ? h._a && (h._a.muted = !0) : de._setVolume(h.id, 0), h
                }, this.unmute = function () {
                    h.muted = !1;
                    var e = h._iO.volume !== Ze;
                    return h.isHTML5 ? h._a && (h._a.muted = !1) : de._setVolume(h.id, e ? h._iO.volume : h.options.volume), h
                }, this.toggleMute = function () {
                    return h.muted ? h.unmute() : h.mute()
                }, this.onposition = this.onPosition = function (e, t, n) {
                    return p.push({
                        position: parseInt(e, 10),
                        method: t,
                        scope: n !== Ze ? n : h,
                        fired: !1
                    }), h
                }, this.clearOnPosition = function (e, t) {
                    var n;
                    if (e = parseInt(e, 10), !isNaN(e))
                        for (n = 0; n < p.length; n++) e !== p[n].position || t && t !== p[n].method || (p[n].fired && m--, p.splice(n, 1))
                }, this._processOnPosition = function () {
                    var e, t;
                    if (!(e = p.length) || !h.playState || e <= m) return !1;
                    for (--e; 0 <= e; e--) !(t = p[e]).fired && h.position >= t.position && (t.fired = !0, m++, t.method.apply(t.scope, [t.position]));
                    return !0
                }, this._resetOnPosition = function (e) {
                    var t, n;
                    if (!(t = p.length)) return !1;
                    for (--t; 0 <= t; t--)(n = p[t]).fired && e <= n.position && (n.fired = !1, m--);
                    return !0
                }, c = function () {
                    var e, t, n = h._iO,
                        i = n.from,
                        r = n.to;
                    return t = function () {
                        h.clearOnPosition(r, t), h.stop()
                    }, e = function () {
                        null === r || isNaN(r) || h.onPosition(r, t)
                    }, null === i || isNaN(i) || (n.position = i, n.multiShot = !1, e()), n
                }, u = function () {
                    var e, t = h._iO.onposition;
                    if (t)
                        for (e in t) t.hasOwnProperty(e) && h.onPosition(parseInt(e, 10), t[e])
                }, i = function () {
                    var e, t = h._iO.onposition;
                    if (t)
                        for (e in t) t.hasOwnProperty(e) && h.clearOnPosition(parseInt(e, 10))
                }, l = function () {
                    h.isHTML5 && F(h)
                }, n = function () {
                    h.isHTML5 && q(h)
                }, (a = function (e) {
                    e || (p = [], m = 0), f = !1, h._hasTimer = null, h._a = null, h._html5_canplay = !1, h.bytesLoaded = null, h.bytesTotal = null, h.duration = h._iO && h._iO.duration ? h._iO.duration : null, h.durationEstimate = null, h.buffered = [], h.eqData = [], h.eqData.left = [], h.eqData.right = [], h.failures = 0, h.isBuffering = !1, h.instanceOptions = {}, h.instanceCount = 0, h.loaded = !1, h.metadata = {}, h.readyState = 0, h.muted = !1, h.paused = !1, h.peakData = {
                        left: 0,
                        right: 0
                    }, h.waveformData = {
                        left: [],
                        right: []
                    }, h.playState = 0, h.position = null, h.id3 = {}
                })(), this._onTimer = function (e) {
                    var t, n = !1,
                        i = {};
                    return (h._hasTimer || e) && h._a && (e || (0 < h.playState || 1 === h.readyState) && !h.paused) && ((t = h._get_html5_duration()) !== r && (r = t, h.duration = t, n = !0), h.durationEstimate = h.duration, (t = 1e3 * h._a.currentTime || 0) !== o && (o = t, n = !0), (n || e) && h._whileplaying(t, i, i, i, i)), n
                }, this._get_html5_duration = function () {
                    var e = h._iO;
                    return (e = h._a && h._a.duration ? 1e3 * h._a.duration : e && e.duration ? e.duration : null) && !isNaN(e) && Infinity !== e ? e : null
                }, this._apply_loop = function (e, t) {
                    e.loop = 1 < t ? "loop" : ""
                }, this._setup_html5 = function (e) {
                    e = v(h._iO, e);
                    var t, n = Me ? ce : h._a,
                        i = decodeURI(e.url);
                    if (Me ? i === decodeURI(te) && (t = !0) : i === decodeURI(g) && (t = !0), n) {
                        if (n._s)
                            if (Me) n._s && n._s.playState && !t && n._s.stop();
                            else if (!Me && i === decodeURI(g)) return h._apply_loop(n, e.loops), n;
                        t || (g && a(!1), n.src = e.url, te = g = h.url = e.url, n._called_load = !1)
                    } else e.autoLoad || e.autoPlay ? (h._a = new Audio(e.url), h._a.load()) : h._a = je && opera.version() < 10 ? new Audio(null) : new Audio, (n = h._a)._called_load = !1, Me && (ce = n);
                    return h.isHTML5 = !0, (h._a = n)._s = h, s(), h._apply_loop(n, e.loops), e.autoLoad || e.autoPlay ? h.load() : (n.autobuffer = !1, n.preload = "auto"), n
                }, s = function () {
                    if (h._a._added_events) return !1;
                    var e;
                    for (e in h._a._added_events = !0, oe) oe.hasOwnProperty(e) && h._a && h._a.addEventListener(e, oe[e], !1);
                    return !0
                }, t = function () {
                    var e;
                    for (e in h._a._added_events = !1, oe) oe.hasOwnProperty(e) && h._a && h._a.removeEventListener(e, oe[e], !1)
                }, this._onload = function (e) {
                    var t = !!e || !h.isHTML5 && 8 === y && h.duration;
                    return h.loaded = t, h.readyState = t ? 3 : 2, h._onbufferchange(0), t || h.isHTML5 || h._onerror(), h._iO.onload && ae(h, function () {
                        h._iO.onload.apply(h, [t])
                    }), !0
                }, this._onerror = function (e, t) {
                    h._iO.onerror && ae(h, function () {
                        h._iO.onerror.apply(h, [e, t])
                    })
                }, this._onbufferchange = function (e) {
                    return !(0 === h.playState || e && h.isBuffering || !e && !h.isBuffering) && (h.isBuffering = 1 === e, h._iO.onbufferchange && h._iO.onbufferchange.apply(h, [e]), !0)
                }, this._onsuspend = function () {
                    return h._iO.onsuspend && h._iO.onsuspend.apply(h), !0
                }, this._onfailure = function (e, t, n) {
                    h.failures++, h._iO.onfailure && 1 === h.failures && h._iO.onfailure(e, t, n)
                }, this._onwarning = function (e, t, n) {
                    h._iO.onwarning && h._iO.onwarning(e, t, n)
                }, this._onfinish = function () {
                    var e = h._iO.onfinish;
                    h._onbufferchange(0), h._resetOnPosition(0), h.instanceCount && (h.instanceCount--, h.instanceCount || (i(), h.playState = 0, h.paused = !1, h.instanceCount = 0, h.instanceOptions = {}, h._iO = {}, n(), h.isHTML5 && (h.position = 0)), (!h.instanceCount || h._iO.multiShotEvents) && e && ae(h, function () {
                        e.apply(h)
                    }))
                }, this._whileloading = function (e, t, n, i) {
                    var r = h._iO;
                    h.bytesLoaded = e, h.bytesTotal = t, h.duration = Math.floor(n), h.bufferLength = i, h.durationEstimate = h.isHTML5 || r.isMovieStar ? h.duration : r.duration ? h.duration > r.duration ? h.duration : r.duration : parseInt(h.bytesTotal / h.bytesLoaded * h.duration, 10), h.isHTML5 || (h.buffered = [{
                        start: 0,
                        end: h.duration
                    }]), (3 !== h.readyState || h.isHTML5) && r.whileloading && r.whileloading.apply(h)
                }, this._whileplaying = function (e, t, n, i, r) {
                    var o = h._iO;
                    return !isNaN(e) && null !== e && (h.position = Math.max(0, e), h._processOnPosition(), !h.isHTML5 && 8 < y && (o.usePeakData && t !== Ze && t && (h.peakData = {
                        left: t.leftPeak,
                        right: t.rightPeak
                    }), o.useWaveformData && n !== Ze && n && (h.waveformData = {
                        left: n.split(","),
                        right: i.split(",")
                    }), o.useEQData && r !== Ze && r && r.leftEQ && (e = r.leftEQ.split(","), h.eqData = e, h.eqData.left = e, r.rightEQ !== Ze && r.rightEQ && (h.eqData.right = r.rightEQ.split(",")))), 1 === h.playState && (h.isHTML5 || 8 !== y || h.position || !h.isBuffering || h._onbufferchange(0), o.whileplaying && o.whileplaying.apply(h)), !0)
                }, this._oncaptiondata = function (e) {
                    h.captiondata = e, h._iO.oncaptiondata && h._iO.oncaptiondata.apply(h, [e])
                }, this._onmetadata = function (e, t) {
                    var n, i, r = {};
                    for (n = 0, i = e.length; n < i; n++) r[e[n]] = t[n];
                    h.metadata = r, h._iO.onmetadata && h._iO.onmetadata.call(h, h.metadata)
                }, this._onid3 = function (e, t) {
                    var n, i, r = [];
                    for (n = 0, i = e.length; n < i; n++) r[e[n]] = t[n];
                    h.id3 = v(h.id3, r), h._iO.onid3 && h._iO.onid3.apply(h)
                }, this._onconnect = function (e) {
                    e = 1 === e, (h.connected = e) && (h.failures = 0, H(h.id) && (h.getAutoPlay() ? h.play(Ze, h.getAutoPlay()) : h._iO.autoLoad && h.load()), h._iO.onconnect && h._iO.onconnect.apply(h, [e]))
                }, this._ondataerror = function () {
                    0 < h.playState && h._iO.ondataerror && h._iO.ondataerror.apply(h)
                }
            }, E = function () {
                return pe.body || pe.getElementsByTagName("div")[0]
            }, d = function (e) {
                return pe.getElementById(e)
            }, v = function (e, t) {
                var n, i, r = e || {};
                for (i in n = t === Ze ? ue.defaultOptions : t) n.hasOwnProperty(i) && r[i] === Ze && (r[i] = "object" != typeof n[i] || null === n[i] ? n[i] : v(r[i], n[i]));
                return r
            }, ae = function (e, t) {
                e.isHTML5 || 8 !== y ? t() : Je.setTimeout(t, 0)
            }, u = {
                onready: 1,
                ontimeout: 1,
                defaultOptions: 1,
                flash9Options: 1,
                movieStarOptions: 1
            }, l = function (e, t) {
                var n, i = !0,
                    r = t !== Ze,
                    o = ue.setupOptions;
                for (n in e)
                    if (e.hasOwnProperty(n))
                        if ("object" != typeof e[n] || null === e[n] || e[n] instanceof Array || e[n] instanceof RegExp) r && u[t] !== Ze ? ue[t][n] = e[n] : o[n] !== Ze ? (ue.setupOptions[n] = e[n], ue[n] = e[n]) : u[n] === Ze ? i = !1 : ue[n] instanceof Function ? ue[n].apply(ue, e[n] instanceof Array ? e[n] : [e[n]]) : ue[n] = e[n];
                        else {
                            if (u[n] !== Ze) return l(e[n], n);
                            i = !1
                        } return i
            }, ee = function () {
                function e(e) {
                    var t = (e = $e.call(e)).length;
                    return r ? (e[1] = "on" + e[1], 3 < t && e.pop()) : 3 === t && e.push(!1), e
                }

                function t(e, t) {
                    var n = e.shift(),
                        i = [o[t]];
                    r ? n[i](e[0], e[1]) : n[i].apply(n, e)
                }
                var r = Je.attachEvent,
                    o = {
                        add: r ? "attachEvent" : "addEventListener",
                        remove: r ? "detachEvent" : "removeEventListener"
                    };
                return {
                    add: function () {
                        t(e(arguments), "add")
                    },
                    remove: function () {
                        t(e(arguments), "remove")
                    }
                }
            }(), oe = {
                abort: n(function () {}),
                canplay: n(function () {
                    var e, t = this._s;
                    if (!t._html5_canplay) {
                        if (t._html5_canplay = !0, t._onbufferchange(0), e = t._iO.position === Ze || isNaN(t._iO.position) ? null : t._iO.position / 1e3, this.currentTime !== e) try {
                            this.currentTime = e
                        } catch (n) {}
                        t._iO._oncanplay && t._iO._oncanplay()
                    }
                }),
                canplaythrough: n(function () {
                    var e = this._s;
                    e.loaded || (e._onbufferchange(0), e._whileloading(e.bytesLoaded, e.bytesTotal, e._get_html5_duration()), e._onload(!0))
                }),
                durationchange: n(function () {
                    var e, t = this._s;
                    e = t._get_html5_duration(), isNaN(e) || e === t.duration || (t.durationEstimate = t.duration = e)
                }),
                ended: n(function () {
                    this._s._onfinish()
                }),
                error: n(function () {
                    var e = Q[this.error.code] || null;
                    this._s._onload(!1), this._s._onerror(this.error.code, e)
                }),
                loadeddata: n(function () {
                    var e = this._s;
                    e._loaded || Ne || (e.duration = e._get_html5_duration())
                }),
                loadedmetadata: n(function () {}),
                loadstart: n(function () {
                    this._s._onbufferchange(1)
                }),
                play: n(function () {
                    this._s._onbufferchange(0)
                }),
                playing: n(function () {
                    this._s._onbufferchange(0)
                }),
                progress: n(function (e) {
                    var t, n, i = this._s,
                        r = 0;
                    r = e.target.buffered;
                    t = e.loaded || 0;
                    var o = e.total || 1;
                    if (i.buffered = [], r && r.length) {
                        for (t = 0, n = r.length; t < n; t++) i.buffered.push({
                            start: 1e3 * r.start(t),
                            end: 1e3 * r.end(t)
                        });
                        r = 1e3 * (r.end(0) - r.start(0)), t = Math.min(1, r / (1e3 * e.target.duration))
                    }
                    isNaN(t) || (i._whileloading(t, o, i._get_html5_duration()), t && o && t === o && oe.canplaythrough.call(this, e))
                }),
                ratechange: n(function () {}),
                suspend: n(function (e) {
                    var t = this._s;
                    oe.progress.call(this, e), t._onsuspend()
                }),
                stalled: n(function () {}),
                timeupdate: n(function () {
                    this._s._onTimer()
                }),
                waiting: n(function () {
                    this._s._onbufferchange(1)
                })
            }, V = function (e) {
                return !(!e || !(e.type || e.url || e.serverURL)) && (!(e.serverURL || e.type && r(e.type)) && (e.type ? G({
                    type: e.type
                }) : G({
                    url: e.url
                }) || ue.html5Only || e.url.match(/data:/i)))
            }, Z = function (e) {
                var t;
                return e && (t = Ne ? "about:blank" : ue.html5.canPlayType("audio/wav") ? "data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==" : "about:blank", e.src = t, e._called_unload !== Ze && (e._called_load = !1)), Me && (te = null), t
            }, G = function (e) {
                if (!ue.useHTML5Audio || !ue.hasHTML5) return !1;
                var t = e.url || null;
                e = e.type || null;
                var n, i = ue.audioFormats;
                if (e && ue.html5[e] !== Ze) return ue.html5[e] && !r(e);
                if (!J) {
                    for (n in J = [], i) i.hasOwnProperty(n) && (J.push(n), i[n].related && (J = J.concat(i[n].related)));
                    J = new RegExp("\\.(" + J.join("|") + ")(\\?.*)?$", "i")
                }
                return (n = t ? t.toLowerCase().match(J) : null) && n.length ? n = n[1] : e && (n = (-1 !== (t = e.indexOf(";")) ? e.substr(0, t) : e).substr(6)), n && ue.html5[n] !== Ze ? t = ue.html5[n] && !r(n) : (e = "audio/" + n, t = ue.html5.canPlayType({
                    type: e
                }), t = (ue.html5[n] = t) && ue.html5[e] && !r(e)), t
            }, X = function () {
                function e(e) {
                    var t, n = t = !1;
                    if (!o || "function" != typeof o.canPlayType) return t;
                    if (e instanceof Array) {
                        for (r = 0, t = e.length; r < t; r++)(ue.html5[e[r]] || o.canPlayType(e[r]).match(ue.html5Test)) && (n = !0, ue.html5[e[r]] = !0, ue.flash[e[r]] = !!e[r].match(We));
                        t = n
                    } else t = !(!(e = !(!o || "function" != typeof o.canPlayType) && o.canPlayType(e)) || !e.match(ue.html5Test));
                    return t
                }
                if (!ue.useHTML5Audio || !ue.hasHTML5) return Ae = ue.html5.usingFlash = !0, !1;
                var t, n, i, r, o = Audio !== Ze ? je && opera.version() < 10 ? new Audio(null) : new Audio : null,
                    a = {};
                for (t in i = ue.audioFormats)
                    if (i.hasOwnProperty(t) && (n = "audio/" + t, a[t] = e(i[t].type), a[n] = a[t], t.match(We) ? (ue.flash[t] = !0, ue.flash[n] = !0) : (ue.flash[t] = !1, ue.flash[n] = !1), i[t] && i[t].related))
                        for (r = i[t].related.length - 1; 0 <= r; r--) a["audio/" + i[t].related[r]] = a[t], ue.html5[i[t].related[r]] = a[t], ue.flash[i[t].related[r]] = a[t];
                return a.canPlayType = o ? e : null, ue.html5 = v(ue.html5, a), ue.html5.usingFlash = U(), Ae = ue.html5.usingFlash, !0
            }, x = {}, O = function () {}, z = function (e) {
                return 8 === y && 1 < e.loops && e.stream && (e.stream = !1), e
            }, R = function (e) {
                return e && !e.usePolicyFile && (e.onid3 || e.usePeakData || e.useWaveformData || e.useEQData) && (e.usePolicyFile = !0), e
            }, i = function () {
                return !1
            }, P = function (e) {
                for (var t in e) e.hasOwnProperty(t) && "function" == typeof e[t] && (e[t] = i)
            }, I = function (e) {
                e === Ze && (e = !1), (we || e) && ue.disable(e)
            }, D = function (e) {
                if (e)
                    if (e.match(/\.swf(\?.*)?$/i)) {
                        if (e.substr(e.toLowerCase().lastIndexOf(".swf?") + 4)) return e
                    } else e.lastIndexOf("/") !== e.length - 1 && (e += "/");
                return e = (e && -1 !== e.lastIndexOf("/") ? e.substr(0, e.lastIndexOf("/") + 1) : "./") + ue.movieURL, ue.noSWFCache && (e += "?ts=" + (new Date).getTime()), e
            }, b = function () {
                8 !== (y = parseInt(ue.flashVersion, 10)) && 9 !== y && (ue.flashVersion = y = 8);
                var e = ue.debugMode || ue.debugFlash ? "_debug.swf" : ".swf";
                ue.useHTML5Audio && !ue.html5Only && ue.audioFormats.mp4.required && y < 9 && (ue.flashVersion = y = 9), ue.version = ue.versionNumber + (ue.html5Only ? " (HTML5-only mode)" : 9 === y ? " (AS3/Flash 9)" : " (AS2/Flash 8)"), 8 < y ? (ue.defaultOptions = v(ue.defaultOptions, ue.flash9Options), ue.features.buffering = !0, ue.defaultOptions = v(ue.defaultOptions, ue.movieStarOptions), ue.filePatterns.flash9 = new RegExp("\\.(mp3|" + Ve.join("|") + ")(\\?.*)?$", "i"), ue.features.movieStar = !0) : ue.features.movieStar = !1, ue.filePattern = ue.filePatterns[8 !== y ? "flash9" : "flash8"], ue.movieURL = (8 === y ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", e), ue.features.peakData = ue.features.waveformData = ue.features.eqData = 8 < y
            }, M = function (e, t) {
                de && de._setPolling(e, t)
            }, L = function () {}, H = this.getSoundById, j = function () {
                var e = [];
                return ue.debugMode && e.push("sm2_debug"), ue.debugFlash && e.push("flash_debug"), ue.useHighPerformance && e.push("high_performance"), e.join(" ")
            }, N = function () {
                O("fbHandler");
                var e = ue.getMoviePercent(),
                    t = {
                        type: "FLASHBLOCK"
                    };
                ue.html5Only || (ue.ok() ? ue.oMC && (ue.oMC.className = [j(), "movieContainer", "swf_loaded" + (ue.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (Ae && (ue.oMC.className = j() + " movieContainer " + (null === e ? "swf_timedout" : "swf_error")), ue.didFlashBlock = !0, f({
                    type: "ontimeout",
                    ignoreInit: !0,
                    error: t
                }), $(t)))
            }, c = function (e, t, n) {
                me[e] === Ze && (me[e] = []), me[e].push({
                    method: t,
                    scope: n || null,
                    fired: !1
                })
            }, f = function (e) {
                if (e || (e = {
                        type: ue.ok() ? "onready" : "ontimeout"
                    }), !ve && e && !e.ignoreInit || "ontimeout" === e.type && (ue.ok() || we && !e.ignoreInit)) return !1;
                var t, n = {
                        success: e && e.ignoreInit ? ue.ok() : !we
                    },
                    i = e && e.type && me[e.type] || [],
                    r = [],
                    o = (n = [n], Ae && !ue.ok());
                for (e.error && (n[0].error = e.error), e = 0, t = i.length; e < t; e++) !0 !== i[e].fired && r.push(i[e]);
                if (r.length)
                    for (e = 0, t = r.length; e < t; e++) r[e].scope ? r[e].method.apply(r[e].scope, n) : r[e].method.apply(this, n), o || (r[e].fired = !0);
                return !0
            }, p = function () {
                Je.setTimeout(function () {
                    ue.useFlashBlock && N(), f(), "function" == typeof ue.onload && ue.onload.apply(Je), ue.waitForWindowLoad && ee.add(Je, "load", p)
                }, 1)
            }, ie = function () {
                if (ne !== Ze) return ne;
                var e, t, n = !1,
                    i = navigator,
                    r = Je.ActiveXObject;
                try {
                    t = i.plugins
                } catch (de) {
                    t = void 0
                }
                if (t && t.length)(i = i.mimeTypes) && i["application/x-shockwave-flash"] && i["application/x-shockwave-flash"].enabledPlugin && i["application/x-shockwave-flash"].enabledPlugin.description && (n = !0);
                else if (r !== Ze && !he.match(/MSAppHost/i)) {
                    try {
                        e = new r("ShockwaveFlash.ShockwaveFlash")
                    } catch (pe) {
                        e = null
                    }
                    n = !!e
                }
                return ne = n
            }, U = function () {
                var e, t, n = ue.audioFormats;
                if (Pe && he.match(/os (1|2|3_0|3_1)\s/i) ? (ue.hasHTML5 = !1, ue.html5Only = !0, ue.oMC && (ue.oMC.style.display = "none")) : !ue.useHTML5Audio || ue.html5 && ue.html5.canPlayType || (ue.hasHTML5 = !1), ue.useHTML5Audio && ue.hasHTML5)
                    for (t in Y = !0, n) n.hasOwnProperty(t) && n[t].required && (ue.html5.canPlayType(n[t].type) ? ue.preferFlash && (ue.flash[t] || ue.flash[n[t].type]) && (e = !0) : e = !(Y = !1));
                return ue.ignoreFlash && (Y = !(e = !1)), ue.html5Only = ue.hasHTML5 && ue.useHTML5Audio && !e, !ue.html5Only
            }, B = function (e) {
                var t, n, i = 0;
                if (e instanceof Array) {
                    for (t = 0, n = e.length; t < n; t++)
                        if (e[t] instanceof Object) {
                            if (ue.canPlayMIME(e[t].type)) {
                                i = t;
                                break
                            }
                        } else if (ue.canPlayURL(e[t])) {
                        i = t;
                        break
                    }
                    e[i].url && (e[i] = e[i].url), e = e[i]
                }
                return e
            }, F = function (e) {
                e._hasTimer || (e._hasTimer = !0, !ze && ue.html5PollingInterval && (null === Ce && 0 === Te && (Ce = setInterval(W, ue.html5PollingInterval)), Te++))
            }, q = function (e) {
                e._hasTimer && (e._hasTimer = !1, !ze && ue.html5PollingInterval && Te--)
            }, W = function () {
                var e;
                if (null === Ce || Te)
                    for (e = ue.soundIDs.length - 1; 0 <= e; e--) ue.sounds[ue.soundIDs[e]].isHTML5 && ue.sounds[ue.soundIDs[e]]._hasTimer && ue.sounds[ue.soundIDs[e]]._onTimer();
                else clearInterval(Ce), Ce = null
            }, $ = function (e) {
                e = e !== Ze ? e : {}, "function" == typeof ue.onerror && ue.onerror.apply(Je, [{
                    type: e.type !== Ze ? e.type : null
                }]), e.fatal !== Ze && e.fatal && ue.disable()
            }, re = function () {
                if (Re && ie()) {
                    var e, t, n = ue.audioFormats;
                    for (t in n)
                        if (n.hasOwnProperty(t) && ("mp3" === t || "mp4" === t) && (ue.html5[t] = !1, n[t] && n[t].related))
                            for (e = n[t].related.length - 1; 0 <= e; e--) ue.html5[n[t].related[e]] = !1
                }
            }, this._setSandboxType = function () {}, this._externalInterfaceOK = function () {
                ue.swfLoaded || (ue.swfLoaded = !0, Fe = !1, Re && re(), setTimeout(h, De ? 100 : 1))
            }, A = function (e, t) {
                function n(e, t) {
                    return '<param name="' + e + '" value="' + t + '" />'
                }
                if (ge && ye) return !1;
                if (ue.html5Only) return b(), ue.oMC = d(ue.movieID), h(), ye = ge = !0, !1;
                var i, r, o, a = t || ue.url,
                    s = ue.altURL || a,
                    l = E(),
                    u = j(),
                    c = null;
                c = (c = pe.getElementsByTagName("html")[0]) && c.dir && c.dir.match(/rtl/i);
                if (e = e === Ze ? ue.id : e, b(), ue.url = D(Be ? a : s), t = ue.url, ue.wmode = !ue.wmode && ue.useHighPerformance ? "transparent" : ue.wmode, null !== ue.wmode && (he.match(/msie 8/i) || !De && !ue.useHighPerformance) && navigator.platform.match(/win32|win64/i) && (Ee.push(x.spcWmode), ue.wmode = null), l = {
                        name: e,
                        id: e,
                        src: t,
                        quality: "high",
                        allowScriptAccess: ue.allowScriptAccess,
                        bgcolor: ue.bgColor,
                        pluginspage: Ye + "www.macromedia.com/go/getflashplayer",
                        title: "JS/Flash audio component (SoundManager 2)",
                        type: "application/x-shockwave-flash",
                        wmode: ue.wmode,
                        hasPriority: "true"
                    }, ue.debugFlash && (l.FlashVars = "debug=1"), ue.wmode || delete l.wmode, De) a = pe.createElement("div"), r = ['<object id="' + e + '" data="' + t + '" type="' + l.type + '" title="' + l.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', n("movie", t), n("AllowScriptAccess", ue.allowScriptAccess), n("quality", l.quality), ue.wmode ? n("wmode", ue.wmode) : "", n("bgcolor", ue.bgColor), n("hasPriority", "true"), ue.debugFlash ? n("FlashVars", l.FlashVars) : "", "</object>"].join("");
                else
                    for (i in a = pe.createElement("embed"), l) l.hasOwnProperty(i) && a.setAttribute(i, l[i]);
                if (L(), u = j(), l = E())
                    if (ue.oMC = d(ue.movieID) || pe.createElement("div"), ue.oMC.id) o = ue.oMC.className, ue.oMC.className = (o ? o + " " : "movieContainer") + (u ? " " + u : ""), ue.oMC.appendChild(a), De && ((i = ue.oMC.appendChild(pe.createElement("div"))).className = "sm2-object-box", i.innerHTML = r), ye = !0;
                    else {
                        if (ue.oMC.id = ue.movieID, ue.oMC.className = "movieContainer " + u, i = u = null, ue.useFlashBlock || (ue.useHighPerformance ? u = {
                                position: "fixed",
                                width: "8px",
                                height: "8px",
                                bottom: "0px",
                                left: "0px",
                                overflow: "hidden"
                            } : (u = {
                                position: "absolute",
                                width: "6px",
                                height: "6px",
                                top: "-9999px",
                                left: "-9999px"
                            }, c && (u.left = Math.abs(parseInt(u.left, 10)) + "px"))), Oe && (ue.oMC.style.zIndex = 1e4), !ue.debugFlash)
                            for (o in u) u.hasOwnProperty(o) && (ue.oMC.style[o] = u[o]);
                        try {
                            De || ue.oMC.appendChild(a), l.appendChild(ue.oMC), De && ((i = ue.oMC.appendChild(pe.createElement("div"))).className = "sm2-object-box", i.innerHTML = r), ye = !0
                        } catch (ee) {
                            throw Error(O("domError") + " \n" + ee.toString())
                        }
                    } return ge = !0
            }, S = function () {
                return ue.html5Only ? (A(), !1) : !(de || !ue.url) && ((de = ue.getMovie(ue.id)) || (_e ? (De ? ue.oMC.innerHTML = xe : ue.oMC.appendChild(_e), ge = !(_e = null)) : A(ue.id, ue.url), de = ue.getMovie(ue.id)), "function" == typeof ue.oninitmovie && setTimeout(ue.oninitmovie, 1), !0)
            }, m = function () {
                setTimeout(g, 1e3)
            }, w = function () {
                Je.setTimeout(function () {
                    ue.setup({
                        preferFlash: !1
                    }).reboot(), ue.didFlashBlock = !0, ue.beginDelayedInit()
                }, 1)
            }, g = function () {
                var e, t = !1;
                ue.url && !Se && (Se = !0, ee.remove(Je, "load", m), ne && Fe && !He || (ve || 0 < (e = ue.getMoviePercent()) && e < 100 && (t = !0), setTimeout(function () {
                    e = ue.getMoviePercent(), t ? (Se = !1, Je.setTimeout(m, 1)) : !ve && qe && (null === e ? ue.useFlashBlock || 0 === ue.flashLoadTimeout ? ue.useFlashBlock && N() : !ue.useFlashBlock && Y ? w() : f({
                        type: "ontimeout",
                        ignoreInit: !0,
                        error: {
                            type: "INIT_FLASHBLOCK"
                        }
                    }) : 0 !== ue.flashLoadTimeout && (!ue.useFlashBlock && Y ? w() : I(!0)))
                }, ue.flashLoadTimeout)))
            }, _ = function () {
                return He || !Fe || (He = qe = !0, Se = !1, m()), ee.remove(Je, "focus", _), !0
            }, s = function (e) {
                if (ve) return !1;
                if (ue.html5Only) return ve = !0, p(), !0;
                var t, n = !0;
                return ue.useFlashBlock && ue.flashLoadTimeout && !ue.getMoviePercent() || (ve = !0), t = {
                    type: !ne && Ae ? "NO_FLASH" : "INIT_TIMEOUT"
                }, (we || e) && (ue.useFlashBlock && ue.oMC && (ue.oMC.className = j() + " " + (null === ue.getMoviePercent() ? "swf_timedout" : "swf_error")), f({
                    type: "ontimeout",
                    error: t,
                    ignoreInit: !0
                }), $(t), n = !1), we || (ue.waitForWindowLoad && !be ? ee.add(Je, "load", p) : p()), n
            }, a = function () {
                var e, t = ue.setupOptions;
                for (e in t) t.hasOwnProperty(e) && (ue[e] === Ze ? ue[e] = t[e] : ue[e] !== t[e] && (ue.setupOptions[e] = ue[e]))
            }, h = function () {
                if (ve) return !1;
                if (ue.html5Only) return ve || (ee.remove(Je, "load", ue.beginDelayedInit), ue.enabled = !0, s()), !0;
                S();
                try {
                    de._externalInterfaceTest(!1), M(!0, ue.flashPollingInterval || (ue.useHighPerformance ? 10 : 50)), ue.debugMode || de._disableDebug(), ue.enabled = !0, ue.html5Only || ee.add(Je, "unload", i)
                } catch (e) {
                    return $({
                        type: "JS_TO_FLASH_EXCEPTION",
                        fatal: !0
                    }), I(!0), s(), !1
                }
                return s(), ee.remove(Je, "load", ue.beginDelayedInit), !0
            }, k = function () {
                return !C && (C = !0, a(), L(), !ne && ue.hasHTML5 && ue.setup({
                    useHTML5Audio: !0,
                    preferFlash: !1
                }), X(), !ne && Ae && (Ee.push(x.needFlash), ue.setup({
                    flashLoadTimeout: 1
                })), pe.removeEventListener && pe.removeEventListener("DOMContentLoaded", k, !1), S(), !0)
            }, K = function () {
                return "complete" === pe.readyState && (k(), pe.detachEvent("onreadystatechange", K)), !0
            }, T = function () {
                be = !0, k(), ee.remove(Je, "load", T)
            }, ie(), ee.add(Je, "focus", _), ee.add(Je, "load", m), ee.add(Je, "load", T), pe.addEventListener ? pe.addEventListener("DOMContentLoaded", k, !1) : pe.attachEvent ? pe.attachEvent("onreadystatechange", K) : $({
                type: "NO_DOM2_EVENTS",
                fatal: !0
            })
        }
        if (!Je || !Je.document) throw Error("SoundManager requires a browser with window and document objects.");
        var e = null;
        Je.SM2_DEFER !== Ze && SM2_DEFER || (e = new t), "object" == typeof module && module && "object" == typeof module.exports ? (module.exports.SoundManager = t, module.exports.soundManager = e) : "function" == typeof define && define.amd && define(function () {
            return {
                constructor: t,
                getInstance: function (e) {
                    return !Je.soundManager && e instanceof Function && ((e = e(t)) instanceof t && (Je.soundManager = e)), Je.soundManager
                }
            }
        }), Je.SoundManager = t, Je.soundManager = e
    }(window), $.fn.extend({
        marquee: function marquee() {
            return this.each(function () {
                var e = $(this),
                    t = $(this.cloneNode(!0)).hide().css({
                        position: "absolute",
                        overflow: "visible"
                    }).width("auto").height(e.height());
                e.after(t);
                var n = t.width(),
                    i = e.width();
                if (t.remove(), i < n) {
                    var r = 50 * (n - i);
                    return $(this).animate({
                        dummy: 1
                    }, 500).animate({
                        scrollLeft: n - i + 20
                    }, r).animate({
                        scrollLeft: -20
                    }, r / 2, function () {
                        return e.marquee()
                    })
                }
            })
        }
    });
var mediaCount = 0,
    MUSIC_FEATURE_INTERSECTION_CLASS = ".track-list li:last-child",
    MUSIC_FEATURE_OBSERVED_CLASS = "track-list-observed",
    playlistObserverConfig = {
        rootMargin: "100px 0px 0px 0px",
        threshold: 0
    },
    handleStats = function (e, t, n) {
        var i = e.dataset;
        window.zoogleStats && i.category && (void 0 === n && (n = {}), n = Object.assign({}, {
            id: i.id,
            title: i.title,
            type: i.category
        }, n), window.zoogleStats[t](n))
    },
    namespace = "zoogleMedia",
    ZoogleMediaSound = function (e, t) {
        var n = e.dataset.dest,
            i = this,
            r = function (e) {
                var t = new CustomEvent(e + "." + namespace, {
                    bubbles: !0,
                    cancelable: !0,
                    detail: {
                        sound: i.sound,
                        el: i.el,
                        type: e + ".media"
                    }
                });
                i.el.dispatchEvent(t)
            };
        void 0 === n && (n = e.href), this.sound = window.soundManager.createSound({
            id: "playable" + mediaCount++,
            url: n,
            type: "audio/mp3",
            whileplaying: function () {
                r("whileplaying")
            },
            onplay: function () {
                window.zoogleMedia.setActive(t), handleStats(i.el, "Play"), r("play")
            },
            onresume: function () {
                window.zoogleMedia.setActive(t), r("play")
            },
            onpause: function () {
                r("pause")
            },
            onstop: function () {
                r("pause"), i.sound.setPosition(0)
            },
            onfinish: function () {
                "Previews" !== e.dataset.category && handleStats(i.el, "Finish"), r("finish")
            }
        }), this.sound.parent = e, this.loopAtEnd = e.dataset.loopAtEnd || !1, (this.el = e).playable = this.sound, e.player = t
    },
    ZoogleMediaPlayer = function (e) {
        var t, l = this;
        this.el = e, this.loopAtEnd = "true" === e.dataset.loopPlaylist || !1, this.shuffle = "true" === e.dataset.shuffle || !1;
        var i = function (e) {
            var t = "paused" == e;
            "playing" == e ? (l.el.classList.add("loading"), l.el.classList.add("playing"), l.el.classList.remove("paused")) : t && (l.el.classList.add("paused"), l.el.classList.remove("playing"))
        };
        this.currentTrackLink = function (e) {
            var t = l.el.querySelector("a.play.current");
            return null === t && (!0 === e ? t = l.el.querySelector("a.play:first-child") : !0 === l.shuffle && (t = l.seekTrack())), t
        }, this.currentSound = function () {
            var e = l.el.querySelector("a.play.current");
            return null === e ? null : e.playable
        }, this.seekTrack = function (e) {
            var t, n;
            if (void 0 === e && (e = "prev"), l.shuffle) t = (n = this.el.querySelectorAll("li:not(.current) a.play"))[Math.floor(Math.random() * n.length)];
            else {
                var i, r = window.zgl.getClosest(this.currentTrackLink(), "li");
                r && (i = "next" == e ? r.nextElementSibling : r.previousElementSibling) && (t = i.querySelector("a.play")), t === undefined && !0 === l.loopAtEnd && (n = this.el.querySelectorAll("a.play"), t = "prev" === e ? n[n.length - 1] : n[0])
            }
            var o = new CustomEvent("loadMore." + namespace, {
                bubbles: !0,
                cancelable: !0,
                detail: {
                    el: l,
                    type: "loadMore.media"
                }
            });
            return l.el.dispatchEvent(o), t
        }, this.pause = function () {
            var e = l.currentSound();
            e && e.pause(), i("paused")
        }, this.previousTrack = function () {
            return this.seekTrack("prev")
        }, this.nextTrack = function () {
            return this.seekTrack("next")
        }, this.seekTo = function (e) {
            var t, n = l.currentSound();
            null !== n && (t = n.bytesTotal > n.bytesLoaded ? n.durationEstimate : n.duration, n.setPosition(e * t))
        }, this.forEachEls = function (e, t) {
            Array.prototype.forEach.call(e, t)
        }, this.updateProgress = function (e, t) {
            var n = window.zgl.formatTime(e),
                i = l.el.querySelectorAll(".swmp-header .progress .cur, .player .progress .cur, .current .progress .cur"),
                r = l.el.querySelectorAll(".swmp-header .progress .position, .player .progress .position, .current .progress .position");
            l.el.classList.remove("loading"), this.forEachEls(i, function (e) {
                e.innerHTML = n
            }), this.forEachEls(r, function (e) {
                e.style.width = Math.min(100, t) + "%"
            })
        }, this.updateTrackDisplay = function (e) {
            var t = l.el,
                n = e.dataset;
            n.title || (n.title = e.innerHTML), null !== t.querySelector(".player") && (this.forEachEls(t.querySelectorAll("[data-target=player-title]"), function (e) {
                e.innerHTML = n.title, l.applyMarquee(e)
            }), this.forEachEls(t.querySelectorAll(".player .progress .duration, .swmp-header .progress .duration"), function (e) {
                e.innerHTML = n.duration
            }), this.forEachEls(t.querySelectorAll(".progress .cur"), function (e) {
                e.innerHTML = "0:00"
            }), this.updateArtistToPlayer(n.artist), this.copyBuyButtonToPlayer(e), this.copySocialLinksToPlayer(e), this.copyArtworkToPlayer(e))
        }, this.updateArtistToPlayer = function (t) {
            this.forEachEls(l.el.querySelectorAll("[data-target=artist]"), function (e) {
                t ? (e.classList.remove("empty"), e.innerHTML = "<span>" + window.zgl.escapeHTML(t) + "</span>") : (e.classList.add("empty"), e.innerHTML = "")
            })
        }, this.applyMarquee = function (e) {
            jQuery && !0 === jQuery.fx.off || !e.classList.contains("marquee") || $(e).marquee()
        }, this.copyBuyButtonToPlayer = function (e) {
            this.copyActionsToPlayer(e, ".track-action", ".actions .action"), this.copyActionsToPlayer(e, ".track-action", ".swmp-header .action");
            var t = l.el.querySelector(".swmp-header .actions");
            t && this.toggleClass(t, "hide", "" == t.innerText.replace(/\s/g, ""))
        }, this.toggleClass = function (e, t, n) {
            var i = n ? "add" : "remove";
            e.classList[i](t)
        }, this.copySocialLinksToPlayer = function (e) {
            this.copyActionsToPlayer(e, ".share", ".share .links")
        }, this.copyActionsToPlayer = function (e, t, n) {
            var i = l.el.querySelector(n);
            if (i) {
                for (var r = this.getTrackContainer(e).querySelector(t); i.firstChild;) i.removeChild(i.firstChild);
                r && i.appendChild(r.cloneNode(!0))
            }
        }, this.copyArtworkToPlayer = function (e) {
            var t = l.el,
                n = t.querySelector("[data-target=album-artwork]");
            if (n) {
                var i = t.querySelector("[data-target=album-artwork-background]"),
                    r = null,
                    o = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                    a = !1;
                if ((r = this.getTrackContainer(e).dataset.albumImageUrl) && "" != r) a = !0, o = r, n.setAttribute("src", r);
                else {
                    var s = document.querySelector(".page-photo-background");
                    s && (o = getComputedStyle(s).backgroundImage.replace(/url\("(.*)"\)/, "$1"))
                }
                i.setAttribute("style", "background-image: url(" + o + ")"), this.toggleClass(t.querySelector(".album-artwork"), "placeholder", !a)
            }
        }, this.getTrackContainer = function (e) {
            return window.zgl.getClosest(e, "li")
        }, this.loadSounds = function (e) {
            for (var t = 0; t < e.length; t++) e[t].classList.add("initialized"), new ZoogleMediaSound(e[t], this.el)
        }, this.loadMoreSounds = function (e) {
            var t = this.wrapper.dataset.featureId,
                n = document.querySelector("#page-root").dataset.slug,
                i = this.wrapper.querySelector(".track-list").dataset.loadMore,
                r = "/" + n + "/music_features/" + t + "/tracks?offset=" + this.wrapper.querySelector(".track-list").dataset.offset,
                a = this,
                s = this.el.querySelector(".track-list"),
                l = new XMLHttpRequest;
            !0 !== i && "true" !== i || (!0 === e && (r += "&amount=1000"), l.open("GET", r, !0), l.onload = function () {
                if (200 <= l.status && l.status < 400) {
                    var e = l.responseText,
                        t = window.zgl.toDom(e),
                        n = t.dataset.offset,
                        i = t.dataset.loadMore;
                    s.dataset.offset = n, s.dataset.loadMore = i;
                    for (var r = t.querySelectorAll("li"), o = 0; o < r.length; o++) s.appendChild(r[o]);
                    document.dispatchEvent(new CustomEvent("pageLoad")), a.loadSounds(s.querySelectorAll("a.play:not(.initialized)")), a.setupDeferredPlaylist()
                }
            }, l.send())
        }, this.onPlaylistIntersection = function (e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                n.isIntersecting && (l.observer.unobserve(n.target), n.target.classList.remove(MUSIC_FEATURE_OBSERVED_CLASS), l.loadMoreSounds())
            }
        }, this.setupDeferredPlaylist = function () {
            var e = this.wrapper.querySelector(".track-list").dataset.loadMore;
            if (!0 === e || "true" === e) {
                var t = this.el.querySelectorAll(MUSIC_FEATURE_INTERSECTION_CLASS + ":not(." + MUSIC_FEATURE_OBSERVED_CLASS + ")");
                if ("undefined" == typeof IntersectionObserver || !0 === IntersectionObserver.polyfill) this.loadMoreSounds(!0);
                else {
                    this.observer = new IntersectionObserver(this.onPlaylistIntersection, playlistObserverConfig);
                    for (var n = 0; n < t.length; n++) t[n].classList.add(MUSIC_FEATURE_OBSERVED_CLASS), this.observer.observe(t[n])
                }
            }
        }, this.sessionKey = "player", this.updatePosition = function (e) {
            sessionStorage.setItem(this.sessionKey, l.feature_id), sessionStorage.setItem(this.sessionKey + "_position", e.position), sessionStorage.setItem(this.sessionKey + "_url", e.url)
        }, this.el.addEventListener("whileplaying." + namespace, function (e) {
            var t = e.detail.sound,
                n = Math.ceil(t.position / t.durationEstimate * 100);
            l.updateProgress(t.position, n), l.updatePosition(t)
        }), this.el.addEventListener("play." + namespace, function (e) {
            var t = e.detail.el;
            l.updateTrackDisplay(t), i("playing")
        }), this.el.addEventListener("pause." + namespace, function (e) {
            var t = e.detail.el;
            l.updateTrackDisplay(t), i("paused")
        }), this.el.addEventListener("finish." + namespace, function (e) {
            var t = l.nextTrack(),
                n = l.currentSound();
            if (e.preventDefault(), t === undefined) {
                if (i("paused"), l.updateProgress(0, 0), n) n.stop(), n.setPosition(0), l.el.querySelector(".current").classList.remove("current");
                t = l.el.querySelector("a.play:first-child"), l.updateTrackDisplay(t, !1), l.el.classList.remove("playing")
            } else window.zoogleMedia.toggle(t)
        }), this.el.addEventListener("loadMore." + namespace, function (e) {
            e.detail.el;
            _self.loadMoreSounds()
        }), e.player = this, e.pause = this.pause, this.wrapper = window.zgl.getClosest(this.el, ".feature"), this.wrapper ? this.feature_id = this.wrapper.dataset.featureId : this.feature_id = 0, 0 < (t = this.el.querySelectorAll("a.play:not(.initialized)")).length && (this.loadSounds(t), this.updateTrackDisplay(t[0], !1), this.setupDeferredPlaylist())
    };
window.zoogleMedia = new ZoogleMedia, document.addEventListener("pageLoad", function () {
        window.zoogleMedia.setup()
    }), $(document).on("pjax:popstate", function () {
        window.zoogleMedia.needsReset = !0
    }), window.YT_ready = window.YT_ready || function () {
        var n = [],
            i = !1;
        return function (e, t) {
            if (!0 === e)
                for (i = !0; n.length;) n.shift()();
            else "function" == typeof e && (i ? e() : n[t ? "unshift" : "push"](e))
        }
    }(), window.onYouTubeIframeAPIReady = function () {
        window.ytLoaded || (window.ytLoaded = !0, this.setTimeout(function () {
            window.YT_ready(!0)
        }, 500))
    }, $(document).ready(function () {
        function t(e) {
            "pause" === e.data && window.zoogleMedia.setActive($("iframe.airbit-player").get(0))
        }

        function n() {
            var e = $("iframe.airbit-player").get(0);
            e && (e.pause = function () {
                e.contentWindow.postMessage("pause", "https://airbit.com")
            }, window.zoogleMedia.register(e))
        }

        function i(e) {
            "https://airbit.com" === e.origin ? t(e) : o(e)
        }

        function r(e, t) {
            var n = $("#" + e).get(0),
                i = $("#" + e).attr("src").split("?")[0];
            n.contentWindow.postMessage(JSON.stringify(t), i)
        }

        function o(e) {
            if (!("undefined" == typeof e.data || "object" == typeof e.data || e.data && e.data.match(/^_FB_/))) {
                var t;
                try {
                    t = JSON.parse(e.data)
                } catch (e) {
                    t = {}
                }
                if (t.player_id)
                    if ("ready" === t.event) {
                        var n = {
                            method: "addEventListener",
                            value: "play"
                        };
                        r(t.player_id, n)
                    } else "play" === t.event && window.zoogleMedia.setActive($("#" + t.player_id).get(0))
            }
        }
        var a = function a() {
            window.zoogleMedia = window.zoogleMedia || new ZoogleMedia;
            var e = function () {
                var r = function (e) {
                    e.data == YT.PlayerState.PLAYING && window.zoogleMedia.setActive(e.target)
                };
                $('iframe[src*="youtube.com/embed"]:not(.zoogle-handled)').each(function () {
                    $(this).addClass("zoogle-handled");
                    var e = $(this).prop("src");
                    if (e.match("^http://") && $(this).prop("src", e.replace(/^http:\/\//i, "https://")), !$(this).attr("id")) {
                        for (var t = 0, n = "yt-" + t; document.getElementById(n);) n = "yt-" + ++t;
                        $(this).attr("id", n)
                    }
                    var i = new YT.Player($(this).attr("id"), {
                        events: {
                            onStateChange: r
                        }
                    });
                    i.pause = function () {
                        this.pauseVideo()
                    }, window.zoogleMedia.register(i)
                })
            };
            0 < $('iframe[src*="youtube.com/embed"]').length && (window.ytLoaded ? e() : (! function () {
                var e = document.createElement("script");
                e.src = "https://www.youtube.com/iframe_api";
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t)
            }(), window.YT_ready(e))), window.addEventListener ? window.addEventListener("message", i, !1) : window.attachEvent("onmessage", i, !1), $("iframe.vimeo-player").each(function () {
                var e = $(this).get(0);
                e.pause = function () {
                    var e = {
                        method: "pause"
                    };
                    r($(this).attr("id"), e)
                }, window.zoogleMedia.register(e)
            }), $('iframe[src*="youtube.com/embed"],iframe.vimeo-player').not(".skip-wrapper").not(".wrapped").addClass("wrapped").wrap('<div class="video-container" />'), n()
        };
        document.addEventListener("pageLoad", a), a()
    }),
    function () {
        $.fn.fontFaceLoader = function () {
            var s, e, l, u, r, o, t, n, a;
            return null != (s = $(this)).data(
                "fontFaceLoader") ? s.data("fontFaceLoader") : (s.data("fontFaceLoaderList", {}), r = function (e) {
                return s.trigger(n, [e])
            }, u = function () {
                return s.data("fontFaceLoaderList")
            }, o = function (e) {
                return null != u()[e] && u()[e].loaded
            }, l = function () {
                var e, t, n, i;
                for (e in i = [], n = u())(t = n[e]).loaded ? i.push(void 0) : t.el.width() !== t.w || t.el.height() !== t.h ? (t.loaded = !0, i.push(r(e))) : i.push(void 0);
                return i
            }, t = function (e, t) {
                var n, i, r;
                for (n in null == t && (t = $.noop), r = [], e) i = e[n], !o(n) && i && (0 === $("link[href='" + i + "']", s).length && $("head", s).append('<link rel="stylesheet" href="' + i + '" type="text/css" media="all" />'), r.push(n));
                return a.apply(null, r.concat([t]))
            }, e = {
                loadedEvent: n = "FontFaceLoaded",
                waitForFonts: a = function () {
                    var e, i, r, o, a, t, n;
                    for (o = Array.prototype.slice.call(arguments, 0), i = "function" == typeof o[o.length - 1] ? o.pop() : $.noop, t = 0, n = o.length; t < n; t++) a = o[t], u().hasOwnProperty(a) || (e = $("<span />").text("giItT1WQy@!-/#").css({
                        position: "absolute",
                        left: "-10000px",
                        top: "-10000px",
                        outline: "1px solid yellow",
                        fontSize: "300px",
                        fontFamily: "NotARealFontAtAll",
                        fontVariant: "normal",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        letterSpacing: 0
                    }), s.find("body").append(e), u()[a] = {
                        el: e,
                        loaded: !1,
                        w: e.width(),
                        h: e.height()
                    }, e.css("font-family", a));
                    return (r = function () {
                        var e, t, n;
                        for (l(), e = n = 0, t = o.length; e < t; e++) a = o[e], u()[a].loaded && n++;
                        return n < o.length ? setTimeout(r, 50) : i()
                    })()
                },
                loadFonts: t
            }, s.data("fontFaceLoader", e), e)
        }, $.fn.fontFaceLoader.defaults = {}
    }.call(this),
    function () {
        $.fn.textFit = function (n, i, r, e) {
            var o, t, a, s, l, u, c, d, h, f, p;
            return null == n && (n = null), null == i && (i = !1), null == r && (r = null), null == e && (e = !1), o = $(this), t = null, s = o.closest(".text-fit"), a = null, l = 800, d = function () {
                    var e, t;
                    return null === n ? (e = "data-max-font-size", o.css("font-size", ""), t = o.is("[" + e + "]") ? o.attr(e) : o.css("font-size"), parseInt(t, 10)) : n
                }, p = function () {
                    var e;
                    return e = $.map(t.html().split(/<br ?\/?>/), function (e) {
                        return $("<span/>").html(e).text()
                    }).sort(function (e, t) {
                        return t.length - e.length
                    }), a.text(e[0])
                }, f = function () {
                    var e, t, n;
                    if (0 !== a.text().length) {
                        if (t = d(), o.css("font-size", r || t), null === r) {
                            for (s.length ? (e = o.outerWidth(!0) - o.width(), n = Math.floor(s.width() - e)) : n = Math.floor(o.width()), a.css("font-size", t).show(); Math.ceil(h(a) + 1) > n && 0 < t;) t -= 1, a.css("font-size", t);
                            o.css("font-size", t), i || a.hide()
                        }
                        return r = null
                    }
                }, h = function (e) {
                    var t;
                    return (t = e[0].getBoundingClientRect()).width || t.right - t.left
                }, u = function () {
                    return a = $('<span class="measure"/>').css({
                        whiteSpace: "nowrap",
                        position: "fixed",
                        top: i ? 0 : "-9999px",
                        left: i ? 0 : "-9999px",
                        display: i ? "" : "none",
                        maxWidth: "none",
                        minWidth: "none",
                        width: "auto"
                    }), 0 === o.find(".inner").length && o.wrapInner('<span class="inner" />'), t = o.find(".inner"), p(), o.append(a)
                }, c = function () {
                    var e;
                    if (null !== r && (r = parseInt(r, 10)), u(), setTimeout(function () {
                            return f()
                        }, l), e = "resize.resizeText orientationchange.resizeText", $(window).off(e).on(e, f), o.on("contentChanged", function (e) {
                            return e.preventDefault(), p(), f()
                        }), null === r) return $(document).fontFaceLoader().waitForFonts(o.css("font-family"), function () {
                        return setTimeout(f, 100)
                    })
                },
                function () {
                    return e && o.find(".measure").remove(), 0 === o.find(".measure").length ? c() : (a = o.find(".measure"), "function" == typeof f ? f() : void 0)
                }()
        }
    }.call(this),
    function (t) {
        function n() {
            c.setAttribute("content", f), p = !0
        }

        function i() {
            c.setAttribute("content", h), p = !1
        }

        function e(e) {
            u = e.accelerationIncludingGravity, a = Math.abs(u.x), s = Math.abs(u.y), l = Math.abs(u.z), t.orientation && 180 !== t.orientation || !(7 < a || (6 < l && s < 8 || l < 8 && 6 < s) && 5 < a) ? p || n() : p && i()
        }
        var r = navigator.userAgent;
        if (/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(r) && -1 < r.indexOf("AppleWebKit")) {
            var o = t.document;
            if (o.querySelector) {
                var a, s, l, u, c = o.querySelector("meta[name=viewport]"),
                    d = c && c.getAttribute("content"),
                    h = d + ",maximum-scale=1",
                    f = d + ",maximum-scale=10",
                    p = !0;
                c && (t.addEventListener("orientationchange", n, !1), t.addEventListener("devicemotion", e, !1))
            }
        }
    }(this),
    function () {
        var o, a, e, t, n, i, r, s;
        o = a = null, e = 767, n = function () {
            return $("html").hasClass("previewing-within-container") && 0 !== $('#usersite-container[content-width~="<780"]').length || window.matchMedia("only screen and (max-width: " + e + "px)").matches || window.matchMedia("only screen and (max-device-width: " + e + "px)").matches
        }, r = function () {
            var e, t;
            return "function" == typeof window.matchMedia && (t = n(), 0 !== $(".display-mode-desktop").length && 0 === $(".sitebuilder").length && (t = !1), (e = $("body meta[name=viewport]")).length && e.attr("content") && e.attr("content").match(/width=[0-9]+/) ? void 0 : ($("head meta[name=viewport]").attr("content", "width=device-width" + (t ? ", height=device-height, initial-scale=1.0" : "")), t || s(!1, !0), $("html,body,#usersite-container").toggleClass("mobile-view", t), $(".nav-bar").toggleClass("mobile", t), t && $("#mobile-header .project-name").length ? $("#mobile-header .project-name").textFit(45) : void 0))
        }, i = function () {
            return a = $("#page-root"), 0 === (o = $(".mobile-nav-open-site-overlay")).length && (o = $('<div class="mobile-nav-open-site-overlay" />'), a.after(o)), $(".mobile-nav-open-site-overlay").on("click", function () {
                return s()
            }), $(document).on("click", ".toggle-mobile-menu", function () {
                return s()
            }), $("#main-nav.mobile a").on("click", function () {
                return s(!1, !0)
            })
        }, s = function (e, t) {
            var i, r, n;
            if (null == e && (e = !1), null == t && (t = !1), 0 !== $("#main-nav.mobile").length && 0 !== $(".mobile-view").length) return n = 0 !== $("#main-nav.mobile").position().left, t && (n = e), a.toggleClass("mobile-nav-open", n), o.toggleClass("mobile-nav-open", n), $("body").toggleClass("mobile-nav-open", n), $(".nav-bar.mobile #toggle-mobile-menu i").toggleClass("icon-close", n), $(".nav-bar.mobile #toggle-mobile-menu i").toggleClass("icon-hamburger", !n), n ? (i = null, r = $("nav#main-nav.mobile")[0], $("body").on("touchstart.mobile-nav", function (e) {
                return i = e.originalEvent.touches[0].clientY
            }).on("touchmove.mobile-nav", function (e) {
                var t, n;
                return e.preventDefault(), t = e.originalEvent.touches[0].clientY, n = i - t, r.scrollTop = r.scrollTop += n, i = t
            })) : $("body").off("touchstart.mobile-nav touchmove.mobile-nav"), !0
        }, t = function () {
            if ("custom" !== $("body").attr("id")) return i(), r(), $(window).off("resize.toggleMobile").on("resize.toggleMobile", r), $("#usersite-container").off("zoogle_refresh.toggleMobile").on("zoogle_refresh.toggleMobile", r)
        }, $(document).on("pjax:start", function () {
            if ($("body").hasClass("mobile-nav-open")) return s(!1)
        }), $(function () {
            return t()
        }), document.addEventListener("pageLoad", t), $.fn.attachMobileVersion = function () {
            return t()
        }, $.isMobile = n
    }.call(this), $(document).ready(function () {
        var r = ".zoogle-music-player";
        $(document).on("click", "a.play", function (e) {
            var t = $(this).get(0);
            e.preventDefault(), window.zoogleMedia && window.zoogleMedia.isLoaded && window.zoogleMedia.toggle(t)
        }).on("click", "a.previous-button", function (e) {
            var t = $(this).parents(r).get(0).player.previousTrack();
            e.preventDefault(), window.zoogleMedia && window.zoogleMedia.isLoaded && window.zoogleMedia.toggle(t)
        }).on("click", "a.next-button", function (e) {
            var t = $(this).parents(r).get(0).player.nextTrack();
            e.preventDefault(), window.zoogleMedia && window.zoogleMedia.isLoaded && window.zoogleMedia.toggle(t)
        }).on("click", "a.play-button", function (e) {
            e.preventDefault(), window.zoogleMedia && window.zoogleMedia.isLoaded && $(this).parents(r).get(0).player.currentTrackLink(!0).click()
        }).on("click", ".progress", function (e) {
            var t, n, i;
            e.preventDefault(), window.zoogleMedia && window.zoogleMedia.isLoaded && (t = $(this).parents(r).get(0).player, n = e.offsetX || e.clientX - $(e.target).offset().left, i = $(e.target).closest(".progress").get(0).offsetWidth, t.seekTo(n / i))
        }).on("click", ".track-title a", function (e) {
            e.preventDefault(), window.zoogleMedia && window.zoogleMedia.isLoaded && $(this).parents("li").find("a.play").click()
        }).on("click", "a.toggle-info", function (e) {
            e.preventDefault(), window.zoogleMedia && window.zoogleMedia.isLoaded && $(this).parents(r).get(0).player.toggleTrackInfo($(e.target))
        }), document.addEventListener("playerAdded", function (e) {
            jQuery && !0 === jQuery.fx.off || $(e.detail.player).find(".marquee").marquee()
        })
    }),
    function () {
        var n, e, i, r;
        e = function () {
            function t() {}
            return t.resizeAttached = !1, t.init = function () {
                var e;
                if (t.markCurrentPageSelected(), t.preventNoLinkMenuClicks(), e = $("body.wysiwyg").length, t.isSubmenuNeeded()) return e || n.init(), e || r.init(), i.init()
            }, t.onResize = function () {
                return i.onResize()
            }, t.isSubmenuNeeded = function () {
                return !$('[data-disable-submenu="true"]').length
            }, t.markCurrentPageSelected = function () {
                var e;
                if (!$("body.wysiwyg").length) return e = window.location.pathname, $("#main-nav li").removeClass("selected"), $('a[href="' + e + '"]').closest("li.top").addClass("selected"), $('a[href="' + e + '"]').closest("li.subpage").addClass("selected")
            }, t.preventNoLinkMenuClicks = function () {
                return $("body").on("click", "#main-nav .nolink", function (e) {
                    return e.preventDefault(), !1
                })
            }, t
        }(), i = function () {
            function n() {}
            var i, r, t;
            return n.init = function () {
                return this.attachListeners()
            }, n.attachListeners = function () {
                return $("#main-nav.non-mobile ul ul").each(function () {
                    var e;
                    return (e = $(this)).closest("li.top").off("mouseover", t), e.closest("li.top").on("mouseover", t)
                })
            }, t = function (e) {
                var t;
                return t = $(e.target).closest("li.top").children("ul"), n.positionSubMenu(t)
            }, n.positionSubMenu = function (e) {
                var t, n;
                return t = e.closest("li.top"), n = $(themeJsManager.scrollContext(!0)), i(e, t, n), r(e, t, n)
            }, i = function (e, t, n) {
                var i, r, o, a, s, l;
                if (s = (r = e.offset().left) + e.width(), a = (o = t.offset().left) + t.width(), l = n.width(), r < 0 && (i = "calc(50% + " + (o - r) + "px)", e.css({
                        left: i
                    }).addClass("arrow-left")), l < s) return i = "calc(50% - " + (s - a) + "px)", e.css({
                    left: i
                }).addClass("arrow-right")
            }, r = function (e, t, n) {
                var i, r, o, a, s;
                return i = (r = e.height()) + (t.offset().top - n.scrollTop()) + t.height() + 50, o = (s = n.height()) < i && r < s, a = 0 < t.offset().top - n.scrollTop() - r, e.toggleClass("open-upwards", o && a)
            }, n.onResize = function () {
                return $("#main-nav.non-mobile ul ul").css("left", "50%").removeClass("arrow-left arrow-right")
            }, n
        }(), r = function () {
            function e() {}
            return e.init = function () {
                if (Modernizr.ios && Modernizr.touchevents) return this.closeAllSubmenus()
            }, e.closeAllSubmenus = function () {
                var e, t;
                if (0 !== (e = $("ul.top:not(.mobile)")).children("li.top.selected.has-submenu").length) return t = e.parent(), e.remove(), setTimeout(function () {
                    return t.append(e)
                }, 0)
            }, e
        }(), n = function () {
            function e() {}
            return e.init = function () {
                if (Modernizr.android && Modernizr.touchevents) return this.attachMenuListener(), this.attachCloseListener(), this._getSubmenus().hide().css("visibility", "visible")
            }, e.attachMenuListener = function () {
                return $(document).on("click", "#main-nav.non-mobile a.top", function (e) {
                    var t;
                    if ((t = $(this).closest("li").children("ul")).is(":hidden")) return t.show(), i.positionSubMenu(t), e.preventDefault()
                })
            }, e.attachCloseListener = function () {
                return $(document).on("click", (t = this, function (e) {
                    if (0 === $(e.target).closest("#main-nav.non-mobile li").length) return t._getSubmenus().hide()
                }));
                var t
            }, e._getSubmenus = function () {
                return $("#main-nav.non-mobile a.top:not(.nolink)").closest("li").children("ul")
            }, e
        }(), $(function () {
            return e.init(), document.addEventListener("pageLoad", e.init)
        }), $(window).on("resize", function () {
            return e.onResize()
        })
    }.call(this), $(document).ready(function () {
        var e = function () {
            0 === $(".wysiwyg").length && (0 !== $(".intro-page").length || 0 !== $(".website-page-single-feature").length && 0 === $("#page-root .post-single").length) && $("#usersite-container a").addClass("no-pjax")
        };
        e(), document.addEventListener("pageLoad", e)
    }), $(document).ready(function () {
        $(document).on("pjax:start", function () {
            $(".page-photos").zoogleSlideshow("stop")
        });
        var e = function () {
            var e = self !== top && window.parent.$(".header-editor").length,
                t = document.body.classList.contains("wysiwyg");
            e || t || ($(".page-photo").removeClass("hide"), $(".page-photos").zoogleSlideshow())
        };
        e(), document.addEventListener("pageLoad", e)
    }),
    function (s, l) {
        "use strict";

        function u(e) {
            this.time = e.time, this.target = e.target, this.rootBounds = e.rootBounds, this.boundingClientRect = e.boundingClientRect, this.intersectionRect = e.intersectionRect || o(), this.isIntersecting = !!e.intersectionRect;
            var t = this.boundingClientRect,
                n = t.width * t.height,
                i = this.intersectionRect,
                r = i.width * i.height;
            this.intersectionRatio = n ? r / n : this.isIntersecting ? 1 : 0
        }

        function e(e, t) {
            var n = t || {};
            if ("function" != typeof e) throw new Error("callback must be a function");
            if (n.root && 1 != n.root.nodeType) throw new Error("root must be an Element");
            this._checkForIntersections = i(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT), this._callback = e, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(n.rootMargin), this.thresholds = this._initThresholds(n.threshold), this.root = n.root || null, this.rootMargin = this._rootMarginValues.map(function (e) {
                return e.value + e.unit
            }).join(" ")
        }

        function c() {
            return s.performance && performance.now && performance.now()
        }

        function i(e, t) {
            var n = null;
            return function () {
                n || (n = setTimeout(function () {
                    e(), n = null
                }, t))
            }
        }

        function t(e, t, n, i) {
            "function" == typeof e.addEventListener ? e.addEventListener(t, n, i || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
        }

        function n(e, t, n, i) {
            "function" == typeof e.removeEventListener ? e.removeEventListener(t, n, i || !1) : "function" == typeof e.detatchEvent && e.detatchEvent("on" + t, n)
        }

        function d(e, t) {
            var n = Math.max(e.top, t.top),
                i = Math.min(e.bottom, t.bottom),
                r = Math.max(e.left, t.left),
                o = Math.min(e.right, t.right),
                a = o - r,
                s = i - n;
            return 0 <= a && 0 <= s && {
                top: n,
                bottom: i,
                left: r,
                right: o,
                width: a,
                height: s
            }
        }

        function h(e) {
            var t;
            try {
                t = e.getBoundingClientRect()
            } catch (n) {}
            return t ? (t.width && t.height || (t = {
                top: t.top,
                right: t.right,
                bottom: t.bottom,
                left: t.left,
                width: t.right - t.left,
                height: t.bottom - t.top
            }), t) : o()
        }

        function o() {
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
            }
        }

        function r(e, t) {
            for (var n = t; n;) {
                if (n == e) return !0;
                n = f(n)
            }
            return !1
        }

        function f(e) {
            var t = e.parentNode;
            return t && 11 == t.nodeType && t.host ? t.host : t
        }
        if ("IntersectionObserver" in s && "IntersectionObserverEntry" in s && "intersectionRatio" in s.IntersectionObserverEntry.prototype) "isIntersecting" in s.IntersectionObserverEntry.prototype || Object.defineProperty(s.IntersectionObserverEntry.prototype, "isIntersecting", {
            get: function () {
                return 0 < this.intersectionRatio
            }
        });
        else {
            var a = [];
            e.prototype.THROTTLE_TIMEOUT = 100, e.prototype.POLL_INTERVAL = null, e.prototype.USE_MUTATION_OBSERVER = !0, e.prototype.observe = function (t) {
                if (!this._observationTargets.some(function (e) {
                        return e.element == t
                    })) {
                    if (!t || 1 != t.nodeType) throw new Error("target must be an Element");
                    this._registerInstance(), this._observationTargets.push({
                        element: t,
                        entry: null
                    }), this._monitorIntersections(), this._checkForIntersections()
                }
            }, e.prototype.unobserve = function (t) {
                this._observationTargets = this._observationTargets.filter(function (e) {
                    return e.element != t
                }), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance())
            }, e.prototype.disconnect = function () {
                this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance()
            }, e.prototype.takeRecords = function () {
                var e = this._queuedEntries.slice();
                return this._queuedEntries = [], e
            }, e.prototype._initThresholds = function (e) {
                var t = e || [0];
                return Array.isArray(t) || (t = [t]), t.sort().filter(function (e, t, n) {
                    if ("number" != typeof e || isNaN(e) || e < 0 || 1 < e) throw new Error("threshold must be a number between 0 and 1 inclusively");
                    return e !== n[t - 1]
                })
            }, e.prototype._parseRootMargin = function (e) {
                var t = (e || "0px").split(/\s+/).map(function (e) {
                    var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
                    if (!t) throw new Error("rootMargin must be specified in pixels or percent");
                    return {
                        value: parseFloat(t[1]),
                        unit: t[2]
                    }
                });
                return t[1] = t[1] || t[0], t[2] = t[2] || t[0], t[3] = t[3] || t[1], t
            }, e.prototype._monitorIntersections = function () {
                this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (t(s, "resize", this._checkForIntersections, !0), t(l, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in s && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(this.root || l, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                }))))
            }, e.prototype._unmonitorIntersections = function () {
                this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, n(s, "resize", this._checkForIntersections, !0), n(l, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null))
            }, e.prototype._checkForIntersections = function () {
                var s = this._rootIsInDom(),
                    l = s ? this._getRootRect() : o();
                this._observationTargets.forEach(function (e) {
                    var t = e.element,
                        n = h(t),
                        i = this._rootContainsTarget(t),
                        r = e.entry,
                        o = s && i && this._computeTargetAndRootIntersection(t, l),
                        a = e.entry = new u({
                            time: c(),
                            target: t,
                            boundingClientRect: n,
                            rootBounds: l,
                            intersectionRect: o
                        });
                    r ? s && i ? this._hasCrossedThreshold(r, a) && this._queuedEntries.push(a) : r && r.isIntersecting && this._queuedEntries.push(a) : this._queuedEntries.push(a)
                }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
            }, e.prototype._computeTargetAndRootIntersection = function (e, t) {
                if ("none" != s.getComputedStyle(e).display) {
                    for (var n = h(e), i = f(e), r = !1; !r;) {
                        var o = null,
                            a = 1 == i.nodeType ? s.getComputedStyle(i) : {};
                        if ("none" == a.display) return;
                        if (i == this.root || i == l ? (r = !0, o = t) : i != l.body && i != l.documentElement && "visible" != a.overflow && (o = h(i)), o && !(n = d(o, n))) break;
                        i = f(i)
                    }
                    return n
                }
            }, e.prototype._getRootRect = function () {
                var e;
                if (this.root) e = h(this.root);
                else {
                    var t = l.documentElement,
                        n = l.body;
                    e = {
                        top: 0,
                        left: 0,
                        right: t.clientWidth || n.clientWidth,
                        width: t.clientWidth || n.clientWidth,
                        bottom: t.clientHeight || n.clientHeight,
                        height: t.clientHeight || n.clientHeight
                    }
                }
                return this._expandRectByRootMargin(e)
            }, e.prototype._expandRectByRootMargin = function (n) {
                var e = this._rootMarginValues.map(function (e, t) {
                        return "px" == e.unit ? e.value : e.value * (t % 2 ? n.width : n.height) / 100
                    }),
                    t = {
                        top: n.top - e[0],
                        right: n.right + e[1],
                        bottom: n.bottom + e[2],
                        left: n.left - e[3]
                    };
                return t.width = t.right - t.left, t.height = t.bottom - t.top, t
            }, e.prototype._hasCrossedThreshold = function (e, t) {
                var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1,
                    i = t.isIntersecting ? t.intersectionRatio || 0 : -1;
                if (n !== i)
                    for (var r = 0; r < this.thresholds.length; r++) {
                        var o = this.thresholds[r];
                        if (o == n || o == i || o < n != o < i) return !0
                    }
            }, e.prototype._rootIsInDom = function () {
                return !this.root || r(l, this.root)
            }, e.prototype._rootContainsTarget = function (e) {
                return r(this.root || l, e)
            }, e.prototype._registerInstance = function () {
                a.indexOf(this) < 0 && a.push(this)
            }, e.prototype._unregisterInstance = function () {
                var e = a.indexOf(this); - 1 != e && a.splice(e, 1)
            }, e.polyfill = !0, s.IntersectionObserver = e, s.IntersectionObserverEntry = u
        }
    }(window, document),
    function (e) {
        var o = /px/,
            a = /%/,
            s = /url\(['"]*(.*?)['"]*\)/g;
        e.fn.getBackgroundSize = function (e) {
            var t, n, i = new Image,
                r = this.css("background-size").split(" ");
            return o.test(r[0]) && (t = parseInt(r[0])), a.test(r[0]) && (t = this.parent().width() * (parseInt(r[0]) / 100)), o.test(r[1]) && (n = parseInt(r[1])), a.test(r[1]) && (n = this.parent().height() * (parseInt(r[0]) / 100)), void 0 !== t && void 0 !== n ? e({
                width: t,
                height: n
            }) : (i.onload = function () {
                void 0 === t && (t = this.width), void 0 === n && (n = this.height), e({
                    width: t,
                    height: n
                })
            }, i.src = this.css("background-image").replace(s, "$1")), this
        }
    }(jQuery), $(document).ready(function () {
        var n, o = 1.2,
            r = 2.2,
            i = $(),
            t = function () {
                var t = [];
                return $(".scroll-effect-parallax .background").each(function () {
                    var e = $(this);
                    t.push(e)
                }), t
            },
            a = function () {
                return $(window.themeJsManager.scrollContext())
            },
            e = function () {
                u(), i.off(".parallax"), $(window).off(".parallax")
            },
            s = function (e) {
                e.forEach(function (e) {
                    var t = $(e.target);
                    t.data("intersecting", e.isIntersecting), e.isIntersecting ? (t.data("scrollTop", i.scrollTop()), t.data("intersectionHeight", e.intersectionRect.height)) : t.data("scrollTop", null)
                })
            },
            l = function (e) {
                var t = i[0] == window ? null : i[0];
                n = new IntersectionObserver(s, {
                    root: t,
                    rootMargin: "0px",
                    threshold: 0
                }), e.forEach(function (e) {
                    n.observe(e[0])
                })
            },
            u = function () {
                n && n.disconnect()
            },
            c = function (e, t) {
                var n = e.data("parallax-speed") ? parseFloat(e.data("parallax-speed")) : o,
                    i = e.data("scrollTop") - t,
                    r = Math.abs(i * n - i);
                e.css({
                    backgroundPositionY: "calc(0% - " + r + "px)"
                })
            },
            d = function (t) {
                t.data("image-height") ? h(t) : t.getBackgroundSize(function (e) {
                    t.attr("data-image-height", e.height), t.attr("data-image-width", e.width), h(t)
                })
            },
            h = function (e) {
                var t = e.width() / e.height(),
                    n = e.data("image-width") / e.data("image-height"),
                    i = "100% auto";
                t < n * r && (i = (100 * (n / t * r)).toFixed(2) + "% auto");
                e.css("background-size", i)
            },
            f = function (e) {
                var t = i.scrollTop();
                e.forEach(function (e) {
                    e.data("intersecting") && c(e, t)
                })
            },
            p = null,
            m = function (e) {
                null != p && clearTimeout(p), p = setTimeout(function () {
                    e.forEach(function (e) {
                        d(e)
                    })
                }, 100)
            },
            g = function () {
                i = a();
                var e = t();
                l(e), e.length && (i.on("scroll.parallax", function () {
                    f(e)
                }), $(window).on("resize.parallax", function () {
                    f(e), m(e)
                }), setTimeout(function () {
                    i.trigger("resize")
                }, 100))
            },
            y = function () {
                e(), g()
            };
        $.resetParallax = y, $.enableParallax = g, $.disableParallax = e, $.resetParallax(), document.addEventListener("pageLoad", $.resetParallax)
    }),
    function (y) {
        function e(e, t, n) {
            return n = u(t, n), this.on("click.pjax", e, function (e) {
                var t = n;
                t.container || ((t = y.extend({}, n)).container = y(this).attr("data-pjax")), i(e, t)
            })
        }

        function i(e, t, n) {
            n = u(t, n);
            var i = e.currentTarget,
                r = y(i);
            if ("A" !== i.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
            if (!(1 < e.which || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || location.protocol !== i.protocol || location.hostname !== i.hostname || -1 < i.href.indexOf("#") && l(i) == l(location) || e.isDefaultPrevented())) {
                var o = {
                        url: i.href,
                        container: r.attr("data-pjax"),
                        target: i
                    },
                    a = y.extend({}, o, n),
                    s = y.Event("pjax:click");
                r.trigger(s, [a]), s.isDefaultPrevented() || (v(a), e.preventDefault(), r.trigger("pjax:clicked", [a]))
            }
        }

        function t(e, t, n) {
            n = u(t, n);
            var i = e.currentTarget,
                r = y(i);
            if ("FORM" !== i.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
            var o = {
                type: (r.attr("method") || "GET").toUpperCase(),
                url: r.attr("action"),
                container: r.attr("data-pjax"),
                target: i
            };
            if ("GET" !== o.type && window.FormData !== undefined) o.data = new FormData(i), o.processData = !1, o.contentType = !1;
            else {
                if (r.find(":file").length) return;
                o.data = r.serializeArray()
            }
            v(y.extend({}, o, n)), e.preventDefault()
        }

        function v(f) {
            function p(e, t, n) {
                n || (n = {}), n.relatedTarget = f.target;
                var i = y.Event(e, n);
                return g.trigger(i, t), !i.isDefaultPrevented()
            }
            f = y.extend(!0, {}, y.ajaxSettings, v.defaults, f), y.isFunction(f.url) && (f.url = f.url());
            var m = _(f.url).hash,
                e = y.type(f.container);
            if ("string" !== e) throw "expected string value for 'container' option; got " + e;
            var i, g = f.context = y(f.container);
            if (!g.length) throw "the container selector '" + f.container + "' did not match anything";
            f.data || (f.data = {}), y.isArray(f.data) ? f.data.push({
                name: "_pjax",
                value: f.container
            }) : f.data._pjax = f.container, f.beforeSend = function (e, t) {
                if ("GET" !== t.type && (t.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", f.container), !p("pjax:beforeSend", [e, t])) return !1;
                0 < t.timeout && (i = setTimeout(function () {
                    p("pjax:timeout", [e, f]) && e.abort("timeout")
                }, t.timeout), t.timeout = 0);
                var n = _(t.url);
                m && (n.hash = m), f.requestUrl = c(n)
            }, f.complete = function (e, t) {
                i && clearTimeout(i), p("pjax:complete", [e, t, f]), p("pjax:end", [e, f])
            }, f.error = function (e, t, n) {
                var i = x("", e, f),
                    r = p("pjax:error", [e, t, n, f]);
                "GET" == f.type && "abort" !== t && r && w(i.url)
            }, f.success = function (e, t, n) {
                var i = v.state,
                    r = "function" == typeof y.pjax.defaults.version ? y.pjax.defaults.version() : y.pjax.defaults.version,
                    o = n.getResponseHeader("X-PJAX-Version"),
                    a = x(e, n, f),
                    s = _(a.url);
                if (m && (s.hash = m, a.url = s.href), r && o && r !== o) w(a.url);
                else if (a.contents) {
                    if (v.state = {
                            id: f.id || b(),
                            url: a.url,
                            title: a.title,
                            container: f.container,
                            fragment: f.fragment,
                            timeout: f.timeout
                        }, (f.push || f.replace) && window.history.replaceState(v.state, a.title, a.url), y.contains(g, document.activeElement)) try {
                        document.activeElement.blur()
                    } catch (h) {}
                    a.title && (document.title = a.title), p("pjax:beforeReplace", [a.contents, f], {
                        state: v.state,
                        previousState: i
                    }), g.html(a.contents);
                    var l = g.find("input[autofocus], textarea[autofocus]").last()[0];
                    l && document.activeElement !== l && l.focus(), S(a.scripts);
                    var u = f.scrollTo;
                    if (m) {
                        var c = decodeURIComponent(m.slice(1)),
                            d = document.getElementById(c) || document.getElementsByName(c)[0];
                        d && (u = y(d).offset().top)
                    }
                    "number" == typeof u && y(window).scrollTop(u), p("pjax:success", [e, t, n, f])
                } else w(a.url)
            }, v.state || (v.state = {
                id: b(),
                url: window.location.href,
                title: document.title,
                container: f.container,
                fragment: f.fragment,
                timeout: f.timeout
            }, window.history.replaceState(v.state, document.title)), d(v.xhr), v.options = f;
            var t = v.xhr = y.ajax(f);
            return 0 < t.readyState && (f.push && !f.replace && (a(v.state.id, [f.container, h(g)]), window.history.pushState(null, "", f.requestUrl)), p("pjax:start", [t, f]), p("pjax:send", [t, f])), v.xhr
        }

        function n(e, t) {
            var n = {
                url: window.location.href,
                push: !1,
                replace: !0,
                scrollTo: !1
            };
            return v(y.extend(n, u(e, t)))
        }

        function w(e) {
            window.history.replaceState(null, "", v.state.url), window.location.replace(e)
        }

        function r(e) {
            C || d(v.xhr);
            var t, n = v.state,
                i = e.state;
            if (i && i.container) {
                if (C && E == i.url) return;
                if (n) {
                    if (n.id === i.id) return;
                    t = n.id < i.id ? "forward" : "back"
                }
                var r = $[i.id] || [],
                    o = r[0] || i.container,
                    a = y(o),
                    s = r[1];
                if (a.length) {
                    n && m(t, n.id, [o, h(a)]);
                    var l = y.Event("pjax:popstate", {
                        state: i,
                        direction: t
                    });
                    a.trigger(l);
                    var u = {
                        id: i.id,
                        url: i.url,
                        container: o,
                        push: !1,
                        fragment: i.fragment,
                        timeout: i.timeout,
                        scrollTo: !1
                    };
                    if (s) {
                        a.trigger("pjax:start", [null, u]), (v.state = i).title && (document.title = i.title);
                        var c = y.Event("pjax:beforeReplace", {
                            state: i,
                            previousState: n
                        });
                        a.trigger(c, [s, u]), a.html(s), a.trigger("pjax:end", [null, u])
                    } else v(u);
                    a[0].offsetHeight
                } else w(location.href)
            }
            C = !1
        }

        function o(e) {
            var t = y.isFunction(e.url) ? e.url() : e.url,
                n = e.type ? e.type.toUpperCase() : "GET",
                i = y("<form>", {
                    method: "GET" === n ? "GET" : "POST",
                    action: t,
                    style: "display:none"
                });
            "GET" !== n && "POST" !== n && i.append(y("<input>", {
                type: "hidden",
                name: "_method",
                value: n.toLowerCase()
            }));
            var r = e.data;
            if ("string" == typeof r) y.each(r.split("&"), function (e, t) {
                var n = t.split("=");
                i.append(y("<input>", {
                    type: "hidden",
                    name: n[0],
                    value: n[1]
                }))
            });
            else if (y.isArray(r)) y.each(r, function (e, t) {
                i.append(y("<input>", {
                    type: "hidden",
                    name: t.name,
                    value: t.value
                }))
            });
            else if ("object" == typeof r) {
                var o;
                for (o in r) i.append(y("<input>", {
                    type: "hidden",
                    name: o,
                    value: r[o]
                }))
            }
            y(document.body).append(i), i.submit()
        }

        function d(e) {
            e && e.readyState < 4 && (e.onreadystatechange = y.noop, e.abort())
        }

        function b() {
            return (new Date).getTime()
        }

        function h(e) {
            var t = e.clone();
            return t.find("script").each(function () {
                this.src || y._data(this, "globalEval", !1)
            }), t.contents()
        }

        function c(e) {
            return e.search = e.search.replace(/([?&])(_pjax|_)=[^&]*/g, "").replace(/^&/, ""), e.href.replace(/\?($|#)/, "$1")
        }

        function _(e) {
            var t = document.createElement("a");
            return t.href = e, t
        }

        function l(e) {
            return e.href.replace(/#.*/, "")
        }

        function u(e, t) {
            return e && t ? ((t = y.extend({}, t)).container = e, t) : y.isPlainObject(e) ? e : {
                container: e
            }
        }

        function f(e, t) {
            return e.filter(t).add(e.find(t))
        }

        function p(e) {
            return y.parseHTML(e, document, !0)
        }

        function x(e, t, n) {
            var i, r, o = {},
                a = /<html/i.test(e),
                s = t.getResponseHeader("X-PJAX-URL");
            if (o.url = s ? c(_(s)) : n.requestUrl, a) {
                r = y(p(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
                var l = e.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
                i = null != l ? y(p(l[0])) : r
            } else i = r = y(p(e));
            if (0 === r.length) return o;
            if (o.title = f(i, "title").last().text(), n.fragment) {
                var u = r;
                "body" !== n.fragment && (u = f(u, n.fragment).first()), u.length && (o.contents = "body" === n.fragment ? u : u.contents(), o.title || (o.title = u.attr("title") || u.data("title")))
            } else a || (o.contents = r);
            return o.contents && (o.contents = o.contents.not(function () {
                return y(this).is("title")
            }), o.contents.find("title").remove(), o.scripts = f(o.contents, "script[src]").remove(), o.contents = o.contents.not(o.scripts)), o.title && (o.title = y.trim(o.title)), o
        }

        function S(e) {
            if (e) {
                var i = y("script[src]");
                e.each(function () {
                    var e = this.src;
                    if (!i.filter(function () {
                            return this.src === e
                        }).length) {
                        var t = document.createElement("script"),
                            n = y(this).attr("type");
                        n && (t.type = n), t.src = y(this).attr("src"), document.head.appendChild(t)
                    }
                })
            }
        }

        function a(e, t) {
            $[e] = t, L.push(e), s(M, 0), s(L, v.defaults.maxCacheLength)
        }

        function m(e, t, n) {
            var i, r;
            $[t] = n, "forward" === e ? (i = L, r = M) : (i = M, r = L), i.push(t), (t = r.pop()) && delete $[t], s(i, v.defaults.maxCacheLength)
        }

        function s(e, t) {
            for (; e.length > t;) delete $[e.shift()]
        }

        function g() {
            return y("meta").filter(function () {
                var e = y(this).attr("http-equiv");
                return e && "X-PJAX-VERSION" === e.toUpperCase()
            }).attr("content")
        }

        function k() {
            y.fn.pjax = e, y.pjax = v, y.pjax.enable = y.noop, y.pjax.disable = T, y.pjax.click = i, y.pjax.submit = t, y.pjax.reload = n, y.pjax.defaults = {
                timeout: 650,
                push: !0,
                replace: !1,
                type: "GET",
                dataType: "html",
                scrollTo: 0,
                maxCacheLength: 20,
                version: g
            }, y(window).on("popstate.pjax", r)
        }

        function T() {
            y.fn.pjax = function () {
                return this
            }, y.pjax = o, y.pjax.enable = k, y.pjax.disable = y.noop, y.pjax.click = y.noop, y.pjax.submit = y.noop, y.pjax.reload = function () {
                window.location.reload()
            }, y(window).off("popstate.pjax", r)
        }
        var C = !0,
            E = window.location.href,
            A = window.history.state;
        A && A.container && (v.state = A), "state" in window.history && (C = !1);
        var $ = {},
            M = [],
            L = [];
        y.event.props && y.inArray("state", y.event.props) < 0 ? y.event.props.push("state") : "state" in y.Event.prototype || y.event.addProp("state"), y.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/), y.support.pjax ? k() : T()
    }(jQuery),
    function () {
        $(function () {
            var e, i, t, n, r, o, a, s, l, u;
            for (n in $.pjax.defaults.timeout = 3e3, o = function (e) {
                    return 'a[href^="' + e + "\"]:not(.no-pjax):not(.play):not([target]):not([href^='/files/']):not([data-no-pjax='true'])"
                }, 0 !== $("[data-pjax-container]").length && $(document).pjax(o("/") + ", " + o("./") + ", nav.mobile a:not(.no-pjax):not([target])", {
                    timeout: 2e4,
                    container: "[data-pjax-container]"
                }), i = function () {
                    if ($("#navigation #action-link").length) return $("#main-nav a.no-pjax").each(function () {
                        var e;
                        return e = $(this).attr("href"), $(this).attr("href", e + "?preview_from_cp=1")
                    })
                }, l = function (e) {
                    return null == e && (e = null), null === e && (e = $("#page-root").hasClass("intro-page")), $("body").toggleClass("intro-page", e).toggleClass("not-intro-page", !e)
                }, window.toggleIntroPage = l, s = function () {
                    return $("body").toggleClass("hide-navigation-menu", $("#page-root").hasClass("hide-navigation-menu"))
                }, window.toggleHideNavigationMenu = s, u = function () {
                    return $('link[rel="canonical"]').attr("href", location.protocol + "//" + location.host + location.pathname)
                }, window.updateCanonicalUrl = u, i(), l(), s(), r = {
                    start: function () {},
                    beforeSend: function () {
                        return document.write = function () {
                            return !0
                        }
                    },
                    end: function (e, t, n) {
                        if (l(), s(), i(), updateCanonicalUrl(), $("form[data-validate=true]").validate && $("form[data-validate=true]").validate(), $("body").data("loaded-via-pjax", !0), window.twttr && window.twttr.widgets && ($(".twitter_feed").each(function () {
                                var e;
                                if ((e = $(this)).find("iframe").remove(), !e.find("a.twitter-timeline").length) return e.append($(e.data("link-source")))
                            }), twttr.widgets.load()), $("article:not(.display-swmp) .zoogle-music-player").removeClass("ready"), n && n.url && n.url.match(/#/) || document.querySelector("#usersite-container").scrollIntoView(!0), document.dispatchEvent(new CustomEvent("pageLoad")), $.onload) return $.onload.run()
                    }
                }, e = $(document), a = [], r) t = r[n], a.push(e.on("pjax:" + n, t));
            return a
        })
    }.call(this),
    function () {
        var e, t, n, i;
        e = function () {
            function e() {
                var t;
                this.$win = $(window), this.$container = $("#usersite-container"), this.lastSize = {
                    w: this.$container.width(),
                    h: this.$container.height()
                }, window.addResizeListener(this.$container[0], (t = this, function (e) {
                    return t._triggerResize(e)
                }), !1)
            }
            return e.prototype._triggerResize = function () {
                var e;
                if ((e = {
                        w: this.$container.width(),
                        h: this.$container.height()
                    }).w !== this.lastSize.w || e.h !== this.lastSize.h) return this.$win.trigger($.Event("resize", {
                    previewing: !0
                })), this.lastSize = e
            }, e
        }(), n = null, t = function () {
            if (!n) return $("#usersite-container").length ? n = new e : setTimeout(t, 125)
        }, i = function () {
            if ($("html").hasClass("previewing-within-container") && window.self === window.top) return t()
        }, $(function () {
            return i()
        }), document.addEventListener("pageLoad", i)
    }.call(this),
    function () {
        function e(e, t) {
            s.push({
                selector: e,
                fn: t
            }), i || (i = new r(n)).observe(document.documentElement, {
                childList: !0,
                subtree: !0
            }), n()
        }

        function n() {
            for (var e, t, n = 0, i = s.length; n < i; n++) {
                e = s[n];
                for (var r, o = 0, a = (t = document.querySelectorAll(e.selector)).length; o < a; o++)(r = t[o]).ready || (r.ready = !0, e.fn.call(r, r))
            }
        }
        var i, s = [],
            r = window.MutationObserver || window.WebKitMutationObserver;
        zoogle.onSelectorReady = e
    }(), $(document).ready(function () {
        if (!(0 < $(".wysiwyg").length)) {
            $(document).on("focusin", "form.captcha :input", function () {
                $(this).parents("form").find(".grecaptcha-badge").addClass("active")
            }).on("focusout", "form.captcha :input", function () {
                var e = $(this).parents("form");
                $(e).find(":focus").length <= 0 && $(e).find(".grecaptcha-badge").removeClass("active")
            });
            var n = "form.captcha:not(.applied-recaptcha)",
                t = !1,
                i = !1;
            window.onCaptchaLoadForm = function () {
                console.log("captcha is loaded"), t = !0, e()
            };
            var r = function () {
                    if (!t && !i) {
                        var e = document.createElement("script");
                        e.type = "text/javascript", e.async = !0, e.src = "https://www.google.com/recaptcha/api.js?render=explicit&onload=onCaptchaLoadForm", e.id = "recaptcha-js", e.errcount = 0,
                            s = document.getElementsByTagName("script")[0], s.parentNode.insertBefore(e, s), i = !0
                    }
                },
                o = function (e) {
                    e.classList.contains("applied-captcha") || (console.log("apply captcha to", e), e.classList.add("applied-recaptcha"), e.dataset.recaptchaId = grecaptcha.render(e, {
                        sitekey: e.dataset.sitekey,
                        callback: e.dataset.callback
                    }))
                },
                a = function (n) {
                    var e = n.querySelector("div.delayed-recaptcha:not(.applied-recaptcha)");
                    n.classList.add("applied-recaptcha"), e && (o(e), n.addEventListener("submit", function (e) {
                        if (n.classList.add("submitted"), n.checkValidity()) {
                            var t = n.querySelector("[data-recaptcha-id]").dataset.recaptchaId;
                            grecaptcha.reset(t), grecaptcha.execute(t)
                        }
                        return e.preventDefault(), e.stopPropagation(), !1
                    }, !1))
                },
                e = function () {
                    for (var e = document.querySelectorAll(n), t = 0; t < e.length; t++) a(e[t])
                };
            zoogle.onSelectorReady(n, function (e) {
                t ? a(e) : (console.log("need captcha!"), i || r())
            })
        }
    }), $(function () {
        if (!$("body.wysiwyg").length) {
            var n, i = 500,
                r = function () {
                    var e = $(".title-nav-container");
                    return !o(e) || e.data("disable-section-navigation-extra-height") ? 0 : e.height() || 0
                },
                o = function (e) {
                    if (!e || !e.length || e.is("body")) return !1;
                    var t = e.css("position");
                    return "fixed" == t || "sticky" == t || o(e.parent())
                },
                a = function (e) {
                    return e.match(/\#/) ? e.substring(e.indexOf("#") + 1) : null
                },
                s = function (e) {
                    var t = $("#page-root").data("page-id");
                    return e.data("page-id") == t
                },
                l = function (e) {
                    t(e), u(e)
                },
                t = function (e) {
                    var t = $("a#" + e);
                    n = n || r(), t.length && $("html,body").animate({
                        scrollTop: t.offset().top - n
                    }, i)
                },
                u = function (e) {
                    location.hash = e
                };
            $(document).on("click", ".navigate-to-section", function () {
                var e = $(this),
                    t = e.attr("href"),
                    n = a(t);
                if (n && s(e)) return l(n), !1
            })
        }
    }),
    function () {
        var e, t, n, i;
        n = null, window.doTextFit = function (e) {
            var t;
            if (null == e && (e = !1), 0 === (t = $("#page-title.text-fit span.outer").first()).closest("[data-apply-textfit=false]").length && t.length) return t.textFit(null, !1, n, e)
        }, e = null, t = function () {
            return e && clearTimeout(e), e = setTimeout(doTextFit, 3e3)
        }, $(document).on("pjax:beforeSend", function () {
            return n = $("#page-title.text-fit span.outer").css("font-size")
        }), $(document).on("pjax:complete", doTextFit), i = !1, $(function () {
            if (doTextFit(), !i) return $(document).on("zoogle_refresh", "#usersite-container", t), i = !0
        })
    }.call(this);