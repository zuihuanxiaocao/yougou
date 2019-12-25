Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: {},
    totalPrice: 0,
    totalCount: 0,
    checkAll: false
  },
  //当页面显示的时候
  onShow() {
    //每次显示时获取最新的存储数据，并更新到data中
    this.setData({
      address: wx.getStorageSync('address') || {},
      cartList: wx.getStorageSync('cartList') || {}
    })
    //重新计算价格
    // this.computedCartData();
  },
  //封装一个计算总价格的函数
  computedCartData() {
    //解构data中的购物车数据
    const {
      cartList
    } = this.data;
    //总价格
    let totalPrice = 0;
    //选中商品数量
    let totalCount = 0;
    //计算总价格
    cartList.forEach(v => {
      if (v.goods_selected) {
        //如果是选中的商品
        totalPrice += v.goods_price * v.goods_count;
        //选中件数
        totalCount++
      }
    });
    //计算总价格，全选状态，更新页面数据和本地存储数据
    this.setData({
      totalCount,
      totalPrice,
      //购物车数据视图更新
      cartList,
      //全选状态，购物条数 和 选中的数量比较 true为全选，反之为false
      checkAll: cartList.length === totalCount
    });
    //更新本地存储
    wx.setStorageSync('cartList', cartList);
  },

  //获取收货地址，调用前要用户是否授权
  getAddressHandle() {
    wx.getSetting({
      success: (result) => {
        if (result.authSetting["scope.address"] === false) {
          wx.openSetting({
            success: (result) => {
              this.getAddress();
            }
          })
        }
        //如果已经授权
        else {
          this.getAddress();
        }
      }
    })
  },
  // 获取用户地址信息
  getAddress() {
    // 小程序提供的获取收货地址的API
    wx.chooseAddress({
      success: (result) => {
        // console.log(result);
        // 从成功的回调函数中提取关键信息
        const {
          cityName,
          countyName,
          detailInfo,
          nationalCode,
          postalCode,
          provinceName,
          telNumber,
          userName
        } = result;
        // 构建一个新的对象
        const address = {
          cityName,
          countyName,
          detailInfo,
          nationalCode,
          postalCode,
          provinceName,
          telNumber,
          userName,
          // 额外拼接了一个新的字符串
          addressDetail: `${provinceName}${cityName}${countyName}${detailInfo}`
        }
        // 把地址信息保存到本地存储
        wx.setStorageSync('address', address);
        // 更新页面数据
        this.setData({
          address
        });
      },
      // 如果用户拒绝了授权，只会触发调用失败的回调函数
      fail: (err) => {
        wx.showToast({
          title: '你取消了地址选择',
          icon: 'none'
        });
      }
    });
  }
})