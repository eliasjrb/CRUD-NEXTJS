import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {

    #conversor: firebase.firestore.FirestoreDataConverter<Cliente> = {
        toFirestore(cliente: Cliente): firebase.firestore.DocumentData {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            };
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options);
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    };

    async salvar(cliente: Cliente): Promise<Cliente> {
        if (cliente?.id) {
            await this.colecao().doc(cliente.id).set(cliente)
            return cliente
        } else {
            const docRef = await this.colecao().add(cliente)
            const doc = await docRef.get()
            const clienteSalvo = doc.data() as Cliente; // Converte o resultado para o tipo Cliente
            return Promise.resolve(clienteSalvo);
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        return this.colecao().doc(cliente.id).delete()
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get();
        const clientes: Cliente[] = [];
    
        await Promise.all(query.docs.map(async (doc) => {
            const cliente = doc.data() as Cliente;
            clientes.push(cliente);
        }));
    
        return clientes;
    }

    private colecao() {
        return firebase
            .firestore()
            .collection('clientes')
            .withConverter(this.#conversor)
        }
}