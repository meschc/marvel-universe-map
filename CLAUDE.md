# Marvel Universe Map — Инструкции для Клода

## Обзор проекта

Интерактивная веб-карта Marvel Cinematic Universe (MCU), визуализирующая взаимосвязи между:
- **360 персонажей** (герои, злодеи, побочные персонажи)
- **139 фильмов и сериалов** (MCU Phases 1-6, One-shots, Disney+ Series)
- **65+ комиксов** (разные линии комиксов Marvel)
- **12 вселенных** (MCU Prime, What If, Sony Marvel, Fox предыдущие версии)

**Файл:** `Marvel_Universe_Map_v6.html` (1259 строк, ~550KB, встраивает все данные)

---

## Архитектура

### Три режима отображения (MODE)

1. **characters** — граф персонажей (Force или Universe layout)
   - Узлы: персонажи
   - Ребра: team, family, romantic, ally, enemy, variant
   - Фильтры: вселенные, группы (Avengers, X-Men и т.д.), типы связей
   - Подробно: имя, реальное имя, актёр, аффилиации, появления

2. **stories** — временная шкала фильмов/сериалов (Phase или Chrono layout)
   - Узлы: фильмы/сериалы с постерами
   - Ребра: chronology (хронология), shared_characters (общие персонажи)
   - Фильтры: фазы MCU, типы (movie/tv_series/one_shot)
   - Подробно: дата выхода, дата события, персонажи, кнопка "Watched" (отслеживание)

3. **comics** — каталог комиксов (Lines или Chrono layout)
   - Узлы: комиксы с обложками
   - Ребра: связи между комиксами
   - Фильтры: линии комиксов
   - Подробно: дата, линия, tie-in персонажи

### Макеты (LAYOUT)

- **Characters:**
  - `force` — Force-directed layout (D3 simulation)
  - `universe` — Группировка по вселенным (сетка)

- **Stories:**
  - `phase` — По MCU фазам (горизонтальные полосы)
  - `chrono` — По хронологии (временная шкала)

- **Comics:**
  - `lines` — По линиям комиксов (колонки)
  - `chrono` — По дате выхода (временная шкала)

### Ключевые данные

**Встроены в HTML:**
- `charNodes[]` — персонажи (id, name, name_ru, group, universe, image, actor, wiki_url, etc.)
- `charLinks[]` — связи между персонажами (source, target, type, label, weight)
- `storyNodes[]` — фильмы/сериалы (id, title, title_ru, type, phase, poster, date, characters[])
- `storyLinksRaw[]` — хронология/персонажи
- `comicNodes[]` — комиксы (id, title, title_ru, line, cover, date, tie_in, tie_in_chars[])
- `comicLinksRaw[]` — связи между комиксами

**Словари:**
- `UNIVERSE_COLORS`, `PHASE_COLORS`, `GROUP_COLORS`, `LINE_COLORS` — цветовые схемы
- `UNIVERSE_LABELS()`, `PHASE_LABELS()`, `EDGE_LABELS()`, `GROUP_LABELS()`, `MEDIA_LABELS()`, `LINE_LABELS()` — локализованные подписи
- `EDGE_COLORS` — цвета типов связей

---

## Функциональность

### Поиск
- **searchAll(q)** — Полнотекстовый поиск по персонажам, фильмам, комиксам
- Поиск по: имя, реальное имя, актёр (персонажи); название (фильмы, комиксы)
- Результаты сгруппированы по типам, приоритет — текущий режим

### Фильтры
- **renderFilters()** — Динамическое отображение фильтров в левой панели
- **updateVisibilityChar()**, **updateVisibilityStory()**, **updateVisibilityComics()** — Скрытие узлов/ребер

**Active Sets:**
- `activeGroups`, `activeUniverses`, `activeEdgeTypesChar` (characters)
- `activePhases`, `activeStoryTypes`, `activeEdgeTypesStory` (stories)
- `activeComicLines` (comics)

### Детальная панель
- **showCharDetail(d)** — Информация о персонаже
- **showStoryDetail(d)** — Информация о фильме (+ кнопка "Watched")
- **showComicDetail(d)** — Информация о комиксе
- Клики на теги-ссылки переключают режимы и открывают связанные узлы

### Просмотренные фильмы
- **watched** (Set) — ID просмотренных фильмов
- **saveWatched()** — localStorage (ключ: 'watched')
- Бейджик ✓ на узлах, счётчик в title bar

