# Aplicativo de posts Wordpress

Este projeto foi criado para o teste de Front End na iMedicina, ele faz a integração do [Angular v6]() com o [Wordpress](https://wordpress.org). 

#### Este app consegue fazer:
- Listagem de posts
- Editar um post
- Criar um post 
- Excluir um post

### Iniciando as configurações para acesso a Api
#### Iniciando o Wordpress 
  * Este App foi testado com uma versão local instalada do Wordpress, que pode ser baixada [aqui](https://wordpress.org/download/).´

- Extraia o arquivo zipado para a raiz do seu servidor local apache, seja, [XAMPP](https://www.apachefriends.org/pt_br/download.html) ou [WAMPP](http://www.wampserver.com/en/#download-wrapper)

- Crie um banco para seu blog e faça as configurações usuais para que eles esteja em funcionamento em (http://localhost/), documentação explicando como fazer esse [processo](http://www.adamsilva.com.br/programacao/como-instalar-o-wordpress-localhost/).
#### Após instalado, precisamos instalar dois plugins no Wordpress.
 
- [WP REST API](https://br.wordpress.org/plugins/rest-api/) (Que irá dar acesso a Api do Wordpress, que nos retornará os post em formato .JSON)
- [JWT Authentication](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) (Vamos usá-la para autenticar nosso usuário e dar permissão para acessar os endpoints da Api.
  
 Agora precisamos fazer algumas configurações nos arquivos do seu blog para continuar, primeiro habilite os permantelinks no painel de administração do seu Wordpress, após isso terá na raiz do seu blog um arquivo ``.htaccess``, que deverá ter abaixo, não se esqueça de alterar para o domínio do seu site.
 
```sh
  # BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /substitua-pelo-seu-dominio-local/
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /substitua-pelo-seu-dominio-local/index.php [L]
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</IfModule>

# END WordPress
``` 
Após essa etapa, precisamos alaterar o arquivo ``wp-config.php`` você verá algo assim:

```sh
define('DB_NAME', 'sua-base-de-dados');

define('DB_USER', 'root'); <-- Usuário do mySql

define('DB_PASSWORD', '');  <--- Sua senha

define('DB_HOST', 'localhost');
```
Logo abaixo você deverá adicionar essas linhas no neste mesmo arquivo

```sh
define('JWT_AUTH_SECRET_KEY', 'senha-secreta-gerada-pelo-jwt-para-cada-site');
define('JWT_AUTH_CORS_ENABLE', true);
```
Para gerar o key de acesso, vá nesse [link](https://api.wordpress.org/secret-key/1.1/salt/) , e copie a string da segunda linha 
você verá algo assim:

define('AUTH_KEY',         't;TbCr+<0m5}x&<$]5<Ce/RCG3mg5{f.GvS @XV|nWCq=f?Bm@G6r4-N_JPCOz(x');
define('SECURE_AUTH_KEY',  '``gG2t{>j+bA|1+kn|>-`4h&f-I=,WuHaPs)](f@l?4`9kv+DP6q-{G.3dJ[A6*a]l``'); 

copie somente o conteúdo destacado como no <strong>EXEMPLO</strong> acima.
Na raiz deste repositório existe uma pasta <strong>Arquivos-wp</strong> que contém um modelo desses dois arquivos.
Pronto, com estes passos você já pode acessar a Api e receber um token de autenticação.

### Iniciando as configurações para rodar o App
#### Iniciando com o Angular CLI
É indispensável ter instalado o [NodeJs](https://nodejs.org/en/download) em sua máquina para rodar o App.
com este instalado rode o comando:
```sh
npm install -g @angular/cli
```
#### Após instalado execute o App
- Faça um clone deste repositório em uma pasta de sua preferência
- Entre na pasta do App e rode o comando ``npm install`` para instalar todas as dependências que o app precisa
- Rode o comando ``ng serve --open``
- O App abrirá em localhost na porta :4200
<strong> Os estilos o app estão ``.sass``, por este motivo pode ocorrer que o app de errô ao iniciar caso esteja usando um SO Linux, para resolver isso, execute o comando: </strong>
  
```sh
npm rebuild node-sass --force
````
Ele vai forçar a construção do estilo do app. 

Lembrando que o Wordpress tem que estar executando para que o App pegue as credenciais e os arquivos
## Fim


## Respostas do questionário:
#### Quais são os destaques do seu estilo de escrita de código / lógica?
  O código tem uma complexidade intermediária, estou pegando trazendo da Api o token de autenticação, fornecido pelo plugin JWT (Jason Web Token), e credencionando o usuário para que ele posssa alterar os posts, para isso é necessário que ele instale os dois plugins mencionandos acima e faça as configurações necessárias (As configurações são bem simples) e faça o login informando ``ul do site`` ``usuário`` e ``senha``, inicialmente eu pensei em criar um olugin do Wordpress para tal função, mas em uma breve pesquisa pela biblioteca de plugins do Wordpress, vi que existia uma gama enorme dos mesmo, o trabalho era só estudar o funcionamento e o que ele te retornava, e o mais legal é que são bem leves e não atrapalham a renderização do site.
  
#### O que poderia ter sido feito de uma maneira melhor?
Um estudo mais detalhado da documentação do Wp-api, e um planejamento melhor da plataforma do Front, pois inicialmente comecei a desenvolver no Ionic e Cordova, mas tive muitos problemas com a edição de posts e o rich text editor, então tive que recomeçar utilizando o Angular 6 e o Material design do Angular como estilo de pagina.

#### Quaisquer outras notas que julgar relevantes para a avaliação.
O prejeto em si é bem interessante, não deu para fazer tudo que eu planejei no começo por ter tido um atraso de quase quatro dias, por ter que refazer o projeto, resultado de problemas com o Ionic. Gostei da interface, claro que dá para melhorar. Um grande problema é que tenho que entregar sem fazer mais testes. Enfim boa sorte para mim.

