import { URI } from "../enuns/uri";
import RemovedorRemoto from "./removedorRemoto";

export default class RemovedorCliente {
    public static remover(objeto: { id: number }): void {
      let json = { id: objeto.id };
      fetch(URI.DELETAR_CLIENTE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      });
    }
  }