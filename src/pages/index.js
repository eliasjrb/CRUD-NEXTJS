import Layout from "../components/Layout";
import Tabela from "../components/Tabela"
import Cliente from "../core/Cliente";

export default function Home() {
  const clientes = [
    new Cliente('Ana', 34, '1'),
    new Cliente('Jão', 89, '2'),
    new Cliente('Pedro', 25, '3'),
    new Cliente('Jó', 50, '4'),
  ]

  function clienteSelecionado(cliente){ // perametro era cliente: Cliente conflito com typescript
    console.log(cliente.nome)
  }

  function clienteExcluido(cliente){ // perametro era cliente: Cliente conflito com typescript
    console.log(`cliente excluido ${cliente.nome}`)
  }

  return (
    <div className={`
      flex h-screen justify-center 
      items-center bg-gradient-to-r from-blue-500 to-purple-600
      text-white
    `}>
       <Layout titulo="Cadastro Simples">
         <Tabela clientes={clientes} 
         clienteSelecionado={clienteSelecionado}
         clienteExcluido={clienteExcluido}></Tabela>
       </Layout>
    </div>
  )
}
