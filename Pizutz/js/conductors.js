
//הוספת אלוף חדש לרשימת האלופים לפי רמה
function addNewConductors(conduct) {
    var CName = conduct.PName;
    var CDots = conduct.Point;
    var CLevel = conduct.Level;
    var key = "Level" + CLevel;
    var newConductor = new Conductor(CName, CDots);
    if (JSON.parse(localStorage.getItem(key)) == null) {
        Conductors=[];
        Conductors[0] = newConductor;
        localStorage.setItem(key, JSON.stringify(Conductors));
    }
    else {
        var flag = false;
        Conductors = JSON.parse(localStorage.getItem(key));
        var len = Conductors.length;
        for (var i = 0; i < len; i++) {
            if (Number(newConductor.CDots) >= Number(Conductors[i].CDots)) {
                for (var j = len-1; j >= i; j--) {
                    Conductors[j + 1] = Conductors[j];
                }
                Conductors[i] = newConductor;
                flag = true;
                break;
            }
        }
        if (flag == false) {
            Conductors[len] = newConductor;
        }
        if (Conductors.length > 10) {
            Conductors.pop();
        }
        localStorage.setItem(key, JSON.stringify(Conductors));
    }
}


function showTable() {
    var TDiv = document.querySelector("#Ctable");
    TDiv.innerHTML = "";
    for (var level = 1; level <= 3; level++) {
        var CTable = document.createElement("table");
        CTable.style.border = "3px solid black";
        CTable.style.width = "250px";
        TDiv.appendChild(CTable);
        b = document.createElement("br");
        TDiv.appendChild(b);
        var TTR = document.createElement("tr");
        var TTh = document.createElement("th");
        TTh.innerHTML = "רמה " + level ;
        TTh.colSpan = "2";
        TTh.style.border = " 1px solid black";
        TTR.appendChild(TTh);
        CTable.appendChild(TTR);
        var key = "Level" + level;
        var Conductors = JSON.parse(localStorage.getItem(key));
        if (Conductors != null) {
            for (var i = 0; i < Conductors.length; i++) {
                TTR = document.createElement("tr");
                var TTD = document.createElement("td");
                TTD.innerHTML = Conductors[i].CName;
                TTD.style.border = " 1px solid black";
                TTR.appendChild(TTD);
                TTD = document.createElement("td");
                TTD.innerHTML = Conductors[i].CDots;
                TTD.style.border = " 1px solid black";
                TTR.appendChild(TTD);
                CTable.appendChild(TTR);
            }
        }
    }
}

//שמירת הנתונים כשהדף עולה
function showConductors() {
    var objPlayer = JSON.parse(sessionStorage.Player);
    addNewConductors(objPlayer);
    showTable();
}



//מחיקת נתוני האלופים
function deleteConductors() {
    localStorage.Level1 = null;
    localStorage.Level2 = null;
    localStorage.Level3 = null;
    showTable();
}