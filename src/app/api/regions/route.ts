import { json } from 'stream/consumers'
import {regions} from './const'
import { writeFileSync, appendFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
    const a = await fetch(`${process.env.API_PATH}/api/flights/stats`)
    const resp = await a.json()
    // console.log(resp)
    // console.log((resp).length)
    // console.log((regions).length)

    // const newReg = regions.map(item => {
    //     const a = resp.find((r) => r.name === item.title)
    //     // item.code = a?.code;
    //     return {newCode: a?.code, path: item.path, title: a?.name || item.title, code: item.code};
    // }).reduce((acc, item) => {
    //     acc[item.newCode || item.code] = {path: item.path, title: item.title, code: item.newCode || item.code}
    //     return acc
    // }, {})

    // const s = regions.reduce((acc, item) => {
    //     acc[item.code] = item
    //     return acc
    // }, {})

    // console.log(s)

    //  Синхронная запись в файл
    //  const filePath = join(process.cwd(), 'src/app/api/regions', 'analytics.json')
    //  writeFileSync(filePath, JSON.stringify(s, null, 2), 'utf8')
     
    // console.log(resp)
    //  console.log(newReg.filter(item => !item.newCode).map(item => ({title: item.title, code: item.code})))
    // return Response.json(regions)
    return Response.json(resp)
}

// [
//     { title: 'Ненецкий АО', code: 'RU-NEN' },
//     { title: 'Чеченская Республика', code: 'RU-CE' },
//     { title: 'Удмуртская Республика', code: 'RU-UD' },
//     { title: 'Республика Северная Осетия — Алания', code: 'RU-SE' },
//     { title: 'Республика Мордовия', code: 'RU-MO' },
//     { title: 'Республика Карелия', code: 'RU-KR' },
//     { title: 'Республика Калмыкия', code: 'RU-KL' },
//     { title: 'Республика Ингушетия', code: 'RU-IN' },
//     { title: 'Республика Башкортостан', code: 'RU-BA' },
//     { title: 'Республика Адыгея', code: 'RU-AD' },
//     { title: 'Ямало-Ненецкий АО', code: 'RU-YAN' },
//     { title: 'Чукотский АО', code: 'RU-CHU' },
//     { title: 'Республика Дагестан', code: 'RU-DA' },
//     { title: 'Кабардино-Балкарская Республика ', code: 'RU-KB' },
//     { title: 'Карачаево-Черкесская Республика', code: 'RU-KC' },
//     { title: 'Республика Татарстан', code: 'RU-TA' },
//     { title: 'Республика Марий Эл', code: 'RU-ME' },
//     { title: 'Чувашская Республика', code: 'RU-CU' },
//     { title: 'Ханты-Мансийский АО - Югра', code: 'RU-KHM' },
//     { title: 'Херсонская область', code: 'RU-HR' },
//     { title: 'Запорожская область', code: 'RU-ZP' },
//     { title: 'Донецкая Народная Республика', code: 'RU-DON' },
//     { title: 'Луганская Народная Республика', code: 'RU-LUG' }
//   ]

