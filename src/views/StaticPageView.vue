<template>
  <body>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="@/assets/imageP.png" alt="Logo" style="width: 110px; height: 70px;">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="Home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Historique">Historique</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="propos">Qui somme nous</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contactNous">Contacter nous</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/login" @click="deconnecter()">Déconnexion</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Profil">
              <img class="profile-image" style="width: 40px;height: 40px;    margin-top: -10px;" src="https://previews.123rf.com/images/mialima/mialima1603/mialima160300025/55096766-ic%C3%B4ne-d-utilisateur-homme-isol%C3%A9-sur-un-fond-blanc-compte-avatar-pour-le-web-utilisateur-photo-de.jpg" alt="Photo de profil">
            </a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="logo">
      <img src="@/assets/image.png" alt="Logo"> <!-- Replace with your logo image -->
    </div>
    <h1>À propos de ThéTipTop</h1>
    <p>Située au cœur de Paris, au 18 rue Léon Frot, 75011, ThéTipTop est bien plus qu'une simple société. Nous sommes une famille dédiée à la célébration de la culture du thé, avec un engagement sans faille pour la qualité, l'authenticité et la créativité.</p>

    <h2>Notre Histoire</h2>
    <p>Fondée par Mr. Eric Bourdon, notre entreprise a rapidement grandi pour devenir l'un des noms les plus reconnus dans le domaine du thé de qualité. Notre passion se reflète dans chaque tasse de thé que nous servons. Grâce à nos mélanges signatures, nous avons su toucher les palais des amateurs de thé du monde entier. Aujourd'hui, nous sommes fiers de célébrer l'ouverture de notre 10ème boutique à Nice.</p>

    <h2>Notre Engagement</h2>
    <p>Tous nos thés sont bios et faits à la main. Cela signifie que chaque tasse que vous dégustez est le fruit d'une sélection rigoureuse et d'un dévouement à l'artisanat. Du thé blanc délicat au thé légumes revigorant, en passant par les infusions douces, chaque produit est le reflet de notre amour pour cette boisson ancienne.</p>

    <h2>Notre Vision</h2>
    <p>Au-delà de la simple boisson, le thé est une expérience, un voyage pour les sens. Chez ThéTipTop, nous rêvons d'un monde où chaque tasse de thé est une invitation à la découverte, à la relaxation et au bien-être.</p>
  </div>
  </body>
</template>

<script setup lang="ts">
function deconnecter(){
  localStorage.removeItem('user');
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
  background-image: url('https://thumbs.dreamstime.com/b/spring-summer-season-abstract-nature-background-grass-blue-sky-back-49716369.jpg'); /* Replace with your background image */
  background-size: cover;
  background-position: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: block;
  text-align: center;
  margin-bottom: 20px;
}

.logo img {
  width: 100px; /* Adjust the width as needed */
  height: auto;
}

h1 {
  color: #333;
}

p {
  color: #666;
  line-height: 1.6;
}
</style>