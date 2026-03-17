import os

# Languages: English, Chinese, Spanish, French, German
LANGS = {
    'en': {'name': 'English', 'flag': '🇺🇸'},
    'zh': {'name': '中文', 'flag': '🇨🇳'},
    'es': {'name': 'Español', 'flag': '🇪🇸'},
    'fr': {'name': 'Français', 'flag': '🇫🇷'},
    'de': {'name': 'Deutsch', 'flag': '🇩🇪'}
}

# Tool definitions with translations
TOOLS = {
    'json-formatter': {
        'en': {'title': 'JSON Formatter', 'desc': 'Format and beautify JSON code', 'input': 'Enter JSON to format', 'output': 'Formatted JSON', 'action': 'Format', 'placeholder': '{\n  "example": "data"\n}'},
        'zh': {'title': 'JSON 格式化工具', 'desc': '格式化和美化 JSON 代码', 'input': '输入要格式化的 JSON', 'output': '格式化后的 JSON', 'action': '格式化', 'placeholder': '{\n  "示例": "数据"\n}'},
        'es': {'title': 'Formateador JSON', 'desc': 'Formatea y embellece código JSON', 'input': 'Ingrese JSON para formatear', 'output': 'JSON formateado', 'action': 'Formatear', 'placeholder': '{\n  "ejemplo": "dato"\n}'},
        'fr': {'title': 'Formateur JSON', 'desc': 'Formatez et embellissez le code JSON', 'input': 'Entrez le JSON à formater', 'output': 'JSON formaté', 'action': 'Formater', 'placeholder': '{\n  "exemple": "donnée"\n}'},
        'de': {'title': 'JSON-Formatierer', 'desc': 'Formatieren und verschönern Sie JSON-Code', 'input': 'JSON zum Formatieren eingeben', 'output': 'Formatiertes JSON', 'action': 'Formatieren', 'placeholder': '{\n  "beispiel": "daten"\n}'}
    },
    'json-validator': {
        'en': {'title': 'JSON Validator', 'desc': 'Validate JSON syntax', 'input': 'Enter JSON to validate', 'output': 'Validation Result', 'action': 'Validate', 'placeholder': '{\n  "test": "value"\n}'},
        'zh': {'title': 'JSON 验证器', 'desc': '验证 JSON 语法', 'input': '输入要验证的 JSON', 'output': '验证结果', 'action': '验证', 'placeholder': '{\n  "测试": "值"\n}'},
        'es': {'title': 'Validador JSON', 'desc': 'Valida la sintaxis JSON', 'input': 'Ingrese JSON para validar', 'output': 'Resultado de validación', 'action': 'Validar', 'placeholder': '{\n  "prueba": "valor"\n}'},
        'fr': {'title': 'Validateur JSON', 'desc': 'Validez la syntaxe JSON', 'input': 'Entrez le JSON à valider', 'output': 'Résultat de validation', 'action': 'Valider', 'placeholder': '{\n  "test": "valeur"\n}'},
        'de': {'title': 'JSON-Validator', 'desc': 'Validieren Sie JSON-Syntax', 'input': 'JSON zum Validieren eingeben', 'output': 'Validierungsergebnis', 'action': 'Validieren', 'placeholder': '{\n  "test": "wert"\n}'}
    },
    'json-to-xml': {
        'en': {'title': 'JSON to XML', 'desc': 'Convert JSON to XML format', 'input': 'Enter JSON', 'output': 'XML Output', 'action': 'Convert', 'placeholder': '{\n  "root": {\n    "item": "value"\n  }\n}'},
        'zh': {'title': 'JSON 转 XML', 'desc': '将 JSON 转换为 XML 格式', 'input': '输入 JSON', 'output': 'XML 输出', 'action': '转换', 'placeholder': '{\n  "根": {\n    "项": "值"\n  }\n}'},
        'es': {'title': 'JSON a XML', 'desc': 'Convierte JSON a formato XML', 'input': 'Ingrese JSON', 'output': 'Salida XML', 'action': 'Convertir', 'placeholder': '{\n  "raíz": {\n    "elemento": "valor"\n  }\n}'},
        'fr': {'title': 'JSON vers XML', 'desc': 'Convertissez JSON en format XML', 'input': 'Entrez le JSON', 'output': 'Sortie XML', 'action': 'Convertir', 'placeholder': '{\n  "racine": {\n    "élément": "valeur"\n  }\n}'},
        'de': {'title': 'JSON zu XML', 'desc': 'Konvertieren Sie JSON in XML-Format', 'input': 'JSON eingeben', 'output': 'XML-Ausgabe', 'action': 'Konvertieren', 'placeholder': '{\n  "wurzel": {\n    "element": "wert"\n  }\n}'}
    },
    'xml-to-json': {
        'en': {'title': 'XML to JSON', 'desc': 'Convert XML to JSON format', 'input': 'Enter XML', 'output': 'JSON Output', 'action': 'Convert', 'placeholder': '<root>\n  <item>value</item>\n</root>'},
        'zh': {'title': 'XML 转 JSON', 'desc': '将 XML 转换为 JSON 格式', 'input': '输入 XML', 'output': 'JSON 输出', 'action': '转换', 'placeholder': '<根>\n  <项>值</项>\n</根>'},
        'es': {'title': 'XML a JSON', 'desc': 'Convierte XML a formato JSON', 'input': 'Ingrese XML', 'output': 'Salida JSON', 'action': 'Convertir', 'placeholder': '<raíz>\n  <elemento>valor</elemento>\n</raíz>'},
        'fr': {'title': 'XML vers JSON', 'desc': 'Convertissez XML en format JSON', 'input': 'Entrez le XML', 'output': 'Sortie JSON', 'action': 'Convertir', 'placeholder': '<racine>\n  <élément>valeur</élément>\n</racine>'},
        'de': {'title': 'XML zu JSON', 'desc': 'Konvertieren Sie XML in JSON-Format', 'input': 'XML eingeben', 'output': 'JSON-Ausgabe', 'action': 'Konvertieren', 'placeholder': '<wurzel>\n  <element>wert</element>\n</wurzel>'}
    },
    'xml-formatter': {
        'en': {'title': 'XML Formatter', 'desc': 'Format and beautify XML code', 'input': 'Enter XML to format', 'output': 'Formatted XML', 'action': 'Format', 'placeholder': '<root>\n  <item>value</item>\n</root>'},
        'zh': {'title': 'XML 格式化工具', 'desc': '格式化和美化 XML 代码', 'input': '输入要格式化的 XML', 'output': '格式化后的 XML', 'action': '格式化', 'placeholder': '<根>\n  <项>值</项>\n</根>'},
        'es': {'title': 'Formateador XML', 'desc': 'Formatea y embellece código XML', 'input': 'Ingrese XML para formatear', 'output': 'XML formateado', 'action': 'Formatear', 'placeholder': '<raíz>\n  <elemento>valor</elemento>\n</raíz>'},
        'fr': {'title': 'Formateur XML', 'desc': 'Formatez et embellissez le code XML', 'input': 'Entrez le XML à formater', 'output': 'XML formaté', 'action': 'Formater', 'placeholder': '<racine>\n  <élément>valeur</élément>\n</racine>'},
        'de': {'title': 'XML-Formatierer', 'desc': 'Formatieren und verschönern Sie XML-Code', 'input': 'XML zum Formatieren eingeben', 'output': 'Formatiertes XML', 'action': 'Formatieren', 'placeholder': '<wurzel>\n  <element>wert</element>\n</wurzel>'}
    },
    'html-formatter': {
        'en': {'title': 'HTML Formatter', 'desc': 'Format and beautify HTML code', 'input': 'Enter HTML to format', 'output': 'Formatted HTML', 'action': 'Format', 'placeholder': '<div>\n  <p>Hello World</p>\n</div>'},
        'zh': {'title': 'HTML 格式化工具', 'desc': '格式化和美化 HTML 代码', 'input': '输入要格式化的 HTML', 'output': '格式化后的 HTML', 'action': '格式化', 'placeholder': '<div>\n  <p>你好世界</p>\n</div>'},
        'es': {'title': 'Formateador HTML', 'desc': 'Formatea y embellece código HTML', 'input': 'Ingrese HTML para formatear', 'output': 'HTML formateado', 'action': 'Formatear', 'placeholder': '<div>\n  <p>Hola Mundo</p>\n</div>'},
        'fr': {'title': 'Formateur HTML', 'desc': 'Formatez et embellissez le code HTML', 'input': 'Entrez le HTML à formater', 'output': 'HTML formaté', 'action': 'Formater', 'placeholder': '<div>\n  <p>Bonjour le monde</p>\n</div>'},
        'de': {'title': 'HTML-Formatierer', 'desc': 'Formatieren und verschönern Sie HTML-Code', 'input': 'HTML zum Formatieren eingeben', 'output': 'Formatiertes HTML', 'action': 'Formatieren', 'placeholder': '<div>\n  <p>Hallo Welt</p>\n</div>'}
    },
    'css-formatter': {
        'en': {'title': 'CSS Formatter', 'desc': 'Format and beautify CSS code', 'input': 'Enter CSS to format', 'output': 'Formatted CSS', 'action': 'Format', 'placeholder': 'body {\n  color: #333;\n  font-size: 16px;\n}'},
        'zh': {'title': 'CSS 格式化工具', 'desc': '格式化和美化 CSS 代码', 'input': '输入要格式化的 CSS', 'output': '格式化后的 CSS', 'action': '格式化', 'placeholder': 'body {\n  color: #333;\n  font-size: 16px;\n}'},
        'es': {'title': 'Formateador CSS', 'desc': 'Formatea y embellece código CSS', 'input': 'Ingrese CSS para formatear', 'output': 'CSS formateado', 'action': 'Formatear', 'placeholder': 'body {\n  color: #333;\n  font-size: 16px;\n}'},
        'fr': {'title': 'Formateur CSS', 'desc': 'Formatez et embellissez le code CSS', 'input': 'Entrez le CSS à formater', 'output': 'CSS formaté', 'action': 'Formater', 'placeholder': 'body {\n  color: #333;\n  font-size: 16px;\n}'},
        'de': {'title': 'CSS-Formatierer', 'desc': 'Formatieren und verschönern Sie CSS-Code', 'input': 'CSS zum Formatieren eingeben', 'output': 'Formatiertes CSS', 'action': 'Formatieren', 'placeholder': 'body {\n  color: #333;\n  font-size: 16px;\n}'}
    },
    'js-formatter': {
        'en': {'title': 'JavaScript Formatter', 'desc': 'Format and beautify JavaScript code', 'input': 'Enter JavaScript to format', 'output': 'Formatted JS', 'action': 'Format', 'placeholder': 'function hello() {\n  console.log("Hello");\n}'},
        'zh': {'title': 'JavaScript 格式化工具', 'desc': '格式化和美化 JavaScript 代码', 'input': '输入要格式化的 JavaScript', 'output': '格式化后的 JS', 'action': '格式化', 'placeholder': 'function hello() {\n  console.log("你好");\n}'},
        'es': {'title': 'Formateador JavaScript', 'desc': 'Formatea y embellece código JavaScript', 'input': 'Ingrese JavaScript para formatear', 'output': 'JS formateado', 'action': 'Formatear', 'placeholder': 'function hello() {\n  console.log("Hola");\n}'},
        'fr': {'title': 'Formateur JavaScript', 'desc': 'Formatez et embellissez le code JavaScript', 'input': 'Entrez le JavaScript à formater', 'output': 'JS formaté', 'action': 'Formater', 'placeholder': 'function hello() {\n  console.log("Bonjour");\n}'},
        'de': {'title': 'JavaScript-Formatierer', 'desc': 'Formatieren und verschönern Sie JavaScript-Code', 'input': 'JavaScript zum Formatieren eingeben', 'output': 'Formatiertes JS', 'action': 'Formatieren', 'placeholder': 'function hello() {\n  console.log("Hallo");\n}'}
    },
    'sql-formatter': {
        'en': {'title': 'SQL Formatter', 'desc': 'Format and beautify SQL queries', 'input': 'Enter SQL to format', 'output': 'Formatted SQL', 'action': 'Format', 'placeholder': 'SELECT * FROM users WHERE id = 1;'},
        'zh': {'title': 'SQL 格式化工具', 'desc': '格式化和美化 SQL 查询', 'input': '输入要格式化的 SQL', 'output': '格式化后的 SQL', 'action': '格式化', 'placeholder': 'SELECT * FROM users WHERE id = 1;'},
        'es': {'title': 'Formateador SQL', 'desc': 'Formatea y embellece consultas SQL', 'input': 'Ingrese SQL para formatear', 'output': 'SQL formateado', 'action': 'Formatear', 'placeholder': 'SELECT * FROM users WHERE id = 1;'},
        'fr': {'title': 'Formateur SQL', 'desc': 'Formatez et embellissez les requêtes SQL', 'input': 'Entrez le SQL à formater', 'output': 'SQL formaté', 'action': 'Formater', 'placeholder': 'SELECT * FROM users WHERE id = 1;'},
        'de': {'title': 'SQL-Formatierer', 'desc': 'Formatieren und verschönern Sie SQL-Abfragen', 'input': 'SQL zum Formatieren eingeben', 'output': 'Formatiertes SQL', 'action': 'Formatieren', 'placeholder': 'SELECT * FROM users WHERE id = 1;'}
    },
    'code-minifier': {
        'en': {'title': 'Code Minifier', 'desc': 'Minify JS/CSS/HTML code', 'input': 'Enter code to minify', 'output': 'Minified Code', 'action': 'Minify', 'placeholder': 'function test() {\n  var x = 1;\n  return x;\n}'},
        'zh': {'title': '代码压缩工具', 'desc': '压缩 JS/CSS/HTML 代码', 'input': '输入要压缩的代码', 'output': '压缩后的代码', 'action': '压缩', 'placeholder': 'function test() {\n  var x = 1;\n  return x;\n}'},
        'es': {'title': 'Minificador de Código', 'desc': 'Minifica código JS/CSS/HTML', 'input': 'Ingrese código para minificar', 'output': 'Código minificado', 'action': 'Minificar', 'placeholder': 'function test() {\n  var x = 1;\n  return x;\n}'},
        'fr': {'title': 'Minificateur de Code', 'desc': 'Minifiez le code JS/CSS/HTML', 'input': 'Entrez le code à minifier', 'output': 'Code minifié', 'action': 'Minifier', 'placeholder': 'function test() {\n  var x = 1;\n  return x;\n}'},
        'de': {'title': 'Code-Minifizierer', 'desc': 'Minifizieren Sie JS/CSS/HTML-Code', 'input': 'Code zum Minifizieren eingeben', 'output': 'Minifizierter Code', 'action': 'Minifizieren', 'placeholder': 'function test() {\n  var x = 1;\n  return x;\n}'}
    },
    'base64': {
        'en': {'title': 'Base64 Encode/Decode', 'desc': 'Encode and decode Base64 strings', 'input': 'Enter text or Base64', 'output': 'Result', 'action': 'Convert', 'placeholder': 'Hello World'},
        'zh': {'title': 'Base64 编码/解码', 'desc': '编码和解码 Base64 字符串', 'input': '输入文本或 Base64', 'output': '结果', 'action': '转换', 'placeholder': '你好世界'},
        'es': {'title': 'Codificar/Decodificar Base64', 'desc': 'Codifica y decodifica cadenas Base64', 'input': 'Ingrese texto o Base64', 'output': 'Resultado', 'action': 'Convertir', 'placeholder': 'Hola Mundo'},
        'fr': {'title': 'Encoder/Décoder Base64', 'desc': 'Encodez et décodez les chaînes Base64', 'input': 'Entrez du texte ou Base64', 'output': 'Résultat', 'action': 'Convertir', 'placeholder': 'Bonjour le monde'},
        'de': {'title': 'Base64 Kodieren/Dekodieren', 'desc': 'Kodieren und dekodieren Sie Base64-Zeichenketten', 'input': 'Text oder Base64 eingeben', 'output': 'Ergebnis', 'action': 'Konvertieren', 'placeholder': 'Hallo Welt'}
    },
    'url-encoder': {
        'en': {'title': 'URL Encode/Decode', 'desc': 'Encode and decode URL strings', 'input': 'Enter URL or text', 'output': 'Result', 'action': 'Convert', 'placeholder': 'https://example.com?q=hello world'},
        'zh': {'title': 'URL 编码/解码', 'desc': '编码和解码 URL 字符串', 'input': '输入 URL 或文本', 'output': '结果', 'action': '转换', 'placeholder': 'https://example.com?q=你好世界'},
        'es': {'title': 'Codificar/Decodificar URL', 'desc': 'Codifica y decodifica cadenas URL', 'input': 'Ingrese URL o texto', 'output': 'Resultado', 'action': 'Convertir', 'placeholder': 'https://example.com?q=hola mundo'},
        'fr': {'title': 'Encoder/Décoder URL', 'desc': 'Encodez et décodez les chaînes URL', 'input': 'Entrez une URL ou du texte', 'output': 'Résultat', 'action': 'Convertir', 'placeholder': 'https://example.com?q=bonjour le monde'},
        'de': {'title': 'URL Kodieren/Dekodieren', 'desc': 'Kodieren und dekodieren Sie URL-Zeichenketten', 'input': 'URL oder Text eingeben', 'output': 'Ergebnis', 'action': 'Konvertieren', 'placeholder': 'https://example.com?q=hallo welt'}
    },
    'jwt-decoder': {
        'en': {'title': 'JWT Decoder', 'desc': 'Decode JSON Web Tokens', 'input': 'Enter JWT token', 'output': 'Decoded JWT', 'action': 'Decode', 'placeholder': 'eyJhbGciOiJIUzI1NiIs...'},
        'zh': {'title': 'JWT 解码器', 'desc': '解码 JSON Web 令牌', 'input': '输入 JWT 令牌', 'output': '解码后的 JWT', 'action': '解码', 'placeholder': 'eyJhbGciOiJIUzI1NiIs...'},
        'es': {'title': 'Decodificador JWT', 'desc': 'Decodifica tokens JSON Web', 'input': 'Ingrese token JWT', 'output': 'JWT decodificado', 'action': 'Decodificar', 'placeholder': 'eyJhbGciOiJIUzI1NiIs...'},
        'fr': {'title': 'Décodeur JWT', 'desc': 'Décodez les tokens JSON Web', 'input': 'Entrez le token JWT', 'output': 'JWT décodé', 'action': 'Décoder', 'placeholder': 'eyJhbGciOiJIUzI1NiIs...'},
        'de': {'title': 'JWT-Dekodierer', 'desc': 'Dekodieren Sie JSON Web Tokens', 'input': 'JWT-Token eingeben', 'output': 'Dekodiertes JWT', 'action': 'Dekodieren', 'placeholder': 'eyJhbGciOiJIUzI1NiIs...'}
    },
    'regex-tester': {
        'en': {'title': 'Regex Tester', 'desc': 'Test regular expressions', 'input': 'Enter test text', 'output': 'Matches', 'action': 'Test', 'placeholder': 'Hello World 123', 'regexLabel': 'Regex Pattern'},
        'zh': {'title': '正则表达式测试器', 'desc': '测试正则表达式', 'input': '输入测试文本', 'output': '匹配结果', 'action': '测试', 'placeholder': '你好世界 123', 'regexLabel': '正则模式'},
        'es': {'title': 'Probador de Regex', 'desc': 'Prueba expresiones regulares', 'input': 'Ingrese texto de prueba', 'output': 'Coincidencias', 'action': 'Probar', 'placeholder': 'Hola Mundo 123', 'regexLabel': 'Patrón Regex'},
        'fr': {'title': 'Testeur de Regex', 'desc': 'Testez les expressions régulières', 'input': 'Entrez le texte de test', 'output': 'Correspondances', 'action': 'Tester', 'placeholder': 'Bonjour le monde 123', 'regexLabel': 'Modèle Regex'},
        'de': {'title': 'Regex-Tester', 'desc': 'Testen Sie reguläre Ausdrücke', 'input': 'Testtext eingeben', 'output': 'Übereinstimmungen', 'action': 'Testen', 'placeholder': 'Hallo Welt 123', 'regexLabel': 'Regex-Muster'}
    },
    'uuid-generator': {
        'en': {'title': 'UUID Generator', 'desc': 'Generate UUID/GUID strings', 'input': 'Number of UUIDs', 'output': 'Generated UUIDs', 'action': 'Generate', 'placeholder': '5'},
        'zh': {'title': 'UUID 生成器', 'desc': '生成 UUID/GUID 字符串', 'input': 'UUID 数量', 'output': '生成的 UUID', 'action': '生成', 'placeholder': '5'},
        'es': {'title': 'Generador UUID', 'desc': 'Genera cadenas UUID/GUID', 'input': 'Número de UUIDs', 'output': 'UUIDs generados', 'action': 'Generar', 'placeholder': '5'},
        'fr': {'title': 'Générateur UUID', 'desc': 'Générez des chaînes UUID/GUID', 'input': 'Nombre d\'UUIDs', 'output': 'UUIDs générés', 'action': 'Générer', 'placeholder': '5'},
        'de': {'title': 'UUID-Generator', 'desc': 'Generieren Sie UUID/GUID-Zeichenketten', 'input': 'Anzahl der UUIDs', 'output': 'Generierte UUIDs', 'action': 'Generieren', 'placeholder': '5'}
    },
    'hash-generator': {
        'en': {'title': 'Hash Generator', 'desc': 'Generate MD5, SHA1, SHA256 hashes', 'input': 'Enter text to hash', 'output': 'Hashes', 'action': 'Generate', 'placeholder': 'Hello World'},
        'zh': {'title': '哈希生成器', 'desc': '生成 MD5、SHA1、SHA256 哈希', 'input': '输入要哈希的文本', 'output': '哈希值', 'action': '生成', 'placeholder': '你好世界'},
        'es': {'title': 'Generador de Hash', 'desc': 'Genera hashes MD5, SHA1, SHA256', 'input': 'Ingrese texto para hashear', 'output': 'Hashes', 'action': 'Generar', 'placeholder': 'Hola Mundo'},
        'fr': {'title': 'Générateur de Hash', 'desc': 'Générez des hashes MD5, SHA1, SHA256', 'input': 'Entrez le texte à hasher', 'output': 'Hashes', 'action': 'Générer', 'placeholder': 'Bonjour le monde'},
        'de': {'title': 'Hash-Generator', 'desc': 'Generieren Sie MD5-, SHA1-, SHA256-Hashes', 'input': 'Text zum Hashen eingeben', 'output': 'Hashes', 'action': 'Generieren', 'placeholder': 'Hallo Welt'}
    },
    'hmac-generator': {
        'en': {'title': 'HMAC Generator', 'desc': 'Generate HMAC signatures', 'input': 'Enter message', 'output': 'HMAC', 'action': 'Generate', 'placeholder': 'Hello World', 'keyLabel': 'Secret Key'},
        'zh': {'title': 'HMAC 生成器', 'desc': '生成 HMAC 签名', 'input': '输入消息', 'output': 'HMAC', 'action': '生成', 'placeholder': '你好世界', 'keyLabel': '密钥'},
        'es': {'title': 'Generador HMAC', 'desc': 'Genera firmas HMAC', 'input': 'Ingrese mensaje', 'output': 'HMAC', 'action': 'Generar', 'placeholder': 'Hola Mundo', 'keyLabel': 'Clave secreta'},
        'fr': {'title': 'Générateur HMAC', 'desc': 'Générez des signatures HMAC', 'input': 'Entrez le message', 'output': 'HMAC', 'action': 'Générer', 'placeholder': 'Bonjour le monde', 'keyLabel': 'Clé secrète'},
        'de': {'title': 'HMAC-Generator', 'desc': 'Generieren Sie HMAC-Signaturen', 'input': 'Nachricht eingeben', 'output': 'HMAC', 'action': 'Generieren', 'placeholder': 'Hallo Welt', 'keyLabel': 'Geheimschlüssel'}
    },
    'password-generator': {
        'en': {'title': 'Password Generator', 'desc': 'Generate secure passwords', 'input': 'Length', 'output': 'Generated Password', 'action': 'Generate', 'placeholder': '16'},
        'zh': {'title': '密码生成器', 'desc': '生成安全密码', 'input': '长度', 'output': '生成的密码', 'action': '生成', 'placeholder': '16'},
        'es': {'title': 'Generador de Contraseñas', 'desc': 'Genera contraseñas seguras', 'input': 'Longitud', 'output': 'Contraseña generada', 'action': 'Generar', 'placeholder': '16'},
        'fr': {'title': 'Générateur de Mot de Passe', 'desc': 'Générez des mots de passe sécurisés', 'input': 'Longueur', 'output': 'Mot de passe généré', 'action': 'Générer', 'placeholder': '16'},
        'de': {'title': 'Passwort-Generator', 'desc': 'Generieren Sie sichere Passwörter', 'input': 'Länge', 'output': 'Generiertes Passwort', 'action': 'Generieren', 'placeholder': '16'}
    },
    'lorem-ipsum': {
        'en': {'title': 'Lorem Ipsum Generator', 'desc': 'Generate placeholder text', 'input': 'Paragraphs', 'output': 'Generated Text', 'action': 'Generate', 'placeholder': '3'},
        'zh': {'title': 'Lorem Ipsum 生成器', 'desc': '生成占位文本', 'input': '段落数', 'output': '生成的文本', 'action': '生成', 'placeholder': '3'},
        'es': {'title': 'Generador Lorem Ipsum', 'desc': 'Genera texto de relleno', 'input': 'Párrafos', 'output': 'Texto generado', 'action': 'Generar', 'placeholder': '3'},
        'fr': {'title': 'Générateur Lorem Ipsum', 'desc': 'Générez du texte factice', 'input': 'Paragraphes', 'output': 'Texte généré', 'action': 'Générer', 'placeholder': '3'},
        'de': {'title': 'Lorem Ipsum Generator', 'desc': 'Generieren Sie Platzhaltertext', 'input': 'Absätze', 'output': 'Generierter Text', 'action': 'Generieren', 'placeholder': '3'}
    },
    'color-picker': {
        'en': {'title': 'Color Picker', 'desc': 'Convert and pick colors', 'input': 'Enter color (hex, rgb, hsl)', 'output': 'Color Values', 'action': 'Convert', 'placeholder': '#4f8ef7'},
        'zh': {'title': '颜色选择器', 'desc': '转换和选择颜色', 'input': '输入颜色（十六进制、RGB、HSL）', 'output': '颜色值', 'action': '转换', 'placeholder': '#4f8ef7'},
        'es': {'title': 'Selector de Color', 'desc': 'Convierte y selecciona colores', 'input': 'Ingrese color (hex, rgb, hsl)', 'output': 'Valores de color', 'action': 'Convertir', 'placeholder': '#4f8ef7'},
        'fr': {'title': 'Sélecteur de Couleur', 'desc': 'Convertissez et choisissez des couleurs', 'input': 'Entrez une couleur (hex, rgb, hsl)', 'output': 'Valeurs de couleur', 'action': 'Convertir', 'placeholder': '#4f8ef7'},
        'de': {'title': 'Farbwähler', 'desc': 'Konvertieren und wählen Sie Farben', 'input': 'Farbe eingeben (hex, rgb, hsl)', 'output': 'Farbwerte', 'action': 'Konvertieren', 'placeholder': '#4f8ef7'}
    },
    'css-unit-converter': {
        'en': {'title': 'CSS Unit Converter', 'desc': 'Convert between CSS units', 'input': 'Enter value', 'output': 'Converted Values', 'action': 'Convert', 'placeholder': '16px', 'fromLabel': 'From', 'toLabel': 'To'},
        'zh': {'title': 'CSS 单位转换器', 'desc': '在 CSS 单位之间转换', 'input': '输入值', 'output': '转换后的值', 'action': '转换', 'placeholder': '16px', 'fromLabel': '从', 'toLabel': '到'},
        'es': {'title': 'Conversor de Unidades CSS', 'desc': 'Convierte entre unidades CSS', 'input': 'Ingrese valor', 'output': 'Valores convertidos', 'action': 'Convertir', 'placeholder': '16px', 'fromLabel': 'De', 'toLabel': 'A'},
        'fr': {'title': 'Convertisseur d\'Unités CSS', 'desc': 'Convertissez entre unités CSS', 'input': 'Entrez une valeur', 'output': 'Valeurs converties', 'action': 'Convertir', 'placeholder': '16px', 'fromLabel': 'De', 'toLabel': 'Vers'},
        'de': {'title': 'CSS-Einheiten-Konverter', 'desc': 'Konvertieren Sie zwischen CSS-Einheiten', 'input': 'Wert eingeben', 'output': 'Konvertierte Werte', 'action': 'Konvertieren', 'placeholder': '16px', 'fromLabel': 'Von', 'toLabel': 'Nach'}
    },
    'px-to-rem': {
        'en': {'title': 'PX to REM Converter', 'desc': 'Convert pixels to rem units', 'input': 'Pixels', 'output': 'REM Value', 'action': 'Convert', 'placeholder': '16', 'baseLabel': 'Base Font Size (px)'},
        'zh': {'title': 'PX 转 REM 转换器', 'desc': '将像素转换为 rem 单位', 'input': '像素', 'output': 'REM 值', 'action': '转换', 'placeholder': '16', 'baseLabel': '基准字体大小 (px)'},
        'es': {'title': 'Conversor PX a REM', 'desc': 'Convierte píxeles a unidades rem', 'input': 'Píxeles', 'output': 'Valor REM', 'action': 'Convertir', 'placeholder': '16', 'baseLabel': 'Tamaño de fuente base (px)'},
        'fr': {'title': 'Convertisseur PX vers REM', 'desc': 'Convertissez les pixels en unités rem', 'input': 'Pixels', 'output': 'Valeur REM', 'action': 'Convertir', 'placeholder': '16', 'baseLabel': 'Taille de police de base (px)'},
        'de': {'title': 'PX zu REM Konverter', 'desc': 'Konvertieren Sie Pixel in rem-Einheiten', 'input': 'Pixel', 'output': 'REM-Wert', 'action': 'Konvertieren', 'placeholder': '16', 'baseLabel': 'Basis-Schriftgröße (px)'}
    },
    'screen-resolution': {
        'en': {'title': 'Screen Resolution', 'desc': 'Detect your screen resolution', 'input': 'Your Screen', 'output': 'Resolution Info', 'action': 'Detect', 'placeholder': 'Click to detect'},
        'zh': {'title': '屏幕分辨率', 'desc': '检测您的屏幕分辨率', 'input': '您的屏幕', 'output': '分辨率信息', 'action': '检测', 'placeholder': '点击检测'},
        'es': {'title': 'Resolución de Pantalla', 'desc': 'Detecta la resolución de tu pantalla', 'input': 'Tu pantalla', 'output': 'Información de resolución', 'action': 'Detectar', 'placeholder': 'Clic para detectar'},
        'fr': {'title': 'Résolution d\'Écran', 'desc': 'Détectez la résolution de votre écran', 'input': 'Votre écran', 'output': 'Infos de résolution', 'action': 'Détecter', 'placeholder': 'Cliquez pour détecter'},
        'de': {'title': 'Bildschirmauflösung', 'desc': 'Erkennen Sie Ihre Bildschirmauflösung', 'input': 'Ihr Bildschirm', 'output': 'Auflösungsinformationen', 'action': 'Erkennen', 'placeholder': 'Klicken zum Erkennen'}
    },
    'user-agent': {
        'en': {'title': 'User Agent Parser', 'desc': 'Parse browser user agent string', 'input': 'User Agent String', 'output': 'Parsed Info', 'action': 'Parse', 'placeholder': 'Mozilla/5.0...'},
        'zh': {'title': 'User Agent 解析器', 'desc': '解析浏览器 User Agent 字符串', 'input': 'User Agent 字符串', 'output': '解析信息', 'action': '解析', 'placeholder': 'Mozilla/5.0...'},
        'es': {'title': 'Analizador User Agent', 'desc': 'Analiza la cadena user agent del navegador', 'input': 'Cadena User Agent', 'output': 'Info analizada', 'action': 'Analizar', 'placeholder': 'Mozilla/5.0...'},
        'fr': {'title': 'Parseur User Agent', 'desc': 'Analysez la chaîne user agent du navigateur', 'input': 'Chaîne User Agent', 'output': 'Infos analysées', 'action': 'Analyser', 'placeholder': 'Mozilla/5.0...'},
        'de': {'title': 'User-Agent-Parser', 'desc': 'Parsen Sie die Browser-User-Agent-Zeichenkette', 'input': 'User-Agent-Zeichenkette', 'output': 'Geparste Info', 'action': 'Parsen', 'placeholder': 'Mozilla/5.0...'}
    },
    'html-entities': {
        'en': {'title': 'HTML Entities', 'desc': 'Encode/decode HTML entities', 'input': 'Enter text or HTML', 'output': 'Result', 'action': 'Convert', 'placeholder': '<div>Hello & "World"</div>'},
        'zh': {'title': 'HTML 实体', 'desc': '编码/解码 HTML 实体', 'input': '输入文本或 HTML', 'output': '结果', 'action': '转换', 'placeholder': '<div>你好 & "世界"</div>'},
        'es': {'title': 'Entidades HTML', 'desc': 'Codifica/decodifica entidades HTML', 'input': 'Ingrese texto o HTML', 'output': 'Resultado', 'action': 'Convertir', 'placeholder': '<div>Hola & "Mundo"</div>'},
        'fr': {'title': 'Entités HTML', 'desc': 'Encodez/décodez les entités HTML', 'input': 'Entrez du texte ou HTML', 'output': 'Résultat', 'action': 'Convertir', 'placeholder': '<div>Bonjour & "Monde"</div>'},
        'de': {'title': 'HTML-Entitäten', 'desc': 'Kodieren/Dekodieren Sie HTML-Entitäten', 'input': 'Text oder HTML eingeben', 'output': 'Ergebnis', 'action': 'Konvertieren', 'placeholder': '<div>Hallo & "Welt"</div>'}
    },
    'csv-to-json': {
        'en': {'title': 'CSV to JSON', 'desc': 'Convert CSV to JSON format', 'input': 'Enter CSV', 'output': 'JSON Output', 'action': 'Convert', 'placeholder': 'name,age\nJohn,30\nJane,25'},
        'zh': {'title': 'CSV 转 JSON', 'desc': '将 CSV 转换为 JSON 格式', 'input': '输入 CSV', 'output': 'JSON 输出', 'action': '转换', 'placeholder': '姓名,年龄\n张三,30\n李四,25'},
        'es': {'title': 'CSV a JSON', 'desc': 'Convierte CSV a formato JSON', 'input': 'Ingrese CSV', 'output': 'Salida JSON', 'action': 'Convertir', 'placeholder': 'nombre,edad\nJuan,30\nMaría,25'},
        'fr': {'title': 'CSV vers JSON', 'desc': 'Convertissez CSV en format JSON', 'input': 'Entrez le CSV', 'output': 'Sortie JSON', 'action': 'Convertir', 'placeholder': 'nom,âge\nJean,30\nMarie,25'},
        'de': {'title': 'CSV zu JSON', 'desc': 'Konvertieren Sie CSV in JSON-Format', 'input': 'CSV eingeben', 'output': 'JSON-Ausgabe', 'action': 'Konvertieren', 'placeholder': 'name,alter\nHans,30\nMaria,25'}
    },
    'json-to-csv': {
        'en': {'title': 'JSON to CSV', 'desc': 'Convert JSON to CSV format', 'input': 'Enter JSON', 'output': 'CSV Output', 'action': 'Convert', 'placeholder': '[\n  {"name": "John", "age": 30},\n  {"name": "Jane", "age": 25}\n]'},
        'zh': {'title': 'JSON 转 CSV', 'desc': '将 JSON 转换为 CSV 格式', 'input': '输入 JSON', 'output': 'CSV 输出', 'action': '转换', 'placeholder': '[\n  {"姓名": "张三", "年龄": 30},\n  {"姓名": "李四", "年龄": 25}\n]'},
        'es': {'title': 'JSON a CSV', 'desc': 'Convierte JSON a formato CSV', 'input': 'Ingrese JSON', 'output': 'Salida CSV', 'action': 'Convertir', 'placeholder': '[\n  {"nombre": "Juan", "edad": 30},\n  {"nombre": "María", "edad": 25}\n]'},
        'fr': {'title': 'JSON vers CSV', 'desc': 'Convertissez JSON en format CSV', 'input': 'Entrez le JSON', 'output': 'Sortie CSV', 'action': 'Convertir', 'placeholder': '[\n  {"nom": "Jean", "âge": 30},\n  {"nom": "Marie", "âge": 25}\n]'},
        'de': {'title': 'JSON zu CSV', 'desc': 'Konvertieren Sie JSON in CSV-Format', 'input': 'JSON eingeben', 'output': 'CSV-Ausgabe', 'action': 'Konvertieren', 'placeholder': '[\n  {"name": "Hans", "alter": 30},\n  {"name": "Maria", "alter": 25}\n]'}
    },
    'sql-to-csv': {
        'en': {'title': 'SQL to CSV', 'desc': 'Convert SQL results to CSV', 'input': 'Enter SQL INSERT/SELECT', 'output': 'CSV Output', 'action': 'Convert', 'placeholder': 'INSERT INTO users (id, name) VALUES (1, "John"), (2, "Jane");'},
        'zh': {'title': 'SQL 转 CSV', 'desc': '将 SQL 结果转换为 CSV', 'input': '输入 SQL INSERT/SELECT', 'output': 'CSV 输出', 'action': '转换', 'placeholder': 'INSERT INTO users (id, name) VALUES (1, "张三"), (2, "李四");'},
        'es': {'title': 'SQL a CSV', 'desc': 'Convierte resultados SQL a CSV', 'input': 'Ingrese SQL INSERT/SELECT', 'output': 'Salida CSV', 'action': 'Convertir', 'placeholder': 'INSERT INTO users (id, name) VALUES (1, "Juan"), (2, "María");'},
        'fr': {'title': 'SQL vers CSV', 'desc': 'Convertissez les résultats SQL en CSV', 'input': 'Entrez SQL INSERT/SELECT', 'output': 'Sortie CSV', 'action': 'Convertir', 'placeholder': 'INSERT INTO users (id, name) VALUES (1, "Jean"), (2, "Marie");'},
        'de': {'title': 'SQL zu CSV', 'desc': 'Konvertieren Sie SQL-Ergebnisse in CSV', 'input': 'SQL INSERT/SELECT eingeben', 'output': 'CSV-Ausgabe', 'action': 'Konvertieren', 'placeholder': 'INSERT INTO users (id, name) VALUES (1, "Hans"), (2, "Maria");'}
    }
}

