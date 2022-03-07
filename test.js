var uri = window.location.toString();
if (uri.indexOf("?safe=", "?safe=") > 0) {
var clean_uri = uri.substring(0, uri.indexOf("?safe="));
const e = new RegExp("[?&]safe=([^&#]*)").exec(window.location.href);
window.history.pushState({}, document.title, clean_uri);
document.getElementById("aaa").innerHTML = e;
}
