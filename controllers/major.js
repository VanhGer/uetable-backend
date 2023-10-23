import { QueryTypes } from "sequelize";
import sequelize from "../database/db.js";


export const getMajorById = async (req, res) => {
    try{
        let id = req.query.id;
        const ans = await sequelize.query(`Select * from Majors where id = ${id}`, {type: QueryTypes.SELECT});
       // sequelize.close();
        res.status(200).json(ans);
    } catch(err){
        res.status(500).json(err.message);
    }
}


export default getMajorById;