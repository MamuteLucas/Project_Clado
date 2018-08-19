<?php
	class connect{
		var $pdo;

		function __construct(){
			$this->pdo = new PDO("mysql:host=localhost; dbname=project_clado", "root", "");
		}

		public function checkEmail($email){
			$sql = $this->pdo->prepare("SELECT user_email FROM user WHERE user_email = :email");
			$sql->bindValue(":email", $email);
			$sql->execute();

			return $sql->rowCount();
		}

		public function createAccount($name, $email, $password){
			$sql = $this->pdo->prepare("INSERT INTO user(user_name, user_email, user_password) VALUES(:name, :email, :password)");
			$sql->bindValue(":name", $name);
			$sql->bindValue(":email", $email);
			$sql->bindValue(":password", $password);
			$sql->execute();
		}

		public function doLogin($email, $password){
			$sql = $this->pdo->prepare("SELECT user_id, user_name FROM user WHERE user_email = :email and user_password = :password");
			$sql->bindValue(":email", $email);
			$sql->bindValue(":password", $password);
			$sql->execute();

			return array($sql->rowCount(), $sql->fetch(PDO::FETCH_ASSOC));
		}

		public function searchCladograms($id){
			$sql = $this->pdo->prepare("SELECT c.clado_id, c.clado_name, c.clado_userAdmin, c.clado_directory
																		FROM user as u INNER JOIN user_has_cladogram as uc ON u.user_id = uc.user_id
																									 INNER JOIN cladogram as c ON uc.clado_id = c.clado_id
																		WHERE u.user_id = :id");
			$sql->bindValue(":id", $id);
			$sql->execute();

			return $sql->fetchAll(PDO::FETCH_ASSOC);
		}
	}
?>
