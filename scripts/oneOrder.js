const order = getOrder_now()
const myUser = getUser_now()

const fullAutoToTake = () => {
    const h3 = document.querySelector("h3")
    const nameO = document.querySelector("#nameUser")
    const phone = document.querySelector("#phone")
    const date = document.querySelector("#date")
    const clock = document.querySelector("#clock")
    const numPassenger = document.querySelector("#numPassenger")
    const stationFrom = document.querySelector("#stationFrom")
    const stationTo = document.querySelector("#stationTo")
    const special = document.querySelector("#special")
    h3.innerText = order.numOrder
    nameO.innerText = `שם: ${order.nameUser}`
    phone.innerText = `טלפון: ${order.phone}`
    date.innerText = `תאריך נסיעה: ${order.date}`
    clock.innerText = `שעת יציאה: ${order.clock}`
    numPassenger.innerText = `מספר נוסעים: ${order.numPassenger}`
    stationFrom.innerText = `תחנת מוצא: ${order.stationFromStreet}, ${order.stationFromCity}`
    stationTo.innerText = `תחנת יעד: ${order.stationToStreet}, ${order.stationToCity}`
    if (order.spacial != "")
        special.innerText = `הערות: ${order.spacial}`
}

fullAutoToTake()

const not = document.querySelector("#not")
const yes = document.querySelector("#yes")

not.onclick = () => { location.href = "orders.html?type=allWithoutQuestion" }

yes.onclick = () => {
    removeOredr(order)
    order.status = true
    order.nameDriver = myUser.nameUser
    addOrder(order)
    location.href = "orders.html?type=allWithoutQuestion"
}