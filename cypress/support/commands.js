import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true, verbose: true });

Cypress.Commands.add("validateSchema", (schema, body) => {
  cy.fixture(schema).then((json) => {
    const validate = ajv.compile(json);
    const isValid = validate(body);
    if (!isValid)
      validate.errors.map((err) => {
        console.log(err);
        throw new Error(
          `Propriedade: ${err.instancePath} | Tipo: ${err.keyword} | Messagem: ${err.message}`
        );
      });
  });
});
