const form = document.querySelector("form")
const password = document.querySelector("#password")
const nameP = document.querySelector("#nameUser")
const phone = document.querySelector("#phone")
const street = document.querySelector("#street")
const number_home = document.querySelector("#number_home")
const city = document.querySelector("#city")
const email = document.querySelector("#email")
const typeUser = document.querySelector("#typeUser")
const exitButton = document.querySelector("#exit")
const myUser = getUser_now()
const prevTypeUser = myUser.typeUser

const fullAuto = () => {
    password.value = myUser.password
    nameP.value = myUser.nameUser
    phone.value = myUser.phone
    street.value = myUser.street
    number_home.value = myUser.number_home
    city.value = myUser.city
    email.value = myUser.email
    typeUser.value = myUser.typeUser
}
    
fullAuto()

let worng = 0
const errorThisExist = () => {
    if (worng == 1)
        return
    worng = 1
    const newWorng = document.createElement("div");
    const div = document.createElement("div")
    const areaErorr = document.querySelector("#areaError")
    newWorng.innerText = "קיים משתמש זהה במערכת, לא ניתן להשלים את המשימה"
    newWorng.className = "alert alert-danger"
    div.className = "mt-3 mb-4 p-3"
    areaErorr.append(div)
    areaErorr.append(newWorng)
}

form.onsubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target))
    const isexist = isExist(data)

    if (data.nameUser != myUser.nameUser && isexist) {
        errorThisExist()
    }
    else {
        if (data.nameUser != myUser.nameUser) {
            //שינוי שם נוסע בנסיעות שלו 
            const passengerOrders = ordersToPassengers(myUser)
            ordersToPassengers(myUser).forEach(x => removeOredr(x));
            passengerOrders.map(x => x.nameUser = data.nameUser)
9            //שינוי שם נהג בנסיעות שלו 
            const driverOrders = ordersToDrivers(myUser)
            ordersToDrivers(myUser).forEach(x => removeOredr(x));
            driverOrders.map(x => x.nameDriver = data.nameUser)
            driverOrders.forEach(x => addOrder(x))
        }
        if (prevTypeUser == "passenger") {
            removePassenger(myUser)
        }
        if (prevTypeUser == "drive") {
            removeDrive(myUser)
        }
        if (data.typeUser == "passenger") {
            addPassenger(data)
        }
        if (data.typeUser == "drive") {
            addDrive(data)
        }
        location.href = "./home.html"
        alert("השינויים נקלטו בהצלחה")
    }
}

exitButton.onclick = () => {
    if (myUser.typeUser == "passenger") {
        removePassenger(myUser)
    }
    if (myUser.typeUser == "drive") {
        removeDrive(myUser)
    }
    location.href = "../login.html"
}

const eye = document.querySelector("#togglePassword")
const passwordEye = document.querySelector("#password")

eye.onclick = () => {
    if (passwordEye.type == "password") {
        passwordEye.type = "text"
    }
    else {
        passwordEye.type = "password"
    }
}

