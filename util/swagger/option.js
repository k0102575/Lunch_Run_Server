var swaggerDefinition = {
  info: {
    title: 'Lunch_run',
    version: '1.0.0',
    description: 'Lunch Run Project',
  },
  components: {},
  host: '54.180.89.60',
  basePath: '/'
}

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./util/swagger/doc.yaml'],
}

module.exports = options
