import { getConnection } from "./../database/database";

const getUsuario = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM reporteRegistro WHERE estatus=1");
        console.log(result);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const getReporte = async (req, res) => {
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const result = await connection.query("SELECT * FROM reporteRegistro WHERE idUsuario = "+id);
        console.log(result);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const searchBy = async (req, res) => {
    try {
        const { search } = req.params;
        console.log(search);
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuario  WHERE " +
            " nombre LIKE '%" + search + "%' or" +
            " direccion LIKE '%" + search + "%' or" +
            " correo LIKE '%" + search + "%' " +
            " and estatus = 1");
        console.log(result);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const createUser = async (req, res) => {
    try {
        const { nombre, direccion, telefono, correo, pass } = req.body;
        if (nombre == undefined || direccion == undefined ||
            telefono == undefined || correo == undefined || pass == undefined) {
            res.status(400).json({ message: "Bad request. Porfavor llena todos los campos" });
        }
        const user = { nombre, direccion, telefono, correo, pass }
        const connection = await getConnection();
        await connection.query("INSERT INTO usuario SET ?", user);
        res.send({ message: "ok", status: "200" })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { nombre, direccion, telefono, correo, pass, idUsuario } = req.body;

        if (nombre == undefined || direccion == undefined ||
            telefono == undefined || correo == undefined ) {
            res.status(400).json({ message: "Bad request. Porfavor llena todos los campos" });
        }
        const user = { nombre, direccion, telefono, correo }
        const connection = await getConnection();
        await connection.query("UPDATE usuario SET ? WHERE idUsuario=" + idUsuario, user);
        res.send({ message: "ok", status: "200" })
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { idUsuario } = req.body;
        if (idUsuario == undefined) {
            res.status(400).json({ message: "Bad request" });
        }
        const connection = await getConnection();
        await connection.query("UPDATE usuario SET estatus=0 WHERE idUsuario=" + idUsuario);
        res.send({ message: "ok", status: "200" })
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error.message);
    }
};

const activateUser = async (req, res) => {
    try {
        const { idUsuario } = req.body;
        if (idUsuario == undefined) {
            res.status(400).json({ message: "Bad request" });
        }
        const connection = await getConnection();
        await connection.query("UPDATE usuario SET estatus=1 WHERE idUsuario=" + idUsuario);
        res.json({ message: "ok" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error.message);
    }
};


const loginByEmail = async (req, res) => {
    try {
        const { correo, pass } = req.body;
        if (correo == undefined || pass == undefined) {
            res.status(400).json({ message: "Bad request" });
        }
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuario WHERE correo ='" + correo + "' and pass='" + pass + "'");
        if (result[0]!=undefined) {
            res.send({ message: "ok", status: "200" })
        }else{
            res.send({message:"no", status:"400"})
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error.message);

    }
}


export const methods = {
    getUsuario,
    createUser,
    updateUser,
    deleteUser,
    activateUser,
    searchBy,
    loginByEmail,
    getReporte
};