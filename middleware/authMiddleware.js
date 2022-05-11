import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
  let token;
  // Valida las cabeceras de la petición.
  if (
    req.headers.authorization
        && req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Corta el Bearer para mantener únicamente el JWT
      token = req.headers.authorization.split(" ")[1];
      // Verifica si el JWT es válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Al ser un objeto muestra información que puede ser sensible y ocultamos los parámetros que no queremos mostrar.
      req.veterinario = await Veterinario.findById(decoded.id).select(
        "-password -token -confirmado",
      );
      return next();
    } catch (error) {
      const e = new Error("Token no válido");
      return res.status(403).json({ msg: e.message });
    }
  }

  if (!token) {
    const error = new Error("Token no válido o inexistente");
    res.status(403).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
