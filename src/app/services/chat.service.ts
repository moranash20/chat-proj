import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChatRoom, IMessage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private _db: AngularFirestore) {}

  public getRooms(): Observable<Array<IChatRoom>> {
    return this._db
      .collection('rooms')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const id = snap.payload.doc.id;
            const data: IChatRoom = <IChatRoom>snap.payload.doc.data();
            return <IChatRoom>{
              ...data,
              id,
            };
          });
        })
      );
  }

  public getRoomMessages(roomId: string): Observable<Array<IMessage>> {
    return this._db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .snapshotChanges()
      .pipe(
        map((messages: any[]) => {
          return messages.map((message) => {
            const data: IMessage = <IMessage>message.payload.doc.data();
            return {
              ...data,
              id: message.payload.doc.id,
            };
          });
        })
      );
  }

  public addRoom(roomName: string, userId: string): void {
    this._db.collection('rooms').add({
      roomName,
      createdUserId: userId,
    });
  }

  public sendMessage(userId: string, body: string, roomId: string): void {
    this._db.collection('rooms').doc(roomId).collection('messages').add({
      body,
      userId,
      timestamp: new Date().getTime(),
    });
  }
}
