!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).pingpp=e()}}(function(){return function l(i,c,o){function s(a,e){if(!c[a]){if(!i[a]){var n="function"==typeof require&&require;if(!e&&n)return n(a,!0);if(u)return u(a,!0);var r=new Error("Cannot find module '"+a+"'");throw r.code="MODULE_NOT_FOUND",r}var t=c[a]={exports:{}};i[a][0].call(t.exports,function(e){return s(i[a][1][e]||e)},t,t.exports,l,i,c,o)}return c[a].exports}for(var u="function"==typeof require&&require,e=0;e<o.length;e++)s(o[e]);return s}({1:[function(e,a,n){var l={}.hasOwnProperty,i=e('./callbacks'),c=e('./utils');a.exports={signAgreement:function(e){var a;if('string'==typeof e)try{a=JSON.parse(e)}catch(e){return i.innerAgreementCallback('fail',i.error('json_decode_fail',e)),!1}else a=e;if(void 0===a)return i.innerAgreementCallback('fail',i.error('json_decode_fail')),!1;if(!l.call(a,'object')||'agreement'!==a.object||!l.call(a,'channel')||!l.call(a,'credential')||'object'!=typeof a.credential)return i.innerAgreementCallback('fail',i.error('invalid_object')),!1;if(!l.call(a.credential,a.channel))return i.innerAgreementCallback('fail',i.error('invalid_credential')),!1;var n,r=a.credential[a.channel];if('string'==typeof r?n=r:l.call(r,'credential')&&'string'==typeof r.credential&&(n=r.credential),void 0===n)return i.innerAgreementCallback('fail',i.error('invalid_credential')),!1;if('alipay'===a.channel.substring(0,6)){var t=new URL(n);n='http://d.alipay.com/i/index.htm?iframeSrc='+encodeURIComponent("alipays://platformapi/startapp?appId=60000157&appClearTop=false&startMultApp=YES&sign_params="+encodeURIComponent(t.search.substring(1)))}return setTimeout(function(){c.redirectTo(n)},0),!0}}},{"./callbacks":2,"./utils":52}],2:[function(n,e,a){e.exports={userCallback:void 0,urlReturnCallback:void 0,urlReturnChannels:['alipay_pc_direct'],userAgreementCallback:void 0,innerCallback:function(e,a){'function'==typeof this.userCallback&&(void 0===a&&(a=this.error()),this.userCallback(e,a),this.userCallback=void 0,n('./payment_elements').clear())},error:function(e,a){return{msg:e=void 0===e?'':e,extra:a=void 0===a?'':a}},triggerUrlReturnCallback:function(e,a){'function'==typeof this.urlReturnCallback&&this.urlReturnCallback(e,a)},shouldReturnUrlByCallback:function(e){return'function'==typeof this.urlReturnCallback&&-1!==this.urlReturnChannels.indexOf(e)},innerAgreementCallback:function(e,a){'function'==typeof this.userAgreementCallback&&(void 0===a&&(a=this.error()),this.userAgreementCallback(e,a),this.userAgreementCallback=void 0)}}},{"./payment_elements":49}],3:[function(e,a,n){var r=e('../callbacks'),t={}.hasOwnProperty;a.exports={PINGPP_NOTIFY_URL_BASE:'https://notify.pingxx.com/notify',handleCharge:function(e){var a=e.credential[e.channel];a||t.call(a,'orderInfo')?this.callpay(a.orderInfo):r.innerCallback('fail',r.error('invalid_credential','missing_alipay'))},alipayLiteEnabled:function(){return'undefined'!=typeof my&&my.tradePay},callpay:function(e){var a=this;if(this.alipayLiteEnabled())return this.alipayLitePay(e);if('undefined'!=typeof navigator&&/AlipayClient/.test(navigator.userAgent||navigator.swuserAgent))return this.waitAlipayJSBridgde(function(){a.alipayJsBridgePay(e)});var n='请在支付宝小程序或者支付宝应用内中打开';console.log(n),r.innerCallback('fail',r.error(n))},waitAlipayJSBridgde:function(e){window.AlipayJSBridge?e&&e():document.addEventListener('AlipayJSBridgeReady',e,!1)},alipayJsBridgePay:function(e){AlipayJSBridge.call('tradePay',{orderStr:e},this.alipayResultHandler)},alipayLitePay:function(e){var a={};a.orderStr=e,a.complete=this.alipayResultHandler,my.tradePay(a)},alipayResultHandler:function(e){var a={resultCode:e.resultCode};t.call(e,'memo')&&(a.memo=e.memo),t.call(e,'result')&&(a.result=e.result),'9000'==e.resultCode?r.innerCallback('success',r.error('',a)):'6001'==e.resultCode?r.innerCallback('cancel',r.error('用户取消支付',a)):r.innerCallback('fail',r.error('支付失败',a))},runTestMode:function(e){var a='/charges/'+e.id;my.httpRequest({url:this.PINGPP_NOTIFY_URL_BASE+a+'?livemode=false',success:function(e){'success'==e.data?r.innerCallback('success'):r.innerCallback('fail',r.error('testmode_notify_fail'))},fail:function(){r.innerCallback('fail',r.error('network_err'))}})}}},{"../callbacks":2}],4:[function(e,a,n){var r=e('../callbacks');a.exports={PINGPP_NOTIFY_URL_BASE:'https://notify.pingxx.com/notify',handleCharge:function(e){var a=e.credential[e.channel];a?this.callpay(a):r.innerCallback('fail',r.error('invalid_credential','missing_alipay_lite'))},alipayLiteEnabled:function(){return'undefined'!=typeof my&&my.tradePay},callpay:function(e){if(this.alipayLiteEnabled()){var a={};a.tradeNO=e,a.complete=function(e){9e3==e.resultCode?r.innerCallback('success'):6001==e.resultCode?r.innerCallback('cancel',r.error('用户取消支付')):r.innerCallback('fail',r.error('支付失败'))},my.tradePay(a)}else console.log('请在支付宝小程序中打开')},runTestMode:function(e){var a='/charges/'+e.id;my.httpRequest({url:this.PINGPP_NOTIFY_URL_BASE+a+'?livemode=false',success:function(e){'success'==e.data?r.innerCallback('success'):r.innerCallback('fail',r.error('testmode_notify_fail'))},fail:function(){r.innerCallback('fail',r.error('network_err'))}})}}},{"../callbacks":2}],5:[function(e,a,n){var l=e('../utils'),i={}.hasOwnProperty;a.exports={ALIPAY_PC_DIRECT_URL:'https://mapi.alipay.com/gateway.do',handleCharge:function(e){var a=e.channel,n=e.credential[a],r=this.ALIPAY_PC_DIRECT_URL;i.call(n,'channel_url')&&(r=n.channel_url),i.call(n,'_input_charset')||i.call(n,'service')&&'create_direct_pay_by_user'===n.service&&(n._input_charset='utf-8');var t=l.stringifyData(n,a,!0);l.redirectTo(r+'?'+t,a)}}},{"../utils":52}],6:[function(e,a,n){var r={}.hasOwnProperty,t=e('../callbacks');a.exports={handleCharge:function(e){var a=e.credential[e.channel];r.call(a,'transaction_no')?this.tradePay(a.transaction_no):t.innerCallback('fail',t.error('invalid_credential','missing_field_transaction_no'))},ready:function(e){window.AlipayJSBridge?e&&e():document.addEventListener('AlipayJSBridgeReady',e,!1)},tradePay:function(e){this.ready(function(){AlipayJSBridge.call('tradePay',{tradeNO:e},function(e){'9000'==e.resultCode?t.innerCallback('success'):'6001'==e.resultCode?t.innerCallback('cancel',t.error(e.result)):t.innerCallback('fail',t.error(e.result))})})}}},{"../callbacks":2}],7:[function(e,a,n){var r=e('./commons/redirect_base');a.exports={handleCharge:function(e){r.handleCharge(e)}}},{"./commons/redirect_base":23}],8:[function(e,a,n){var i=e('../utils'),c=e('../mods'),o={}.hasOwnProperty;a.exports={ALIPAY_WAP_URL_OLD:'https://wappaygw.alipay.com/service/rest.htm',ALIPAY_WAP_URL:'https://mapi.alipay.com/gateway.do',handleCharge:function(e){var a=e.channel,n=e.credential[a],r=this.ALIPAY_WAP_URL;o.call(n,'req_data')?r=this.ALIPAY_WAP_URL_OLD:o.call(n,'channel_url')&&(r=n.channel_url),o.call(n,'_input_charset')||(o.call(n,'service')&&'alipay.wap.create.direct.pay.by.user'===n.service||o.call(n,'req_data'))&&(n._input_charset='utf-8');var t=r+'?'+i.stringifyData(n,a,!0),l=c.getExtraModule('ap');i.inWeixin()&&void 0!==l?l.pay(t):i.redirectTo(t,a)}}},{"../mods":48,"../utils":52}],9:[function(e,a,n){arguments[4][7][0].apply(n,arguments)},{"./commons/redirect_base":23,dup:7}],10:[function(e,a,n){var r=e('../utils'),t=e('../callbacks'),l={}.hasOwnProperty;a.exports={handleCharge:function(e){var a=e.channel,n=e.credential[a];l.call(n,'url')?r.redirectTo(n.url+'?'+r.stringifyData(n,a),a):t.innerCallback('fail',t.error('invalid_credential','missing_field:url'))}}},{"../callbacks":2,"../utils":52}],11:[function(e,a,n){var l=e('../utils'),i={}.hasOwnProperty;a.exports={ALIPAY_PC_DIRECT_URL:'https://intlmapi.alipay.com/gateway.do',handleCharge:function(e){var a=e.channel,n=e.credential[a],r=this.ALIPAY_PC_DIRECT_URL;i.call(n,'channel_url')&&(r=n.channel_url),i.call(n,'_input_charset')||i.call(n,'service')&&'create_forex_trade'===n.service&&(n._input_charset='utf-8');var t=l.stringifyData(n,a,!0);l.redirectTo(r+'?'+t,a)}}},{"../utils":52}],12:[function(e,a,n){var i=e('../utils'),c=e('../mods'),o={}.hasOwnProperty;a.exports={ALIPAY_WAP_URL:'https://intlmapi.alipay.com/gateway.do',handleCharge:function(e){var a=e.channel,n=e.credential[a],r=this.ALIPAY_WAP_URL;o.call(n,'channel_url')&&(r=n.channel_url),o.call(n,'_input_charset')||o.call(n,'service')&&'create_forex_trade_wap'===n.service&&(n._input_charset='utf-8');var t=r+'?'+i.stringifyData(n,a,!0),l=c.getExtraModule('ap');i.inWeixin()&&void 0!==l?l.pay(t):i.redirectTo(t,a)}}},{"../mods":48,"../utils":52}],13:[function(e,a,n){var t=e('../callbacks'),r=e('../utils'),l=e('../stash'),i=e('../mods'),c={}.hasOwnProperty;a.exports={PINGPP_NOTIFY_URL_BASE:'https://notify.pingxx.com/notify',handleCharge:function(e){for(var a=e.credential[e.channel],n=['appId','timeStamp','nonceStr','package','signType','paySign'],r=0;r<n.length;r++)if(!c.call(a,n[r]))return void t.innerCallback('fail',t.error('invalid_credential','missing_field_'+n[r]));l.jsApiParameters=a,this.callpay()},callpay:function(){var e=this,a=i.getExtraModule('wx_jssdk');if(void 0!==a&&a.jssdkEnabled())a.callpay();else if('undefined'==typeof WeixinJSBridge){var n=function(){e.jsApiCall()};document.addEventListener?document.addEventListener('WeixinJSBridgeReady',n,!1):document.attachEvent&&(document.attachEvent('WeixinJSBridgeReady',n),document.attachEvent('onWeixinJSBridgeReady',n))}else this.jsApiCall()},jsApiCall:function(){c.call(l,'jsApiParameters')&&WeixinJSBridge.invoke('getBrandWCPayRequest',l.jsApiParameters,function(e){delete l.jsApiParameters,'get_brand_wcpay_request:ok'==e.err_msg?t.innerCallback('success'):'get_brand_wcpay_request:cancel'==e.err_msg?t.innerCallback('cancel'):t.innerCallback('fail',t.error('wx_result_fail',e.err_msg))})},runTestMode:function(e){if(confirm('模拟付款？')){var a='/charges/'+e.id;r.request(this.PINGPP_NOTIFY_URL_BASE+a+'?livemode=false','GET',null,function(e,a){if(200<=a&&a<400&&'success'==e)t.innerCallback('success');else{var n='http_code:'+a+';response:'+e;t.innerCallback('fail',t.error('testmode_notify_fail',n))}},function(){t.innerCallback('fail',t.error('network_err'))})}}}},{"../callbacks":2,"../mods":48,"../stash":50,"../utils":52}],14:[function(e,a,n){arguments[4][7][0].apply(n,arguments)},{"./commons/redirect_base":23,dup:7}],15:[function(e,a,n){var t=e('../utils'),l={}.hasOwnProperty,i=e('../callbacks');a.exports={CCB_WAP_URL_BASE:'https://ibsbjstar.ccb.com.cn/CCBIS/ccbMain?',handleCharge:function(e){var a=e.channel,n=e.credential[a];if(l.call(n,'orderinfo')){var r=this.CCB_WAP_URL_BASE+n.orderinfo;t.redirectTo(r,a)}else i.innerCallback('fail',i.error('invalid_credential','missing_field:orderinfo'))}}},{"../callbacks":2,"../utils":52}],16:[function(e,a,n){var r=e('../utils'),t=e('../callbacks');a.exports={handleCharge:function(e){var a=e.credential[e.channel];'string'==typeof a?r.redirectTo(a,e.channel):t.innerCallback('fail',t.error('invalid_credential','credential 格式不正确'))}}},{"../callbacks":2,"../utils":52}],17:[function(e,a,n){arguments[4][16][0].apply(n,arguments)},{"../callbacks":2,"../utils":52,dup:16}],18:[function(e,a,n){var r=e('../utils'),t=e('../callbacks');a.exports={handleCharge:function(e){var a=e.credential[e.channel];'string'==typeof a?r.redirectTo(a,e.channel):t.innerCallback('fail',t.error('invalid_credential','credential 格式不正确'))}}},{"../callbacks":2,"../utils":52}],19:[function(e,a,n){arguments[4][16][0].apply(n,arguments)},{"../callbacks":2,"../utils":52,dup:16}],20:[function(e,a,n){arguments[4][16][0].apply(n,arguments)},{"../callbacks":2,"../utils":52,dup:16}],21:[function(e,a,n){var t=e('../utils'),l={}.hasOwnProperty;a.exports={handleCharge:function(e){var a,n=e.channel,r=e.credential[n];l.call(r,'channel_url')&&(a=r.channel_url,delete r.channel_url),t.formSubmit(a,'post',r)}}},{"../utils":52}],22:[function(e,a,n){var r=e('../utils'),t={}.hasOwnProperty;a.exports={CMB_WALLET_URL:'https://netpay.cmbchina.com/netpayment/BaseHttp.dll?MB_EUserPay',handleCharge:function(e){var a=e.credential[e.channel],n=this.CMB_WALLET_URL;t.call(a,'ChannelUrl')&&(n=a.ChannelUrl,delete a.ChannelUrl),t.call(a,'channelVersion')&&delete a.channelVersion,r.formSubmit(n,'post',a)}}},{"../utils":52}],23:[function(e,a,n){var r=e('../../utils'),t=e('../../callbacks'),l={}.hasOwnProperty;a.exports={handleCharge:function(e){var a,n=e.credential[e.channel];if('string'==typeof n)a=n;else{if(!l.call(n,'url'))return void t.innerCallback('fail',t.error('invalid_credential','credential format is incorrect'));a=n.url}r.redirectTo(a,e.channel)}}},{"../../callbacks":2,"../../utils":52}],24:[function(e,a,n){var r=e('../utils');a.exports={handleCharge:function(e){var a=e.credential[e.channel];r.formSubmit(a.request_url,'post',a.request_data)}}},{"../utils":52}],25:[function(e,a,n){var r=e('../utils');a.exports={CP_B2B_URL:'https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0',handleCharge:function(e){var a=e.credential[e.channel];r.formSubmit(this.CP_B2B_URL,'post',a)}}},{"../utils":52}],26:[function(e,a,n){var r,o,t=e('../../stash'),l={}.hasOwnProperty;o={PADCHAR:'=',ALPHA:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',makeDOMException:function(){try{return new DOMException(DOMException.INVALID_CHARACTER_ERR)}catch(e){var a=new Error('DOM Exception 5');return a.code=a.number=5,a.name=a.description='INVALID_CHARACTER_ERR',a.toString=function(){return'Error: '+a.name+': '+a.message},a}},getbyte64:function(e,a){var n=o.ALPHA.indexOf(e.charAt(a));if(-1===n)throw o.makeDOMException();return n},decode:function(e){e=''+e;var a,n,r,t=o.getbyte64,l=e.length;if(0===l)return e;if(l%4!=0)throw o.makeDOMException();a=0,e.charAt(l-1)===o.PADCHAR&&(a=1,e.charAt(l-2)===o.PADCHAR&&(a=2),l-=4);var i=[];for(n=0;n<l;n+=4)r=t(e,n)<<18|t(e,n+1)<<12|t(e,n+2)<<6|t(e,n+3),i.push(String.fromCharCode(r>>16,r>>8&255,255&r));switch(a){case 1:r=t(e,n)<<18|t(e,n+1)<<12|t(e,n+2)<<6,i.push(String.fromCharCode(r>>16,r>>8&255));break;case 2:r=t(e,n)<<18|t(e,n+1)<<12,i.push(String.fromCharCode(r>>16))}return i.join('')},getbyte:function(e,a){var n=e.charCodeAt(a);if(255<n)throw o.makeDOMException();return n},encode:function(e){if(1!==arguments.length)throw new SyntaxError('Not enough arguments');var a,n,r=o.PADCHAR,t=o.ALPHA,l=o.getbyte,i=[],c=(e=''+e).length-e.length%3;if(0===e.length)return e;for(a=0;a<c;a+=3)n=l(e,a)<<16|l(e,a+1)<<8|l(e,a+2),i.push(t.charAt(n>>18)),i.push(t.charAt(n>>12&63)),i.push(t.charAt(n>>6&63)),i.push(t.charAt(63&n));switch(e.length-c){case 1:n=l(e,a)<<16,i.push(t.charAt(n>>18)+t.charAt(n>>12&63)+r+r);break;case 2:n=l(e,a)<<16|l(e,a+1)<<8,i.push(t.charAt(n>>18)+t.charAt(n>>12&63)+t.charAt(n>>6&63)+r)}return i.join('')}},(r={}).url='pay.htm',r.pay=function(e){var a=encodeURIComponent(o.encode(e));l.call(t,'APURL')&&(r.url=t.APURL),location.href=r.url+'?goto='+a},r.decode=function(e){return o.decode(decodeURIComponent(e))},a.exports=r},{"../../stash":50}],27:[function(e,a,n){var r=e('./wx_lite');a.exports=r},{"./wx_lite":38}],28:[function(e,a,n){var r=e('./commons/redirect_base'),t=e('../callbacks'),l=e('../utils'),i={}.hasOwnProperty;a.exports={handleCharge:function(e){var a=e.extra;if(i.call(a,'pay_channel')){var n=a.pay_channel;'wx'!==n||l.inWeixin()?'alipay'!==n||l.inAlipay()?r.handleCharge(e):t.innerCallback('fail',t.error('Not in the Alipay browser')):t.innerCallback('fail',t.error('Not in the WeChat browser'))}else t.innerCallback('fail',t.error('invalid_charge','charge 格式不正确'))}}},{"../callbacks":2,"../utils":52,"./commons/redirect_base":23}],29:[function(e,a,n){var r=e('../utils'),t={}.hasOwnProperty;a.exports={JDPAY_WAP_URL_OLD:'https://m.jdpay.com/wepay/web/pay',JDPAY_H5_URL:'https://h5pay.jd.com/jdpay/saveOrder',JDPAY_PC_URL:'https://wepay.jd.com/jdpay/saveOrder',handleCharge:function(e){var a=e.credential[e.channel],n=this.JDPAY_H5_URL;t.call(a,'channelUrl')?(n=a.channelUrl,delete a.channelUrl):t.call(a,'merchantRemark')&&(n=this.JDPAY_WAP_URL_OLD),r.formSubmit(n,'post',a)}}},{"../utils":52}],30:[function(e,a,n){var r=e('../utils'),t={}.hasOwnProperty;a.exports={handleCharge:function(e){var a=e.credential[e.channel];t.call(a,'bankUrl')&&(request_url=a.bankUrl,delete a.bankUrl),r.formSubmit(request_url,'post',a)}}},{"../utils":52}],31:[function(e,a,n){arguments[4][30][0].apply(n,arguments)},{"../utils":52,dup:30}],32:[function(e,a,n){var r=e('../utils');a.exports={handleCharge:function(e){var a=e.credential[e.channel],n=a.channelUrl;delete a.channelUrl,r.formSubmit(n,'post',a)}}},{"../utils":52}],33:[function(e,a,n){var r=e('../utils');a.exports={handleCharge:function(e){var a=e.credential[e.channel];r.redirectTo(a,e.channel)}}},{"../utils":52}],34:[function(e,a,n){var r=e('../callbacks'),t=e('../utils'),l=e('../stash'),i={}.hasOwnProperty;a.exports={SRC_URL:'https://open.mobile.qq.com/sdk/qqapi.js?_bid=152',ID:'mqq_api',handleCharge:function(e){var a=e.credential[e.channel];i.call(a,'token_id')?(l.tokenId=a.token_id,t.loadUrlJs(this.ID,this.SRC_URL,this.callpay)):r.innerCallback('fail',r.error('invalid_credential','missing_token_id'))},callpay:function(){if('undefined'!=typeof mqq){if(0==mqq.QQVersion)return r.innerCallback('fail',r.error('Not in the QQ client')),void delete l.tokenId;mqq.tenpay.pay({tokenId:l.tokenId},function(e){0==e.resultCode?r.innerCallback('success'):r.innerCallback('fail',r.error(e.retmsg))})}else r.innerCallback('fail',r.error('network_err'));delete l.tokenId}}},{"../callbacks":2,"../stash":50,"../utils":52}],35:[function(e,a,n){arguments[4][21][0].apply(n,arguments)},{"../utils":52,dup:21}],36:[function(e,a,n){var r=e('../utils');a.exports={UPACP_PC_URL:'https://gateway.95516.com/gateway/api/frontTransReq.do',handleCharge:function(e){var a=e.credential[e.channel];r.formSubmit(this.UPACP_PC_URL,'post',a)}}},{"../utils":52}],37:[function(e,a,n){var r=e('../utils');a.exports={UPACP_WAP_URL:'https://gateway.95516.com/gateway/api/frontTransReq.do',handleCharge:function(e){var a=e.credential[e.channel];r.formSubmit(this.UPACP_WAP_URL,'post',a)}}},{"../utils":52}],38:[function(e,a,n){var t=e('../stash'),l=e('../callbacks'),i={}.hasOwnProperty;a.exports={PINGPP_NOTIFY_URL_BASE:'https://notify.pingxx.com/notify',handleCharge:function(e){for(var a=e.credential[e.channel],n=['appId','timeStamp','nonceStr','package','signType','paySign'],r=0;r<n.length;r++)if(!i.call(a,n[r]))return void l.innerCallback('fail',l.error('invalid_credential','missing_field_'+n[r]));t.jsApiParameters=a,this.callpay()},wxLiteEnabled:function(){return'undefined'!=typeof wx&&wx.requestPayment},callpay:function(){if(this.wxLiteEnabled()){var e=t.jsApiParameters;delete e.appId,e.complete=function(e){'requestPayment:ok'===e.errMsg&&l.innerCallback('success'),'requestPayment:cancel'!==e.errMsg&&'requestPayment:fail cancel'!==e.errMsg||l.innerCallback('cancel',l.error('用户取消支付')),'undefined'!==e.err_code&&'undefined'!==e.err_desc&&l.innerCallback('fail',l.error(e.err_desc,e))},wx.requestPayment(e)}else console.log('请在微信小程序中打开')},runTestMode:function(e){var a='/charges/'+e.id;wx.request({url:this.PINGPP_NOTIFY_URL_BASE+a+'?livemode=false',success:function(e){'success'==e.data?l.innerCallback('success'):l.innerCallback('fail',l.error('testmode_notify_fail'))},fail:function(){l.innerCallback('fail',l.error('network_err'))}})}}},{"../callbacks":2,"../stash":50}],39:[function(e,a,n){arguments[4][27][0].apply(n,arguments)},{"./wx_lite":38,dup:27}],40:[function(e,a,n){arguments[4][13][0].apply(n,arguments)},{"../callbacks":2,"../mods":48,"../stash":50,"../utils":52,dup:13}],41:[function(e,a,n){var r=e('./wx_pub');a.exports=r},{"./wx_pub":40}],42:[function(e,a,n){arguments[4][41][0].apply(n,arguments)},{"./wx_pub":40,dup:41}],43:[function(e,a,n){var r=e('../utils'),t=e('../callbacks'),l={}.hasOwnProperty;a.exports={handleCharge:function(e){var a=e.credential[e.channel];'string'==typeof a?r.redirectTo(a,e.channel):'object'==typeof a&&l.call(a,'url')?r.redirectTo(a.url,e.channel):t.innerCallback('fail',t.error('invalid_credential','credential 格式不正确'))}}},{"../callbacks":2,"../utils":52}],44:[function(e,a,n){var i=e('../utils'),c=e('../callbacks'),o={}.hasOwnProperty;a.exports={YEEPAY_WAP_URL:'https://ok.yeepay.com/paymobile/api/pay/request',YEEPAY_WAP_TEST_URL:'http://mobiletest.yeepay.com/paymobile/api/pay/request',handleCharge:function(e){for(var a,n=e.channel,r=e.credential[n],t=['merchantaccount','encryptkey','data'],l=0;l<t.length;l++)if(!o.call(r,t[l]))return void c.innerCallback('fail',c.error('invalid_credential','missing_field_'+t[l]));a=o.call(r,'mode')&&'test'==r.mode?this.YEEPAY_WAP_TEST_URL:this.YEEPAY_WAP_URL,i.redirectTo(a+'?'+i.stringifyData(r,n,!0),e.channel)}}},{"../callbacks":2,"../utils":52}],45:[function(e,a,n){a.exports={Error:function(e,a){this.message=e,this.extra=a}}},{}],46:[function(e,a,n){var r=e('./stash'),t=e('./utils');a.exports={init:function(){var e=this;t.documentReady(function(){try{!t.inWxLite()&&!t.inAlipayLite()&&e.initPuid()}catch(e){}})},initPuid:function(){if('undefined'!=typeof window&&'undefined'!=typeof localStorage&&null!==localStorage){var e=localStorage.getItem('pingpp_uid');if(null===e){e=t.randomString();try{localStorage.setItem('pingpp_uid',e)}catch(e){}}r.puid=e}}}},{"./stash":50,"./utils":52}],47:[function(e,a,n){var r=e('./version').v,i={}.hasOwnProperty,PingppSDK=function(){e('./init').init()};PingppSDK.prototype.version=r,a.exports=new PingppSDK;var c=e('./testmode'),o=e('./callbacks'),s=e('./errors').Error,u=e('./mods'),p=e('./stash'),d=e('./payment_elements');PingppSDK.prototype.createPayment=function(e,a,n,r){'function'==typeof a&&(o.userCallback=a);try{d.init(e)}catch(e){if(e instanceof s)return void o.innerCallback('fail',o.error(e.message,e.extra));throw e}if(i.call(d,'id'))if(i.call(d,'channel')){i.call(d,'app')&&('string'==typeof d.app?p.app_id=d.app:'object'==typeof d.app&&'string'==typeof d.app.id&&(p.app_id=d.app.id));var t=d.channel;if(i.call(d,'credential'))if(d.paid&&0===d.actual_amount)o.innerCallback('success');else if(d.credential)if(i.call(d.credential,t))if(i.call(d,'livemode')){var l=u.getChannelModule(t);if(void 0===l)return console.error('channel module "'+t+'" is undefined'),void o.innerCallback('fail',o.error('invalid_channel','channel module "'+t+'" is undefined'));!1!==d.livemode?(void 0!==n&&(p.signature=n),'boolean'==typeof r&&(p.debug=r),l.handleCharge(d)):i.call(l,'runTestMode')?l.runTestMode(d):c.runTestMode(d)}else o.innerCallback('fail',o.error('invalid_charge','no_livemode_field'));else o.innerCallback('fail',o.error('invalid_credential','credential_is_incorrect'));else o.innerCallback('fail',o.error('invalid_credential','credential_is_undefined'));else o.innerCallback('fail',o.error('invalid_charge','no_credential'))}else o.innerCallback('fail',o.error('invalid_charge','no_channel'));else o.innerCallback('fail',o.error('invalid_charge','no_charge_id'))},PingppSDK.prototype.setAPURL=function(e){p.APURL=e},PingppSDK.prototype.setUrlReturnCallback=function(e,a){if('function'!=typeof e)throw'callback need to be a function';if(o.urlReturnCallback=e,void 0!==a){if(!Array.isArray(a))throw'channels need to be an array';o.urlReturnChannels=a}},PingppSDK.prototype.signAgreement=function(e,a){'function'==typeof a&&(o.userAgreementCallback=a);var n=u.getExtraModule('agreement');return void 0===n?(console.error('module "agreement" is undefined'),o.innerCallback('fail',o.error('invalid_module','module "agreement" is undefined')),!1):n.signAgreement(e)}},{"./callbacks":2,"./errors":45,"./init":46,"./mods":48,"./payment_elements":49,"./stash":50,"./testmode":51,"./version":53}],48:[function(e,a,n){var r={}.hasOwnProperty,t={};(a.exports=t).channels={alipay:e('./channels/alipay'),alipay_lite:e('./channels/alipay_lite'),alipay_pc_direct:e('./channels/alipay_pc_direct'),alipay_qr:e('./channels/alipay_qr'),alipay_qr_lakala:e('./channels/alipay_qr_lakala'),alipay_wap:e('./channels/alipay_wap'),alipay_wap_lakala:e('./channels/alipay_wap_lakala'),bfb_wap:e('./channels/bfb_wap'),cb_alipay_pc_direct:e('./channels/cb_alipay_pc_direct'),cb_alipay_wap:e('./channels/cb_alipay_wap'),cb_wx_pub:e('./channels/cb_wx_pub'),ccb_qr:e('./channels/ccb_qr'),ccb_wap:e('./channels/ccb_wap'),chinaums_alipay_pub:e('./channels/chinaums_alipay_pub'),chinaums_alipay_wap:e('./channels/chinaums_alipay_wap'),chinaums_upacp_wap:e('./channels/chinaums_upacp_wap'),chinaums_wx_pub:e('./channels/chinaums_wx_pub'),chinaums_wx_wap:e('./channels/chinaums_wx_wap'),cmb_pc_qr:e('./channels/cmb_pc_qr'),cmb_wallet:e('./channels/cmb_wallet'),coolcredit:e('./channels/coolcredit'),cp_b2b:e('./channels/cp_b2b'),isv_lite:e('./channels/isv_lite'),isv_wap:e('./channels/isv_wap'),jdpay_wap:e('./channels/jdpay_wap'),nucc_b2b_lakala:e('./channels/nucc_b2b_lakala'),nucc_b2c_lakala:e('./channels/nucc_b2c_lakala'),pab_pc:e('./channels/pab_pc'),paypal:e('./channels/paypal'),qpay_pub:e('./channels/qpay_pub'),upacp_b2b:e('./channels/upacp_b2b'),upacp_pc:e('./channels/upacp_pc'),upacp_wap:e('./channels/upacp_wap'),wx_lite:e('./channels/wx_lite'),wx_lite_pab:e('./channels/wx_lite_pab'),wx_pub:e('./channels/wx_pub'),wx_pub_hzbank:e('./channels/wx_pub_hzbank'),wx_pub_pab:e('./channels/wx_pub_pab'),wx_wap:e('./channels/wx_wap'),yeepay_wap:e('./channels/yeepay_wap')},t.extras={ap:e('./channels/extras/ap'),agreement:e('./agreement')},t.getChannelModule=function(e){if(r.call(t.channels,e))return t.channels[e]},t.getExtraModule=function(e){if(r.call(t.extras,e))return t.extras[e]}},{"./agreement":1,"./channels/alipay":3,"./channels/alipay_lite":4,"./channels/alipay_pc_direct":5,"./channels/alipay_qr":6,"./channels/alipay_qr_lakala":7,"./channels/alipay_wap":8,"./channels/alipay_wap_lakala":9,"./channels/bfb_wap":10,"./channels/cb_alipay_pc_direct":11,"./channels/cb_alipay_wap":12,"./channels/cb_wx_pub":13,"./channels/ccb_qr":14,"./channels/ccb_wap":15,"./channels/chinaums_alipay_pub":16,"./channels/chinaums_alipay_wap":17,"./channels/chinaums_upacp_wap":18,"./channels/chinaums_wx_pub":19,"./channels/chinaums_wx_wap":20,"./channels/cmb_pc_qr":21,"./channels/cmb_wallet":22,"./channels/coolcredit":24,"./channels/cp_b2b":25,"./channels/extras/ap":26,"./channels/isv_lite":27,"./channels/isv_wap":28,"./channels/jdpay_wap":29,"./channels/nucc_b2b_lakala":30,"./channels/nucc_b2c_lakala":31,"./channels/pab_pc":32,"./channels/paypal":33,"./channels/qpay_pub":34,"./channels/upacp_b2b":35,"./channels/upacp_pc":36,"./channels/upacp_wap":37,"./channels/wx_lite":38,"./channels/wx_lite_pab":39,"./channels/wx_pub":40,"./channels/wx_pub_hzbank":41,"./channels/wx_pub_pab":42,"./channels/wx_wap":43,"./channels/yeepay_wap":44}],49:[function(e,a,n){var l=e('./errors').Error,i={}.hasOwnProperty;a.exports={id:null,or_id:null,channel:null,app:null,credential:{},extra:null,livemode:null,order_no:null,time_expire:null,paid:!1,status:null,actual_amount:null,init:function(e){var a;if('string'==typeof e)try{a=JSON.parse(e)}catch(e){throw new l('json_decode_fail',e)}else a=e;if(void 0===a)throw new l('json_decode_fail');if(i.call(a,'object')&&'order'==a.object){a.or_id=a.id,a.order_no=a.merchant_order_no;var n=a.charge_essentials;if(a.channel=n.channel,a.credential=n.credential,a.extra=n.extra,i.call(a,'charge')&&null!=a.charge)a.id=a.charge;else if(i.call(n,'id')&&null!=n.id)a.id=n.id;else if(i.call(a,'charges'))for(var r=0;r<a.charges.data.length;r++)if(a.charges.data[r].channel===n.channel){a.id=a.charges.data[r].id;break}}else i.call(a,'object')&&'recharge'==a.object&&(a=a.charge);for(var t in this)i.call(a,t)&&(this[t]=a[t]);return this},clear:function(){for(var e in this)'function'!=typeof this[e]&&(this[e]=null)}}},{"./errors":45}],50:[function(e,a,n){a.exports={}},{}],51:[function(e,a,n){var r=e('./utils'),t={}.hasOwnProperty;a.exports={PINGPP_MOCK_URL:'http://sissi.pingxx.com/mock.php',runTestMode:function(e){var a={ch_id:e.id,scheme:'http',channel:e.channel};t.call(e,'order_no')?a.order_no=e.order_no:t.call(e,'orderNo')&&(a.order_no=e.orderNo),t.call(e,'time_expire')?a.time_expire=e.time_expire:t.call(e,'timeExpire')&&(a.time_expire=e.timeExpire),t.call(e,'extra')&&(a.extra=encodeURIComponent(JSON.stringify(e.extra))),r.redirectTo(this.PINGPP_MOCK_URL+'?'+r.stringifyData(a),e.channel)}}},{"./utils":52}],52:[function(e,a,n){var r=e('./callbacks'),o={}.hasOwnProperty,s=a.exports={stringifyData:function(e,a,n){void 0===n&&(n=!1);var r=[];for(var t in e)o.call(e,t)&&'function'!=typeof e[t]&&('bfb_wap'==a&&'url'==t||'yeepay_wap'==a&&'mode'==t||'channel_url'!=t&&r.push(t+'='+(n?encodeURIComponent(e[t]):e[t])));return r.join('&')},request:function(e,a,n,r,t,l){if('undefined'!=typeof XMLHttpRequest){var i=new XMLHttpRequest;if(void 0!==i.timeout&&(i.timeout=6e3),'GET'===(a=a.toUpperCase())&&'object'==typeof n&&n&&(e+='?'+s.stringifyData(n,'',!0)),i.open(a,e,!0),void 0!==l)for(var c in l)o.call(l,c)&&i.setRequestHeader(c,l[c]);'POST'===a?(i.setRequestHeader('Content-type','application/json; charset=utf-8'),i.send(JSON.stringify(n))):i.send(),void 0===r&&(r=function(){}),void 0===t&&(t=function(){}),i.onreadystatechange=function(){4==i.readyState&&r(i.responseText,i.status,i)},i.onerror=function(e){t(i,0,e)}}else console.log('Function XMLHttpRequest is undefined.')},formSubmit:function(e,a,n){if('undefined'!=typeof window){var r=document.createElement('form');for(var t in r.setAttribute('method',a),r.setAttribute('action',e),n)if(o.call(n,t)){var l=document.createElement('input');l.setAttribute('type','hidden'),l.setAttribute('name',t),l.setAttribute('value',n[t]),r.appendChild(l)}document.body.appendChild(r),r.submit()}else console.log('Not a browser, form submit url: '+e)},randomString:function(e){void 0===e&&(e=32);for(var a='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',n=a.length,r='',t=0;t<e;t++)r+=a.charAt(Math.floor(Math.random()*n));return r},redirectTo:function(e,a){r.shouldReturnUrlByCallback(a)?r.triggerUrlReturnCallback(null,e):'undefined'!=typeof window?window.location.href=e:console.log('Not a browser, redirect url: '+e)},inWeixin:function(){return'undefined'!=typeof navigator&&-1!==navigator.userAgent.toLowerCase().indexOf('micromessenger')},inAlipay:function(){return'undefined'!=typeof navigator&&-1!==navigator.userAgent.toLowerCase().indexOf('alipayclient')},inWxLite:function(){return'undefined'!=typeof wx&&(wx.miniProgram||wx.requestPayment)},inAlipayLite:function(){return'undefined'!=typeof my&&my.tradePay},documentReady:function(e){'undefined'!=typeof document?'loading'!=document.readyState?e():document.addEventListener('DOMContentLoaded',e):e()},loadUrlJs:function(e,a,n){var r=document.getElementsByTagName('head')[0],t=null;null==document.getElementById(e)?((t=document.createElement('script')).setAttribute('type','text/javascript'),t.setAttribute('src',a),t.setAttribute('id',e),t.async=!0,null!=n&&(t.onload=t.onreadystatechange=function(){if(t.ready)return!1;t.readyState&&'loaded'!=t.readyState&&'complete'!=t.readyState||(t.ready=!0,n())}),r.appendChild(t)):null!=n&&n()}}},{"./callbacks":2}],53:[function(e,a,n){a.exports={v:'2.2.24'}},{}]},{},[47])(47)});
//# sourceMappingURL=pingpp.js.map
