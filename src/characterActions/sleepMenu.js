import { useQuestion } from "../services/question/use-question.js";
import { characterInfoDisplay } from "../allMenus/characterInfoDisplay.js";
import { characterActionMenu } from "../allMenus/characterActionMenu.js";

//
// calcula o tempo necessário para preencher energia completamente segundo as regras de negocio
//

const calculateNecessaryTimeForFullEnergy = async (actingCharacter) => {
  let timeForFullEnergy = 0;
  let energyForFull = 32 - actingCharacter.energy;
  let bonus = 0;

  while (energyForFull > 0) {
    timeForFullEnergy += 5000;
    energyForFull -= 4;
    energyForFull -= bonus;
    bonus += 2;
  }

  return timeForFullEnergy;
};

//
// Executa ação de dormir
//

const sleepAction = async (actingCharacter, sleepTime) => {
  for (let i = 0; i < sleepTime; ++i) {
    let waitingDots = ".";
    for (let j = 0; j < i % 3; ++j) {
      waitingDots += ".";
    }
    console.clear();
    console.log(`
### The Cresims ###

${actingCharacter.name} está dormindo${waitingDots}
            
${i} / ${sleepTime}
`);
    actingCharacter.time -= 1000;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.clear();
  console.log(`
### The Cresims
        
${actingCharacter.name} terminou de dormir!
    
${sleepTime} / ${sleepTime}
`);
  let pressEnter = await useQuestion(`Pressione ENTER para continuar...`);
};

//
// Exibe o menu de opções de dormir
//

export const sleepMenu = async (character) => {
  console.clear();
  const actingCharacter = character;
  let sleepTime = 0;
  let warningMessage = ``;
  let sleepMenuRunning = true;

  while (sleepMenuRunning == true) {
    console.clear();
    let input = await useQuestion(`
### The Cresims ###

${await characterInfoDisplay(actingCharacter)}

Quanto tempo você quer dormir?

${warningMessage}

1. Até recuperar toda a energia (${await calculateNecessaryTimeForFullEnergy(
      actingCharacter
    )} ms)
2. 1 ciclo de sono (5000 ms) +4 energia
3. 2 ciclos de sono (10000 ms) +10 energia
4. 3 ciclos de sono (15000 ms) +18 energia
5. 4 ciclos de sono (20000 ms) +28 energia

X. Voltar ao menu de ações

Sua escolha:`);
    input = input.toUpperCase();

    switch (input) {
      case "1":
        sleepMenuRunning = false;
        await sleepAction(
          actingCharacter,
          (await calculateNecessaryTimeForFullEnergy(actingCharacter)) / 1000
        );
        actingCharacter.energy = 32;
        await characterActionMenu(actingCharacter);
        break;

      case "2":
        sleepTime = 5;
        sleepMenuRunning = false;
        await sleepAction(actingCharacter, sleepTime);
        actingCharacter.energy += 4;
        if (actingcharacter.energy > 32) {
          actingCharacter.energy = 32;
        }
        await characterActionMenu(actingCharacter);
        break;

      case "3":
        sleepTime = 10;
        sleepMenuRunning = false;
        await sleepAction(actingCharacter, sleepTime);
        actingCharacter.energy += 10;
        if (actingcharacter.energy > 32) {
          actingCharacter.energy = 32;
        }
        await characterActionMenu(actingCharacter);
        break;

      case "4":
        sleepTime = 15;
        sleepMenuRunning = false;
        await sleepAction(actingCharacter, sleepTime);
        actingCharacter.energy += 18;
        if (actingcharacter.energy > 32) {
          actingCharacter.energy = 32;
        }
        await characterActionMenu(actingCharacter);
        break;

      case "5":
        sleepTime = 20;
        sleepMenuRunning = false;
        await sleepAction(actingCharacter, sleepTime);
        actingCharacter.energy += 28;
        if (actingcharacter.energy > 32) {
          actingCharacter.energy = 32;
        }
        await characterActionMenu(actingCharacter);
        break;

      case "X":
        sleepMenuRunning = false;
        await characterActionMenu(actingCharacter);
        break;
    }
  }
};
