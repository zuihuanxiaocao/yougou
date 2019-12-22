//引入全局请求组件
 const app = getApp();
//引入runtime
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    swiperImgs: [],
    navImgs: [],
    fashions: []
  },
  //返回顶部
  toTop() {
    //调用页面滚动API
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  async onLoad() {
    const swiperImgs = await app.myAxios({
      url: 'home/swiperdata'
    });
    const navImgs = await app.myAxios({
      url: 'home/catitems'
    });
    const fashions = await app.myAxios({
      url: 'home/floordata'
    });

    this.setData({
      swiperImgs,
      navImgs,
      fashions
    })
    //没有使用封装时的写法
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: res => {
    //     // console.log(res)
    //     this.setData({
    //       swiperImgs: res.data.message
    //     })
    //   }
    // });
    // wx.request({
    //   url:'https://api.zbztb.cn/api/public/v1/home/catitems',
    //   success:res=>{
    //     // console.log(res)
    //     this.setData({
    //       navImgs:res.data.message
    //      })
    //   }
    // });
    // wx.request({
    //   url:'https://api.zbztb.cn/api/public/v1/home/floordata',
    //   success:res=>{
    //     // console.log(res)
    //     this.setData({
    //       fashions:res.data.message
    //     })
    //   }
    // })
  }
})