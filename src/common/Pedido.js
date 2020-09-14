import { db } from './Firebase.config';

export default class Pedido {
  #id;
  #folio;
  #urlBase;
  #nombreComercio;
  #fecha;
  #imagen;
  #costo;
  #db;

  constructor(idPedido, nombreComercio, fecha, imagen, costo) {
    this.#urlBase =
      location.host == 'soporte.endomorelia.app'
        ? 'https://back.endomorelia.app/'
        : 'https://endoback.prbs.li/';
    this.#id = idPedido;
    this.#folio = idPedido.slice(-5);
    this.#nombreComercio = nombreComercio;
    this.#fecha = fecha;
    this.#imagen = `${this.#urlBase}${imagen}`;
    this.#costo = costo;
    this.#db = location.host.includes('soporte.endomorelia.app')
      ? 'DLIVERYECPROD'
      : 'DLIVERYEC';
  }

  getPedido() {
    return {
      id: this.#id,
      folio: this.#folio,
      nombreComercio: this.#nombreComercio,
      avatar: this.#imagen,
      hora: this.#fecha,
      fecha: this.#fecha,
      total: this.#costo,
    };
  }

  buscarRepartidor() {
    db.collection(this.#db)
      .doc('DLIVERYEC')
      .collection('Pedidos')
      .doc(this.#id)
      .update({
        status: 'BUSCANDO REPARTIDOR',
      })
      .then(() => {
        console.log('Documento actualizado');
      });
  }
}
