# Base image
FROM node:21

# Create app directory
WORKDIR /backend

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy Prisma schema file
COPY prisma/schema.prisma ./prisma/

# Run Prisma commands
RUN npx prisma generate
# RUN npx prisma db push

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:dev"]