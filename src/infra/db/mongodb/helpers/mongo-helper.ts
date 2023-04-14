import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },
  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },
 // usada para ter acesso a documentos armazenados no banco
  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.topology) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },

  map: (data:any): any => {
    const {_id: id, ...rest } = data;
    return {...rest, id};
  }
};
