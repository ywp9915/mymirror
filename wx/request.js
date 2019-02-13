
const Request = ((url, data, method = 'GET')=>{
    return new Promise((resolve,rejest)=>{
        wx.request({
            url,
            method,
            data,
            header: {
                'content-type': 'application/json' // 默认值
            },  
            success(resData){
                resolve(resData)
            },
            fail(err){
                rejest(resData)
            }
        })
    })
})    


module.exports = Request;

