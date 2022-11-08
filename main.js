const elForm = document.querySelector(".form");
const elList = document.querySelector(".list");
const elBox = document.querySelector(".box-list");
const elTemplate = document.querySelector(".template").content;
const elWeekTemplate = document.querySelector(".week-template").content;
const elMonthTemplate = document.querySelector(".month-template").content;
const elRegion = document.querySelector(".region");
const elday = document.querySelector(".kun");
const elSelect = document.querySelector(".select-region");
const elMonthSelect = document.querySelector(".month-select");
const ElWeekBtn = document.querySelector(".weekly");
const ElMonthBox = document.querySelector(".month-list");
const ElText = document.querySelector(".text");
const ElMonthText = document.querySelector(".texta");
const ElTextMonth = document.querySelector(".month");

// option textini oluvchi funtion
function myNewFunction(sel) {
    elRegion.innerHTML = sel.options[sel.selectedIndex].text;
}

//  hozirgi vaqtni oluvchi funtion
function getDateTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = hour + ':' + minute + ':' + second;
    return dateTime;
}

setInterval(function () {
    currentTime = getDateTime();
    document.getElementById("digital-clock").innerHTML = currentTime;
}, 1000);

// form
elForm.addEventListener("click", (evt) => {
    evt.preventDefault();
    let valueSelect = elSelect.value;
    let val = elMonthSelect.value;
    myNewFunction(elSelect);
    getTimes(valueSelect)
    getMonthTimes(valueSelect, val)

})

// default kunlik taqvimlar
async function getTimes(region = "Toshkent") {
    const clonedTemplate = elTemplate.cloneNode(true);
    const fragment = document.createDocumentFragment();
    try {
        const res = await fetch(`https://islomapi.uz/api/present/day?region=${region}`);
        const data = await res.json();
        elday.innerHTML = data.weekday;
        elList.innerHTML = ""
        clonedTemplate.querySelector(".tong_saharlik_time").textContent = data.times.tong_saharlik;
        clonedTemplate.querySelector(".peshin_time").textContent = data.times.peshin;
        clonedTemplate.querySelector(".asr_time").textContent = data.times.asr;
        clonedTemplate.querySelector(".shom_iftor_time").textContent = data.times.shom_iftor;
        clonedTemplate.querySelector(".hufton_time").textContent = data.times.hufton;

        fragment.appendChild(clonedTemplate)
        elList.appendChild(fragment)

    } catch (error) {
        console.log(error);
    }
}
getTimes()

// weekly taqvimlar
async function getWeekTimes(region = "Toshkent") {
    const fragment = document.createDocumentFragment();

    try {
        const res = await fetch(`https://islomapi.uz/api/present/week?region=${region}`);
        const data = await res.json();
        elBox.innerHTML = "";

        data.forEach(element => {
            const clonedTemplate = elWeekTemplate.cloneNode(true);

            clonedTemplate.querySelector(".weekday").textContent = element.weekday;
            clonedTemplate.querySelector(".weektime").textContent = element.date;
            clonedTemplate.querySelector(".bomdod").textContent = element.times.tong_saharlik;
            clonedTemplate.querySelector(".peshin").textContent = element.times.peshin;
            clonedTemplate.querySelector(".asr").textContent = element.times.asr;
            clonedTemplate.querySelector(".shom").textContent = element.times.shom_iftor;
            clonedTemplate.querySelector(".hufton").textContent = element.times.hufton;
            fragment.appendChild(clonedTemplate)
        });
        elBox.appendChild(fragment)
    } catch (error) {
        console.log(error);
    }
}

ElWeekBtn.addEventListener("click", () => {
    let valueSelect = elSelect.value;
    ElText.classList.add("show")
    getWeekTimes(valueSelect)
})

// month oylik taqvimlar
async function getMonthTimes(region = "Toshkent", value = 1) {
    const fragment = document.createDocumentFragment();

    try {
        const res = await fetch(`https://islomapi.uz/api/monthly?region=${region}&month=${value}`);
        const data = await res.json();
        ElMonthBox.innerHTML = "";

        data.forEach(item => {
            const clonedTemplate = elMonthTemplate.cloneNode(true);

            clonedTemplate.querySelector(".month-dayname").textContent = item.weekday;
            clonedTemplate.querySelector(".month-kun").textContent = item.day;
          
            if (elMonthSelect.value == 1) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Yanvar";
                ElTextMonth.innerHTML = "Yanvar";
            } else if (elMonthSelect.value == 2) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Fevral";
                    ElTextMonth.innerHTML = "Fevral";
            }else if (elMonthSelect.value == 3) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Mart";
                    ElTextMonth.innerHTML = "Mart";
            }else if (elMonthSelect.value == 4) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Aprel";
                    ElTextMonth.innerHTML = "Aprel";
            }else if (elMonthSelect.value == 5) {
                clonedTemplate.querySelector(".month-name").innerHTML = "May";
                    ElTextMonth.innerHTML = "May";
            }else if (elMonthSelect.value == 6) {
                clonedTemplate.querySelector(".month-name").innerHTML ="Iyun";
                    ElTextMonth.innerHTML = "Iyun";
            }else if (elMonthSelect.value == 7) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Iyul";
                    ElTextMonth.innerHTML = "Iyul";
            }else if (elMonthSelect.value == 8) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Avgust";
                    ElTextMonth.innerHTML = "Avgust";
            }else if (elMonthSelect.value == 9) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Sentabr";
                    ElTextMonth.innerHTML = "Sentabr";
            }else if (elMonthSelect.value == 10) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Oktabr";
                    ElTextMonth.innerHTML = "Oktabr";
            }else if (elMonthSelect.value == 11) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Noyabr";
                    ElTextMonth.innerHTML = "Noyabr";
            }else if (elMonthSelect.value == 12) {
                clonedTemplate.querySelector(".month-name").innerHTML = "Dekabr";
                    ElTextMonth.innerHTML = "Dekabr";
            }

            clonedTemplate.querySelector(".m-bomdod").textContent = item.times.tong_saharlik;
            clonedTemplate.querySelector(".m-peshin").textContent = item.times.peshin;
            clonedTemplate.querySelector(".m-asr").textContent = item.times.asr;
            clonedTemplate.querySelector(".m-shom").textContent = item.times.shom_iftor;
            clonedTemplate.querySelector(".m-hufton").textContent = item.times.hufton;
            fragment.appendChild(clonedTemplate)
        });
        ElMonthBox.appendChild(fragment)
        ElMonthText.classList.add("show")
    } catch (error) {
        console.log(error);
    }
}
