const express = require('express');
const app = express();
const port = 3000;

//CLASES

class Cine {
    constructor(id, nombre, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
    }
}

class Sala {
    constructor(id, nombre, cineId) {
        this.id = id;
        this.nombre = nombre;
        this.cineId = cineId;
        this.localidades = [];
    }

    agregarLocalidad(localidad) {
        this.localidades.push(localidad);
    }
}

class Localidad {
    constructor(id, salaId) {
        this.id = id;
        this.salaId = salaId;
        this.filas = [];
    }

    agregarFila(fila) {
        this.filas.push(fila);
    }
}

class Fila {
    constructor(numero) {
        this.numero = numero;
        this.puestos = [];
    }

    agregarPuesto(puesto) {
        this.puestos.push(puesto);
    }
}

class Puesto {
    constructor(numero, disponible = true) {
        this.numero = numero;
        this.disponible = disponible;
    }
}

class Venta {
    constructor(id, funcionId, clienteId, taquilleroId, puesto) {
        this.id = id;
        this.funcionId = funcionId;
        this.clienteId = clienteId;
        this.taquilleroId = taquilleroId;
        this.puesto = puesto;
        this.fecha = new Date();
    }
}

class Funcion {
    constructor(id, peliculaId, salaId, horario) {
        this.id = id;
        this.peliculaId = peliculaId;
        this.salaId = salaId;
        this.horario = horario;
    }
}

class Pelicula {
    constructor(id, titulo, duracion) {
        this.id = id;
        this.titulo = titulo;
        this.duracion = duracion;
    }
}

