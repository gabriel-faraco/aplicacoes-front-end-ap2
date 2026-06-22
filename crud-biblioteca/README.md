# CrudBiblioteca

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Perguntas e Respostas Conceituais

### Qual é a responsabilidade do componente?

O componente é responsável pela **camada de apresentação** — ou seja, pela interface com o usuário. Ele controla o que é exibido na tela e responde às interações do usuário (cliques, preenchimento de formulários, etc.).

Neste projeto há dois componentes principais:
- `LivroListComponent`: exibe a lista de livros cadastrados e permite excluir registros.
- `LivroFormComponent`: exibe o formulário para cadastrar um novo livro ou editar um existente.

---

### Qual é a responsabilidade do service?

O service (`LivroService`) é responsável pela **comunicação com a API** (back-end). Ele centraliza toda a lógica de acesso a dados — listar, buscar, criar, atualizar e excluir livros — utilizando o `HttpClient` do Angular. Isso mantém os componentes desacoplados da camada de dados.

---

### Para que serve o model?

O model (`Livro`) define a **estrutura (tipagem) dos dados** que trafegam na aplicação. Ele é uma interface TypeScript que garante que todo objeto do tipo `Livro` possua os campos corretos (`titulo`, `autor`, `ano`, `preco`). Isso evita erros de digitação e facilita o desenvolvimento com autocompletar.

```typescript
export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  ano: number;
  preco: number;
}
```

---

### Por que o campo `id` é opcional?

O campo `id` é marcado como opcional (`id?: number`) porque **no momento do cadastro o livro ainda não possui um `id`** — esse valor é gerado automaticamente pelo back-end (neste caso, pelo `json-server`). Ao editar ou excluir, o `id` já existe. Torná-lo opcional permite usar a mesma interface tanto para criar quanto para manipular livros existentes.

---

### Qual método HTTP lista dados?

**GET** — utilizado no método `listar()` e `buscarPorId()` do service.

```typescript
listar(): Observable<Livro[]> {
  return this.http.get<Livro[]>(this.apiUrl);
}
```

---

### Qual método HTTP cadastra dados?

**POST** — utilizado no método `criar()` do service.

```typescript
criar(livro: Livro): Observable<Livro> {
  return this.http.post<Livro>(this.apiUrl, livro);
}
```

---

### Qual método HTTP atualiza dados?

**PUT** — utilizado no método `atualizar()` do service. O `PUT` substitui o recurso completo no servidor.

```typescript
atualizar(id: number, livro: Livro): Observable<Livro> {
  return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
}
```

---

### Qual método HTTP exclui dados?

**DELETE** — utilizado no método `excluir()` do service.

```typescript
excluir(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
```

---

### Para que serve o `router-outlet`?

O `<router-outlet>` é o **ponto de renderização dinâmica das rotas** no Angular. Ele funciona como um espaço reservado no template onde o Angular injeta o componente correspondente à rota atual. No `app.html` deste projeto:

```html
<app-navbar />
<main>
  <router-outlet />
</main>
```

Quando o usuário acessa `/`, o `LivroListComponent` é renderizado dentro do `<router-outlet>`. Quando acessa `/novo` ou `/editar/:id`, o `LivroFormComponent` é renderizado no mesmo lugar.

---

### Por que precisamos usar `.subscribe()`?

Os métodos do `HttpClient` retornam `Observables` — fluxos de dados **assíncronos** que só são **executados quando há um assinante**. O `.subscribe()` é esse assinante: ele inicia a requisição HTTP e define o que fazer quando os dados chegarem (`next`) ou quando ocorrer um erro (`error`).

Sem o `.subscribe()`, a requisição nunca seria disparada.

```typescript
this.livroService.listar().subscribe({
  next: (dados) => { this.livros = dados; },
  error: (erro) => { console.error(erro); }
});
```
