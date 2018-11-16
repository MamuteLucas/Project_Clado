<?php
	class connect{
		var $pdo;

		function __construct(){
			$this->pdo = new PDO("mysql:host=localhost; dbname=project_clado", "root", "");
		}

		public function checkEmail($email){
			$sql = $this->pdo->prepare("SELECT user_email FROM user 
											WHERE user_email = :email AND user_status = 1");
			$sql->bindValue(":email", $email);
			$sql->execute();

			return $sql->rowCount();
		}

		public function checkPassword($id, $password){
			$sql = $this->pdo->prepare("SELECT user_password FROM user 
											WHERE user_id = :id AND user_password = :password
												AND user_status = 1");
			$sql->bindValue(":id", $id);
			$sql->bindValue(":password", $password);
			$sql->execute();

			return $sql->rowCount();
		}

		public function createAccount($name, $email, $password){
			$sql = $this->pdo->prepare("INSERT INTO user(user_name, user_email, user_password, user_status) 
											VALUES(:name, :email, :password, 1)");
			$sql->bindValue(":name", $name);
			$sql->bindValue(":email", $email);
			$sql->bindValue(":password", $password);
			$sql->execute();
		}

		public function doLogin($email, $password){
			$sql = $this->pdo->prepare("SELECT user_id, user_name, user_email FROM user
											WHERE user_email = :email AND user_password = :password
												AND user_status = 1");
			$sql->bindValue(":email", $email);
			$sql->bindValue(":password", $password);
			$sql->execute();

			return array($sql->rowCount(), $sql->fetch(PDO::FETCH_ASSOC));
		}

		public function searchCladograms($id){
			$sql = $this->pdo->prepare("SELECT c.clado_id, c.clado_name, c.clado_userAdmin, c.clado_directory
											FROM user as u 
												INNER JOIN user_has_cladogram as uc ON u.user_id = uc.user_id
												INNER JOIN cladogram as c ON uc.clado_id = c.clado_id
											WHERE u.user_id = :id AND uc.solicitation != 10 AND uc.solicitation != 5
												AND u.user_status = 1 AND c.clado_status = 1");
			$sql->bindValue(":id", $id);
			$sql->execute();

			return $sql->fetchAll(PDO::FETCH_ASSOC);
		}

		public function checkCladogram($user_id, $clado_id){
			$sql = $this->pdo->prepare("SELECT u.user_id, c.clado_id
											FROM user as u 
												INNER JOIN user_has_cladogram as uc ON u.user_id = uc.user_id
												INNER JOIN cladogram as c ON uc.clado_id = c.clado_id
											WHERE u.user_id = :user_id AND c.clado_id = :clado_id
												AND u.user_status = 1 AND c.clado_status = 1
												AND uc.solicitation != 10 AND solicitation != 5");
			$sql->bindValue(":user_id", $user_id);
			$sql->bindValue(":clado_id", $clado_id);
			$sql->execute();

			return $sql->rowCount();
		}

		public function selectCladogram($id){
			$sql = $this->pdo->prepare("SELECT clado_name, clado_directory 
											FROM cladogram WHERE clado_id = :id AND clado_status = 1");
			$sql->bindValue(":id", $id);
			$sql->execute();

			return $sql->fetch(PDO::FETCH_ASSOC);
		}

		public function saveAccount_nameEmail($id, $name, $email){
			$sql = $this->pdo->prepare("UPDATE user SET user_name = :name, user_email = :email 
											WHERE user_id = :id AND user_status = 1");
			$sql->bindValue(":id", $id);
			$sql->bindValue(":name", $name);
			$sql->bindValue(":email", $email);
			$sql->execute();

		}

		public function saveAccount_password($id, $password){
			$sql = $this->pdo->prepare("UPDATE user SET user_password = :password 
											WHERE user_id = :id AND user_status = 1");
			$sql->bindValue(":id", $id);
			$sql->bindValue(":password", $password);
			$sql->execute();

		}

		public function createNewCladogram($clado_name, $user_id){
			$clado_directory = $user_id."_".$clado_name;

			$sql = $this->pdo->prepare("SELECT clado_directory, clado_status FROM cladogram 
											WHERE clado_directory = :clado_directory");
			$sql->bindValue(":clado_directory", $clado_directory);
			$sql->execute();

			$nRows = $sql->rowCount();
			$result_cladogram = $sql->fetch(PDO::FETCH_ASSOC);

			if($nRows == 0){
				$sql = $this->pdo->prepare("SELECT AUTO_INCREMENT 
												FROM information_schema.tables
												WHERE table_name = 'cladogram' AND table_schema = 'project_clado'");
				$sql->execute();

				$clado_id = $sql->fetch(PDO::FETCH_ASSOC);
				$clado_id = $clado_id["AUTO_INCREMENT"];

				$clado_token = hash("sha512", $clado_directory);

				$sql = $this->pdo->prepare("INSERT INTO cladogram(clado_name, clado_userAdmin, clado_directory, clado_token, clado_status)
												VALUES(:clado_name, :clado_userAdmin, :clado_directory, :clado_token, 1)");
				$sql->bindValue(":clado_name", $clado_name);
				$sql->bindValue(":clado_userAdmin", $user_id);
				$sql->bindValue(":clado_directory", $clado_directory);
				$sql->bindValue(":clado_token", $clado_token);

				$insert_cladogram = $sql->execute();

				if(!$insert_cladogram){
					die("Falha ao inserir cladogram");
				}

				$sql = $this->pdo->prepare("INSERT INTO user_has_cladogram(user_id, clado_id, solicitation) 
												VALUES(:user_id, :clado_id, 0)");
				$sql->bindValue(":user_id", $user_id);
				$sql->bindValue(":clado_id", $clado_id);

				$insert_userHasCladogram = $sql->execute();

				if(!$insert_userHasCladogram){
					$sql->rollBack();
					die("Falha ao inserir user_has_cladogram");
				}

				return $clado_directory;

			} else{
				if($result_cladogram["clado_status"] == 1){
					return "CHAVE DUPLICADA";

				} else if($result_cladogram["clado_status"] == 0){
					$sql = $this->pdo->prepare("UPDATE cladogram SET clado_status = 1 
													WHERE clado_directory = :clado_directory");
					$sql->bindValue(":clado_directory", $clado_directory);

					$sql->execute();

					return $clado_directory;
				}
				
			}

		}

		public function addCladogram($user_id, $token){
			$sql = $this->pdo->prepare("SELECT clado_id FROM cladogram
											WHERE clado_token = :clado_token AND clado_status = 1");
			$sql->bindValue(":clado_token", $token);

			$sql->execute();

			$cladogram = $sql->fetch(PDO::FETCH_ASSOC);
			$clado_id = $cladogram["clado_id"];

			if($cladogram["clado_id"] != ""){
				$sql = $this->pdo->prepare("SELECT * FROM user_has_cladogram 
													WHERE user_id = :user_id AND clado_id = :clado_id");
				$sql->bindValue(":user_id", $user_id);
				$sql->bindValue(":clado_id", $clado_id);

				$sql->execute();

				$select_USERHASCLADOGRAM = $sql->fetch(PDO::FETCH_ASSOC);
				$solicitation = $select_USERHASCLADOGRAM["solicitation"];

				if($solicitation == "0" || $solicitation == "1"){
					return "Cladograma já adicionado";

				} else if($solicitation == "10"){
					return "Solicitação já foi enviada";

				} else if($solicitation == ""){
					$sql = $this->pdo->prepare("INSERT INTO user_has_cladogram(user_id, clado_id, solicitation)
													VALUES(:user_id, :clado_id, 10)");
					$sql->bindValue(":user_id", $user_id);
					$sql->bindValue(":clado_id", $clado_id);

					$sql->execute();

					return "Solicitação enviada com sucesso";

				} else if($solicitation == "5"){
					$sql = $this->pdo->prepare("UPDATE user_has_cladogram SET solicitation = 10
														WHERE user_id = :user_id AND clado_id = :clado_id");
					$sql->bindValue(":user_id", $user_id);
					$sql->bindValue(":clado_id", $clado_id);

					$sql->execute();

					return "Solicitação re-enviada com sucesso";
				}

			} else{
				return "Cladograma não existe";

			}
		}

		public function searchSolicitationReceived($user_id){
			$sql = $this->pdo->prepare("SELECT u.user_id, u.user_name, c.clado_id, c.clado_name
											FROM user as u INNER JOIN user_has_cladogram as uc ON u.user_id = uc.user_id
												INNER JOIN cladogram as c ON uc.clado_id = c.clado_id
											WHERE c.clado_userAdmin = :user_id AND uc.solicitation = 10
												AND u.user_status = 1 AND c.clado_status = 1");
			$sql->bindValue(":user_id", $user_id);

			$sql->execute();

			return $sql->fetchAll(PDO::FETCH_ASSOC);
		}

		public function actionSolicitationReceived($user_id, $clado_id, $button_type){
			if($button_type == "btn btn-success"){
				$sql = $this->pdo->prepare("UPDATE user_has_cladogram SET solicitation = 1
												WHERE user_id = :user_id AND clado_id = :clado_id");

			} else if($button_type == "btn btn-danger"){
				$sql = $this->pdo->prepare("UPDATE user_has_cladogram SET solicitation = 5
												WHERE user_id = :user_id AND clado_id = :clado_id");

			}

			$sql->bindValue(":user_id", $user_id);
			$sql->bindValue(":clado_id", $clado_id);

			$sql->execute();
		}

		public function actionSolicitationSended($user_id, $clado_id){
			$sql = $this->pdo->prepare("UPDATE user_has_cladogram SET solicitation = 5
											WHERE user_id = :user_id AND clado_id = :clado_id");

			$sql->bindValue(":user_id", $user_id);
			$sql->bindValue(":clado_id", $clado_id);

			$sql->execute();

		}

		public function searchSolicitationSended($user_id){
			$sql = $this->pdo->prepare("SELECT c.clado_id, c.clado_name, u.user_id, u.user_name
											FROM cladogram as c INNER JOIN user_has_cladogram as uc ON c.clado_id = uc.clado_id
												INNER JOIN user as u ON u.user_id = c.clado_userAdmin
											WHERE uc.user_id = :user_id AND uc.solicitation = 10
												AND c.clado_status = 1 AND u.user_status = 1");
			$sql->bindValue(":user_id", $user_id);

			$sql->execute();

			return $sql->fetchAll(PDO::FETCH_ASSOC);
		}

		public function deleteCladogram($user_id, $clado_id){
			$sql = $this->pdo->prepare("SELECT c.clado_userAdmin 
											FROM user as u INNER JOIN user_has_cladogram as uc ON u.user_id = uc.user_id
														   INNER JOIN cladogram as c ON uc.clado_id = c.clado_id
											WHERE uc.user_id = :user_id AND uc.clado_id = :clado_id
												AND u.user_status = 1 AND c.clado_status = 1");
			$sql->bindValue(":user_id", $user_id);
			$sql->bindValue(":clado_id", $clado_id);

			$sql->execute();

			$result = $sql->fetch(PDO::FETCH_ASSOC);

			if($result["clado_userAdmin"] == $user_id){
				$sql = $this->pdo->prepare("UPDATE cladogram SET clado_status = 0 
												WHERE clado_id = :clado_id");
				$sql->bindValue(":clado_id", $clado_id);

				$sql->execute();
				
			} else{
				$sql = $this->pdo->prepare("UPDATE user_has_cladogram SET solicitation = 5
												WHERE clado_id = :clado_id AND user_id = :user_id");
				$sql->bindValue(":clado_id", $clado_id);
				$sql->bindValue(":user_id", $user_id);

				$sql->execute();
			}
		}

		public function shareCladogram($clado_id, $user_id){
			$sql = $this->pdo->prepare("SELECT c.clado_token FROM user as u 
											INNER JOIN user_has_cladogram as uc ON u.user_id = uc.user_id
											INNER JOIN cladogram as c ON uc.clado_id = c.clado_id
										WHERE c.clado_id = :clado_id AND u.user_id = :user_id");
			$sql->bindValue(":clado_id", $clado_id);
			$sql->bindValue(":user_id", $user_id);

			$sql->execute();
			
			$result = $sql->fetch(PDO::FETCH_ASSOC);

			return $result["clado_token"];
		}

		public function saveActions_add($filo_name, $filo_category, $user_logged, $clado_id){
			$sql = $this->pdo->prepare("INSERT INTO actions(actions_newname, actions_newcategory, actions_type, 
											actions_datetime, actions_creator, user_id, clado_id)
										VALUES(:filo_name, :filo_category, 'Adicionou', CURRENT_TIMESTAMP(),
											:user_creator, :user_id, :clado_id);");
											
			$sql->bindValue(":filo_name", $filo_name);
			$sql->bindValue(":filo_category", $filo_category);
			$sql->bindValue(":user_creator", $user_logged);
			$sql->bindValue(":user_id", $user_logged);
			$sql->bindValue(":clado_id", $clado_id);

			$sql->execute();
		}

		public function saveActions_edit($old_name, $old_category, $new_name, $new_category, $creator, $editor, 
			$user_id, $clado_id){

			if($editor == ''){
				$sql = $this->pdo->prepare("INSERT INTO actions(actions_oldname, actions_oldcategory, 
											actions_newname, actions_newcategory, actions_creator, 
											actions_type, actions_datetime, user_id, clado_id)
										VALUES(:oldname, :oldcategory, :newname, :newcategory, :creator, 
											'Editou', CURRENT_TIMESTAMP(), :user_id, :clado_id)");

			} else{
				$sql = $this->pdo->prepare("INSERT INTO actions(actions_oldname, actions_oldcategory, 
											actions_newname, actions_newcategory, actions_creator, actions_editor, 
											actions_type, actions_datetime, user_id, clado_id)
										VALUES(:oldname, :oldcategory, :newname, :newcategory, :creator, :editor, 
											'Editou', CURRENT_TIMESTAMP(), :user_id, :clado_id)");
				
				$sql->bindValue(":editor", $editor);

			}

			$sql->bindValue(":oldname", $old_name);
			$sql->bindValue(":oldcategory", $old_category);
			$sql->bindValue(":newname", $new_name);
			$sql->bindValue(":newcategory", $new_category);
			$sql->bindValue(":creator", $creator);
			$sql->bindValue(":user_id", $user_id);
			$sql->bindValue(":clado_id", $clado_id);

			$sql->execute();

		}

		public function saveAtions_del($old_name, $old_category, $creator, $editor, $user_id, $clado_id){
			if($editor == ''){
				$sql = $this->pdo->prepare("INSERT INTO actions(actions_oldname, actions_oldcategory, actions_creator,
											actions_type, actions_datetime, user_id, clado_id)
										VALUES(:old_name, :old_category, :creator, 'Excluiu', CURRENT_TIMESTAMP(),
											:user_id, :clado_id)");

			} else{
				$sql = $this->pdo->prepare("INSERT INTO actions(actions_oldname, actions_oldcategory, actions_creator,
											actions_editor, actions_type, actions_datetime, user_id, clado_id)
										VALUES(:old_name, :old_category, :creator, :editor, 'Excluiu', 
											CURRENT_TIMESTAMP(), :user_id, :clado_id)");

				$sql->bindValue(":editor", $editor);

			}

			$sql->bindValue(":old_name", $old_name);
			$sql->bindValue(":old_category", $old_category);
			$sql->bindValue(":creator", $creator);
			$sql->bindValue(":user_id", $user_id);
			$sql->bindValue(":clado_id", $clado_id);
			

			$sql->execute();
		}
	}
?>
