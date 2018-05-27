const COMPLETED = module.exports.COMPLETED = 'COMPLETED';
const DEFINED = module.exports.DEFINED = 'DEFINED';
const IN_PROGRESS = module.exports.IN_PROGRESS = 'IN_PROGRESS';
const ON_HOLD = module.exports.ON_HOLD = 'ON_HOLD';
const PAST_DUE = module.exports.PAST_DUE = 'PAST_DUE';

module.exports.statusSchema = {
    default: DEFINED,
    enum: [
        COMPLETED,
        DEFINED,
        IN_PROGRESS,
        ON_HOLD,
        PAST_DUE
    ],
    type: String
};
