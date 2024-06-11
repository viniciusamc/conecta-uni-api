const tx = require('../database.js');
const logger = require('pino')();
const DiskStorage = require('../../utils/DiskStorage.js')

class university {
        async insert(user, university, mec, picture) {
                if (!university || !mec || !user) {
                        return 'Todos os Campos são necessarios';
                }

                const diskStorage = new DiskStorage()
                const imageURL = await diskStorage.saveFile(picture)

                const query =
                        'INSERT INTO university(fk_id_user, university, score_mec) VALUES ($1, $2, $3) RETURNING id';
                const queryImages = 'INSERT INTO image_university(fk_id_university, image) VALUES($1, $2)'

                let insert;
                try {
                        insert = await tx(query, [user, university, mec]);
                        await tx(queryImages, [insert.rows[0].id, imageURL])
                } catch (err) {
                        console.error(err.message);
                }


                return insert.rows[0].id;
        }

        async getById(id) {
                if (!id) {
                        return 'ID é obrigatório';
                }

                const query = 'SELECT * FROM university WHERE fk_id_user = $1';

                let insert;
                try {
                        insert = await tx(query, [id]);
                } catch (error) {
                        logger.error(error.message);
                }

                return insert.rows;
        }

        async getAll() {
                const query = 'SELECT * FROM university LEFT JOIN image_university ON university.id = image_university.fk_id_university';

                const universities = await tx(query)

                return universities.rows
        }

        async getByName(university) {
                const query = 'SELECT * FROM university LEFT JOIN image_university ON university.id = image_university.fk_id_university LEFT JOIN projects ON university.id = projects.fk_id_university WHERE university.id = $1'
                const queryImage = 'SELECT * FROM image_university WHERE fk_id_university = $1'
                const queryImageProject = 'SELECT * FROM image_project WHERE fk_id_university = $1'

                const projects = await tx(query, [university])
                const image = await tx(queryImage, [university])
                const imageProject = await tx(queryImageProject, [university])

                const result = {
                        projects: projects.rows,
                        image: image.rows[0],
                        imageProject: imageProject.rows
                }

                return result
        }
}

module.exports = new university();
