import { Component, ElementRef, OnInit, TRANSLATIONS, ViewChild } from '@angular/core';
import { Categoria } from '../../model/categoria.model';

import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'
import { CategoriaService } from '../../service/categoria';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-catedoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})

export class CategoriaComponent implements OnInit{

  @ViewChild('formularioCategoria') formularioCategoria! :ElementRef;
  @ViewChild(MatPaginator) paginator! :MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;

  categorias: Categoria[] = [];
  categoria: Categoria= { } as Categoria;
  editar: boolean= false;
  idEditar: number | null = null;

  dataSource!: MatTableDataSource<Categoria>;
  mostrarColumas:String[]= [`idCategoria`,`categoria`,`descripcion`,`acciones`];

   constructor(private categoriaService: CategoriaService){}

  ngOnInit(): void {
    this.findAll();
  }


  findAll():void{
    this.categoriaService.findAll().subscribe(data=>{
        //this.clientes=data;


        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort= this.sort;
    });
  }
  save (): void{
    this.categoriaService.save(this.categoria).subscribe(()=>{
      this.categoria= { } as Categoria;
      this.findAll();
    })
  }
  update():void{
    if(this.idEditar !== null){
      this.categoriaService.update(this.idEditar,this.categoria).subscribe(()=>{
        this.categoria = { } as Categoria;
        this.editar= false;
        this.idEditar= null;
        this.findAll(); 
          
        
      })
    }
  }

  delete():void{
    //this.categoriaService.delete(this.cliente.idCategoria).subscribe(()=>{});
     
    Swal.fire({

      title:'¿Desea eliminar el dato?',
      text:'Esta accion no se puede deshacer',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Eliminar',
      confirmButtonColor:'#d33',
      cancelButtonColor:'#3085d6',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.categoriaService.delete(this.categoria.idCategoria).subscribe(()=>{
          this.findAll();
          this.categoria={ } as Categoria;
          Swal.fire('Eliminado','La categoria a sido eliminado','success');

        })
      }else{
       this.categoria={} as Categoria; 
      }


    });
 
  }
    //interccion con la pagina web

    editarCategoria(categoria: Categoria): void {
    this.categoria = { ...categoria };
    this.idEditar = categoria.idCategoria;
    this.editar = true;
 
    setTimeout(() => {
      this.formularioCategoria.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
 
  editarCategoriaCancelar(from: NgForm): void{
    this.categoria = { } as Categoria;
    this.idEditar =  null;
    this.editar = false;
    from.resetForm();
  }
 
  guardar(from: NgForm): void{
    if(this.editar && this.idEditar !==  null){
      this.update();
      from.resetForm();
    }else{
      this.save();
      from.resetForm();
    }
  }
 
  filtro(event: Event){
    const filtro1 =  (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro1.trim().toLocaleLowerCase();
  }
 


}
