module.exports = (str) => {
    if (str instanceof Date) {
        return str.getTime();
    } else {
        return str.now();
    }
}