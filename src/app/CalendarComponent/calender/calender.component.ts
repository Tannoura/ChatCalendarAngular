import { Component, OnInit,ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { SeanceService } from '../../Services/seance.service';
import { Seance } from '../../Models/Seance';
import moment from 'moment';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent implements OnInit{
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  ngOnInit(): void {
    this.loadSeances();
  }
constructor(private seanceService: SeanceService) { }

  calendarOptions: any = {
    // Spécifiez les plugins à utiliser dans la configuration du calendrier
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth', // Vue initiale du calendrier (mois par défaut)
    events: []
  };
  switchToDayView(): void {
    this.calendarComponent.getApi().changeView('dayGridDay');
  }

  switchToMonthView(): void {
    this.calendarComponent.getApi().changeView('dayGridWeek');
  }

  switchToWeekView(): void {
    this.calendarComponent.getApi().changeView('dayGridMonth');
  }
  generateRandomColor(): string {
    // Générez une couleur aléatoire au format hexadécimal
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  /*
  loadSeances(): void {
    this.seanceService.getAllSeances().subscribe((seances: Seance[]) => {
      // Convertissez les séances en événements du calendrier
      const events = seances.map(seance => {
        const color = this.generateRandomColor(); // Générez une couleur aléatoire

        return {
          //title: seance.description,
          start: seance.startDateTime,
          end: seance.endDateTime,
          color: color // Utilisez la couleur générée

        };
      });

      // Mettez à jour les données du calendrier avec les nouveaux événements
      this.calendarOptions.events = events;
    });
  }

  loadSeances(): void {
    this.seanceService.getAllSeances().subscribe((seances: Seance[]) => {
      // Convertissez les séances en événements du calendrier
      const events = seances.flatMap(seance => {
        const color = this.generateRandomColor(); // Générez une couleur aléatoire

        // Créez un tableau d'événements pour chaque jour entre la date de début et la date de fin
        const startDate = moment(seance.startDateTime);
        const endDate = moment(seance.endDateTime);
        const daysCount = endDate.diff(startDate, 'days') + 1; // Nombre de jours entre les deux dates

        return Array.from({ length: daysCount }, (_, i) => {
          const currentDate = startDate.clone().add(i, 'days');
          return {
            title: seance.description,
            start: currentDate.toISOString(), // Format ISO pour la date
            end: currentDate.toISOString(), // Même date de début et de fin pour un événement quotidien
            color: color // Utilisez la couleur associée à la séance
          };
        });
      });

      // Mettez à jour les données du calendrier avec les nouveaux événements
      this.calendarOptions.events = events;
    });
  }*/

  loadSeances(): void {
    this.seanceService.getAllSeances().subscribe((seances: Seance[]) => {
      const events = seances.flatMap(seance => {
        const color = this.generateRandomColor(); // Générez une couleur aléatoire

        // Créez un tableau d'événements pour chaque jour entre la date de début et la date de fin
        const startDate = moment(seance.startDateTime);
        const endDate = moment(seance.endDateTime);
        const daysCount = endDate.diff(startDate, 'days') + 1;

        return Array.from({ length: daysCount }, (_, i) => {
          const currentDate = startDate.clone().add(i, 'days');
          return {
            title: seance.description,
            start: currentDate.toISOString(),
            end: currentDate.toISOString(),
            color: color // Utilisez la couleur associée à la séance
          };
        });
      });

      this.calendarOptions.events = events;
    });
  }
}
