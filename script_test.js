
var resizerRight = document.querySelector(".resizer-right"),
   sidebarRight = document.querySelector(".sidebar-right");
var resizerLeft = document.querySelector(".resizer-left"),
   sidebarLeft = document.querySelector(".sidebar-left");

// function initResizerFn( resizerRight, sidebarRight, resizerLeft, sidebarLeft ) {

//    // track current mouse position in x var
//    var x, w;

//    function rs_mousedownHandler( e ) {

//       x = e.clientX;

//       var sbWidthRight = window.getComputedStyle( sidebarRight ).width;
//       w = parseInt( sbWidthRight, 10 );

//       document.addEventListener("mousemove", rs_mousemoveHandler);
//       document.addEventListener("mouseup", rs_mouseupHandler);
//    }

//    function rs_mousemoveHandler( e ) {
//       var dx = e.clientX - x;

//       var cw = w + dx; // complete width
      
//       if ( cw < 700 ) {
//          sidebarRight.style.width = `${ cw }px`;
//       }
//    }
   

//    function rs_mouseupHandler() {
//       // remove event mousemove && mouseup
//       document.removeEventListener("mouseup", rs_mouseupHandler);
//       document.removeEventListener("mousemove", rs_mousemoveHandler);
//    }

//    resizerRight.addEventListener("mousedown", rs_mousedownHandler);
// }

function initResizerFn( resizerRight, sidebarRight, resizerLeft, sidebarLeft ) {

    // track current mouse position in x var
    var x, w;
    
    // Left
    function rs_mousedownHandler( e ) {
       x = e.clientX;
 
       var sbWidthLeft = window.getComputedStyle( sidebarLeft ).width;
       w = parseInt( sbWidthLeft, 10 );
 
       document.addEventListener("mousemove", rs_mousemoveHandler);
       document.addEventListener("mouseup", rs_mouseupHandler);
    }

    function rs_mousemoveHandler( e ) {
        // console.log(e);
       var dx = e.clientX - x;
 
       var cw = w - dx; // complete width
       
       if ( cw < 700 ) {
          sidebarLeft.style.width = `${ cw }px`;
       }
    }
    
 
    function rs_mouseupHandler() {
       // remove event mousemove && mouseup
       document.removeEventListener("mouseup", rs_mouseupHandler);
       document.removeEventListener("mousemove", rs_mousemoveHandler);
    }

    // Right

    function rs_mousedownHandler2( e ) {
       x = e.clientX;

       var sbWidthRight = window.getComputedStyle( sidebarRight ).width;
       w = parseInt( sbWidthRight, 10 );
 
       document.addEventListener("mousemove", rs_mousemoveHandler2);
       document.addEventListener("mouseup", rs_mouseupHandler2);
    }
    function rs_mousemoveHandler2( e ) {
        var dx = e.clientX - x;
        
        var cw = w + dx; // complete width
        
        if ( cw < 700 ) {
            sidebarRight.style.width = `${ cw }px`;
       }
    }

    function rs_mouseupHandler2() {
        // remove event mousemove && mouseup
        document.removeEventListener("mouseup", rs_mouseupHandler2);
        document.removeEventListener("mousemove", rs_mousemoveHandler2);
     }
 
    sidebarLeft.addEventListener("mousedown", rs_mousedownHandler);
    sidebarRight.addEventListener("mousedown", rs_mousedownHandler2);

 }

initResizerFn( resizerRight, sidebarRight,resizerLeft, sidebarLeft );