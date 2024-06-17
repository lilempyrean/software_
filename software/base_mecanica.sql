CREATE DATABASE TallerMecanico;
USE TallerMecanico;

CREATE TABLE Clientes (
    ID INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100),
    Telefono NVARCHAR(50),
    Email NVARCHAR(100)
);

CREATE TABLE Citas (
    ID INT PRIMARY KEY IDENTITY,
    ClienteID INT,
    Fecha DATE,
    Hora TIME,
    Servicio NVARCHAR(100),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ID)
);

CREATE TABLE Autos (
    ID INT PRIMARY KEY IDENTITY,
    ClienteID INT,
    Marca NVARCHAR(50),
    Modelo NVARCHAR(50),
    Año INT,
    Placa NVARCHAR(20),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ID)
);

CREATE TABLE Garantias (
    ID INT PRIMARY KEY IDENTITY,
    CitaID INT,
    Fecha DATE,
    Servicio NVARCHAR(100),
    FOREIGN KEY (CitaID) REFERENCES Citas(ID)
);
