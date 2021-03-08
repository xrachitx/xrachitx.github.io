  TweenMax.from(".distortion", 0.5, {
        delay: 1.0,
        opacity: 0,
        y: "20",
        ease: Expo.easeInOut
      });


      TweenMax.from(".bubble", 1.5, {
        delay: 0.25,
        opacity: 0,
        // x: "-10000",
        width:"0px",
        height:"0px",
        ease: Expo.easeInOut
      });

      TweenMax.from(".text h1 .hidetext", 1.5, {
        delay: 0.25,
        y: "100%",
        ease: Expo.easeInOut
      });
  
      TweenMax.from(".text h3 .hidetext", 1.5, {
        delay: 0.25,
        y: "100%",
        ease: Expo.easeInOut
      });
  
      TweenMax.from(".text p .hidetext", 1.5, {
        delay: 0.25,
        y: "100%",
        ease: Expo.easeInOut
      });
  
      TweenMax.from(".text h2", 1.5, {
        delay: 0.25,
        opacity: 0,
        x: "-10000",
        ease: Expo.easeInOut
      });

      TweenMax.from(".caption", 1.5, {
        delay: 0.25,
        opacity: 0,
        // y= "-10000",
        x: "-10000",
        ease: Expo.easeInOut
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