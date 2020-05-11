import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  //此处MessageService的注入必须是public，因为在模板中绑定到它
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
