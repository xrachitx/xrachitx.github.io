var h =  $("#block-1").height()
var w = $("#block-1").width()
var x = $("#block-1").position().left
var y = $("#block-1").position().top
console.log(h+ " "+w + " "+ x + " "+ y)

  $("#block-1").hover(()=>{
    console.log("hello");
    console.log($("#block-1").width()+ " "+ $("#block-1").height()+ " "+ $("#block-1").position().left+" "+$("#block-1").position().top)
    TweenMax.staggerTo("#block-1", 1, {
      // delay: 2.8,
      ease: Expo.easeInOut,
      height:"50vw",
      // // height: ($("#block-1").height())*1.4+"px", 
      width: "100vw",
      x:"-10px",
      y:"300px",
      borderTopLeftRadius:"2000px",
      borderTopRightRadius:"2000px",
      borderBottomLeftRadius:"0px",
      borderBottomRightRadius:"0px"
  })});

  $("#block-1").mouseleave(()=>{
    console.log("bye");
    console.log($("#block-1").width()+ " "+ $("#block-1").height()+ " "+ $("#block-1").position().left+" "+$("#block-1").position().top)
    TweenMax.to("#block-1", 1, {
      ease: Expo.easeInOut,
      height:h,
      width: w,
      x:"0px",
      y:"0px",
      borderRadius:"400px"
  })});


  $("#block-2").hover(()=>{
    console.log("hello");
    console.log($("#block-2").width()+ " "+ $("#block-2").height()+ " "+ $("#block-2").position().left+" "+$("#block-2").position().top)
    // $("#block-1").css("margin-left","-500px")
    TweenMax.staggerTo("#block-2", 1, {
      // delay: 2.8,
      ease: Expo.easeInOut,
      height:"50vw",
      // // height: ($("#block-1").height())*1.4+"px", 
      width: "100vw",
      x:"-407px",
      y:"300px",
      borderTopLeftRadius:"2000px",
      borderTopRightRadius:"2000px",
      borderBottomLeftRadius:"0px",
      borderBottomRightRadius:"0px"
  })
  TweenMax.staggerTo("#block-1", 1, {
    ease: Expo.easeInOut,
    x:"-1000px",
})
});

  $("#block-2").mouseleave(()=>{
    console.log("bye");
    console.log($("#block-2").width()+ " "+ $("#block-2").height()+ " "+ $("#block-2").position().left+" "+$("#block-2").position().top)
    // $("#block-1").css("margin-left","0px")
    TweenMax.to("#block-2", 1, {
      ease: Expo.easeInOut,
      height:h,
      width: w,
      x:"0px",
      y:"0px",
      borderRadius:"400px"
  })
  TweenMax.staggerTo("#block-1", 1, {
    ease: Expo.easeInOut,
    x:"0px",
})
});

  $("#block-3").hover(()=>{
    console.log("hello");
    console.log($("#block-3").width()+ " "+ $("#block-3").height()+ " "+ $("#block-3").position().left+" "+$("#block-3").position().top)
    TweenMax.staggerTo("#block-3", 1, {
      // delay: 3.8,
      ease: Expo.easeInOut,
      height:"50vw",
      // // height: ($("#block-1").height())*1.4+"px", 
      width: "100vw",
      x:"-805px",
      y:"300px",
      borderTopLeftRadius:"2000px",
      borderTopRightRadius:"2000px",
      borderBottomLeftRadius:"0px",
      borderBottomRightRadius:"0px"
  })
  TweenMax.staggerTo("#block-1", 1, {
    ease: Expo.easeInOut,
    x:"-1000px",
})
TweenMax.staggerTo("#block-2", 1, {
  ease: Expo.easeInOut,
  x:"-1000px",
})
});

  $("#block-3").mouseleave(()=>{
    console.log("bye");
    console.log($("#block-3").width()+ " "+ $("#block-3").height()+ " "+ $("#block-3").position().left+" "+$("#block-3").position().top)
    TweenMax.to("#block-3", 1, {
      ease: Expo.easeInOut,
      height:h,
      width: w,
      x:"0px",
      y:"0px",
      borderRadius:"400px"
  })
  TweenMax.staggerTo("#block-1", 1, {
    ease: Expo.easeInOut,
    x:"0px",
})
TweenMax.staggerTo("#block-2", 1, {
  ease: Expo.easeInOut,
  x:"0px",
})
});

  $(window).bind('scroll',function(e){
    parallaxScroll();
    });
  
  function parallaxScroll(){
      var scrolled = $(window).scrollTop();
      $('#parallax-lvl-0').css('top',(0-(scrolled*.25))+'px');
    $('#parallax-lvl-1').css('top',(0-(scrolled*.5))+'px');
      $('#parallax-lvl-2').css('top',(0-(scrolled*.75))+'px');
      $('#parallax-lvl-2-5').css('top',(0-(scrolled*.85))+'px');
      $('#parallax-lvl-3').css('top',(0-(scrolled*.9))+'px');
    //   $('#parallax-lvl-3-rotate').css('top',(0-(scrolled*0))+'px');
      $('#parallax-lvl-leftrotate').css('transform','rotate('+(0-(scrolled*.002))+'deg)');
      $('#parallax-lvl-rightrotate').css('transform','rotate('+(0+(scrolled*.002))+'deg)');
      $('#parallax-lvl-leftrotate').css('top',(0-(scrolled*.2)));
      $('#parallax-lvl-rightrotate').css('top',(0-(scrolled*.2)));
      $('#parallax-left').css('transform','rotate('+(0-(scrolled*.002))+'deg)');
      $('#parallax-right').css('transform','rotate('+(0+(scrolled*.002))+'deg)');
      $('#parallax-left').css('top',(0-(scrolled*.2)));
      $('#parallax-right').css('top',(0-(scrolled*.2)));
      $('#parallax-center').css('top',(0-(scrolled*.2)));
  }