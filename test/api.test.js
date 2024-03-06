/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const axios = require('axios');

async function apiGet() {
    const res = await fetch(`https://api.magicthegathering.io/v1/cards`)
    const data = await res.json();
    const limitData = data.cards.slice(0, 1)
    return {cards: limitData}
}

const loadPromisse = async () => {
  const [cards] = await Promise.all([
    apiGet(),
  ]);
  checkId(cards.cards);
  return cards.cards;
};

const loadPromisseInfo = async () => {
    const [cards] = await Promise.all([
      apiGet(),
    ]);
    
    return String(checkId(cards.cards));
};

loadPromisseInfo();

function checkId(cards) {
  return cards.map((cartas) => {
    return cartas.id
  });
}

describe('Testa se a api está sendo corretamente declarada e se as informações estão sendo puxadas corretamente', () => {
  test('Verifica se a requisação foi feita corretamente', async () => {
    const api = await loadPromisse();
    expect(api).toBeDefined();
  });
  test('Verifica se obtem os dados corretamente', async () => {
    const datas = loadPromisseInfo();
    expect(datas).toBe("5f8287b1-5bb6-5f4c-ad17-316a40d5bb0c");
  });
});
