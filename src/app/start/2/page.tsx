import Link from "next/link";
import { NewTabButton } from "../NewTabButton";

export default function StartPage2() {
  return (
    <div>
      <Link className="text-3xl text-blue-900 underline" href={"/start"}>
        ◀
      </Link>

      <h1 className="mt-4">Entre React Query</h1>

      <article className="mt-4">
        <p>
          O React Query é uma biblioteca que nos ajuda a gerenciar o Server
          State / Async State. Ele encoraja a pattern de{" "}
          <a
            className="text-blue-900 underline"
            href="https://web.dev/stale-while-revalidate/"
            target="_blank"
          >
            stale-while-revalidate
          </a>
          . Bora ver alguns exemplos?
        </p>

        <ol className="my-8 flex flex-col gap-8">
          <li>
            O primeiro exemplo será para mostrar uma lista de items, que poder
            ser filtrada, nela assim que alguma chave mudar, o react query
            automaticamente ja vai começar a buscar o novo dado
            <NewTabButton
              urls={[
                "/react-query/example-1",
                "/without-react-query/example-1",
              ]}
            >
              Exemplo 1 - Lista de Items
            </NewTabButton>
          </li>

          <li>
            Segundo exemplo é mostrando que vc pode chamar o mesmo hook em
            múltiplos lugares ao mesmo tempo, ele nao ira fazer múltipla
            requisições e ira compartilha seu estado (dedupe)
            <NewTabButton
              urls={[
                "/react-query/example-2",
                "/without-react-query/example-2",
              ]}
            >
              Exemplo 2 - Múltiplos Hooks
            </NewTabButton>
          </li>

          <li>
            Terceiro exemplo - ESTADO GLOBAL, o tradicional carrega quando o App
            mounta, e depois use em qualquer lugar
            <NewTabButton urls={["/"]}>Exemplo 3 - Estado Global</NewTabButton>
          </li>

          <li>
            <a href="https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery">
              Paginação infinita (TODO)
            </a>
          </li>
        </ol>
      </article>

      <article>
        <h2 className="mt-8">Vale a pena ler:</h2>

        <ul className="mt-4">
          <li>
            <a
              className="text-blue-900 underline"
              href="https://tanstack.com/query/latest/docs/react/overview"
            >
              Documentação do React Query
            </a>
          </li>
          <li>
            <a
              className="text-blue-900 underline"
              href="https://tkdodo.eu/blog/thinking-in-react-query"
            >
              TKdoko (React Query + React)
            </a>
          </li>
        </ul>
      </article>

      <section className="mt-72">
        <h4>Bonus</h4>
        <section className="mb-4 italic">
          <p>
            Um desenvolvedor vai ao terapeuta e diz que está se sentindo
            desanimado. Ele menciona que a vida no mundo da programação parece
            difícil e imprevisível. Ele se sente perdido em um código complexo,
            onde cada linha é um labirinto, onde as coisas podem mudar a
            qualquer momento. O terapeuta diz: O tratamento é simples. React,
            está na cidade, use o useEffect para tudo, isso vai animá-lo.
          </p>
          <p>
            O desenvolvedor se desfaz em lágrimas e responde: Mas, doutor... Eu
            sou o useEffect. Boa piada! Todo mundo ri. Os tambores ecoam. Fecha
            a cortina. Ele merga em master e quebra produção.
          </p>
        </section>

        <span>🤡🤡🤣🤣 😳👉👈</span>
      </section>
    </div>
  );
}
