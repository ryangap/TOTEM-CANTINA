const mongoose = require('mongoose');
const MenuItem = require('./models/menuItem'); // Caminho para o modelo

mongoose.connect('mongodb://localhost:27017/menu_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', async () => {
  console.log('Conectado ao MongoDB');

  const categories = ['Bebidas', 'Salgados', 'Lanches', 'Doces', 'Almoço'];
  const data = {
    Bebidas: [
      { name: 'Coca-Cola', description: 'Refrigerante de cola', price: 5 },
      { name: 'Suco de Laranja', description: 'Suco natural', price: 7 }
    ],
    Salgados: [
      { name: 'Coxinha', description: 'Coxinha de frango', price: 4 },
      { name: 'Empada', description: 'Empada de queijo', price: 3 }
    ],
    Lanches: [
      { name: 'Sanduíche', description: 'Sanduíche natural', price: 6 },
      { name: 'Hambúrguer', description: 'Hambúrguer com queijo', price: 8 }
    ],
    Doces: [
      { name: 'Brigadeiro', description: 'Doce de chocolate', price: 2 },
      { name: 'Beijinho', description: 'Doce de coco', price: 2 }
    ],
    Almoço: [
      { name: 'Arroz e Feijão', description: 'Arroz, feijão e bife', price: 10 },
      { name: 'Macarronada', description: 'Macarrão com molho', price: 12 }
    ]
  };

  for (let category of categories) {
    for (let item of data[category]) {
      await MenuItem.create({ ...item, category, available: true });
    }
  }

  console.log('Dados inseridos com sucesso!');
  mongoose.connection.close();
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});
