-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema project_clado
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema project_clado
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `project_clado` DEFAULT CHARACTER SET utf8 ;
USE `project_clado` ;

-- -----------------------------------------------------
-- Table `project_clado`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_clado`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_password` VARCHAR(128) NOT NULL,
  `user_status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `project_clado`.`cladogram`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_clado`.`cladogram` (
  `clado_id` INT NOT NULL AUTO_INCREMENT,
  `clado_name` VARCHAR(34) NOT NULL,
  `clado_userAdmin` INT NOT NULL,
  `clado_directory` VARCHAR(45) NOT NULL,
  `clado_token` VARCHAR(128) NOT NULL,
  `clado_status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`clado_id`),
  UNIQUE INDEX `clado_directory_UNIQUE` (`clado_directory` ASC),
  UNIQUE INDEX `clado_toke_UNIQUE` (`clado_token` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `project_clado`.`user_has_cladogram`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_clado`.`user_has_cladogram` (
  `user_id` INT NOT NULL,
  `clado_id` INT NOT NULL,
  `solicitation` TINYINT(1) NOT NULL,
  PRIMARY KEY (`user_id`, `clado_id`),
  INDEX `fk_user_has_cladogram_cladogram1_idx` (`clado_id` ASC),
  INDEX `fk_user_has_cladogram_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_cladogram_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `project_clado`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_cladogram_cladogram1`
    FOREIGN KEY (`clado_id`)
    REFERENCES `project_clado`.`cladogram` (`clado_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `project_clado`.`actions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_clado`.`actions` (
  `actions_id` INT NOT NULL AUTO_INCREMENT,
  `actions_oldname` VARCHAR(45) NULL,
  `actions_oldcategory` VARCHAR(45) NULL,
  `actions_newname` VARCHAR(45) NULL,
  `actions_newcategory` VARCHAR(45) NULL,
  `actions_auxname` VARCHAR(45) NULL,
  `actions_auxcategory` VARCHAR(45) NULL,
  `actions_type` VARCHAR(15) NOT NULL,
  `actions_creator` INT NOT NULL,
  `actions_datetime` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `clado_id` INT NOT NULL,
  PRIMARY KEY (`actions_id`),
  INDEX `fk_actions_user1_idx` (`user_id` ASC),
  INDEX `fk_actions_cladogram1_idx` (`clado_id` ASC),
  CONSTRAINT `fk_actions_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `project_clado`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_actions_cladogram1`
    FOREIGN KEY (`clado_id`)
    REFERENCES `project_clado`.`cladogram` (`clado_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
