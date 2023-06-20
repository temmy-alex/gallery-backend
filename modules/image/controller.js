const ImageService = require("./service");

class ImageController {
    static async getAll(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                message: "Successful get all image!",
                data: await ImageService.getAll({
                    name: req?.query?.name,
                    category: req?.query?.category
                })
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserImages(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                message: "Successful get all image!",
                data: await ImageService.getUserImages({
                    auth: req.classified,
                })
            });
        } catch (error) {
            next(error);
        }
    }
    

    static async getCategories(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                message: "Successful get all image category!",
                data: await ImageService.getCategory()
            });
        } catch (error) {
            next(error);
        }
    }

    static async getDetail(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                message: "Successful get detail image!",
                data: await ImageService.getDetail({
                    slug: req?.params.slug,
                })
            });
        } catch (error) {
            next(error);
        }
    }

    static async upload(req, res, next) {
        try {
            await ImageService.upload({
                file: req.file,
                auth: req.classified,
                title: req.body.title,
                description: req.body.description,
                category: req.body.category
            })

            res.status(200).json({
                success: true,
                message: "Successful upload image!"
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            await ImageService.update({
                file: req.file,
                auth: req.classified,
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                imageId: req.params.id
            })

            res.status(200).json({
                success: true,
                message: "Successful update image!"
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            await ImageService.delete({
                auth: req.classified,
                imageId: req.params.id
            })

            res.status(200).json({
                success: true,
                message: "Successful delete image!"
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ImageController;