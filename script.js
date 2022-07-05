
function zero_first_format(value) {
    if (value < 10) {
        value = '0' + value;
    }
    return value;
}

function date_time() {
    let current_datetime = new Date();
    let day = zero_first_format(current_datetime.getDate());
    let month = zero_first_format(current_datetime.getMonth() + 1);
    let year = current_datetime.getFullYear();

    let hours = zero_first_format(current_datetime.getHours());
    let minutes = zero_first_format(current_datetime.getMinutes());
    let seconds = zero_first_format(current_datetime.getSeconds());

    return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
}


setInterval(function () {
    document.getElementById('current_date_time_block').innerHTML = date_time();
}, 1000);

window.onload = function () {
    $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function (data) { // Получаем курс валют
        let s1 = data.Valute.USD.Value; // Получаем Доллар
        let s2 = data.Valute.EUR.Value; // Получаем Евро
        let s3 = data.Valute.BYN.Value;
        let s4 = data.Valute.UAH.Value;
        let c = { 'USD': s1, 'EUR': s2, 'RUB': '1', 'BYN': s3, 'UAH': s4 }; // Устанавливаем курс валют

        let val = document.getElementById('val'); // Получаем элемент ввода данных
        let currency1 = document.getElementById('cur1'); // Получаем первый селект
        let currency2 = document.getElementById('cur2'); // Получаем второй селект
        let result = document.getElementsByClassName('output')[0]; // Получаем поле куда будем писать результат
        function summ() { // Делаем функцию
            let z = 0;
            if (currency1.value === currency2.value) { // Если оба значения в селектах равны
                result.innerText = val.value; // То просто вписываем данные из поля ввода
            } else {
                if (currency1.value != 'RUB') { // Если не равны рублю, то
                    z = val.value * c[currency1.value]; // Переводим сумму в рубли
                    result.innerHTML = Math.ceil((z / c[currency2.value]) * 100) / 100; // Делим на курс и округляем до сотых
                } else { // Если не равны
                    result.innerHTML = Math.ceil((val.value * c[currency2.value]) * 100) / 100; // Умножаем на курс и округляем до сотых
                }
            }
        }

        val.oninput = function () { // При вводе данных в поле вызываем функцию.
            summ();
            if (this.value.include('-')) {
                this.value = '0';
            }
        };
        currency1.onchange = function () { // При смене первого селекта вызываем функцию.
            summ();
        };
        currency2.onchange = function () { // При смене второго селекта вызываем функцию.
            summ();
        }
        let USDrate = data.Valute.USD.Value.toFixed(2).replace('.', ',');
        let USD = document.getElementById('USD');
        USD.innerHTML = USD.innerHTML.replace('', USDrate);

        let EURrate = data.Valute.EUR.Value.toFixed(4).replace('.', ',');
        let EUR = document.getElementById('EUR');
        EUR.innerHTML = EUR.innerHTML.replace('', EURrate);

        let BLRrate = data.Valute.BYN.Value.toFixed(4).replace('.', ',');
        let BLR = document.getElementById('BLR');
        BLR.innerHTML = BLR.innerHTML.replace('', BLRrate);

        let UAHrate = data.Valute.UAH.Value.toFixed(4).replace('.', ',');
        let UAH = document.getElementById('UAH');
        UAH.innerHTML = UAH.innerHTML.replace('', UAHrate);
    }

    );
}


