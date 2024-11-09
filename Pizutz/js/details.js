
var selName;
var selPicture = -1;
var Pname;
//בדיקה האם להוסיף את השחקן לרשימה
function DoubleName(insertName) {
    var flag = false;
    var option = document.querySelectorAll("#InsertName>option")
    for (var i = 0; i < option.length; i++) {
        if (option[i].text == insertName)
            flag = true;
    }
    return flag;
}


function details() {
    selName = document.querySelector("#InsertName");
    for (var level = 1; level <= 3; level++) {
        var key = "Level" + level;
        var conductors = JSON.parse(localStorage.getItem(key));
        if (conductors != null) {
            for (var i = 0; i < conductors.length; i++) {
                flag = DoubleName(conductors[i].CName);
                if (flag == false) {
                    var toption = document.createElement("option");
                    toption.textContent = conductors[i].CName;
                    selName.appendChild(toption);
                }
            }
            document.getElementById("NamePlayer").style.display = "none";
        }
    }
}


//גילוי תיבת טקסט לכתיבת שחקן חדש
function DiscoverText() {
    document.getElementById("NamePlayer").style.display = "inline";
    selName.selectedIndex = 0;
}

//בבחירת שחקן קיים מסתיר את תיבת הטקסט
function CoverText() {
    document.querySelector("#NamePlayer").style.display = "none";
    document.querySelector("#NamePlayer").value="";
}

//כאשר בוחרים תמונה אקראית - מסיר את רשימת התמונות
function RemovePicture() {
    selPicture = -1;
    var vecImage = document.querySelectorAll(".imgElements");
    var listImage = document.getElementById("ListOfImage");
    for (var i = 0; i < vecImage.length; i++) {
        listImage.removeChild(vecImage[i]);
    }
}

//כאשר בוחרים תמונה מציג את התמונות לבחירה
function CreatePicture() {
    var listImage = document.getElementById("ListOfImage");
    var vecImage = [];
    for (var i = 0; i < 7; i++) {
        vecImage[i] = document.createElement("img");
        listImage.appendChild(vecImage[i]);
        vecImage[i].src = "../picture/" + i + ".png";
        vecImage[i].setAttribute("class", "imgElements")
        vecImage[i].onclick = function (e) {
            choosePic(e.target);
        }
    }
    vecImage[0].style.border = "2px dashed #000000";
    selPicture = 0;
}


//יצירת מסגרת סביב התמונה שנבחרה
function choosePic(obj) {
    var vecImg = document.querySelectorAll(".imgElements");
    for (var i = 0; i < vecImg.length; i++) {
        if (vecImg[i] == obj) {
            vecImg[i].style.border = "2px dashed #000000";
            selPicture = i;
        }
        else
            vecImg[i].style.border = "none";
    }
}

//מעבר למשחק והעברת הנתונים
function goGame() {
    if (selName.selectedIndex == 0 && document.querySelector("#NamePlayer").value == "")
        alert("יש להכניס שם שחקן");
    else {
        //שם השחקן
        if (selName.selectedIndex == 0)
            Pname = document.querySelector("#NamePlayer").value;
        else
            //Pname = selName[selName.selectIndex].textContent;
            Pname = selName.options[selName.selectedIndex].textContent;
        //מספר האלמנטים שיופיעו במשחק
        var AmountElements = document.querySelector("#AmountOfElement").value;
        //רמת המשחק המבוקשת
        var lev = document.querySelector("#level").value;
        //יצירת מופע אובייקט Game
        var obGame = new Game(Pname, AmountElements, lev, selPicture);
        //שמירה ע"מ להעביר את הנתונים לדף המשחק
        sessionStorage.Game = JSON.stringify(obGame);
        //מעבר לדף המשחק 
        window.location = "Game.html";

    }
}

var winWidth, winHeigth;
var numOfImage = 0;
var myImage = [];
var dir1 = [], dir2 = [];
var imageSize = [];
var theLeft = [], theTop = [];
var n1, n2;
var voice = new Audio('../picture/good.mp3')

