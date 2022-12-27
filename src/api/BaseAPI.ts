import HTTPTransport from "../utils/HTTPTransport";

export default abstract class BaseAPI {
  protected hhtp: HTTPTransport;

  protected constructor(endpoint: string) {
    this.hhtp = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier: string): Promise<unknown>;

  public abstract update?(identifier: string, ata: unknown): Promise<unknown>;

  public abstract delete?(identifier: number): Promise<unknown>;
}
