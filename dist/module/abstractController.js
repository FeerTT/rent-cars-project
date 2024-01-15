export default class AbstractController {
    constructor() {
        if (new.target === AbstractController) {
            throw new Error('Cannot instantiate abstract class.');
        }
    }
}
//# sourceMappingURL=abstractController.js.map