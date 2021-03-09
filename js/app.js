// JS Data
const platforms = [];
let startPoint = 90;
const platBottom = startPoint;
let isGameOver = false;
let jumpDist = 20;
let fallDist = 10;
// let leftRightDist = 5;
let isJumping;
let jumpTimer;
let fallTimer;
// let isMovingLeft;
// let leftTimer;
// let rightTimer;
let score = 0;

// CSS Data
const containerWidth = 600
const containerHeight = 700;
const platformWidth = 100;
const platformHeight = 10;

// Functions
const makePlatforms = (num) => {
    for (let i = 1; i <= num; i++) {
        const $platform = $("<div>").addClass("platform");
        let randLeft = Math.random() * (containerWidth - platformWidth);
        let randBottom = platBottom * i;
        $platform.css("left", `${randLeft}` + `px`);
        $platform.css("bottom", `${randBottom}` + `px`);
        platforms.push($platform);
        $(".container").append($platform);
        // console.log(platforms);
    }
}

const newPlatform = (newPlatBottom) => {
    const $platform = $("<div>").addClass("platform");
    let randLeft = Math.random() * (containerWidth - platformWidth);
    $platform.css("left", `${randLeft}` + `px`);
    $platform.css("bottom", `${newPlatBottom}` + `px`);
    platforms.push($platform);
    $(".container").append($platform);
}

// define magic numbers with constants at the top
const refreshPlatforms = () => {
    if (parseFloat($(".doodler").css("bottom")) > 300) {
        platforms.forEach(platform => {
            let newBottom = parseFloat(platform.css("bottom")) - 3;
            platform.css("bottom", `${newBottom}` + `px`);
            if (parseFloat(platform.css("bottom")) < 3) {
                let firstPlatform = platforms[0];
                firstPlatform.removeClass("platform");
                platforms.shift();
                score++;
                newPlatform(600);
            }
        })
    }
}

const makeDoodler = () => {
    const $doodler = $("<div>").addClass("doodler");
    let doodlerLeft = parseFloat(platforms[0].css("left")) + (platformWidth / 4); // can randomnise his starting left position
    let doodlerBottom = platBottom + platformHeight;
    $doodler.css("left", `${doodlerLeft}` + `px`);
    $doodler.css("bottom", `${doodlerBottom}` + `px`);
    $(".container").append($doodler);
}

const fall = () => {
    isJumping = false;
    clearInterval(jumpTimer);
    fallTimer = setInterval(function() {
        let doodlerBottom = parseFloat($(".doodler").css("bottom")) - fallDist;
        $(".doodler").css("bottom", `${doodlerBottom}` + `px`);
        // fallDist *= 1.005;
        if (parseFloat($(".doodler").css("bottom")) <= 0) {
            isGameOver = true;
            gameOver();
        }
        platforms.forEach(platform => {
            console.log(parseFloat(platform.css("bottom")));
            if (
                (parseFloat($(".doodler").css("bottom")) >= parseFloat(platform.css("bottom"))) &&
                (parseFloat($(".doodler").css("bottom")) <= parseFloat(platform.css("bottom")) + platformHeight) &&
                (parseFloat($(".doodler").css("left")) + 30 >= parseFloat(platform.css("left"))) && // doodler width = 30px
                (parseFloat($(".doodler").css("left")) <= parseFloat(platform.css("left")) + platformWidth)
            ) {
                console.log("jumped on platform");
                fallDist = 10;
                startPoint = parseFloat($(".doodler").css("bottom"));
                isJumping = true;
                jump();
            }
        })
    }, 40);
}

const jump = () => {
    isJumping = true;
    clearInterval(fallTimer);
    jumpTimer = setInterval(function() {
        let doodlerBottom = parseFloat($(".doodler").css("bottom")) + jumpDist;
        $(".doodler").css("bottom", `${doodlerBottom}` + `px`);
        jumpDist *= 0.9;
        if (parseFloat($(".doodler").css("bottom")) > startPoint + 150) {
            isJumping = false;
            jumpDist = 20;
            fall();
        }
    }, 40);
}

// const moveLeft= () => {
//     isMovingLeft = true;
//     clearInterval(rightTimer);
//     leftTimer = setInterval(function() {
//         let doodlerLeft = parseFloat($(".doodler").css("left")) - leftRightDist;
//         $(".doodler").css("left", `${doodlerLeft}` + `px`);
//         if (parseFloat($(".doodler").css("left")) <= 0) {
//             // isMovingLeft = false;
//             moveRight();
//         }
//     }, 200)
// }

// const moveRight = () => {
//     isMovingLeft = false;
//     clearInterval(leftTimer);
//     rightTimer = setInterval(function() {
//         let doodlerLeft = parseFloat($(".doodler").css("left")) + leftRightDist;
//         $(".doodler").css("left", `${doodlerLeft}` + `px`);
//         if (parseFloat($(".doodler").css("left")) >= containerWidth - 30) {
//             // isMovingLeft = true;
//             moveLeft();
//         }
//     }, 200)
// }

// const keyControls = (event) => {
//     if (event.key === "ArrowLeft") {
//         moveLeft();
//         console.log("left");
//     } else if (event.key === "ArrowRight") {
//         moveRight();
//         console.log("right");
//     }
// }

const moveLeftRight = (event) => { // separate into left() & right() functions?
    if (event.key === "ArrowLeft") {
        if (parseFloat($(".doodler").css("left")) < -30) {
            $(".doodler").css("left", `${containerWidth}` + `px`);
        } else {
            $(".doodler").animate({left: "-=15"}, 10); 
            console.log("left");
        }
    } else if (event.key === "ArrowRight") {
        if (parseFloat($(".doodler").css("left")) > containerWidth) {
            $(".doodler").css("left", `${-30}` + `px`);
        } else {
            $(".doodler").animate({left: "+=15"}, 10);
            console.log("right");
        }
    }
}

const gameOver = () => {
    if (isGameOver) {
        clearInterval(fallTimer);
        $(".container").empty();
        $(".container").html("<h1>You fell! You crossed " + `${score}` + " platforms </h1>");
        console.log("emptied");
    } else {
        //startGame();
    }
}

// Execute
$(() => {
        makePlatforms(7);
        makeDoodler();
        setInterval(refreshPlatforms, 20);
        jump(startPoint);
        document.onkeydown = moveLeftRight;
        // have to add onkeyup?
    
})