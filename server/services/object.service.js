const axios = require("axios");

const boom = require("@hapi/boom");

const { models } = require("../libs");

//requirero URL del endpoint
class ObjectService {
  constructor() {}

  async findAPI() {
    const objectRequest = await axios.get();

    const objects = await objectRequest.data.results.map((element) => {
      const object = {
        id: `${element.id}`,
        name: element.title,
        image: element.image,
        types: element.diets.map((el) => ({
          name: el,
        })),
        summary: element.summary,
        score: element.spoonacularScore,
        healthScore: element.healthScore,
        steps: element.analyzedInstructions[0]?.steps.map((el) => `${el.step}`),
      };
      return object;
    });
    return objects;
  }
}
module.exports = ObjectService;