[
    { code: 'RU-0357c2a4', name: 'Тверская область' },
    { code: 'RU-083c9af3', name: 'Саратовская область' },
    { code: 'RU-097143c8', name: 'Еврейская автономная область' },
    { code: 'RU-0d9368b4', name: 'Волгоградская область' },
    { code: 'RU-0da0d6cb', name: 'Севастополь' },
    { code: 'RU-0fca42a0', name: 'Пермский край' },
    { code: 'RU-122a32e8', name: 'Республика Крым' },
    { code: 'RU-14d71554', name: 'Хабаровский край' },
    { code: 'RU-1cc9012b', name: 'Чувашия' },
    { code: 'RU-2004dffb', name: 'Адыгея' },
    { code: 'RU-20775ed3', name: 'Северная Осетия — Алания' },
    { code: 'RU-219006c1', name: 'Псковская область' },
    { code: 'RU-232817cd', name: 'Ивановская область' },
    { code: 'RU-238ad25d', name: 'Приморский край' },
    { code: 'RU-25d920dd', name: 'Архангельская область' },
    {
      code: 'RU-2872f809',
      name: 'Ханты-Мансийский автономный округ — Югра'
    },
    { code: 'RU-29e0f795', name: 'Мурманская область' },
    { code: 'RU-2aced5a7', name: 'Брянская область' },
    { code: 'RU-2b9b35b3', name: 'Камчатский край' },
    { code: 'RU-2d7da164', name: 'Челябинская область' },
    { code: 'RU-321817b8', name: 'Карелия' },
    { code: 'RU-40aa2f1b', name: 'Московская область' },
    { code: 'RU-47055df9', name: 'Дагестан' },
    { code: 'RU-496b4a8e', name: 'Ярославская область' },
    { code: 'RU-506cf67d', name: 'Пензенская область' },
    { code: 'RU-58224130', name: 'Новосибирская область' },
    { code: 'RU-6588a957', name: 'Москва' },
    { code: 'RU-6882b784', name: 'Томская область' },
    { code: 'RU-69776e9f', name: 'Амурская область' },
    { code: 'RU-69ad1ed5', name: 'Омская область' },
    { code: 'RU-6b3f1a42', name: 'Оренбургская область' },
    { code: 'RU-6ef34291', name: 'Чукотский автономный округ' },
    { code: 'RU-71008778', name: 'Республика Тыва' },
    { code: 'RU-72b28e66', name: 'Магаданская область' },
    { code: 'RU-74df891c', name: 'Ульяновская область' },
    { code: 'RU-76f2624b', name: 'Калужская область' },
    { code: 'RU-77372776', name: 'Курганская область' },
    { code: 'RU-7c4101e8', name: 'Республика Хакасия' },
    { code: 'RU-7da32361', name: 'Тульская область' },
    { code: 'RU-7ddfe307', name: 'Новгородская область' },
    { code: 'RU-800e4c83', name: 'Республика Саха (Якутия)' },
    { code: 'RU-814cb379', name: 'Забайкальский край' },
    { code: 'RU-83cc8d96', name: 'Калмыкия' },
    { code: 'RU-83f2ea7f', name: 'Алтайский край' },
    { code: 'RU-8652b5e1', name: 'Липецкая область' },
    { code: 'RU-8f710af0', name: 'Башкортостан' },
    { code: 'RU-9b039e14', name: 'Автономна Республіка Крим' },
    { code: 'RU-9b764745', name: 'Татарстан' },
    { code: 'RU-9b9eee1e', name: 'Марий Эл' },
    { code: 'RU-9bdaa1bb', name: 'Ингушетия' },
    { code: 'RU-9c586e42', name: 'Чернореченский' },
    { code: 'RU-a01239dc', name: 'Ленинградская область' },
    { code: 'RU-a1ccf680', name: 'Краснодарский край' },
    { code: 'RU-a1f08e58', name: 'Ростовская область' },
    { code: 'RU-a4305336', name: 'Сахалинская область' },
    { code: 'RU-a608182d', name: 'Ставропольский край' },
    { code: 'RU-a6b60665', name: 'Тамбовская область' },
    { code: 'RU-a7ca059a', name: 'Кировская область' },
    { code: 'RU-ac3e78be', name: 'Самарская область' },
    { code: 'RU-b017436b', name: 'Вологодская область' },
    { code: 'RU-b0b3fead', name: 'Республика Коми' },
    { code: 'RU-b5435f5b', name: 'Тюменская область' },
    { code: 'RU-b7f1eb9d', name: 'Нижегородская область' },
    { code: 'RU-b966385d', name: 'Воронежская область' },
    { code: 'RU-c751b26e', name: 'Владимирская область' },
    { code: 'RU-c76ad0d8', name: 'Костромская область' },
    { code: 'RU-ca3c74dd', name: 'Орловская область' },
    { code: 'RU-ca59c888', name: 'Смоленская область' },
    { code: 'RU-ccf786c6', name: 'Санкт-Петербург' },
    { code: 'RU-ce916c8b', name: 'Ненецкий автономный округ' },
    { code: 'RU-cf86f443', name: 'Рязанская область' },
    { code: 'RU-d2716e15', name: 'Удмуртия' },
    { code: 'RU-d31d634e', name: 'Иркутская область' },
    { code: 'RU-d7921847', name: 'Ямало-Ненецкий автономный округ' },
    { code: 'RU-db540565', name: 'Карачаево-Черкесия' },
    { code: 'RU-dfadc990', name: 'Курская область' },
    { code: 'RU-e73ff918', name: 'Свердловская область' },
    { code: 'RU-e75ff845', name: 'Кабардино-Балкария' },
    { code: 'RU-e8eb1b3d', name: 'Кемеровская область' },
    { code: 'RU-edee9511', name: 'Калининградская область' },
    { code: 'RU-eeedab60', name: 'Чечня' },
    { code: 'RU-f0ddff50', name: 'Красноярский край' },
    { code: 'RU-f30b2698', name: 'Республика Бурятия' },
    { code: 'RU-fa649406', name: 'Мордовия' },
    { code: 'RU-fe38f4b3', name: 'Астраханская область' },
    { code: 'RU-ff1f2283', name: 'Белгородская область' },
    { code: 'RU-ff8a221b', name: 'Республика Алтай' },
    { code: 'RU-MOW', name: 'Москва' },
    { code: 'RU-SPE', name: 'Санкт-Петербург' }
  ]