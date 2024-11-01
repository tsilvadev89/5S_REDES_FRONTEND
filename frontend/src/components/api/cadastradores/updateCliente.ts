import { URI } from "../enuns/uri";
import Update from "./update";


class UpdateCliente implements Update {
    update(objeto: Object): void {
        fetch(URI.EDITAR_CLIENTE, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        })
    }

}
export default UpdateCliente