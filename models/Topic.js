const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentsSchema = Schema({
    content: String,
    date: {type:date, default: Date.now},
    user: {type:Schema.ObjectId, ref:"Usuario"}
});

var comment = mongoose.model("Coment", CommentsSchema);

var TopicSchema = Schema({
    title: String,
    content: String,
    code: String,
    lang: String,
    date: {type:date, default: Date.now},
    user: {type:Schema.ObjectId, ref:"Ususario"},
    Comments: [CommentsSchema]
})

module.exports = mongoose.model("Topic", TopicSchema);
