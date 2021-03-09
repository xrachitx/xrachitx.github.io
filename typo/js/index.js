
const param = {
    bg: {
        DYNAMIC_BACKGROUND: true,
        MAX_BACKGROUND_ROTATION: 10,
        PARALLAXE_INTENSITY: 0.8,
        PARALLAXE_DEPTH: 100,
        PARALLAXE_XY_RATIO: 5,
        PARALLAXE_Z_RATIO: 0.99
    }
};

(function backgroundManager() {
    "use strict";
    var letters = document.getElementsByClassName("letter");
    var posLetters = [];
    // for (i)
    for (var i =0;i<letters.length;i++){
        console.log(letters[i].getBoundingClientRect().left+" "+ letters[i].innerHTML)
        posLetters.push(letters[i].getBoundingClientRect())
    }

    if (!param.bg.DYNAMIC_BACKGROUND) return;

    let water = document.getElementById("front");
    // Function variables
    let vars = {
        wrapper: document.getElementById("wrapper"),
        h1back: document.getElementById("back").firstElementChild,
        h1front: document.getElementById("front").firstElementChild,
        // h1secret:document.getElementById("front").firstElementChild,
        bgHeight: null,
        bgWidth: null,
        bgScale: 1,
        bgRotate: 0,
        bgParallaxe: {
            x: 0,
            y: 0
        },
        bgMoveReady: true
    };

    // Initialization
    adjustBackground();

    let moved
    let downListener = () => {
        moved = true
    }
    var offSetPosX = [0,0,0,0,0,0,0,0,0]
    var offSetPosY = [0,0,0,0,0,0,0,0,0]
    var randX;
    var randY;
    let moveListener = (e) => {
        if (moved){
            for (var i =0;i<letters.length;i++){
                randX= Math.floor(Math.random() * 150);
                randY= Math.floor(Math.random() * 200); 
                offSetPosX[i] = randX
                offSetPosY[i] = -randY
                letters[i].style.transform=`translate(${randX}px,-${randY}px)`;
                letters[i].style.transition=`transform 0.5s linear`;
            }
        }
    }
    let upListener = () => {
        if (moved){

            for (var i =0;i<letters.length;i++){
                // console.log()
                if (i==1){
                    letters[i].innerHTML="a";
                    
                }
                if (i==2){
                    letters[i].innerHTML="v";
                    letters[i].style.opacity=0;
                    letters[i].style.color = "#6A8FE6";

                }
                if (i==3){
                    letters[i].innerHTML="e";
                    letters[i].style.opacity=1
                }
                letters[i].style.transform=`translate(${-50}%,${-50}%)`;
                letters[i].style.transition=`transform 0.5s linear`;

            }
            TweenMax.to(".spec", 2, {
                ease: Expo.easeInOut,
                opacity: 1,
            });
            TweenMax.to(".disappear", 1, {
                ease: Expo.easeInOut,
                opacity: 0,
            });
            TweenMax.to("#front", 2, {
                transform:"translate(-100vw,0)"
            })
        
            TweenMax.to(".secret", 0.8, {
                opacity:1,
            })
            TweenMax.to(".secret",2, {
                transform:"translate(100vw,0)"
            })
            
        }
        vars.bgMoveReady=false;
        param.bg.DYNAMIC_BACKGROUND = false;
        moved=false;
    }
    // if (vars.bgMoveReady){
        water.addEventListener('mousedown', downListener)

        water.addEventListener('mousemove', moveListener)

        water.addEventListener('mouseup', upListener)

        window.addEventListener('mousemove', rotateBackground);
        window.addEventListener('resize', adjustBackground);
        setTimeout(() => {
                vars.wrapper.style.transition = `transform 0.25s cubic-bezier(0, 0, .23, .96)`;
            }, 1);
        // }

    // Functions

    function windowDiagonale() {

        let h = window.innerHeight,
            w = window.innerWidth;

        return Math.sqrt(h * h + w * w);
    }

    function adjustBackground() {

        let diag = windowDiagonale(),
            ratio;

        vars.bgHeight = vars.wrapper.offsetHeight;
        vars.bgWidth = vars.wrapper.offsetWidth;

        ratio = diag / Math.min(vars.bgHeight, vars.bgWidth);
        vars.bgScale = ratio;
        updateBackground();
    }

    function rotateBackground(event) {

        let xPos = event.clientX,
            yPos = event.clientY,
            xAmount = -(xPos - vars.bgWidth / 2) / (vars.bgWidth / 2),
            yAmount = -(yPos - vars.bgHeight / 2) / (vars.bgHeight / 2);

        vars.bgRotate = xAmount * param.bg.MAX_BACKGROUND_ROTATION;
        vars.bgParallaxe.x = -param.bg.PARALLAXE_INTENSITY * xAmount;
        vars.bgParallaxe.y = -param.bg.PARALLAXE_INTENSITY * yAmount;

        updateBackground();
    }

    function updateBackground() {
      if(!vars.bgMoveReady) return;
        let backTranslateX = -50 + vars.bgParallaxe.x * (1 / param.bg.PARALLAXE_DEPTH) * param.bg.PARALLAXE_XY_RATIO,
            backTranslateY = 45 + vars.bgParallaxe.y * 1 / param.bg.PARALLAXE_DEPTH,
            backScale = param.bg.PARALLAXE_Z_RATIO * 1 / vars.bgScale,
            backRotate = -vars.bgRotate,
            frontTranslateX = -50 + vars.bgParallaxe.x,
            frontTranslateY = -55 + vars.bgParallaxe.y * param.bg.PARALLAXE_XY_RATIO,
            frontScale = 1 / vars.bgScale,
            frontRotate = -vars.bgRotate;

      vars.bgMoveReady = false;

        vars.wrapper.style.transform = `scale(${vars.bgScale}) rotate(${vars.bgRotate}deg)`;
        vars.h1back.style.transform = `translate(${backTranslateX}%, ${backTranslateY}%) scale(${backScale}) rotate(${backRotate}deg)`;
        vars.h1front.style.transform = `translate(${frontTranslateX}%, ${frontTranslateY}%) scale(${frontScale}) rotate(${frontRotate}deg)`;
        // console.log("Translation: "+ frontTranslateX+" "+ frontTranslateY)
      
      setTimeout(() => {
        vars.bgMoveReady = true
    }, 16);
    }
}()); 
