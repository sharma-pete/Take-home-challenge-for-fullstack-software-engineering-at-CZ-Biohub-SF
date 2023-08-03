
function computeFullFiboSequence(num) {

    if( typeof(num) === undefined ) throw "input number is required"
    if( num < 1 ) throw "input number should be positive"

    var fibArray = [0,1]
    for ( var i = fibArray.length; i<num; i ++) {
        fibArray[i] = fibArray[i -2] + fibArray[i-1]
    }

    return fibArray
}

function computePartialFiboSequence(fibArray, num) {

    if( typeof(num) === undefined ) throw "input number is required"
    if( num < 1 ) throw "input number should be positive"

    var useArray = []
    for ( var i =0; i < fibArray.length; i++) {
        useArray.push(parseInt(fibArray[i]))
    }

    for ( var i = useArray.length; i<num; i ++) {
        useArray[i] = useArray[i -2] + useArray[i-1]
    }

    return useArray
}

function fetchComputedFiboSequence(fibArray, num){

    var useArray = []
    for ( var i =0; i < fibArray.length; i++) {
        useArray.push(parseInt(fibArray[i]))
    }

    if( typeof(num) === undefined ) throw "input number is required"
    if( num < 1 ) throw "input number should be positive"

    var smallFibArray = useArray.slice(0,num)

    return smallFibArray
}

module.exports = {
    computeFullFiboSequence,
    computePartialFiboSequence,
    fetchComputedFiboSequence
}