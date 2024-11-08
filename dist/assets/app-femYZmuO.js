(function () {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const h of document.querySelectorAll('link[rel="modulepreload"]')) c(h);
  new MutationObserver((h) => {
    for (const m of h)
      if (m.type === "childList")
        for (const g of m.addedNodes)
          g.tagName === "LINK" && g.rel === "modulepreload" && c(g);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(h) {
    const m = {};
    return (
      h.integrity && (m.integrity = h.integrity),
      h.referrerPolicy && (m.referrerPolicy = h.referrerPolicy),
      h.crossOrigin === "use-credentials"
        ? (m.credentials = "include")
        : h.crossOrigin === "anonymous"
          ? (m.credentials = "omit")
          : (m.credentials = "same-origin"),
      m
    );
  }
  function c(h) {
    if (h.ep) return;
    h.ep = !0;
    const m = l(h);
    fetch(h.href, m);
  }
})();
var Dr =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {},
  Ir = { exports: {} };
/*!
 * Bootstrap v5.3.3 (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ (function (M, a) {
  (function (l, c) {
    M.exports = c();
  })(Dr, function () {
    const l = new Map(),
      c = {
        set(n, e, t) {
          l.has(n) || l.set(n, new Map());
          const s = l.get(n);
          s.has(e) || s.size === 0
            ? s.set(e, t)
            : console.error(
                `Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`,
              );
        },
        get: (n, e) => (l.has(n) && l.get(n).get(e)) || null,
        remove(n, e) {
          if (!l.has(n)) return;
          const t = l.get(n);
          t.delete(e), t.size === 0 && l.delete(n);
        },
      },
      h = "transitionend",
      m = (n) => (
        n &&
          window.CSS &&
          window.CSS.escape &&
          (n = n.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
        n
      ),
      g = (n) => {
        n.dispatchEvent(new Event(h));
      },
      v = (n) =>
        !(!n || typeof n != "object") &&
        (n.jquery !== void 0 && (n = n[0]), n.nodeType !== void 0),
      E = (n) =>
        v(n)
          ? n.jquery
            ? n[0]
            : n
          : typeof n == "string" && n.length > 0
            ? document.querySelector(m(n))
            : null,
      S = (n) => {
        if (!v(n) || n.getClientRects().length === 0) return !1;
        const e =
            getComputedStyle(n).getPropertyValue("visibility") === "visible",
          t = n.closest("details:not([open])");
        if (!t) return e;
        if (t !== n) {
          const s = n.closest("summary");
          if ((s && s.parentNode !== t) || s === null) return !1;
        }
        return e;
      },
      f = (n) =>
        !n ||
        n.nodeType !== Node.ELEMENT_NODE ||
        !!n.classList.contains("disabled") ||
        (n.disabled !== void 0
          ? n.disabled
          : n.hasAttribute("disabled") &&
            n.getAttribute("disabled") !== "false"),
      w = (n) => {
        if (!document.documentElement.attachShadow) return null;
        if (typeof n.getRootNode == "function") {
          const e = n.getRootNode();
          return e instanceof ShadowRoot ? e : null;
        }
        return n instanceof ShadowRoot
          ? n
          : n.parentNode
            ? w(n.parentNode)
            : null;
      },
      P = () => {},
      W = (n) => {
        n.offsetHeight;
      },
      ne = () =>
        window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
          ? window.jQuery
          : null,
      X = [],
      U = () => document.documentElement.dir === "rtl",
      V = (n) => {
        var e;
        (e = () => {
          const t = ne();
          if (t) {
            const s = n.NAME,
              i = t.fn[s];
            (t.fn[s] = n.jQueryInterface),
              (t.fn[s].Constructor = n),
              (t.fn[s].noConflict = () => ((t.fn[s] = i), n.jQueryInterface));
          }
        }),
          document.readyState === "loading"
            ? (X.length ||
                document.addEventListener("DOMContentLoaded", () => {
                  for (const t of X) t();
                }),
              X.push(e))
            : e();
      },
      z = (n, e = [], t = n) => (typeof n == "function" ? n(...e) : t),
      ce = (n, e, t = !0) => {
        if (!t) return void z(n);
        const s =
          ((r) => {
            if (!r) return 0;
            let { transitionDuration: u, transitionDelay: p } =
              window.getComputedStyle(r);
            const _ = Number.parseFloat(u),
              y = Number.parseFloat(p);
            return _ || y
              ? ((u = u.split(",")[0]),
                (p = p.split(",")[0]),
                1e3 * (Number.parseFloat(u) + Number.parseFloat(p)))
              : 0;
          })(e) + 5;
        let i = !1;
        const o = ({ target: r }) => {
          r === e && ((i = !0), e.removeEventListener(h, o), z(n));
        };
        e.addEventListener(h, o),
          setTimeout(() => {
            i || g(e);
          }, s);
      },
      fe = (n, e, t, s) => {
        const i = n.length;
        let o = n.indexOf(e);
        return o === -1
          ? !t && s
            ? n[i - 1]
            : n[0]
          : ((o += t ? 1 : -1),
            s && (o = (o + i) % i),
            n[Math.max(0, Math.min(o, i - 1))]);
      },
      xe = /[^.]*(?=\..*)\.|.*/,
      It = /\..*/,
      sn = /::\d+$/,
      Be = {};
    let it = 1;
    const Et = { mouseenter: "mouseover", mouseleave: "mouseout" },
      Ct = new Set([
        "click",
        "dblclick",
        "mouseup",
        "mousedown",
        "contextmenu",
        "mousewheel",
        "DOMMouseScroll",
        "mouseover",
        "mouseout",
        "mousemove",
        "selectstart",
        "selectend",
        "keydown",
        "keypress",
        "keyup",
        "orientationchange",
        "touchstart",
        "touchmove",
        "touchend",
        "touchcancel",
        "pointerdown",
        "pointermove",
        "pointerup",
        "pointerleave",
        "pointercancel",
        "gesturestart",
        "gesturechange",
        "gestureend",
        "focus",
        "blur",
        "change",
        "reset",
        "select",
        "submit",
        "focusin",
        "focusout",
        "load",
        "unload",
        "beforeunload",
        "resize",
        "move",
        "DOMContentLoaded",
        "readystatechange",
        "error",
        "abort",
        "scroll",
      ]);
    function We(n, e) {
      return (e && `${e}::${it++}`) || n.uidEvent || it++;
    }
    function Ne(n) {
      const e = We(n);
      return (n.uidEvent = e), (Be[e] = Be[e] || {}), Be[e];
    }
    function Ve(n, e, t = null) {
      return Object.values(n).find(
        (s) => s.callable === e && s.delegationSelector === t,
      );
    }
    function Z(n, e, t) {
      const s = typeof e == "string",
        i = s ? t : e || t;
      let o = Te(n);
      return Ct.has(o) || (o = n), [s, i, o];
    }
    function ee(n, e, t, s, i) {
      if (typeof e != "string" || !n) return;
      let [o, r, u] = Z(e, t, s);
      e in Et &&
        (r = ((A) =>
          function (x) {
            if (
              !x.relatedTarget ||
              (x.relatedTarget !== x.delegateTarget &&
                !x.delegateTarget.contains(x.relatedTarget))
            )
              return A.call(this, x);
          })(r));
      const p = Ne(n),
        _ = p[u] || (p[u] = {}),
        y = Ve(_, r, o ? t : null);
      if (y) return void (y.oneOff = y.oneOff && i);
      const b = We(r, e.replace(xe, "")),
        O = o
          ? (function (L, A, x) {
              return function k(R) {
                const q = L.querySelectorAll(A);
                for (let { target: D } = R; D && D !== this; D = D.parentNode)
                  for (const j of q)
                    if (j === D)
                      return (
                        de(R, { delegateTarget: D }),
                        k.oneOff && d.off(L, R.type, A, x),
                        x.apply(D, [R])
                      );
              };
            })(n, t, r)
          : (function (L, A) {
              return function x(k) {
                return (
                  de(k, { delegateTarget: L }),
                  x.oneOff && d.off(L, k.type, A),
                  A.apply(L, [k])
                );
              };
            })(n, r);
      (O.delegationSelector = o ? t : null),
        (O.callable = r),
        (O.oneOff = i),
        (O.uidEvent = b),
        (_[b] = O),
        n.addEventListener(u, O, o);
    }
    function G(n, e, t, s, i) {
      const o = Ve(e[t], s, i);
      o && (n.removeEventListener(t, o, !!i), delete e[t][o.uidEvent]);
    }
    function $e(n, e, t, s) {
      const i = e[t] || {};
      for (const [o, r] of Object.entries(i))
        o.includes(s) && G(n, e, t, r.callable, r.delegationSelector);
    }
    function Te(n) {
      return (n = n.replace(It, "")), Et[n] || n;
    }
    const d = {
      on(n, e, t, s) {
        ee(n, e, t, s, !1);
      },
      one(n, e, t, s) {
        ee(n, e, t, s, !0);
      },
      off(n, e, t, s) {
        if (typeof e != "string" || !n) return;
        const [i, o, r] = Z(e, t, s),
          u = r !== e,
          p = Ne(n),
          _ = p[r] || {},
          y = e.startsWith(".");
        if (o === void 0) {
          if (y) for (const b of Object.keys(p)) $e(n, p, b, e.slice(1));
          for (const [b, O] of Object.entries(_)) {
            const L = b.replace(sn, "");
            (u && !e.includes(L)) ||
              G(n, p, r, O.callable, O.delegationSelector);
          }
        } else {
          if (!Object.keys(_).length) return;
          G(n, p, r, o, i ? t : null);
        }
      },
      trigger(n, e, t) {
        if (typeof e != "string" || !n) return null;
        const s = ne();
        let i = null,
          o = !0,
          r = !0,
          u = !1;
        e !== Te(e) &&
          s &&
          ((i = s.Event(e, t)),
          s(n).trigger(i),
          (o = !i.isPropagationStopped()),
          (r = !i.isImmediatePropagationStopped()),
          (u = i.isDefaultPrevented()));
        const p = de(new Event(e, { bubbles: o, cancelable: !0 }), t);
        return (
          u && p.preventDefault(),
          r && n.dispatchEvent(p),
          p.defaultPrevented && i && i.preventDefault(),
          p
        );
      },
    };
    function de(n, e = {}) {
      for (const [t, s] of Object.entries(e))
        try {
          n[t] = s;
        } catch {
          Object.defineProperty(n, t, { configurable: !0, get: () => s });
        }
      return n;
    }
    function Ae(n) {
      if (n === "true") return !0;
      if (n === "false") return !1;
      if (n === Number(n).toString()) return Number(n);
      if (n === "" || n === "null") return null;
      if (typeof n != "string") return n;
      try {
        return JSON.parse(decodeURIComponent(n));
      } catch {
        return n;
      }
    }
    function we(n) {
      return n.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
    }
    const se = {
      setDataAttribute(n, e, t) {
        n.setAttribute(`data-bs-${we(e)}`, t);
      },
      removeDataAttribute(n, e) {
        n.removeAttribute(`data-bs-${we(e)}`);
      },
      getDataAttributes(n) {
        if (!n) return {};
        const e = {},
          t = Object.keys(n.dataset).filter(
            (s) => s.startsWith("bs") && !s.startsWith("bsConfig"),
          );
        for (const s of t) {
          let i = s.replace(/^bs/, "");
          (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
            (e[i] = Ae(n.dataset[s]));
        }
        return e;
      },
      getDataAttribute: (n, e) => Ae(n.getAttribute(`data-bs-${we(e)}`)),
    };
    class Ee {
      static get Default() {
        return {};
      }
      static get DefaultType() {
        return {};
      }
      static get NAME() {
        throw new Error(
          'You have to implement the static method "NAME", for each component!',
        );
      }
      _getConfig(e) {
        return (
          (e = this._mergeConfigObj(e)),
          (e = this._configAfterMerge(e)),
          this._typeCheckConfig(e),
          e
        );
      }
      _configAfterMerge(e) {
        return e;
      }
      _mergeConfigObj(e, t) {
        const s = v(t) ? se.getDataAttribute(t, "config") : {};
        return {
          ...this.constructor.Default,
          ...(typeof s == "object" ? s : {}),
          ...(v(t) ? se.getDataAttributes(t) : {}),
          ...(typeof e == "object" ? e : {}),
        };
      }
      _typeCheckConfig(e, t = this.constructor.DefaultType) {
        for (const [i, o] of Object.entries(t)) {
          const r = e[i],
            u = v(r)
              ? "element"
              : (s = r) == null
                ? `${s}`
                : Object.prototype.toString
                    .call(s)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase();
          if (!new RegExp(o).test(u))
            throw new TypeError(
              `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${u}" but expected type "${o}".`,
            );
        }
        var s;
      }
    }
    class J extends Ee {
      constructor(e, t) {
        super(),
          (e = E(e)) &&
            ((this._element = e),
            (this._config = this._getConfig(t)),
            c.set(this._element, this.constructor.DATA_KEY, this));
      }
      dispose() {
        c.remove(this._element, this.constructor.DATA_KEY),
          d.off(this._element, this.constructor.EVENT_KEY);
        for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
      }
      _queueCallback(e, t, s = !0) {
        ce(e, t, s);
      }
      _getConfig(e) {
        return (
          (e = this._mergeConfigObj(e, this._element)),
          (e = this._configAfterMerge(e)),
          this._typeCheckConfig(e),
          e
        );
      }
      static getInstance(e) {
        return c.get(E(e), this.DATA_KEY);
      }
      static getOrCreateInstance(e, t = {}) {
        return (
          this.getInstance(e) || new this(e, typeof t == "object" ? t : null)
        );
      }
      static get VERSION() {
        return "5.3.3";
      }
      static get DATA_KEY() {
        return `bs.${this.NAME}`;
      }
      static get EVENT_KEY() {
        return `.${this.DATA_KEY}`;
      }
      static eventName(e) {
        return `${e}${this.EVENT_KEY}`;
      }
    }
    const De = (n) => {
        let e = n.getAttribute("data-bs-target");
        if (!e || e === "#") {
          let t = n.getAttribute("href");
          if (!t || (!t.includes("#") && !t.startsWith("."))) return null;
          t.includes("#") && !t.startsWith("#") && (t = `#${t.split("#")[1]}`),
            (e = t && t !== "#" ? t.trim() : null);
        }
        return e
          ? e
              .split(",")
              .map((t) => m(t))
              .join(",")
          : null;
      },
      C = {
        find: (n, e = document.documentElement) =>
          [].concat(...Element.prototype.querySelectorAll.call(e, n)),
        findOne: (n, e = document.documentElement) =>
          Element.prototype.querySelector.call(e, n),
        children: (n, e) =>
          [].concat(...n.children).filter((t) => t.matches(e)),
        parents(n, e) {
          const t = [];
          let s = n.parentNode.closest(e);
          for (; s; ) t.push(s), (s = s.parentNode.closest(e));
          return t;
        },
        prev(n, e) {
          let t = n.previousElementSibling;
          for (; t; ) {
            if (t.matches(e)) return [t];
            t = t.previousElementSibling;
          }
          return [];
        },
        next(n, e) {
          let t = n.nextElementSibling;
          for (; t; ) {
            if (t.matches(e)) return [t];
            t = t.nextElementSibling;
          }
          return [];
        },
        focusableChildren(n) {
          const e = [
            "a",
            "button",
            "input",
            "textarea",
            "select",
            "details",
            "[tabindex]",
            '[contenteditable="true"]',
          ]
            .map((t) => `${t}:not([tabindex^="-"])`)
            .join(",");
          return this.find(e, n).filter((t) => !f(t) && S(t));
        },
        getSelectorFromElement(n) {
          const e = De(n);
          return e && C.findOne(e) ? e : null;
        },
        getElementFromSelector(n) {
          const e = De(n);
          return e ? C.findOne(e) : null;
        },
        getMultipleElementsFromSelector(n) {
          const e = De(n);
          return e ? C.find(e) : [];
        },
      },
      Re = (n, e = "hide") => {
        const t = `click.dismiss${n.EVENT_KEY}`,
          s = n.NAME;
        d.on(document, t, `[data-bs-dismiss="${s}"]`, function (i) {
          if (
            (["A", "AREA"].includes(this.tagName) && i.preventDefault(),
            f(this))
          )
            return;
          const o = C.getElementFromSelector(this) || this.closest(`.${s}`);
          n.getOrCreateInstance(o)[e]();
        });
      },
      on = ".bs.alert",
      Mt = `close${on}`,
      Lt = `closed${on}`;
    class ot extends J {
      static get NAME() {
        return "alert";
      }
      close() {
        if (d.trigger(this._element, Mt).defaultPrevented) return;
        this._element.classList.remove("show");
        const e = this._element.classList.contains("fade");
        this._queueCallback(() => this._destroyElement(), this._element, e);
      }
      _destroyElement() {
        this._element.remove(), d.trigger(this._element, Lt), this.dispose();
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = ot.getOrCreateInstance(this);
          if (typeof e == "string") {
            if (t[e] === void 0 || e.startsWith("_") || e === "constructor")
              throw new TypeError(`No method named "${e}"`);
            t[e](this);
          }
        });
      }
    }
    Re(ot, "close"), V(ot);
    const Rn = '[data-bs-toggle="button"]';
    class xt extends J {
      static get NAME() {
        return "button";
      }
      toggle() {
        this._element.setAttribute(
          "aria-pressed",
          this._element.classList.toggle("active"),
        );
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = xt.getOrCreateInstance(this);
          e === "toggle" && t[e]();
        });
      }
    }
    d.on(document, "click.bs.button.data-api", Rn, (n) => {
      n.preventDefault();
      const e = n.target.closest(Rn);
      xt.getOrCreateInstance(e).toggle();
    }),
      V(xt);
    const rt = ".bs.swipe",
      yi = `touchstart${rt}`,
      vi = `touchmove${rt}`,
      wi = `touchend${rt}`,
      Ei = `pointerdown${rt}`,
      Ci = `pointerup${rt}`,
      Li = { endCallback: null, leftCallback: null, rightCallback: null },
      xi = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)",
      };
    class jt extends Ee {
      constructor(e, t) {
        super(),
          (this._element = e),
          e &&
            jt.isSupported() &&
            ((this._config = this._getConfig(t)),
            (this._deltaX = 0),
            (this._supportPointerEvents = !!window.PointerEvent),
            this._initEvents());
      }
      static get Default() {
        return Li;
      }
      static get DefaultType() {
        return xi;
      }
      static get NAME() {
        return "swipe";
      }
      dispose() {
        d.off(this._element, rt);
      }
      _start(e) {
        this._supportPointerEvents
          ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
          : (this._deltaX = e.touches[0].clientX);
      }
      _end(e) {
        this._eventIsPointerPenTouch(e) &&
          (this._deltaX = e.clientX - this._deltaX),
          this._handleSwipe(),
          z(this._config.endCallback);
      }
      _move(e) {
        this._deltaX =
          e.touches && e.touches.length > 1
            ? 0
            : e.touches[0].clientX - this._deltaX;
      }
      _handleSwipe() {
        const e = Math.abs(this._deltaX);
        if (e <= 40) return;
        const t = e / this._deltaX;
        (this._deltaX = 0),
          t &&
            z(t > 0 ? this._config.rightCallback : this._config.leftCallback);
      }
      _initEvents() {
        this._supportPointerEvents
          ? (d.on(this._element, Ei, (e) => this._start(e)),
            d.on(this._element, Ci, (e) => this._end(e)),
            this._element.classList.add("pointer-event"))
          : (d.on(this._element, yi, (e) => this._start(e)),
            d.on(this._element, vi, (e) => this._move(e)),
            d.on(this._element, wi, (e) => this._end(e)));
      }
      _eventIsPointerPenTouch(e) {
        return (
          this._supportPointerEvents &&
          (e.pointerType === "pen" || e.pointerType === "touch")
        );
      }
      static isSupported() {
        return (
          "ontouchstart" in document.documentElement ||
          navigator.maxTouchPoints > 0
        );
      }
    }
    const Fe = ".bs.carousel",
      Fn = ".data-api",
      Tt = "next",
      at = "prev",
      lt = "left",
      Bt = "right",
      Ti = `slide${Fe}`,
      rn = `slid${Fe}`,
      Ai = `keydown${Fe}`,
      ki = `mouseenter${Fe}`,
      Si = `mouseleave${Fe}`,
      Oi = `dragstart${Fe}`,
      Pi = `load${Fe}${Fn}`,
      $i = `click${Fe}${Fn}`,
      Hn = "carousel",
      Nt = "active",
      qn = ".active",
      Un = ".carousel-item",
      Di = qn + Un,
      Ii = { ArrowLeft: Bt, ArrowRight: lt },
      Mi = {
        interval: 5e3,
        keyboard: !0,
        pause: "hover",
        ride: !1,
        touch: !0,
        wrap: !0,
      },
      ji = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean",
      };
    class ct extends J {
      constructor(e, t) {
        super(e, t),
          (this._interval = null),
          (this._activeElement = null),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this._swipeHelper = null),
          (this._indicatorsElement = C.findOne(
            ".carousel-indicators",
            this._element,
          )),
          this._addEventListeners(),
          this._config.ride === Hn && this.cycle();
      }
      static get Default() {
        return Mi;
      }
      static get DefaultType() {
        return ji;
      }
      static get NAME() {
        return "carousel";
      }
      next() {
        this._slide(Tt);
      }
      nextWhenVisible() {
        !document.hidden && S(this._element) && this.next();
      }
      prev() {
        this._slide(at);
      }
      pause() {
        this._isSliding && g(this._element), this._clearInterval();
      }
      cycle() {
        this._clearInterval(),
          this._updateInterval(),
          (this._interval = setInterval(
            () => this.nextWhenVisible(),
            this._config.interval,
          ));
      }
      _maybeEnableCycle() {
        this._config.ride &&
          (this._isSliding
            ? d.one(this._element, rn, () => this.cycle())
            : this.cycle());
      }
      to(e) {
        const t = this._getItems();
        if (e > t.length - 1 || e < 0) return;
        if (this._isSliding)
          return void d.one(this._element, rn, () => this.to(e));
        const s = this._getItemIndex(this._getActive());
        if (s === e) return;
        const i = e > s ? Tt : at;
        this._slide(i, t[e]);
      }
      dispose() {
        this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
      }
      _configAfterMerge(e) {
        return (e.defaultInterval = e.interval), e;
      }
      _addEventListeners() {
        this._config.keyboard &&
          d.on(this._element, Ai, (e) => this._keydown(e)),
          this._config.pause === "hover" &&
            (d.on(this._element, ki, () => this.pause()),
            d.on(this._element, Si, () => this._maybeEnableCycle())),
          this._config.touch &&
            jt.isSupported() &&
            this._addTouchEventListeners();
      }
      _addTouchEventListeners() {
        for (const t of C.find(".carousel-item img", this._element))
          d.on(t, Oi, (s) => s.preventDefault());
        const e = {
          leftCallback: () => this._slide(this._directionToOrder(lt)),
          rightCallback: () => this._slide(this._directionToOrder(Bt)),
          endCallback: () => {
            this._config.pause === "hover" &&
              (this.pause(),
              this.touchTimeout && clearTimeout(this.touchTimeout),
              (this.touchTimeout = setTimeout(
                () => this._maybeEnableCycle(),
                500 + this._config.interval,
              )));
          },
        };
        this._swipeHelper = new jt(this._element, e);
      }
      _keydown(e) {
        if (/input|textarea/i.test(e.target.tagName)) return;
        const t = Ii[e.key];
        t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
      }
      _getItemIndex(e) {
        return this._getItems().indexOf(e);
      }
      _setActiveIndicatorElement(e) {
        if (!this._indicatorsElement) return;
        const t = C.findOne(qn, this._indicatorsElement);
        t.classList.remove(Nt), t.removeAttribute("aria-current");
        const s = C.findOne(
          `[data-bs-slide-to="${e}"]`,
          this._indicatorsElement,
        );
        s && (s.classList.add(Nt), s.setAttribute("aria-current", "true"));
      }
      _updateInterval() {
        const e = this._activeElement || this._getActive();
        if (!e) return;
        const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
        this._config.interval = t || this._config.defaultInterval;
      }
      _slide(e, t = null) {
        if (this._isSliding) return;
        const s = this._getActive(),
          i = e === Tt,
          o = t || fe(this._getItems(), s, i, this._config.wrap);
        if (o === s) return;
        const r = this._getItemIndex(o),
          u = (b) =>
            d.trigger(this._element, b, {
              relatedTarget: o,
              direction: this._orderToDirection(e),
              from: this._getItemIndex(s),
              to: r,
            });
        if (u(Ti).defaultPrevented || !s || !o) return;
        const p = !!this._interval;
        this.pause(),
          (this._isSliding = !0),
          this._setActiveIndicatorElement(r),
          (this._activeElement = o);
        const _ = i ? "carousel-item-start" : "carousel-item-end",
          y = i ? "carousel-item-next" : "carousel-item-prev";
        o.classList.add(y),
          W(o),
          s.classList.add(_),
          o.classList.add(_),
          this._queueCallback(
            () => {
              o.classList.remove(_, y),
                o.classList.add(Nt),
                s.classList.remove(Nt, y, _),
                (this._isSliding = !1),
                u(rn);
            },
            s,
            this._isAnimated(),
          ),
          p && this.cycle();
      }
      _isAnimated() {
        return this._element.classList.contains("slide");
      }
      _getActive() {
        return C.findOne(Di, this._element);
      }
      _getItems() {
        return C.find(Un, this._element);
      }
      _clearInterval() {
        this._interval &&
          (clearInterval(this._interval), (this._interval = null));
      }
      _directionToOrder(e) {
        return U() ? (e === lt ? at : Tt) : e === lt ? Tt : at;
      }
      _orderToDirection(e) {
        return U() ? (e === at ? lt : Bt) : e === at ? Bt : lt;
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = ct.getOrCreateInstance(this, e);
          if (typeof e != "number") {
            if (typeof e == "string") {
              if (t[e] === void 0 || e.startsWith("_") || e === "constructor")
                throw new TypeError(`No method named "${e}"`);
              t[e]();
            }
          } else t.to(e);
        });
      }
    }
    d.on(document, $i, "[data-bs-slide], [data-bs-slide-to]", function (n) {
      const e = C.getElementFromSelector(this);
      if (!e || !e.classList.contains(Hn)) return;
      n.preventDefault();
      const t = ct.getOrCreateInstance(e),
        s = this.getAttribute("data-bs-slide-to");
      return s
        ? (t.to(s), void t._maybeEnableCycle())
        : se.getDataAttribute(this, "slide") === "next"
          ? (t.next(), void t._maybeEnableCycle())
          : (t.prev(), void t._maybeEnableCycle());
    }),
      d.on(window, Pi, () => {
        const n = C.find('[data-bs-ride="carousel"]');
        for (const e of n) ct.getOrCreateInstance(e);
      }),
      V(ct);
    const At = ".bs.collapse",
      Bi = `show${At}`,
      Ni = `shown${At}`,
      Ri = `hide${At}`,
      Fi = `hidden${At}`,
      Hi = `click${At}.data-api`,
      an = "show",
      dt = "collapse",
      Rt = "collapsing",
      qi = `:scope .${dt} .${dt}`,
      ln = '[data-bs-toggle="collapse"]',
      Ui = { parent: null, toggle: !0 },
      zi = { parent: "(null|element)", toggle: "boolean" };
    class ut extends J {
      constructor(e, t) {
        super(e, t), (this._isTransitioning = !1), (this._triggerArray = []);
        const s = C.find(ln);
        for (const i of s) {
          const o = C.getSelectorFromElement(i),
            r = C.find(o).filter((u) => u === this._element);
          o !== null && r.length && this._triggerArray.push(i);
        }
        this._initializeChildren(),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
          this._config.toggle && this.toggle();
      }
      static get Default() {
        return Ui;
      }
      static get DefaultType() {
        return zi;
      }
      static get NAME() {
        return "collapse";
      }
      toggle() {
        this._isShown() ? this.hide() : this.show();
      }
      show() {
        if (this._isTransitioning || this._isShown()) return;
        let e = [];
        if (
          (this._config.parent &&
            (e = this._getFirstLevelChildren(
              ".collapse.show, .collapse.collapsing",
            )
              .filter((i) => i !== this._element)
              .map((i) => ut.getOrCreateInstance(i, { toggle: !1 }))),
          (e.length && e[0]._isTransitioning) ||
            d.trigger(this._element, Bi).defaultPrevented)
        )
          return;
        for (const i of e) i.hide();
        const t = this._getDimension();
        this._element.classList.remove(dt),
          this._element.classList.add(Rt),
          (this._element.style[t] = 0),
          this._addAriaAndCollapsedClass(this._triggerArray, !0),
          (this._isTransitioning = !0);
        const s = `scroll${t[0].toUpperCase() + t.slice(1)}`;
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(Rt),
              this._element.classList.add(dt, an),
              (this._element.style[t] = ""),
              d.trigger(this._element, Ni);
          },
          this._element,
          !0,
        ),
          (this._element.style[t] = `${this._element[s]}px`);
      }
      hide() {
        if (
          this._isTransitioning ||
          !this._isShown() ||
          d.trigger(this._element, Ri).defaultPrevented
        )
          return;
        const e = this._getDimension();
        (this._element.style[e] =
          `${this._element.getBoundingClientRect()[e]}px`),
          W(this._element),
          this._element.classList.add(Rt),
          this._element.classList.remove(dt, an);
        for (const t of this._triggerArray) {
          const s = C.getElementFromSelector(t);
          s && !this._isShown(s) && this._addAriaAndCollapsedClass([t], !1);
        }
        (this._isTransitioning = !0),
          (this._element.style[e] = ""),
          this._queueCallback(
            () => {
              (this._isTransitioning = !1),
                this._element.classList.remove(Rt),
                this._element.classList.add(dt),
                d.trigger(this._element, Fi);
            },
            this._element,
            !0,
          );
      }
      _isShown(e = this._element) {
        return e.classList.contains(an);
      }
      _configAfterMerge(e) {
        return (e.toggle = !!e.toggle), (e.parent = E(e.parent)), e;
      }
      _getDimension() {
        return this._element.classList.contains("collapse-horizontal")
          ? "width"
          : "height";
      }
      _initializeChildren() {
        if (!this._config.parent) return;
        const e = this._getFirstLevelChildren(ln);
        for (const t of e) {
          const s = C.getElementFromSelector(t);
          s && this._addAriaAndCollapsedClass([t], this._isShown(s));
        }
      }
      _getFirstLevelChildren(e) {
        const t = C.find(qi, this._config.parent);
        return C.find(e, this._config.parent).filter((s) => !t.includes(s));
      }
      _addAriaAndCollapsedClass(e, t) {
        if (e.length)
          for (const s of e)
            s.classList.toggle("collapsed", !t),
              s.setAttribute("aria-expanded", t);
      }
      static jQueryInterface(e) {
        const t = {};
        return (
          typeof e == "string" && /show|hide/.test(e) && (t.toggle = !1),
          this.each(function () {
            const s = ut.getOrCreateInstance(this, t);
            if (typeof e == "string") {
              if (s[e] === void 0)
                throw new TypeError(`No method named "${e}"`);
              s[e]();
            }
          })
        );
      }
    }
    d.on(document, Hi, ln, function (n) {
      (n.target.tagName === "A" ||
        (n.delegateTarget && n.delegateTarget.tagName === "A")) &&
        n.preventDefault();
      for (const e of C.getMultipleElementsFromSelector(this))
        ut.getOrCreateInstance(e, { toggle: !1 }).toggle();
    }),
      V(ut);
    var ie = "top",
      ue = "bottom",
      he = "right",
      oe = "left",
      Ft = "auto",
      ht = [ie, ue, he, oe],
      Ke = "start",
      mt = "end",
      zn = "clippingParents",
      cn = "viewport",
      pt = "popper",
      Wn = "reference",
      dn = ht.reduce(function (n, e) {
        return n.concat([e + "-" + Ke, e + "-" + mt]);
      }, []),
      un = [].concat(ht, [Ft]).reduce(function (n, e) {
        return n.concat([e, e + "-" + Ke, e + "-" + mt]);
      }, []),
      Vn = "beforeRead",
      Kn = "read",
      Yn = "afterRead",
      Xn = "beforeMain",
      Qn = "main",
      Gn = "afterMain",
      Jn = "beforeWrite",
      Zn = "write",
      es = "afterWrite",
      ts = [Vn, Kn, Yn, Xn, Qn, Gn, Jn, Zn, es];
    function ke(n) {
      return n ? (n.nodeName || "").toLowerCase() : null;
    }
    function me(n) {
      if (n == null) return window;
      if (n.toString() !== "[object Window]") {
        var e = n.ownerDocument;
        return (e && e.defaultView) || window;
      }
      return n;
    }
    function Ye(n) {
      return n instanceof me(n).Element || n instanceof Element;
    }
    function ge(n) {
      return n instanceof me(n).HTMLElement || n instanceof HTMLElement;
    }
    function hn(n) {
      return (
        typeof ShadowRoot < "u" &&
        (n instanceof me(n).ShadowRoot || n instanceof ShadowRoot)
      );
    }
    const mn = {
      name: "applyStyles",
      enabled: !0,
      phase: "write",
      fn: function (n) {
        var e = n.state;
        Object.keys(e.elements).forEach(function (t) {
          var s = e.styles[t] || {},
            i = e.attributes[t] || {},
            o = e.elements[t];
          ge(o) &&
            ke(o) &&
            (Object.assign(o.style, s),
            Object.keys(i).forEach(function (r) {
              var u = i[r];
              u === !1
                ? o.removeAttribute(r)
                : o.setAttribute(r, u === !0 ? "" : u);
            }));
        });
      },
      effect: function (n) {
        var e = n.state,
          t = {
            popper: {
              position: e.options.strategy,
              left: "0",
              top: "0",
              margin: "0",
            },
            arrow: { position: "absolute" },
            reference: {},
          };
        return (
          Object.assign(e.elements.popper.style, t.popper),
          (e.styles = t),
          e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow),
          function () {
            Object.keys(e.elements).forEach(function (s) {
              var i = e.elements[s],
                o = e.attributes[s] || {},
                r = Object.keys(
                  e.styles.hasOwnProperty(s) ? e.styles[s] : t[s],
                ).reduce(function (u, p) {
                  return (u[p] = ""), u;
                }, {});
              ge(i) &&
                ke(i) &&
                (Object.assign(i.style, r),
                Object.keys(o).forEach(function (u) {
                  i.removeAttribute(u);
                }));
            });
          }
        );
      },
      requires: ["computeStyles"],
    };
    function Se(n) {
      return n.split("-")[0];
    }
    var Xe = Math.max,
      Ht = Math.min,
      ft = Math.round;
    function pn() {
      var n = navigator.userAgentData;
      return n != null && n.brands && Array.isArray(n.brands)
        ? n.brands
            .map(function (e) {
              return e.brand + "/" + e.version;
            })
            .join(" ")
        : navigator.userAgent;
    }
    function ns() {
      return !/^((?!chrome|android).)*safari/i.test(pn());
    }
    function gt(n, e, t) {
      e === void 0 && (e = !1), t === void 0 && (t = !1);
      var s = n.getBoundingClientRect(),
        i = 1,
        o = 1;
      e &&
        ge(n) &&
        ((i = (n.offsetWidth > 0 && ft(s.width) / n.offsetWidth) || 1),
        (o = (n.offsetHeight > 0 && ft(s.height) / n.offsetHeight) || 1));
      var r = (Ye(n) ? me(n) : window).visualViewport,
        u = !ns() && t,
        p = (s.left + (u && r ? r.offsetLeft : 0)) / i,
        _ = (s.top + (u && r ? r.offsetTop : 0)) / o,
        y = s.width / i,
        b = s.height / o;
      return {
        width: y,
        height: b,
        top: _,
        right: p + y,
        bottom: _ + b,
        left: p,
        x: p,
        y: _,
      };
    }
    function fn(n) {
      var e = gt(n),
        t = n.offsetWidth,
        s = n.offsetHeight;
      return (
        Math.abs(e.width - t) <= 1 && (t = e.width),
        Math.abs(e.height - s) <= 1 && (s = e.height),
        { x: n.offsetLeft, y: n.offsetTop, width: t, height: s }
      );
    }
    function ss(n, e) {
      var t = e.getRootNode && e.getRootNode();
      if (n.contains(e)) return !0;
      if (t && hn(t)) {
        var s = e;
        do {
          if (s && n.isSameNode(s)) return !0;
          s = s.parentNode || s.host;
        } while (s);
      }
      return !1;
    }
    function Ie(n) {
      return me(n).getComputedStyle(n);
    }
    function Wi(n) {
      return ["table", "td", "th"].indexOf(ke(n)) >= 0;
    }
    function He(n) {
      return ((Ye(n) ? n.ownerDocument : n.document) || window.document)
        .documentElement;
    }
    function qt(n) {
      return ke(n) === "html"
        ? n
        : n.assignedSlot || n.parentNode || (hn(n) ? n.host : null) || He(n);
    }
    function is(n) {
      return ge(n) && Ie(n).position !== "fixed" ? n.offsetParent : null;
    }
    function kt(n) {
      for (
        var e = me(n), t = is(n);
        t && Wi(t) && Ie(t).position === "static";

      )
        t = is(t);
      return t &&
        (ke(t) === "html" || (ke(t) === "body" && Ie(t).position === "static"))
        ? e
        : t ||
            (function (s) {
              var i = /firefox/i.test(pn());
              if (/Trident/i.test(pn()) && ge(s) && Ie(s).position === "fixed")
                return null;
              var o = qt(s);
              for (
                hn(o) && (o = o.host);
                ge(o) && ["html", "body"].indexOf(ke(o)) < 0;

              ) {
                var r = Ie(o);
                if (
                  r.transform !== "none" ||
                  r.perspective !== "none" ||
                  r.contain === "paint" ||
                  ["transform", "perspective"].indexOf(r.willChange) !== -1 ||
                  (i && r.willChange === "filter") ||
                  (i && r.filter && r.filter !== "none")
                )
                  return o;
                o = o.parentNode;
              }
              return null;
            })(n) ||
            e;
    }
    function gn(n) {
      return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
    }
    function St(n, e, t) {
      return Xe(n, Ht(e, t));
    }
    function os(n) {
      return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, n);
    }
    function rs(n, e) {
      return e.reduce(function (t, s) {
        return (t[s] = n), t;
      }, {});
    }
    const as = {
      name: "arrow",
      enabled: !0,
      phase: "main",
      fn: function (n) {
        var e,
          t = n.state,
          s = n.name,
          i = n.options,
          o = t.elements.arrow,
          r = t.modifiersData.popperOffsets,
          u = Se(t.placement),
          p = gn(u),
          _ = [oe, he].indexOf(u) >= 0 ? "height" : "width";
        if (o && r) {
          var y = (function (F, N) {
              return os(
                typeof (F =
                  typeof F == "function"
                    ? F(Object.assign({}, N.rects, { placement: N.placement }))
                    : F) != "number"
                  ? F
                  : rs(F, ht),
              );
            })(i.padding, t),
            b = fn(o),
            O = p === "y" ? ie : oe,
            L = p === "y" ? ue : he,
            A =
              t.rects.reference[_] +
              t.rects.reference[p] -
              r[p] -
              t.rects.popper[_],
            x = r[p] - t.rects.reference[p],
            k = kt(o),
            R = k ? (p === "y" ? k.clientHeight || 0 : k.clientWidth || 0) : 0,
            q = A / 2 - x / 2,
            D = y[O],
            j = R - b[_] - y[L],
            $ = R / 2 - b[_] / 2 + q,
            I = St(D, $, j),
            B = p;
          t.modifiersData[s] = (((e = {})[B] = I), (e.centerOffset = I - $), e);
        }
      },
      effect: function (n) {
        var e = n.state,
          t = n.options.element,
          s = t === void 0 ? "[data-popper-arrow]" : t;
        s != null &&
          (typeof s != "string" || (s = e.elements.popper.querySelector(s))) &&
          ss(e.elements.popper, s) &&
          (e.elements.arrow = s);
      },
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"],
    };
    function bt(n) {
      return n.split("-")[1];
    }
    var Vi = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
    function ls(n) {
      var e,
        t = n.popper,
        s = n.popperRect,
        i = n.placement,
        o = n.variation,
        r = n.offsets,
        u = n.position,
        p = n.gpuAcceleration,
        _ = n.adaptive,
        y = n.roundOffsets,
        b = n.isFixed,
        O = r.x,
        L = O === void 0 ? 0 : O,
        A = r.y,
        x = A === void 0 ? 0 : A,
        k = typeof y == "function" ? y({ x: L, y: x }) : { x: L, y: x };
      (L = k.x), (x = k.y);
      var R = r.hasOwnProperty("x"),
        q = r.hasOwnProperty("y"),
        D = oe,
        j = ie,
        $ = window;
      if (_) {
        var I = kt(t),
          B = "clientHeight",
          F = "clientWidth";
        I === me(t) &&
          Ie((I = He(t))).position !== "static" &&
          u === "absolute" &&
          ((B = "scrollHeight"), (F = "scrollWidth")),
          (i === ie || ((i === oe || i === he) && o === mt)) &&
            ((j = ue),
            (x -=
              (b && I === $ && $.visualViewport
                ? $.visualViewport.height
                : I[B]) - s.height),
            (x *= p ? 1 : -1)),
          (i !== oe && ((i !== ie && i !== ue) || o !== mt)) ||
            ((D = he),
            (L -=
              (b && I === $ && $.visualViewport
                ? $.visualViewport.width
                : I[F]) - s.width),
            (L *= p ? 1 : -1));
      }
      var N,
        Q = Object.assign({ position: u }, _ && Vi),
        pe =
          y === !0
            ? (function (Le, re) {
                var _e = Le.x,
                  ye = Le.y,
                  K = re.devicePixelRatio || 1;
                return { x: ft(_e * K) / K || 0, y: ft(ye * K) / K || 0 };
              })({ x: L, y: x }, me(t))
            : { x: L, y: x };
      return (
        (L = pe.x),
        (x = pe.y),
        p
          ? Object.assign(
              {},
              Q,
              (((N = {})[j] = q ? "0" : ""),
              (N[D] = R ? "0" : ""),
              (N.transform =
                ($.devicePixelRatio || 1) <= 1
                  ? "translate(" + L + "px, " + x + "px)"
                  : "translate3d(" + L + "px, " + x + "px, 0)"),
              N),
            )
          : Object.assign(
              {},
              Q,
              (((e = {})[j] = q ? x + "px" : ""),
              (e[D] = R ? L + "px" : ""),
              (e.transform = ""),
              e),
            )
      );
    }
    const bn = {
      name: "computeStyles",
      enabled: !0,
      phase: "beforeWrite",
      fn: function (n) {
        var e = n.state,
          t = n.options,
          s = t.gpuAcceleration,
          i = s === void 0 || s,
          o = t.adaptive,
          r = o === void 0 || o,
          u = t.roundOffsets,
          p = u === void 0 || u,
          _ = {
            placement: Se(e.placement),
            variation: bt(e.placement),
            popper: e.elements.popper,
            popperRect: e.rects.popper,
            gpuAcceleration: i,
            isFixed: e.options.strategy === "fixed",
          };
        e.modifiersData.popperOffsets != null &&
          (e.styles.popper = Object.assign(
            {},
            e.styles.popper,
            ls(
              Object.assign({}, _, {
                offsets: e.modifiersData.popperOffsets,
                position: e.options.strategy,
                adaptive: r,
                roundOffsets: p,
              }),
            ),
          )),
          e.modifiersData.arrow != null &&
            (e.styles.arrow = Object.assign(
              {},
              e.styles.arrow,
              ls(
                Object.assign({}, _, {
                  offsets: e.modifiersData.arrow,
                  position: "absolute",
                  adaptive: !1,
                  roundOffsets: p,
                }),
              ),
            )),
          (e.attributes.popper = Object.assign({}, e.attributes.popper, {
            "data-popper-placement": e.placement,
          }));
      },
      data: {},
    };
    var Ut = { passive: !0 };
    const _n = {
      name: "eventListeners",
      enabled: !0,
      phase: "write",
      fn: function () {},
      effect: function (n) {
        var e = n.state,
          t = n.instance,
          s = n.options,
          i = s.scroll,
          o = i === void 0 || i,
          r = s.resize,
          u = r === void 0 || r,
          p = me(e.elements.popper),
          _ = [].concat(e.scrollParents.reference, e.scrollParents.popper);
        return (
          o &&
            _.forEach(function (y) {
              y.addEventListener("scroll", t.update, Ut);
            }),
          u && p.addEventListener("resize", t.update, Ut),
          function () {
            o &&
              _.forEach(function (y) {
                y.removeEventListener("scroll", t.update, Ut);
              }),
              u && p.removeEventListener("resize", t.update, Ut);
          }
        );
      },
      data: {},
    };
    var Ki = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function zt(n) {
      return n.replace(/left|right|bottom|top/g, function (e) {
        return Ki[e];
      });
    }
    var Yi = { start: "end", end: "start" };
    function cs(n) {
      return n.replace(/start|end/g, function (e) {
        return Yi[e];
      });
    }
    function yn(n) {
      var e = me(n);
      return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
    }
    function vn(n) {
      return gt(He(n)).left + yn(n).scrollLeft;
    }
    function wn(n) {
      var e = Ie(n),
        t = e.overflow,
        s = e.overflowX,
        i = e.overflowY;
      return /auto|scroll|overlay|hidden/.test(t + i + s);
    }
    function ds(n) {
      return ["html", "body", "#document"].indexOf(ke(n)) >= 0
        ? n.ownerDocument.body
        : ge(n) && wn(n)
          ? n
          : ds(qt(n));
    }
    function Ot(n, e) {
      var t;
      e === void 0 && (e = []);
      var s = ds(n),
        i = s === ((t = n.ownerDocument) == null ? void 0 : t.body),
        o = me(s),
        r = i ? [o].concat(o.visualViewport || [], wn(s) ? s : []) : s,
        u = e.concat(r);
      return i ? u : u.concat(Ot(qt(r)));
    }
    function En(n) {
      return Object.assign({}, n, {
        left: n.x,
        top: n.y,
        right: n.x + n.width,
        bottom: n.y + n.height,
      });
    }
    function us(n, e, t) {
      return e === cn
        ? En(
            (function (s, i) {
              var o = me(s),
                r = He(s),
                u = o.visualViewport,
                p = r.clientWidth,
                _ = r.clientHeight,
                y = 0,
                b = 0;
              if (u) {
                (p = u.width), (_ = u.height);
                var O = ns();
                (O || (!O && i === "fixed")) &&
                  ((y = u.offsetLeft), (b = u.offsetTop));
              }
              return { width: p, height: _, x: y + vn(s), y: b };
            })(n, t),
          )
        : Ye(e)
          ? (function (s, i) {
              var o = gt(s, !1, i === "fixed");
              return (
                (o.top = o.top + s.clientTop),
                (o.left = o.left + s.clientLeft),
                (o.bottom = o.top + s.clientHeight),
                (o.right = o.left + s.clientWidth),
                (o.width = s.clientWidth),
                (o.height = s.clientHeight),
                (o.x = o.left),
                (o.y = o.top),
                o
              );
            })(e, t)
          : En(
              (function (s) {
                var i,
                  o = He(s),
                  r = yn(s),
                  u = (i = s.ownerDocument) == null ? void 0 : i.body,
                  p = Xe(
                    o.scrollWidth,
                    o.clientWidth,
                    u ? u.scrollWidth : 0,
                    u ? u.clientWidth : 0,
                  ),
                  _ = Xe(
                    o.scrollHeight,
                    o.clientHeight,
                    u ? u.scrollHeight : 0,
                    u ? u.clientHeight : 0,
                  ),
                  y = -r.scrollLeft + vn(s),
                  b = -r.scrollTop;
                return (
                  Ie(u || o).direction === "rtl" &&
                    (y += Xe(o.clientWidth, u ? u.clientWidth : 0) - p),
                  { width: p, height: _, x: y, y: b }
                );
              })(He(n)),
            );
    }
    function hs(n) {
      var e,
        t = n.reference,
        s = n.element,
        i = n.placement,
        o = i ? Se(i) : null,
        r = i ? bt(i) : null,
        u = t.x + t.width / 2 - s.width / 2,
        p = t.y + t.height / 2 - s.height / 2;
      switch (o) {
        case ie:
          e = { x: u, y: t.y - s.height };
          break;
        case ue:
          e = { x: u, y: t.y + t.height };
          break;
        case he:
          e = { x: t.x + t.width, y: p };
          break;
        case oe:
          e = { x: t.x - s.width, y: p };
          break;
        default:
          e = { x: t.x, y: t.y };
      }
      var _ = o ? gn(o) : null;
      if (_ != null) {
        var y = _ === "y" ? "height" : "width";
        switch (r) {
          case Ke:
            e[_] = e[_] - (t[y] / 2 - s[y] / 2);
            break;
          case mt:
            e[_] = e[_] + (t[y] / 2 - s[y] / 2);
        }
      }
      return e;
    }
    function _t(n, e) {
      e === void 0 && (e = {});
      var t = e,
        s = t.placement,
        i = s === void 0 ? n.placement : s,
        o = t.strategy,
        r = o === void 0 ? n.strategy : o,
        u = t.boundary,
        p = u === void 0 ? zn : u,
        _ = t.rootBoundary,
        y = _ === void 0 ? cn : _,
        b = t.elementContext,
        O = b === void 0 ? pt : b,
        L = t.altBoundary,
        A = L !== void 0 && L,
        x = t.padding,
        k = x === void 0 ? 0 : x,
        R = os(typeof k != "number" ? k : rs(k, ht)),
        q = O === pt ? Wn : pt,
        D = n.rects.popper,
        j = n.elements[A ? q : O],
        $ = (function (re, _e, ye, K) {
          var Oe =
              _e === "clippingParents"
                ? (function (H) {
                    var ae = Ot(qt(H)),
                      ve =
                        ["absolute", "fixed"].indexOf(Ie(H).position) >= 0 &&
                        ge(H)
                          ? kt(H)
                          : H;
                    return Ye(ve)
                      ? ae.filter(function (Ue) {
                          return Ye(Ue) && ss(Ue, ve) && ke(Ue) !== "body";
                        })
                      : [];
                  })(re)
                : [].concat(_e),
            Pe = [].concat(Oe, [ye]),
            wt = Pe[0],
            te = Pe.reduce(
              function (H, ae) {
                var ve = us(re, ae, K);
                return (
                  (H.top = Xe(ve.top, H.top)),
                  (H.right = Ht(ve.right, H.right)),
                  (H.bottom = Ht(ve.bottom, H.bottom)),
                  (H.left = Xe(ve.left, H.left)),
                  H
                );
              },
              us(re, wt, K),
            );
          return (
            (te.width = te.right - te.left),
            (te.height = te.bottom - te.top),
            (te.x = te.left),
            (te.y = te.top),
            te
          );
        })(Ye(j) ? j : j.contextElement || He(n.elements.popper), p, y, r),
        I = gt(n.elements.reference),
        B = hs({
          reference: I,
          element: D,
          strategy: "absolute",
          placement: i,
        }),
        F = En(Object.assign({}, D, B)),
        N = O === pt ? F : I,
        Q = {
          top: $.top - N.top + R.top,
          bottom: N.bottom - $.bottom + R.bottom,
          left: $.left - N.left + R.left,
          right: N.right - $.right + R.right,
        },
        pe = n.modifiersData.offset;
      if (O === pt && pe) {
        var Le = pe[i];
        Object.keys(Q).forEach(function (re) {
          var _e = [he, ue].indexOf(re) >= 0 ? 1 : -1,
            ye = [ie, ue].indexOf(re) >= 0 ? "y" : "x";
          Q[re] += Le[ye] * _e;
        });
      }
      return Q;
    }
    function Xi(n, e) {
      e === void 0 && (e = {});
      var t = e,
        s = t.placement,
        i = t.boundary,
        o = t.rootBoundary,
        r = t.padding,
        u = t.flipVariations,
        p = t.allowedAutoPlacements,
        _ = p === void 0 ? un : p,
        y = bt(s),
        b = y
          ? u
            ? dn
            : dn.filter(function (A) {
                return bt(A) === y;
              })
          : ht,
        O = b.filter(function (A) {
          return _.indexOf(A) >= 0;
        });
      O.length === 0 && (O = b);
      var L = O.reduce(function (A, x) {
        return (
          (A[x] = _t(n, {
            placement: x,
            boundary: i,
            rootBoundary: o,
            padding: r,
          })[Se(x)]),
          A
        );
      }, {});
      return Object.keys(L).sort(function (A, x) {
        return L[A] - L[x];
      });
    }
    const ms = {
      name: "flip",
      enabled: !0,
      phase: "main",
      fn: function (n) {
        var e = n.state,
          t = n.options,
          s = n.name;
        if (!e.modifiersData[s]._skip) {
          for (
            var i = t.mainAxis,
              o = i === void 0 || i,
              r = t.altAxis,
              u = r === void 0 || r,
              p = t.fallbackPlacements,
              _ = t.padding,
              y = t.boundary,
              b = t.rootBoundary,
              O = t.altBoundary,
              L = t.flipVariations,
              A = L === void 0 || L,
              x = t.allowedAutoPlacements,
              k = e.options.placement,
              R = Se(k),
              q =
                p ||
                (R !== k && A
                  ? (function (H) {
                      if (Se(H) === Ft) return [];
                      var ae = zt(H);
                      return [cs(H), ae, cs(ae)];
                    })(k)
                  : [zt(k)]),
              D = [k].concat(q).reduce(function (H, ae) {
                return H.concat(
                  Se(ae) === Ft
                    ? Xi(e, {
                        placement: ae,
                        boundary: y,
                        rootBoundary: b,
                        padding: _,
                        flipVariations: A,
                        allowedAutoPlacements: x,
                      })
                    : ae,
                );
              }, []),
              j = e.rects.reference,
              $ = e.rects.popper,
              I = new Map(),
              B = !0,
              F = D[0],
              N = 0;
            N < D.length;
            N++
          ) {
            var Q = D[N],
              pe = Se(Q),
              Le = bt(Q) === Ke,
              re = [ie, ue].indexOf(pe) >= 0,
              _e = re ? "width" : "height",
              ye = _t(e, {
                placement: Q,
                boundary: y,
                rootBoundary: b,
                altBoundary: O,
                padding: _,
              }),
              K = re ? (Le ? he : oe) : Le ? ue : ie;
            j[_e] > $[_e] && (K = zt(K));
            var Oe = zt(K),
              Pe = [];
            if (
              (o && Pe.push(ye[pe] <= 0),
              u && Pe.push(ye[K] <= 0, ye[Oe] <= 0),
              Pe.every(function (H) {
                return H;
              }))
            ) {
              (F = Q), (B = !1);
              break;
            }
            I.set(Q, Pe);
          }
          if (B)
            for (
              var wt = function (H) {
                  var ae = D.find(function (ve) {
                    var Ue = I.get(ve);
                    if (Ue)
                      return Ue.slice(0, H).every(function (Zt) {
                        return Zt;
                      });
                  });
                  if (ae) return (F = ae), "break";
                },
                te = A ? 3 : 1;
              te > 0 && wt(te) !== "break";
              te--
            );
          e.placement !== F &&
            ((e.modifiersData[s]._skip = !0),
            (e.placement = F),
            (e.reset = !0));
        }
      },
      requiresIfExists: ["offset"],
      data: { _skip: !1 },
    };
    function ps(n, e, t) {
      return (
        t === void 0 && (t = { x: 0, y: 0 }),
        {
          top: n.top - e.height - t.y,
          right: n.right - e.width + t.x,
          bottom: n.bottom - e.height + t.y,
          left: n.left - e.width - t.x,
        }
      );
    }
    function fs(n) {
      return [ie, he, ue, oe].some(function (e) {
        return n[e] >= 0;
      });
    }
    const gs = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: function (n) {
          var e = n.state,
            t = n.name,
            s = e.rects.reference,
            i = e.rects.popper,
            o = e.modifiersData.preventOverflow,
            r = _t(e, { elementContext: "reference" }),
            u = _t(e, { altBoundary: !0 }),
            p = ps(r, s),
            _ = ps(u, i, o),
            y = fs(p),
            b = fs(_);
          (e.modifiersData[t] = {
            referenceClippingOffsets: p,
            popperEscapeOffsets: _,
            isReferenceHidden: y,
            hasPopperEscaped: b,
          }),
            (e.attributes.popper = Object.assign({}, e.attributes.popper, {
              "data-popper-reference-hidden": y,
              "data-popper-escaped": b,
            }));
        },
      },
      bs = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: ["popperOffsets"],
        fn: function (n) {
          var e = n.state,
            t = n.options,
            s = n.name,
            i = t.offset,
            o = i === void 0 ? [0, 0] : i,
            r = un.reduce(function (y, b) {
              return (
                (y[b] = (function (O, L, A) {
                  var x = Se(O),
                    k = [oe, ie].indexOf(x) >= 0 ? -1 : 1,
                    R =
                      typeof A == "function"
                        ? A(Object.assign({}, L, { placement: O }))
                        : A,
                    q = R[0],
                    D = R[1];
                  return (
                    (q = q || 0),
                    (D = (D || 0) * k),
                    [oe, he].indexOf(x) >= 0 ? { x: D, y: q } : { x: q, y: D }
                  );
                })(b, e.rects, o)),
                y
              );
            }, {}),
            u = r[e.placement],
            p = u.x,
            _ = u.y;
          e.modifiersData.popperOffsets != null &&
            ((e.modifiersData.popperOffsets.x += p),
            (e.modifiersData.popperOffsets.y += _)),
            (e.modifiersData[s] = r);
        },
      },
      Cn = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function (n) {
          var e = n.state,
            t = n.name;
          e.modifiersData[t] = hs({
            reference: e.rects.reference,
            element: e.rects.popper,
            strategy: "absolute",
            placement: e.placement,
          });
        },
        data: {},
      },
      _s = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function (n) {
          var e = n.state,
            t = n.options,
            s = n.name,
            i = t.mainAxis,
            o = i === void 0 || i,
            r = t.altAxis,
            u = r !== void 0 && r,
            p = t.boundary,
            _ = t.rootBoundary,
            y = t.altBoundary,
            b = t.padding,
            O = t.tether,
            L = O === void 0 || O,
            A = t.tetherOffset,
            x = A === void 0 ? 0 : A,
            k = _t(e, {
              boundary: p,
              rootBoundary: _,
              padding: b,
              altBoundary: y,
            }),
            R = Se(e.placement),
            q = bt(e.placement),
            D = !q,
            j = gn(R),
            $ = j === "x" ? "y" : "x",
            I = e.modifiersData.popperOffsets,
            B = e.rects.reference,
            F = e.rects.popper,
            N =
              typeof x == "function"
                ? x(Object.assign({}, e.rects, { placement: e.placement }))
                : x,
            Q =
              typeof N == "number"
                ? { mainAxis: N, altAxis: N }
                : Object.assign({ mainAxis: 0, altAxis: 0 }, N),
            pe = e.modifiersData.offset
              ? e.modifiersData.offset[e.placement]
              : null,
            Le = { x: 0, y: 0 };
          if (I) {
            if (o) {
              var re,
                _e = j === "y" ? ie : oe,
                ye = j === "y" ? ue : he,
                K = j === "y" ? "height" : "width",
                Oe = I[j],
                Pe = Oe + k[_e],
                wt = Oe - k[ye],
                te = L ? -F[K] / 2 : 0,
                H = q === Ke ? B[K] : F[K],
                ae = q === Ke ? -F[K] : -B[K],
                ve = e.elements.arrow,
                Ue = L && ve ? fn(ve) : { width: 0, height: 0 },
                Zt = e.modifiersData["arrow#persistent"]
                  ? e.modifiersData["arrow#persistent"].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 },
                ii = Zt[_e],
                oi = Zt[ye],
                en = St(0, B[K], Ue[K]),
                xr = D
                  ? B[K] / 2 - te - en - ii - Q.mainAxis
                  : H - en - ii - Q.mainAxis,
                Tr = D
                  ? -B[K] / 2 + te + en + oi + Q.mainAxis
                  : ae + en + oi + Q.mainAxis,
                jn = e.elements.arrow && kt(e.elements.arrow),
                Ar = jn
                  ? j === "y"
                    ? jn.clientTop || 0
                    : jn.clientLeft || 0
                  : 0,
                ri = (re = pe?.[j]) != null ? re : 0,
                kr = Oe + Tr - ri,
                ai = St(
                  L ? Ht(Pe, Oe + xr - ri - Ar) : Pe,
                  Oe,
                  L ? Xe(wt, kr) : wt,
                );
              (I[j] = ai), (Le[j] = ai - Oe);
            }
            if (u) {
              var li,
                Sr = j === "x" ? ie : oe,
                Or = j === "x" ? ue : he,
                st = I[$],
                tn = $ === "y" ? "height" : "width",
                ci = st + k[Sr],
                di = st - k[Or],
                Bn = [ie, oe].indexOf(R) !== -1,
                ui = (li = pe?.[$]) != null ? li : 0,
                hi = Bn ? ci : st - B[tn] - F[tn] - ui + Q.altAxis,
                mi = Bn ? st + B[tn] + F[tn] - ui - Q.altAxis : di,
                pi =
                  L && Bn
                    ? (function (Pr, $r, Nn) {
                        var fi = St(Pr, $r, Nn);
                        return fi > Nn ? Nn : fi;
                      })(hi, st, mi)
                    : St(L ? hi : ci, st, L ? mi : di);
              (I[$] = pi), (Le[$] = pi - st);
            }
            e.modifiersData[s] = Le;
          }
        },
        requiresIfExists: ["offset"],
      };
    function Qi(n, e, t) {
      t === void 0 && (t = !1);
      var s,
        i,
        o = ge(e),
        r =
          ge(e) &&
          (function (b) {
            var O = b.getBoundingClientRect(),
              L = ft(O.width) / b.offsetWidth || 1,
              A = ft(O.height) / b.offsetHeight || 1;
            return L !== 1 || A !== 1;
          })(e),
        u = He(e),
        p = gt(n, r, t),
        _ = { scrollLeft: 0, scrollTop: 0 },
        y = { x: 0, y: 0 };
      return (
        (o || (!o && !t)) &&
          ((ke(e) !== "body" || wn(u)) &&
            (_ =
              (s = e) !== me(s) && ge(s)
                ? { scrollLeft: (i = s).scrollLeft, scrollTop: i.scrollTop }
                : yn(s)),
          ge(e)
            ? (((y = gt(e, !0)).x += e.clientLeft), (y.y += e.clientTop))
            : u && (y.x = vn(u))),
        {
          x: p.left + _.scrollLeft - y.x,
          y: p.top + _.scrollTop - y.y,
          width: p.width,
          height: p.height,
        }
      );
    }
    function Gi(n) {
      var e = new Map(),
        t = new Set(),
        s = [];
      function i(o) {
        t.add(o.name),
          []
            .concat(o.requires || [], o.requiresIfExists || [])
            .forEach(function (r) {
              if (!t.has(r)) {
                var u = e.get(r);
                u && i(u);
              }
            }),
          s.push(o);
      }
      return (
        n.forEach(function (o) {
          e.set(o.name, o);
        }),
        n.forEach(function (o) {
          t.has(o.name) || i(o);
        }),
        s
      );
    }
    var ys = { placement: "bottom", modifiers: [], strategy: "absolute" };
    function vs() {
      for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
        e[t] = arguments[t];
      return !e.some(function (s) {
        return !(s && typeof s.getBoundingClientRect == "function");
      });
    }
    function Wt(n) {
      n === void 0 && (n = {});
      var e = n,
        t = e.defaultModifiers,
        s = t === void 0 ? [] : t,
        i = e.defaultOptions,
        o = i === void 0 ? ys : i;
      return function (r, u, p) {
        p === void 0 && (p = o);
        var _,
          y,
          b = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, ys, o),
            modifiersData: {},
            elements: { reference: r, popper: u },
            attributes: {},
            styles: {},
          },
          O = [],
          L = !1,
          A = {
            state: b,
            setOptions: function (k) {
              var R = typeof k == "function" ? k(b.options) : k;
              x(),
                (b.options = Object.assign({}, o, b.options, R)),
                (b.scrollParents = {
                  reference: Ye(r)
                    ? Ot(r)
                    : r.contextElement
                      ? Ot(r.contextElement)
                      : [],
                  popper: Ot(u),
                });
              var q,
                D,
                j = (function ($) {
                  var I = Gi($);
                  return ts.reduce(function (B, F) {
                    return B.concat(
                      I.filter(function (N) {
                        return N.phase === F;
                      }),
                    );
                  }, []);
                })(
                  ((q = [].concat(s, b.options.modifiers)),
                  (D = q.reduce(function ($, I) {
                    var B = $[I.name];
                    return (
                      ($[I.name] = B
                        ? Object.assign({}, B, I, {
                            options: Object.assign({}, B.options, I.options),
                            data: Object.assign({}, B.data, I.data),
                          })
                        : I),
                      $
                    );
                  }, {})),
                  Object.keys(D).map(function ($) {
                    return D[$];
                  })),
                );
              return (
                (b.orderedModifiers = j.filter(function ($) {
                  return $.enabled;
                })),
                b.orderedModifiers.forEach(function ($) {
                  var I = $.name,
                    B = $.options,
                    F = B === void 0 ? {} : B,
                    N = $.effect;
                  if (typeof N == "function") {
                    var Q = N({ state: b, name: I, instance: A, options: F });
                    O.push(Q || function () {});
                  }
                }),
                A.update()
              );
            },
            forceUpdate: function () {
              if (!L) {
                var k = b.elements,
                  R = k.reference,
                  q = k.popper;
                if (vs(R, q)) {
                  (b.rects = {
                    reference: Qi(R, kt(q), b.options.strategy === "fixed"),
                    popper: fn(q),
                  }),
                    (b.reset = !1),
                    (b.placement = b.options.placement),
                    b.orderedModifiers.forEach(function (N) {
                      return (b.modifiersData[N.name] = Object.assign(
                        {},
                        N.data,
                      ));
                    });
                  for (var D = 0; D < b.orderedModifiers.length; D++)
                    if (b.reset !== !0) {
                      var j = b.orderedModifiers[D],
                        $ = j.fn,
                        I = j.options,
                        B = I === void 0 ? {} : I,
                        F = j.name;
                      typeof $ == "function" &&
                        (b =
                          $({ state: b, options: B, name: F, instance: A }) ||
                          b);
                    } else (b.reset = !1), (D = -1);
                }
              }
            },
            update:
              ((_ = function () {
                return new Promise(function (k) {
                  A.forceUpdate(), k(b);
                });
              }),
              function () {
                return (
                  y ||
                    (y = new Promise(function (k) {
                      Promise.resolve().then(function () {
                        (y = void 0), k(_());
                      });
                    })),
                  y
                );
              }),
            destroy: function () {
              x(), (L = !0);
            },
          };
        if (!vs(r, u)) return A;
        function x() {
          O.forEach(function (k) {
            return k();
          }),
            (O = []);
        }
        return (
          A.setOptions(p).then(function (k) {
            !L && p.onFirstUpdate && p.onFirstUpdate(k);
          }),
          A
        );
      };
    }
    var Ji = Wt(),
      Zi = Wt({ defaultModifiers: [_n, Cn, bn, mn] }),
      Ln = Wt({ defaultModifiers: [_n, Cn, bn, mn, bs, ms, _s, as, gs] });
    const ws = Object.freeze(
        Object.defineProperty(
          {
            __proto__: null,
            afterMain: Gn,
            afterRead: Yn,
            afterWrite: es,
            applyStyles: mn,
            arrow: as,
            auto: Ft,
            basePlacements: ht,
            beforeMain: Xn,
            beforeRead: Vn,
            beforeWrite: Jn,
            bottom: ue,
            clippingParents: zn,
            computeStyles: bn,
            createPopper: Ln,
            createPopperBase: Ji,
            createPopperLite: Zi,
            detectOverflow: _t,
            end: mt,
            eventListeners: _n,
            flip: ms,
            hide: gs,
            left: oe,
            main: Qn,
            modifierPhases: ts,
            offset: bs,
            placements: un,
            popper: pt,
            popperGenerator: Wt,
            popperOffsets: Cn,
            preventOverflow: _s,
            read: Kn,
            reference: Wn,
            right: he,
            start: Ke,
            top: ie,
            variationPlacements: dn,
            viewport: cn,
            write: Zn,
          },
          Symbol.toStringTag,
          { value: "Module" },
        ),
      ),
      Es = "dropdown",
      Qe = ".bs.dropdown",
      xn = ".data-api",
      eo = "ArrowUp",
      Cs = "ArrowDown",
      to = `hide${Qe}`,
      no = `hidden${Qe}`,
      so = `show${Qe}`,
      io = `shown${Qe}`,
      Ls = `click${Qe}${xn}`,
      xs = `keydown${Qe}${xn}`,
      oo = `keyup${Qe}${xn}`,
      yt = "show",
      Ge = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
      ro = `${Ge}.${yt}`,
      Vt = ".dropdown-menu",
      ao = U() ? "top-end" : "top-start",
      lo = U() ? "top-start" : "top-end",
      co = U() ? "bottom-end" : "bottom-start",
      uo = U() ? "bottom-start" : "bottom-end",
      ho = U() ? "left-start" : "right-start",
      mo = U() ? "right-start" : "left-start",
      po = {
        autoClose: !0,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [0, 2],
        popperConfig: null,
        reference: "toggle",
      },
      fo = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)",
      };
    class Ce extends J {
      constructor(e, t) {
        super(e, t),
          (this._popper = null),
          (this._parent = this._element.parentNode),
          (this._menu =
            C.next(this._element, Vt)[0] ||
            C.prev(this._element, Vt)[0] ||
            C.findOne(Vt, this._parent)),
          (this._inNavbar = this._detectNavbar());
      }
      static get Default() {
        return po;
      }
      static get DefaultType() {
        return fo;
      }
      static get NAME() {
        return Es;
      }
      toggle() {
        return this._isShown() ? this.hide() : this.show();
      }
      show() {
        if (f(this._element) || this._isShown()) return;
        const e = { relatedTarget: this._element };
        if (!d.trigger(this._element, so, e).defaultPrevented) {
          if (
            (this._createPopper(),
            "ontouchstart" in document.documentElement &&
              !this._parent.closest(".navbar-nav"))
          )
            for (const t of [].concat(...document.body.children))
              d.on(t, "mouseover", P);
          this._element.focus(),
            this._element.setAttribute("aria-expanded", !0),
            this._menu.classList.add(yt),
            this._element.classList.add(yt),
            d.trigger(this._element, io, e);
        }
      }
      hide() {
        if (f(this._element) || !this._isShown()) return;
        const e = { relatedTarget: this._element };
        this._completeHide(e);
      }
      dispose() {
        this._popper && this._popper.destroy(), super.dispose();
      }
      update() {
        (this._inNavbar = this._detectNavbar()),
          this._popper && this._popper.update();
      }
      _completeHide(e) {
        if (!d.trigger(this._element, to, e).defaultPrevented) {
          if ("ontouchstart" in document.documentElement)
            for (const t of [].concat(...document.body.children))
              d.off(t, "mouseover", P);
          this._popper && this._popper.destroy(),
            this._menu.classList.remove(yt),
            this._element.classList.remove(yt),
            this._element.setAttribute("aria-expanded", "false"),
            se.removeDataAttribute(this._menu, "popper"),
            d.trigger(this._element, no, e);
        }
      }
      _getConfig(e) {
        if (
          typeof (e = super._getConfig(e)).reference == "object" &&
          !v(e.reference) &&
          typeof e.reference.getBoundingClientRect != "function"
        )
          throw new TypeError(
            `${Es.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`,
          );
        return e;
      }
      _createPopper() {
        if (ws === void 0)
          throw new TypeError(
            "Bootstrap's dropdowns require Popper (https://popper.js.org)",
          );
        let e = this._element;
        this._config.reference === "parent"
          ? (e = this._parent)
          : v(this._config.reference)
            ? (e = E(this._config.reference))
            : typeof this._config.reference == "object" &&
              (e = this._config.reference);
        const t = this._getPopperConfig();
        this._popper = Ln(e, this._menu, t);
      }
      _isShown() {
        return this._menu.classList.contains(yt);
      }
      _getPlacement() {
        const e = this._parent;
        if (e.classList.contains("dropend")) return ho;
        if (e.classList.contains("dropstart")) return mo;
        if (e.classList.contains("dropup-center")) return "top";
        if (e.classList.contains("dropdown-center")) return "bottom";
        const t =
          getComputedStyle(this._menu)
            .getPropertyValue("--bs-position")
            .trim() === "end";
        return e.classList.contains("dropup") ? (t ? lo : ao) : t ? uo : co;
      }
      _detectNavbar() {
        return this._element.closest(".navbar") !== null;
      }
      _getOffset() {
        const { offset: e } = this._config;
        return typeof e == "string"
          ? e.split(",").map((t) => Number.parseInt(t, 10))
          : typeof e == "function"
            ? (t) => e(t, this._element)
            : e;
      }
      _getPopperConfig() {
        const e = {
          placement: this._getPlacement(),
          modifiers: [
            {
              name: "preventOverflow",
              options: { boundary: this._config.boundary },
            },
            { name: "offset", options: { offset: this._getOffset() } },
          ],
        };
        return (
          (this._inNavbar || this._config.display === "static") &&
            (se.setDataAttribute(this._menu, "popper", "static"),
            (e.modifiers = [{ name: "applyStyles", enabled: !1 }])),
          { ...e, ...z(this._config.popperConfig, [e]) }
        );
      }
      _selectMenuItem({ key: e, target: t }) {
        const s = C.find(
          ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
          this._menu,
        ).filter((i) => S(i));
        s.length && fe(s, t, e === Cs, !s.includes(t)).focus();
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = Ce.getOrCreateInstance(this, e);
          if (typeof e == "string") {
            if (t[e] === void 0) throw new TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
      static clearMenus(e) {
        if (e.button === 2 || (e.type === "keyup" && e.key !== "Tab")) return;
        const t = C.find(ro);
        for (const s of t) {
          const i = Ce.getInstance(s);
          if (!i || i._config.autoClose === !1) continue;
          const o = e.composedPath(),
            r = o.includes(i._menu);
          if (
            o.includes(i._element) ||
            (i._config.autoClose === "inside" && !r) ||
            (i._config.autoClose === "outside" && r) ||
            (i._menu.contains(e.target) &&
              ((e.type === "keyup" && e.key === "Tab") ||
                /input|select|option|textarea|form/i.test(e.target.tagName)))
          )
            continue;
          const u = { relatedTarget: i._element };
          e.type === "click" && (u.clickEvent = e), i._completeHide(u);
        }
      }
      static dataApiKeydownHandler(e) {
        const t = /input|textarea/i.test(e.target.tagName),
          s = e.key === "Escape",
          i = [eo, Cs].includes(e.key);
        if ((!i && !s) || (t && !s)) return;
        e.preventDefault();
        const o = this.matches(Ge)
            ? this
            : C.prev(this, Ge)[0] ||
              C.next(this, Ge)[0] ||
              C.findOne(Ge, e.delegateTarget.parentNode),
          r = Ce.getOrCreateInstance(o);
        if (i) return e.stopPropagation(), r.show(), void r._selectMenuItem(e);
        r._isShown() && (e.stopPropagation(), r.hide(), o.focus());
      }
    }
    d.on(document, xs, Ge, Ce.dataApiKeydownHandler),
      d.on(document, xs, Vt, Ce.dataApiKeydownHandler),
      d.on(document, Ls, Ce.clearMenus),
      d.on(document, oo, Ce.clearMenus),
      d.on(document, Ls, Ge, function (n) {
        n.preventDefault(), Ce.getOrCreateInstance(this).toggle();
      }),
      V(Ce);
    const Ts = "backdrop",
      As = "show",
      ks = `mousedown.bs.${Ts}`,
      go = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: !1,
        isVisible: !0,
        rootElement: "body",
      },
      bo = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)",
      };
    class Ss extends Ee {
      constructor(e) {
        super(),
          (this._config = this._getConfig(e)),
          (this._isAppended = !1),
          (this._element = null);
      }
      static get Default() {
        return go;
      }
      static get DefaultType() {
        return bo;
      }
      static get NAME() {
        return Ts;
      }
      show(e) {
        if (!this._config.isVisible) return void z(e);
        this._append();
        const t = this._getElement();
        this._config.isAnimated && W(t),
          t.classList.add(As),
          this._emulateAnimation(() => {
            z(e);
          });
      }
      hide(e) {
        this._config.isVisible
          ? (this._getElement().classList.remove(As),
            this._emulateAnimation(() => {
              this.dispose(), z(e);
            }))
          : z(e);
      }
      dispose() {
        this._isAppended &&
          (d.off(this._element, ks),
          this._element.remove(),
          (this._isAppended = !1));
      }
      _getElement() {
        if (!this._element) {
          const e = document.createElement("div");
          (e.className = this._config.className),
            this._config.isAnimated && e.classList.add("fade"),
            (this._element = e);
        }
        return this._element;
      }
      _configAfterMerge(e) {
        return (e.rootElement = E(e.rootElement)), e;
      }
      _append() {
        if (this._isAppended) return;
        const e = this._getElement();
        this._config.rootElement.append(e),
          d.on(e, ks, () => {
            z(this._config.clickCallback);
          }),
          (this._isAppended = !0);
      }
      _emulateAnimation(e) {
        ce(e, this._getElement(), this._config.isAnimated);
      }
    }
    const Kt = ".bs.focustrap",
      _o = `focusin${Kt}`,
      yo = `keydown.tab${Kt}`,
      Os = "backward",
      vo = { autofocus: !0, trapElement: null },
      wo = { autofocus: "boolean", trapElement: "element" };
    class Ps extends Ee {
      constructor(e) {
        super(),
          (this._config = this._getConfig(e)),
          (this._isActive = !1),
          (this._lastTabNavDirection = null);
      }
      static get Default() {
        return vo;
      }
      static get DefaultType() {
        return wo;
      }
      static get NAME() {
        return "focustrap";
      }
      activate() {
        this._isActive ||
          (this._config.autofocus && this._config.trapElement.focus(),
          d.off(document, Kt),
          d.on(document, _o, (e) => this._handleFocusin(e)),
          d.on(document, yo, (e) => this._handleKeydown(e)),
          (this._isActive = !0));
      }
      deactivate() {
        this._isActive && ((this._isActive = !1), d.off(document, Kt));
      }
      _handleFocusin(e) {
        const { trapElement: t } = this._config;
        if (e.target === document || e.target === t || t.contains(e.target))
          return;
        const s = C.focusableChildren(t);
        s.length === 0
          ? t.focus()
          : this._lastTabNavDirection === Os
            ? s[s.length - 1].focus()
            : s[0].focus();
      }
      _handleKeydown(e) {
        e.key === "Tab" &&
          (this._lastTabNavDirection = e.shiftKey ? Os : "forward");
      }
    }
    const $s = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      Ds = ".sticky-top",
      Yt = "padding-right",
      Is = "margin-right";
    class Tn {
      constructor() {
        this._element = document.body;
      }
      getWidth() {
        const e = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - e);
      }
      hide() {
        const e = this.getWidth();
        this._disableOverFlow(),
          this._setElementAttributes(this._element, Yt, (t) => t + e),
          this._setElementAttributes($s, Yt, (t) => t + e),
          this._setElementAttributes(Ds, Is, (t) => t - e);
      }
      reset() {
        this._resetElementAttributes(this._element, "overflow"),
          this._resetElementAttributes(this._element, Yt),
          this._resetElementAttributes($s, Yt),
          this._resetElementAttributes(Ds, Is);
      }
      isOverflowing() {
        return this.getWidth() > 0;
      }
      _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"),
          (this._element.style.overflow = "hidden");
      }
      _setElementAttributes(e, t, s) {
        const i = this.getWidth();
        this._applyManipulationCallback(e, (o) => {
          if (o !== this._element && window.innerWidth > o.clientWidth + i)
            return;
          this._saveInitialAttribute(o, t);
          const r = window.getComputedStyle(o).getPropertyValue(t);
          o.style.setProperty(t, `${s(Number.parseFloat(r))}px`);
        });
      }
      _saveInitialAttribute(e, t) {
        const s = e.style.getPropertyValue(t);
        s && se.setDataAttribute(e, t, s);
      }
      _resetElementAttributes(e, t) {
        this._applyManipulationCallback(e, (s) => {
          const i = se.getDataAttribute(s, t);
          i !== null
            ? (se.removeDataAttribute(s, t), s.style.setProperty(t, i))
            : s.style.removeProperty(t);
        });
      }
      _applyManipulationCallback(e, t) {
        if (v(e)) t(e);
        else for (const s of C.find(e, this._element)) t(s);
      }
    }
    const be = ".bs.modal",
      Eo = `hide${be}`,
      Co = `hidePrevented${be}`,
      Ms = `hidden${be}`,
      js = `show${be}`,
      Lo = `shown${be}`,
      xo = `resize${be}`,
      To = `click.dismiss${be}`,
      Ao = `mousedown.dismiss${be}`,
      ko = `keydown.dismiss${be}`,
      So = `click${be}.data-api`,
      Bs = "modal-open",
      Ns = "show",
      An = "modal-static",
      Oo = { backdrop: !0, focus: !0, keyboard: !0 },
      Po = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean",
      };
    class Je extends J {
      constructor(e, t) {
        super(e, t),
          (this._dialog = C.findOne(".modal-dialog", this._element)),
          (this._backdrop = this._initializeBackDrop()),
          (this._focustrap = this._initializeFocusTrap()),
          (this._isShown = !1),
          (this._isTransitioning = !1),
          (this._scrollBar = new Tn()),
          this._addEventListeners();
      }
      static get Default() {
        return Oo;
      }
      static get DefaultType() {
        return Po;
      }
      static get NAME() {
        return "modal";
      }
      toggle(e) {
        return this._isShown ? this.hide() : this.show(e);
      }
      show(e) {
        this._isShown ||
          this._isTransitioning ||
          d.trigger(this._element, js, { relatedTarget: e }).defaultPrevented ||
          ((this._isShown = !0),
          (this._isTransitioning = !0),
          this._scrollBar.hide(),
          document.body.classList.add(Bs),
          this._adjustDialog(),
          this._backdrop.show(() => this._showElement(e)));
      }
      hide() {
        this._isShown &&
          !this._isTransitioning &&
          (d.trigger(this._element, Eo).defaultPrevented ||
            ((this._isShown = !1),
            (this._isTransitioning = !0),
            this._focustrap.deactivate(),
            this._element.classList.remove(Ns),
            this._queueCallback(
              () => this._hideModal(),
              this._element,
              this._isAnimated(),
            )));
      }
      dispose() {
        d.off(window, be),
          d.off(this._dialog, be),
          this._backdrop.dispose(),
          this._focustrap.deactivate(),
          super.dispose();
      }
      handleUpdate() {
        this._adjustDialog();
      }
      _initializeBackDrop() {
        return new Ss({
          isVisible: !!this._config.backdrop,
          isAnimated: this._isAnimated(),
        });
      }
      _initializeFocusTrap() {
        return new Ps({ trapElement: this._element });
      }
      _showElement(e) {
        document.body.contains(this._element) ||
          document.body.append(this._element),
          (this._element.style.display = "block"),
          this._element.removeAttribute("aria-hidden"),
          this._element.setAttribute("aria-modal", !0),
          this._element.setAttribute("role", "dialog"),
          (this._element.scrollTop = 0);
        const t = C.findOne(".modal-body", this._dialog);
        t && (t.scrollTop = 0),
          W(this._element),
          this._element.classList.add(Ns),
          this._queueCallback(
            () => {
              this._config.focus && this._focustrap.activate(),
                (this._isTransitioning = !1),
                d.trigger(this._element, Lo, { relatedTarget: e });
            },
            this._dialog,
            this._isAnimated(),
          );
      }
      _addEventListeners() {
        d.on(this._element, ko, (e) => {
          e.key === "Escape" &&
            (this._config.keyboard
              ? this.hide()
              : this._triggerBackdropTransition());
        }),
          d.on(window, xo, () => {
            this._isShown && !this._isTransitioning && this._adjustDialog();
          }),
          d.on(this._element, Ao, (e) => {
            d.one(this._element, To, (t) => {
              this._element === e.target &&
                this._element === t.target &&
                (this._config.backdrop !== "static"
                  ? this._config.backdrop && this.hide()
                  : this._triggerBackdropTransition());
            });
          });
      }
      _hideModal() {
        (this._element.style.display = "none"),
          this._element.setAttribute("aria-hidden", !0),
          this._element.removeAttribute("aria-modal"),
          this._element.removeAttribute("role"),
          (this._isTransitioning = !1),
          this._backdrop.hide(() => {
            document.body.classList.remove(Bs),
              this._resetAdjustments(),
              this._scrollBar.reset(),
              d.trigger(this._element, Ms);
          });
      }
      _isAnimated() {
        return this._element.classList.contains("fade");
      }
      _triggerBackdropTransition() {
        if (d.trigger(this._element, Co).defaultPrevented) return;
        const e =
            this._element.scrollHeight > document.documentElement.clientHeight,
          t = this._element.style.overflowY;
        t === "hidden" ||
          this._element.classList.contains(An) ||
          (e || (this._element.style.overflowY = "hidden"),
          this._element.classList.add(An),
          this._queueCallback(() => {
            this._element.classList.remove(An),
              this._queueCallback(() => {
                this._element.style.overflowY = t;
              }, this._dialog);
          }, this._dialog),
          this._element.focus());
      }
      _adjustDialog() {
        const e =
            this._element.scrollHeight > document.documentElement.clientHeight,
          t = this._scrollBar.getWidth(),
          s = t > 0;
        if (s && !e) {
          const i = U() ? "paddingLeft" : "paddingRight";
          this._element.style[i] = `${t}px`;
        }
        if (!s && e) {
          const i = U() ? "paddingRight" : "paddingLeft";
          this._element.style[i] = `${t}px`;
        }
      }
      _resetAdjustments() {
        (this._element.style.paddingLeft = ""),
          (this._element.style.paddingRight = "");
      }
      static jQueryInterface(e, t) {
        return this.each(function () {
          const s = Je.getOrCreateInstance(this, e);
          if (typeof e == "string") {
            if (s[e] === void 0) throw new TypeError(`No method named "${e}"`);
            s[e](t);
          }
        });
      }
    }
    d.on(document, So, '[data-bs-toggle="modal"]', function (n) {
      const e = C.getElementFromSelector(this);
      ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
        d.one(e, js, (s) => {
          s.defaultPrevented ||
            d.one(e, Ms, () => {
              S(this) && this.focus();
            });
        });
      const t = C.findOne(".modal.show");
      t && Je.getInstance(t).hide(), Je.getOrCreateInstance(e).toggle(this);
    }),
      Re(Je),
      V(Je);
    const Me = ".bs.offcanvas",
      Rs = ".data-api",
      $o = `load${Me}${Rs}`,
      Fs = "show",
      Hs = "showing",
      qs = "hiding",
      Us = ".offcanvas.show",
      Do = `show${Me}`,
      Io = `shown${Me}`,
      Mo = `hide${Me}`,
      zs = `hidePrevented${Me}`,
      Ws = `hidden${Me}`,
      jo = `resize${Me}`,
      Bo = `click${Me}${Rs}`,
      No = `keydown.dismiss${Me}`,
      Ro = { backdrop: !0, keyboard: !0, scroll: !1 },
      Fo = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean",
      };
    class je extends J {
      constructor(e, t) {
        super(e, t),
          (this._isShown = !1),
          (this._backdrop = this._initializeBackDrop()),
          (this._focustrap = this._initializeFocusTrap()),
          this._addEventListeners();
      }
      static get Default() {
        return Ro;
      }
      static get DefaultType() {
        return Fo;
      }
      static get NAME() {
        return "offcanvas";
      }
      toggle(e) {
        return this._isShown ? this.hide() : this.show(e);
      }
      show(e) {
        this._isShown ||
          d.trigger(this._element, Do, { relatedTarget: e }).defaultPrevented ||
          ((this._isShown = !0),
          this._backdrop.show(),
          this._config.scroll || new Tn().hide(),
          this._element.setAttribute("aria-modal", !0),
          this._element.setAttribute("role", "dialog"),
          this._element.classList.add(Hs),
          this._queueCallback(
            () => {
              (this._config.scroll && !this._config.backdrop) ||
                this._focustrap.activate(),
                this._element.classList.add(Fs),
                this._element.classList.remove(Hs),
                d.trigger(this._element, Io, { relatedTarget: e });
            },
            this._element,
            !0,
          ));
      }
      hide() {
        this._isShown &&
          (d.trigger(this._element, Mo).defaultPrevented ||
            (this._focustrap.deactivate(),
            this._element.blur(),
            (this._isShown = !1),
            this._element.classList.add(qs),
            this._backdrop.hide(),
            this._queueCallback(
              () => {
                this._element.classList.remove(Fs, qs),
                  this._element.removeAttribute("aria-modal"),
                  this._element.removeAttribute("role"),
                  this._config.scroll || new Tn().reset(),
                  d.trigger(this._element, Ws);
              },
              this._element,
              !0,
            )));
      }
      dispose() {
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
      }
      _initializeBackDrop() {
        const e = !!this._config.backdrop;
        return new Ss({
          className: "offcanvas-backdrop",
          isVisible: e,
          isAnimated: !0,
          rootElement: this._element.parentNode,
          clickCallback: e
            ? () => {
                this._config.backdrop !== "static"
                  ? this.hide()
                  : d.trigger(this._element, zs);
              }
            : null,
        });
      }
      _initializeFocusTrap() {
        return new Ps({ trapElement: this._element });
      }
      _addEventListeners() {
        d.on(this._element, No, (e) => {
          e.key === "Escape" &&
            (this._config.keyboard
              ? this.hide()
              : d.trigger(this._element, zs));
        });
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = je.getOrCreateInstance(this, e);
          if (typeof e == "string") {
            if (t[e] === void 0 || e.startsWith("_") || e === "constructor")
              throw new TypeError(`No method named "${e}"`);
            t[e](this);
          }
        });
      }
    }
    d.on(document, Bo, '[data-bs-toggle="offcanvas"]', function (n) {
      const e = C.getElementFromSelector(this);
      if ((["A", "AREA"].includes(this.tagName) && n.preventDefault(), f(this)))
        return;
      d.one(e, Ws, () => {
        S(this) && this.focus();
      });
      const t = C.findOne(Us);
      t && t !== e && je.getInstance(t).hide(),
        je.getOrCreateInstance(e).toggle(this);
    }),
      d.on(window, $o, () => {
        for (const n of C.find(Us)) je.getOrCreateInstance(n).show();
      }),
      d.on(window, jo, () => {
        for (const n of C.find("[aria-modal][class*=show][class*=offcanvas-]"))
          getComputedStyle(n).position !== "fixed" &&
            je.getOrCreateInstance(n).hide();
      }),
      Re(je),
      V(je);
    const Vs = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        dd: [],
        div: [],
        dl: [],
        dt: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      Ho = new Set([
        "background",
        "cite",
        "href",
        "itemtype",
        "longdesc",
        "poster",
        "src",
        "xlink:href",
      ]),
      qo = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
      Uo = (n, e) => {
        const t = n.nodeName.toLowerCase();
        return e.includes(t)
          ? !Ho.has(t) || !!qo.test(n.nodeValue)
          : e.filter((s) => s instanceof RegExp).some((s) => s.test(t));
      },
      zo = {
        allowList: Vs,
        content: {},
        extraClass: "",
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: "<div></div>",
      },
      Wo = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string",
      },
      Vo = {
        entry: "(string|element|function|null)",
        selector: "(string|element)",
      };
    class Ko extends Ee {
      constructor(e) {
        super(), (this._config = this._getConfig(e));
      }
      static get Default() {
        return zo;
      }
      static get DefaultType() {
        return Wo;
      }
      static get NAME() {
        return "TemplateFactory";
      }
      getContent() {
        return Object.values(this._config.content)
          .map((e) => this._resolvePossibleFunction(e))
          .filter(Boolean);
      }
      hasContent() {
        return this.getContent().length > 0;
      }
      changeContent(e) {
        return (
          this._checkContent(e),
          (this._config.content = { ...this._config.content, ...e }),
          this
        );
      }
      toHtml() {
        const e = document.createElement("div");
        e.innerHTML = this._maybeSanitize(this._config.template);
        for (const [i, o] of Object.entries(this._config.content))
          this._setContent(e, o, i);
        const t = e.children[0],
          s = this._resolvePossibleFunction(this._config.extraClass);
        return s && t.classList.add(...s.split(" ")), t;
      }
      _typeCheckConfig(e) {
        super._typeCheckConfig(e), this._checkContent(e.content);
      }
      _checkContent(e) {
        for (const [t, s] of Object.entries(e))
          super._typeCheckConfig({ selector: t, entry: s }, Vo);
      }
      _setContent(e, t, s) {
        const i = C.findOne(s, e);
        i &&
          ((t = this._resolvePossibleFunction(t))
            ? v(t)
              ? this._putElementInTemplate(E(t), i)
              : this._config.html
                ? (i.innerHTML = this._maybeSanitize(t))
                : (i.textContent = t)
            : i.remove());
      }
      _maybeSanitize(e) {
        return this._config.sanitize
          ? (function (t, s, i) {
              if (!t.length) return t;
              if (i && typeof i == "function") return i(t);
              const o = new window.DOMParser().parseFromString(t, "text/html"),
                r = [].concat(...o.body.querySelectorAll("*"));
              for (const u of r) {
                const p = u.nodeName.toLowerCase();
                if (!Object.keys(s).includes(p)) {
                  u.remove();
                  continue;
                }
                const _ = [].concat(...u.attributes),
                  y = [].concat(s["*"] || [], s[p] || []);
                for (const b of _) Uo(b, y) || u.removeAttribute(b.nodeName);
              }
              return o.body.innerHTML;
            })(e, this._config.allowList, this._config.sanitizeFn)
          : e;
      }
      _resolvePossibleFunction(e) {
        return z(e, [this]);
      }
      _putElementInTemplate(e, t) {
        if (this._config.html) return (t.innerHTML = ""), void t.append(e);
        t.textContent = e.textContent;
      }
    }
    const Yo = new Set(["sanitize", "allowList", "sanitizeFn"]),
      kn = "fade",
      Xt = "show",
      Ks = ".modal",
      Ys = "hide.bs.modal",
      Pt = "hover",
      Sn = "focus",
      Xo = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: U() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: U() ? "right" : "left",
      },
      Qo = {
        allowList: Vs,
        animation: !0,
        boundary: "clippingParents",
        container: !1,
        customClass: "",
        delay: 0,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        html: !1,
        offset: [0, 6],
        placement: "top",
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: "",
        trigger: "hover focus",
      },
      Go = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
      };
    class Ze extends J {
      constructor(e, t) {
        if (ws === void 0)
          throw new TypeError(
            "Bootstrap's tooltips require Popper (https://popper.js.org)",
          );
        super(e, t),
          (this._isEnabled = !0),
          (this._timeout = 0),
          (this._isHovered = null),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this._templateFactory = null),
          (this._newContent = null),
          (this.tip = null),
          this._setListeners(),
          this._config.selector || this._fixTitle();
      }
      static get Default() {
        return Qo;
      }
      static get DefaultType() {
        return Go;
      }
      static get NAME() {
        return "tooltip";
      }
      enable() {
        this._isEnabled = !0;
      }
      disable() {
        this._isEnabled = !1;
      }
      toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
      toggle() {
        this._isEnabled &&
          ((this._activeTrigger.click = !this._activeTrigger.click),
          this._isShown() ? this._leave() : this._enter());
      }
      dispose() {
        clearTimeout(this._timeout),
          d.off(this._element.closest(Ks), Ys, this._hideModalHandler),
          this._element.getAttribute("data-bs-original-title") &&
            this._element.setAttribute(
              "title",
              this._element.getAttribute("data-bs-original-title"),
            ),
          this._disposePopper(),
          super.dispose();
      }
      show() {
        if (this._element.style.display === "none")
          throw new Error("Please use show on visible elements");
        if (!this._isWithContent() || !this._isEnabled) return;
        const e = d.trigger(this._element, this.constructor.eventName("show")),
          t = (
            w(this._element) || this._element.ownerDocument.documentElement
          ).contains(this._element);
        if (e.defaultPrevented || !t) return;
        this._disposePopper();
        const s = this._getTipElement();
        this._element.setAttribute("aria-describedby", s.getAttribute("id"));
        const { container: i } = this._config;
        if (
          (this._element.ownerDocument.documentElement.contains(this.tip) ||
            (i.append(s),
            d.trigger(this._element, this.constructor.eventName("inserted"))),
          (this._popper = this._createPopper(s)),
          s.classList.add(Xt),
          "ontouchstart" in document.documentElement)
        )
          for (const o of [].concat(...document.body.children))
            d.on(o, "mouseover", P);
        this._queueCallback(
          () => {
            d.trigger(this._element, this.constructor.eventName("shown")),
              this._isHovered === !1 && this._leave(),
              (this._isHovered = !1);
          },
          this.tip,
          this._isAnimated(),
        );
      }
      hide() {
        if (
          this._isShown() &&
          !d.trigger(this._element, this.constructor.eventName("hide"))
            .defaultPrevented
        ) {
          if (
            (this._getTipElement().classList.remove(Xt),
            "ontouchstart" in document.documentElement)
          )
            for (const e of [].concat(...document.body.children))
              d.off(e, "mouseover", P);
          (this._activeTrigger.click = !1),
            (this._activeTrigger[Sn] = !1),
            (this._activeTrigger[Pt] = !1),
            (this._isHovered = null),
            this._queueCallback(
              () => {
                this._isWithActiveTrigger() ||
                  (this._isHovered || this._disposePopper(),
                  this._element.removeAttribute("aria-describedby"),
                  d.trigger(
                    this._element,
                    this.constructor.eventName("hidden"),
                  ));
              },
              this.tip,
              this._isAnimated(),
            );
        }
      }
      update() {
        this._popper && this._popper.update();
      }
      _isWithContent() {
        return !!this._getTitle();
      }
      _getTipElement() {
        return (
          this.tip ||
            (this.tip = this._createTipElement(
              this._newContent || this._getContentForTemplate(),
            )),
          this.tip
        );
      }
      _createTipElement(e) {
        const t = this._getTemplateFactory(e).toHtml();
        if (!t) return null;
        t.classList.remove(kn, Xt),
          t.classList.add(`bs-${this.constructor.NAME}-auto`);
        const s = ((i) => {
          do i += Math.floor(1e6 * Math.random());
          while (document.getElementById(i));
          return i;
        })(this.constructor.NAME).toString();
        return (
          t.setAttribute("id", s), this._isAnimated() && t.classList.add(kn), t
        );
      }
      setContent(e) {
        (this._newContent = e),
          this._isShown() && (this._disposePopper(), this.show());
      }
      _getTemplateFactory(e) {
        return (
          this._templateFactory
            ? this._templateFactory.changeContent(e)
            : (this._templateFactory = new Ko({
                ...this._config,
                content: e,
                extraClass: this._resolvePossibleFunction(
                  this._config.customClass,
                ),
              })),
          this._templateFactory
        );
      }
      _getContentForTemplate() {
        return { ".tooltip-inner": this._getTitle() };
      }
      _getTitle() {
        return (
          this._resolvePossibleFunction(this._config.title) ||
          this._element.getAttribute("data-bs-original-title")
        );
      }
      _initializeOnDelegatedTarget(e) {
        return this.constructor.getOrCreateInstance(
          e.delegateTarget,
          this._getDelegateConfig(),
        );
      }
      _isAnimated() {
        return (
          this._config.animation ||
          (this.tip && this.tip.classList.contains(kn))
        );
      }
      _isShown() {
        return this.tip && this.tip.classList.contains(Xt);
      }
      _createPopper(e) {
        const t = z(this._config.placement, [this, e, this._element]),
          s = Xo[t.toUpperCase()];
        return Ln(this._element, e, this._getPopperConfig(s));
      }
      _getOffset() {
        const { offset: e } = this._config;
        return typeof e == "string"
          ? e.split(",").map((t) => Number.parseInt(t, 10))
          : typeof e == "function"
            ? (t) => e(t, this._element)
            : e;
      }
      _resolvePossibleFunction(e) {
        return z(e, [this._element]);
      }
      _getPopperConfig(e) {
        const t = {
          placement: e,
          modifiers: [
            {
              name: "flip",
              options: { fallbackPlacements: this._config.fallbackPlacements },
            },
            { name: "offset", options: { offset: this._getOffset() } },
            {
              name: "preventOverflow",
              options: { boundary: this._config.boundary },
            },
            {
              name: "arrow",
              options: { element: `.${this.constructor.NAME}-arrow` },
            },
            {
              name: "preSetPlacement",
              enabled: !0,
              phase: "beforeMain",
              fn: (s) => {
                this._getTipElement().setAttribute(
                  "data-popper-placement",
                  s.state.placement,
                );
              },
            },
          ],
        };
        return { ...t, ...z(this._config.popperConfig, [t]) };
      }
      _setListeners() {
        const e = this._config.trigger.split(" ");
        for (const t of e)
          if (t === "click")
            d.on(
              this._element,
              this.constructor.eventName("click"),
              this._config.selector,
              (s) => {
                this._initializeOnDelegatedTarget(s).toggle();
              },
            );
          else if (t !== "manual") {
            const s =
                t === Pt
                  ? this.constructor.eventName("mouseenter")
                  : this.constructor.eventName("focusin"),
              i =
                t === Pt
                  ? this.constructor.eventName("mouseleave")
                  : this.constructor.eventName("focusout");
            d.on(this._element, s, this._config.selector, (o) => {
              const r = this._initializeOnDelegatedTarget(o);
              (r._activeTrigger[o.type === "focusin" ? Sn : Pt] = !0),
                r._enter();
            }),
              d.on(this._element, i, this._config.selector, (o) => {
                const r = this._initializeOnDelegatedTarget(o);
                (r._activeTrigger[o.type === "focusout" ? Sn : Pt] =
                  r._element.contains(o.relatedTarget)),
                  r._leave();
              });
          }
        (this._hideModalHandler = () => {
          this._element && this.hide();
        }),
          d.on(this._element.closest(Ks), Ys, this._hideModalHandler);
      }
      _fixTitle() {
        const e = this._element.getAttribute("title");
        e &&
          (this._element.getAttribute("aria-label") ||
            this._element.textContent.trim() ||
            this._element.setAttribute("aria-label", e),
          this._element.setAttribute("data-bs-original-title", e),
          this._element.removeAttribute("title"));
      }
      _enter() {
        this._isShown() || this._isHovered
          ? (this._isHovered = !0)
          : ((this._isHovered = !0),
            this._setTimeout(() => {
              this._isHovered && this.show();
            }, this._config.delay.show));
      }
      _leave() {
        this._isWithActiveTrigger() ||
          ((this._isHovered = !1),
          this._setTimeout(() => {
            this._isHovered || this.hide();
          }, this._config.delay.hide));
      }
      _setTimeout(e, t) {
        clearTimeout(this._timeout), (this._timeout = setTimeout(e, t));
      }
      _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0);
      }
      _getConfig(e) {
        const t = se.getDataAttributes(this._element);
        for (const s of Object.keys(t)) Yo.has(s) && delete t[s];
        return (
          (e = { ...t, ...(typeof e == "object" && e ? e : {}) }),
          (e = this._mergeConfigObj(e)),
          (e = this._configAfterMerge(e)),
          this._typeCheckConfig(e),
          e
        );
      }
      _configAfterMerge(e) {
        return (
          (e.container = e.container === !1 ? document.body : E(e.container)),
          typeof e.delay == "number" &&
            (e.delay = { show: e.delay, hide: e.delay }),
          typeof e.title == "number" && (e.title = e.title.toString()),
          typeof e.content == "number" && (e.content = e.content.toString()),
          e
        );
      }
      _getDelegateConfig() {
        const e = {};
        for (const [t, s] of Object.entries(this._config))
          this.constructor.Default[t] !== s && (e[t] = s);
        return (e.selector = !1), (e.trigger = "manual"), e;
      }
      _disposePopper() {
        this._popper && (this._popper.destroy(), (this._popper = null)),
          this.tip && (this.tip.remove(), (this.tip = null));
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = Ze.getOrCreateInstance(this, e);
          if (typeof e == "string") {
            if (t[e] === void 0) throw new TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    V(Ze);
    const Jo = {
        ...Ze.Default,
        content: "",
        offset: [0, 8],
        placement: "right",
        template:
          '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        trigger: "click",
      },
      Zo = { ...Ze.DefaultType, content: "(null|string|element|function)" };
    class Qt extends Ze {
      static get Default() {
        return Jo;
      }
      static get DefaultType() {
        return Zo;
      }
      static get NAME() {
        return "popover";
      }
      _isWithContent() {
        return this._getTitle() || this._getContent();
      }
      _getContentForTemplate() {
        return {
          ".popover-header": this._getTitle(),
          ".popover-body": this._getContent(),
        };
      }
      _getContent() {
        return this._resolvePossibleFunction(this._config.content);
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = Qt.getOrCreateInstance(this, e);
          if (typeof e == "string") {
            if (t[e] === void 0) throw new TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    V(Qt);
    const On = ".bs.scrollspy",
      er = `activate${On}`,
      Xs = `click${On}`,
      tr = `load${On}.data-api`,
      vt = "active",
      Pn = "[href]",
      Qs = ".nav-link",
      nr = `${Qs}, .nav-item > ${Qs}, .list-group-item`,
      sr = {
        offset: null,
        rootMargin: "0px 0px -25%",
        smoothScroll: !1,
        target: null,
        threshold: [0.1, 0.5, 1],
      },
      ir = {
        offset: "(number|null)",
        rootMargin: "string",
        smoothScroll: "boolean",
        target: "element",
        threshold: "array",
      };
    class $t extends J {
      constructor(e, t) {
        super(e, t),
          (this._targetLinks = new Map()),
          (this._observableSections = new Map()),
          (this._rootElement =
            getComputedStyle(this._element).overflowY === "visible"
              ? null
              : this._element),
          (this._activeTarget = null),
          (this._observer = null),
          (this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0,
          }),
          this.refresh();
      }
      static get Default() {
        return sr;
      }
      static get DefaultType() {
        return ir;
      }
      static get NAME() {
        return "scrollspy";
      }
      refresh() {
        this._initializeTargetsAndObservables(),
          this._maybeEnableSmoothScroll(),
          this._observer
            ? this._observer.disconnect()
            : (this._observer = this._getNewObserver());
        for (const e of this._observableSections.values())
          this._observer.observe(e);
      }
      dispose() {
        this._observer.disconnect(), super.dispose();
      }
      _configAfterMerge(e) {
        return (
          (e.target = E(e.target) || document.body),
          (e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin),
          typeof e.threshold == "string" &&
            (e.threshold = e.threshold
              .split(",")
              .map((t) => Number.parseFloat(t))),
          e
        );
      }
      _maybeEnableSmoothScroll() {
        this._config.smoothScroll &&
          (d.off(this._config.target, Xs),
          d.on(this._config.target, Xs, Pn, (e) => {
            const t = this._observableSections.get(e.target.hash);
            if (t) {
              e.preventDefault();
              const s = this._rootElement || window,
                i = t.offsetTop - this._element.offsetTop;
              if (s.scrollTo)
                return void s.scrollTo({ top: i, behavior: "smooth" });
              s.scrollTop = i;
            }
          }));
      }
      _getNewObserver() {
        const e = {
          root: this._rootElement,
          threshold: this._config.threshold,
          rootMargin: this._config.rootMargin,
        };
        return new IntersectionObserver((t) => this._observerCallback(t), e);
      }
      _observerCallback(e) {
        const t = (r) => this._targetLinks.get(`#${r.target.id}`),
          s = (r) => {
            (this._previousScrollData.visibleEntryTop = r.target.offsetTop),
              this._process(t(r));
          },
          i = (this._rootElement || document.documentElement).scrollTop,
          o = i >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = i;
        for (const r of e) {
          if (!r.isIntersecting) {
            (this._activeTarget = null), this._clearActiveClass(t(r));
            continue;
          }
          const u =
            r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
          if (o && u) {
            if ((s(r), !i)) return;
          } else o || u || s(r);
        }
      }
      _initializeTargetsAndObservables() {
        (this._targetLinks = new Map()), (this._observableSections = new Map());
        const e = C.find(Pn, this._config.target);
        for (const t of e) {
          if (!t.hash || f(t)) continue;
          const s = C.findOne(decodeURI(t.hash), this._element);
          S(s) &&
            (this._targetLinks.set(decodeURI(t.hash), t),
            this._observableSections.set(t.hash, s));
        }
      }
      _process(e) {
        this._activeTarget !== e &&
          (this._clearActiveClass(this._config.target),
          (this._activeTarget = e),
          e.classList.add(vt),
          this._activateParents(e),
          d.trigger(this._element, er, { relatedTarget: e }));
      }
      _activateParents(e) {
        if (e.classList.contains("dropdown-item"))
          C.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(
            vt,
          );
        else
          for (const t of C.parents(e, ".nav, .list-group"))
            for (const s of C.prev(t, nr)) s.classList.add(vt);
      }
      _clearActiveClass(e) {
        e.classList.remove(vt);
        const t = C.find(`${Pn}.${vt}`, e);
        for (const s of t) s.classList.remove(vt);
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = $t.getOrCreateInstance(this, e);
          if (typeof e == "string") {
            if (t[e] === void 0 || e.startsWith("_") || e === "constructor")
              throw new TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    d.on(window, tr, () => {
      for (const n of C.find('[data-bs-spy="scroll"]'))
        $t.getOrCreateInstance(n);
    }),
      V($t);
    const et = ".bs.tab",
      or = `hide${et}`,
      rr = `hidden${et}`,
      ar = `show${et}`,
      lr = `shown${et}`,
      cr = `click${et}`,
      dr = `keydown${et}`,
      ur = `load${et}`,
      hr = "ArrowLeft",
      Gs = "ArrowRight",
      mr = "ArrowUp",
      Js = "ArrowDown",
      $n = "Home",
      Zs = "End",
      tt = "active",
      ei = "fade",
      Dn = "show",
      ti = ".dropdown-toggle",
      In = `:not(${ti})`,
      ni =
        '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
      Mn = `.nav-link${In}, .list-group-item${In}, [role="tab"]${In}, ${ni}`,
      pr = `.${tt}[data-bs-toggle="tab"], .${tt}[data-bs-toggle="pill"], .${tt}[data-bs-toggle="list"]`;
    class nt extends J {
      constructor(e) {
        super(e),
          (this._parent = this._element.closest(
            '.list-group, .nav, [role="tablist"]',
          )),
          this._parent &&
            (this._setInitialAttributes(this._parent, this._getChildren()),
            d.on(this._element, dr, (t) => this._keydown(t)));
      }
      static get NAME() {
        return "tab";
      }
      show() {
        const e = this._element;
        if (this._elemIsActive(e)) return;
        const t = this._getActiveElem(),
          s = t ? d.trigger(t, or, { relatedTarget: e }) : null;
        d.trigger(e, ar, { relatedTarget: t }).defaultPrevented ||
          (s && s.defaultPrevented) ||
          (this._deactivate(t, e), this._activate(e, t));
      }
      _activate(e, t) {
        e &&
          (e.classList.add(tt),
          this._activate(C.getElementFromSelector(e)),
          this._queueCallback(
            () => {
              e.getAttribute("role") === "tab"
                ? (e.removeAttribute("tabindex"),
                  e.setAttribute("aria-selected", !0),
                  this._toggleDropDown(e, !0),
                  d.trigger(e, lr, { relatedTarget: t }))
                : e.classList.add(Dn);
            },
            e,
            e.classList.contains(ei),
          ));
      }
      _deactivate(e, t) {
        e &&
          (e.classList.remove(tt),
          e.blur(),
          this._deactivate(C.getElementFromSelector(e)),
          this._queueCallback(
            () => {
              e.getAttribute("role") === "tab"
                ? (e.setAttribute("aria-selected", !1),
                  e.setAttribute("tabindex", "-1"),
                  this._toggleDropDown(e, !1),
                  d.trigger(e, rr, { relatedTarget: t }))
                : e.classList.remove(Dn);
            },
            e,
            e.classList.contains(ei),
          ));
      }
      _keydown(e) {
        if (![hr, Gs, mr, Js, $n, Zs].includes(e.key)) return;
        e.stopPropagation(), e.preventDefault();
        const t = this._getChildren().filter((i) => !f(i));
        let s;
        if ([$n, Zs].includes(e.key)) s = t[e.key === $n ? 0 : t.length - 1];
        else {
          const i = [Gs, Js].includes(e.key);
          s = fe(t, e.target, i, !0);
        }
        s && (s.focus({ preventScroll: !0 }), nt.getOrCreateInstance(s).show());
      }
      _getChildren() {
        return C.find(Mn, this._parent);
      }
      _getActiveElem() {
        return this._getChildren().find((e) => this._elemIsActive(e)) || null;
      }
      _setInitialAttributes(e, t) {
        this._setAttributeIfNotExists(e, "role", "tablist");
        for (const s of t) this._setInitialAttributesOnChild(s);
      }
      _setInitialAttributesOnChild(e) {
        e = this._getInnerElement(e);
        const t = this._elemIsActive(e),
          s = this._getOuterElement(e);
        e.setAttribute("aria-selected", t),
          s !== e && this._setAttributeIfNotExists(s, "role", "presentation"),
          t || e.setAttribute("tabindex", "-1"),
          this._setAttributeIfNotExists(e, "role", "tab"),
          this._setInitialAttributesOnTargetPanel(e);
      }
      _setInitialAttributesOnTargetPanel(e) {
        const t = C.getElementFromSelector(e);
        t &&
          (this._setAttributeIfNotExists(t, "role", "tabpanel"),
          e.id &&
            this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
      }
      _toggleDropDown(e, t) {
        const s = this._getOuterElement(e);
        if (!s.classList.contains("dropdown")) return;
        const i = (o, r) => {
          const u = C.findOne(o, s);
          u && u.classList.toggle(r, t);
        };
        i(ti, tt), i(".dropdown-menu", Dn), s.setAttribute("aria-expanded", t);
      }
      _setAttributeIfNotExists(e, t, s) {
        e.hasAttribute(t) || e.setAttribute(t, s);
      }
      _elemIsActive(e) {
        return e.classList.contains(tt);
      }
      _getInnerElement(e) {
        return e.matches(Mn) ? e : C.findOne(Mn, e);
      }
      _getOuterElement(e) {
        return e.closest(".nav-item, .list-group-item") || e;
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = nt.getOrCreateInstance(this);
          if (typeof e == "string") {
            if (t[e] === void 0 || e.startsWith("_") || e === "constructor")
              throw new TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    d.on(document, cr, ni, function (n) {
      ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
        f(this) || nt.getOrCreateInstance(this).show();
    }),
      d.on(window, ur, () => {
        for (const n of C.find(pr)) nt.getOrCreateInstance(n);
      }),
      V(nt);
    const qe = ".bs.toast",
      fr = `mouseover${qe}`,
      gr = `mouseout${qe}`,
      br = `focusin${qe}`,
      _r = `focusout${qe}`,
      yr = `hide${qe}`,
      vr = `hidden${qe}`,
      wr = `show${qe}`,
      Er = `shown${qe}`,
      si = "hide",
      Gt = "show",
      Jt = "showing",
      Cr = { animation: "boolean", autohide: "boolean", delay: "number" },
      Lr = { animation: !0, autohide: !0, delay: 5e3 };
    class Dt extends J {
      constructor(e, t) {
        super(e, t),
          (this._timeout = null),
          (this._hasMouseInteraction = !1),
          (this._hasKeyboardInteraction = !1),
          this._setListeners();
      }
      static get Default() {
        return Lr;
      }
      static get DefaultType() {
        return Cr;
      }
      static get NAME() {
        return "toast";
      }
      show() {
        d.trigger(this._element, wr).defaultPrevented ||
          (this._clearTimeout(),
          this._config.animation && this._element.classList.add("fade"),
          this._element.classList.remove(si),
          W(this._element),
          this._element.classList.add(Gt, Jt),
          this._queueCallback(
            () => {
              this._element.classList.remove(Jt),
                d.trigger(this._element, Er),
                this._maybeScheduleHide();
            },
            this._element,
            this._config.animation,
          ));
      }
      hide() {
        this.isShown() &&
          (d.trigger(this._element, yr).defaultPrevented ||
            (this._element.classList.add(Jt),
            this._queueCallback(
              () => {
                this._element.classList.add(si),
                  this._element.classList.remove(Jt, Gt),
                  d.trigger(this._element, vr);
              },
              this._element,
              this._config.animation,
            )));
      }
      dispose() {
        this._clearTimeout(),
          this.isShown() && this._element.classList.remove(Gt),
          super.dispose();
      }
      isShown() {
        return this._element.classList.contains(Gt);
      }
      _maybeScheduleHide() {
        this._config.autohide &&
          (this._hasMouseInteraction ||
            this._hasKeyboardInteraction ||
            (this._timeout = setTimeout(() => {
              this.hide();
            }, this._config.delay)));
      }
      _onInteraction(e, t) {
        switch (e.type) {
          case "mouseover":
          case "mouseout":
            this._hasMouseInteraction = t;
            break;
          case "focusin":
          case "focusout":
            this._hasKeyboardInteraction = t;
        }
        if (t) return void this._clearTimeout();
        const s = e.relatedTarget;
        this._element === s ||
          this._element.contains(s) ||
          this._maybeScheduleHide();
      }
      _setListeners() {
        d.on(this._element, fr, (e) => this._onInteraction(e, !0)),
          d.on(this._element, gr, (e) => this._onInteraction(e, !1)),
          d.on(this._element, br, (e) => this._onInteraction(e, !0)),
          d.on(this._element, _r, (e) => this._onInteraction(e, !1));
      }
      _clearTimeout() {
        clearTimeout(this._timeout), (this._timeout = null);
      }
      static jQueryInterface(e) {
        return this.each(function () {
          const t = Dt.getOrCreateInstance(this, e);
          if (typeof e == "string") {
            if (t[e] === void 0) throw new TypeError(`No method named "${e}"`);
            t[e](this);
          }
        });
      }
    }
    return (
      Re(Dt),
      V(Dt),
      {
        Alert: ot,
        Button: xt,
        Carousel: ct,
        Collapse: ut,
        Dropdown: Ce,
        Modal: Je,
        Offcanvas: je,
        Popover: Qt,
        ScrollSpy: $t,
        Tab: nt,
        Toast: Dt,
        Tooltip: Ze,
      }
    );
  });
})(Ir);
const Mr = "c8603e77-83d7-41ba-a742-4494007b8666",
  bi = "https://v2.api.noroff.dev";
function le(M) {
  const a = new Headers();
  return (
    a.append("X-Noroff-API-Key", Mr),
    localStorage.token &&
      a.append("Authorization", `Bearer ${localStorage.token}`),
    M && a.append("Content-Type", "application/json"),
    a
  );
}
class T {
  static get user() {
    try {
      return JSON.parse(localStorage.getItem("user")).name;
    } catch {
      return null;
    }
  }
  static set user(a) {
    localStorage.setItem("user", JSON.stringify(a));
  }
  static set token(a) {
    localStorage.setItem("token", a);
  }
  static apiBase = bi;
  static paths = {
    login: `${T.apiBase}/auth/login`,
    register: `${T.apiBase}/auth/register`,
    socialPost: `${T.apiBase}/social/posts`,
    socialProfiles: `${T.apiBase}/social/profiles`,
  };
  auth = {
    login: async ({ email: a, password: l }) => {
      const c = JSON.stringify({ email: a, password: l }),
        h = await fetch(T.paths.login, {
          headers: le(!0),
          method: "POST",
          body: c,
        }),
        { data: m } = await T.util.handleResponse(
          h,
          "Could not login this account",
        ),
        { accessToken: g, ...v } = m;
      return (
        (T.token = g),
        (T.user = v),
        (window.location.href = "/post/feed/?page=1"),
        m
      );
    },
    register: async ({ name: a, email: l, password: c }) => {
      const h = JSON.stringify({ name: a, email: l, password: c }),
        m = await fetch(T.paths.register, {
          headers: le(!0),
          method: "POST",
          body: h,
        });
      return await T.util.handleResponse(m, "Could not register this account");
    },
  };
  static util = {
    handleResponse: async (a, l, c = "json") => {
      if (a.ok) return a.status === 204 ? null : await a[c]();
      const m = (await a[c]()).errors[0]?.message || "Unknown error";
      throw new Error(`${l}: ${m}`);
    },
  };
  post = {
    create: async ({ title: a, body: l, tags: c, media: h }) => {
      const m = JSON.stringify({ title: a, body: l, tags: c, media: h }),
        g = await fetch(T.paths.socialPost, {
          headers: le(!0),
          method: "POST",
          body: m,
        }),
        v = await T.util.handleResponse(g, "Could not create post");
      return (window.location.href = "/post/feed/?page=1"), v;
    },
    delete: async (a) => {
      const l = await fetch(`${T.paths.socialPost}/${a}`, {
          headers: le(),
          method: "DELETE",
        }),
        c = await T.util.handleResponse(l, "Could not delete post.");
      return (
        alert("The post was deleted!"),
        (window.location.href = `/profile/?name=${T.user}`),
        c
      );
    },
    readPost: async (a, l = null) => {
      const c = new URL(`${T.paths.socialPost}/${a}`);
      c.searchParams.append("_author", !0),
        c.searchParams.append("_comments", !0),
        l && c.searchParams.append("_tag", l);
      const h = await fetch(c.toString(), { headers: le(), method: "GET" });
      return await T.util.handleResponse(h, "Could not get the post");
    },
    update: async (a, { title: l, body: c, tags: h, media: m }) => {
      const g = JSON.stringify({ title: l, body: c, tags: h, media: m }),
        v = await fetch(`${T.paths.socialPost}/${a}`, {
          headers: le(!0),
          method: "PUT",
          body: g,
        });
      await T.util.handleResponse(v, "Could not update post"),
        (window.location.href = `/post/?id=${a}`);
    },
    comment: async (a, { body: l, replyToId: c }) => {
      const h = { body: l };
      c !== void 0 && (h.replyToId = c);
      const m = JSON.stringify(h),
        g = await fetch(`${T.paths.socialPost}/${a}/comment`, {
          headers: le(!0),
          method: "POST",
          body: m,
        });
      return await T.util.handleResponse(g, "Could not comment on the post");
    },
    deleteComment: async (a, l) => {
      const c = await fetch(`${T.paths.socialPost}/${a}/comment/${l}`, {
          headers: le(),
          method: "DELETE",
        }),
        h = await T.util.handleResponse(c, "Could not delete comment.");
      return alert("The comment was deleted."), h;
    },
  };
  posts = {
    getPosts: async (a = 12, l = 1, c) => {
      const h = new URL(T.paths.socialPost);
      h.searchParams.append("limit", a),
        h.searchParams.append("page", l),
        h.searchParams.append("_author", !0),
        h.searchParams.append("_comments", !0),
        c && h.searchParams.append("_tag", c);
      const m = await fetch(h.toString(), { headers: le(), method: "GET" });
      return await T.util.handleResponse(m, "Could not get posts");
    },
    getAllPosts: async () => {
      const a = await fetch(T.paths.socialPost, {
        headers: le(),
        method: "GET",
      });
      return await T.util.handleResponse(a, "Could not get all posts");
    },
  };
  profile = {
    readUsersPosts: async (a, l = 12, c = 1) => {
      const h = new URL(`${T.paths.socialProfiles}/${a}/posts`);
      h.searchParams.append("_author", !0),
        h.searchParams.append("_comments", !0),
        h.searchParams.append("limit", l),
        h.searchParams.append("page", c);
      const m = await fetch(h.toString(), { headers: le(), method: "GET" });
      return await T.util.handleResponse(m, "Could not get user's post.");
    },
    readProfile: async function (l) {
      const c = await fetch(`${T.paths.socialProfiles}/${l}`, {
        headers: le(),
        method: "GET",
      });
      return await T.util.handleResponse(c, "Could not get profile.");
    },
    update: async (a, { bio: l, avatar: c, banner: h }) => {
      const m = JSON.stringify({ bio: l, avatar: c, banner: h }),
        g = await fetch(`${T.paths.socialProfiles}/${a}`, {
          headers: le(!0),
          method: "PUT",
          body: m,
        });
      await T.util.handleResponse(g, "Could not update profile."),
        (window.location.href = `/profile/?name=${a}`);
    },
    follow: async (a) => {
      const l = await fetch(`${T.paths.socialProfiles}/${a}/follow`, {
        headers: le(),
        method: "PUT",
      });
      return await T.util.handleResponse(l, "Could not follow the user.");
    },
    unfollow: async (a) => {
      const l = await fetch(`${T.paths.socialProfiles}/${a}/unfollow`, {
        headers: le(),
        method: "PUT",
      });
      return await T.util.handleResponse(l, "Could not unfollow the user.");
    },
  };
}
const Y = new T(bi);
function nn() {
  localStorage.getItem("token") ||
    (alert("You must be logged in to view this page"),
    (window.location.href = "/auth/login/"));
}
function _i(M) {
  const a = new Date(M),
    l = { day: "2-digit", month: "2-digit", year: "numeric" };
  return a.toLocaleDateString("en-GB", l);
}
function gi(M) {
  const a = document.createElement("a");
  a.classList.add(
    "post-container",
    "overflow-hidden",
    "col",
    "hover-scale-img",
  ),
    (a.id = M.id),
    (a.href = `/post/?id=${M.id}`);
  const l = document.createElement("figure");
  l.classList.add("ratio", "ratio-4x3", "m-0", "overflow-hidden", "rounded");
  const c = document.createElement("img");
  c.classList.add("thumbnail", "rounded", "object-fit-fill"),
    M.media?.url
      ? ((c.src = M.media.url),
        (c.alt = M.media.alt),
        (c.onerror = () => {
          (c.src = "../../../../images/default-thumbnail.jpg"),
            (c.alt = "Default Thumbnail");
        }))
      : ((c.src = "../../../../images/default-thumbnail.jpg"),
        (c.alt = "No Media Available")),
    l.appendChild(c);
  const h = document.createElement("div");
  h.classList.add("post-text-container", "px-2", "pt-2", "pb-4");
  const m = document.createElement("div");
  m.classList.add("post-user-date", "d-flex", "justify-content-between");
  const g = document.createElement("div");
  g.classList.add(
    "user",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "text-break",
    "me-3",
    "font-size-sm",
    "hover-color-opacity",
  );
  const v = document.createElement("i");
  v.classList.add("fa-regular", "fa-user", "user-icon", "me-1");
  const E = document.createElement("a");
  E.classList.add("post-author", "link-underline"),
    (E.textContent = M.author.name),
    (E.href = `/profile/?name=${M.author.name}`),
    g.append(v, E);
  const S = document.createElement("div");
  S.classList.add(
    "date",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "font-size-sm",
  );
  const f = document.createElement("i");
  f.classList.add("fa-regular", "fa-calendar", "me-1");
  const w = document.createElement("p");
  w.classList.add("mb-0"),
    (w.textContent = _i(M.created)),
    S.append(f, w),
    m.append(g, S);
  const P = document.createElement("div");
  P.classList.add(
    "post-tag-comment",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "my-4",
    "gap-3",
  );
  const W = document.createElement("ul");
  W.classList.add(
    "tag-list",
    "list-unstyled",
    "d-flex",
    "align-items-center",
    "gap-1",
    "mb-0",
    "flex-wrap",
  ),
    M.tags
      ?.filter((fe) => fe.trim().length > 0)
      .forEach((fe) => {
        const xe = document.createElement("li");
        xe.classList.add(
          "tag-item",
          "bg-light",
          "border",
          "border-black",
          "px-3",
          "py-1",
          "rounded-pill",
        ),
          (xe.textContent = fe),
          W.appendChild(xe);
      });
  const X = document.createElement("div");
  X.classList.add(
    "comment",
    "d-flex",
    "justify-content-between",
    "align-items-center",
  );
  const U = document.createElement("i");
  U.classList.add("fa-regular", "fa-comments", "me-1");
  const V = document.createElement("p");
  V.classList.add("mb-0"),
    (V.textContent = M.comments.length),
    X.append(U, V),
    P.append(W, X);
  const z = document.createElement("p");
  z.classList.add("post-title", "h3", "mb-0"),
    (z.textContent = M.title),
    h.append(m, P, z);
  const ce = document.createElement("div");
  return (
    ce.classList.add("p-2", "border", "border-2", "rounded", "h-100"),
    ce.append(l, h),
    a.appendChild(ce),
    a
  );
}
function jr(M) {
  const a = document.createElement("div"),
    l = document.createElement("div");
  l.classList.add(
    "mb-6",
    "pb-6",
    "pb-lg-8",
    "mb-lg-8",
    "border-bottom",
    "border-black",
  );
  const c = document.createElement("h1");
  c.classList.add("text-center", "text-break", "mb-3", "mb-lg-5"),
    (c.textContent = M.title);
  const h = document.createElement("figure");
  h.classList.add("ratio", "ratio-16x9");
  const m = document.createElement("img");
  m.classList.add("rounded", "object-fit-fill", "mb-2", "mb-lg-3"),
    M.media?.url
      ? ((m.src = M.media.url), (m.alt = M.media.alt))
      : ((m.src = "../../../../images/default-thumbnail.jpg"),
        (m.alt = "No Media Available")),
    h.appendChild(m);
  const g = document.createElement("div");
  g.classList.add("d-flex", "justify-content-between", "align-items-center");
  const v = document.createElement("div");
  v.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "text-break",
    "me-3",
  );
  const E = document.createElement("i");
  E.classList.add("fa-regular", "fa-user", "user-icon", "me-1");
  const S = document.createElement("a");
  S.classList.add("link-underline"),
    (S.textContent = M.author.name),
    (S.href = `/profile/?name=${M.author.name}`),
    v.append(E, S);
  const f = document.createElement("div");
  f.classList.add("d-flex", "justify-content-between", "align-items-center");
  const w = document.createElement("i");
  w.classList.add("fa-regular", "fa-calendar", "me-1");
  const P = document.createElement("p");
  P.classList.add("m-0"),
    (P.textContent = _i(M.created)),
    f.append(w, P),
    g.append(v, f);
  const W = document.createElement("ul");
  W.classList.add(
    "single-post-tag-list",
    "list-unstyled",
    "d-flex",
    "align-items-center",
    "gap-1",
    "mt-3",
    "mb-4",
    "mt-lg-4",
    "mb-lg-5",
    "flex-wrap",
    "fw-medium",
  ),
    M.tags
      ?.filter((Z) => Z.trim().length > 0)
      .forEach((Z) => {
        const ee = document.createElement("li");
        ee.classList.add("border", "px-2", "py-1", "rounded-pill"),
          (ee.textContent = Z),
          W.appendChild(ee);
      });
  const X = document.createElement("div"),
    U = document.createElement("p");
  U.classList.add("content-text", "m-0", "font-content", "font-size-sm"),
    (U.textContent = M.body),
    X.appendChild(U);
  const V = document.createElement("div");
  V.classList.add("comment-section");
  const z = document.createElement("p");
  z.classList.add("mb-0"), (z.textContent = `Comment ( ${M.comments.length} )`);
  const ce = document.createElement("ul");
  ce.classList.add(
    "comment-list",
    "list-unstyled",
    "pt-3",
    "mb-0",
    "py-lg-4",
    "px-lg-3",
  );
  const fe = M.comments,
    xe = fe.filter((Z) => Z.replyToId === null);
  for (let Z = 0; Z < xe.length; Z++) {
    const ee = document.createElement("li");
    ee.classList.add("comment-item", "original-comment-item");
    const G = xe[Z];
    (ee.id = G.id), (ee.dataset.username = G.author.name);
    const $e = document.createElement("div");
    $e.classList.add(
      "comment-container",
      "px-3",
      "pt-3",
      "pb-4",
      "px-lg-2",
      "py-lg-4",
    );
    const Te = document.createElement("div");
    Te.classList.add(
      "user-info",
      "d-flex",
      "align-items-center",
      "font-size-sm",
    );
    const d = document.createElement("img");
    d.classList.add("rounded-circle", "me-2"), (d.src = G.author.avatar.url);
    const de = document.createElement("a");
    de.classList.add("comment-username", "link-underline"),
      (de.href = `/profile/?name=${G.author.name}`),
      (de.textContent = G.author.name),
      Te.append(d, de);
    const Ae = document.createElement("div");
    Ae.classList.add(
      "mt-3",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    );
    const we = document.createElement("p");
    we.classList.add("comment-text", "m-0", "font-content"),
      (we.textContent = G.body);
    const se = document.createElement("button");
    se.classList.add(
      "comment-delete-button",
      "border-0",
      "bg-transparent",
      "px-0",
    );
    const Ee = document.createElement("i");
    Ee.classList.add("fa-solid", "fa-trash-can"),
      se.appendChild(Ee),
      Ae.append(we, se);
    const J = document.createElement("button");
    J.classList.add(
      "reply-button",
      "border-0",
      "bg-transparent",
      "px-0",
      "mt-3",
      "font-size-sm",
    ),
      (J.innerHTML = '<i class="fa-solid fa-reply me-1"></i>Reply'),
      $e.append(Te, Ae, J);
    const De = document.createElement("ul");
    De.classList.add(
      "reply-list",
      "ul-padding-left",
      "ps-4",
      "list-unstyled",
      "d-flex",
      "flex-column",
    ),
      ee.append($e, De),
      ce.appendChild(ee);
  }
  const It = fe.filter((Z) => Z.replyToId !== null),
    sn = M.comments;
  for (let Z = 0; Z < It.length; Z++) {
    const ee = document.createElement("li");
    ee.classList.add("comment-item", "reply-comment-item", "border-top");
    const G = It[Z];
    (ee.id = G.id), (ee.dataset.username = G.author.name);
    const $e = document.createElement("div");
    $e.classList.add(
      "comment-container",
      "px-3",
      "pt-3",
      "pb-2",
      "px-lg-2",
      "py-lg-4",
    );
    const Te = document.createElement("div");
    Te.classList.add("user-info", "font-size-sm");
    const d = document.createElement("img");
    d.classList.add("rounded-circle", "me-2"), (d.src = G.author.avatar.url);
    const de = document.createElement("a");
    de.classList.add("comment-username", "link-underline"),
      (de.href = `/profile/?name=${G.author.name}`),
      (de.textContent = G.author.name),
      Te.append(d, de);
    const Ae = document.createElement("div");
    Ae.classList.add(
      "mt-3",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    );
    const we = document.createElement("p");
    we.classList.add("comment-text", "font-size-sm", "font-content", "m-0"),
      (we.textContent = G.body);
    const se = document.createElement("button");
    se.classList.add(
      "comment-delete-button",
      "border-0",
      "bg-transparent",
      "px-0",
    );
    const Ee = document.createElement("i");
    Ee.classList.add("fa-solid", "fa-trash-can"),
      se.appendChild(Ee),
      Ae.append(we, se);
    const J = document.createElement("button");
    J.classList.add(
      "reply-button",
      "font-size-sm",
      "border-0",
      "bg-transparent",
      "px-0",
      "mt-3",
    ),
      (J.innerHTML = '<i class="fa-solid fa-reply me-1"></i>Reply'),
      $e.append(Te, Ae, J);
    const De = document.createElement("ul");
    if (
      (De.classList.add("reply-list", "list-unstyled"),
      ee.append($e, De),
      sn.find((Re) => Number(Re.id) === G.replyToId))
    ) {
      const Re = Array.from(ce.querySelectorAll("li.comment-item"));
      Array.from(ce.querySelectorAll("ul.reply-list")).forEach((Lt, ot) => {});
      const Mt = Re.find((Lt) => Number(Lt.id) === G.replyToId);
      Mt
        ? Mt.querySelector(".reply-list").appendChild(ee)
        : console.error("Parent reply item not found");
    }
  }
  const Be = document.createElement("form");
  Be.classList.add("pt-5", "mt-4", "border-top", "border-black", "pt-lg-5"),
    (Be.name = "comment");
  const it = document.createElement("p");
  it.classList.add("mb-0", "fw-semibold", "font-size-sm"),
    (it.textContent = T.user);
  const Et = document.createElement("p");
  Et.classList.add("reply-message", "mb-0", "mt-2", "font-size-sm");
  const Ct = document.createElement("div");
  Ct.classList.add("form-group");
  const We = document.createElement("label");
  We.setAttribute("for", "comment"),
    We.classList.add("form-label", "col-12", "mt-2"),
    Ct.appendChild(We);
  const Ne = document.createElement("textarea");
  Ne.classList.add("form-control", "border-primary"),
    (Ne.placeholder = "Write comment here"),
    (Ne.name = "comment"),
    (Ne.id = "comment"),
    We.appendChild(Ne);
  const Ve = document.createElement("button");
  return (
    Ve.classList.add(
      "btn",
      "col-12",
      "mt-2",
      "mt-lg-2",
      "btn-primary",
      "border-2",
    ),
    (Ve.type = "submit"),
    (Ve.innerText = "Add comment"),
    Be.append(it, Et, Ct, Ve),
    V.append(z, ce, Be),
    l.append(c, h, g, W, X),
    a.append(l, V),
    a
  );
}
class ze extends T {
  constructor() {
    super(), this.router(), (this.replyToId = null);
  }
  async router(a = window.location.pathname) {
    switch (a) {
      case "/":
        await this.views.login();
        break;
      case "/auth/login/":
        await this.views.login();
        break;
      case "/auth/register/":
        await this.views.register();
        break;
      case "/post/":
        await this.views.post();
        break;
      case "/post/edit/":
        await this.views.postEdit();
        break;
      case "/post/create/":
        await this.views.postCreate();
        break;
      case "/post/feed/":
        await this.views.feed();
        break;
      case "/profile/":
        await this.views.profile();
        break;
      case "/profile/update/":
        await this.views.profileUpdate();
        break;
      default:
        await this.views.notFound();
    }
  }
  static form = {
    handleSubmit(a) {
      a.preventDefault();
      const l = a.target,
        c = new FormData(l);
      return Object.fromEntries(c.entries());
    },
  };
  setReplyToId(a) {
    const l = document.querySelector(".reply-message"),
      c = document.querySelector(".comment-item[data-replying='true']");
    c &&
      ((c.style.backgroundColor = "transparent"),
      (l.innerHTML = ""),
      (c.dataset.replying = "false"));
    const h = a.target.closest(".comment-item");
    this.replyToId = Number(h.id);
    const m = h.dataset.username;
    (h.style.backgroundColor = "#e1d2c4"),
      (l.innerHTML = `<button class="cancel border-0" type="button"><i class="fa-solid fa-circle-xmark"></i></button>Replying to <span class="reply-to">${m}</span>`),
      (h.dataset.replying = "true"),
      document.querySelector(".cancel").addEventListener("click", () => {
        (l.innerHTML = ""),
          (this.replyToId = null),
          (h.style.backgroundColor = "transparent"),
          (h.dataset.replying = "false");
      });
  }
  setupReplyButtons() {
    document.querySelectorAll(".reply-button").forEach((l) => {
      l.addEventListener("click", (c) => this.setReplyToId(c));
    });
  }
  views = {
    register: async () => {
      document.forms.register.addEventListener("submit", this.events.register);
    },
    login: async () => {
      document.forms.login.addEventListener("submit", this.events.login);
    },
    feed: async () => {
      this.events.logout(), this.events.myPage();
      const l =
        new URLSearchParams(window.location.search).get("page") ||
        localStorage.getItem("page") ||
        1;
      this.events.post.displayPosts(Number(l));
    },
    postCreate: async () => {
      nn(),
        this.events.logout(),
        this.events.myPage(),
        document.forms.createPost.addEventListener(
          "submit",
          this.events.post.create,
        );
    },
    postEdit: async () => {
      nn(),
        this.events.logout(),
        this.events.myPage(),
        this.events.post.update(),
        this.events.post.delete();
    },
    post: async () => {
      this.events.logout(),
        this.events.myPage(),
        this.events.post.displaySinglePost();
    },
    profile: async () => {
      nn(),
        this.events.logout(),
        this.events.myPage(),
        this.animation.headerPadding();
      const l = new URLSearchParams(window.location.search).get("page") || 1;
      this.events.profile.displayProfilePage(Number(l));
    },
    profileUpdate: async () => {
      nn(), this.events.logout(), this.events.profile.updateProfile();
    },
    notFound: async () => {
      alert("Page cannot be found in /src/views");
    },
  };
  currentPage = 1;
  events = {
    login: async (a) => {
      const l = ze.form.handleSubmit(a);
      try {
        await Y.auth.login(l);
      } catch (c) {
        alert(c.message);
      }
    },
    register: async (a) => {
      const l = ze.form.handleSubmit(a),
        { name: c, email: h } = l;
      try {
        await Y.auth.register(l),
          alert(`Registration successful!
Username: ${c}
Email: ${h}`),
          (window.location.href = "/auth/login/");
      } catch (m) {
        alert(`${m.message}.
Please try again.`);
      }
    },
    logout: () => {
      document
        .querySelector(".logout-button")
        .addEventListener("click", (l) => {
          l.preventDefault(),
            localStorage.removeItem("user"),
            localStorage.removeItem("token"),
            localStorage.removeItem("page"),
            alert("You have successfully logged out."),
            (window.location.href = "/");
        });
    },
    myPage: () => {
      document.querySelectorAll(".my-page").forEach((l) => {
        l.href = `/profile/?name=${T.user}`;
      });
    },
    post: {
      create: async (a) => {
        const l = ze.form.handleSubmit(a),
          c = { url: l["media[url]"], alt: l["media[alt]"] },
          { title: h, body: m, tags: g } = l,
          v = g
            ? g
                .split(",")
                .map((E) => E.trim())
                .filter((E) => E.length > 0)
            : [];
        try {
          await Y.post.create({ title: h, body: m, tags: v, media: c });
        } catch (E) {
          alert(E.message);
        }
      },
      delete: () => {
        document
          .querySelector(".delete-button")
          .addEventListener("click", async () => {
            try {
              const c = new URLSearchParams(window.location.search).get("id");
              window.confirm("Are you sure you want to delete this post?") &&
                (await Y.post.delete(c));
            } catch (l) {
              alert(l.message);
            }
          });
      },
      displayPosts: async (a = 1) => {
        try {
          const l = await Y.posts.getPosts(12, a),
            { data: c, meta: h } = l,
            { currentPage: m, pageCount: g } = h,
            v = document.querySelector(".row");
          (v.innerHTML = ""),
            c.forEach((f) => {
              const w = gi(f);
              v.appendChild(w);
            });
          const E = `${window.location.pathname}?page=${a}`;
          window.history.replaceState({}, "", E),
            this.pagination.feedPagination(m, g),
            window.scrollTo({ top: 0, behavior: "smooth" }),
            document.querySelectorAll(".post-container").forEach((f) => {
              f.addEventListener("click", () => {
                const P = new URLSearchParams(window.location.search).get(
                  "page",
                );
                localStorage.setItem("page", P);
              });
            });
        } catch (l) {
          alert(l.message);
        }
      },
      displaySinglePost: async () => {
        try {
          const l = new URLSearchParams(window.location.search).get("id"),
            h = (await Y.post.readPost(l)).data,
            m = h.author.name,
            g = document.createElement("button");
          g.classList.add(
            "nav-link",
            "btn",
            "btn-light",
            "px-3",
            "py-2",
            "rounded",
            "button-border",
            "border-none",
            "nav-bg-pink",
          ),
            (g.textContent = "Edit");
          const v = document.createElement("i");
          v.classList.add("fa-regular", "fa-pen-to-square", "me-1"),
            g.insertBefore(v, g.firstChild),
            (g.dataset.id = l),
            m === T.user
              ? (g.style.display = "block")
              : (g.style.display = "none");
          const E = document.createElement("div");
          E.classList.add("nav-item"), E.appendChild(g);
          const S = document.querySelector(".navbar-nav");
          S.insertBefore(g, S.firstChild),
            g.addEventListener("click", () => {
              window.location.href = `/post/edit/?id=${l}`;
            });
          const f = document.querySelector(".single-post");
          f.innerHTML = "";
          const w = jr(h);
          f.appendChild(w);
          const P = document.querySelector(".back-to-profile-page");
          (P.href = `/profile/?name=${m}`), (P.textContent = `${m}'s page`);
          const W = document.createElement("i");
          W.classList.add(
            "fa-solid",
            "fa-chevron-left",
            "back-to-profile-icon",
            "me-1",
          ),
            P.insertBefore(W, P.firstChild),
            document.forms.comment.addEventListener(
              "submit",
              this.events.post.comment,
            );
          const X = document.querySelector(".back-link-on-single-page"),
            U = localStorage.getItem("page");
          (X.href = `/post/feed/?page=${U}`),
            this.events.post.deleteComment(),
            this.setupReplyButtons(),
            this.pagination.singlePostPagination();
        } catch (a) {
          alert(a.message);
        }
      },
      update: async () => {
        try {
          const l = new URLSearchParams(window.location.search).get("id"),
            c = await Y.post.readPost(l),
            { data: h } = c,
            { title: m, body: g, tags: v, media: E } = h;
          (document.getElementById("title").value = m),
            (document.getElementById("content").value = g),
            (document.getElementById("tags").value = v.join(",")),
            (document.getElementById("img-url").value = E.url),
            (document.getElementById("img-alt").value = E.alt),
            document.forms.editPost.addEventListener("submit", async (S) => {
              const f = ze.form.handleSubmit(S);
              (f.tags = f.tags.split(",").map((w) => w.trim())),
                (f.media = { url: f["media[url]"], alt: f["media[alt]"] }),
                await Y.post.update(l, f);
            });
        } catch (a) {
          alert(a.message);
        }
      },
      comment: async (a) => {
        const c = ze.form.handleSubmit(a).comment;
        if (!c || c.trim() === "") {
          alert("Comment cannot be empty.");
          return;
        }
        const m = new URLSearchParams(window.location.search).get("id");
        if (this.replyToId)
          try {
            await Y.post.comment(m, { body: c, replyToId: this.replyToId }),
              location.reload();
          } catch (g) {
            alert(g.message);
          }
        else
          try {
            await Y.post.comment(m, { body: c }), location.reload();
          } catch (g) {
            alert(g.message);
          }
      },
      deleteComment: () => {
        document.querySelectorAll(".comment-delete-button").forEach((l) => {
          l.addEventListener("click", async (c) => {
            try {
              const m = new URLSearchParams(window.location.search).get("id"),
                g = c.target.closest(".comment-item"),
                v = g.id;
              window.confirm("Are you sure you want to delete this comment?") &&
                (await Y.post.deleteComment(m, v), g.remove());
              const f = (await Y.post.readPost(m)).data.comments.length,
                w = document.querySelector(".section-title");
              w.textContent = `Comment (${f})`;
            } catch (h) {
              alert(h.message);
            }
          });
        });
      },
    },
    profile: {
      displayProfilePage: async (a = 1) => {
        const c = new URLSearchParams(window.location.search).get("name");
        try {
          const h = await Y.profile.readUsersPosts(c, 12, a),
            m = await Y.profile.readProfile(c),
            g = h.data,
            v = m.data,
            E = document.querySelector(".avatar");
          E.src = v.avatar.url;
          const S = document.querySelector(".username");
          S.textContent = v.name;
          const f = document.querySelector(".bio");
          (f.textContent = v.bio),
            (document.querySelector(".followers").textContent =
              v._count.followers),
            (document.querySelector(".following").textContent =
              v._count.following),
            (document.querySelector(".posts").textContent = v._count.posts);
          const w = document.querySelector(".profile-header"),
            P = v.banner.url;
          (w.style.backgroundImage = `url(${P})`),
            (w.style.backgroundRepeat = "no-repeat"),
            (w.style.backgroundSize = "cover");
          const W = document.querySelector(".button-area"),
            ne = document.createElement("button");
          ne.classList.add(
            "update-button",
            "border",
            "border-2",
            "px-3",
            "py-2",
            "rounded",
            "btn",
            "btn-light",
          ),
            (ne.textContent = "Update Profile");
          const X = document.createElement("button");
          X.classList.add(
            "follow-button",
            "btn",
            "border",
            "border-2",
            "px-3",
            "py-2",
            "rounded",
            "btn-light",
          ),
            (X.id = "toggle-button"),
            (X.textContent = "Follow"),
            W.append(ne, X),
            c === T.user
              ? ((ne.style.display = "block"), (X.style.display = "none"))
              : ((ne.style.display = "none"), (X.style.display = "block")),
            ne.addEventListener("click", () => {
              window.location.href = "/profile/update/";
            });
          const U = document.querySelector(".row");
          (U.innerHTML = ""),
            g.forEach((fe) => {
              const xe = gi(fe);
              U.appendChild(xe);
            });
          const V = v._count.posts,
            z = Math.ceil(V / 12),
            ce = `${window.location.pathname}?name=${c}&page=${a}`;
          window.history.replaceState({}, "", ce),
            (this.currentPage = a),
            this.pagination.profilePagination(this.currentPage, z),
            window.scrollTo({ top: 0, behavior: "smooth" }),
            this.events.profile.follow();
        } catch (h) {
          alert(h.message);
        }
      },
      updateProfile: async () => {
        try {
          const a = T.user,
            l = await Y.profile.readProfile(a),
            { data: c } = l,
            { bio: h, avatar: m, banner: g } = c;
          (document.getElementById("bio").value = h || ""),
            (document.getElementById("banner").value = g.url || ""),
            (document.getElementById("banner-alt").value = g.alt || ""),
            (document.getElementById("avatar").value = m.url || ""),
            (document.getElementById("avatar-alt").value = m.alt || ""),
            document.forms.updateProfile.addEventListener(
              "submit",
              async (S) => {
                S.preventDefault();
                const f = ze.form.handleSubmit(S);
                (f.banner = { url: f["banner[url]"], alt: f["banner[alt]"] }),
                  (f.avatar = { url: f["avatar[url]"], alt: f["avatar[alt]"] }),
                  await Y.profile.update(a, f);
              },
            );
          const v = document.querySelector(".back-to-profile-page");
          (v.href = `/profile/?name=${T.user}`),
            (v.textContent = "My profile page");
          const E = document.createElement("i");
          E.classList.add(
            "fa-solid",
            "fa-chevron-left",
            "back-to-profile-icon",
            "me-1",
          ),
            v.insertBefore(E, v.firstChild);
        } catch (a) {
          alert(a.message);
        }
      },
      follow: () => {
        const a = document.getElementById("toggle-button");
        a.addEventListener("click", async () => {
          try {
            const c = new URLSearchParams(window.location.search).get("name");
            (a.disabled = !0),
              a.textContent === "Follow"
                ? (await Y.profile.follow(c), (a.textContent = "Unfollow"))
                : (await Y.profile.unfollow(c), (a.textContent = "Follow"));
            const g = (await Y.profile.readProfile(c)).data._count.followers;
            document.querySelector(".followers").textContent = g;
          } catch (l) {
            alert(l.message);
          }
          a.disabled = !1;
        });
      },
    },
  };
  pagination = {
    feedPagination: async (a, l) => {
      const c = document.querySelector(".feed-pagination");
      c.innerHTML = "";
      const h = (f, w) => {
          const P = document.createElement("button");
          return (
            (P.textContent = f),
            (P.dataset.page = w),
            (P.className = "rounded-circle border border-2 btn btn-light"),
            w === a &&
              (P.classList.add("current-page", "btn-primary"),
              P.classList.remove("btn-light")),
            P.addEventListener("click", () => {
              this.events.post.displayPosts(w);
            }),
            P
          );
        },
        m = () => {
          const f = document.createElement("span");
          return f.classList.add("color-green"), (f.textContent = "..."), f;
        },
        g = document.createElement("button");
      g.classList.add(
        "rounded-circle",
        "border",
        "border-2",
        "btn",
        "btn-light",
      );
      const v = document.createElement("i");
      if (
        (v.classList.add("fa-solid", "fa-chevron-left", "color-green"),
        g.appendChild(v),
        c.appendChild(g),
        g.addEventListener("click", () => {
          a > 1 && this.events.post.displayPosts(a - 1);
        }),
        a === 1 ? (g.disabled = !0) : (g.disabled = !1),
        a < 4)
      ) {
        for (let w = 1; w < 4; w++) {
          const P = h(w, w);
          c.appendChild(P);
        }
        c.appendChild(m());
        const f = h(l, l);
        c.appendChild(f);
      }
      if (a >= 4 && a <= l - 3) {
        const f = h(1, 1);
        c.appendChild(f), c.appendChild(m());
        const w = Math.max(3, a - 2),
          P = Math.min(l - 2, a + 2);
        for (let ne = w; ne <= P; ne++) {
          const X = h(ne, ne);
          c.appendChild(X);
        }
        c.appendChild(m());
        const W = h(l, l);
        c.appendChild(W);
      }
      if (a > l - 3) {
        const f = h(1, 1);
        c.appendChild(f), c.appendChild(m());
        for (let w = l - 2; w <= l; w++) {
          const P = h(w, w);
          c.appendChild(P);
        }
      }
      if (l <= 7)
        for (let f = 1; f < 8; f++) {
          const w = h(f, f);
          c.appendChild(w);
        }
      const E = document.createElement("button");
      E.classList.add(
        "rounded-circle",
        "border",
        "border-2",
        "btn",
        "btn-light",
      );
      const S = document.createElement("i");
      S.classList.add("fa-solid", "fa-chevron-right", "color-green"),
        E.appendChild(S),
        c.appendChild(E),
        E.addEventListener("click", () => {
          a < l && this.events.post.displayPosts(a + 1);
        }),
        a === l ? (E.disabled = !0) : (E.disabled = !1);
    },
    singlePostPagination: async () => {
      let a = await Y.posts.getAllPosts(),
        { data: l, meta: c } = a;
      const h = c.totalCount;
      let m = 1;
      const g = new URLSearchParams(window.location.search),
        v = Number(g.get("id"));
      let E = l.findIndex((w) => w.id === v);
      for (; E === -1 && m * 100 < h; ) {
        m++;
        let w = await Y.posts.getPosts(100, m);
        (l = l.concat(w.data)), (E = l.findIndex((P) => P.id === v));
      }
      const S = document.getElementById("previous-post");
      if ((S.classList.add("hover-underline"), S))
        if (E > 0) {
          const w = l[E - 1].id;
          S.addEventListener("click", () => {
            window.location.href = `/post/?id=${w}`;
          });
        } else S.disabled = !0;
      const f = document.getElementById("next-post");
      if ((f.classList.add("hover-underline"), f))
        if (E < l.length - 1) {
          const w = l[E + 1]?.id;
          f.addEventListener("click", () => {
            w && (window.location.href = `/post/?id=${w}`);
          });
        } else if (m * 100 < h) {
          m++;
          try {
            let w = await Y.posts.getPosts(100, m);
            (l = l.concat(w.data)), (E = l.findIndex((W) => W.id === v));
            const P = l[E + 1]?.id;
            f.addEventListener("click", () => {
              P ? (window.location.href = `/post/?id=${P}`) : (f.disabled = !0);
            });
          } catch (w) {
            alert(w.message), (f.disabled = !0);
          }
        } else f.disabled = !0;
    },
    profilePagination: async (a, l) => {
      this.currentPage = a;
      const c = document.querySelector(".feed-pagination");
      c.innerHTML = "";
      const h = (S, f) => {
          const w = document.createElement("button");
          return (
            (w.textContent = S),
            (w.dataset.page = f),
            (w.className =
              "pagination-button, rounded-circle border border-2 btn btn-light"),
            f === this.currentPage &&
              (w.classList.add("current-page", "btn-primary"),
              w.classList.remove("btn-light")),
            w.addEventListener("click", () => {
              (this.currentPage = f), this.events.profile.displayProfilePage(f);
            }),
            w
          );
        },
        m = document.createElement("button");
      m.classList.add(
        "rounded-circle",
        "border",
        "border-2",
        "btn",
        "btn-light",
      );
      const g = document.createElement("i");
      g.classList.add("fa-solid", "fa-chevron-left", "color-green"),
        m.appendChild(g),
        c.appendChild(m),
        m.addEventListener("click", () => {
          this.currentPage > 1 &&
            this.events.profile.displayProfilePage(this.currentPage - 1);
        }),
        this.currentPage === 1 ? (m.disabled = !0) : (m.disabled = !1);
      for (let S = 1; S <= l; S++) {
        const f = h(S, S);
        c.appendChild(f);
      }
      const v = document.createElement("button");
      v.classList.add(
        "rounded-circle",
        "border",
        "border-2",
        "btn",
        "btn-light",
      );
      const E = document.createElement("i");
      E.classList.add("fa-solid", "fa-chevron-right", "color-green"),
        v.appendChild(E),
        c.appendChild(v),
        v.addEventListener("click", () => {
          this.currentPage < l &&
            this.events.profile.displayProfilePage(this.currentPage + 1);
        }),
        this.currentPage === l ? (v.disabled = !0) : (v.disabled = !1);
    },
  };
  animation = {
    headerPadding: () => {
      const a = document.querySelector(".profile-header"),
        l = 11.5,
        c = 2.5;
      window.addEventListener("scroll", () => {
        window.scrollY > 0
          ? (a.style.paddingBottom = `${c}rem`)
          : (a.style.paddingBottom = `${l}rem`);
      });
    },
  };
}
new ze();
