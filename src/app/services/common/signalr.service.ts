import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor() {}

  private _connection: HubConnection;

  get connection(): HubConnection {
    return this._connection;
  }

  // başlatılmış bir hub verecek fonksiyon
  start(hubUrl: string) {
    if (
      !this.connection ||
      this._connection?.state == HubConnectionState.Disconnected
    ) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection: HubConnection = builder
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();
      hubConnection
        .start()
        .then(() => console.log('connected'))
        .catch((error) => setTimeout(() => this.start(hubUrl), 2000));
      this._connection = hubConnection;
    }
    this._connection.onreconnected((connectionId) =>
      console.log('reconnected')
    );
    this._connection.onreconnecting((error) => console.log('reconnecting'));
    this._connection.onclose((error) => console.log('close reconnection'));
  }

  // signalr üzerinden diğeri clientler'a mesaj gönderme fonksiyonu
  invoke(
    procedureName: string,
    message: any,
    successCallBack?: (value) => void,
    errorCallBack?: (error) => void
  ) {
    this.connection
      .invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  // server'dan gelecek olan anlık mesajları yakalayan fonksiyon
  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