class Taquillero {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

class Cliente {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

// Datos quemados
const cines = [
    new Cine(1, 'Cinepolis', 'Avenida Siempre Viva 123'),
    new Cine(2, 'CineColombia', 'Centro Comercial Fundadores'),
    new Cine(3, 'CineColombia', 'Centro Comercial Fundadores'),
    new Cine(4, 'CineColombia', 'Centro Comercial Fundadores'),
    new Cine(5, 'CineMark', 'Centro Comercial Cable Plaza'),
    new Cine(6, 'CineMark', 'Centro Comercial Cable Plaza'),
    new Cine(7, 'Cinepolis', 'Avenida Siempre Viva 123'),
    new Cine(8, 'CineColombia', 'Centro Comercial Fundadores'),
    new Cine(9, 'Cinepolis', 'Avenida Siempre Viva 123'),
    new Cine(10, 'CineColombia', 'Centro Comercial Fundadores')
];

const salas = [
    new Sala(1, 'Sala 1', 1),
    new Sala(2, 'Sala 2', 1),
    new Sala(3, 'Sala 1', 1),
    new Sala(4, 'Sala 2', 1),
    new Sala(5, 'Sala 1', 1)

];

const peliculas = [
    new Pelicula(1, 'El Francotirador', 120),
    new Pelicula(2, 'Out Side 2', 80),
    new Pelicula(3, 'Advengers', 130),
    new Pelicula(4, 'En game', 40),
    new Pelicula(5, 'Los Simposons', 40),
    new Pelicula(6, 'El Origen', 90)
];

const taquilleros = [
    new Taquillero(1, 'Taquillero 1'),
    new Taquillero(2, 'Taquillero 2'),
    new Taquillero(3, 'Taquillero 1'),
    new Taquillero(4, 'Taquillero 2'),
    new Taquillero(5, 'Taquillero 1')
];

const clientes = [
    new Cliente(1, 'Cliente 1'),
    new Cliente(2, 'Cliente 2'),
    new Cliente(3, 'Cliente 3'),
    new Cliente(4, 'Cliente 4'),
    new Cliente(5, 'Cliente 5')
];

const funciones = [
    new Funcion(1, 1, 1, '2024-07-11 14:00'),
    new Funcion(2, 2, 2, '2024-07-12 15:00'),
    new Funcion(2, 2, 2, '2024-07-13 16:00'),
    new Funcion(2, 2, 2, '2024-07-14 18:00'),
    new Funcion(2, 2, 2, '2024-07-15 19:00')
];

const ventas = [];

// Estructura de localidades, filas y puestos
salas[0].agregarLocalidad(new Localidad(1, 1));
salas[1].agregarLocalidad(new Localidad(2, 2));

salas[0].localidades[0].agregarFila(new Fila(1));
salas[0].localidades[0].agregarFila(new Fila(2));
salas[1].localidades[0].agregarFila(new Fila(1));
salas[1].localidades[0].agregarFila(new Fila(2));

salas[0].localidades[0].filas[0].agregarPuesto(new Puesto(1));
salas[0].localidades[0].filas[0].agregarPuesto(new Puesto(2));
salas[0].localidades[0].filas[1].agregarPuesto(new Puesto(1));
salas[0].localidades[0].filas[1].agregarPuesto(new Puesto(2));
salas[1].localidades[0].filas[0].agregarPuesto(new Puesto(1));
salas[1].localidades[0].filas[0].agregarPuesto(new Puesto(2));
salas[1].localidades[0].filas[1].agregarPuesto(new Puesto(1));
salas[1].localidades[0].filas[1].agregarPuesto(new Puesto(2));

// Funciones CRUD para cada entidad
// Cines
function getCines() {
    return cines;
}

function getCineById(id) {
    return cines.find(cine => cine.id === id);
}

// Salas
function getSalas() {
    return salas;
}

function getSalaById(id) {
    return salas.find(sala => sala.id === id);
}

// Peliculas
function getPeliculas() {
    return peliculas;
}

function getPeliculaById(id) {
    return peliculas.find(pelicula => pelicula.id === id);
}

// Taquilleros
function getTaquilleros() {
    return taquilleros;
}

function getTaquilleroById(id) {
    return taquilleros.find(taquillero => taquillero.id === id);
}

// Clientes
function getClientes() {
    return clientes;
}

function getClienteById(id) {
    return clientes.find(cliente => cliente.id === id);
}

// Funciones
function getFunciones() {
    return funciones;
}

function getFuncionById(id) {
    return funciones.find(funcion => funcion.id === id);
}

// Ventas
function getVentas() {
    return ventas;
}

function createVenta({ funcionId, clienteId, taquilleroId, salaId, filaNumero, puestoNumero }) {
    const sala = getSalaById(salaId);
    const fila = sala.localidades[0].filas.find(f => f.numero === filaNumero);
    const puesto = fila.puestos.find(p => p.numero === puestoNumero);

    if (!puesto.disponible) {
        return null;
    }

    puesto.disponible = false;

    const venta = new Venta(ventas.length + 1, funcionId, clienteId, taquilleroId, puesto);
    ventas.push(venta);
    return venta;
}

// Endpoints

app.get('/cines', (req, res) => {
    res.json(getCines());
});

app.get('/cines/:id', (req, res) => {
    const cine = getCineById(parseInt(req.params.id));
    if (cine) {
        res.json(cine);
    } else {
        res.status(404).send('Cine no encontrado');
    }
});

app.get('/salas', (req, res) => {
    res.json(getSalas());
});

app.get('/salas/:id', (req, res) => {
    const sala = getSalaById(parseInt(req.params.id));
    if (sala) {
        res.json(sala);
    } else {
        res.status(404).send('Sala no encontrada');
    }
});

app.get('/peliculas', (req, res) => {
    res.json(getPeliculas());
});

app.get('/peliculas/:id', (req, res) => {
    const pelicula = getPeliculaById(parseInt(req.params.id));
    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).send('Pelicula no encontrada');
    }
});

app.get('/taquilleros', (req, res) => {
    res.json(getTaquilleros());
});

app.get('/taquilleros/:id', (req, res) => {
    const taquillero = getTaquilleroById(parseInt(req.params.id));
    if (taquillero) {
        res.json(taquillero);
    } else {
        res.status(404).send('Taquillero no encontrado');
    }
});

app.get('/clientes', (req, res) => {
    res.json(getClientes());
});

app.get('/clientes/:id', (req, res) => {
    const cliente = getClienteById(parseInt(req.params.id));
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

app.get('/funciones', (req, res) => {
    res.json(getFunciones());
});

app.get('/funciones/:id', (req, res) => {
    const funcion = getFuncionById(parseInt(req.params.id));
    if (funcion) {
        res.json(funcion);
    } else {
        res.status(404).send('Funcion no encontrada');
    }
});

app.get('/ventas', (req, res) => {
    res.json(getVentas());
});

app.post('/ventas', (req, res) => {
    const { funcionId, clienteId, taquilleroId, salaId, filaNumero, puestoNumero } = req.body;

    const venta = createVenta({ funcionId, clienteId, taquilleroId, salaId, filaNumero, puestoNumero });

    if (venta) {
        res.status(201).json(venta);
    } else {
        res.status(400).send('No se pudo realizar la venta');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});