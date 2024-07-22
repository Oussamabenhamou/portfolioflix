const { link } = require("fs-extra");
const { BooleanField, ListField, ModelField, NumberField, StringField } = require("../utils/fields");
const { template } = require("lodash");

module.exports = {
    edit: true,
    name: "blogs",
    primary: "title",
    i18n:true,
    draft: true,
    props:{
        image : ModelField({ model:"media", validate: { required: true }}),
        Author: StringField({ validate: { required: true } }),
        date: StringField({type:"date"}),
        title: StringField({ validate: { required: true } }),
        description : StringField({type:"textarea", validate: { required: true }}),
        link: StringField({ validate: { required: true } }),
        
    },
    preview: {
        input: {
            name: "title",
            image: "image",
        },
        table: "image Author date title description link"
    },
    pages: "/blogs",
    domain : "MainDomain",
    template: "blog",
}