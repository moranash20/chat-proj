import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IChatRoom, IMessage } from 'src/app/models';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public rooms$: Observable<Array<IChatRoom>>;
  public messages$: Observable<Array<IMessage>>;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.rooms$ = chatService.getRooms();
    const roomId: string = activatedRoute.snapshot.url[1].path;

    this.messages$ = this.chatService.getRoomMessages(roomId);
    console.log('roomId', roomId);
    this.subscription.add(
      router.events
        .pipe(filter((data: any) => data instanceof NavigationEnd))
        .subscribe((data) => {
          const routEvent: RouterEvent = data as RouterEvent;
          const urlArray = routEvent.url.split('/');
          if (urlArray.length > 2) {
            this.messages$ = this.chatService.getRoomMessages(urlArray[2]);
          }
        })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
