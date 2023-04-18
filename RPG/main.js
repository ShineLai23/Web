let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 200;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

//initial
$(function() {
    // 0 : available, 1 : Mountain, 2 : Final Stop, 3 : Enemy
    mapArray = [
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "img/people.png";
    currentImgMain = {
        x: 0,
        y: 0
    };

    imgMain.onload = function() {
        ctx.drawImage(imgMain, 15, 63, 339, 483, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
        // ctx.drawImage(imgMain, 360, 0, 80, 130, 200,0, gridLength, gridLength*3);
    };


    let sources = {
        boom: "img/boom2.png",
        badman: "img/badman.png"
    };


    loadImages(sources, function(images) {
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(images.boom, 257, 125, 476, 388, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.badman, 3, 18, 327, 339, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });

});

//Click Event
$(document).on("keydown", function(event) {
    console.log(event.code);
    let targetImg, targetBlock, cutImagePositionX, cutImagePositionY;
    targetImg = {
        x: -1,
        y: -1
    };
    targetBlock = {
        x: -1,
        y: -1
    };
    event.preventDefault();
    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 368;
            cutImagePositionY = 1058;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 7;//326
            cutImagePositionY = 532;//382
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 694;
            cutImagePositionY = 1574;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 358;
            cutImagePositionY = 36;//374
            break;
        default:
            return;
    }

    if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有爆炸");
                break;
            case 2: // Final Stop
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: //Enemy
                $("#talkBox").text("啊!有壞人!");
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain, cutImagePositionX, cutImagePositionY, 339, 483, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});