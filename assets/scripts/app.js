const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const DEFAULT_MAX_HEALTH_VALUE = 100;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

const enteredValue = prompt("Maximal life for you and monster", '100');

let chosenMaxLife = Number.parseInt(enteredValue);

if (Number.isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = DEFAULT_MAX_HEALTH_VALUE;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true; 

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealh = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealh;
    setPlayerHealth(currentPlayerHealth);
    alert("You would be dead, but bonus life save you");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("you have a draw!");
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;

  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("you cant heal more than your max initial health");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
