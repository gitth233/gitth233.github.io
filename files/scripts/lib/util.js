define(function () {
  function jump(h){
    var url = location.href;
    location.href = "#"+h;
    history.replaceState(null,null,url);
  }

  function getParam(param){
    var url = new URL(location.href);
    return url.searchParams.get(param);
  }

  return {
    jump: jump,
    getParam: getParam
  }
});
