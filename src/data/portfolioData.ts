export interface PortfolioWork {
  id: number;
  title: string;
  category: string;
  mainImage: string;
  images: string[];
  description: string;
  details: string;
  price?: number;
  tags: string[];
}

export const portfolioWorks: PortfolioWork[] = [
  {
    id: 1,
    title: "Премиум Брендинг",
    category: "Брендинг",
    mainImage: "img/b60e482f-22c1-4fc0-8a8e-92e69faaba3d.jpg",
    images: [
      "img/b60e482f-22c1-4fc0-8a8e-92e69faaba3d.jpg",
      "img/1ce88ef7-96ce-4a07-baf6-b34e46369b4b.jpg",
      "img/4e931031-2666-4787-9bd9-fe6d6569a1ae.jpg"
    ],
    description: "Элегантная айдентика для премиум бренда с изысканными деталями",
    details: "Полный комплект брендинга включает логотип, фирменный стиль, визитки, бланки и руководство по использованию. Проект выполнен в роскошной цветовой гамме с золотыми акцентами.",
    price: 85000,
    tags: ["Логотип", "Фирменный стиль", "Премиум"]
  },
  {
    id: 2,
    title: "Веб-Дизайн Студии",
    category: "Веб-дизайн",
    mainImage: "img/4e931031-2666-4787-9bd9-fe6d6569a1ae.jpg",
    images: [
      "img/4e931031-2666-4787-9bd9-fe6d6569a1ae.jpg",
      "img/b60e482f-22c1-4fc0-8a8e-92e69faaba3d.jpg",
      "img/1ce88ef7-96ce-4a07-baf6-b34e46369b4b.jpg"
    ],
    description: "Современный адаптивный дизайн для творческой студии",
    details: "Полная разработка UX/UI дизайна сайта с учетом современных трендов. Адаптивная верстка для всех устройств, интерактивные элементы и плавные анимации.",
    price: 120000,
    tags: ["UX/UI", "Адаптив", "Анимации"]
  },
  {
    id: 3,
    title: "Люкс Упаковка",
    category: "Упаковка",
    mainImage: "img/1ce88ef7-96ce-4a07-baf6-b34e46369b4b.jpg",
    images: [
      "img/1ce88ef7-96ce-4a07-baf6-b34e46369b4b.jpg",
      "img/4e931031-2666-4787-9bd9-fe6d6569a1ae.jpg",
      "img/b60e482f-22c1-4fc0-8a8e-92e69faaba3d.jpg"
    ],
    description: "Роскошный дизайн упаковки премиум продукта",
    details: "Эксклюзивная упаковка с использованием премиум материалов, тиснения золотой фольгой и специальных покрытий. Полный цикл от концепции до производства.",
    price: 95000,
    tags: ["Премиум", "Тиснение", "Эксклюзив"]
  },
  {
    id: 4,
    title: "Мобильное Приложение",
    category: "UI/UX",
    mainImage: "img/4e931031-2666-4787-9bd9-fe6d6569a1ae.jpg",
    images: [
      "img/4e931031-2666-4787-9bd9-fe6d6569a1ae.jpg",
      "img/1ce88ef7-96ce-4a07-baf6-b34e46369b4b.jpg"
    ],
    description: "Интуитивный дизайн мобильного приложения",
    details: "Полный дизайн мобильного приложения с продуманным пользовательским опытом, современным интерфейсом и удобной навигацией.",
    price: 150000,
    tags: ["Mobile", "UX Research", "Прототипирование"]
  },
  {
    id: 5,
    title: "Корпоративная Айдентика",
    category: "Брендинг",
    mainImage: "img/b60e482f-22c1-4fc0-8a8e-92e69faaba3d.jpg",
    images: [
      "img/b60e482f-22c1-4fc0-8a8e-92e69faaba3d.jpg",
      "img/1ce88ef7-96ce-4a07-baf6-b34e46369b4b.jpg"
    ],
    description: "Профессиональная корпоративная айдентика",
    details: "Разработка полного пакета корпоративной айдентики для крупной компании, включая логотип, брендбук и применение на всех носителях.",
    price: 200000,
    tags: ["Корпоратив", "Брендбук", "Масштабируемость"]
  },
  {
    id: 6,
    title: "E-commerce Дизайн",
    category: "Веб-дизайн",
    mainImage: "img/4e931031-2666-4787-9bd9-fe6d6569a1ae.jpg",
    images: [
      "img/4e931031-2666-4787-9bd9-fe6d6569a1ae.jpg",
      "img/b60e482f-22c1-4fc0-8a8e-92e69faaba3d.jpg"
    ],
    description: "Современный дизайн интернет-магазина",
    details: "Дизайн e-commerce платформы с фокусом на конверсию и удобство покупок. Оптимизация всех этапов покупательского пути.",
    price: 180000,
    tags: ["E-commerce", "Конверсия", "UX"]
  }
];