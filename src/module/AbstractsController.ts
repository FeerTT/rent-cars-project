export default abstract class AbstractController {
    constructor() {
        if (new.target === AbstractController) {
            throw new Error('Cannot instantiate abstract class.');
        }
    }
}