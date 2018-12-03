var weChat = {
    apis: 'checkJsApi onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo',
    config: function () {
        var self = this;
        $.ajax({
            url: 'https://uxwx.cmcm.com/wx/signature?project_id=6&url=' + encodeURIComponent(location.href.replace(/#.*$/, '')),
            type: 'get',
            success: function (ret) {
                // carLogin.log(ret);
                wx.config({
                    debug: false, //调试模式
                    appId: ret.data.appId,
                    timestamp: ret.data.timestamp,
                    nonceStr: ret.data.nonceStr,
                    signature: ret.data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                    ]//self.apis.split(' ')
                });
                wx.ready(function () { //需在用户可能点击分享按钮前就先调用
                    // carLogin.log("成功");
                    wx.onMenuShareTimeline(weChat.getShareConfig());
                    wx.onMenuShareAppMessage(weChat.getShareConfig());
                    wx.onMenuShareQQ(weChat.getShareConfig());
                    wx.onMenuShareWeibo(weChat.getShareConfig());
                    wx.onMenuShareQZone(weChat.getShareConfig());
                });
                wx.error(function (res) {
                    // carLogin.log(res);
                    // carLogin.log("失败");
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。                
                });
            },
            error: function (ret) {
                // alert("error:"+JSON.stringify(ret));

                // alert("失败")
            }

        })
    },
    getShareConfig: function () {
        var title = ""; //标题
        var desc = "";  //描述
        var link = ""   //链接地址
        return {
            title: title,
            link: link,
            desc: desc,
            imgUrl: '', //图片
            success: function (e) {
                // alert("成功")
            },
            cancel: function () {
                // alert("取消")
            },
            error: function () {
                // alert("失败")
            }
        }
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var URL = decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if (r != null) {
            //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
            return decodeURI(r[2]);
        };
        return null;
    }
}
weChat.config();