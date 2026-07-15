const form = document.querySelector("form");
const userName = document.querySelector("#nameUser")
let worng = 0

form.onsubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target))
    const type = fineTypeOfMen(data);
    if (type == "no") {
        toRishum();
    }
    if (type == "drivers") {
        goToDriversPage();
    }
    if (type == "passengers") {
        goToPassengerPage();
    }
}

const goToPassengerPage = () => {
    location.href = "./pages/home.html"
}

const goToDriversPage = () => {
    location.href = "./pages/home.html"
}

const toRishum = () => {
    if (worng == 1)
        return
    worng = 1
    const newButton = document.createElement("button");
    const newWorng = document.createElement("div");
    const buttonDiv = document.querySelector("#worng")
    newButton.innerText = "רישום למערכת"
    newButton.className = "btn btn-warning btn-primary w-100"
    newWorng.innerText = "לא נמצאו פרטים תואמים במערכת"
    newWorng.className = "messeg"
    newButton.type = "button"
    buttonDiv.append(newWorng)
    buttonDiv.append(newButton)
    newButton.onclick = () => {
        location.href = "./pages/rishum.html?type=yes"
    }
}

setUser_now("")
setNumSeats(Number.MAX_SAFE_INTEGER)

const buttons = (text, numAnswer) => {
    const div = document.querySelector(numAnswer)
    const answer1 = document.querySelector("#answer1")
    const answer2 = document.querySelector("#answer2")
    const answer3 = document.querySelector("#answer3")
    const answer4 = document.querySelector("#answer4")
    if (div.innerText == "") {
        answer1.innerText = ""
        answer2.innerText = ""
        answer3.innerText = ""
        answer4.innerText = ""
        const p = document.createElement("p")
        p.innerText = `${text}`
        div.append(p)
    }
    else
        div.innerText = ""
}

const quest1 = document.querySelector("#quest1")
const quest2 = document.querySelector("#quest2")
const quest3 = document.querySelector("#quest3")
const quest4 = document.querySelector("#quest4")

quest1.onclick = () => {
    buttons("נכנסים ללחצן רישום בתפריט העליון, ממלאים את הפרטים האישיים ומאשרים. תוך דקות ספורות החשבון שלכם מוכן לשימוש.", "#answer1")
}

quest2.onclick = () => {
    buttons("ההרשמה לאפליקציה חינמית לחלוטין. התשלום מתבצע רק עבור נסיעות בפועל, לפי תעריף שמוצג מראש לפני האישור.", "#answer2")
}

quest3.onclick = () => {
    buttons("בממוצע נהג מאשר נסיעה תוך דקה עד שלוש דקות, תלוי בזמינות הנהגים באזור שלכם.", "#answer3")
}

quest4.onclick = () => {
    buttons("לא, לכל תפקיד יש להירשם עם חשבון נפרד, כדי לשמור על הפרדה נכונה בין הרשאות נהג לנוסע.", "#answer4")
}

const eye = document.querySelector("#togglePassword")
const password = document.querySelector("#password")

eye.onclick = () => {
    if (password.type == "password") {
        password.type = "text"
    }
    else {
        password.type = "password"
    }
}
