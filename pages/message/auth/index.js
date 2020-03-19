var e = getApp();

Page({
    data: {
        close: 0,
        text: ""
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            close: t.close,
            text: t.text
        });
        // if()
      // wx.setStorageSync("shop_id", t.isnum)

      if (wx.getStorageSync("shop_id")) {
        // wx.showToast({
        //   title: '真的' + wx.getStorageSync("shop_id"),
        // })
      } else {
        // wx.showToast({
        //   title: '假的' + wx.getStorageSync("shop_id"),
        // })
      }
      // wx.showToast({
      //   title: 123333,
      // })
    },
    quFn:function(e){
      wx.switchTab({
        url: '../../index/index',
      })
    },
    onShow: function() {
      console.log(e.getCache("shop_id")+'-----------------') 
      wx.showToast({
        title: e.getCache("shop_id") +"onshow",
      })
        var e =e.getCache("sysset").shopname;
        wx.setNavigationBarTitle({
            title: e || "提示"
        });
      // const _obj = wx.getLaunchOptionsSync()

      // console.log(_obj['scene'])
      // console.log(wx.getLaunchOptionsSync())
    },
    bind: function() {
        var t = this, e = setInterval(function() {
            wx.getSetting({
                success: function(n) {
                    var a = n.authSetting["scope.userInfo"];
                    console.log(a)
                    a && (
                      wx.reLaunch({
                        url: "/pages/index/index"
                    }), 
                      // wx.navigateTo({
                      //   url: "/pages/index/zenpin/index"
                      // }),
                      // wx.navigateBack({
                      //   delta: 2,
                      // }),
                    clearInterval(e), t.setData({
                        userInfo: a
                    }));
                }
            });
        }, 1e3);
    }
});