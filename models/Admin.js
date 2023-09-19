const {default: mongoose} = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const AdminSchema = new Schema(
    {
        name: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

AdminSchema.plugin(passportLocalMongoose, {
    usernameField: "username",
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;