// ربط أزرار التالي والسابق
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// جلب العنصر اللي يحتوي على الكروت
const cards = document.querySelector(".card-wrapper");

// عدد الكروت الموجودة داخل السلايدر
const totalCards = cards.children.length;

// جلب مكان النقاط (dots)
const dotsContainer = document.getElementById("dotsContainer");

// المتغير اللي بيحدد مكان الكارت المعروض حاليًا
let index = 0;

// عدد الكروت اللي بتظهر في الشاشة في نفس الوقت
const visibleCards = 3;

// أكبر رقم ممكن يتحرك فيه السلايدر (آخر مجموعة كروت)
const maxIndex = totalCards - visibleCards;

// إنشاء النقاط (dots) على حسب عدد الحركات الممكنة
for (let i = 0; i <= maxIndex; i++) {
  const dot = document.createElement("span"); // عمل نقطة جديدة
  dot.addEventListener("click", () => {
    index = i; // عند الضغط على نقطة، نروح للجزء اللي بيمثلها
    updateSlider(); // نحدث السلايدر
  });
  dotsContainer.appendChild(dot); // نضيف النقطة في الصفحة
}

// بعد ما أنشأنا النقاط، نخزنهم علشان نحدثهم بعدين
const dots = document.querySelectorAll(".dots span");

// تحديث مكان الكروت وإبراز النقطة النشطة
function updateSlider() {
  const cardWidth = cards.children[0].offsetWidth + 40; // عرض الكارت زائد المسافة بين الكروت
  cards.style.transform = `translateX(-${index * cardWidth}px)`; // نحرك السلايدر بناءً على رقم الكارت

  // تحديث مظهر النقاط
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index); // خلي النقطة المناسبة تبقى مفعّلة
  });
}

// لما نضغط على "التالي"
nextBtn.addEventListener("click", () => {
  if (index < maxIndex) {
    index++; // نروح للكارت اللي بعده
  } else {
    index = 0; // لو وصلنا للآخر، نرجع للبداية
  }
  updateSlider(); // نحدث السلايدر
});

// لما نضغط على "السابق"
prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--; // نرجع كارت واحد
  } else {
    index = maxIndex; // لو في البداية، نروح للآخر
  }
  updateSlider(); // نحدث السلايدر
});

// نشغّل السلايدر أول مرة
updateSlider();
