(function() {
  var baseURL = 'http://b.hatena.ne.jp';

  var redirect = function(qArgs) {
      var url = baseURL + '/add?b2=1' + ( qArgs || '' ) + '&url=' + encodeURIComponent(location.href);
      location.href = url;
  }

  if (document.getElementsByTagName('frameset').length) {
      return redirect('&frame=1');
  }

  if (window.Hatena && 
      window.Hatena.Bookmark && 
      window.Hatena.Bookmark.BookmarkLet &&
      window.Hatena.Bookmark.BookmarkLet.base &&
      window.Hatena.Bookmark.BookmarkLet.instance) {
      window.Hatena.Bookmark.BookmarkLet.instance.show(true);
      return;
  }
  
  var head;
  try {
      head = document.getElementsByTagName('head')[0];
  } catch(e) {
      return redirect();
  }
  if (!head) return redirect();
  
  var scripts = {};
  var loadScript = function(url) {
      if (scripts[url]) return;
      scripts[url] = true;
      var script = document.createElement("script");
      script.charset="UTF-8";
      script.src = url;
      setTimeout( function() {
          head.appendChild(script);
      }, 1);
  }
  
  var loadTen = function() {
      loadScript('http://www.hatena.ne.jp/js/Ten/Ten.js');
      if (typeof Ten == 'undefined') {
          setTimeout(loadTen, 20);
      } else {
          loadBookmark();
      }
  };
  
  
  var bURL = baseURL + '/js/Hatena/Bookmark/LetLoader.js?v=1.0&' + (new Date).getTime();
  var loadBookmark = function() {
      loadScript(bURL);
      if (window.Hatena && 
          window.Hatena.Bookmark && 
          window.Hatena.Bookmark.BookmarkLet &&
          window.Hatena.Bookmark.BookmarkLet.base) 
      {
          window.Hatena.Bookmark.BookmarkLet.baseURL = baseURL;
          new Hatena.Bookmark.BookmarkLet;
          checkComment();
      } else {
          setTimeout(loadBookmark, 20);
      }
  };

    var checkComment = function() {
      var iframe = document.getElementById('hatena-bookmark-bookmarklet-iframe');
      if(iframe) {
        iframe.onload = function() {
          alert(this);
          alert(this.contentWindow);
          alert(this.contentWindow.document);
          var contentDocument = IFrame.contentDocument || IFrame.contentWindow.document;
          alert(contentDocument);
          alert(contentDocument.body);

        };
      //  iframe.onload = function() {
      //    alert('aaaa'+this.contentWindow.document.getElementById( 'comment' ));
      //    var comment = iframe.contentWindow.document.getElementById( 'comment' );
      //    alert('aaaa'+comment);
      //    comment.onkeypress = function(e) {
      //      alert(e.keyCode);
      //    }
      //  };
      } else {
        setTimeout(checkComment, 20);
      }
    };
  
  if (typeof Ten == 'undefined') {
      loadTen();
  } else {
      loadBookmark();
  }

})();
