  "use strict";
  if (!String.prototype.startsWith) {
      Object.defineProperty(String.prototype, 'startsWith', {
          value: function(search, pos) {
              pos = !pos || pos < 0 ? 0 : +pos;
              return this.substring(pos, pos + search.length) === search;
          }
      });
  }
  $(document).ready(function(){
    $(document).on('submit', '#locked', function(e) {
      e.preventDefault();
      var $this = $(this),
      parent = $this.parent(),
      report = parent.find('#report'),
      passin = $('#passin');
      var data;
      try {
        data = JSON.parse(Tea.decrypt(decodeURIComponent((_GET('u'))), passin[0].value))
      } catch (e) {
        data = false;
      }
      if (passin[0].value.length) {
        if (typeof(data) === "object") {
			if(data.note){$('.decryptbox').append('<div class="alert alert-success">' + data.note + '</div>')};
            if(!data.countdown){
			  report[0].innerHTML = '<div class="text-center"><a class="btn btn-primary mb-2" href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
              $this.find('button, input').attr('disabled', 'disabled');
              $this.slideUp('slow');
            } else {
              $this.find('button, input').attr('disabled', 'disabled');
              $this.slideUp('slow');
              let downloadTimer;
              var timeleft = config.timedown;
              downloadTimer = setInterval(countDown,1000)
              function countDown(){
                  var ANasRMunDurin = config.lang.countdowntext.replace('{{anascountdown}}', timeleft);
                  report[0].innerHTML = '<div class="fs-6 mb-2 text-center text-success">' + ANasRMunDurin + '</div>';
                  setTimeout(function(){
                    report[0].parentNode.style.height = (report[0].offsetHeight+5)+'px';
                    }, 0);
                  timeleft -= 1;
                  if(timeleft <= 0){
                    clearInterval(downloadTimer);
                    report[0].innerHTML = '<button class="btn btn-primary mb-2">Getlink</button>';
                    if(!config.click2x){
                      report[0].innerHTML = '<div class="text-center"><a class="btn btn-primary mb-2" href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
                    } else {
                      function gotolinkcountdown() {
                        var o = 8;
                        $("#gotolink").removeClass("hidden").addClass("mt-2 mb-2");
                        var n = setInterval(function() {
                            var e = o -= 1;
                           $("#gotolink").html('<svg id="i-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"><circle cx="16" cy="16" r="14" /><path d="M16 8 L16 16 20 20" /></svg> Please Wait...'), e < 0 && (clearInterval(n), $("#gotolink").prop("disabled", !1), $("#gotolink").html('<svg id="i-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"><path d="M2 20 L12 28 30 4" /></svg> Go to Link'),$(config.gotolink).click(function(){var o = (data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url; window.open(o,'_blank')}))
                        }, 1e3)
                        }
                      var request = !1;
                      $("#output button").click(function() { 0 == request && (gotolinkcountdown(), request = !0),$("html, body").animate({ scrollTop: $('#gotolink').offset().top -20 }, 500);$(config.gotolink).prop( "disabled", true ).css("display","block").off('click');});
                    }
                  }
                }
                $(window).blur(function(){
                  clearInterval(downloadTimer);
                  downloadTimer = 0;
                });
                $(window).focus(function(){
                  if (!downloadTimer)
                  downloadTimer = setInterval(countDown,1000);
                });
            }
        } else {
          report[0].innerHTML = '<div class="alert alert-danger text-center">'+config.lang.wrongpass+'</div>';
        }
      } else {
           report[0].innerHTML = '<div class="alert alert-danger text-center">'+config.lang.emptypass+'</div>';
      }
      setTimeout(function(){
        report[0].parentNode.style.height = report[0].offsetHeight+'px';
        }, 0);
    });
    if (_GET('u') && $(config.output).length) {
      var data;
      try {
          data = JSON.parse(Tea.decrypt(decodeURIComponent((_GET('u'))), config.defaultkey))
      } catch (e) {
          data = false;
      }
      if (typeof(data) === "object") {
		if(data.note){$('.decryptbox').append('<div class="alert alert-success">' + data.note + '</div>')};
        if(!data.countdown){
          $(config.output)[0].innerHTML = '<div class="text-center"><a class="text-center"  href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
        } else {
          let downloadTimer;
          var timeleft = config.timedown;
          downloadTimer = setInterval(countDown,1000)
          function countDown(){
            var ANasRMunDurin = config.lang.countdowntext.replace('{{anascountdown}}', timeleft);
            $(config.output)[0].innerHTML = '<div class="fs-6 mb-2 text-center text-success">' + ANasRMunDurin + '</div>';    
        	timeleft -= 1;
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              $(config.output)[0].innerHTML = '<button class="btn btn-primary mb-2">Getlink</button>';
              if(!config.click2x){
                $(config.output)[0].innerHTML = '<div class="text-center"><a class="text-center" href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
              } else {
                function gotolinkcountdown() {
                  var o = 8;
                  $("#gotolink").removeClass("hidden").addClass("mt-2 mb-2");
                  var n = setInterval(function() {
                     var e = o -= 1;
                     $("#gotolink").html('<svg id="i-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"><circle cx="16" cy="16" r="14" /><path d="M16 8 L16 16 20 20" /></svg> Please Wait...'), e < 0 && (clearInterval(n), $("#gotolink").prop("disabled", !1), $("#gotolink").html('<svg id="i-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"><path d="M2 20 L12 28 30 4" /></svg> Go to Link'),$(config.gotolink).click(function(){var o = (data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url; window.open(o,'_blank')}))
                  }, 1e3)
                }
                var request = !1;
                $("#output button").click(function() { 0 == request && (gotolinkcountdown(), request = !0),$("html, body").animate({ scrollTop: $('#gotolink').offset().top -20 }, 500);$(config.gotolink).prop( "disabled", true ).css("display","block").off('click');});
              }
            }
          }                         
          $(window).blur(function(){
            clearInterval(downloadTimer);
            downloadTimer = 0;
          });
          $(window).focus(function(){
            if (!downloadTimer)
            downloadTimer = setInterval(countDown,1000);
          });
        }
      } else {
        $(config.output)[0].innerHTML = '<form class="form-group" id="locked"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><svg fill="none" height="24" id="i-lock" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23"/>    <circle cx="16" cy="24" r="1"/></svg></span></div><input class="form-control" name="pass" type="password" id="passin" onclick="sUp(\'#report\')" onkeypress="sUp(\'#report\')" aria-label="Password" /><div class="input-group-append"><button class="btn btn-primary" type="submit">Unlock</button></div></div></form><section class="trans" style="overflow: hidden;height: 0"><div id="report"></div></section>';
      }
    } else {
      if($(config.output).length){
        $(config.output)[0].innerHTML = '<div class="text-center">'+config.lang.nourl+'</div>';
      } else {
        console.log('Not found output element, are you sure you this is not safelink page ??');
      }
    }
  });
