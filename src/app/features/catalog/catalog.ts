import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TrousersService } from '../../data-access/trouser.services';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogoComponent {
  private readonly service = inject(TrousersService);
  private readonly router = inject(Router);

  pantalones = toSignal(this.service.getAll(), { initialValue: [] });

  verMas(id: string): void {
    this.router.navigate(['/detalles', id]);
  }
}
