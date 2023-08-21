# Étape de construction: Utilisez une image Node pour construire votre application
FROM node:16 as build-stage

WORKDIR /app

# Copier le package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape de production: Servir l'application avec Nginx
FROM nginx:alpine as production-stage

# Copier la configuration Nginx (si vous avez une configuration personnalisée)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers compilés à partir de l'étape de construction
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
