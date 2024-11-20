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
};

describe("Testeando la clase Activity y la clase Repository", () => {

    it("debe crear una actividad con los datos proporcionados", () => {
        const activityRepository = new Repository();
        const activity = activityRepository.createActivity("Actividad 1", "Descripción de la actividad 1", "https://example.com/image1.jpg");
        expect(activity.id).toBe(1);
        expect(activity.title).toBe("Actividad 1");
        expect(activity.description).toBe("Descripción de la actividad 1");
        expect(activity.imageUrl).toBe("https://example.com/image1.jpg");
    })

    it("debe actualizar una actividad existente con los datos proporcionados", () => {
        const activityRepository = new Repository();
        const activity = activityRepository.createActivity("Actividad 1", "Descripción de la actividad 1", "https://example.com/image1.jpg");
        activityRepository.updateActivity(activity.id, { title: "Actividad 1 Actualizada" });
        const updateActivity = activityRepository.getAllActivities().find(activity => activity.id === activity.id);
        expect(updateActivity.title).toBe("Actividad 1 Actualizada");
    })

    it("debe eliminar una actividad existente", () => {
        const activityRepository = new Repository();
        const activity = activityRepository.createActivity("Actividad 1", "Descripción de la actividad 1", "https://example.com/image1.jpg");
        activityRepository.deleteActivity(activity.id);
        expect(activityRepository.getAllActivities().length).toBe(0);
    })

    it("debe devolver todas las actividades existentes", () => {
        const activityRepository = new Repository();
        activityRepository.createActivity("Actividad 1", "Descripción de la actividad 1", "https://example.com/image1.jpg");
        activityRepository.createActivity("Actividad 2", "Descripción de la actividad 2", "https://example.com/image2.jpg");
        expect(activityRepository.getAllActivities().length).toBe(2);
    })

    it("debe incrementar el ID de la actividad una vez creada", () => {
        const activityRepository = new Repository();
        const activity = activityRepository.createActivity("Actividad 1", "Descripción de la actividad 1", "https://example.com/image1.jpg");
        expect(activity.id).toBe(1);
    })
});