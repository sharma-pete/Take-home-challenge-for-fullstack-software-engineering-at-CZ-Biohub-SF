
function computeFullFiboSequence(num) {

    if( typeof(num) === undefined ) throw "input number is required"
    if( num < 1 ) throw "input number should be positive"

    var fibArraay = [0,1]
    for ( var i = fibArraay.length; i<num; i ++) {
        fibArraay[i] = fibArraay[i -2] + fibArraay[i-1]
    }

    return fibArraay
}

function computePartialFiboSequence(fibArraay, num) {

    if( typeof(num) === undefined ) throw "input number is required"
    if( num < 1 ) throw "input number should be positive"

    for ( var i = fibArraay.length; i<num; i ++) {
        fibArraay[i] = fibArraay[i -2] + fibArraay[i-1]
    }

    return fibArraay
}

function fetchComputedFiboSequence(fibArray, num){

    if( typeof(num) === undefined ) throw "input number is required"
    if( num < 1 ) throw "input number should be positive"

    var smallFibArraay = fibArray.slice(0,num)

    return smallFibArraay
}

module.exports = {
    computeFullFiboSequence,
    computePartialFiboSequence,
    fetchComputedFiboSequence
}