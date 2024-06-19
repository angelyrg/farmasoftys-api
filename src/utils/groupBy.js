/**
 * Función para agrupar elementos por una clave especificada.
 * @param {Array} array - El array a agrupar.
 * @param {string} key - La clave por la cual agrupar.
 * @returns {Object} - Un objeto con los elementos agrupados.
 */

function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
        const groupKey = currentValue[key]
        if (!result[groupKey]) {
            result[groupKey] = []
        }
        result[groupKey].push(currentValue)
        return result
    }, {})
}

module.exports = groupBy
