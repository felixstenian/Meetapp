# Meetapp

<h1>Aplicação</h1>

<p>A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app agregador de eventos para desenvolvedores chamado Meetapp (um acrônimo à Meetup + App).</p>

# Iniciando aplicação

<h3>Autenticação</h3>

> Permita que um usuário se autentique em sua aplicação utilizando e-mail e senha.

- [x] Atenticação JWT
- [x] validação dos dados de entrada

<h3>Cadastro e atualização de usuários</h3>

> Permita que novos usuários se cadastrem em sua aplicação utilizando nome, e-mail e senha. <br>
> Para atualizar a senha, o usuário deve também enviar um campo de confirmação com a mesma senha.

- [x] Criptografia da senho do usuário
- [x] Validação dos dados de entrada

# Continuando aplicação

<h3>Gerenciamento de arquivos</h3>

- [x] Criar uma rota para upload de arquivos que cadastra em uma tabela o caminho e nome do arquivo e retorna todos dados do arquivo cadastrado.

<h3>Gerenciamento de meetups</h3>

- [x] O usuário pode cadastrar meetups na plataforma com título do meetup, descrição, localização, data e hora e imagem (banner). Todos campos são obrigatórios. Adicione também um campo user_id que armazena o ID do usuário que organiza o evento.
- [x] Não deve ser possível cadastrar meetups com datas que já passaram.
- [ ] O usuário também deve poder editar todos dados de meetups que ainda não aconteceram e que ele é organizador.
- [x] Crie uma rota para listar os meetups que são organizados pelo usuário logado.
- [ ] O usuário deve poder cancelar meetups organizados por ele e que ainda não aconteceram. O cancelamento deve deletar o meetup da base de dados.

<h3>Inscrição no meetup</h3>

- [ ] O usuário deve poder se inscrever em meetups que não organiza.
- [ ] O usuário não pode se inscrever em meetups que já aconteceram.
- [ ] O usuário não pode se inscrever no mesmo meetup duas vezes.
- [ ] O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.
- [ ] Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito. O template do e-mail fica por sua conta :)

<h3>Listagem de meetups</h3>

- [ ] Crie uma rota para listar os meetups com filtro por data (não por hora), os resultados dessa listagem devem vir paginados em 10 itens por página. Abaixo tem um exemplo de chamada para a rota de listagem dos meetups: http://localhost:3333/meetups?date=2019-07-01&page=2
  > Nesse exemplo, listaremos a página 2 dos meetups que acontecerão no dia 01 de Julho.
- [ ] Nessa listagem retorne também os dados do organizador.

<h3>Listagem de inscrições</h3>

- [ ] Crie uma rota para listar os meetups em que o usuário logado está inscrito.
- [ ] Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.
