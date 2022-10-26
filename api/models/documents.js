
module.exports = (sequelize, Sequelize) => {

    const Document = sequelize.define("documents",{
        doc_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
            allowNull:true
        },
        user_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true

            },
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true

            },
        },
        date_created: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull: true,
                notEmpty: true

            },
        },
        s3_bucket_path: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true

            },
        }
    });


    return Document;


}