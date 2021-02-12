function binaryInsert(element, array, startVal, endVal) {
    var length = array.length;
    var start = typeof startVal != "undefined" ? startVal : 0;
    var end = typeof endVal != "undefined" ? endVal : length - 1;
    var m = start + Math.floor((end - start) / 2);

    if (Object.keys(element).length === 0 && element.constructor === Object)
        return;

    if (length == 0) {
        array.push(element);
        return;
    }

    if (element.score >= array[end].score) {
        array.splice(end + 1, 0, element);
        return;
    }

    if (element.score <= array[start].score) {
        array.splice(start, 0, element);
        return;
    }

    if (element.score <= array[m].score) {
        binaryInsert(element, array, start, m - 1);
        return;
    }

    if (element.score >= array[m].score) {
        binaryInsert(element, array, m + 1, end);
        return;
    }
}

module.exports = binaryInsert;
