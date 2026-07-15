const form = document.querySelector("form")
const numOrder = document.querySelector("#numOrder")
const nameP = document.querySelector("#nameUser")
const phone = document.querySelector("#phone")
const stationFromStreet = document.querySelector("#stationFromStreet")
const stationFromCity = document.querySelector("#stationFromCity")
const myUser = getUser_now()
const search = new URLSearchParams(location.search)
const type = search.get("type")
const order = getOrder_now()

const fullAuto = (myUser) => {
    console.log(nameP.value);
    
    nameP.value = myUser.nameUser
    nameP.disabled = true
    phone.value = myUser.phone
    phone.disabled = true
    stationFromStreet.value = `${myUser.street} ${myUser.number_home}`
    stationFromCity.value = myUser.city
    if (type == "edit") {
        const spacial = document.querySelector("#spacial")
        const stationToCity = document.querySelector("#stationToCity")
        const stationToStreet = document.querySelector("#stationToStreet")
        const numPassenger = document.querySelector("#numPassenger")
        const date = document.querySelector("#date")
        const clock = document.querySelector("#clock")
        spacial.value = order.spacial
        stationToCity.value = order.stationToCity
        stationToStreet.value = order.stationToStreet
        stationFromCity.value = order.stationFromCity
        stationFromStreet.value = order.stationFromStreet
        numPassenger.value = order.numPassenger
        numOrder.value = order.numOrder
        numOrder.disabled = true
        date.value = order.date
        clock.value = order.clock
        const button = document.querySelector("#save")
        const buttonDelete = document.createElement("button")
        form.append(buttonDelete)
        button.innerText = "לשמירת השינוי"
        buttonDelete.innerText = "מחיקת הנסיעה"
        buttonDelete.type = "button"
        buttonDelete.className = "btn btn-warning"
        buttonDelete.id = "buttonDelete"
    }
    else {
        numOrder.value = getAndAddNumOrder()
        numOrder.disabled = true
    }
}

fullAuto(myUser)

form.onsubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target))
    if (type == "edit") {
        removeOredr(order)
        data.numOrder = order.numOrder
    }
    else
        data.numOrder = getNumOrder() - 1
    data.nameUser = myUser.nameUser
    data.phone = myUser.phone
    data.status = false
    addOrder(data)
    location.href = "../pages/home.html"
}

if (type == "edit") {
    const buttonDelete = document.querySelector("#buttonDelete")
    buttonDelete.onclick = () => {
        removeOredr(order)
        location.href = "../pages/home.html"
    }
}

