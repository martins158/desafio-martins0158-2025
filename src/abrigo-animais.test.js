import { AbrigoAnimais } from "./abrigo-animais";

describe("AbrigoAnimais.encontraPessoas", () => {
  const svc = new AbrigoAnimais();

  test("caso básico do README: 'Rex,Fofo'", () => {
    const res = svc.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(res.erro).toBeFalsy();
    expect(res.lista).toEqual(['Fofo - abrigo', 'Rex - pessoa 1']);
  });

  test("animal inválido deve retornar erro", () => {
    const res = svc.encontraPessoas('CAIXA,RATO','RATO,BOLA', 'Lulu');
    expect(res).toEqual({ erro: 'Animal inválido' });
  });

  test("brinquedo inválido ou duplicado deve retornar erro", () => {
    const res1 = svc.encontraPessoas('RATO,RATO', 'RATO,BOLA', 'Rex');
    expect(res1).toEqual({ erro: 'Brinquedo inválido' });
    const res2 = svc.encontraPessoas('RATO,FOGAO', 'RATO,BOLA', 'Rex');
    expect(res2).toEqual({ erro: 'Brinquedo inválido' });
  });

  test("se ambos qualificam, vai para o abrigo", () => {
    const res = svc.encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(res.erro).toBeFalsy();
    expect(res.lista).toEqual(['Rex - abrigo']);
  });

  test("limite de 3 animais por pessoa (excede -> abrigo se outro não qualifica)", () => {
    const res = svc.encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,LASER', // p1 qualifica para Rex, Bola, Zero e Bebe (quatro)
      'RATO', // p2 quase não qualifica para ninguém
      'Rex,Bola,Zero,Bebe'
    );
    // p1 adota Rex, Bola, Zero (3). Bebe deveria ir p1 mas excede, p2 não qualifica -> abrigo
    expect(res.erro).toBeFalsy();
    expect(res.lista.sort()).toEqual(['Bebe - abrigo', 'Bola - pessoa 1', 'Rex - pessoa 1', 'Zero - pessoa 1'].sort());
  });

  test("Loco ignora ordem quando tem companhia na mesma pessoa", () => {
    // p1 já consegue adotar Rex; para Loco, p1 tem os brinquedos porém na ordem errada
    const res = svc.encontraPessoas(
      'RATO,BOLA,RATO,SKATE', // ordem errada p/ Loco (precisa SKATE,RATO), mas p1 adota Rex antes -> libera ignorar ordem
      'SKATE', 
      'Rex,Loco'
    );
    expect(res.erro).toBeFalsy();
    expect(res.lista).toEqual(['Loco - pessoa 1', 'Rex - pessoa 1']);
  });

});
