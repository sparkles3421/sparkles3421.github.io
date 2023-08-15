var mathequasion = ""
var number = 0
function calculateHardest(target, firs) {
    number = target
    if (firs) {
        if (target % 1 == 0) {
            var host = ""
            local = target
            var e = 0
            for (e; e < target.toString().length; e++) {
                local = local / 10
                console.log(local)
            }
            console.log(e >= target.toString().length)
            console.log(target.toString().length)
            host = local
            host = math.ceil(host) + "*10^" + target.toString().length + "-7"
            mathequasion = host
            console.log(mathequasion)
            console.log(mathequasion.replace("^", "**"))
            number = eval(mathequasion.replace("^", "**"))
        }

    }
    console.log(number)

    var index = 0

    while (number != target) {
        number = eval(mathequasion.replace("^", "**"))
        index++
        if (target < number) {

            if (Math.round(Math.random()) == 1) {
                if (Math.round(Math.random())  > 1) {
                    const numb = Math.floor(Math.random() * 100000)
                    mathequasion = mathequasion + "+" + numb.toString()
                    number = number + numb
                } else {
                    const numb = Math.floor(Math.random() * target) + 50
                    console.log(numb)
                    mathequasion = mathequasion + "%" + numb.toString()
                    number = number - numb
                }
            } else {
                if (Math.round(Math.random()) == 1) {
                    const numb = Math.round(Math.random() - 0.005)
                    console.log(numb)
                    mathequasion = mathequasion + "*" + numb.toString()
                    number = number - numb
                } else {
                    /*
                    const numb = Math.floor(Math.random() * 6) + 1
                    console.log(numb)
                    mathequasion = mathequasion + "/" + numb.toString()
                    number = number - numb*/
                }
            }
        } else if (target > number) {
            if (Math.round(Math.random()) == 1) {
                const numb = Math.floor(Math.random() * 100000)
                console.log(numb)
                mathequasion = mathequasion + "-" + numb.toString()
                number = number - numb
            } else {
                const numb = Math.floor(Math.random() * 6) + 1
                console.log(numb)
                mathequasion = mathequasion + "*" + numb.toString()
                number = number - numb
            }
        }
        number = eval(mathequasion.replace("^", "**"))
        if (Math.round(number) != number) {
            console.log("ERROR: Number became decimal")
            break
        }
        if (index >= 488) {
            console.log("ERROR: too many chars")
            break
        }
    }
    number = eval(mathequasion.replace("^", "**"))
    console.log("EVAL:" + eval(mathequasion.replace("^", "**")))
    console.log(mathequasion)
    console.log("Validating")
    if (number != target) {
        console.log("Number is incorrect")
        if (target - number > 0) {
            mathequasion = mathequasion + "+" + (Math.abs(number))
        } else {
            mathequasion = mathequasion + "-" + (number)
        }
        var timeout = 0
        while (target != number) {
            timeout++
            if(timeout>100) {
                break
            }
            if (number < target) {
                mathequasion = mathequasion + "+" + Math.ceil(Math.random() * 15)
                number = eval(mathequasion.replace("^", "**"))
            } else {
                mathequasion = mathequasion + "-" + Math.ceil(Math.random() * 15)
                number = eval(mathequasion.replace("^", "**"))
            }
            if(Math.abs(target-number) < 20) {
                var stepd = target-number
                if(stepd>0) {
                    mathequasion = mathequasion + "+" + stepd
                }
                if(stepd<0) {
                    mathequasion = mathequasion + "-" + Math.abs(stepd)
                }
            }
        }
    }
    console.log(mathequasion)
    number = eval(mathequasion.replace("^", "**"))
    console.log("Validating")
    if (number != target) {
        console.log("Number is incorrect")
        if (target - number > 0) {
            mathequasion = mathequasion + "+" + (Math.abs(number))
        } else {
            mathequasion = mathequasion + "-" + (number)
        }
        mathequasion = mathequasion + "+" + (target)
    }
    var e = 0
    console.log(mathequasion)
    return mathequasion
}

function butt() {
    const button = document.getElementById("butt")
    const val = document.getElementById("text")
    const out = document.getElementById("output")
    out.innerHTML = calculateHardest(val.value,true)
}
function upd() {
    const val = document.getElementById("text")
    const te = document.getElementById("CVAL")
    if(val&&te){
        te.innerHTML = val.value
    }
}
setInterval(upd,50)
