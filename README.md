# Monik — деплой на Vercel

Статичный сайт из одного файла. Всё встроено: шрифты подключаются с Google Fonts, изображения, логотипы и рантайм — внутри `index.html`. Никакой сборки не требуется.

```
deploy/
├── index.html    ← вся страница
└── vercel.json   ← настройки хостинга
```

## Вариант 1 — через веб-интерфейс

1. Заархивируйте папку `deploy` в zip.
2. Откройте vercel.com → **Add New… → Project → Deploy without Git**.
3. Перетащите архив, нажмите **Deploy**.

## Вариант 2 — через CLI

```bash
npm i -g vercel
cd deploy
vercel          # превью
vercel --prod   # продакшн
```

На вопрос про framework выберите **Other**, build command оставьте пустым, output directory — текущая папка.

## Вариант 3 — через Git

Положите содержимое `deploy` в корень репозитория и импортируйте его в Vercel. Framework Preset — **Other**, Build Command — пусто, Output Directory — `.`.

## Замена контента

`index.html` — скомпилированный файл, править его вручную не нужно. Исходник — `Monik Hero.dc.html` в корне проекта; после изменений соберите заново.

## Домен

После деплоя: **Project → Settings → Domains** → добавьте свой домен и пропишите указанные DNS-записи у регистратора.
