import { MechoMladshi } from "./components/mladshi";
import bojo from "./team/bojo.png";
import eli from "./team/eli.png";
import hrisi from "./team/hrisi.png";
import ioni from "./team/ioni.png";
import iva from "./team/iva.png";
import josko from "./team/josko.png";
import kalata from "./team/kalata.png";
import kalin from "./team/kalin.png";
import kiki from "./team/kiki.png";
import koko from "./team/Koko.png";
import mecho from "./team/mecho.png";
import mitko from "./team/mitko.png";
import nikola from "./team/nikola.png";
import silveto from "./team/silveto.png";
import tomi_r from "./team/tomi_r.png";

export const organizators = {
  Ментори: [
    {
      name: "Кики",
      Instagram: "@kirilka.angelova",
      photo: kiki,
      role: "Ментор",
      customClass: "",
      description: (
        <p>
          Здравейте, аз съм Кики и съм ментор на младежите от организационния
          екип на ДЕСЕТОТО юбилейно издание на Hack&nbsp;TUES&nbsp;X и
          TUES&nbsp;Fest&nbsp;2024! Ще станат нещата!
        </p>
      ),
      color: "#fff",
    },
    {
      name: "Калин",
      photo: kalin,
      Instagram: "@_kalin.georgiev.27_",
      role: "Ментор",
      customClass: "",
      description: (
        <p>
          Здравейте, аз съм Калин Георгиев, випуск 2023, част от организационния
          екип на Hack&nbsp;TUES&nbsp;Infinity и ментор на тазгодишния
          организационен екип. #loshomie
        </p>
      ),
      color: "#fff",
    },
  ],
  Координатор: [
    {
      name: "Никола",
      photo: nikola,
      Instagram: "@nikola_sachkov",
      role: "Координатор",
      customClass: "",
      description: (
        <p>
          Здравейте, аз съм Никола и се радвам, че съм част от организационния
          екип на юбилейното издание на Hack&nbsp;TUES! Имам много хобита и
          обичам да купонясвам!
        </p>
      ),
      color: "#a8d4bb",
    },
  ],
  "Екип Логистика": [
    {
      name: "Томи",
      photo: tomi_r,
      Instagram: "@therealx_ray",
      role: "Екип Логистика",
      customClass: "ml-[50px] mt-[30px]",
      description: (
        <blockquote>
          <p>
            Тялото ми е някъде, душата другaде, а ментално здраве никога не съм
            имал!
          </p>
          <footer>- Томи</footer>
        </blockquote>
      ),
      color: "#9cd1f1",
    },
  ],
  "Екип ИТ": [
    {
      name: "Митко",
      photo: mitko,
      Instagram: "@dimitarzhv",
      role: "Екип ИТ",
      customClass: "",
      description: (
        <p>
          Не спя, за да пиша код. Тренирам, когато не пиша код. Мечтая си за
          Porsche като си нямам работа :)
        </p>
      ),
      color: "#a4f85c",
    },
    {
      name: "Божо",
      photo: bojo,
      Instagram: "@__systpro0x7b",
      role: "Екип ИТ",
      customClass: "m-1",
      description: (
        <p>
          Сайт не се прави за един ден...
          <br />
          но за една нощ може и да стане :Д
        </p>
      ),
      color: "#57d7e4",
    },
  ],
  "Екип PR": [
    {
      name: "Хриси",
      photo: hrisi,
      Instagram: "@hristiyanaangelova",
      role: "Екип PR",
      description: "Здрасти :)",
      customClass: "ml-[100px] mt-[90px]",
      color: "#a0a6d8",
    },
    {
      name: "Йони",
      photo: ioni,
      Instagram: "@yonistoraro",
      role: "Екип PR",
      description: (
        <p>
          Хей хей аз съм Йо и съм част от организационния екип на юбилейното
          издание на Hack TUES ;0 Две неща за мен - Toni Storaro & Akali
          supremacist!
        </p>
      ),
      customClass: "ml-[90px] mt-[65px]",
      color: "#bc8be4",
    },
  ],
  "Eкип Дизайн": [
    {
      name: "Мечо",
      photo: mecho,
      Instagram: "@mechkarov_",
      role: "Екип Дизайн",
      customClass: "mt-[30px] ml-[30px]",
      description: (
        <>
          <p>
            Обичам гъски, гъските са топ и ако не сте съгласни с мен...
            <br />
            Мечо Младши ще Ви намери...
          </p>
          <MechoMladshi className="px-10 py-5" />
        </>
      ),
      color: "#ffbf9f",
    },
    {
      name: "Ели",
      photo: eli,
      Instagram: "@eli_trynna_stalk_u",
      role: "Екип Дизайн",
      customClass: "mt-[50px] ",
      description: "Nah, I'd win",
      color: "#f493f4",
    },
    {
      name: "Коко",
      photo: koko,
      Instagram: "@izgubih_se_v_gorata",
      role: "Екип Дизайн",
      customClass: "mt-[50px] ml-[40px]",
      description: (
        <blockquote>
          <p>
            Уважаеми зрители, това беше всичко от нас за тази вечер. Благодарим
            ви, че бяхте с нас и до нови срещи!
          </p>
          <footer>- С. Трифонов</footer>
        </blockquote>
      ),
      color: "#a1a1a3",
    },
  ],
  "Екип Спонсори": [
    {
      name: "Ива",
      photo: iva,
      Instagram: "@iamfailingbiology",
      role: "Екип Спонсори",
      customClass: "",
      description: (
        <p>В живота най-много обичам 3 неща - да спя, да ям и да клюкаря.</p>
      ),
      color: "#f789a4",
    },
    {
      name: "Силвето",
      photo: silveto,
      Instagram: "@silviaaa_d",
      role: "Екип Спонсори",
      customClass: "ml-[32px]",
      description: <p>Много щастлива и винаги радостна!</p>,
      color: "#b98cdf",
    },
    {
      name: "Йоско",
      photo: josko,
      Instagram: "@retardaciq",
      role: "Екип Спонсори",
      customClass: "ml-[60px] mt-[40px]",
      description: (
        <p>
          Обичам музика. И домати със сирене. Това е от мен. <br />
          <strong>ЖИВОТЪТ Е ПРЕКРАСЕН!</strong>
        </p>
      ),
      color: "#fec29e",
    },
    {
      name: "Калата",
      photo: kalata,
      Instagram: "@not__kala",
      role: "Екип Спонсори",
      customClass: "mt-[10px]",
      description: (
        <p>Обичам да се самозалъгвам, че ще си легна след още 5 минути.</p>
      ),
      color: "#7de4e9",
    },
  ],
};
