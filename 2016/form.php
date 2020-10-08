<?php

$para= "contato@danielacb.com";

$nome= $_REQUEST['nome'];
$email= $_REQUEST['email'];
$assunto= $_REQUEST['assunto'];
$mensagem= $_REQUEST['mensagem'];

		$corpo = "<b>Contato do Site danielacb</b><br><br>";
		$corpo .= "<b>Nome:</b> $nome";
		$corpo .= "<br><b>Assunto:</b> $assunto";
		$corpo .= "<br><b>E-mail:</b> $email";
		$corpo .= "<br><b>Mensagem:</b> $mensagem";

?>