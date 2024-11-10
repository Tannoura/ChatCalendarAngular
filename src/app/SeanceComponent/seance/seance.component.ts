import { Component, OnInit } from '@angular/core';
import { Seance } from '../../Models/Seance';
import { SeanceService } from '../../Services/seance.service';
@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrl: './seance.component.css'
})
export class SeanceComponent implements OnInit{
seances: Seance[] = [];
  newSeance: Seance = {
    id: 0, // Vous pouvez initialiser l'ID à 0 ou null, selon la logique de votre backend
    startDateTime: '', // Initialisez les autres propriétés selon vos besoins
    endDateTime: '',
    description: ''
  };

  ngOnInit(): void {
    this.getAllSeances();
  }
constructor(private seanceService:SeanceService){}
getAllSeances(): void {
  this.seanceService.getAllSeances()
    .subscribe((seances: Seance[]) => {
      this.seances = seances; // Assignez les séances récupérées à la variable seances
    }, error => {
      console.error('Une erreur s\'est produite lors de la récupération des séances :', error);
    });
}

  addSeance(): void {
    this.seanceService.addSeance(this.newSeance)
      .subscribe((seance: Seance) => {
        console.log('Séance ajoutée avec succès :', seance);
        // Réinitialisez la nouvelle séance pour permettre d'ajouter d'autres séances
        this.newSeance = {
          id: 0,
          startDateTime: '',
          endDateTime: '',
          description: ''
        };
      }, error => {
        console.error('Une erreur s\'est produite lors de l\'ajout de la séance :', error);
      });
  }


}