### Путь между персонажами (Path mode)
- **startPath(id)** — Начать поиск пути
- **finishPath(node)** — Завершить, показать кратчайший путь
- **clearPath()** — Отменить
- Выделение: узлы жёлтые (#f2c14e), ребра жирные

### Масштабирование & навигация
- **d3.zoom** — Зум и панорамирование мышью
- **focusNode(d)** — Плавный zoom на узел (1.4x)
- **fitViewToNodes()** — Fit to view
- Drag-and-drop узлов (characters mode с force layout)

### Локализация
- **LANG** ('ru' или 'en')
- **UI()** — Объект с локализованными строками
- `name_ru`, `title_ru`, `real_name_ru` в данных
- Кнопка в top bar

---

## Когда разрабатывать

### Добавить персонажа
1. Добавить объект в `charNodes` (после строки ~100):
   ```js
   { id: 'char_name', name: 'Name', name_ru: 'Имя', group: 'Avengers', universe: 'mcu_prime', 
     image: 'url', actor: 'Actor Name', real_name: 'Real', wiki_url: 'url' }
   ```
2. Если нужны связи — добавить в `charLinks` (source/target по id, type, label)
3. Перестроить граф: `buildCharGraph()`

### Добавить фильм/сериал
1. Добавить в `storyNodes` (~line 150):
   ```js
   { id: 'story_slug', title: 'Title', title_ru: 'Название', type: 'movie', 
     phase: 'phase1', poster: 'url', date: '2021-06-11', characters: ['char_id1', 'char_id2'] }
   ```
2. Если есть хронологическая связь — добавить в `storyLinksRaw`
3. Перестроить: `buildStoryGraph()`

### Добавить комикс
1. Добавить в `comicNodes` (~line 200):
   ```js
   { id: 'comic_id', title: 'Title', title_ru: 'Название', line: 'main', 
     cover: 'url', date: '2020-01-15', tie_in: 'story_id', tie_in_chars: ['char_id'] }
   ```
2. Перестроить: `buildComicsGraph()`

### Обновить локализацию
1. Найти **UI()** функцию (строка ~150):
   ```js
   if (LANG === 'ru') return { app_title: '...', ... }
   else return { app_title: '...', ... }
   ```
2. Добавить/изменить ключи в обе версии

### Обновить цвета
- `UNIVERSE_COLORS` — {universe_key: '#hex'}
- `PHASE_COLORS` — {phase_key: '#hex'}
- `GROUP_COLORS` — {group_key: '#hex'}
- `LINE_COLORS` — {line_key: '#hex'}
- `EDGE_COLORS` — {type: '#hex'} (team, family, romantic, etc.)

---

## Производительность & советы

### Оптимизация
- **1259 строк** — файл встроенный, чтобы не было запросов
- **Lazy loading изображений** — `runLazyPatterns()` на постерах/обложках
- **Reduced motion** — уважение к `prefers-reduced-motion`
- **Дроссельное обновление** на resize (debounce 250ms)

### Визуализация D3
- **Force simulation** — 300 nodes, 500+ links — быстро на modern браузерах
- **Дашпат ребер** — типы связей визуально различаются (сплошные/пунктирные)
- **Опакова градиента** — фон с radial-gradient для глубины
- **Paint order** — text with stroke для читаемости на изображениях

### Адаптивность
- **Мобильная** — `max-width: 720px`
  - Фильтры скрываются за кнопку
  - Уменьшены отступы
  - Detail panel занимает больше экрана
- **Тёмный режим** — CSS variables (--bg, --panel, --text, --accent)

---

## Типичные задачи

**«Добавить персонажа Петра Паркера»**
→ Найти массив `charNodes`, добавить объект, установить `group: 'Avengers'`, `universe: 'mcu_prime'`, связь с Tony Stark в `charLinks`

**«Отметить фильм как просмотренный»**
→ Клик на кнопку "Watched" в detail panel → вызовет `watched.add(d.id)` и сохранит в localStorage

**«Изменить цвет фазы»**
→ Найти `PHASE_COLORS`, отредактировать HEX для нужной фазы

**«Добавить новую линию комиксов»**
→ Добавить ключ в `LINE_LABELS_RU`, `LINE_COLORS`, комиксы с этой линией в `comicNodes`, перестроить

**«Исправить опечатку в русском переводе»**
→ Найти узел в `charNodes`/`storyNodes`/`comicNodes`, обновить `name_ru`/`title_ru`

---

## Ссылки

- **MCU Fandom Wiki:** https://marvelcinematicuniverse.fandom.com/
- **Marvel Official:** https://www.marvel.com/
- **Marvel Films Fandom:** https://marvel.fandom.com/wiki/Marvel_Films
- **D3.js Docs:** https://d3js.org/

---

## Контрольный список перед релизом

- [ ] Все персонажи/фильмы в текущем MCU canon добавлены
- [ ] Изображения (постеры, обложки) загружаются быстро (оптимизированы)
- [ ] Поиск находит все типы узлов
- [ ] Фильтры работают (группировка, скрытие правильные)
- [ ] Русский & English локализация согласованы
- [ ] Мобильный дизайн (720px) тестирован
- [ ] Performance: no jank при zoom/pan с 300+ узлами
- [ ] Path finding между персонажами корректно

