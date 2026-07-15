const addPassengers = () => {
    if (!localStorage.getItem('passengers')) {
        localStorage.setItem('passengers', JSON.stringify(passengers))
    }
}

const addDrivers = () => {
    if (!localStorage.getItem('drivers')) {
        localStorage.setItem('drivers', JSON.stringify(drivers))
    }
}

const addOrders = () => {
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify(orders))
    }
}

const initUser_now = () => {
    if (!localStorage.getItem('user_now')) {
        localStorage.setItem('user_now', JSON.stringify(""))
    }
}

addPassengers()
addDrivers()
addOrders()
initUser_now()

const getpassengers = () => {
    return JSON.parse(localStorage.getItem('passengers'))
}

const getdrivers = () => {
    return JSON.parse(localStorage.getItem('drivers'))
}

const getorders = () => {
    return JSON.parse(localStorage.getItem('orders'))
}

const addDrive = (newDrive) => {
    const drivers = getdrivers();
    drivers.push(newDrive)
    setUser_now(newDrive)
    localStorage.setItem('drivers', JSON.stringify(drivers))
}

const addPassenger = (newPassenger) => {
    const passengers = getpassengers();
    passengers.push(newPassenger)
    setUser_now(newPassenger)
    localStorage.setItem('passengers', JSON.stringify(passengers))
}

const removeDrive = (PrevDrive) => {
    let drivers = getdrivers();
    drivers = drivers.filter(x => x.nameUser != PrevDrive.nameUser)
    localStorage.setItem('drivers', JSON.stringify(drivers))
}

const removePassenger = (PrevPassenger) => {
    let passengers = getpassengers();
    passengers = passengers.filter(x => x.nameUser != PrevPassenger.nameUser)
    localStorage.setItem('passengers', JSON.stringify(passengers))
}

const removeOredr = (PrevOrder) => {
    let orders = getorders();
    orders = orders.filter(x => x.numOrder != PrevOrder.numOrder)
    localStorage.setItem('orders', JSON.stringify(orders))
}

const fineTypeOfMen = (perosne) => {
    const passengers = getpassengers();
    const drivers = getdrivers();
    const dri = drivers.find(x => x.nameUser.trim(" ") == perosne.nameUser.trim(" ") && x.password == perosne.password)
    const pas = passengers.find(x => x.nameUser.trim(" ") == perosne.nameUser.trim(" ") && x.password == perosne.password)
    if (pas != null) {
        setUser_now(pas)
        return "passengers";
    }
    if (dri != null) {
        setUser_now(dri)
        return "drivers";
    }
    return "no";
}

const getUser_now = () => {
    return JSON.parse(localStorage.getItem('user_now'))
}

const setUser_now = (new_user_now) => {
    localStorage.setItem('user_now', JSON.stringify(new_user_now))
}

const getSearch = () => {
    return JSON.parse(localStorage.getItem('search'))
}

const setSearch = (search) => {
    localStorage.setItem('search', JSON.stringify(search))
}


const getNumSeats = () => {
    return JSON.parse(localStorage.getItem('numSeats'))
}

const setNumSeats = (numSeats) => {
    localStorage.setItem('numSeats', JSON.stringify(numSeats))
}

const addOrder = (newOrder) => {
    const orders = getorders();
    orders.push(newOrder)
    localStorage.setItem('orders', JSON.stringify(orders))
}

const getOrder_now = () => {
    return JSON.parse(localStorage.getItem('order_now'))
}

const addOrder_now = (order) => {
    localStorage.setItem('order_now', JSON.stringify(order))
}

const addNumOrder = () => {
    if (!localStorage.getItem('numOrder'))
        localStorage.setItem('numOrder', JSON.stringify(1000000))
}

addNumOrder()

const getAndAddNumOrder = () => {
    const numOrder = JSON.parse(localStorage.getItem('numOrder'))
    localStorage.setItem('numOrder', JSON.stringify(numOrder + 1))
    return numOrder
}

const getNumOrder = () => {
    return JSON.parse(localStorage.getItem('numOrder'))
}

const isExist = (perosne) => {
    const passengers = getpassengers();
    const drivers = getdrivers();
    const user = drivers.find(x => x.nameUser == perosne.nameUser) || passengers.find(x => x.nameUser == perosne.nameUser)
    if (user == null)
        return false
    return true
}

const ordersToDrivers = (myUser) => {//מחזיר לי את כל ההזמנות שרשומות על נהג מסויים
    return getorders().filter(x => x.status == true && x.nameDriver == myUser.nameUser)
}

const ordersToPassengers = (myUser) => {//מחזיר לי את כל ההזמנות שרשומות על נוסע מסויים  
    return getorders().filter(x => x.nameUser.trim(" ") == myUser.nameUser.trim(" "))
}

const getDriverToPassenger = (nameDrive) => {
    return getdrivers().find(x => x.nameUser == nameDrive)
}