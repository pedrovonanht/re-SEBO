export class EntradaInvalidaError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "EntradaInvalidaError";
    }
}
