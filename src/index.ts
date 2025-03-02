import express, { Request, Response, NextFunction } from 'express'


const app = express(); // Crea una instancia de la aplicación Express.
const port = 3000; // Define el puerto en el cual el servidor escuchará.

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola, mundo!'); // Define una ruta GET para la ruta raíz ('/') que envía una respuesta con el mensaje '¡Hola, mundo!'.
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`); // Inicia el servidor y escucha en el puerto especificado. Imprime un mensaje en la consola cuando el servidor está en marcha.
});
