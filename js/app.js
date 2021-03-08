// JS Data
const platforms = [];
let startPoint = 100;
const platBottom = startPoint;
let isGameOver = false;
const jumpDist = 10;
const fallDist = 10;
let isJumping;
let jumpTimer;
let fallTimer;
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

const movePlatforms = () => {
    if (parseFloat($(".doodler").css("bottom")) > 450) {
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
    let doodlerLeft = parseFloat(platforms[0].css("left")) + (platformWidth / 4);
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
        if (parseFloat($(".doodler").css("bottom")) <= 0) {
            isGameOver = true;
            // console.log(isGameOver);
        }
        platforms.forEach(platform => {
            console.log(parseFloat(platform.css("bottom")));
            if (
                (parseFloat($(".doodler").css("bottom")) >= parseFloat(platform.css("bottom"))) &&
                (parseFloat($(".doodler").css("bottom")) <= parseFloat(platform.css("bottom")) + platformHeight) &&
                (parseFloat($(".doodler").css("left")) + 30 >= parseFloat(platform.css("left"))) && // doodler width = 30px
                (parseFloat($(".doodler").css("left")) <= parseFloat(platform.css("left")) + platformWidth)
                // (isJumping = false)
            ) {
                console.log("jumped on platform");
                startPoint = parseFloat($(".doodler").css("bottom"));
                jump();
                isJumping = true;
            }
        })
    }, 200);
}

const jump = () => {
    isJumping = true;
    clearInterval(fallTimer);
    jumpTimer = setInterval(function() {
        // console.log(startPoint);
        // console.log('1', $(".doodler").css("bottom"));
        let doodlerBottom = parseFloat($(".doodler").css("bottom")) + jumpDist;
        $(".doodler").css("bottom", `${doodlerBottom}` + `px`);
        // console.log('2', $(".doodler").css("bottom"));
        // console.log('s',startPoint)
        if (parseFloat($(".doodler").css("bottom")) > startPoint + 200) {
            fall();
            isJumping = false;
        }
    }, 200);
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
        makePlatforms(6);
        makeDoodler();
        setInterval(movePlatforms, 50);
        jump(startPoint);
        document.onkeydown = moveLeftRight;
        // have to add onkeyup?
    
})