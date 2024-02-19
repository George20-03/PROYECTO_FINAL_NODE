CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255)
);

CREATE TABLE datos_personales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE informacion_contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    telefono VARCHAR(20),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE direccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calle VARCHAR(255),
    ciudad VARCHAR(255),
    codigo_postal VARCHAR(10),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

