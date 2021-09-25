import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import useClientes from "../hooks/useClientes";

export default function Home() {

  const { 
    cliente,
    clientes, 
    novoCliente, 
    salvarCliente, 
    excluirCliente,
    selecionarCliente,
    tabelaVisivel,
    exibirTabela,
    obterTodos
  } = useClientes()

  return (
    <div className={`
      flex h-screen justify-center 
      items-center bg-gradient-to-r from-blue-500 to-purple-600
      text-white
    `}>
      <Layout titulo="Cadastro Simples">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao cor={`green`} onClick={novoCliente} className="mb-4">Novo Cliente</Botao>
            </div>
            <Tabela clientes={clientes}
              clienteSelecionado={selecionarCliente}
              clienteExcluido={excluirCliente}></Tabela>
          </>
        ) :
          (
            <Formulario cliente={cliente}
              clienteMudou={salvarCliente}
              cancelado={exibirTabela}
            />
          )}
      </Layout>
    </div>
  )
}
