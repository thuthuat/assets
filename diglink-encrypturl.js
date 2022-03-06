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
              s.success.call(this, '<div class="text-center">Or Bit.ly shorten link:</div><br /><div class="input-group linkbit"><div class="input-group-prepend"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg></span></div><input class="form-control linkbitly" onfocus="this.select()" onmouseup="return false" style="box-shadow: 0 0 0 0 transparent" value="'+data.link+'"></div>');
    $(document).on('click','.linkbit .input-group-prepend', function() {
        var copyText = $(this).siblings('.linkbitly');
        copyText.select();
        document.execCommand("copy");
        $('.linkbit').append('<div class="copied">✔ Copied</div>');
setTimeout(function(){$('.copied').remove();},3000);
      });
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
        config.countdown ? $('#countDown').prop('checked', true) : $('#countDown').prop('checked', false);
        $('#passbtn').on('click', function(e) {
            var $this = $(this);
            if ($this.hasClass('btn-dark')) {
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
        $('#safelink').on('submit', function(e) {
            e.preventDefault();
            var $this = $(this),
                passinput = $('#passinput')[0],
				noteinput = $('#noteinput')[0],
                keyit = passinput.value.length ? passinput.value : config.defaultkey,
                blog = config.url.length ? config.url : window.location.protocol + "//" + window.location.hostname,
                url = $this.find('#urlinput')[0],
                randPost = $('#randPost')[0],
                result = $('#result')[0],
                bitly = $('#bitly')[0],
                data = {};
            	data.url = url.value,
				data.note = noteinput.value.length ? noteinput.value : "",
                data.countdown = $('#countDown')[0].checked;
            if (url.value.length) {
                if (randPost.checked) {
                    if (validurlit(url.value)) {
                        $.ajax({
                            url: '/feeds/posts/summary?alt=json&max-results=99',
                            type: 'GET',
                            dataType: 'json',
                            cache: true,
                            beforeSend: function() {
                                result.innerHTML = '<div class="text-center"><span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span> Fetch Post</div>';
                            },
                            success: function(a) {
                                var post = a.feed.entry,
                                    randNum = Math.floor(Math.random() * post.length),
                                    linknya = "";
                                for (var i = 0; i < post[randNum].link.length; i++) {
                                    if (post[randNum].link[i].rel == 'alternate') {
                                        linknya = post[randNum].link[i].href;
                                        break;
                                    }
                                }
                                var resultencode = linknya + '#?u=' + encodeURIComponent(Tea.encrypt(JSON.stringify(data), keyit));
                                result.innerHTML = '<div class="alert alert-success text-center">' + config.lang.convertsuccess + '</div><div class="input-group linkresult"><div class="input-group-prepend"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg></span></div><input class="form-control linklong" onfocus="this.select()" onmouseup="return false" style="box-shadow: 0 0 0 0 transparent" value="' + resultencode + '"/></div>';
                                $(document).on('click', '.linkresult .input-group-prepend', function() {
                                    var copyText = $(this).siblings('.linklong');
                                    copyText.select();
                                    document.execCommand("copy");
                                    $('.linkresult').append('<div class="copied">&#10004; Copied</div>');
                                    setTimeout(function() {
                                        $('.copied').remove();
                                    }, 3000);
                                });
                                $.bitlr({
                                    apiKey: '23c47f073826eb0cdc1c2abedbb006976e0e0549',
                                    link: resultencode,
                                    anchor: true,
                                    success: function(newLink) {
                                        $('#bitly').html(newLink);
                                    },
                                    error: function() {
                                        $('.urls').hide();
                                    }
                                });
                                setTimeout(function() {
                                    if (validurlit(url.value)) {
                                        $("#bitly").css({
                                            "overflow": "hidden",
                                            "height": "100px"
                                        })
                                    } else {
                                        $("#bitly").css({
                                            "overflow": "hidden",
                                            "height": "0px"
                                        })
                                    };
                                    result.parentNode.style.height = result.offsetHeight + bitly.offsetHeight + 'px';
                                }, 0);
                            }
                        });
                    } else {
                        result.innerHTML = '<div class="alert alert-warning text-center">' + config.lang.validtext + '</div>';
                        bitly.innerHTML = '';
                    }
                } else {
                    var resultencode = blog + '/' + config.page + '#?u=' + encodeURIComponent(Tea.encrypt(JSON.stringify(data), keyit));
                    result.innerHTML = validurlit(url.value) ? '<div class="alert alert-success text-center">' + config.lang.convertsuccess + '</div><div class="input-group linkresult"><div class="input-group-prepend"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg></span></div><input class="form-control linklong" onfocus="this.select()" onmouseup="return false" style="box-shadow: 0 0 0 0 transparent" value="' + resultencode + '"/></div>' : '<div class="alert alert-warning text-center">' + config.lang.validtext + '</div>';
                    if (validurlit(url.value)) {
                        $(document).on('click', '.linkresult .input-group-prepend', function() {
                            var copyText = $(this).siblings('.linklong');
                            copyText.select();
                            document.execCommand("copy");
                            $('.linkresult').append('<div class="copied">&#10004; Copied</div>');
                            setTimeout(function() {
                                $('.copied').remove();
                            }, 3000);
                        });
                        $.bitlr({
                            apiKey: '23c47f073826eb0cdc1c2abedbb006976e0e0549',
                            link: resultencode,
                            anchor: true,
                            success: function(newLink) {
                                $('#bitly').html(newLink);
                            },
                            error: function() {
                                $('.urls').hide();
                            }
                        });
                    } else {
                        bitly.innerHTML = ''
                    }
                }
            } else {
                result.innerHTML = '<div class="alert alert-danger text-center">' + config.lang.urlempty + '</div>';
                bitly.innerHTML = '';
            }
            setTimeout(function() {
                if (validurlit(url.value)) {
                    $("#bitly").css({
                        "overflow": "hidden",
                        "height": "100px"
                    })
                } else {
                    $("#bitly").css({
                        "overflow": "hidden",
                        "height": "0px"
                    })
                };
                result.parentNode.style.height = result.offsetHeight + bitly.offsetHeight + 'px';
            }, 0);
        });
    });
