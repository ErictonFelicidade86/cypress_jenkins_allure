FROM cypress/included:13.6.0

WORKDIR /cypress-automation

COPY package*.json ./
RUN npm ci

COPY . .

ENTRYPOINT ["npx", "cypress", "run"]
