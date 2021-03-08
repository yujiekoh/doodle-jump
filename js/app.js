// JS Data
const platforms = [];
const platBottom = 100;
let gameOver = false;
const jumpDist = 20;
const fallDist = 20;
let jumpTimer;
let fallTimer;
class Vector {
    constructor(x, y)
}

// CSS Data
const containerWidth = 600
const containerHeight = 700;
const platformWidth = 60;
const platformHeight = 10;

// Functions
const makePlatform = (num) => {
    for (let i = 1; i <= num; i++) {
        const $platform = $("<div>").addClass("platform");
        let randLeft = Math.random() * (containerWidth - platformWidth);
        let randBottom = platBottom * i;
        $platform.css("left", `${randLeft}` + `px`);
        $platform.css("bottom", `${randBottom}` + `px`);
        platforms.push($platform);
        $(".container").append($platform);
    }
}

const makeDoodler = () => {
    const $doodler = $("<div>").addClass("doodler");
    let doodlerLeft = parseFloat(platforms[0].css("left")) + (platformWidth / 4);
    let doodlerBottom = platBottom + platformHeight;
    $doodler.css("left", `${doodlerLeft}` + `px`);
    $doodler.css("bottom", `${doodlerBottom}` + `px`);
    // $doodler.addClass("jump");
    // if ($doodler.css("bottom") === "500px") {
    //     $doodler.removeClass("jump").addClass("fall");
    // }
    $(".container").append($doodler);
}

const fall = () => {
    console.log("fall");
    // $(".doodler").switchClass("jump", "fall", 2000, "linear", jump);
    // $(".doodler").removeClass("jump");
    // $(".doodler").addClass("fall");
}

const jump = () => {
    jumpTimer = setInterval(function() {
        let doodlerBottom = parseFloat($(".doodler").css("bottom")) + jumpDist;
        $(".doodler").css("bottom", `${doodlerBottom}` + `px`);
    }, 200)

    // $(".doodler").switchClass("fall", "jump", 2000, "linear", function() {
    //     console.log("max");
    //     fall();
        // if ($(".doodler").css("bottom") > "150px") {
        //     console.log("max");
        //     fall();
        // }
    // });
    
    // $(".doodler").removeClass("fall");
    // $(".doodler").addClass("jump");
    // console.log(getComputedStyle(document.querySelector(".doodler").bottom));

    // if (parseFloat($(".doodler").css("bottom")) > 250) {
    //     console.log(parseFloat($(".doodler").css("bottom")));
    // }
}

const moveUpDown = () => {
    // while (gameOver === false) {
    //     if (isJumping === false) {
    //         jump();
    //     } else {
    //         fall();
    //     }
    // }
        // if ((platforms[0].css("left") - platformWidth < $(".doodler").css("left") < platforms[0].css("left") + platformWidth) && 
        //     ($(".doodler").css("bottom") === platforms[0].css("bottom") + platformHeight)) {
        //         jump();
        // }
        // else if () {
        //     // fall();
        // }
}

const moveLeftRight = (event) => {
    if (event.key === "ArrowLeft") {
        $(".doodler").animate({left: "-=10"}, 10); // separate into left() & right() functions?
        console.log("left");
    } else if (event.key === "ArrowRight") {
        $(".doodler").animate({left: "+=10"}, 10);
        console.log("right");
    }
}

// Execute
$(() => {
        makePlatform(6);
        makeDoodler();
        jump();
        // $(".doodler").on("click", function() {
        //     $(this).animate({bottom: "+=300"}, 1000);
        //     $(this).toggleClass("clickedFall");
        // })
        // $(".doodler").on("click", function() {
        //     $(this).toggleClass("clickedJump");
        // })
        // $(".button").on("click", fall);
        document.onkeydown = moveLeftRight;
        // have to add onkeyup?
    
})