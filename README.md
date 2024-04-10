# Ticketing App

### Description:

This is a full-stack app for creating and booking tickets. The application allows users to create an account, log in, create tickets, and purchase tickets using the Stripe API. Although the application's business logic is simple, it is based on a microservices architecture. On the backend side, it uses TypeScript with ts-node and MongoDB as the database (this applies to all services). Testing is done with ts-jest. Inter-service communication is achieved using Node-Nats Streaming. All these services share common core functionalities, which are separately deployed as a common package in npm. The application includes a sample frontend built with Next.js.

The entire application environment is deployed on Kubernetes, with two stages: development on a local environment leveraging Minikube, and production with a load balancer configuration on Digital Ocean. The production stage is currently unavailable, but it is possible to run the application on the development stage in a local environment, but that is requiring some installations.

There are some prerequisites: **Minikube v1.32.0** and **Skaffold v2.11.0 (Optional)**. Additionally, since the application includes order payment functionality utilizing the Stripe API, the payment microservice requires a [Stripe account](dashboard.stripe.com).

Minikube is a single-node Kubernetes environment perfect for development. Skaffold, though optional, provides a useful tool for watching and applying changes on all services in real-time. It can be easily installed from the [official website](skaffold.dev). Alternatively, deployments can be run with kubectl. Here are the steps:

### Installation:

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the Directory:**
   ```bash
   cd <repository_dir>
   ```

3. **Run Minikube Cluster:**
   ```bash
   minikube start
   ```
   
4. **Enable ingress in cluster:**
   ```bash
   minikube addons enable ingress
   ```
   
5. **Add sample domain name in hosts list:**
   ```bash
   echo "192.168.49.2 ticketing.dev" | sudo tee -a /etc/hosts
   #PLEASE NOTE: This command is intended for use in a Linux environment. The IP address specified in the command  corresponds to the Kubernetes cluster's IP address, which must be replaced with the IP address of the Minikube  instance in the current local environment. This can be obtained using the command `minikube ip`.
   ```
   
6. **Create a secret for JSON Web Token (JWT):**
   ```bash
   kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=[secret]
   ```
   
7. **Create a secret for Stripe key (stripe_secret_key):**
    ```bash
    kubectl create secret generic stripe-secret  --from-literal=STRIPE_KEY=[STRIPE_SECRET_KEY]
    ```
    
8. **Configure cluster:**
    ```bash
    #Run Skaffold in root directory:
    skaffold dev
    #OR
    #Apply kubernetes deployments files:
    kubectl apply -f ./infra/k8s && kubectl apply -f ./infra/k8s-dev
    ```
    
The 8th command will deploy the entire infrastructure in Kubernetes. During the initial deployment, it might not work immediately because the components/services will be deployed asynchronously. If the cluster was started using Skaffold, it needs to be rerun. If it was started using kubectl, the pods can be restarted either with kubectl or from the Minikube dashboard, which can be opened by running the command `minikube dashboard`. After this setup, the application can be accessed in a web browser using the address http://ticketing.dev . Please note that the protocol is HTTP, so the browser might ask for permission to open it.
When purchasing a ticket, the application will request bank card details, for which you can use the Stripe test card details available at https://docs.stripe.com/testing.

Currently all microservices are in this repository for keeping them in single place.

![Infrastructure Schema](/assets/diagram.jpg "Infrastructure Schema")

###
### Repository Structure:
###
| Folder     | Content/Description |
| ---------- | ------------------- |
|    auth    | Microservice for user account manipulations, while it issues JWT tokens, each microservice can independently verify and authorize these tokens, as this functionality is common across all services. |
|   client   | Next.js application providing a simple interface for managing frontend functionalities. |
|   common   | Includes common functionalities for all microservices, such as authorization, error handling, request validation middlewares, base classes for handling messaging from NATS, etc. It is deployed on npm as "@freddycruger/common" 😊  and is utilized in microservices as a separate npm package. |
| expiration | The microservice handles the logic for ticket reservation functionality. |
|   infra    | It includes Kubernetes infrastructure files. |
|   orders   | The microservice is responsible for creating orders for ticket payments. |
|  payments  | The microservice is responsible for handling payments. |
|  tickets   | Manages ticket functionality. |
| .github/workflows | CI/CD configurations for a production-like setup are implemented using GitHub Actions and DigitalOcean. |
