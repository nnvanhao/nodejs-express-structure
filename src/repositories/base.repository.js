class BaseRepository {
    constructor() {
        this.handleValidModelName(this.modelName);
        this.model = this.getModel(this.modelName);
    }

    validateModelName = (modelName) => {
        if (typeof modelName !== 'string' && this.modelName.trim() === '') {
            throw new Error(`modelName ${this.modelName} (string) of is missing`);
        }
    }

    getModel = (modelName) => {
        try {
            return require('../models/')[modelName];
        } catch (error) {
            throw new Error(`Model ${this.modelName} is not found`);
        }
    }

    setDbTransaction = (modelName) => {
        return null;
    }

    findAll = () => {

    }

    findById = () => {

    }

    findByProperty = () => {

    }

    findAllByProperty = () => {

    }

    insert = () => {

    }

    batchInsert = () => {

    }

    update = () => {

    }

    batchUpdate = () => {

    }

    updateByProperty = () => {

    }

    remove = () => {

    }
}

module.exports = BaseRepository;