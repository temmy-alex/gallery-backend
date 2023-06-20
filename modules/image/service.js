const { Image, ListOfValue } = require('../../models');
const removePhoto = require('../../utils/remove_image');
const { Op } = require('sequelize');

class ImageService {
    static async getAll({
        name,
        category
    }){
        try {
            let query = category ? {
                where: {
                    category
                }
            } : name ? {
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            } : (name && category) ? {
                where: {
                    category,
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            } : null

            let all =  query ? await Image.findAll(query) : await Image.findAll();

            return {
                list: all
            }
        } catch (error) {
            throw({
                error
            })
        }
    }

    static async getUserImages({
        auth
    }){
        try {

            let all = await Image.findAll({
                where: {
                    accountId: auth.userId
                }
            });

            return {
                list: all
            }
        } catch (error) {
            throw({
                error
            })
        }
    }

    

    static async getDetail({
        slug
    }){
        try {

            let data = await Image.findOne({
                where: {
                    slug
                }
            });

            if(!data) throw({
                status: 404,
                message: "Data doesn't exist"
            })

            return {
                detail: data
            }
        } catch (error) {
            throw({
                error
            })
        }
    }

    static async getCategory(){
        try {

            let list = await ListOfValue.findAll({
                where: {
                    name: 'category'
                }
            });

            return {
                list
            }
        } catch (error) {
            throw({
                error
            })
        }
    }

    static async upload({
        auth,
        file,
        title,
        description,
        category
    }) {
        try {
            let newImage = {
                name: title,
                slug: `${file.filename.split('.')[0]}-${title.replace(/ /g, '-')}`,
                path: file.path,
                description,
                accountId: auth.userId,
                category: category.toLowerCase(),
                updatedAt: null
            }

            await Image.create(newImage);
        } catch (error) {
            console.log(error);
            removePhoto(file.path);
            throw({
                error
            })
        }
    }

    static async update({
        auth,
        file,
        title,
        description,
        category,
        imageId
    }) {
        try {
            let exist = await Image.findByPk(Number(imageId));

            if(!exist) throw({
                status: 404,
                message: "File doesn't exist!"
            });

            if(exist.accountId !== auth.userId) throw({
                status: 401,
                message: 'You are not Auhtorized!'
            })

            let updateImage = {
                name: title,
                slug: file ? `${file.filename.split('.')[0]}-${title.replace(/ /g, '-')}` : exist.slug,
                path: file ? file.path : exist.path,
                description,
                category: category.toLowerCase(),
            }

            await Image.update(updateImage, {
                where: {
                    id: imageId
                }
            });

            if(file) removePhoto(exist.path);
        } catch (error) {
            if(file) removePhoto(file.path);
            throw({
                error
            })
        }
    }

    static async delete({
        auth,
        imageId
    }) {
        try {
            let exist = await Image.findByPk(Number(imageId));

            if(!exist) throw({
                status: 404,
                message: "File doesn't exist!"
            });

            if(exist.accountId !== auth.userId) throw({
                status: 401,
                message: 'You are not Auhtorized!'
            })

            await Image.destroy({
                where: {
                    id: imageId
                }
            });

            removePhoto(exist.path);
        } catch (error) {
            throw({
                error
            })
        }
    }
}

module.exports = ImageService;