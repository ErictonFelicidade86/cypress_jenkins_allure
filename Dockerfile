FROM cypress/included:13.6.0

WORKDIR /cypress-automation

# Instala yarn (não incluso na imagem base cypress/included)
RUN npm install -g yarn

# Copia manifests primeiro para cachear a camada de dependências
# (se package.json e yarn.lock não mudaram, Docker reutiliza o cache)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ENTRYPOINT ["npx", "cypress", "run"]
