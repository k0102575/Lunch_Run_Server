import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Lunch_run',
    version: '1.0.0',
    description: 'Lunch Run Project',
  },
  components: {},
  host: '54.180.89.60',
  basePath: '/'
}

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./src/util/swagger/doc.yaml'],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
