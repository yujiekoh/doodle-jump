// JS Data
const platforms = [];
const platBottom = 100;

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

    $(".container").append($doodler);
}

const moveDoodler = (event) => {
    if (event.key === "ArrowLeft") { // add a move-left class to $doodler. animation duration depends on how long the user holds the key down
        $(".doodler").animate({left: "-=10"}, 10);
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
    document.onkeydown = moveDoodler;
    // have to add onkeyup?
})