const createHello = () => {
    const helloTo = document.createElement("h4")
    hello.append(helloTo)
    helloTo.innerText = `שלום לך, ${myUser.nameUser}`
}

const timeSet = () => {
    const daysOfWeek = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];
    const timePlace = document.createElement("h6")
    timePlace.innerText = `${daysOfWeek[new Date().getDay()]} | ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}`
    hello.append(timePlace)
    setInterval(() => {
        timePlace.innerText = `${daysOfWeek[new Date().getDay()]} | ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}`
    }, 1000 * 15)
}

const helloSet = () => {    
    if (myUser == "") {
        const search = new URLSearchParams(location.search)
        const type = search.get("type")
        if (type == "no") {
            const home = document.querySelector("#home")
            home.innerText = ""
            hello.innerText = ""
        }
    }
    else if (myUser.typeUser == "drive") {
        const search = new URLSearchParams(location.search)
        const type = search.get("type")
        if (type != "take") {
            createHello()
            timeSet()
        }
    }
    else if (myUser.typeUser == "passenger") {
        createHello()
        timeSet()
    }
}

helloSet()