
class BaseController {

    constructor(model) {
        this.model = model;
    }

    create = async (req, res) => {
        try {
            const data = await this.model.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Falha ao criar '${this.model.name}'` });
        }
    };

    read = async (req, res) => {
        try {
            const data = await this.model.findByPk(req.params.id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Falha ao ler '${this.model.name}'` });
        }
    };

    update = async (req, res) => {
        try {
            const data = await this.model.update(req.body, {where: {id: req.params.id}});
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Falha ao atualizar '${this.model.name}'` });
        }
    };

    delete = async (req, res) => {
        try {
            const data = await this.model.destroy({where: {id: req.params.id}});
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Falha ao remover '${this.model.name}'` });
        }
    };

    list = async (req, res) => {
        try {
            const data = await this.model.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Falha ao listar '${this.model.name}'` });
        }
    };
}
module.exports.BaseController = BaseController;
