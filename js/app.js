// JS Data
const platforms = [];
let startPoint = 90;
const platBottom = startPoint;
let isGameOver = false;
let jumpDist = 20;
let fallDist = 10;
let isJumping;
let jumpTimer;
let fallTimer;
let score = 0;

// CSS Data
const containerWidth = 600
const containerHeight = 700;
const platformWidth = 100;
const platformHeight = 10;
const doodlerLegWidth = 55;

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
    }
}

const newPlatform = (newPlatBottom) => {
    const $platform = $("<div>").addClass("platform");
    let randLeft = Math.random() * (containerWidth - platformWidth);
    $platform.css("left", `${randLeft}` + `px`);
    $platform.css("bottom", `${newPlatBottom}` + `px`);
    if (score > 8) {
        $platform.addClass("platform-horizontal") 
        platforms.push($platform);
        $(".container").append($platform);        
    } else {
        platforms.push($platform);
        $(".container").append($platform);
    }
}

// define magic numbers with constants at the top
const refreshPlatforms = () => {
    if (parseFloat($(".doodler").css("bottom")) > 300) {
        platforms.forEach(platform => {
            let newBottom = parseFloat(platform.css("bottom")) - 3;
            platform.css("bottom", `${newBottom}` + `px`);
            if (parseFloat(platform.css("bottom")) < 3) {
                let firstPlatform = platforms[0];
                firstPlatform.removeClass();
                // firstPlatform.removeClass("platform");
                platforms.shift();
                score++;
                newPlatform(600); // could you randomnise this number instead?
            }
        })
    }
}

const makeDoodler = () => {
    const $doodler = $("<div>").addClass("doodler");
    let doodlerLeft = parseFloat(platforms[0].css("left")) + (platformWidth * Math.random()) - 30;
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
            // console.log(parseFloat(platform.css("bottom")));
            if (
                (parseFloat($(".doodler").css("bottom")) >= parseFloat(platform.css("bottom"))) &&
                (parseFloat($(".doodler").css("bottom")) <= parseFloat(platform.css("bottom")) + platformHeight) &&
                (parseFloat($(".doodler").css("left")) + doodlerLegWidth >= parseFloat(platform.css("left"))) &&
                (parseFloat($(".doodler").css("left")) <= parseFloat(platform.css("left")) + platformWidth)
            ) {
                console.log("jumped on platform");
                // fallDist = 10;
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
        jumpDist *= 0.9; // simulate gravity, velocity drops as doodler goes higher
        if (parseFloat($(".doodler").css("bottom")) > startPoint + 150) {
            isJumping = false;
            jumpDist = 20;
            fall();
        }
    }, 40);
}

const moveLeftRight = (event) => {
    if (event.key === "ArrowLeft") {
        if (parseFloat($(".doodler").css("left")) < -87) {
            $(".doodler").css("left", `${containerWidth}` + `px`);
        } else {
            $(".doodler").animate({left: "-=15"}, 10); 
            console.log("left");
        }
    } else if (event.key === "ArrowRight") {
        if (parseFloat($(".doodler").css("left")) > containerWidth) {
            $(".doodler").css("left", `${-87}` + `px`); // doodler width is 87px
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
        $(".container").html("<h1 class='game-over'>You fell! You crossed " + `${score}` + " platforms </h1>");
        console.log("emptied");
    } else {
        //startGame();
    }
}

const startGame = () => {

}

// Execute
$(() => {
    if (!isGameOver) {
        makePlatforms(7);
        makeDoodler();
        setInterval(refreshPlatforms, 15);
        jump(startPoint);
        document.onkeydown = moveLeftRight;
    } else {
        //startGame();
    }
})