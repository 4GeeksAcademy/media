'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        async getUrl(data){
            const docType = await strapi.query('document-type').findOne({ id: data.type });
            if(!data.type || !docType){
                data.public_url = "Error! Missing document type!"
            }
            else if (docType.slug === "syllabus") {
                const academy = await strapi.query('academy').findOne({ id: data.academies.pop() });
                if(academy) data.public_url = `${process.env.HEROKU_URL}/syllabus/${academy.slug}/${data.course}`;
                else data.public_url = "Error! Academy not found!"
            }
            else{
                data.public_url = `${process.env.HEROKU_URL}/document/${data.slug}`
            }
        },
        async beforeCreate(data) {
            await this.getUrl(data)
        },
        async beforeUpdate(params, data) {
            await this.getUrl(data)
        },
      },
};
