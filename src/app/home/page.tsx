"use client";

import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);

  if (page === 1)
    return (
      <div>
        <h1 className="mb-4">Server State / Asynchronous State</h1>

        <article className="flex flex-col gap-8">
          <p>
            Quando fazemos uma requisição a API, estamos tirando uma
            snapshot(foto) do estado do servidor naquele momento.
          </p>

          <p>Nesse processo precisamos dar o feedback visual para o usuário.</p>

          <p>
            Assim que carregamos essa informação do servidor, salvamos ela no
            estado local ou global do cliente, e mostramos para o usuário.
          </p>

          <p>
            Mas ae surge algumas perguntas:{" "}
            <ul>
              <li> E se quisermos mostrar uma versão cacheada? </li>
              <li> E se quisermos atualizar de tempo em tempo?</li>
              <li>
                E se quisermos atualize programaticamente(clique de um botao)?
              </li>
            </ul>
          </p>
        </article>

        <button className="ml-auto mt-4 flex" onClick={() => setPage(2)}>
          Next
        </button>
      </div>
    );
  return (
    <div>
      <button
        onClick={() => {
          setPage(1);
        }}
      >
        Voltar
      </button>
      <h1>Entre React Query</h1>

      <article className="mt-4">
        <p>
          O React Query é uma biblioteca que nos ajuda a gerenciar o SERVER
          STATE/ asynchronous state.
        </p>

        <p className="mt-6">Venha comigo ver alguns exemplos</p>

        <ol className="my-8 flex flex-col gap-8">
          <li>
            O primeiro exemplo será para mostrar uma lista de items, que poder
            ser filtrada, nela assim que alguma chave mudar, o react query
            automaticamente ja vai começar a buscar o novo dado, sem precisar de
            uso de useEffects.
            <button
              className="block"
              onClick={() => {
                window.open("/react-query/example-1");
                window.open("/without-react-query/example-1");
              }}
            >
              Exemplo 1 - Lista de Items
            </button>
          </li>

          <li>
            Segundo exemplo é mostrando que vc pode chamar o mesmo hook em
            múltiplos lugares ao mesmo tempo, ele nao ira fazer múltipla
            requisições
            <button
              className="block"
              onClick={() => {
                window.open("/react-query/example-2");
                window.open("/without-react-query/example-2");
              }}
            >
              Exemplo 2 - Múltiplos Hooks
            </button>
          </li>

          <li>
            Terceiro exemplo - ESTADO GLOBAl, o tradicional seta quando o App
            mounta, e depois vc pode usar em qualquer lugar
            <button className="block" onClick={() => window.open("/")}>
              Exemplo 3 - Estado Global
            </button>
          </li>
        </ol>
      </article>
    </div>
  );
}
