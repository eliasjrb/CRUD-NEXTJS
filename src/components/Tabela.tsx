import Cliente from '../core/Cliente'
import { IconeEditar, IconeExcluir } from '../icons'

interface TabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void
    clienteExcluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.clienteSelecionado || props.clienteExcluido


    function renderizarCabecalho() {
        return (
            <tr className="">
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {exibirAcoes ? <th className="text-center p-4">Acões</th> : false}
            </tr>
        )
    }

    function renderizarAcoes(cliente: Cliente) {
        return (
            <th className="flex justify-center items-center">
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} className={`text-green-600 rounded-full p-2 m-1 hover:bg-purple-50`}>
                        {IconeEditar}
                    </button>
                ) : false}
                {props.clienteExcluido ? (
                    <button onClick={() => props.clienteExcluido?.(cliente)} className={`text-red-500 rounded-full p-2 m-1 hover:bg-purple-50`}>
                        {IconeExcluir}
                    </button>
                ) : false}
            </th>
        )
    }

    function renderizarDados() {
        return props.clientes?.map((cliente, i) => {
            const zebraTabela = i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'
            return (
                <tr key={cliente.id} className={`${zebraTabela}`}>
                    <th className="text-left p-4">{cliente.id}</th>
                    <th className="text-left p-4">{cliente.nome}</th>
                    <th className="text-left p-4">{cliente.idade}</th>
                    {exibirAcoes ? renderizarAcoes(cliente) : false}
                </tr>
            )
        })
    }

    return (
        <div>
            <table className={`w-full rounded-lg overflow-hidden`}>
                <thead className={`bg-gradient-to-r from-purple-500 to-purple-800
                    text-gray-100
                `}>
                    {renderizarCabecalho()}
                </thead>
                <tbody className={``}>
                    {renderizarDados()}
                </tbody>
            </table>
        </div>
    )
}