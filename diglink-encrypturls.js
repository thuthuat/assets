/*!Name: Bitlymaxbong*/
;(function($) {
    $.bitlr = function(options) {
        var defaults = {
            error: function(message) {},
            success: function() {}
        }       
        var plugin = this;
        plugin.settings = {}
        plugin.settings = $.extend({}, defaults, options);
        var s = plugin.settings;
        var params = {
            "long_url" : s.link           
        };
        $.ajax({
    url: "https://api-ssl.bitly.com/v4/shorten",
        //cache: false,
        dataType: "json",
        method: "POST",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + s.apiKey);
        },
        data: JSON.stringify(params)
        }).done(function(data) {
              if(s.anchor === true) {
              s.success.call(this, $('#bitly').append('<tr><td>'+s.orglink+'</td><td>'+s.link+'</td><td>'+data.link+'</td></tr>'));
            } else {
              s.success.call(this, data.link);           
            }
        }).fail(function(data) {
              s.error.call(this);
        });
    }
})(jQuery);

//safelink script

 "use strict";
 $(document).ready(function() {

   config.countdown ? $('#countDown').prop('checked', true) : $('#countDown').prop('checked', false) ;

   $('#passbtn').on('click', function(e) {
     var $this = $(this);
       if($this.hasClass('btn-dark')){
         $this.removeClass('btn-dark').addClass('btn-primary');
         $('#passinput').removeAttr('disabled');
       } else {
         $this.removeClass('btn-success').addClass('btn-dark');
         $('#passinput').attr('disabled', 'disabled')[0].value = '';
       }
     e.preventDefault();
   });
$('#notebtn').on('click', function(e) {
var $this = $(this);
if ($this.hasClass('btn-dark')) {
 $this.removeClass('btn-dark').addClass('btn-primary');
 $('#noteinput').removeAttr('disabled');
} else {
 $this.removeClass('btn-success').addClass('btn-dark');
 $('#noteinput').attr('disabled', 'disabled')[0].value = '';
}
e.preventDefault();
});
$('input[type="checkbox"]').on('change', function() {
$('input[name="' + this.name + '"]').not(this).prop('checked', false);
});
   $('#safelink').on('submit', function(e) {
     e.preventDefault();
     var $this = $(this),
     passinput = $('#passinput')[0],
     noteinput = $('#noteinput')[0],
      blog = config.url.length ? config.url : window.location.protocol + "//" + window.location.hostname,
     keyit = passinput.value.length ? passinput.value : config.defaultkey,
     urls = $this.find('#urlinput')[0],
     result = $('#result')[0],
   bitly = $('#bitly')[0];
   $('#bitly').html("");
   //url.value.split(",").forEach(myFunction);
   var url= urls.value.split(",");
var i;
for (i = 0; i < url.length; i++) {

     var data = {};
     data.url = url[i],
 data.note = noteinput.value.length ? (forkup.checked ? "Pass Unzip: <code>4kup</code><br>" + noteinput.value : (mrcong.checked ? "Pass Unzip: <code>mrcong.com</code><br>" + noteinput.value : (nugi4u.checked ? "Pass Unzip: <code>nudegirls4u.com</code><br>" + noteinput.value : noteinput.value))) : (forkup.checked ? "Pass Unzip: <code>4kup</code>" : (mrcong.checked ? "Pass Unzip: <code>mrcong.com</code>" : (nugi4u.checked ? "Pass Unzip: <code>nudegirls4u.com</code>" : ""))),
     data.countdown = $('#countDown')[0].checked;

     if (urls.value.length) {
  if (randPost.checked) {
     if (validurlit(url[i])) {
         $.ajax({
             url: '/feeds/posts/summary?alt=json&max-results=99',
             type: 'GET',
             dataType: 'json',
             cache: true,
             async: false,
             beforeSend: function() {
                 result.innerHTML = '<div class="text-center"><span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span> Fetch Post</div>';
             },
             success: function(a) {
                 var post = a.feed.entry,
                     randNum = Math.floor(Math.random() * post.length),
                     linknya = "";
                 for (var j = 0; j < post[randNum].link.length; j++) {
                     if (post[randNum].link[j].rel == 'alternate') {
                         linknya = post[randNum].link[j].href;
                         break;
                     }
                 }
                 var resultencode = linknya + '#?u=' + encodeURIComponent(Tea.encrypt(JSON.stringify(data), keyit));
                 result.innerHTML = '<div class="alert alert-success text-center">' + config.lang.convertsuccess + '</div>';
                 $.bitlr({
                 apiKey: '23c47f073826eb0cdc1c2abedbb006976e0e0549',
                 link: resultencode,
                 orglink :data.url,
                 anchor: true,
                 success: function(newLink) {},
                 error: function() {
                   $('.urls').hide();
                   }
                 });

             }
         });
     } else {
         $('#bitly').append('<tr><td>'+url[i]+'</td><td>'+config.lang.validtext+'</td><td></td></tr>')
     }
 } else {
 var resultencode = blog + '/' + config.page+'#?u='+encodeURIComponent(Tea.encrypt(JSON.stringify(data), keyit));
         //result.innerHTML += validurlit(urls.value) ? '<li>'+resultencode +'</li>': config.lang.validtext ;
        
if (validurlit(url[i])) {
//result.append('<li>'+resultencode+'</li>')
$.bitlr({
apiKey: '23c47f073826eb0cdc1c2abedbb006976e0e0549',
link: resultencode,
orglink :data.url,
anchor: true,
success: function(newLink) {},
error: function() {
$('.urls').hide();
}
});                      
 } else {$('#bitly').append('<tr><td>'+url[i]+'</td><td>'+config.lang.validtext+'</td><td></td></tr>')}
}
     } else {
       bitly.innerHTML = '<div class="alert alert-danger text-center">'+config.lang.urlempty+'</div>';
     }                  
     setTimeout(function(){
if (validurlit(url)) {$("#bitly").addClass('bitlyshow');};
 //result.parentNode.style.height = result.offsetHeight+bitly.offsetHeight+'px';
 result.parentNode.style.height = 'auto';
     }, 0);
     }
   });
 });
