const form = document.querySelector("form")
const exitButton = document.querySelector("#exit")
const myUser = getUser_now()
const prevTypeUser = myUser.typeUser
const edit = document.querySelector("#edit")

const arrInput = [password, nameUser, phone, street, number_home, city, email, typeUser]
arrInput.forEach(x => { x = document.querySelector(`#${x.name}`) })

const fullAuto = () => {
    arrInput.forEach(x => {
        x.value = myUser[x.name]
        x.disabled = true
    })
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
    if (edit.innerText == "עריכה") {
        arrInput.forEach(x => { x.disabled = false })
        edit.innerText = "שמירה"
    }
    else {
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
            location.href = "./privetArea.html"
            alert("השינויים נקלטו בהצלחה")
        }
    }
}

exitButton.onclick = () => {
    if (myUser.typeUser == "passenger") {
        removePassenger(myUser)
    }
    if (myUser.typeUser == "drive") {
        removeDrive(myUser)
    }
    location.href = "../index.html"
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



