(function() {
//   jQuery("#comment").keypress(function(ev) {
//     if ((ev.which && ev.which === 13) ||
//         (ev.keyCode && ev.keyCode === 13)) {
//       alert('13');
//       return false;
//     } else {
//       return true;
//     }
//   });

// jQuery('textarea#comment').focus(function() {
//   alert('aaa');
// });
document.onkeypress = enter;
    function enter(){
        if( window.event.keyCode == 13 ){
            return false;
        }
    }
})();