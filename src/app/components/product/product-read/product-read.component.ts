import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.read().subscribe(products => {
      this.products = products;
    } )
  }

  openConfirmDialog(productId: number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: '180px',
      data: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja excluir este produto?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        console.log('produto excluido ->', productId);
        this.productService.delete(productId).subscribe(() => {
          this.getProducts();
          this.productService.showMessage('Produto excluído com sucesso');
        });
      }
    });
  }

}
