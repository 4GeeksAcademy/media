'use strict';
const request = require("request")
const path = require('path');
const extname = path.extname;
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    to_login: async ctx => {
        ctx.redirect('/admin');
    },
    download_document: async ctx => {
        const { slug_or_id } = ctx.params;

        let slugOrId = slug_or_id.replace("-", "_")
        let doc = await strapi.query('document').findOne({ slug: slugOrId });
        if(!doc) doc = await strapi.query('document').findOne({ id: slugOrId });
        
        if(!doc){
            ctx.status = 404;
            return null;
        }

        ctx.type = extname(doc.file.url);
        ctx.body = request(doc.file.url);
    },
    download_syllabus: async ctx => {

        const { academy, course } = ctx.params;
        let _course = course.replace("-", "_");
        let _academy = await strapi.query('academy').findOne({ slug: academy });
        if(!_academy && parseInt(academy)) academy = await strapi.query('academy').findOne({ id: academy });
        
        if(!_academy){
            ctx.throw(404, `Academy ${academy} not found`)
        } 
        
        const doc = _academy.syllabi.find(c => c.course == _course);
        if(!doc){
            ctx.throw(404, `Syllabus for ${academy}, ${_course} not found`)
        } 

        ctx.type = extname(doc.file.url);
        ctx.body = request(doc.file.url);
    }
};
