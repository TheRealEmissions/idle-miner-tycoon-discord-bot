module.exports = function(n) {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}