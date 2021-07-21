import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chat-room';

  constructor(private authService: AuthService) {}

  public signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
