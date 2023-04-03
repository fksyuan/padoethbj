import Binance from "./binance"

const button = document.querySelector("#button");
button.addEventListener("click", async () => {
    // get the two password inputs
    const apikey = document.querySelector("#password").value;
    const secretKey = document.querySelector("#password2").value;

    // get the result div
    const result = document.querySelector("#result");
    const binance = new Binance ({
        'apiKey': apikey,
        'secretKey': secretKey,
    });
    console.log('binance=', binance);
    const balanceFunding  = await binance.getInfo();
    
    console.log(binance.totalAccountBalance);

    result.innerHTML = binance.totalAccountBalance;
});