def get_base_css():
    return """
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
            color: #e0e0e0;
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            padding: 40px 0;
            border-bottom: 1px solid rgba(79, 142, 247, 0.3);
            margin-bottom: 30px;
        }
        h1 {
            font-size: 2.5rem;
            background: linear-gradient(90deg, #4f8ef7, #6b5ce7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #888;
            font-size: 1.1rem;
        }
        .lang-selector {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        .lang-btn {
            padding: 8px 16px;
            border: 1px solid rgba(79, 142, 247, 0.5);
            background: rgba(79, 142, 247, 0.1);
            color: #4f8ef7;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .lang-btn:hover, .lang-btn.active {
            background: #4f8ef7;
            color: #fff;
        }
        .tool-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(79, 142, 247, 0.2);
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 20px;
        }
        .input-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #4f8ef7;
            font-weight: 500;
        }
        textarea, input[type="text"], input[type="number"] {
            width: 100%;
            padding: 12px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(79, 142, 247, 0.3);
            border-radius: 8px;
            color: #e0e0e0;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            resize: vertical;
        }
        textarea { min-height: 150px; }
        textarea:focus, input:focus {
            outline: none;
            border-color: #4f8ef7;
            box-shadow: 0 0 10px rgba(79, 142, 247, 0.3);
        }
        .btn-primary {
            background: linear-gradient(90deg, #4f8ef7, #6b5ce7);
            color: white;
            border: none;
            padding: 12px 32px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(79, 142, 247, 0.4);
        }
        .output-area {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(79, 142, 247, 0.3);
            border-radius: 8px;
            padding: 15px;
            min-height: 150px;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
        }
        .error { color: #ff6b6b; }
        .success { color: #51cf66; }
        .options-row {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        select {
            padding: 10px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(79, 142, 247, 0.3);
            border-radius: 6px;
            color: #e0e0e0;
        }
        .copy-btn {
            background: rgba(79, 142, 247, 0.2);
            border: 1px solid #4f8ef7;
            color: #4f8ef7;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .copy-btn:hover {
            background: #4f8ef7;
            color: white;
        }
        footer {
            text-align: center;
            padding: 30px 0;
            color: #666;
            border-top: 1px solid rgba(79, 142, 247, 0.2);
            margin-top: 30px;
        }
        .home-link {
            color: #4f8ef7;
            text-decoration: none;
        }
        .home-link:hover {
            text-decoration: underline;
        }
    """

