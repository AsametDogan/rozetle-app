import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { GifGetBadge } from "../assets/gifs/celebrate";
import {
  ImgAppstore,
  ImgLogo,
  ImgMockup,
  ImgPlaystore,
} from "../assets/images";
import { GifGive, GifSelf } from "../assets/gifs";
import { Footer } from "../components";

const Home = () => {
  return (
    <div className=" h-screen flex justify-center overflow-y-scroll scrollbar-hide p-8 md:p-6 sm:p-2 pb-0">
      <div className="flex flex-col items-center  up-2xl:w-[1280px] up-lg:w-[90%] down-lg:w-full scrollbar-hide ">
        <div className="w-full  border-b-4 border-rzt_blue flex sm:justify-center">
          <img src={ImgLogo} alt="Logo Rozetle" className="w-[300px]" />
        </div>
        <div className="w-full py-10 px-2 gap-4 ">
          <div className="w-full grid gap-4 grid-cols-2 down-md:grid-cols-1 py-5 px-1 justify-center items-center">
            <p className="text-justify">
              Rozetle, sınırlı sayıda ve değerli olan dijital rozetlerle
              insanların başarılarını, kişiliğini ve ilişkilerini özel ve
              anlamlı bir şekilde dijital ortamda taşımasını sağlayan bir mobil
              uygulamadır. Artık dijital dünyada da kendinizi ifade edebilir,
              sevdiklerinize değerli rozetler gönderebilir ve katıldığınız
              etkinliklerin anısını sonsuza kadar taşıyabilirsiniz.
              <br />
              <br />
              Özel anlarınızı ölümsüzleştirmek, sevdiklerinize anlam dolu
              rozetler göndermek ve katıldığınız etkinliklerden özel hatıralarla
              ayrılmak artık Rozetle ile mümkün!
              <br />
              Sınırlı sayıda ve anlam taşıyan dijital rozetlerle dolu bir
              dünyaya hoş geldiniz.
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="flex flex-col gap-10 items-center">
                <p className="text-justify">
                  "Bir rozet binlerce kelime değerinde! Rozetle ile anlamlı bir
                  iz bırakın"
                </p>
                <p className=" font-semibold">Hemen indir, rozetlemeye başla</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => {
                      window.open(
                        "https://apps.apple.com/tr/app/rozetle/id6471131038?l=tr",
                        "_blank"
                      );
                    }}
                    className="hover:scale-[101%]"
                  >
                    <img
                      className="max-w-[200px] sm:max-w-[175px]"
                      src={ImgAppstore}
                      alt="app-store"
                    />
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.rozetle.rozetleapp&pli=1",
                        "_blank"
                      );
                    }}
                    className="hover:scale-[101%] "
                  >
                    <img
                      className="max-w-[200px] sm:max-w-[175px] "
                      src={ImgPlaystore}
                      alt="play-store"
                    />
                  </button>
                </div>
              </div>
            </p>
            <div className=" flex justify-center w-full">
              <img className="max-w-[300px] lg:max-w-[250px] sm:max-w-[275px]" src={ImgMockup} alt="" />
            </div>

            <img
              className="max-w-[80%] md:max-w-[65%] sm:max-w-[90%] justify-self-center"
              src={GifGetBadge}
              alt=""
            />
          </div>

          <div id="Rozet Nedir" className="flex flex-col gap-2 py-10">
            <div className="flex gap-2 items-center">
              <div className="h-1 w-[50px] bg-rzt_orrange"></div>
              <p className="text-rzt_orrange font-bold text-3xl sm:text-xl min-w-fit">
                Rozet Nedir?{" "}
              </p>
              <div className="h-1 w-full bg-rzt_orrange"></div>
            </div>
            <div className="w-full grid gap-4 grid-cols-2 down-md:grid-cols-1 py-5 px-1 grid-r justify-center items-center">
              <img
                className="max-w-[80%] md:max-w-[65%] sm:max-w-[90%] justify-self-center"
                src={GifSelf}
                alt=""
              />
              <p className="text-justify">
                Rozet, anlamı olan, sınırlı sayıda ve özel bir değere sahip
                dijital sembollerdir. Rozetle uygulaması, kullanıcıların
                arkadaşlarına veya iş arkadaşlarına değerli rozetler
                göndermelerini sağlayan yenilikçi bir platformdur. Kişisel
                anlamları, dostluğu ve deneyimi simgelerken, sosyal medya
                hesaplarınızda da bunu duyurarak öne çıkmak için mükemmel bir
                yol sunar.
              </p>
            </div>
          </div>
          <div id="Neden Rozetle" className="flex flex-col gap-2 py-10">
            <div className="flex gap-2 items-center">
              <div className="h-1 w-[50px] bg-rzt_green_dull"></div>
              <p className="text-rzt_green_dull font-bold text-3xl sm:text-xl min-w-fit">
                Neden Rozetle?{" "}
              </p>
              <div className="h-1 w-full bg-rzt_green_dull"></div>
            </div>
            <div className="min-w-[350px] grid w-[50%] grid-cols-1 py-5 px-2 grid-r justify-center items-center">
              <Accordion open={true}>
                <AccordionHeader>Özel ve Anlamlı</AccordionHeader>
                <AccordionBody>
                  Rozetler, spesifik anlamları olan özel dijital görsellerdir.
                  Bu rozetlerle sevginizi, dostluğunuzu ve başarılarınızı özel
                  bir şekilde ifade edebilirsiniz.
                </AccordionBody>
              </Accordion>
              <Accordion open={true}>
                <AccordionHeader>Sınırlı Sayıda</AccordionHeader>
                <AccordionBody>
                  Her rozet, sınırlı sayıda üretilir ve sahiplerine özel bir
                  değer katar. Kendi benzersiz rozetinizi seçin ve kişiliğinizle
                  öne çıkın.
                </AccordionBody>
              </Accordion>
              <Accordion open={true}>
                <AccordionHeader>Çeşitli Kategoriler</AccordionHeader>
                <AccordionBody>
                  Rozetle, farklı kategorilerde onlarca çeşitli rozet sunar.
                  Spor, arkadaşlık, aşk, başarı ve daha fazlası için mükemmel
                  bir rozet bulabilirsiniz.
                </AccordionBody>
              </Accordion>
              <Accordion open={true}>
                <AccordionHeader>Sosyal Bağlantı</AccordionHeader>
                <AccordionBody>
                  Sevdiklerinizle aranızdaki bağı güçlendirmek için Rozetle ile
                  özel rozetler gönderin. Dostlarınıza, ailenize veya iş
                  arkadaşlarınıza özel bir hediye verin.
                </AccordionBody>
              </Accordion>
              <Accordion open={true}>
                <AccordionHeader>Etkinlikler İçin Mükemmel</AccordionHeader>
                <AccordionBody>
                  Rozetle, etkinlik düzenleyenlerin katılımcılara özel katılım
                  rozetleri göndermelerini sağlar. Artık etkinlik anılarınızı
                  sonsuza kadar taşıyabilir ve sosyal medyada paylaşabilirsiniz.
                </AccordionBody>
              </Accordion>
            </div>
          </div>
          <div id="Nasıl Kullanılır" className="flex flex-col gap-2 py-10">
            <div className="flex gap-2 items-center">
              <div className="h-1 w-[50px] bg-rzt_purple_light"></div>
              <p className="text-rzt_purple_light font-bold text-3xl sm:text-xl min-w-fit">
                Nasıl Kullanılır?{" "}
              </p>
              <div className="h-1 w-full bg-rzt_purple_light"></div>
            </div>
            <div className=" grid w-full grid-cols-2 down-md:grid-cols-1 py-5 grid-r justify-center items-center">
              <div className="px-2">
                <Accordion open={true}>
                  <AccordionHeader>Rozet Seçin</AccordionHeader>
                  <AccordionBody>
                    Rozetle uygulamasında sizi büyüleyecek bir dizi özel rozet
                    sizi bekliyor. Sevginizi, saygınızı veya tebriğinizi ifade
                    eden mükemmel rozeti seçin. Her rozet, bir hikaye anlatır,
                    bir duyguyu yansıtır ve anlam dolu bir mesaj taşır.
                  </AccordionBody>
                </Accordion>
                <Accordion open={true}>
                  <AccordionHeader>Kişiselleştirin</AccordionHeader>
                  <AccordionBody>
                    Rozetinizi daha da özel hale getirin! Özel bir mesaj
                    ekleyerek duygularınızı ifade edin. Sadece birkaç dokunuşla
                    rozetinizi tamamen kişiselleştirin, bu da onu alıcı için
                    unutulmaz kılar.
                  </AccordionBody>
                </Accordion>
                <Accordion open={true}>
                  <AccordionHeader>Gönderin</AccordionHeader>
                  <AccordionBody>
                    Rozetinizi sevdiklerinize, arkadaşlarınıza veya iş
                    arkadaşlarınıza hızlıca ve kolayca gönderin. Sadece birkaç
                    tık ile rozetinizi seçtiğiniz kişiye iletebilirsiniz. Anlam
                    dolu bir sürpriz yaparak ilişkilerinizi güçlendirin veya
                    çalışma arkadaşlarınızı ödüllendirin.
                  </AccordionBody>
                </Accordion>
                <Accordion open={true}>
                  <AccordionHeader>Sosyal Medyada Parlayın</AccordionHeader>
                  <AccordionBody>
                    Aldığınız rozeti sosyal medya hesaplarınızda gururla
                    paylaşın! Arkadaşlarınızın ve ailenizin bu özel anıyı
                    görmesine izin verin. Rozetiniz, tüm dünyaya mutluluğunuzu,
                    başarınızı ve sevginizi duyurmanın harika bir yolu olacak.
                  </AccordionBody>
                </Accordion>
                <Accordion open={true}>
                  <AccordionHeader>Etkinliklerde Hatırlanın</AccordionHeader>
                  <AccordionBody>
                    Katıldığınız etkinliklerde özel bir katılım rozeti alın. Bu
                    rozet, etkinlikteki unutulmaz anılarınızı simgeler. Bu özel
                    rozetle, etkinliklerdeki başarınızı ve katılımınızı sonsuza
                    kadar hatırlayın
                  </AccordionBody>
                </Accordion>
              </div>
              <img
                className="max-w-[80%] md:max-w-[65%] sm:max-w-[90%] justify-self-center"
                src={GifGive}
                alt=""
              />
            </div>
          </div>
          <div
            id="Şimdi Rozetlemeye Başla"
            className="flex flex-col gap-2 py-10"
          >
            <div className="flex gap-2 items-center">
              <div className="h-1 w-[50px] bg-rzt_blue_dark"></div>
              <p className="text-rzt_blue_dark font-bold text-3xl sm:text-xl min-w-fit">
                Şimdi Rozetlemeye Başla{" "}
              </p>
              <div className="h-1 w-full bg-rzt_blue_dark"></div>
            </div>
            <div className="w-full grid gap-4 grid-cols-2 down-md:grid-cols-1 py-5 px-1 grid-r justify-center items-center">
              <div className="flex flex-col gap-20 items-center">
                <p className="text-justify">
                  "Bir rozet binlerce kelime değerinde! Rozetle ile anlamlı bir
                  iz bırakın"
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => {
                      window.open(
                        "https://apps.apple.com/tr/app/rozetle/id6471131038?l=tr",
                        "_blank"
                      );
                    }}
                    className="hover:scale-[101%]"
                  >
                    <img
                      className="max-w-[200px] sm:max-w-[175px]"
                      src={ImgAppstore}
                      alt="app-store"
                    />
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.rozetle.rozetleapp&pli=1",
                        "_blank"
                      );
                    }}
                    className="hover:scale-[101%] "
                  >
                    <img
                      className="max-w-[200px] sm:max-w-[175px] "
                      src={ImgPlaystore}
                      alt="play-store"
                    />
                  </button>
                </div>
              </div>
              <div className=" flex justify-center w-full">
                <img className="max-w-[300px] lg:max-w-[250px] sm:max-w-[275px]" src={ImgMockup} alt="" />
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
