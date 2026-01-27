document.addEventListener('DOMContentLoaded', function() {
  const modals = `
    <!-- Модальне вікно 1 -->
    <div id="modal1" class="modal">
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal('modal1')">
                <i class='bx bx-x'></i>
            </span>
            <div class="modal-cover">
                <div class="placeholder-cover">
                    <img src="/img/banner2.jpg" alt="Обкладинка книги">
                </div>
            </div>
            <div class="modal-body">
                <h2 class="modal-title">Не гасла лампа біля столу</h2>
                
                <ul class="modal-meta">
                  <li>
                    <i class='bx bx-calendar'></i>
                    <span class="meta-label">Дата публікації:</span>
                    <span class="meta-value">2025</span>
                  </li>
                  <li>
                    <i class='bx bx-book-open'></i>
                    <span class="meta-label">Жанр:</span>
                    <span class="meta-value">Сучасна лірика</span>
                  </li>
                  <li>
                    <i class='bx bx-globe'></i>
                    <span class="meta-label">Мова:</span>
                    <span class="meta-value">Українська</span>
                  </li>
                </ul>

                <div class="modal-text">
                    <p>Поетична збірка, що побачила світ у 2025 році. До неї увійшло понад 130 віршів, написаних у найінтенсивніші роки особистого формування, коли думка загострюється, а слово стає способом фіксації часу.</p>
                    <br>
                    <p>Тексти народжувалися у звичних, майже непомітних обставинах — у вечорах, нічних роздумах, паузах між подіями. Вони зберігають внутрішні стани без поспіху та прикрас, залишаючи читачеві простір для власного відчитування.</p>
                    <br>
                    <p>У збірці поєднуються кохання, романтизування життя, філософські спостереження та іронія. Ці мотиви не домінують, а співіснують, створюючи відчуття живого руху думки й емоції.</p>
                </div>
                
                <div class="modal-images">
                    <div class="modal-img">
                        <div class="modal-img-placeholder">
                            <img src="/img/zbirka1.jpg" alt="Обкладинка книги">
                        </div>
                    </div>
                    <div class="modal-img">
                        <div class="modal-img-placeholder">
                            <img src="/img/zbirka2.jpg" alt="Обкладинка книги">
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                  <a href="https://secure.wayforpay.com/payment/sa7a487e7159a" class="modal-buy-btn">
                      <i class='bx bx-cart'></i>
                      Купити фізичний примірник
                  </a>
                  <a href="https://secure.wayforpay.com/payment/s34a1e8cee526" class="modal-secondary-btn">
                      <i class='bx bx-book'></i>
                      Купити електронний примірник
                  </a>
                </div>

            </div>
        </div>
    </div>

    <!-- Модальне вікно 2 -->
    <div id="modal2" class="modal">
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal('modal2')">
                <i class='bx bx-x'></i>
            </span>
            <div class="modal-cover">
                <div class="placeholder-cover">
                    <img src="/img/banner1.jpg" alt="Обкладинка книги">
                </div>
            </div>
            <div class="modal-body">
                <h2 class="modal-title">Зимова історія</h2>
                
                <ul class="modal-meta">
                  <li>
                    <i class='bx bx-calendar'></i>
                    <span class="meta-label">Дата публікації:</span>
                    <span class="meta-value">2026</span>
                  </li>
                  <li>
                    <i class='bx bx-book-open'></i>
                    <span class="meta-label">Жанр:</span>
                    <span class="meta-value">Темне фентезі</span>
                  </li>
                  <li>
                    <i class='bx bx-globe'></i>
                    <span class="meta-label">Мова:</span>
                    <span class="meta-value">Українська | Англійська</span>
                  </li>
                </ul>

                <div class="modal-text">
                    <p>Перший задум цього твору був створений у 2018 році та опублікований під назвою "Різдвяна історія". У 2026 році в початковий текст було внесено значну кількість змін. Світ заграв новими фарбами. Розповсюджується безкоштовно.</p>
                    <br>
                    <p>У центрі історії — принцеса, приречена стати політичним інструментом, і хлопець з вулиць міста, який сам став жертвою старого злочину корони. Один вечір і одна ніч породжують нейскінченну кількість наслідків.</p>
                    <br>
                    <p>Історія, що починалася як казка, переросла у готичну повість про дорослішання, втрату і відмову бути тим, ким тебе призначили.</p>
                </div>
                
                <div class="modal-images">
                    <div class="modal-img">
                        <div class="modal-img-placeholder">
                            <img src="/img/chr1.jpg" alt="Обкладинка книги">
                        </div>
                    </div>
                    <div class="modal-img">
                        <div class="modal-img-placeholder">
                            <img src="/img/chr2.jpg" alt="Обкладинка книги">
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                  <a href="/pages/reader.html" class="modal-secondary-btn">
                      <i class='bx bx-book'></i>
                      Читати
                  </a>
                </div>

            </div>
        </div>
    </div>

    <!-- Модальне вікно 3 -->
    <div id="modal3" class="modal">
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal('modal3')">
                <i class='bx bx-x'></i>
            </span>
            <div class="modal-cover">
                <div class="placeholder-cover">
                    <img src="/img/cover3.jpg" alt="Обкладинка книги">
                </div>
            </div>
            <div class="modal-body">
                <h2 class="modal-title">Пригоди Тона і Скона</h2>
                
                <ul class="modal-meta">
                  <li>
                    <i class='bx bx-calendar'></i>
                    <span class="meta-label">Очікується:</span>
                    <span class="meta-value">2026</span>
                  </li>
                  <li>
                    <i class='bx bx-book-open'></i>
                    <span class="meta-label">Жанр:</span>
                    <span class="meta-value">Темне фентезі</span>
                  </li>
                  <li>
                    <i class='bx bx-globe'></i>
                    <span class="meta-label">Мова:</span>
                    <span class="meta-value">Українська</span>
                  </li>
                </ul>

                <div class="modal-text">
                    <p>Стара дорога веде крізь ліс, який пам'ятає війну краще за людей. Юнак Скон їде нею за мовчазним лицарем, шукаючи правду про загибель батька і про королівство, яке назвало миром те, що просто перестало стріляти. За їхніми спинами — минуле з братовбивчою війною, перед ними — ніч, у якій блискавка іноді відкриває більше, ніж хотілося б побачити.</p>
                    <br>
                    <p>Вони різні до болю: один ще вірить, що справедливість має голос і обличчя, інший знає, скільки крові коштує кожне слово. Їхня дорога перетворюється на зіткнення поколінь — між тими, хто виріс у мирі, збудованому на чужих гріхах, і тими, хто ці гріхи скоював, аби вижити. Між запитаннями, на які страшно чути відповіді, і мовчанням, яке теж ранить.</p>
                    <br>
                    <p>Це історія не про героїв і не про королів, а про людей після війни: зламаних, впертих, живих. Про те, як правда не завжди звільняє, а прийняття інколи болючіше за ненависть. І про те, що справжня війна починається не на полі бою — а між тими, хто дивиться на світ із різних сторін одного й того ж шраму.</p>
                </div>
            </div>
        </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modals);
});

// Функції для модальних вікон
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Закриття при кліку поза вікном
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Закриття клавішею Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
  }
});
