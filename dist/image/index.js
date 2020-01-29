"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames3 = _interopRequireDefault(require("../helpers/classNames"));

function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  }
}

function ownKeys(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable
    })), r.push.apply(r, a)
  }
  return r
}

function _objectSpread(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys(r, !0).forEach(function(t) {
      _defineProperty(e, t, r[t])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys(r).forEach(function(t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
    })
  }
  return e
}

function _defineProperty(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t
}
var EMPTY = "empty",
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
  UNMOUNTED = "unmounted",
  calcStyle = function(t) {
    return "number" == typeof t ? "".concat(t, "px") : t
  };
(0, _baseComponent.default)({
  properties: {
    prefixCls: {
      type: String,
      value: "wux-image"
    },
    src: {
      type: String,
      value: ""
    },
    mode: {
      type: String,
      value: "scaleToFill"
    },
    lazyLoad: {
      type: Boolean,
      value: !1
    },
    shape: {
      type: String,
      value: "normal"
    },
    width: {
      type: null,
      value: 300
    },
    height: {
      type: null,
      value: 225
    },
    unmountOnEmpty: {
      type: Boolean,
      value: !1
    },
    unmountOnError: {
      type: Boolean,
      value: !1
    },
    empty: {
      type: String,
      value: ""
    },
    loading: {
      type: String,
      value: ""
    },
    error: {
      type: String,
      value: ""
    }
  },
  data: {
    status: ""
  },
  computed: {
    classes: ["prefixCls, shape, mode, status, empty, loading, error", function(t, e, r, a, n, o, i) {
      var u;
      return {
        wrap: (0, _classNames3.default)(t, (_defineProperty(u = {}, "".concat(t, "--").concat(e), e), _defineProperty(u, "".concat(t, "--").concat(r), r), _defineProperty(u, "".concat(t, "--").concat(a), a), u)),
        inner: "".concat(t, "__inner"),
        thumb: "".concat(t, "__thumb"),
        mask: (0, _classNames3.default)("".concat(t, "__mask"), _defineProperty({}, "".concat(t, "__mask--text"), n || o || i)),
        text: "".concat(t, "__text")
      }
    }]
  },
  observers: _defineProperty({
    src: function(t) {
      this.updated(t)
    }
  }, "width, height", function() {
    this.updateStyle.apply(this, arguments)
  }),
  methods: {
    updated: function(t) {
      this.updateStatus(t ? LOADING : this.data.unmountOnEmpty ? UNMOUNTED : EMPTY)
    },
    updateStyle: function(t, e) {
      var r = "width: ".concat(calcStyle(t), "; height: ").concat(calcStyle(e));
      this.setData({
        style: r
      })
    },
    updateStatus: function(t) {
      this.data.status !== t && this.setData({
        status: t
      }), this.triggerEvent("change", {
        status: t
      })
    },
    onLoad: function(t) {
      this.updateStatus(LOADED), this.triggerEvent("load", _objectSpread({}, t.detail, {
        status: LOADED
      }))
    },
    onError: function(t) {
      var e = this.data.unmountOnError ? UNMOUNTED : ERROR;
      this.updateStatus(e), this.triggerEvent("error", _objectSpread({}, t.detail, {
        status: e
      }))
    },
    onTap: function(t) {
      this.triggerEvent("click", _objectSpread({}, t.detail, {
        status: this.data.status
      }))
    }
  },
  attached: function() {
    var t = this.data,
      e = t.width,
      r = t.height,
      a = t.src;
    this.updateStyle(e, r), this.updated(a)
  }
});