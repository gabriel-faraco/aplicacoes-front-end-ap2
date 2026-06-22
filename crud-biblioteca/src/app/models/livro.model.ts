export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  ano: number;
  preco: number;
  genero: string;
  nPaginas?: number;
}