function Init() {
    voice.play();
    //שליפת פרטי המשחק כשעולה דף המשחק
    var objGame = JSON.parse(sessionStorage.Game);
    //שם השחקן
    document.querySelector("#np").textContent = objGame.PName;
    //כמות האלמנטים
    document.getElementById("AmountOfElement").textContent = objGame.numElements;
    //רמה מבוקשת
    document.getElementById("level").textContent = objGame.level;
    //התמונה שנבחרה
    var Npic = objGame.selPicture
    if (Npic == -1) {
        Npic = Math.floor(Math.random() * 7);
        document.getElementById("random").textContent = "(אקראי)"
    }
    pic = document.getElementById("pic");
    pic.src = "../picture/" + Npic + ".png";
    pic.style.width = "50px";

    document.getElementById("dots").textContent = 0;
    //המשחק
    if (document.getElementById("level").textContent == 1) {
        n1 = 600
        n2 = 70
    }
    else if (document.getElementById("level").textContent == 2) {
        n1 = 400
        n2 = 40
    }
    else {
        n1 = 250
        n2 = 15
    }
    winWidth = window.innerWidth;
    winHeigth = window.innerHeight;
    var inter = setInterval(function () {
        numOfImage++;
        myImage[numOfImage] = document.createElement("img");
        myImage[numOfImage].src = "../picture/" + Npic + ".png";
        document.body.appendChild(myImage[numOfImage]);
        imageSize[numOfImage] = Math.floor(Math.random() * 70) + 70;
        myImage[numOfImage].style.width = imageSize[numOfImage] + "px";
        myImage[numOfImage].style.height = imageSize[numOfImage] + "px";
        myImage[numOfImage].style.position = "absolute";
        theLeft[numOfImage] = Math.floor(Math.random() * (winWidth - imageSize[numOfImage]));
        myImage[numOfImage].style.left = theLeft[numOfImage] + "px";
        theTop[numOfImage] = Math.floor(Math.random() * (winHeigth - imageSize[numOfImage]));
        myImage[numOfImage].style.top = theTop[numOfImage] + "px"
        //הוספת מחלקה כדי שיסתובבו
        myImage[numOfImage].setAttribute("class", "newPic");
        myImage[numOfImage].onclick = function (e) {
            document.body.removeChild(e.target);
            var n = Number(document.getElementById("dots").textContent);
            n += 5
            document.getElementById("dots").textContent = n;
        }
        dir1[numOfImage] = Math.floor(Math.random() * 2);
        if (dir1[numOfImage] == 0)
            dir1[numOfImage] = -1;
        dir2[numOfImage] = Math.floor(Math.random() * 2);
        if (dir2[numOfImage] == 0)
            dir2[numOfImage] = -1;
        if (numOfImage >= document.getElementById("AmountOfElement").textContent) {
            clearInterval(inter);
            var theImage = document.querySelectorAll("img");
            for (var i = 0; i < theImage.length; i++) {
                theImage[i].onclick = null;
                theImage[i].style.opacity = "0.3";
            }
            var gameOver = document.createElement("img");
            var divi = document.getElementById("go");
            divi.appendChild(gameOver);
            gameOver.src = "../picture/giphy.gif";
            voice.pause();
            voice.load();
            voice = new Audio('../picture/p.wav');
            voice.play();

        }
    }, n1);
    var move = setInterval(function () {
        for (var i = 1; i < numOfImage; i++) {
            theLeft[i] = parseInt(myImage[i].style.left, 10);
            theLeft[i] += 3 * dir1[i];
            myImage[i].style.left = theLeft[i] + "px";
            if ((theLeft[i] <= 0) || (theLeft[i] + imageSize[i] >= winWidth))
                dir1[i] = -dir1[i];
            theTop[i] = parseInt(myImage[i].style.top, 10);
            theTop[i] += 3 * dir2[i];
            myImage[i].style.top = theTop[i] + "px";
            if ((theTop[i] <= 0) || (theTop[i] + imageSize[i] >= winHeigth))
                dir2[i] = -dir2[i];
        }

    }, n2)
}

//מעבר לעמוד האלופים
function goConductors() {
    //שם שחקן
    var NPlayer = document.getElementById("np").textContent;
    //מספר נקודות
    var dots = document.getElementById("dots").textContent;
    //רמה
    var level = document.getElementById("level").textContent;
    var objPlayer = new Player(NPlayer, dots, level);
    sessionStorage.Player = JSON.stringify(objPlayer);
    window.location = "Conductors.html"
}







