import { Component, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrousersService } from '../../data-access/trouser.services';
import { Trouser, Size, Cut } from '../../data-access/trouser';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class FormularioComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(TrousersService);
  private readonly router = inject(Router);

  pantalonEditar = input<Trouser | undefined>();
  guardado = output<Trouser>();

  talles: Size[] = ['XS', 'S', 'M', 'L', 'XL'];
  cortes: Cut[] = ['Recto', 'Slim', 'Oxford', 'Skinny', 'Cargo', 'Jogger'];

  form = this.fb.group({
    modelName: ['', Validators.required],
    salePrice: [0, [Validators.required, Validators.min(0)]],
    isInStore: [false],
    size: ['' as Size, Validators.required],
    cut: ['' as Cut, Validators.required],
    notes: ['', [Validators.maxLength(200)]]
  });

  constructor() {
    effect(() => {
      const p = this.pantalonEditar();
      if (p) {
        this.form.patchValue({
          modelName: p.modelName,
          salePrice: p.salePrice,
          isInStore: p.isInStore,
          size: p.size,
          cut: p.cut,
          notes: p.notes || ''
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Casteo explícito y extracción segura del ID
    const payload = this.form.getRawValue() as Omit<Trouser, 'id'>;
    const actual = this.pantalonEditar();
    const id = actual?.id;

    if (id) {
      this.service.update(id, payload).subscribe(updated => {
        this.guardado.emit(updated);
      });
    } else {
      this.service.create(payload).subscribe(() => {
        this.router.navigate(['/catalogo']);
      });
    }
  }

  onReset(): void {
    this.form.reset({
      salePrice: 0,
      isInStore: false
    });
  } }