// ==UserScript==
// @name         云南开放大学加速视频脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  加速视频，针对云南开放大学
// @author       witchsnk
// @match        *://teach.ynou.edu.cn/play/*
// @updateURL    https://github.com/witchsnk/tampermonkeyscript/ynuspeedup.js
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @require      https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js
// @run-at       document-end
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @grant unsafeWindow
// @grant GM_setClipboard
// @grant window.close
// @grant window.focus
// @grant GM_openInTab
// ==/UserScript==


var setting = {
    // 5E3 == 5000，表示毫秒数
    time: 5E3 // 默认响应速度为5秒，不建议小于3秒

    // 1代表开启，0代表关闭
    ,video: 1 // 视频支持后台、切换窗口不暂停，支持多视频，默认开启
    ,work: 1 // 自动答题功能(章节测验)，高准确率，默认开启
    ,jump: 1 // 自动切换任务点、章节，默认开启
    ,test: 1 // 自动答题功能(考试)，高准确率，默认开启

    // 仅开启video时，修改此处才会生效
    ,line: '公网1' // 视频播放的默认资源线路，支持选择清晰度，例如'公网1标清'，默认'公网1'
    ,drag: 0 // 倍速播放、进度条拖动、快进快退，使用此功能会出现不良记录(慎用)，默认关闭

    // 仅开启work时，修改此处才会生效
    ,retry: 0 // 自动答题失败后进行重试，如果网课是需要每章解锁的建议开启，默认关闭

    // 仅开启jump时，修改此处才会生效
    ,check: 1 // 任务点无法自动完成时暂停切换，如果网课已全部解锁的建议关闭，默认开启
},
_self = unsafeWindow,
$ = _self.$ || top.$;

(function() {
    var url = location.pathname;
    if (url.indexOf('playVideo.action') > 0) {
        if (setting.video) {
            var obj = document.getElementsByClassName("sp-l")[0];

            var button = document.createElement("button"); //创建一个input对象（提示框按钮）
            button.id = "id001";
            button.textContent = "静音速度16倍";
            button.style.width = "120px";
            button.style.height = "20px";
            button.style.align = "center";

            //绑定按键点击功能
            button.onclick = function (){
                //var ckplayer = CKobject.getObjectById('ckplayer_a1');
                var videoPlayer = document.getElementById("ckplayer_a1");
                if(videoPlayer.paused){
                    videoPlayer.play();
                }
                videoPlayer.playbackRate = 16;
                videoPlayer.muted = true;
                console.log(videoPlayer.muted);
                return;
            };

            obj.appendChild(button);
        } else {
            setTimeout(toNext, setting.time);
        }
    }
})();

