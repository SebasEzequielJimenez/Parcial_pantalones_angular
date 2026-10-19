import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrousersService } from '../../data-access/trouser.services';
import { Trouser } from '../../data-access/trouser';
import { FormularioComponent } from '../form/form';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [FormularioComponent],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(TrousersService);

  pantalon = signal<Trouser | null>(null);
  modoEdicion = signal<boolean>(false);

  mostrarModalConfirmacion = signal<boolean>(false);
  mensajeErrorModal = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getById(id).subscribe({
        next: (data) => this.pantalon.set(data),
        error: () => {
          this.mensajeErrorModal.set(`No se encontró ningún pantalón con el ID "${id}".`);
        }
      });
    }
  }

  toggleEditar(): void {
    this.modoEdicion.update((v) => !v);
  }

  onActualizado(actualizado: Trouser): void {
    this.pantalon.set(actualizado);
    this.modoEdicion.set(false);
  }

  solicitarBorrado(): void {
    this.mostrarModalConfirmacion.set(true);
  }

  cancelarBorrado(): void {
    this.mostrarModalConfirmacion.set(false);
  }

  confirmarBorrado(id: string): void {
    this.service.delete(id).subscribe(() => {
      this.mostrarModalConfirmacion.set(false);
      this.router.navigate(['/catalogo']);
    });
  }

  cerrarErrorYRedirigir(): void {
    this.mensajeErrorModal.set(null);
    this.router.navigate(['/catalogo']);
  }
}