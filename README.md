# Редактор параметров 

### [Selsup ТЗ](https://disk.yandex.ru/i/fq_sd-10mcGnKg) 

## Структура

 ```
  param-editor/
  ├── src/
  │   ├── App.tsx (Редактор параметров)
  │   └── main.tsx
  ├── index.html
  ├── tsconfig.json
  ├── vite.config.ts
  └── package.json

 ```
 
**Рабочий пример** - [редактор параметров](https://selsup-eta.vercel.app/)

* ```useImperativeHandle``` для метода ```getModel```
* типизация через ```forwardRef``` (_чтобы корректно работать с_ ```ref```)
* управление состоянием через ``ref``
* добавлена кнопка для демонстрации работы ```getModel()```