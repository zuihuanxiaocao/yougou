const baseUrl = 'https://api.zbztb.cn/api/public/v1/'
//params 传入的参数
export const myAxios = (params) => {
    //显示加载提示框
    wx.showLoading({
        title: '加载中',
    });
    //函数内部返回 promise 实例
    return new Promise((resolve, reject) => {
        wx.request({
            //解构所有参数
            ...params,
            //把原本的url变成 根路径+目标路径
            url: baseUrl + params.url,
            //成功返回数据
            success: result => {
                resolve(result.data.message); //这个数据源可以改
            },
            //失败返回数据
            fail: error => {
                reject(error);
            },
            //不论失败还是成功返回数据
            complete: () => {
                wx.hideLoading();
            }
        })
    })
}
//向外暴露的另一个写法
// module.exports={
//     myAxios
// }
