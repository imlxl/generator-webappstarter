define(function (require, exports, module) {
  var RequestHandler = (function () {
    /**
     * AJAX管理器
     *
     * @param Object option
     * option:{
         *  type : String 请求类型POST/GET
         *  dataType : String 数据解析类型
         *  action :String 请求action
         *  data : Object 请求参数
         *  complete :Function 完毕回调方法
         * }
     * @method AJAXHandler
     */
    function AJAXHandler(option) {
      if (!option) {
        return;
      }
      $.ajax({
        headers: {"cache-control": "no-cache"},
        type: option.type,
        url: option.action,
        dataType: option.dataType,
        contentType: option.contentType,
        data: option.data || null,//空值设置null避免向后端发送undefined无用参数
        success: function (data, status, xhr) {
          if (option.complete && typeof option.complete === 'function') {
            option.complete({
              data: data,
              success: true
            });
          }
        },
        error: function (xhr, errorType, error) {
          if (option.complete && typeof option.complete === 'function') {
            option.complete({
              success: false
            });
          }
        }
      });
    }//end AJAXHandler
    function JSONP(option) {
      if (!option) {
        return;
      }
      $.ajax({
        type: 'GET',
        url: option.action,
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: false,
        contentType: "application/json"
      });
    }

    function getJSON(option) {
      if (!option) {
        return;
      }
      option.type = 'GET';
      option.dataType = 'json';
      AJAXHandler(option);
    }//end getJSON

    function postJSON(option) {
      if (!option) {
        return;
      }
      option.type = 'POST';
      option.dataType = 'json';
      AJAXHandler(option);
    }//end postJSON
    return {
      getJSON: getJSON,
      postJSON: postJSON,
      JSONP: JSONP
    }
  })();
  return RequestHandler;
});
