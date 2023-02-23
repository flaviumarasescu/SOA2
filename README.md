# TODO Documentation

Todo app


This project is a microservices-based application that uses React on the frontend and Express on the backend. The application exposes REST services and uses RabbitMQ for communication between services. The system uses an ingress load balancer to define routing rules. Additionally, the project uses a microfrontend architecture based on Webpack Module Federation. It also includes an integration with SendGrid API to enable email sending. Finally, it uses Docker and Kubernetes to deploy the services.

The architecture of the system is based on a web server that exposes REST services. The server uses Express.js to handle incoming requests and communicates with microservices using RabbitMQ. The architecture is event-based, using async communications. This application also follows the database per service pattern

The web app is written in React and consumes the REST services provided by the web server. The web app uses a microfrontend architecture based on Webpack Module Federation. This architecture enables the application to be composed of multiple smaller applications that are loaded dynamically at runtime.

To enable communication between services, the web server implements a publish-subscribe model using RabbitMQ.

The web server is integrated with the SendGrid API to enable email sending. The integration is implemented using the official SendGrid Node.js library. The web server exposes a REST endpoint that receives email data and sends it to the SendGrid API.

The project is deployed using Docker and Kubernetes. The Kubernetes deployment includes a load balancer that is implemented using an ingress controller. The ingress controller is configured with routing rules that map URLs to the appropriate services.

This project provides a scalable and secure architecture for building web applications with microservices and microfrontend architectures. The use of Docker and Kubernetes enables easy deployment and management of the system. The integration with SendGrid provides a straightforward way to send emails, and the use of RabbitMQ enables real-time communication between services. The microfrontend architecture based on Webpack Module Federation allows for flexibility and ease of maintenance of the application.
