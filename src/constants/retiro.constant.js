const RETIRO_STATUS = {
    PENDIENTE: 0,
    PAGADO: 1,
    RECHAZADO: 2,
    CANCELADO: 3,
}

const RETIRO_STATUS_LABELS = {
    [RETIRO_STATUS.PENDIENTE]: 'pendiente',
    [RETIRO_STATUS.PAGADO]: 'pagado',
    [RETIRO_STATUS.RECHAZADO]: 'rechazado',
    [RETIRO_STATUS.CANCELADO]: 'cancelado',
}

module.exports = {
    RETIRO_STATUS,
    RETIRO_STATUS_LABELS,
}
