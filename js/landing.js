CSSPlugin.defaultForce3D = false;
var t1 = TweenMax.staggerTo(
    ".blocks li",
    2,
    {
        delay:0.1,
        ease: Expo.easeInOut,
        height: ($("#block-1").height())*0.3+'px',
    },
    0.1
);

var t2 = TweenMax.to("li", 3, {
    delay: 2.8,
    ease: Expo.easeInOut,
    width: ($("#block-1").height())*0.3+'px',
});

var t4 = TweenMax.staggerTo("li", 3, 
    {
        delay: 2.8,
        ease: Expo.easeInOut,
        borderRadius: "100%",   
    },
    0.06,
    onCompleteAll=()=>{
        h = $("#block-1").height();
        w = $("#block-1").width();
    }
);

var t3 = TweenMax.staggerTo(
    "li",
    1.6,
    {
        delay: 4.8,
        ease: Expo.easeInOut,
        y: "60%",
    },
    0.06,
    onCompleteAll=()=>{
        $("#block-1").addClass("hoverincrease1");
        $("#block-3").addClass("hoverincrease3");

        $(".hoverincrease1").mouseenter(()=>{
            console.log(h+" "+w)
            TweenMax.staggerTo(".hoverincrease1", 1, {
                // delay: 2.8,
                ease: Expo.easeInOut,
                height: ($("#block-1").height())*1.4+"px",
                width: ($("#block-1").width())*1.4+"px",
            },
            onCompleteAll=()=>{
                $("#block-1").addClass("hoverdecrease1");
                $("#block-1").removeClass("hoverincrease1");
                console.log($("#block-1").width() + " "+ $("#block-1").height());
                TweenMax.to(".about",0.5,{
                    opacity:1
                })
                $(".hoverdecrease1").mouseleave(()=>{
                    console.log($("#block-1").width() + " "+ $("#block-1").height());
                    TweenMax.staggerTo(".hoverdecrease1", 1, {
                        // delay: 2.8,
                        ease: Expo.easeInOut,
                        height: ($("#block-1").height())/1.4+"px",
                        width: ($("#block-1").width())/1.4+"px",
                    },
                    onCompleteAll=()=>{
                        $("#block-1").addClass("hoverincrease1");
                        $("#block-1").removeClass("hoverdecrease1");
                        TweenMax.to(".about",0.5,{
                            opacity:0
                        })
                    });  
                })
            });

            if ($("#block-3").height()!=h){
                console.log("nice")
                TweenMax.to("#block-3",1,{
                    height: h+"px",
                    width: w+"px",
                })
            }
        });

        $(".hoverincrease3").mouseenter(()=>{
            TweenMax.staggerTo(".hoverincrease3", 1, {
                // delay: 2.8,
                ease: Expo.easeInOut,
                height: ($("#block-3").height())*1.4+"px",
                width: ($("#block-3").width())*1.4+"px",
            },
            onCompleteAll=()=>{
                $("#block-3").addClass("hoverdecrease3");
                $("#block-3").removeClass("hoverincrease3");
                TweenMax.to(".projects",0.5,{
                    opacity:1
                })
                console.log($("#block-3").width() + " "+ $("#block-3").height());
                $(".hoverdecrease3").mouseleave(()=>{
                    console.log($("#block-3").width() + " "+ $("#block-3").height());
                    TweenMax.staggerTo(".hoverdecrease3", 1, {
                        // delay: 2.8,
                        ease: Expo.easeInOut,
                        height: ($("#block-3").height())/1.4+"px",
                        width: ($("#block-3").width())/1.4+"px",
                    },
                    onCompleteAll=()=>{
                        $("#block-3").addClass("hoverincrease3");
                        $("#block-3").removeClass("hoverdecrease3");
                        TweenMax.to(".projects",0.5,{
                            opacity:0
                        })
                    });  
                })
            });
            if ($("#block-1").height()!=h ){
                console.log("nice")
                TweenMax.to("#block-1",1,{
                    height: h+"px",
                    width: w+"px",
                })
            }
        });
    }
);

// Wrap every letter in a span
var textWrapper = document.querySelector(".ml11 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
    /([^\x00-\x80]|\w)/g,
    "<span class='letter'>$&</span>"
);

anime
    .timeline()
    .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "linear",
        duration: 700,
        delay: 6000,
    })
    .add({
        targets: ".ml11 .line",
        translateX: [
            0,
            document.querySelector(".ml11 .letters").getBoundingClientRect()
                .width + 10,
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
    })
    .add({
        targets: ".ml11 .letter",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 300,
        delay:0,
        offset: "-=775",
        delay: (el, i) => 34 * (i + 1),
    })
    .add({
        targets: ".ml11",

        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
    });