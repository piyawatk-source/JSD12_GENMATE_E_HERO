class Hero {
  constructor(name, gender, multiverse, hp, attack) {
    this.name = name;
    this.gender = gender;
    this.multiverse = multiverse;
    this.hp = hp;
    this.attack = attack;
  }
  introduce() {
    console.log(
      `I'm ${this.name}. I'm ${this.gender}. I'm from ${this.multiverse}.`,
    );
  }
  shiftMultiverse(anothermultiverse) {
    console.log(
      `I'm from ${this.multiverse}. Go to ${anothermultiverse} to save the days.`,
    );
  }
  gotattacked(attack) {
    this.hp -= attack;
    console.log(`I got attacked ${attack} hp. I currently have ${this.hp} hp.`);
  }
  statusNow() {
    if (this.hp <= 0) {
      console.log("I'm dead");
    } else {
      console.log(`I'm alive. I currently have ${this.hp} hp. `);
    }
  }
}

///// Magic ////

class Mage extends Hero {
  constructor(name, gender, multiverse, hp, attack, mana) {
    // เรียกใช้ constructor ของ Hero (Base Class)
    super(name, gender, multiverse, hp, attack);
    this.mana = mana; // พลังเวทมนตร์
    this.hasResurrected = false; // ใช้เช็คว่าเคยชุบชีวิตไปหรือยัง (ชุบได้แค่ครั้งเดียว)
  }

  // Mage Specific Trait
  castHeal() {
    if (this.hp > 0) {
      this.hp += 20;
      console.log(
        `${this.name} chants an ancient spell. HP restored to ${this.hp}.`,
      );
    }
  }

  // Override gotattacked เพื่อใส่ Logic การคืนชีพ
  gotattacked(attack) {
    this.hp -= attack;
    console.log(
      `CRITICAL HIT! ${this.name} takes ${attack} damage. (Remaining HP: ${this.hp})`,
    );

    // Logic ชุบชีวิต (Resurrection)
    if (this.hp <= 0 && !this.hasResurrected) {
      console.log(`[System] Warning: Vital signs dropping...`);
      console.log(
        `[Ultimate] The Ray of Light pierces the sky! ${this.name} is reviving...`,
      );
      this.hp = 50; // ฟื้นคืนชีพกลับมามี HP ครึ่งหนึ่ง
      this.hasResurrected = true; // ล็อคไว้ไม่ให้ชุบซ้ำ
      console.log(
        `${this.name} has returned from the void. HP is restored to ${this.hp}.`,
      );
    } else if (this.hp <= 0 && this.hasResurrected) {
      console.log(
        `${this.name} has fallen in battle. There is no magic left to save her.`,
      );
    }
  }
}

// --- DISPLAY / TEST RUN ---

const mage = new Mage("Nami", "Female", "Enchanted Forest", 80, 15, 100);

console.log("--- The Great War Begins ---");
mage.introduce();

console.log("--- Encounter with the Great Enemy: JavaScript");
mage.gotattacked(40); // โดนโจมตีครั้งแรก

console.log("--- Facing a Fatal Blow ---");
mage.gotattacked(100); // โดนโจมตีหนักจน HP หมด (จะ Trigger Resurrection)

console.log("--- The Aftermath ---");
mage.statusNow();

class Fighter extends Hero {
  constructor(name, gender, multiverse, hp, attack) {
    super(name, gender, multiverse, hp, attack);
  }
    buffpower() {
        this.attack *= 2;
        this.hp += 10;
        console.log(`Hehe! Right now I'm buffed. My attack is twice! ${this.attack} attack Are you ready!!`);
        console.log(`I'm stronger now. My hp is ${this.hp}`)
    }
    debuffpower() {
        this.attack /= 2;
        console.log(`Oh no! my superpower has gone to half! just ${this.attack} attack`);
    }
}

