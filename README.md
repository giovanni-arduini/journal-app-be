# Journal App Backend 📝

Backend API per un'applicazione di journaling con supporto per upload di immagini tramite Google Cloud Storage.

## 🚀 Funzionalità

- **CRUD completo per i post** del journal
- **Upload sicuro di immagini** tramite signed URLs di Google Cloud Storage
- **Database MongoDB** per la persistenza dei dati
- **API RESTful** con Express.js
- **Configurazione flessibile** per sviluppo locale e deployment

## 📋 Prerequisiti

- **Node.js** (versione 16 o superiore)
- **npm** o **yarn**
- **Account MongoDB Atlas** (o MongoDB locale)
- **Account Google Cloud Platform** con Cloud Storage abilitato

## 🛠️ Installazione

### 1. Clona il repository

```bash
git clone https://github.com/giovanni-arduini/journal-app-be.git
cd journal-app-be
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configurazione delle variabili d'ambiente

Crea un file `.env` nella root del progetto:

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
GCS_BUCKET=nome-del-tuo-bucket
GCS_KEYFILE=./path/to/your/service-account-key.json
```

#### Configurazione MongoDB Atlas:

1. Vai su [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster gratuito
3. Ottieni la connection string
4. Sostituisci `username`, `password` e `database_name` nella `MONGO_URI`

#### Configurazione Google Cloud Storage:

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto o seleziona uno esistente
3. Abilita l'API Cloud Storage
4. Crea un Service Account:
   - IAM & Admin → Service Accounts → Create Service Account
   - Assegna il ruolo "Storage Object Admin"
   - Genera una chiave JSON e scaricala
5. Crea un bucket Cloud Storage
6. Aggiorna le variabili d'ambiente con i tuoi valori

### 4. Avvia il server

```bash
npm start
```

Il server sarà disponibile su `http://localhost:3000`

## 📡 API Endpoints

### Posts

| Metodo   | Endpoint         | Descrizione                |
| -------- | ---------------- | -------------------------- |
| `GET`    | `/api/posts`     | Ottieni tutti i post       |
| `POST`   | `/api/posts`     | Crea un nuovo post         |
| `PUT`    | `/api/posts/:id` | Aggiorna un post esistente |
| `DELETE` | `/api/posts/:id` | Elimina un post            |

### Upload Immagini

| Metodo | Endpoint                                                         | Descrizione                   |
| ------ | ---------------------------------------------------------------- | ----------------------------- |
| `GET`  | `/api/posts/signed-url?filename=nome.jpg&contentType=image/jpeg` | Ottieni URL per upload sicuro |

### Esempio di utilizzo:

#### Creare un nuovo post:

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Il mio primo post",
    "content": "Contenuto del post...",
    "imageUrl": "https://storage.googleapis.com/bucket/image.jpg"
  }'
```

#### Ottenere signed URL per upload:

```bash
curl "http://localhost:3000/api/posts/signed-url?filename=immagine.jpg&contentType=image/jpeg"
```

## 🏗️ Struttura del Progetto

```
journal-app-be/
├── config/
│   └── db.js                 # Configurazione MongoDB
├── controllers/
│   └── postController.js     # Logica dei controller
├── models/
│   └── Post.js              # Schema MongoDB per i post
├── Routes/
│   └── postRoutes.js        # Definizione delle route
├── services/
│   └── gcsService.js        # Servizio Google Cloud Storage
├── .env                     # Variabili d'ambiente (da creare)
├── .gitignore              # File da ignorare in Git
├── package.json            # Dipendenze e script
├── server.js               # Entry point dell'applicazione
└── README.md               # Questo file
```

## 👨‍💻 Autore

**Giovanni Arduini**

- GitHub: [@giovanni-arduini](https://github.com/giovanni-arduini)

---
