const Calculator = (_ => {

    const $clear = document.querySelector("#clear");
    const $formulaScreen = document.querySelector("#formula-screen");
    const $outputScreen = document.querySelector("#output-screen");
    let result;

    const $number = document.querySelector(".number");
    const $body = document.querySelector("body");

    document.getElementById("clickable").addEventListener("click", event => {
        let lastIndex = (($formulaScreen.innerHTML).length)-1;
        let lastCharacter = ($formulaScreen.innerHTML)[lastIndex];

        if (($outputScreen.innerHTML).length < 10) {
            if (event.target.matches(".digit")) {
                console.log(event.target)
                if ($formulaScreen.style.color == "") {
                    $outputScreen.innerHTML = event.target.id;
                    $formulaScreen.innerHTML = $outputScreen.innerHTML;
                    $formulaScreen.style.color = "#D08504";
                } else {
                    if (result) {
                        $outputScreen.innerHTML = event.target.id;
                        $formulaScreen.innerHTML = event.target.id;
                        result = !result;
                    } else if ((!isNaN(lastCharacter) && lastCharacter != 0) || lastCharacter == `.`) {
                        $outputScreen.innerHTML += event.target.id;
                        $formulaScreen.innerHTML += event.target.id;
                    } else if ((lastCharacter == 0) && (($formulaScreen.innerHTML).length == 1)) {
                        $outputScreen.innerHTML = event.target.id;
                        $formulaScreen.innerHTML = event.target.id;
                    } else if ((lastCharacter == 0) && (($formulaScreen.innerHTML).length > 1)) {
                        $outputScreen.innerHTML += event.target.id;
                        $formulaScreen.innerHTML += event.target.id;
                    } else {
                        $outputScreen.innerHTML = event.target.id;
                        $formulaScreen.innerHTML += event.target.id;
                    }
                }
            } else if (event.target.matches(".operator")) {
                $outputScreen.innerHTML = event.target.id;
                if ($formulaScreen.style.color == "") {
                    $formulaScreen.innerHTML = $outputScreen.innerHTML;
                    $formulaScreen.style.color = "#D08504";
                } else {
                    if (result) {
                        console.log(result);
                        $formulaScreen.innerHTML = result;
                        result = !result;
                    }
                    if (!isNaN(lastCharacter)) {
                        $formulaScreen.innerHTML += $outputScreen.innerHTML
                    } else {
                        $formulaScreen.innerHTML = ($formulaScreen.innerHTML).substring(0, lastIndex) + $outputScreen.innerHTML;
                    }
                }
            } else if (event.target.matches("#decimal")) {
                if ($formulaScreen.style.color == "") {
                    $outputScreen.innerHTML += `.`;
                    $formulaScreen.innerHTML += `.`;
                    $formulaScreen.style.color = "#D08504";
                } else {
                    if (($outputScreen.innerHTML).indexOf(`.`) == -1) {
                        if (isNaN(lastCharacter)) {
                            $outputScreen.innerHTML = `0.`;
                            $formulaScreen.innerHTML += `0.`;
                        } else {
                            $outputScreen.innerHTML += `.`;
                            $formulaScreen.innerHTML += `.`;
                        }
                    }
                }
            } else if (event.target.matches("#equals")) {
                const decimalPlaces = num => {
                    var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                    if (!match) { return 0; }
                    return Math.max(
                         0,
                         // Number of digits right of decimal point.
                         (match[1] ? match[1].length : 0)
                         // Adjust for scientific notation.
                         - (match[2] ? +match[2] : 0));
                  }
                let rawResult = eval($formulaScreen.innerHTML);
                result = decimalPlaces(rawResult) > 5 ? rawResult.toFixed(5) : rawResult;
                $formulaScreen.innerHTML += `=${result}`
                $outputScreen.innerHTML = result;
            }
        } else {
            $outputScreen.innerHTML = `LIMIT MET!`;
        }

    })

    $clear.addEventListener("click", _ => {
        $outputScreen.innerHTML = `0`;
        $formulaScreen.innerHTML = `0`;
        $formulaScreen.style.color = ``;
    })

})();


