import Link from "next/link";

export default function Page() {
  return (
    <div>
      <article className="mb-8 flex flex-col gap-8">
        <h1 className="mb-4">Server State / Async State</h1>
        <p>
          Quando fazemos uma requisição a API, estamos tirando uma
          snapshot(foto) do estado do servidor naquele momento. Nesse processo
          precisamos dar o feedback visual para o usuário. Como estado de
          isLoading, isError, isFetching, etc
        </p>

        <p>
          Assim que carregamos essa informação do servidor, salvamos ela no
          estado local ou global. Mas ae surge algumas perguntas:
        </p>

        <ul>
          <li> E se quisermos mostrar uma versão cacheada? </li>
          <li> E se quisermos atualizar de tempo em tempo?</li>
          <li>
            E se quisermos atualize programaticamente(clique de um botao)?
          </li>
        </ul>
      </article>

      <Link className="text-3xl text-blue-900 underline" href={"/start/2"}>
        ▶
      </Link>
    </div>
  );
}
