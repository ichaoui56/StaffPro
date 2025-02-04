# StaffPro

## Description du projet
L'application "Gestion des Employés avec Angular" permet de consulter, ajouter, modifier et supprimer des employés. L'objectif est de proposer une interface fluide, modulaire et réactive tout en optimisant les performances grâce à la persistance des données avec localStorage.

## Fonctionnalités principales
- **Gestion des employés** : Ajout, modification, suppression et affichage des employés.
- **Optimisation des performances** : Utilisation de localStorage pour la persistance des données.
- **Interface réactive** : Formulaires et composants modulaires pour une meilleure expérience utilisateur.
- **Tests unitaires** : Validation des composants et services pour garantir leur bon fonctionnement.

## Tâches implémentées
- Création du service `EmployeeService` pour gérer les opérations (CRUD) sur les employés avec stockage local.
- Injection du service dans les composants pour la gestion des employés.
- Implémentation de formulaires réactifs pour l'ajout et la modification des employés avec validations (email valide, champs obligatoires).
- Configuration du routage et implémentation du **lazy loading** pour le module employés.
- Implémentation d'une directive `highlight` pour mettre en surbrillance un employé sélectionné.
- Création d'un **pipe** pour formater la date d’embauche des employés.
- Utilisation d'**Observables** et d'opérateurs RxJS (`map`, `catchError`) pour gérer les flux de données.
- Structure hiérarchique des composants : `EmployeeListComponent` (parent) et `EmployeeCardComponent` (enfant).
- Passage de données entre composants via `@Input` et `@Output`.
- Tests unitaires pour `EmployeeService` et les composants Angular (ajout, modification et affichage des employés).

## Technologies utilisées
- **Angular 18**
- **TypeScript**
- **HTML5 / CSS3**
- **Angular CLI**
- **RxJS (Observables, Opérateurs)**
- **Services et Injection de dépendances**
- **Formulaires réactifs et Template-driven**
- **Routage et Lazy Loading**
- **Directives et Pipes personnalisés**
- **Gestion de l'état via localStorage**
- **Tests unitaires avec Jasmine/Karma**

## Installation et Exécution
### Prérequis
- Node.js (version 14+ recommandée)
- Angular CLI installé globalement (`npm install -g @angular/cli`)

### Installation du projet
```bash
# Cloner le dépôt
git clone https://github.com/ichaoui56/StaffPro.git
cd StaffPro

# Installer les dépendances
npm install
```

### Démarrer l'application
```bash
ng serve
```
L'application sera accessible sur `http://localhost:4200/`.

### Exécution des tests
```bash
ng test
```

## Structure du projet
```plaintext
src/
|-- app/
|   |-- core/
|   |-- feature/
|   |-- shared/
|   |-- app-routing.module.ts
|   |-- app.component.css
|   |-- app.component.html
|   |-- app.component.spec.ts
|   |-- app.component.ts
|   |-- app.module.ts
|-- assets/
|-- environments/
|-- main.ts
```

## Auteur
**Ilyas Chaoui**

## Licence
Ce projet est sous licence MIT.

