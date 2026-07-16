const myOrders = getorders();
const myUser = getUser_now()
const ordersArea = document.querySelector(".ordersArea")
let isEmpty = false
const search = new URLSearchParams(location.search)
const type = search.get("type")
const activeLink = document.querySelector("#activeLink")
myOrders.sort((a, b) => a.numOrder - b.numOrder)

const view = (order) => {
    if (!isEmpty)
        isEmpty = true
    const div1 = document.createElement("div")
    const div2 = document.createElement("div")
    const div3 = document.createElement("div")
    const div4 = document.createElement("div")
    const divClock = document.createElement("div")
    const div5 = document.createElement("div")
    const div6 = document.createElement("div")
    const div7 = document.createElement("div")
    const div8 = document.createElement("div")
    const div = document.createElement("div")
    const moreButton = document.createElement("button")
    div.className = "oneOrder"
    div1.className = "order-line order-id"
    div2.className = "order-line order-name"
    div3.className = "order-line order-phone"
    div4.className = "order-line order-date"
    divClock.className = "order-line order-clock"
    div5.className = "order-line order-passengers"
    div6.className = "order-line order-from"
    div7.className = "order-line order-to"
    div8.className = "order-line order-notes"
    moreButton.className = "more-details-btn"
    ordersArea.append(div)
    div.append(div1)
    div.append(div2)
    div.append(div3)
    div.append(div4)
    div.append(divClock)
    div.append(div5)
    div.append(div6)
    div.append(div7)
    div.append(div8)
    div.append(moreButton)
    div4.innerText = `📅 תאריך: ${order.date}`
    divClock.innerText = `🕐 שעה: ${order.clock}`
    div6.innerText = `📍 תחנת מוצא: ${order.stationFromStreet} ${order.stationFromCity}`
    div7.innerText = `🏁 תחנת יעד: ${order.stationToStreet} ${order.stationToCity}`
    moreButton.innerText = "פרטים נוספים"



    if (type == "all" || type == "allWithoutQuestion") {
        const div9 = document.createElement("div")
        const button = document.createElement("button")
        button.innerText = "הוסף לנסיעות שלי"
        button.className = "btn btn-sm btn-primary"
        div9.append(button)
        div.append(div9)

        button.onclick = () => {
            location.href = "../pages/oneOrder.html?type=take"
            addOrder_now(order)
        }
    }

    else if (type == "passenger") {
        const div9 = document.createElement("div")
        const div10 = document.createElement("div")
        const button = document.createElement("button")
        const div11 = document.createElement("div")
        const div12 = document.createElement("div")
        button.className = "btn btn-sm btn-primary"
        if (order.status == true) {
            const tafus = document.createElement("span")
            tafus.className = "status-dot"
            div10.className = "status-badge status-taken"
            div10.innerText = "שובץ נהג"
            button.innerText = "פרטי הנהג"
            div10.append(tafus)
        }
        else {
            const panuy = document.createElement("span")
            panuy.className = "status-dot"
            div10.className = "status-badge status-free"
            div10.innerText = "טרם שובץ נהג"
            div10.append(panuy)
            button.innerText = "עריכת הנסיעה"
        }
        div.append(div11)
        div.append(div12)
        div9.append(button)
        div.append(div9)
        div.append(div10)

        button.onclick = () => {
            if (button.innerText == "עריכת הנסיעה") {
                location.href = "../pages/newOrder.html?type=edit"
                addOrder_now(order)
            }
            else {
                if (button.innerText == "פרטי הנהג") {
                    const driver = getDriverToPassenger(order.nameDriver)
                    div11.innerText = `👤 שם הנהג: ${driver.nameUser}`
                    div12.innerText = ` 📞 טלפון הנהג: ${driver.phone}`
                    button.innerText = "הסרת פרטי הנהג"
                }
                else {
                    button.innerText = "פרטי הנהג"
                    div11.innerText = ""
                    div12.innerText = ""
                }
            }
        }
    }

    moreButton.onclick = () => {
        if (div5.innerText == "") {
            if (type != "passenger") {
                div2.innerText = `👤 שם: ${order.nameUser}`
                div3.innerText = `📞 טלפון: ${order.phone}`
            }
            div1.innerText = `🔖 מספר הזמנה: ${order.numOrder}`
            div5.innerText = `👥 מספר נוסעים: ${order.numPassenger}`
            div8.innerText = `📝 הערות: ${order.spacial}`
            moreButton.innerText = "פחות פרטים"
            moreButton.classList.add("open")
        }
        else {
            div1.innerText = ""
            div5.innerText = ""
            div8.innerText = ""
            if (type != "passenger") {
                div2.innerText = ""
                div3.innerText = ""
            }
            moreButton.innerText = "יותר פרטים"
            moreButton.classList.remove("open")
        }
    }
}

const viewAllOrdersToDriver = () => {
    numSeats = getNumSeats()
    myOrders.filter(x => x.status == false && x.numPassenger < parseInt(numSeats) + 1 && ((`${x.stationFromStreet} ${x.stationFromCity}`.includes(getSearch())) || (`${x.stationToStreet} ${x.stationToCity}`.includes(getSearch())))).forEach((x) => {
        view(x)
    })
}

const viewOrdersToPassenger = () => {
    ordersToPassengers(myUser).forEach((x) => {
        view(x)
    });
}

const viewOrdersToDrivers = () => {
    ordersToDrivers(myUser).forEach((x) => {
        view(x)
    });
}

const noFind = () => {
    const noFindDiv = document.createElement("div")
    ordersArea.append(noFindDiv)
    noFindDiv.innerText = "...אין נתונים תואמים במערכת"
}

const viewOrder = () => {
    if (myUser.typeUser == "passenger")
        viewOrdersToPassenger()
    else {
        if (type == "my")
            viewOrdersToDrivers()
        if (type == "all" || type == "allWithoutQuestion") {
            viewAllOrdersToDriver()
            const search = document.querySelector("#search")
            const input = document.createElement("input")
            const span = document.createElement("span")
            span.className = "input-group-text"
            input.className = "form-control"
            input.type = "text"
            if (getSearch() == null)
                setSearch("")
            input.placeholder = "חיפוש לפי תחנת מוצא ויעד..."
            search.append(span)
            search.append(input)
            input.value = getSearch()
            input.oninput = () => {
                setSearch(input.value)
                isEmpty = false
                ordersArea.innerText = ""
                viewAllOrdersToDriver()
                if (!isEmpty)
                    noFind()
            }
        }
    }
}

const fullAuto = () => {
    if (type == "all" || type == "allWithoutQuestion") {
        //כל הקטע של העידכון מספר מקומות הPOPUP הזה
        const numSeats = document.querySelector("#numSeats")
        const ok = document.querySelector("#ok")
        const cancel = document.querySelector("#cancel")
        ok.onclick = () => {
            if (numSeats.value == "")
                setNumSeats(Number.MAX_SAFE_INTEGER)
            else
                setNumSeats(numSeats.value)
            location.href = "./orders.html?type=all"
        }
        cancel.onclick = () => {
            location.href = "./orders.html?type=all"
        }
    }
    else {
        const divUpdate = document.querySelector("#divUpdate")
        divUpdate.innerText = ""
    }
    viewOrder()
    if (!isEmpty) {
        noFind()
    }
    activeLink.href = `./orders.html?type=${type}`
    if (type == "my")
        activeLink.innerText = "נסיעות שלי"
    if (type == "all" || type == "allWithoutQuestion")
        activeLink.innerText = "מאגר הנסיעות"
    if (type == "passenger")
        activeLink.innerText = "נסיעות שלי"
}

fullAuto()