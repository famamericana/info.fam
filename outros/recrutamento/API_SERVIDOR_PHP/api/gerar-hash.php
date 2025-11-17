<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de Hash - FAM</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #003366 0%, #004080 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        h1 {
            color: #003366;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 600;
        }
        input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 1rem;
        }
        input:focus {
            outline: none;
            border-color: #003366;
        }
        button {
            width: 100%;
            padding: 0.75rem;
            background: #003366;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        button:hover {
            background: #004080;
        }
        .result {
            margin-top: 2rem;
            padding: 1rem;
            background: #f0f0f0;
            border-radius: 6px;
            word-break: break-all;
            display: none;
        }
        .result.show {
            display: block;
        }
        .result-label {
            font-weight: 600;
            color: #003366;
            margin-bottom: 0.5rem;
        }
        .hash-value {
            background: white;
            padding: 0.75rem;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.9rem;
            color: #333;
            border: 1px solid #ddd;
        }
        .copy-btn {
            margin-top: 0.5rem;
            background: #4CAF50;
            font-size: 0.9rem;
        }
        .copy-btn:hover {
            background: #45a049;
        }
        .warning {
            background: #fff3cd;
            border: 2px solid #ffc107;
            border-radius: 6px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            color: #856404;
        }
        .warning strong {
            display: block;
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Gerador de Hash de Senha</h1>
        
        <div class="warning">
            <strong>⚠️ Atenção:</strong>
            Use senhas fortes com no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.
        </div>

        <form method="POST">
            <div class="form-group">
                <label for="senha">Digite a senha:</label>
                <input type="password" id="senha" name="senha" required minlength="6">
            </div>
            
            <div class="form-group">
                <label for="senha_confirmar">Confirme a senha:</label>
                <input type="password" id="senha_confirmar" name="senha_confirmar" required minlength="6">
            </div>

            <button type="submit">Gerar Hash</button>
        </form>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $senha = $_POST['senha'] ?? '';
            $senha_confirmar = $_POST['senha_confirmar'] ?? '';

            if ($senha !== $senha_confirmar) {
                echo '<div class="result show" style="background: #f8d7da; color: #721c24;">
                        <strong>Erro:</strong> As senhas não coincidem!
                      </div>';
            } elseif (strlen($senha) < 6) {
                echo '<div class="result show" style="background: #f8d7da; color: #721c24;">
                        <strong>Erro:</strong> A senha deve ter no mínimo 6 caracteres!
                      </div>';
            } else {
                $hash = password_hash($senha, PASSWORD_DEFAULT);
                
                echo '<div class="result show">
                        <div class="result-label">Hash gerado com sucesso:</div>
                        <div class="hash-value" id="hashValue">' . htmlspecialchars($hash) . '</div>
                        <button class="copy-btn" onclick="copiarHash()">📋 Copiar Hash</button>
                      </div>
                      
                      <div class="result show" style="background: #d4edda; color: #155724; margin-top: 1rem;">
                        <strong>Como usar:</strong><br>
                        1. Copie a hash acima<br>
                        2. Use no INSERT ou UPDATE do SQL<br>
                        3. Exemplo:<br>
                        <code style="display: block; margin-top: 0.5rem; padding: 0.5rem; background: white; border-radius: 4px;">
                        UPDATE usuarios_rh SET senha = \'' . htmlspecialchars($hash) . '\' WHERE email = \'email@fam.br\';
                        </code>
                      </div>';
            }
        }
        ?>
    </div>

    <script>
        function copiarHash() {
            const hashValue = document.getElementById('hashValue').textContent;
            navigator.clipboard.writeText(hashValue).then(() => {
                alert('Hash copiado para área de transferência!');
            });
        }

        // Validar senhas em tempo real
        document.getElementById('senha_confirmar').addEventListener('input', function() {
            const senha = document.getElementById('senha').value;
            const senhaConfirmar = this.value;
            
            if (senhaConfirmar && senha !== senhaConfirmar) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#4CAF50';
            }
        });
    </script>
</body>
</html>
