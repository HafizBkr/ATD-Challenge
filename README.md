# ATD-Challenge
Gestionnaire de Demandes

Ce projet est une application de gestion des demandes qui permet aux utilisateurs de soumettre des demandes et aux administrateurs de les examiner, les approuver ou les rejeter.
Fonctionnalités

    Création de Demandes : Les utilisateurs peuvent soumettre de nouvelles demandes en fournissant un titre et une description.
    Gestion des Demandes : Les administrateurs peuvent consulter, approuver, rejeter ou supprimer les demandes existantes.
    Génération de Documents : Les demandes approuvées sont automatiquement converties en documents PDF.
    Rappels par E-mail : Les utilisateurs reçoivent des rappels par e-mail pour les demandes en attente.
    Authentification : Les utilisateurs doivent s'authentifier pour accéder aux fonctionnalités de gestion des demandes.

Technologies Utilisées

    Node.js : Plateforme JavaScript côté serveur.
    Express.js : Framework web pour Node.js.
    MongoDB : Base de données NoSQL.
    Mongoose : ODM (Object Data Modeling) pour MongoDB.
    JSON Web Tokens (JWT) : Pour l'authentification des utilisateurs.
    nodemailer : Pour l'envoi d'e-mails.
    pdfkit : Pour la génération de documents PDF.
    node-cron : Pour la planification des tâches.

Structure du Projet

    models/ : Contient les modèles de données MongoDB.
    controllers/ : Logique métier pour la gestion des requêtes.
    middlewares/ : Middlewares pour l'authentification et l'autorisation des utilisateurs.
    routes/ : Définition des points de terminaison de l'API.
    tests/ : Tests unitaires pour les fonctionnalités de l'application.
    app.js : Point d'entrée de l'application.
    config/ : Configuration de l'application (variables d'environnement, etc.).
    package.json : Dépendances et scripts de l'application.
    .env : Variables d'environnement sensibles.

Installation

    Clonez ce dépôt sur votre machine locale.
    Assurez-vous que Node.js et MongoDB sont installés sur votre machine.
    Exécutez npm install pour installer les dépendances.
    Créez un fichier .env à la racine du projet et ajoutez-y vos variables d'environnement (consultez .env.example pour le format).
    Exécutez npm start pour démarrer l'application.

Utilisation

    Accédez à http://localhost:3000 dans votre navigateur.
    Inscrivez-vous en tant qu'utilisateur ou connectez-vous en tant qu'administrateur.
    Soumettez de nouvelles demandes ou gérez les demandes existantes selon votre rôle.
    Consultez la console pour les e-mails envoyés et les tâches planifiées.

Tests

Les tests unitaires sont écrits à l'aide de Jest et supertest. Pour exécuter les tests, utilisez la commande npm test.
Contributions



