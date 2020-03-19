var t = getApp(), s = t.requirejs("core");

Page({
    data: {},
    onLoad: function(s) {
        this.setData({
            options: s,
            open_id:s.open_id
        }), t.url(s), this.get_list();
    },
    get_list: function() {
        var t = this;
      s.get("order/express", t.data.options, function(e) {
            0 == e.error ? (e.show = !0, t.setData(e)) : s.toast(e.message, "loading");
        });
    }
});