module.exports = (min, max) => {
    min = parseInt(min);
    max = parseInt(max);
    let no = Math.floor(Math.random() * (max - min + 1) + min);
    return no;
}
