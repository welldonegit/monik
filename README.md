# Monik — деплой на Vercel

Статичный сайт, сборка не нужна.

```
deploy/
├── index.html        ← оглавление со ссылками на 4 страницы
├── concept-1.html    ← концепт 1, всё внутри файла
├── concept-2.html    ← концепт 2, всё внутри файла
├── concept-3.html    ← концепт 3, всё внутри файла
├── categories.html   ← страница «Усі категорії»
├── support.js        ← рантайм для categories.html
├── assets/           ← изображения для categories.html
└── vercel.json       ← настройки хостинга
```

Три концепта — самодостаточные файлы: изображения и рантайм встроены внутрь. Страница категорий грузит `support.js` и `assets/` рядом с собой, поэтому эти папку и файл нужно выгружать вместе с ней.

Адреса после деплоя: `/`, `/concept-1`, `/concept-2`, `/concept-3`, `/categories`.

## Вариант 1 — веб-интерфейс

1. Заархивируйте папку `deploy` в zip.
2. vercel.com → **Add New… → Project → Deploy without Git**.
3. Перетащите архив → **Deploy**.

## Вариант 2 — CLI

```bash
npm i -g vercel
cd deploy
vercel          # превью
vercel --prod   # продакшн
```

Framework Preset — **Other**, Build Command — пусто, Output Directory — текущая папка.

## Вариант 3 — Git

Положите содержимое `deploy` в корень репозитория и импортируйте в Vercel (Framework — **Other**, Build Command — пусто, Output Directory — `.`).

## Обновление контента

Скомпилированные файлы вручную не правятся. Исходники в корне проекта: `Monik Hero.dc.html`, `Monik Hero v2.dc.html`, `Monik Hero v3.dc.html`, `Monik Категорії.dc.html` — после изменений соберите выгрузку заново.

## Домен

**Project → Settings → Domains** → добавьте домен и пропишите DNS-записи у регистратора.