def generate_html(tool_id, lang_code, strings):
    css = get_base_css()
    title = strings['title']
    desc = strings['desc']
    
    # Get language nav links
    lang_nav = ""
    for lc, linfo in LANGS.items():
        active = "active" if lc == lang_code else ""
        lang_nav += f'<a href="{tool_id}-{lc}.html" class="lang-btn {active}">{linfo["flag"]} {linfo["name"]}</a>'
    
    # Tool-specific input fields
    extra_inputs = ""
    if tool_id == 'regex-tester':
        extra_inputs = f'''<div class="input-group">
            <label>{strings.get('regexLabel', 'Regex Pattern')}</label>
            <input type="text" id="regexInput" placeholder="[a-zA-Z]+" />
        </div>'''
    elif tool_id == 'hmac-generator':
        extra_inputs = f'''<div class="input-group">
            <label>{strings.get('keyLabel', 'Secret Key')}</label>
            <input type="text" id="keyInput" placeholder="secret-key" />
        </div>'''
    elif tool_id == 'password-generator':
        extra_inputs = f'''<div class="input-group">
            <label>{strings.get('input', 'Length')}</label>
            <input type="number" id="lengthInput" placeholder="{strings.get('placeholder', '16')}" min="4" max="128" value="16" />
        </div><div class="options-row">
            <label><input type="checkbox" id="uppercase" checked> A-Z</label>
            <label><input type="checkbox" id="lowercase" checked> a-z</label>
            <label><input type="checkbox" id="numbers" checked> 0-9</label>
            <label><input type="checkbox" id="symbols" checked> !@#$%</label>
        </div>'''
    elif tool_id == 'px-to-rem':
        extra_inputs = f'''<div class="input-group">
            <label>{strings.get('baseLabel', 'Base Font Size (px)')}</label>
            <input type="number" id="baseInput" value="16" min="1" />
        </div>'''
    elif tool_id in ['base64', 'url-encoder', 'html-entities']:
        extra_inputs = f'''<div class="options-row">
            <label><input type="radio" name="mode" value="encode" checked> Encode</label>
            <label><input type="radio" name="mode" value="decode"> Decode</label>
        </div>'''
    
    # Main input
    if tool_id in ['password-generator', 'uuid-generator', 'lorem-ipsum', 'screen-resolution']:
        main_input = ""
    elif tool_id in ['css-unit-converter']:
        main_input = f'''<div class="options-row">
            <div>
                <label>{strings.get('fromLabel', 'From')}</label>
                <input type="text" id="fromValue" placeholder="16px" />
            </div>
            <div>
                <label>{strings.get('toLabel', 'To')}</label>
                <select id="toUnit">
                    <option value="px">px</option>
                    <option value="rem">rem</option>
                    <option value="em">em</option>
                    <option value="vh">vh</option>
                    <option value="vw">vw</option>
                    <option value="%">%</option>
                </select>
            </div>
        </div>'''
    else:
        main_input = f'''<div class="input-group">
            <label>{strings.get('input', 'Input')}</label>
            <textarea id="mainInput" placeholder="{strings.get('placeholder', '')}"></textarea>
        </div>'''
    
    return f'''<!DOCTYPE html>
<html lang="{lang_code}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - 205 Tools</title>
    <style>{css}</style>
</head>
<body>
    <div class="container">
        <header>
            <h1>{title}</h1>
            <p class="subtitle">{desc}</p>
            <div class="lang-selector">
                {lang_nav}
            </div>
        </header>
        
        <div class="tool-card">
            <form id="toolForm" onsubmit="return false;">
                {extra_inputs}
                {main_input}
                <button type="button" class="btn-primary" onclick="processTool()">{strings.get('action', 'Process')}</button>
            </form>
            
            <div class="input-group" style="margin-top: 20px;">
                <label>{strings.get('output', 'Output')}</label>
                <div id="outputArea" class="output-area"></div>
                <button class="copy-btn" onclick="copyOutput()">📋 Copy</button>
            </div>
        </div>
        
        <footer>
            <a href="index.html" class="home-link">← Back to Tools</a>
            <p>205 Tools - Developer Utilities</p>
        </footer>
    </div>
    
    <script>
        {generate_js(tool_id)}
    </script>
</body>
</html>'''

