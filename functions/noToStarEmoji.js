module.exports = function (n) {
    let str = '';
    let x = 1;
    while (x <= n) {
        str = str.concat('⭐');
        x++;
    }
    return str;
}