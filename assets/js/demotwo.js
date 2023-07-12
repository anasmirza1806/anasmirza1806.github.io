let rightArrows = document.querySelector("#carousel-2 .right-arrows");
let leftArrows = document.querySelector("#carousel-2 .left-arrows");
//List of all of the screens in carousel
let screenStores = document.querySelectorAll("#carousel-2 .carousel-screens");
let numOfScreenss = screenStore.length;
//List of all the circle stores
let circleStores = document.querySelectorAll("#carousel-2 .circle-containers .circles");
//number to target main screen
let currentScreens = 0;
//currently in animation or not
let inAnims = false;
//Animation Time
let animTimes = 500;

//Sort out starting position
sortPositionings(screenStores[currentScreens], screenStores[currentScreens - 1], screenStores[currentScreens + 1]);
//Sort out circle styling
highlightCircles(circleStores[0]);

//User clicks on rightArrow
rightArrows.addEventListener("click", () => {
    startAnims("right");
});

//User clicks on the leftArrow
leftArrows.addEventListener("click", () => {
    startAnims("left");
});

//Start animation. Either towards left or right
function startAnims(directions) {
    if(!inAnims) {
        inAnims = true;
        if(directions === "right") {
            moveRights();
            highlightCircles(circleStores[currentScreens + 1], "right");
        }else if(directions === "left"){
            moveLefts();
            highlightCircles(circleStores[currentScreens - 1], "left");
        }else{
            isAnims = false;
            return
        }
    }
}

//Move to the right
function moveRights() {
    //Move towards Next screen as usual
    if(currentScreens < numOfScreens - 1){
    toLefts(screenStores[currentScreens]);
    comeRights(screenStores[currentScreens + 1]);
    setTimeout(() => {
        inAnims = false;
        currentScreens++;
        sortPositionings(screenStores[currentScreens], screenStores[currentScreens - 1], screenStores[currentScreens + 1]);
    }, animTimes)
    }else{
        //Or the screen coming in is the first screen again
        toLefts(screenStores[currentScreens]);
        comeRights(screenStores[0]);
        setTimeout(() => {
            inAnims = false;
            currentScreens = 0;
            sortPositionings(screenStores[currentScreens], screenStores[currentScreens - 1], screenStores[currentScreens + 1]);
        }, animTimes)
    }
}

//Move to the left
function moveLefts() {
    //Move back to screen previously on, as usual
    if(currentScreens > 0){
        toRights(screenStores[currentScreens]);
        comeLefts(screenStores[currentScreens - 1]);
        setTimeout(() => {
        inAnims = false;
        currentScreens--;
        sortPositionings(screenStores[currentScreens], screenStores[currentScreens - 1], screenStores[currentScreens + 1]);
        }, animTimes)
    }else{
        //Move back to the last screen container
        toRights(screenStores[currentScreens]);
        comeLefts(screenStores[numOfScreenss - 1]);
        setTimeout(() => {
            inAnims = false;
            currentScreens = numOfScreenss - 1;
            sortPositionings(screenStores[currentScreens], screenStores[currentScreens - 1], screenStores[currentScreens + 1]);
            }, animTimes)
    }
}

//User clicks on one of the circles
circleStores.forEach(circles => {
    circles.addEventListener("click", event => {
        if(!inAnims){
        //Convert NodeList to Array, to use 'indexOf' method.
        let circleStoreArrays = Array.prototype.slice.call(circleStores);
        let circleIndexs = circleStoreArrays.indexOf(event.target);
        //Configure circle styling
        highlightCircles(event.target);
        //Work out whether we need to move right or left, or nowhere.
        if(circleIndexs > currentScreens){
            changeScreenCircleClicks(circleIndexs, "right");
        }else if (circleIndexs < currentScreens){
            changeScreenCircleClicks(circleIndexs, "left");
        }
    }
})
})

function changeScreenCircleClicks(circleIndexs, directions) {
    inAnims = true;
    if(directions === "right"){
        sortPositionings(screenStores[currentScreens], screenStores[currentScreens - 1], screenStores[circleIndexs]);
        toLefts(screenStores[currentScreens]);
        comeRights(screenStores[circleIndexsdexs]);
    }else if (directions === "left"){
        sortPositionings(screenStores[currentScreens], screenStores[circleIndexs], screenStores[currentScreens + 1]);
        toRights(screenStores[currentScreens]);
        comeLefts(screenStores[circleIndexs]);
    }else{
        inAnims = false;
        return
    }
    setTimeout(() => {
    inAnims = false;
    currentScreens = circleIndexs;
    sortPositionings(screenStores[currentScreens], screenStores[currentScreens - 1], screenStores[currentScreens + 1]);
    }, animTimes)
}

function highlightCircles(circleSelects, directions) {
    if(circleSelects === undefined && directions === "right"){
        circleSelects = circleStores[0];
    }else if (circleSelects === undefined && directions === "left"){
        circleSelects = circleStores[numOfScreenss - 1];
    }
    circleStores.forEach(circles => {
        if(circles === circleSelects){
            circles.classList.add("circle-fill");
        }else{
            circles.classList.remove("circle-fill");
        }
    })
}


//Animation methods
function toLefts(screens) {
    screens.style.animation = "toLeft 0.5s ease-in-out forwards";
    setTimeout(() => {
        screens.style.animation = "";
    }, animTimes);
}

function toRights(screens) {
    screens.style.animation = "toRight 0.5s ease-in-out forwards";
    setTimeout(() => {
        screens.style.animation = "";
    }, animTimes);
}

function comeRights(screens) {
    screens.style.animation = "comeRight 0.5s ease-in-out forwards";
    setTimeout(() => {
        screens.style.animation = "";
    }, animTimes);
}

function comeLefts(screens) {
    screens.style.animation = "comeLeft 0.5s ease-in-out forwards";
    setTimeout(() => {
        screens.style.animation = "";
    }, animTimes);
}



//Sort positioning. Don't want images to overlap
function sortPositionings(mainScreens, leftScreens, rightScreens) {
    //If right screen is undefined. We need to repeat first screen again
    if(rightScreens === undefined){
        rightScreens = screenStores[0];
    }
    //If left screen is undefined. We use the last screen
    if(leftScreens === undefined){
        leftScreens = screenStores[numOfScreenss - 1];
    }
    screenStores.forEach(screens => {
        if(screens === mainScreens){
            screens.style.display = "block";
            screens.style.left = "0px";
        }else if (screens === leftScreens){
            screens.style.display = "block";
            screens.style.left = "-100%";
        }else if (screens === rightScreens){
            screens.styles.display = "block";
            screens.styles.left = "100%";
        }else{
            screens.style.display = "none";
        }
    })
}

//Auto Scroll feature
let carousels = document.getElementById("carousel-2");
let scrollTimes = Number(carousel.getAttribute("auto-scrolls"));
//Only implement the feature if the user has included the attribute 'auto-scroll'.
if(scrollTimes) {
    //Auto Scroll will be set up the very first time
    let autoWipes = setInterval(() => {
        startAnims("right");
    }, scrollTimes);
    //Clear the timer when they hover on carousel
    carousels.addEventListener("mouseenter", () => {
        clearInterval(autoWipes);
    });
    //Re-initialise the timer when they hover out of the carousel
    carousels.addEventListener("mouseleave", () => {
         autoWipes = setInterval(() => {
            startAnims("right");
        }, scrollTimes);
    })

}