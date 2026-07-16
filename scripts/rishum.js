const myUser = getUser_now()
const areaErorr = document.querySelector("#areaError")
const form = document.querySelector("form")
const button = document.querySelector("#buttonRegister")
let worng = 0

const rejaxType = {
    phone: /^05\d-?\d{4}-?\d{3}$/,
    email: /^[a-zA-Z0-9\.]{1,}@gmail\.com$/,
    password: /^[0-9a-zA-Z]{5,}$/,
    number_home: /^[0-9]{1,}$/,// /^[0-9a-zA-Z]{5,}$/,
    nameUser: /^[a-zA-Zא-ת ]{2,}$/,
    city: /^[א-ת -]{1,}$/,
    typeUser: /[a-z]{1,}/,
    street: /^[א-ת ]{1,}$/
}
const rejaxMassage = {
    phone: "טלפון לא תקין",
    email: "אימייל לא תקין",
    password: "סיסמה קצרה מדי",
    number_home: "שדה חובה",
    nameUser: "שדה חובה",
    city: "יש לבחור עיר",
    typeUser: "יש לבחור תפקיד",
    street: "שדה חובה"
}
const arrInput = [phone, email, password, number_home, nameUser, city, typeUser, street]
const arrRejaxa = [rejaxphone, rejaxemail, rejaxpassword, rejaxnumber_home, rejaxnameUser, rejaxcity, rejaxtypeUser, rejaxstreet]
arrInput.forEach(input => { input = document.querySelector(`#${input.name}`) })
arrRejaxa.forEach(rejax => rejax = document.querySelector(`#${rejax.name}`))

arrInput.forEach((input, i) => {
    input.onchange = () => {
        if (!(rejaxType[input.name].test(input.value))) {
            arrRejaxa[i].innerText = rejaxMassage[input.name]
            input.classList.add("inputColor")
        }
        else {
            arrRejaxa[i].innerText = ""
            input.classList.remove("inputColor")
        }
    }
})

const errorThisExist = () => {
    if (worng == 1)
        return
    worng = 1
    const newWorng = document.createElement("div");
    const div = document.createElement("div")
    newWorng.innerText = "קיים משתמש זהה במערכת או שאחד הפרטים לא תקינים, לא ניתן להשלים את המשימה"
    newWorng.className = "alert alert-danger"
    div.className = "mt-3 mb-4 p-3"
    areaErorr.append(div)
    areaErorr.append(newWorng)
}

form.onsubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const type = data.typeUser
    const isexist = isExist(data)
    if (isexist || isRejaxFull() || isValueEmpty()) {
        if (isValueEmpty()) {
            arrInput.forEach((input, i) => {
                if (input.value == "") {
                    arrRejaxa[i].innerText = rejaxMassage[input.name]
                    input.classList.add("inputColor")
                }
            })
        }
        errorThisExist()
    }
    else {
        button.innerText = "הנתונים נשמרים במערכת..."
        areaErorr.innerText = ""
        if (type == "drive")
            addDrive(data)
        if (type == "passenger")
            addPassenger(data)
        setUser_now(data)
        arrInput.forEach(input =>
            input.disabled = true)
        setTimeout(() => {
            location.href = "./home.html"
        }, 1500)
    }
}

const eye = document.querySelector("#togglePassword")

eye.onclick = () => {
    if (password.type == "password") {
        password.type = "text"
    }
    else {
        password.type = "password"
    }
}

const isValueEmpty = () => {
    return (phone.value == "" || password.value == "" || email.value == "" || city.value == "" || number_home.value == "" || nameUser.value == "" || street.value == "" || typeUser.value == "")
}

const isRejaxFull = () => {
    return (rejaxtypeUser.innerText != "" || rejaxcity.innerText != "" || rejaxpassword.innerText != "" || rejaxphone.innerText != "" || rejaxemail.innerText != "")
}
