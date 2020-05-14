/**
 * 基本字号适配规则
 * 
 * 以iphone6/7/8分辨率为1334*750像素为设计搞
 * scale = 1 / dpr;
 * 1rem = document.documentElement.clientWidth / (750 / _baseFontSize)
 */

(function (baseFontSize) {
    const _baseFontSize = baseFontSize || 37.5;
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    let dpr = window.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534)) {
        //如果非iOS, 非Android4.3以上, dpr设为1; 
        dpr = 1;

    }
    const scale = 1 / dpr;
    const metaEl = document.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = document.createElement("meta");
        metaEl.setAttribute("name", "viewport");
        window.document.head.appendChild(metaEl);
    }
    metaEl.setAttribute(
        "content",
        "width=device-width,user-scalable=no,initial-scale=" +
        scale +
        ",maximum-scale=" +
        scale +
        ",minimum-scale=" +
        scale
    );
    document.documentElement.style.fontSize =
        document.documentElement.clientWidth / (750 / _baseFontSize) + "px";

    window.addEventListener('resize',function(){
        document.documentElement.style.fontSize =
            document.documentElement.clientWidth / (750 / _baseFontSize) + "px";
    })
})()