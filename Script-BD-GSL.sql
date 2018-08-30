-- MySQL Script generated by MySQL Workbench
-- Tue Aug 14 09:26:19 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `gerencialegal_amdc` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `gerencialegal_amdc` DEFAULT CHARACTER SET utf8 ;
USE `gerencialegal_amdc` ;

-- -----------------------------------------------------
-- Table `Dependencia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Dependencia` ;

CREATE TABLE IF NOT EXISTS `Dependencia` (
  `idDependencia` INT NOT NULL AUTO_INCREMENT,
  `nombreDependencia` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`idDependencia`))
ENGINE = InnoDB;

ALTER TABLE `Dependencia` ADD UNIQUE `nombreDependencia_UNIQUE` (`nombreDependencia` ASC);


-- -----------------------------------------------------
-- Table `CargoEmpleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CargoEmpleado` ;

CREATE TABLE IF NOT EXISTS `CargoEmpleado` (
  `idCargoEmpleado` INT NOT NULL AUTO_INCREMENT,
  `nombreCargoEmpleado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCargoEmpleado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Empleado` ;

CREATE TABLE IF NOT EXISTS `Empleado` (
  `numEmpleado` INT NOT NULL,
  `nombreEmpleado` VARCHAR(80) NOT NULL,
  `activo` TINYINT NOT NULL,
  `idCargo` INT NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  PRIMARY KEY (`numEmpleado`),
  CONSTRAINT `Empleado_idCargo_FK`
    FOREIGN KEY (`idCargo`)
    REFERENCES `CargoEmpleado` (`idCargoEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `Empleado` ADD INDEX `Empleado_idCargo_FK_idx` (`idCargo` ASC);


-- -----------------------------------------------------
-- Table `EstadoExpediente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `EstadoExpediente` ;

CREATE TABLE IF NOT EXISTS `EstadoExpediente` (
  `idEstadoExpediente` INT NOT NULL AUTO_INCREMENT,
  `nombreEstadoExpediente` VARCHAR(45) NOT NULL,
  `descripciónEstadoExpediente` VARCHAR(145) NOT NULL,
  PRIMARY KEY (`idEstadoExpediente`))
ENGINE = InnoDB;

ALTER TABLE `EstadoExpediente` ADD UNIQUE `nombreEstadoExpediente_UNIQUE` (`nombreEstadoExpediente` ASC);


-- -----------------------------------------------------
-- Table `TipoDictamen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TipoDictamen` ;

CREATE TABLE IF NOT EXISTS `TipoDictamen` (
  `idTipoDictamen` INT NOT NULL AUTO_INCREMENT,
  `nombreTipoDictamen` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoDictamen`))
ENGINE = InnoDB;

ALTER TABLE `TipoDictamen` ADD UNIQUE `nombreTipoDictamencol_UNIQUE` (`nombreTipoDictamen` ASC);


-- -----------------------------------------------------
-- Table `Dictamen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Dictamen` ;

CREATE TABLE IF NOT EXISTS `Dictamen` (
  `idDictamen` INT NOT NULL AUTO_INCREMENT,
  `numDictamen` VARCHAR(25) NOT NULL,
  `idTipoDictamen` INT NOT NULL,
  PRIMARY KEY (`idDictamen`),
  CONSTRAINT `Dictamen_idTipoDictamen_FK`
    FOREIGN KEY (`idTipoDictamen`)
    REFERENCES `TipoDictamen` (`idTipoDictamen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `Dictamen` ADD INDEX `Dictamen_idTipoDictamen_FK_idx` (`idTipoDictamen` ASC);

ALTER TABLE `Dictamen` ADD UNIQUE `numDictamen_UNIQUE` (`numDictamen` ASC);


-- -----------------------------------------------------
-- Table `FichaEntradaExpediente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FichaEntradaExpediente` ;

CREATE TABLE IF NOT EXISTS `FichaEntradaExpediente` (
  `idFichaEntradaExpediente` INT NOT NULL AUTO_INCREMENT,
  `idProcedencia` INT NOT NULL,
  `interesado` VARCHAR(45) NOT NULL,
  `idAsunto` INT NOT NULL,
  `idEmpleadoReceptor` INT NOT NULL,
  `fechaEntrada` DATETIME NOT NULL,
  `idAbogadoAsignado` INT NULL,
  `fechaAsignacion` DATETIME NULL,
  `fechaDescargo` DATETIME NULL,
  `idDependenciaRemision` INT NULL,
  `fechaRemision` DATETIME NULL,
  `recibidoPor` VARCHAR(45) NULL,
  `idEstadoExpediente` INT NOT NULL,
  `idDictamen` INT NULL,
  PRIMARY KEY (`idFichaEntradaExpediente`),
  CONSTRAINT `FEE_iProcedencia_FK`
    FOREIGN KEY (`idProcedencia`)
    REFERENCES `Dependencia` (`idDependencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEE_idEmpleadoReceptor_FK`
    FOREIGN KEY (`idEmpleadoReceptor`)
    REFERENCES `Empleado` (`numEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEE_idAbogadoAsignado_FK`
    FOREIGN KEY (`idAbogadoAsignado`)
    REFERENCES `Empleado` (`numEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEE_idDependencia_FK`
    FOREIGN KEY (`idDependenciaRemision`)
    REFERENCES `Dependencia` (`idDependencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEE_idEstadoExpediente_FK`
    FOREIGN KEY (`idEstadoExpediente`)
    REFERENCES `EstadoExpediente` (`idEstadoExpediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEE_idDictamen_FK`
    FOREIGN KEY (`idDictamen`)
    REFERENCES `Dictamen` (`idDictamen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `FEE_idAsunto_FK`
    FOREIGN KEY (`idAsunto`)
    REFERENCES `Asunto` (`idAsunto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = cp1256;

ALTER TABLE `FichaEntradaExpediente` ADD INDEX `FEE_iProcedencia_FK_idx` (`idProcedencia` ASC);

ALTER TABLE `FichaEntradaExpediente` ADD INDEX `FEE_idEmpleadoReceptor_FK_idx` (`idEmpleadoReceptor` ASC);

ALTER TABLE `FichaEntradaExpediente` ADD INDEX `FEE_idAbogadoAsignado_FK_idx` (`idAbogadoAsignado` ASC);

ALTER TABLE `FichaEntradaExpediente` ADD INDEX `FEE_idDependencia_FK_idx` (`idDependenciaRemision` ASC);

ALTER TABLE `FichaEntradaExpediente` ADD INDEX `FEE_idEstadoExpediente_FK_idx` (`idEstadoExpediente` ASC);

ALTER TABLE `FichaEntradaExpediente` ADD INDEX `FEE_idDictamen_FK_idx` (`idDictamen` ASC);

ALTER TABLE `FichaEntradaExpediente` ADD UNIQUE `idDictamen_UNIQUE` (`idDictamen` ASC);

ALTER TABLE `FichaEntradaExpediente` ADD INDEX `FEE_idAsunto_FK_idx` (`idAsunto` ASC);


-- -----------------------------------------------------
-- Table `Asunto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Asunto` ;

CREATE TABLE IF NOT EXISTS `Asunto` (
  `idAsunto` INT NOT NULL AUTO_INCREMENT,
  `nombreAsunto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAsunto`))
ENGINE = InnoDB;

ALTER TABLE `Asunto` ADD UNIQUE `nombreTipoExpediente_UNIQUE` (`nombreAsunto` ASC);


-- -----------------------------------------------------
-- Table `Expediente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Expediente` ;

CREATE TABLE IF NOT EXISTS `Expediente` (
  `idExpediente` INT NOT NULL AUTO_INCREMENT,
  `numExpediente` VARCHAR(20) NOT NULL,
  `folios` INT NOT NULL,
  PRIMARY KEY (`idExpediente`))
ENGINE = InnoDB;

ALTER TABLE `Expediente` ADD UNIQUE `numExpediente_UNIQUE` (`numExpediente` ASC);


-- -----------------------------------------------------
-- Table `RevisionExpediente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RevisionExpediente` ;

CREATE TABLE IF NOT EXISTS `RevisionExpediente` (
  `idRevisionExpediente` INT NOT NULL AUTO_INCREMENT,
  `idFichaEntradaExpediente` INT NOT NULL,
  `idDependenciaRemison` INT NOT NULL,
  `fechaRemison` INT NOT NULL,
  `idDependenciaRegreso` INT NULL,
  `fechaRegreso` DATETIME NULL,
  PRIMARY KEY (`idRevisionExpediente`),
  CONSTRAINT `RE_idFichaEntradaExpediente_FK`
    FOREIGN KEY (`idFichaEntradaExpediente`)
    REFERENCES `FichaEntradaExpediente` (`idFichaEntradaExpediente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `RE_idDependenciaRemision_FK`
    FOREIGN KEY (`idDependenciaRemison`)
    REFERENCES `Dependencia` (`idDependencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `RE_idDependenciaRegreso_FK`
    FOREIGN KEY (`idDependenciaRegreso`)
    REFERENCES `Dependencia` (`idDependencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `RevisionExpediente` ADD INDEX `RE_idFichaEntradaExpediente_FK_idx` (`idFichaEntradaExpediente` ASC);

ALTER TABLE `RevisionExpediente` ADD INDEX `RE_idDependenciaRemision_FK_idx` (`idDependenciaRemison` ASC);

ALTER TABLE `RevisionExpediente` ADD INDEX `RE_idDependenciaRegreso_FK_idx` (`idDependenciaRegreso` ASC);


-- -----------------------------------------------------
-- Table `Folder`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Folder` ;

CREATE TABLE IF NOT EXISTS `Folder` (
  `idFolder` INT NOT NULL AUTO_INCREMENT,
  `nombreFolder` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idFolder`))
ENGINE = InnoDB;

ALTER TABLE `Folder` ADD UNIQUE `nombreFolder_UNIQUE` (`nombreFolder` ASC);


-- -----------------------------------------------------
-- Table `Archivo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Archivo` ;

CREATE TABLE IF NOT EXISTS `Archivo` (
  `idDictamen` INT NOT NULL,
  `idFolder` INT NOT NULL,
  PRIMARY KEY (`idDictamen`, `idFolder`),
  CONSTRAINT `Archivo_idDictamen_FK`
    FOREIGN KEY (`idDictamen`)
    REFERENCES `Dictamen` (`idDictamen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Archivo_idFolder_FK`
    FOREIGN KEY (`idFolder`)
    REFERENCES `Folder` (`idFolder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `Archivo` ADD INDEX `Archivo_idFolder_FK_idx` (`idFolder` ASC);

-- -----------------------------------------------------
-- Table `TipoLugar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TipoLugar` ;

CREATE TABLE IF NOT EXISTS `TipoLugar` (
  `idTipoLugar` INT NOT NULL AUTO_INCREMENT,
  `nombreTipoLugar` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`idTipoLugar`))
ENGINE = InnoDB;

ALTER TABLE `TipoLugar` ADD UNIQUE `nombreTipoLugar_UNIQUE` (`nombreTipoLugar` ASC);


-- -----------------------------------------------------
-- Table `FichaEntradaPatronato`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FichaEntradaPatronato` ;

CREATE TABLE IF NOT EXISTS `FichaEntradaPatronato` (
  `idFichaEntradaPatronato` INT NOT NULL AUTO_INCREMENT,
  `idTipoLugar` INT NOT NULL,
  `nombreLugar` VARCHAR(45) NOT NULL,
  `Asunto` VARCHAR(60) NOT NULL,
  `folios` INT NOT NULL,
  `idEmpleadoReceptor` INT NOT NULL,
  `fechaEntrada` DATETIME NOT NULL,
  `idAbogadoAsignado` INT NULL,
  `fechaAsignacion` DATETIME NULL,
  `fechaDescargo` DATETIME NULL,
  `fechaRemision` DATETIME NULL,
  `recibidoPor` VARCHAR(45) NULL,
  `idEstadoPatronato` INT NOT NULL,
  `idDictamen` INT NULL,
  PRIMARY KEY (`idFichaEntradaPatronato`),
  CONSTRAINT `FEP_idTipoLugar_FK`
    FOREIGN KEY (`idTipoLugar`)
    REFERENCES `TipoLugar` (`idTipoLugar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEP_idEmpleadoReceptor_FK`
    FOREIGN KEY (`idEmpleadoReceptor`)
    REFERENCES `Empleado` (`numEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEP_idAbogadoAsignado_FK`
    FOREIGN KEY (`idAbogadoAsignado`)
    REFERENCES `Empleado` (`numEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEP_idDictamen_FK`
    FOREIGN KEY (`idDictamen`)
    REFERENCES `Dictamen` (`idDictamen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  CONSTRAINT `FEP_idEstadoPatronato_FK`
    FOREIGN KEY (`idEstadoPatronato`)
    REFERENCES `EstadoExpediente` (`idEstadoExpediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
ENGINE = InnoDB;

ALTER TABLE `FichaEntradaPatronato` ADD INDEX `FEP_idTipoLugar_FK_idx` (`idTipoLugar` ASC);

ALTER TABLE `FichaEntradaPatronato` ADD INDEX `FEP_idEmpleadoReceptor_FK_idx` (`idEmpleadoReceptor` ASC);

ALTER TABLE `FichaEntradaPatronato` ADD INDEX `FEP_idAbogadoAsignado_FK_idx` (`idAbogadoAsignado` ASC);

ALTER TABLE `FichaEntradaPatronato` ADD INDEX `FEP_idDictamen_FK_idx` (`idDictamen` ASC);

ALTER TABLE `FichaEntradaPatronato` ADD UNIQUE `idDictamen_UNIQUE` (`idDictamen` ASC);

ALTER TABLE `FichaEntradaPatronato` ADD INDEX `FEP_idEstadoPatronato_idx` (`idEstadoPatronato` ASC);


-- -----------------------------------------------------
-- Table `FichaEntradaOpinion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FichaEntradaOpinion` ;

CREATE TABLE IF NOT EXISTS `FichaEntradaOpinion` (
  `idFichaEntradaOpinion` INT NOT NULL AUTO_INCREMENT,
  `idProcedencia` INT NOT NULL,
  `idAsunto` INT NOT NULL,
  `numOficio` VARCHAR(30) NOT NULL,
  `idEmpleadoReceptor` INT NOT NULL,
  `fechaEntrada` DATETIME NOT NULL,
  `idAbogadoAsignado` INT NULL,
  `fechaAsignacion` DATETIME NULL,
  `fechaDescargo` DATETIME NULL,
  `fechaRemision` DATETIME NULL,
  `recibidoPor` VARCHAR(45) NULL,
  `idEstadoOpinion` INT NOT NULL,
  `idDictamen` INT NULL,
  PRIMARY KEY (`idFichaEntradaOpinion`),
  CONSTRAINT `FEO_idProcedencia_FK`
    FOREIGN KEY (`idProcedencia`)
    REFERENCES `Dependencia` (`idDependencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEO_idEmpleadoReceptor_FK`
    FOREIGN KEY (`idEmpleadoReceptor`)
    REFERENCES `Empleado` (`numEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEO_idAbogadoAsignado_FK`
    FOREIGN KEY (`idAbogadoAsignado`)
    REFERENCES `Empleado` (`numEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEO_idEstadoOpinion_FK`
    FOREIGN KEY (`idEstadoOpinion`)
    REFERENCES `EstadoExpediente` (`idEstadoExpediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FEO_idDictamen_FK`
    FOREIGN KEY (`idDictamen`)
    REFERENCES `Dictamen` (`idDictamen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `FEO_idAsunto_FK`
    FOREIGN KEY (`idAsunto`)
    REFERENCES `Asunto` (`idAsunto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `FichaEntradaOpinion` ADD INDEX `FEO_idProcedencia_FK_idx` (`idProcedencia` ASC);

ALTER TABLE `FichaEntradaOpinion` ADD INDEX `FEO_idEmpleadoReceptor_FK_idx` (`idEmpleadoReceptor` ASC);

ALTER TABLE `FichaEntradaOpinion` ADD INDEX `FEO_idAbogadoAsignado_FK_idx` (`idAbogadoAsignado` ASC);

ALTER TABLE `FichaEntradaOpinion` ADD INDEX `FEO_idEstadoOpinion_idx` (`idEstadoOpinion` ASC);

ALTER TABLE `FichaEntradaOpinion` ADD INDEX `FEO_idDictamen_FK_idx` (`idDictamen` ASC);

ALTER TABLE `FichaEntradaOpinion` ADD UNIQUE `idDictamen_UNIQUE` (`idDictamen` ASC);

ALTER TABLE `FichaEntradaOpinion` ADD INDEX `FEO_idAsunto_FK_idx` (`idAsunto` ASC);


-- -----------------------------------------------------
-- Table `FichaEntradaExpedienteXExpediente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FichaEntradaExpedienteXExpediente` ;

CREATE TABLE IF NOT EXISTS `FichaEntradaExpedienteXExpediente` (
  `idFichaEntradaExpediente` INT NOT NULL,
  `idExpediente` INT NOT NULL,
  PRIMARY KEY (`idFichaEntradaExpediente`, `idExpediente`),
  CONSTRAINT `FEEXE_idFichaEntradaExpediente_FK`
    FOREIGN KEY (`idFichaEntradaExpediente`)
    REFERENCES `FichaEntradaExpediente` (`idFichaEntradaExpediente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FEEXE_idExpediente_FK`
    FOREIGN KEY (`idExpediente`)
    REFERENCES `Expediente` (`idExpediente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

ALTER TABLE `FichaEntradaExpedienteXExpediente` ADD INDEX `FEEXE_idExpediente_idx` (`idExpediente` ASC);


-- -----------------------------------------------------
-- Table `PaginaDictamen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PaginaDictamen` ;

CREATE TABLE IF NOT EXISTS `PaginaDictamen` (
  `idPaginaDictamen` INT NOT NULL AUTO_INCREMENT,
  `idDictamen` INT NOT NULL,
  `numeroPagina` INT NOT NULL,
  PRIMARY KEY (`idPaginaDictamen`),
  CONSTRAINT `PaginaDictamen_idDictamen_FK`
    FOREIGN KEY (`idDictamen`)
    REFERENCES `Dictamen` (`idDictamen`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

ALTER TABLE `PaginaDictamen` ADD INDEX `PaginaDictamen_idDictamen_FK_idx` (`idDictamen` ASC);


-- -----------------------------------------------------
-- Table `Privilegio`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Privilegio` ;

CREATE TABLE IF NOT EXISTS `Privilegio` (
  `idPrivilegio` INT NOT NULL AUTO_INCREMENT,
  `nombrePrivilegio` VARCHAR(30) NOT NULL,
  `descripcionPrivilegio` VARCHAR(100) NULL,
  PRIMARY KEY (`idPrivilegio`))
ENGINE = InnoDB;

ALTER TABLE `Privilegio` ADD INDEX `nombrePrivilegio_UNIQUE` (`nombrePrivilegio` ASC);


-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Usuario` ;

CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `numEmpleado` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `Usuario_numEmpleado_FK`
    FOREIGN KEY (`numEmpleado`)
    REFERENCES `Empleado` (`numEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `Usuario` ADD INDEX `Usuariocol_UNIQUE` (`numEmpleado` ASC);


-- -----------------------------------------------------
-- Table `PrivilegioXUsuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PrivilegioXUsuario` ;

CREATE TABLE IF NOT EXISTS `PrivilegioXUsuario` (
  `idPrivilegio` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idPrivilegio`, `idUsuario`),
  CONSTRAINT `PrivilegioXUsuario_idUsuario_FK`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `PrivilegioXUsuario_idPrivilegio`
    FOREIGN KEY (`idPrivilegio`)
    REFERENCES `Privilegio` (`idPrivilegio`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

ALTER TABLE `PrivilegioXUsuario` ADD INDEX `PrivilegioXUsuario_idUsuario_FK_idx` (`idUsuario` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO EstadoExpediente(nombreEstadoExpediente, descripciónEstadoExpediente) VALUES('Recibido', 'Estado correspodiente a un expediente recien llegado sin previo');
INSERT INTO EstadoExpediente(nombreEstadoExpediente, descripciónEstadoExpediente) VALUES('Asignado', 'Estado correspondiente a un expediente que acaba de ser asignado a un abogado o que acaba de llegar con previo');
INSERT INTO EstadoExpediente(nombreEstadoExpediente, descripciónEstadoExpediente) VALUES('Descargado', 'Estado correspondiente a un expediente que acaba de ser entregado por un abogado al gerente para su revisión');
INSERT INTO EstadoExpediente(nombreEstadoExpediente, descripciónEstadoExpediente) VALUES('Revisado', 'Estado de un expediente en el cual está siendo revisado por el gerente para realizarse las correcciones necesarias');
INSERT INTO EstadoExpediente(nombreEstadoExpediente, descripciónEstadoExpediente) VALUES('Remitido', 'Estado correspondiente a un expediente que ha sido revisado y acaba de ser remitido a una dependencia');
INSERT INTO EstadoExpediente(nombreEstadoExpediente, descripciónEstadoExpediente) VALUES('Providencia', 'Estado de un expediente que necesita más contexto para ser trabajado y ha sido regresado a la dependencia de donde procede para aclarar dudas');


INSERT INTO TipoDictamen(nombreTipoDictamen) VALUES('De Expediente');
INSERT INTO TipoDictamen(nombreTipoDictamen) VALUES('De Opinión');
INSERT INTO TipoDictamen(nombreTipoDictamen) VALUES('De Patronato');


INSERT INTO Dependencia(nombreDependencia) VALUES('Secretaría Municipal');
INSERT INTO Dependencia(nombreDependencia) VALUES('Comisión de Finanzas');
INSERT INTO Dependencia(nombreDependencia) VALUES('Comisión de Tierras');
INSERT INTO Dependencia(nombreDependencia) VALUES('Catastro');
INSERT INTO Dependencia(nombreDependencia) VALUES('Departamento Municipalde Justicia');
INSERT INTO Dependencia(nombreDependencia) VALUES('Recaudación y control Financiero');
INSERT INTO Dependencia(nombreDependencia) VALUES('Licitaciones, control y Seguimiento');
INSERT INTO Dependencia(nombreDependencia) VALUES('D.O.T. Ordenamiento Territorial');
INSERT INTO Dependencia(nombreDependencia) VALUES('Recursos Humanos');
INSERT INTO Dependencia(nombreDependencia) VALUES('Comisión de Patronatos');
INSERT INTO Dependencia(nombreDependencia) VALUES('Impugnaciones y Reclamos');
INSERT INTO Dependencia(nombreDependencia) VALUES('UGASAN');
INSERT INTO Dependencia(nombreDependencia) VALUES('UNGIR');
INSERT INTO Dependencia(nombreDependencia) VALUES('Despacho Municipal');
INSERT INTO Dependencia(nombreDependencia) VALUES('Transparencia Municipal');
INSERT INTO Dependencia(nombreDependencia) VALUES('Desechos Sólidos');
INSERT INTO Dependencia(nombreDependencia) VALUES('Trans 450');
INSERT INTO Dependencia(nombreDependencia) VALUES('Dirección de Gestión Comunitaria');
INSERT INTO Dependencia(nombreDependencia) VALUES('Pisos dignos (Convivienda)');
INSERT INTO Dependencia(nombreDependencia) VALUES('Acceso a la Tierra');
INSERT INTO Dependencia(nombreDependencia) VALUES('Movilidad Urbana');


INSERT INTO Asunto(nombreAsunto) VALUES('Nota de Credito');
INSERT INTO Asunto(nombreAsunto) VALUES('Compensación');
INSERT INTO Asunto(nombreAsunto) VALUES('Exoneración');
INSERT INTO Asunto(nombreAsunto) VALUES('Prescripción');
INSERT INTO Asunto(nombreAsunto) VALUES('Dominio Pleno');
INSERT INTO Asunto(nombreAsunto) VALUES('Impugnación');
INSERT INTO Asunto(nombreAsunto) VALUES('Denuncia');
INSERT INTO Asunto(nombreAsunto) VALUES('Reclamo');
INSERT INTO Asunto(nombreAsunto) VALUES('Suspensión');
INSERT INTO Asunto(nombreAsunto) VALUES('Donación');
INSERT INTO Asunto(nombreAsunto) VALUES('Recurso de Apelación');
INSERT INTO Asunto(nombreAsunto) VALUES('Recurso de Reposión');


INSERT INTO TipoLugar(nombreTipoLugar) VALUES('Aldea');
INSERT INTO TipoLugar(nombreTipoLugar) VALUES('Colonia');
INSERT INTO TipoLugar(nombreTipoLugar) VALUES('Barrio');
INSERT INTO TipoLugar(nombreTipoLugar) VALUES('Caserío');


INSERT INTO Privilegio(nombrePrivilegio, descripcionPrivilegio) VALUES('Visualizar', 'Derecho a usar la opción de busqueda y visualizar los registros');
INSERT INTO Privilegio(nombrePrivilegio, descripcionPrivilegio) VALUES('Crear', 'Permiso para crear las diferentes fichas de entreada y seguimiento');
INSERT INTO Privilegio(nombrePrivilegio, descripcionPrivilegio) VALUES('Modificar', 'Permiso para modificar las diferentes fichas guardadas en el sistema');
INSERT INTO Privilegio(nombrePrivilegio, descripcionPrivilegio) VALUES('Archivar', 'Derecho a utilizar la opción de archivar');
INSERT INTO Privilegio(nombrePrivilegio, descripcionPrivilegio) VALUES('Administrar', 'Derecho a utilizar todas las funciones del sitema');


INSERT INTO CargoEmpleado(nombreCargoEmpleado) VALUES('Abogada(o)');
INSERT INTO CargoEmpleado(nombreCargoEmpleado) VALUES('Auxilar de Archivos');
INSERT INTO CargoEmpleado(nombreCargoEmpleado) VALUES('Secretaria(o)');
INSERT INTO CargoEmpleado(nombreCargoEmpleado) VALUES('Gerente');
INSERT INTO CargoEmpleado(nombreCargoEmpleado) VALUES('Sub-Gerente');


INSERT INTO Empleado(numEmpleado, nombresEmpleado, apellidosEmpleado, activo, idCargo, fechaNacimiento) VALUES(24359, 'Ada', 'Puerto', true, 1, STR_TO_DATE('1-01-2012', '%d-%m-%Y') );
INSERT INTO Empleado(numEmpleado, nombresEmpleado, apellidosEmpleado, activo, idCargo, fechaNacimiento) VALUES(31556, 'Carolina', 'Arambu', true, 1, STR_TO_DATE('1-01-2012', '%d-%m-%Y') );
INSERT INTO Empleado(numEmpleado, nombresEmpleado, apellidosEmpleado, activo, idCargo, fechaNacimiento) VALUES(13207, 'Alba', 'Granados', true, 1, STR_TO_DATE('1-01-2012', '%d-%m-%Y') );
INSERT INTO Empleado(numEmpleado, nombresEmpleado, apellidosEmpleado, activo, idCargo, fechaNacimiento) VALUES(15355, 'Karla', 'Mairena', true, 1, STR_TO_DATE('1-01-2012', '%d-%m-%Y') );
INSERT INTO Empleado(numEmpleado, nombresEmpleado, apellidosEmpleado, activo, idCargo, fechaNacimiento) VALUES(20061, 'Elsa', 'López', true, 3, STR_TO_DATE('1-01-2012', '%d-%m-%Y') );
INSERT INTO Empleado(numEmpleado, nombresEmpleado, apellidosEmpleado, activo, idCargo, fechaNacimiento) VALUES(11643, 'Marielos', 'Sanchez', true, 3, STR_TO_DATE('1-01-2012', '%d-%m-%Y') );
INSERT INTO Empleado(numEmpleado, nombresEmpleado, apellidosEmpleado, activo, idCargo, fechaNacimiento) VALUES(22760, 'Mirian', 'Rivera', true, 2, STR_TO_DATE('1-01-2012', '%d-%m-%Y') );

/*ALTER TABLE `empleado` CHANGE `nombresEmpleado` `nombreEmpleado` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `fichaentradaexpediente` CHANGE `fechaAsignación` `fechaAsignacion` DATETIME NULL DEFAULT NULL;*/
/*STR_TO_DATE("22/8/2018 14:43:26", "%M/%d/%Y %H:%i:%s");*/


/*
SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente, Expediente.folios, Procedencia.nombreDependencia as nombreProcedencia, fichaexp.interesado, asunto.nombreAsunto, empleadoReceptor.nombreEmpleado as nombreEmpleadoReceptor, fichaexp.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, fichaexp.fechaAsignacion, fichaexp.fechaDescargo, fichaexp.recibidoPor, EstadoExpediente.nombreEstadoExpediente, Dictamen.numDictamen 
FROM fichaentradaexpediente as fichaexp 
  LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp 
    ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente
    LEFT JOIN Expediente
    ON Expediente.idExpediente = fichaxexp.idExpediente
    LEFT JOIN Dependencia as Procedencia
        ON Procedencia.idDependencia = fichaexp.idProcedencia
  LEFT JOIN Asunto 
        ON Asunto.idAsunto = fichaexp.idAsunto
  LEFT JOIN Empleado as empleadoReceptor
        ON empleadoReceptor.numEmpleado = fichaexp.idEmpleadoReceptor
  LEFT JOIN empleado as abogado 
        ON abogado.numEmpleado = fichaexp.idAbogadoAsignado
    LEFT JOIN EstadoExpediente 
        ON EstadoExpediente.idEstadoExpediente = fichaexp.idEstadoExpediente
  LEFT JOIN Dictamen 
        ON Dictamen.idDictamen = fichaexp.idDictamen
        
UNION

SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente, Expediente.folios, Procedencia.nombreDependencia as nombreProcedencia, fichaexp.interesado, asunto.nombreAsunto, empleadoReceptor.nombreEmpleado as nombreEmpleadoReceptor, fichaexp.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, fichaexp.fechaAsignacion, fichaexp.fechaDescargo, fichaexp.recibidoPor, EstadoExpediente.nombreEstadoExpediente, Dictamen.numDictamen 
FROM fichaentradaexpediente as fichaexp 
  RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp 
    ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente
    RIGHT JOIN Expediente
    ON Expediente.idExpediente = fichaxexp.idExpediente
    RIGHT JOIN Dependencia as Procedencia
        ON Procedencia.idDependencia = fichaexp.idProcedencia
  RIGHT JOIN Asunto 
        ON Asunto.idAsunto = fichaexp.idAsunto
  RIGHT JOIN Empleado as empleadoReceptor
        ON empleadoReceptor.numEmpleado = fichaexp.idEmpleadoReceptor
  RIGHT JOIN empleado as abogado 
        ON abogado.numEmpleado = fichaexp.idAbogadoAsignado
    RIGHT JOIN EstadoExpediente 
        ON EstadoExpediente.idEstadoExpediente = fichaexp.idEstadoExpediente
  RIGHT JOIN Dictamen 
        ON Dictamen.idDictamen = fichaexp.idDictamen
    
GROUP BY fichaxexp.idFichaEntradaExpediente

*/

/*
SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente, Procedencia.nombreDependencia as nombreProcedencia, asunto.nombreAsunto, fichaexp.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, fichaexp.idEstadoExpediente
FROM fichaentradaexpediente as fichaexp 
  LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp 
    ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente
    LEFT JOIN Expediente
    ON Expediente.idExpediente = fichaxexp.idExpediente
    LEFT JOIN Dependencia as Procedencia
        ON Procedencia.idDependencia = fichaexp.idProcedencia
  LEFT JOIN Asunto 
        ON Asunto.idAsunto = fichaexp.idAsunto
  LEFT JOIN empleado as abogado 
        ON abogado.numEmpleado = fichaexp.idAbogadoAsignado
WHERE fichaexp.idEstadoExpediente = 1        
UNION
SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente, Procedencia.nombreDependencia as nombreProcedencia, asunto.nombreAsunto, fichaexp.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, fichaexp.idEstadoExpediente
FROM fichaentradaexpediente as fichaexp 
  RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp 
    ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente
    RIGHT JOIN Expediente
    ON Expediente.idExpediente = fichaxexp.idExpediente
    RIGHT JOIN Dependencia as Procedencia
        ON Procedencia.idDependencia = fichaexp.idProcedencia
  RIGHT JOIN Asunto 
        ON Asunto.idAsunto = fichaexp.idAsunto
  RIGHT JOIN empleado as abogado 
        ON abogado.numEmpleado = fichaexp.idAbogadoAsignado
WHERE fichaexp.idEstadoExpediente = 1
*/

