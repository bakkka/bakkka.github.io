
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
        let s1 = data.Valute.USD.Value; 
        let s2 = data.Valute.EUR.Value; 
        let s3 = data.Valute.BYN.Value;
        let s4 = data.Valute.UAH.Value;
        let c = { 'USD': s1, 'EUR': s2, 'BYN': s3, 'UAH': s4, 'RUB': '1' }; // Устанавливаем курс валют
        console.log(s2);
        let val = document.getElementById('val'); // Получаем элемент ввода данных
        let currency1 = document.getElementById('cur1'); 
        let currency2 = document.getElementById('cur2'); 
        let result = document.getElementsByClassName('output')[0]; // Получаем поле куда будем писать результат
        function summ() { 
            let z = 0;
            if (currency1.value === currency2.value) { // Если оба значения в селектах равны
                result.innerText = val.value; 
            } else {
                if (currency1.value != 'RUB') {
                    z = val.value * c[currency1.value]; 
                    console.log(z);
                    result.innerHTML = (((z / c[currency2.value]) * 100) / 100).toFixed(4); 
                } else { // Если не равны
                    result.innerHTML = (((val.value / c[currency2.value]) * 100) / 100).toFixed(4); 
                }
            }
        }

        val.oninput = function () { // При вводе данных в поле вызываем функцию.
            summ();
            // if (this.value.include('-')) {
            //     this.value = '0';
            // }
        };
        currency1.onchange = function () { // При смене первого селекта вызываем функцию.
            summ();
        };
        currency2.onchange = function () { // При смене второго селекта вызываем функцию.
            summ();
        }
        let USDrate = data.Valute.USD.Value.toFixed(4).replace('.', ',');
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



