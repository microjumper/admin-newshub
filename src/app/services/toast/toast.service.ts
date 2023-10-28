import { Injectable } from '@angular/core';

import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {}

  showSuccess(message: string = "Request completed") {
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string = "An error occurred") {
    this.messageService.clear();
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
