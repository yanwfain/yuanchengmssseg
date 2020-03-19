// pages/order/zenpin/index.js
var a = getApp(),
  t = a.requirejs("core"),
  b = a.requirejs("wxParse/wxParse"),
  i = a.requirejs("biz/diypage"),
  s = a.requirejs("jquery");
// var a = getApp(), t = a.requirejs("core"), e = a.requirejs("biz/order");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isnum: 5,
    stat: 1,
    stats: 1,
    isnums: 1,
    userid: true,
    isnums: 0,
    endtime_shop: 86400 * 3,
    countdown: {
      day: '',
      hour: '',
      minute: '',
      second: ''
    },
    nid: '',
    istxt: true,
    is_view: false,
    is_timestatus: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.endtime_shop)
    var that = this
    that.getInfo()
    console.log(options)
    wx.setStorageSync("nid", options.nid)
    wx.setStorageSync("id", options.id)
    this.setData({
      user_openid: options.user_openid,

    })
    if (options.id) {
      // wx.showToast({
      //   title: options.id  +'+' + options.nid,
      //   duration: 4000
      // })
    }
    console.log(a.getCache("userinfo_openid"))

    this.setData({
      options: options.id,
      status_type: options.status_type

      // openid: a.getCache("userinfo_openid")
    })
    if (options.nid) {
      this.setData({
        nid: options.nid
      })
    }
    wx.setStorageSync("nid", options.nid)
    wx.setStorageSync("id", options.id)
    // e.("shop_id", )
    this.get_list()

  },
  goLinshop: function() {

    var that = this
    if (this.data.give_user != '') {
      // wx.showToast({
      //   title: 'true',
      // })
      console.log('1')
      var arraysd = this.data.give_user
      for (var i = 0; i < arraysd.length; i++) {
        if (that.data.open_id == arraysd[i].openid) {
          console.log('2' + i)
          wx.showToast({
            title: '您已经领取过了！',
          })
          return;
        }
      }
    }

    if (this.data.all_num == this.data.over_num) {
      wx.showToast({
        title: '领取已领取完毕！',
        icon: 'none'
      })
      return;
    }
    if (this.data.list) {
      var a = that.data.options;
      t.get("order/addGiveOrder", {
        id: a,
        address_id: that.data.list.id
      }, function(e) {
        console.log(e)
        if (e.error == 0) {
          wx.showLoading({
            title: '领取中',
          })
          that.get_list()
          wx.hideLoading()
          wx.showToast({
            title: '领取成功',
          })
          that.setData({
            istxt: false
          })
        } else {
          wx.showToast({
            title: '领取失败',
          })
        }

      });
    } else {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
    }

  },
  get_list: function() {
    var that = this;
    console.log(that.data.options)
    var a = that.data.options;
    var d = that.data.nid
    t.get("order/detail", {
      id: a,
      open_id: d
    }, function(e) {
      console.log(e)
      that.setData({
        shop: e.goods,
        all_num: e.order.all_num,
        over_num: e.order.over_num,
        create_time: e.order.create_time,
        openid: e.order.openid,
        avatar: e.order.avatar,
        user_name: e.order.user_name,
        give_user: e.give_user,
        dindan_time: e.order.createtime,
        dindanid: e.order.ordersn,
        order_shp: e.order,
        rido_zen: e.order.receive_type
      })
      console.log(that.data.order_shp.is_give)
      console.log(that.data.order_shp.main_order_id)
      var stat_time = that.data.endtime_shop + parseInt(that.data.create_time)
      // console.log(stat_time + '一共时间')
      // console.log(that.data.create_time + '下单时间')
      that.setData({
        stat_time: stat_time,
        is_view: true
      })
      if (that.data.status_type) {
        console.log('00')
      } else {
        if (that.data.rido_zen == '1') {
          
        } else {
          if (that.data.user_openid != that.data.openid) {
            console.log('11')
            if (that.data.open_id != that.data.openid) {
              console.log('22')
              // that.data.user_openid  分享人的id
              // that.data.open_id  当前用户id
              // that.data.openid  购买者id
              if (that.data.user_openid != that.data.open_id) {
                console.log(33)
                wx.showToast({
                  title: '暂无领取资格',
                  duration: 5000
                })
                setTimeout(function() {
                  wx.switchTab({
                    url: '../../index/index',
                  })
                }, 1500)
                return
              }
              if (that.data.give_user != '') {
                console.log('44')
                // wx.showToast({
                //   title: 'true',
                // })
                // console.log('1')
                var arraysd = that.data.give_user

                for (var i = 0; i < arraysd.length; i++) {

                  if (that.data.open_id != arraysd[i].openid) {
                    console.log('2' + i)
                    wx.showToast({
                      title: '已经被领取过了！',
                      duration: 5000
                    })
                    setTimeout(function() {
                      wx.switchTab({
                        url: '../../index/index',
                      })
                    }, 1500)

                    // return;
                  }

                }
              }
            }
          }
        }



      }


      that.startCountdown()
    });

  },
  startCountdown: function(endTime) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var serverTime = timestamp / 1000;
    var endTime = that.data.stat_time
    console.log(timestamp)
    console.log(endTime)
    var millisecond = (endTime - serverTime) * 1000;
    console.log(millisecond)
    var interval = setInterval(function() {
      // console.log('循环中');
      millisecond -= 1000;
      if (millisecond <= 0) {
        clearInterval(interval);
        that.setData({
          countdown: {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          },
          is_timestatus: false
        });
        return;
      }
      that.transformRemainTime(millisecond);
    }, 1000);
  },
  // 剩余时间(毫秒)处理转换时间
  transformRemainTime: function(millisecond) {
    var that = this;
    var countdownObj = that.data.countdown;
    // 秒数
    var seconds = Math.floor(millisecond / 1000);
    // 天数
    countdownObj.day = that.formatTime(Math.floor(seconds / 3600 / 24));
    // 小时
    countdownObj.hour = that.formatTime(Math.floor(seconds / 3600 % 24));
    // 分钟
    countdownObj.minute = that.formatTime(Math.floor(seconds / 60 % 60));
    // 秒
    countdownObj.second = that.formatTime(Math.floor(seconds % 60));
    that.setData({
      countdown: countdownObj
    });
  },
  //格式化时间为2位
  formatTime: function(time) {
    if (time < 10)
      return '0' + time;
    return time;
  },
  getInfo: function() {
    var e = this;
    t.get("member", {}, function(a) {
      console.log(a), 1 == a.isblack && wx.showModal({
        title: "无法访问",
        content: "您在商城的黑名单中，无权访问！",
        success: function(a) {
          a.confirm && e.close(), a.cancel && e.close();
        }
      }), 0 != a.error ? wx.switchTab({
        url: '/pages/index/index',
      }) : e.setData({
        member: a,
        open_id: a.openid,
        show: !0,
        customer: a.customer,
        customercolor: a.customercolor,
        phone: a.phone,
        phonecolor: a.phonecolor,
        phonenumber: a.phonenumber,
        iscycelbuy: a.iscycelbuy,
        bargain: a.bargain
      }), b.wxParse("wxParseData", "html", b.copyright, e, "5");
    });
    console.log(this.data.open_id)
  },
  look_wuliuFn: function(e) {
    console.log(e.currentTarget.dataset.order_id)

    wx.navigateTo({
      url: "../express/index?id=" + e.currentTarget.dataset.order_id + '&open_id=' + e.currentTarget.dataset.openid
    })
  },
  opsFn: function(e) {
    if (this.data.stat == 1) {
      this.setData({
        isnum: 0,
        stat: 2,
        userid: false
      })
    } else {
      this.setData({
        isnum: 5,
        stat: 1,
        userid: true
      })
    }

  },
  opsFns: function(e) {
    if (this.data.stats == 1) {
      this.setData({
        isnums: 0,
        userid: false,
        stats: 2,
        isnum: 1,

      })

    } else {
      this.setData({
        isnums: 1,
        // userid: true,
        stats: 1,
        userid: true,
        isnum: 0,

      })

    }
  },
  inputFn: function(e) {
    console.log(e.detail.value)
    this.setData({
      add_liuyan: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this

    // var end = this.data.endtime_shop - parseFloat(this.data.create_time)
    // console.log(end)
    console.log(a.getCache("orderAddress"))
    this.setData({
      list: a.getCache("orderAddress")
    })
    this.get_list()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

    var that = this;
    //       if (this.data.give_user != '') {
    //   // wx.showToast({
    //   //   title:  'true',
    //   // })
    //   console.log('1')
    //   var arraysd = this.data.give_user
    //   for (var i = 0; i < arraysd.length; i++) {
    //     if (that.data.open_id != arraysd[i].openid) {
    //       console.log('2' + i)
    //       wx.showToast({
    //         title: '已经领取过了！',

    //       })
    //       that.setData({
    //         istxt:false
    //       })
    //       setTimeout(function(){
    //         wx.navigateTo({
    //           url: "../../index/index" 
    //         })
    //       },2000)
    //       // return;
    //     }
    //   }
    // }
    var member = that.data.member.nickname;
    // const item = options.target.dataset.item;
    if (this.data.add_liuyan) {
      var item = this.data.add_liuyan
    } else {
      var item = ''
    }

    return {
      title: member + '给你留言' + item + '点击领取！',
      // tit: `${userInfo.nickname}推荐给你一本适合${item.book.maxAgeReadPercent[0]}岁的好书`
      // pages/index/index
      // pages/order/zenpin/index
      path: 'pages/order/zenpin/index?id=' + this.data.options + '&nid=' + this.data.openid + '&user_openid=' + this.data.open_id,
    };
  }
})