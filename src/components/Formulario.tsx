import Entrada from "./Entrada";
import { useState } from "react"
import Cliente from "../core/Cliente"
import Botao from "./Botao";

interface FormularioProps {
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}

const c = new Cliente('Yasmin', 12, '1234')

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)
    return (
        <div>
            {id ? (<Entrada texto="Código" valor={id} somenteLeitura className="mb-4" />) : false}
            <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-4" />
            <Entrada texto="Idade" tipo="number" valorMudou={setIdade} valor={idade} className="mb-4" />
            <div className="flex justify-end">
                <Botao cor="blue" className="mr-2"
                 onClick={() => props.clienteMudou(new Cliente(nome, +idade, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}