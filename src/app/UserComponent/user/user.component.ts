import { Component } from '@angular/core';
import { User } from '../../Models/User';
import { UserService } from '../../Services/user.service';
import { Image } from '../../Models/Image';
import { ImageService } from '../../Services/ImageService/image.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users: User[] = [];
  images: Image[] = [];

  newUser: User = {
    id: 0, // Vous pouvez initialiser l'ID à 0 ou null, selon la logique de votre backend
    nom: '',
    image: { // Initialiser image avec un objet Image vide
      name: '',
      imageUrl: '',
      imageId: ''
    }// Initialiser l'image selon vos besoins, probablement null si aucune image n'est sélectionnée par défaut
  };

  nom: string = '';
  photo: File | null = null;
  constructor(private userService: UserService,private imageService:ImageService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.fetchImages();

  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }


  addUser(): void {
    if (this.nom && this.photo) {
      this.userService.addUser(this.nom, this.photo).subscribe(
        response => {
          console.log('Utilisateur ajouté avec succès:', response);
          // Réinitialiser les champs après l'ajout
          this.nom = '';
          this.photo = null;
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
      );
    } else {
      console.error('Veuillez saisir un nom et sélectionner une photo.');
    }
  }

  onPhotoSelected(event: any): void {
    this.photo = event.target.files[0];
  }


  // Méthode pour gérer la sélection de l'image par l'utilisateur
  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File | null = (target.files && target.files[0]) || null;

    // Créer un nouvel objet Image avec les données de l'image sélectionnée
    const image: Image = {
      name: file?.name || '',
      imageUrl: '', // Vous pouvez initialiser imageUrl avec une valeur par défaut si nécessaire
      imageId: '' // Vous pouvez initialiser imageId avec une valeur par défaut si nécessaire
    };

    // Attribuer l'objet Image sélectionné à la propriété image du nouvel utilisateur
    this.newUser.image = image;
  }



  fetchImages(): void {
    this.imageService.list().subscribe(
      (images) => {
        this.images = images;
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }


  getUserImage(user: User): Image | null {
    if (user.image && this.images) {
      return this.images.find(image => image.id === user.image.id) || null;
    }
    return null;
  }


}
