const mongoose = require('mongoose');


const PatentSchema = mongoose.Schema({
    patentName: { type: String },
    patentType: { type: String },
    patentSubType: { type: String },
    issueDate: { type: String },
    uploadFileName: { type: String },
    owners: [{ type: String }],
    lisenceHolders: [{ type: String }],
    status: { type: String },
    patentId: {type: Number}
});

module.exports = mongoose.model('Patents', PatentSchema, 'patent_collection');