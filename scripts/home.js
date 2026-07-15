const myUser = getUser_now()
const hello = document.querySelector("#hello")
const link1 = document.querySelector("#link1")
const link2 = document.querySelector("#link2")
const logout = document.querySelector(".logout")

const fullPage = () => {
    if (myUser.typeUser == "passenger") {
        link1.innerText = "נסיעות שלי"
        link1.href = "orders.html?type=passenger"
        link2.innerText = "הזמן נסיעה +"
        link2.href = "newOrder.html"
    }
    if (myUser.typeUser == "drive") {
        link1.innerText = "מאגר הנסיעות"
        link1.href = "orders.html?type=all"
        link2.innerText = "נסיעות שלי"
        link2.href = "orders.html?type=my"
    }
    setSearch("")
}

fullPage()

logout.onclick = () => {
    location.href = "../login.html"
}



