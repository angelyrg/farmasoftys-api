const { RETIRO_STATUS_LABELS } = require('../constants/retiro.constant')

function addStatusLabelToRetiro(retiro) {
    return {
        ...retiro.toJSON(),
        status_name: RETIRO_STATUS_LABELS[retiro.status] || 'desconocido',
    }
}

module.exports = { addStatusLabelToRetiro }
