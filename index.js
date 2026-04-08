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

class Assassin extends Hero {
    constructor(name, gender, multiverse, hp, attack) {
        // เรียก constructor ของ Hero
        super(name, gender, multiverse, hp, attack);
        
        // คุณสมบัติเฉพาะของ Assassin
        this.criticalChance = 0.4; // โอกาส 40% ที่จะโจมตีแรงขึ้น
        this.isHidden = false;     // สถานะพรางตัว
        this.evasionChance = 0.3;  // เพิ่มค่าโอกาสหลบหลีก (0.3 คือ 30%)
    }

    gotattacked(attack) {
        // สุ่มตัวเลข 0 ถึง 1 ถ้าได้น้อยกว่าค่า evasionChance แปลว่าหลบได้
        const isEvaded = Math.random() < this.evasionChance;

        if (isEvaded) {
            console.log(`[EVADE] ${this.name} Barely dodged the attack just in time! (Damage 0)`);
        } else {
            // ถ้าหลบไม่ได้ ให้กลับไปใช้ลอจิกโดนดาเมจเดิมของ Hero (ใช้ super ช่วย)
            super.gotattacked(attack);
        }
    }
    // สกิลเฉพาะ: พรางตัว
    hideInShadows() {
        this.isHidden = true;
        console.log(`${this.name} has vanished into the shadows! (Next attack will be deadly)`);
    }

    // Overriding: ปรับปรุงการโจมตีให้มีการคำนวณ Critical
    attackEnemy(target) {
        let finalDamage = this.attack;
        let isCrit = Math.random() < this.criticalChance;

        if (this.isHidden) {
            finalDamage *= 2.5; // ถ้าพรางตัวอยู่ โจมตีแรงขึ้น 2.5 เท่า
            this.isHidden = false; // โจมตีแล้วหลุดจากสถานะพรางตัว
            console.log("SURPRISE ATTACK!");
        } else if (isCrit) {
            finalDamage *= 1.5; // โจมตีติดคริติคอลปกติแรงขึ้น 1.5 เท่า
            console.log("CRITICAL HIT!");
        }

        console.log(`${this.name} for ${finalDamage} damage!`);

    }

    // ปรับปรุงการแสดงสถานะให้ดูเท่ขึ้น
    statusNow() {
        super.statusNow(); // เรียกใช้การเช็คตาย/เป็นจากคลาสแม่
        if (this.hp > 0 && this.isHidden) {
            console.log(`${this.name} is currently hidden.`);
        }
    }
}
