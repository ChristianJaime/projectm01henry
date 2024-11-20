class Activity {
    constructor(id, title, description, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }
};

class Repository {
    constructor() {
        this.activities = [];
        this.nextId = 1;
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imageUrl) {
        const activity = new Activity(this.nextId++, title, description, imageUrl);
        this.activities.push(activity);
        return activity;
    }

    updateActivity(id, updatedData) {
        const activityIndex = this.activities.findIndex(activity => activity.id === id);
        if (activityIndex !== -1) {
            this.activities[activityIndex] = { ...this.activities[activityIndex], ...updatedData };
        }
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

const activityRepository = new Repository();
console.log(activityRepository.getAllActivities());

function createActivity(activity) {
    const {title, description, imageUrl} = activity;

    const activityCard = document.createElement("div");
    const activityTitle = document.createElement("h3");
    const activityDescription = document.createElement("p");
    const activityImage = document.createElement("img");
    const deleteButton = document.createElement("button");

    activityTitle.innerHTML = title;
    activityDescription.innerHTML = description;
    activityImage.src = imageUrl;
    activityImage.alt = title;
    deleteButton.innerHTML = "Eliminar";

    activityCard.classList.add("activity-card");
    activityTitle.classList.add("activity-title");
    activityDescription.classList.add("activity-description");
    activityImage.classList.add("activity-image");
    deleteButton.classList.add("delete-button");

    activityCard.appendChild(activityTitle);
    activityCard.appendChild(activityDescription);
    activityCard.appendChild(activityImage);
    activityCard.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        deleteActivity(activity.id);
    }) 

    return activityCard;
}
console.log(createActivity({title: "Correr", description: "Mejorar mis habilidades de correr", imageUrl: "https://media.revistagq.com/photos/641c645781245672268fff7a/1:1/w_3747,h_3747,c_limit/1036780592"}));

function renderActivities() {
    const activitiesContainer = document.getElementById("activities-container");
    activitiesContainer.innerHTML = "";

    const activities = activityRepository.getAllActivities();

    const activityCards = activities.map(createActivity);

    activityCards.forEach(activityCard => {
        activitiesContainer.appendChild(activityCard);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const imageUrlInput = document.getElementById("imageUrl");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const imageUrl = imageUrlInput.value.trim();

   if (!title || !description || !imageUrl) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const activity = activityRepository.createActivity(title, description, imageUrl);

    console.log("Actividad creada:", activity);
    
    titleInput.value = "";
    descriptionInput.value = "";
    imageUrlInput.value = "";

    renderActivities();
}

const addButton = document.getElementById("add-activity");
addButton.addEventListener("click", handleFormSubmit);

function deleteActivity(activityId) {
    activityRepository.deleteActivity(activityId);
    renderActivities();
}

function toggleMenu() {
    console.log("Icono de menú clickeado");
    document.querySelector("header").classList.toggle("menu-active");
}





