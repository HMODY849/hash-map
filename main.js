class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  // دالة التحقق من الحدود
  _checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  // الدالة المسؤولة عن توليد Hash Code
  hash(key) {
    if (typeof key !== "string") {
      throw new Error("Keys must be strings");
    }

    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  // التحقق من الحاجة إلى التوسّع
  _shouldGrow() {
    return this.size / this.capacity >= this.loadFactor;
  }

  // مضاعفة عدد الـ buckets
  _grow() {
    const oldBuckets = this.buckets;

    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // وضع قيمة داخل الـ HashMap
  set(key, value) {
    const index = this.hash(key);
    this._checkBounds(index);

    const bucket = this.buckets[index];

    // هل المفتاح موجود مسبقًا؟ → عدّل القيمة فقط
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // update
        return;
      }
    }

    // إدخال عنصر جديد
    bucket.push([key, value]);
    this.size++;

    if (this._shouldGrow()) {
      this._grow();
    }
  }

  // الحصول على قيمة عبر key
  get(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    const bucket = this.buckets[index];
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  // هل المفتاح موجود؟
  has(key) {
    return this.get(key) !== null;
  }

  // حذف عنصر
  remove(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  // عدد العناصر
  length() {
    return this.size;
  }

  // مسح الخريطة بالكامل
  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  // إرجاع جميع المفاتيح
  keys() {
    const arr = [];
    for (const bucket of this.buckets) {
      for (const [k] of bucket) {
        arr.push(k);
      }
    }
    return arr;
  }

  // إرجاع جميع القيم
  values() {
    const arr = [];
    for (const bucket of this.buckets) {
      for (const [, v] of bucket) {
        arr.push(v);
      }
    }
    return arr;
  }

  // إرجاع جميع الأزواج key/value
  entries() {
    const arr = [];
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        arr.push(pair);
      }
    }
    return arr;
  }
}

const test = new HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')

console.log("Length before expand:", test.length());
console.log("GET banana:", test.get('banana'));

console.log("ALL KEYS:", test.keys());
console.log("ALL VALUES:", test.values());
console.log("ALL ENTRIES:", test.entries());