def generate_js(tool_id):
    js_map = {
        'json-formatter': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                try {
                    const obj = JSON.parse(input);
                    document.getElementById('outputArea').textContent = JSON.stringify(obj, null, 2);
                    document.getElementById('outputArea').className = 'output-area success';
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }''',
        'json-validator': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                try {
                    JSON.parse(input);
                    document.getElementById('outputArea').textContent = '✅ Valid JSON';
                    document.getElementById('outputArea').className = 'output-area success';
                } catch(e) {
                    document.getElementById('outputArea').textContent = '❌ Invalid: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }''',
        'json-to-xml': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                try {
                    const obj = JSON.parse(input);
                    document.getElementById('outputArea').textContent = jsonToXml(obj);
                    document.getElementById('outputArea').className = 'output-area';
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }
            function jsonToXml(obj, indent = 0) {
                const pad = '  '.repeat(indent);
                if (obj === null) return '';
                if (typeof obj === 'string') return escapeXml(obj);
                if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
                if (Array.isArray(obj)) {
                    return obj.map(item => pad + '<item>\\n' + jsonToXml(item, indent + 1) + pad + '</item>\\n').join('');
                }
                let xml = '';
                for (const key in obj) {
                    const val = obj[key];
                    if (typeof val === 'object' && val !== null) {
                        xml += pad + '<' + key + '>\\n' + jsonToXml(val, indent + 1) + pad + '</' + key + '>\\n';
                    } else {
                        xml += pad + '<' + key + '>' + jsonToXml(val, 0) + '</' + key + '>\\n';
                    }
                }
                return xml;
            }
            function escapeXml(str) {
                return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }''',
        'xml-to-json': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                try {
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(input, 'text/xml');
                    if (xml.getElementsByTagName('parsererror').length > 0) throw new Error('Invalid XML');
                    const result = xmlToJson(xml.documentElement);
                    document.getElementById('outputArea').textContent = JSON.stringify(result, null, 2);
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }
            function xmlToJson(node) {
                if (node.nodeType === 3) return node.textContent.trim();
                const obj = {};
                if (node.attributes) {
                    for (let attr of node.attributes) {
                        obj['@' + attr.name] = attr.value;
                    }
                }
                const children = Array.from(node.childNodes).filter(n => n.nodeType === 1);
                if (children.length === 0) {
                    return node.textContent.trim() || obj;
                }
                for (let child of children) {
                    const name = child.nodeName;
                    const val = xmlToJson(child);
                    if (obj[name]) {
                        if (!Array.isArray(obj[name])) obj[name] = [obj[name]];
                        obj[name].push(val);
                    } else {
                        obj[name] = val;
                    }
                }
                return obj;
            }''',
        'xml-formatter': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                try {
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(input, 'text/xml');
                    if (xml.getElementsByTagName('parsererror').length > 0) throw new Error('Invalid XML');
                    const serializer = new XMLSerializer();
                    const ugly = serializer.serializeToString(xml);
                    document.getElementById('outputArea').textContent = formatXml(ugly);
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }
            function formatXml(xml) {
                let formatted = '';
                let indent = 0;
                const lines = xml.replace(/>\\s*</g, '><').split('><');
                for (let i = 0; i < lines.length; i++) {
                    let line = lines[i];
                    if (i > 0) line = '<' + line;
                    if (i < lines.length - 1) line = line + '>';
                    if (line.match(/^\\s*<\\/\\w/)) indent--;
                    formatted += '  '.repeat(Math.max(0, indent)) + line + '\\n';
                    if (line.match(/^\\s*<\\w[^>]*[^\\/]>.*$/)) indent++;
                }
                return formatted.trim();
            }''',
        'html-formatter': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                document.getElementById('outputArea').textContent = formatHtml(input);
            }
            function formatHtml(html) {
                let formatted = '';
                let indent = 0;
                const lines = html.replace(/>\\s*</g, '><').split('><');
                for (let i = 0; i < lines.length; i++) {
                    let line = lines[i];
                    if (i > 0) line = '<' + line;
                    if (i < lines.length - 1) line = line + '>';
                    if (line.match(/^\\s*<\\//)) indent = Math.max(0, indent - 1);
                    formatted += '  '.repeat(indent) + line.trim() + '\\n';
                    if (line.match(/^\\s*<[^!\\/?][^>]*[^\\/]>.*$/) && !line.match(/<\\/(script|style)/i)) indent++;
                }
                return formatted.trim();
            }''',
        'css-formatter': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                document.getElementById('outputArea').textContent = formatCss(input);
            }
            function formatCss(css) {
                return css.replace(/\\s*\\{\\s*/g, ' {\\n  ')
                          .replace(/;\\s*/g, ';\\n  ')
                          .replace(/\\s*\\}\\s*/g, '\\n}\\n\\n')
                          .replace(/,\\s*/g, ', ')
                          .replace(/:\\s*/g, ': ')
                          .trim();
            }''',
        'js-formatter': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                try {
                    new Function(input);
                    document.getElementById('outputArea').textContent = formatJs(input);
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Warning: Syntax error detected, but formatting anyway...\\n\\n' + formatJs(input);
                }
            }
            function formatJs(js) {
                let formatted = '';
                let indent = 0;
                const tokens = js.match(/\\{|\\}|\\[|\\]|\\(|\\)|;|,|:|\\.|\\+|-|=|\\*|\\/|%|!|&|\\||\\^|~|<|>|\\?|\\w+|\\d+|"[^"]*"|'[^']*'|\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/|\\s+/g) || [];
                for (let token of tokens) {
                    if (token === '{' || token === '[' || token === '(') {
                        formatted += token + '\\n' + '  '.repeat(++indent);
                    } else if (token === '}' || token === ']' || token === ')') {
                        formatted = formatted.trimEnd() + '\\n' + '  '.repeat(--indent) + token;
                    } else if (token === ';') {
                        formatted += token + '\\n' + '  '.repeat(indent);
                    } else {
                        formatted += token;
                    }
                }
                return formatted.replace(/\\n\\s*\\n/g, '\\n').trim();
            }''',
        'sql-formatter': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                document.getElementById('outputArea').textContent = formatSql(input);
            }
            function formatSql(sql) {
                const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'TABLE', 'VALUES', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET'];
                let formatted = sql.replace(/\\s+/g, ' ').trim();
                for (const kw of keywords) {
                    const re = new RegExp('\\\\b' + kw + '\\\\b', 'gi');
                    formatted = formatted.replace(re, '\\n' + kw);
                }
                return formatted.replace(/\\n\\s*\\n/g, '\\n').trim();
            }''',
        'code-minifier': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                document.getElementById('outputArea').textContent = input
                    .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '')
                    .replace(/\\/\\/.*/g, '')
                    .replace(/\\s+/g, ' ')
                    .trim();
            }''',
        'base64': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                const mode = document.querySelector('input[name="mode"]:checked').value;
                try {
                    if (mode === 'encode') {
                        document.getElementById('outputArea').textContent = btoa(unescape(encodeURIComponent(input)));
                    } else {
                        document.getElementById('outputArea').textContent = decodeURIComponent(escape(atob(input)));
                    }
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }''',
        'url-encoder': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                const mode = document.querySelector('input[name="mode"]:checked').value;
                try {
                    if (mode === 'encode') {
                        document.getElementById('outputArea').textContent = encodeURIComponent(input);
                    } else {
                        document.getElementById('outputArea').textContent = decodeURIComponent(input);
                    }
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }''',
        'jwt-decoder': '''
            function processTool() {
                const input = document.getElementById('mainInput').value.trim();
                try {
                    const parts = input.split('.');
                    if (parts.length !== 3) throw new Error('Invalid JWT format');
                    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
                    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
                    document.getElementById('outputArea').textContent = 'HEADER:\\n' + JSON.stringify(header, null, 2) + '\\n\\nPAYLOAD:\\n' + JSON.stringify(payload, null, 2);
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }''',
        'regex-tester': '''
            function processTool() {
                const pattern = document.getElementById('regexInput').value;
                const text = document.getElementById('mainInput').value;
                try {
                    const regex = new RegExp(pattern, 'g');
                    const matches = text.match(regex);
                    if (matches) {
                        document.getElementById('outputArea').textContent = 'Found ' + matches.length + ' matches:\\n' + matches.join('\\n');
                    } else {
                        document.getElementById('outputArea').textContent = 'No matches found';
                    }
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                    document.getElementById('outputArea').className = 'output-area error';
                }
            }''',
        'uuid-generator': '''
            function processTool() {
                const count = parseInt(document.getElementById('lengthInput')?.value || '5');
                const uuids = [];
                for (let i = 0; i < count; i++) {
                    uuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                        const r = Math.random() * 16 | 0;
                        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    }));
                }
                document.getElementById('outputArea').textContent = uuids.join('\\n');
            }
            window.onload = processTool;''',
        'hash-generator': '''
            async function processTool() {
                const input = document.getElementById('mainInput').value;
                const encoder = new TextEncoder();
                const data = encoder.encode(input);
                const md5 = await md5Hash(input);
                const sha1 = await shaHash(data, 'SHA-1');
                const sha256 = await shaHash(data, 'SHA-256');
                document.getElementById('outputArea').textContent = 'MD5:\\n' + md5 + '\\n\\nSHA1:\\n' + sha1 + '\\n\\nSHA256:\\n' + sha256;
            }
            async function shaHash(data, algo) {
                const hash = await crypto.subtle.digest(algo, data);
                return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
            }
            async function md5Hash(str) {
                return 'MD5 not available in browser crypto - use SHA values above';
            }''',
        'hmac-generator': '''
            async function processTool() {
                const message = document.getElementById('mainInput').value;
                const key = document.getElementById('keyInput').value;
                const encoder = new TextEncoder();
                const keyData = await crypto.subtle.importKey('raw', encoder.encode(key), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
                const sig = await crypto.subtle.sign('HMAC', keyData, encoder.encode(message));
                const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
                document.getElementById('outputArea').textContent = 'SHA-256 HMAC:\\n' + hex;
            }''',
        'password-generator': '''
            function processTool() {
                const length = parseInt(document.getElementById('lengthInput').value) || 16;
                const useUpper = document.getElementById('uppercase').checked;
                const useLower = document.getElementById('lowercase').checked;
                const useNumbers = document.getElementById('numbers').checked;
                const useSymbols = document.getElementById('symbols').checked;
                let chars = '';
                if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
                if (useNumbers) chars += '0123456789';
                if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
                if (!chars) { alert('Select at least one character type'); return; }
                let password = '';
                for (let i = 0; i < length; i++) {
                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                document.getElementById('outputArea').textContent = password;
            }
            window.onload = processTool;''',
        'lorem-ipsum': '''
            function processTool() {
                const count = parseInt(document.getElementById('lengthInput')?.value || '3');
                const paragraphs = [
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
                    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.'
                ];
                let result = [];
                for (let i = 0; i < count; i++) {
                    result.push(paragraphs[i % paragraphs.length]);
                }
                document.getElementById('outputArea').textContent = result.join('\\n\\n');
            }
            window.onload = processTool;''',
        'color-picker': '''
            function processTool() {
                const input = document.getElementById('mainInput').value.trim();
                let r, g, b;
                if (input.startsWith('#')) {
                    const hex = input.slice(1);
                    r = parseInt(hex.substr(0, 2), 16);
                    g = parseInt(hex.substr(2, 2), 16);
                    b = parseInt(hex.substr(4, 2), 16);
                } else if (input.startsWith('rgb')) {
                    const match = input.match(/\\d+/g);
                    [r, g, b] = match.map(Number);
                } else if (input.startsWith('hsl')) {
                    document.getElementById('outputArea').textContent = 'HSL conversion coming soon...';
                    return;
                }
                if (isNaN(r) || isNaN(g) || isNaN(b)) {
                    document.getElementById('outputArea').textContent = 'Invalid color format';
                    return;
                }
                const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
                const hsl = rgbToHsl(r, g, b);
                document.getElementById('outputArea').innerHTML = '<div style="width: 50px; height: 50px; background: ' + hex + '; border-radius: 4px; margin-bottom: 10px;"></div>HEX: ' + hex + '\\nRGB: rgb(' + r + ', ' + g + ', ' + b + ')\\nHSL: hsl(' + Math.round(hsl[0]) + ', ' + Math.round(hsl[1]) + '%, ' + Math.round(hsl[2]) + '%)';
            }
            function rgbToHsl(r, g, b) {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                if (max === min) { h = s = 0; }
                else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return [h * 360, s * 100, l * 100];
            }''',
        'css-unit-converter': '''
            function processTool() {
                const fromVal = document.getElementById('fromValue').value;
                const toUnit = document.getElementById('toUnit').value;
                const match = fromVal.match(/^([\\d.]+)([a-z%]+)$/i);
                if (!match) { document.getElementById('outputArea').textContent = 'Invalid format (e.g., 16px)'; return; }
                const [_, val, fromUnit] = match;
                const pxVal = toPx(parseFloat(val), fromUnit);
                const result = fromPx(pxVal, toUnit);
                document.getElementById('outputArea').textContent = fromVal + ' = ' + result + toUnit;
            }
            function toPx(val, unit) {
                const base = 16;
                switch(unit.toLowerCase()) {
                    case 'px': return val;
                    case 'rem': case 'em': return val * base;
                    case 'vh': return val * window.innerHeight / 100;
                    case 'vw': return val * window.innerWidth / 100;
                    case '%': return val * base / 100;
                    default: return val;
                }
            }
            function fromPx(px, unit) {
                const base = 16;
                switch(unit.toLowerCase()) {
                    case 'px': return px;
                    case 'rem': case 'em': return (px / base).toFixed(4);
                    case 'vh': return (px * 100 / window.innerHeight).toFixed(4);
                    case 'vw': return (px * 100 / window.innerWidth).toFixed(4);
                    case '%': return (px * 100 / base).toFixed(4);
                    default: return px;
                }
            }''',
        'px-to-rem': '''
            function processTool() {
                const px = parseFloat(document.getElementById('mainInput').value);
                const base = parseFloat(document.getElementById('baseInput').value) || 16;
                if (isNaN(px)) { document.getElementById('outputArea').textContent = 'Enter a valid number'; return; }
                const rem = (px / base).toFixed(4);
                document.getElementById('outputArea').textContent = px + 'px = ' + rem + 'rem (base: ' + base + 'px)';
            }''',
        'screen-resolution': '''
            function processTool() {
                const w = window.screen.width;
                const h = window.screen.height;
                const aw = window.screen.availWidth;
                const ah = window.screen.availHeight;
                const dpr = window.devicePixelRatio;
                document.getElementById('outputArea').innerHTML = 'Screen Resolution: ' + w + ' x ' + h + '\\nAvailable: ' + aw + ' x ' + ah + '\\nDevice Pixel Ratio: ' + dpr + '\\nWindow Size: ' + window.innerWidth + ' x ' + window.innerHeight;
            }
            window.onload = processTool;''',
        'user-agent': '''
            function processTool() {
                const ua = document.getElementById('mainInput').value || navigator.userAgent;
                const info = {
                    'User Agent': ua,
                    'Browser': detectBrowser(ua),
                    'OS': detectOS(ua),
                    'Device': detectDevice(ua),
                    'Mobile': /Mobile|Android|iPhone/i.test(ua) ? 'Yes' : 'No'
                };
                document.getElementById('outputArea').textContent = Object.entries(info).map(([k, v]) => k + ': ' + v).join('\\n');
            }
            function detectBrowser(ua) {
                if (/Firefox/i.test(ua)) return 'Firefox';
                if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome';
                if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
                if (/Edg/i.test(ua)) return 'Edge';
                if (/Opera|OPR/i.test(ua)) return 'Opera';
                return 'Unknown';
            }
            function detectOS(ua) {
                if (/Windows/i.test(ua)) return 'Windows';
                if (/Mac/i.test(ua)) return 'macOS';
                if (/Linux/i.test(ua)) return 'Linux';
                if (/Android/i.test(ua)) return 'Android';
                if (/iOS|iPhone|iPad/i.test(ua)) return 'iOS';
                return 'Unknown';
            }
            function detectDevice(ua) {
                if (/iPhone/i.test(ua)) return 'iPhone';
                if (/iPad/i.test(ua)) return 'iPad';
                if (/Android/i.test(ua)) return 'Android Device';
                return 'Desktop';
            }
            window.onload = () => document.getElementById('mainInput').value = navigator.userAgent;''',
        'html-entities': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                const mode = document.querySelector('input[name="mode"]:checked').value;
                if (mode === 'encode') {
                    const textarea = document.createElement('textarea');
                    textarea.textContent = input;
                    document.getElementById('outputArea').textContent = textarea.innerHTML;
                } else {
                    const textarea = document.createElement('textarea');
                    textarea.innerHTML = input;
                    document.getElementById('outputArea').textContent = textarea.textContent;
                }
            }''',
        'csv-to-json': '''
            function processTool() {
                const input = document.getElementById('mainInput').value.trim();
                const lines = input.split('\\n');
                if (lines.length < 2) { document.getElementById('outputArea').textContent = 'Need at least 2 lines (header + data)'; return; }
                const headers = lines[0].split(',').map(h => h.trim());
                const result = [];
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',').map(v => v.trim());
                    const obj = {};
                    headers.forEach((h, idx) => obj[h] = values[idx] || '');
                    result.push(obj);
                }
                document.getElementById('outputArea').textContent = JSON.stringify(result, null, 2);
            }''',
        'json-to-csv': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                try {
                    const data = JSON.parse(input);
                    if (!Array.isArray(data) || data.length === 0) throw new Error('Expected array of objects');
                    const headers = Object.keys(data[0]);
                    const rows = data.map(obj => headers.map(h => JSON.stringify(obj[h] || '')).join(','));
                    document.getElementById('outputArea').textContent = [headers.join(','), ...rows].join('\\n');
                } catch(e) {
                    document.getElementById('outputArea').textContent = 'Error: ' + e.message;
                }
            }''',
        'sql-to-csv': '''
            function processTool() {
                const input = document.getElementById('mainInput').value;
                const valuesMatch = input.match(/VALUES\\s*\\(([^)]+)\\)/i);
                if (valuesMatch) {
                    const values = valuesMatch[1].split(',').map(v => v.trim().replace(/['"]/g, ''));
                    document.getElementById('outputArea').textContent = values.join(',');
                } else {
                    document.getElementById('outputArea').textContent = 'Could not parse SQL';
                }
            }'''
    }
    
    base_js = js_map.get(tool_id, 'function processTool() { document.getElementById("outputArea").textContent = "Tool not implemented"; }')
    return base_js + '''
    function copyOutput() {
        const text = document.getElementById('outputArea').textContent;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector('.copy-btn');
            const old = btn.textContent;
            btn.textContent = '✅ Copied!';
            setTimeout(() => btn.textContent = old, 1500);
        });
    }'''

def main():
    base_dir = '/root/.openclaw/workspace/demo-site/tools'
    
    # Generate all tool files
    count = 0
    for tool_id, translations in TOOLS.items():
        for lang_code, strings in translations.items():
            filename = f"{tool_id}-{lang_code}.html"
            filepath = os.path.join(base_dir, filename)
            html = generate_html(tool_id, lang_code, strings)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(html)
            count += 1
            print(f"Created: {filename}")
    
    print(f"\\nTotal files created: {count}")

if __name__ == '__main__':
    main()
